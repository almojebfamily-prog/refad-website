import * as z from "zod";

export const ProfileFormSchema = z.object({
  full_name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  phone: z.string().trim().optional(),
});

export type ProfileFormState =
  | {
      error?: string;
      success?: boolean;
    }
  | undefined;
