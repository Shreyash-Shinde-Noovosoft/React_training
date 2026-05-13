"use client";

import { createContext, useContext, useState } from "react";

type TaskFilters = {
  assignedToMe: boolean;
  highPriority: boolean;
  completed: boolean;
  inProgress: boolean;
};
type TaskFilterContextType = {
  filters: TaskFilters;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
};

const TaskFilterContext = createContext<TaskFilterContextType | null>(null);

export function TaskFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<TaskFilters>({
    assignedToMe: false,
    highPriority: false,
    completed: false,
    inProgress: false,
  });

  return (
    <TaskFilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
}

export function useTaskFilter() {
  const context = useContext(TaskFilterContext);

  if (!context) {
    throw new Error("useTaskFilter must be used inside provider");
  }

  return context;
}
