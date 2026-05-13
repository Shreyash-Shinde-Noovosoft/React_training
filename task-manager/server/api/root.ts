import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { taskRouter } from "./routers/task";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;