// Shared drawer for the three sample quotes (scripts/make-sample-quote-*.mjs):
// one A4 page, a supplier header, the request being answered, a line table
// and the totals, so the three files differ only in what a real quote
// differs in: wording, prices, terms.
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function writeQuote(file, q) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.12, 0.12, 0.16);
  const muted = rgb(0.45, 0.45, 0.5);
  const line = rgb(0.82, 0.82, 0.86);
  const accent = q.accent ?? rgb(0.23, 0.39, 0.83);
  const t = (text, x, y, size = 10, f = font, color = ink) => page.drawText(text, { x, y, size, font: f, color });
  const tr = (text, xRight, y, size = 10, f = font, color = ink) =>
    page.drawText(text, { x: xRight - f.widthOfTextAtSize(text, size), y, size, font: f, color });
  const money = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  page.drawRectangle({ x: 0, y: 800, width: 595.28, height: 42, color: accent });
  t(q.supplier, 50, 815, 16, bold, rgb(1, 1, 1));
  tr("COTIZACIÓN", 545, 815, 14, bold, rgb(1, 1, 1));
  t(q.address, 50, 780, 9, font, muted);
  t(`RUC ${q.ruc} · ${q.email}`, 50, 768, 9, font, muted);
  tr(`No. ${q.number}`, 545, 780, 10);
  tr(`Fecha: ${q.date}`, 545, 766, 10);
  tr(`Válida hasta: ${q.validUntil}`, 545, 752, 10);
  page.drawLine({ start: { x: 50, y: 740 }, end: { x: 545, y: 740 }, thickness: 0.8, color: line });

  t("Cliente", 50, 720, 9, bold, muted);
  t("Constructora Altos de Panamá, S.A.", 50, 706, 10, bold);
  t("Solicitud de cotización SC-2026-118 · Obra: Torre Marbella, fase 2", 50, 693, 9);
  t("Condiciones", 320, 720, 9, bold, muted);
  t(`Forma de pago: ${q.terms}`, 320, 706, 9);
  t(`Tiempo de entrega: ${q.leadTime}`, 320, 693, 9);
  t(`Moneda: ${q.currency}`, 320, 680, 9);

  const cols = { desc: 50, qty: 335, unit: 370, price: 455, total: 545 };
  let y = 650;
  page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
  t("Descripción", cols.desc + 4, y, 9, bold);
  tr("Cant.", cols.qty + 20, y, 9, bold);
  t("Unidad", cols.unit, y, 9, bold);
  tr("Precio unit.", cols.price + 20, y, 9, bold);
  tr("Total", cols.total - 4, y, 9, bold);
  y -= 26;
  let subtotal = 0;
  for (const [d, qty, u, p] of q.items) {
    const total = Math.round(qty * p * 100) / 100;
    subtotal += total;
    t(d, cols.desc + 4, y, 9.5);
    tr(String(qty), cols.qty + 20, y, 9.5);
    t(u, cols.unit, y, 9.5);
    tr(money(p), cols.price + 20, y, 9.5);
    tr(money(total), cols.total - 4, y, 9.5);
    page.drawLine({ start: { x: 50, y: y - 8 }, end: { x: 545, y: y - 8 }, thickness: 0.4, color: line });
    y -= 22;
  }
  y -= 8;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  tr("Subtotal", cols.price + 20, y, 10);
  tr(money(subtotal), cols.total - 4, y, 10);
  y -= 16;
  tr("ITBMS 7%", cols.price + 20, y, 10);
  tr(money(tax), cols.total - 4, y, 10);
  y -= 18;
  tr("TOTAL", cols.price + 20, y, 11, bold);
  tr(`${q.currency} ${money(subtotal + tax)}`, cols.total - 4, y, 11, bold);
  y -= 40;
  for (const n of q.notes) {
    t(n, 50, y, 8.5, font, muted);
    y -= 12;
  }
  t(`${q.signer} · ${q.supplier}`, 50, 80, 9, bold);
  t("Este documento es una cotización y no constituye factura.", 50, 66, 8, font, muted);

  mkdirSync("public/lite", { recursive: true });
  writeFileSync(file, await doc.save());
  console.log(`wrote ${file} (${q.items.length} lines, total ${money(subtotal + tax)})`);
}
