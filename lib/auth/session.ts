/**
 * Session JWT signing + verification.
 *
 * Uses `jose` rather than `jsonwebtoken` so the same code runs in both the
 * Node runtime (Server Actions, Route Handlers) and the Edge runtime
 * (proxy.ts middleware). `jsonwebtoken` depends on Node's `crypto` module,
 * which is not available on Edge.
 *
 * This module is deliberately UI-framework-agnostic — no `next/headers`
 * imports — so it can be consumed by proxy.ts. Cookie I/O lives in
 * `./cookies.ts`.
 */

import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "summer-camp-session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionRole = "student" | "parent" | "admin";

export interface SessionPayload {
  userId: string;
  username: string;
  role: SessionRole;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET must be set to a long random string (32+ chars recommended). Generate one with `openssl rand -base64 48`.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    // Defensive shape check — refuse anything that does not match our payload.
    if (
      typeof payload.userId !== "string" ||
      typeof payload.username !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    if (
      payload.role !== "student" &&
      payload.role !== "parent" &&
      payload.role !== "admin"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };
  } catch {
    // Expired, bad signature, malformed — treat as no session.
    return null;
  }
}
