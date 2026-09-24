// Sample quote A for /tools/compare-supplier-quotes. Three suppliers answer
// the same request for construction consumables; wording, prices and terms
// differ, and supplier C leaves one item out. Run: node scripts/make-sample-quote-a.mjs
import { rgb } from "pdf-lib";
import { writeQuote } from "./lib/quote-pdf.mjs";

await writeQuote("public/lite/sample-quote-a.pdf", {
  supplier: "Ferretería Industrial Colón, S.A.",
  address: "Zona Libre de Colón, Calle 13, Local 4, Colón",
  ruc: "8-455-2213 DV 07",
  email: "ventas@fic-colon.example",
  number: "COT-2026-0412",
  date: "15/09/2026",
  validUntil: "15/10/2026",
  terms: "Crédito 30 días",
  leadTime: "5 días hábiles",
  currency: "USD",
  accent: rgb(0.23, 0.39, 0.83),
  items: [
    ["Cemento gris Portland tipo I, saco 42.5 kg", 200, "saco", 9.85],
    ["Varilla de acero corrugado 3/8\" x 6 m", 350, "unidad", 6.4],
    ["Bloque de concreto 6\" (15x20x40 cm)", 1200, "unidad", 0.92],
    ["Arena lavada de río", 18, "m3", 32.5],
    ["Piedra triturada 3/4\"", 15, "m3", 38.0],
    ["Alambre de amarre calibre 16, rollo 20 kg", 25, "rollo", 27.9],
  ],
  notes: ["Precios incluyen descarga en obra dentro de la ciudad de Colón.", "Cotización sujeta a disponibilidad de inventario."],
  signer: "Luis Arosemena, Ventas",
});
