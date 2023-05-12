import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
// import { jwt } from "@/utils";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value || "";

    try {
      // await jwt.isValidToken(token);
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      const requestedPage = req.nextUrl.pathname;
      return NextResponse.redirect(
        new URL(`/auth/login?p=${requestedPage}`, req.url)
      );
    }
  }
}
