import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Middleware only checks if cookie exists since it can't run `FS` due to being on edge runtime */

export function middleware(req: NextRequest) {
    const sessionId = req.cookies.get("session")?.value;

    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if (isProtectedRoute && !sessionId) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/login") && sessionId) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
}

/* Middleware check if server was external instead, due to it not running `FS` 
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/features/authentication/utils/sessionHelper";

export async function middleware(request: Request) {
  const session = await getSessionFromRequest();

  const isDashboard = request.url.includes("/dashboard");

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
*/
