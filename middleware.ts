import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkWebsiteStatus } from "@/lib/master-check";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, images, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const websiteName = process.env.WEBSITE_NAME || "ayvo_official110";
  const status = await checkWebsiteStatus(websiteName);

  // If website is inactive
  if (!status.isActive) {
    if (pathname !== "/deactivated") {
      const deactivatedUrl = new URL("/deactivated", request.url);
      deactivatedUrl.searchParams.set("ownerName", status.ownerName);
      deactivatedUrl.searchParams.set("ownerPhone", status.ownerPhone);
      return NextResponse.redirect(deactivatedUrl);
    }
    return NextResponse.next();
  }

  // If website is active but user tries to manually visit /deactivated
  if (status.isActive && pathname === "/deactivated") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin route protection
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminSession = request.cookies.get("ayvo_admin_session");
    if (!adminSession || adminSession.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
