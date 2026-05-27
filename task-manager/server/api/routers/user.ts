import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { User } from "../types";

export const userRouter = createTRPCRouter({
    getUsers: protectedProcedure.query(() => {
        const users = db.users

        console.log(users)

        return users as User[]
    })
})