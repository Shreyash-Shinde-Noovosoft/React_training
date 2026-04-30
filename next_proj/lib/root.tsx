import { router } from './trpc'
import { studentRouter } from './routers/student'
import { usersRouter } from './routers/users'
import { postRouter } from './routers/post'

export const appRouter = router({
  student: studentRouter,
  users: usersRouter,
  posts: postRouter,
})

export type AppRouter = typeof appRouter