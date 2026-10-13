import type { LiteToolId } from "@/lib/lite/tools";

/**
 * Types and the builder for the free tools' visible text. The words
 * themselves live in one file per language under src/content/tools/
 * (`LiteLocaleCopy`), assembled by src/lib/lite/copy.ts. Spanish is the
 * primary market and is written first; English is its twin and the source
 * every other language is translated from. Register follows
 * .agents/product-marketing.md: "tú", plain verbs, concrete examples, no hype.
 */

export interface ToolCopy {
  /** <title> and meta description. */
  title: string;
  description: string;
  /** Short name for hubs, breadcrumbs and the footer. */
  label: string;
  h1: string;
  intro: string;
  trust: string[];
  drop: {
    title: string;
    hint: string;
    choose: string;
    sample: string;
    formats: string;
  };
  stages: string[];
  /** Plain strings only: this object crosses into a Client Component.
   *  {file}, {rows}, {pages}, {shown}, {total} are filled by the tool. */
  result: {
    heading: string;
    /** [singular, plural] */
    rowWord: [string, string];
    pageWord: [string, string];
    summary: string;
    truncated: string;
    /** "{s}" seconds from upload to rows. */
    readyIn: string;
    sum: string;
    viewer: string;
    openDocument: string;
    closeDocument: string;
    /** Retention notice shown next to the document strip. */
    retention: string;
    /** Removing columns from the table (and from the Excel). */
    hideColumn: string;
    /** [one, many]; "{n}" is the count. */
    hiddenCols: [string, string];
    restoreAll: string;
    /** aria-label of a removed column's chip; "{col}" is the name. */
    restoreOne: string;
    /** The ghost column at the end of the table and its tooltip. */
    ghostColumn: string;
    ghostHint: string;
    /** Under the table: "{fields}" is the column count. */
    flowNote: string;
    flowNoteCta: string;
    download: string;
    downloading: string;
    another: string;
    empty: string;
  };
  errors: Record<string, string>;
  auth: {
    title: string;
    body: string;
    google: string;
    or: string;
    signin: string;
    signup: string;
    name: string;
    email: string;
    password: string;
    submitSignin: string;
    submitSignup: string;
    switchToSignin: string;
    switchToSignup: string;
    checkEmail: string;
    existing: string;
    forgot: string;
    close: string;
    generic: string;
  };
  /** Shown as a graphic once a result exists: the document → Tavnit → six outcomes. */
  next: {
    heading: string;
    lead: string;
    source: string;
    node: string;
    nodeSub: string;
    items: {
      short: string;
      via: string;
      title: string;
      body: string;
      linkLabel: string;
      href: string;
      /** Three beats of the little animation shown when the item is chosen:
       *  what enters, what Tavnit does, what comes out (with a result chip). */
      scene: [{ label: string }, { label: string }, { label: string; result: string }];
    }[];
    /** Under the diagram: how to interact. */
    hint: string;
    /** The Tavnit chip itself: what a Flow is and that its fields are yours to
     *  choose. "{fields}" in body is the column count. */
    flow: {
      title: string;
      body: string;
      linkLabel: string;
      href: string;
      scene: [{ label: string }, { label: string }, { label: string; result: string }];
      /** The flow's name in the little editor window. */
      name: string;
      /** The two kinds of field, as the flow editor names them. */
      kinds: [string, string];
      /** The field added in the animation. */
      add: { name: string; type: string; hint: string; save: string; value: string };
      /** The flow's on switch. */
      activate: string;
    };
    /** The inputs toggle inside the diagram and the ways a document reaches a Flow. */
    inputs: {
      show: string;
      hide: string;
      items: {
        short: string;
        via: string;
        title: string;
        body: string;
        linkLabel: string;
        href: string;
        scene: [{ label: string }, { label: string }, { label: string; result: string }];
      }[];
    };
    replay: string;
    /** CTA inside the scene. */
    tryIt: string;
    tryItSignedIn: string;
    primary: string;
    /** Primary CTA once the visitor already has an account (created here). */
    primarySignedIn: string;
    /** "{email}" is filled in. Tells them the app login is the same one. */
    sameLogin: string;
    secondary: string;
  };
  /** "With a Cleaner you could…": four plain suggestions beside the table,
   *  each drawn as before → after with the visitor's own values when the
   *  columns exist. Placeholders: {date} {iso} {sum} {subtotal} {total}
   *  {currency} {threshold}. */
  cleaners: {
    heading: string;
    lead: string;
    tag: string;
    /** Four ideas. Placeholders filled from the visitor's columns when they
     *  exist, demo values otherwise: {date} {iso} (first date column),
     *  {sum} {subtotal} (line totals vs subtotal), {total} {currency}
     *  {threshold} (total column). `check: "sum"` adds the Cuadra/A revisión
     *  verdict computed from the rows. */
    ideas: {
      icon: "date" | "sum" | "money" | "approve" | "alert" | "calendar" | "mail" | "text";
      title: string;
      from: string;
      to: string;
      note: string;
      check?: "sum";
    }[];
    /** Verdict labels for `check: "sum"`. */
    ok: string;
    off: string;
    outro: string;
    cta: string;
    ctaSignedIn: string;
    learn: string;
  };
  /** Dialog shown once, right after the Excel downloads. "{fields}" in lead
   *  is the column count. */
  after: {
    /** The confirmation strip: what was downloaded. */
    title: string;
    lead: string;
    /** aria-label of the dialog's close button. */
    close: string;
    /** Under the title, after the file name. */
    saved: string;
  };
  how: { heading: string; steps: { title: string; body: string }[] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  /** compare tools only */
  compare?: CompareCopy;
  /** split tools only */
  split?: SplitCopy;
  /** spreadsheet tools only */
  clean?: CleanCopy;
}

/** Text of a spreadsheet tool (number format, date format). */
export interface CleanCopy {
  /** Step 2, once the file is read: pick columns and formats. */
  setup: {
    heading: string;
    /** "{rows} rows · {cols} columns" */
    fileSummary: string;
    columnsLabel: string;
    /** "Pick up to {max}. We ticked the ones that look like {what}." */
    columnsHint: string;
    tooMany: string;
    /** currency only: the amounts' currency */
    sourceLabel?: string;
    sourceHint?: string;
    inputLabel: string;
    /** keyed by input option: comma/dot or dmy/mdy (empty for translation) */
    inputOptions: Record<string, string>;
    outputLabel: string;
    /** keyed by output option */
    outputOptions: Record<string, string>;
    /** Long output lists (currency, language) are a dropdown: its two groups. */
    outputPopular?: string;
    outputAll?: string;
    preview: string;
    run: string;
    change: string;
  };
  stages: string[];
  heading: string;
  /** "{cells} changed in {cols}" */
  summary: string;
  cellWord: [string, string];
  columnWord: [string, string];
  unchanged: string;
  highlight: string;
  /** "Showing {shown} of {total} rows. The download has all of them." */
  shown: string;
  /** The download button; its menu offers the two formats below. */
  download: string;
  downloadXlsx: string;
  downloadCsv: string;
  another: string;
  /** Under the result: the product pitch. */
  automate: { heading: string; body: string; cta: string; docs: string };
}

/** Text of a compare tool (PO vs invoice, quotes side by side). */
export interface CompareCopy {
  /** One per document slot: the reference first. Quotes: the third is optional. */
  slots: { title: string; hint: string; sample: string; optional?: boolean }[];
  /** Button that starts the comparison once every slot has a document. */
  run: string;
  /** Try the bundled sample set. */
  sampleAll: string;
  /** Progress captions: reading the documents, then the Matcher pairing lines. */
  stages: string[];
  heading: string;
  /** {n} lines, {ref} and {doc} labels */
  summary: string;
  labels: {
    description: string;
    quantity: string;
    price: string;
    total: string;
    status: string;
    ref: string;
    doc: string;
    supplier: string;
    champion: string;
    /** "{n} lines won" */
    wins: string;
    lines: [string, string];
  };
  /** PO check statuses */
  status: { ok: string; price: string; qty: string; both: string; missing: string; extra: string };
  /** When the Matcher produced no pairs at all. */
  empty: string;
  another: string;
  download: string;
}

/** Text of the split tool. */
export interface SplitCopy {
  heading: string;
  /** "{n} documents in {pages} pages" */
  summary: string;
  segmentWord: [string, string];
  pageWord: [string, string];
  /** "pages {from}–{to}" / "page {from}" */
  pages: string;
  pageOne: string;
  unmatched: string;
  type: string;
  reason: string;
  download: string;
  downloadAll: string;
  stages: string[];
  empty: string;
  another: string;
}

export interface HubCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
  /** Section titles of the grid, by tool kind. */
  groups: { extract: string; compare: string; split: string; clean: string };
  /** Under the grid: the line that sends people to the product. */
  outro: string;
  outroCta: string;
}


/**
 * One document word set per tool and language. The base copy is written
 * with these tokens ({doc}, {a_doc}, {all_docs}…) so every tool reads
 * naturally without copying 800 lines. A token spelled with a capital
 * ({Doc}, {Your_doc}) capitalises the value.
 */
export interface DocVocab {
  /** "factura" / "invoice" */
  doc: string;
  /** "facturas" / "invoices" */
  docs: string;
  /** "una factura" / "an invoice" */
  a_doc: string;
  /** "la factura" / "the invoice" */
  the_doc: string;
  /** "las facturas" / "the invoices" */
  the_docs: string;
  /** "tu factura" / "your invoice" */
  your_doc: string;
  /** "tus facturas" / "your invoices" */
  your_docs: string;
  /** "todas tus facturas" / "all your invoices" */
  all_your_docs: string;
  /** "todas las facturas" / "all invoices" */
  all_docs: string;
  /** "cada factura" / "every invoice" */
  each_doc: string;
  /** "otra factura" / "another invoice" */
  another_doc: string;
  /** "esta factura" / "this invoice" */
  this_doc: string;
}

export type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/** What a tool file provides per language: its words and what differs from the base. */
export interface ToolCopyDef {
  vocab: DocVocab;
  overrides?: DeepPartial<ToolCopy>;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Objects merge key by key; arrays and scalars are replaced whole. */
export function deepMerge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined) return base;
  if (isPlainObject(base) && isPlainObject(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(over)) {
      const o = (over as Record<string, unknown>)[k];
      if (o === undefined) continue;
      out[k] = deepMerge((base as Record<string, unknown>)[k], o as never);
    }
    return out as T;
  }
  return over as T;
}

const TOKEN = /\{([A-Za-z]\w*)\}/g;

/** Replaces vocab tokens in every string of the tree; other {placeholders} are left for the UI. */
export function fillVocab<T>(node: T, vocab: DocVocab): T {
  if (typeof node === "string") {
    return node.replace(TOKEN, (m, key: string) => {
      const lower = key.charAt(0).toLowerCase() + key.slice(1);
      if (!(lower in vocab)) return m;
      const v = vocab[lower as keyof DocVocab];
      return key.charAt(0) === key.charAt(0).toUpperCase() ? v.charAt(0).toUpperCase() + v.slice(1) : v;
    }) as T;
  }
  if (Array.isArray(node)) return node.map((x) => fillVocab(x, vocab)) as T;
  if (isPlainObject(node)) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(node)) out[k] = fillVocab((node as Record<string, unknown>)[k], vocab);
    return out as T;
  }
  return node;
}

/** Base ⊕ overrides, then the tool's words and the daily allowance ({limit}). */
export function buildToolCopy(base: ToolCopy, def: ToolCopyDef, limit: number): ToolCopy {
  const filled = fillVocab(deepMerge(base, def.overrides), def.vocab);
  return fillVocab(filled, { limit: String(limit) } as unknown as DocVocab);
}

export const AUTH_SIGNUP_CTA_APP = "https://app.tavnit.io";

/** The Lite header and footer. Links are computed per locale in code (routes.ts). */
export interface ShellCopy {
  lite: string;
  tools: string;
  site: string;
  cta: string;
  ctaSignedIn: string;
  /** Header links to the main site. */
  nav: { product: string; useCases: string; docs: string };
  demo: string;
  signin: string;
  /** The tools menu. */
  allTools: string;
  /** Under "see all tools" in the menu card. */
  allToolsHint: string;
  groups: { extract: string; compare: string; split: string; clean: string };
  /** The account menu, once signed in. */
  account: { signedInAs: string; open: string; openHint: string; signOut: string; menu: string };
  /** The sign-in dialog opened from the header. */
  auth: { title: string; body: string; submitSignin: string; submitSignup: string };
  menu: string;
  close: string;
  privacy: string;
  terms: string;
  contact: string;
  rights: string;
}

/** The block under a tool that sends the visitor on to the product pages. */
export interface RelatedCopy {
  heading: string;
  lead: string;
  useCase: string;
  guide: string;
}

/** Everything the free tools say in one language: src/content/tools/<code>.ts. */
export interface LiteLocaleCopy {
  /** One complete tool written with {doc} tokens; each tool overrides it. */
  base: ToolCopy;
  hub: HubCopy;
  shell: ShellCopy;
  related: RelatedCopy;
  /** Per tool: its document words and the strings that differ from `base`. */
  tools: Record<LiteToolId, ToolCopyDef>;
  /** Subtitle of each tool's social card (opengraph-image). */
  og: Record<LiteToolId, string>;
}
