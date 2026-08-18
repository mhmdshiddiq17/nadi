import { redirect } from "next/navigation";

import {
  type AppRoleCode,
} from "@/features/auth/roles";

import { getCurrentProfile } from "./profile";
import { createClient } from "@/lib/supabase/server";

export async function requireAnyRole(
  allowedRoles: readonly AppRoleCode[],
) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile =
    await getCurrentProfile(user.id);

  if (
    !profile ||
    !profile.is_active ||
    !allowedRoles.includes(
      profile.role.code as AppRoleCode,
    )
  ) {
    redirect("/dashboard");
  }

  return {
    user,
    profile,
  };
}