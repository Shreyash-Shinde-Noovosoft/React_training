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
import { useTaskSearchAndFilter } from "@/context/task-filter-context";
import { Priority, Status } from "@/constants/enums";

const formSchema = z.object({
  priority: z.enum(Priority).optional(),
  status: z.enum(Status).optional(),
});

export function FilterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { filters, setFilters } = useTaskSearchAndFilter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   priority: Priority.LOW,
    //   status: Status.PENDING,
    // },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    (toast("You submitted the following values:"), {});
    setFilters({
      assignedToMe: false,

      priority: data.priority,
      status: data.status,
    });
    onSuccess?.();
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Filters</CardTitle>

        <CardDescription>Filter tasks by priority and status.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="filter-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Priority */}
          <Controller
            name="priority"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Priority</FieldLabel>

                <div className="flex gap-3 pt-2">
                  {["HIGH", "MEDIUM", "LOW"].map((priority) => (
                    <label
                      key={priority}
                      className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition ${
                        field.value === priority
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        value={priority}
                        checked={field.value === priority}
                        onChange={() => field.onChange(priority)}
                        className="hidden"
                      />

                      {priority}
                    </label>
                  ))}
                </div>
              </Field>
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Status</FieldLabel>

                <div className="flex flex-wrap gap-3 pt-2">
                  {["PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
                    <label
                      key={status}
                      className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition ${
                        field.value === status
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        value={status}
                        checked={field.value === status}
                        onChange={() => field.onChange(status)}
                        className="hidden"
                      />

                      {status.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button type="submit" form="filter-form">
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
