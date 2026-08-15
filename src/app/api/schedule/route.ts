import { NextResponse } from "next/server";
import {
  notifyMeetingRequest,
  saveMeetingRequest,
  type MeetingRequest,
} from "@/lib/schedule";

/**
 * Receives the /schedule form. Stores the lead and emails the sales rep;
 * both are best-effort individually, but at least one copy must land —
 * otherwise the visitor deserves the error instead of a silent void.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot: real users never see (or fill) the "website" field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const req: MeetingRequest = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    company: str(body.company, 160) || null,
    topic: str(body.topic, 2000) || null,
  };
  if (!req.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(req.email)) {
    return NextResponse.json({ error: "That doesn't look like an email" }, { status: 400 });
  }

  const stored = await saveMeetingRequest(req);
  await notifyMeetingRequest(req, stored);

  if (!stored && !process.env.MAILGUN_API_KEY) {
    return NextResponse.json(
      { error: "Could not submit right now — please try again or email us." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
