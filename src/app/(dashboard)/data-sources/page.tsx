import { Badge } from "@/components/ui/badge";
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

import { createClient } from "@/lib/supabase/server";

export default async function DataSourcesPage() {
  const supabase =
    await createClient();

  const { data, error } = await supabase
    .from("integration_sources")
    .select(`
      integration_source_id,
      code,
      name,
      source_type,
      status,
      schedule_cron,
      timezone,
      adapter_key,
      agency:agencies (
        name
      )
    `)
    .order("name");

  if (error) {
    throw new Error(
      `Unable to retrieve integration sources: ${error.code}`,
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Data Sources
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Registry sumber data NADI.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Integration Sources
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Lembaga</TableHead>
                <TableHead>Adapter</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((source) => (
                <TableRow
                  key={
                    source.integration_source_id
                  }
                >
                  <TableCell>
                    <div className="font-medium">
                      {source.name}
                    </div>

                    <div className="font-data text-xs text-muted-foreground">
                      {source.code}
                    </div>
                  </TableCell>

                  <TableCell>
                    {source.agency?.name ?? "-"}
                  </TableCell>

                  <TableCell className="font-data text-xs">
                    {source.adapter_key}
                  </TableCell>

                  <TableCell>
                    00:00 WIB
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {source.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}