"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
export function DashboardHeader() {
  const user = useCurrentUser();
  const firstName = user?.name?.trim().split(/\s+/)[0];
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Your workspace, at a glance
        </p>
        {user === undefined ? (
          <Skeleton className="h-9 w-64" aria-label="Loading greeting" />
        ) : (
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Good morning{firstName ? `, ${firstName}` : ""}.
          </h1>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Here’s a little perspective on your work.
        </p>
      </div>
      <Button size="lg" render={<Link href="#projects" />} nativeButton={false}>
        View projects <span aria-hidden="true">↗</span>
      </Button>
    </div>
  );
}
