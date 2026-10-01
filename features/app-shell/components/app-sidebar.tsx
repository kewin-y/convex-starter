"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon,
  DashboardSquare01Icon,
  Folder01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { Brand } from "@/components/brand";
import { brandName } from "@/lib/branding";
import { UserMenu } from "@/features/auth/components/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardSquare01Icon },
  { label: "Projects", href: "/dashboard#projects", icon: Folder01Icon },
  { label: "Activity", href: "/dashboard#activity", icon: Activity01Icon },
];

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}
export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const activeHref =
    navigation.find(({ href }) => href.endsWith(hash) && hash !== "")?.href ??
    "/dashboard";
  return (
    <Sidebar collapsible="icon" variant="inset" aria-label="Workspace sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="px-0"
              render={
                <Brand
                  render={<Link href="/" aria-label={`${brandName} home`} />}
                />
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label="Workspace">
              <SidebarMenu>
                {navigation.map(({ label, href, icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      render={<a href={href} />}
                      isActive={href === activeHref}
                      tooltip={label}
                      aria-label={label}
                      aria-current={
                        href === activeHref
                          ? hash
                            ? "location"
                            : "page"
                          : undefined
                      }
                      onClick={() => setOpenMobile(false)}
                    >
                      <HugeiconsIcon icon={icon} aria-hidden="true" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled aria-label="Settings unavailable">
              <HugeiconsIcon icon={Settings01Icon} aria-hidden="true" />
              <span>Settings · Unavailable</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0" />
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu sidebar />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
