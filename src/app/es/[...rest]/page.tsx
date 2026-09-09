import { notFound } from "next/navigation";

/**
 * Catch-all for unknown URLs under /es. Its only job is to call notFound()
 * so the Spanish not-found.tsx renders instead of the English root one.
 * Real Spanish routes are more specific and win over this segment.
 */
export default function SpanishCatchAll() {
  notFound();
}
