import SchedulePage, { scheduleMetadata } from "@/components/SchedulePage";

/** ISR so a booking-link change in tavnit-admin → Settings shows up within
 *  minutes without a redeploy. */
export const revalidate = 300;

export const metadata = scheduleMetadata("en");

export default function EnglishSchedulePage() {
  return <SchedulePage locale="en" />;
}
