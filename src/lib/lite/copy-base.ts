
/**
 * All visible text for the free tools, per language. Spanish is the primary
 * market and is written first; English is its twin, not a translation of a
 * translation. Register follows .agents/product-marketing.md: "tú", plain
 * verbs, concrete examples, no hype.
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

const APP = "https://app.tavnit.io";
export const AUTH_SIGNUP_CTA_APP = APP;

export const BASE_ES: ToolCopy = {
  title: "{Doc} a Excel gratis: extrae las líneas de cualquier {doc} con IA",
  description:
    "Sube {a_doc} en PDF o foto y recibe sus líneas en una tabla de Excel: descripción, cantidad, precio y total. Gratis, sin plantillas y sin registro para ver el resultado.",
  label: "{Doc} a Excel",
  h1: "Convierte {a_doc} en Excel",
  intro:
    "Sube el PDF o la foto. Tavnit lee el encabezado y cada línea de la tabla y te la devuelve como hoja de cálculo. Sin plantillas por proveedor: la misma herramienta sirve para {all_your_docs}.",
  trust: ["PDF, JPG o PNG · hasta 5 páginas", "{limit} documentos gratis al día", "Se borra todo a las 24 h"],
  drop: {
    title: "Arrastra {your_doc} aquí",
    hint: "o elige un archivo de tu computadora",
    choose: "Elegir archivo",
    sample: "Probar con {a_doc} de ejemplo",
    formats: "PDF, JPG o PNG · hasta 4 MB y 5 páginas",
  },
  stages: [
    "Subiendo el documento",
    "Leyendo el encabezado",
    "Encontrando la tabla de líneas",
    "Ordenando las columnas",
    "Casi listo",
  ],
  result: {
    heading: "Listo: {file}",
    rowWord: ["fila", "filas"],
    pageWord: ["página", "páginas"],
    summary: "{rows} · {pages}",
    truncated: "Se muestran {shown} de {total} filas. El Excel incluye las mismas {shown}.",
    readyIn: "listo en {s} s",
    sum: "Suma",
    viewer: "Tu documento",
    openDocument: "Ver el documento",
    closeDocument: "Cerrar",
    retention: "se borra solo a las 24 h",
    hideColumn: "Quitar columna",
    hiddenCols: ["1 columna quitada. El Excel sale sin ella.", "{n} columnas quitadas. El Excel sale sin ellas."],
    restoreAll: "Restaurar todas",
    restoreOne: "Restaurar {col}",
    ghostColumn: "+ Tu campo",
    ghostHint: "En Tavnit agregas los campos que quieras: orden de compra, vencimiento, centro de costo…",
    flowNote: "Estas {fields} columnas son los campos de un Flow fijo de {doc}. En tu cuenta, los campos los eliges tú.",
    flowNoteCta: "Ver cómo",
    download: "Descargar Excel",
    downloading: "Preparando el archivo",
    another: "Procesar {another_doc}",
    empty: "No encontramos una tabla de líneas en este documento. Prueba con {a_doc} que tenga cantidades y precios por renglón.",
  },
  errors: {
    empty: "El archivo está vacío.",
    too_large: "El archivo pesa más de 4 MB. Comprímelo o sube solo las páginas de {the_doc}.",
    unsupported: "Solo aceptamos PDF, JPG o PNG.",
    unreadable: "No pudimos abrir este PDF. Si está protegido con contraseña, quítala y vuelve a intentar.",
    too_many_pages: "La versión gratis procesa hasta 5 páginas por documento.",
    captcha: "No pudimos confirmar que no eres un robot. Recarga la página e intenta de nuevo.",
    quota: "Ya usaste tus {limit} documentos gratis de hoy. Mañana vuelven, o crea una cuenta para seguir sin límite.",
    daily_cap: "La herramienta gratis alcanzó su cupo de hoy. Vuelve mañana, o crea una cuenta y sigue ahora mismo.",
    unavailable: "La herramienta no está disponible en este momento. Intenta en unos minutos.",
    backend: "Algo falló al procesar el documento. Intenta de nuevo.",
    failed: "No pudimos extraer este documento. Prueba con {another_doc} o con el documento de ejemplo.",
    timeout: "Está tardando más de lo normal. Espera un momento y vuelve a intentar.",
    forbidden: "Esta acción no está permitida desde aquí.",
    bad_request: "Falta el archivo o no lo pudimos leer.",
  },
  auth: {
    title: "Crea tu cuenta gratis para descargar",
    body: "El Excel se descarga al instante. Con la cuenta también puedes hacer esto con {all_your_docs} de una sola vez.",
    google: "Continuar con Google",
    or: "o con tu correo",
    signin: "Iniciar sesión",
    signup: "Crear cuenta",
    name: "Nombre",
    email: "Correo",
    password: "Contraseña",
    submitSignin: "Entrar y descargar",
    submitSignup: "Crear cuenta y descargar",
    switchToSignin: "Ya tengo cuenta",
    switchToSignup: "Aún no tengo cuenta",
    checkEmail:
      "Te enviamos un correo para confirmar la cuenta. Ábrelo, y al volver el Excel queda listo para descargar.",
    existing: "Ese correo ya tiene cuenta. Inicia sesión para descargar.",
    forgot: "Olvidé mi contraseña",
    close: "Cerrar",
    generic: "No pudimos completar el registro. Revisa el correo y la contraseña e intenta de nuevo.",
  },
  next: {
    heading: "¿Y ahora qué?",
    lead: "Esto fue {a_doc}. Con una cuenta, lo mismo pasa con {all_docs} que llegan, y las líneas no se quedan en un Excel: siguen su camino solas.",
    source: "{Your_doc}",
    node: "Tavnit",
    nodeSub: "Extraction Flow",
    items: [
      {
        short: "Te llega por correo",
        via: "correo",
        title: "El resultado te llega por correo",
        body: "Cuando termina la extracción, Tavnit manda un correo a las direcciones que configures en el Flow, con las filas en rows.csv adjunto. Si hay revisión, el correo espera la aprobación.",
        linkLabel: "Correo de salida",
        href: "/docs/email-integration",
        scene: [{ label: "Termina la extracción" }, { label: "Tavnit arma el correo" }, { label: "Llega a quien tú digas", result: "rows.csv adjunto" }],
      },
      {
        short: "Entra a tu ERP",
        via: "webhook",
        title: "Entra a tu ERP por webhook",
        body: "Al terminar, Tavnit hace un POST a la URL que le des con las filas y el run_id. Zapier, Make y n8n lo reciben con su disparador de webhook; no hace falta nada nativo.",
        linkLabel: "Webhooks",
        href: "/docs/webhooks",
        scene: [{ label: "Las filas ya extraídas" }, { label: "Un POST con rows y run_id" }, { label: "Aparecen en tu sistema", result: "6 líneas, nadie tecleó" }],
      },
      {
        short: "Revisión antes de contabilizar",
        via: "revisión",
        title: "Una persona aprueba antes de contabilizar",
        body: "Activas la revisión en el Flow y cada corrida se pausa. El revisor ve la tabla editable junto al documento original: corrige celdas, excluye filas, agrega columnas, y aprueba o rechaza. Solo al aprobar sale el correo, el webhook y el Bucket; cada decisión queda en el registro. Hay un rol de solo revisor para quien no debe ver nada más.",
        linkLabel: "Revisión humana",
        href: "/docs/human-in-the-loop",
        scene: [{ label: "La corrida se pausa para revisión" }, { label: "Una persona corrige junto al documento" }, { label: "Aprobada: recién ahí se entrega", result: "1 celda corregida · registrado" }],
      },
      {
        short: "Compara cotizaciones",
        via: "Matcher",
        title: "Compara varias cotizaciones línea por línea",
        body: "Un Matcher toma varias corridas del mismo Flow, por ejemplo tres cotizaciones, empareja las líneas por descripción y marca en una columna Champion la más barata de cada una.",
        linkLabel: "Cotizaciones de proveedores",
        href: "/es/casos-de-uso/cotizaciones-de-proveedores",
        scene: [{ label: "Tres cotizaciones, un mismo Flow" }, { label: "El Matcher empareja las líneas" }, { label: "Columna Champion: la mejor por línea", result: "Proveedor B gana 4 de 5" }],
      },
      {
        short: "Reglas y validaciones",
        via: "Cleaner",
        title: "Un Cleaner limpia y valida cada fila",
        body: "Formato de fecha, formato de número, campos calculados, conversión de moneda con tasas publicadas, y acciones condicionales: si una línea no cumple, se manda a revisión, se avisa por correo o por webhook.",
        linkLabel: "Cleaners",
        href: "/docs/cleaners",
        scene: [{ label: "Los datos tal como llegan" }, { label: "El Cleaner aplica tus reglas" }, { label: "Limpios, y lo que no cuadra, marcado", result: "fecha, número y suma en orden" }],
      },
      {
        short: "Un Agente entra al portal",
        via: "Agent",
        title: "Un Agente entra al portal del proveedor",
        body: "Le escribes la misión en palabras, con una URL de inicio y las credenciales en una bóveda que el modelo nunca ve. Al terminar la extracción, el Agente arranca solo con los campos del documento y trae lo que pides con tipos: precio, plazo, archivos.",
        linkLabel: "Agentes",
        href: "/docs/agents",
        scene: [{ label: "Termina la extracción" }, { label: "El Agente navega el portal" }, { label: "Trae los datos, con tipos", result: "precio 18.50 · plazo 5 días" }],
      },
      {
        short: "Preguntas sobre tus datos",
        via: "Bucket",
        title: "Pregúntale a {your_docs}",
        body: "Las filas se guardan en un Bucket. Preguntas en lenguaje natural; Tavnit convierte la pregunta en un plan (suma, filtro, mes), lo ejecuta en la base de datos y responde con la cifra. El modelo nunca hace la aritmética.",
        linkLabel: "Buckets",
        href: "/docs/buckets",
        scene: [{ label: "\"¿Cuánto le compramos a Istmo en agosto?\"" }, { label: "Un plan: suma · proveedor · mes" }, { label: "La cifra, calculada en la base", result: "B/. 12,480 en 4 {docs}" }],
      },
    ],
    hint: "Toca una opción, o el chip de Tavnit, para ver qué pasa.",
    flow: {
      title: "El Flow: tú decides las columnas",
      body: "Un Flow es la definición de un tipo de documento: la lista de campos que quieres sacar, cada uno con nombre, tipo de dato y si aparece una vez por documento o una por línea, más una pista de dónde buscar cuando hace falta. Lo activas y cada documento que llega se lee buscando exactamente esos campos; la tabla que sale tiene una columna por campo. Esta herramienta usa un Flow fijo de {doc} con {fields} campos. En tu cuenta agregas, quitas y renombras campos, y creas Flows para cualquier otro documento. Sin plantillas ni coordenadas.",
      linkLabel: "Cómo se define un Flow",
      href: "/docs/flows",
      scene: [{ label: "Defines los campos en dos grupos: del documento y de la tabla" }, { label: "Lee el encabezado una vez y la tabla fila por fila" }, { label: "Una fila por línea: lo del documento se repite, lo de la tabla cambia", result: "5 campos → 5 columnas" }],
      name: "{Doc}",
      kinds: ["Campos del documento", "Campos de la tabla"],
      add: { name: "orden_compra", type: "Text", hint: "Junto a \"OC\" · ej. OC-2291", save: "Guardar", value: "OC-2291" },
      activate: "Activo",
    },
    inputs: {
      show: "¿Cómo llega {your_doc}?",
      hide: "Ocultar entradas",
      items: [
        {
          short: "Por correo",
          via: "una dirección por Flow",
          title: "Reenvía el correo y ya está",
          body: "Cada Flow tiene su propia dirección, del tipo {doc}-lite-<id>@mg.tavnit.io. Reenvías el correo con {the_doc} adjunta y cada adjunto se convierte en una corrida. El asunto y el cuerpo no se leen.",
          linkLabel: "Entrada por correo",
          href: "/docs/email-integration",
          scene: [{ label: "Reenvías el correo con el adjunto" }, { label: "Llega a la dirección del Flow" }, { label: "Cada adjunto es una corrida", result: "1 adjunto → 1 corrida" }],
        },
        {
          short: "Subida manual",
          via: "desde la app",
          title: "Súbela desde la app",
          body: "Arrastras el PDF o la foto al Flow y la corrida arranca al instante. Es lo mismo que hiciste aquí, con tu cuenta y sin cupo diario.",
          linkLabel: "Flows",
          href: "/docs/flows",
          scene: [{ label: "Arrastras el archivo al Flow" }, { label: "La corrida arranca" }, { label: "Las filas, en segundos", result: "igual que aquí, sin cupo" }],
        },
        {
          short: "API",
          via: "POST /api/runs/process",
          title: "Desde tu sistema, por API",
          body: "Un POST a /api/runs/process con el archivo y el flow_id, con tu API key. Responde 202 con el run_id; consultas GET /api/runs/<id> hasta que esté completed y ahí vienen las filas.",
          linkLabel: "API",
          href: "/docs/api-integration",
          scene: [{ label: "POST con el archivo y el flow_id" }, { label: "202: run_id, en cola" }, { label: "GET hasta completed", result: "status: completed · 6 filas" }],
        },
        {
          short: "Zapier · Make · n8n",
          via: "una llamada HTTP",
          title: "Desde Zapier, Make o n8n",
          body: "No hay app nativa y no hace falta: un paso HTTP (Custom Request en Zapier, Make a request en Make) manda el archivo a /api/runs/process. Las filas vuelven por webhook al disparador de la misma herramienta.",
          linkLabel: "Integraciones",
          href: "/es/integraciones",
          scene: [{ label: "Un paso HTTP en tu escenario" }, { label: "Tavnit procesa" }, { label: "El webhook devuelve las filas", result: "de vuelta en Zapier, Make o n8n" }],
        },
        {
          short: "Varios en un PDF",
          via: "un Splitter los separa",
          title: "Varios documentos en un solo PDF",
          body: "Un Splitter encuentra dónde empieza cada documento, clasifica cada segmento según los tipos que le describes y manda cada uno a su Flow. Un escaneo con tres {docs} termina en tres corridas.",
          linkLabel: "Splitters",
          href: "/docs/splitters",
          scene: [{ label: "Un PDF con tres {docs}" }, { label: "El Splitter corta y clasifica" }, { label: "Tres corridas, una por {doc}", result: "3 segmentos · 3 corridas" }],
        },
      ],
    },
    replay: "Ver de nuevo",
    tryIt: "Probar esto en Tavnit",
    tryItSignedIn: "Hacer esto en mi cuenta",
    primary: "Crear cuenta gratis",
    primarySignedIn: "Ir a Tavnit",
    sameLogin: "Ya tienes cuenta. En Tavnit entra con el mismo acceso ({email}); te lo pedirá una vez más porque es otro sitio.",
    secondary: "Agendar una demostración",
  },
  cleaners: {
    heading: "Con un Cleaner podrías…",
    lead: "Reglas simples que corren solas sobre {each_doc} después de extraerla. Cuatro ideas con tus propios datos:",
    tag: "Cleaners",
    ideas: [
      { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "{all_docs}, el mismo formato" },
      { icon: "sum", title: "Las líneas deben sumar el subtotal", from: "líneas {sum}", to: "subtotal {subtotal}", note: "si no cuadra, nadie la paga sin mirarla", check: "sum" },
      { icon: "money", title: "Convertir a tu moneda", from: "{total} {currency}", to: "tu moneda", note: "al tipo de cambio de la fecha de {the_doc}" },
      { icon: "approve", title: "Aprobación por encima de un monto", from: "total {total}", to: "aprobar antes de pagar", note: "si supera {threshold}" },
    ],
    ok: "Cuadra",
    off: "A revisión",
    outro: "Los Cleaners se arman en Tavnit con los campos que a ti te importan. Estos son solo ejemplos.",
    cta: "Crear cuenta gratis y probarlos",
    ctaSignedIn: "Abrir Tavnit y probarlos",
    learn: "Qué es un Cleaner",
  },
  after: {
    title: "Tu Excel está listo",
    lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit procesa {all_docs}:",
    close: "Cerrar",
    saved: "guardado en tus descargas",
  },
  how: {
    heading: "Cómo funciona",
    steps: [
      {
        title: "Sube {the_doc}",
        body: "PDF, foto o escaneo. Da igual el proveedor, el idioma o el diseño.",
      },
      {
        title: "Tavnit la lee",
        body: "Encuentra el encabezado (proveedor, número, fecha, totales) y la tabla de líneas con sus cantidades y precios.",
      },
      {
        title: "Revisa y descarga",
        body: "Ves la tabla en pantalla. Con tu cuenta gratis te la llevas en Excel.",
      },
    ],
  },
  faqHeading: "Preguntas frecuentes",
  faqs: [
    {
      q: "¿Qué incluye la versión gratis?",
      a: "{limit} documentos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
    },
    {
      q: "¿Qué formatos acepta?",
      a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas. Si {your_doc} tiene más páginas, súbela por partes o crea una cuenta.",
    },
    {
      q: "¿Puedo elegir otras columnas?",
      a: "Aquí no: esta herramienta usa un Flow fijo de {doc} con 13 campos. En tu cuenta creas tus propios Flows, para {docs} o cualquier otro documento, con los campos que necesites: por documento (número de orden de compra, fecha de vencimiento, centro de costo) o por línea (código de producto, descuento). Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
    },
    {
      q: "¿Tengo que configurar una plantilla por proveedor?",
      a: "No. Tavnit no usa plantillas: lee cada documento como llega, aunque el proveedor cambie el diseño de su {doc} mañana.",
    },
    {
      q: "¿Qué pasa con mi archivo?",
      a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el archivo y las filas extraídas se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
    },
    {
      q: "¿Por qué pide cuenta para descargar?",
      a: "Porque la versión gratis está pensada para probar. Con la cuenta puedes correr la misma extracción sobre {all_your_docs}, recibir el resultado por correo y mandar el resultado a tu sistema.",
    },
    {
      q: "¿Sirve con {docs} de cualquier país?",
      a: "Sí. Funciona con {docs} en español, inglés y otros idiomas, con o sin impuestos desglosados. Está probada con {docs} de Panamá, México, Colombia y Estados Unidos, entre otros.",
    },
    {
      q: "¿Cómo hago que sea automático?",
      a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía {the_docs} a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. El resultado llega a tu ERP o a Google Sheets sin que nadie teclee.",
    },
  ],
};

export const BASE_EN: ToolCopy = {
  title: "{Doc} to Excel, free: extract line items from any {doc} with AI",
  description:
    "Upload {a_doc} as PDF or photo and get its line items as an Excel table: description, quantity, unit price and total. Free, no templates, no sign-up to see the result.",
  label: "{Doc} to Excel",
  h1: "Turn {a_doc} into Excel",
  intro:
    "Upload the PDF or photo. Tavnit reads the header and every line of the table and hands it back as a spreadsheet. No per-vendor templates: the same tool works on {all_your_docs}.",
  trust: ["PDF, JPG or PNG · up to 5 pages", "{limit} free documents a day", "Everything deleted after 24 h"],
  drop: {
    title: "Drop {your_doc} here",
    hint: "or choose a file from your computer",
    choose: "Choose file",
    sample: "Try it with a sample {doc}",
    formats: "PDF, JPG or PNG · up to 4 MB and 5 pages",
  },
  stages: [
    "Uploading the document",
    "Reading the header",
    "Finding the line-item table",
    "Ordering the columns",
    "Almost there",
  ],
  result: {
    heading: "Done: {file}",
    rowWord: ["row", "rows"],
    pageWord: ["page", "pages"],
    summary: "{rows} · {pages}",
    truncated: "Showing {shown} of {total} rows. The Excel holds the same {shown}.",
    readyIn: "ready in {s} s",
    sum: "Sum",
    viewer: "Your document",
    openDocument: "View the document",
    closeDocument: "Close",
    retention: "deletes itself after 24 h",
    hideColumn: "Remove column",
    hiddenCols: ["1 column removed. The Excel leaves it out.", "{n} columns removed. The Excel leaves them out."],
    restoreAll: "Restore all",
    restoreOne: "Restore {col}",
    ghostColumn: "+ Your field",
    ghostHint: "In Tavnit you add the fields you want: PO number, due date, cost centre…",
    flowNote: "These {fields} columns are the fields of a fixed {doc} Flow. In your account, you choose the fields.",
    flowNoteCta: "See how",
    download: "Download Excel",
    downloading: "Preparing the file",
    another: "Process {another_doc}",
    empty: "We could not find a line-item table in this document. Try {a_doc} with quantities and prices per line.",
  },
  errors: {
    empty: "The file is empty.",
    too_large: "The file is over 4 MB. Compress it or upload only {the_doc} pages.",
    unsupported: "Only PDF, JPG or PNG files are accepted.",
    unreadable: "We could not open this PDF. If it is password-protected, remove the password and try again.",
    too_many_pages: "The free version processes up to 5 pages per document.",
    captcha: "We could not confirm you are not a bot. Reload the page and try again.",
    quota: "You have used your {limit} free documents for today. They come back tomorrow, or create an account to keep going.",
    daily_cap: "The free tool has reached today's capacity. Come back tomorrow, or create an account and continue now.",
    unavailable: "The tool is not available right now. Try again in a few minutes.",
    backend: "Something failed while processing the document. Try again.",
    failed: "We could not extract this document. Try {another_doc}, or the sample.",
    timeout: "This is taking longer than usual. Wait a moment and try again.",
    forbidden: "This action is not allowed from here.",
    bad_request: "The file is missing or could not be read.",
  },
  auth: {
    title: "Create a free account to download",
    body: "The Excel downloads right away. With an account you can also do this on {all_your_docs} in one go.",
    google: "Continue with Google",
    or: "or with your email",
    signin: "Sign in",
    signup: "Create account",
    name: "Name",
    email: "Email",
    password: "Password",
    submitSignin: "Sign in and download",
    submitSignup: "Create account and download",
    switchToSignin: "I already have an account",
    switchToSignup: "I don't have an account yet",
    checkEmail:
      "We sent you an email to confirm the account. Open it, and when you come back the Excel is ready to download.",
    existing: "That email already has an account. Sign in to download.",
    forgot: "Forgot my password",
    close: "Close",
    generic: "We could not complete the sign-up. Check the email and password and try again.",
  },
  next: {
    heading: "And then what?",
    lead: "That was one {doc}. With an account, the same happens to {each_doc} that arrives, and the lines do not stop at an Excel: they keep going on their own.",
    source: "{Your_doc}",
    node: "Tavnit",
    nodeSub: "Extraction Flow",
    items: [
      {
        short: "Lands in your inbox",
        via: "email",
        title: "The result lands in your inbox",
        body: "When extraction finishes, Tavnit emails the addresses you set on the Flow, with the rows attached as rows.csv. With review on, the email waits for approval.",
        linkLabel: "Email output",
        href: "/docs/email-integration",
        scene: [{ label: "Extraction finishes" }, { label: "Tavnit composes the email" }, { label: "It reaches whoever you choose", result: "rows.csv attached" }],
      },
      {
        short: "Lands in your ERP",
        via: "webhook",
        title: "Lands in your ERP through a webhook",
        body: "When a run completes, Tavnit POSTs the rows and the run_id to the URL you give it. Zapier, Make and n8n receive it with their webhook trigger; nothing native needed.",
        linkLabel: "Webhooks",
        href: "/docs/webhooks",
        scene: [{ label: "The extracted rows" }, { label: "One POST with rows and run_id" }, { label: "They appear in your system", result: "6 lines, nobody typed" }],
      },
      {
        short: "Review before posting",
        via: "review",
        title: "A person approves before it posts",
        body: "Turn review on for the Flow and every run pauses. The reviewer sees the editable table next to the original document: fixes cells, excludes rows, adds columns, and approves or rejects. Only on approval do the email, webhook and Bucket go out; every decision is on record. A review-only role exists for people who should see nothing else.",
        linkLabel: "Human in the loop",
        href: "/docs/human-in-the-loop",
        scene: [{ label: "The run pauses for review" }, { label: "A person fixes it next to the document" }, { label: "Approved: only then delivered", result: "1 cell fixed · on record" }],
      },
      {
        short: "Compare quotes",
        via: "Matcher",
        title: "Compare several quotes line by line",
        body: "A Matcher takes several runs of the same Flow, say three supplier quotes, pairs the lines by description and marks the cheapest per line in a Champion column.",
        linkLabel: "Supplier quotes",
        href: "/use-cases/supplier-quotes",
        scene: [{ label: "Three quotes, one Flow" }, { label: "The Matcher pairs the lines" }, { label: "Champion column: best per line", result: "Supplier B wins 4 of 5" }],
      },
      {
        short: "Rules and validations",
        via: "Cleaner",
        title: "A Cleaner cleans and validates every row",
        body: "Date format, number format, calculated fields, currency conversion at published rates, and conditional actions: when a line fails, send it for review, email or webhook.",
        linkLabel: "Cleaners",
        href: "/docs/cleaners",
        scene: [{ label: "The data as it arrives" }, { label: "The Cleaner applies your rules" }, { label: "Clean, with failures flagged", result: "date, number and sum in order" }],
      },
      {
        short: "An Agent opens the portal",
        via: "Agent",
        title: "An Agent logs into the supplier portal",
        body: "You write the mission in plain words, with a start URL and credentials in a vault the model never sees. When extraction completes, the Agent starts on its own with the document's fields and brings back what you asked for, typed: price, lead time, files.",
        linkLabel: "Agents",
        href: "/docs/agents",
        scene: [{ label: "Extraction finishes" }, { label: "The Agent browses the portal" }, { label: "Brings the data back, typed", result: "price 18.50 · lead time 5 days" }],
      },
      {
        short: "Questions over your data",
        via: "Bucket",
        title: "Ask {your_docs} questions",
        body: "Rows are stored in a Bucket. You ask in plain language; Tavnit turns the question into a plan (sum, filter, month), runs it on the database and answers with the figure. The model never does the arithmetic.",
        linkLabel: "Buckets",
        href: "/docs/buckets",
        scene: [{ label: "\"How much did we buy from Istmo in August?\"" }, { label: "A plan: sum · supplier · month" }, { label: "The figure, computed in the database", result: "$12,480 across 4 {docs}" }],
      },
    ],
    hint: "Tap an option, or the Tavnit chip, to see what happens.",
    flow: {
      title: "The Flow: you decide the columns",
      body: "A Flow is the definition of one document type: the list of fields you want out, each with a name, a data type and whether it appears once per document or once per line, plus a hint on where to look when needed. Switch it on and every document that arrives is read for exactly those fields; the table that comes out has one column per field. This tool uses a fixed {doc} Flow with {fields} fields. In your account you add, remove and rename fields, and create Flows for any other document. No templates, no coordinates.",
      linkLabel: "How a Flow is defined",
      href: "/docs/flows",
      scene: [{ label: "You define the fields in two groups: document and table" }, { label: "It reads the header once and the table row by row" }, { label: "One row per line: document values repeat, table values change", result: "5 fields → 5 columns" }],
      name: "{Doc}",
      kinds: ["Document fields", "Table fields"],
      add: { name: "purchase_order", type: "Text", hint: "Next to \"PO\" · e.g. PO-2291", save: "Save", value: "PO-2291" },
      activate: "Active",
    },
    inputs: {
      show: "How does {your_doc} get in?",
      hide: "Hide inputs",
      items: [
        {
          short: "By email",
          via: "one address per Flow",
          title: "Forward the email and that is it",
          body: "Every Flow has its own address, like {doc}-lite-<id>@mg.tavnit.io. Forward the email with {the_doc} attached and each attachment becomes a run. Subject and body are never read.",
          linkLabel: "Email intake",
          href: "/docs/email-integration",
          scene: [{ label: "You forward the email with the attachment" }, { label: "It reaches the Flow's address" }, { label: "Each attachment is a run", result: "1 attachment → 1 run" }],
        },
        {
          short: "Manual upload",
          via: "from the app",
          title: "Upload it from the app",
          body: "Drop the PDF or photo on the Flow and the run starts right away. Same as what you did here, with your account and no daily limit.",
          linkLabel: "Flows",
          href: "/docs/flows",
          scene: [{ label: "You drop the file on the Flow" }, { label: "The run starts" }, { label: "Rows in seconds", result: "like here, no cap" }],
        },
        {
          short: "API",
          via: "POST /api/runs/process",
          title: "From your system, through the API",
          body: "One POST to /api/runs/process with the file and the flow_id, using your API key. It answers 202 with the run_id; you GET /api/runs/<id> until it is completed and the rows come back.",
          linkLabel: "API",
          href: "/docs/api-integration",
          scene: [{ label: "POST with the file and the flow_id" }, { label: "202: run_id, queued" }, { label: "GET until completed", result: "status: completed · 6 rows" }],
        },
        {
          short: "Zapier · Make · n8n",
          via: "one HTTP call",
          title: "From Zapier, Make or n8n",
          body: "There is no native app and none is needed: an HTTP step (Custom Request in Zapier, Make a request in Make) sends the file to /api/runs/process. The rows come back through a webhook into the same tool's trigger.",
          linkLabel: "Integrations",
          href: "/integrations",
          scene: [{ label: "An HTTP step in your scenario" }, { label: "Tavnit processes it" }, { label: "The webhook returns the rows", result: "back in Zapier, Make or n8n" }],
        },
        {
          short: "Several in one PDF",
          via: "a Splitter splits them",
          title: "Several documents in one PDF",
          body: "A Splitter finds where each document begins, classifies each segment against the types you describe and sends each to its Flow. One scan with three {docs} ends as three runs.",
          linkLabel: "Splitters",
          href: "/docs/splitters",
          scene: [{ label: "One PDF with three {docs}" }, { label: "The Splitter cuts and classifies" }, { label: "Three runs, one per {doc}", result: "3 segments · 3 runs" }],
        },
      ],
    },
    replay: "Play again",
    tryIt: "Try this in Tavnit",
    tryItSignedIn: "Do this in my account",
    primary: "Create a free account",
    primarySignedIn: "Go to Tavnit",
    sameLogin: "You already have an account. Sign in to Tavnit with the same login ({email}); it will ask once more because it is a different site.",
    secondary: "Book a demo",
  },
  cleaners: {
    heading: "With a Cleaner you could…",
    lead: "Simple rules that run on their own over {each_doc} after extraction. Four ideas using your own data:",
    tag: "Cleaners",
    ideas: [
      { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "{each_doc}, the same format" },
      { icon: "sum", title: "Lines must add up to the subtotal", from: "lines {sum}", to: "subtotal {subtotal}", note: "if it does not match, nobody pays it unseen", check: "sum" },
      { icon: "money", title: "Convert to your currency", from: "{total} {currency}", to: "your currency", note: "at the rate on {the_doc} date" },
      { icon: "approve", title: "Approval above an amount", from: "total {total}", to: "approve before paying", note: "when it exceeds {threshold}" },
    ],
    ok: "Matches",
    off: "To review",
    outro: "Cleaners are built in Tavnit with the fields you care about. These are just examples.",
    cta: "Create a free account and try them",
    ctaSignedIn: "Open Tavnit and try them",
    learn: "What a Cleaner is",
  },
  after: {
    title: "Your Excel is ready",
    lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles {each_doc}:",
    close: "Close",
    saved: "saved to your downloads",
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Upload {the_doc}",
        body: "PDF, photo or scan. Any vendor, any language, any layout.",
      },
      {
        title: "Tavnit reads it",
        body: "It finds the header (vendor, number, date, totals) and the line-item table with quantities and prices.",
      },
      {
        title: "Review and download",
        body: "The table shows on screen. With a free account you take it home as Excel.",
      },
    ],
  },
  faqHeading: "Common questions",
  faqs: [
    {
      q: "What does the free version include?",
      a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
    },
    {
      q: "Which formats does it accept?",
      a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If {your_doc} is longer, upload it in parts or create an account.",
    },
    {
      q: "Can I choose other columns?",
      a: "Not here: this tool uses a fixed {doc} Flow with 13 fields. In your account you create your own Flows, for {docs} or any other document, with the fields you need: per document (PO number, due date, cost centre) or per line (product code, discount). No templates: you describe the field and, when needed, give it a hint on where to look.",
    },
    {
      q: "Do I need to set up a template per vendor?",
      a: "No. Tavnit does not use templates: it reads each document as it comes, even if the vendor redesigns its {doc} tomorrow.",
    },
    {
      q: "What happens to my file?",
      a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
    },
    {
      q: "Why does the download need an account?",
      a: "Because the free version is meant for trying it out. With an account you can run the same extraction on {all_your_docs}, receive them by email and send the result to your system.",
    },
    {
      q: "Does it work with {docs} from any country?",
      a: "Yes. It handles {docs} in English, Spanish and other languages, with or without itemised tax. It is tested on {docs} from the US, Panama, Mexico and Colombia, among others.",
    },
    {
      q: "How do I make it automatic?",
      a: "Create an account, build a Flow with the fields you want and forward {docs} to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. The result lands in your ERP or Google Sheets with nobody typing.",
    },
  ],
};

