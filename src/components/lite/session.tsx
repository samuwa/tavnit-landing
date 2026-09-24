"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { APP_URL } from "@/lib/site";

/**
 * Who is signed in on the Lite pages, for the parts of the chrome that
 * should not keep saying "create an account" to someone who just did.
 *
 * Reads the cookie session through the browser Supabase client and follows
 * auth changes (the download dialog signs people in without a reload). When
 * auth is not configured, everyone is a guest and nothing breaks.
 */

export interface LiteSession {
  ready: boolean;
  email: string | null;
}

export function useLiteSession(): LiteSession {
  const [state, setState] = useState<LiteSession>({ ready: false, email: null });

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    (async () => {
      try {
        const { getSupabaseBrowser } = await import("@/lib/supabase/client");
        const supabase = getSupabaseBrowser();
        const { data } = await supabase.auth.getSession();
        if (!cancelled) setState({ ready: true, email: data.session?.user.email ?? null });
        const sub = supabase.auth.onAuthStateChange((_event, session) => {
          setState({ ready: true, email: session?.user.email ?? null });
        });
        unsubscribe = () => sub.data.subscription.unsubscribe();
      } catch {
        if (!cancelled) setState({ ready: true, email: null });
      }
    })();
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return state;
}

/** Ends the Lite session (the product app keeps its own). */
export async function signOutLite(): Promise<void> {
  try {
    const { getSupabaseBrowser } = await import("@/lib/supabase/client");
    await getSupabaseBrowser().auth.signOut();
  } catch {
    // Not configured or offline: nothing to end.
  }
}

/** A link to the app whose label depends on whether the visitor has an account. */
export function AccountLink({
  guest,
  member,
  className,
}: {
  guest: string;
  member: string;
  className: string;
}) {
  const { email } = useLiteSession();
  return (
    <Link href={APP_URL} className={className}>
      {email ? member : guest}
    </Link>
  );
}
