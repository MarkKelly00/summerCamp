"use client";

/**
 * Prize shop client component — themed, wrapped in AppShell at the
 * page level.
 */

import { useState, useTransition } from "react";
import { Coins } from "lucide-react";

import { requestRedemption } from "@/lib/actions/rewards";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  requiresParentApproval: boolean;
  inventoryCount?: number;
}

interface Redemption {
  id: string;
  rewardName: string;
  cost: number;
  status: "pending" | "approved" | "fulfilled" | "rejected";
  code: string;
  notes?: string;
  createdAt: string;
}

interface Props {
  studentId: string;
  initialFunMoney: number;
  rewards: Reward[];
  redemptions: Redemption[];
}

const STATUS_TONE: Record<Redemption["status"], "warning" | "accent" | "positive" | "danger"> = {
  pending: "warning",
  approved: "accent",
  fulfilled: "positive",
  rejected: "danger",
};

const STATUS_LABEL: Record<Redemption["status"], string> = {
  pending: "Waiting for parent",
  approved: "Approved",
  fulfilled: "Delivered",
  rejected: "Rejected",
};

export function RewardsClient({
  studentId,
  initialFunMoney,
  rewards,
  redemptions: initialRedemptions,
}: Props) {
  const [funMoney, setFunMoney] = useState(initialFunMoney);
  const [redemptions, setRedemptions] = useState(initialRedemptions);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorByReward, setErrorByReward] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();

  const handleRequest = (reward: Reward) => {
    setPendingId(reward.id);
    setErrorByReward((m) => {
      const next = { ...m };
      delete next[reward.id];
      return next;
    });
    startTransition(async () => {
      const res = await requestRedemption({ studentId, rewardId: reward.id });
      setPendingId(null);
      if (!res.ok || !res.result) {
        setErrorByReward((m) => ({
          ...m,
          [reward.id]: res.error ?? "Could not redeem.",
        }));
        return;
      }
      setFunMoney(res.result.newFunMoney ?? funMoney);
      setRedemptions((prev) => [
        {
          id: res.result!.redemptionId,
          rewardName: res.result!.rewardName ?? reward.name,
          cost: reward.cost,
          status: res.result!.status,
          code: res.result!.code ?? "",
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    });
  };

  return (
    <div className="space-y-6">
      <CampCard className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <CampKicker>Prize shop</CampKicker>
          <h1 className="mt-1 text-2xl font-bold">Spend your Fun Money</h1>
          <p className="mt-1 text-sm text-camp-ink-muted">
            Pick something worth working for.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--camp-accent)]/40 bg-[var(--camp-accent)]/10 px-5 py-3">
          <div className="flex items-center gap-2 text-camp-ink-muted">
            <Coins className="h-4 w-4 text-[var(--camp-accent)]" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
              Fun Money
            </span>
          </div>
          <p className="text-3xl font-bold text-camp-ink">{funMoney}</p>
        </div>
      </CampCard>

      <section>
        <h2 className="sr-only">Available rewards</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rewards.map((r) => {
            const cantAfford = funMoney < r.cost;
            const isPending = pendingId === r.id;
            const err = errorByReward[r.id];
            return (
              <li key={r.id}>
                <CampCard className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{r.name}</h3>
                    <CampChip tone="accent">{r.cost} FM</CampChip>
                  </div>
                  <p className="mt-1 text-sm text-camp-ink-muted">
                    {r.description}
                  </p>
                  <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-widest text-camp-ink-muted/80">
                    {r.requiresParentApproval
                      ? "Parent approval required"
                      : "Auto-approved"}
                  </p>
                  <div className="mt-auto pt-4">
                    <CampButton
                      intent="primary"
                      onClick={() => handleRequest(r)}
                      disabled={cantAfford || isPending}
                      className="w-full"
                    >
                      {isPending
                        ? "Requesting..."
                        : cantAfford
                          ? `Need ${r.cost - funMoney} more`
                          : "Request"}
                    </CampButton>
                  </div>
                  {err ? (
                    <p
                      role="alert"
                      className="mt-2 rounded-md border border-[var(--camp-danger)]/40 bg-[var(--camp-danger)]/10 px-3 py-2 text-xs text-camp-ink"
                    >
                      {err}
                    </p>
                  ) : null}
                </CampCard>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Your requests</h2>
        {redemptions.length === 0 ? (
          <p className="mt-2 text-sm text-camp-ink-muted">
            No reward requests yet. Save up and pick a prize when you&apos;re
            ready.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {redemptions.map((r) => (
              <li key={r.id}>
                <CampCard className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{r.rewardName}</p>
                    <p className="text-xs text-camp-ink-muted">
                      Code <span className="font-mono">{r.code}</span> · {r.cost}{" "}
                      FM
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
                </CampCard>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
