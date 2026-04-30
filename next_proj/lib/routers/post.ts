import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const postRouter = router({
  getAll: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
    const res = await fetch('https://dummyjson.com/posts')
    const data = await res.json()
      return data
    }),
})

