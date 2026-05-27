"use client";

import { trpc } from "@/server/api/client";

import { TASK_STATUSES } from "@/constants/task-status";

import TaskColumn from "@/components/TaskColumn";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/server/api/types";
import { useTaskSearchAndFilter } from "@/context/task-filter-context";
import { Input } from "@/components/ui/input";
import FilterModal from "@/components/FilterModal";
import TaskFilterSelect from "@/components/TaskFilterSelect";
import { Priority, Status } from "@/constants/enums";
import TanstackTable from "@/components/TanstackTable";

export default function BoardPage() {
  const { filters, setFilters, search, setSearch } = useTaskSearchAndFilter();
  const { data: tasks = [], isLoading } = trpc.task.getSearchedTasks.useQuery({
    search,
    filters,
  });

  const utils = trpc.useUtils();

  const updateTask = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      utils.task.getSearchedTasks.invalidate();
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);

    if (!task) return;

    if (task.status === over.id) return;

    updateTask.mutate({
      ...task,
      status: over.id as Task["status"],
    });
  }

  //   if (isLoading) {
  //     return <div className="p-6">Loading...</div>;
  //   }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6">

        <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        {/* <FilterModal /> */}

  <TaskFilterSelect
    placeholder="Status"
    value={filters.status}
    options={Object.values(Status)}
    onChange={(value) =>
      setFilters((prev) => ({
        ...prev,

        status:
          value as Status
          | undefined,
      }))
    }
  />

  <TaskFilterSelect
    placeholder="Priority"
    value={filters.priority}
    options={Object.values(Priority)}
    onChange={(value) =>
      setFilters((prev) => ({
        ...prev,

        priority:
          value as Priority
          | undefined,
      }))
    }
    />
    </div>
    

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {TASK_STATUSES.map((status) => {
            const columnTasks = tasks.filter(
              (task) => task.status === status.value,
            );

            return (
              <TaskColumn
                key={status.value}
                title={status.title}
                tasks={columnTasks}
                statusValue={status.value}
              />
            );
          })}

          {/* <TanstackTable /> */}
        </div>
      </div>
    </DndContext>
  );
}
