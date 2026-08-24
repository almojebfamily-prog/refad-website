"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { InitiativeFormSchema, type InitiativeFormState } from "@/lib/validation/initiative";

export async function saveInitiative(
  _prevState: InitiativeFormState,
  formData: FormData
): Promise<InitiativeFormState> {
  await requireAdmin();

  const validatedFields = InitiativeFormSchema.safeParse({
    id: formData.get("id") || undefined,
    category: formData.get("category"),
    title: formData.get("title"),
    description: formData.get("description"),
    order_index: formData.get("order_index") || 0,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, ...values } = validatedFields.data;
  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("initiatives").update(values).eq("id", id)
    : await supabase.from("initiatives").insert(values);

  if (error) return { error: "تعذر حفظ البيانات." };

  revalidatePath("/portal/admin/initiatives");
  revalidatePath("/refad-fund/initiatives");
  revalidatePath("/portal/services");
  return undefined;
}

export async function deleteInitiative(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("initiatives").delete().eq("id", id);

  revalidatePath("/portal/admin/initiatives");
  revalidatePath("/refad-fund/initiatives");
  revalidatePath("/portal/services");
}
