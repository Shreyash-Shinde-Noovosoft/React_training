import TaskCard from "./TaskCard";
import { DndContext, useDroppable } from "@dnd-kit/core";

type Props = {
  title: string;
  tasks: Task[];
  statusValue: Task["status"];
};

export default function TaskColumn({ title, tasks, statusValue }: Props) {
    const { setNodeRef } =
  useDroppable({
    id: statusValue,
  })
  return (
    <div ref={setNodeRef} className="space-y-4 rounded-lg border p-4 bg-muted/30">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} showStatusSelector />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center text-sm text-gray-500">
            No tasks available
          </div>
        )}
      </div>
    </div>
  );
}
