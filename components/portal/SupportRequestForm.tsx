"use client";

import { useActionState } from "react";
import { submitSupportRequest } from "@/app/actions/support-requests";
import { Button } from "@/components/shared/Button";

export function SupportRequestForm({
  initiatives,
}: {
  initiatives: { id: string; title: string }[];
}) {
  const [state, action, pending] = useActionState(submitSupportRequest, undefined);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="initiative_id" className="mb-1.5 block text-sm font-medium text-neutral-800">
          نوع الخدمة
        </label>
        <select
          id="initiative_id"
          name="initiative_id"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {initiatives.map((initiative) => (
            <option key={initiative.id} value={initiative.id}>
              {initiative.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-neutral-800">
          وصف الطلب
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
      {state?.success && (
        <p className="text-sm font-medium text-primary-700">تم إرسال طلبك بنجاح.</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </Button>
    </form>
  );
}
