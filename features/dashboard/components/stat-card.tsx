import { Card, CardContent } from "@/components/ui/card";
import type { Stat } from "@/features/dashboard/lib/dashboard-data";
export function StatCard({ label, value, note }: Stat) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-sm font-medium text-muted-foreground">{label}</h2>
        <p className="mt-4 text-3xl font-semibold tabular-nums tracking-tight">
          {value}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
