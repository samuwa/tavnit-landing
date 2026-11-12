import "server-only";

import { updateRun, userDownloadedToday } from "@/lib/lite/store";
import { SITE_URL } from "@/lib/site";

/**
 * "A visitor signed in to download a free tool's result" — the moment a
 * Tavnit Lite visitor becomes a lead. Every download route records it here:
 * the lite_runs row is stamped with who downloaded it, and the address in
 * NOTIFICAR_NEW_SIGNIN gets a heads-up email.
 *
 * One email per person and UTC day (their first download of the day), so a
 * visitor who downloads five files, or every piece of a split PDF, is one
 * notification. Sent through Mailgun with the env names followup/notify.ts
 * uses. Optional by design: without NOTIFICAR_NEW_SIGNIN or MAILGUN_API_KEY
 * nothing is sent, and a failed send never costs the visitor the download.
 */

export interface DownloadContext {
  tool: string;
  locale: string;
  filename?: string | null;
  sample?: boolean;
}

export async function recordDownload(
  runId: string,
  user: { id: string; email?: string | null },
  ctx: DownloadContext,
): Promise<void> {
  // Asked BEFORE this download is stamped: it must not count itself.
  const notify = notificationConfigured() && !(await userDownloadedToday(user.id));
  await updateRun(runId, {
    ...(ctx.sample ? { status: "completed" } : {}),
    user_id: user.id,
    user_email: user.email ?? null,
    downloaded_at: new Date().toISOString(),
  });
  if (notify) await sendSignInEmail(user, ctx);
}

function notificationConfigured(): boolean {
  return Boolean(process.env.NOTIFICAR_NEW_SIGNIN?.trim() && process.env.MAILGUN_API_KEY);
}

/** One line, no control characters: these values come from the visitor. */
function clean(value: string | null | undefined, max = 200): string {
  return (value ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

async function sendSignInEmail(user: { email?: string | null }, ctx: DownloadContext): Promise<void> {
  const to = process.env.NOTIFICAR_NEW_SIGNIN?.trim();
  const apiKey = process.env.MAILGUN_API_KEY;
  if (!to || !apiKey) return;
  const domain = process.env.MAILGUN_DOMAIN || "mg.tavnit.io";
  const baseUrl = process.env.MAILGUN_BASE_URL || "https://api.mailgun.net/v3";
  const from = process.env.FOLLOWUP_FROM_EMAIL || `Tavnit <no-reply@${domain}>`;

  const email = clean(user.email) || "(sin correo)";
  const tool = clean(ctx.tool, 80) || "?";
  const filename = clean(ctx.filename);
  const body = [
    "Un visitante inició sesión en el landing para descargar el resultado de una herramienta gratuita.",
    "",
    `• Correo: ${email}`,
    `• Herramienta: ${tool}${ctx.sample ? " (archivo de ejemplo)" : ""}`,
    filename ? `• Archivo: ${filename}` : null,
    `• Idioma: ${ctx.locale === "en" ? "en" : "es"}`,
    `• Fecha: ${new Date().toISOString()}`,
    "",
    `${SITE_URL}/tools`,
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
        to,
        subject: `Nuevo inicio de sesión en Tavnit Lite — ${email} (${tool})`,
        text: body,
      }).toString(),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Best effort: the lead row is already stored.
  }
}
