import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { OverviewChart } from "@/features/dashboard/components/overview-chart";
import { ActivityList } from "@/features/dashboard/components/activity-list";
import { ProjectsTable } from "@/features/dashboard/components/projects-table";
import { Badge } from "@/components/ui/badge";
import {
  activities,
  projects,
  stats,
} from "@/features/dashboard/lib/dashboard-data";

export function DashboardView() {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline">Sample workspace</Badge>
        <span>Product data below is illustrative.</span>
      </div>
      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
      <div className="grid items-stretch gap-6 xl:grid-cols-[1.6fr_1fr]">
        <OverviewChart />
        <ActivityList items={activities} />
      </div>
      <ProjectsTable items={projects} />
      <p className="pt-2 text-xs text-muted-foreground">
        A little structure. Room to make it yours.
      </p>
    </>
  );
}
