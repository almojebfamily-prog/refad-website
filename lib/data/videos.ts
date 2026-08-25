import { sql } from "@/lib/db";
import type { Video } from "@/types/db";

export async function getVideos() {
  return (await sql`
    SELECT * FROM videos ORDER BY published_date DESC
  `) as Video[];
}
