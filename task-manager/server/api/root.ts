import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { taskRouter } from "./routers/task";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  task: taskRouter,
  auth: authRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;