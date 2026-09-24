// Generates public/lite/sample-po.pdf — the purchase order half of the
// "try it" pair for /tools/po-vs-invoice-check. Supermercados El Rey orders
// six products from Distribuidora Istmo (the fictional supplier of the sample
// invoice); make-sample-po-invoice.mjs writes the invoice against it, with
// deliberate differences. Run: node scripts/make-sample-po.mjs
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

// Header: the buyer issues the PO
t("Supermercados El Rey Panamá, S.A.", 50, 780, 18, bold);
t("RUC 1234-567-89012 DV 12", 50, 762, 9, font, muted);
t("Vía Israel, San Francisco, Ciudad de Panamá", 50, 750, 9, font, muted);
t("compras@elrey.example", 50, 738, 9, font, muted);

tr("ORDEN DE COMPRA", 545, 780, 18, bold);
tr("No. OC-8821", 545, 762, 10);
tr("Fecha: 05/09/2026", 545, 748, 10);
tr("Entrega requerida: 12/09/2026", 545, 734, 10);
tr("Condiciones: crédito 30 días", 545, 720, 10);

page.drawLine({ start: { x: 50, y: 705 }, end: { x: 545, y: 705 }, thickness: 0.8, color: line });

t("Proveedor", 50, 685, 9, bold, muted);
t("Distribuidora Istmo, S.A.", 50, 670, 10, bold);
t("RUC 155612345-2-2019 DV 41", 50, 657, 9);
t("Calle 50, Edificio Torre Global, Piso 12, Panamá", 50, 645, 9);

t("Entregar en", 320, 685, 9, bold, muted);
t("Centro de Distribución Juan Díaz", 320, 670, 10, bold);
t("Bodega 4, Rampa 7", 320, 657, 9);
t("Horario de recibo: 7:00 a 15:00", 320, 645, 9);

const cols = { desc: 50, qty: 330, unit: 380, price: 450, total: 545 };
let y = 610;
page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
t("Descripción", cols.desc + 4, y, 9, bold);
tr("Cant.", cols.qty + 20, y, 9, bold);
t("Unidad", cols.unit, y, 9, bold);
tr("Precio unit.", cols.price + 30, y, 9, bold);
tr("Total", cols.total - 4, y, 9, bold);
y -= 26;

// The agreed prices. The invoice will differ on two of these and skip one.
const PO_ITEMS = [
  ["Arroz grano largo premium 20 lb", 120, "saco", 18.5],
  ["Aceite vegetal 3.78 L", 48, "caja x4", 22.4],
  ["Atún en agua 170 g", 300, "unidad", 1.15],
  ["Detergente en polvo 5 kg", 36, "bolsa", 9.9],
  ["Papel higiénico 12 rollos doble hoja", 60, "paquete", 6.75],
  ["Agua purificada 500 ml (fardo x24)", 80, "fardo", 5.6],
];
let subtotal = 0;
for (const [d, q, u, p] of PO_ITEMS) {
  const tot = q * p;
  subtotal += tot;
  t(d, cols.desc + 4, y, 9.5);
  tr(String(q), cols.qty + 20, y, 9.5);
  t(u, cols.unit, y, 9.5);
  tr(`B/. ${p.toFixed(2)}`, cols.price + 30, y, 9.5);
  tr(`B/. ${tot.toFixed(2)}`, cols.total - 4, y, 9.5);
  page.drawLine({ start: { x: 50, y: y - 7 }, end: { x: 545, y: y - 7 }, thickness: 0.4, color: line });
  y -= 22;
}
const itbms = Math.round(subtotal * 0.07 * 100) / 100;
const total = subtotal + itbms;
y -= 6;
tr("Subtotal", cols.price + 30, y, 10);
tr(`B/. ${subtotal.toFixed(2)}`, cols.total - 4, y, 10);
y -= 16;
tr("ITBMS 7%", cols.price + 30, y, 10);
tr(`B/. ${itbms.toFixed(2)}`, cols.total - 4, y, 10);
y -= 20;
tr("TOTAL", cols.price + 30, y, 11, bold);
tr(`B/. ${total.toFixed(2)}`, cols.total - 4, y, 11, bold);

y -= 40;
t("Observaciones", 50, y, 9, bold, muted);
y -= 14;
t("Precios acordados según lista vigente de septiembre 2026. Facturar con referencia a esta orden.", 50, y, 9);
y -= 13;
t("Autorizado por: Gerencia de Compras.", 50, y, 9);

t("Documento de ejemplo generado por Tavnit para probar la comparación. Empresa y datos ficticios.", 50, 60, 8, font, muted);

const bytes = await doc.save();
mkdirSync("public/lite", { recursive: true });
writeFileSync("public/lite/sample-po.pdf", bytes);
console.log("wrote public/lite/sample-po.pdf", bytes.length, "bytes; total", total.toFixed(2));
