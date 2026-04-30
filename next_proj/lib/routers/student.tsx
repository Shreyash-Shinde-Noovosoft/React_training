import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { Student } from '../types'

const students: Record<string, Student> = {
  '1': { name: 'Asha', email: 'CS' },
  '2': { name: 'Ravi', email: 'IT' },
  '3': { name: 'Meera', email: 'AI' },
}

export const studentRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return students[input.id]
    }),
  
  getByIdDummy: publicProcedure
  .input(z.object({id:z.string()}))
  .query(async ({input}) => {
    const res = await fetch(`https://dummyjson.com/users/${input.id}`)
    const data = await res.json()

    return {
      name: data.firstName,
      email: data.email,
    }
  }),

  create: publicProcedure
  .input(
    z.object({
      firstName: z.string(),
      email: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    return data
  }),

  getAll: publicProcedure
  .query(async () => {
    const res = await fetch('https://dummyjson.com/users')
    const data = await res.json()
    return data.users
  }),

  createProtected: protectedProcedure
  .input(
    z.object({
      firstName: z.string(),
      email: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    console.log("User:", ctx.user) // ✅ available

    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return res.json()
  })
})