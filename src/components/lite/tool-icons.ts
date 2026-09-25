import {
  CalendarClock,
  CalendarDays,
  Hash,
  WandSparkles,
  FileSpreadsheet,
  GitCompareArrows,
  Package,
  Receipt,
  Rows3,
  Scale,
  Scissors,
  Ship,
  type LucideIcon,
} from "lucide-react";
import type { LiteToolId, LiteToolKind } from "@/lib/lite/tools";

/** One icon per free tool, shared by the hub grid and the header menu. */
export const TOOL_ICONS: Partial<Record<LiteToolId, LucideIcon>> = {
  "invoice-to-excel": FileSpreadsheet,
  "invoice-line-items": Rows3,
  "po-invoice-check": GitCompareArrows,
  "quote-comparison": Scale,
  "split-scanned-pdf": Scissors,
  "packing-list-to-excel": Package,
  "bill-of-lading-to-excel": Ship,
  "contract-dates": CalendarClock,
  "receipt-to-excel": Receipt,
  "number-format": Hash,
  "date-format": CalendarDays,
};
export const KIND_ICON: Record<LiteToolKind, LucideIcon> = { extract: FileSpreadsheet, compare: GitCompareArrows, split: Scissors, clean: WandSparkles };
/** Tile colours: blue for extraction, violet for comparing, ink for the splitter, amber for spreadsheets. */
export const KIND_TILE: Record<LiteToolKind, string> = {
  extract: "bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]",
  compare: "bg-[var(--lite-violet-soft)] text-[var(--lite-violet)]",
  split: "bg-[#eef1f4] text-[var(--lite-ink)]",
  clean: "bg-[#fdf3e3] text-[#a4580b]",
};
export const KIND_ORDER: LiteToolKind[] = ["extract", "compare", "split", "clean"];
