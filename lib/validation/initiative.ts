import * as z from "zod";

export const InitiativeFormSchema = z.object({
  id: z.string().trim().optional(),
  category: z.enum([
    "social_support",
    "scientific_excellence",
    "gatherings",
    "investment",
  ]),
  title: z.string().trim().min(2, "الرجاء إدخال عنوان المبادرة."),
  description: z.string().trim().min(5, "الرجاء إدخال وصف المبادرة."),
  order_index: z.coerce.number().int().default(0),
});

export type InitiativeFormState = { error?: string } | undefined;
