import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import fs from "fs";
import path from "path";

export const taskRouter = createTRPCRouter({
  getTasks: publicProcedure.query(() => {
    const filePath = path.join(
    process.cwd(),
    "/tasks.json"
  )

  const tasks = JSON.parse(
    fs.readFileSync(
      filePath,
      "utf-8"
    )
  )

  return tasks as Task[]
  }),

  getSearchedTasks: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),

        filters: z.object({
          assignedToMe: z.boolean(),
          highPriority: z.boolean(),
          completed: z.boolean(),
          inProgress: z.boolean(),
        }),
      }),
    )
    .query(({ input }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");

      const tasks: Task[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
          !input.search ||
          task.title.toLowerCase().includes(input.search.toLowerCase()) ||
          task.description.toLowerCase().includes(input.search.toLowerCase());

        const matchesAssigned =
          !input.filters.assignedToMe || task.assignedTo === "Shreyash";

        const matchesPriority =
          !input.filters.highPriority || task.priority === "High";

        const matchesCompleted =
          !input.filters.completed || task.status === "Completed";

        const matchesInProgress =
          !input.filters.inProgress || task.status === "InProgress";

        return (
          matchesSearch &&
          matchesAssigned &&
          matchesPriority &&
          matchesCompleted &&
          matchesInProgress
        );
      });

      return filteredTasks;
    }),

  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        status: z.string(),
        priority: z.string(),
        assignedTo: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");
      const existingTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const newTask = {
        id: crypto.randomUUID(),
        ...input,
      };

      existingTasks.push(newTask);

      fs.writeFileSync(filePath, JSON.stringify(existingTasks, null, 2));

      return newTask;
    }),

  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");
      const existingTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const updatedTasks = existingTasks.filter(
        (task: Task) => task.id !== input.id,
      );
      fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string(),
        status: z.string(),
        priority: z.string(),
        assignedTo: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");
      const existingTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const updatedTask = existingTasks.map((task: Task) => {
        if (task.id === input.id) {
          return {
            ...task,
            ...input,
          };
        }
        return task;
      });

      fs.writeFileSync(filePath, JSON.stringify(updatedTask, null, 2));
    }),
});
