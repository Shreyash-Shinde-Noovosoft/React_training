"use client";

import { trpc } from "@/server/api/client";

import { TASK_STATUSES } from "@/constants/task-status";

import TaskColumn from "@/components/TaskColumn";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function BoardPage() {
  const { data: tasks = [], isLoading } = trpc.task.getTasks.useQuery();

  const utils = trpc.useUtils();

  const updateTask = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      utils.task.getTasks.invalidate();
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

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6">
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
        </div>
      </div>
    </DndContext>
  );
}
