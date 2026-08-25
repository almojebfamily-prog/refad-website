"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { InitiativeForm } from "@/components/admin/InitiativeForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteInitiative } from "@/app/actions/admin/initiatives";
import type { Initiative, InitiativeType } from "@/types/db";

export function InitiativeRow({
  initiative,
  types,
  typeName,
}: {
  initiative: Initiative;
  types: InitiativeType[];
  typeName: string;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
        <InitiativeForm initiative={initiative} types={types} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div>
        <p className="mb-0.5 text-xs font-semibold text-gold-600">{typeName}</p>
        <p className="font-medium text-primary-900">{initiative.title}</p>
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
        <DeleteButton action={() => deleteInitiative(initiative.id)} />
      </div>
    </div>
  );
}
