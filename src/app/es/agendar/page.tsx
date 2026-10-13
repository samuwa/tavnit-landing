import SchedulePage, { scheduleMetadata } from "@/components/SchedulePage";

/**
 * Spanish twin of /schedule. Same form, same API route, same Calendly — only
 * the UI strings change. Every CTA on the Spanish pages lands here, so a
 * Spanish visitor never has to fill in an English form to talk to sales.
 */

/** ISR so a booking-link change in tavnit-admin → Settings shows up within
 *  minutes without a redeploy. */
export const revalidate = 300;

export const metadata = scheduleMetadata("es");

export default function SpanishSchedulePage() {
  return <SchedulePage locale="es" />;
}
