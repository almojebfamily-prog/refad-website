"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
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

  const { id, full_name, role_title, bio, order_index } = validatedFields.data;

  try {
    if (id) {
      await sql`
        UPDATE board_members
        SET full_name = ${full_name}, role_title = ${role_title},
            bio = ${bio ?? null}, order_index = ${order_index}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        INSERT INTO board_members (full_name, role_title, bio, order_index)
        VALUES (${full_name}, ${role_title}, ${bio ?? null}, ${order_index})
      `;
    }
  } catch {
    return { error: "تعذر حفظ البيانات." };
  }

  revalidatePath("/portal/admin/board");
  revalidatePath("/refad-fund/board-of-trustees");
  return undefined;
}

export async function deleteBoardMember(id: string) {
  await requireAdmin();
  await sql`DELETE FROM board_members WHERE id = ${id}`;

  revalidatePath("/portal/admin/board");
  revalidatePath("/refad-fund/board-of-trustees");
}
