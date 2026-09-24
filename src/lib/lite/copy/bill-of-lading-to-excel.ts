import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Bill of lading → Excel. The words ("BL" in Spanish, where the trade says
 * BL far more than "conocimiento de embarque"; "bill of lading" in English)
 * and everything that is specific to an ocean B/L: header fields, one row
 * per container line, customs and forwarder use cases.
 */
const billOfLadingToExcel: Record<Locale, ToolCopyDef> = {
  es: {
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
  en: {
    vocab: {
      doc: "bill of lading",
      docs: "bills of lading",
      a_doc: "a bill of lading",
      the_doc: "the bill of lading",
      the_docs: "the bills of lading",
      your_doc: "your bill of lading",
      your_docs: "your bills of lading",
      all_your_docs: "all your bills of lading",
      all_docs: "all bills of lading",
      each_doc: "every bill of lading",
      another_doc: "another bill of lading",
      this_doc: "this bill of lading",
    },
    overrides: {
      title: "Bill of Lading to Excel, Free: Extract B/L Data",
      description:
        "Upload a bill of lading (B/L) as PDF or photo and get its data as an Excel table: B/L number, carrier, shipper, consignee, vessel, ports, and one row per container with seal, goods, packages, weight and volume. Free, no templates, no sign-up to see the result.",
      label: "Bill of lading to Excel",
      h1: "Turn a bill of lading into Excel",
      intro:
        "Upload the PDF or photo of the B/L. Tavnit reads the header (B/L number, carrier, shipper, consignee, vessel, voyage, ports, shipped-on-board date) and every cargo line with its container, seal, packages, gross weight and volume, and hands it back as a spreadsheet. No per-carrier templates: the same Flow reads MSC, Maersk, Hapag-Lloyd or any NVOCC.",
      drop: {
        title: "Drop your bill of lading here",
        sample: "Try it with a sample B/L",
      },
      stages: ["Uploading the document", "Reading the B/L header", "Finding the cargo lines", "Ordering the columns", "Almost there"],
      result: {
        empty: "We could not find cargo lines in this document. Try a bill of lading that has the container and goods table.",
        flowNote: "These {fields} columns are the fields of a fixed bill of lading Flow. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: incoterm, place of delivery, booking number, ETA…",
        another: "Process another bill of lading",
      },
      errors: {
        too_large: "The file is over 4 MB. Compress it or upload only the B/L pages.",
      },
      next: {
        lead: "That was one bill of lading. With an account, the same happens to every B/L that arrives from every carrier and agent, and the data does not stop at an Excel: it keeps going on its own into your customs or freight system.",
        source: "Your B/L",
        flow: {
          name: "Bill of lading",
          add: { name: "incoterm", type: "Text", hint: "Next to \"Incoterm\" · e.g. CIF Manzanillo", save: "Save", value: "CIF" },
        },
        inputs: { show: "How does your B/L get in?" },
      },
      cleaners: {
        lead: "Simple rules that run on their own over every bill of lading after extraction. Four ideas using your own data:",
        ideas: [
          { icon: "date", title: "One way to write the shipped-on-board date", from: "{date}", to: "{iso}", note: "every B/L, the same format" },
          { icon: "alert", title: "Gross weight out of range", from: "gross weight per container", to: "flag above 26,000 kg", note: "so nobody books a truck that cannot take it" },
          { icon: "calendar", title: "Heads-up before arrival", from: "on-board date + transit time", to: "reminder 5 days ahead", note: "so the entry is filed before the vessel berths" },
          { icon: "mail", title: "Straight to the customs broker", from: "extracted B/L", to: "email with the table attached", note: "to the brokerage, with nobody forwarding anything" },
        ],
      },
      after: {
        lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every bill of lading:",
      },
      how: {
        steps: [
          { title: "Upload the B/L", body: "PDF, photo or scan. Any carrier, any agent, any form layout." },
          { title: "Tavnit reads it", body: "It finds the header (B/L number, parties, vessel, voyage, ports, on-board date, freight terms) and the cargo table: one line per container with seal, goods, packages, weight and volume." },
          { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "What does it extract from a bill of lading?",
          a: "From the header: B/L number, carrier, shipper, consignee, notify party, vessel, voyage, port of loading, port of discharge, shipped-on-board date, freight terms and the list of containers. From the cargo table, one row per line: container, seal, description of goods, number and kind of packages, gross weight and volume. Header values repeat on every row so the sheet filters and sums cleanly.",
        },
        {
          q: "Can I choose other columns?",
          a: "Not here: this tool uses a fixed bill of lading Flow with 19 fields. In your account you create your own Flows, for B/Ls or any other document, with the fields you need: per document (incoterm, place of delivery, booking number, ETA) or per line (HS code, marks, reefer temperature). No templates: you describe the field and, when needed, give it a hint on where to look.",
        },
        {
          q: "Which formats does it accept?",
          a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If your B/L is longer, or several B/Ls sit in one scan, upload them in parts or create an account.",
        },
        {
          q: "Does it work with any carrier's B/L?",
          a: "Yes. It does not use templates: it reads each B/L as it comes, whether a carrier master B/L, a forwarder's house B/L or a sea waybill, in English or Spanish. It is tested on MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen and NVOCC layouts.",
        },
        {
          q: "What happens to my file?",
          a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
        },
        {
          q: "Why does the download need an account?",
          a: "Because the free version is meant for trying it out. With an account you can run the same extraction on all your bills of lading, receive the result by email and send it to your customs or freight system.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a Flow with the fields you want and forward B/Ls to its email address (the one the carrier or forwarder sends them to), or connect it through the API, webhooks, Zapier, Make or n8n. The data lands in your customs system, your ERP or Google Sheets with nobody typing.",
        },
      ],
    },
  },
};

export default billOfLadingToExcel;
