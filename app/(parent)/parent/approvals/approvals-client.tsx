"use client";

/**
 * Parent approval queue client. Themed, lives inside AppShell.
 */

import { useState, useTransition } from "react";

import {
  approveRedemption,
  fulfillRedemption,
  rejectRedemption,
  type RewardActionState,
} from "@/lib/actions/rewards";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

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

const STATUS_TONE: Record<Redemption["status"], "warning" | "accent" | "positive" | "danger"> = {
  pending: "warning",
  approved: "accent",
  fulfilled: "positive",
  rejected: "danger",
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
      setErrorById((m) => ({ ...m, [id]: res.error ?? "Action failed." }));
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
          ? { ...r, status: newStatus, notes: noteById[id] || r.notes }
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
    <div className="space-y-6">
      <CampCard>
        <CampKicker>Approval queue</CampKicker>
        <h1 className="mt-1 text-2xl font-bold">Rewards waiting on you</h1>
        <p className="mt-1 text-sm text-camp-ink-muted">
          Approve, reject, or mark rewards delivered. Rejections refund
          the kid&apos;s Fun Money automatically.
        </p>
      </CampCard>

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
    </div>
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
      <section>
        <h2 className="mb-3 text-xl font-bold">{title}</h2>
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={r.id}>
              <CampCard className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{r.rewardName}</p>
                    <p className="text-xs text-camp-ink-muted">
                      For{" "}
                      <span className="font-medium text-camp-ink">
                        {r.studentName}
                      </span>{" "}
                      · {r.cost} FM · Code{" "}
                      <span className="font-mono">{r.code}</span>
                    </p>
                    {r.notes ? (
                      <p className="mt-1 text-xs text-camp-ink-muted">
                        Note: {r.notes}
                      </p>
                    ) : null}
                  </div>
                  <CampChip tone={STATUS_TONE[r.status]}>
                    {STATUS_LABEL[r.status]}
                  </CampChip>
                </div>
                {children(r)}
              </CampCard>
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
        placeholder="Optional note for the kid..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        maxLength={500}
        className="w-full rounded-md border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-1.5 text-sm text-camp-ink placeholder:text-camp-ink-muted/60 focus:border-[var(--camp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--camp-accent)]"
      />
      <div className="flex flex-wrap gap-2">
        <CampButton
          intent="primary"
          size="sm"
          onClick={primary.onClick}
          disabled={disabled}
        >
          {primary.label}
        </CampButton>
        {secondary ? (
          <CampButton
            intent="danger"
            size="sm"
            onClick={secondary.onClick}
            disabled={disabled}
          >
            {secondary.label}
          </CampButton>
        ) : null}
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-md border border-[var(--camp-danger)]/40 bg-[var(--camp-danger)]/10 px-3 py-2 text-xs text-camp-ink"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
