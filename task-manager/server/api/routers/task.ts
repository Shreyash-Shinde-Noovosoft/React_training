import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import fs from "fs";
import path from "path";
import { Priority, Status } from "@/constants/enums";
import {Task} from "@/server/api/types"
import { match } from "assert";

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure.query(() => {
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

  getSearchedTasks: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),

        filters: z.object({
          assignedToMe: z.boolean(),
          priority: z.enum(Priority).optional(),
          status: z.enum(Status).optional(),
        }),
      }),
    )
    .query(({ input, ctx }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");

      const tasks: Task[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
          !input.search ||
          task.title.toLowerCase().includes(input.search.toLowerCase()) ||
          task.description.toLowerCase().includes(input.search.toLowerCase());

        const matchesAssigned =
          !input.filters.assignedToMe || task.assignedTo === ctx.user.userId;

        const matchesPriority =
          !input.filters.priority || task.priority === input.filters.priority;

        const matchesStatus =
          !input.filters.status || task.status === input.filters.status;


        return (
          matchesSearch &&
          matchesAssigned &&
          matchesPriority &&
          matchesStatus 
        );
      });

      return filteredTasks as Task[];
    }),

  createTask: protectedProcedure
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

  deleteTask: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const filePath = path.join(process.cwd(), "/tasks.json");
      const existingTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const updatedTasks = existingTasks.filter(
        (task: Task) => task.id !== input.id,
      );
      fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));
    }),

  updateTask: protectedProcedure
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
