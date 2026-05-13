"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/server/api/client";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskFilterProvider } from "@/context/task-filter-context";
import { AppSidebar } from "@/components/AppSidebar";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
    }),
  ],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider>
            <TaskFilterProvider>
              <div className="flex min-h-screen">
                <AppSidebar />

                <main className="flex-1 p-4">{children}</main>
              </div>
            </TaskFilterProvider>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
