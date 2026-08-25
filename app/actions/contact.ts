"use server";

import { sql } from "@/lib/db";
import { ContactFormSchema, type ContactFormState } from "@/lib/validation/contact";

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    full_name: formData.get("full_name"),
    mobile: formData.get("mobile"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { full_name, mobile, subject, message } = validatedFields.data;

  try {
    await sql`
      INSERT INTO contact_messages (full_name, mobile, subject, message)
      VALUES (${full_name}, ${mobile}, ${subject}, ${message})
    `;

    return { success: true, message: "تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا." };
  } catch {
    return {
      success: false,
      message: "تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا أو التواصل عبر البريد الإلكتروني.",
    };
  }
}
