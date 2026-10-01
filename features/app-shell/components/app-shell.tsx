"use client";

import { AppSidebar } from "@/features/app-shell/components/app-sidebar";
import { UserMenu } from "@/features/auth/components/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider data-slot="app-shell">
      <AppSidebar />
      <AppShellContent>{children}</AppShellContent>
    </SidebarProvider>
  );
}

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { state, isMobile, openMobile } = useSidebar();
  return (
    <SidebarInset className="min-w-0 overflow-clip">
      <a
        href="#main-content"
        className="sr-only fixed top-2 left-2 z-60 rounded-md bg-background p-3 focus:not-sr-only"
      >
        Skip to content
      </a>
      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger
              aria-label={
                isMobile
                  ? "Open navigation"
                  : state === "collapsed"
                    ? "Expand sidebar"
                    : "Collapse sidebar"
              }
              aria-expanded={isMobile ? openMobile : state === "expanded"}
            />
            <span className="text-sm font-medium">Overview</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              / Personal workspace
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu compact />
          </div>
        </header>
        <div
          id="main-content"
          tabIndex={-1}
          className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-8 outline-none sm:px-8 sm:py-10"
        >
          {children}
        </div>
      </div>
    </SidebarInset>
  );
}
