"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/shared/Button";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactMessage, undefined);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-neutral-800">
          الاسم الكامل
        </label>
        <input
          id="full_name"
          name="full_name"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {state?.errors?.full_name && (
          <p className="mt-1 text-xs text-red-600">{state.errors.full_name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-neutral-800">
          رقم الجوال
        </label>
        <input
          id="mobile"
          name="mobile"
          dir="ltr"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {state?.errors?.mobile && (
          <p className="mt-1 text-xs text-red-600">{state.errors.mobile[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-neutral-800">
          الموضوع
        </label>
        <input
          id="subject"
          name="subject"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {state?.errors?.subject && (
          <p className="mt-1 text-xs text-red-600">{state.errors.subject[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-800">
          نص الرسالة
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {state?.errors?.message && (
          <p className="mt-1 text-xs text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      {state?.message && (
        <p
          className={
            state.success
              ? "text-sm font-medium text-primary-700"
              : "text-sm font-medium text-red-600"
          }
        >
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </Button>
    </form>
  );
}
