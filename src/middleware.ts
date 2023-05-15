import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  //? "/auth/*"
  if (req.nextUrl.pathname.startsWith("/auth")) {
    // Useful user information
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
      const p = req.nextUrl.searchParams.get("p") || "/";
      return NextResponse.redirect(new URL(p, req.url));
    }

    return NextResponse.next();
  }

  //? "/checkout/*"
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    // Useful user information
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/auth/:path*", "/checkout/:path*"],
};
