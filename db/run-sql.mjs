// One-off helper: runs a .sql file's full contents against DATABASE_URL.
// Usage: node db/run-sql.mjs <path-to-sql-file>

import { Client } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

try {
  const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of envFile.split("\n")) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
} catch {
  // .env.local not present locally — assume DATABASE_URL is already in the environment.
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node db/run-sql.mjs <path-to-sql-file>");
  process.exit(1);
}

const sqlText = readFileSync(filePath, "utf8");

const client = new Client(process.env.DATABASE_URL);
await client.connect();
try {
  await client.query(sqlText);
  console.log(`Ran ${filePath} successfully.`);
} finally {
  await client.end();
}
