// Generates public/lite/sample-bill-of-lading.pdf — the "try it without a
// file" document for /tools/bill-of-lading-to-excel. A fictional ocean B/L
// from Shanghai to Manzanillo (Panama): three containers with different
// cargo, seals, package counts, weights and volumes, plus a totals row the
// extraction must leave out. Run: node scripts/make-sample-bill-of-lading.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const doc = await PDFDocument.create();
const page = doc.addPage([595.28, 841.89]); // A4
const font = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const ink = rgb(0.12, 0.12, 0.16);
const muted = rgb(0.45, 0.45, 0.5);
const line = rgb(0.75, 0.75, 0.8);

const t = (text, x, y, size = 9, f = font, color = ink) => page.drawText(text, { x, y, size, font: f, color });
const tr = (text, xRight, y, size = 9, f = font, color = ink) =>
  page.drawText(text, { x: xRight - f.widthOfTextAtSize(text, size), y, size, font: f, color });
const box = (x, y, w, h) => page.drawRectangle({ x, y, width: w, height: h, borderColor: line, borderWidth: 0.6 });
const label = (text, x, y) => t(text.toUpperCase(), x, y, 6.5, bold, muted);

// Masthead
t("OCEANIC LINES", 50, 790, 20, bold);
t("Oceanic Container Lines S.A. · Marina Bay Tower 18, Singapore", 50, 776, 8, font, muted);
tr("BILL OF LADING", 545, 795, 15, bold);
tr("FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT", 545, 782, 7, font, muted);
tr("B/L No. OCLUSHA2026044817", 545, 766, 10, bold);
tr("Booking No. BKG-SHA-118820", 545, 754, 8.5);

// Parties grid
const L = 50, R = 545, MID = 300;
let y = 740;
box(L, y - 52, MID - L, 52);
label("Shipper", L + 4, y - 9);
t("Ningbo Bright Home Appliances Co., Ltd.", L + 4, y - 22, 9, bold);
t("No. 88 Jiangnan Road, Yinzhou District", L + 4, y - 33, 8);
t("Ningbo 315100, Zhejiang, China", L + 4, y - 43, 8);

box(MID, y - 52, R - MID, 52);
label("Booking / Reference", MID + 4, y - 9);
t("Export references: PO-2026-3391 / SO-77120", MID + 4, y - 22, 8);
t("Forwarding agent: Pacific Link Logistics (NBO)", MID + 4, y - 33, 8);
t("Point of origin: Ningbo, China", MID + 4, y - 43, 8);

y -= 52;
box(L, y - 52, MID - L, 52);
label("Consignee", L + 4, y - 9);
t("Distribuidora Istmo, S.A.", L + 4, y - 22, 9, bold);
t("RUC 155612345-2-2019 DV 41", L + 4, y - 33, 8);
t("Calle 50, Torre Global, Piso 12, Panamá, Panamá", L + 4, y - 43, 8);

box(MID, y - 52, R - MID, 52);
label("Notify party", MID + 4, y - 9);
t("Agencia Aduanal Canal Brokers, S.A.", MID + 4, y - 22, 9, bold);
t("Zona Libre de Colón, Calle 15, Edif. 42", MID + 4, y - 33, 8);
t("Tel. +507 441-2210 · ops@canalbrokers.example", MID + 4, y - 43, 8);

y -= 52;
const cells = [
  ["Pre-carriage by", "Truck"],
  ["Place of receipt", "Ningbo CY, China"],
  ["Ocean vessel", "OCEANIC HARMONY"],
  ["Voyage No.", "041W"],
];
const cw = (R - L) / 4;
box(L, y - 30, R - L, 30);
cells.forEach(([k, v], i) => {
  label(k, L + 4 + i * cw, y - 9);
  t(v, L + 4 + i * cw, y - 22, 8.5, i >= 2 ? bold : font);
  if (i) page.drawLine({ start: { x: L + i * cw, y: y - 30 }, end: { x: L + i * cw, y }, thickness: 0.6, color: line });
});
y -= 30;
const cells2 = [
  ["Port of loading", "Shanghai, China"],
  ["Port of discharge", "Manzanillo, Panama"],
  ["Place of delivery", "Colón Free Zone, Panama"],
  ["Freight", "FREIGHT PREPAID"],
];
box(L, y - 30, R - L, 30);
cells2.forEach(([k, v], i) => {
  label(k, L + 4 + i * cw, y - 9);
  t(v, L + 4 + i * cw, y - 22, 8.5, i < 2 ? bold : font);
  if (i) page.drawLine({ start: { x: L + i * cw, y: y - 30 }, end: { x: L + i * cw, y }, thickness: 0.6, color: line });
});
y -= 30;

// Particulars furnished by shipper
y -= 14;
t("PARTICULARS FURNISHED BY SHIPPER — CARRIER NOT RESPONSIBLE", L, y, 7, bold, muted);
y -= 10;
const cols = { cont: L + 3, seal: 128, pk: 196, desc: 262, gw: 470, cbm: 545 };
page.drawRectangle({ x: L, y: y - 16, width: R - L, height: 16, color: rgb(0.94, 0.94, 0.97) });
t("Container No.", cols.cont, y - 11, 7.5, bold);
t("Seal No.", cols.seal, y - 11, 7.5, bold);
t("No. & kind of packages", cols.pk, y - 11, 7.5, bold);
t("Description of goods", cols.desc, y - 11, 7.5, bold);
tr("Gross weight (kg)", cols.gw + 30, y - 11, 7.5, bold);
tr("Measurement (CBM)", cols.cbm, y - 11, 7.5, bold);
y -= 16;

const rows = [
  ["OCLU4418822", "SL-771204", 420, "cartons", "Stainless steel electric kettles 1.7 L, 220 V, model BH-K17", 5460.0, 27.4],
  ["TCLU7093315", "SL-771205", 96, "pallets", "Countertop microwave ovens 23 L, 800 W, model BH-M23 (12 units per pallet)", 14880.5, 58.1],
  ["OCLU9127706", "SL-771206", 610, "cartons", "Ceramic dinnerware sets, 16 pcs, assorted colours, HS 6912.00", 9150.0, 31.9],
];
let totPk = 0, totGw = 0, totCbm = 0;
for (const [c, s, n, kind, d, gw, cbm] of rows) {
  totPk += n; totGw += gw; totCbm += cbm;
  const lines = d.length > 44 ? [d.slice(0, d.lastIndexOf(" ", 44)), d.slice(d.lastIndexOf(" ", 44) + 1)] : [d];
  t(c, cols.cont, y - 12, 8.5, bold);
  t(s, cols.seal, y - 12, 8.5);
  t(`${n} ${kind}`, cols.pk, y - 12, 8.5);
  lines.forEach((ln, i) => t(ln, cols.desc, y - 12 - i * 10, 8.5));
  tr(gw.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), cols.gw + 30, y - 12, 8.5);
  tr(cbm.toFixed(2), cols.cbm, y - 12, 8.5);
  const h = 16 + (lines.length - 1) * 10;
  page.drawLine({ start: { x: L, y: y - h - 4 }, end: { x: R, y: y - h - 4 }, thickness: 0.4, color: line });
  y -= h + 6;
}
y -= 6;
t("TOTAL", cols.cont, y - 8, 8.5, bold);
t(`${totPk} packages · 3 x 40' HC containers`, cols.pk, y - 8, 8.5, bold);
t("SHIPPER'S LOAD, STOWAGE & COUNT · SAID TO CONTAIN", cols.desc, y - 8, 7.5, font, muted);
tr(totGw.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), cols.gw + 30, y - 8, 8.5, bold);
tr(totCbm.toFixed(2), cols.cbm, y - 8, 8.5, bold);
page.drawLine({ start: { x: L, y: y - 16 }, end: { x: R, y: y - 16 }, thickness: 0.8, color: line });
y -= 30;

// Freight & charges / issue
box(L, y - 58, MID - L, 58);
label("Freight & charges", L + 4, y - 9);
t("Ocean freight: PREPAID · 3 x 40' HC", L + 4, y - 22, 8);
t("Terminal handling at destination: COLLECT", L + 4, y - 33, 8);
t("Incoterm: CIF Manzanillo", L + 4, y - 44, 8);
box(MID, y - 58, R - MID, 58);
label("Place and date of issue", MID + 4, y - 9);
t("Shanghai, 14/09/2026", MID + 4, y - 22, 8.5, bold);
label("Shipped on board date", MID + 4, y - 35);
t("12/09/2026", MID + 4, y - 47, 8.5, bold);
label("No. of original B/Ls", MID + 150, y - 35);
t("THREE (3)", MID + 150, y - 47, 8.5, bold);
y -= 58;

y -= 16;
t("Received by the Carrier the goods as specified above in apparent good order and condition unless otherwise stated, to be transported to such place as agreed,", L, y, 6.5, font, muted);
t("authorised or permitted herein and subject to all the terms and conditions appearing on the front and reverse of this Bill of Lading. One original must be surrendered", L, y - 9, 6.5, font, muted);
t("duly endorsed in exchange for the goods or delivery order.", L, y - 18, 6.5, font, muted);
t("For the Carrier: Oceanic Container Lines S.A., as Carrier — by Pacific Link Logistics as agent", L, y - 36, 7.5, bold);

t("Documento de ejemplo generado por Tavnit para probar la extracción. Empresa, buque y datos ficticios.", 50, 60, 8, font, muted);

const bytes = await doc.save();
mkdirSync("public/lite", { recursive: true });
writeFileSync("public/lite/sample-bill-of-lading.pdf", bytes);
console.log("wrote public/lite/sample-bill-of-lading.pdf", bytes.length, "bytes;", rows.length, "containers");
