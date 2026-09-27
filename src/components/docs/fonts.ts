import { Fraunces } from "next/font/google";

/**
 * The display serif behind the brand's second voice ("Lite", "Admin",
 * "Docs"): Fraunces italic, only for the mark next to the logo.
 */
export const docsDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-display",
  display: "swap",
});
