import { sql } from "@/lib/db";
import type { TaskWithAssignee } from "@/types/db";

export { taskStatusLabels, taskStatusStyles } from "@/lib/labels/tasks";

export async function getTasks() {
  return (await sql`
    SELECT t.*, p.full_name AS assignee_name
    FROM tasks t
    LEFT JOIN profiles p ON p.id = t.assignee_id
    ORDER BY t.created_at DESC
  `) as TaskWithAssignee[];
}
