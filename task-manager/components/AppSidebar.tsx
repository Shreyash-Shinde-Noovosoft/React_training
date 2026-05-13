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

import { useTaskFilter } from "@/context/task-filter-context";
import { fa } from "zod/v4/locales";
import Link from "next/link";

export function AppSidebar() {
  const { filters, setFilters } = useTaskFilter();
  return (
    <Sidebar>
      <SidebarHeader>Task Manager</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() =>
                setFilters({
                  assignedToMe: false,
                  highPriority: false,
                  completed: false,
                  inProgress: false,
                })
              }
            >
              <Link href="/">Home</Link>
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
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={filters.inProgress}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    inProgress: !prev.inProgress,
                  }))
                }
              >
                {filters.inProgress && (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
                In Progress
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={filters.highPriority}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    highPriority: !prev.highPriority,
                  }))
                }
              >
                {filters.highPriority && (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
                High Priority
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={filters.completed}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    completed: !prev.completed,
                  }))
                }
              >
                {filters.completed && (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
                Completed
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
