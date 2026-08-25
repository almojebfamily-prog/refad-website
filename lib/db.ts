import "server-only";
import { neon, types, type NeonQueryFunction } from "@neondatabase/serverless";

// The driver's default parsers turn date/timestamp columns into JS Date
// objects; every type in types/db.ts (and every place that column is
// rendered) expects the raw ISO string instead, so override them.
types.setTypeParser(types.builtins.DATE, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMP, (value) => value);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => value);

// Lazy so that importing this module (e.g. during Next.js's build-time page
// data collection) doesn't throw just because DATABASE_URL isn't set yet —
// it only throws once a query actually runs.
let client: NeonQueryFunction<false, false> | undefined;

function getClient() {
  if (!client) {
    client = neon(process.env.DATABASE_URL!);
  }
  return client;
}

export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => getClient()(strings, ...values)) as NeonQueryFunction<false, false>;
