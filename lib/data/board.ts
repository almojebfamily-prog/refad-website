import { sql } from "@/lib/db";
import type { BoardMember } from "@/types/db";

export async function getBoardMembers() {
  return (await sql`
    SELECT * FROM board_members ORDER BY order_index ASC
  `) as BoardMember[];
}
