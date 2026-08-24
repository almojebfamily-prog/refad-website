import { createClient } from "@/lib/supabase/server";

export async function getMySubscriptions(profileId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("profile_id", profileId)
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
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
