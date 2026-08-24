/**
 * Platform-wide flags read from the shared Supabase project's
 * platform_config singleton (toggled in tavnit-admin → Settings → Platform).
 *
 * Stripe self-serve drives the pricing surfaces here: when it's off, the
 * pricing section/page/nav links disappear and prospects go through the
 * book-a-demo motion instead. Cached for 5 minutes (ISR) so flipping the
 * toggle propagates without a deploy; any read failure fails CLOSED
 * (pricing hidden), matching the product app's convention.
 */
export async function isStripeEnabled(): Promise<boolean> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const base = process.env.SUPABASE_URL;
  if (!key || !base) return false;
  try {
    const res = await fetch(
      `${base}/rest/v1/platform_config?id=eq.true&select=stripe_enabled`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return false;
    const rows = (await res.json()) as { stripe_enabled?: boolean }[];
    return rows?.[0]?.stripe_enabled === true;
  } catch {
    return false;
  }
}
