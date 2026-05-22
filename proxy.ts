/**
 * proxy.ts — Next.js 16's renamed middleware. Runs at the Edge between the
 * incoming request and the matched route handler.
 *
 * Responsibilities for Phase 2:
 *   - Allow public paths through (/, /login, /api/health).
 *   - Redirect already-authenticated users away from /login.
 *   - Redirect unauthenticated users into /login with a ?next= hint.
 *   - Gate /admin to role=admin only.
 *   - Gate /parent/* to role=parent or admin.
 *   - Gate /student/* to role=student or admin (admin can preview).
 *
 * Edge runtime caveats:
 *   - No `next/headers` cookies(); use `request.cookies` instead.
 *   - No Mongoose (Edge has no Node crypto / net). All we do here is
 *     verify the session JWT with jose, which is Edge-safe.
 */

import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

const PUBLIC_EXACT = new Set<string>(["/", "/login", "/api/health"]);

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    // Anything with a file extension is treated as a static asset.
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

function isPublic(pathname: string): boolean {
  return PUBLIC_EXACT.has(pathname);
}

function dashboardFor(role: string): string {
  if (role === "student") return "/student/dashboard";
  return "/parent/dashboard"; // parent + admin both land here
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  // Authenticated user landing on /login → bounce to their dashboard.
  if (session && pathname === "/login") {
    return NextResponse.redirect(
      new URL(dashboardFor(session.role), request.url),
    );
  }

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // Beyond this point everything requires a session.
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/login") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Role gates.
  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(
      new URL(dashboardFor(session.role), request.url),
    );
  }
  if (
    pathname.startsWith("/parent") &&
    session.role !== "parent" &&
    session.role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL(dashboardFor(session.role), request.url),
    );
  }
  if (pathname.startsWith("/student") && session.role === "parent") {
    // Parents cannot peek into the student app — they have their own view.
    // (Admins can, for testing.)
    return NextResponse.redirect(
      new URL(dashboardFor(session.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  // Match everything except Next internals + static files. Static-file
  // detection inside the handler covers anything with a dotted extension.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
