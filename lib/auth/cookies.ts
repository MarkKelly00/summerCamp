/**
 * Session cookie helpers for the Node runtime (Server Actions + Server
 * Components). Wraps `lib/auth/session.ts` with `next/headers` cookie I/O.
 *
 * Marked `server-only` so accidental imports from client components fail
 * loudly at build time.
 */

import "server-only";

import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  type SessionPayload,
  signSession,
  verifySession,
} from "./session";

export async function setSession(payload: SessionPayload): Promise<void> {
  const token = await signSession(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}
