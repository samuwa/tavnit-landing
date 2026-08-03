import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildUseCasesHubSchema } from "@/lib/schema";
import { USE_CASES } from "@/lib/use-cases";
import { APP_URL } from "@/lib/site";

const DESCRIPTION =
  "How teams use Tavnit by document type — invoices, contracts, resumes, receipts, purchase orders and customs paperwork, with what each one gets wrong.";

export const metadata: Metadata = {
  title: "Use Cases — Invoices, Contracts, Resumes and More",
  description: DESCRIPTION,
  alternates: { canonical: "/use-cases" },
  openGraph: {
    type: "website",
    url: "/use-cases",
    title: "Tavnit Use Cases",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

export default function UseCasesPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildUseCasesHubSchema(USE_CASES.map((u) => ({ label: u.label, slug: u.slug }))),
          ),
        }}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-400">Use Cases</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          Use cases
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          The pipeline is the same whatever you send it — extract, clean, review, act. What
          changes is which fields matter, and what tends to go wrong.
        </p>
        <p className="text-gray-400 leading-relaxed mb-12">
          Each page below covers the fields worth pulling from that document type, the parts
          that reliably break, and which stage of the pipeline earns its keep.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {USE_CASES.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col transition-all"
            >
              <span className="text-[11px] font-semibold text-[#93c5fd] uppercase tracking-wider mb-2">
                {uc.badge}
              </span>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-base font-semibold text-white">{uc.label}</h2>
                <ArrowRight size={16} className="text-[#3b82f6] flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{uc.summary}</p>
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not seeing your document type?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-3">
            These are the types teams ask about most, not a list of what Tavnit supports. There
            is no per-document-type configuration to build — you describe the fields you want and
            the same extraction reads any PDF or image, including scans and handwriting.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Delivery notes, bank statements, insurance claims, medical forms, certificates and
            application forms all work the same way. Start from the{" "}
            <Link href="/docs" className="text-[#3b82f6] hover:underline">
              getting started guide
            </Link>{" "}
            and define the fields that matter to you.
          </p>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Start with one document</h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Build a flow, send something real through it, and judge the output before wiring
            anything up. Free credits to begin.
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
