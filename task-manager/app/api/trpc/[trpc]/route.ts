import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/api/root";

import { createTRPCContext } from "@/server/api/trpc";

const handler = (req: Request) => {
  const resHeaders = new Headers();

  return fetchRequestHandler({
    endpoint: "/api/trpc",

    req,

    router: appRouter,

    createContext() {
      return createTRPCContext({
        req,

        resHeaders,
      });
    },

    responseMeta() {
      return {
        headers: resHeaders,
      };
    },
  });
};

export { handler as GET, handler as POST };
