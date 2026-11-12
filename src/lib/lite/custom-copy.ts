import type { Locale } from "@/lib/locale";

/**
 * Text of the Custom Tool that no other tool has: building it (sample →
 * suggestion → review), the saved tool's card, replacing it, and the places
 * that point visitors to it (the hub's feature card, the strip under the
 * other tools' results). Plain strings only: this crosses into Client
 * Components. {placeholders} are filled by the page.
 */
export interface CustomCopy {
  /** Small label above the title, here and on the hub card. */
  badge: string;
  /** Step 1: the sample document. */
  sample: {
    title: string;
    hint: string;
    choose: string;
    formats: string;
    /** "{n}" suggestions left today; [one, many]. */
    left: [string, string];
  };
  /** While the assistant reads the sample. */
  analyzing: string[];
  /** Step 2: the suggested columns. */
  review: {
    heading: string;
    /** "{file}" is the sample's name. */
    lead: string;
    nameLabel: string;
    metadataTitle: string;
    metadataHint: string;
    tableTitle: string;
    tableHint: string;
    /** aria-labels of a row's controls; "{col}" is the column name. */
    include: string;
    rename: string;
    example: string;
    types: { text: string; number: string; date: string; mixed: string };
    /** "{n}" columns chosen; [one, many]. */
    chosen: [string, string];
    create: string;
    creating: string;
    /** When the visitor already has a tool: what creating does. */
    replaces: string;
    back: string;
    errors: { no_fields: string; duplicate_name: string; bad_field: string };
  };
  /** The saved tool, above the drop zone. */
  tool: {
    /** "{name}" */
    heading: string;
    lead: string;
    columns: string;
    /** "{date}" */
    expires: string;
    kept: string;
    rebuild: string;
    drop: string;
    dropHint: string;
  };
  /** Confirming a rebuild. */
  rebuild: {
    heading: string;
    /** "{name}" */
    lead: string;
    cancel: string;
  };
  /** Right after creating: the sample is run through the new tool (shown
   *  while it runs and after, so it reads true in both). */
  created: string;
  loading: string;
  errors: Record<string, string>;
  /** The feature card at the top of the hub. */
  hub: { badge: string; title: string; body: string; cta: string; note: string; steps: [string, string, string] };
  /** The strip under another tool's result. */
  promo: { title: string; body: string; cta: string };
}

export const CUSTOM_COPY: Record<Locale, CustomCopy> = {
  es: {
    badge: "Nuevo · A tu medida",
    sample: {
      title: "Arrastra un documento de ejemplo",
      hint: "La IA lo lee y te propone las columnas",
      choose: "Elegir archivo",
      formats: "PDF, JPG o PNG · hasta 4 MB y 5 páginas",
      left: ["Te queda {n} propuesta de columnas hoy", "Te quedan {n} propuestas de columnas hoy"],
    },
    analyzing: ["Subiendo el documento", "Leyendo el documento", "Buscando los datos que se repiten", "Armando la propuesta de columnas", "Casi listo"],
    review: {
      heading: "Estas son las columnas que encontramos",
      lead: "Salieron de {file}. Desmarca las que no necesites y cambia los nombres a tu gusto: así se llamarán en tu Excel.",
      nameLabel: "Nombre de tu herramienta",
      metadataTitle: "Datos del documento",
      metadataHint: "Aparecen una vez por documento",
      tableTitle: "Columnas de la tabla",
      tableHint: "Una fila por cada renglón",
      include: "Incluir {col}",
      rename: "Nombre de la columna {col}",
      example: "ej.",
      types: { text: "Texto", number: "Número", date: "Fecha", mixed: "Código" },
      chosen: ["{n} columna elegida", "{n} columnas elegidas"],
      create: "Crear mi herramienta",
      creating: "Creando tu herramienta",
      replaces: "Reemplaza a tu herramienta actual.",
      back: "Usar otro documento",
      errors: {
        no_fields: "Deja al menos una columna marcada.",
        duplicate_name: "Dos columnas tienen el mismo nombre. Cambia una.",
        bad_field: "Hay una columna sin nombre. Escríbelo o desmárcala.",
      },
    },
    tool: {
      heading: "Tu herramienta: {name}",
      lead: "Sube un documento del mismo tipo y sale con estas columnas.",
      columns: "Columnas",
      expires: "Guardada en este navegador. Se borra si no la usas antes del {date}.",
      kept: "Guardada en tu cuenta.",
      rebuild: "Rehacer con otro documento",
      drop: "Arrastra tu documento aquí",
      dropHint: "o elige un archivo de tu computadora",
    },
    rebuild: {
      heading: "Rehacer tu herramienta",
      lead: "Sube un documento de ejemplo nuevo. Cuando confirmes las columnas, la nueva herramienta reemplaza a «{name}».",
      cancel: "Conservar la actual",
    },
    created: "Tu herramienta quedó lista: la probamos con tu documento de ejemplo.",
    loading: "Buscando tu herramienta",
    errors: {
      suggest_quota: "Ya usaste tus propuestas de columnas de hoy. Mañana vuelven; mientras tanto tu herramienta sigue funcionando.",
      suggest_cap: "El extractor a la medida alcanzó su cupo de hoy. Vuelve mañana, o crea una cuenta y arma tu Flow ahora mismo.",
      no_fields: "No encontramos datos que extraer en este documento. Prueba con otro más legible o con más contenido.",
      busy: "Hay mucha demanda en este momento. Espera unos segundos y vuelve a intentar.",
      draft_expired: "La propuesta venció. Sube el documento de ejemplo otra vez.",
      create_failed: "No pudimos crear tu herramienta. Intenta de nuevo.",
    },
    hub: {
      badge: "Gratis · A tu medida",
      title: "Sube tu documento y llévate tus datos en Excel",
      body: "Factura, orden de compra, packing list, póliza: el documento que sea. La IA lo lee, te propone las columnas y tú eliges las que quieres. Te queda una herramienta a tu medida para usarla con cada documento nuevo.",
      cta: "Subir mi documento",
      note: "Gratis · PDF, JPG o PNG",
      steps: ["Sube tu documento", "Elige tus columnas", "Llévate tu Excel"],
    },
    promo: {
      title: "¿Tienes otro tipo de documento?",
      body: "Crea una herramienta a tu medida: subes un ejemplo y la IA propone las columnas.",
      cta: "Crear mi herramienta",
    },
  },
  en: {
    badge: "New · Made to measure",
    sample: {
      title: "Drop a sample document",
      hint: "The AI reads it and suggests the columns",
      choose: "Choose a file",
      formats: "PDF, JPG or PNG · up to 4 MB and 5 pages",
      left: ["{n} column suggestion left today", "{n} column suggestions left today"],
    },
    analyzing: ["Uploading the document", "Reading the document", "Finding the details that repeat", "Putting the columns together", "Almost there"],
    review: {
      heading: "These are the columns we found",
      lead: "They came from {file}. Untick the ones you don't need and rename them as you like: that is what they will be called in your Excel.",
      nameLabel: "Name of your tool",
      metadataTitle: "Document details",
      metadataHint: "Appear once per document",
      tableTitle: "Table columns",
      tableHint: "One row per line",
      include: "Include {col}",
      rename: "Name of column {col}",
      example: "e.g.",
      types: { text: "Text", number: "Number", date: "Date", mixed: "Code" },
      chosen: ["{n} column chosen", "{n} columns chosen"],
      create: "Create my tool",
      creating: "Creating your tool",
      replaces: "Replaces your current tool.",
      back: "Use another document",
      errors: {
        no_fields: "Keep at least one column ticked.",
        duplicate_name: "Two columns have the same name. Change one.",
        bad_field: "A column has no name. Type one or untick it.",
      },
    },
    tool: {
      heading: "Your tool: {name}",
      lead: "Upload a document of the same kind and it comes out with these columns.",
      columns: "Columns",
      expires: "Saved in this browser. Deleted if you don't use it before {date}.",
      kept: "Saved in your account.",
      rebuild: "Rebuild from another document",
      drop: "Drop your document here",
      dropHint: "or choose a file from your computer",
    },
    rebuild: {
      heading: "Rebuild your tool",
      lead: "Upload a new sample document. Once you confirm the columns, the new tool replaces “{name}”.",
      cancel: "Keep the current one",
    },
    created: "Your tool is ready: we tried it on your sample document.",
    loading: "Looking for your tool",
    errors: {
      suggest_quota: "You have used today's column suggestions. They are back tomorrow; meanwhile your tool keeps working.",
      suggest_cap: "The custom extractor reached today's limit. Come back tomorrow, or create an account and build your Flow right now.",
      no_fields: "We found nothing to extract in this document. Try a clearer one, or one with more content.",
      busy: "Demand is high right now. Wait a few seconds and try again.",
      draft_expired: "The suggestion expired. Upload the sample document again.",
      create_failed: "We could not create your tool. Try again.",
    },
    hub: {
      badge: "Free · Made to measure",
      title: "Upload your document, get your data in Excel",
      body: "Invoice, purchase order, packing list, insurance policy: whatever you have. The AI reads it and suggests the columns, and you keep the ones you want. You leave with a tool made to measure, ready for every new document.",
      cta: "Upload my document",
      note: "Free · PDF, JPG or PNG",
      steps: ["Upload your document", "Pick your columns", "Take your Excel"],
    },
    promo: {
      title: "Got a different kind of document?",
      body: "Build a tool made to measure: upload a sample and the AI suggests the columns.",
      cta: "Build my tool",
    },
  },
};
