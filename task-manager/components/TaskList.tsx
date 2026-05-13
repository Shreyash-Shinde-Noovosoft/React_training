import { DndContext } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: { tasks: Task[] | undefined }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-medium">No tasks found</p>

          <p className="text-sm text-muted-foreground">
            Try changing filters or create a new task
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
