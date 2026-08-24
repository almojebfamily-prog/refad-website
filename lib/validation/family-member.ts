import * as z from "zod";

const emptyToUndefined = (v: unknown) => (v === "" ? undefined : v);

export const FamilyMemberFormSchema = z.object({
  id: z.string().trim().optional(),
  full_name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل."),
  gender: z.enum(["male", "female"]),
  birth_date: z.preprocess(emptyToUndefined, z.string().optional()),
  father_id: z.preprocess(emptyToUndefined, z.string().optional()),
  mother_id: z.preprocess(emptyToUndefined, z.string().optional()),
});

export type FamilyMemberFormState = { error?: string } | undefined;
