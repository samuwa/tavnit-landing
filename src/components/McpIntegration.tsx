import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, LayoutGrid, Lock, Plug, Repeat, ShieldCheck, Sparkles, Wand2, X } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import RichText from "@/components/RichText";
import { buildLocalizedPageSchema, integrationPageSchema } from "@/lib/schema";
import { APP_URL, MCP_URL, SITE_URL } from "@/lib/site";
import { isStripeEnabled } from "@/lib/platform";
import { hreflangOf, localeHome } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { INTEGRATION_CONTENT } from "@/content/integrations";
import type { ContentLocale } from "@/content/types";

/**
 * Commercial counterpart to /docs/mcp-connector, English and the new
 * languages (/es/integraciones/mcp is its own page). Words from the `mcp`
 * block of src/content/integrations/<code>.ts.
 *
 * Deliberate split, to avoid the two pages competing for the same queries:
 *  - This page answers "which tool lets my AI assistant work with my documents"
 *    — evaluation intent, from people who have not chosen Tavnit yet.
 *  - /docs/mcp-connector answers "how do I set the connector up" — support
 *    intent, from people who already have an account.
 * Every setup detail links there rather than being restated here.
 */

const EN_PATH = "/integrations/mcp";
const CAPABILITY_ICONS = [LayoutGrid, Wand2, Sparkles, Repeat];
const SCOPE_ICONS = [ShieldCheck, Lock];

export function mcpMetadata(locale: ContentLocale): Metadata {
  const t = INTEGRATION_CONTENT[locale].mcp;
  return {
    title: t.title,
    description: t.description,
    alternates: pageAlternates(EN_PATH, locale),
    openGraph: {
      type: "website",
      url: localizedPath(EN_PATH, locale),
      title: t.ogTitle,
      description: t.description,
      siteName: "Tavnit",
      ...pageOgLocales(EN_PATH, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default async function McpIntegration({ locale }: { locale: ContentLocale }) {
  // See src/app/use-cases/[slug]/page.tsx — /pricing redirects while
  // Stripe self-serve is off, so the last CTA falls back to the demo.
  const stripeOn = await isStripeEnabled();
  const t = INTEGRATION_CONTENT[locale].mcp;
  const path = localizedPath(EN_PATH, locale);
  const home = localeHome(locale);
  const hubPath = localizedPath("/integrations", locale);
  const docs = "/docs/mcp-connector";
  const schema =
    locale === "en"
      ? integrationPageSchema({ name: t.schemaName, path: EN_PATH, headline: t.schemaHeadline, description: t.description, faqs: t.faqs })
      : buildLocalizedPageSchema({
          path,
          name: t.schemaName,
          headline: t.schemaHeadline,
          description: t.description,
          inLanguage: hreflangOf(locale),
          breadcrumb: [
            { name: t.breadcrumbHome, url: `${SITE_URL}${home}` },
            { name: t.breadcrumbHub, url: `${SITE_URL}${hubPath}` },
            { name: t.breadcrumbSelf, url: `${SITE_URL}${path}` },
          ],
          faqs: t.faqs,
        });

  return (
    <MarketingPage locale={locale} enPath={EN_PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fg-5">
          <Link href={home} className="hover:text-fg-3 transition-colors">{t.breadcrumbHome}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href={hubPath} className="hover:text-fg-3 transition-colors">{t.breadcrumbHub}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-fg-4">{t.breadcrumbSelf}</span>
        </nav>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-[#3b82f6]/10 px-2.5 py-1 rounded-md">
            <Plug size={13} /> {t.badge}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">{t.h1}</h1>

        {/* Lead answer kept short and self-contained — this is the passage most
            likely to be extracted into an AI answer or a featured snippet. */}
        <p className="text-lg text-fg-3 leading-relaxed mb-4">{t.lede}</p>
        <p className="text-fg-4 leading-relaxed mb-10">{t.ledeMore}</p>

        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            {t.ctaStart} <ArrowRight size={17} />
          </Link>
          <Link
            href={docs}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#3b82f6]/50 text-accent font-semibold hover:bg-[#3b82f6] hover:text-white transition-all"
          >
            {t.ctaSetup}
          </Link>
        </div>

        {/* ── The problem ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.problemHeading}</h2>
          {t.problem.map((p, i) => (
            <p key={i} className={`text-fg-4 leading-relaxed ${i < t.problem.length - 1 ? "mb-4" : ""}`}>
              {p}
            </p>
          ))}
        </section>

        {/* ── Comparison ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.compareHeading}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-tint/10">
                  <th className="text-left py-3 pr-4"><span className="sr-only">{t.compareCapability}</span></th>
                  <th className="text-left py-3 px-4 font-semibold text-fg-3">{t.compareChat}</th>
                  <th className="text-left py-3 pl-4 font-semibold text-fg">{t.compareMcp}</th>
                </tr>
              </thead>
              <tbody className="text-fg-4">
                {t.compareRows.map(([label, a, b]) => (
                  <tr key={label} className="border-b border-tint/5 align-top">
                    <td className="py-3 pr-4 font-medium text-fg-3 whitespace-nowrap">{label}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-start gap-2">
                        <X size={15} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                        {a}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <span className="inline-flex items-start gap-2">
                        <Check size={15} className="text-ok flex-shrink-0 mt-0.5" />
                        {b}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.capabilitiesHeading}</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {t.capabilities.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Sparkles;
              return (
                <div key={c.title} className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-2.5 mb-2 text-accent-2">
                    <Icon size={20} />
                    <h3 className="text-base font-semibold text-fg">{c.title}</h3>
                  </div>
                  <p className="text-sm text-fg-4 leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-sm text-fg-5 mb-3 font-medium">{t.askHeading}</p>
            <ul className="space-y-2 text-sm text-fg-3">
              {t.ask.map((q) => (
                <li key={q} className="flex gap-2.5">
                  <span className="text-accent flex-shrink-0" aria-hidden="true">&rsaquo;</span>
                  <span className="italic">&ldquo;{q}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it fits ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.fitsHeading}</h2>
          <p className="text-fg-4 leading-relaxed mb-4">{t.fitsIntro}</p>
          <ul className="space-y-2.5 text-fg-4">
            {t.fits.map((item, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <Check size={17} className="text-ok flex-shrink-0 mt-1" />
                <span>
                  <RichText text={item} locale={locale} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Security ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.scopeHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.scopeCards.map((card, i) => {
              const Icon = SCOPE_ICONS[i];
              return (
                <div key={card.title} className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-2.5 mb-2 text-accent-2">
                    <Icon size={19} />
                    <h3 className="text-base font-semibold text-fg">{card.title}</h3>
                  </div>
                  <p className="text-sm text-fg-4 leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-fg-5 mt-4">
            <RichText text={t.scopeMore} locale={locale} vars={{ mcpUrl: MCP_URL }} />
          </p>
        </section>

        {/* ── Setup ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.setupHeading}</h2>
          <p className="text-fg-4 leading-relaxed mb-4">{t.setupBody}</p>
          <Link href={docs} className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
            {t.setupLink} <ArrowRight size={16} />
          </Link>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faqHeading}</h2>
          <dl className="space-y-4">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
                <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-fg mb-3">{t.finalHeading}</h2>
          <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.finalBody}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              {t.ctaStart} <ArrowRight size={17} />
            </Link>
            <Link
              href={stripeOn ? "/pricing" : localizedPath("/schedule", locale)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-tint/15 text-fg-3 font-semibold hover:bg-tint/5 hover:text-fg transition-all"
            >
              {stripeOn ? t.finalPricing : t.finalDemo}
            </Link>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
