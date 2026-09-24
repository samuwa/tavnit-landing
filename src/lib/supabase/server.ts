import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cookie-based Supabase Auth on the marketing site.
 *
 * Same project as the product app, anon key only: this client can do
 * nothing the browser could not do itself, it just lets a Route Handler
 * confirm who the visitor is (getUser() validates the token against the
 * auth server rather than trusting the cookie). Used by the free tools'
 * download step, which requires a Tavnit account.
 */

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function authConfigured(): boolean {
  return Boolean(URL_ && ANON);
}

export async function createSupabaseServer() {
  if (!URL_ || !ANON) throw new Error("Supabase auth is not configured");
  const store = await cookies();
  return createServerClient(URL_, ANON, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there and
          // the refreshed token simply is not persisted this time.
        }
      },
    },
  });
}

/** The signed-in user, or null. Never throws on a missing/invalid session. */
export async function currentUser(): Promise<{ id: string; email: string | null } | null> {
  if (!authConfigured()) return null;
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}
