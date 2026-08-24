"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  FamilyMemberFormSchema,
  type FamilyMemberFormState,
} from "@/lib/validation/family-member";

export async function saveFamilyMember(
  _prevState: FamilyMemberFormState,
  formData: FormData
): Promise<FamilyMemberFormState> {
  await requireAdmin();

  const validatedFields = FamilyMemberFormSchema.safeParse({
    id: formData.get("id") || undefined,
    full_name: formData.get("full_name"),
    gender: formData.get("gender"),
    birth_date: formData.get("birth_date"),
    father_id: formData.get("father_id"),
    mother_id: formData.get("mother_id"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, ...values } = validatedFields.data;
  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("family_members").update(values).eq("id", id)
    : await supabase.from("family_members").insert(values);

  if (error) return { error: "تعذر حفظ البيانات." };

  revalidatePath("/portal/admin/family-members");
  revalidatePath("/portal/family-tree");
  return undefined;
}

export async function deleteFamilyMember(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("family_members").delete().eq("id", id);

  revalidatePath("/portal/admin/family-members");
  revalidatePath("/portal/family-tree");
}
