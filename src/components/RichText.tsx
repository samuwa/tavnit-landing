import { Fragment } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { localizedPath } from "@/lib/routes";

/**
 * The tiny markup of the content files (src/content/types.ts, `Rich`):
 * `[label](/english/path)` → a link, localised for `locale`;
 * `**bold**` → <strong>; `` `code` `` → <code>. Nothing else is parsed, so a
 * translation cannot break the page by accident.
 */

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

export default function RichText({
  text,
  locale,
  linkClassName = "text-accent hover:underline",
  strongClassName = "text-fg-2",
  codeClassName = "text-fg-3",
  vars,
}: {
  text: string;
  locale: Locale;
  linkClassName?: string;
  strongClassName?: string;
  codeClassName?: string;
  /** `{name}` placeholders replaced before parsing. */
  vars?: Record<string, string>;
}) {
  const source = vars ? text.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m) : text;
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of source.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(source.slice(last, at));
    if (m[1] !== undefined) {
      out.push(
        <Link key={at} href={localizedPath(m[2], locale)} className={linkClassName}>
          {m[1]}
        </Link>,
      );
    } else if (m[3] !== undefined) {
      out.push(
        <strong key={at} className={strongClassName}>
          {m[3]}
        </strong>,
      );
    } else {
      out.push(
        <code key={at} className={codeClassName}>
          {m[4]}
        </code>,
      );
    }
    last = at + m[0].length;
  }
  if (last < source.length) out.push(source.slice(last));
  return <Fragment>{out}</Fragment>;
}
