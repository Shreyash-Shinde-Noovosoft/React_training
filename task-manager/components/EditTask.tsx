"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { TaskHookForm } from "./TaskHookForm";
import { Task } from "@/server/api/types";
import { useState } from "react";

export default function EditTask({ task }: { task: Task }) {
  const [open, setOpen] =
  useState(false)
  return (
    <Dialog
  open={open}
  onOpenChange={setOpen}
>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <TaskHookForm mode="edit" task={task} onSuccess={()=> {
          setOpen(false)
        }} />
      </DialogContent>
    </Dialog>
  );
}
