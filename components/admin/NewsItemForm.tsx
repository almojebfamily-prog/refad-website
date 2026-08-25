"use client";

import { useActionState } from "react";
import { saveNewsItem } from "@/app/actions/admin/news";
import { newsCategoryLabels } from "@/lib/labels/news";
import { Button } from "@/components/shared/Button";
import type { NewsItem } from "@/types/db";

export function NewsItemForm({
  item,
  defaultCategory,
  onDone,
}: {
  item?: NewsItem;
  defaultCategory: "family" | "fund";
  onDone?: () => void;
}) {
  const [state, action, pending] = useActionState(saveNewsItem, undefined);

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="category" value={item?.category ?? defaultCategory} />
      <input
        name="title"
        placeholder="عنوان الخبر"
        defaultValue={item?.title}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />
      <input
        name="published_date"
        type="date"
        defaultValue={item?.published_date}
        required
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      />
      <div className="hidden sm:block" />
      <textarea
        name="body"
        placeholder="نص الخبر"
        defaultValue={item?.body}
        required
        rows={3}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:col-span-2"
      />

      {state?.error && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">{state.error}</p>
      )}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" disabled={pending} className="px-4! py-2! text-xs">
          {pending ? "جارٍ الحفظ..." : item ? "حفظ التعديلات" : `إضافة خبر (${newsCategoryLabels[defaultCategory]})`}
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
