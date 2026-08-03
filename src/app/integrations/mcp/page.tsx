import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock, Plug, Repeat, ShieldCheck, Sparkles, X } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { integrationPageSchema } from "@/lib/schema";
import { APP_URL, MCP_URL } from "@/lib/site";

const DESCRIPTION =
  "Connect Tavnit to claude.ai or Cursor over MCP so your assistant runs documents through your own extraction flows and reads the results back, typed and cleaned.";

export const metadata: Metadata = {
  title: "MCP Document Extraction for Claude and Cursor",
  description: DESCRIPTION,
  alternates: { canonical: "/integrations/mcp" },
  openGraph: {
    type: "website",
    url: "/integrations/mcp",
    title: "MCP Server for Document Extraction | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

/**
 * Commercial counterpart to /docs/mcp-connector.
 *
 * Deliberate split, to avoid the two pages competing for the same queries:
 *  - This page answers "which tool lets my AI assistant work with my documents"
 *    — evaluation intent, from people who have not chosen Tavnit yet.
 *  - /docs/mcp-connector answers "how do I set the connector up" — support
 *    intent, from people who already have an account.
 * Every setup detail links there rather than being restated here.
 */

const faqs = [
  {
    q: "How is this different from pasting a PDF into Claude?",
    a: "Pasting a PDF asks the assistant to read a document it has never seen, in a format it was not designed to parse, with no schema and no way to check the result. The MCP connector routes the document through an extraction flow you defined, so you get the same named fields every time, in the same types, with the same cleaning rules and the same review step applied. The assistant receives structured data rather than an interpretation.",
  },
  {
    q: "Which AI assistants work with it?",
    a: "claude.ai on a Pro plan or above, Cursor, and any client that accepts a remote MCP server URL. MCP is an open protocol, so support is not limited to a specific vendor.",
  },
  {
    q: "Do I need to write code?",
    a: "No. You generate a connector URL in Tavnit and paste it into your assistant's settings. Building the flow it calls is also no-code — you describe the fields you want and Tavnit extracts them.",
  },
  {
    q: "Can the assistant see everything in my company's account?",
    a: "No. The connector is issued from your own API key, so it reaches only the organisation you were signed in to, with your role's permissions. A Member cannot make an assistant do something a Member cannot do in the app, and private Buckets stay private unless you have been granted access.",
  },
  {
    q: "Does using the connector cost extra?",
    a: "No. Documents processed through the connector consume credits at the normal rate of one credit per page, the same as uploading through the app or calling the API. There is no separate charge for MCP access.",
  },
  {
    q: "What happens when the connector URL expires?",
    a: "Connector URLs are time-limited, and Tavnit shows when yours was created and when it expires. Refreshing issues a new URL and invalidates the previous one immediately, so any client still holding the old one stops working until you paste the new value.",
  },
];

const capabilities = [
  {
    icon: <Sparkles size={20} />,
    title: "Run a document through a flow",
    body: "Ask the assistant to process an invoice, contract or form through one of your extraction flows. It returns the fields you defined, typed and cleaned, not a paragraph describing them.",
  },
  {
    icon: <Repeat size={20} />,
    title: "Query what you have already extracted",
    body: "Ask questions against your Buckets — what you paid a vendor last quarter, which contracts renew next month — and the answer comes from your live data rather than the model's memory.",
  },
];

export default function McpIntegrationPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            integrationPageSchema({
              name: "MCP Connector",
              path: "/integrations/mcp",
              headline: "MCP Server for Document Extraction — Claude and Cursor",
              description: DESCRIPTION,
              faqs,
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/integrations" className="hover:text-gray-300 transition-colors">Integrations</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-400">MCP Connector</span>
        </nav>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-md">
            <Plug size={13} /> Model Context Protocol
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Give your AI assistant a real document pipeline
        </h1>

        {/* Lead answer kept short and self-contained — this is the passage most
            likely to be extracted into an AI answer or a featured snippet. */}
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Tavnit runs an MCP server. Connect it to claude.ai or Cursor and your
          assistant can push documents through your own extraction flows and read
          the results back — returning the exact fields you defined, cleaned and
          typed, instead of an interpretation of a file it was handed.
        </p>
        <p className="text-gray-400 leading-relaxed mb-10">
          Setup is a URL you paste into your assistant&rsquo;s settings. No SDK, no
          server to run, no code.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            Start free <ArrowRight size={17} />
          </Link>
          <Link
            href="/docs/mcp-connector"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#3b82f6]/50 text-[#3b82f6] font-semibold hover:bg-[#3b82f6] hover:text-white transition-all"
          >
            Setup guide
          </Link>
        </div>

        {/* ── The problem ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Why assistants struggle with documents
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            AI assistants are good at reasoning and bad at being a data pipeline. Hand one
            a scanned invoice and it will read it — probably correctly, sometimes not, and
            differently the second time. There is no schema, so field names drift between
            runs. There is no validation, so a misread total looks exactly like a correct
            one. And there is no record of what happened, which matters as soon as the
            output touches accounting or compliance.
          </p>
          <p className="text-gray-400 leading-relaxed">
            That is fine for a one-off question and unworkable as a process. What an
            assistant actually needs is a tool that already knows how to read your
            documents.
          </p>
        </section>

        {/* ── Comparison ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Pasting a PDF vs. calling a flow
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4"><span className="sr-only">Capability</span></th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Pasting the file into chat</th>
                  <th className="text-left py-3 pl-4 font-semibold text-white">Through the MCP connector</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  ["Output shape", "Whatever the model returns that time", "The fields your flow defines, every time"],
                  ["Field names", "Drift between runs", "Fixed by your schema"],
                  ["Cleaning rules", "None", "Cleaners applied automatically"],
                  ["Human review", "Not possible", "Optional, with an audit trail"],
                  ["Where results land", "In the chat", "Buckets, webhook, email or API"],
                  ["Repeatable at volume", "No", "Yes — same flow, any number of documents"],
                ].map(([label, a, b]) => (
                  <tr key={label} className="border-b border-white/5 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-300 whitespace-nowrap">{label}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-start gap-2">
                        <X size={15} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                        {a}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <span className="inline-flex items-start gap-2">
                        <Check size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            What your assistant can do once connected
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {capabilities.map((c) => (
              <div key={c.title} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                  {c.icon}
                  <h3 className="text-base font-semibold text-white">{c.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-3 font-medium">Things you can ask it:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Run this invoice through my Supplier Invoices flow and show me the line items.",
                "What did we pay Acme Corp last quarter, according to my Invoices bucket?",
                "Extract the renewal dates from these three contracts and compare them.",
                "Which runs are waiting on review right now?",
              ].map((q) => (
                <li key={q} className="flex gap-2.5">
                  <span className="text-[#3b82f6] flex-shrink-0" aria-hidden="true">&rsaquo;</span>
                  <span className="italic">&ldquo;{q}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it fits ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            It uses the pipeline you already built
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            The connector is not a separate extraction engine. It calls the same flows as
            the rest of Tavnit, which means every rule you configured still applies when
            an assistant is the one making the request.
          </p>
          <ul className="space-y-2.5 text-gray-400">
            {[
              [<Link key="c" href="/docs/collections" className="text-[#3b82f6] hover:underline">Collections</Link>, "still classify an incoming document and route it to the right flow."],
              [<Link key="cl" href="/docs/cleaners" className="text-[#3b82f6] hover:underline">Cleaners</Link>, "still standardise formats, convert currencies and apply your lookups."],
              [<Link key="h" href="/docs/human-in-the-loop" className="text-[#3b82f6] hover:underline">Human-in-the-Loop</Link>, "review still pauses a run when you have asked it to — an assistant cannot skip your approval step."],
              [<Link key="b" href="/docs/buckets" className="text-[#3b82f6] hover:underline">Buckets</Link>, "still receive the results, so what the assistant extracts is queryable afterwards."],
            ].map(([link, tail], i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <Check size={17} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span>{link} {tail}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Security ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Scope and access</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                <ShieldCheck size={19} />
                <h3 className="text-base font-semibold text-white">Your permissions, not more</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The connector is issued from your own API key and reaches only the
                organisation you generated it in. The assistant inherits your role — it
                cannot do anything you could not do in the app.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                <Lock size={19} />
                <h3 className="text-base font-semibold text-white">Treat the URL as a credential</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Anyone holding the connector URL can reach your flows and Buckets. URLs are
                time-limited, and refreshing one invalidates the previous value immediately.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Full detail in the{" "}
            <Link href="/docs/mcp-connector" className="text-[#3b82f6] hover:underline">
              connector documentation
            </Link>{" "}
            and{" "}
            <Link href="/docs/user-roles" className="text-[#3b82f6] hover:underline">
              user roles reference
            </Link>
            . The server endpoint is <code className="text-gray-300">{MCP_URL}</code>.
          </p>
        </section>

        {/* ── Setup ── */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Connecting it</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Generate a connector URL on the Integrations page in Tavnit, then paste it into
            claude.ai under Settings &rarr; Connectors, or add it to Cursor as a remote MCP
            server. It takes a couple of minutes and needs no code.
          </p>
          <Link
            href="/docs/mcp-connector"
            className="inline-flex items-center gap-2 text-[#3b82f6] font-semibold hover:underline"
          >
            Read the step-by-step setup guide <ArrowRight size={16} />
          </Link>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Common questions</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Point your assistant at real documents
          </h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Build a flow, generate a connector URL, and start asking. Free credits to
            begin, and no card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              Start free <ArrowRight size={17} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
