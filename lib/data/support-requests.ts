import { sql } from "@/lib/db";
import type { SupportRequest } from "@/types/db";

export async function getMySupportRequests(profileId: string) {
  return (await sql`
    SELECT * FROM support_requests
    WHERE profile_id = ${profileId}
    ORDER BY created_at DESC
  `) as SupportRequest[];
}

export const supportRequestStatusLabels = {
  pending: "قيد المراجعة",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
  completed: "مكتمل",
} as const;
