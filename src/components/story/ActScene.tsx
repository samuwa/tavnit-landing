"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Bot, Check, Database, FilePen, FileSpreadsheet, MailCheck, Paperclip, Webhook } from "lucide-react";
import { EASE_OUT, Panel, ramp, Switch, Typed, type P, type SceneProps } from "./shared";

/**
 * Stop 6: the approved record goes out. A list of the six destinations on
 * the left, and on the right a short film of what the highlighted one does
 * with the record: a row landing in a table, a JSON body being posted, a
 * form filling in, an agent typing into a supplier's portal.
 *
 * One thing at a time, in order. The destinations that are switched on are
 * numbered; the tour takes them one by one, plays the film, lets the result
 * sit, ticks the number off and only then moves to the next. An earlier
 * pass ran each film in two and a half seconds with a highlight, a tick, a
 * progress line and the film all moving at once: nothing could be read.
 * Clicking a destination, or switching it on, plays its film; switching it
 * off takes it out of the pipeline.
 *
 * An earlier version showed six rows with a status word each. It listed the
 * destinations without showing any of them.
 */

export const OUTPUTS = [
  { id: "bucket", icon: Database, title: "Bucket", detail: "Invoices", short: "Bucket", kind: "Bucket write", node: "Invoices", does: "Rows stored" },
  { id: "webhook", icon: Webhook, title: "Webhook", detail: "to your ERP", short: "Webhook", kind: "Output", node: "ERP webhook", does: "JSON on completion" },
  { id: "email", icon: MailCheck, title: "Email", detail: "to the AP team", short: "Email", kind: "Output", node: "AP team", does: "rows.csv by email" },
  { id: "export", icon: FileSpreadsheet, title: "Excel · CSV", detail: "one-click export", short: "Excel", kind: "Output", node: "Excel export", does: ".xlsx and CSV" },
  { id: "form", icon: FilePen, title: "PDF form", detail: "payment order", short: "PDF form", kind: "Filler", node: "Payment order", does: "PDF form filled" },
  { id: "agent", icon: Bot, title: "Agent", detail: "supplier portal", short: "Agent", kind: "Agent", node: "Supplier portal", does: "Acts in a browser" },
];

/** Seconds on stage per destination: the film, then time to read the result. */
export const SECONDS_PER_OUTPUT = 4.6;
/** The share of that time the film itself takes; the rest is the pause. */
const FILM_ENDS = 0.6;

/* ------------------------------------------------------------------ */
/* The films. Each runs on `t`, 0 → 1, and is finished by about 0.85.   */
/* (The scene plays them inside the first part of a longer slot.)        */
/* ------------------------------------------------------------------ */

function useIn(t: P, from: number, to: number, rise = 8) {
  const opacity = useTransform(t, (v) => ramp(v, from, to));
  const y = useTransform(t, (v) => (1 - ramp(v, from, to)) * rise);
  return { opacity, y };
}

function Done({ t, at, children }: { t: P; at: number; children: React.ReactNode }) {
  const style = useIn(t, at, at + 0.1, 4);
  return (
    <motion.div style={style} className="flex items-center gap-1.5 text-[11px] font-semibold text-ok">
      <Check size={12} strokeWidth={2.5} />
      {children}
    </motion.div>
  );
}

function BucketFilm({ t }: { t: P }) {
  const row = useIn(t, 0.18, 0.4, 14);
  const wash = useTransform(t, (v) => 1 - 0.6 * ramp(v, 0.5, 0.8));
  const cols = "grid grid-cols-[0.8fr_1.3fr_0.9fr] gap-2 px-3";
  return (
    <div className="font-mono text-[10.5px]">
      <div className={`${cols} border-b border-tint/10 py-1.5 text-[9px] uppercase tracking-wider text-fg-5`}>
        <span>vendor_id</span>
        <span>invoice_no</span>
        <span className="text-right">total_eur</span>
      </div>
      {[
        ["V-0077", "AC-55210", "1420.00"],
        ["V-0113", "2291-B", "860.50"],
      ].map((r) => (
        <div key={r[1]} className={`${cols} border-b border-tint/[0.06] py-[7px] text-fg-4`}>
          <span>{r[0]}</span>
          <span>{r[1]}</span>
          <span className="text-right">{r[2]}</span>
        </div>
      ))}
      <motion.div style={row} className={`${cols} relative py-[7px] font-semibold text-fg`}>
        <motion.span className="absolute inset-0 bg-emerald-500/[0.12]" style={{ opacity: wash }} />
        <span className="relative">V-0192</span>
        <span className="relative">NW-2026-0412</span>
        <span className="relative text-right">3285.00</span>
      </motion.div>
      <div className="px-3 pt-3 font-sans">
        <Done t={t} at={0.62}>Row added. Edit it in place, or ask in plain language.</Done>
      </div>
    </div>
  );
}

function WebhookFilm({ t }: { t: P }) {
  const body = [
    '{ "run_id": "90450e5e…",',
    '  "rows": [ { "vendor_id": "V-0192",',
    '              "invoice_no": "NW-2026-0412",',
    '              "total_eur": 3285.00 } ] }',
  ];
  const reply = useIn(t, 0.68, 0.78, 4);
  return (
    <div className="px-3 py-2.5 font-mono text-[10.5px] leading-[1.7]">
      <div className="text-fg-2">
        <span className="font-bold text-accent">POST</span> <Typed t={t} from={0.02} to={0.2}>https://erp.yourcompany.com/hooks/invoices</Typed>
      </div>
      <div className="mt-1.5 rounded-md border border-tint/10 bg-well/20 px-2.5 py-2 text-fg-3">
        {body.map((line, i) => (
          <div key={i} className="whitespace-pre">
            <Typed t={t} from={0.22 + i * 0.1} to={0.32 + i * 0.1}>
              {line}
            </Typed>
          </div>
        ))}
      </div>
      <motion.div style={reply} className="mt-2 flex items-center gap-1.5 font-sans text-[11px] font-semibold text-ok">
        <Check size={12} strokeWidth={2.5} />
        200 OK. Retries on its own if your server is down.
      </motion.div>
    </div>
  );
}

function EmailFilm({ t }: { t: P }) {
  const mail = useIn(t, 0.04, 0.2, 12);
  const file = useIn(t, 0.3, 0.44, 6);
  return (
    <div className="px-3 py-3">
      <motion.div style={mail} className="space-y-1.5 rounded-lg border border-tint/10 bg-well/15 px-3 py-2.5 text-[11.5px]">
        <div className="flex gap-2">
          <span className="w-12 shrink-0 text-fg-5">To</span>
          <span className="truncate text-fg-3">ap@yourcompany.com</span>
        </div>
        <div className="flex gap-2">
          <span className="w-12 shrink-0 text-fg-5">Subject</span>
          <span className="truncate font-semibold text-fg">Supplier invoices · run #4128</span>
        </div>
        <motion.div style={file} className="inline-flex items-center gap-1.5 rounded-md border border-tint/15 bg-tint/[0.05] px-2 py-1 font-mono text-[10.5px] text-fg-2">
          <Paperclip size={11} /> rows.csv
        </motion.div>
      </motion.div>
      <div className="pt-3">
        <Done t={t} at={0.6}>Sent, with the rows attached.</Done>
      </div>
    </div>
  );
}

function ExcelFilm({ t }: { t: P }) {
  const cells = ["V-0192", "NW-2026-0412", "2026-04-11", "3285.00"];
  return (
    <div className="px-3 py-3">
      <div className="overflow-hidden rounded-md border border-tint/10 font-mono text-[10px]">
        <div className="grid grid-cols-[20px_0.75fr_1.45fr_1.1fr_0.85fr] bg-tint/[0.05] text-center text-[9px] text-fg-5">
          <span />
          {["A", "B", "C", "D"].map((c) => (
            <span key={c} className="border-l border-tint/10 py-1">
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[20px_0.75fr_1.45fr_1.1fr_0.85fr] border-t border-tint/10 text-fg-5">
          <span className="py-1.5 text-center text-[9px]">1</span>
          {["vendor", "invoice_no", "date", "total"].map((h) => (
            <span key={h} className="truncate border-l border-tint/10 px-1.5 py-1.5">
              {h}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[20px_0.75fr_1.45fr_1.1fr_0.85fr] border-t border-tint/10 text-fg">
          <span className="py-1.5 text-center text-[9px] text-fg-5">2</span>
          {cells.map((c, i) => (
            <span key={c} className="truncate border-l border-tint/10 px-1.5 py-1.5">
              <Typed t={t} from={0.1 + i * 0.13} to={0.2 + i * 0.13}>
                {c}
              </Typed>
            </span>
          ))}
        </div>
      </div>
      <div className="pt-3">
        <Done t={t} at={0.66}>invoice-NW-2026-0412.xlsx, numbers as numbers.</Done>
      </div>
    </div>
  );
}

function FormFilm({ t }: { t: P }) {
  const blanks = [
    ["Beneficiary", "Northwind Freight GmbH"],
    ["Reference", "NW-2026-0412"],
    ["Amount EUR", "3285.00"],
  ];
  return (
    <div className="px-3 py-3">
      <div className="rounded-lg bg-[#fdfcf8] px-3.5 py-3 text-[#1c2321] ring-1 ring-black/[0.06]">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6b7672]">Payment order</div>
        <div className="mt-2 space-y-2">
          {blanks.map(([label, value], i) => (
            <div key={label} className="flex items-end gap-2 text-[10.5px]">
              <span className="w-[72px] shrink-0 text-[#6b7672]">{label}</span>
              <span className="flex-1 border-b border-[#1c2321]/25 pb-0.5 font-mono text-[11px] text-[#2743a8]">
                <Typed t={t} from={0.08 + i * 0.18} to={0.24 + i * 0.18}>
                  {value}
                </Typed>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-3">
        <Done t={t} at={0.66}>payment_order.pdf filled from the run.</Done>
      </div>
    </div>
  );
}

function AgentFilm({ t }: { t: P }) {
  const fields = [
    ["Vendor", "Northwind Freight"],
    ["Invoice", "NW-2026-0412"],
    ["Amount", "3285.00"],
  ];
  const pressed = useTransform(t, (v) => 1 - 0.05 * ramp(v, 0.6, 0.64) + 0.05 * ramp(v, 0.66, 0.7));
  const sent = useTransform(t, (v) => ramp(v, 0.62, 0.68));
  return (
    <div className="px-3 py-3">
      <div className="overflow-hidden rounded-lg border border-tint/10 bg-well/15">
        <div className="flex items-center gap-1.5 border-b border-tint/10 bg-tint/[0.05] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fg-6" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg-6" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg-6" />
          <span className="ml-1 truncate font-mono text-[9.5px] text-fg-5">portal.acme-suppliers.com/payments/new</span>
        </div>
        <div className="space-y-1.5 px-2.5 py-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {fields.map(([label, value], i) => (
              <div key={label}>
                <div className="mb-0.5 text-[8.5px] text-fg-5">{label}</div>
                <div className="h-[22px] truncate rounded border border-tint/15 bg-panel px-1.5 py-[3px] font-mono text-[9.5px] text-fg">
                  <Typed t={t} from={0.06 + i * 0.17} to={0.2 + i * 0.17}>
                    {value}
                  </Typed>
                </div>
              </div>
            ))}
          </div>
          <motion.div className="relative w-fit rounded bg-tint/10 px-2.5 py-1 text-[10px] font-semibold text-fg-3" style={{ scale: pressed }}>
            <motion.span className="absolute inset-0 rounded bg-accent" style={{ opacity: sent }} />
            <span className="relative mix-blend-normal">Submit payment</span>
          </motion.div>
        </div>
      </div>
      <div className="pt-3">
        <Done t={t} at={0.74}>Submitted. Confirmation PAY-88231 comes back as data.</Done>
      </div>
    </div>
  );
}

const FILMS: Record<string, (props: { t: P }) => React.ReactNode> = {
  bucket: BucketFilm,
  webhook: WebhookFilm,
  email: EmailFilm,
  export: ExcelFilm,
  form: FormFilm,
  agent: AgentFilm,
};

/* ------------------------------------------------------------------ */

export default function ActScene({ p, story }: SceneProps) {
  const enabled = OUTPUTS.filter((o) => story.outputs.has(o.id));
  const count = enabled.length;

  // Which destination the tour itself is on.
  const [turn, setTurn] = useState(0);
  // The destination the visitor asked to see, if any.
  const [picked, setPicked] = useState<string | null>(null);
  // Destinations whose film has played: they have received the record.
  const [sent, setSent] = useState<ReadonlySet<string>>(() => new Set());

  // For the clock below, which runs outside React.
  const live = useRef({ count, picking: false });
  useEffect(() => {
    live.current.count = count;
  }, [count]);

  const own = useMotionValue(0);
  const playing = useRef<ReturnType<typeof animate> | null>(null);
  useEffect(() => () => playing.current?.stop(), []);

  // The film's clock: the tour's slot for this destination, or the
  // visitor's own play of the one they picked.
  const t = useTransform(() => {
    const mine = own.get();
    const v = p.get();
    if (live.current.picking) return mine;
    const n = live.current.count;
    if (!n) return 0;
    return v >= 1 ? 1 : (v * n) % 1;
  });

  // The film plays in the first part of its slot and then holds its result.
  const film = useTransform(t, (v) => ramp(v, 0.04, FILM_ENDS));

  const current = picked && story.outputs.has(picked) ? picked : (enabled[Math.min(turn, count - 1)]?.id ?? null);

  const markSent = (id: string) => setSent((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  useMotionValueEvent(p, "change", (v) => {
    if (v === 0) {
      // The stop is starting over.
      live.current.picking = false;
      setPicked(null);
      setTurn(0);
      setSent((prev) => (prev.size ? new Set() : prev));
      return;
    }
    if (live.current.picking || !count) return;
    const index = Math.min(count - 1, Math.floor(v * count));
    setTurn((prev) => (prev === index ? prev : index));
    const within = v >= 1 ? 1 : (v * count) % 1;
    if (within >= FILM_ENDS) markSent(enabled[index].id);
  });
  useMotionValueEvent(own, "change", (v) => {
    if (picked && v >= FILM_ENDS) markSent(picked);
  });

  /** Put a destination on screen and play its film from the start. */
  const play = (id: string) => {
    story.touch();
    live.current.picking = true;
    setPicked(id);
    playing.current?.stop();
    own.set(0);
    playing.current = animate(own, 1, { duration: SECONDS_PER_OUTPUT * 0.8, ease: "linear" });
  };

  const pick = (id: string) => {
    if (!story.outputs.has(id)) story.toggleOutput(id);
    play(id);
  };

  const toggle = (id: string) => {
    const turningOn = !story.outputs.has(id);
    story.toggleOutput(id);
    if (turningOn) {
      // Switching one on is asking to see it.
      play(id);
      return;
    }
    setSent((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (picked === id) {
      live.current.picking = false;
      setPicked(null);
    }
  };

  const shown = OUTPUTS.find((o) => o.id === current);
  const Film = current ? FILMS[current] : null;

  return (
    <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Panel
        title="Send the record to"
        right={<span className="shrink-0 text-[10px] text-fg-5">one at a time</span>}
      >
        <ul className="divide-y divide-tint/[0.07]">
          {OUTPUTS.map((o) => {
            const on = story.outputs.has(o.id);
            const isCurrent = o.id === current;
            const done = on && sent.has(o.id);
            const order = enabled.findIndex((e) => e.id === o.id) + 1;
            return (
              <li key={o.id} className="relative flex items-center gap-2 px-3 py-[7px]">
                <span
                  className={`absolute inset-0 bg-[#3b82f6]/[0.08] transition-opacity duration-300 ${isCurrent ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => pick(o.id)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`relative flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded text-left transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
                    on ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  {/* Its place in the queue; a tick once the record has gone there. */}
                  <span
                    className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border font-mono text-[10px] font-semibold transition-colors duration-300 ${
                      done
                        ? "border-emerald-500/40 bg-emerald-500/15 text-ok"
                        : isCurrent
                          ? "border-accent bg-accent text-white"
                          : on
                            ? "border-tint/25 text-fg-4"
                            : "border-tint/10 text-fg-6"
                    }`}
                    aria-hidden="true"
                  >
                    {done ? <Check size={11} strokeWidth={3} /> : on ? order : <o.icon size={11} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-semibold leading-tight text-fg-2">{o.title}</span>
                    <span className="block truncate text-[10px] leading-tight text-fg-5">{o.detail}</span>
                  </span>
                </button>
                <span className="relative">
                  <Switch on={on} onToggle={() => toggle(o.id)} label={o.title} />
                </span>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel
        title={shown ? `${enabled.findIndex((e) => e.id === shown.id) + 1} of ${count} · ${shown.title}` : "No destination"}
        right={shown ? <shown.icon size={13} className="shrink-0 text-accent" /> : undefined}
        className="sm:min-h-[258px]"
      >
        <div aria-hidden="true">
          {Film ? (
            <motion.div key={current} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
              <Film t={film} />
            </motion.div>
          ) : (
            <p className="px-3.5 py-6 text-[12px] text-fg-4">The record stays in the run. Switch a destination on to send it somewhere.</p>
          )}
        </div>
      </Panel>
    </div>
  );
}
