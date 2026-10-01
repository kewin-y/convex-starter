"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@/lib/utils";
import { CatIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { brandName } from "@/lib/branding";

export function Brand({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(props, {
      className: cn("inline-flex items-center gap-2.5", className),
      children: (
        <>
          <div
            aria-hidden="true"
            className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <HugeiconsIcon icon={CatIcon} className="size-4" />
          </div>
          <span className="truncate font-medium text-md leading-tight">
            {brandName}
          </span>
        </>
      ),
    }),
  });
}
