import { sql } from "@/lib/db";
import type { Profile } from "@/types/db";

export async function getAllProfiles() {
  return (await sql`
    SELECT * FROM profiles ORDER BY created_at DESC
  `) as Profile[];
}

export async function getProfilesByRole(role: "member" | "admin") {
  return (await sql`
    SELECT * FROM profiles WHERE role = ${role} ORDER BY created_at DESC
  `) as Profile[];
}
