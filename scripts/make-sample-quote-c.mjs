// Sample quote C: same request, third supplier; no gravel on offer.
// Run: node scripts/make-sample-quote-c.mjs
import { rgb } from "pdf-lib";
import { writeQuote } from "./lib/quote-pdf.mjs";

await writeQuote("public/lite/sample-quote-c.pdf", {
  supplier: "Depósito La Chorrera, S.A.",
  address: "Carretera Panamericana km 36, La Chorrera",
  ruc: "2-778-1102 DV 33",
  email: "ventas@depositolachorrera.example",
  number: "CT-2026-1188",
  date: "16/09/2026",
  validUntil: "10/10/2026",
  terms: "Contado",
  leadTime: "Inmediata (retiro en depósito) o 7 días a obra",
  currency: "USD",
  accent: rgb(0.62, 0.32, 0.18),
  items: [
    ["Cemento gris tipo I, saco 42.5 kg", 200, "saco", 9.95],
    ["Varilla corrugada 3/8\" de 6 metros", 350, "unidad", 6.2],
    ["Bloque de concreto de 6\"", 1200, "unidad", 0.95],
    ["Arena lavada (m3)", 18, "m3", 30.0],
    ["Alambre de amarre cal. 16 x 20 kg", 25, "rollo", 28.4],
  ],
  notes: ["No manejamos piedra triturada en este momento.", "Precios de contado; no incluyen transporte a obra."],
  signer: "Rogelio Batista, Gerente",
});
