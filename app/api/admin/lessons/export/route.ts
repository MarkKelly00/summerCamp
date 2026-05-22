/**
 * Admin JSON export — `/api/admin/lessons/export`.
 *
 * Returns every Lesson document (legacy + 2026) as a JSON file. Useful
 * for backups, dev/prod parity diffs, and bulk authoring offline.
 */

import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson } from "@/lib/db/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Admin required" }, { status: 403 });
  }

  await connectToDatabase();
  const lessons = await Lesson.find({}).sort({ learningTrack: 1, week: 1, day: 1 }).lean();

  const body = JSON.stringify({ exportedAt: new Date().toISOString(), count: lessons.length, lessons }, null, 2);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"summer-camp-lessons-${new Date().toISOString().slice(0, 10)}.json\"`,
    },
  });
}
