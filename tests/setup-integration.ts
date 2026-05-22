/**
 * Per-worker setup for integration tests.
 *
 * - Mocks Next.js modules that don't have a runtime outside a Next
 *   server (`next/cache`, `server-only`).
 * - Connects Mongoose to the URI set by global setup.
 * - Cleans every collection between tests so state doesn't bleed.
 */

import { afterAll, afterEach, beforeAll, vi } from "vitest";
import mongoose from "mongoose";

// Next.js modules that throw outside a request context.
vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

beforeAll(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("globalSetup did not set MONGODB_URI");
  }
  await mongoose.connect(uri, {
    bufferCommands: false,
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10_000,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  const collections = await db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});
