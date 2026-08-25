"use client";

import { useActionState } from "react";
import { saveBoardMember } from "@/app/actions/admin/board";
import { Button } from "@/components/shared/Button";
import type { BoardMember } from "@/types/db";

export function BoardMemberForm({
  member,
  onDone,
}: {
  member?: BoardMember;
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveBoardMember, undefined);

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
      <input
        name="role_title"
        placeholder="المسمى الوظيفي"
        defaultValue={member?.role_title}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="order_index"
        type="number"
        placeholder="الترتيب"
        defaultValue={member?.order_index ?? 0}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="bio"
        placeholder="نبذة (اختياري)"
        defaultValue={member?.bio ?? ""}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />

      {state?.error && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" disabled={pending} className="px-4! py-2! text-xs">
          {pending ? "جارٍ الحفظ..." : member ? "حفظ التعديلات" : "إضافة عضو"}
        </Button>
        {onDone && (
          <Button
            type="button"
            variant="ghost"
            onClick={onDone}
            className="px-4! py-2! text-xs"
          >
            إلغاء
          </Button>
        )}
      </div>
    </form>
  );
}
