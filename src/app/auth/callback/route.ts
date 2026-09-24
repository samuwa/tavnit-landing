import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authConfigured, createSupabaseServer } from "@/lib/supabase/server";

/**
 * Finishes a Google sign-in, an email confirmation or a magic link started
 * from the free tools: exchanges the one-time code for a cookie session,
 * then sends the visitor back to the page they came from.
 *
 * The return path comes from the `tavnit_lite_next` cookie the dialog set
 * before redirecting (kept out of the redirect URL so Supabase's allow-list
 * matches), with `?next=` still accepted. Either way it is restricted to a
 * same-site path, so this route can never be used as an open redirect.
 */

const NEXT_COOKIE = "tavnit_lite_next";
const SAFE_PATH = /^\/(?!\/)[^\s]*$/;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const store = await cookies();

  let next = url.searchParams.get("next") || "";
  if (!next) {
    const fromCookie = store.get(NEXT_COOKIE)?.value;
    if (fromCookie) {
      try {
        next = decodeURIComponent(fromCookie);
      } catch {
        next = "";
      }
    }
  }
  // The pattern alone is not enough: "/\evil.com" passes it and the URL
  // parser treats the backslash as a slash, resolving to https://evil.com.
  // So the resolved URL must also stay on this origin.
  let target = new URL("/", url.origin);
  if (SAFE_PATH.test(next)) {
    try {
      const candidate = new URL(next, url.origin);
      if (candidate.origin === url.origin) target = candidate;
    } catch {
      // keep "/"
    }
  }

  if (code && authConfigured()) {
    try {
      const supabase = await createSupabaseServer();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) target.searchParams.set("auth", "error");
    } catch {
      target.searchParams.set("auth", "error");
    }
  }

  const res = NextResponse.redirect(target);
  res.cookies.set(NEXT_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
