import { z } from "zod";

export const fiscalYearSchema = z
  .number()
  .int()
  .min(2020)
  .max(2100);

export const programCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(30)
  .regex(
    /^[A-Z][A-Z0-9_]*$/,
    "Program code tidak valid.",
  );

export const periodCodeSchema = z
  .string()
  .trim()
  .regex(
    /^\d{4}-\d{2}$/,
    "Period code tidak valid.",
  );

export const programMonthlyQuerySchema =
  z.object({
    programCode:
      programCodeSchema,

    fiscalYear:
      fiscalYearSchema,
  });

export const provincePerformanceQuerySchema =
  z.object({
    programCode:
      programCodeSchema,

    periodCode:
      periodCodeSchema,
  });