"use server";

import { sql } from "@/lib/db";
import {
  RegistrationRequestFormSchema,
  type RegistrationRequestFormState,
} from "@/lib/validation/registration-request";

export async function submitRegistrationRequest(
  _prevState: RegistrationRequestFormState,
  formData: FormData
): Promise<RegistrationRequestFormState> {
  const validatedFields = RegistrationRequestFormSchema.safeParse({
    full_name: formData.get("full_name"),
    national_id: formData.get("national_id"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message };
  }

  const { full_name, national_id, phone, email } = validatedFields.data;

  try {
    await sql`
      INSERT INTO registration_requests (full_name, national_id, phone, email)
      VALUES (${full_name}, ${national_id}, ${phone}, ${email})
    `;
  } catch {
    return { error: "تعذر إرسال الطلب، حاول مرة أخرى." };
  }

  return { success: true };
}
