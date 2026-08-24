"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ContactMessageStatus } from "@/types/database.types";

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus
) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);

  revalidatePath("/portal/admin/messages");
}
