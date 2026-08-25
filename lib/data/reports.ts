import { sql } from "@/lib/db";
import type { Report } from "@/types/db";

export { reportTypeLabels } from "@/lib/labels/reports";

export async function getReports() {
  return (await sql`
    SELECT * FROM reports ORDER BY published_date DESC
  `) as Report[];
}
