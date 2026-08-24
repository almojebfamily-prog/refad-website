"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  SupportRequestFormSchema,
  type SupportRequestFormState,
} from "@/lib/validation/support-request";

export async function submitSupportRequest(
  _prevState: SupportRequestFormState,
  formData: FormData
): Promise<SupportRequestFormState> {
  const user = await requireUser();

  const validatedFields = SupportRequestFormSchema.safeParse({
    initiative_id: formData.get("initiative_id"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("support_requests").insert({
    profile_id: user.id,
    initiative_id: validatedFields.data.initiative_id,
    description: validatedFields.data.description,
  });

  if (error) {
    return { error: "تعذر إرسال الطلب، حاول مرة أخرى." };
  }

  revalidatePath("/portal/services");
  return { success: true };
}
