import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  compact = false,
  size = "sm",
}: {
  compact?: boolean;
  size?: "sm" | "lg";
}) {
  return (
    <Link
      href="/"
      aria-label="Acme home"
      className="inline-flex shrink-0 items-center gap-2.5 rounded-md font-semibold tracking-tight"
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center bg-primary text-lg text-primary-foreground",
          size === "lg" ? "size-10 rounded-md" : "size-8 rounded-lg",
        )}
      >
        a<span className="text-primary-foreground/60">.</span>
      </span>
      <span className={cn("text-lg", compact && "sr-only")}>Acme</span>
    </Link>
  );
}
