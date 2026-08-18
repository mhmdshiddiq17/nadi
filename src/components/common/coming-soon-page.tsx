import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ComingSoonPageProps = {
  title: string;
  description: string;
  sprint: number;
};

export function ComingSoonPage({
  title,
  description,
  sprint,
}: ComingSoonPageProps) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Planned Feature
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          Modul ini akan dikembangkan pada Sprint {sprint}.
        </CardContent>
      </Card>
    </div>
  );
}