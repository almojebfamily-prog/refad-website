"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NewsItemFormSchema, type NewsItemFormState } from "@/lib/validation/news";

export async function saveNewsItem(
  _prevState: NewsItemFormState,
  formData: FormData
): Promise<NewsItemFormState> {
  await requireAdmin();

  const validatedFields = NewsItemFormSchema.safeParse({
    id: formData.get("id") || undefined,
    category: formData.get("category"),
    title: formData.get("title"),
    body: formData.get("body"),
    published_date: formData.get("published_date"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { id, category, title, body, published_date } = validatedFields.data;

  try {
    if (id) {
      await sql`
        UPDATE news_items
        SET category = ${category}, title = ${title}, body = ${body},
            published_date = ${published_date}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        INSERT INTO news_items (category, title, body, published_date)
        VALUES (${category}, ${title}, ${body}, ${published_date})
      `;
    }
  } catch {
    return { error: "تعذر حفظ الخبر." };
  }

  revalidatePath("/portal/admin/media/family-news");
  revalidatePath("/portal/admin/media/fund-news");
  revalidatePath("/media-center");
  return undefined;
}

export async function deleteNewsItem(id: string) {
  await requireAdmin();
  await sql`DELETE FROM news_items WHERE id = ${id}`;

  revalidatePath("/portal/admin/media/family-news");
  revalidatePath("/portal/admin/media/fund-news");
  revalidatePath("/media-center");
}
