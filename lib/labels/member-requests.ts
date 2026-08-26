import type { MemberRequestStatus, MemberRequestType } from "@/types/db";

export const memberRequestTypeLabels: Record<MemberRequestType, string> = {
  news: "إضافة خبر",
  family_member: "إضافة فرد للعائلة (غير مسجل)",
  other: "طلب آخر",
};

export const memberRequestStatusLabels: Record<MemberRequestStatus, string> = {
  pending: "قيد المراجعة",
  completed: "مكتمل",
  rejected: "مرفوض",
};

export const memberRequestStatusStyles: Record<MemberRequestStatus, string> = {
  pending: "bg-gold-100 text-gold-700",
  completed: "bg-primary-50 text-primary-700",
  rejected: "bg-red-100 text-red-700",
};
