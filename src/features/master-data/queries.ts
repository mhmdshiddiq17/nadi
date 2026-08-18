import { createClient } from "@/lib/supabase/server";

export async function listPrograms() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("programs")
    .select(`
      program_id,
      code,
      name,
      full_name,
      family,
      cost_bearer,
      unit_label,
      is_active,
      steward:agencies!programs_steward_agency_fk (
        code,
        name
      )
    `)
    .order("code");

  if (error) {
    throw new Error(
      `Unable to retrieve programs: ${error.code}`,
    );
  }

  return data;
}

export async function listProvinces() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select(`
      region_id,
      code,
      name,
      sort_order
    `)
    .eq(
      "region_type",
      "PROVINCE",
    )
    .eq(
      "is_active",
      true,
    )
    .order("sort_order");

  if (error) {
    throw new Error(
      `Unable to retrieve provinces: ${error.code}`,
    );
  }

  return data;
}

export async function listAgencies() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("agencies")
    .select(`
      agency_id,
      code,
      name,
      short_name,
      kind
    `)
    .eq(
      "is_active",
      true,
    )
    .order("name");

  if (error) {
    throw new Error(
      `Unable to retrieve agencies: ${error.code}`,
    );
  }

  return data;
}

export async function listPeriods() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("periods")
    .select(`
      period_id,
      code,
      label,
      period_type,
      starts_on,
      ends_on
    `)
    .order("starts_on");

  if (error) {
    throw new Error(
      `Unable to retrieve periods: ${error.code}`,
    );
  }

  return data;
}