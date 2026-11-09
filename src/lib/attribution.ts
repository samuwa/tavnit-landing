/**
 * Ad-click attribution for the demo form, without advertising cookies.
 *
 * The cookie banner promises no advertising cookies, so Google Ads cannot
 * rely on its own `_gcl_*` cookies here. Instead, when a visitor lands from
 * an ad, the click id Google appends to the URL (`gclid`, or `gbraid` /
 * `wbraid` on iOS) and the UTM tags are kept in sessionStorage — first party,
 * gone when the tab closes — and sent along with the /schedule form. The
 * stored lead then carries the click id, and qualified meetings can be
 * uploaded back to Google Ads as offline conversions.
 *
 * Nothing is stored for visitors who did not arrive with one of these
 * parameters.
 */

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey | "landing_page", string>>;

const STORAGE_KEY = "tavnit_attribution";

/** Read the ad parameters off the current URL and remember them for the session. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 200);
  }
  if (Object.keys(found).length === 0) return;
  // Path only: the query string is what we just parsed, and may carry more.
  found.landing_page = window.location.pathname.slice(0, 200);
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage blocked: the lead simply arrives without attribution.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/**
 * Server side: keep only the known keys, as short plain tokens. Click ids are
 * URL-safe base64-ish strings; UTM values are free text set by us in the ad
 * account, so they are length-capped rather than pattern-checked.
 */
export function sanitizeAttribution(input: unknown): Attribution {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: Attribution = {};
  for (const k of [...ATTRIBUTION_KEYS, "landing_page"] as const) {
    const v = src[k];
    if (typeof v !== "string") continue;
    const s = v.trim().slice(0, 200);
    if (!s) continue;
    if ((k === "gclid" || k === "gbraid" || k === "wbraid") && !/^[A-Za-z0-9_\-.]+$/.test(s)) continue;
    if (k === "landing_page" && !s.startsWith("/")) continue;
    out[k] = s;
  }
  return out;
}
