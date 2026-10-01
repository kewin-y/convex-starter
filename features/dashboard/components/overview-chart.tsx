import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { overview } from "@/features/dashboard/lib/dashboard-data";
export function OverviewChart() {
  const points = overview.values
    .map((value, i) => `${i * (540 / 29)},${150 - value * 5}`)
    .join(" ");
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <h2>{overview.title}</h2>
        </CardTitle>
        <CardDescription>{overview.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label={overview.summary}
          className="mt-3 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 gap-y-3 text-xs text-muted-foreground"
        >
          <div
            aria-hidden="true"
            className="flex flex-col justify-between text-right"
          >
            {[30, 20, 10, 0].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
          <svg
            aria-hidden="true"
            viewBox="-3 -3 546 156"
            preserveAspectRatio="none"
            className="aspect-[18/5] min-h-32 w-full text-primary"
          >
            {[0, 10, 20, 30].map((value) => (
              <line
                key={value}
                x1="0"
                x2="540"
                y1={150 - value * 5}
                y2={150 - value * 5}
                className="stroke-border"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <polygon
              points={`0,150 ${points} 540,150`}
              fill="currentColor"
              opacity="0.06"
            />
            <polyline
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div
            aria-hidden="true"
            className="col-start-2 flex justify-between gap-1"
          >
            {["Day 1", "Day 10", "Day 20", "Day 30"].map((label) => (
              <span key={label} className="whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
