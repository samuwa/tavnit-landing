import type { Metadata } from "next";
import SquaresBackground from "@/components/SquaresBackground";
import NotFoundView from "@/components/NotFoundView";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Spanish 404. Reached two ways: a Spanish dynamic route calling notFound()
 * (an unknown use-case or guide slug), and any other unknown URL under /es
 * via the [...rest] catch-all next to this file. Without the catch-all,
 * unmatched Spanish URLs would fall through to the English root 404.
 */

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default async function SpanishNotFound() {
  const stripeOn = await isStripeEnabled();
  return (
    <>
      <SquaresBackground />
      <NotFoundView locale="es" stripeOn={stripeOn} />
    </>
  );
}
