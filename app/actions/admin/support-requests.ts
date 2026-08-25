"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { SupportRequestStatus } from "@/types/db";

export async function updateSupportRequestStatus(
  id: string,
  status: SupportRequestStatus
) {
  await requireAdmin();
  await sql`UPDATE support_requests SET status = ${status} WHERE id = ${id}`;

  revalidatePath("/portal/admin/support-requests");
  revalidatePath("/portal/admin");
  revalidatePath("/portal/services");
}
