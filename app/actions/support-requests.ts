"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import {
  SupportRequestFormSchema,
  type SupportRequestFormState,
} from "@/lib/validation/support-request";

export async function submitSupportRequest(
  _prevState: SupportRequestFormState,
  formData: FormData
): Promise<SupportRequestFormState> {
  const session = await requireUser();

  const validatedFields = SupportRequestFormSchema.safeParse({
    initiative_id: formData.get("initiative_id"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { initiative_id, description } = validatedFields.data;

  try {
    await sql`
      INSERT INTO support_requests (profile_id, initiative_id, description)
      VALUES (${session.sub}, ${initiative_id}, ${description})
    `;
  } catch {
    return { error: "تعذر إرسال الطلب، حاول مرة أخرى." };
  }

  revalidatePath("/portal/services");
  return { success: true };
}
