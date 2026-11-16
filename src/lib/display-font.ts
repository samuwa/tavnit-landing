import { Fraunces } from "next/font/google";

/**
 * The brand's second voice: Fraunces italic, the serif of the "Lite" and
 * "Pro" marks. On the homepage it sets "Structured Data" in the hero and
 * "Pro" in the story's heading, so the brand marks and the headline speak
 * the same way. (The Lite pages load their own instance, with the upright
 * style too.)
 *
 * Italic only, two weights: about the size of one small image. Preloaded,
 * because it is in the hero's H1, the page's largest text; next/font also
 * generates a size-matched fallback, so the swap does not move the line.
 */
export const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-display",
  display: "swap",
});
