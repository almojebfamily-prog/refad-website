"use client";

import { useActionState, useState } from "react";
import { saveInitiativeType } from "@/app/actions/admin/initiative-types";
import { Button } from "@/components/shared/Button";
import { InitiativeIcon } from "@/components/shared/InitiativeIcon";
import type { InitiativeType } from "@/types/db";

export function InitiativeTypeForm({
  type,
  onDone,
}: {
  type?: InitiativeType;
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveInitiativeType, undefined);
  const [iconName, setIconName] = useState(type?.icon ?? "");

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
      <textarea
        name="description"
        placeholder="وصف مختصر يظهر للزوار على الموقع العام (اختياري)"
        defaultValue={type?.description ?? ""}
        rows={2}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />

      <div className="sm:col-span-2">
        <label htmlFor="icon" className="mb-1.5 block text-xs font-medium text-neutral-600">
          اسم الأيقونة (من{" "}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="text-primary-700 hover:underline"
          >
            lucide.dev/icons
          </a>
          ، مثال: hand-heart)
        </label>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-primary-700">
            <InitiativeIcon name={iconName} size={20} />
          </div>
          <input
            id="icon"
            name="icon"
            dir="ltr"
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            placeholder="hand-heart"
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

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
