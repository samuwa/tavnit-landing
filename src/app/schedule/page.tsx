import type { Metadata } from "next";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <>
      <SquaresBackground />
      <Header />
      {/* Everything lives in one viewport: the pitch and the form sit side by
          side, vertically centered, so nothing important needs a scroll. */}
      <main
        role="main"
        className="relative z-10 flex min-h-svh flex-col justify-center px-4 pb-10 pt-24 sm:px-6 lg:pt-16"
      >
        <div className="mx-auto grid w-full max-w-[1080px] items-center gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
          <div className="text-center lg:text-left">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Book a Demo
            </h1>
            <p className="mx-auto mb-6 max-w-[440px] text-base text-gray-300 lg:mx-0">
              Tell us a little about your documents, then pick a time straight
              on the calendar.
            </p>
            <ul className="hidden space-y-4 lg:block">
              {EXPECTATIONS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-[#3b82f6]" aria-hidden />
                  <p className="text-sm text-slate-400">
                    <span className="font-semibold text-white">{title}.</span>{" "}
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ScheduleMeeting schedulerUrl={schedulerUrl} salesEmail={SALES_EMAIL} />
        </div>
      </main>
      <Footer />
    </>
  );
}
