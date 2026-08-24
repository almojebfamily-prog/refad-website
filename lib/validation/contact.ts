import * as z from "zod";

export const ContactFormSchema = z.object({
  full_name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  mobile: z
    .string()
    .trim()
    .min(9, "الرجاء إدخال رقم جوال صحيح."),
  subject: z.string().trim().min(2, "الرجاء إدخال موضوع الرسالة."),
  message: z.string().trim().min(10, "الرجاء كتابة رسالة لا تقل عن 10 أحرف."),
});

export type ContactFormState =
  | {
      errors?: Partial<Record<keyof z.infer<typeof ContactFormSchema>, string[]>>;
      success?: boolean;
      message?: string;
    }
  | undefined;
