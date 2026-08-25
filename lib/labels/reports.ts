import type { ReportType } from "@/types/db";

export const reportTypeLabels: Record<ReportType, string> = {
  financial: "التقارير المالية",
  performance: "تقارير الأداء",
  minutes: "محاضر الاجتماعات",
};
