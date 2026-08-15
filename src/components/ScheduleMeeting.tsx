"use client";

import { useState } from "react";
import { ArrowRight, CalendarCheck, Loader2, Mail } from "lucide-react";

/**
 * The /schedule flow: a short lead form first, then the sales rep's Calendly
 * inline, prefilled with what the visitor just typed. The form is what makes
 * the lead ours (name, company, topic land in meeting_requests + the rep's
 * inbox) even if the visitor never picks a slot.
 */

/** Calendly/Cal.com URL tuned for a dark in-page embed, with the visitor's
 *  details prefilled so they don't type them twice. */
function embedUrl(url: string, prefill: { name: string; email: string }): string {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("calendly.com")) {
      u.searchParams.set("embed_domain", window.location.hostname);
      u.searchParams.set("embed_type", "Inline");
      u.searchParams.set("hide_gdpr_banner", "1");
      u.searchParams.set("background_color", "0a0a1a");
      u.searchParams.set("text_color", "e2e8f0");
      u.searchParams.set("primary_color", "3b82f6");
    } else if (u.hostname.endsWith("cal.com")) {
      u.searchParams.set("embed", "true");
      u.searchParams.set("theme", "dark");
    }
    if (prefill.name) u.searchParams.set("name", prefill.name);
    if (prefill.email) u.searchParams.set("email", prefill.email);
    return u.toString();
  } catch {
    return url;
  }
}

const inputClass =
  "w-full glass-card rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 " +
  "focus:outline-none focus:border-[#3b82f6]/50 focus-visible:outline-2 focus-visible:outline-[#3b82f6]";

export default function ScheduleMeeting({
  schedulerUrl,
  salesEmail,
}: {
  schedulerUrl: string | null;
  salesEmail: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, topic, website }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "Something went wrong — please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3 glass-card rounded-xl px-5 py-4">
          <CalendarCheck size={20} className="shrink-0 text-[#3b82f6]" aria-hidden />
          <p className="text-sm text-slate-300">
            Thanks, {name.split(" ")[0] || "there"} — now pick a time that works
            for you{schedulerUrl ? " below" : ""}.
          </p>
        </div>

        {schedulerUrl ? (
          <div className="overflow-hidden rounded-2xl border border-white/15">
            {/* Calendly wants ~700px, but never taller than the viewport —
                on short screens the widget scrolls internally instead of
                pushing the page. */}
            <iframe
              src={embedUrl(schedulerUrl, { name, email })}
              title="Pick a meeting time"
              className="h-[min(680px,calc(100svh-200px))] min-h-[420px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="glass-card rounded-2xl px-6 py-8 text-center">
            <p className="mb-4 text-slate-300">
              We got your request and will reach out shortly to find a time.
            </p>
            <a
              href={`mailto:${salesEmail}`}
              className="inline-flex items-center gap-2 text-[#3b82f6] hover:underline"
            >
              <Mail size={16} aria-hidden />
              {salesEmail}
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Name *</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Ana García"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Work email *</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            autoComplete="email"
            placeholder="ana@company.com"
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Company</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={160}
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">
            What would you like to discuss?
          </span>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={2000}
            rows={3}
            placeholder="e.g. We process ~500 supplier invoices a month and want them in our ERP without re-typing."
            className={`${inputClass} resize-none`}
          />
        </label>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting || !name.trim() || !email.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#3b82f6]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#3b82f6]/30 disabled:pointer-events-none disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 size={18} className="animate-spin" aria-hidden />
          ) : (
            <ArrowRight size={18} aria-hidden />
          )}
          {submitting ? "Sending…" : "Continue to pick a time"}
        </button>
        <p className="text-xs text-slate-500">
          Prefer email?{" "}
          <a href={`mailto:${salesEmail}`} className="text-slate-400 hover:text-white">
            {salesEmail}
          </a>
        </p>
      </div>
    </form>
  );
}
