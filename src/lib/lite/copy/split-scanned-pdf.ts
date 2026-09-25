import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Split a scanned PDF into its documents. The one Lite tool that is a
 * Splitter, not a Flow: the result is a list of documents, each with its
 * page range and type, downloadable one by one or as a zip. The shared
 * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
 * about rows and columns is overridden here.
 */
const splitScannedPdf: Record<Locale, ToolCopyDef> = {
  es: {
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
          href: "/docs/splitters",
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
  en: {
    vocab: {
      doc: "scanned PDF",
      docs: "scanned PDFs",
      a_doc: "a scanned PDF",
      the_doc: "the PDF",
      the_docs: "the PDFs",
      your_doc: "your PDF",
      your_docs: "your PDFs",
      all_your_docs: "all your PDFs",
      all_docs: "all PDFs",
      each_doc: "every PDF",
      another_doc: "another PDF",
      this_doc: "this PDF",
    },
    overrides: {
      title: "Split a Scanned PDF into Documents, Free (AI)",
      description:
        "Upload one PDF with several documents scanned together (invoices, purchase orders, receipts, contracts) and get each document back on its own, classified by type. Free, no page marking.",
      label: "Split a scanned PDF",
      h1: "Split a scanned PDF into its documents",
      intro:
        "You fed ten papers through the scanner and got one PDF. Upload it: Tavnit reads every page, finds where each document begins and hands them back one by one, each with its type (invoice, purchase order, receipt, packing list, bill of lading, contract…). No splitting by page count, nothing to mark by hand.",
      trust: ["One PDF · up to 12 pages", "{limit} free documents a day", "Everything deleted after 24 h"],
      drop: {
        title: "Drop your scanned PDF here",
        hint: "one PDF with several documents inside",
        choose: "Choose file",
        sample: "Try it with a sample scan",
        formats: "PDF · up to 4 MB and 12 pages",
      },
      stages: ["Uploading the PDF", "Reading every page", "Finding where each document starts", "Classifying", "Almost there"],
      result: {
        retention: "deletes itself after 24 h",
        downloading: "Preparing the file",
        another: "Split another PDF",
        empty: "We did not find more than one document in this PDF.",
        flowNote: "These types belong to this tool's fixed Splitter. In your account, you define the types.",
      },
      errors: {
        too_large: "The file is over 4 MB. Compress it or split the scan in two.",
        too_many_pages: "The free version splits up to 12 pages per PDF. With an account there is no limit.",
        unsupported: "We only accept PDF, JPG or PNG. To split documents, upload the PDF from the scanner.",
        failed: "We could not split this PDF. Try another scan, or the sample.",
        empty: "The file is empty.",
      },
      next: {
        lead: "That was one PDF. With an account, every document the Splitter cuts goes to its own Flow: the invoice to invoice extraction, the purchase order to its own, the receipt to the expense report. Nobody separates or classifies by hand again.",
        source: "Your PDF",
        flow: {
          title: "From the Splitter to the Flow: each document to its extraction",
          body: "A Splitter finds where each document begins and classifies it against the types you describe in words. This tool uses a fixed Splitter with eight types and no outputs: it just hands you the documents. In your account you define your own types and, for each one, where it goes: to a Flow that extracts its fields (as below, with {fields} fields), to an email or to a Collection. No templates, no coordinates.",
          linkLabel: "How a Splitter works",
          href: "/docs/splitters",
        },
        inputs: {
          show: "How does your PDF get in?",
        },
      },
      cleaners: {
        heading: "After the split, in Tavnit…",
        lead: "Each document type can have its own destination, with nobody sorting by hand. Four examples:",
        ideas: [
          { icon: "text", title: "Every invoice to its Flow and on to the ERP", from: "invoice (pp. 1–2)", to: "Invoice Flow → ERP", note: "extracted and posted untouched" },
          { icon: "mail", title: "Receipts to the expense report", from: "receipt (p. 5)", to: "expenses@yourcompany", note: "each receipt reaches whoever reconciles it" },
          { icon: "calendar", title: "Contracts to the legal archive with their dates", from: "contract (pp. 6–7)", to: "Contract Flow", note: "expiry and renewal, in one table" },
          { icon: "alert", title: "A heads-up when something is not recognised", from: "unclassified page", to: "human review", note: "nothing gets lost or misfiled" },
        ],
        outro: "Destinations are set in Tavnit per document type. These are just examples.",
        cta: "Create a free account and set it up",
        ctaSignedIn: "Open Tavnit and set it up",
        learn: "What a Splitter is",
      },
      after: {
        title: "Your documents are ready",
        lead: "They came out of a fixed Splitter with eight types. In your account you define the types, and each document goes on to its Flow by itself:",
        close: "Close",
      },
      how: {
        heading: "How it works",
        steps: [
          { title: "Upload the scan", body: "One PDF with several documents inside, exactly as it came off the scanner. Any order, any number of pages per document." },
          { title: "Tavnit splits and classifies it", body: "It reads every page, detects where each document starts and assigns it a type: invoice, purchase order, receipt, packing list, bill of lading, contract, credit note or other." },
          { title: "Download each document", body: "You see the list with page ranges and types. With a free account you take each PDF separately, or all of them in a zip." },
        ],
      },
      faqs: [
        {
          q: "How does it know where one document ends and the next begins?",
          a: "The AI looks at all the pages together, the way a person would: changes of header, of company, of page numbering, of layout. It does not count pages or look for markers, which is why it works when one invoice runs two pages and the receipt is a single one.",
        },
        {
          q: "Which document types does it recognise?",
          a: "Here, eight: invoice, purchase order, receipt, packing list, bill of lading, contract, credit note and other. With an account you define your own types by describing them in words, and for each one you decide where it goes: to a Flow that extracts its data, to an email or to a Collection.",
        },
        {
          q: "What does the free version include?",
          a: "{limit} documents a day, with the full result on screen. Downloading the separated PDFs takes a Tavnit account, which has no cost.",
        },
        {
          q: "How many pages can I upload?",
          a: "Up to 12 pages per PDF in the free version, up to 4 MB. With an account there is no page limit and you can email scans straight to the Splitter.",
        },
        {
          q: "Does it work with poor scans or mixed languages?",
          a: "Yes. It handles skewed, greyscale and stamped scans, and documents in English, Spanish or other languages mixed in the same PDF. If a page cannot be read it is marked as unclassified rather than given a made-up type.",
        },
        {
          q: "What happens to my file?",
          a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the PDF and the separated documents delete themselves, automatically; we only keep the fact that a run happened, without the file or its contents. If you want it gone sooner, email support@tavnit.io.",
        },
        {
          q: "Why does the download need an account?",
          a: "Because the free version is meant for trying it out. With an account you can split every scan, send each document to its Flow and receive the extracted data in your ERP or by email.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a Splitter with your document types and forward scans to its email address, or connect it through the API. Every document it cuts goes to its Flow on its own, and from there to your ERP, Google Sheets or an inbox.",
        },
      ],
      split: {
        heading: "Done: {file}",
        summary: "{n} in {pages}",
        segmentWord: ["document", "documents"],
        pageWord: ["page", "pages"],
        pages: "pp. {from}–{to}",
        pageOne: "p. {from}",
        unmatched: "Unclassified",
        type: "Type",
        reason: "Why",
        download: "Download",
        downloadAll: "Download all (zip)",
        stages: ["Uploading the PDF", "Reading every page", "Finding where each document starts", "Classifying", "Almost there"],
        empty: "We did not find more than one document in this PDF.",
        another: "Split another PDF",
      },
    },
  },
};

export default splitScannedPdf;
