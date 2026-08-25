"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { ProfileFormSchema, type ProfileFormState } from "@/lib/validation/profile";

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const session = await requireUser();

  const validatedFields = ProfileFormSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { full_name, phone } = validatedFields.data;

  try {
    await sql`
      UPDATE profiles
      SET full_name = ${full_name}, phone = ${phone ?? null}
      WHERE id = ${session.sub}
    `;
  } catch {
    return { error: "تعذر حفظ التغييرات، حاول مرة أخرى." };
  }

  revalidatePath("/portal/profile");
  return { success: true };
}
