import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * PO vs invoice check. Two documents through one "purchase document" Flow,
 * then the Matcher pairs every PO line with the invoice line that means the
 * same thing and the page shows the differences: price, quantity, missing
 * on the invoice, not on the PO. The base's document word stays "factura"
 * because that is what the shared blocks (email intake, review, agents…)
 * talk about; everything the visitor sees first is overridden here.
 */
const poInvoiceCheck: Record<Locale, ToolCopyDef> = {
  es: {
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
  en: {
    vocab: {
      doc: "invoice",
      docs: "invoices",
      a_doc: "an invoice",
      the_doc: "the invoice",
      the_docs: "the invoices",
      your_doc: "your invoice",
      your_docs: "your invoices",
      all_your_docs: "all your invoices",
      all_docs: "all invoices",
      each_doc: "every invoice",
      another_doc: "another invoice",
      this_doc: "this invoice",
    },
    overrides: {
      title: "Free PO vs Invoice Checker: Line-by-Line Match",
      description:
        "Upload the purchase order and the invoice and Tavnit matches them line by line: price differences, quantity differences, lines missing on the invoice and lines not on the PO. Free, no templates, no sign-up to see the result.",
      label: "PO vs invoice check",
      h1: "Check an invoice against its purchase order",
      intro:
        "Upload the purchase order and the invoice, as PDF or photo. Tavnit reads both, pairs every PO line with the invoice line that means the same thing even when the text differs, and flags where the price changed, where the quantity changed, what is missing on the invoice and what was never on the PO.",
      trust: ["A PO and an invoice · PDF or photo", "{limit} free documents a day", "Everything deleted after 24 h"],
      drop: {
        title: "Drop the document here",
        sample: "Try it with a sample PO and invoice",
        formats: "PDF, JPG or PNG · up to 4 MB and 5 pages per document",
      },
      stages: ["Uploading the documents", "Reading the purchase order", "Reading the invoice", "Pairing the lines", "Almost there"],
      result: {
        another: "Compare other documents",
        download: "Download the comparison as Excel",
        flowNote: "These {fields} columns are the fields of a fixed purchase-document Flow. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: cost centre, receipt number, project…",
      },
      errors: {
        no_lines: "We found no lines with quantities and prices in one of the two documents. Check that they are a purchase order and an invoice with an item table.",
        not_ready: "We are still reading the documents. Wait a moment and try again.",
        failed: "We could not read one of the documents. Try other files, or the samples.",
        too_large: "One of the files is over 4 MB. Compress it or upload only the document pages.",
      },
      next: {
        lead: "That was one PO and one invoice. With an account, every invoice that arrives is checked against its purchase order on its own, and the result does not stop at an Excel: it keeps going.",
        source: "Your PO and invoice",
        flow: {
          name: "Purchase document",
          add: { name: "receipt_number", type: "Text", hint: 'Next to "Receipt" · e.g. REC-1187', save: "Save", value: "REC-1187" },
        },
        inputs: { show: "How do your documents get in?" },
      },
      cleaners: {
        heading: "With a Cleaner you could…",
        lead: "Simple rules that run on their own over every check. Four ideas:",
        ideas: [
          { icon: "alert", title: "Block the invoice when a price rises more than 2 %", from: "PO price 22.40", to: "invoice 23.90", note: "the difference is flagged before anyone pays it" },
          { icon: "approve", title: "Approval when the quantity differs", from: "PO 300 units", to: "invoice 280", note: "purchasing confirms a partial delivery or an error" },
          { icon: "mail", title: "Email purchasing with the differences", from: "check done", to: "email to purchasing@", note: "only when there is something to review" },
          { icon: "sum", title: "Invoice total against PO total", from: "PO 5,189.07", to: "invoice 4,960.63", note: "if it does not match, it stops before posting" },
        ],
        outro: "Cleaners are built in Tavnit with the fields you care about. These are just examples.",
      },
      after: {
        lead: "It came out of a fixed Flow with {fields} fields and a Matcher. In your account you choose the fields, and this is what it looks like when Tavnit checks every invoice that arrives:",
      },
      how: {
        heading: "How it works",
        steps: [
          { title: "Upload both documents", body: "The purchase order and the invoice, as PDF or photo. Any vendor, any language, any layout." },
          { title: "Tavnit reads both with one Flow", body: "Header (number, date, supplier, totals) and every line with its quantity and price, on both." },
          { title: "The Matcher pairs the lines", body: "Each PO line is joined to the invoice line that means the same, and price and quantity are compared. With your account you take the comparison home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} documents a day (one check uses two), with the full result on screen. Downloading the comparison as Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "How does it pair lines when the text is not identical?",
          a: "A Tavnit Matcher compares descriptions by meaning, not letter by letter: \"Long grain rice 20 lb\" and \"RICE L/GRAIN PREMIUM 20LB\" are the same line. When two descriptions are close but unclear, a second step decides whether it is the same item.",
        },
        {
          q: "What tolerance does it use for prices?",
          a: "A price is flagged as different when it moves more than 0.5 % or more than one cent. Quantities are compared exactly. With your account you set your own tolerance with a Cleaner.",
        },
        {
          q: "What do \"Missing on the invoice\" and \"Not on the PO\" mean?",
          a: "\"Missing on the invoice\" is a purchase-order line the supplier did not bill (partial or pending delivery). \"Not on the PO\" is a billed line nobody ordered on that PO.",
        },
        {
          q: "Can I do a three-way match with the goods receipt?",
          a: "Not here: the free version compares two documents. With your account you add the goods receipt as a third document of the same Flow and the Matcher checks all three, or you build Cleaner rules so the invoice is not posted until the receipt matches.",
        },
        {
          q: "Which formats does it accept?",
          a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages per document. It works with purchase orders from an ERP and invoices from any vendor.",
        },
        {
          q: "What happens to my files?",
          a: "They are processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the files and the comparison delete themselves; we only keep the fact that a run happened, without the documents or their contents.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a Flow for your purchase documents and a Matcher on top of it. Invoices arrive by email or API, get paired with their PO, and the differences go out by email, webhook or into your ERP with nobody typing.",
        },
      ],
      compare: {
        slots: [
          { title: "Purchase order", hint: "PDF or photo of the PO", sample: "Sample PO" },
          { title: "Invoice", hint: "PDF or photo of the invoice", sample: "Sample invoice" },
        ],
        run: "Compare",
        sampleAll: "Try it with a sample PO and invoice",
        stages: ["Reading the purchase order and the invoice", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
        heading: "Comparison ready",
        summary: "{n} · {ref} vs {doc}",
        labels: {
          description: "Description",
          quantity: "Qty",
          price: "Price",
          total: "Total",
          status: "Status",
          ref: "PO",
          doc: "Invoice",
          supplier: "Supplier",
          champion: "Champion",
          wins: "{n} lines won",
          lines: ["line", "lines"],
        },
        status: {
          ok: "Matches",
          price: "Price differs",
          qty: "Quantity differs",
          both: "Price and quantity differ",
          missing: "Missing on the invoice",
          extra: "Not on the PO",
        },
        empty: "We could not pair any lines. Check that both documents have an item table with quantities and prices.",
        another: "Compare other documents",
        download: "Download the comparison as Excel",
      },
    },
  },
};

export default poInvoiceCheck;
