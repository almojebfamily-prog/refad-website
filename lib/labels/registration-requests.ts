import type { RegistrationRequestStatus } from "@/types/db";

export const registrationRequestStatusLabels: Record<RegistrationRequestStatus, string> = {
  pending: "قيد المراجعة",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
};

export const registrationRequestStatusStyles: Record<RegistrationRequestStatus, string> = {
  pending: "bg-gold-100 text-gold-700",
  approved: "bg-primary-50 text-primary-700",
  rejected: "bg-red-100 text-red-700",
};
