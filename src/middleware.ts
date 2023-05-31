import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // Useful user information
  const session: any = await getToken({ req });

  /* 
    Check if there is SESSION for Redirect to previous page
  */
  //? "/auth/*"
  if (req.nextUrl.pathname.startsWith("/auth")) {
    if (session) {
      const p = req.nextUrl.searchParams.get("p") || "/";
      return NextResponse.redirect(new URL(p, req.url));
    }

    return NextResponse.next();
  }

  /* 
    Check if there is SESSION or Redirect to /auth/login
  */
  //? "/checkout/*" "/orders/*"
  if (
    req.nextUrl.pathname.startsWith("/checkout") ||
    req.nextUrl.pathname.startsWith("/orders")
  ) {
    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  /* 
    Check if is ADMIN Role
  */
  //? "/admin/*"
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
    }

    const validRoles: Role[] = ["admin", "seo", "super_user"];

    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }
  //? "api/admin/*"
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const validRoles: Role[] = ["admin", "seo", "super_user"];
    if (!validRoles.includes(session.user.role)) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",

    "/api/admin/:function*",
  ],
};
