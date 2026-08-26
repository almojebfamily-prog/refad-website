"use client";

import { useState, useTransition } from "react";
import { updateMemberRole } from "@/app/actions/admin/members";
import { Button } from "@/components/shared/Button";
import type { Profile } from "@/types/db";

export function PromoteMemberForm({ members }: { members: Profile[] }) {
  const [selected, setSelected] = useState(members[0]?.id ?? "");
  const [isPending, startTransition] = useTransition();

  if (members.length === 0) {
    return (
      <p className="text-sm text-neutral-600">لا يوجد أعضاء متاحون للترقية حاليًا.</p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={selected}
        disabled={isPending}
        onChange={(e) => setSelected(e.target.value)}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.full_name}
          </option>
        ))}
      </select>
      <Button
        type="button"
        disabled={isPending || !selected}
        onClick={() => startTransition(() => updateMemberRole(selected, "admin"))}
        className="px-4! py-2! text-xs"
      >
        {isPending ? "جارٍ الترقية..." : "ترقية إلى مسؤول"}
      </Button>
    </div>
  );
}
