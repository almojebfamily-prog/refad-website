import { createClient } from "@/lib/supabase/server";

export async function getMySupportRequests(profileId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("support_requests")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export const supportRequestStatusLabels = {
  pending: "قيد المراجعة",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
  completed: "مكتمل",
} as const;
