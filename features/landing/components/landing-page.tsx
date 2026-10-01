import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Activity01Icon,
  DashboardSquare01Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OverviewChart } from "@/features/dashboard/components/overview-chart";
import { stats } from "@/features/dashboard/lib/dashboard-data";

export function LandingPage({ authenticated }: { authenticated: boolean }) {
  return (
    <div className="min-h-svh">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Brand />
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 text-sm sm:flex"
          >
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Product
            </Link>
            <Link
              href="#preview"
              className="text-muted-foreground hover:text-foreground"
            >
              Workspace preview
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {authenticated ? (
              <Button render={<Link href="/dashboard" />} nativeButton={false}>
                Open dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  render={<Link href="/login" />}
                  nativeButton={false}
                >
                  Log in
                </Button>
                <Button render={<Link href="/signup" />} nativeButton={false}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--muted),transparent_65%)]"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
            <div className="flex flex-col items-start gap-7">
              <Badge variant="outline">
                <HugeiconsIcon icon={Activity01Icon} data-icon="inline-start" />
                Your next idea starts here
              </Badge>
              <h1 className="text-5xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
                Less setup.
                <br />
                <span className="text-muted-foreground">More possibility.</span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                A thoughtful foundation for your next product. Authentication, a
                clean workspace, and the essentials to make it your own.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  render={
                    <Link href={authenticated ? "/dashboard" : "/signup"} />
                  }
                  nativeButton={false}
                >
                  {authenticated ? "Open dashboard" : "Get started"}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    data-icon="inline-end"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  render={<Link href="#preview" />}
                  nativeButton={false}
                >
                  Explore the workspace
                </Button>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Familiar tools. A fresh starting point.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                  <span>Next.js</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Convex</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>shadcn/ui</span>
                </div>
              </div>
            </div>
            <div
              id="preview"
              className="min-w-0 scroll-mt-8 overflow-hidden rounded-2xl border bg-muted/40 shadow-xl shadow-foreground/5"
              aria-label="Static sample dashboard preview"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                    a.
                  </span>
                  <span className="text-sm font-semibold">Acme workspace</span>
                </div>
                <Badge variant="secondary">Sample data</Badge>
              </div>
              <Separator />
              <div className="flex flex-col gap-4 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">Workspace overview</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      A little structure. Room to make it yours.
                    </p>
                  </div>
                  <HugeiconsIcon
                    icon={DashboardSquare01Icon}
                    className="shrink-0 text-muted-foreground"
                    size={20}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <Card key={stat.label} size="sm">
                      <CardHeader>
                        <CardDescription>{stat.label}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-semibold tabular-nums">
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <OverviewChart />
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              The essentials, thoughtfully connected
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Start with structure, not a blank canvas.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Spend less time assembling the basics and more time on what makes
              your product different.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Fast",
                copy: "Skip the blank canvas. Begin with the essentials already in place.",
                icon: Activity01Icon,
              },
              {
                title: "Simple",
                copy: "Clear layouts and reusable components. Easy to understand, easy to make yours.",
                icon: DashboardSquare01Icon,
              },
              {
                title: "Built to scale",
                copy: "A Next.js and Convex foundation you can extend as your product takes shape.",
                icon: Folder01Icon,
              },
            ].map(({ title, copy, icon }) => (
              <Card key={title}>
                <CardHeader>
                  <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted">
                    <HugeiconsIcon icon={icon} size={20} />
                  </span>
                  <CardTitle>
                    <h3>{title}</h3>
                  </CardTitle>
                  <CardDescription>{copy}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border bg-muted/40 p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Make room for your next idea.
              </h2>
              <p className="text-muted-foreground">
                Your starting point is ready. Where will you take it?
              </p>
            </div>
            <Button
              size="lg"
              render={<Link href={authenticated ? "/dashboard" : "/signup"} />}
              nativeButton={false}
            >
              {authenticated ? "Open dashboard" : "Create your account"}
              <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-7 sm:px-8">
          <div className="flex items-center gap-5">
            <Brand />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Acme
            </p>
          </div>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <span>Privacy · Unavailable</span>
            <span>Terms · Unavailable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
