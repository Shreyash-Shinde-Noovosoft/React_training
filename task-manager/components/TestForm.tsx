"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "./ui/controller-input";
import { FormTextarea } from "./ui/controller-textarea";
import { FormSelect } from "./ui/controller-select";
import { FormCheckbox } from "./ui/controller-checkbox";
import { FormRadioGroup } from "./ui/controller-radio";
import { Button } from "./ui/button";

export default function TestForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
      completed: false,
      status: "OPEN",
    },
  });
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
        className="space-y-4"
      >
        <FormInput
          name="title"
          label="Title"
          placeholder="Enter title"
          rules={{
            required: "Title is required",

            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },

            maxLength: {
              value: 20,
              message: "Maximum 20 characters",
            },
          }}
        />

        <FormTextarea name="description" label="Description" />

        <FormSelect
          name="priority"
          label="Priority"
          options={[
            {
              label: "High",
              value: "HIGH",
            },
            {
              label: "Medium",
              value: "MEDIUM",
            },
          ]}
        />

        <FormCheckbox name="Completed" label="Completed" />

        <FormRadioGroup
          name="status"
          label="Status"
          options={[
            {
              label: "Open",
              value: "OPEN",
            },
            {
              label: "Closed",
              value: "CLOSED",
            },
          ]}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
