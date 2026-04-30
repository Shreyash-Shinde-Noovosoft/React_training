import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/lib/root'

console.log("TRPC ROUTE HIT")

export function GET(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
      return {
        user: { id: '123' }, // fake user for now
      }
    },
  })
}

export function POST(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
      return {
        user: { id: '123' }, // fake user for now
      }
    },
  })
}