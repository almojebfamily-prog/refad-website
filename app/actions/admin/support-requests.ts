"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { SupportRequestStatus } from "@/types/db";

export async function updateSupportRequest(
  id: string,
  status: SupportRequestStatus,
  adminComment: string
) {
  await requireAdmin();
  await sql`
    UPDATE support_requests
    SET status = ${status}, admin_comment = ${adminComment.trim() || null}
    WHERE id = ${id}
  `;

  revalidatePath("/portal/admin/support-requests");
  revalidatePath("/portal/admin");
  revalidatePath("/portal/services");
}
