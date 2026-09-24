import "server-only";

import { PDFDocument } from "pdf-lib";
import { LITE_LIMITS } from "@/lib/lite/tools";

/**
 * Upload validation for the free tools. Everything is decided from the bytes,
 * never from the filename or the client-supplied content type:
 *  - size cap;
 *  - magic bytes for PDF / PNG / JPEG;
 *  - page count for PDFs (credits are charged per page), rejecting anything
 *    pdf-lib cannot parse — a malformed file should fail here, cheaply,
 *    not inside the backend.
 */

export type LiteFileKind = "pdf" | "png" | "jpeg";

export interface ValidatedFile {
  kind: LiteFileKind;
  contentType: string;
  pages: number;
  bytes: Uint8Array;
  filename: string;
}

export class LiteValidationError extends Error {
  constructor(public readonly code:
    | "empty"
    | "too_large"
    | "unsupported"
    | "unreadable"
    | "too_many_pages") {
    super(code);
  }
}

function sniff(bytes: Uint8Array): LiteFileKind | null {
  if (bytes.length < 8) return null;
  // %PDF-
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d) {
    return "pdf";
  }
  // \x89PNG\r\n\x1a\n
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return "png";
  }
  // FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  return null;
}

const CONTENT_TYPES: Record<LiteFileKind, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpeg: "image/jpeg",
};

const EXT: Record<LiteFileKind, string> = { pdf: ".pdf", png: ".png", jpeg: ".jpg" };

/** Keeps a readable name for the backend's run list, drops anything that
 *  could be a path or control character, and forces the real extension. */
export function safeFilename(raw: string | null | undefined, kind: LiteFileKind): string {
  const baseName = (raw || "")
    .split(/[\\/]/)
    .pop()!
    .replace(/\.[^.]*$/, "")
    .replace(/[^\p{L}\p{N} ._-]/gu, "")
    .trim()
    .slice(0, 80);
  return `${baseName || "document"}${EXT[kind]}`;
}

export async function validateUpload(
  bytes: Uint8Array,
  rawFilename: string | null | undefined,
): Promise<ValidatedFile> {
  if (bytes.length === 0) throw new LiteValidationError("empty");
  if (bytes.length > LITE_LIMITS.maxBytes) throw new LiteValidationError("too_large");

  const kind = sniff(bytes);
  if (!kind) throw new LiteValidationError("unsupported");

  let pages = 1;
  if (kind === "pdf") {
    try {
      const doc = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
        updateMetadata: false,
        throwOnInvalidObject: false,
      });
      pages = doc.getPageCount();
    } catch {
      throw new LiteValidationError("unreadable");
    }
    if (pages < 1) throw new LiteValidationError("unreadable");
    if (pages > LITE_LIMITS.maxPages) throw new LiteValidationError("too_many_pages");
  }

  return {
    kind,
    contentType: CONTENT_TYPES[kind],
    pages,
    bytes,
    filename: safeFilename(rawFilename, kind),
  };
}
