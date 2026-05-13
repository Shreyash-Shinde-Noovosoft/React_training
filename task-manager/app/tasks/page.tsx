"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { trpc } from "@/server/api/client";
import { useEffect, useState } from "react";
import { useTaskFilter } from "@/context/task-filter-context";
import { TaskHookForm } from "@/components/TaskHookForm";
import { Input } from "@/components/ui/input";

export default function Home() {
  // const hello = trpc.example.hello.useQuery({
  //   text: "Shreyash",
  // });

  // const [data, setData] = useState()

  const { filters } = useTaskFilter();

  const [search, setSearch] = useState<string>("");

  const {
    data: tasks,
    isLoading,
    error,
  } = trpc.task.getSearchedTasks.useQuery({ search, filters });
//   if (isLoading) return <p>loading...</p>;
//   if (error) return <p>error</p>;

  const filteredTasks = tasks?.filter((task) => {
    return (
      (!filters.assignedToMe || task.assignedTo === "Shreyash") &&
      (!filters.highPriority || task.priority === "High") &&
      (!filters.completed || task.status === "Completed") &&
      (!filters.inProgress || task.status === "InProgress")
    );
  });

  return (
    <div className="space-y-6 p-6">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

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
