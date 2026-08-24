"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { BoardMemberFormSchema, type BoardMemberFormState } from "@/lib/validation/board";

export async function saveBoardMember(
  _prevState: BoardMemberFormState,
  formData: FormData
): Promise<BoardMemberFormState> {
  await requireAdmin();

  const validatedFields = BoardMemberFormSchema.safeParse({
    id: formData.get("id") || undefined,
    full_name: formData.get("full_name"),
    role_title: formData.get("role_title"),
    bio: formData.get("bio") || undefined,
    order_index: formData.get("order_index") || 0,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, ...values } = validatedFields.data;
  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("board_members").update(values).eq("id", id)
    : await supabase.from("board_members").insert(values);

  if (error) return { error: "تعذر حفظ البيانات." };

  revalidatePath("/portal/admin/board");
  revalidatePath("/refad-fund/board-of-trustees");
  return undefined;
}

export async function deleteBoardMember(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("board_members").delete().eq("id", id);

  revalidatePath("/portal/admin/board");
  revalidatePath("/refad-fund/board-of-trustees");
}
