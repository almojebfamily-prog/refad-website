import * as z from "zod";

export const SupportRequestFormSchema = z.object({
  initiative_id: z.string().trim().min(1, "الرجاء اختيار نوع الخدمة."),
  description: z.string().trim().min(10, "الرجاء وصف الطلب بما لا يقل عن 10 أحرف."),
});

export type SupportRequestFormState =
  | {
      error?: string;
      success?: boolean;
    }
  | undefined;
