import * as z from "zod";

export const CreateMemberFormSchema = z.object({
  full_name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  email: z.email("الرجاء إدخال بريد إلكتروني صحيح."),
  password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل."),
  role: z.enum(["member", "admin"]),
});

export type MemberFormState = { error?: string } | undefined;
