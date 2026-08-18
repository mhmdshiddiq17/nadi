import { createClient } from "@/lib/supabase/server";

export async function getCurrentProfile(
  userId: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      is_active,
      role:roles!profiles_role_fk (
        code,
        name
      ),
      agency:agencies!profiles_agency_fk (
        code,
        name
      )
    `)
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to retrieve user profile: ${error.code}`,
    );
  }

  return data;
}