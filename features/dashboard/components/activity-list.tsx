import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Activity } from "@/features/dashboard/lib/dashboard-data";
export function ActivityList({ items }: { items: Activity[] }) {
  return (
    <Card id="activity" className="scroll-mt-24">
      <CardHeader>
        <h2 className="font-semibold">Recent activity</h2>
        <p className="text-xs text-muted-foreground">
          A little progress, every day.
        </p>
      </CardHeader>
      <CardContent>
        {items.length ? (
          <ul className="divide-y">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold"
                >
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm leading-snug">{item.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            No activity yet. Updates will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
