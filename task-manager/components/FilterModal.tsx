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
import { FilterForm } from "./FilterForm";
import { useState } from "react";

export default function FilterModal() {
  const [open, setOpen] =
  useState(false)
  return (
    <Dialog
  open={open}
  onOpenChange={setOpen}
>
      <DialogTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <FilterForm onSuccess={()=>{
          setOpen(false)
        }} />
      </DialogContent>
    </Dialog>
  );
}
