/**
 * One scroll-reveal for the whole landing, so every section arrives the same
 * way: a short rise (12px, not 20-30) on a strong ease-out. Long travel reads
 * as floaty; one curve everywhere is what makes the page feel like one piece.
 *
 * Spread onto a motion element: <motion.div {...reveal(0.1)} />
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -60px 0px" },
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  } as const;
}
