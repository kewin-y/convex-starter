import { AppShell } from "@/features/app-shell/components/app-shell";
import "@/features/app-shell/styles/styles.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
