"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
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
    national_id: formData.get("national_id"),
    gender: formData.get("gender"),
    birth_date: formData.get("birth_date"),
    father_id: formData.get("father_id"),
    mother_id: formData.get("mother_id"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, full_name, national_id, gender, birth_date, father_id, mother_id } =
    validatedFields.data;

  try {
    if (id) {
      await sql`
        UPDATE family_members
        SET full_name = ${full_name}, national_id = ${national_id ?? null}, gender = ${gender},
            birth_date = ${birth_date ?? null}, father_id = ${father_id ?? null},
            mother_id = ${mother_id ?? null}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        INSERT INTO family_members (full_name, national_id, gender, birth_date, father_id, mother_id)
        VALUES (${full_name}, ${national_id ?? null}, ${gender}, ${birth_date ?? null}, ${father_id ?? null}, ${mother_id ?? null})
      `;
    }
  } catch {
    return { error: "تعذر حفظ البيانات." };
  }

  revalidatePath("/portal/admin/family-members");
  revalidatePath("/portal/family-tree");
  return undefined;
}

export async function deleteFamilyMember(id: string) {
  await requireAdmin();
  await sql`DELETE FROM family_members WHERE id = ${id}`;

  revalidatePath("/portal/admin/family-members");
  revalidatePath("/portal/family-tree");
}
