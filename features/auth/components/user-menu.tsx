"use client";

import { useRef, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu({
  compact = false,
  sidebar = false,
}: {
  compact?: boolean;
  sidebar?: boolean;
}) {
  const user = useCurrentUser();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const signingOut = useRef(false);
  if (user === undefined)
    return (
      <Skeleton
        className={cn(
          compact ? "size-9 rounded-full" : "h-12 w-full",
          sidebar && "group-data-[collapsible=icon]:size-8",
        )}
        aria-label="Loading profile"
      />
    );
  const label = user?.name || user?.email || "Your account";
  const initials = (
    user?.name
      ?.split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("") ||
    user?.email?.slice(0, 1) ||
    "A"
  ).toUpperCase();
  const trigger = sidebar ? (
    <SidebarMenuButton
      size="lg"
      aria-label="Open user menu"
      disabled={pending}
    />
  ) : (
    <Button
      variant="ghost"
      className={cn(
        compact
          ? "size-9 rounded-full p-0"
          : "h-auto w-full justify-start gap-3 px-2 py-2 text-left",
      )}
      aria-label="Open user menu"
      disabled={pending}
    />
  );
  return (
    <div className={compact ? "" : "w-full"}>
      <DropdownMenu>
        <DropdownMenuTrigger render={trigger}>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center border bg-muted text-xs font-semibold",
              sidebar ? "rounded-lg" : "rounded-full",
            )}
          >
            {initials}
          </span>
          {!compact && (
            <span
              className={cn(
                "min-w-0",
                sidebar && "group-data-[collapsible=icon]:hidden",
              )}
            >
              <span className="block truncate text-sm">{label}</span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {pending ? "Signing out…" : "Personal workspace"}
              </span>
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-lg">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="break-words py-2">
              <span className="block font-medium text-foreground">
                {user?.name || "Your account"}
              </span>
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={pending}
              onClick={async () => {
                if (signingOut.current) return;
                signingOut.current = true;
                setPending(true);
                setError("");
                try {
                  await signOut();
                  router.replace("/login");
                  router.refresh();
                } catch {
                  setError("Could not sign out. Please try again.");
                } finally {
                  signingOut.current = false;
                  setPending(false);
                }
              }}
            >
              {pending ? "Signing out…" : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {pending && compact && (
        <span role="status" className="sr-only">
          Signing out…
        </span>
      )}
      {error && (
        <p role="alert" className="max-w-48 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
