import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildUseCasePageSchema } from "@/lib/schema";
import { USE_CASES, USE_CASE_BY_SLUG } from "@/lib/use-cases";
import { APP_URL } from "@/lib/site";

/**
 * One route per document type, rendered from src/lib/use-cases.ts.
 *
 * A shared template is only safe because the data is not a template: `fields`
 * and `gotchas` carry information specific to each document type — why line
 * items break on invoices, why two-column layouts break resumes, why HS
 * classification is the hard part of customs. Swap those for generic filler and
 * this becomes six doorway pages, which is worse than having none.
 */

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) return {};
  return {
    title: uc.title,
    description: uc.description,
    alternates: { canonical: `/use-cases/${uc.slug}` },
    openGraph: {
      type: "article",
      url: `/use-cases/${uc.slug}`,
      title: uc.title,
      description: uc.description,
      siteName: "Tavnit",
      locale: "en_US",
      images: ["/opengraph-image"],
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) notFound();

  const others = USE_CASES.filter((u) => u.slug !== uc.slug).slice(0, 3);

  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildUseCasePageSchema({
              label: uc.label,
              slug: uc.slug,
              headline: uc.title,
              description: uc.description,
              faqs: uc.faqs,
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/use-cases" className="hover:text-gray-300 transition-colors">Use Cases</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-400">{uc.label}</span>
        </nav>

        <span className="inline-block text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-md mb-4">
          {uc.badge}
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          {uc.h1}
        </h1>

        {/* Self-contained lead answer — the passage most likely to be extracted. */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10">{uc.lede}</p>

        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            Start free <ArrowRight size={17} />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all"
          >
            See pricing
          </Link>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Why this is painful</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            {uc.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">What to extract</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-300 whitespace-nowrap">Field</th>
                  <th className="text-left py-3 font-semibold text-gray-300">Why it needs care</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {uc.fields.map((f) => (
                  <tr key={f.name} className="border-b border-white/5 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-200">{f.name}</td>
                    <td className="py-3 leading-relaxed">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            What makes {uc.label.toLowerCase()} hard
          </h2>
          <div className="space-y-4">
            {uc.gotchas.map((g) => (
              <div key={g.title} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <TriangleAlert size={18} className="text-amber-400 flex-shrink-0" />
                  <h3 className="text-base font-semibold text-white">{g.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">How the pipeline handles it</h2>
          <ul className="space-y-3">
            {uc.pipeline.map((step) => (
              <li key={step.label} className="flex gap-3 leading-relaxed">
                <Check size={18} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  <Link href={step.href} className="text-[#3b82f6] font-medium hover:underline">
                    {step.label}
                  </Link>{" "}
                  — {step.why}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Common questions</h2>
          <dl className="space-y-4">
            {uc.faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-bold text-white mb-4">Other document types</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/use-cases/${o.slug}`}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all"
              >
                <span className="text-sm font-semibold text-white">{o.label}</span>
                <span className="block text-xs text-gray-500 mt-1 leading-relaxed">{o.badge}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Try it on one document</h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Build a flow, send a real {uc.label.toLowerCase().replace(/s$/, "")} through it, and see what
            comes back. Free credits to start.
          </p>
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            Start free <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
