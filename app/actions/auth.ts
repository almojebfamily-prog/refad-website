"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ForgotPasswordFormSchema,
  LoginFormSchema,
  type ForgotPasswordFormState,
  type LoginFormState,
} from "@/lib/validation/auth";

export async function login(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(
    validatedFields.data
  );

  if (error) {
    return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
  }

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/portal") ? next : "/portal");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(
  _prevState: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(validatedFields.data.email);

  // Always report success to avoid leaking which emails have accounts.
  return { success: true };
}
