"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/server/api/client";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskSearchAndFilterProvider } from "@/context/task-filter-context";
import { AppSidebar } from "@/components/AppSidebar";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",

      transformer: superjson,

      headers() {
        return {
          authorization: localStorage.getItem("token") ?? "",
        };
      },
    }),
  ],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider>
            <TaskSearchAndFilterProvider>
              <div className="flex min-h-screen">
                <AppSidebar />

                <main className="flex-1 p-4">{children}</main>
              </div>
            </TaskSearchAndFilterProvider>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
