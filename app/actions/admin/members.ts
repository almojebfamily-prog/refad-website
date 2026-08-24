"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { CreateMemberFormSchema, type MemberFormState } from "@/lib/validation/member";

export async function createMember(
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdmin();

  const validatedFields = CreateMemberFormSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { full_name, email, password, role } = validatedFields.data;
  const admin = createAdminClient();

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !created.user) {
    return { error: "تعذر إنشاء الحساب. تأكد من أن البريد الإلكتروني غير مستخدم." };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .insert({ id: created.user.id, full_name, role });

  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return { error: "تعذر إنشاء الملف الشخصي للعضو." };
  }

  revalidatePath("/portal/admin/members");
  return undefined;
}

export async function updateMemberRole(id: string, role: "member" | "admin") {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("profiles").update({ role }).eq("id", id);

  revalidatePath("/portal/admin/members");
}

export async function deleteMember(id: string) {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(id);

  revalidatePath("/portal/admin/members");
}
