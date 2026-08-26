import * as z from "zod";
import { NationalIdSchema } from "@/lib/validation/profile";

export const RegistrationRequestFormSchema = z.object({
  full_name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  national_id: NationalIdSchema,
  phone: z.string().trim().min(9, "الرجاء إدخال رقم جوال صحيح."),
  email: z.email("الرجاء إدخال بريد إلكتروني صحيح."),
});

export type RegistrationRequestFormState =
  | {
      error?: string;
      success?: boolean;
    }
  | undefined;
