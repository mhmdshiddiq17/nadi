import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function findPortfolioYearSummary(
  fiscalYear: number,
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("portfolio_year_summary")
    .select(`
      fiscal_year,
      program_count,
      budget_amount,
      realised_value,
      gap_value,
      achievement_pct
    `)
    .eq(
      "fiscal_year",
      fiscalYear,
    )
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to retrieve portfolio summary: ${error.code}`,
    );
  }

  return data;
}

export async function findProgramYearSummaries(
  fiscalYear: number,
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("program_year_summary")
    .select(`
      program_id,
      program_code,
      program_name,
      fiscal_year,
      latest_period_code,
      budget_amount,
      realised_value,
      gap_value,
      achievement_pct
    `)
    .eq(
      "fiscal_year",
      fiscalYear,
    )
    .order(
      "program_code",
    );

  if (error) {
    throw new Error(
      `Unable to retrieve program summaries: ${error.code}`,
    );
  }

  return data;
}

export async function findProgramMonthlySeries(
  programCode: string,
  fiscalYear: number,
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("program_period_summary")
    .select(`
      period_id,
      period_code,
      period_label,
      month,
      budget_amount,
      period_realised_value,
      cumulative_realised_value,
      gap_value,
      achievement_pct
    `)
    .eq(
      "program_code",
      programCode,
    )
    .eq(
      "fiscal_year",
      fiscalYear,
    )
    .order(
      "month",
    );

  if (error) {
    throw new Error(
      `Unable to retrieve monthly performance: ${error.code}`,
    );
  }

  return data;
}

export async function findProvincePerformance(
  programCode: string,
  periodCode: string,
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from(
      "program_performance_monthly",
    )
    .select(`
      region_id,
      region_code,
      region_name,
      budget_amount,
      cumulative_realised_value,
      gap_value,
      achievement_pct,
      allocation_weight,
      allocation_source_system,
      realisation_source_system,
      realisation_fetched_at
    `)
    .eq(
      "program_code",
      programCode,
    )
    .eq(
      "period_code",
      periodCode,
    )
    .order(
      "budget_amount",
      {
        ascending: false,
      },
    );

  if (error) {
    throw new Error(
      `Unable to retrieve province performance: ${error.code}`,
    );
  }

  return data;
}