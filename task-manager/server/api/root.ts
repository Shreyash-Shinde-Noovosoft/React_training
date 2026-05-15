import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { taskRouter } from "./routers/task";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  task: taskRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;