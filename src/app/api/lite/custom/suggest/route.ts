import { NextResponse } from "next/server";
import { LiteApiError, suggestFields } from "@/lib/lite/api";
import {
  customConfigured,
  discardDraft,
  reserveSuggestion,
  sanitizeSuggestion,
  saveDraft,
  suggestsRemaining,
} from "@/lib/lite/custom-server";
import type { CustomSuggestion } from "@/lib/lite/custom";
import { sameOrigin } from "@/lib/lite/origin";
import { clientIp, getOrCreateSessionId, hashIp } from "@/lib/lite/session";
import { isHumanSession, markHumanSession, verifyTurnstile } from "@/lib/lite/turnstile";
import { LiteValidationError, precheckUpload, validateUpload } from "@/lib/lite/validate";

/**
 * Custom tool, step 1: reads a sample document and proposes the columns.
 *
 * multipart/form-data:
 *   file      — the sample document (PDF, PNG or JPEG; same limits as a run)
 *   locale    — "en" | "es"
 *   cf-turnstile-response — Turnstile token (when the widget is configured)
 *   website   — honeypot
 *
 * Same defence as a run, in the same order (origin → honeypot → size and
 * magic bytes → Turnstile → full parse), then one unit of the SUGGESTION
 * quota is claimed atomically (lite_custom_reserve: per session, per IP and
 * a global daily cap of its own — a suggestion spends a model call, not
 * credits) and the product's assistant is asked. Nothing is created in the
 * product here: the answer is kept as a draft, minus the example values it
 * read from the document, and the browser gets the column names to review.
 */

export const runtime = "nodejs";
// The assistant answers inside the request (up to ~25 s, plus the upload).
export const maxDuration = 60;

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return ERR("forbidden", 403);
  if (!customConfigured()) return ERR("unavailable", 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return ERR("bad_request", 400);
  }
  if (typeof form.get("website") === "string" && (form.get("website") as string).trim() !== "") {
    return NextResponse.json({ ok: true, draftId: null });
  }

  const locale = form.get("locale") === "en" ? "en" : "es";
  const file = form.get("file");
  if (!(file instanceof Blob)) return ERR("bad_request", 400);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const rawName = file instanceof File ? file.name : null;

  try {
    precheckUpload(bytes);
  } catch (e) {
    return ERR(e instanceof LiteValidationError ? e.code : "unreadable", 400);
  }

  const ip = clientIp(request);
  const ipHash = hashIp(ip);
  const sessionId = await getOrCreateSessionId();

  const token = form.get("cf-turnstile-response");
  if (!(await isHumanSession(sessionId))) {
    if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) return ERR("captcha", 400);
    await markHumanSession(sessionId);
  }

  let validated;
  try {
    validated = await validateUpload(bytes, rawName);
  } catch (e) {
    return ERR(e instanceof LiteValidationError ? e.code : "unreadable", 400);
  }

  let reservation;
  try {
    reservation = await reserveSuggestion(sessionId, ipHash, locale);
  } catch {
    return ERR("unavailable", 503);
  }
  if (!reservation.ok) {
    return ERR(reservation.code === "quota" ? "suggest_quota" : "suggest_cap", reservation.code === "quota" ? 429 : 503);
  }
  const draftId = reservation.id;

  let suggestion;
  try {
    const raw = await suggestFields({ bytes: validated.bytes, filename: validated.filename, contentType: validated.contentType });
    suggestion = sanitizeSuggestion(raw);
  } catch (e) {
    await discardDraft(draftId);
    const status = e instanceof LiteApiError ? e.status : 502;
    if (status === 400) return ERR("no_fields", 422);
    if (status === 429 || status === 504) return ERR("busy", 503);
    return ERR(status === 503 ? "unavailable" : "backend", status === 503 ? 503 : 502);
  }
  if (!suggestion) {
    await discardDraft(draftId);
    return ERR("no_fields", 422);
  }

  try {
    await saveDraft(draftId, {
      name: suggestion.name,
      document_type: suggestion.documentType,
      suggestion: { fields: suggestion.stored },
    });
  } catch {
    await discardDraft(draftId);
    return ERR("unavailable", 503);
  }

  const body: CustomSuggestion = {
    draftId,
    name: suggestion.name,
    documentType: suggestion.documentType,
    fields: suggestion.view,
    remaining: await suggestsRemaining(sessionId, ipHash),
  };
  return NextResponse.json({ ok: true, ...body });
}
