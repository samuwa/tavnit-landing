import type { Metadata } from "next";
import SchedulePage, { scheduleMetadata } from "@/components/SchedulePage";
import { pageLocale, type LangParams } from "../_locale";

/** ISR so a booking-link change in tavnit-admin → Settings shows up within
 *  minutes without a redeploy (same as /schedule). */
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return scheduleMetadata(await pageLocale(params));
}

export default async function LangSchedulePage({ params }: { params: Promise<LangParams> }) {
  return <SchedulePage locale={await pageLocale(params)} />;
}
