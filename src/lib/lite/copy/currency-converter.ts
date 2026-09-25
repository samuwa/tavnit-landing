import type { ToolCopyDef } from "@/lib/lite/copy-base";
import type { Locale } from "@/lib/locale";

/**
 * Currency converter. A spreadsheet in, a converted column next to each
 * amount column out, at the day's reference rate. The rates come from the
 * European Central Bank through Frankfurter (the engine's source), so the
 * copy says plainly which currencies are there and which are not.
 */
const SUPPORTED_ES =
  "Dólar (USD), euro (EUR), libra (GBP), peso mexicano (MXN), real (BRL), yuan (CNY), dólar canadiense, yen, franco suizo y otras monedas publicadas por el Banco Central Europeo, unas 30 en total.";
const SUPPORTED_EN =
  "US dollar (USD), euro (EUR), pound (GBP), Mexican peso (MXN), real (BRL), yuan (CNY), Canadian dollar, yen, Swiss franc and the other currencies the European Central Bank publishes, about 30 in all.";

const currencyConverter: Record<Locale, ToolCopyDef> = {
  es: {
    vocab: {
      doc: "hoja de cálculo",
      docs: "hojas de cálculo",
      a_doc: "una hoja de cálculo",
      the_doc: "la hoja de cálculo",
      the_docs: "las hojas de cálculo",
      your_doc: "tu hoja de cálculo",
      your_docs: "tus hojas de cálculo",
      all_your_docs: "todas tus hojas de cálculo",
      all_docs: "todas las hojas de cálculo",
      each_doc: "cada hoja de cálculo",
      another_doc: "otra hoja de cálculo",
      this_doc: "esta hoja de cálculo",
    },
    overrides: {
      title: "Convertir moneda en Excel con la tasa del día, gratis",
      description:
        "Sube un Excel o CSV con precios o montos y recibe cada columna convertida a dólares, euros, pesos mexicanos u otra moneda, con la tasa de referencia del día. Gratis, sin registro para ver el resultado.",
      label: "Convertir moneda",
      h1: "Convierte los montos de tu Excel a otra moneda",
      intro:
        "Sube el Excel o el CSV. Eliges las columnas con montos, en qué moneda están y a cuál las quieres. Tavnit agrega al lado de cada una la columna convertida con la tasa del día, y te devuelve tu archivo completo.",
      trust: ["CSV o Excel · hasta 500 filas", "{limit} archivos gratis al día", "Se borra todo a las 24 h"],
      drop: {
        title: "Arrastra tu Excel o CSV aquí",
        hint: "o elige un archivo de tu computadora",
        choose: "Elegir archivo",
        sample: "Probar con un archivo de ejemplo",
        formats: "CSV o .xlsx · hasta 4 MB y 500 filas",
      },
      errors: {
        unsupported: "Solo aceptamos archivos CSV o Excel (.xlsx).",
        xls: "Es un Excel antiguo (.xls). Ábrelo en Excel y guárdalo como .xlsx o .csv.",
        too_many_rows: "La versión gratis procesa hasta 500 filas. Sube una parte del archivo.",
        too_many_columns: "Elige hasta 10 columnas a la vez.",
        no_columns: "Elige al menos una columna.",
        nothing_to_clean: "En esas columnas no encontramos montos que convertir.",
        empty: "El archivo está vacío o no tiene filas debajo del encabezado.",
        unreadable: "No pudimos leer el archivo. Si es un Excel, guárdalo de nuevo como .xlsx.",
        failed: "No pudimos convertir este archivo. Prueba de nuevo o con el archivo de ejemplo.",
      },
      how: {
        heading: "Cómo funciona",
        steps: [
          { title: "Sube el archivo", body: "Un CSV o un Excel con precios, totales o cualquier columna de montos." },
          { title: "Elige monedas", body: "Marcamos las columnas que parecen montos. Dices en qué moneda están, cómo van sus decimales y a qué moneda las pasamos." },
          { title: "Revisa y descarga", body: "Cada columna convertida aparece al lado de la original. Con tu cuenta gratis te llevas el archivo en Excel o CSV." },
        ],
      },
      faqs: [
        { q: "¿Qué tasa de cambio usa?", a: "La tasa de referencia del día que publica el Banco Central Europeo. Es la misma para todo el archivo y es una referencia, no la tasa de compra o venta de tu banco." },
        { q: "¿Qué monedas puedo convertir?", a: SUPPORTED_ES },
        { q: "¿Funciona con pesos colombianos, soles, pesos chilenos o balboas?", a: "Todavía no: esas monedas no están en las tasas del Banco Central Europeo. En Panamá, como el balboa va a la par con el dólar, puedes elegir USD." },
        { q: "¿Qué pasa con mis columnas originales?", a: "Se quedan como estaban. La conversión se agrega en una columna nueva al lado, por ejemplo \"Precio (USD)\", para que compares." },
        { q: "¿Qué pasa con las celdas que no son montos?", a: "Se quedan vacías en la columna convertida. Un texto, un porcentaje o una celda vacía no se convierten." },
        { q: "¿Qué pasa con mi archivo?", a: "Se usa solo para esta conversión y se borra a las 24 horas, junto con el resultado. Solo tu navegador puede ver el resultado." },
        { q: "¿Cómo hago que esto pase solo?", a: "En Tavnit, la conversión de moneda es un Cleaner: se aplica sola a cada factura que extraes o a cada archivo que llega por correo o API, junto con fechas, números y validaciones." },
      ],
      clean: {
        setup: {
          heading: "Elige las columnas y las monedas",
          fileSummary: "{rows} · {cols}",
          columnsLabel: "Columnas con montos",
          columnsHint: "Hasta {max}. Marcamos las que parecen montos.",
          tooMany: "Puedes elegir hasta {max} columnas a la vez.",
          sourceLabel: "Los montos están en",
          sourceHint: "Monedas con tasa del Banco Central Europeo.",
          inputLabel: "Los decimales van con",
          inputOptions: { comma: "coma · 1.234,56", dot: "punto · 1,234.56" },
          outputLabel: "Convertir a",
          outputOptions: {},
          preview: "Primeras filas",
          run: "Convertir",
          change: "Cambiar archivo",
        },
        stages: ["Subiendo el archivo", "Leyendo los montos", "Buscando la tasa del día", "Convirtiendo", "Armando tu archivo"],
        heading: "Listo: {file}",
        summary: "{cells} convertidas en {cols}",
        cellWord: ["celda", "celdas"],
        columnWord: ["columna", "columnas"],
        unchanged: "No encontramos montos que convertir en esas columnas.",
        highlight: "En azul, las columnas convertidas.",
        shown: "Se muestran {shown} de {total} filas. La descarga incluye todas.",
        download: "Descargar",
        downloadXlsx: "Excel (.xlsx)",
        downloadCsv: "CSV (.csv)",
        another: "Convertir otro archivo",
        automate: {
          heading: "Que pase solo, con cada factura",
          body: "En Tavnit la conversión de moneda es un Cleaner. Lo armas una vez y cada factura o cotización en otra moneda llega convertida, junto con fechas, números y validaciones.",
          cta: "Crear cuenta gratis",
          docs: "Qué es un Cleaner",
        },
      },
    },
  },
  en: {
    vocab: {
      doc: "spreadsheet",
      docs: "spreadsheets",
      a_doc: "a spreadsheet",
      the_doc: "the spreadsheet",
      the_docs: "the spreadsheets",
      your_doc: "your spreadsheet",
      your_docs: "your spreadsheets",
      all_your_docs: "all your spreadsheets",
      all_docs: "all spreadsheets",
      each_doc: "every spreadsheet",
      another_doc: "another spreadsheet",
      this_doc: "this spreadsheet",
    },
    overrides: {
      title: "Convert Currency in Excel at Today's Rate, Free",
      description:
        "Upload an Excel or CSV file with prices or amounts and get each column converted to dollars, euros, pounds or another currency at the day's reference rate. Free, no sign-up to see the result.",
      label: "Convert currency",
      h1: "Convert the amounts in your spreadsheet to another currency",
      intro:
        "Upload the Excel or CSV file. Pick the amount columns, the currency they are in and the one you want. Tavnit adds the converted column next to each one at the day's rate and hands your whole file back.",
      trust: ["CSV or Excel · up to 500 rows", "{limit} free files a day", "Everything is deleted after 24 h"],
      drop: {
        title: "Drop your Excel or CSV file here",
        hint: "or choose a file from your computer",
        choose: "Choose file",
        sample: "Try a sample file",
        formats: "CSV or .xlsx · up to 4 MB and 500 rows",
      },
      errors: {
        unsupported: "Only CSV or Excel (.xlsx) files.",
        xls: "This is an old Excel file (.xls). Open it in Excel and save it as .xlsx or .csv.",
        too_many_rows: "The free version handles up to 500 rows. Upload part of the file.",
        too_many_columns: "Pick up to 10 columns at a time.",
        no_columns: "Pick at least one column.",
        nothing_to_clean: "We found no amounts to convert in those columns.",
        empty: "The file is empty or has no rows under the header.",
        unreadable: "We could not read the file. If it is an Excel file, save it again as .xlsx.",
        failed: "We could not convert this file. Try again, or try the sample file.",
      },
      how: {
        heading: "How it works",
        steps: [
          { title: "Upload the file", body: "A CSV or an Excel file with prices, totals or any column of amounts." },
          { title: "Pick the currencies", body: "We tick the columns that look like amounts. You say which currency they are in, how their decimals are written and what to convert them to." },
          { title: "Review and download", body: "Each converted column sits next to the original. With your free account you take the file as Excel or CSV." },
        ],
      },
      faqs: [
        { q: "What exchange rate does it use?", a: "The day's reference rate published by the European Central Bank. It is the same for the whole file and is a reference, not your bank's buying or selling rate." },
        { q: "Which currencies can I convert?", a: SUPPORTED_EN },
        { q: "Does it work with Colombian pesos, soles, Chilean pesos or balboas?", a: "Not yet: those currencies are not in the European Central Bank's rates. In Panama, where the balboa is at par with the dollar, you can pick USD." },
        { q: "What happens to my original columns?", a: "They stay as they were. The conversion is added as a new column next to them, for example \"Price (USD)\", so you can compare." },
        { q: "What happens to cells that are not amounts?", a: "They stay empty in the converted column. Text, a percentage or an empty cell is not converted." },
        { q: "What happens to my file?", a: "It is used only for this conversion and deleted after 24 hours along with the result. Only your browser can see the result." },
        { q: "How do I make this happen on its own?", a: "In Tavnit, currency conversion is a Cleaner: it runs by itself on every invoice you extract or every file that arrives by email or API, alongside dates, numbers and checks." },
      ],
      clean: {
        setup: {
          heading: "Pick the columns and the currencies",
          fileSummary: "{rows} · {cols}",
          columnsLabel: "Columns with amounts",
          columnsHint: "Up to {max}. We ticked the ones that look like amounts.",
          tooMany: "You can pick up to {max} columns at a time.",
          sourceLabel: "The amounts are in",
          sourceHint: "Currencies with a European Central Bank rate.",
          inputLabel: "Decimals use a",
          inputOptions: { comma: "comma · 1.234,56", dot: "point · 1,234.56" },
          outputLabel: "Convert to",
          outputOptions: {},
          preview: "First rows",
          run: "Convert",
          change: "Change file",
        },
        stages: ["Uploading the file", "Reading the amounts", "Getting the day's rate", "Converting", "Building your file"],
        heading: "Done: {file}",
        summary: "{cells} converted in {cols}",
        cellWord: ["cell", "cells"],
        columnWord: ["column", "columns"],
        unchanged: "We found no amounts to convert in those columns.",
        highlight: "The converted columns are in blue.",
        shown: "Showing {shown} of {total} rows. The download has all of them.",
        download: "Download",
        downloadXlsx: "Excel (.xlsx)",
        downloadCsv: "CSV (.csv)",
        another: "Convert another file",
        automate: {
          heading: "Make it happen with every invoice",
          body: "In Tavnit currency conversion is a Cleaner. You set it up once and every invoice or quote in another currency arrives converted, alongside dates, numbers and checks.",
          cta: "Create a free account",
          docs: "What is a Cleaner",
        },
      },
    },
  },
};

export default currencyConverter;
