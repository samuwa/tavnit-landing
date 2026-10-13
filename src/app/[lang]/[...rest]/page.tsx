import { notFound } from "next/navigation";

/**
 * Catch-all for unknown URLs under a new language (/de/foo). Its only job is
 * to call notFound(); real routes are more specific and win over it. Unlike
 * /es there is no localized 404 (not-found.tsx gets no params): the English
 * one renders. Docs pages that are not translated into the language
 * (/de/docs/buckets) 404 from src/app/[lang]/docs.
 */
export default function LangCatchAll() {
  notFound();
}
