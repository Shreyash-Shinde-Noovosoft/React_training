"use client";

import { createContext, useContext, useState } from "react";
import {Status, Priority} from "@/constants/enums";

type TaskFilters = {
  assignedToMe: boolean;
  priority: Priority | undefined;
  status: Status | undefined;

};
type TaskFilterContextType = {
  filters: TaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const TaskSearchAndFilterContext = createContext<TaskFilterContextType | null>(null);

export function TaskSearchAndFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<TaskFilters>({
    assignedToMe: false,
    priority: undefined,
    status: undefined,
  });

  const [search, setSearch] = useState<string>("");

  return (
    <TaskSearchAndFilterContext.Provider
      value={{
        filters,
        setFilters,
        search,
        setSearch
      }}
    >
      {children}
    </TaskSearchAndFilterContext.Provider>
  );
}

export function useTaskSearchAndFilter() {
  const context = useContext(TaskSearchAndFilterContext);

  if (!context) {
    throw new Error("useTaskFilter must be used inside provider");
  }

  return context;
}
