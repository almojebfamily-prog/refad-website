import { sql } from "@/lib/db";
import type { InitiativeType } from "@/types/db";

export async function getInitiativeTypes() {
  return (await sql`
    SELECT * FROM initiative_types ORDER BY order_index ASC
  `) as InitiativeType[];
}
