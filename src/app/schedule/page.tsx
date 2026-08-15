import type { Metadata } from "next";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import ScheduleMeeting from "@/components/ScheduleMeeting";
import { getSalesSchedulerUrl } from "@/lib/schedule";
import { SALES_EMAIL } from "@/lib/site";

/** ISR so a booking-link change in tavnit-admin → Settings shows up within
 *  minutes without a redeploy. */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Book a Demo — Schedule a Meeting",
  description:
    "Book a 30-minute demo of Tavnit. Tell us about your documents, pick a time on the calendar, and see your own PDFs turned into structured data live.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    type: "website",
    url: "/schedule",
    title: "Book a Tavnit Demo",
    description:
      "Tell us about your documents, pick a time, and see your own PDFs turned into structured data live.",
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

const EXPECTATIONS = [
  {
    icon: Clock,
    title: "30 minutes",
    text: "A live walkthrough, not a slide deck — bring one of your real documents.",
  },
  {
    icon: MessageSquare,
    title: "Your use case",
    text: "We build a first extraction flow for your document type during the call.",
  },
  {
    icon: CalendarDays,
    title: "No commitment",
    text: "Leave with your data extracted and a clear idea of what a rollout looks like.",
  },
];

export default async function SchedulePage() {
  const schedulerUrl = await getSalesSchedulerUrl();

  return (
    <MarketingPage>
      <div className="mx-auto max-w-[880px] px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
            Book a Demo
          </h1>
          <p className="mx-auto max-w-[560px] text-base text-gray-300 sm:text-lg">
            Tell us a little about your documents, then pick a time straight on
            the calendar.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {EXPECTATIONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass-card rounded-xl px-5 py-4">
              <Icon size={18} className="mb-2 text-[#3b82f6]" aria-hidden />
              <p className="mb-1 text-sm font-semibold text-white">{title}</p>
              <p className="text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>

        <ScheduleMeeting schedulerUrl={schedulerUrl} salesEmail={SALES_EMAIL} />
      </div>
    </MarketingPage>
  );
}
