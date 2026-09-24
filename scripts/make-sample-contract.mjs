// Generates public/lite/sample-contract.pdf — the "try it without a file"
// document for /tools/contract-renewal-date-extractor. A fictional
// maintenance services agreement between two Panamanian companies, with a
// signature date, a 12-month term, automatic renewal, 60-day notice, a
// monthly fee and governing law, so every field has something to find.
// Run: node scripts/make-sample-contract.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const doc = await PDFDocument.create();
const font = await doc.embedFont(StandardFonts.TimesRoman);
const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
const ink = rgb(0.1, 0.1, 0.12);
const W = 595.28;
const H = 841.89;
const M = 64;
const SIZE = 10.5;
const LEAD = 15;

let page = doc.addPage([W, H]);
let y = H - 72;

const newPage = () => {
  page = doc.addPage([W, H]);
  y = H - 72;
};
const wrap = (text, f, size, width) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (f.widthOfTextAtSize(t, size) > width && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
};
const para = (text, { f = font, size = SIZE, after = 8, align = "left" } = {}) => {
  for (const l of wrap(text, f, size, W - 2 * M)) {
    if (y < 80) newPage();
    const x = align === "center" ? (W - f.widthOfTextAtSize(l, size)) / 2 : M;
    page.drawText(l, { x, y, size, font: f, color: ink });
    y -= LEAD;
  }
  y -= after;
};
const heading = (t) => {
  if (y < 110) newPage();
  y -= 4;
  para(t, { f: bold, size: 11, after: 4 });
};

para("CONTRATO DE SERVICIOS DE MANTENIMIENTO", { f: bold, size: 15, after: 4, align: "center" });
para("No. CSM-2026-031", { size: 10, after: 18, align: "center" });

para(
  "Entre los suscritos, TORRES DEL PACÍFICO, S.A., sociedad anónima inscrita en el Registro Público de Panamá al Folio No. 155701234, con domicilio en Calle 50, Ciudad de Panamá, representada por su Gerente General, en adelante EL CLIENTE, por una parte; y SERVITEC PANAMÁ, S.A., sociedad anónima inscrita al Folio No. 155698877, con domicilio en Vía Ricardo J. Alfaro, Ciudad de Panamá, representada por su Presidente, en adelante EL PROVEEDOR, por la otra parte; convienen en celebrar el presente contrato de servicios de mantenimiento, que se regirá por las siguientes cláusulas:",
  { after: 12 },
);

heading("PRIMERA. OBJETO.");
para(
  "EL PROVEEDOR se obliga a prestar a EL CLIENTE los servicios de mantenimiento preventivo y correctivo de los sistemas de aire acondicionado, ascensores y planta eléctrica de emergencia del edificio Torres del Pacífico, ubicado en Calle 50, Ciudad de Panamá, conforme al plan de mantenimiento descrito en el Anexo A, que forma parte integral de este contrato.",
);

heading("SEGUNDA. VIGENCIA.");
para(
  "El presente contrato tendrá una vigencia de doce (12) meses, contados a partir del primero (1) de octubre de dos mil veintiséis (2026) y hasta el treinta (30) de septiembre de dos mil veintisiete (2027).",
);

heading("TERCERA. RENOVACIÓN AUTOMÁTICA.");
para(
  "Al vencimiento del plazo inicial, el contrato se renovará automáticamente por períodos sucesivos de doce (12) meses cada uno, en las mismas condiciones, salvo que cualquiera de las partes comunique a la otra, por escrito y con al menos sesenta (60) días calendario de anticipación a la fecha de vencimiento del período en curso, su decisión de no renovarlo.",
);

heading("CUARTA. PRECIO Y FORMA DE PAGO.");
para(
  "Como contraprestación por los servicios, EL CLIENTE pagará a EL PROVEEDOR la suma de CUATRO MIL OCHOCIENTOS CINCUENTA DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA (US$ 4,850.00) mensuales, más el Impuesto de Transferencia de Bienes Muebles y Servicios (ITBMS) aplicable. EL PROVEEDOR presentará su factura dentro de los primeros cinco (5) días de cada mes, y EL CLIENTE la pagará dentro de los treinta (30) días siguientes a su recepción.",
);
para(
  "Los repuestos y materiales no incluidos en el Anexo A se cotizarán por separado y requerirán aprobación previa y por escrito de EL CLIENTE.",
);

heading("QUINTA. OBLIGACIONES DE EL PROVEEDOR.");
para(
  "EL PROVEEDOR se obliga a: (a) ejecutar los servicios con personal técnico calificado y debidamente identificado; (b) atender las llamadas de emergencia en un plazo máximo de cuatro (4) horas, las veinticuatro (24) horas del día; (c) entregar un informe mensual de las actividades realizadas; (d) mantener vigente una póliza de responsabilidad civil por un mínimo de US$ 100,000.00; y (e) cumplir con las normas de seguridad del edificio.",
);

heading("SEXTA. OBLIGACIONES DE EL CLIENTE.");
para(
  "EL CLIENTE se obliga a: (a) permitir el acceso del personal de EL PROVEEDOR a las áreas objeto de mantenimiento; (b) pagar puntualmente el precio convenido; y (c) informar oportunamente cualquier falla o anomalía que detecte en los equipos.",
);

heading("SÉPTIMA. TERMINACIÓN ANTICIPADA.");
para(
  "Cualquiera de las partes podrá dar por terminado el presente contrato antes de su vencimiento, sin responsabilidad, mediante aviso escrito a la otra parte con al menos sesenta (60) días calendario de anticipación. El incumplimiento grave de cualquiera de las obligaciones aquí pactadas, no subsanado dentro de los quince (15) días siguientes al requerimiento escrito, dará derecho a la parte afectada a terminar el contrato de inmediato.",
);

heading("OCTAVA. CONFIDENCIALIDAD.");
para(
  "Las partes se obligan a mantener en estricta confidencialidad toda la información técnica, comercial o de cualquier otra índole a la que tengan acceso con ocasión de este contrato, durante su vigencia y por dos (2) años después de su terminación.",
);

heading("NOVENA. LEY APLICABLE Y JURISDICCIÓN.");
para(
  "Este contrato se rige por las leyes de la República de Panamá. Toda controversia derivada del mismo será sometida a los tribunales ordinarios de la Ciudad de Panamá, con renuncia expresa a cualquier otro fuero.",
);

heading("DÉCIMA. NOTIFICACIONES.");
para(
  "Toda notificación entre las partes se hará por escrito a las direcciones indicadas en el encabezado o a los correos electrónicos administracion@torresdelpacifico.example y contratos@servitec.example.",
);

y -= 6;
para(
  "En fe de lo cual, las partes firman el presente contrato en dos (2) ejemplares de un mismo tenor, en la Ciudad de Panamá, a los quince (15) días del mes de septiembre de dos mil veintiséis (2026).",
  { after: 40 },
);

if (y < 140) newPage();
const sigY = y;
page.drawLine({ start: { x: M, y: sigY }, end: { x: M + 200, y: sigY }, thickness: 0.8, color: ink });
page.drawLine({ start: { x: W - M - 200, y: sigY }, end: { x: W - M, y: sigY }, thickness: 0.8, color: ink });
page.drawText("Por EL CLIENTE", { x: M, y: sigY - 14, size: 9.5, font: bold, color: ink });
page.drawText("Torres del Pacífico, S.A.", { x: M, y: sigY - 27, size: 9.5, font, color: ink });
page.drawText("Gerente General", { x: M, y: sigY - 40, size: 9.5, font, color: ink });
page.drawText("Por EL PROVEEDOR", { x: W - M - 200, y: sigY - 14, size: 9.5, font: bold, color: ink });
page.drawText("Servitec Panamá, S.A.", { x: W - M - 200, y: sigY - 27, size: 9.5, font, color: ink });
page.drawText("Presidente", { x: W - M - 200, y: sigY - 40, size: 9.5, font, color: ink });

// footer page numbers
const pages = doc.getPages();
pages.forEach((p, i) => {
  p.drawText(`CSM-2026-031 · Página ${i + 1} de ${pages.length}`, { x: M, y: 40, size: 8, font, color: rgb(0.45, 0.45, 0.5) });
});

mkdirSync("public/lite", { recursive: true });
writeFileSync("public/lite/sample-contract.pdf", await doc.save());
console.log(`wrote public/lite/sample-contract.pdf (${pages.length} pages)`);
