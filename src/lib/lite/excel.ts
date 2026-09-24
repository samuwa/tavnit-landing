import "server-only";

import { strToU8, zipSync } from "fflate";
import { SITE_URL } from "@/lib/site";

/**
 * Minimal .xlsx writer: a zip of OOXML parts with inline strings.
 *
 * Written by hand instead of pulling in a spreadsheet library because the
 * only thing this site needs is "rows → one sheet", and the popular
 * libraries drag in dependencies with open advisories. Output opens in
 * Excel, Numbers, LibreOffice and Google Sheets.
 *
 * Sheet 1 "Datos"/"Data" holds the extracted rows; sheet 2 is the stamp —
 * where the file came from and where to make it automatic.
 */

export interface ExcelInput {
  columns: string[];
  rows: Record<string, unknown>[];
  locale: "en" | "es";
  sourceName: string;
  toolPath: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // XML 1.0 forbids most control characters.
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

function colRef(i: number): string {
  let n = i + 1;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function cellXml(ref: string, value: unknown, style?: number): string {
  const st = style ? ` s="${style}"` : "";
  if (typeof value === "number" && Number.isFinite(value)) {
    return `<c r="${ref}"${st}><v>${value}</v></c>`;
  }
  if (typeof value === "boolean") {
    return `<c r="${ref}"${st} t="b"><v>${value ? 1 : 0}</v></c>`;
  }
  let text: string;
  if (value === null || value === undefined) text = "";
  else if (typeof value === "string") text = value;
  else text = JSON.stringify(value);
  // A leading formula marker would otherwise be evaluated by some viewers
  // (OWASP CSV/formula injection: = + - @ and a leading tab or CR).
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  text = text.slice(0, 32000);
  return `<c r="${ref}"${st} t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`;
}

function sheetXml(header: string[], rows: unknown[][], widths?: number[]): string {
  const cols = widths?.length
    ? `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols>`
    : "";
  const lines: string[] = [];
  lines.push(
    `<row r="1">${header.map((h, i) => cellXml(`${colRef(i)}1`, h, 1)).join("")}</row>`,
  );
  rows.forEach((row, r) => {
    const n = r + 2;
    lines.push(`<row r="${n}">${row.map((v, i) => cellXml(`${colRef(i)}${n}`, v)).join("")}</row>`);
  });
  const last = `${colRef(Math.max(header.length - 1, 0))}${rows.length + 1}`;
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<dimension ref="A1:${last}"/>` +
    `<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>` +
    `<sheetFormatPr defaultRowHeight="15"/>${cols}` +
    `<sheetData>${lines.join("")}</sheetData>` +
    `</worksheet>`
  );
}

export function buildXlsx(input: ExcelInput): Uint8Array {
  const es = input.locale === "es";
  const columns = input.columns.length ? input.columns : ["value"];
  const dataRows = input.rows.map((r) => columns.map((c) => r[c]));
  const widths = columns.map((c, i) => {
    const longest = dataRows.reduce((m, row) => {
      const v = row[i];
      const len = typeof v === "string" ? v.length : v == null ? 0 : String(v).length;
      return Math.max(m, len);
    }, c.length);
    return Math.min(Math.max(longest + 2, 10), 60);
  });

  const stampRows: unknown[][] = [
    [es ? "Generado con Tavnit" : "Generated with Tavnit"],
    [es ? "Documento" : "Document", input.sourceName],
    [es ? "Fecha" : "Date", new Date().toISOString().slice(0, 10)],
    [es ? "Filas" : "Rows", input.rows.length],
    [],
    [
      es
        ? "Esto lo hizo la versión gratis, un documento a la vez."
        : "This came from the free version, one document at a time.",
    ],
    [
      es
        ? "Para que pase solo con cada factura que llega (por correo, API, Zapier, Make o n8n), y con revisión antes de contabilizar:"
        : "To make it happen on every invoice that arrives (email, API, Zapier, Make or n8n), with review before it posts:",
    ],
    [`${SITE_URL}${input.toolPath}`],
    ["https://app.tavnit.io"],
  ];

  const sheet1 = sheetXml(columns, dataRows, widths);
  const sheet2 = sheetXml(
    [es ? "Tavnit" : "Tavnit"],
    stampRows.map((r) => (r.length ? r : [""])),
    [70, 40],
  );

  const sheetName1 = es ? "Datos" : "Data";
  const sheetName2 = "Tavnit";

  const contentTypes =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>` +
    `<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>` +
    `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
    `<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>` +
    `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>` +
    `</Types>`;

  const rootRels =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>` +
    `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>` +
    `<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>` +
    `</Relationships>`;

  const workbook =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
    `<sheets>` +
    `<sheet name="${esc(sheetName1)}" sheetId="1" r:id="rId1"/>` +
    `<sheet name="${esc(sheetName2)}" sheetId="2" r:id="rId2"/>` +
    `</sheets></workbook>`;

  const workbookRels =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>` +
    `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>` +
    `<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
    `</Relationships>`;

  // Style index 1 = bold header.
  const styles =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>` +
    `<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>` +
    `<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>` +
    `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
    `<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>` +
    `</styleSheet>`;

  const now = new Date().toISOString();
  const core =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
    `<dc:creator>Tavnit</dc:creator><cp:lastModifiedBy>Tavnit</cp:lastModifiedBy>` +
    `<dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>` +
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>` +
    `</cp:coreProperties>`;
  const app =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Tavnit</Application></Properties>`;

  return zipSync(
    {
      "[Content_Types].xml": strToU8(contentTypes),
      "_rels/.rels": strToU8(rootRels),
      "docProps/core.xml": strToU8(core),
      "docProps/app.xml": strToU8(app),
      "xl/workbook.xml": strToU8(workbook),
      "xl/_rels/workbook.xml.rels": strToU8(workbookRels),
      "xl/styles.xml": strToU8(styles),
      "xl/worksheets/sheet1.xml": strToU8(sheet1),
      "xl/worksheets/sheet2.xml": strToU8(sheet2),
    },
    { level: 6 },
  );
}
