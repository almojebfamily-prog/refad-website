"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { MemberRequestStatus } from "@/types/db";

export async function updateMemberRequest(
  id: string,
  status: MemberRequestStatus,
  adminComment: string
) {
  await requireAdmin();
  await sql`
    UPDATE member_requests
    SET status = ${status}, admin_comment = ${adminComment.trim() || null}
    WHERE id = ${id}
  `;

  revalidatePath("/portal/admin/member-requests");
  revalidatePath("/portal/requests");
}
