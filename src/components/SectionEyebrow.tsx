/**
 * The small label above a section heading ("Platform tour", "Agents", …).
 *
 * An eyebrow, not a sticker: a short hairline in the brand gradient, then
 * the words in spaced small caps. No pill, no icon, one colour for every
 * section (the old pills mixed blue and green and each carried an icon).
 * `isNew` adds a quiet "New" mark with the gradient in its letters.
 */
export default function SectionEyebrow({
  children,
  isNew = false,
  align = "start",
  className = "mb-5",
}: {
  children: React.ReactNode;
  isNew?: boolean;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-fg-4 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className="h-px w-7 shrink-0 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
      {isNew && (
        <span className="rounded-full border border-[#6c42f0]/30 px-2 py-[3px] text-[10px] leading-none tracking-[0.14em]">
          <span className="bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] bg-clip-text text-transparent">New</span>
        </span>
      )}
      <span>{children}</span>
      {align === "center" && <span className="h-px w-7 shrink-0 bg-gradient-to-l from-[#3b82f6] to-[#6c42f0]" aria-hidden />}
    </p>
  );
}
