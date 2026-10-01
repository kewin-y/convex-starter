"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/features/dashboard/lib/dashboard-data";

export function ProjectsTable({ items }: { items: Project[] }) {
  const [message, setMessage] = useState("");
  async function copyProjectName(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      setMessage(`Copied ${name}.`);
    } catch {
      setMessage("Could not copy. Clipboard access is unavailable.");
    }
  }
  return (
    <Card id="projects" className="scroll-mt-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold">Projects</h2>
          <span className="text-xs text-muted-foreground">
            {items.length} example projects
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your work, in one place.
        </p>
      </CardHeader>
      <CardContent className="@container">
        {items.length ? (
          <>
            <ul
              className="space-y-3 @min-[34rem]:hidden"
              aria-label="Sample projects"
            >
              {items.map((project) => (
                <li key={project.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <ProjectActions
                      name={project.name}
                      onCopy={() => copyProjectName(project.name)}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <ProjectStatus status={project.status} />
                    <p className="text-xs text-muted-foreground">
                      Updated {project.updated}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="relative hidden @min-[34rem]:block">
              <table className="w-full min-w-135 text-left text-sm">
                <caption className="sr-only">
                  Sample projects and their current status
                </caption>
                <thead className="border-b text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="pb-3 font-medium">
                      Project
                    </th>
                    <th scope="col" className="pb-3 font-medium">
                      Status
                    </th>
                    <th scope="col" className="pb-3 font-medium">
                      Updated
                    </th>
                    <th scope="col" className="pb-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((project) => (
                    <tr key={project.id}>
                      <td className="py-4 pr-4">
                        <p className="font-medium">{project.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {project.description}
                        </p>
                      </td>
                      <td className="pr-4">
                        <ProjectStatus status={project.status} />
                      </td>
                      <td className="whitespace-nowrap pr-4 text-xs text-muted-foreground">
                        {project.updated}
                      </td>
                      <td>
                        <ProjectActions
                          name={project.name}
                          onCopy={() => copyProjectName(project.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            No projects yet. Your projects will appear here.
          </p>
        )}
        <p
          role="status"
          className={message ? "mt-3 text-xs text-muted-foreground" : "sr-only"}
        >
          {message}
        </p>
      </CardContent>
    </Card>
  );
}

function ProjectStatus({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-2 py-1 text-xs">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${status === "Completed" ? "bg-primary" : status === "Planning" ? "bg-muted-foreground/40" : "bg-muted-foreground"}`}
      />
      {status}
    </span>
  );
}

function ProjectActions({
  name,
  onCopy,
}: {
  name: string;
  onCopy: () => Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="shrink-0"
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${name}`}
          />
        }
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onCopy}>Copy project name</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
