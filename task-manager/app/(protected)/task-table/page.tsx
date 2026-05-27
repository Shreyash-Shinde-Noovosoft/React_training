"use client";

import TanstackTable from "@/components/TanstackTable";
import { Button } from "@/components/ui/button";
import { trpc } from "@/server/api/client";
import { Task } from "@/server/api/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const columns: ColumnDef<Task>[] = [
  //   {
  //     header: "ID",
  //     accessorKey: "id",
  //   },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "title",
    size: 300,

    minSize: 200,

    maxSize: 500,
  },
  {
    header: "Priority",
    accessorKey: "priority",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Assigned To",
    accessorKey: "assignedTo",
  },
];

const filters = [
  {
    column: "title",
    placeholder: "Filter tasks...",
  },
];

export default function DataTable() {
  const { data } = trpc.task.getTasks.useQuery();
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  return (
    <>
      <TanstackTable
        data={data ?? []}
        columns={columns}
        filters={filters}
        onRowClick={(task) => setSelectedTask(task)}
      />

      <Sheet
        open={!!selectedTask}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTask(null);
          }
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedTask?.title}</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div>
              <p className="font-medium">Description</p>

              <p>{selectedTask?.description}</p>
            </div>

            <div>
              <p className="font-medium">Status</p>

              <p>{selectedTask?.status}</p>
            </div>

            <Button>Edit Task</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
