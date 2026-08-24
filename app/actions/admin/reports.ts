"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ReportFormSchema, type ReportFormState } from "@/lib/validation/report";

export async function createReport(
  _prevState: ReportFormState,
  formData: FormData
): Promise<ReportFormState> {
  await requireAdmin();

  const validatedFields = ReportFormSchema.safeParse({
    type: formData.get("type"),
    title: formData.get("title"),
    period_label: formData.get("period_label") || undefined,
    published_date: formData.get("published_date"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "الرجاء اختيار ملف التقرير (PDF)." };
  }

  const supabase = await createClient();
  const path = `${validatedFields.data.type}/${crypto.randomUUID()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("reports")
    .upload(path, file);

  if (uploadError) {
    return { error: "تعذر رفع الملف." };
  }

  const { error } = await supabase.from("reports").insert({
    ...validatedFields.data,
    file_url: `reports/${path}`,
  });

  if (error) return { error: "تعذر حفظ بيانات التقرير." };

  revalidatePath("/portal/admin/reports");
  revalidatePath("/refad-fund/reports");
  return undefined;
}

export async function deleteReport(id: string, fileUrl: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage
    .from("reports")
    .remove([fileUrl.replace(/^reports\//, "")]);
  await supabase.from("reports").delete().eq("id", id);

  revalidatePath("/portal/admin/reports");
  revalidatePath("/refad-fund/reports");
}
