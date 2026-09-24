import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
 * taxis, supermarkets. What differs from the invoice base is the vocabulary,
 * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
 * questions people actually ask about receipts.
 */
const receiptToExcel: Record<Locale, ToolCopyDef> = {
  es: {
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
      title: "Recibos a Excel gratis: pasa la foto de un recibo a una hoja de cálculo con IA",
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
          a: "Sí, es el caso normal. Funciona con JPG, PNG y PDF de hasta 10 MB. Ayuda que el ticket esté completo en la foto, con luz pareja y sin dedos encima; si sale torcido o un poco borroso, igual lo lee.",
        },
        {
          q: "¿Qué formatos acepta?",
          a: "JPG, PNG y PDF (con texto o escaneado), de hasta 10 MB y 5 páginas. Un recibo largo de supermercado cabe en una sola foto.",
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
  en: {
    vocab: {
      doc: "receipt",
      docs: "receipts",
      a_doc: "a receipt",
      the_doc: "the receipt",
      the_docs: "the receipts",
      your_doc: "your receipt",
      your_docs: "your receipts",
      all_your_docs: "all your receipts",
      all_docs: "all receipts",
      each_doc: "every receipt",
      another_doc: "another receipt",
      this_doc: "this receipt",
    },
    overrides: {
      title: "Receipt to Excel, free: turn a photo of a receipt into a spreadsheet with AI",
      description:
        "Upload a photo or PDF of a receipt and get its lines in Excel: merchant, date, items, quantities, tax, tip and total. Free, no templates, no sign-up to see the result. Receipt OCR to spreadsheet in seconds.",
      label: "Receipt to Excel",
      h1: "Turn a receipt into Excel",
      intro:
        "Snap a photo of the receipt or upload the PDF. Tavnit reads the merchant, the date, every item with its price and the totals, and hands it back as a spreadsheet. Faded, skewed or crumpled thermal tickets work too: there is no template to set up.",
      drop: {
        title: "Drop the photo of your receipt here",
        sample: "Try it with a sample receipt",
      },
      stages: ["Uploading the receipt", "Reading the merchant and date", "Finding the items", "Ordering the columns", "Almost there"],
      result: {
        empty: "We could not find any items on this receipt. Try a sharper photo with the whole ticket in frame and no shadows.",
        flowNote: "These {fields} columns are the fields of a fixed receipt Flow. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: cost centre, who spent it, project, category…",
      },
      next: {
        lead: "That was one receipt. With an account, the same happens to every receipt that arrives, and the lines do not stop at an Excel: they keep going on their own.",
        source: "Your receipt",
        inputs: { show: "How does your receipt get in?" },
        flow: {
          name: "Receipt",
          add: { name: "cost_center", type: "Text", hint: "Who spent it, or the project", save: "Save", value: "Sales" },
        },
      },
      cleaners: {
        lead: "Simple rules that run on their own over every receipt after it is read. Four ideas using your own data:",
        ideas: [
          { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every receipt, the same format for the expense report" },
          { icon: "sum", title: "Items must add up to the subtotal", from: "items {sum}", to: "subtotal {subtotal}", note: "if it does not match, the photo read badly and someone checks it", check: "sum" },
          { icon: "approve", title: "Approval above an amount", from: "total {total}", to: "approve before reimbursing", note: "when it exceeds {threshold}" },
          { icon: "money", title: "Convert to your currency", from: "{total} {currency}", to: "your currency", note: "at the rate on the receipt date, for travel" },
        ],
      },
      after: {
        lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every receipt of a trip or a month:",
      },
      how: {
        steps: [
          { title: "Upload the receipt", body: "A phone photo or a PDF. Any merchant, any language, however faded the ticket." },
          { title: "Tavnit reads it", body: "It finds the merchant, the date, the number, every item with its price, and the subtotal, tax, tip and total." },
          { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} receipts a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "Does it work with a photo from my phone?",
          a: "Yes, that is the normal case. JPG, PNG and PDF up to 10 MB. It helps to have the whole ticket in frame, even light and no fingers over it; a skewed or slightly blurry shot still reads.",
        },
        {
          q: "Which formats does it accept?",
          a: "JPG, PNG and PDF (text or scanned), up to 10 MB and 5 pages. A long supermarket receipt fits in one photo.",
        },
        {
          q: "Do I need to set up a template per merchant?",
          a: "No. Tavnit does not use templates: it reads each receipt as it comes, whether it is a restaurant, a pharmacy, a taxi or a gas station.",
        },
        {
          q: "Can I choose other columns?",
          a: "Not here: this tool uses a fixed receipt Flow with 15 fields. In your account you create your own Flows with the fields you need: per document (cost centre, who spent it, project, category) or per line (product code). No templates: you describe the field and, when needed, give it a hint on where to look.",
        },
        {
          q: "What happens to my file?",
          a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the photo and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
        },
        {
          q: "I have fifty receipts from a trip. One at a time?",
          a: "Here, yes. With an account you send them all at once: forward them by email to the Flow, drop them in bulk or connect through the API, and every receipt comes out as rows in the same Excel, Google Sheets or your expense system.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a Flow with the fields you want and forward receipt photos to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. The expense report builds itself.",
        },
      ],
    },
  },
};

export default receiptToExcel;
