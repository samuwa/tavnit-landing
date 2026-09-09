import type { Metadata } from "next";
import SquaresBackground from "@/components/SquaresBackground";
import NotFoundView from "@/components/NotFoundView";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Site-wide 404. Next serves it with a real 404 status, so it is never
 * indexed; the point is what a person (or a crawler following a stale link)
 * finds instead of a blank error: the site's shell, and one click back into
 * the pages that matter. Spanish URLs get src/app/es/not-found.tsx instead.
 */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const stripeOn = await isStripeEnabled();
  return (
    <>
      <SquaresBackground />
      <NotFoundView locale="en" stripeOn={stripeOn} />
    </>
  );
}
