"use client";

/**
 * Prize shop client component.
 *
 * Owns the optimistic UI for redemption requests. When the student taps
 * "Request", we call `requestRedemption` and reflect the new balance +
 * new history row inline. Server is the source of truth — we don't
 * pre-deduct locally; we wait for the action and apply the result.
 */

import { useState, useTransition } from "react";
import Link from "next/link";

import { requestRedemption } from "@/lib/actions/rewards";

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

const STATUS_CHIP: Record<Redemption["status"], string> = {
  pending: "bg-amber-50 text-amber-900 border-amber-200",
  approved: "bg-sky-50 text-sky-900 border-sky-200",
  fulfilled: "bg-emerald-50 text-emerald-900 border-emerald-200",
  rejected: "bg-rose-50 text-rose-900 border-rose-200",
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
  const [errorByReward, setErrorByReward] = useState<Record<string, string>>(
    {},
  );
  const [, startTransition] = useTransition();

  const handleRequest = (reward: Reward) => {
    setPendingId(reward.id);
    setErrorByReward((m) => {
      const next = { ...m };
      delete next[reward.id];
      return next;
    });
    startTransition(async () => {
      const res = await requestRedemption({
        studentId,
        rewardId: reward.id,
      });
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
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Prize shop
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="mt-2 text-slate-600">
            Spend your Fun Money on something worth working for.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Fun Money
          </p>
          <p className="text-3xl font-bold">{funMoney}</p>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="sr-only">Available rewards</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rewards.map((r) => {
            const cantAfford = funMoney < r.cost;
            const isPending = pendingId === r.id;
            const err = errorByReward[r.id];
            return (
              <li
                key={r.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                    {r.cost} FM
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {r.requiresParentApproval
                    ? "Parent approval required."
                    : "Auto-approved."}
                </p>
                <button
                  type="button"
                  onClick={() => handleRequest(r)}
                  disabled={cantAfford || isPending}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending
                    ? "Requesting..."
                    : cantAfford
                      ? `Need ${r.cost - funMoney} more`
                      : "Request"}
                </button>
                {err ? (
                  <p
                    role="alert"
                    className="mt-2 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-800"
                  >
                    {err}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Your requests</h2>
        {redemptions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">
            No reward requests yet. Save up and pick a prize when you&apos;re
            ready.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {redemptions.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{r.rewardName}</p>
                  <p className="text-xs text-slate-500">
                    Code: <span className="font-mono">{r.code}</span> · Cost: {r.cost}{" "}
                    FM
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
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-12 text-sm">
        <Link
          href="/student/dashboard"
          className="text-slate-600 underline-offset-2 hover:underline"
        >
          ← Back to camp
        </Link>
      </p>
    </main>
  );
}
