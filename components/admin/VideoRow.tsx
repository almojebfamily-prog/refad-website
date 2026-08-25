"use client";

import { useState } from "react";
import { Pencil, Video as VideoIcon } from "lucide-react";
import { VideoForm } from "@/components/admin/VideoForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteVideo } from "@/app/actions/admin/videos";
import type { Video } from "@/types/db";

export function VideoRow({ video }: { video: Video }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
        <VideoForm video={video} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <VideoIcon className="h-5 w-5 shrink-0 text-primary-700" />
        <div>
          <p className="font-medium text-primary-900">{video.title}</p>
          <p className="text-xs text-neutral-500">{video.published_date}</p>
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
        <DeleteButton action={() => deleteVideo(video.id)} />
      </div>
    </div>
  );
}
