import { NextRequest, NextResponse } from "next/server";
import { STEPS } from "@/lib/followup/flow";
import { sendCompletionEmail } from "@/lib/followup/notify";
import { getInviteByToken, updateInvite } from "@/lib/followup/store";

export const runtime = "nodejs";

/**
 * Progress events from the questionnaire. Every answer is persisted the moment
 * it's given — a client who quits halfway still leaves sales their sentiment
 * and whatever else they said, which is most of the value of this form.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const invite = await getInviteByToken(token);
  if (!invite) {
    return NextResponse.json({ error: "unknown_token" }, { status: 404 });
  }

  let body: { type?: string; step?: string; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const now = new Date().toISOString();

  switch (body.type) {
    case "opened": {
      if (!invite.opened_at) await updateInvite(token, { opened_at: now });
      return NextResponse.json({ ok: true });
    }
    case "answer": {
      const step = body.step && STEPS[body.step];
      if (!step) {
        return NextResponse.json({ error: "unknown_step" }, { status: 400 });
      }
      const value = sanitize(body.value);
      if (value === undefined) {
        return NextResponse.json({ error: "bad_value" }, { status: 400 });
      }
      await updateInvite(token, {
        answers: { ...invite.answers, [step.id]: value },
        ...(step.id === "sentiment" ? { sentiment: String(value) } : {}),
        ...(invite.started_at ? {} : { started_at: now }),
      });
      return NextResponse.json({ ok: true });
    }
    case "complete": {
      if (!invite.completed_at) {
        await updateInvite(token, { completed_at: now });
        // Awaited so serverless doesn't kill it mid-send; failures are
        // swallowed inside — the rep's email must never block the client.
        await sendCompletionEmail({ ...invite, completed_at: now });
      }
      return NextResponse.json({ ok: true });
    }
    default:
      return NextResponse.json({ error: "unknown_type" }, { status: 400 });
  }
}

/** Answers are free text from the public internet — cap size, allow only strings. */
function sanitize(value: unknown): string | string[] | undefined {
  if (typeof value === "string") return value.slice(0, 2000);
  if (Array.isArray(value) && value.length <= 20 && value.every((v) => typeof v === "string")) {
    return value.map((v) => v.slice(0, 200));
  }
  return undefined;
}
