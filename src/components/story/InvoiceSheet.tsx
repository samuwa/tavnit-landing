/** A value on the invoice. In the data layer it carries its field name. */
function Val({ k, data, children, className = "" }: { k: string; data: boolean; children: React.ReactNode; className?: string }) {
  return (
    <span
      data-k={data ? undefined : k.replace(/\[.*\]$/, "")}
      className={`relative -mx-1 rounded-[3px] px-1 ${
        data ? "bg-(--lens-value-bg) text-(--lens-value) shadow-[inset_0_0_0_1px_var(--lens-value-ring)]" : ""
      } ${className}`}
    >
      {data && (
        <span className="absolute -top-[10px] left-0 whitespace-nowrap rounded-sm bg-(--lens-tag-bg) px-1 font-mono text-[7.5px] font-bold not-italic leading-[11px] tracking-normal text-(--lens-tag)">
          {k}
        </span>
      )}
      {children}
    </span>
  );
}

export const HANDWRITING = { fontFamily: '"Bradley Hand", "Segoe Script", "Comic Sans MS", cursive' };

/**
 * The same sheet twice: as paper, and as what Tavnit reads in it. Identical
 * layout in both (only colours change) so the lens can reveal one through
 * the other without anything shifting. The data layer takes its colours
 * from the --lens-* tokens: a night blueprint on the dark theme, pale blue
 * tracing paper on the light one (a dark disc on the light page read as a
 * hole into dark mode).
 */
export default function InvoiceSheet({ data = false }: { data?: boolean }) {
  const ink = data ? "text-(--lens-ink)" : "text-[#1c2321]";
  const muted = data ? "text-(--lens-muted)" : "text-[#6b7672]";
  const rule = data ? "border-(--lens-rule)" : "border-[#e4e7e2]";
  return (
    <div
      className={`h-full w-full p-4 text-left sm:p-5 ${ink} ${data ? "bg-(--lens-bg)" : "bg-[#fdfcf8]"}`}
      style={
        data
          ? {
              backgroundImage:
                "linear-gradient(var(--lens-grid) 1px, transparent 1px), linear-gradient(90deg, var(--lens-grid) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }
          : undefined
      }
    >
      <div className={`flex items-start justify-between gap-3 border-b pb-3 ${rule}`}>
        <div className="min-w-0">
          <div className={`text-[8.5px] font-semibold uppercase tracking-[0.16em] ${muted}`}>Rechnung · Invoice</div>
          <div className="mt-1 text-[13.5px] font-bold">
            <Val k="vendor" data={data}>
              Northwind Freight GmbH
            </Val>
          </div>
          <div className={`mt-0.5 text-[9.5px] ${muted}`}>Am Sandtorkai 41 · 20457 Hamburg</div>
        </div>
        <div className={`shrink-0 text-right font-mono text-[10px] leading-[2] ${muted}`}>
          <div>
            Nr.{" "}
            <Val k="invoice_no" data={data} className={data ? "" : "text-[#1c2321]"}>
              NW-2026-0412
            </Val>
          </div>
          <div>
            Datum{" "}
            <Val k="date" data={data} className={data ? "" : "text-[#1c2321]"}>
              11.04.2026
            </Val>
          </div>
        </div>
      </div>

      <div className={`mt-3 flex items-center gap-2 text-[10px] ${muted}`}>
        <span>Bestell-Nr.</span>
        {/* Written in by hand: this is the value the review will doubt. */}
        <span className={`inline-block -rotate-2 text-[14px] italic ${data ? "" : "text-[#2743a8]"}`} style={HANDWRITING}>
          <Val k="po_number" data={data}>
            PO-8817
          </Val>
        </span>
      </div>

      <div className="mt-3">
        <div className={`flex justify-between py-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] ${muted}`}>
          <span>Beschreibung</span>
          <span>Betrag</span>
        </div>
        {[
          ["Seefracht HAM–NYC", "2.480,00"],
          ["Zollabfertigung", "185,00"],
          ["Containerumschlag", "620,00"],
        ].map(([what, amount], i) => (
          <div key={what} className={`flex justify-between gap-2 border-t py-[6px] text-[10.5px] ${rule}`}>
            {/* Not truncate: its overflow clip cut the value's box at the sides
                and its field-name tag above. These descriptions fit. */}
            <span className="min-w-0 whitespace-nowrap">
              {i === 0 ? (
                <Val k="line_items[3]" data={data}>
                  {what}
                </Val>
              ) : (
                what
              )}
            </span>
            <span className="shrink-0 font-mono">{amount}</span>
          </div>
        ))}
      </div>

      <div className={`mt-2 flex items-center justify-between border-t pt-2.5 text-[11.5px] ${rule}`}>
        <span className="font-semibold">Gesamt EUR</span>
        <span className="font-mono font-bold">
          <Val k="total" data={data}>
            3.285,00
          </Val>
        </span>
      </div>
    </div>
  );
}
