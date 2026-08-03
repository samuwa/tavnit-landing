import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";
import { legalSchema } from "@/lib/schema";
import { SUPPORT_EMAIL } from "@/lib/site";

const DESCRIPTION =
  "How Tavnit handles the documents and data you send through the platform — what we collect, how extraction and review work, how access is controlled, and the choices you have.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: "Privacy Policy | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalSchema("Privacy Policy", "/privacy", DESCRIPTION)),
        }}
      />
      <LegalDocument
        title="Privacy Policy"
        lastUpdated="2026-08-03"
        intro={
          <>
            This policy explains what data Tavnit collects, how it is used, and the
            controls you have over it. It covers the marketing site at tavnit.io and the
            Tavnit application. For anything not answered here, contact{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
              {SUPPORT_EMAIL}
            </Link>
            .
          </>
        }
      >
        <LegalSection heading="What Tavnit does with your documents">
          <p>
            Tavnit is a document pipeline. You define a flow describing the fields you want,
            send a document to it, and receive structured data back. Along the way the
            platform can clean and enrich the results, split combined PDFs, route documents
            to the right flow, pause for human review, store results, and hand data to an AI
            browser agent to act on.
          </p>
          <p>
            Every one of those steps operates on the content of the documents you send. That
            content is processed to produce the output you asked for, and to operate the
            features your organisation has configured — nothing else.
          </p>
        </LegalSection>

        <LegalSection heading="What we collect">
          <p>
            <strong className="text-gray-200">Account information.</strong> Your name, email
            address, organisation, and the credentials used to sign in.
          </p>
          <p>
            <strong className="text-gray-200">Document content.</strong> The files you upload,
            email to a flow address, or send through the API, together with the structured
            data extracted from them. Documents such as invoices, contracts, receipts,
            resumes and customs paperwork routinely contain personal data, so we treat all
            document content as sensitive by default.
          </p>
          <p>
            <strong className="text-gray-200">Processing records.</strong> Runs, credit
            consumption, review decisions, and the append-only audit trail that
            Human-in-the-Loop review produces — which records who viewed, edited, approved
            or rejected each run.
          </p>
          <p>
            <strong className="text-gray-200">Technical data.</strong> Standard log data
            generated when you use the site or the application.
          </p>
        </LegalSection>

        <LegalSection heading="Processing by third-party providers">
          <p>
            Extraction, optical character recognition, enrichment and browser automation are
            performed with the help of third-party service providers. This means document
            content is transmitted to those providers in order to be processed, under
            contractual terms that restrict them to processing it on our behalf.
          </p>
          <p>
            We do not publish the identity of individual providers here, because that list
            changes as the platform evolves. If you need to review our current
            subprocessors — for example to complete a vendor assessment or a data protection
            impact assessment — request the list from{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
              {SUPPORT_EMAIL}
            </Link>{" "}
            and we will provide it.
          </p>
          <p>
            If you process regulated, confidential or otherwise high-risk documents, contact
            us before sending them so we can confirm in writing whether our current
            arrangements meet your requirements.
          </p>
        </LegalSection>

        <LegalSection heading="How we use your data">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Run the extraction, cleaning, splitting, routing, review and agent workflows you configure</li>
            <li>Store results in Buckets and deliver them by API, webhook or email as you direct</li>
            <li>Operate Human-in-the-Loop review and maintain its audit trail</li>
            <li>Meter credit usage and process billing</li>
            <li>Provide support, and detect and prevent abuse or security incidents</li>
          </ul>
          <p>
            We do not sell your data. We do not use the content of your documents for
            advertising.
          </p>
        </LegalSection>

        <LegalSection heading="Your data, your control">
          <p>
            You own the documents you send and the data extracted from them. You grant us
            only the licence needed to process, store and deliver that content in order to
            run the service for you.
          </p>
          <p>
            Where your documents contain personal data about other people, you remain
            responsible for that data and for having a lawful basis to process it. In that
            arrangement you are the controller and we act on your instructions.
          </p>
          <p>
            Extracted results and Bucket data remain available to your organisation until you
            delete them or close your account. Audit trail entries are append-only by design,
            so they cannot be edited after the fact — that is what makes them useful as a
            record.
          </p>
        </LegalSection>

        <LegalSection heading="Where your data goes when you tell it to">
          <p>
            Several Tavnit features send data outward at your instruction. A webhook posts
            results to an endpoint you specify. An email output sends them to an address you
            choose. An AI browser agent visits a URL you provide and interacts with that
            site. The MCP connector lets an AI assistant you have authorised query your flows
            and Buckets.
          </p>
          <p>
            In each case you are choosing the destination, and that destination is outside our
            control. Review those configurations before sending sensitive data through them.
          </p>
        </LegalSection>

        <LegalSection heading="Access control and security">
          <p>
            Access to the application requires authentication. API access requires a secret
            key, and the MCP connector uses a generated connector URL. Both are credentials:
            a connector URL grants access to your organisation&rsquo;s data, and refreshing
            one immediately invalidates the previous URL so any client still using it stops
            working. Rotate either at any time if you believe it has been exposed.
          </p>
          <p>
            Within an organisation, Owner, Admin and Member roles determine what each person
            can do. Buckets add a second layer on top of that: each bucket is either visible
            to the whole organisation or private to its owner and explicitly granted users,
            and each user can be granted Viewer or Editor access to a specific bucket
            independently of their organisation role.
          </p>
          <p>
            These controls only work if you use them. Review role assignments and bucket
            access when people join or leave your team.
          </p>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>
            Depending on where you live, you may have the right to access, correct, export or
            delete your personal data, to object to or restrict how it is processed, and to
            complain to a data protection authority. We do not sell personal data.
          </p>
          <p>
            To exercise any of these, email{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
              {SUPPORT_EMAIL}
            </Link>
            . If your request concerns personal data inside a document that another
            organisation sent through Tavnit, we will direct you to that organisation, since
            they control that data rather than us.
          </p>
        </LegalSection>

        <LegalSection heading="Cookies">
          <p>
            The marketing site uses only what is necessary to serve the page. The application
            uses cookies required for signing in and keeping you signed in.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to this policy">
          <p>
            We will update this policy as the platform changes and will revise the date at the
            top. Where a change materially affects how your data is handled, we will tell
            account holders rather than relying on you to notice.
          </p>
        </LegalSection>

        <LegalSection heading="Contact">
          <p>
            Questions about this policy, your data, or our current subprocessors:{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
              {SUPPORT_EMAIL}
            </Link>
            . See also our{" "}
            <Link href="/terms" className="text-[#3b82f6] hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
