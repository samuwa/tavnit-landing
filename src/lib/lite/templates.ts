import "server-only";

import { buildWorkbook, cell } from "@/lib/lite/excel";
import { SITE_URL, APP_URL } from "@/lib/site";
import type { Locale } from "@/lib/locale";
import { LITE_TOOLS, type LiteToolId } from "@/lib/lite/tools";

/**
 * Blank, downloadable templates of the documents the free tools read.
 *
 * Search Console shows that a good share of the people who land on the
 * packing list tool are looking for a format to fill in ("packing list
 * modelo excel", "formato de packing list para descargar"), not a converter.
 * The template answers that search; its second sheet is the converter's
 * pitch. Free and ungated: a gated template is a template nobody links to.
 */

const LINES = 15;

export function buildPackingListTemplate(locale: Locale): Uint8Array {
  const es = locale === "es";
  const t = (esText: string, enText: string) => (es ? esText : enText);
  const label = (s: string) => cell(s, { bold: true });

  const headerRow = 10;
  const first = headerRow + 1;
  const last = first + LINES - 1;
  const sum = (col: string) => cell(null, { formula: `SUM(${col}${first}:${col}${last})`, bold: true });

  const rows: unknown[][] = [
    [cell(t("PACKING LIST / LISTA DE EMPAQUE", "PACKING LIST"), { bold: true })],
    [],
    [label(t("Exportador", "Shipper")), "", "", label(t("Consignatario", "Consignee")), ""],
    [label(t("Dirección", "Address")), "", "", label(t("Dirección", "Address")), ""],
    [label(t("Nº de packing list", "Packing list no.")), "", "", label(t("Fecha", "Date")), ""],
    [label(t("Factura relacionada", "Related invoice")), "", "", label("Incoterm"), ""],
    [label(t("Puerto de carga", "Port of loading")), "", "", label(t("Puerto de descarga", "Port of discharge")), ""],
    [label(t("Buque / viaje", "Vessel / voyage")), "", "", label(t("Contenedor / sello", "Container / seal")), ""],
    [],
    [
      "Nº",
      t("Descripción de la mercancía", "Description of goods"),
      t("Cantidad", "Quantity"),
      t("Unidad", "Unit"),
      t("Bultos", "Packages"),
      t("Tipo de bulto", "Package type"),
      t("Peso neto (kg)", "Net weight (kg)"),
      t("Peso bruto (kg)", "Gross weight (kg)"),
      t("Dimensiones (cm)", "Dimensions (cm)"),
      t("Marcas", "Marks"),
    ],
    ...Array.from({ length: LINES }, (_, i) => [i + 1, "", "", "", "", "", "", "", "", ""]),
    ["", label(t("Totales", "Totals")), sum("C"), "", sum("E"), "", sum("G"), sum("H"), "", ""],
    [],
    [label(t("Observaciones", "Remarks"))],
    [],
    [label(t("Firma y sello del exportador", "Shipper's signature and stamp"))],
  ];

  const tool = LITE_TOOLS["packing-list-to-excel"];
  const toolUrl = `${SITE_URL}${tool.paths[locale]}`;
  const stamp: unknown[][] = [
    [t("Plantilla de packing list de Tavnit", "Tavnit packing list template")],
    [t("Descargada el", "Downloaded on"), new Date().toISOString().slice(0, 10)],
    [],
    [
      t(
        "Si el packing list ya te llega de tu proveedor en PDF o foto, no lo copies a mano: súbelo y recíbelo en este mismo formato, gratis.",
        "If the packing list already reaches you from a supplier as a PDF or photo, don't retype it: upload it and get it back in this same format, free.",
      ),
    ],
    [toolUrl],
    [],
    [
      t(
        "Para que pase solo con cada embarque (por correo, API, Zapier, Make o n8n), con revisión antes de declarar:",
        "To make it happen on every shipment (email, API, Zapier, Make or n8n), with review before anything is declared:",
      ),
    ],
    [APP_URL],
  ];

  return buildWorkbook([
    {
      name: t("Packing list", "Packing list"),
      rows,
      widths: [20, 38, 10, 10, 18, 14, 14, 16, 16, 14],
      boldRows: [headerRow],
    },
    { name: "Tavnit", rows: [["Tavnit"], ...stamp], widths: [90, 16], boldRows: [1] },
  ]);
}

export interface LiteTemplate {
  build: (locale: Locale) => Uint8Array;
  filename: Record<Locale, string>;
}

/** Tools that offer a template; the page shows the block only when its copy has one. */
export const TEMPLATES: Partial<Record<LiteToolId, LiteTemplate>> = {
  "packing-list-to-excel": {
    build: buildPackingListTemplate,
    filename: { es: "plantilla-packing-list-tavnit.xlsx", en: "packing-list-template-tavnit.xlsx" },
  },
};
