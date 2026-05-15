'use client'

import Providers from "../providers";
import "@/app/globals.css";

import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import {
  useEffect,
} from "react"

import {
  useRouter,
} from "next/navigation"



const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const router =
    useRouter()

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      )

    if (!token) {

      router.push("/auth")
    }

  }, [])
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              {/* <AppSidebar /> */}

              <main className="flex-1 p-4">
                <Providers>{children}</Providers>
              </main>
              <Toaster />
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
