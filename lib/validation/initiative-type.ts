import * as z from "zod";
import { isValidIconName } from "@/components/shared/InitiativeIcon";

const emptyToUndefined = (v: unknown) => (v === "" ? undefined : v);

export const InitiativeTypeFormSchema = z.object({
  id: z.string().trim().optional(),
  title: z.string().trim().min(2, "الرجاء إدخال اسم النوع."),
  description: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  icon: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .refine(isValidIconName, "اسم الأيقونة غير صحيح — راجع lucide.dev/icons.")
      .optional()
  ),
  order_index: z.coerce.number().int().default(0),
});

export type InitiativeTypeFormState = { error?: string } | undefined;
