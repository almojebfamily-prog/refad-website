"use client";

import { useActionState } from "react";
import { saveInitiativeType } from "@/app/actions/admin/initiative-types";
import { Button } from "@/components/shared/Button";
import type { InitiativeType } from "@/types/db";

export function InitiativeTypeForm({
  type,
  onDone,
}: {
  type?: InitiativeType;
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveInitiativeType, undefined);

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      {type && <input type="hidden" name="id" value={type.id} />}
      <input
        name="title"
        placeholder="اسم النوع (مثال: الدعم الاجتماعي)"
        defaultValue={type?.title}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="order_index"
        type="number"
        placeholder="الترتيب"
        defaultValue={type?.order_index ?? 0}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />

      {state?.error && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" disabled={pending} className="px-4! py-2! text-xs">
          {pending ? "جارٍ الحفظ..." : type ? "حفظ التعديلات" : "إضافة نوع"}
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
