import "server-only";

/** Same-origin check for the free tools' POST routes (cuts calls from other sites). */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser or same-origin without Origin (older UAs)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
