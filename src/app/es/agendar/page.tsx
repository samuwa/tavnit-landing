import type { Metadata } from "next";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleMeeting from "@/components/ScheduleMeeting";
import { getSalesSchedulerUrl } from "@/lib/schedule";
import { SALES_EMAIL } from "@/lib/site";
import { isStripeEnabled } from "@/lib/platform";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

/**
 * Spanish twin of /schedule. Same form, same API route, same Calendly — only
 * the UI strings change. Every CTA on the Spanish pages lands here, so a
 * Spanish visitor never has to fill in an English form to talk to sales.
 */

/** ISR so a booking-link change in tavnit-admin → Settings shows up within
 *  minutes without a redeploy. */
export const revalidate = 300;

const TITLE = "Agendar una demostración";
const DESCRIPTION =
  "Agenda una demostración de 30 minutos de Tavnit. Cuéntanos de tus documentos, elige una hora en el calendario y mira tus propios PDFs convertidos en datos estructurados, en vivo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/agendar",
    languages: languageAlternates("/schedule", "/es/agendar"),
  },
  openGraph: {
    type: "website",
    url: "/es/agendar",
    title: "Agendar una demostración de Tavnit",
    description:
      "Cuéntanos de tus documentos, elige una hora y mira tus propios PDFs convertidos en datos estructurados, en vivo.",
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

const EXPECTATIONS = [
  {
    icon: Clock,
    title: "30 minutos",
    text: "Un recorrido en vivo, no una presentación — trae uno de tus documentos reales.",
  },
  {
    icon: MessageSquare,
    title: "Tu caso",
    text: "Armamos un primer Flow de extracción para tu tipo de documento durante la llamada.",
  },
  {
    icon: CalendarDays,
    title: "Sin compromiso",
    text: "Te vas con tus datos extraídos y una idea clara de cómo sería ponerlo en marcha.",
  },
];

export default async function SpanishSchedulePage() {
  const [schedulerUrl, stripeOn] = await Promise.all([getSalesSchedulerUrl(), isStripeEnabled()]);

  return (
    <>
      <SquaresBackground />
      <div lang="es">
        <Header locale="es" alternateHref="/schedule" showPricing={stripeOn} />
        {/* Everything lives in one viewport: the pitch and the form sit side by
            side, vertically centered, so nothing important needs a scroll. */}
        <main
          role="main"
          className="relative z-10 flex min-h-svh flex-col justify-center px-4 pb-10 pt-24 sm:px-6 lg:pt-16"
        >
          <div className="mx-auto grid w-full max-w-[1080px] items-center gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
            <div className="text-center lg:text-left">
              <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Agendar una demostración
              </h1>
              <p className="mx-auto mb-6 max-w-[440px] text-base text-gray-300 lg:mx-0">
                Cuéntanos un poco de tus documentos y luego elige una hora directamente en el
                calendario.
              </p>
              <ul className="hidden space-y-4 lg:block">
                {EXPECTATIONS.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 shrink-0 text-[#3b82f6]" aria-hidden />
                    <p className="text-sm text-slate-400">
                      <span className="font-semibold text-white">{title}.</span> {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <ScheduleMeeting schedulerUrl={schedulerUrl} salesEmail={SALES_EMAIL} locale="es" />
          </div>
        </main>
        <Footer locale="es" showPricing={stripeOn} />
      </div>
    </>
  );
}
