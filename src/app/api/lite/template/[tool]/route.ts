import { NextResponse } from "next/server";
import { isLiteToolId } from "@/lib/lite/tools";
import { TEMPLATES } from "@/lib/lite/templates";
import { getOrCreateSessionId } from "@/lib/lite/session";
import { insertIntent, storeConfigured } from "@/lib/lite/store";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * Download of a blank template (src/lib/lite/templates.ts). No sign-in and no
 * quota: it costs nothing to build and it is the page's answer to the
 * "formato para descargar" searches. The download is noted as a `download`
 * intent with feature `template`, best-effort, so the admin can see how often
 * the template is what people came for.
 */

export const runtime = "nodejs";

const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export async function GET(request: Request, ctx: { params: Promise<{ tool: string }> }) {
  const { tool } = await ctx.params;
  if (!isLiteToolId(tool)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const template = TEMPLATES[tool];
  if (!template) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const locale = new URL(request.url).searchParams.get("locale") === "en" ? "en" : "es";

  if (storeConfigured()) {
    try {
      const user = authConfigured() ? await currentUser() : null;
      await insertIntent({
        session_id: await getOrCreateSessionId(),
        user_id: user?.id ?? null,
        tool,
        kind: "download",
        feature: "template",
        locale,
        payload: {},
      });
    } catch {
      // Never block the download on telemetry.
    }
  }

  const bytes = template.build(locale);
  const filename = template.filename[locale];
  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": XLSX,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
