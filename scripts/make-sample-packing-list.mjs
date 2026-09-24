// Generates public/lite/sample-packing-list.pdf — the "try it without a
// file" document for /tools/packing-list-to-excel. A fictional Panamanian
// exporter, seven goods lines with cartons, weights and dimensions, and a
// totals block, so the extracted table is interesting rather than trivial.
// Run: node scripts/make-sample-packing-list.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const doc = await PDFDocument.create();
const page = doc.addPage([595.28, 841.89]); // A4
const font = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const ink = rgb(0.12, 0.12, 0.16);
const muted = rgb(0.45, 0.45, 0.5);
const line = rgb(0.82, 0.82, 0.86);

const t = (text, x, y, size = 10, f = font, color = ink) => page.drawText(text, { x, y, size, font: f, color });
const tr = (text, xRight, y, size = 10, f = font, color = ink) =>
  page.drawText(text, { x: xRight - f.widthOfTextAtSize(text, size), y, size, font: f, color });

// Header
t("Agroexportadora del Pacífico, S.A.", 50, 780, 17, bold);
t("RUC 2077431-1-748812 DV 55", 50, 762, 9, font, muted);
t("Zona Libre de Colón, Calle 14, Bodega 22, Colón, Panamá", 50, 750, 9, font, muted);
t("exportaciones@agropacifico.example", 50, 738, 9, font, muted);

tr("PACKING LIST", 545, 780, 17, bold);
tr("No. PL-2026-0917", 545, 762, 10);
tr("Fecha: 17/09/2026", 545, 748, 10);
tr("Factura: FAC-2026-004521", 545, 734, 10);
tr("Contenedor: MSKU-441762-3 (40' HC)", 545, 720, 10);

page.drawLine({ start: { x: 50, y: 705 }, end: { x: 545, y: 705 }, thickness: 0.8, color: line });

// Parties and route
t("Consignatario", 50, 685, 9, bold, muted);
t("Fresh Andes Import LLC", 50, 670, 10, bold);
t("2200 NW 72nd Ave, Miami, FL 33122, USA", 50, 657, 9);
t("Tel. +1 305 555 0142", 50, 645, 9);

t("Ruta", 320, 685, 9, bold, muted);
t("Puerto de carga: Balboa, Panamá", 320, 670, 9.5);
t("Puerto de descarga: Miami, USA", 320, 657, 9.5);
t("Buque: MSC Elena · Viaje 0932W · Incoterm FOB", 320, 645, 9.5);

// Table
const cols = { desc: 50, qty: 265, unit: 300, ctn: 355, net: 415, gross: 470, dims: 545 };
let y = 610;
page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
t("Descripción", cols.desc + 4, y, 8.5, bold);
tr("Cant.", cols.qty + 20, y, 8.5, bold);
t("Unidad", cols.unit, y, 8.5, bold);
tr("Bultos", cols.ctn + 10, y, 8.5, bold);
tr("Peso neto (kg)", cols.net + 20, y, 8.5, bold);
tr("Peso bruto (kg)", cols.gross + 30, y, 8.5, bold);
tr("Dimensiones (cm)", cols.dims - 4, y, 8.5, bold);
y -= 26;

// [description, qty, unit, cartons, net kg, gross kg, dims]
const items = [
  ["Piña MD2 calibre 7", 2400, "unidad", 200, 3120.0, 3420.0, "40x30x25"],
  ["Melón cantaloupe calibre 9", 1800, "unidad", 150, 2610.0, 2850.0, "50x40x18"],
  ["Sandía sin semilla 8-10 lb", 640, "unidad", 80, 2560.0, 2720.0, "60x40x35"],
  ["Papaya tainung 3-4 lb", 1200, "unidad", 120, 1980.0, 2160.0, "40x30x20"],
  ["Plátano verde extra 20 lb", 500, "caja", 500, 4535.0, 4985.0, "50x40x25"],
  ["Ñame diamante 50 lb", 180, "saco", 180, 4086.0, 4212.0, "90x50x20"],
  ["Pimiento morrón rojo 11 lb", 360, "caja", 360, 1796.4, 1980.0, "40x30x15"],
];
let totCtn = 0;
let totNet = 0;
let totGross = 0;
for (const [d, q, u, c, n, g, dm] of items) {
  totCtn += c;
  totNet += n;
  totGross += g;
  t(d, cols.desc + 4, y, 9);
  tr(String(q), cols.qty + 20, y, 9);
  t(u, cols.unit, y, 9);
  tr(String(c), cols.ctn + 10, y, 9);
  tr(n.toFixed(1), cols.net + 20, y, 9);
  tr(g.toFixed(1), cols.gross + 30, y, 9);
  tr(dm, cols.dims - 4, y, 9);
  page.drawLine({ start: { x: 50, y: y - 7 }, end: { x: 545, y: y - 7 }, thickness: 0.4, color: line });
  y -= 22;
}

y -= 6;
tr("Total bultos", cols.gross + 30, y, 10);
tr(String(totCtn), cols.dims - 4, y, 10);
y -= 16;
tr("Peso neto total (kg)", cols.gross + 30, y, 10);
tr(totNet.toFixed(1), cols.dims - 4, y, 10);
y -= 16;
tr("Peso bruto total (kg)", cols.gross + 30, y, 10, bold);
tr(totGross.toFixed(1), cols.dims - 4, y, 10, bold);
y -= 16;
tr("Volumen total", cols.gross + 30, y, 10);
tr("58.4 m3", cols.dims - 4, y, 10);

y -= 40;
t("Observaciones", 50, y, 9, bold, muted);
y -= 14;
t("Carga paletizada en 22 pallets, cadena de frío a 8 °C. Sello del contenedor: PA-772019.", 50, y, 9);
y -= 13;
t("País de origen: Panamá. Marcas: FRESH ANDES / MIAMI / PL-2026-0917.", 50, y, 9);

t("Documento de ejemplo generado por Tavnit para probar la extracción. Empresa y datos ficticios.", 50, 60, 8, font, muted);

const bytes = await doc.save();
mkdirSync("public/lite", { recursive: true });
writeFileSync("public/lite/sample-packing-list.pdf", bytes);
console.log("wrote public/lite/sample-packing-list.pdf", bytes.length, "bytes; cartons", totCtn, "net", totNet.toFixed(1), "gross", totGross.toFixed(1));
