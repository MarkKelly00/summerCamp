"use client";

/**
 * Parent approval queue client.
 *
 * Three actions per row depending on status:
 *   - pending  → Approve / Reject (with optional note)
 *   - approved → Fulfill (with optional note)
 *   - fulfilled/rejected → read-only
 *
 * Updates the local list optimistically once the Server Action resolves.
 */

import { useState, useTransition } from "react";
import Link from "next/link";

import {
  approveRedemption,
  fulfillRedemption,
  rejectRedemption,
  type RewardActionState,
} from "@/lib/actions/rewards";

interface Redemption {
  id: string;
  studentId: string;
  studentName: string;
  rewardName: string;
  cost: number;
  status: "pending" | "approved" | "fulfilled" | "rejected";
  code: string;
  notes?: string;
  createdAt: string;
}

const STATUS_CHIP: Record<Redemption["status"], string> = {
  pending: "bg-amber-50 text-amber-900 border-amber-200",
  approved: "bg-sky-50 text-sky-900 border-sky-200",
  fulfilled: "bg-emerald-50 text-emerald-900 border-emerald-200",
  rejected: "bg-rose-50 text-rose-900 border-rose-200",
};

const STATUS_LABEL: Record<Redemption["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  fulfilled: "Fulfilled",
  rejected: "Rejected",
};

interface Props {
  initialRedemptions: Redemption[];
}

export function ApprovalsClient({ initialRedemptions }: Props) {
  const [redemptions, setRedemptions] = useState(initialRedemptions);
  const [noteById, setNoteById] = useState<Record<string, string>>({});
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorById, setErrorById] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();

  const applyResult = (
    id: string,
    res: RewardActionState,
    newStatus: Redemption["status"],
  ) => {
    if (!res.ok) {
      setErrorById((m) => ({
        ...m,
        [id]: res.error ?? "Action failed.",
      }));
      return;
    }
    setErrorById((m) => {
      const next = { ...m };
      delete next[id];
      return next;
    });
    setRedemptions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              notes: noteById[id] || r.notes,
            }
          : r,
      ),
    );
    setNoteById((m) => {
      const next = { ...m };
      delete next[id];
      return next;
    });
  };

  const handleAction = (
    id: string,
    fn: typeof approveRedemption,
    newStatus: Redemption["status"],
  ) => {
    setPendingId(id);
    const notes = noteById[id] || undefined;
    startTransition(async () => {
      const res = await fn({ redemptionId: id, notes });
      setPendingId(null);
      applyResult(id, res, newStatus);
    });
  };

  const pending = redemptions.filter((r) => r.status === "pending");
  const approved = redemptions.filter((r) => r.status === "approved");
  const history = redemptions.filter(
    (r) => r.status === "fulfilled" || r.status === "rejected",
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Parent
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Reward approval queue
          </h1>
          <p className="mt-2 text-slate-600">
            Approve, reject, or mark rewards delivered. Rejections refund the
            kid&apos;s Fun Money automatically.
          </p>
        </div>
        <Link
          href="/parent/dashboard"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Dashboard
        </Link>
      </header>

      <Section title="Pending" items={pending}>
        {(r) => (
          <ApprovalActions
            id={r.id}
            note={noteById[r.id] ?? ""}
            disabled={pendingId === r.id}
            error={errorById[r.id]}
            onNoteChange={(v) => setNoteById((m) => ({ ...m, [r.id]: v }))}
            primary={{
              label: "Approve",
              onClick: () => handleAction(r.id, approveRedemption, "approved"),
            }}
            secondary={{
              label: "Reject + refund",
              onClick: () => handleAction(r.id, rejectRedemption, "rejected"),
            }}
          />
        )}
      </Section>

      <Section title="Approved — waiting to fulfill" items={approved}>
        {(r) => (
          <ApprovalActions
            id={r.id}
            note={noteById[r.id] ?? ""}
            disabled={pendingId === r.id}
            error={errorById[r.id]}
            onNoteChange={(v) => setNoteById((m) => ({ ...m, [r.id]: v }))}
            primary={{
              label: "Mark fulfilled",
              onClick: () => handleAction(r.id, fulfillRedemption, "fulfilled"),
            }}
          />
        )}
      </Section>

      <Section title="History" items={history}>
        {() => null}
      </Section>
    </main>
  );

  function Section({
    title,
    items,
    children,
  }: {
    title: string;
    items: Redemption[];
    children: (r: Redemption) => React.ReactNode;
  }) {
    if (items.length === 0) return null;
    return (
      <section className="mt-10">
        <h2 className="text-xl font-bold">{title}</h2>
        <ul className="mt-3 space-y-3">
          {items.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.rewardName}</p>
                  <p className="text-xs text-slate-500">
                    For <span className="font-medium text-slate-700">{r.studentName}</span>
                    {" · "}
                    {r.cost} FM · Code{" "}
                    <span className="font-mono">{r.code}</span>
                  </p>
                  {r.notes ? (
                    <p className="mt-1 text-xs text-slate-600">
                      Note: {r.notes}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_CHIP[r.status]}`}
                >
                  {STATUS_LABEL[r.status]}
                </span>
              </div>
              <div className="mt-3">{children(r)}</div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

function ApprovalActions({
  id,
  note,
  disabled,
  error,
  onNoteChange,
  primary,
  secondary,
}: {
  id: string;
  note: string;
  disabled: boolean;
  error?: string;
  onNoteChange: (v: string) => void;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={`note-${id}`} className="sr-only">
        Note
      </label>
      <input
        id={`note-${id}`}
        type="text"
        placeholder="Optional note for the kid (e.g., why approved/rejected)..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        maxLength={500}
        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={primary.onClick}
          disabled={disabled}
          className="rounded-md bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-60"
        >
          {primary.label}
        </button>
        {secondary ? (
          <button
            type="button"
            onClick={secondary.onClick}
            disabled={disabled}
            className="rounded-md border border-rose-300 px-4 py-1.5 text-sm font-medium text-rose-800 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-900 disabled:opacity-60"
          >
            {secondary.label}
          </button>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
