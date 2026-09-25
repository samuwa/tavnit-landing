import "server-only";

import type { Locale } from "@/lib/locale";
import type { LiteToolId } from "@/lib/lite/tools";
import type { Cell } from "@/lib/lite/rows";
import type { CompareResult } from "@/lib/lite/compare";
import type { SegmentView } from "@/lib/lite/split-view";
import invoiceToExcelES from "@/lib/lite/samples/invoice-to-excel.es.json";
import invoiceToExcelEN from "@/lib/lite/samples/invoice-to-excel.en.json";
import packingListToExcelES from "@/lib/lite/samples/packing-list-to-excel.es.json";
import packingListToExcelEN from "@/lib/lite/samples/packing-list-to-excel.en.json";
import billOfLadingToExcelES from "@/lib/lite/samples/bill-of-lading-to-excel.es.json";
import billOfLadingToExcelEN from "@/lib/lite/samples/bill-of-lading-to-excel.en.json";
import contractDatesES from "@/lib/lite/samples/contract-dates.es.json";
import contractDatesEN from "@/lib/lite/samples/contract-dates.en.json";
import receiptToExcelES from "@/lib/lite/samples/receipt-to-excel.es.json";
import receiptToExcelEN from "@/lib/lite/samples/receipt-to-excel.en.json";
import poInvoiceCheckES from "@/lib/lite/samples/po-invoice-check.es.json";
import poInvoiceCheckEN from "@/lib/lite/samples/po-invoice-check.en.json";
import quoteComparisonES from "@/lib/lite/samples/quote-comparison.es.json";
import quoteComparisonEN from "@/lib/lite/samples/quote-comparison.en.json";
import splitScannedPdf from "@/lib/lite/samples/split-scanned-pdf.json";

/**
 * The recorded result of each tool's bundled sample.
 *
 * Same document in, same result out: running the sample on every click
 * would spend a document of the visitor's quota and the Lite org's credits
 * to show them something we already know. So each sample was run once
 * through the real engine (scripts/record-lite-samples.mjs) and the page
 * plays it back, with the same progress it shows for a real upload.
 * Re-record whenever a Flow, Matcher or Splitter behind a sample changes.
 */

export type SampleFixture =
  | { kind: "extract"; seconds: number; columns: string[]; rows: Record<string, Cell>[]; total: number; truncated: boolean; pages: number; mime: string }
  | { kind: "compare"; seconds: number; result: CompareResult }
  | { kind: "split"; seconds: number; segments: SegmentView[]; pages: number };

const FIXTURES: Partial<Record<LiteToolId, Record<Locale, SampleFixture>>> = {
  "invoice-to-excel": { es: invoiceToExcelES as SampleFixture, en: invoiceToExcelEN as SampleFixture },
  "invoice-line-items": { es: invoiceToExcelES as SampleFixture, en: invoiceToExcelEN as SampleFixture },
  "packing-list-to-excel": { es: packingListToExcelES as SampleFixture, en: packingListToExcelEN as SampleFixture },
  "bill-of-lading-to-excel": { es: billOfLadingToExcelES as SampleFixture, en: billOfLadingToExcelEN as SampleFixture },
  "contract-dates": { es: contractDatesES as SampleFixture, en: contractDatesEN as SampleFixture },
  "receipt-to-excel": { es: receiptToExcelES as SampleFixture, en: receiptToExcelEN as SampleFixture },
  "po-invoice-check": { es: poInvoiceCheckES as SampleFixture, en: poInvoiceCheckEN as SampleFixture },
  "quote-comparison": { es: quoteComparisonES as SampleFixture, en: quoteComparisonEN as SampleFixture },
  "split-scanned-pdf": { es: splitScannedPdf as SampleFixture, en: splitScannedPdf as SampleFixture },
};

/** The recording for a tool's sample, with the real run ids it was made from blanked. */
export function sampleFixture(tool: LiteToolId, locale: Locale): SampleFixture | null {
  const f = FIXTURES[tool]?.[locale];
  if (!f) return null;
  if (f.kind !== "compare") return f;
  const r = f.result;
  const blank = <T extends { runId: string }>(xs: T[]) => xs.map((x, i) => ({ ...x, runId: `sample-${i}` }));
  return { ...f, result: r.kind === "po" ? { ...r, docs: blank(r.docs) } : { ...r, suppliers: blank(r.suppliers) } };
}
