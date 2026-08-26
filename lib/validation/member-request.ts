import * as z from "zod";

export const MemberRequestFormSchema = z.object({
  type: z.enum(["news", "family_member", "other"]),
  details: z.string().trim().min(10, "الرجاء وصف الطلب بما لا يقل عن 10 أحرف."),
});

export type MemberRequestFormState =
  | {
      error?: string;
      success?: boolean;
    }
  | undefined;
