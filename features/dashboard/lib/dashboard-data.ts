// Static examples. Replace this module with your product's data source.
export type Stat = { label: string; value: string; note: string };
export type Project = {
  id: string;
  name: string;
  description: string;
  status: "In progress" | "Completed" | "Planning";
  updated: string;
};
export type Activity = {
  id: string;
  initials: string;
  description: string;
  timestamp: string;
};
export const stats: Stat[] = [
  { label: "Total projects", value: "12", note: "Across your workspace" },
  { label: "Active users", value: "48", note: "In the last 30 days" },
  { label: "Tasks completed", value: "284", note: "In the last 30 days" },
  { label: "Usage", value: "64%", note: "Of example monthly capacity" },
];
export const projects: Project[] = [
  {
    id: "website",
    name: "Website refresh",
    description: "A fresh look for the essentials",
    status: "In progress",
    updated: "Jun 18, 2026",
  },
  {
    id: "workspace",
    name: "Workspace setup",
    description: "Getting the foundations in place",
    status: "Completed",
    updated: "Jun 17, 2026",
  },
  {
    id: "library",
    name: "Component library",
    description: "Reusable building blocks",
    status: "In progress",
    updated: "Jun 16, 2026",
  },
  {
    id: "research",
    name: "Customer research",
    description: "Learning what matters most",
    status: "Planning",
    updated: "Jun 14, 2026",
  },
];
export const activities: Activity[] = [
  {
    id: "1",
    initials: "JL",
    description: "Jamie completed the workspace checklist",
    timestamp: "20 minutes ago",
  },
  {
    id: "2",
    initials: "AT",
    description: "Alex updated Website refresh",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    initials: "MS",
    description: "Morgan added notes to Customer research",
    timestamp: "2 hours ago",
  },
  {
    id: "4",
    initials: "JL",
    description: "Jamie completed a component review",
    timestamp: "3 hours ago",
  },
  {
    id: "5",
    initials: "AT",
    description: "Alex started Component library",
    timestamp: "Yesterday",
  },
];
export const overview = {
  title: "Activity overview",
  description: "Example completed tasks · Last 30 days",
  summary:
    "Sample activity rises from 8 to 24 completed tasks per day, with a peak of 28. These are static example values.",
  values: [
    8, 11, 9, 12, 10, 15, 13, 12, 16, 14, 18, 17, 13, 16, 19, 18, 22, 20, 18,
    23, 21, 24, 20, 25, 23, 28, 24, 26, 22, 24,
  ],
};
