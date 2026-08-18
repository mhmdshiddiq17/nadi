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

import {
  listPrograms,
} from "@/features/master-data/queries";

export default async function ProgramsPage() {
  const programs =
    await listPrograms();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Program
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Master program yang dapat diakses
          berdasarkan role dan agency pengguna.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Program Nasional
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Keluarga</TableHead>
                <TableHead>Pembina</TableHead>
                <TableHead>Beban</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {programs.map((program) => (
                <TableRow
                  key={program.program_id}
                >
                  <TableCell className="font-data font-semibold">
                    {program.code}
                  </TableCell>

                  <TableCell>
                    <div className="font-medium">
                      {program.name}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {program.full_name}
                    </div>
                  </TableCell>

                  <TableCell>
                    {program.family}
                  </TableCell>

                  <TableCell>
                    {program.steward?.name ?? "-"}
                  </TableCell>

                  <TableCell>
                    {program.cost_bearer}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        program.is_active
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {program.is_active
                        ? "Aktif"
                        : "Tidak aktif"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {programs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center"
                  >
                    Tidak ada program yang dapat diakses.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}