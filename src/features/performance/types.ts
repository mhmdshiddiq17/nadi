export type PortfolioYearSummary = {
  fiscalYear: number | null;

  programCount: number;

  budgetAmount: number;

  realisedValue: number;

  gapValue: number;

  achievementPct: number;
};

export type ProgramYearSummary = {
  programId: string;

  programCode: string;

  programName: string;

  fiscalYear: number;

  latestPeriodCode: string;

  budgetAmount: number;

  realisedValue: number;

  gapValue: number;

  achievementPct: number;
};

export type ProgramMonthlyPerformance = {
  periodId: string;

  periodCode: string;

  periodLabel: string;

  month: number;

  budgetAmount: number;

  periodRealisedValue: number;

  cumulativeRealisedValue: number;

  gapValue: number;

  achievementPct: number;
};

export type ProvincePerformance = {
  regionId: string;

  regionCode: string;

  regionName: string;

  budgetAmount: number;

  cumulativeRealisedValue: number;

  gapValue: number;

  achievementPct: number;

  allocationWeight: number;

  allocationSourceSystem: string;

  realisationSourceSystem: string;

  realisationFetchedAt: string;
};