import { NextResponse } from "next/server";
import { markMeetingScheduled } from "@/lib/schedule";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Only accept Calendly API URIs — these get stored and later fetched. */
function calendlyUri(v: unknown): string | null {
  if (typeof v !== "string") return null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" && u.hostname === "api.calendly.com"
      ? u.toString()
      : null;
  } catch {
    return null;
  }
}

/** A plausible meeting start: parseable, and between now-ish and two years out. */
function meetingTime(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = new Date(v).getTime();
  if (Number.isNaN(t)) return null;
  const now = Date.now();
  if (t < now - 86_400_000 || t > now + 2 * 365 * 86_400_000) return null;
  return new Date(t).toISOString();
}

/**
 * Called by the /schedule page when the Calendly embed reports
 * calendly.event_scheduled, so the admin panel can show which requests
 * became meetings and for when.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body.id !== "string" || !UUID_RE.test(body.id)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = await markMeetingScheduled({
    id: body.id,
    eventUri: calendlyUri(body.eventUri),
    inviteeUri: calendlyUri(body.inviteeUri),
    startTime: meetingTime(body.startTime),
  });
  return NextResponse.json({ ok });
}
