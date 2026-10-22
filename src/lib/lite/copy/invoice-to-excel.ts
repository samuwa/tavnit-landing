import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/** Invoice → Excel. The base copy was written for this tool, so only the
 *  words — plus a <title> short enough not to be cut in search results. */
const invoiceToExcel: Record<Locale, ToolCopyDef> = {
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
      title: "Factura a Excel gratis: plantilla y extractor con IA",
      description:
        "Plantilla de factura en Excel gratis, o sube una factura en PDF o foto y recibe sus datos y sus líneas en Excel: descripción, cantidad, precio e importe.",
      template: {
        heading: "Plantilla de factura en Excel, gratis",
        lead: "Si lo que necesitas es emitir una factura, descarga el formato: datos del emisor y del cliente, líneas con cantidad, precio y descuento, y subtotal, impuesto y total que se calculan solos. Sin registro, lista para llenar y enviar.",
        fields: [
          "Emisor y cliente",
          "RUC / NIT y dirección",
          "Nº de factura, fecha y vencimiento",
          "Condiciones de pago y moneda",
          "Orden de compra de referencia",
          "Líneas: descripción, cantidad, unidad y precio",
          "Descuento por línea",
          "Subtotal, impuesto y total automáticos",
          "Notas y datos bancarios",
        ],
        cta: "Descargar plantilla (.xlsx)",
        note: "Abre en Excel, Google Sheets, Numbers y LibreOffice; la tasa de impuesto es una celda que cambias por la de tu país. Y si lo que tienes son facturas de proveedores en PDF, no las copies: súbelas arriba y recíbelas en Excel.",
        faqs: [
          {
            q: "¿Hay una plantilla de factura en Excel para descargar?",
            a: "Sí, gratis y sin registro: el botón “Descargar plantilla” de esta página. Es un .xlsx con los datos del emisor y del cliente, 12 líneas con cantidad, precio unitario y descuento, y el subtotal, el impuesto y el total calculados con fórmulas. La tasa de impuesto viene en 7 % (el ITBMS de Panamá) en una celda que cambias por la de tu país.",
          },
          {
            q: "¿Qué debe llevar una factura?",
            a: "Como mínimo: quién la emite y a quién (nombre, identificación fiscal y dirección), número y fecha, fecha de vencimiento y condiciones de pago, una línea por concepto con descripción, cantidad, precio unitario e importe, el subtotal, los impuestos desglosados y el total, y la referencia a la orden de compra si la hubo. Los requisitos fiscales exactos (numeración, formato electrónico, autorización) dependen de cada país; la plantilla sirve como factura comercial o proforma y como base para cumplirlos.",
          },
        ],
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
      title: "Invoice to Excel, Free: Template + AI Line Items",
      description:
        "Free invoice template for Excel, or upload an invoice as PDF or photo and get its data and line items in Excel: description, quantity, unit price and amount.",
      template: {
        heading: "Free invoice template for Excel",
        lead: "If you need to issue an invoice, download the format: seller and customer details, lines with quantity, price and discount, and a subtotal, tax and total that compute themselves. No sign-up, ready to fill in and send.",
        fields: [
          "Seller and customer",
          "Tax ID and address",
          "Invoice number, date and due date",
          "Payment terms and currency",
          "Purchase order reference",
          "Lines: description, quantity, unit and price",
          "Discount per line",
          "Automatic subtotal, tax and total",
          "Notes and bank details",
        ],
        cta: "Download template (.xlsx)",
        note: "Opens in Excel, Google Sheets, Numbers and LibreOffice; the tax rate is one cell you change to your country\u2019s. If what you have are supplier invoices as PDFs, don\u2019t retype them: upload them above and get them back in Excel.",
        faqs: [
          {
            q: "Is there an invoice template for Excel I can download?",
            a: "Yes, free and with no sign-up: the \u201cDownload template\u201d button on this page. It is an .xlsx with seller and customer details, 12 lines with quantity, unit price and discount, and the subtotal, tax and total computed with formulas. The tax rate sits in one cell (7% by default) that you change to your country\u2019s.",
          },
          {
            q: "What should an invoice include?",
            a: "At least: who issues it and to whom (name, tax ID and address), number and date, due date and payment terms, one line per item with description, quantity, unit price and amount, the subtotal, taxes broken out and the total, and the purchase order reference if there was one. Exact legal requirements (numbering, e-invoicing, authorisation) depend on the country; the template works as a commercial or pro-forma invoice and as the base to meet them.",
          },
        ],
      },
    },
  },
};

export default invoiceToExcel;
