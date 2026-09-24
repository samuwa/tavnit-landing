/**
 * FAQ list for the free tools. Native <details> so every answer is in the
 * HTML for crawlers and works without JavaScript; the FAQPage schema on the
 * page carries the same pairs.
 */
export default function LiteFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-6 divide-y divide-[var(--lite-line)] rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)]">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50">
            {f.q}
            <span aria-hidden className="shrink-0 text-[var(--lite-blue)] transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--lite-muted)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
