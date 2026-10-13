import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Spanish (the primary market, written first).
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 */

const INVOICE_VOCAB = {
  doc: "factura",
  docs: "facturas",
  a_doc: "una factura",
  the_doc: "la factura",
  the_docs: "las facturas",
  your_doc: "tu factura",
  your_docs: "tus facturas",
  all_your_docs: "todas tus facturas",
  all_docs: "todas las facturas",
  each_doc: "cada factura",
  another_doc: "otra factura",
  this_doc: "esta factura",
};

const copy: LiteLocaleCopy = {
  base: {
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
          href: "/es/documentacion/integracion-por-correo",
          scene: [{ label: "Termina la extracción" }, { label: "Tavnit arma el correo" }, { label: "Llega a quien tú digas", result: "rows.csv adjunto" }],
        },
        {
          short: "Entra a tu ERP",
          via: "webhook",
          title: "Entra a tu ERP por webhook",
          body: "Al terminar, Tavnit hace un POST a la URL que le des con las filas y el run_id. Zapier, Make y n8n lo reciben con su disparador de webhook; no hace falta nada nativo.",
          linkLabel: "Webhooks",
          href: "/es/documentacion/webhooks",
          scene: [{ label: "Las filas ya extraídas" }, { label: "Un POST con rows y run_id" }, { label: "Aparecen en tu sistema", result: "6 líneas, nadie tecleó" }],
        },
        {
          short: "Revisión antes de contabilizar",
          via: "revisión",
          title: "Una persona aprueba antes de contabilizar",
          body: "Activas la revisión en el Flow y cada corrida se pausa. El revisor ve la tabla editable junto al documento original: corrige celdas, excluye filas, agrega columnas, y aprueba o rechaza. Solo al aprobar sale el correo, el webhook y el Bucket; cada decisión queda en el registro. Hay un rol de solo revisor para quien no debe ver nada más.",
          linkLabel: "Revisión humana",
          href: "/es/documentacion/revision-humana",
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
          href: "/es/documentacion/cleaners",
          scene: [{ label: "Los datos tal como llegan" }, { label: "El Cleaner aplica tus reglas" }, { label: "Limpios, y lo que no cuadra, marcado", result: "fecha, número y suma en orden" }],
        },
        {
          short: "Un Agente entra al portal",
          via: "Agent",
          title: "Un Agente entra al portal del proveedor",
          body: "Le escribes la misión en palabras, con una URL de inicio y las credenciales en una bóveda que el modelo nunca ve. Al terminar la extracción, el Agente arranca solo con los campos del documento y trae lo que pides con tipos: precio, plazo, archivos.",
          linkLabel: "Agentes",
          href: "/es/documentacion/agentes",
          scene: [{ label: "Termina la extracción" }, { label: "El Agente navega el portal" }, { label: "Trae los datos, con tipos", result: "precio 18.50 · plazo 5 días" }],
        },
        {
          short: "Preguntas sobre tus datos",
          via: "Bucket",
          title: "Pregúntale a {your_docs}",
          body: "Las filas se guardan en un Bucket. Preguntas en lenguaje natural; Tavnit convierte la pregunta en un plan (suma, filtro, mes), lo ejecuta en la base de datos y responde con la cifra. El modelo nunca hace la aritmética.",
          linkLabel: "Buckets",
          href: "/es/documentacion/buckets",
          scene: [{ label: "\"¿Cuánto le compramos a Istmo en agosto?\"" }, { label: "Un plan: suma · proveedor · mes" }, { label: "La cifra, calculada en la base", result: "B/. 12,480 en 4 {docs}" }],
        },
      ],
      hint: "Toca una opción, o el chip de Tavnit, para ver qué pasa.",
      flow: {
        title: "El Flow: tú decides las columnas",
        body: "Un Flow es la definición de un tipo de documento: la lista de campos que quieres sacar, cada uno con nombre, tipo de dato y si aparece una vez por documento o una por línea, más una pista de dónde buscar cuando hace falta. Lo activas y cada documento que llega se lee buscando exactamente esos campos; la tabla que sale tiene una columna por campo. Esta herramienta usa un Flow fijo de {doc} con {fields} campos. En tu cuenta agregas, quitas y renombras campos, y creas Flows para cualquier otro documento. Sin plantillas ni coordenadas.",
        linkLabel: "Cómo se define un Flow",
        href: "/es/documentacion/flows",
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
            href: "/es/documentacion/integracion-por-correo",
            scene: [{ label: "Reenvías el correo con el adjunto" }, { label: "Llega a la dirección del Flow" }, { label: "Cada adjunto es una corrida", result: "1 adjunto → 1 corrida" }],
          },
          {
            short: "Subida manual",
            via: "desde la app",
            title: "Súbela desde la app",
            body: "Arrastras el PDF o la foto al Flow y la corrida arranca al instante. Es lo mismo que hiciste aquí, con tu cuenta y sin cupo diario.",
            linkLabel: "Flows",
            href: "/es/documentacion/flows",
            scene: [{ label: "Arrastras el archivo al Flow" }, { label: "La corrida arranca" }, { label: "Las filas, en segundos", result: "igual que aquí, sin cupo" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Desde tu sistema, por API",
            body: "Un POST a /api/runs/process con el archivo y el flow_id, con tu API key. Responde 202 con el run_id; consultas GET /api/runs/<id> hasta que esté completed y ahí vienen las filas.",
            linkLabel: "API",
            href: "/es/documentacion/api",
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
            href: "/es/documentacion/splitters",
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
  },

  hub: {
    title: "Herramientas gratis con IA: factura a Excel y más",
    description:
      "Herramientas gratis de un solo uso hechas con el mismo motor de Tavnit: convierte una factura en Excel y más. Sin plantillas, sin registro para ver el resultado.",
    h1: "Herramientas gratis",
    intro:
      "Cada herramienta hace una sola cosa con un documento y te muestra el resultado real. Son el mismo motor que usan las empresas que automatizan sus documentos con Tavnit, en versión de una a la vez.",
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Herramientas",
    groups: { extract: "De documento a Excel", compare: "Comparar documentos", split: "Organizar escaneos", clean: "Limpiar hojas de cálculo" },
    outro: "Todas funcionan con el mismo motor que usan las empresas que automatizan sus documentos con Tavnit. Cuando quieras que pase solo, con todos tus documentos, está tu cuenta.",
    outroCta: "Crear cuenta gratis",
  },

  shell: {
    lite: "Lite",
    tools: "Herramientas",
    site: "Conoce Tavnit",
    cta: "Crear cuenta gratis",
    ctaSignedIn: "Ir a Tavnit",
    nav: { product: "Producto", useCases: "Casos de uso", docs: "Docs" },
    demo: "Agendar demo",
    signin: "Iniciar sesión",
    allTools: "Ver todas las herramientas",
    allToolsHint: "Gratis. Ves el resultado real sin registrarte; con tu cuenta te lo llevas.",
    groups: { extract: "De documento a Excel", compare: "Comparar documentos", split: "Organizar escaneos", clean: "Limpiar hojas de cálculo" },
    account: {
      signedInAs: "Conectado como",
      open: "Ir a Tavnit",
      openHint: "La plataforma completa: Flows, automatizaciones y todo tu volumen",
      signOut: "Cerrar sesión",
      menu: "Tu cuenta",
    },
    auth: {
      title: "Crea tu cuenta gratis",
      body: "La misma cuenta sirve aquí para descargar tus resultados y en Tavnit para automatizar todos tus documentos.",
      submitSignin: "Entrar",
      submitSignup: "Crear cuenta",
    },
    menu: "Menú",
    close: "Cerrar",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    rights: "Tavnit. Herramientas gratis hechas con el mismo motor del producto.",
  },

  related: {
    heading: "Cuando sean todos tus documentos",
    lead: "Esta herramienta procesa uno a la vez. El mismo motor puede recibirlos por correo o API, revisarlos con tu equipo y entregarlos a tu sistema.",
    useCase: "Cómo se automatiza:",
    guide: "Guía:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Factura a Excel gratis: la IA extrae las líneas" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Extraer líneas de factura a Excel, gratis",
        description:
          "Extrae las líneas de una factura (descripción, cantidad, precio unitario e importe) como filas de Excel, con el proveedor, número y fecha en cada fila. PDF o foto, sin plantillas, sin registro para ver el resultado.",
        label: "Extractor de líneas de factura",
        h1: "Extrae las líneas de una factura",
        intro:
          "Cada renglón de la tabla de la factura (descripción, cantidad, unidad, precio unitario e importe) se convierte en una fila, y el encabezado (proveedor, número, fecha, totales) se repite en cada una. Es la forma en que contabilidad y cuentas por pagar necesitan las líneas para registrarlas, conciliarlas o compararlas con una orden de compra. Sirve con PDF, escaneo o foto, y sin plantillas por proveedor.",
        drop: {
          title: "Arrastra la factura cuyas líneas quieres extraer",
          sample: "Probar con una factura de seis líneas",
        },
        stages: [
          "Subiendo la factura",
          "Leyendo el encabezado",
          "Detectando la tabla de líneas",
          "Separando cada renglón",
          "Casi listo",
        ],
        result: {
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de factura: encabezado y líneas. En tu cuenta, los campos los eliges tú.",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            {
              title: "Sube la factura",
              body: "PDF con texto, escaneado o una foto. Una o varias páginas, hasta 5.",
            },
            {
              title: "Tavnit separa las líneas",
              body: "Encuentra la tabla aunque no tenga bordes, lee cada renglón (descripción, cantidad, unidad, precio, importe) y le pega el encabezado.",
            },
            {
              title: "Revisa y descarga",
              body: "Una fila por línea en pantalla. Con tu cuenta gratis te la llevas en Excel, sin las columnas que no te interesen.",
            },
          ],
        },
        faqs: [
          {
            q: "¿Qué es una línea de factura?",
            a: "Cada renglón de la tabla de detalle: un producto o servicio con su descripción, cantidad, unidad, precio unitario e importe. Los totales del pie (subtotal, impuesto, total) no son líneas; salen como campos del encabezado y se repiten en cada fila.",
          },
          {
            q: "¿Por qué el proveedor y el número aparecen en todas las filas?",
            a: "Porque así cada fila se sostiene sola: puedes filtrar, sumar o pegar las líneas de muchas facturas en una misma hoja sin perder de cuál vienen. Es el formato que esperan un ERP, una tabla dinámica o una conciliación.",
          },
          {
            q: "¿Funciona si la tabla ocupa varias páginas?",
            a: "Sí. Tavnit sigue la tabla de una página a la siguiente y devuelve todas las líneas seguidas, sin repetir el encabezado de columnas como si fuera un renglón. La versión gratis procesa hasta 5 páginas.",
          },
          {
            q: "¿Y si una descripción ocupa dos renglones o hay celdas combinadas?",
            a: "Una descripción que continúa debajo se une a su línea; una celda combinada se reparte a las líneas que cubre. No dependemos de las rayas de la tabla, sino de leer qué cantidad, precio e importe le corresponden a cada descripción.",
          },
          {
            q: "¿Qué pasa con descuentos e impuestos por línea?",
            a: "El importe de cada línea sale tal como está impreso. Un descuento o un impuesto que la factura muestra como renglón aparte no se convierte en línea: lo tratamos como total del documento. Si tu factura desglosa impuesto por línea, con una cuenta agregas ese campo al Flow.",
          },
          {
            q: "¿Puedo comparar las líneas con mi orden de compra?",
            a: "Sí, con la herramienta gratis Comparar factura con orden de compra (/es/herramientas/comparar-factura-con-orden-de-compra): subes los dos documentos y te marca las líneas con precio o cantidad distintos, las que faltan y las que sobran.",
          },
          {
            q: "¿Tengo que armar una plantilla por proveedor?",
            a: "No. Tavnit lee cada factura como llega; si el proveedor cambia el diseño mañana, sigue funcionando. Por eso sirve igual para facturas de distintos países e idiomas.",
          },
          {
            q: "¿Cómo lo hago con cientos de facturas?",
            a: "Con una cuenta creas un Flow con estos mismos campos (o los tuyos) y reenvías las facturas a su dirección de correo, o las mandas por API. Cada factura sale como filas hacia tu ERP, Google Sheets o un Bucket, sin que nadie teclee.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "factura"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: {
        doc: "factura",
        docs: "facturas",
        a_doc: "una factura",
        the_doc: "la factura",
        the_docs: "las facturas",
        your_doc: "tu factura",
        your_docs: "tus facturas",
        all_your_docs: "todas tus facturas",
        all_docs: "todas las facturas",
        each_doc: "cada factura",
        another_doc: "otra factura",
        this_doc: "esta factura",
      },
      overrides: {
        title: "Comparar factura con orden de compra, gratis",
        description:
          "Sube la orden de compra y la factura y Tavnit las coteja línea por línea: precios distintos, cantidades distintas, líneas que faltan y líneas que sobran. Gratis, sin plantillas y sin registro para ver el resultado.",
        label: "Comparar factura con OC",
        h1: "Compara una factura con su orden de compra",
        intro:
          "Sube la orden de compra y la factura, en PDF o foto. Tavnit lee las dos, empareja cada línea de la OC con la línea de la factura que dice lo mismo aunque el texto no sea idéntico, y te marca dónde cambió el precio, dónde cambió la cantidad, qué falta en la factura y qué no estaba en la OC.",
        trust: ["Una OC y una factura · PDF o foto", "{limit} documentos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra el documento aquí",
          sample: "Probar con una OC y una factura de ejemplo",
          formats: "PDF, JPG o PNG · hasta 4 MB y 5 páginas por documento",
        },
        stages: ["Subiendo los documentos", "Leyendo la orden de compra", "Leyendo la factura", "Emparejando las líneas", "Casi listo"],
        result: {
          another: "Comparar otros documentos",
          download: "Descargar comparación en Excel",
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de documento de compra. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: centro de costo, número de recepción, proyecto…",
        },
        errors: {
          no_lines: "En uno de los dos documentos no encontramos líneas con cantidades y precios. Revisa que sean una orden de compra y una factura con tabla de artículos.",
          not_ready: "Todavía estamos leyendo los documentos. Espera un momento y vuelve a intentar.",
          failed: "No pudimos leer uno de los documentos. Prueba con otros archivos o con los de ejemplo.",
          too_large: "Uno de los archivos pesa más de 4 MB. Comprímelo o sube solo las páginas del documento.",
        },
        next: {
          lead: "Esto fue una OC y una factura. Con una cuenta, cada factura que llega se coteja sola contra su orden de compra, y el resultado no se queda en un Excel: sigue su camino.",
          source: "Tu OC y tu factura",
          flow: {
            name: "Documento de compra",
            add: { name: "numero_recepcion", type: "Text", hint: 'Junto a "Recepción" · ej. REC-1187', save: "Guardar", value: "REC-1187" },
          },
          inputs: { show: "¿Cómo llegan tus documentos?" },
        },
        cleaners: {
          heading: "Con un Cleaner podrías…",
          lead: "Reglas simples que corren solas sobre cada comparación. Cuatro ideas:",
          ideas: [
            { icon: "alert", title: "Bloquear la factura si el precio sube más de 2 %", from: "precio OC 22.40", to: "factura 23.90", note: "la diferencia queda marcada antes de que alguien la pague" },
            { icon: "approve", title: "Aprobación si la cantidad difiere", from: "OC 300 unidades", to: "factura 280", note: "compras confirma si fue entrega parcial o error" },
            { icon: "mail", title: "Aviso a compras con las diferencias", from: "comparación lista", to: "correo a compras@", note: "solo cuando hay algo que revisar" },
            { icon: "sum", title: "Total de la factura contra total de la OC", from: "OC 5,189.07", to: "factura 4,960.63", note: "si no cuadra, se detiene antes de contabilizar" },
          ],
          outro: "Los Cleaners se arman en Tavnit con los campos que a ti te importan. Estos son solo ejemplos.",
        },
        after: {
          lead: "Salió de un Flow fijo de {fields} campos y un Matcher. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit coteja todas las facturas que llegan:",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube los dos documentos", body: "La orden de compra y la factura, en PDF o foto. Da igual el proveedor, el idioma o el diseño." },
            { title: "Tavnit lee los dos con un mismo Flow", body: "Encabezado (número, fecha, proveedor, totales) y cada línea con su cantidad y precio, en las dos." },
            { title: "El Matcher empareja las líneas", body: "Cada línea de la OC se une a la línea de la factura que significa lo mismo, y se comparan precio y cantidad. Con tu cuenta te llevas la comparación en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} documentos al día (una comparación usa dos), con el resultado completo en pantalla. Para descargar la comparación en Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Cómo empareja las líneas si el texto no es igual?",
            a: "Un Matcher de Tavnit compara las descripciones por significado, no letra por letra: \"Arroz grano largo 20 lb\" y \"ARROZ G/LARGO PREMIUM 20LB\" son la misma línea. Cuando dos descripciones se parecen pero no está claro, un segundo paso decide si es el mismo artículo.",
          },
          {
            q: "¿Qué tolerancia usa para el precio?",
            a: "Un precio se marca como distinto cuando cambia más de 0.5 % o más de un centavo. Las cantidades se comparan exactas. Con tu cuenta defines tu propia tolerancia con un Cleaner.",
          },
          {
            q: "¿Qué significan \"No está en la factura\" y \"No está en la OC\"?",
            a: "\"No está en la factura\" es una línea de la orden de compra que el proveedor no facturó (entrega parcial o pendiente). \"No está en la OC\" es una línea facturada que nadie pidió en esa orden.",
          },
          {
            q: "¿Puedo hacer un cotejo a tres bandas con la recepción de mercancía?",
            a: "Aquí no: la versión gratis compara dos documentos. Con tu cuenta agregas la nota de recepción como tercer documento del mismo Flow y el Matcher coteja los tres, o creas reglas con Cleaners para que la factura no se contabilice hasta que la recepción cuadre.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas por documento. Sirve con órdenes de compra de un ERP y facturas de cualquier proveedor.",
          },
          {
            q: "¿Qué pasa con mis archivos?",
            a: "Se procesan en una cuenta de Tavnit dedicada a las herramientas gratis y no se usan para nada más. A las 24 horas los archivos y la comparación se borran solos; solo conservamos que hubo una corrida, sin el documento ni su contenido.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Flow para tus documentos de compra y un Matcher sobre ese Flow. Las facturas llegan por correo o API, se emparejan con su OC y las diferencias salen por correo, webhook o a tu ERP sin que nadie teclee.",
          },
        ],
        compare: {
          slots: [
            { title: "Orden de compra", hint: "PDF o foto de la OC", sample: "OC de ejemplo" },
            { title: "Factura", hint: "PDF o foto de la factura", sample: "Factura de ejemplo" },
          ],
          run: "Comparar",
          sampleAll: "Probar con una OC y una factura de ejemplo",
          stages: ["Leyendo la orden de compra y la factura", "Ordenando las líneas", "El Matcher empareja las líneas", "Casi listo"],
          heading: "Comparación lista",
          summary: "{n} · {ref} vs {doc}",
          labels: {
            description: "Descripción",
            quantity: "Cant.",
            price: "Precio",
            total: "Total",
            status: "Estado",
            ref: "OC",
            doc: "Factura",
            supplier: "Proveedor",
            champion: "Champion",
            wins: "{n} líneas ganadas",
            lines: ["línea", "líneas"],
          },
          status: {
            ok: "Coincide",
            price: "Precio distinto",
            qty: "Cantidad distinta",
            both: "Precio y cantidad distintos",
            missing: "No está en la factura",
            extra: "No está en la OC",
          },
          empty: "No pudimos emparejar ninguna línea. Revisa que los dos documentos tengan una tabla de artículos con cantidades y precios.",
          another: "Comparar otros documentos",
          download: "Descargar comparación en Excel",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "PDF escaneado",
        docs: "PDF escaneados",
        a_doc: "un PDF escaneado",
        the_doc: "el PDF",
        the_docs: "los PDF",
        your_doc: "tu PDF",
        your_docs: "tus PDF",
        all_your_docs: "todos tus PDF",
        all_docs: "todos los PDF",
        each_doc: "cada PDF",
        another_doc: "otro PDF",
        this_doc: "este PDF",
      },
      overrides: {
        title: "Separar un PDF escaneado en documentos, gratis",
        description:
          "Sube un PDF con varios documentos escaneados juntos (facturas, órdenes de compra, recibos, contratos) y recibe cada documento por separado, clasificado por tipo. Gratis, sin marcar páginas a mano.",
        label: "Separar PDF escaneado",
        h1: "Separa un PDF escaneado en sus documentos",
        intro:
          "Escaneaste diez papeles de un tirón y quedaron en un solo PDF. Súbelo: Tavnit lee cada página, encuentra dónde empieza cada documento y te devuelve uno por uno, con su tipo (factura, orden de compra, recibo, packing list, BL, contrato…). Sin dividir por número de páginas ni marcar nada a mano.",
        trust: ["Un PDF · hasta 12 páginas", "{limit} documentos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra tu PDF escaneado aquí",
          hint: "un solo PDF con varios documentos adentro",
          choose: "Elegir archivo",
          sample: "Probar con un escaneo de ejemplo",
          formats: "PDF · hasta 4 MB y 12 páginas",
        },
        stages: ["Subiendo el PDF", "Leyendo cada página", "Encontrando dónde empieza cada documento", "Clasificando", "Casi listo"],
        result: {
          retention: "se borra solo a las 24 h",
          downloading: "Preparando el archivo",
          another: "Separar otro PDF",
          empty: "No encontramos más de un documento en este PDF.",
          flowNote: "Estos tipos son los del Splitter fijo de esta herramienta. En tu cuenta, los tipos los defines tú.",
        },
        errors: {
          too_large: "El archivo pesa más de 4 MB. Comprímelo o divide el escaneo en dos.",
          too_many_pages: "La versión gratis separa hasta 12 páginas por PDF. Con una cuenta no hay límite.",
          unsupported: "Solo aceptamos PDF, JPG o PNG. Para separar documentos, sube el PDF del escáner.",
          failed: "No pudimos separar este PDF. Prueba con otro escaneo o con el de ejemplo.",
          empty: "El archivo está vacío.",
        },
        next: {
          lead: "Esto fue un PDF. Con una cuenta, cada documento que sale del Splitter va a su propio Flow: la factura a extracción de factura, la orden de compra a la suya, el recibo al reporte de gastos. Nadie vuelve a separar ni a clasificar a mano.",
          source: "Tu PDF",
          flow: {
            title: "Del Splitter al Flow: cada documento a su extracción",
            body: "Un Splitter encuentra dónde empieza cada documento y lo clasifica según los tipos que le describes en palabras. Esta herramienta usa un Splitter fijo con ocho tipos y sin salidas: solo te entrega los documentos. En tu cuenta defines tus propios tipos y, para cada uno, adónde va: a un Flow que extrae sus campos (así se ve abajo, con {fields} campos), a un correo o a una Collection. Sin plantillas ni coordenadas.",
            linkLabel: "Cómo funciona un Splitter",
            href: "/es/documentacion/splitters",
          },
          inputs: {
            show: "¿Cómo llega tu PDF?",
          },
        },
        cleaners: {
          heading: "Después de separar, en Tavnit…",
          lead: "Cada tipo de documento puede tener su propio destino, sin que nadie lo reparta a mano. Cuatro ejemplos:",
          ideas: [
            { icon: "text", title: "Cada factura a su Flow y de ahí al ERP", from: "factura (págs. 1–2)", to: "Flow de facturas → ERP", note: "extraída y contabilizada sin tocarla" },
            { icon: "mail", title: "Los recibos al reporte de gastos", from: "recibo (pág. 5)", to: "gastos@tuempresa", note: "cada recibo llega a quien lo concilia" },
            { icon: "calendar", title: "Los contratos al archivo legal con sus fechas", from: "contrato (págs. 6–7)", to: "Flow de contratos", note: "vencimiento y renovación, en una tabla" },
            { icon: "alert", title: "Aviso si algo no se reconoce", from: "página sin clasificar", to: "revisión humana", note: "nada se pierde ni se archiva mal" },
          ],
          outro: "Los destinos se configuran en Tavnit por tipo de documento. Estos son solo ejemplos.",
          cta: "Crear cuenta gratis y armarlo",
          ctaSignedIn: "Abrir Tavnit y armarlo",
          learn: "Qué es un Splitter",
        },
        after: {
          title: "Tus documentos están listos",
          lead: "Salieron de un Splitter fijo con ocho tipos. En tu cuenta los tipos los defines tú, y cada documento sigue solo a su Flow:",
          close: "Cerrar",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube el escaneo", body: "Un solo PDF con varios documentos adentro, tal como salió del escáner. Da igual el orden o cuántas páginas tenga cada uno." },
            { title: "Tavnit lo separa y lo clasifica", body: "Lee cada página, detecta dónde empieza cada documento y le asigna un tipo: factura, orden de compra, recibo, packing list, BL, contrato, nota de crédito u otro." },
            { title: "Descarga cada documento", body: "Ves la lista con sus páginas y su tipo. Con tu cuenta gratis te llevas cada PDF por separado o todos en un zip." },
          ],
        },
        faqs: [
          {
            q: "¿Cómo sabe dónde termina un documento y empieza el siguiente?",
            a: "La IA mira todas las páginas juntas, como lo haría una persona: cambios de encabezado, de empresa, de numeración de páginas, de diseño. No cuenta páginas ni busca marcadores; por eso funciona aunque una factura tenga dos páginas y el recibo una sola.",
          },
          {
            q: "¿Qué tipos de documento reconoce?",
            a: "Aquí, ocho: factura, orden de compra, recibo, packing list, conocimiento de embarque (BL), contrato, nota de crédito y otro. Con tu cuenta defines tus propios tipos describiéndolos en palabras, y para cada uno decides adónde va: a un Flow que extrae sus datos, a un correo o a una Collection.",
          },
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} documentos al día, con el resultado completo en pantalla. Para descargar los PDF separados hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Cuántas páginas puedo subir?",
            a: "Hasta 12 páginas por PDF en la versión gratis, de hasta 4 MB. Con una cuenta no hay límite de páginas y puedes mandar los escaneos por correo directamente al Splitter.",
          },
          {
            q: "¿Sirve con escaneos de mala calidad o en varios idiomas?",
            a: "Sí. Funciona con escaneos torcidos, en escala de grises o con sellos encima, y con documentos en español, inglés u otros idiomas mezclados en el mismo PDF. Si una página no se puede leer, queda marcada como sin clasificar en vez de inventarse un tipo.",
          },
          {
            q: "¿Qué pasa con mi archivo?",
            a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el PDF y los documentos separados se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el archivo ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
          },
          {
            q: "¿Por qué pide cuenta para descargar?",
            a: "Porque la versión gratis está pensada para probar. Con la cuenta puedes separar todos tus escaneos, mandar cada documento a su Flow y recibir los datos extraídos en tu ERP o por correo.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Splitter con tus tipos de documento y reenvía los escaneos a su dirección de correo, o conéctalo por API. Cada documento que sale va solo a su Flow, y de ahí a tu ERP, a Google Sheets o a un correo.",
          },
        ],
        split: {
          heading: "Listo: {file}",
          summary: "{n} en {pages}",
          segmentWord: ["documento", "documentos"],
          pageWord: ["página", "páginas"],
          pages: "págs. {from}–{to}",
          pageOne: "pág. {from}",
          unmatched: "Sin clasificar",
          type: "Tipo",
          reason: "Por qué",
          download: "Descargar",
          downloadAll: "Descargar todos (zip)",
          stages: ["Subiendo el PDF", "Leyendo cada página", "Encontrando dónde empieza cada documento", "Clasificando", "Casi listo"],
          empty: "No encontramos más de un documento en este PDF.",
          another: "Separar otro PDF",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Searches targeted: "packing list to excel",
     * "packing list extraction", "packing list a excel", "lista de empaque a
     * excel". Everything not overridden here comes from the base copy with the
     * words below filled in.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "packing list",
        docs: "packing lists",
        a_doc: "un packing list",
        the_doc: "el packing list",
        the_docs: "los packing lists",
        your_doc: "tu packing list",
        your_docs: "tus packing lists",
        all_your_docs: "todos tus packing lists",
        all_docs: "todos los packing lists",
        each_doc: "cada packing list",
        another_doc: "otro packing list",
        this_doc: "este packing list",
      },
      overrides: {
        title: "Packing list a Excel gratis: cada línea con IA",
        description:
          "Sube un packing list (lista de empaque) en PDF o foto y recibe cada línea en Excel: descripción, cantidad, bultos, peso neto, peso bruto y dimensiones, con exportador, consignatario y puertos. Gratis, sin plantillas.",
        label: "Packing list a Excel",
        h1: "Convierte un packing list en Excel",
        intro:
          "Sube el PDF o la foto de la lista de empaque. Tavnit lee el encabezado (exportador, consignatario, puertos, totales) y cada línea de mercancía con sus bultos, pesos y medidas, y te lo devuelve como hoja de cálculo. Sin plantillas por proveedor: sirve para los packing lists de todos tus embarques.",
        drop: {
          title: "Arrastra tu packing list aquí",
          sample: "Probar con un packing list de ejemplo",
        },
        stages: ["Subiendo el documento", "Leyendo el encabezado del embarque", "Encontrando las líneas de mercancía", "Ordenando las columnas", "Casi listo"],
        result: {
          empty: "No encontramos líneas de mercancía en este documento. Prueba con un packing list que tenga bultos, pesos o cantidades por renglón.",
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de packing list. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: contenedor, marcas, partida arancelaria, número de BL…",
        },
        next: {
          lead: "Esto fue un packing list. Con una cuenta, lo mismo pasa con todos los que llegan, y las líneas no se quedan en un Excel: siguen su camino solas.",
          source: "Tu packing list",
          flow: {
            name: "Packing list",
            add: { name: "contenedor", type: "Text", hint: "Junto a \"Contenedor\" · ej. MSKU-4417", save: "Guardar", value: "MSKU-4417" },
          },
          inputs: { show: "¿Cómo llega tu packing list?" },
        },
        cleaners: {
          lead: "Reglas simples que corren solas sobre cada packing list después de extraerlo. Cuatro ideas con tus propios datos:",
          ideas: [
            { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todos los packing lists, el mismo formato" },
            { icon: "alert", title: "El peso bruto debe superar al neto", from: "neto > bruto", to: "a revisión", note: "si una línea viene al revés, nadie la declara sin mirarla" },
            { icon: "calendar", title: "Aviso antes de que zarpe", from: "fecha de embarque", to: "recordatorio 2 días antes", note: "a tu agente de aduana y a logística" },
            { icon: "mail", title: "Copia al corredor de aduana", from: "packing list extraído", to: "correo con el Excel", note: "junto con la factura relacionada" },
          ],
        },
        after: {
          lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit procesa todos los packing lists:",
        },
        how: {
          steps: [
            { title: "Sube el packing list", body: "PDF, foto o escaneo. Da igual el exportador, el idioma o el formato." },
            {
              title: "Tavnit lo lee",
              body: "Encuentra el encabezado (exportador, consignatario, puertos, totales) y la tabla de mercancía con bultos, peso neto, peso bruto y dimensiones por línea.",
            },
            { title: "Revisa y descarga", body: "Ves la tabla en pantalla. Con tu cuenta gratis te la llevas en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} documentos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas. Si tu packing list tiene más páginas, súbelo por partes o crea una cuenta.",
          },
          {
            q: "¿Qué columnas saca de un packing list?",
            a: "Del documento: exportador, consignatario, número, fecha, factura relacionada, puerto de carga, puerto de descarga y los totales de bultos y pesos. Por línea: descripción, cantidad, unidad, bultos, peso neto, peso bruto y dimensiones. Los datos del documento se repiten en cada fila para que la tabla se filtre sola.",
          },
          {
            q: "¿Puedo elegir otras columnas?",
            a: "Aquí no: esta herramienta usa un Flow fijo de packing list con 17 campos. En tu cuenta creas tus propios Flows, para packing lists o cualquier otro documento, con los campos que necesites: por documento (contenedor, sello, número de BL, incoterm) o por línea (marcas, partida arancelaria, volumen). Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
          },
          {
            q: "¿Sirve para listas de empaque de cualquier país?",
            a: "Sí. Funciona con packing lists en español, inglés y otros idiomas, con pesos en kg o lb y medidas en cm o pulgadas, tal como vienen impresos. Está probada con embarques de Panamá, Colombia, México, China y Estados Unidos, entre otros.",
          },
          {
            q: "¿Tengo que configurar una plantilla por proveedor?",
            a: "No. Tavnit no usa plantillas: lee cada documento como llega, aunque el exportador cambie el formato de su packing list mañana.",
          },
          {
            q: "¿Qué pasa con mi archivo?",
            a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el archivo y las filas extraídas se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía los packing lists a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. Cada embarque termina en tu sistema de aduana, tu ERP o Google Sheets sin que nadie teclee.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. The words ("BL" in Spanish, where the trade says
     * BL far more than "conocimiento de embarque"; "bill of lading" in English)
     * and everything that is specific to an ocean B/L: header fields, one row
     * per container line, customs and forwarder use cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "BL",
        docs: "BLs",
        a_doc: "un BL",
        the_doc: "el BL",
        the_docs: "los BLs",
        your_doc: "tu BL",
        your_docs: "tus BLs",
        all_your_docs: "todos tus BLs",
        all_docs: "todos los BLs",
        each_doc: "cada BL",
        another_doc: "otro BL",
        this_doc: "este BL",
      },
      overrides: {
        title: "BL a Excel gratis: datos del conocimiento de embarque",
        description:
          "Sube un bill of lading (BL) en PDF o foto y recibe sus datos en Excel: número de BL, naviera, embarcador, consignatario, buque, puertos y una fila por contenedor con sello, mercancía, bultos, peso y volumen. Gratis, sin plantillas.",
        label: "BL a Excel",
        h1: "Convierte un conocimiento de embarque (BL) en Excel",
        intro:
          "Sube el PDF o la foto del bill of lading. Tavnit lee el encabezado (número de BL, naviera, embarcador, consignatario, buque, viaje, puertos, fecha de embarque) y cada línea de carga con su contenedor, sello, bultos, peso bruto y volumen, y te lo devuelve como hoja de cálculo. Sin plantillas por naviera: el mismo Flow sirve para MSC, Maersk, Hapag-Lloyd o cualquier NVOCC.",
        drop: {
          title: "Arrastra tu BL aquí",
          sample: "Probar con un BL de ejemplo",
        },
        stages: ["Subiendo el documento", "Leyendo el encabezado del BL", "Encontrando las líneas de carga", "Ordenando las columnas", "Casi listo"],
        result: {
          empty: "No encontramos líneas de carga en este documento. Prueba con un BL que tenga la tabla de contenedores y mercancía.",
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de BL. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: incoterm, lugar de entrega, número de booking, ETA…",
          another: "Procesar otro BL",
        },
        errors: {
          too_large: "El archivo pesa más de 4 MB. Comprímelo o sube solo las páginas del BL.",
        },
        next: {
          lead: "Esto fue un BL. Con una cuenta, lo mismo pasa con todos los que llegan de cada naviera y agente, y los datos no se quedan en un Excel: siguen su camino solos hacia tu sistema de aduanas o de tráfico.",
          source: "Tu BL",
          flow: {
            name: "BL",
            add: { name: "incoterm", type: "Text", hint: "Junto a \"Incoterm\" · ej. CIF Manzanillo", save: "Guardar", value: "CIF" },
          },
          inputs: { show: "¿Cómo llega tu BL?" },
        },
        cleaners: {
          lead: "Reglas simples que corren solas sobre cada BL después de extraerlo. Cuatro ideas con tus propios datos:",
          ideas: [
            { icon: "date", title: "Una sola forma de escribir la fecha de embarque", from: "{date}", to: "{iso}", note: "todos los BLs, el mismo formato" },
            { icon: "alert", title: "Peso bruto fuera de rango", from: "peso bruto por contenedor", to: "marcar si supera 26,000 kg", note: "para no pedir un pesaje que no cabe en el camión" },
            { icon: "calendar", title: "Aviso antes de la llegada", from: "fecha de embarque + tránsito", to: "recordatorio 5 días antes", note: "para tener la declaración lista cuando atraque el buque" },
            { icon: "mail", title: "Al corredor de aduanas al instante", from: "BL extraído", to: "correo con la tabla adjunta", note: "a la agencia aduanal, sin reenviar nada a mano" },
          ],
        },
        after: {
          lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit procesa todos los BLs:",
        },
        how: {
          steps: [
            { title: "Sube el BL", body: "PDF, foto o escaneo. Da igual la naviera, el agente o el diseño del formulario." },
            { title: "Tavnit lo lee", body: "Encuentra el encabezado (número de BL, partes, buque, viaje, puertos, fecha de embarque, flete) y la tabla de carga: un renglón por contenedor con sello, mercancía, bultos, peso y volumen." },
            { title: "Revisa y descarga", body: "Ves la tabla en pantalla. Con tu cuenta gratis te la llevas en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} documentos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Qué datos saca de un BL?",
            a: "Del encabezado: número de BL, naviera, embarcador, consignatario, notify party, buque, viaje, puerto de carga, puerto de descarga, fecha de embarque a bordo, condición del flete y la lista de contenedores. De la tabla de carga, una fila por línea: contenedor, sello, descripción de la mercancía, número y tipo de bultos, peso bruto y volumen. Los datos del encabezado se repiten en cada fila para que la hoja se pueda filtrar y sumar.",
          },
          {
            q: "¿Puedo elegir otras columnas?",
            a: "Aquí no: esta herramienta usa un Flow fijo de BL con 19 campos. En tu cuenta creas tus propios Flows, para BLs o cualquier otro documento, con los campos que necesites: por documento (incoterm, lugar de entrega, número de booking, ETA) o por línea (partida arancelaria, marcas, temperatura del reefer). Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas. Si tu BL tiene más páginas o son varios BLs en un solo escaneo, súbelos por partes o crea una cuenta.",
          },
          {
            q: "¿Sirve con BLs de cualquier naviera?",
            a: "Sí. No usa plantillas: lee cada BL como llega, sea un master BL de la naviera, un house BL del forwarder o un sea waybill, en inglés o en español. Está probado con formatos de MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen y agentes NVOCC.",
          },
          {
            q: "¿Qué pasa con mi archivo?",
            a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el archivo y las filas extraídas se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
          },
          {
            q: "¿Por qué pide cuenta para descargar?",
            a: "Porque la versión gratis está pensada para probar. Con la cuenta puedes correr la misma extracción sobre todos tus BLs, recibir el resultado por correo y mandarlo a tu sistema de aduanas o de tráfico.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía los BLs a su dirección de correo (la que te manda la naviera o el forwarder), o conéctalo por API, webhook, Zapier, Make o n8n. Los datos llegan a tu sistema de aduanas, a tu ERP o a Google Sheets sin que nadie teclee.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically, so "cemento gris 42.5 kg" meets "cemento Portland tipo I
     * gris") and marks the cheapest unit price per line as Champion. Nothing
     * here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "cotización",
        docs: "cotizaciones",
        a_doc: "una cotización",
        the_doc: "la cotización",
        the_docs: "las cotizaciones",
        your_doc: "tu cotización",
        your_docs: "tus cotizaciones",
        all_your_docs: "todas tus cotizaciones",
        all_docs: "todas las cotizaciones",
        each_doc: "cada cotización",
        another_doc: "otra cotización",
        this_doc: "esta cotización",
      },
      overrides: {
        title: "Comparar cotizaciones de proveedores, gratis",
        description:
          "Sube dos o tres cotizaciones en PDF o foto y recibe un cuadro comparativo: cada línea con el precio de cada proveedor y la más barata marcada. Gratis, sin plantillas y sin registro para ver el resultado.",
        label: "Comparar cotizaciones",
        h1: "Compara cotizaciones de proveedores",
        intro:
          "Sube dos o tres cotizaciones para el mismo pedido. Tavnit lee cada una, empareja las líneas aunque cada proveedor las describa distinto, y arma una sola tabla con el precio de cada uno y la opción más barata por línea. Sin plantillas ni hojas de Excel a mano.",
        trust: ["2 o 3 cotizaciones · PDF o foto", "{limit} documentos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra una cotización aquí",
          hint: "PDF o foto",
          sample: "Probar con tres cotizaciones de ejemplo",
          formats: "PDF, JPG o PNG · hasta 4 MB y 5 páginas por cotización",
        },
        stages: ["Leyendo las cotizaciones", "Ordenando las líneas", "El Matcher empareja las líneas", "Casi listo"],
        result: {
          flowNote: "Cada cotización pasa por un Flow fijo de {fields} campos y el Matcher las cruza. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: marca, garantía, plazo de entrega por línea…",
          download: "Descargar cuadro comparativo en Excel",
          another: "Comparar otras cotizaciones",
          empty: "No encontramos líneas con precio en esta cotización. Prueba con una que tenga artículos, cantidades y precios por renglón.",
        },
        errors: {
          too_large: "Una de las cotizaciones pesa más de 4 MB. Comprímela o sube solo las páginas con las líneas.",
          failed: "No pudimos leer una de las cotizaciones. Prueba con otra o con las de ejemplo.",
          no_lines: "Una de las cotizaciones no tiene líneas con precio, así que no hay qué comparar. Revisa que cada una tenga artículos con precio unitario.",
          not_ready: "Todavía estamos leyendo las cotizaciones. Espera un momento e intenta de nuevo.",
        },
        auth: {
          title: "Crea tu cuenta gratis para descargar el cuadro",
          body: "El Excel se descarga al instante. Con la cuenta también puedes comparar más de tres cotizaciones y hacerlo con cada licitación que llegue.",
        },
        next: {
          lead: "Esto fueron tres cotizaciones a mano. Con una cuenta, cada cotización que llega por correo entra a su Flow, el Matcher las cruza solo y el cuadro sigue su camino: a compras, al ERP o a quien aprueba.",
          source: "Tus cotizaciones",
          flow: {
            name: "Cotización",
            add: { name: "marca", type: "Text", hint: 'Junto a "Marca" o en la descripción', save: "Guardar", value: "Argos" },
          },
          inputs: { show: "¿Cómo llegan tus cotizaciones?" },
        },
        cleaners: {
          lead: "Reglas simples que corren solas sobre cada cotización después de leerla. Cuatro ideas:",
          ideas: [
            { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todas las cotizaciones, el mismo formato" },
            { icon: "alert", title: "Aviso si un proveedor sube más de 5 %", from: "precio de hoy", to: "vs. la última cotización", note: "por línea, antes de adjudicar" },
            { icon: "approve", title: "Aprobar la adjudicación", from: "cuadro comparativo", to: "quien decide", note: "solo al aprobar sale la orden de compra" },
            { icon: "calendar", title: "Recordar la validez de la cotización", from: "válida hasta {date}", to: "aviso 5 días antes", note: "para no perder el precio" },
          ],
        },
        after: {
          title: "Tu cuadro comparativo está listo",
          lead: "Salió de un Flow fijo de {fields} campos y un Matcher. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit cruza todas las cotizaciones:",
        },
        how: {
          steps: [
            { title: "Sube dos o tres cotizaciones", body: "PDF o foto, del mismo pedido. Da igual el proveedor, el formato o cómo describa cada artículo." },
            { title: "Tavnit las lee y las cruza", body: "Extrae las líneas de cada una y el Matcher empareja los artículos aunque estén escritos distinto. La más barata por línea queda marcada como Champion." },
            { title: "Revisa y descarga", body: "Ves el cuadro en pantalla. Con tu cuenta gratis te lo llevas en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} documentos al día (una comparación de tres cotizaciones cuenta tres), con el cuadro completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Cómo empareja las líneas si cada proveedor las describe distinto?",
            a: "Con un Matcher de Tavnit. Compara el significado de cada descripción, no el texto exacto: \"cemento gris 42.5 kg\" y \"cemento Portland tipo I gris, saco de 42.5 kg\" quedan en la misma fila. Cuando hay duda, un segundo paso decide si son el mismo artículo o no.",
          },
          {
            q: "¿Qué significa Champion?",
            a: "Es el proveedor con el precio unitario más bajo en esa línea. Si dos empatan, aparecen los dos. Las líneas que solo cotiza un proveedor no tienen competencia y también se muestran.",
          },
          {
            q: "¿Puedo comparar más de tres cotizaciones?",
            a: "Aquí no: la versión gratis admite hasta tres. En tu cuenta el Matcher compara hasta diez corridas del mismo Flow, y puedes mandar el cuadro por correo o a tu ERP.",
          },
          {
            q: "¿Puedo elegir otras columnas?",
            a: "Aquí no: esta herramienta usa un Flow fijo de cotización. En tu cuenta creas tu propio Flow con los campos que necesites (marca, garantía, plazo de entrega por línea) y configuras el Matcher con el campo que quieras comparar: precio, plazo o cualquier número.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas por cotización.",
          },
          {
            q: "¿Qué pasa con mis archivos?",
            a: "Se procesan en una cuenta de Tavnit dedicada a las herramientas gratis y no se usan para nada más. A las 24 horas los archivos, las líneas extraídas y el cuadro se borran solos; solo conservamos que hubo una corrida.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Flow de cotización con tus campos y un Matcher encima. Reenvías las cotizaciones a la dirección de correo del Matcher y, cuando llegan todas, el cuadro comparativo sale solo: por correo, por webhook o a tu ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Cotización A", hint: "PDF o foto", sample: "Cotización de ejemplo A" },
            { title: "Cotización B", hint: "PDF o foto", sample: "Cotización de ejemplo B" },
            { title: "Cotización C", hint: "PDF o foto", sample: "Cotización de ejemplo C", optional: true },
          ],
          run: "Comparar",
          sampleAll: "Probar con tres cotizaciones de ejemplo",
          stages: ["Leyendo las cotizaciones", "Ordenando las líneas", "El Matcher empareja las líneas", "Casi listo"],
          heading: "Cuadro comparativo listo",
          summary: "{n} · {ref}",
          labels: {
            description: "Descripción",
            quantity: "Cantidad",
            price: "Precio unit.",
            total: "Total",
            status: "Estado",
            ref: "A",
            doc: "B",
            supplier: "Proveedor",
            champion: "Champion",
            wins: "{n} líneas ganadas",
            lines: ["línea", "líneas"],
          },
          status: { ok: "Coincide", price: "Precio distinto", qty: "Cantidad distinta", both: "Precio y cantidad distintos", missing: "Sin cotizar", extra: "Solo en esta cotización" },
          empty: "El Matcher no encontró líneas comparables entre las cotizaciones. Revisa que sean del mismo pedido y tengan artículos con precio unitario.",
          another: "Comparar otras cotizaciones",
          download: "Descargar cuadro comparativo en Excel",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "contrato",
        docs: "contratos",
        a_doc: "un contrato",
        the_doc: "el contrato",
        the_docs: "los contratos",
        your_doc: "tu contrato",
        your_docs: "tus contratos",
        all_your_docs: "todos tus contratos",
        all_docs: "todos los contratos",
        each_doc: "cada contrato",
        another_doc: "otro contrato",
        this_doc: "este contrato",
      },
      overrides: {
        title: "Fechas de renovación de contratos, gratis (IA)",
        description:
          "Sube un contrato en PDF y obtén sus fechas clave en una fila de Excel: partes, inicio, vencimiento, renovación automática, preaviso y fecha límite para avisar. Gratis, sin plantillas y sin registro para ver el resultado.",
        label: "Fechas de contratos",
        h1: "Saca las fechas clave de un contrato",
        intro:
          "Sube el PDF. Tavnit lee el contrato y te devuelve una fila con las partes, la fecha de firma, el inicio y el fin de la vigencia, si se renueva solo, el preaviso y el último día para avisar que no renuevas. Sirve con contratos de servicios, arrendamiento, suministro o licencia, en el formato que vengan.",
        drop: {
          title: "Arrastra tu contrato aquí",
          sample: "Probar con un contrato de ejemplo",
        },
        stages: ["Subiendo el documento", "Leyendo las partes", "Buscando vigencia y renovación", "Calculando la fecha límite de aviso", "Casi listo"],
        result: {
          empty: "No encontramos partes ni fechas en este documento. Prueba con un contrato firmado que tenga cláusula de vigencia.",
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de contrato. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: responsable interno, centro de costo, cláusula de penalidad…",
          another: "Procesar otro contrato",
        },
        next: {
          lead: "Esto fue un contrato. Con una cuenta, lo mismo pasa con todos los que llegan, y las fechas no se quedan en un Excel: avisan solas antes del vencimiento.",
          source: "Tu contrato",
          inputs: { show: "¿Cómo llega tu contrato?" },
          flow: {
            name: "Contrato",
            add: { name: "responsable_interno", type: "Text", hint: "Quién lo firma por nosotros", save: "Guardar", value: "M. Pérez" },
          },
        },
        cleaners: {
          lead: "Reglas simples que corren solas sobre cada contrato después de leerlo. Cuatro ideas con tus propios datos:",
          ideas: [
            { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todos los contratos, el mismo formato" },
            { icon: "calendar", title: "Aviso 60 días antes del vencimiento", from: "fecha_fin", to: "recordatorio a tiempo", note: "antes de que pase la fecha límite de aviso" },
            { icon: "alert", title: "Renovación automática: revisar antes", from: "renovacion_automatica = Sí", to: "a revisión", note: "para que ningún contrato se renueve sin que nadie lo mire" },
            { icon: "mail", title: "Correo al responsable", from: "contrato leído", to: "correo con la fila", note: "quien lo firmó recibe las fechas" },
          ],
        },
        after: {
          lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit lee todos los contratos:",
        },
        how: {
          steps: [
            { title: "Sube el contrato", body: "PDF con texto o escaneado. Da igual el tipo de contrato o quién lo redactó." },
            { title: "Tavnit lo lee", body: "Encuentra las partes, la firma, la vigencia, la cláusula de renovación y el preaviso, y calcula la fecha límite para avisar." },
            { title: "Revisa y descarga", body: "Ves la fila en pantalla. Con tu cuenta gratis te la llevas en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} contratos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Qué fechas y datos saca?",
            a: "Las partes, la fecha de firma, el inicio y el fin de la vigencia, el plazo, si se renueva automáticamente, el preaviso, la fecha límite para avisar que no renuevas, el valor con su moneda y la ley aplicable. Lo que el contrato no dice queda vacío: nunca se inventa una fecha.",
          },
          {
            q: "¿Por qué el resultado es una sola fila?",
            a: "Porque un contrato tiene una vigencia, una fecha de firma y unas partes. Con una cuenta puedes correr una carpeta entera de contratos y obtener una tabla con una fila por contrato, lista para ordenar por vencimiento.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "PDF (con texto o escaneado), JPG y PNG, de hasta 4 MB y 5 páginas. Si tu contrato tiene más páginas, sube las que tienen la vigencia y la renovación, o crea una cuenta.",
          },
          {
            q: "¿Puedo elegir otras columnas?",
            a: "Aquí no: esta herramienta usa un Flow fijo de contrato con 14 campos. En tu cuenta creas tus propios Flows, para contratos o cualquier otro documento, con los campos que necesites: responsable interno, cláusula de penalidad, garantía. Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
          },
          {
            q: "¿Qué pasa con mi archivo?",
            a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el archivo y la fila extraída se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
          },
          {
            q: "¿Sirve con contratos de cualquier país?",
            a: "Sí. Funciona con contratos en español, inglés y otros idiomas, y con cualquier formato de fecha. Está probada con contratos de Panamá, México, Colombia y Estados Unidos, entre otros.",
          },
          {
            q: "¿Cómo hago que avise antes del vencimiento?",
            a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía los contratos a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. Un Cleaner compara la fecha límite de aviso con hoy y manda el correo o el webhook a quien deba decidir.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "recibo",
        docs: "recibos",
        a_doc: "un recibo",
        the_doc: "el recibo",
        the_docs: "los recibos",
        your_doc: "tu recibo",
        your_docs: "tus recibos",
        all_your_docs: "todos tus recibos",
        all_docs: "todos los recibos",
        each_doc: "cada recibo",
        another_doc: "otro recibo",
        this_doc: "este recibo",
      },
      overrides: {
        title: "Recibos a Excel gratis: de la foto a la hoja de cálculo",
        description:
          "Sube la foto o el PDF de un recibo y recibe sus líneas en Excel: comercio, fecha, artículos, cantidades, ITBMS, propina y total. Gratis, sin plantillas y sin registro para ver el resultado.",
        label: "Recibos a Excel",
        h1: "Pasa un recibo a Excel",
        intro:
          "Toma una foto del recibo o sube el PDF. Tavnit lee el comercio, la fecha, cada artículo con su precio y los totales, y te lo devuelve como hoja de cálculo. Sirve con tickets térmicos borrosos, torcidos o arrugados: no hay plantilla que configurar.",
        drop: {
          title: "Arrastra la foto de tu recibo aquí",
          sample: "Probar con un recibo de ejemplo",
        },
        stages: ["Subiendo el recibo", "Leyendo el comercio y la fecha", "Encontrando los artículos", "Ordenando las columnas", "Casi listo"],
        result: {
          empty: "No encontramos artículos en este recibo. Prueba con una foto más nítida, con el ticket completo y sin sombras.",
          flowNote: "Estas {fields} columnas son los campos de un Flow fijo de recibo. En tu cuenta, los campos los eliges tú.",
          ghostHint: "En Tavnit agregas los campos que quieras: centro de costo, quién lo gastó, proyecto, categoría…",
        },
        next: {
          lead: "Esto fue un recibo. Con una cuenta, lo mismo pasa con todos los que llegan, y las líneas no se quedan en un Excel: siguen su camino solas.",
          source: "Tu recibo",
          inputs: { show: "¿Cómo llega tu recibo?" },
          flow: {
            name: "Recibo",
            add: { name: "centro_costo", type: "Text", hint: "Quién lo gastó o proyecto", save: "Guardar", value: "Ventas" },
          },
        },
        cleaners: {
          lead: "Reglas simples que corren solas sobre cada recibo después de leerlo. Cuatro ideas con tus propios datos:",
          ideas: [
            { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todos los recibos, el mismo formato para el reporte de gastos" },
            { icon: "sum", title: "Los artículos deben sumar el subtotal", from: "artículos {sum}", to: "subtotal {subtotal}", note: "si no cuadra, la foto se lee mal y alguien la revisa", check: "sum" },
            { icon: "approve", title: "Aprobación por encima de un monto", from: "total {total}", to: "aprobar antes de reembolsar", note: "si supera {threshold}" },
            { icon: "money", title: "Convertir a tu moneda", from: "{total} {currency}", to: "tu moneda", note: "al tipo de cambio de la fecha del recibo, para viajes" },
          ],
        },
        after: {
          lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit procesa todos los recibos de un viaje o de un mes:",
        },
        how: {
          steps: [
            { title: "Sube el recibo", body: "Una foto del celular o un PDF. Da igual el comercio, el idioma o lo borroso del ticket." },
            { title: "Tavnit lo lee", body: "Encuentra el comercio, la fecha, el número, cada artículo con su precio, y el subtotal, el impuesto, la propina y el total." },
            { title: "Revisa y descarga", body: "Ves la tabla en pantalla. Con tu cuenta gratis te la llevas en Excel." },
          ],
        },
        faqs: [
          {
            q: "¿Qué incluye la versión gratis?",
            a: "{limit} recibos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
          },
          {
            q: "¿Sirve con una foto tomada con el celular?",
            a: "Sí, es el caso normal. Funciona con JPG, PNG y PDF de hasta 4 MB. Ayuda que el ticket esté completo en la foto, con luz pareja y sin dedos encima; si sale torcido o un poco borroso, igual lo lee.",
          },
          {
            q: "¿Qué formatos acepta?",
            a: "JPG, PNG y PDF (con texto o escaneado), de hasta 4 MB y 5 páginas. Un recibo largo de supermercado cabe en una sola foto.",
          },
          {
            q: "¿Tengo que configurar una plantilla por comercio?",
            a: "No. Tavnit no usa plantillas: lee cada recibo como llega, sea de un restaurante, una farmacia, un taxi o una gasolinera.",
          },
          {
            q: "¿Puedo elegir otras columnas?",
            a: "Aquí no: esta herramienta usa un Flow fijo de recibo con 15 campos. En tu cuenta creas tus propios Flows con los campos que necesites: por documento (centro de costo, quién lo gastó, proyecto, categoría) o por línea (código de producto). Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
          },
          {
            q: "¿Qué pasa con mi archivo?",
            a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas la foto y las filas extraídas se borran solas, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
          },
          {
            q: "Tengo cincuenta recibos de un viaje, ¿los subo uno por uno?",
            a: "Aquí sí, de a uno. Con una cuenta los mandas todos de una vez: los reenvías por correo al Flow, los arrastras en bloque o los conectas por API, y cada recibo sale como filas en el mismo Excel, Google Sheets o tu sistema de gastos.",
          },
          {
            q: "¿Cómo hago que sea automático?",
            a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía las fotos de los recibos a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. El reporte de gastos se arma solo.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format. The search it answers in Spanish is the everyday LatAm one: a file
     * exported with "1.234,56" that Excel reads as text, or the other way round.
     */
    "number-format": {
      vocab: {
        doc: "hoja de cálculo",
        docs: "hojas de cálculo",
        a_doc: "una hoja de cálculo",
        the_doc: "la hoja de cálculo",
        the_docs: "las hojas de cálculo",
        your_doc: "tu hoja de cálculo",
        your_docs: "tus hojas de cálculo",
        all_your_docs: "todas tus hojas de cálculo",
        all_docs: "todas las hojas de cálculo",
        each_doc: "cada hoja de cálculo",
        another_doc: "otra hoja de cálculo",
        this_doc: "esta hoja de cálculo",
      },
      overrides: {
        title: "Convertir comas a puntos en Excel, gratis",
        description:
          "Sube un Excel o CSV con números como 1.234,56 o 1,234.56 y recíbelos en un solo formato, listos para sumar. Eliges las columnas y el formato. Gratis, sin registro para ver el resultado.",
        label: "Comas y puntos en números",
        h1: "Convierte comas a puntos en tus números",
        intro:
          "Sube el Excel o el CSV. Eliges qué columnas son números y cómo quieres que queden: 1234.56, 1,234.56 o 1.234,56. Tavnit los convierte todos y te devuelve tu archivo, con las mismas columnas y en el mismo orden.",
        trust: ["CSV o Excel · hasta 500 filas", "{limit} archivos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra tu Excel o CSV aquí",
          hint: "o elige un archivo de tu computadora",
          choose: "Elegir archivo",
          sample: "Probar con un archivo de ejemplo",
          formats: "CSV o .xlsx · hasta 4 MB y 500 filas",
        },
        errors: {
          unsupported: "Solo aceptamos archivos CSV o Excel (.xlsx).",
          xls: "Es un Excel antiguo (.xls). Ábrelo en Excel y guárdalo como .xlsx o .csv.",
          too_many_rows: "La versión gratis procesa hasta 500 filas. Sube una parte del archivo.",
          too_many_columns: "Elige hasta 10 columnas a la vez.",
          no_columns: "Elige al menos una columna.",
          nothing_to_clean: "En esas columnas no encontramos números que convertir.",
          empty: "El archivo está vacío o no tiene filas debajo del encabezado.",
          unreadable: "No pudimos leer el archivo. Si es un Excel, guárdalo de nuevo como .xlsx.",
          failed: "No pudimos convertir este archivo. Prueba de nuevo o con el archivo de ejemplo.",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube el archivo", body: "Un CSV o un Excel. Da igual si viene separado por comas o por punto y coma." },
            { title: "Elige columnas y formato", body: "Marcamos las columnas que parecen números. Dices si tus decimales van con coma o con punto, y cómo los quieres." },
            { title: "Revisa y descarga", body: "Ves las celdas que cambiaron resaltadas. Con tu cuenta gratis te llevas el archivo en Excel o CSV." },
          ],
        },
        faqs: [
          { q: "¿Por qué Excel no suma mis números?", a: "Porque los está leyendo como texto. Pasa cuando el archivo viene de un sistema o de un país que escribe los decimales distinto al tuyo: 1.234,56 en un Excel configurado para 1,234.56, o al revés. Convertirlos a un solo formato los vuelve números otra vez." },
          { q: "¿Cómo sabe si mis decimales van con coma o con punto?", a: "Lo adivinamos mirando tus valores: si aparece 1.234,56, el decimal es la coma. Si no se puede saber, por ejemplo con 1.234 solo, eliges tú. Esa elección decide cómo se lee cada número." },
          { q: "¿Qué formato me conviene?", a: "1234.56, sin separador de miles, es el que cualquier sistema, fórmula o importación lee sin problemas. 1,234.56 y 1.234,56 son para mostrar el archivo a personas, según tu país." },
          { q: "¿Qué pasa con las celdas que no son números?", a: "Se quedan como estaban. Un porcentaje (15%), un texto (N/A) o una celda vacía no se tocan: solo cambia lo que es claramente un número." },
          { q: "¿Qué formatos acepta?", a: "CSV separado por comas, punto y coma o tabulador, y Excel .xlsx, de hasta 4 MB y 500 filas. Si tienes un Excel antiguo (.xls), guárdalo como .xlsx." },
          { q: "¿Qué pasa con mi archivo?", a: "Se usa solo para esta conversión y se borra a las 24 horas, junto con el resultado. Solo tu navegador puede ver el resultado." },
          { q: "¿Cómo hago que esto pase solo?", a: "En Tavnit, la misma regla es un Cleaner: se aplica sola a cada documento que extraes o a cada archivo que llega por correo o API, junto con fechas, monedas y validaciones." },
        ],
        clean: {
          setup: {
            heading: "Elige las columnas y el formato",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columnas con números",
            columnsHint: "Hasta {max}. Marcamos las que parecen números.",
            tooMany: "Puedes elegir hasta {max} columnas a la vez.",
            inputLabel: "En tu archivo, los decimales van con",
            inputOptions: { comma: "coma · 1.234,56", dot: "punto · 1,234.56" },
            outputLabel: "Quiero los números así",
            outputOptions: { plain: "1234.56 · para fórmulas y sistemas", us: "1,234.56", latam: "1.234,56" },
            preview: "Primeras filas",
            run: "Convertir",
            change: "Cambiar archivo",
          },
          stages: ["Subiendo el archivo", "Leyendo las columnas", "Convirtiendo los números", "Armando tu archivo"],
          heading: "Listo: {file}",
          summary: "{cells} cambiadas en {cols}",
          cellWord: ["celda", "celdas"],
          columnWord: ["columna", "columnas"],
          unchanged: "No hizo falta cambiar ninguna celda: ya estaban en ese formato.",
          highlight: "En azul, las celdas que cambiaron.",
          shown: "Se muestran {shown} de {total} filas. La descarga incluye todas.",
          download: "Descargar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir otro archivo",
          automate: {
            heading: "Que pase solo, con cada archivo",
            body: "En Tavnit esta regla es un Cleaner. Lo armas una vez y se aplica solo a cada factura que extraes o a cada archivo que llega por correo o API, junto con fechas, monedas y validaciones.",
            cta: "Crear cuenta gratis",
            docs: "Qué es un Cleaner",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: {
        doc: "hoja de cálculo",
        docs: "hojas de cálculo",
        a_doc: "una hoja de cálculo",
        the_doc: "la hoja de cálculo",
        the_docs: "las hojas de cálculo",
        your_doc: "tu hoja de cálculo",
        your_docs: "tus hojas de cálculo",
        all_your_docs: "todas tus hojas de cálculo",
        all_docs: "todas las hojas de cálculo",
        each_doc: "cada hoja de cálculo",
        another_doc: "otra hoja de cálculo",
        this_doc: "esta hoja de cálculo",
      },
      overrides: {
        title: "Cambiar formato de fecha en Excel, gratis",
        description:
          "Sube un Excel o CSV con fechas mezcladas (03/04/2024, 12 de marzo de 2024, 2024-03-12) y recíbelas todas en un solo formato. Eliges las columnas y el formato. Gratis, sin registro para ver el resultado.",
        label: "Formato de fechas",
        h1: "Pon todas tus fechas en un solo formato",
        intro:
          "Sube el Excel o el CSV. Eliges qué columnas son fechas y cómo las quieres: 2024-03-12, 12/03/2024 o 03/12/2024. Tavnit las convierte todas, también las escritas en palabras, y te devuelve tu archivo con las mismas columnas.",
        trust: ["CSV o Excel · hasta 500 filas", "{limit} archivos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra tu Excel o CSV aquí",
          hint: "o elige un archivo de tu computadora",
          choose: "Elegir archivo",
          sample: "Probar con un archivo de ejemplo",
          formats: "CSV o .xlsx · hasta 4 MB y 500 filas",
        },
        errors: {
          unsupported: "Solo aceptamos archivos CSV o Excel (.xlsx).",
          xls: "Es un Excel antiguo (.xls). Ábrelo en Excel y guárdalo como .xlsx o .csv.",
          too_many_rows: "La versión gratis procesa hasta 500 filas. Sube una parte del archivo.",
          too_many_columns: "Elige hasta 10 columnas a la vez.",
          no_columns: "Elige al menos una columna.",
          nothing_to_clean: "En esas columnas no encontramos fechas que convertir.",
          empty: "El archivo está vacío o no tiene filas debajo del encabezado.",
          unreadable: "No pudimos leer el archivo. Si es un Excel, guárdalo de nuevo como .xlsx.",
          failed: "No pudimos convertir este archivo. Prueba de nuevo o con el archivo de ejemplo.",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube el archivo", body: "Un CSV o un Excel, con las fechas como vengan: con barras, guiones, puntos o en palabras." },
            { title: "Elige columnas y formato", body: "Marcamos las columnas que parecen fechas. Dices si tu archivo pone primero el día o el mes, y cómo las quieres." },
            { title: "Revisa y descarga", body: "Ves las celdas que cambiaron resaltadas. Con tu cuenta gratis te llevas el archivo en Excel o CSV." },
          ],
        },
        faqs: [
          { q: "¿Cómo sabe si 03/04/2024 es 3 de abril o 4 de marzo?", a: "No se puede saber mirando una sola fecha. Por eso te preguntamos si tu archivo pone primero el día o el mes, y lo proponemos nosotros si en la columna aparece una fecha como 15/04/2024, que solo se puede leer de una forma." },
          { q: "¿Entiende fechas escritas en palabras?", a: "Sí. \"12 de marzo de 2024\", \"1 abr 2024\" o \"March 5th 2024\" se leen con IA, que es lo que una fórmula de Excel no puede hacer. Las fechas con números se leen con reglas, sin IA." },
          { q: "¿Qué formato me conviene?", a: "2024-03-12 (año, mes, día) es el que cualquier sistema lee sin confusión y el que ordena bien. 12/03/2024 es el habitual en Latinoamérica y Europa; 03/12/2024, en Estados Unidos." },
          { q: "¿Qué pasa con las celdas que no son fechas?", a: "Se quedan como estaban, igual que las celdas vacías. Si una fecha no se puede leer con seguridad, la dejamos como venía en lugar de adivinar." },
          { q: "¿Y si mi Excel ya tiene las fechas como fecha?", a: "Las reconocemos tal cual, sin reinterpretarlas, y solo les cambiamos el formato." },
          { q: "¿Qué pasa con mi archivo?", a: "Se usa solo para esta conversión y se borra a las 24 horas, junto con el resultado. Solo tu navegador puede ver el resultado." },
          { q: "¿Cómo hago que esto pase solo?", a: "En Tavnit, la misma regla es un Cleaner: se aplica sola a cada documento que extraes o a cada archivo que llega por correo o API, junto con números, monedas y validaciones." },
        ],
        clean: {
          setup: {
            heading: "Elige las columnas y el formato",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columnas con fechas",
            columnsHint: "Hasta {max}. Marcamos las que parecen fechas.",
            tooMany: "Puedes elegir hasta {max} columnas a la vez.",
            inputLabel: "En tu archivo, las fechas con números ponen primero",
            inputOptions: { dmy: "el día · 31/12/2024", mdy: "el mes · 12/31/2024" },
            outputLabel: "Quiero las fechas así",
            outputOptions: { iso: "2024-03-12 · año, mes, día", dmy: "12/03/2024 · día, mes, año", mdy: "03/12/2024 · mes, día, año" },
            preview: "Primeras filas",
            run: "Convertir",
            change: "Cambiar archivo",
          },
          stages: ["Subiendo el archivo", "Leyendo las columnas", "Convirtiendo las fechas", "Leyendo las fechas en palabras", "Armando tu archivo"],
          heading: "Listo: {file}",
          summary: "{cells} cambiadas en {cols}",
          cellWord: ["celda", "celdas"],
          columnWord: ["columna", "columnas"],
          unchanged: "No hizo falta cambiar ninguna celda: ya estaban en ese formato.",
          highlight: "En azul, las celdas que cambiaron.",
          shown: "Se muestran {shown} de {total} filas. La descarga incluye todas.",
          download: "Descargar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir otro archivo",
          automate: {
            heading: "Que pase solo, con cada archivo",
            body: "En Tavnit esta regla es un Cleaner. Lo armas una vez y se aplica solo a cada factura, contrato o archivo que llega, junto con números, monedas y validaciones.",
            cta: "Crear cuenta gratis",
            docs: "Qué es un Cleaner",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: {
        doc: "hoja de cálculo",
        docs: "hojas de cálculo",
        a_doc: "una hoja de cálculo",
        the_doc: "la hoja de cálculo",
        the_docs: "las hojas de cálculo",
        your_doc: "tu hoja de cálculo",
        your_docs: "tus hojas de cálculo",
        all_your_docs: "todas tus hojas de cálculo",
        all_docs: "todas las hojas de cálculo",
        each_doc: "cada hoja de cálculo",
        another_doc: "otra hoja de cálculo",
        this_doc: "esta hoja de cálculo",
      },
      overrides: {
        title: "Convertir moneda en Excel con la tasa del día, gratis",
        description:
          "Sube un Excel o CSV con precios o montos y recibe cada columna convertida a dólares, euros, pesos mexicanos o cualquiera de 30 monedas, con la tasa de referencia del día. Gratis, sin registro para ver el resultado.",
        label: "Convertir moneda",
        h1: "Convierte los montos de tu Excel a otra moneda",
        intro:
          "Sube el Excel o el CSV. Eliges las columnas con montos, en qué moneda están y a cuál las quieres. Tavnit agrega al lado de cada una la columna convertida con la tasa del día, y te devuelve tu archivo completo.",
        trust: ["CSV o Excel · hasta 500 filas", "{limit} archivos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra tu Excel o CSV aquí",
          hint: "o elige un archivo de tu computadora",
          choose: "Elegir archivo",
          sample: "Probar con un archivo de ejemplo",
          formats: "CSV o .xlsx · hasta 4 MB y 500 filas",
        },
        errors: {
          unsupported: "Solo aceptamos archivos CSV o Excel (.xlsx).",
          xls: "Es un Excel antiguo (.xls). Ábrelo en Excel y guárdalo como .xlsx o .csv.",
          too_many_rows: "La versión gratis procesa hasta 500 filas. Sube una parte del archivo.",
          too_many_columns: "Elige hasta 10 columnas a la vez.",
          no_columns: "Elige al menos una columna.",
          nothing_to_clean: "En esas columnas no encontramos montos que convertir.",
          empty: "El archivo está vacío o no tiene filas debajo del encabezado.",
          unreadable: "No pudimos leer el archivo. Si es un Excel, guárdalo de nuevo como .xlsx.",
          failed: "No pudimos convertir este archivo. Prueba de nuevo o con el archivo de ejemplo.",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube el archivo", body: "Un CSV o un Excel con precios, totales o cualquier columna de montos." },
            { title: "Elige monedas", body: "Marcamos las columnas que parecen montos. Dices en qué moneda están, cómo van sus decimales y a qué moneda las pasamos." },
            { title: "Revisa y descarga", body: "Cada columna convertida aparece al lado de la original. Con tu cuenta gratis te llevas el archivo en Excel o CSV." },
          ],
        },
        faqs: [
          { q: "¿Qué tasa de cambio usa?", a: "La tasa de referencia del día que publica el Banco Central Europeo. Es la misma para todo el archivo y es una referencia, no la tasa de compra o venta de tu banco." },
          { q: "¿Qué monedas puedo convertir?", a: "Dólar (USD), euro (EUR), libra (GBP), peso mexicano (MXN), real (BRL), yuan (CNY), dólar canadiense, yen, franco suizo y las demás monedas que publica el Banco Central Europeo, 30 en total. Puedes convertir de cualquiera a cualquiera." },
          { q: "¿Funciona con pesos colombianos, soles, pesos chilenos o balboas?", a: "Todavía no: esas monedas no están en las tasas del Banco Central Europeo. En Panamá, como el balboa va a la par con el dólar, puedes elegir USD." },
          { q: "¿Qué pasa con mis columnas originales?", a: "Se quedan como estaban. La conversión se agrega en una columna nueva al lado, por ejemplo \"Precio (USD)\", para que compares." },
          { q: "¿Qué pasa con las celdas que no son montos?", a: "Se quedan vacías en la columna convertida. Un texto, un porcentaje o una celda vacía no se convierten." },
          { q: "¿Qué pasa con mi archivo?", a: "Se usa solo para esta conversión y se borra a las 24 horas, junto con el resultado. Solo tu navegador puede ver el resultado." },
          { q: "¿Cómo hago que esto pase solo?", a: "En Tavnit, la conversión de moneda es un Cleaner: se aplica sola a cada factura que extraes o a cada archivo que llega por correo o API, junto con fechas, números y validaciones." },
        ],
        clean: {
          setup: {
            heading: "Elige las columnas y las monedas",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columnas con montos",
            columnsHint: "Hasta {max}. Marcamos las que parecen montos.",
            tooMany: "Puedes elegir hasta {max} columnas a la vez.",
            sourceLabel: "Los montos están en",
            sourceHint: "Monedas con tasa del Banco Central Europeo.",
            inputLabel: "Los decimales van con",
            inputOptions: { comma: "coma · 1.234,56", dot: "punto · 1,234.56" },
            outputPopular: "Más usadas",
            outputAll: "Todas las monedas",
            outputLabel: "Convertir a",
            outputOptions: {},
            preview: "Primeras filas",
            run: "Convertir",
            change: "Cambiar archivo",
          },
          stages: ["Subiendo el archivo", "Leyendo los montos", "Buscando la tasa del día", "Convirtiendo", "Armando tu archivo"],
          heading: "Listo: {file}",
          summary: "{cells} convertidas en {cols}",
          cellWord: ["celda", "celdas"],
          columnWord: ["columna", "columnas"],
          unchanged: "No encontramos montos que convertir en esas columnas.",
          highlight: "En azul, las columnas convertidas.",
          shown: "Se muestran {shown} de {total} filas. La descarga incluye todas.",
          download: "Descargar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir otro archivo",
          automate: {
            heading: "Que pase solo, con cada factura",
            body: "En Tavnit la conversión de moneda es un Cleaner. Lo armas una vez y cada factura o cotización en otra moneda llega convertida, junto con fechas, números y validaciones.",
            cta: "Crear cuenta gratis",
            docs: "Qué es un Cleaner",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "hoja de cálculo",
        docs: "hojas de cálculo",
        a_doc: "una hoja de cálculo",
        the_doc: "la hoja de cálculo",
        the_docs: "las hojas de cálculo",
        your_doc: "tu hoja de cálculo",
        your_docs: "tus hojas de cálculo",
        all_your_docs: "todas tus hojas de cálculo",
        all_docs: "todas las hojas de cálculo",
        each_doc: "cada hoja de cálculo",
        another_doc: "otra hoja de cálculo",
        this_doc: "esta hoja de cálculo",
      },
      overrides: {
        title: "Traducir un Excel por columnas, gratis",
        description:
          "Sube un Excel o CSV y traduce las columnas que elijas a más de 40 idiomas: inglés, español, portugués, chino y más. La traducción se agrega al lado de cada columna. Gratis, sin registro para ver el resultado.",
        label: "Traducir columnas",
        h1: "Traduce las columnas de tu Excel",
        intro:
          "Sube el Excel o el CSV. Eliges qué columnas traducir y a qué idioma. Tavnit detecta el idioma de origen y agrega la traducción al lado de cada columna, sin tocar el resto de tu archivo.",
        trust: ["CSV o Excel · hasta 200 filas", "{limit} archivos gratis al día", "Se borra todo a las 24 h"],
        drop: {
          title: "Arrastra tu Excel o CSV aquí",
          hint: "o elige un archivo de tu computadora",
          choose: "Elegir archivo",
          sample: "Probar con un archivo de ejemplo",
          formats: "CSV o .xlsx · hasta 4 MB y 200 filas",
        },
        errors: {
          unsupported: "Solo aceptamos archivos CSV o Excel (.xlsx).",
          xls: "Es un Excel antiguo (.xls). Ábrelo en Excel y guárdalo como .xlsx o .csv.",
          too_many_rows: "La traducción gratis procesa hasta 200 filas. Sube una parte del archivo.",
          too_many_columns: "Elige hasta 10 columnas a la vez.",
          no_columns: "Elige al menos una columna.",
          nothing_to_clean: "En esas columnas no encontramos texto que traducir.",
          empty: "El archivo está vacío o no tiene filas debajo del encabezado.",
          unreadable: "No pudimos leer el archivo. Si es un Excel, guárdalo de nuevo como .xlsx.",
          failed: "No pudimos traducir este archivo. Prueba de nuevo o con el archivo de ejemplo.",
        },
        how: {
          heading: "Cómo funciona",
          steps: [
            { title: "Sube el archivo", body: "Un CSV o un Excel con descripciones, instrucciones, comentarios o cualquier columna de texto." },
            { title: "Elige columnas e idioma", body: "Marcamos las columnas que tienen texto. Eliges a qué idioma van; el de origen lo detectamos solos." },
            { title: "Revisa y descarga", body: "Cada traducción aparece al lado de su columna original. Con tu cuenta gratis te llevas el archivo en Excel o CSV." },
          ],
        },
        faqs: [
          { q: "¿Qué idiomas puedo elegir?", a: "Más de 40: inglés, español, portugués, francés, alemán, chino, italiano, japonés, coreano, árabe, ruso, hindi, turco, vietnamita y muchos más. El idioma de origen se detecta en cada celda, así que sirve aunque tu archivo mezcle idiomas." },
          { q: "¿Qué pasa con los códigos, números y nombres propios?", a: "Se conservan. La traducción respeta el formato, las unidades y los códigos; una celda que ya está en el idioma de destino se deja igual." },
          { q: "¿Por qué el límite es de 200 filas?", a: "Porque cada celda se traduce con un modelo de lenguaje. En la versión gratis procesamos hasta 200 filas por archivo; con una cuenta no hay ese límite." },
          { q: "¿Qué pasa con mis columnas originales?", a: "Se quedan como estaban. La traducción se agrega en una columna nueva al lado, por ejemplo \"Descripción (EN)\"." },
          { q: "¿Sirve para descripciones de producto en aduanas?", a: "Sí, es un uso habitual: pasar al español o al inglés las descripciones de una factura comercial o una lista de empaque antes de clasificar la mercancía." },
          { q: "¿Qué pasa con mi archivo?", a: "Se usa solo para esta traducción y se borra a las 24 horas, junto con el resultado. Solo tu navegador puede ver el resultado." },
          { q: "¿Cómo hago que esto pase solo?", a: "En Tavnit, la traducción es un Cleaner: se aplica sola a cada documento que extraes o a cada archivo que llega por correo o API, junto con fechas, números y monedas." },
        ],
        clean: {
          setup: {
            heading: "Elige las columnas y el idioma",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columnas con texto",
            columnsHint: "Hasta {max}. Marcamos las que tienen texto.",
            tooMany: "Puedes elegir hasta {max} columnas a la vez.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Más usados",
            outputAll: "Todos los idiomas",
            outputLabel: "Traducir a",
            outputOptions: {},
            preview: "Primeras filas",
            run: "Traducir",
            change: "Cambiar archivo",
          },
          stages: ["Subiendo el archivo", "Leyendo las columnas", "Detectando el idioma", "Traduciendo", "Armando tu archivo"],
          heading: "Listo: {file}",
          summary: "{cells} traducidas en {cols}",
          cellWord: ["celda", "celdas"],
          columnWord: ["columna", "columnas"],
          unchanged: "No encontramos texto que traducir en esas columnas.",
          highlight: "En azul, las columnas traducidas.",
          shown: "Se muestran {shown} de {total} filas. La descarga incluye todas.",
          download: "Descargar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Traducir otro archivo",
          automate: {
            heading: "Que pase solo, con cada documento",
            body: "En Tavnit la traducción es un Cleaner. Lo armas una vez y cada factura, lista de empaque o archivo que llega trae sus descripciones ya traducidas.",
            cta: "Crear cuenta gratis",
            docs: "Qué es un Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Gratis. Sin plantillas. Las líneas de tu factura en una hoja de cálculo.",
    "invoice-line-items": "Gratis. Una fila por línea, el encabezado en cada fila. Sin plantillas.",
    "po-invoice-check": "Gratis. Cada línea de la OC contra la factura: precio, cantidad, faltantes y extras.",
    "split-scanned-pdf": "Gratis. Entra un escaneo, sale cada documento, clasificado.",
    "packing-list-to-excel": "Gratis. Sin plantillas. Cada línea de tu packing list en una hoja de cálculo.",
    "bill-of-lading-to-excel": "Gratis. Sin plantillas. Partes, buque, puertos y una fila por contenedor.",
    "quote-comparison": "Gratis. Dos o tres cotizaciones, una sola tabla, la más barata por línea marcada.",
    "contract-dates": "Gratis. Partes, vigencia, renovación automática y fecha límite de aviso, en una fila.",
    "receipt-to-excel": "Gratis. Una foto del recibo y sus líneas quedan en una hoja de cálculo.",
    "number-format": "Gratis. Cualquier columna de números, un solo formato: 1234.56, 1,234.56 o 1.234,56.",
    "date-format": "Gratis. Fechas mezcladas, un solo formato, también las escritas en palabras.",
    "currency-converter": "Gratis. Cualquier columna de precios, convertida con la tasa de referencia del día.",
    "translate-columns": "Gratis. Cualquier columna de texto, traducida a más de 40 idiomas.",
  },
};

export default copy;
