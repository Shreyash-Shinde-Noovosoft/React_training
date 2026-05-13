"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { trpc } from "@/server/api/client";
import { useEffect, useState } from "react";
import { useTaskFilter } from "@/context/task-filter-context";
import { TaskHookForm } from "@/components/TaskHookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Draggable } from "@dnd-kit/dom";
const DraggableComponent = Draggable as any;

export default function Home() {


  // const { data: tasks, isLoading, error } = trpc.task.getTasks.useQuery();


  // if (isLoading) return <p>loading...</p>
  // if (error) return <p>error</p>

  // const { filters } = useTaskFilter();

  // const filteredTasks = tasks?.filter((task) => {
  //   return (
  //     (!filters.assignedToMe || task.assignedTo === "Shreyash") &&
  //     (!filters.highPriority || task.priority === "High") &&
  //     (!filters.completed || task.status === "Completed") &&
  //     (!filters.inProgress || task.status === "InProgress")
  //   );
  // });

  return (
    // <div className="flex gap-6 p-6">
    //   <div className="w-[400px] shrink-0">
    //     <TaskHookForm mode="create" />
    //   </div>

    //   <div className="flex-1">
    //     <TaskList tasks={filteredTasks} />
    //   </div>
    // </div>
    <Link href="tasks/">
    <Button>To Tasks</Button>
    </Link>
  );
}
