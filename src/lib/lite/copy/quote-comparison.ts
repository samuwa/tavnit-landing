import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Compare supplier quotes. Two or three quotes for the same request go
 * through the quote Flow; the Matcher pairs the lines across suppliers
 * (semantically, so "cemento gris 42.5 kg" meets "cemento Portland tipo I
 * gris") and marks the cheapest unit price per line as Champion. Nothing
 * here is an invoice, so most of the base is overridden.
 */
const quoteComparison: Record<Locale, ToolCopyDef> = {
  es: {
    vocab: {
      doc: "cotización",
      docs: "cotizaciones",
      a_doc: "una cotización",
      the_doc: "la cotización",
      the_docs: "las cotizaciones",
      your_doc: "tu cotización",
      your_docs: "tus cotizaciones",
      all_your_docs: "todas tus cotizaciones",
      all_docs: "todas las cotizaciones",
      each_doc: "cada cotización",
      another_doc: "otra cotización",
      this_doc: "esta cotización",
    },
    overrides: {
      title: "Comparar cotizaciones de proveedores gratis: cuadro comparativo línea por línea con IA",
      description:
        "Sube dos o tres cotizaciones en PDF o foto y recibe un cuadro comparativo: cada línea con el precio de cada proveedor y la más barata marcada. Gratis, sin plantillas y sin registro para ver el resultado.",
      label: "Comparar cotizaciones",
      h1: "Compara cotizaciones de proveedores",
      intro:
        "Sube dos o tres cotizaciones para el mismo pedido. Tavnit lee cada una, empareja las líneas aunque cada proveedor las describa distinto, y arma una sola tabla con el precio de cada uno y la opción más barata por línea. Sin plantillas ni hojas de Excel a mano.",
      trust: ["PDF, JPG o PNG de hasta 5 páginas por cotización", "{limit} documentos al día, con el cuadro completo", "Tus archivos y el cuadro se borran solos a las 24 horas"],
      drop: {
        title: "Arrastra una cotización aquí",
        hint: "PDF o foto",
        sample: "Probar con tres cotizaciones de ejemplo",
        formats: "PDF, JPG o PNG · hasta 10 MB y 5 páginas por cotización",
      },
      stages: ["Leyendo las cotizaciones", "Ordenando las líneas", "El Matcher empareja las líneas", "Casi listo"],
      result: {
        flowNote: "Cada cotización pasa por un Flow fijo de {fields} campos y el Matcher las cruza. En tu cuenta, los campos los eliges tú.",
        ghostHint: "En Tavnit agregas los campos que quieras: marca, garantía, plazo de entrega por línea…",
        download: "Descargar cuadro comparativo en Excel",
        another: "Comparar otras cotizaciones",
        empty: "No encontramos líneas con precio en esta cotización. Prueba con una que tenga artículos, cantidades y precios por renglón.",
      },
      errors: {
        too_large: "Una de las cotizaciones pesa más de 10 MB. Comprímela o sube solo las páginas con las líneas.",
        failed: "No pudimos leer una de las cotizaciones. Prueba con otra o con las de ejemplo.",
        no_lines: "Una de las cotizaciones no tiene líneas con precio, así que no hay qué comparar. Revisa que cada una tenga artículos con precio unitario.",
        not_ready: "Todavía estamos leyendo las cotizaciones. Espera un momento e intenta de nuevo.",
      },
      auth: {
        title: "Crea tu cuenta gratis para descargar el cuadro",
        body: "El Excel se descarga al instante. Con la cuenta también puedes comparar más de tres cotizaciones y hacerlo con cada licitación que llegue.",
      },
      next: {
        lead: "Esto fueron tres cotizaciones a mano. Con una cuenta, cada cotización que llega por correo entra a su Flow, el Matcher las cruza solo y el cuadro sigue su camino: a compras, al ERP o a quien aprueba.",
        source: "Tus cotizaciones",
        flow: {
          name: "Cotización",
          add: { name: "marca", type: "Text", hint: 'Junto a "Marca" o en la descripción', save: "Guardar", value: "Argos" },
        },
        inputs: { show: "¿Cómo llegan tus cotizaciones?" },
      },
      cleaners: {
        lead: "Reglas simples que corren solas sobre cada cotización después de leerla. Cuatro ideas:",
        ideas: [
          { icon: "date", title: "Una sola forma de escribir la fecha", from: "{date}", to: "{iso}", note: "todas las cotizaciones, el mismo formato" },
          { icon: "alert", title: "Aviso si un proveedor sube más de 5 %", from: "precio de hoy", to: "vs. la última cotización", note: "por línea, antes de adjudicar" },
          { icon: "approve", title: "Aprobar la adjudicación", from: "cuadro comparativo", to: "quien decide", note: "solo al aprobar sale la orden de compra" },
          { icon: "calendar", title: "Recordar la validez de la cotización", from: "válida hasta {date}", to: "aviso 5 días antes", note: "para no perder el precio" },
        ],
      },
      after: {
        title: "Tu cuadro comparativo está listo",
        lead: "Salió de un Flow fijo de {fields} campos y un Matcher. En tu cuenta los campos los eliges tú, y así se ve cuando Tavnit cruza todas las cotizaciones:",
      },
      how: {
        steps: [
          { title: "Sube dos o tres cotizaciones", body: "PDF o foto, del mismo pedido. Da igual el proveedor, el formato o cómo describa cada artículo." },
          { title: "Tavnit las lee y las cruza", body: "Extrae las líneas de cada una y el Matcher empareja los artículos aunque estén escritos distinto. La más barata por línea queda marcada como Champion." },
          { title: "Revisa y descarga", body: "Ves el cuadro en pantalla. Con tu cuenta gratis te lo llevas en Excel." },
        ],
      },
      faqs: [
        {
          q: "¿Qué incluye la versión gratis?",
          a: "{limit} documentos al día (una comparación de tres cotizaciones cuenta tres), con el cuadro completo en pantalla. Para descargar el Excel hace falta una cuenta de Tavnit, que no tiene costo.",
        },
        {
          q: "¿Cómo empareja las líneas si cada proveedor las describe distinto?",
          a: "Con un Matcher de Tavnit. Compara el significado de cada descripción, no el texto exacto: \"cemento gris 42.5 kg\" y \"cemento Portland tipo I gris, saco de 42.5 kg\" quedan en la misma fila. Cuando hay duda, un segundo paso decide si son el mismo artículo o no.",
        },
        {
          q: "¿Qué significa Champion?",
          a: "Es el proveedor con el precio unitario más bajo en esa línea. Si dos empatan, aparecen los dos. Las líneas que solo cotiza un proveedor no tienen competencia y también se muestran.",
        },
        {
          q: "¿Puedo comparar más de tres cotizaciones?",
          a: "Aquí no: la versión gratis admite hasta tres. En tu cuenta el Matcher compara hasta diez corridas del mismo Flow, y puedes mandar el cuadro por correo o a tu ERP.",
        },
        {
          q: "¿Puedo elegir otras columnas?",
          a: "Aquí no: esta herramienta usa un Flow fijo de cotización. En tu cuenta creas tu propio Flow con los campos que necesites (marca, garantía, plazo de entrega por línea) y configuras el Matcher con el campo que quieras comparar: precio, plazo o cualquier número.",
        },
        {
          q: "¿Qué formatos acepta?",
          a: "PDF (con texto o escaneado), JPG y PNG, de hasta 10 MB y 5 páginas por cotización.",
        },
        {
          q: "¿Qué pasa con mis archivos?",
          a: "Se procesan en una cuenta de Tavnit dedicada a las herramientas gratis y no se usan para nada más. A las 24 horas los archivos, las líneas extraídas y el cuadro se borran solos; solo conservamos que hubo una corrida.",
        },
        {
          q: "¿Cómo hago que sea automático?",
          a: "Crea una cuenta, crea un Flow de cotización con tus campos y un Matcher encima. Reenvías las cotizaciones a la dirección de correo del Matcher y, cuando llegan todas, el cuadro comparativo sale solo: por correo, por webhook o a tu ERP.",
        },
      ],
      compare: {
        slots: [
          { title: "Cotización A", hint: "PDF o foto", sample: "Cotización de ejemplo A" },
          { title: "Cotización B", hint: "PDF o foto", sample: "Cotización de ejemplo B" },
          { title: "Cotización C", hint: "PDF o foto", sample: "Cotización de ejemplo C", optional: true },
        ],
        run: "Comparar",
        sampleAll: "Probar con tres cotizaciones de ejemplo",
        stages: ["Leyendo las cotizaciones", "Ordenando las líneas", "El Matcher empareja las líneas", "Casi listo"],
        heading: "Cuadro comparativo listo",
        summary: "{n} · {ref}",
        labels: {
          description: "Descripción",
          quantity: "Cantidad",
          price: "Precio unit.",
          total: "Total",
          status: "Estado",
          ref: "A",
          doc: "B",
          supplier: "Proveedor",
          champion: "Champion",
          wins: "{n} líneas ganadas",
          lines: ["línea", "líneas"],
        },
        status: { ok: "Coincide", price: "Precio distinto", qty: "Cantidad distinta", both: "Precio y cantidad distintos", missing: "Sin cotizar", extra: "Solo en esta cotización" },
        empty: "El Matcher no encontró líneas comparables entre las cotizaciones. Revisa que sean del mismo pedido y tengan artículos con precio unitario.",
        another: "Comparar otras cotizaciones",
        download: "Descargar cuadro comparativo en Excel",
      },
    },
  },
  en: {
    vocab: {
      doc: "quote",
      docs: "quotes",
      a_doc: "a quote",
      the_doc: "the quote",
      the_docs: "the quotes",
      your_doc: "your quote",
      your_docs: "your quotes",
      all_your_docs: "all your quotes",
      all_docs: "all quotes",
      each_doc: "every quote",
      another_doc: "another quote",
      this_doc: "this quote",
    },
    overrides: {
      title: "Compare supplier quotes, free: a line-by-line quote comparison table with AI",
      description:
        "Upload two or three quotes as PDF or photo and get one comparison table: every line with each supplier's price and the cheapest marked. Free, no templates, no sign-up to see the result.",
      label: "Compare supplier quotes",
      h1: "Compare supplier quotes",
      intro:
        "Upload two or three quotes for the same request. Tavnit reads each one, pairs the lines even when every supplier words them differently, and builds one table with each price and the cheapest option per line. No templates, no spreadsheet by hand.",
      trust: ["PDF, JPG or PNG, up to 5 pages per quote", "{limit} documents a day, full table every time", "Your files and the table delete themselves after 24 hours"],
      drop: {
        title: "Drop a quote here",
        hint: "PDF or photo",
        sample: "Try it with three sample quotes",
        formats: "PDF, JPG or PNG · up to 10 MB and 5 pages per quote",
      },
      stages: ["Reading the quotes", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
      result: {
        flowNote: "Each quote goes through a fixed Flow with {fields} fields and the Matcher crosses them. In your account, you choose the fields.",
        ghostHint: "In Tavnit you add the fields you want: brand, warranty, lead time per line…",
        download: "Download the comparison as Excel",
        another: "Compare other quotes",
        empty: "We could not find priced lines in this quote. Try one with items, quantities and prices per line.",
      },
      errors: {
        too_large: "One of the quotes is over 10 MB. Compress it or upload only the pages with the lines.",
        failed: "We could not read one of the quotes. Try another, or the samples.",
        no_lines: "One of the quotes has no priced lines, so there is nothing to compare. Check that each has items with a unit price.",
        not_ready: "We are still reading the quotes. Give it a moment and try again.",
      },
      auth: {
        title: "Create your free account to download the table",
        body: "The Excel downloads right away. With an account you can also compare more than three quotes, and do it for every tender that comes in.",
      },
      next: {
        lead: "That was three quotes by hand. With an account, every quote that arrives by email enters its Flow, the Matcher crosses them on its own and the table keeps going: to purchasing, to the ERP or to whoever approves.",
        source: "Your quotes",
        flow: {
          name: "Quote",
          add: { name: "brand", type: "Text", hint: 'Next to "Brand" or in the description', save: "Save", value: "Argos" },
        },
        inputs: { show: "How do your quotes get in?" },
      },
      cleaners: {
        lead: "Simple rules that run on their own over every quote after it is read. Four ideas:",
        ideas: [
          { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every quote, the same format" },
          { icon: "alert", title: "Alert when a supplier goes up more than 5%", from: "today's price", to: "vs. the last quote", note: "per line, before awarding" },
          { icon: "approve", title: "Approve the award", from: "comparison table", to: "whoever decides", note: "only on approval does the PO go out" },
          { icon: "calendar", title: "Remember the quote's validity", from: "valid until {date}", to: "reminder 5 days before", note: "so the price is not lost" },
        ],
      },
      after: {
        title: "Your comparison table is ready",
        lead: "It came out of a fixed Flow with {fields} fields and a Matcher. In your account you choose the fields, and this is what it looks like when Tavnit crosses every quote:",
      },
      how: {
        steps: [
          { title: "Upload two or three quotes", body: "PDF or photo, for the same request. Any supplier, any layout, any way of describing each item." },
          { title: "Tavnit reads and crosses them", body: "It extracts the lines of each and the Matcher pairs the items even when they are worded differently. The cheapest per line is marked as Champion." },
          { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
        ],
      },
      faqs: [
        {
          q: "What does the free version include?",
          a: "{limit} documents a day (a comparison of three quotes counts as three), with the full table on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
        },
        {
          q: "How does it pair lines when every supplier words them differently?",
          a: "With a Tavnit Matcher. It compares the meaning of each description, not the exact text: \"grey cement 42.5 kg\" and \"Portland cement type I grey, 42.5 kg bag\" land on the same row. When in doubt, a second step decides whether they are the same item.",
        },
        {
          q: "What does Champion mean?",
          a: "The supplier with the lowest unit price on that line. On a tie, both appear. Lines only one supplier quoted have no competition and are shown too.",
        },
        {
          q: "Can I compare more than three quotes?",
          a: "Not here: the free version takes up to three. In your account the Matcher compares up to ten runs of the same Flow, and you can send the table by email or to your ERP.",
        },
        {
          q: "Can I choose other columns?",
          a: "Not here: this tool uses a fixed quote Flow. In your account you create your own Flow with the fields you need (brand, warranty, lead time per line) and set the Matcher to compare whichever field you want: price, lead time or any number.",
        },
        {
          q: "Which formats does it accept?",
          a: "PDF (text or scanned), JPG and PNG, up to 10 MB and 5 pages per quote.",
        },
        {
          q: "What happens to my files?",
          a: "They are processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the files, the extracted lines and the table delete themselves; we only keep the fact that a run happened.",
        },
        {
          q: "How do I make it automatic?",
          a: "Create an account, build a quote Flow with your fields and a Matcher on top. Forward quotes to the Matcher's email address and, once they are all in, the comparison table comes out on its own: by email, by webhook or into your ERP.",
        },
      ],
      compare: {
        slots: [
          { title: "Quote A", hint: "PDF or photo", sample: "Sample quote A" },
          { title: "Quote B", hint: "PDF or photo", sample: "Sample quote B" },
          { title: "Quote C", hint: "PDF or photo", sample: "Sample quote C", optional: true },
        ],
        run: "Compare",
        sampleAll: "Try it with three sample quotes",
        stages: ["Reading the quotes", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
        heading: "Comparison table ready",
        summary: "{n} · {ref}",
        labels: {
          description: "Description",
          quantity: "Quantity",
          price: "Unit price",
          total: "Total",
          status: "Status",
          ref: "A",
          doc: "B",
          supplier: "Supplier",
          champion: "Champion",
          wins: "{n} lines won",
          lines: ["line", "lines"],
        },
        status: { ok: "Matches", price: "Different price", qty: "Different quantity", both: "Price and quantity differ", missing: "Not quoted", extra: "Only in this quote" },
        empty: "The Matcher found no comparable lines across the quotes. Check that they are for the same request and have items with a unit price.",
        another: "Compare other quotes",
        download: "Download the comparison as Excel",
      },
    },
  },
};

export default quoteComparison;
