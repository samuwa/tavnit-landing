import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";
import { legalSchema } from "@/lib/schema";
import {
  CREDIT_UNIT,
  EXTRA_CREDIT_MINIMUM,
  EXTRA_CREDIT_USD,
  PRICING,
  SUPPORT_EMAIL,
} from "@/lib/site";

const DESCRIPTION =
  "The terms governing use of Tavnit — what the service does, account and credential responsibilities, acceptable use, credit-based billing, data ownership, and the limits of AI-generated output.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: "/terms",
    title: "Terms of Service | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

const first = PRICING[0];
const last = PRICING[PRICING.length - 1];

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalSchema("Terms of Service", "/terms", DESCRIPTION)),
        }}
      />
      <LegalDocument
        title="Terms of Service"
        lastUpdated="2026-08-03"
        intro={
          <>
            These terms govern your use of Tavnit. By creating an account or using the
            service you agree to them. If you are agreeing on behalf of an organisation, you
            confirm you have authority to bind that organisation.
          </>
        }
      >
        <LegalSection heading="What the service does">
          <p>
            Tavnit turns documents into structured data. You define a flow describing the
            fields you want, send documents by upload, email or API, and receive typed
            results. The platform also provides Collections for routing documents to the
            right flow, Cleaners for transforming and enriching results, Splitters for
            separating combined PDFs, Buckets for structured storage, Human-in-the-Loop
            review with an append-only audit trail, AI browser agents, and an MCP connector
            for AI assistants.
          </p>
          <p>
            Some capabilities, including AI browser agents and the MCP connector, are enabled
            per organisation and may not be available on every account.
          </p>
        </LegalSection>

        <LegalSection heading="Accounts and credentials">
          <p>
            You are responsible for the accuracy of your account information and for all
            activity under your account. This explicitly includes API keys and MCP connector
            URLs, both of which grant access to your organisation&rsquo;s data and must be
            treated as secrets. Either can be rotated at any time; refreshing a connector URL
            immediately invalidates the previous one.
          </p>
          <p>
            Organisation Owners and Admins control roles and per-bucket access. We act on the
            permissions your organisation configures, so keeping those assignments current is
            your responsibility.
          </p>
        </LegalSection>

        <LegalSection heading="Your content">
          <p>
            <strong className="text-gray-200">
              You own the documents you send and the data extracted from them.
            </strong>{" "}
            We claim no ownership over your content and grant ourselves only the licence
            needed to process, store and deliver it in order to operate the service for you.
          </p>
          <p>
            You are responsible for having the right to send us the documents you send, and
            for any personal data they contain. How that content is handled is described in
            our{" "}
            <Link href="/privacy" className="text-[#3b82f6] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection heading="Acceptable use">
          <p>You may not use Tavnit to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Process documents you have no lawful right to process</li>
            <li>Break the law, infringe intellectual property, or violate anyone&rsquo;s privacy</li>
            <li>
              Direct AI browser agents at sites you are not authorised to access, or in a way
              that breaches those sites&rsquo; terms or rate limits
            </li>
            <li>Attempt to circumvent credit metering, access controls or rate limits</li>
            <li>Resell the service without a written agreement</li>
          </ul>
          <p>
            Agents act on the missions you give them, against the URLs you provide. You are
            responsible for both.
          </p>
        </LegalSection>

        <LegalSection heading="Credits and billing">
          <p>
            Plans are billed monthly in USD and priced by processing volume rather than per
            seat — every plan includes unlimited flows and unlimited team members.{" "}
            {CREDIT_UNIT} of extraction and cleaning, so a three-page invoice costs three
            credits.
          </p>
          <p>
            Plans currently run from ${first.monthlyUsd}/month for{" "}
            {first.credits.toLocaleString("en-US")} credits to ${last.monthlyUsd}/month for{" "}
            {last.credits.toLocaleString("en-US")} credits. Additional credits can be
            purchased at ${EXTRA_CREDIT_USD.toFixed(2)} each, with a minimum of{" "}
            {EXTRA_CREDIT_MINIMUM} credits, on top of any plan. Current plans are listed on
            the{" "}
            <Link href="/pricing" className="text-[#3b82f6] hover:underline">
              pricing page
            </Link>
            .
          </p>
          <p>
            Agent runs are billed by session time rather than by page, because an agent works
            through a live website rather than reading a fixed document.
          </p>
        </LegalSection>

        <LegalSection heading="Accuracy of AI output">
          <p>
            Extraction is performed by AI and is not guaranteed to be correct. Output can
            contain errors, and the risk is highest with poor scans, handwriting, unusual
            layouts and unfamiliar document types. You are responsible for validating results
            before relying on them for financial, legal, compliance or other consequential
            decisions.
          </p>
          <p>
            Human-in-the-Loop review exists precisely because automated extraction needs a
            check. We recommend enabling it — either on every run, or conditionally when a
            Cleaner rule flags a value — for any workflow where an error would be costly.
          </p>
        </LegalSection>

        <LegalSection heading="Availability">
          <p>
            We aim to keep the service available and performant, but we do not guarantee
            uninterrupted operation. Maintenance, incidents and upstream provider outages can
            interrupt processing. If your organisation requires a contractual service level,
            contact us before relying on the platform for time-critical work.
          </p>
        </LegalSection>

        <LegalSection heading="Disclaimers and liability">
          <p>
            To the fullest extent permitted by law, the service is provided &ldquo;as
            is&rdquo; and without warranties of any kind, express or implied, including
            merchantability, fitness for a particular purpose and non-infringement.
          </p>
          <p>
            To the fullest extent permitted by law, we are not liable for indirect,
            incidental, special or consequential damages, or for lost profits or lost data
            arising from your use of the service.
          </p>
        </LegalSection>

        <LegalSection heading="Termination">
          <p>
            You may stop using the service or close your account at any time. We may suspend
            or terminate an account that breaches these terms or where we are required to by
            law. Export any data you want to keep before closing your account.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to these terms">
          <p>
            We may update these terms as the service evolves and will revise the date at the
            top. Continued use after a change constitutes acceptance, and we will notify
            account holders of material changes.
          </p>
        </LegalSection>

        <LegalSection heading="Contact">
          <p>
            Questions about these terms:{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
              {SUPPORT_EMAIL}
            </Link>
            .
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
