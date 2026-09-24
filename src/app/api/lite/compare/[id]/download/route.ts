import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { updateRun } from "@/lib/lite/store";
import { buildXlsx } from "@/lib/lite/excel";
import { compareState } from "@/lib/lite/compare-server";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { TOOL_COPY } from "@/lib/lite/copy";
import { authConfigured, currentUser } from "@/lib/supabase/server";
import type { CompareResult } from "@/lib/lite/compare";

/** The comparison as Excel. Same two gates as the run download: the session
 *  owns it, and the visitor is signed in. */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

function sheet(result: CompareResult, labels: NonNullable<ReturnType<typeof copyFor>>["labels"], status: NonNullable<ReturnType<typeof copyFor>>["status"]) {
  if (result.kind === "po") {
    const [ref, doc] = result.docs;
    const columns = [
      labels.description,
      `${labels.quantity} (${ref.label})`,
      `${labels.quantity} (${doc.label})`,
      `${labels.price} (${ref.label})`,
      `${labels.price} (${doc.label})`,
      `${labels.total} (${ref.label})`,
      `${labels.total} (${doc.label})`,
      labels.status,
    ];
    const rows = result.lines.map((l) => ({
      [columns[0]]: l.description,
      [columns[1]]: l.ref?.qty ?? null,
      [columns[2]]: l.doc?.qty ?? null,
      [columns[3]]: l.ref?.price ?? null,
      [columns[4]]: l.doc?.price ?? null,
      [columns[5]]: l.ref?.total ?? null,
      [columns[6]]: l.doc?.total ?? null,
      [columns[7]]: status[l.status],
    }));
    return { columns, rows };
  }
  const columns = [labels.description, ...result.suppliers.map((s) => `${labels.price} (${s.label})`), labels.champion];
  const rows = result.lines.map((l) => {
    const o: Record<string, unknown> = { [columns[0]]: l.description };
    result.suppliers.forEach((s, i) => {
      o[`${labels.price} (${s.label})`] = l.prices[i];
    });
    o[labels.champion] = l.champion.map((i) => result.suppliers[i].label).join(", ");
    return o;
  });
  return { columns, rows };
}

function copyFor(tool: string, locale: "es" | "en") {
  if (!isLiteToolId(tool)) return null;
  return TOOL_COPY[tool][locale].compare ?? null;
}

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  let state;
  try {
    state = await compareState(id, sessionId);
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!state) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (state.status !== "completed") return NextResponse.json({ error: "not_ready" }, { status: 409 });

  const locale = state.owned.locale === "en" ? "en" : "es";
  const copy = copyFor(state.owned.tool, locale);
  if (!copy || !isLiteToolId(state.owned.tool)) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const { columns, rows } = sheet(state.result, copy.labels, copy.status);
  const sourceName = state.result.kind === "po" ? state.result.docs.map((d) => d.file).join(" vs ") : state.result.suppliers.map((d) => d.file).join(" + ");
  const xlsx = buildXlsx({ columns, rows, locale, sourceName, toolPath: LITE_TOOLS[state.owned.tool].paths[locale] });

  await updateRun(id, { user_id: user.id, user_email: user.email, downloaded_at: new Date().toISOString() });

  const base = (state.result.kind === "po" ? "po-check" : "quotes").slice(0, 60);
  const filename = `tavnit-${base}.xlsx`;
  return new NextResponse(xlsx as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
