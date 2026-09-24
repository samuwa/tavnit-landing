"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for sign-in on the marketing site. Sessions are
 * stored in cookies (not localStorage) so the server can read them in the
 * download route. Created lazily: pages that never open the sign-in dialog
 * never touch it, and a missing env only breaks the dialog, not the page.
 */

let client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Sign-in is not configured on this site yet.");
  }
  client = createBrowserClient(url, anon);
  return client;
}
