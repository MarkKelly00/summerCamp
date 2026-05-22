/**
 * Cached Mongoose connection helper for Next.js 16 (Vercel/serverless safe).
 *
 * Why a global cache?
 *   In dev, Next hot-reloads server code on every file change. In production
 *   on Vercel, lambda containers reuse processes across invocations. Either
 *   way, calling mongoose.connect() per request would exhaust the Atlas
 *   connection limit. We stash a singleton on globalThis so it survives
 *   module re-evaluation in dev and warm-start reuse in prod.
 *
 * Runtime requirement:
 *   Must run on the Node runtime (not Edge). Any Route Handler or Server
 *   Action that imports this file should declare:
 *     export const runtime = "nodejs";
 *
 * Usage:
 *   import { connectToDatabase } from "@/lib/db/mongoose";
 *   await connectToDatabase();
 *   // Now any model query will use the shared connection.
 */

import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== "test") {
  // Fail fast on misconfigured deploys instead of throwing at the first
  // database call later.
  throw new Error(
    "MONGODB_URI is not set. Add it to .env.local for dev, or to the Vercel project's environment variables for production.",
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cache: MongooseCache =
  global._mongoose ?? (global._mongoose = { conn: null, promise: null });

export async function connectToDatabase(): Promise<Mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI!, {
      // Serverless-friendly defaults. Tune in Phase 6 once we have load data.
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    // Clear the cached promise so the next call retries instead of hanging.
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cache.conn) {
    await cache.conn.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}
