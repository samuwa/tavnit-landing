import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * The Custom Tool, as far as it is a tool like the others: once the visitor
 * has made theirs, it runs a document through a Flow and shows a table, so
 * the base copy applies with "document" as the word. What is specific to
 * building it (suggestion, review, replace) lives in ../custom-copy.ts.
 */
const customExtractor: Record<Locale, ToolCopyDef> = {
  es: {
    vocab: {
      doc: "documento",
      docs: "documentos",
      a_doc: "un documento",
      the_doc: "el documento",
      the_docs: "los documentos",
      your_doc: "tu documento",
      your_docs: "tus documentos",
      all_your_docs: "todos tus documentos",
      all_docs: "todos los documentos",
      each_doc: "cada documento",
      another_doc: "otro documento",
      this_doc: "este documento",
    },
    overrides: {
      title: "Extractor a la medida: crea tu propia herramienta con IA, gratis",
      description:
        "Sube un documento de ejemplo, la IA propone las columnas y tú decides cuáles quedan. Tu herramienta queda guardada para pasar a Excel todos los documentos de ese tipo. Gratis.",
      label: "Extractor a la medida",
      h1: "Crea tu propia herramienta de extracción",
      intro:
        "Sube un documento de ejemplo, del tipo que sea. La IA lo lee y te propone las columnas que vale la pena sacar; tú quitas las que sobran y les pones nombre. Queda guardada como tu herramienta, lista para pasar a Excel el siguiente documento igual.",
      trust: ["Cualquier tipo de documento", "PDF, JPG o PNG · hasta 5 páginas", "Tus documentos se borran a las 24 h"],
      stages: ["Subiendo el documento", "Leyendo con tus columnas", "Llenando la tabla", "Ordenando las columnas", "Casi listo"],
      result: {
        empty: "No encontramos datos para tus columnas en este documento. Prueba con uno del mismo tipo que el que usaste para crear la herramienta.",
        flowNote: "Estas {fields} columnas son los campos de tu herramienta: un Flow hecho a tu medida. En tu cuenta lo afinas campo por campo.",
        ghostHint: "En Tavnit agregas los campos que quieras a tu Flow, con indicaciones de dónde encontrar cada uno.",
      },
      errors: {
        failed: "No pudimos extraer este documento. Prueba con otro del mismo tipo que el que usaste para crear la herramienta.",
        no_tool: "Tu herramienta ya no está guardada en este navegador. Créala de nuevo con un documento de ejemplo.",
      },
      next: {
        lead: "Esto fue un documento con tu herramienta. Con una cuenta, lo mismo pasa con todos los que llegan, y las filas no se quedan en un Excel: siguen su camino solas.",
        source: "Tu documento",
        flow: {
          name: "Tu herramienta",
        },
      },
      after: {
        lead: "Salió de tu herramienta de {fields} campos. En tu cuenta la afinas campo por campo, y así se ve cuando Tavnit lee todos tus documentos:",
      },
      how: {
        steps: [
          { title: "Sube un documento de ejemplo", body: "Uno representativo del tipo que quieres procesar: una póliza, una orden de trabajo, un certificado, un estado de cuenta. PDF con texto o escaneado." },
          { title: "La IA propone, tú decides", body: "Tavnit lee el documento y sugiere las columnas: los datos del encabezado y, si hay una tabla, sus columnas. Quitas las que no te sirven y les cambias el nombre." },
          { title: "Úsala cuando quieras", body: "La herramienta queda guardada en este navegador. Vuelves, subes otro documento del mismo tipo y te llevas el Excel con tu cuenta gratis." },
        ],
      },
      faqs: [
        {
          q: "¿Qué incluye la versión gratis?",
          a: "Una herramienta a la medida por persona y {limit} documentos al día con ella, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
        },
        {
          q: "¿Con qué tipo de documentos funciona?",
          a: "Con cualquiera que tenga datos que se repiten de un documento a otro: pólizas, órdenes de trabajo, certificados, estados de cuenta, manifiestos, formularios, reportes de laboratorio. Si es una factura, un recibo, un packing list, un BL o un contrato, ya hay una herramienta lista para eso.",
        },
        {
          q: "¿Cómo decide la IA qué columnas proponer?",
          a: "Lee el documento de ejemplo y separa dos cosas: los datos que aparecen una vez (números, fechas, nombres, totales) y las columnas de la tabla que se repite por renglón, si la hay. Propone hasta 20 y tú eliges cuáles quedan y cómo se llaman.",
        },
        {
          q: "¿Puedo cambiar las columnas después?",
          a: "Sí: rehaces la herramienta con un documento de ejemplo nuevo y la nueva reemplaza a la anterior. En la versión gratis hay una herramienta por persona. En tu cuenta de Tavnit editas cada campo por separado, sin empezar de cero, y tienes las que necesites.",
        },
        {
          q: "¿Dónde queda guardada mi herramienta?",
          a: "En este navegador, y en tu cuenta si iniciaste sesión. Sin cuenta, se borra si pasan 30 días sin usarla. Lo que se guarda son los nombres de las columnas y cómo encontrarlas, nunca los valores de tu documento.",
        },
        {
          q: "¿Qué pasa con mis documentos?",
          a: "Cada documento que subes y su resultado se borran solos a las 24 horas, igual que en las demás herramientas. El documento de ejemplo solo se usa para proponer las columnas.",
        },
      ],
    },
  },
  en: {
    vocab: {
      doc: "document",
      docs: "documents",
      a_doc: "a document",
      the_doc: "the document",
      the_docs: "the documents",
      your_doc: "your document",
      your_docs: "your documents",
      all_your_docs: "all your documents",
      all_docs: "all documents",
      each_doc: "every document",
      another_doc: "another document",
      this_doc: "this document",
    },
    overrides: {
      title: "Custom Extractor: Build Your Own AI Document Tool, Free",
      description:
        "Upload a sample document, the AI suggests the columns and you decide which ones stay. Your tool is saved to turn every document of that kind into Excel. Free.",
      label: "Custom extractor",
      h1: "Build your own extraction tool",
      intro:
        "Upload a sample document of any kind. The AI reads it and suggests the columns worth pulling out; you drop the ones you don't need and name the rest. It is saved as your tool, ready to turn the next document like it into Excel.",
      trust: ["Any kind of document", "PDF, JPG or PNG · up to 5 pages", "Your documents are deleted after 24 h"],
      stages: ["Uploading the document", "Reading it with your columns", "Filling in the table", "Ordering the columns", "Almost there"],
      result: {
        empty: "We found no data for your columns in this document. Try one of the same kind as the one you built the tool from.",
        flowNote: "These {fields} columns are the fields of your tool: a Flow made to measure. In your account you tune it field by field.",
        ghostHint: "In Tavnit you add any field you want to your Flow, with hints on where to find each one.",
      },
      errors: {
        failed: "We could not extract this document. Try another of the same kind as the one you built the tool from.",
        no_tool: "Your tool is no longer saved in this browser. Build it again from a sample document.",
      },
      next: {
        lead: "That was one document through your tool. With an account, the same happens to every one that arrives, and the rows don't stay in a spreadsheet: they carry on by themselves.",
        source: "Your document",
        flow: {
          name: "Your tool",
        },
      },
      after: {
        lead: "It came out of your {fields}-field tool. In your account you tune it field by field, and this is what it looks like when Tavnit reads all your documents:",
      },
      how: {
        steps: [
          { title: "Upload a sample document", body: "A representative one of the kind you want to process: a policy, a work order, a certificate, a statement. Text PDF or scanned." },
          { title: "The AI suggests, you decide", body: "Tavnit reads the document and suggests the columns: the header details and, if there is a table, its columns. You drop what you don't need and rename the rest." },
          { title: "Use it whenever you like", body: "The tool is saved in this browser. Come back, upload another document of the same kind and take the Excel with your free account." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "One custom tool per person and {limit} documents a day through it, with the full result on screen. Downloading the Excel needs a Tavnit account, which is free.",
        },
        {
          q: "What kinds of documents does it work with?",
          a: "Any document with details that repeat from one to the next: policies, work orders, certificates, statements, manifests, forms, lab reports. For an invoice, a receipt, a packing list, a bill of lading or a contract there is already a ready-made tool.",
        },
        {
          q: "How does the AI decide which columns to suggest?",
          a: "It reads the sample and tells two things apart: details that appear once (numbers, dates, names, totals) and the columns of the table that repeats per line, if there is one. It suggests up to 20 and you choose which stay and what they are called.",
        },
        {
          q: "Can I change the columns later?",
          a: "Yes: rebuild the tool from a new sample document and the new one replaces the old. The free version keeps one tool per person. In your Tavnit account you edit each field on its own, without starting over, and have as many as you need.",
        },
        {
          q: "Where is my tool saved?",
          a: "In this browser, and in your account if you are signed in. Without an account it is deleted after 30 days without use. What is saved is the column names and how to find them, never the values in your document.",
        },
        {
          q: "What happens to my documents?",
          a: "Every document you upload and its result are deleted after 24 hours, like in the other tools. The sample document is only used to suggest the columns.",
        },
      ],
    },
  },
};

export default customExtractor;
