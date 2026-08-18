import {
  Banknote,
  ChartNoAxesCombined,
  CircleDollarSign,
  Landmark,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  requireAnyRole,
} from "@/features/auth/authorization";

import {
  formatIDRCompact,
  formatPercent,
} from "@/features/performance/format";

import {
  getPortfolioYearSummary,
  getProgramYearSummaries,
} from "@/features/performance/performance.service";

export default async function DataPreviewPage() {
  await requireAnyRole([
    "SUPER_ADMIN",
    "APN_ADMIN",
  ]);

  const fiscalYear = 2026;

  const [
    portfolio,
    programs,
  ] = await Promise.all([
    getPortfolioYearSummary(
      fiscalYear,
    ),

    getProgramYearSummaries(
      fiscalYear,
    ),
  ]);

  if (!portfolio) {
    return (
      <div>
        Data belum tersedia.
      </div>
    );
  }

  const cards = [
    {
      title: "Program",
      value:
        portfolio.programCount.toString(),
      icon: Landmark,
    },

    {
      title: "Anggaran",
      value:
        formatIDRCompact(
          portfolio.budgetAmount,
        ),
      icon: Banknote,
    },

    {
      title: "Realisasi",
      value:
        formatIDRCompact(
          portfolio.realisedValue,
        ),
      icon: CircleDollarSign,
    },

    {
      title: "Capaian",
      value:
        formatPercent(
          portfolio.achievementPct,
        ),
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Sprint 3 Data Preview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Validation view untuk dummy
          allocation dan realisation FY2026.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <Card
              key={
                card.title
              }
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">
                  {card.title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="font-data text-2xl font-semibold">
                  {card.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Program Performance
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Program
                </TableHead>

                <TableHead>
                  Anggaran
                </TableHead>

                <TableHead>
                  Realisasi
                </TableHead>

                <TableHead>
                  Gap
                </TableHead>

                <TableHead>
                  Capaian
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {programs.map(
                (program) => (
                  <TableRow
                    key={
                      program.programId
                    }
                  >
                    <TableCell>
                      <div className="font-data font-semibold">
                        {
                          program.programCode
                        }
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {
                          program.programName
                        }
                      </div>
                    </TableCell>

                    <TableCell className="font-data">
                      {
                        formatIDRCompact(
                          program.budgetAmount,
                        )
                      }
                    </TableCell>

                    <TableCell className="font-data">
                      {
                        formatIDRCompact(
                          program.realisedValue,
                        )
                      }
                    </TableCell>

                    <TableCell className="font-data">
                      {
                        formatIDRCompact(
                          program.gapValue,
                        )
                      }
                    </TableCell>

                    <TableCell className="font-data">
                      {
                        formatPercent(
                          program.achievementPct,
                        )
                      }
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}