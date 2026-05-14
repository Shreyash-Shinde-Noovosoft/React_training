"use client";

import { trpc } from "@/server/api/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TASK_STATUSES } from "@/constants/task-status";
import { Task } from "@/server/api/types";

type Props = {
  task: Task;
};

export default function TaskSelectStatus({ task }: Props)
{
  const utils = trpc.useUtils();

    const updateTask =
    trpc.task.updateTask.useMutation({
      onSuccess: () => {
        utils.task.getTasks.invalidate()
      },
    })


  return (
    <Select
      value={task.status}
      onValueChange={(value) => {
        updateTask.mutate({
          ...task,
          status: value,
        });
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {TASK_STATUSES.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
