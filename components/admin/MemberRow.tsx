"use client";

import { useState, useTransition } from "react";
import { Check, User } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMember, updateMemberNationalId } from "@/app/actions/admin/members";
import type { Profile } from "@/types/db";

export function MemberRow({ profile }: { profile: Profile }) {
  const [isPending, startTransition] = useTransition();
  const [nationalId, setNationalId] = useState(profile.national_id ?? "");
  const [nationalIdError, setNationalIdError] = useState<string | undefined>();

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-primary-900">{profile.full_name}</p>
          {profile.phone && <p className="text-xs text-neutral-500">{profile.phone}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center gap-1">
            <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              disabled={isPending}
              dir="ltr"
              inputMode="numeric"
              maxLength={10}
              placeholder="رقم الهوية الوطنية"
              className="w-36 rounded-lg border border-neutral-300 px-2 py-1.5 text-xs"
            />
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  const result = await updateMemberNationalId(profile.id, nationalId);
                  setNationalIdError(result.error);
                })
              }
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50 disabled:opacity-50"
              aria-label="حفظ رقم الهوية"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
          {nationalIdError && (
            <p className="mt-1 text-xs text-red-600">{nationalIdError}</p>
          )}
        </div>
        <DeleteButton
          action={() => deleteMember(profile.id)}
          confirmMessage="هل أنت متأكد من حذف هذا الحساب؟"
        />
      </div>
    </div>
  );
}
