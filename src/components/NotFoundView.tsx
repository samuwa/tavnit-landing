import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, FileSearch, Home, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/site";
import type { Locale } from "@/lib/locale";

/**
 * Body of the 404 page, rendered by src/app/not-found.tsx (English) and
 * src/app/es/not-found.tsx (Spanish). The language is fixed per segment
 * rather than read from the URL at runtime: the 404 is prerendered, so a
 * client-side path check would ship English HTML and swap it after
 * hydration. A catch-all under /es routes every unknown Spanish URL to the
 * Spanish version.
 *
 * Every link points at a real hub, so the page is also the best possible
 * recovery for a crawler that followed a stale link: one hop back into the
 * site's structure rather than a bare error.
 */

const COPY = {
  en: {
    eyebrow: "404",
    title: "This page doesn't exist.",
    body: "The link may be out of date, or the address was typed differently. Nothing was lost on our side. Here is where the useful pages live.",
    links: [
      { icon: Home, label: "Home", hint: "What Tavnit does, in one page", href: "/" },
      { icon: FileSearch, label: "Use cases", hint: "By document type: invoices, POs, customs…", href: "/use-cases" },
      { icon: BookOpen, label: "Guides", hint: "PO matching, line items, HS codes", href: "/guides" },
      { icon: CalendarDays, label: "Book a demo", hint: "Bring a real document; see it extracted live", href: "/schedule" },
    ],
    contact: "Followed a link from our site or an email?",
    contactCta: "Tell us where it was",
    mailSubject: "Broken link on tavnit.io",
    switchLabel: "Ver en español",
    switchHref: "/es",
  },
  es: {
    eyebrow: "404",
    title: "Esta página no existe.",
    body: "Puede que el enlace esté desactualizado o que la dirección se haya escrito distinto. No se perdió nada de nuestro lado. Aquí están las páginas que sí sirven.",
    links: [
      { icon: Home, label: "Inicio", hint: "Qué hace Tavnit, en una página", href: "/es" },
      { icon: FileSearch, label: "Casos de uso", hint: "Por tipo de documento: facturas, OC, aduanas…", href: "/es/casos-de-uso" },
      { icon: BookOpen, label: "Guías", hint: "Clasificación arancelaria, conciliación de facturas", href: "/es/guias" },
      { icon: CalendarDays, label: "Agendar una demostración", hint: "Trae un documento real y míralo extraído en vivo", href: "/es/agendar" },
    ],
    contact: "¿Llegaste desde un enlace de nuestro sitio o de un correo?",
    contactCta: "Cuéntanos dónde estaba",
    mailSubject: "Enlace roto en tavnit.io",
    switchLabel: "View in English",
    switchHref: "/",
  },
} as const;

export default function NotFoundView({ locale, stripeOn }: { locale: Locale; stripeOn: boolean }) {
  const t = COPY[locale];

  return (
    <div lang={locale}>
      <Header locale={locale} showPricing={stripeOn} alternateHref={t.switchHref} />
      <main role="main" className="relative z-10 flex min-h-svh flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
        <div className="mx-auto w-full max-w-[860px]">
          <p
            aria-hidden="true"
            className="font-heading select-none text-[112px] sm:text-[160px] font-extrabold leading-none tracking-tighter bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] bg-clip-text text-transparent"
          >
            {t.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t.title}
          </h1>
          <p className="mt-4 max-w-[600px] text-base sm:text-lg leading-relaxed text-gray-400">{t.body}</p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {t.links.map(({ icon: Icon, label, hint, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="glass-card glass-card-hover group flex items-start gap-4 rounded-xl p-5 transition-all"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#93c5fd]">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2 text-base font-semibold text-white">
                      {label}
                      <ArrowRight size={16} className="flex-shrink-0 text-[#3b82f6] transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-500">{hint}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
            <Mail size={15} className="text-gray-600" aria-hidden />
            <span>{t.contact}</span>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`}
              className="text-[#3b82f6] hover:underline"
            >
              {t.contactCta}
            </a>
          </p>
        </div>
      </main>
      <Footer locale={locale} showPricing={stripeOn} />
    </div>
  );
}
