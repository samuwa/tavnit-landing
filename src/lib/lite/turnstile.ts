import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Cloudflare Turnstile verification for the free tools.
 *
 * Configured with TURNSTILE_SECRET_KEY (server) and
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY (widget). When the secret is not set the
 * check is skipped and the per-session / per-IP / global quotas are the only
 * abuse control — acceptable for local development, not for launch, which
 * is why `turnstileConfigured()` is surfaced to the page.
 *
 * A Turnstile token is single-use, and the compare tools submit two or
 * three documents in a row. So a passed check is remembered for the session
 * in a short-lived signed cookie (`isHumanSession` / `markHumanSession`),
 * and only the first document of a batch needs a token.
 */

const HUMAN_COOKIE = "tavnit_lite_human";
const HUMAN_TTL_S = 60 * 60; // an hour

function sign(sessionId: string, exp: number): string {
  const salt = process.env.LITE_IP_SALT || process.env.TURNSTILE_SECRET_KEY || "";
  return createHmac("sha256", salt).update(`${sessionId}.${exp}`).digest("hex");
}

/** True when this session passed Turnstile recently. Always false without a secret (nothing to skip). */
export async function isHumanSession(sessionId: string): Promise<boolean> {
  if (!turnstileConfigured()) return false;
  const raw = (await cookies()).get(HUMAN_COOKIE)?.value;
  if (!raw) return false;
  const [expRaw, mac] = raw.split(".");
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000 || !mac) return false;
  const want = sign(sessionId, exp);
  return mac.length === want.length && timingSafeEqual(Buffer.from(mac), Buffer.from(want));
}

export async function markHumanSession(sessionId: string): Promise<void> {
  if (!turnstileConfigured()) return;
  const exp = Math.floor(Date.now() / 1000) + HUMAN_TTL_S;
  (await cookies()).set(HUMAN_COOKIE, `${exp}.${sign(sessionId, exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: HUMAN_TTL_S,
  });
}

export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token || token.length > 2048) return false;

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip && ip !== "unknown") form.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { success?: boolean };
    return body.success === true;
  } catch {
    return false;
  }
}
