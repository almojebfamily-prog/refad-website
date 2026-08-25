import { sql } from "@/lib/db";
import type { Subscription } from "@/types/db";

export async function getMySubscriptions(profileId: string) {
  return (await sql`
    SELECT * FROM subscriptions
    WHERE profile_id = ${profileId}
    ORDER BY start_date DESC
  `) as Subscription[];
}

export const subscriptionStatusLabels = {
  active: "نشط",
  pending: "قيد الانتظار",
  expired: "منتهي",
} as const;

export const subscriptionStatusStyles = {
  active: "bg-primary-50 text-primary-700",
  pending: "bg-gold-50 text-gold-600",
  expired: "bg-neutral-200 text-neutral-600",
} as const;
