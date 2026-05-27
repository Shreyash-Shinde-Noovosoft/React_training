"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "./ui/input";
import { Task } from "@/server/api/types";

type FilterConfig = {
  column: string;

  placeholder?: string;
}

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  filters?: FilterConfig[];
  onRowClick?: (row: T) => void;
};

export default function TanstackTable<T>({ data, columns, filters, onRowClick }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters
    },
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rows = table.getRowModel().rows;

  const visibleColumns = table.getVisibleLeafColumns();

  const columnVirtualizer = useVirtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  >({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3, //how many columns to render on each side off screen each way (adjust this for performance)
  });

  const rowVirtualizer = useVirtualizer({
    count: rows.length,

    getScrollElement: () => tableContainerRef.current,

    estimateSize: () => 45,

    overscan: 5,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();

  const totalSize = columnVirtualizer.getTotalSize();

  return (
    <div>
      <div className="flex items-center py-4">
        {
          filters?.map((filter) => (
            <Input
            placeholder={filter.placeholder ?? ""}
            value={(table.getColumn(filter.column)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filter.column)?.setFilterValue(event.target.value)}
            className="max-w-sm"
            />
          ))
        }
        {/* <Input
          placeholder="Filter users..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
      </div>
<div
  ref={tableContainerRef}
  className="h-[500px] overflow-auto border"
>
  <Table
    style={{
      width: `${totalSize}px`,
      position: "relative",
      // overflow-wrap: "break-word",
    }}
  >
    <TableHeader
      className="sticky top-0 z-10 bg-white"
    >
      {table
        .getHeaderGroups()
        .map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="flex w-full"
          >
            {virtualColumns.map(
              (virtualColumn) => {
                const header =
                  headerGroup.headers[
                    virtualColumn.index
                  ];

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      position: "absolute",
                      left: 0,
                      transform: `translateX(${virtualColumn.start}px)`,
                      width: `${virtualColumn.size}px`,
                    }}
                    className="bg-muted"
                  >
                    {flexRender(
                      header.column.columnDef
                        .header,
                      header.getContext()
                    )}
                  </TableHead>
                );
              }
            )}
          </TableRow>
        ))}
    </TableHeader>

    <TableBody
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
        display: "block",
      }}
    >
      {rowVirtualizer
        .getVirtualItems()
        .map((virtualRow) => {
          const row =
            rows[virtualRow.index];

          return (
            <TableRow
              key={row.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translateY(${virtualRow.start}px)`,
                width: `${totalSize}px`,
                height: `${virtualRow.size}px`,
              }}
              onClick={() =>
    onRowClick?.(row.original)
  }
              className="border-b"
            >
              {virtualColumns.map(
                (virtualColumn) => {
                  const cell =
                    row.getVisibleCells()[
                      virtualColumn.index
                    ];

                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        position: "absolute",
                        left: 0,
                        transform: `translateX(${virtualColumn.start}px)`,
                        width: `${virtualColumn.size}px`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef
                          .cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
</div>
    </div>
  );
}

// type User = {
//   id: number;
//   name: string;
// };

// const data: User[] = Array.from({ length: 10000 }, (_, i) => ({
//   id: i,
//   name: `User ${i}`,
// }));

// const columns: ColumnDef<User>[] = [
//   {
//     header: "ID",
//     accessorKey: "id",
//   },
//   {
//         header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     accessorKey: "name",
//   },
// ];

// export default function BoardPage({data, columns, filters}: {data:Task[], columns:ColumnDef<T>[]}) {
//   return (
//     <div
//       style={{
//         padding: "20px",
//       }}
//     >
//       <h1>Users Table</h1>

//       <DataTable data={data} columns={columns} filters={[
//     {
//       column: "name",
//       placeholder: "Filter names...",
//     },
//   ]} />
//     </div>
//   );
// }
