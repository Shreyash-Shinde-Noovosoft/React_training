import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const token = request.cookies.get("token")?.value

    const isAuthPage = request.nextUrl.pathname === "/auth"

    if (
        !token &&
        !isAuthPage
    ) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

  return NextResponse.next() 
}

 
export const config = {
  matcher: [
    "/",

    "/board/:path*",

    "/auth",
  ],
}