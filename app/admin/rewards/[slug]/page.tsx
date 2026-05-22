import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Reward } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { RewardEditor } from "@/components/admin/RewardEditor";

export const dynamic = "force-dynamic";

export default async function EditRewardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  const { slug } = await params;
  await connectToDatabase();
  const reward = await Reward.findOne({ slug }).lean();
  if (!reward) notFound();

  return (
    <AppShell
      identity={{
        line1: `Edit · ${reward.slug ?? slug}`,
        line2: reward.name,
      }}
      nav={[
        { href: "/admin/rewards", label: "Catalog" },
        { href: "/admin/lessons", label: "Lessons" },
      ]}
    >
      <RewardEditor
        mode="edit"
        initial={{
          slug: reward.slug,
          name: reward.name,
          description: reward.description,
          cost: reward.cost,
          image: reward.image,
          category: reward.category,
          inventoryCount: reward.inventoryCount,
          requiresParentApproval: reward.requiresParentApproval,
          approvalThreshold: reward.approvalThreshold,
          active: reward.active,
        }}
      />
    </AppShell>
  );
}
