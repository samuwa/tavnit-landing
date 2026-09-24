import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";
import invoiceToExcel from "@/lib/lite/copy/invoice-to-excel";

/**
 * Invoice line item extractor. Same Flow and the same words as invoice →
 * Excel; a different page, written for the people who search "line item
 * extraction": what a line item is, one row per line, the header repeated
 * on every row, and what to do with the rows afterwards.
 */
const invoiceLineItems: Record<Locale, ToolCopyDef> = {
  es: {
    vocab: invoiceToExcel.es.vocab,
    overrides: {
      title: "Extractor de líneas de factura gratis: cada renglón de la tabla, en filas de Excel",
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
  en: {
    vocab: invoiceToExcel.en.vocab,
    overrides: {
      title: "Free invoice line item extractor: every row of the table as Excel rows",
      description:
        "Extract invoice line items (description, quantity, unit price and amount) as Excel rows, with vendor, number and date on every row. PDF or photo, no templates, no sign-up to see the result.",
      label: "Invoice line item extractor",
      h1: "Extract the line items from an invoice",
      intro:
        "Every row of the invoice's table (description, quantity, unit, unit price and amount) becomes a row, and the header (vendor, number, date, totals) is repeated on each one. That is how accounting and accounts payable need line items to post them, reconcile them or check them against a purchase order. Works on PDFs, scans and photos, with no per-vendor templates.",
      drop: {
        title: "Drop the invoice whose line items you need",
        sample: "Try it with a six-line invoice",
      },
      stages: [
        "Uploading the invoice",
        "Reading the header",
        "Detecting the line-item table",
        "Splitting out each row",
        "Almost there",
      ],
      result: {
        flowNote: "These {fields} columns are the fields of a fixed invoice Flow: header and line items. In your account, you choose the fields.",
      },
      how: {
        heading: "How it works",
        steps: [
          {
            title: "Upload the invoice",
            body: "Text PDF, scan or photo. One page or several, up to 5.",
          },
          {
            title: "Tavnit splits out the lines",
            body: "It finds the table even without ruled borders, reads each row (description, quantity, unit, price, amount) and attaches the header to it.",
          },
          {
            title: "Review and download",
            body: "One row per line item on screen. With a free account you take it home as Excel, minus any columns you do not need.",
          },
        ],
      },
      faqs: [
        {
          q: "What is an invoice line item?",
          a: "Each row of the detail table: one product or service with its description, quantity, unit, unit price and amount. The footer totals (subtotal, tax, total) are not line items; they come out as header fields repeated on every row.",
        },
        {
          q: "Why do the vendor and number appear on every row?",
          a: "So that each row stands on its own: you can filter, sum or paste the lines of many invoices into one sheet without losing which invoice they came from. It is the shape an ERP, a pivot table or a reconciliation expects.",
        },
        {
          q: "Does it work when the table spans several pages?",
          a: "Yes. Tavnit follows the table from one page to the next and returns all the lines in sequence, without repeating the column header as if it were a row. The free version handles up to 5 pages.",
        },
        {
          q: "What about wrapped descriptions or merged cells?",
          a: "A description that continues on the next row is joined to its line; a merged cell is applied to the lines it covers. We do not depend on the table's rules but on reading which quantity, price and amount belong to each description.",
        },
        {
          q: "How are per-line discounts and taxes handled?",
          a: "Each line's amount comes out as printed. A discount or tax the invoice shows as its own row is not turned into a line item; it is treated as a document total. If your invoices itemise tax per line, an account lets you add that field to the Flow.",
        },
        {
          q: "Can I check the lines against my purchase order?",
          a: "Yes, with the free PO vs invoice check (/tools/po-vs-invoice-check): upload both documents and it flags lines with a different price or quantity, lines that are missing and lines that were added.",
        },
        {
          q: "Do I need a template per vendor?",
          a: "No. Tavnit reads each invoice as it comes; if the vendor redesigns it tomorrow, it still works. That is also why it handles invoices from different countries and languages alike.",
        },
        {
          q: "How do I do this for hundreds of invoices?",
          a: "With an account you create a Flow with these same fields (or your own) and forward invoices to its email address, or send them through the API. Each invoice comes out as rows into your ERP, Google Sheets or a Bucket, with nobody typing.",
        },
      ],
    },
  },
};

export default invoiceLineItems;
