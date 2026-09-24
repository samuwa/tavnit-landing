// Checks for the pure parts of Tavnit Lite (Excel writer, row normalisation,
// upload validation). Run: node --conditions=react-server --import tsx scripts/lite-check.mts
import { readFileSync, writeFileSync } from "node:fs";
import { unzipSync, strFromU8 } from "fflate";
process.env.NODE_ENV = "test";
const { buildXlsx } = await import("../src/lib/lite/excel.ts");
const { normalizeRows } = await import("../src/lib/lite/rows.ts");
const { validateUpload, safeFilename } = await import("../src/lib/lite/validate.ts");

// rows
const t = normalizeRows(null, [
  { proveedor: "Istmo", cantidad: 120, precio: 18.5, nested: { a: 1 }, long: "x".repeat(3000) },
  { proveedor: "Istmo", cantidad: 48, precio: 22.4, extra: true },
]);
console.assert(t.columns.join(",") === "proveedor,cantidad,precio,nested,long,extra", "column order " + t.columns);
console.assert(t.rows[0].nested === '{"a":1}', "nested stringified");
console.assert((t.rows[0].long as string).length === 2001, "long truncated");
console.assert(t.rows[1].extra === "true" && t.rows[1].nested === null, "missing → null");

// excel
const xlsx = buildXlsx({ columns: t.columns, rows: t.rows, locale: "es", sourceName: "factura <&> \"x\".pdf", toolPath: "/es/herramientas/factura-a-excel" });
const parts = unzipSync(xlsx);
const names = Object.keys(parts).sort();
console.log("xlsx parts:", names.join(" "));
const sheet1 = strFromU8(parts["xl/worksheets/sheet1.xml"]);
console.assert(sheet1.includes('<c r="B2"><v>120</v></c>'), "numeric cell");
console.assert(sheet1.includes("&quot;a&quot;"), "escaped json");
const sheet2 = strFromU8(parts["xl/worksheets/sheet2.xml"]);
console.assert(sheet2.includes("Generado con Tavnit") && sheet2.includes("&lt;&amp;&gt;"), "stamp + escaping");
// formula injection guard
const inj = buildXlsx({ columns: ["a"], rows: [{ a: "=HYPERLINK(\"http://x\")" }], locale: "en", sourceName: "d", toolPath: "/tools" });
console.assert(strFromU8(unzipSync(inj)["xl/worksheets/sheet1.xml"]).includes("'=HYPERLINK"), "formula neutralised");
writeFileSync("/tmp/tavnit-lite-test.xlsx", xlsx);

// validate
const pdf = new Uint8Array(readFileSync("public/lite/sample-invoice.pdf"));
const v = await validateUpload(pdf, "../../etc/passwd\u0000.exe");
console.log("sample:", v.kind, v.pages, "pages,", v.filename);
console.assert(v.kind === "pdf" && v.pages === 1 && v.filename === "passwd.pdf", "sanitised name");
for (const [label, bytes, name] of [
  ["empty", new Uint8Array(0), "a.pdf"],
  ["txt", new TextEncoder().encode("hello world hello"), "a.pdf"],
  ["fake-pdf", new TextEncoder().encode("%PDF-1.4 garbage garbage garbage"), "a.pdf"],
  ["big", new Uint8Array(10 * 1024 * 1024 + 1), "a.pdf"],
] as const) {
  try { await validateUpload(bytes as Uint8Array, name); console.log(label, "→ ACCEPTED (unexpected)"); }
  catch (e) { console.log(label, "→", (e as Error).message); }
}
console.assert(safeFilename("Factura Ñandú #12.PDF", "pdf") === "Factura Ñandú 12.pdf", safeFilename("Factura Ñandú #12.PDF", "pdf"));
console.log("png:", (await validateUpload(new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,0]), "x.png")).contentType);
console.log("ALL CHECKS RAN");
