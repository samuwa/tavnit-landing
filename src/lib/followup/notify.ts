import "server-only";

import { STEPS, formatAnswer, tr } from "@/lib/followup/flow";
import { SALES_EMAIL } from "@/lib/site";
import type { FollowupInvite } from "./store";

/**
 * Instant heads-up to the sales rep when a prospect finishes the
 * questionnaire — the moment of peak interest is right after they answer,
 * so the rep should know within seconds, not at the next panel check.
 *
 * Sends through Resend's HTTP API (same provider tavnit-admin uses, no SDK
 * needed for one endpoint). Configuration is optional by design: without
 * RESEND_API_KEY the questionnaire still works and this quietly no-ops —
 * notification is a bonus, never a dependency of the client's flow.
 */

const TEMPERATURE: Record<string, string> = {
  loved: "🔥 Lead caliente",
  unsure: "🌤 Lead tibio",
  not_needed: "❄️ Lead frío",
};

export async function sendCompletionEmail(invite: FollowupInvite): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FOLLOWUP_FROM_EMAIL;
  if (!apiKey || !from) return;

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

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `${temperature} — ${who}`,
        text: body,
      }),
    });
  } catch {
    // Notification is best-effort; the completion itself is already stored.
  }
}
