/**
 * Admin lesson list — filterable + sortable view of every lesson in the
 * DB (legacy + 2026). Each row links to the edit page; a "+ New" CTA
 * lands on /admin/lessons/new.
 *
 * Filters use URL search params so they're shareable and survive reloads.
 */

import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson } from "@/lib/db/models";
import type { FilterQuery } from "mongoose";

import { AppShell } from "@/components/ui/AppShell";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampButton } from "@/components/ui/CampButton";
import { CampChip } from "@/components/ui/CampChip";

export const dynamic = "force-dynamic";

interface SearchParams {
  track?: string;
  subject?: string;
  week?: string;
  type?: string;
  published?: string;
  q?: string;
}

export default async function AdminLessonsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  const sp = await searchParams;

  await connectToDatabase();

  const filter: FilterQuery<typeof Lesson> = {};
  if (sp.track && (sp.track === "entering-3rd" || sp.track === "entering-5th")) {
    filter.learningTrack = sp.track;
  }
  if (sp.subject) filter.subject = sp.subject;
  if (sp.week) filter.week = Number(sp.week);
  if (sp.type) filter.lessonType = sp.type;
  if (sp.published === "draft") filter.published = false;
  if (sp.published === "live") filter.published = { $ne: false };
  if (sp.q) {
    filter.$or = [
      { title: { $regex: sp.q, $options: "i" } },
      { questTitle: { $regex: sp.q, $options: "i" } },
      { slug: { $regex: sp.q, $options: "i" } },
    ];
  }

  const lessons = await Lesson.find(filter)
    .sort({ learningTrack: 1, week: 1, day: 1, subject: 1 })
    .select({
      slug: 1,
      title: 1,
      subject: 1,
      learningTrack: 1,
      week: 1,
      day: 1,
      lessonType: 1,
      published: 1,
      quiz: 1,
      skillTags: 1,
      _id: 1,
    })
    .lean();

  return (
    <AppShell
      identity={{
        line1: "Lesson library",
        line2: `${lessons.length} lesson${lessons.length === 1 ? "" : "s"} match the current filter`,
      }}
      nav={[
        { href: "/admin", label: "Admin home" },
        { href: "/admin/rewards", label: "Rewards" },
        { href: "/api/admin/lessons/export", label: "Export JSON" },
        { href: "/parent/dashboard", label: "Parent view" },
      ]}
    >
      <CampCard className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <CampKicker>Lessons</CampKicker>
          <Link href="/admin/lessons/new">
            <CampButton intent="primary">+ New lesson</CampButton>
          </Link>
        </div>

        {/* Filters — plain form so it round-trips through the URL. */}
        <form
          method="get"
          className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-6"
        >
          <FilterSelect
            name="track"
            value={sp.track ?? ""}
            label="Track"
            options={[
              { value: "", label: "All tracks" },
              { value: "entering-3rd", label: "Entering 3rd" },
              { value: "entering-5th", label: "Entering 5th" },
            ]}
          />
          <FilterSelect
            name="subject"
            value={sp.subject ?? ""}
            label="Subject"
            options={[
              { value: "", label: "All subjects" },
              { value: "math", label: "Math" },
              { value: "reading", label: "Reading" },
              { value: "writing", label: "Writing" },
              { value: "science", label: "Science" },
              { value: "history", label: "History" },
              { value: "engineering", label: "Engineering" },
            ]}
          />
          <FilterInput
            name="week"
            value={sp.week ?? ""}
            label="Week"
            placeholder="1..12"
            type="number"
          />
          <FilterSelect
            name="type"
            value={sp.type ?? ""}
            label="Type"
            options={[
              { value: "", label: "All types" },
              { value: "core", label: "Core" },
              { value: "bonus", label: "Bonus" },
              { value: "capstone", label: "Capstone" },
            ]}
          />
          <FilterSelect
            name="published"
            value={sp.published ?? ""}
            label="Status"
            options={[
              { value: "", label: "Any status" },
              { value: "live", label: "Live" },
              { value: "draft", label: "Drafts" },
            ]}
          />
          <FilterInput
            name="q"
            value={sp.q ?? ""}
            label="Search"
            placeholder="title or slug"
          />
          <div className="col-span-full flex flex-wrap gap-2">
            <CampButton type="submit" intent="primary" size="sm">
              Apply
            </CampButton>
            <Link href="/admin/lessons">
              <CampButton type="button" intent="ghost" size="sm">
                Clear
              </CampButton>
            </Link>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-[0.65rem] uppercase tracking-widest text-camp-ink-muted">
              <tr>
                <th className="py-2">Slug</th>
                <th className="py-2">Title</th>
                <th className="py-2">Track</th>
                <th className="py-2">W/D</th>
                <th className="py-2">Type</th>
                <th className="py-2">Quiz</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((l) => (
                <tr
                  key={String(l._id)}
                  className="border-t border-[var(--camp-border)]/40"
                >
                  <td className="py-2 align-top">
                    <Link
                      href={`/admin/lessons/${l.slug ?? String(l._id)}`}
                      className="font-mono text-xs text-[var(--camp-accent)] underline-offset-2 hover:underline"
                    >
                      {l.slug ?? "(no-slug)"}
                    </Link>
                  </td>
                  <td className="py-2 align-top">
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-[0.7rem] text-camp-ink-muted">
                      {l.skillTags.slice(0, 4).join(" · ")}
                    </p>
                  </td>
                  <td className="py-2 align-top text-xs text-camp-ink-muted">
                    {l.learningTrack ?? "—"}
                    <br />
                    {l.subject}
                  </td>
                  <td className="py-2 align-top font-mono text-xs">
                    W{l.week}D{l.day}
                  </td>
                  <td className="py-2 align-top">
                    <CampChip
                      tone={
                        l.lessonType === "capstone"
                          ? "accent"
                          : l.lessonType === "bonus"
                            ? "quest"
                            : "neutral"
                      }
                    >
                      {l.lessonType}
                    </CampChip>
                  </td>
                  <td className="py-2 align-top text-xs text-camp-ink-muted">
                    {l.quiz?.length ?? 0} Q
                  </td>
                  <td className="py-2 align-top">
                    {l.published === false ? (
                      <CampChip tone="warning">Draft</CampChip>
                    ) : (
                      <CampChip tone="positive">Live</CampChip>
                    )}
                  </td>
                </tr>
              ))}
              {lessons.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-sm text-camp-ink-muted"
                  >
                    No lessons match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </CampCard>
    </AppShell>
  );
}

function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-camp-ink-muted">
      <span className="sr-only">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="w-full rounded-md border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-2 py-1.5 text-camp-ink"
        aria-label={label}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            className="bg-[var(--camp-surface)] text-camp-ink"
          >
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterInput({
  name,
  label,
  value,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-camp-ink-muted">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        aria-label={label}
        className="w-full rounded-md border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-2 py-1.5 text-camp-ink placeholder:text-camp-ink-muted/60"
      />
    </label>
  );
}
