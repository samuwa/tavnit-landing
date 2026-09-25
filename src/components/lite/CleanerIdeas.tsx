"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CalendarCheck, CalendarClock, Check, Mail, Sigma, TriangleAlert, Type, UserCheck, Wand2 } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { Locale } from "@/lib/locale";
import { useLiteSession } from "@/components/lite/session";
import { TavnitLink } from "@/components/lite/intent";

/**
 * "With a Cleaner you could…" — four rules beside the table, each drawn as
 * before → after with the visitor's own values when the columns are there
 * and a plain example when they are not. Deliberately simple: an
 * invitation to open Tavnit and build rules on the fields that matter to
 * them, not a rules engine on the free page.
 */

type Cell = string | number | null;

function fill(t: string, vars: Record<string, string | number>): string {
  return t.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
function findCol(columns: string[], re: RegExp): string | undefined {
  return columns.find((c) => re.test(c));
}
/** dd/mm/yyyy, d-m-yyyy, yyyy-mm-dd → ISO; null when it is not a date we recognise. */
function toIso(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(s);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return null;
}

interface Rule {
  Icon: typeof CalendarCheck;
  title: string;
  from: string;
  to: string;
  note: string;
  verdict?: { ok: boolean; label: string };
}

export default function CleanerIdeas({
  copy,
  locale,
  columns,
  rows,
}: {
  copy: ToolCopy["cleaners"];
  locale: Locale;
  columns: string[];
  rows: Record<string, Cell>[];
}) {
  const { email } = useLiteSession();
  const tag = locale === "es" ? "es-PA" : "en-US";
  const money = new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const first = rows[0] ?? {};

  // dates
  const dateCol = findCol(columns, /^(fecha|invoice_date|date)$/i) ?? findCol(columns, /fecha|date/i);
  const rawDate = dateCol ? first[dateCol] : null;
  const iso = toIso(rawDate);
  const dateVars =
    iso && typeof rawDate === "string" && iso !== rawDate
      ? { date: rawDate, iso }
      : { date: locale === "es" ? "12/09/2026" : "09/12/2026", iso: "2026-09-12" };

  // sums
  const lineCol = findCol(columns, /^(total_linea|line_total)$/i);
  const subCol = findCol(columns, /^subtotal$/i);
  let sumVars = { sum: "4,849.60", subtotal: "4,849.60" };
  let sumOk = true;
  if (lineCol && subCol && typeof first[subCol] === "number") {
    const sum = Math.round(rows.reduce((a, r) => a + (typeof r[lineCol] === "number" ? (r[lineCol] as number) : 0), 0) * 100) / 100;
    const subtotal = first[subCol] as number;
    sumVars = { sum: money.format(sum), subtotal: money.format(subtotal) };
    sumOk = Math.abs(sum - subtotal) <= 0.05;
  }

  // currency + approval
  const totalCol = findCol(columns, /^total$/i) ?? findCol(columns, /^(total_general|grand_total|monto|amount|importe)$/i);
  const curCol = findCol(columns, /^(moneda|currency)$/i);
  const total = totalCol && typeof first[totalCol] === "number" ? (first[totalCol] as number) : 5033.4;
  const currency = curCol && typeof first[curCol] === "string" ? (first[curCol] as string) : "USD";
  const mag = Math.pow(10, Math.max(2, Math.floor(Math.log10(Math.max(total, 1)))));
  const threshold = Math.floor(total / mag) * mag || mag;
  const moneyVars = { total: money.format(total), currency, threshold: money.format(threshold) };

  const vars = { ...dateVars, ...sumVars, ...moneyVars };
  const ICONS = { date: CalendarCheck, sum: Sigma, money: BadgeDollarSign, approve: UserCheck, alert: TriangleAlert, calendar: CalendarClock, mail: Mail, text: Type } as const;
  const rules: Rule[] = copy.ideas.slice(0, 4).map((idea) => ({
    Icon: ICONS[idea.icon] ?? Sigma,
    title: fill(idea.title, vars),
    from: fill(idea.from, vars),
    to: fill(idea.to, vars),
    note: fill(idea.note, vars),
    verdict: idea.check === "sum" ? { ok: sumOk, label: sumOk ? copy.ok : copy.off } : undefined,
  }));

  return (
    <section
      aria-labelledby="lite-cleaners-heading"
      className="lite-pop @container rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-blue-soft)]/60 p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="lite-cleaners-heading" className="lite-display text-2xl sm:text-[1.75rem]">
          {copy.heading}
        </h2>
        {/* The Cleaners mark: the product's own icon for Cleaners (a wand) on
            the brand gradient, with the name set like a wordmark. */}
        <span className="inline-flex items-center gap-2" aria-label={copy.tag}>
          <span className="lite-brand grid h-7 w-7 place-items-center rounded-[8px] text-white shadow-sm shadow-[#3b82f6]/30">
            <Wand2 size={15} strokeWidth={2.25} aria-hidden />
          </span>
          <span className="font-heading text-sm font-bold tracking-tight">{copy.tag}</span>
        </span>
      </div>
      <p className="mt-2 max-w-[560px] text-sm leading-relaxed text-[var(--lite-muted)]">{copy.lead}</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {rules.map(({ Icon, title, from, to, note, verdict }) => (
          <li
            key={title}
            className="rounded-xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-4 shadow-[0_1px_2px_rgba(28,35,33,0.04)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
                <Icon size={16} aria-hidden />
              </span>
              <p className="text-sm font-semibold">{title}</p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
              <span className="rounded-md border border-[var(--lite-line)] bg-[#f6f8fb] px-2.5 py-1 tabular-nums">{from}</span>
              <ArrowRight size={14} className="shrink-0 text-[var(--lite-blue)]" aria-hidden />
              <span className="rounded-md bg-[var(--lite-blue-soft)] px-2.5 py-1 font-medium tabular-nums text-[var(--lite-blue-ink)]">
                {to}
              </span>
              {verdict && (
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
                    verdict.ok ? "bg-[#e8f6ee] text-[#1e7a4f]" : "bg-[#fdf1e3] text-[#b54708]"
                  }`}
                >
                  {verdict.ok ? <Check size={12} aria-hidden /> : <TriangleAlert size={12} aria-hidden />}
                  {verdict.label}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-[var(--lite-muted)]">{note}</p>
          </li>
        ))}
      </ul>

      {/* Text on the left takes what is left; the link and the button keep
          their own width and never break, whatever the button says (its
          label changes once the session is known). The breakpoints follow
          the section's own width (container queries), not the window's. */}
      <div className="mt-6 flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-8">
        <p className="min-w-0 max-w-[460px] text-sm leading-relaxed text-[var(--lite-muted)] @3xl:flex-1">{copy.outro}</p>
        <div className="flex shrink-0 flex-col items-start gap-3 @md:flex-row @md:items-center @md:gap-5">
          <Link href="/docs/cleaners" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[var(--lite-blue-ink)] hover:underline">
            {copy.learn}
            <ArrowRight size={14} aria-hidden />
          </Link>
          <TavnitLink
            feature="cleaner"
            className="lite-brand lite-press inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-5 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
          >
            {email ? copy.ctaSignedIn : copy.cta}
          </TavnitLink>
        </div>
      </div>
    </section>
  );
}
