"use server";

import { createClient } from "@/lib/supabase/server";
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

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert(validatedFields.data);

    if (error) throw error;

    return { success: true, message: "تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا." };
  } catch {
    return {
      success: false,
      message: "تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا أو التواصل عبر البريد الإلكتروني.",
    };
  }
}
