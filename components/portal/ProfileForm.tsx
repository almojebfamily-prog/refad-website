"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/shared/Button";

export function ProfileForm({
  fullName,
  phone,
  nationalId,
  email,
}: {
  fullName: string;
  phone: string | null;
  nationalId: string | null;
  email: string | undefined;
}) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="max-w-lg space-y-5">
      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-neutral-800">
          الاسم الكامل
        </label>
        <input
          id="full_name"
          name="full_name"
          defaultValue={fullName}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-800">
          رقم الجوال
        </label>
        <input
          id="phone"
          name="phone"
          dir="ltr"
          defaultValue={phone ?? ""}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="national_id" className="mb-1.5 block text-sm font-medium text-neutral-800">
          رقم الهوية الوطنية
        </label>
        <input
          id="national_id"
          dir="ltr"
          value={nationalId ?? ""}
          disabled
          placeholder="لم يتم تسجيله بعد — يتم تعديله من قِبل الإدارة فقط"
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-neutral-800">
          البريد الإلكتروني
        </label>
        <input
          dir="ltr"
          value={email ?? ""}
          disabled
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500"
        />
      </div>

      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
      {state?.success && (
        <p className="text-sm font-medium text-primary-700">تم حفظ التغييرات بنجاح.</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  );
}
