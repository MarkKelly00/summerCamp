/**
 * Health check.
 *
 * Returns 200 with { ok: true, db: "connected" } when the Mongo singleton
 * connects, 503 otherwise. Pinned to the Node runtime because Mongoose
 * cannot run on Edge.
 */
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  try {
    await connectToDatabase();
    return NextResponse.json({
      ok: true,
      db: "connected",
      latencyMs: Date.now() - startedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      { ok: false, db: "error", message },
      { status: 503 },
    );
  }
}
