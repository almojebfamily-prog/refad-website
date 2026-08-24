"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ProfileFormSchema, type ProfileFormState } from "@/lib/validation/profile";

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const user = await requireUser();

  const validatedFields = ProfileFormSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update(validatedFields.data)
    .eq("id", user.id);

  if (error) {
    return { error: "تعذر حفظ التغييرات، حاول مرة أخرى." };
  }

  revalidatePath("/portal/profile");
  return { success: true };
}
