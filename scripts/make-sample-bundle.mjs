// Generates public/lite/sample-bundle.pdf — the "try it without a file"
// bundle for /tools/split-scanned-pdf: seven pages scanned together the way
// a back office does it — an invoice (2 pages), a purchase order, a packing
// list, a till receipt and a contract excerpt (2 pages). Fictional companies.
// Run: node scripts/make-sample-bundle.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const doc = await PDFDocument.create();
const font = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const mono = await doc.embedFont(StandardFonts.Courier);
const ink = rgb(0.12, 0.12, 0.16);
const muted = rgb(0.45, 0.45, 0.5);
const line = rgb(0.82, 0.82, 0.86);
const A4 = [595.28, 841.89];

function newPage() {
  const page = doc.addPage(A4);
  // a faint scanner edge shadow so the pages read as scans
  page.drawRectangle({ x: 0, y: 0, width: 6, height: A4[1], color: rgb(0.9, 0.9, 0.92) });
  const t = (text, x, y, size = 10, f = font, color = ink) => page.drawText(text, { x, y, size, font: f, color });
  const tr = (text, xRight, y, size = 10, f = font, color = ink) =>
    page.drawText(text, { x: xRight - f.widthOfTextAtSize(text, size), y, size, font: f, color });
  const hr = (y) => page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 0.8, color: line });
  return { page, t, tr, hr };
}

// ---------- 1–2. Invoice (two pages) ----------
{
  const { page, t, tr, hr } = newPage();
  t("Distribuidora Istmo, S.A.", 50, 780, 18, bold);
  t("RUC 155612345-2-2019 DV 41", 50, 762, 9, font, muted);
  t("Calle 50, Edificio Torre Global, Piso 12, Panamá", 50, 750, 9, font, muted);
  tr("FACTURA", 545, 780, 18, bold);
  tr("No. FAC-2026-004512", 545, 762, 10);
  tr("Fecha: 18/09/2026", 545, 748, 10);
  tr("Orden de compra: OC-8834", 545, 734, 10);
  hr(715);
  t("Facturar a", 50, 695, 9, bold, muted);
  t("Supermercados El Rey Panamá, S.A.", 50, 680, 10, bold);
  t("RUC 1234-567-89012 DV 12", 50, 667, 9);
  t("Vía Israel, San Francisco, Ciudad de Panamá", 50, 655, 9);
  let y = 620;
  page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
  t("Descripción", 54, y, 9, bold);
  tr("Cant.", 350, y, 9, bold);
  tr("Precio unit.", 460, y, 9, bold);
  tr("Total", 541, y, 9, bold);
  y -= 26;
  const items = [
    ["Arroz grano largo premium 20 lb", 120, 18.5],
    ["Aceite vegetal 3.78 L (caja x4)", 48, 22.4],
    ["Atún en agua 170 g", 300, 1.15],
    ["Detergente en polvo 5 kg", 36, 9.9],
    ["Papel higiénico 12 rollos doble hoja", 60, 6.75],
    ["Agua purificada 500 ml (fardo x24)", 80, 5.6],
    ["Café molido 400 g", 90, 4.35],
    ["Azúcar refinada 2 kg", 150, 2.1],
    ["Harina de trigo 5 lb", 110, 1.85],
    ["Leche evaporada 370 g (caja x24)", 40, 27.9],
    ["Jabón de baño 3 pack", 75, 2.95],
    ["Cloro 3.78 L", 64, 3.2],
  ];
  let subtotal = 0;
  for (const [d, q, p] of items) {
    const tot = q * p;
    subtotal += tot;
    t(d, 54, y, 9.5);
    tr(String(q), 350, y, 9.5);
    tr(p.toFixed(2), 460, y, 9.5);
    tr(tot.toFixed(2), 541, y, 9.5);
    y -= 20;
  }
  t("Continúa en la página 2", 54, 60, 8, font, muted);
  tr("Página 1 de 2", 545, 60, 8, font, muted);

  const p2 = newPage();
  p2.t("Distribuidora Istmo, S.A. — Factura FAC-2026-004512 (continuación)", 50, 780, 11, bold);
  p2.hr(768);
  let y2 = 740;
  const more = [
    ["Galletas saladas 500 g", 70, 2.4],
    ["Pasta espagueti 1 kg", 95, 1.7],
  ];
  for (const [d, q, p] of more) {
    const tot = q * p;
    subtotal += tot;
    p2.t(d, 54, y2, 9.5);
    p2.tr(String(q), 350, y2, 9.5);
    p2.tr(p.toFixed(2), 460, y2, 9.5);
    p2.tr(tot.toFixed(2), 541, y2, 9.5);
    y2 -= 20;
  }
  p2.hr(y2 + 8);
  const tax = subtotal * 0.07;
  p2.tr("Subtotal", 460, y2 - 14, 10);
  p2.tr(subtotal.toFixed(2), 541, y2 - 14, 10);
  p2.tr("ITBMS 7%", 460, y2 - 32, 10);
  p2.tr(tax.toFixed(2), 541, y2 - 32, 10);
  p2.tr("TOTAL USD", 460, y2 - 54, 12, bold);
  p2.tr((subtotal + tax).toFixed(2), 541, y2 - 54, 12, bold);
  p2.t("Condiciones: crédito 30 días. Pago por ACH a Banco General, cuenta 04-01-01-123456-7.", 50, y2 - 100, 9, font, muted);
  p2.t("Gracias por su compra.", 50, y2 - 116, 9, font, muted);
  p2.tr("Página 2 de 2", 545, 60, 8, font, muted);
}

// ---------- 3. Purchase order ----------
{
  const { page, t, tr, hr } = newPage();
  t("Supermercados El Rey Panamá, S.A.", 50, 780, 16, bold);
  t("Departamento de Compras · compras@elrey.example", 50, 762, 9, font, muted);
  tr("ORDEN DE COMPRA", 545, 780, 18, bold);
  tr("PO No. OC-8834", 545, 762, 10);
  tr("Fecha: 10/09/2026", 545, 748, 10);
  hr(730);
  t("Proveedor", 50, 708, 9, bold, muted);
  t("Distribuidora Istmo, S.A.", 50, 693, 10, bold);
  t("RUC 155612345-2-2019 DV 41", 50, 680, 9);
  t("Entregar en", 320, 708, 9, bold, muted);
  t("Centro de Distribución Juan Díaz, Bodega 4", 320, 693, 10, bold);
  t("Fecha requerida: 20/09/2026 · Condiciones: crédito 30 días", 320, 680, 9);
  let y = 640;
  page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
  t("Artículo", 54, y, 9, bold);
  tr("Cantidad", 350, y, 9, bold);
  tr("Precio acordado", 460, y, 9, bold);
  tr("Importe", 541, y, 9, bold);
  y -= 26;
  const items = [
    ["Arroz grano largo premium 20 lb", 120, 18.5],
    ["Aceite vegetal 3.78 L (caja x4)", 48, 22.4],
    ["Atún en agua 170 g", 300, 1.1],
    ["Detergente en polvo 5 kg", 36, 9.9],
    ["Papel higiénico 12 rollos doble hoja", 60, 6.75],
    ["Agua purificada 500 ml (fardo x24)", 80, 5.6],
  ];
  let total = 0;
  for (const [d, q, p] of items) {
    total += q * p;
    t(d, 54, y, 9.5);
    tr(String(q), 350, y, 9.5);
    tr(p.toFixed(2), 460, y, 9.5);
    tr((q * p).toFixed(2), 541, y, 9.5);
    y -= 20;
  }
  hr(y + 8);
  tr("Total orden USD (sin ITBMS)", 460, y - 14, 10, bold);
  tr(total.toFixed(2), 541, y - 14, 10, bold);
  t("Solicitado por: L. Morales", 50, y - 70, 9);
  t("Autorizado por: R. Castillo, Gerente de Compras", 50, y - 84, 9);
  t("Esta orden no constituye factura. Facturar contra recepción conforme.", 50, y - 110, 8, font, muted);
}

// ---------- 4. Packing list ----------
{
  const { page, t, tr, hr } = newPage();
  t("Agroexportadora del Barú, S.A.", 50, 780, 16, bold);
  t("Zona Libre de Colón, Panamá · export@baru.example", 50, 762, 9, font, muted);
  tr("PACKING LIST", 545, 780, 18, bold);
  tr("No. PL-2026-0917", 545, 762, 10);
  tr("Fecha: 17/09/2026", 545, 748, 10);
  tr("Factura relacionada: EXP-2026-0442", 545, 734, 10);
  hr(715);
  t("Consignatario", 50, 695, 9, bold, muted);
  t("Importadora Caribe, S.A.S. · Cartagena, Colombia", 50, 680, 10, bold);
  t("Puerto de carga: Manzanillo (PAMIT) · Puerto de descarga: Cartagena (COCTG)", 50, 665, 9);
  let y = 625;
  page.drawRectangle({ x: 50, y: y - 6, width: 495, height: 20, color: rgb(0.94, 0.94, 0.97) });
  t("Descripción", 54, y, 9, bold);
  tr("Cant.", 300, y, 9, bold);
  tr("Bultos", 360, y, 9, bold);
  tr("Peso neto kg", 450, y, 9, bold);
  tr("Peso bruto kg", 541, y, 9, bold);
  y -= 26;
  const items = [
    ["Café verde arábica, sacos 60 kg", 200, 200, 12000, 12240],
    ["Cacao en grano, sacos 50 kg", 80, 80, 4000, 4096],
    ["Miel de abeja, cajas x12 frascos 500 g", 150, 150, 900, 1020],
    ["Chips de plátano, cajas x24 bolsas 150 g", 120, 120, 432, 504],
  ];
  let b = 0, n = 0, g = 0;
  for (const [d, q, bu, nw, gw] of items) {
    b += bu; n += nw; g += gw;
    t(d, 54, y, 9.5);
    tr(String(q), 300, y, 9.5);
    tr(String(bu), 360, y, 9.5);
    tr(nw.toFixed(1), 450, y, 9.5);
    tr(gw.toFixed(1), 541, y, 9.5);
    y -= 20;
  }
  hr(y + 8);
  t("TOTAL", 54, y - 14, 10, bold);
  tr(String(b), 360, y - 14, 10, bold);
  tr(n.toFixed(1), 450, y - 14, 10, bold);
  tr(g.toFixed(1), 541, y - 14, 10, bold);
  t("Contenedor: MSKU-441702-3 (40' HC) · Sello: PA-778812 · Marcas: IMPCARIBE / CTG / 1-550", 50, y - 60, 9);
}

// ---------- 5. Till receipt (narrow slip on the scanner glass) ----------
{
  const { page, tr } = newPage();
  const x0 = 200, w = 200;
  page.drawRectangle({ x: x0, y: 300, width: w, height: 480, color: rgb(0.985, 0.985, 0.98), borderColor: line, borderWidth: 0.5 });
  const c = (text, y, size = 9, f = mono) => page.drawText(text, { x: x0 + w / 2 - f.widthOfTextAtSize(text, size) / 2, y, size, font: f, color: ink });
  c("FONDA LA CEIBA", 755, 12, bold);
  c("RUC 8-712-2231 DV 05", 741, 8);
  c("Vía Argentina, El Cangrejo", 731, 8);
  c("Panamá", 721, 8);
  c("------------------------------", 708);
  c("18/09/2026  13:42   Mesa 7", 696, 8);
  c("Ticket No. 004417", 685, 8);
  c("------------------------------", 673);
  let y = 660;
  const items = [["2 Sancocho de gallina", "9.00"], ["1 Arroz con pollo", "6.50"], ["1 Ceviche de corvina", "7.50"], ["3 Refresco natural", "6.00"], ["1 Flan de caramelo", "3.50"], ["1 Café", "2.50"]];
  for (const [d, p] of items) {
    page.drawText(d, { x: x0 + 12, y, size: 8, font: mono, color: ink });
    tr(p, x0 + w - 12, y, 8, mono);
    y -= 12;
  }
  c("------------------------------", y);
  y -= 13;
  page.drawText("SUBTOTAL", { x: x0 + 12, y, size: 8, font: mono, color: ink }); tr("35.00", x0 + w - 12, y, 8, mono); y -= 12;
  page.drawText("ITBMS 7%", { x: x0 + 12, y, size: 8, font: mono, color: ink }); tr("2.45", x0 + w - 12, y, 8, mono); y -= 12;
  page.drawText("PROPINA 10%", { x: x0 + 12, y, size: 8, font: mono, color: ink }); tr("3.50", x0 + w - 12, y, 8, mono); y -= 14;
  page.drawText("TOTAL USD", { x: x0 + 12, y, size: 10, font: bold, color: ink }); tr("40.95", x0 + w - 12, y, 10, bold); y -= 16;
  page.drawText("TARJETA VISA ****4417", { x: x0 + 12, y, size: 8, font: mono, color: ink }); y -= 12;
  page.drawText("APROBADO 081233", { x: x0 + 12, y, size: 8, font: mono, color: ink }); y -= 20;
  c("¡Gracias por su visita!", y, 8);
}

// ---------- 6–7. Contract excerpt (two pages) ----------
{
  const clauses = [
    ["CONTRATO DE SERVICIOS DE MANTENIMIENTO", null],
    ["Entre TORRES DEL PACÍFICO, S.A., sociedad anónima inscrita al Folio 155698412, en adelante EL CLIENTE, y SERVITEC PANAMÁ, S.A., inscrita al Folio 155701234, en adelante EL CONTRATISTA, se celebra el presente contrato sujeto a las siguientes cláusulas:", null],
    ["PRIMERA. OBJETO.", "EL CONTRATISTA prestará servicios de mantenimiento preventivo y correctivo de los sistemas de aire acondicionado, bombas de agua y planta eléctrica del edificio Torres del Pacífico, ubicado en Punta Pacífica, Ciudad de Panamá."],
    ["SEGUNDA. PLAZO.", "El contrato tendrá una vigencia de doce (12) meses contados a partir del 1 de octubre de 2026 y hasta el 30 de septiembre de 2027."],
    ["TERCERA. RENOVACIÓN.", "Al vencimiento, el contrato se renovará automáticamente por períodos iguales de doce (12) meses, salvo que cualquiera de las partes notifique por escrito su intención de no renovar con al menos sesenta (60) días calendario de anticipación a la fecha de vencimiento."],
    ["CUARTA. PRECIO.", "EL CLIENTE pagará a EL CONTRATISTA la suma de CUATRO MIL OCHOCIENTOS CINCUENTA DÓLARES (USD 4,850.00) mensuales, más ITBMS, dentro de los treinta (30) días siguientes a la presentación de la factura."],
    ["QUINTA. OBLIGACIONES DEL CONTRATISTA.", "Realizar visitas mensuales programadas, atender emergencias en un plazo máximo de cuatro (4) horas, entregar informes técnicos y mantener vigentes las pólizas de responsabilidad civil."],
    ["SEXTA. TERMINACIÓN.", "Cualquiera de las partes podrá dar por terminado el contrato por incumplimiento grave de la otra, previa notificación escrita y un plazo de subsanación de quince (15) días."],
    ["SÉPTIMA. LEY APLICABLE.", "Este contrato se rige por las leyes de la República de Panamá. Toda controversia se someterá a los tribunales ordinarios de la Ciudad de Panamá."],
    ["OCTAVA. NOTIFICACIONES.", "Las notificaciones se harán por escrito a las direcciones indicadas en el encabezado, con copia por correo electrónico a legal@torrespacifico.example y contratos@servitec.example."],
  ];
  const wrap = (text, maxW, size) => {
    const words = text.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) > maxW) {
        lines.push(cur);
        cur = w;
      } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  };
  let pg = newPage();
  let y = 780;
  for (const [head, body] of clauses) {
    if (y < 330) {
      pg.tr("Página 1 de 2", 545, 60, 8, font, muted);
      pg = newPage();
      y = 780;
    }
    if (body === null) {
      const size = head.startsWith("CONTRATO") ? 14 : 10;
      for (const l of wrap(head, 495, size)) {
        pg.t(l, 50, y, size, head.startsWith("CONTRATO") ? bold : font);
        y -= size + 5;
      }
      y -= 8;
      continue;
    }
    pg.t(head, 50, y, 10, bold);
    y -= 15;
    for (const l of wrap(body, 495, 10)) {
      pg.t(l, 50, y, 10);
      y -= 14;
    }
    y -= 8;
  }
  y -= 20;
  pg.t("En fe de lo cual, las partes firman en la Ciudad de Panamá, el 15 de septiembre de 2026.", 50, y, 10);
  y -= 50;
  pg.t("______________________________", 50, y, 10);
  pg.t("______________________________", 320, y, 10);
  pg.t("Por EL CLIENTE", 50, y - 14, 9, font, muted);
  pg.t("Por EL CONTRATISTA", 320, y - 14, 9, font, muted);
  pg.tr("Página 2 de 2", 545, 60, 8, font, muted);
}

mkdirSync("public/lite", { recursive: true });
const bytes = await doc.save();
writeFileSync("public/lite/sample-bundle.pdf", bytes);
console.log(`wrote public/lite/sample-bundle.pdf (${doc.getPageCount()} pages, ${bytes.length} bytes)`);
