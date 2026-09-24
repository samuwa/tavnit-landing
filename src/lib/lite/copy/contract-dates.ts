import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Contract key dates. One row per contract (a metadata-only Flow), so the
 * copy talks about dates and parties, never about line items.
 */
const contractDates: Record<Locale, ToolCopyDef> = {
  es: {
    vocab: {
      doc: "contrato",
      docs: "contratos",
      a_doc: "un contrato",
      the_doc: "el contrato",
      the_docs: "los contratos",
      your_doc: "tu contrato",
      your_docs: "tus contratos",
      all_your_docs: "todos tus contratos",
      all_docs: "todos los contratos",
      each_doc: "cada contrato",
      another_doc: "otro contrato",
      this_doc: "este contrato",
    },
    overrides: {
      title: "Fechas de renovación de contratos, gratis (IA)",
      description:
        "Sube un contrato en PDF y obtén sus fechas clave en una fila de Excel: partes, inicio, vencimiento, renovación automática, preaviso y fecha límite para avisar. Gratis, sin plantillas y sin registro para ver el resultado.",
      label: "Fechas de contratos",
      h1: "Saca las fechas clave de un contrato",
      intro:
        "Sube el PDF. Tavnit lee el contrato y te devuelve una fila con las partes, la fecha de firma, el inicio y el fin de la vigencia, si se renueva solo, el preaviso y el último día para avisar que no renuevas. Sirve con contratos de servicios, arrendamiento, suministro o licencia, en el formato que vengan.",
      drop: {
        title: "Arrastra tu contrato aquí",
        sample: "Probar con un contrato de ejemplo",
      },
      stages: ["Subiendo el documento", "Leyendo las partes", "Buscando vigencia y renovación", "Calculando la fecha límite de aviso", "Casi listo"],
      result: {
        empty: "No encontramos partes ni fechas en este documento. Prueba con un contrato firmado que tenga cláusula de vigencia.",
        flowNote: "Estas {fields} columnas son los campos de un Flow fijo de contrato. En tu cuenta, los campos los eliges tú.",
        ghostHint: "En Tavnit agregas los campos que quieras: responsable interno, centro de costo, cláusula de penalidad…",
        another: "Procesar otro contrato",
      },
      next: {
        lead: "Esto fue un contrato. Con una cuenta, lo mismo pasa con todos los que llegan, y las fechas no se quedan en un Excel: avisan solas antes del vencimiento.",
        source: "Tu contrato",
        inputs: { show: "¿Cómo llega tu contrato?" },
        flow: {
          name: "Contrato",
          add: { name: "responsable_interno", type: "Text", hint: "Quién lo firma por nosotros", save: "Guardar", value: "M. Pérez" },
        },
      },
      cleaners: {
        lead: "Reglas simples que corren solas sobre cada contrato después de leerlo. Cuatro ideas con tus propios datos:",
        ideas: [
          { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todos los contratos, el mismo formato" },
          { icon: "calendar", title: "Aviso 60 días antes del vencimiento", from: "fecha_fin", to: "recordatorio a tiempo", note: "antes de que pase la fecha límite de aviso" },
          { icon: "alert", title: "Renovación automática: revisar antes", from: "renovacion_automatica = Sí", to: "a revisión", note: "para que ningún contrato se renueve sin que nadie lo mire" },
          { icon: "mail", title: "Correo al responsable", from: "contrato leído", to: "correo con la fila", note: "quien lo firmó recibe las fechas" },
        ],
      },
      after: {
        lead: "Salió de un Flow fijo de {fields} campos. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit lee todos los contratos:",
      },
      how: {
        steps: [
          { title: "Sube el contrato", body: "PDF con texto o escaneado. Da igual el tipo de contrato o quién lo redactó." },
          { title: "Tavnit lo lee", body: "Encuentra las partes, la firma, la vigencia, la cláusula de renovación y el preaviso, y calcula la fecha límite para avisar." },
          { title: "Revisa y descarga", body: "Ves la fila en pantalla. Con tu cuenta gratis te la llevas en Excel." },
        ],
      },
      faqs: [
        {
          q: "¿Qué incluye la versión gratis?",
          a: "{limit} contratos al día, con el resultado completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
        },
        {
          q: "¿Qué fechas y datos saca?",
          a: "Las partes, la fecha de firma, el inicio y el fin de la vigencia, el plazo, si se renueva automáticamente, el preaviso, la fecha límite para avisar que no renuevas, el valor con su moneda y la ley aplicable. Lo que el contrato no dice queda vacío: nunca se inventa una fecha.",
        },
        {
          q: "¿Por qué el resultado es una sola fila?",
          a: "Porque un contrato tiene una vigencia, una fecha de firma y unas partes. Con una cuenta puedes correr una carpeta entera de contratos y obtener una tabla con una fila por contrato, lista para ordenar por vencimiento.",
        },
        {
          q: "¿Qué formatos acepta?",
          a: "PDF (con texto o escaneado), JPG y PNG, de hasta 10 MB y 5 páginas. Si tu contrato tiene más páginas, sube las que tienen la vigencia y la renovación, o crea una cuenta.",
        },
        {
          q: "¿Puedo elegir otras columnas?",
          a: "Aquí no: esta herramienta usa un Flow fijo de contrato con 14 campos. En tu cuenta creas tus propios Flows, para contratos o cualquier otro documento, con los campos que necesites: responsable interno, cláusula de penalidad, garantía. Sin plantillas: describes el campo y, si hace falta, le das una pista de dónde buscar.",
        },
        {
          q: "¿Qué pasa con mi archivo?",
          a: "Se procesa en una cuenta de Tavnit dedicada a las herramientas gratis y no se usa para nada más. A las 24 horas el archivo y la fila extraída se borran solos, automáticamente; solo conservamos que hubo una corrida, sin el documento ni su contenido. Si quieres que se borre antes, escríbenos a support@tavnit.io.",
        },
        {
          q: "¿Sirve con contratos de cualquier país?",
          a: "Sí. Funciona con contratos en español, inglés y otros idiomas, y con cualquier formato de fecha. Está probada con contratos de Panamá, México, Colombia y Estados Unidos, entre otros.",
        },
        {
          q: "¿Cómo hago que avise antes del vencimiento?",
          a: "Crea una cuenta, crea un Flow con los campos que quieras y reenvía los contratos a su dirección de correo, o conéctalo por API, webhook, Zapier, Make o n8n. Un Cleaner compara la fecha límite de aviso con hoy y manda el correo o el webhook a quien deba decidir.",
        },
      ],
    },
  },
  en: {
    vocab: {
      doc: "contract",
      docs: "contracts",
      a_doc: "a contract",
      the_doc: "the contract",
      the_docs: "the contracts",
      your_doc: "your contract",
      your_docs: "your contracts",
      all_your_docs: "all your contracts",
      all_docs: "all contracts",
      each_doc: "every contract",
      another_doc: "another contract",
      this_doc: "this contract",
    },
    overrides: {
      title: "Contract Renewal Date Extractor, Free (AI)",
      description:
        "Upload a contract as PDF and get its key dates in one Excel row: parties, start, end, auto-renewal, notice period and the deadline to give notice. Free, no templates, no sign-up to see the result.",
      label: "Contract dates",
      h1: "Extract the key dates from a contract",
      intro:
        "Upload the PDF. Tavnit reads the contract and hands back one row with the parties, the signature date, start and end of the term, whether it auto-renews, the notice period and the last day to say you are not renewing. Works on service, lease, supply and license agreements, in whatever format they come.",
      drop: {
        title: "Drop your contract here",
        sample: "Try it with a sample contract",
      },
      stages: ["Uploading the document", "Reading the parties", "Finding the term and renewal", "Working out the notice deadline", "Almost there"],
      result: {
        empty: "We could not find parties or dates in this document. Try a signed contract with a term clause.",
        flowNote: "These {fields} columns are the fields of a fixed contract Flow. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: internal owner, cost centre, penalty clause…",
        another: "Process another contract",
      },
      next: {
        lead: "That was one contract. With an account, the same happens to every contract that arrives, and the dates do not stop at an Excel: they raise the alarm before the deadline.",
        source: "Your contract",
        inputs: { show: "How does your contract get in?" },
        flow: {
          name: "Contract",
          add: { name: "owner", type: "Text", hint: "Who signs it on our side", save: "Save", value: "M. Perez" },
        },
      },
      cleaners: {
        lead: "Simple rules that run on their own over every contract after it is read. Four ideas using your own data:",
        ideas: [
          { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every contract, the same format" },
          { icon: "calendar", title: "Reminder 60 days before the end", from: "end_date", to: "reminder in time", note: "before the notice deadline passes" },
          { icon: "alert", title: "Auto-renewal: review first", from: "auto_renewal = Yes", to: "to review", note: "so no contract renews without someone looking" },
          { icon: "mail", title: "Email the owner", from: "contract read", to: "email with the row", note: "whoever signed it gets the dates" },
        ],
      },
      after: {
        lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit reads every contract:",
      },
      how: {
        steps: [
          { title: "Upload the contract", body: "PDF, text or scanned. Any kind of contract, whoever drafted it." },
          { title: "Tavnit reads it", body: "It finds the parties, the signature, the term, the renewal clause and the notice period, and works out the deadline to give notice." },
          { title: "Review and download", body: "The row shows on screen. With a free account you take it home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} contracts a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "Which dates and details does it extract?",
          a: "The parties, the signature date, start and end of the term, the term length, whether it auto-renews, the notice period, the deadline to give non-renewal notice, the value with its currency and the governing law. Whatever the contract does not say stays empty: no date is ever invented.",
        },
        {
          q: "Why is the result a single row?",
          a: "Because a contract has one term, one signature date and one set of parties. With an account you can run a whole folder of contracts and get a table with one row per contract, ready to sort by end date.",
        },
        {
          q: "Which formats does it accept?",
          a: "PDF (text or scanned), JPG and PNG, up to 10 MB and 5 pages. If your contract is longer, upload the pages with the term and renewal clauses, or create an account.",
        },
        {
          q: "Can I choose other columns?",
          a: "Not here: this tool uses a fixed contract Flow with 14 fields. In your account you create your own Flows, for contracts or any other document, with the fields you need: internal owner, penalty clause, guarantee. No templates: you describe the field and, when needed, give it a hint on where to look.",
        },
        {
          q: "What happens to my file?",
          a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted row delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
        },
        {
          q: "Does it work with contracts from any country?",
          a: "Yes. It handles contracts in English, Spanish and other languages, with any date format. It is tested on contracts from the US, Panama, Mexico and Colombia, among others.",
        },
        {
          q: "How do I get a warning before the end date?",
          a: "Create an account, build a Flow with the fields you want and forward contracts to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. A Cleaner compares the notice deadline with today and sends the email or webhook to whoever has to decide.",
        },
      ],
    },
  },
};

export default contractDates;
