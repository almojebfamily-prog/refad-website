import { sql } from "@/lib/db";
import type { RegistrationRequest } from "@/types/db";

export {
  registrationRequestStatusLabels,
  registrationRequestStatusStyles,
} from "@/lib/labels/registration-requests";

export async function getRegistrationRequests() {
  return (await sql`
    SELECT * FROM registration_requests ORDER BY created_at DESC
  `) as RegistrationRequest[];
}
