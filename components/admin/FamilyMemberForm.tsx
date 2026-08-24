"use client";

import { useActionState } from "react";
import { saveFamilyMember } from "@/app/actions/admin/family-members";
import { Button } from "@/components/shared/Button";
import type { Database } from "@/types/database.types";

type FamilyMember = Database["public"]["Tables"]["family_members"]["Row"];

export function FamilyMemberForm({
  member,
  allMembers,
  onDone,
}: {
  member?: FamilyMember;
  allMembers: FamilyMember[];
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveFamilyMember, undefined);
  const candidateParents = allMembers.filter((m) => m.id !== member?.id);

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      {member && <input type="hidden" name="id" value={member.id} />}
      <input
        name="full_name"
        placeholder="الاسم الكامل"
        defaultValue={member?.full_name}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <select
        name="gender"
        defaultValue={member?.gender ?? "male"}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        <option value="male">ذكر</option>
        <option value="female">أنثى</option>
      </select>
      <input
        name="birth_date"
        type="date"
        defaultValue={member?.birth_date ?? ""}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <select
        name="father_id"
        defaultValue={member?.father_id ?? ""}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        <option value="">بدون أب محدد</option>
        {candidateParents.map((m) => (
          <option key={m.id} value={m.id}>
            {m.full_name}
          </option>
        ))}
      </select>
      <select
        name="mother_id"
        defaultValue={member?.mother_id ?? ""}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      >
        <option value="">بدون أم محددة</option>
        {candidateParents.map((m) => (
          <option key={m.id} value={m.id}>
            {m.full_name}
          </option>
        ))}
      </select>

      {state?.error && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" disabled={pending} className="px-4! py-2! text-xs">
          {pending ? "جارٍ الحفظ..." : member ? "حفظ التعديلات" : "إضافة فرد"}
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
