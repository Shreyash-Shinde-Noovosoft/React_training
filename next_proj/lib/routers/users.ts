import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { User, UserResponse } from '../types'

const schema = z.object({
    q:z.string().optional()
}).optional()

export const usersRouter = router({
  getAll: publicProcedure
  .input(schema)
    .query(async ({input}) => {

    const params = new URLSearchParams({ 
        q: input?.q ?? "" ,  
    });
    const res = await fetch(`https://dummyjson.com/users/search?${params}`)
    
    const data = await res.json() as UserResponse | undefined
      return data
    }),
})

