import { RegistrationRequestForm } from "@/components/forms/RegistrationRequestForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-primary-900">طلب تسجيل عضوية</h1>
      <p className="mb-6 text-sm text-neutral-600">
        أدخل بياناتك وسيقوم فريق الإدارة بمراجعة طلبك.
      </p>
      <RegistrationRequestForm />
    </>
  );
}
