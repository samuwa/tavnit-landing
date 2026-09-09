"use client";

import { trackEvent } from "@/lib/analytics";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, Loader2, Mail, PartyPopper } from "lucide-react";
import type { Locale } from "@/lib/locale";

/**
 * The /schedule flow: a short lead form first, then the sales rep's Calendly
 * inline, prefilled with what the visitor just typed. The form is what makes
 * the lead ours (name, company, topic land in meeting_requests + the rep's
 * inbox) even if the visitor never picks a slot.
 */

/** Calendly/Cal.com URL tuned for a dark in-page embed, with the visitor's
 *  details prefilled so they don't type them twice. */
function embedUrl(
  url: string,
  prefill: { name: string; email: string; details: string },
): string {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("calendly.com")) {
      u.searchParams.set("embed_domain", window.location.hostname);
      u.searchParams.set("embed_type", "Inline");
      u.searchParams.set("hide_gdpr_banner", "1");
      // Default light theme on purpose: Calendly paints input VALUES with
      // text_color but keeps the fields white, so a dark-theme text_color
      // makes everything typed or prefilled look like ghost placeholder text.
      u.searchParams.set("primary_color", "3b82f6");
      // a1 prefills the event's FIRST custom question (a2 the second, …).
      // With no custom questions on the event it's silently ignored, so the
      // company + topic land in the meeting details as soon as the rep adds
      // one free-text question ("Anything to help us prepare?") in Calendly.
      if (prefill.details) u.searchParams.set("a1", prefill.details);
    } else if (u.hostname.endsWith("cal.com")) {
      u.searchParams.set("embed", "true");
      u.searchParams.set("theme", "dark");
      if (prefill.details) u.searchParams.set("notes", prefill.details);
    }
    if (prefill.name) u.searchParams.set("name", prefill.name);
    if (prefill.email) u.searchParams.set("email", prefill.email);
    return u.toString();
  } catch {
    return url;
  }
}

/** UI strings only — the API payload and the sales notification are unchanged. */
const COPY = {
  en: {
    genericError: "Something went wrong — please try again.",
    booked: (first: string, email: string) => `You're booked, ${first || "thanks"} — the invite is on its way to ${email}.`,
    thanks: (first: string, below: boolean) => `Thanks, ${first || "there"} — now pick a time that works for you${below ? " below" : ""}.`,
    iframeTitle: "Pick a meeting time",
    noScheduler: "We got your request and will reach out shortly to find a time.",
    name: "Name *",
    namePlaceholder: "Ana García",
    email: "Work email *",
    emailPlaceholder: "ana@company.com",
    company: "Company",
    companyPlaceholder: "Company name",
    topic: "What would you like to discuss?",
    topicPlaceholder: "e.g. We process ~500 supplier invoices a month and want them in our ERP without re-typing.",
    sending: "Sending…",
    submit: "Continue to pick a time",
    preferEmail: "Prefer email?",
  },
  es: {
    genericError: "Algo salió mal — inténtalo de nuevo.",
    booked: (first: string, email: string) => `Listo, ${first || "gracias"} — la invitación va en camino a ${email}.`,
    thanks: (first: string, below: boolean) => `Gracias${first ? `, ${first}` : ""} — ahora elige la hora que te convenga${below ? " aquí abajo" : ""}.`,
    iframeTitle: "Elige la hora de la reunión",
    noScheduler: "Recibimos tu solicitud y te escribimos en breve para coordinar la hora.",
    name: "Nombre *",
    namePlaceholder: "Ana García",
    email: "Correo de trabajo *",
    emailPlaceholder: "ana@empresa.com",
    company: "Empresa",
    companyPlaceholder: "Nombre de la empresa",
    topic: "¿De qué te gustaría hablar?",
    topicPlaceholder: "ej. Procesamos unas 500 facturas de proveedores al mes y queremos pasarlas al ERP sin re-tipear.",
    sending: "Enviando…",
    submit: "Continuar y elegir hora",
    preferEmail: "¿Prefieres escribirnos?",
  },
} as const;

const inputClass =
  "w-full glass-card rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 " +
  "focus:outline-none focus:border-[#3b82f6]/50 focus-visible:outline-2 focus-visible:outline-[#3b82f6]";

export default function ScheduleMeeting({
  schedulerUrl,
  salesEmail,
  locale = "en",
}: {
  schedulerUrl: string | null;
  salesEmail: string;
  locale?: Locale;
}) {
  const t = COPY[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const reportedRef = useRef(false);

  // The Calendly iframe posts calendly.event_scheduled to the page when the
  // visitor books. Report it once so the admin panel can show which requests
  // became meetings and for when.
  useEffect(() => {
    if (!submitted) return;
    function onMessage(e: MessageEvent) {
      let host = "";
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      if (!/(^|\.)calendly\.com$/.test(host)) return;
      const data = e.data as {
        event?: string;
        payload?: { event?: { uri?: string; start_time?: string }; invitee?: { uri?: string } };
      };
      if (data?.event !== "calendly.event_scheduled" || reportedRef.current) return;
      reportedRef.current = true;
      setBooked(true);
      if (requestIdRef.current) {
        void fetch("/api/schedule/scheduled", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: requestIdRef.current,
            eventUri: data.payload?.event?.uri ?? null,
            inviteeUri: data.payload?.invitee?.uri ?? null,
            startTime: data.payload?.event?.start_time ?? null,
          }),
        }).catch(() => {});
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [submitted]);

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
      const body = (await res.json().catch(() => null)) as
        | { error?: string; id?: string | null }
        | null;
      if (!res.ok) {
        setError(body?.error ?? t.genericError);
        return;
      }
      requestIdRef.current = body?.id ?? null;
      setSubmitted(true);
      trackEvent("generate_lead", { source: "schedule_form", locale });
    } catch {
      setError(t.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3 glass-card rounded-xl px-5 py-4">
          {booked ? (
            <PartyPopper size={20} className="shrink-0 text-[#3b82f6]" aria-hidden />
          ) : (
            <CalendarCheck size={20} className="shrink-0 text-[#3b82f6]" aria-hidden />
          )}
          <p className="text-sm text-slate-300">
            {booked
              ? t.booked(name.split(" ")[0], email)
              : t.thanks(name.split(" ")[0], Boolean(schedulerUrl))}
          </p>
        </div>

        {schedulerUrl ? (
          <div className="overflow-hidden rounded-2xl border border-white/15">
            {/* Calendly wants ~700px, but never taller than the viewport —
                on short screens the widget scrolls internally instead of
                pushing the page. */}
            <iframe
              src={embedUrl(schedulerUrl, {
                name,
                email,
                details: [company && `Company: ${company}`, topic]
                  .filter(Boolean)
                  .join(" — "),
              })}
              title={t.iframeTitle}
              className="h-[min(680px,calc(100svh-200px))] min-h-[420px] w-full bg-white"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="glass-card rounded-2xl px-6 py-8 text-center">
            <p className="mb-4 text-slate-300">
              {t.noScheduler}
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
          <span className="mb-1.5 block text-sm font-medium text-slate-300">{t.name}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">{t.email}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">{t.company}</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={160}
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">{t.topic}</span>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={2000}
            rows={3}
            placeholder={t.topicPlaceholder}
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
          {submitting ? t.sending : t.submit}
        </button>
        <p className="text-xs text-slate-500">
          {t.preferEmail}{" "}
          <a href={`mailto:${salesEmail}`} className="text-slate-400 hover:text-white">
            {salesEmail}
          </a>
        </p>
      </div>
    </form>
  );
}
