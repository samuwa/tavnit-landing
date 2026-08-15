import { NextRequest, NextResponse } from "next/server";
import { getInviteByToken, updateInvite, uploadFile } from "@/lib/followup/store";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const MAX_FILES_PER_INVITE = 10;

/** Same document types the product itself ingests. */
const ALLOWED_EXTENSIONS =
  /\.(pdf|png|jpe?g|webp|tiff?|csv|xlsx?|docx?)$/i;

export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const invite = await getInviteByToken(token);
  if (!invite) {
    return NextResponse.json({ error: "unknown_token" }, { status: 404 });
  }
  if (invite.files.length >= MAX_FILES_PER_INVITE) {
    return NextResponse.json({ error: "too_many_files" }, { status: 400 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 400 });
  }
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }

  const path = await uploadFile(token, file.name, file.type, await file.arrayBuffer());
  await updateInvite(token, {
    files: [...invite.files, { name: file.name, path, size: file.size }],
  });

  return NextResponse.json({ ok: true, name: file.name });
}
