"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { trpc } from "@/server/api/client";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/server/api/types";
import { Priority, Status } from "@/constants/enums";
import { ST } from "next/dist/shared/lib/utils";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Task title must be at least 5 characters.")
    .max(32, "Task title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  priority: z.enum(Priority),
  status: z.enum(Status),
  assignedTo: z.string(),
});

type Props = {
  mode: "create" | "edit";
  task?: Task;
  onSuccess?: () => void;
};

export function TaskHookForm({ mode, task, onSuccess }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title ?? "",

      description: task?.description ?? "",

      priority: task?.priority ?? Priority.LOW,

      status: task?.status ?? Status.PENDING,

      assignedTo: task?.assignedTo ?? "",
    },
  });

  const utils = trpc.useUtils();

  const createTask = trpc.task.createTask.useMutation({
    onSuccess: () => {
      utils.task.getSearchedTasks.invalidate();

      form.reset();

      toast.success("Task created!");
      onSuccess?.()
    },
  });

  const updateTask = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      utils.task.getSearchedTasks.invalidate();

      toast.success("Task updated!");

      onSuccess?.()
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (mode === "create") {
      createTask.mutate(data);
    } else if (mode === "edit" && task) {
      updateTask.mutate({
        id: task.id,
        ...data,
      });
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create Task" : "Edit Task"}</CardTitle>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder=""
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-priority">
                    Priority
                  </FieldLabel>

                  <Select value={Priority[field.value]} onValueChange={field.onChange}>
                    <SelectTrigger id="form-rhf-demo-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={Priority.HIGH}>High</SelectItem>

                      <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>

                      <SelectItem value={Priority.LOW}>Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-status">Status</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="form-rhf-demo-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={Status.PENDING}>Pending</SelectItem>

                      <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>

                      <SelectItem value={Status.COMPLETED}>Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="assignedTo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-assignedTo">
                    Assigned To
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-assignedTo"
                    aria-invalid={fieldState.invalid}
                    placeholder="Assignee name"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button type="submit">
              {mode === "create" ? "Create Task" : "Update Task"}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
