import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { ProfileRole } from "@/types/db";

export const SESSION_COOKIE = "refad_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  return new TextEncoder().encode(process.env.SESSION_SECRET!);
}

export type SessionPayload = {
  sub: string;
  role: ProfileRole;
};

export async function createSessionToken(userId: string, role: ProfileRole) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string" || typeof payload.role !== "string") {
      return null;
    }
    return { sub: payload.sub, role: payload.role as ProfileRole };
  } catch {
    return null;
  }
}
