import Providers from './providers'
import "./globals.css";

import Link from "next/link"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <nav style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/students">Students</Link>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
