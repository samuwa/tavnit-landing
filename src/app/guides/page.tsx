import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides — PO Matching, Line Items, HS Codes and Document Automation",
  description:
    "Plain-language guides to the problems behind document automation: matching invoices to purchase orders, extracting invoice line items, classifying HS codes, and more.",
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    url: "/guides",
    title: "Tavnit Guides",
    description:
      "Plain-language guides to PO matching, line-item extraction, HS code classification and the rest of document operations.",
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

export default function GuidesHubPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/guides",
              name: "Guides",
              headline: "Guides to document automation",
              description: metadata.description as string,
              inLanguage: "en-US",
              breadcrumb: [
                { name: "Home", url: SITE_URL },
                { name: "Guides", url: `${SITE_URL}/guides` },
              ],
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-400">Guides</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Guides to document automation
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-12 max-w-[680px]">
          The problems behind the product, explained on their own terms: what PO matching checks, why
          invoice tables are hard to extract, how tariff classification really works. Vendor-neutral
          until the last section, where we say what Tavnit automates.
        </p>

        <div className="space-y-4">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="glass-card glass-card-hover rounded-2xl p-6 block transition-all"
            >
              <h2 className="text-xl font-bold text-white mb-2">{g.h1}</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{g.description}</p>
              <span className="inline-flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} /> {g.readingMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 text-[#3b82f6] font-medium">
                  Read <ArrowRight size={13} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MarketingPage>
  );
}
