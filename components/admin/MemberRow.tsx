"use client";

import { useTransition } from "react";
import { User } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMember, updateMemberRole } from "@/app/actions/admin/members";
import type { Database, ProfileRole } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function MemberRow({ profile }: { profile: Profile }) {
  const [isPending, startTransition] = useTransition();

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
        <select
          defaultValue={profile.role}
          disabled={isPending}
          onChange={(e) =>
            startTransition(() =>
              updateMemberRole(profile.id, e.target.value as ProfileRole)
            )
          }
          className="rounded-lg border border-neutral-300 px-2 py-1.5 text-xs"
        >
          <option value="member">عضو</option>
          <option value="admin">مسؤول</option>
        </select>
        <DeleteButton
          action={() => deleteMember(profile.id)}
          confirmMessage="هل أنت متأكد من حذف هذا الحساب؟"
        />
      </div>
    </div>
  );
}
