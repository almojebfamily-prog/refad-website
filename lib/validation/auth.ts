import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("الرجاء إدخال بريد إلكتروني صحيح.").trim(),
  password: z.string().min(1, "الرجاء إدخال كلمة المرور."),
});

export type LoginFormState =
  | {
      error?: string;
    }
  | undefined;

export const ForgotPasswordFormSchema = z.object({
  email: z.email("الرجاء إدخال بريد إلكتروني صحيح.").trim(),
});

export type ForgotPasswordFormState =
  | {
      error?: string;
      success?: boolean;
    }
  | undefined;
