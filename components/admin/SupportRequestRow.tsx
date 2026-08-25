"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, HandHeart } from "lucide-react";
import { updateSupportRequestStatus } from "@/app/actions/admin/support-requests";
import { supportRequestStatusLabels } from "@/lib/labels/support-requests";
import type { SupportRequestStatus, SupportRequestWithDetails } from "@/types/db";

const statusStyles: Record<SupportRequestStatus, string> = {
  pending: "bg-gold-100 text-gold-600",
  approved: "bg-primary-50 text-primary-700",
  rejected: "bg-red-50 text-red-600",
  completed: "bg-neutral-200 text-neutral-600",
};

export function SupportRequestRow({ request }: { request: SupportRequestWithDetails }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-start"
      >
        <div className="flex items-center gap-3">
          <HandHeart className="h-5 w-5 shrink-0 text-primary-700" />
          <div>
            <p className="font-medium text-primary-900">
              {request.member_name}
              <span
                className={`ms-2 rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[request.status]}`}
              >
                {supportRequestStatusLabels[request.status]}
              </span>
            </p>
            <p className="text-xs text-neutral-500">
              {request.initiative_title ?? "خدمة"}
            </p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {open && (
        <div className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
          <p className="text-sm text-neutral-700">{request.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">الحالة:</span>
            <select
              defaultValue={request.status}
              disabled={isPending}
              onChange={(e) =>
                startTransition(() =>
                  updateSupportRequestStatus(
                    request.id,
                    e.target.value as SupportRequestStatus
                  )
                )
              }
              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs"
            >
              {Object.entries(supportRequestStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
