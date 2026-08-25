import { sql } from "@/lib/db";
import type { Initiative } from "@/types/db";

export { initiativeCategoryLabels } from "@/lib/labels/initiatives";

export async function getInitiatives() {
  return (await sql`
    SELECT * FROM initiatives ORDER BY order_index ASC
  `) as Initiative[];
}
