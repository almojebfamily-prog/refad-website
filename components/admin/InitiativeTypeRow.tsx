"use client";

import { useState } from "react";
import { Layers, Pencil } from "lucide-react";
import { InitiativeTypeForm } from "@/components/admin/InitiativeTypeForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteInitiativeType } from "@/app/actions/admin/initiative-types";
import type { InitiativeType } from "@/types/db";

export function InitiativeTypeRow({
  type,
  subServiceCount,
}: {
  type: InitiativeType;
  subServiceCount: number;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
        <InitiativeTypeForm type={type} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Layers className="h-5 w-5 shrink-0 text-primary-700" />
        <div>
          <p className="font-medium text-primary-900">{type.title}</p>
          <p className="text-xs text-neutral-500">
            {subServiceCount} {subServiceCount === 1 ? "خدمة فرعية" : "خدمات فرعية"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          تعديل
        </button>
        <DeleteButton
          action={() => deleteInitiativeType(type.id)}
          confirmMessage={
            subServiceCount > 0
              ? `سيؤدي حذف هذا النوع إلى حذف ${subServiceCount} من الخدمات الفرعية التابعة له أيضًا. هل أنت متأكد؟`
              : "هل أنت متأكد من الحذف؟"
          }
        />
      </div>
    </div>
  );
}
