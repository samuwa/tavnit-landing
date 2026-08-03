import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { integrationsHubSchema } from "@/lib/schema";
import { INTEGRATIONS } from "@/lib/integrations";
import { APP_URL } from "@/lib/site";

const DESCRIPTION =
  "Every way into Tavnit and back out: an MCP connector for AI assistants, a REST API, email forwarding, webhooks, and Zapier, Make and n8n recipes.";

export const metadata: Metadata = {
  title: "Integrations — API, Email, Webhooks and MCP",
  description: DESCRIPTION,
  alternates: { canonical: "/integrations" },
  openGraph: {
    type: "website",
    url: "/integrations",
    title: "Tavnit Integrations",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

/**
 * Hub for /integrations/*.
 *
 * Exists because /integrations/mcp is a nested URL: without a parent the
 * breadcrumb points at a 404 and the hierarchy has a hole in it. It is not
 * filler — it answers a real question ("how does this connect to what we
 * already run") and gives every integration route one inbound link.
 */
export default function IntegrationsPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(integrationsHubSchema(INTEGRATIONS)),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-400">Integrations</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          Integrations
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Documents reach Tavnit however suits the team sending them — dropped in the app,
          forwarded to an address, posted to an endpoint, or requested by an AI assistant.
          Extracted data leaves the same way.
        </p>
        <p className="text-gray-400 leading-relaxed mb-12">
          Each route runs the same flows, so the schema, cleaning rules and review steps you
          configured apply no matter how a document arrives.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {INTEGRATIONS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-base font-semibold text-white">{item.label}</h2>
                <ArrowRight size={16} className="text-[#3b82f6] flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{item.summary}</p>
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Which one should you use?
          </h2>
          <div className="space-y-3 text-gray-400 leading-relaxed">
            <p>
              <strong className="text-gray-200">If people are sending the documents</strong> —
              an accounts inbox receiving supplier invoices, say — use{" "}
              <Link href="/docs/email-integration" className="text-[#3b82f6] hover:underline">email</Link>.
              Nobody has to learn a new tool; they forward as they already do.
            </p>
            <p>
              <strong className="text-gray-200">If a system is sending them</strong>, use the{" "}
              <Link href="/docs/api-integration" className="text-[#3b82f6] hover:underline">REST API</Link>{" "}
              and have results pushed back by{" "}
              <Link href="/docs/webhooks" className="text-[#3b82f6] hover:underline">webhook</Link>.
              If you would rather not write the glue code, the same endpoints work from Zapier,
              Make, n8n and Power Automate.
            </p>
            <p>
              <strong className="text-gray-200">If you are working alongside an AI assistant</strong>,
              use the{" "}
              <Link href="/integrations/mcp" className="text-[#3b82f6] hover:underline">MCP connector</Link>.
              It lets claude.ai or Cursor run documents through your flows and query what you have
              already extracted, without you moving files around by hand.
            </p>
          </div>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Start with one document</h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Build a flow, send something through it, and wire up delivery once you can see the
            output. Free credits to begin.
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
