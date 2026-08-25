"use client";

import { BookOpen } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMagazineIssue } from "@/app/actions/admin/magazine";
import type { MagazineIssue } from "@/types/db";

export function MagazineIssueRow({ issue }: { issue: MagazineIssue }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 shrink-0 text-primary-700" />
        <div>
          <p className="font-medium text-primary-900">{issue.title}</p>
          <p className="text-xs text-neutral-500">
            {issue.issue_label ? `${issue.issue_label} — ` : ""}
            {issue.published_date}
          </p>
        </div>
      </div>
      <DeleteButton action={() => deleteMagazineIssue(issue.id, issue.file_url)} />
    </div>
  );
}
