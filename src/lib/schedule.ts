import "server-only";

import { SALES_EMAIL, SALES_NOTIFY_EMAILS } from "@/lib/site";

/**
 * Server-side helpers for the /schedule page: resolve the sales rep's booking
 * link, record the meeting request, and give the rep an instant heads-up.
 *
 * The booking link lives in platform_admins.scheduler_url (edited in
 * tavnit-admin → Settings → Admins), keyed by the rep's sales_email — the
 * same SALES_EMAIL constant the rest of the site uses. Changing the Calendly
 * there updates the page without a deploy; FOLLOWUP_SCHEDULER_URL is the env
 * fallback, and with neither the page degrades to a mailto.
 */

function serviceHeaders(): HeadersInit | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function getSalesSchedulerUrl(): Promise<string | null> {
  const fallback = process.env.FOLLOWUP_SCHEDULER_URL || null;
  const headers = serviceHeaders();
  const base = process.env.SUPABASE_URL;
  if (!headers || !base) return fallback;
  try {
    const res = await fetch(
      `${base}/rest/v1/platform_admins?sales_email=eq.${encodeURIComponent(
        SALES_EMAIL,
      )}&select=scheduler_url&limit=1`,
      { headers, next: { revalidate: 300 } },
    );
    if (!res.ok) return fallback;
    const rows = (await res.json()) as Array<{ scheduler_url: string | null }>;
    return rows[0]?.scheduler_url || fallback;
  } catch {
    return fallback;
  }
}

export interface MeetingRequest {
  name: string;
  email: string;
  company: string | null;
  topic: string | null;
}

/** Best-effort insert — the visitor still gets the calendar if storage is
 *  down; the notification email below is the second copy of the lead. */
export async function saveMeetingRequest(req: MeetingRequest): Promise<boolean> {
  const headers = serviceHeaders();
  const base = process.env.SUPABASE_URL;
  if (!headers || !base) return false;
  try {
    const res = await fetch(`${base}/rest/v1/meeting_requests`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify(req),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Same Mailgun account and env names the follow-up questionnaire uses.
 *  Optional by design: without MAILGUN_API_KEY this quietly no-ops. */
export async function notifyMeetingRequest(
  req: MeetingRequest,
  stored: boolean,
): Promise<void> {
  const apiKey = process.env.MAILGUN_API_KEY;
  if (!apiKey) return;
  const domain = process.env.MAILGUN_DOMAIN ?? "mg.tavnit.io";
  const baseUrl = process.env.MAILGUN_BASE_URL ?? "https://api.mailgun.net/v3";
  const from = process.env.FOLLOWUP_FROM_EMAIL ?? `Tavnit <no-reply@${domain}>`;

  const who = [req.name, req.company].filter(Boolean).join(" — ");
  const body = [
    `${who} pidió agendar una reunión desde tavnit.io/schedule.`,
    "",
    `• Nombre: ${req.name}`,
    `• Email: ${req.email}`,
    req.company ? `• Empresa: ${req.company}` : null,
    req.topic ? `• Quiere hablar de: ${req.topic}` : null,
    "",
    "Se le mostró tu Calendly al enviar el formulario — revisa si ya reservó.",
    stored ? null : "(Aviso: no se pudo guardar en la base — este correo es la única copia.)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await fetch(`${baseUrl}/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        from,
        to: SALES_NOTIFY_EMAILS.join(", "),
        subject: `📅 Reunión solicitada — ${who}`,
        text: body,
        "h:Reply-To": req.email,
      }).toString(),
    });
  } catch {
    // Notification is a bonus, never a dependency of the visitor's flow.
  }
}
