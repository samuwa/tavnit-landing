// Sample quote B: same request as quote A, another supplier, other wording.
// Run: node scripts/make-sample-quote-b.mjs
import { rgb } from "pdf-lib";
import { writeQuote } from "./lib/quote-pdf.mjs";

await writeQuote("public/lite/sample-quote-b.pdf", {
  supplier: "Materiales del Istmo, S.A.",
  address: "Vía Tocumen, Parque Industrial Costa Sur, Panamá",
  ruc: "155-702-9981 DV 12",
  email: "cotizaciones@matistmo.example",
  number: "Q-00871",
  date: "16/09/2026",
  validUntil: "30 días",
  terms: "50% anticipo, 50% contra entrega",
  leadTime: "3 días hábiles",
  currency: "USD",
  accent: rgb(0.16, 0.53, 0.42),
  items: [
    ["Cemento Portland tipo I gris, saco de 42.5 kg", 200, "saco", 9.4],
    ["Varilla corrugada grado 60, 3/8 pulg. x 6 m", 350, "unidad", 6.75],
    ["Bloque hueco de concreto 6 pulgadas", 1200, "unidad", 0.88],
    ["Arena de río lavada, metro cúbico", 18, "m3", 34.0],
    ["Piedra 3/4 triturada, metro cúbico", 15, "m3", 36.5],
    ["Alambre de amarre No. 16, rollo 20 kg", 25, "rollo", 26.5],
  ],
  notes: ["Flete a obra incluido para pedidos mayores a USD 5,000.", "Validez de precios: 30 días calendario."],
  signer: "Karina Ortega, Ejecutiva de cuentas",
});
