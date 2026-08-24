"use client";

import { useState } from "react";
import { Pencil, User } from "lucide-react";
import { FamilyMemberForm } from "@/components/admin/FamilyMemberForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFamilyMember } from "@/app/actions/admin/family-members";
import type { Database } from "@/types/database.types";

type FamilyMember = Database["public"]["Tables"]["family_members"]["Row"];

export function FamilyMemberRow({
  member,
  allMembers,
}: {
  member: FamilyMember;
  allMembers: FamilyMember[];
}) {
  const [editing, setEditing] = useState(false);
  const father = allMembers.find((m) => m.id === member.father_id);

  if (editing) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
        <FamilyMemberForm
          member={member}
          allMembers={allMembers}
          onDone={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-primary-900">{member.full_name}</p>
          <p className="text-xs text-neutral-500">
            {father ? `الأب: ${father.full_name}` : "بدون أب محدد"}
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
        <DeleteButton action={() => deleteFamilyMember(member.id)} />
      </div>
    </div>
  );
}
