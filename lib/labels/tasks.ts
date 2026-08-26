import type { TaskStatus } from "@/types/db";

export const taskStatusLabels: Record<TaskStatus, string> = {
  todo: "لم تبدأ",
  in_progress: "قيد التنفيذ",
  done: "مكتملة",
};

export const taskStatusStyles: Record<TaskStatus, string> = {
  todo: "bg-neutral-200 text-neutral-600",
  in_progress: "bg-gold-100 text-gold-700",
  done: "bg-primary-50 text-primary-700",
};
