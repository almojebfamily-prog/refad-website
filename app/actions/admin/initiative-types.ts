"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import {
  InitiativeTypeFormSchema,
  type InitiativeTypeFormState,
} from "@/lib/validation/initiative-type";

export async function saveInitiativeType(
  _prevState: InitiativeTypeFormState,
  formData: FormData
): Promise<InitiativeTypeFormState> {
  await requireAdmin();

  const validatedFields = InitiativeTypeFormSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    order_index: formData.get("order_index") || 0,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, title, order_index } = validatedFields.data;

  try {
    if (id) {
      await sql`
        UPDATE initiative_types
        SET title = ${title}, order_index = ${order_index}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        INSERT INTO initiative_types (title, order_index)
        VALUES (${title}, ${order_index})
      `;
    }
  } catch {
    return { error: "تعذر حفظ البيانات." };
  }

  revalidatePath("/portal/admin/initiative-types");
  revalidatePath("/portal/admin/initiatives");
  revalidatePath("/refad-fund/initiatives");
  revalidatePath("/portal/services");
  return undefined;
}

export async function toggleInitiativeTypePublished(id: string, isPublished: boolean) {
  await requireAdmin();
  await sql`UPDATE initiative_types SET is_published = ${isPublished} WHERE id = ${id}`;

  revalidatePath("/portal/admin/initiative-types");
  revalidatePath("/refad-fund/initiatives");
}

export async function deleteInitiativeType(id: string) {
  await requireAdmin();
  await sql`DELETE FROM initiative_types WHERE id = ${id}`;

  revalidatePath("/portal/admin/initiative-types");
  revalidatePath("/portal/admin/initiatives");
  revalidatePath("/refad-fund/initiatives");
  revalidatePath("/portal/services");
}
