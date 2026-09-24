import "server-only";

/**
 * Cloudflare Turnstile verification for the free tools.
 *
 * Configured with TURNSTILE_SECRET_KEY (server) and
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY (widget). When the secret is not set the
 * check is skipped and the per-session / per-IP / global quotas are the only
 * abuse control — acceptable for local development, not for launch, which
 * is why `turnstileConfigured()` is surfaced to the page.
 */

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
