import { initTRPC, TRPCError } from "@trpc/server";

import jwt from "jsonwebtoken";
import superjson from "superjson";

export async function createTRPCContext(opts: { req: Request }) {
  const token = opts.req.headers.get("authorization");

  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      user = null;
    }
  } 

  return {
    user,
  };
}

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    transformer: superjson,
  });

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
