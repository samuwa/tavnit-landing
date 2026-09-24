// Generates public/lite/sample-receipt.pdf — the "try it without a file"
// document for /tools/receipt-to-excel. A narrow thermal-style ticket from a
// fictional Panama restaurant: six items, ITBMS 7%, tip, card payment, and a
// change line that must NOT become a row. Run: node scripts/make-sample-receipt.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const doc = await PDFDocument.create();
const W = 226;
const H = 600;
const page = doc.addPage([W, H]);
const font = await doc.embedFont(StandardFonts.Courier);
const bold = await doc.embedFont(StandardFonts.CourierBold);
const ink = rgb(0.18, 0.18, 0.2);
const faint = rgb(0.45, 0.45, 0.48);

const t = (text, x, y, size = 8, f = font, color = ink) => page.drawText(text, { x, y, size, font: f, color });
const tc = (text, y, size = 8, f = font, color = ink) => t(text, (W - f.widthOfTextAtSize(text, size)) / 2, y, size, f, color);
const tr = (text, xRight, y, size = 8, f = font, color = ink) => t(text, xRight - f.widthOfTextAtSize(text, size), y, size, f, color);
const dashes = (y) => t("-".repeat(34), 14, y, 8, font, faint);

let y = H - 34;
tc("FONDA LA CEIBA", y, 11, bold); y -= 14;
tc("Comida panameña desde 1998", y, 7, font, faint); y -= 11;
tc("RUC 8-712-2231 DV 05", y, 7); y -= 11;
tc("Ave. Balboa, Ciudad de Panama", y, 7); y -= 11;
tc("Tel. 262-4410", y, 7); y -= 14;
dashes(y); y -= 13;
t("Fecha: 18/09/2026", 14, y, 8); tr("Hora: 13:42", W - 14, y, 8); y -= 12;
t("Ticket: 004417", 14, y, 8); tr("Caja: 2", W - 14, y, 8); y -= 12;
t("Mesa: 7   Atendio: Yaneth", 14, y, 8); y -= 13;
dashes(y); y -= 13;
t("CANT DESCRIPCION", 14, y, 8, bold); tr("IMPORTE", W - 14, y, 8, bold); y -= 13;

const items = [
  [2, "Sancocho de gallina", 6.5],
  [1, "Arroz con pollo", 5.75],
  [3, "Patacones", 2.25],
  [2, "Chicha de maracuya", 1.75],
  [1, "Flan de caramelo", 3.0],
  [2, "Cafe con leche", 1.5],
];
let subtotal = 0;
for (const [q, d, p] of items) {
  const line = q * p;
  subtotal += line;
  t(`${q}  ${d}`, 14, y, 8);
  tr(line.toFixed(2), W - 14, y, 8);
  y -= 11;
  t(`   ${q} x ${p.toFixed(2)}`, 14, y, 7, font, faint);
  y -= 12;
}
dashes(y); y -= 13;
const tax = Math.round(subtotal * 0.07 * 100) / 100;
const tip = Math.round(subtotal * 0.1 * 100) / 100;
const total = Math.round((subtotal + tax + tip) * 100) / 100;
t("SUBTOTAL", 14, y, 8); tr(subtotal.toFixed(2), W - 14, y, 8); y -= 12;
t("ITBMS 7%", 14, y, 8); tr(tax.toFixed(2), W - 14, y, 8); y -= 12;
t("PROPINA 10%", 14, y, 8); tr(tip.toFixed(2), W - 14, y, 8); y -= 13;
t("TOTAL B/.", 14, y, 10, bold); tr(total.toFixed(2), W - 14, y, 10, bold); y -= 15;
dashes(y); y -= 13;
t("TARJETA VISA ****4417", 14, y, 8); tr(total.toFixed(2), W - 14, y, 8); y -= 12;
t("Aut. 083921", 14, y, 7, font, faint); y -= 12;
t("CAMBIO", 14, y, 8); tr("0.00", W - 14, y, 8); y -= 16;
dashes(y); y -= 14;
tc("Gracias por su visita", y, 8, bold); y -= 11;
tc("Documento de ejemplo - Tavnit Lite", y, 6.5, font, faint);

mkdirSync("public/lite", { recursive: true });
writeFileSync("public/lite/sample-receipt.pdf", await doc.save());
console.log("public/lite/sample-receipt.pdf", { subtotal, tax, tip, total });
