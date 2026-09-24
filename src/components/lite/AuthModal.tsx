"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { Locale } from "@/lib/locale";
import { APP_URL } from "@/lib/site";

/**
 * Sign-in / sign-up dialog for the free tools' download step.
 *
 * Google first (one click, no password, same Google login the product app
 * uses: same Supabase project, same users), email + password underneath.
 * Native <dialog> for focus management and Escape handling.
 *
 * Both Google and the email confirmation link leave the page and come back
 * through /auth/callback, so before redirecting the dialog asks the tool
 * to stash the current run (`onBeforeRedirect`); the tool restores it and
 * finishes the download when the visitor lands back with `?auth=1`.
 */

type Mode = "signup" | "signin";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function AuthModal({
  open,
  onClose,
  onAuthed,
  onBeforeRedirect,
  copy,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  onAuthed: () => void;
  /** Called right before a full-page redirect (Google, email link). */
  onBeforeRedirect: () => void;
  copy: ToolCopy["auth"];
  locale: Locale;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<Mode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [onClose]);

  /**
   * Where the auth callback sends the visitor back: this page, flagged so
   * the tool knows to restore the run and finish the download.
   *
   * The return path travels in a short-lived cookie, not in the redirect
   * URL: Supabase only honours a `redirectTo` that matches its allow-list,
   * and a query string on it is the easiest way to fall off that list and
   * land on the project's Site URL (the homepage) instead.
   */
  const returnTo = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("auth", "1");
    const next = url.pathname + url.search;
    document.cookie = `tavnit_lite_next=${encodeURIComponent(next)}; Path=/; Max-Age=900; SameSite=Lax${
      location.protocol === "https:" ? "; Secure" : ""
    }`;
    return `${window.location.origin}/auth/callback`;
  };

  async function google() {
    setGoogleBusy(true);
    setError(null);
    try {
      const { getSupabaseBrowser } = await import("@/lib/supabase/client");
      const supabase = getSupabaseBrowser();
      onBeforeRedirect();
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: returnTo() },
      });
      if (err) {
        setError(copy.generic);
        setGoogleBusy(false);
      }
      // On success the browser is navigating away; nothing else to do.
    } catch {
      setError(copy.generic);
      setGoogleBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { getSupabaseBrowser } = await import("@/lib/supabase/client");
      const supabase = getSupabaseBrowser();
      const cleanEmail = email.trim().toLowerCase();
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (err) {
          setError(copy.generic);
          return;
        }
        onAuthed();
        return;
      }
      onBeforeRedirect();
      const { data, error: err } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: returnTo(),
          data: {
            ...(name.trim() ? { full_name: name.trim() } : {}),
            lang: locale,
          },
        },
      });
      if (err) {
        setError(copy.generic);
        return;
      }
      if (data.user && (data.user.identities?.length ?? 0) === 0) {
        setMode("signin");
        setError(copy.existing);
        return;
      }
      if (data.session) {
        onAuthed();
        return;
      }
      setNotice(copy.checkEmail);
    } catch {
      setError(copy.generic);
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-lg border border-[var(--lite-line)] bg-white px-4 py-3 text-[var(--lite-ink)] outline-none transition-colors focus:border-[var(--lite-blue)] focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/30";

  return (
    <dialog
      ref={ref}
      aria-labelledby="lite-auth-title"
      className="lite m-auto w-[min(92vw,440px)] rounded-2xl border border-[var(--lite-line)] bg-white p-0 shadow-2xl backdrop:bg-[#1c2321]/50 backdrop:backdrop-blur-sm open:animate-[lite-pop_.2s_ease-out]"
      style={{ backgroundImage: "none" }}
    >
      <div className="relative p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-[var(--lite-muted)] transition-colors hover:bg-[var(--lite-blue-soft)] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          <X size={18} aria-hidden />
        </button>

        <h2 id="lite-auth-title" className="pr-10 font-heading text-xl font-bold">
          {mode === "signup" ? copy.title : copy.signin}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lite-muted)]">{copy.body}</p>

        {notice ? (
          <p role="status" className="mt-5 rounded-lg border border-[var(--lite-blue)]/30 bg-[var(--lite-blue-soft)] px-4 py-3 text-sm text-[var(--lite-blue)]">
            {notice}
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => void google()}
              disabled={googleBusy || busy}
              className="lite-press mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[var(--lite-line)] bg-white px-6 font-semibold transition-colors hover:border-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-60"
            >
              {googleBusy ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <GoogleMark />}
              {copy.google}
            </button>

            <div className="my-4 flex items-center gap-3 text-xs text-[var(--lite-muted)]" aria-hidden>
              <span className="h-px flex-1 bg-[var(--lite-line)]" />
              {copy.or}
              <span className="h-px flex-1 bg-[var(--lite-line)]" />
            </div>

            <form onSubmit={submit} className="space-y-3">
              {mode === "signup" && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">{copy.name}</span>
                  <input
                    className={field}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={120}
                  />
                </label>
              )}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{copy.email}</span>
                <input
                  className={field}
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={200}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{copy.password}</span>
                <input
                  className={field}
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={200}
                />
              </label>

              {error && (
                <p role="alert" className="text-sm text-[#b42318]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy || googleBusy}
                className="lite-brand lite-press mt-2 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-60"
              >
                {busy && <Loader2 size={18} className="animate-spin" aria-hidden />}
                {mode === "signup" ? copy.submitSignup : copy.submitSignin}
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "signup" ? "signin" : "signup");
                    setError(null);
                  }}
                  className="cursor-pointer text-[var(--lite-blue-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 rounded"
                >
                  {mode === "signup" ? copy.switchToSignin : copy.switchToSignup}
                </button>
                {mode === "signin" && (
                  <a
                    href={`${APP_URL}/auth`}
                    className="text-[var(--lite-muted)] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 rounded"
                  >
                    {copy.forgot}
                  </a>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
