"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { trpc } from "@/server/api/client";
import { useEffect, useState } from "react";
import { useTaskSearchAndFilter } from "@/context/task-filter-context";
import { TaskHookForm } from "@/components/TaskHookForm";
import { Input } from "@/components/ui/input";
import FilterModal from "@/components/FilterModal";

export default function Home() {


  const { filters, setFilters, search, setSearch } = useTaskSearchAndFilter();




  const {
    data: tasks,
    isLoading,
    error,
  } = trpc.task.getSearchedTasks.useQuery({ search, filters });


  return (
    <div className="space-y-6 p-6">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <FilterModal />

      <div className="flex gap-6">
        <div className="w-[400px] shrink-0">
          <TaskHookForm mode="create" />
        </div>

        <div className="flex-1">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
