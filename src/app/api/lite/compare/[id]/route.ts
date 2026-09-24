import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { compareState } from "@/lib/lite/compare-server";

/** Polls one comparison; only the session that started it can read it. */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  let state;
  try {
    state = await compareState(id, sessionId);
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!state) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (state.status === "completed") return NextResponse.json({ status: "completed", result: state.result });
  return NextResponse.json(state);
}
