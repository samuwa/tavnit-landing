import "server-only";

import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Anonymous visitor identity for the free tools.
 *
 * Two independent handles, both opaque:
 *  - a session id in an httpOnly cookie, created on the first run. It is
 *    what ties a run to the browser that started it, so nobody can poll or
 *    download someone else's rows by guessing a run id.
 *  - a keyed hash of the client IP, for the per-IP quota. The raw IP is
 *    never stored; without LITE_IP_SALT the hash still works but is keyed
 *    with a build-time constant, which is fine for quota and useless for
 *    anything else.
 */

const COOKIE = "tavnit_lite_sid";
const THIRTY_DAYS = 60 * 60 * 24 * 30;
const SID_RE = /^[a-f0-9]{48}$/;

export async function getSessionId(): Promise<string | null> {
  const store = await cookies();
  const v = store.get(COOKIE)?.value;
  return v && SID_RE.test(v) ? v : null;
}

/** Returns the existing session id, or mints one and sets the cookie. Only
 *  valid inside a Route Handler (cookies can only be set there). */
export async function getOrCreateSessionId(): Promise<string> {
  const existing = await getSessionId();
  if (existing) return existing;
  const sid = randomBytes(24).toString("hex");
  const store = await cookies();
  store.set(COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
  return sid;
}

export function clientIp(request: Request): string {
  const h = request.headers;
  // Vercel sets x-real-ip to the connecting client; x-forwarded-for's first
  // hop is the same value behind Vercel. Fall back to "unknown" rather than
  // failing the request: the session quota still applies.
  const real = h.get("x-real-ip")?.trim();
  if (real) return real;
  const fwd = h.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

export function hashIp(ip: string): string {
  const salt = process.env.LITE_IP_SALT || "tavnit-lite-static-salt";
  return createHmac("sha256", salt).update(ip).digest("hex").slice(0, 32);
}
