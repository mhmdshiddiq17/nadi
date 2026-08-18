import {
  Building2,
  CalendarDays,
  MapPinned,
  PackageSearch,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  requireAnyRole,
} from "@/features/auth/authorization";

import {
  listAgencies,
  listPeriods,
  listPrograms,
  listProvinces,
} from "@/features/master-data/queries";

export default async function AdminPage() {
  await requireAnyRole([
    "SUPER_ADMIN",
    "APN_ADMIN",
  ]);

  const [
    agencies,
    programs,
    provinces,
    periods,
  ] = await Promise.all([
    listAgencies(),
    listPrograms(),
    listProvinces(),
    listPeriods(),
  ]);

  const stats = [
    {
      title: "Program",
      value: programs.length,
      icon: PackageSearch,
    },
    {
      title: "Lembaga",
      value: agencies.length,
      icon: Building2,
    },
    {
      title: "Provinsi",
      value: provinces.length,
      icon: MapPinned,
    },
    {
      title: "Periode",
      value: periods.length,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Administration
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Master data foundation NADI.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">
                  {item.title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="font-data text-3xl font-semibold">
                  {item.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}