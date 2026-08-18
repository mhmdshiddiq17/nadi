import "server-only";

import {
  fiscalYearSchema,
  programMonthlyQuerySchema,
  provincePerformanceQuerySchema,
} from "./schema";

import {
  findPortfolioYearSummary,
  findProgramMonthlySeries,
  findProgramYearSummaries,
  findProvincePerformance,
} from "./performance.repository";

import type {
  PortfolioYearSummary,
  ProgramMonthlyPerformance,
  ProgramYearSummary,
  ProvincePerformance,
} from "./types";

function toNumber(
  value: number | null | undefined,
): number {
  return Number(value ?? 0);
}

export async function getPortfolioYearSummary(
  fiscalYear: number,
): Promise<PortfolioYearSummary | null> {
  const year =
    fiscalYearSchema.parse(
      fiscalYear,
    );

  const row =
    await findPortfolioYearSummary(
      year,
    );

  if (!row) {
    return null;
  }

  return {
    fiscalYear:
      row.fiscal_year,

    programCount:
      row.program_count ?? 0,

    budgetAmount:
      toNumber(
        row.budget_amount,
      ),

    realisedValue:
      toNumber(
        row.realised_value,
      ),

    gapValue:
      toNumber(
        row.gap_value,
      ),

    achievementPct:
      toNumber(
        row.achievement_pct,
      ),
  };
}

export async function getProgramYearSummaries(
  fiscalYear: number,
): Promise<ProgramYearSummary[]> {
  const year =
    fiscalYearSchema.parse(
      fiscalYear,
    );

  const rows =
    await findProgramYearSummaries(
      year,
    );

  return rows.map((row) => ({
    programId:
      row.program_id!,

    programCode:
      row.program_code!,

    programName:
      row.program_name!,

    fiscalYear:
      row.fiscal_year!,

    latestPeriodCode:
      row.latest_period_code!,

    budgetAmount:
      toNumber(
        row.budget_amount,
      ),

    realisedValue:
      toNumber(
        row.realised_value,
      ),

    gapValue:
      toNumber(
        row.gap_value,
      ),

    achievementPct:
      toNumber(
        row.achievement_pct,
      ),
  }));
}

export async function getProgramMonthlyPerformance(
  input: {
    programCode: string;
    fiscalYear: number;
  },
): Promise<ProgramMonthlyPerformance[]> {
  const query =
    programMonthlyQuerySchema.parse(
      input,
    );

  const rows =
    await findProgramMonthlySeries(
      query.programCode,
      query.fiscalYear,
    );

  return rows.map((row) => ({
    periodId:
      row.period_id!,

    periodCode:
      row.period_code!,

    periodLabel:
      row.period_label!,

    month:
      row.month!,

    budgetAmount:
      toNumber(
        row.budget_amount,
      ),

    periodRealisedValue:
      toNumber(
        row.period_realised_value,
      ),

    cumulativeRealisedValue:
      toNumber(
        row.cumulative_realised_value,
      ),

    gapValue:
      toNumber(
        row.gap_value,
      ),

    achievementPct:
      toNumber(
        row.achievement_pct,
      ),
  }));
}

export async function getProvincePerformance(
  input: {
    programCode: string;
    periodCode: string;
  },
): Promise<ProvincePerformance[]> {
  const query =
    provincePerformanceQuerySchema.parse(
      input,
    );

  const rows =
    await findProvincePerformance(
      query.programCode,
      query.periodCode,
    );

  return rows.map((row) => ({
    regionId:
      row.region_id!,

    regionCode:
      row.region_code!,

    regionName:
      row.region_name!,

    budgetAmount:
      toNumber(
        row.budget_amount,
      ),

    cumulativeRealisedValue:
      toNumber(
        row.cumulative_realised_value,
      ),

    gapValue:
      toNumber(
        row.gap_value,
      ),

    achievementPct:
      toNumber(
        row.achievement_pct,
      ),

    allocationWeight:
      toNumber(
        row.allocation_weight,
      ),

    allocationSourceSystem:
      row.allocation_source_system!,

    realisationSourceSystem:
      row.realisation_source_system!,

    realisationFetchedAt:
      row.realisation_fetched_at!,
  }));
}