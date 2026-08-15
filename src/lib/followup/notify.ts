import "server-only";

import { STEPS, formatAnswer, tr } from "@/lib/followup/flow";
import { SALES_EMAIL } from "@/lib/site";
import type { FollowupInvite } from "./store";

/**
 * Instant heads-up to the sales rep when a prospect finishes the
 * questionnaire — the moment of peak interest is right after they answer,
 * so the rep should know within seconds, not at the next panel check.
 *
 * Sends through Mailgun's HTTP API with the same env names and defaults
 * tavnit-flask uses (MAILGUN_API_KEY / MAILGUN_DOMAIN / MAILGUN_BASE_URL,
 * sender no-reply@mg.tavnit.io). Configuration is optional by design:
 * without MAILGUN_API_KEY the questionnaire still works and this quietly
 * no-ops — notification is a bonus, never a dependency of the client's flow.
 */

const TEMPERATURE: Record<string, string> = {
  loved: "🔥 Lead caliente",
  unsure: "🌤 Lead tibio",
  not_needed: "❄️ Lead frío",
};

export async function sendCompletionEmail(invite: FollowupInvite): Promise<void> {
  const apiKey = process.env.MAILGUN_API_KEY;
  if (!apiKey) return;
  const domain = process.env.MAILGUN_DOMAIN ?? "mg.tavnit.io";
  const baseUrl = process.env.MAILGUN_BASE_URL ?? "https://api.mailgun.net/v3";
  const from = process.env.FOLLOWUP_FROM_EMAIL ?? `Tavnit <no-reply@${domain}>`;

  const to = invite.sales_rep_email ?? SALES_EMAIL;
  const who = [invite.client_name, invite.company].filter(Boolean).join(" — ");
  const temperature = TEMPERATURE[String(invite.sentiment)] ?? "Respondió";

  const lines = Object.entries(invite.answers)
    .filter(([id]) => STEPS[id]?.recordLabel)
    .map(([id, v]) => `• ${tr(STEPS[id].recordLabel, "es")}: ${formatAnswer(id, v, "es")}`);
  if (invite.files.length > 0) {
    lines.push(`• Archivos subidos: ${invite.files.length}`);
  }

  const adminUrl = process.env.FOLLOWUP_ADMIN_URL;
  const body = [
    `${temperature}: ${who} completó el cuestionario post-reunión.`,
    "",
    ...lines,
    "",
    adminUrl ? `Detalle completo: ${adminUrl.replace(/\/$/, "")}/followups/${invite.id}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const form = new URLSearchParams({
    from,
    to,
    subject: `${temperature} — ${who}`,
    text: body,
  });

  try {
    await fetch(`${baseUrl}/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
  } catch {
    // Notification is best-effort; the completion itself is already stored.
  }
}
