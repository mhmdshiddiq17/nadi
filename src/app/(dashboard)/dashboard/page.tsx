import {
  Database,
  Layers3,
  LockKeyhole,
  PlugZap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const foundations = [
  {
    title: "Application",
    value: "Next.js 16",
    description:
      "App Router + TypeScript",
    icon: Layers3,
  },
  {
    title: "Authentication",
    value: "Supabase Auth",
    description:
      "SSR cookie-based session",
    icon: LockKeyhole,
  },
  {
    title: "Database",
    value: "Supabase",
    description:
      "PostgreSQL foundation",
    icon: Database,
  },
  {
    title: "Integration",
    value: "Prepared",
    description:
      "Adapter layer dimulai Sprint 6",
    icon: PlugZap,
  },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          NADI application foundation.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {foundations.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="font-display text-2xl font-semibold">
                  {item.value}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Sprint 1 — Foundation
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          Business data, monitoring nasional,
          allocation, realisation, dan analytics
          akan mulai diimplementasikan pada sprint berikutnya.
        </CardContent>
      </Card>
    </div>
  );
}