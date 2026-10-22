import "server-only";

import { APP_URL } from "@/lib/site";

/**
 * Tavnit Lite → app, signed in.
 *
 * A visitor who downloaded a result on www.tavnit.io already has a Tavnit
 * account (the download step signs them up), but app.tavnit.io is another
 * origin: the browser session does not carry over, and "Use it in Tavnit"
 * used to land on the app's sign-in form, where most gave up (4 handoffs
 * minted, 0 claimed, on 2026-10-21). So for a signed-in visitor the handoff
 * link now carries a single-use magic-link token for the SAME account,
 * minted here with the service role through the Auth admin API (nothing is
 * emailed), and the app's /auth page verifies it and opens the tool.
 *
 * Safety: minted only for a user the anon cookie client has just verified
 * with the auth server (getUser), only for that user's own email, single
 * use, and it expires with the project's OTP window. Nothing here can sign
 * in anybody else. The hashed token is the only thing that leaves this
 * server; the plain OTP in the admin answer is never read.
 */

const TOKEN_HASH_RE = /^[A-Za-z0-9._-]{16,200}$/;

function admin(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

/**
 * The app sign-in URL for `email`, landing on `next` (an app path such as
 * /tools/<id>) with the Lite handoff token `lite`, or null when the link
 * cannot be minted (not configured, auth error) — the caller then uses the
 * plain app URL and the visitor signs in by hand, as before.
 */
export async function mintAppSignInUrl(email: string, next: string, lite: string): Promise<URL | null> {
  const a = admin();
  if (!a) return null;
  const res = await fetch(`${a.url}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: { apikey: a.key, Authorization: `Bearer ${a.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "magiclink", email }),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { hashed_token?: unknown; properties?: { hashed_token?: unknown } };
  const hashed = data.hashed_token ?? data.properties?.hashed_token;
  if (typeof hashed !== "string" || !TOKEN_HASH_RE.test(hashed)) return null;
  const url = new URL("/auth", APP_URL);
  url.searchParams.set("token_hash", hashed);
  url.searchParams.set("type", "magiclink");
  url.searchParams.set("next", next);
  url.searchParams.set("lite", lite);
  return url;
}
