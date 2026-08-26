"use client";

import { useActionState } from "react";
import { submitMemberRequest } from "@/app/actions/member-requests";
import { memberRequestTypeLabels } from "@/lib/labels/member-requests";
import { Button } from "@/components/shared/Button";

export function MemberRequestForm() {
  const [state, action, pending] = useActionState(submitMemberRequest, undefined);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-neutral-800">
          نوع الطلب
        </label>
        <select
          id="type"
          name="type"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {Object.entries(memberRequestTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium text-neutral-800">
          تفاصيل الطلب
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="اكتب تفاصيل طلبك هنا..."
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
