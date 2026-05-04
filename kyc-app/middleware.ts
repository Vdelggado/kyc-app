import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  // if (!session && !isAuthRoute) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  // if (session && isAuthRoute) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};