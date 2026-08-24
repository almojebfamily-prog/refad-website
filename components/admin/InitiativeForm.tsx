"use client";

import { useActionState } from "react";
import { saveInitiative } from "@/app/actions/admin/initiatives";
import { initiativeCategoryLabels } from "@/lib/labels/initiatives";
import { Button } from "@/components/shared/Button";
import type { Database } from "@/types/database.types";

type Initiative = Database["public"]["Tables"]["initiatives"]["Row"];

export function InitiativeForm({
  initiative,
  onDone,
}: {
  initiative?: Initiative;
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveInitiative, undefined);

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      {initiative && <input type="hidden" name="id" value={initiative.id} />}
      <select
        name="category"
        defaultValue={initiative?.category ?? "social_support"}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        {Object.entries(initiativeCategoryLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <input
        name="order_index"
        type="number"
        placeholder="الترتيب"
        defaultValue={initiative?.order_index ?? 0}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="title"
        placeholder="عنوان المبادرة"
        defaultValue={initiative?.title}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />
      <textarea
        name="description"
        placeholder="الوصف"
        defaultValue={initiative?.description}
        required
        rows={2}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />

      {state?.error && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" disabled={pending} className="px-4! py-2! text-xs">
          {pending ? "جارٍ الحفظ..." : initiative ? "حفظ التعديلات" : "إضافة مبادرة"}
        </Button>
        {onDone && (
          <Button type="button" variant="ghost" onClick={onDone} className="px-4! py-2! text-xs">
            إلغاء
          </Button>
        )}
      </div>
    </form>
  );
}
