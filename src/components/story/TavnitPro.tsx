import { LogoMark } from "@/components/lite/LogoMark";

/**
 * The Tavnit Pro lockup: the mark, "Tavnit", a hairline, then "Pro" in the
 * display serif's italic with the brand's blue-to-violet running through
 * it. The same construction as the "Lite" mark on the free tools, so the
 * two read as one family: Lite is the way in, Pro is the full product.
 *
 * Sized in em, so it sits inside a heading at the heading's size. Needs
 * --font-display (Fraunces) on an ancestor.
 */
export default function TavnitPro({ mark = 30 }: { mark?: number }) {
  return (
    <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap align-bottom">
      <LogoMark size={mark} className="shrink-0" />
      <span>Tavnit</span>
      {/* A real space: flex drops it on screen, but the heading's text must
          read "Tavnit Pro", not "TavnitPro". */}
      {" "}
      <span className="mx-[0.06em] h-[0.72em] w-px bg-tint/25" aria-hidden />
      <span
        className="bg-clip-text pr-[0.08em] italic text-transparent"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontWeight: 500,
          backgroundImage: "linear-gradient(100deg, #3b82f6 0%, #6c42f0 85%)",
          letterSpacing: "-0.01em",
        }}
      >
        Pro
      </span>
    </span>
  );
}
