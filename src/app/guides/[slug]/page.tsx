import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildGuideSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/site";
import { GUIDES, GUIDE_BY_SLUG } from "@/lib/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      url: `/guides/${g.slug}`,
      title: g.title,
      description: g.description,
      siteName: "Tavnit",
      locale: "en_US",
      publishedTime: g.published,
      modifiedTime: g.updated,
      images: ["/opengraph-image"],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) notFound();

  const others = GUIDES.filter((o) => o.slug !== g.slug);

  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildGuideSchema({
              slug: g.slug,
              headline: g.h1,
              description: g.description,
              datePublished: g.published,
              faqs: g.faqs,
            }),
          ),
        }}
      />

      <article className="max-w-[760px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/guides" className="hover:text-gray-300 transition-colors">Guides</Link>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          {g.h1}
        </h1>

        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-8">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {g.readingMinutes} min read
          </span>
          <time dateTime={g.updated}>Updated {dateFmt.format(new Date(g.updated))}</time>
        </p>

        {/* Self-contained lead answer — the passage most likely to be extracted. */}
        <p className="text-lg text-gray-300 leading-relaxed mb-12">{g.lede}</p>

        {g.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{section.heading}</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-5 space-y-2 marker:text-[#3b82f6]">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="mb-14 glass-card rounded-2xl p-6 md:p-8 border border-[#3b82f6]/30">
          <h2 className="text-2xl font-bold text-white mb-4">{g.tavnit.heading}</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed mb-5">
            {g.tavnit.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {g.tavnit.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 text-sm text-[#3b82f6] font-medium hover:underline"
                >
                  {l.label} <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Common questions</h2>
          <dl className="space-y-4">
            {g.faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {others.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-white mb-4">More guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/guides/${o.slug}`}
                  className="glass-card glass-card-hover rounded-xl p-4 transition-all"
                >
                  <span className="text-sm font-semibold text-white">{o.h1}</span>
                  <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                    {o.readingMinutes} min read
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Try it on one document</h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Build a flow, send a real document through it, and see what comes back. Free credits to start.
          </p>
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            Start free <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    </MarketingPage>
  );
}
