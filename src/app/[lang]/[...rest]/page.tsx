import { notFound } from "next/navigation";

/**
 * Catch-all for unknown URLs under a new language (/de/foo). Its only job is
 * to call notFound(); real routes are more specific and win over it. Unlike
 * /es there is no localized 404 (not-found.tsx gets no params): the English
 * one renders. Docs (/de/docs/…) land here until src/app/[lang]/docs exists.
 */
export default function LangCatchAll() {
  notFound();
}
