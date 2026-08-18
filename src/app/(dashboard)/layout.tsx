import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { getCurrentProfile } from "@/features/auth/profile";
import { createClient } from "@/lib/supabase/server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

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
    !profile.role ||
    profile.role.code === "UNASSIGNED"
  ) {
    redirect("/access-pending");
  }

  return (
    <div className="min-h-svh bg-background lg:grid lg:grid-cols-[236px_minmax(0,1fr)]">
      <AppSidebar
        roleCode={profile.role.code}
        className="sticky top-0 hidden lg:flex"
      />

      <div className="min-w-0">
        <AppHeader
          userEmail={user.email ?? ""}
          fullName={
            profile.full_name ??
            user.email ??
            "User"
          }
          roleCode={profile.role.code}
        />

        <main className="mx-auto w-full max-w-[2200px] p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}