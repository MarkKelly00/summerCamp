"use client";

/**
 * RewardEditor — single-page form for creating or editing a reward.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  setRewardActive,
  upsertReward,
  type AdminRewardState,
} from "@/lib/actions/admin-rewards";
import {
  REWARD_CATEGORIES,
  type RewardUpsertInput,
} from "@/lib/schemas/reward";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

interface Initial extends Partial<RewardUpsertInput> {
  slug?: string;
  active?: boolean;
}

interface Props {
  initial: Initial;
  mode: "create" | "edit";
}

export function RewardEditor({ initial, mode }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<AdminRewardState | null>(null);

  const [slug, setSlug] = useState(initial.slug ?? "");
  const [name, setName] = useState(initial.name ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [cost, setCost] = useState(initial.cost ?? 100);
  const [image, setImage] = useState(initial.image ?? "");
  const [category, setCategory] = useState<
    (typeof REWARD_CATEGORIES)[number]
  >((initial.category as (typeof REWARD_CATEGORIES)[number]) ?? "custom");
  const [inventoryCount, setInventoryCount] = useState<number | "">(
    initial.inventoryCount ?? "",
  );
  const [requiresApproval, setRequiresApproval] = useState(
    initial.requiresParentApproval ?? true,
  );
  const [approvalThreshold, setApprovalThreshold] = useState<number | "">(
    initial.approvalThreshold ?? "",
  );
  const [active, setActive] = useState(initial.active ?? true);

  const submit = () => {
    const payload: RewardUpsertInput = {
      slug: slug.trim(),
      name: name.trim(),
      description: description.trim(),
      cost,
      image: image.trim() || undefined,
      category,
      inventoryCount: inventoryCount === "" ? undefined : Number(inventoryCount),
      requiresParentApproval: requiresApproval,
      approvalThreshold:
        approvalThreshold === "" ? undefined : Number(approvalThreshold),
      active,
    };
    startTransition(async () => {
      const res = await upsertReward(payload);
      setState(res);
      if (res.ok && mode === "create") {
        router.push(`/admin/rewards/${res.slug}`);
      } else {
        router.refresh();
      }
    });
  };

  const toggle = (next: boolean) => {
    if (!initial.slug) return;
    startTransition(async () => {
      const res = await setRewardActive(initial.slug!, next);
      setState(res);
      router.refresh();
      if (res.ok) setActive(next);
    });
  };

  return (
    <div className="space-y-4">
      {state ? (
        <div
          role={state.ok ? "status" : "alert"}
          className={`rounded-lg border px-4 py-2 text-sm ${
            state.ok
              ? "border-[var(--camp-positive)]/50 bg-[var(--camp-positive)]/10"
              : "border-[var(--camp-danger)]/50 bg-[var(--camp-danger)]/10"
          }`}
        >
          {state.ok ? `Saved · ${state.slug ?? ""}` : state.error}
        </div>
      ) : null}

      <CampCard className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CampChip tone={active ? "positive" : "warning"}>
            {active ? "Active" : "Inactive"}
          </CampChip>
          <div className="flex gap-2">
            <CampButton intent="primary" onClick={submit} disabled={pending}>
              {pending ? "Saving..." : mode === "create" ? "Create" : "Save"}
            </CampButton>
            {mode === "edit" && initial.slug ? (
              <CampButton
                intent="ghost"
                onClick={() => toggle(!active)}
                disabled={pending}
              >
                {active ? "Deactivate" : "Activate"}
              </CampButton>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Slug">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="input"
              readOnly={mode === "edit"}
              placeholder="cold-stone"
            />
          </Field>
          <Field label="Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Description" full>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="input"
            />
          </Field>
          <Field label="Cost (Fun Money)">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              min={0}
              className="input"
            />
          </Field>
          <Field label="Category">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as (typeof REWARD_CATEGORIES)[number])
              }
              className="input"
            >
              {REWARD_CATEGORIES.map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-[var(--camp-surface)] text-camp-ink"
                >
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Image token (optional)">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input"
              placeholder="fiiz / happy-meal / shoes"
            />
          </Field>
          <Field label="Inventory (blank = unlimited)">
            <input
              type="number"
              value={inventoryCount}
              onChange={(e) =>
                setInventoryCount(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              min={0}
              className="input"
            />
          </Field>
          <Field label="Requires parent approval">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={requiresApproval}
                onChange={(e) => setRequiresApproval(e.target.checked)}
                className="h-4 w-4 accent-[var(--camp-accent)]"
              />
              Yes
            </label>
          </Field>
          <Field label="Approval threshold (override; blank = use default)">
            <input
              type="number"
              value={approvalThreshold}
              onChange={(e) =>
                setApprovalThreshold(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              min={0}
              className="input"
            />
          </Field>
          <Field label="Active">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 accent-[var(--camp-accent)]"
              />
              Visible in prize shop
            </label>
          </Field>
        </div>
      </CampCard>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: var(--camp-surface-soft);
          color: var(--camp-ink);
          border: 1px solid var(--camp-border);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--camp-accent);
          box-shadow: 0 0 0 1px var(--camp-accent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block space-y-1 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-camp-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
