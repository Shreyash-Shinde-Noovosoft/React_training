import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import TaskSelectStatus from "./TaskSelectStatus";
import { Label } from "radix-ui";
import { useDraggable, } from "@dnd-kit/core"

export default function TaskCard({
  task,
  showStatusSelector = false,
}: {
  task: Task;
  showStatusSelector?: boolean;
}) {
    const {
  attributes,
  listeners,
  setNodeRef,
  transform,
} = useDraggable({
  id: task.id,
})

const style = transform
  ? {
      transform:
        `translate3d(
          ${transform.x}px,
          ${transform.y}px,
          0
        )`,
    }
  : undefined

  return (
    <Card ref={setNodeRef} style={style} className="w-full">
      <CardHeader {...listeners} {...attributes}>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

<CardContent className="space-y-4">
  <p className="text-sm text-gray-700">
    {task.description}
  </p>

  <div className="space-y-2 text-sm">
    <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
      <span className="font-medium text-gray-500">
        Priority
      </span>

      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        {task.priority}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
      <span className="font-medium text-gray-500">
        Status
      </span>

      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
        {task.status}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
      <span className="font-medium text-gray-500">
        Assigned To
      </span>

      <span className="font-medium text-gray-800">
        {task.assignedTo}
      </span>
    </div>
  </div>
</CardContent>

      <CardFooter className="flex gap-2">
        <EditTask task={task} />

        <DeleteTask taskId={task.id} />

        {showStatusSelector && <TaskSelectStatus task={task} />}
      </CardFooter>
    </Card>
  );
}
