import { NextResponse } from "next/server";

export async function middleware(request, response, next) {
  const cookie = await request.cookies.get("token")?.value;
  if (cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/forget-password/:path*"],
};
