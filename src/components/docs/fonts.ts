import { Fraunces } from "next/font/google";

/**
 * The display serif of the docs, as on Tavnit Lite: upright for page and
 * section titles, italic for the "Docs" mark beside the logo and the step
 * numerals.
 */
export const docsDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
