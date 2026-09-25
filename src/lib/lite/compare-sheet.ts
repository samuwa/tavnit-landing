import type { CompareResult } from "@/lib/lite/compare";
import type { CompareCopy } from "@/lib/lite/copy-base";

/** A comparison as spreadsheet columns and rows, in the page's language. */
export function compareSheet(result: CompareResult, copy: CompareCopy): { columns: string[]; rows: Record<string, unknown>[] } {
  const { labels, status } = copy;
  if (result.kind === "po") {
    const [ref, doc] = result.docs;
    const columns = [
      labels.description,
      `${labels.quantity} (${ref.label})`,
      `${labels.quantity} (${doc.label})`,
      `${labels.price} (${ref.label})`,
      `${labels.price} (${doc.label})`,
      `${labels.total} (${ref.label})`,
      `${labels.total} (${doc.label})`,
      labels.status,
    ];
    const rows = result.lines.map((l) => ({
      [columns[0]]: l.description,
      [columns[1]]: l.ref?.qty ?? null,
      [columns[2]]: l.doc?.qty ?? null,
      [columns[3]]: l.ref?.price ?? null,
      [columns[4]]: l.doc?.price ?? null,
      [columns[5]]: l.ref?.total ?? null,
      [columns[6]]: l.doc?.total ?? null,
      [columns[7]]: status[l.status],
    }));
    return { columns, rows };
  }
  const columns = [labels.description, ...result.suppliers.map((s) => `${labels.price} (${s.label})`), labels.champion];
  const rows = result.lines.map((l) => {
    const o: Record<string, unknown> = { [columns[0]]: l.description };
    result.suppliers.forEach((s, i) => {
      o[`${labels.price} (${s.label})`] = l.prices[i];
    });
    o[labels.champion] = l.champion.map((i) => result.suppliers[i].label).join(", ");
    return o;
  });
  return { columns, rows };
}

