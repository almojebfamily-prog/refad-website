"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { ContactMessageStatus } from "@/types/db";

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus
) {
  await requireAdmin();
  await sql`UPDATE contact_messages SET status = ${status} WHERE id = ${id}`;

  revalidatePath("/portal/admin/messages");
}
