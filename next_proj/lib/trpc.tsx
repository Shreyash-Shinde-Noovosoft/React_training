import { initTRPC } from '@trpc/server'

// const t = initTRPC.create()
const t = initTRPC.context<{
    user: {id: string} | null
}>().create()

export const router = t.router
export const publicProcedure = t.procedure



// Middleware

const isAuthed = t.middleware(({ ctx, next}) => {
    if (!ctx.user) {
        throw new Error('UNAUTHORIZED')
    }

    return next({
        ctx: {
            user: ctx.user,
        }
    })
})

export const protectedProcedure = t.procedure.use(isAuthed)