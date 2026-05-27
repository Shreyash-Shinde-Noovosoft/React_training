"use client";

import Providers from "../providers";
import "@/app/globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { trpc } from "@/server/api/client";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // const { error, isLoading } = trpc.task.getTasks.useQuery();

const {
  error,
  isLoading,
} = trpc.auth.me.useQuery(
  undefined,
  {

    retry: false,

    refetchInterval:
      1000 * 30,
  }
)



console.log(
  "heereree lies errrrr ```````````",error)

  useEffect(() => {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/auth");
    }
  }, [error]);

  // if(error?.data?.code === "UNAUTHORIZED") router.push("/auth");

  return (

        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
                {children}
              <Toaster />
            </div>
          </SidebarProvider>
        </TooltipProvider>
  );
}
