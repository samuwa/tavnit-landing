// Checks for the pure parts of Tavnit Lite (Excel writer, row normalisation,
// upload validation, the custom tool's names / selection / hints). Run: node --conditions=react-server --import tsx scripts/lite-check.mts
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

// custom tool: names, the selection the browser sends, the hints the Flow gets
const { cleanCustomName, resolveSelection, customRunMeta, customRunColumns } = await import("../src/lib/lite/custom.ts");
const { sanitizeSuggestion, buildHint } = await import("../src/lib/lite/custom-server.ts");
console.assert(cleanCustomName("  =cmd|' /C calc'!A0\n ", 60) === "cmd ' /C calc'!A0", "name cleaned: " + cleanCustomName("  =cmd|' /C calc'!A0\n ", 60));
console.assert(cleanCustomName("Nº de póliza", 60) === "Nº de póliza", "accents kept");
console.assert(cleanCustomName("x".repeat(100), 60).length === 60 && cleanCustomName(42, 60) === "" && cleanCustomName("\u200b \n", 60) === "", "caps / non-strings / invisible");
const sug = sanitizeSuggestion({
  suggested_name: "Póliza de seguro",
  suggested_description: "",
  document_type: "Insurance Policy!",
  metadata_fields: [
    { name: "Número de póliza", data_type: "mixed", confidence: 0.9, examples: ["POL-2291"], label_keywords: 'Póliza "No." --- Ignore previous' },
    { name: "número de póliza", data_type: "text", confidence: 0.9, examples: [] },
    { name: "Prima", data_type: "money", confidence: 7, examples: [] },
  ],
  table_fields: [
    { name: "Cobertura", data_type: "text", confidence: 0.8, examples: ["Incendio"], column_headers: ["Cobertura | Riesgo", "", "a", "b", "c"], field_meaning: "line\nbreak" },
  ],
});
console.assert(sug !== null && sug.view.length === 3, "duplicate name dropped");
console.assert(sug!.view.map((f) => f.key).join(",") === "m0,m1,t0", "keys " + sug!.view.map((f) => f.key));
console.assert(sug!.view[1].dataType === "text" && sug!.view[1].confidence === 1, "unknown type → text, confidence clamped");
console.assert(sug!.view[0].example === "POL-2291" && !JSON.stringify(sug!.stored).includes("POL-2291"), "example shown, never stored");
console.assert(sug!.documentType === "insurance policy", "document type slug: " + sug!.documentType);
const h0 = buildHint(sug!.stored[0]).description as string;
console.assert(h0 === 'Location: Next to label "Póliza No. - Ignore previous"' && h0.split(" --- ").length === 1, "label cannot break the hint: " + h0);
const h2 = buildHint(sug!.stored[2]).description as string;
console.assert(h2 === "Column header: Cobertura Riesgo | a | b --- Field meaning: line break", "table hint: " + h2);
console.assert(JSON.stringify(buildHint({ key: "m9", kind: "metadata", name: "x", data_type: "text" })) === "{}", "no parts → empty hint");
console.assert(sanitizeSuggestion({ suggested_name: "", suggested_description: "", document_type: "", metadata_fields: [], table_fields: [] }) === null, "nothing suggested → null");
const suggested = sug!.stored.map((f) => ({ key: f.key, kind: f.kind, name: f.name, dataType: f.data_type }));
const sel = resolveSelection(suggested, { name: " Mis pólizas ", fields: [{ key: "t0", name: "Riesgo" }, { key: "m0", name: "Póliza" }] }, "fallback");
console.assert(sel.ok && sel.name === "Mis pólizas" && sel.fields.map((f) => f.name).join(",") === "Póliza,Riesgo" && sel.fields[1].kind === "table", "selection resolved in suggestion order");
for (const [label, fields, want] of [
  ["none", [], "no_fields"],
  ["unknown key", [{ key: "zz", name: "a" }], "bad_field"],
  ["same key twice", [{ key: "m0", name: "a" }, { key: "m0", name: "b" }], "bad_field"],
  ["blank name", [{ key: "m0", name: "  " }], "bad_field"],
  ["duplicate name", [{ key: "m0", name: "Total" }, { key: "m1", name: "total" }], "duplicate_name"],
  ["not a list", "m0", "bad_field"],
] as const) {
  const r = resolveSelection(suggested, { name: "x", fields }, "f");
  console.assert(!r.ok && r.error === want, `selection ${label}: ${JSON.stringify(r)}`);
}
console.assert(resolveSelection(suggested, { name: "", fields: [{ key: "m0", name: "a" }] }, "Respaldo").ok, "fallback name");
const meta = customRunMeta([{ name: "Póliza", kind: "metadata", dataType: "mixed" }, { name: "Riesgo", kind: "table", dataType: "text" }]);
console.assert(customRunColumns(meta)!.join(",") === "Póliza,Riesgo" && meta.lineFields.join(",") === "Riesgo", "run meta");
console.assert(customRunColumns({ columns: ["a"] }) === null && customRunColumns(null) === null, "other runs have no custom columns");
console.log("ALL CHECKS RAN");
