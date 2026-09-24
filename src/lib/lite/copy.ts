import type { Locale } from "@/lib/locale";
import type { LiteToolId } from "@/lib/lite/tools";

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
    dates: { title: string; from: string; to: string; note: string };
    sums: { title: string; from: string; to: string; ok: string; off: string; note: string };
    currency: { title: string; from: string; to: string; note: string };
    approval: { title: string; from: string; to: string; note: string };
    outro: string;
    cta: string;
    ctaSignedIn: string;
    learn: string;
  };
  /** Dialog shown once, right after the Excel downloads. */
  after: { title: string; lead: string; close: string };
  how: { heading: string; steps: { title: string; body: string }[] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
}

export interface HubCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
}

const APP = "https://app.tavnit.io";

const invoiceEs: ToolCopy = {
  title: "Factura a Excel gratis: extrae las líneas de cualquier factura con IA",
  description:
    "Sube una factura en PDF o foto y recibe sus líneas en una tabla de Excel: descripción, cantidad, precio y total. Gratis, sin plantillas y sin registro para ver el resultado.",
  label: "Factura a Excel",
  h1: "Convierte una factura en Excel",
  intro:
    "Sube el PDF o la foto. Tavnit lee el encabezado y cada línea de la tabla y te la devuelve como hoja de cálculo. Sin plantillas por proveedor: la misma herramienta sirve para todas tus facturas.",
  trust: [
    "PDF, JPG o PNG de hasta 5 páginas",
    "3 documentos al día, con el resultado completo",
    "Tu archivo se usa solo para esta extracción",
  ],
  drop: {
    title: "Arrastra tu factura aquí",
    hint: "o elige un archivo de tu computadora",
    choose: "Elegir archivo",
    sample: "Probar con una factura de ejemplo",
    formats: "PDF, JPG o PNG · hasta 10 MB y 5 páginas",
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
    download: "Descargar Excel",
    downloading: "Preparando el archivo",
    another: "Procesar otra factura",
    empty: "No encontramos una tabla de líneas en este documento. Prueba con una factura que tenga cantidades y precios por renglón.",
  },
  errors: {
    empty: "El archivo está vacío.",
    too_large: "El archivo pesa más de 10 MB. Comprímelo o sube solo las páginas de la factura.",
    unsupported: "Solo aceptamos PDF, JPG o PNG.",
    unreadable: "No pudimos abrir este PDF. Si está protegido con contraseña, quítala y vuelve a intentar.",
    too_many_pages: "La versión gratis procesa hasta 5 páginas por documento.",
    captcha: "No pudimos confirmar que no eres un robot. Recarga la página e intenta de nuevo.",
    quota: "Ya usaste tus 3 documentos gratis de hoy. Mañana vuelven, o crea una cuenta para seguir sin límite.",
    daily_cap: "La herramienta gratis alcanzó su cupo de hoy. Vuelve mañana, o crea una cuenta y sigue ahora mismo.",
    unavailable: "La herramienta no está disponible en este momento. Intenta en unos minutos.",
    backend: "Algo falló al procesar el documento. Intenta de nuevo.",
    failed: "No pudimos extraer este documento. Prueba con otra factura o con la de ejemplo.",
    timeout: "Está tardando más de lo normal. Espera un momento y vuelve a intentar.",
    forbidden: "Esta acción no está permitida desde aquí.",
    bad_request: "Falta el archivo o no lo pudimos leer.",
  },
  auth: {
    title: "Crea tu cuenta gratis para descargar",
    body: "El Excel se descarga al instante. Con la cuenta también puedes hacer esto con todas tus facturas, no una por una.",
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
    lead: "Esto fue una factura. Con una cuenta, lo mismo pasa con todas las que llegan, y las líneas no se quedan en un Excel: siguen su camino solas.",
    source: "Tu factura",
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
        title: "Pregúntale a tus facturas",
        body: "Las filas se guardan en un Bucket. Preguntas en lenguaje natural; Tavnit convierte la pregunta en un plan (suma, filtro, mes), lo ejecuta en la base de datos y responde con la cifra. El modelo nunca hace la aritmética.",
        linkLabel: "Buckets",
        href: "/docs/buckets",
        scene: [{ label: "\"¿Cuánto le compramos a Istmo en agosto?\"" }, { label: "Un plan: suma · proveedor · mes" }, { label: "La cifra, calculada en la base", result: "B/. 12,480 en 4 facturas" }],
      },
    ],
    hint: "Toca una opción para ver qué pasa.",
    inputs: {
      show: "¿Cómo llega tu factura?",
      hide: "Ocultar entradas",
      items: [
        {
          short: "Por correo",
          via: "una dirección por Flow",
          title: "Reenvía el correo y ya está",
          body: "Cada Flow tiene su propia dirección, del tipo factura-lite-<id>@mg.tavnit.io. Reenvías el correo con la factura adjunta y cada adjunto se convierte en una corrida. El asunto y el cuerpo no se leen.",
          linkLabel: "Entrada por correo",
          href: "/docs/email-integration",
          scene: [{ label: "Reenvías el correo con el adjunto" }, { label: "Llega a la dirección del Flow" }, { label: "Cada adjunto es una corrida", result: "1 adjunto → 1 corrida" }],
        },
        {
          short: "Subida manual",
          via: "desde la app",
          title: "Súbela desde la app",
          body: "Arrastras el PDF o la foto al Flow y la corrida arranca al instante. Es lo mismo que hiciste aquí, con tu cuenta y sin límite de tres al día.",
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
          body: "Un Splitter encuentra dónde empieza cada documento, clasifica cada segmento según los tipos que le describes y manda cada uno a su Flow. Un escaneo con tres facturas termina en tres corridas.",
          linkLabel: "Splitters",
          href: "/docs/splitters",
          scene: [{ label: "Un PDF con tres facturas" }, { label: "El Splitter corta y clasifica" }, { label: "Tres corridas, una por factura", result: "3 segmentos · 3 corridas" }],
        },
      ],
    },
    replay: "Ver de nuevo",
    tryIt: "Probar esto en Tavnit",
    tryItSignedIn: "Hacer esto en mi cuenta",
    primary: "Crear cuenta gratis",
    primarySignedIn: "Abrir mi cuenta en Tavnit",
    sameLogin: "Ya tienes cuenta. En Tavnit entra con el mismo acceso ({email}); te lo pedirá una vez más porque es otro sitio.",
    secondary: "Agendar una demostración",
  },
  cleaners: {
    heading: "Con un Cleaner podrías…",
    lead: "Reglas simples que corren solas sobre cada factura después de extraerla. Cuatro ideas con tus propios datos:",
    tag: "Cleaners",
    dates: { title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todas las facturas, el mismo formato" },
    sums: {
      title: "Las líneas deben sumar el subtotal",
      from: "líneas {sum}",
      to: "subtotal {subtotal}",
      ok: "Cuadra",
      off: "A revisión",
      note: "si no cuadra, nadie la paga sin mirarla",
    },
    currency: { title: "Convertir a tu moneda", from: "{total} {currency}", to: "tu moneda", note: "al tipo de cambio de la fecha de la factura" },
    approval: { title: "Aprobación por encima de un monto", from: "total {total}", to: "aprobar antes de pagar", note: "si supera {threshold}" },
    outro: "Los Cleaners se arman en Tavnit con los campos que a ti te importan. Estos son solo ejemplos.",
    cta: "Crear cuenta gratis y probarlos",
    ctaSignedIn: "Abrir Tavnit y probarlos",
    learn: "Qué es un Cleaner",
  },
  after: {
    title: "Tu Excel está listo",
    lead: "Eso fue una factura a mano. Así se ve cuando lo hace Tavnit con todas:",
    close: "Seguir aquí",
  },
  how: {
    heading: "Cómo funciona",
    steps: [
      {
        title: "Sube la factura",
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
      q: "¿De verdad es gratis?",
      a: "Sí. Puedes procesar 3 documentos al día y ver el resultado completo en pantalla. Descargar el Excel pide una cuenta de Tavnit, que también es gratis.",
    },
    {
      q: "¿Qué formatos acepta?",
      a: "PDF (con texto o escaneado), JPG y PNG, de hasta 10 MB y 5 páginas. Si tu factura tiene más páginas, súbela por partes o crea una cuenta.",
    },
    {
      q: "¿Tengo que configurar una plantilla por proveedor?",
      a: "No. Tavnit no usa plantillas: lee cada documento como llega, aunque el proveedor cambie el diseño de su factura mañana.",
    },
    {
      q: "¿Qué pasa con mi archivo?",
      a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. Si quieres que lo borremos, escríbenos a support@tavnit.io con la fecha y el nombre del archivo.",
    },
    {
      q: "¿Por qué pide cuenta para descargar?",
      a: "Porque la versión gratis está pensada para probar. Con la cuenta puedes correr la misma extracción sobre todas tus facturas, recibirlas por correo y mandar el resultado a tu sistema.",
    },
    {
      q: "¿Sirve con facturas de cualquier país?",
      a: "Sí. Funciona con facturas en español, inglés y otros idiomas, con o sin impuestos desglosados. Está probada con facturas de Panamá, México, Colombia y Estados Unidos, entre otros.",
    },
    {
      q: "¿Cómo hago que sea automático?",
      a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía las facturas a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. El resultado llega a tu ERP o a Google Sheets sin que nadie teclee.",
    },
  ],
};

const invoiceEn: ToolCopy = {
  title: "Invoice to Excel, free: extract line items from any invoice with AI",
  description:
    "Upload an invoice as PDF or photo and get its line items as an Excel table: description, quantity, unit price and total. Free, no templates, no sign-up to see the result.",
  label: "Invoice to Excel",
  h1: "Turn an invoice into Excel",
  intro:
    "Upload the PDF or photo. Tavnit reads the header and every line of the table and hands it back as a spreadsheet. No per-vendor templates: the same tool works on all your invoices.",
  trust: [
    "PDF, JPG or PNG, up to 5 pages",
    "3 documents a day, full result every time",
    "Your file is used for this extraction only",
  ],
  drop: {
    title: "Drop your invoice here",
    hint: "or choose a file from your computer",
    choose: "Choose file",
    sample: "Try it with a sample invoice",
    formats: "PDF, JPG or PNG · up to 10 MB and 5 pages",
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
    download: "Download Excel",
    downloading: "Preparing the file",
    another: "Process another invoice",
    empty: "We could not find a line-item table in this document. Try an invoice with quantities and prices per line.",
  },
  errors: {
    empty: "The file is empty.",
    too_large: "The file is over 10 MB. Compress it or upload only the invoice pages.",
    unsupported: "Only PDF, JPG or PNG files are accepted.",
    unreadable: "We could not open this PDF. If it is password-protected, remove the password and try again.",
    too_many_pages: "The free version processes up to 5 pages per document.",
    captcha: "We could not confirm you are not a bot. Reload the page and try again.",
    quota: "You have used your 3 free documents for today. They come back tomorrow, or create an account to keep going.",
    daily_cap: "The free tool has reached today's capacity. Come back tomorrow, or create an account and continue now.",
    unavailable: "The tool is not available right now. Try again in a few minutes.",
    backend: "Something failed while processing the document. Try again.",
    failed: "We could not extract this document. Try another invoice, or the sample.",
    timeout: "This is taking longer than usual. Wait a moment and try again.",
    forbidden: "This action is not allowed from here.",
    bad_request: "The file is missing or could not be read.",
  },
  auth: {
    title: "Create a free account to download",
    body: "The Excel downloads right away. With an account you can also do this on all your invoices, not one at a time.",
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
    lead: "That was one invoice. With an account, the same happens to every invoice that arrives, and the lines do not stop at an Excel: they keep going on their own.",
    source: "Your invoice",
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
        title: "Ask your invoices questions",
        body: "Rows are stored in a Bucket. You ask in plain language; Tavnit turns the question into a plan (sum, filter, month), runs it on the database and answers with the figure. The model never does the arithmetic.",
        linkLabel: "Buckets",
        href: "/docs/buckets",
        scene: [{ label: "\"How much did we buy from Istmo in August?\"" }, { label: "A plan: sum · supplier · month" }, { label: "The figure, computed in the database", result: "$12,480 across 4 invoices" }],
      },
    ],
    hint: "Tap an option to see what happens.",
    inputs: {
      show: "How does your invoice get in?",
      hide: "Hide inputs",
      items: [
        {
          short: "By email",
          via: "one address per Flow",
          title: "Forward the email and that is it",
          body: "Every Flow has its own address, like invoice-lite-<id>@mg.tavnit.io. Forward the email with the invoice attached and each attachment becomes a run. Subject and body are never read.",
          linkLabel: "Email intake",
          href: "/docs/email-integration",
          scene: [{ label: "You forward the email with the attachment" }, { label: "It reaches the Flow's address" }, { label: "Each attachment is a run", result: "1 attachment → 1 run" }],
        },
        {
          short: "Manual upload",
          via: "from the app",
          title: "Upload it from the app",
          body: "Drop the PDF or photo on the Flow and the run starts right away. Same as what you did here, with your account and no three-a-day limit.",
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
          body: "A Splitter finds where each document begins, classifies each segment against the types you describe and sends each to its Flow. One scan with three invoices ends as three runs.",
          linkLabel: "Splitters",
          href: "/docs/splitters",
          scene: [{ label: "One PDF with three invoices" }, { label: "The Splitter cuts and classifies" }, { label: "Three runs, one per invoice", result: "3 segments · 3 runs" }],
        },
      ],
    },
    replay: "Play again",
    tryIt: "Try this in Tavnit",
    tryItSignedIn: "Do this in my account",
    primary: "Create a free account",
    primarySignedIn: "Open my Tavnit account",
    sameLogin: "You already have an account. Sign in to Tavnit with the same login ({email}); it will ask once more because it is a different site.",
    secondary: "Book a demo",
  },
  cleaners: {
    heading: "With a Cleaner you could…",
    lead: "Simple rules that run on their own over every invoice after extraction. Four ideas using your own data:",
    tag: "Cleaners",
    dates: { title: "One way to write the date", from: "{date}", to: "{iso}", note: "every invoice, the same format" },
    sums: {
      title: "Lines must add up to the subtotal",
      from: "lines {sum}",
      to: "subtotal {subtotal}",
      ok: "Matches",
      off: "To review",
      note: "if it does not match, nobody pays it unseen",
    },
    currency: { title: "Convert to your currency", from: "{total} {currency}", to: "your currency", note: "at the rate on the invoice date" },
    approval: { title: "Approval above an amount", from: "total {total}", to: "approve before paying", note: "when it exceeds {threshold}" },
    outro: "Cleaners are built in Tavnit with the fields you care about. These are just examples.",
    cta: "Create a free account and try them",
    ctaSignedIn: "Open Tavnit and try them",
    learn: "What a Cleaner is",
  },
  after: {
    title: "Your Excel is ready",
    lead: "That was one invoice by hand. This is what it looks like when Tavnit does all of them:",
    close: "Stay here",
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Upload the invoice",
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
      q: "Is it really free?",
      a: "Yes. You can process 3 documents a day and see the full result on screen. Downloading the Excel takes a Tavnit account, which is free as well.",
    },
    {
      q: "Which formats does it accept?",
      a: "PDF (text or scanned), JPG and PNG, up to 10 MB and 5 pages. If your invoice is longer, upload it in parts or create an account.",
    },
    {
      q: "Do I need to set up a template per vendor?",
      a: "No. Tavnit does not use templates: it reads each document as it comes, even if the vendor redesigns its invoice tomorrow.",
    },
    {
      q: "What happens to my file?",
      a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. If you want it deleted, email support@tavnit.io with the date and the file name.",
    },
    {
      q: "Why does the download need an account?",
      a: "Because the free version is meant for trying it out. With an account you can run the same extraction on all your invoices, receive them by email and send the result to your system.",
    },
    {
      q: "Does it work with invoices from any country?",
      a: "Yes. It handles invoices in English, Spanish and other languages, with or without itemised tax. It is tested on invoices from the US, Panama, Mexico and Colombia, among others.",
    },
    {
      q: "How do I make it automatic?",
      a: "Create an account, build a Flow with the fields you want and forward invoices to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. The result lands in your ERP or Google Sheets with nobody typing.",
    },
  ],
};

export const TOOL_COPY: Record<LiteToolId, Record<Locale, ToolCopy>> = {
  "invoice-to-excel": { es: invoiceEs, en: invoiceEn },
};

export const HUB_COPY: Record<Locale, HubCopy> = {
  es: {
    title: "Herramientas gratis: factura a Excel y más, con la IA de Tavnit",
    description:
      "Herramientas gratis de un solo uso hechas con el mismo motor de Tavnit: convierte una factura en Excel y más. Sin plantillas, sin registro para ver el resultado.",
    h1: "Herramientas gratis",
    intro:
      "Cada herramienta hace una sola cosa con un documento y te muestra el resultado real. Son el mismo motor que usan las empresas que automatizan sus documentos con Tavnit, en versión de una a la vez.",
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Herramientas",
  },
  en: {
    title: "Free tools: invoice to Excel and more, powered by Tavnit's AI",
    description:
      "Free single-purpose tools built on Tavnit's own engine: turn an invoice into Excel and more. No templates, no sign-up to see the result.",
    h1: "Free tools",
    intro:
      "Each tool does one thing to one document and shows you the real result. They run on the same engine companies use to automate their documents with Tavnit, one at a time.",
    breadcrumbHome: "Home",
    breadcrumbHub: "Tools",
  },
};

export interface ShellCopy {
  lite: string;
  tools: string;
  site: string;
  cta: string;
  ctaSignedIn: string;
  privacy: string;
  terms: string;
  contact: string;
  rights: string;
  privacyHref: string;
  termsHref: string;
}

export const SHELL_COPY: Record<Locale, ShellCopy> = {
  es: {
    lite: "Lite",
    tools: "Herramientas",
    site: "Conoce Tavnit",
    cta: "Crear cuenta",
    ctaSignedIn: "Abrir mi cuenta",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    rights: "Tavnit. Herramientas gratis hechas con el mismo motor del producto.",
    privacyHref: "/es/privacidad",
    termsHref: "/es/terminos",
  },
  en: {
    lite: "Lite",
    tools: "Tools",
    site: "About Tavnit",
    cta: "Create account",
    ctaSignedIn: "Open my account",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "Tavnit. Free tools built on the product's own engine.",
    privacyHref: "/privacy",
    termsHref: "/terms",
  },
};

export const AUTH_SIGNUP_CTA_APP = APP;
