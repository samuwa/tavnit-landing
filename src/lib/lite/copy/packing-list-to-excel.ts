import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
 * once per document and one row per goods line with packages, net and gross
 * weight and dimensions. Searches targeted: "packing list to excel",
 * "packing list extraction", "packing list a excel", "lista de empaque a
 * excel". Everything not overridden here comes from the base copy with the
 * words below filled in.
 */
const packingListToExcel: Record<Locale, ToolCopyDef> = {
  es: {
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
      title: "Packing list a Excel gratis: extrae la lista de empaque con IA",
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
          a: "PDF (con texto o escaneado), JPG y PNG, de hasta 10 MB y 5 páginas. Si tu packing list tiene más páginas, súbelo por partes o crea una cuenta.",
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
  en: {
    vocab: {
      doc: "packing list",
      docs: "packing lists",
      a_doc: "a packing list",
      the_doc: "the packing list",
      the_docs: "the packing lists",
      your_doc: "your packing list",
      your_docs: "your packing lists",
      all_your_docs: "all your packing lists",
      all_docs: "all packing lists",
      each_doc: "every packing list",
      another_doc: "another packing list",
      this_doc: "this packing list",
    },
    overrides: {
      title: "Packing list to Excel, free: extract every line with AI",
      description:
        "Upload a packing list as PDF or photo and get every line as an Excel table: description, quantity, packages, net and gross weight, dimensions, with shipper, consignee and ports. Free, no templates, no sign-up to see the result.",
      label: "Packing list to Excel",
      h1: "Turn a packing list into Excel",
      intro:
        "Upload the PDF or photo. Tavnit reads the shipment header (shipper, consignee, ports, totals) and every goods line with its packages, weights and dimensions, and hands it back as a spreadsheet. No per-supplier templates: the same tool works on the packing lists of all your shipments.",
      drop: {
        title: "Drop your packing list here",
        sample: "Try it with a sample packing list",
      },
      stages: ["Uploading the document", "Reading the shipment header", "Finding the goods lines", "Ordering the columns", "Almost there"],
      result: {
        empty: "We could not find goods lines in this document. Try a packing list with packages, weights or quantities per line.",
        flowNote: "These {fields} columns are the fields of a fixed packing list Flow. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: container, marks, HS code, B/L number…",
      },
      next: {
        lead: "That was one packing list. With an account, the same happens to every packing list that arrives, and the lines do not stop at an Excel: they keep going on their own.",
        source: "Your packing list",
        flow: {
          name: "Packing list",
          add: { name: "container", type: "Text", hint: "Next to \"Container\" · e.g. MSKU-4417", save: "Save", value: "MSKU-4417" },
        },
        inputs: { show: "How does your packing list get in?" },
      },
      cleaners: {
        lead: "Simple rules that run on their own over every packing list after extraction. Four ideas using your own data:",
        ideas: [
          { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every packing list, the same format" },
          { icon: "alert", title: "Gross weight must exceed net", from: "net > gross", to: "to review", note: "a line the wrong way round is never declared unseen" },
          { icon: "calendar", title: "Heads-up before sailing", from: "shipment date", to: "reminder 2 days before", note: "to your customs broker and logistics" },
          { icon: "mail", title: "Copy to the customs broker", from: "extracted packing list", to: "email with the Excel", note: "together with the related invoice" },
        ],
      },
      after: {
        lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every packing list:",
      },
      how: {
        steps: [
          { title: "Upload the packing list", body: "PDF, photo or scan. Any shipper, any language, any layout." },
          {
            title: "Tavnit reads it",
            body: "It finds the header (shipper, consignee, ports, totals) and the goods table with packages, net weight, gross weight and dimensions per line.",
          },
          { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "Which formats does it accept?",
          a: "PDF (text or scanned), JPG and PNG, up to 10 MB and 5 pages. If your packing list is longer, upload it in parts or create an account.",
        },
        {
          q: "Which columns does it extract from a packing list?",
          a: "Per document: shipper, consignee, number, date, related invoice, port of loading, port of discharge and the totals of packages and weights. Per line: description, quantity, unit, packages, net weight, gross weight and dimensions. Document values repeat on every row so the table filters on its own.",
        },
        {
          q: "Can I choose other columns?",
          a: "Not here: this tool uses a fixed packing list Flow with 17 fields. In your account you create your own Flows, for packing lists or any other document, with the fields you need: per document (container, seal, B/L number, incoterm) or per line (marks, HS code, volume). No templates: you describe the field and, when needed, give it a hint on where to look.",
        },
        {
          q: "Does it work with packing lists from any country?",
          a: "Yes. It handles packing lists in English, Spanish and other languages, with weights in kg or lb and measurements in cm or inches, exactly as printed. It is tested on shipments from Panama, Colombia, Mexico, China and the US, among others.",
        },
        {
          q: "Do I need to set up a template per supplier?",
          a: "No. Tavnit does not use templates: it reads each document as it comes, even if the shipper changes its packing list layout tomorrow.",
        },
        {
          q: "What happens to my file?",
          a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a Flow with the fields you want and forward packing lists to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. Every shipment lands in your customs system, your ERP or Google Sheets with nobody typing.",
        },
      ],
    },
  },
};

export default packingListToExcel;
