// One-off bootstrap script: creates the first admin account directly in the
// database, since /portal/admin/members (the normal way to create accounts)
// requires an existing admin to be logged in.
//
// Usage: node db/create-admin.mjs <email> [full name]
// Requires DATABASE_URL to be set (reads .env.local automatically if present).

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
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

const email = process.argv[2];
const fullName = process.argv[3] ?? "مسؤول النظام";

if (!email) {
  console.error("Usage: node db/create-admin.mjs <email> [full name]");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const password = randomBytes(9).toString("base64url");
const passwordHash = await bcrypt.hash(password, 12);

const sql = neon(process.env.DATABASE_URL);

const [existing] = await sql`SELECT id FROM users WHERE email = ${email}`;
if (existing) {
  console.error(`A user with email ${email} already exists.`);
  process.exit(1);
}

const [user] = await sql`
  INSERT INTO users (email, password_hash) VALUES (${email}, ${passwordHash})
  RETURNING id
`;
await sql`
  INSERT INTO profiles (id, full_name, role) VALUES (${user.id}, ${fullName}, 'admin')
`;

console.log("Admin account created.");
console.log("Email:", email);
console.log("Password:", password);
