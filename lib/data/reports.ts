import { createClient } from "@/lib/supabase/server";

export { reportTypeLabels } from "@/lib/labels/reports";

export async function getReports() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) throw error;
  return data;
}

export function getReportPublicUrl(fileUrl: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/reports/${fileUrl.replace(/^reports\//, "")}`;
}
