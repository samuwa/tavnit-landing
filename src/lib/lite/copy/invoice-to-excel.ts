import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/** Invoice → Excel. The base copy was written for this tool, so only the words. */
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
  },
};

export default invoiceToExcel;
