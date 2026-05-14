"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTaskSearchAndFilter } from "@/context/task-filter-context";
import { fa } from "zod/v4/locales";
import Link from "next/link";
import { STATUS_CODES } from "http";

export function AppSidebar() {
  const { filters, setFilters } = useTaskSearchAndFilter();
  return (
    <Sidebar>
      {/* <Link href="/">
      <SidebarHeader>Task Manager</SidebarHeader>
      </Link> */}
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() =>
                setFilters({
                  assignedToMe: false,
                  priority: undefined,
                  status: undefined,
                })
              }
            >
              <Link href="/">Task Manager</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
              <Link href="/board">

      <SidebarMenuButton>
        Board View
      </SidebarMenuButton>

    </Link>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={filters.assignedToMe}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    assignedToMe: !prev.assignedToMe,
                  }))
                }
              >
                {filters.assignedToMe && (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
                My Tasks
              </SidebarMenuButton>
            </SidebarMenuItem>
            

          
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
