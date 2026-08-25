import { sql } from "@/lib/db";
import type { ContactMessage } from "@/types/db";

export async function getContactMessages() {
  return (await sql`
    SELECT * FROM contact_messages ORDER BY created_at DESC
  `) as ContactMessage[];
}
