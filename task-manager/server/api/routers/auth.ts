import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/db";
import z, { ZodObject } from "zod";
// import jwt from "jsonwebtoken";


// const loginSchema : {
//     email: string,
//     password: string

// } = {
//     email: "skjfsl@email.com",
//     password: "myorders"
// }

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(loginSchema )
    .mutation(({ input, ctx }) => {
      const users = db.users

      const user = users.find((u) => {
        return u.email === input.email
        })

        console.log(user)
        console.log(input)

        console.log(user?.email)
        console.log(user?.password)
        console.log("***************")

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }


    const isValid = input.password==user.password

      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const jwt = require('jsonwebtoken');

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      return {
        token,
      };
    }),
});