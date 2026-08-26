"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import {
  MemberRequestFormSchema,
  type MemberRequestFormState,
} from "@/lib/validation/member-request";

export async function submitMemberRequest(
  _prevState: MemberRequestFormState,
  formData: FormData
): Promise<MemberRequestFormState> {
  const session = await requireUser();

  const validatedFields = MemberRequestFormSchema.safeParse({
    type: formData.get("type"),
    details: formData.get("details"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { type, details } = validatedFields.data;

  try {
    await sql`
      INSERT INTO member_requests (profile_id, type, details)
      VALUES (${session.sub}, ${type}, ${details})
    `;
  } catch {
    return { error: "تعذر إرسال الطلب، حاول مرة أخرى." };
  }

  revalidatePath("/portal/requests");
  return { success: true };
}
