import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { AppShell } from "@/components/ui/AppShell";
import { RewardEditor } from "@/components/admin/RewardEditor";

export const dynamic = "force-dynamic";

export default async function NewRewardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  return (
    <AppShell
      identity={{ line1: "New reward", line2: "Configure cost + approval rules" }}
      nav={[
        { href: "/admin/rewards", label: "Catalog" },
        { href: "/admin/lessons", label: "Lessons" },
      ]}
    >
      <RewardEditor mode="create" initial={{}} />
    </AppShell>
  );
}
