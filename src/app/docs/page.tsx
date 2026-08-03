import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ArrowLeftRight, Clock, Database, FilePlus, FolderInput, Info, Layers, Mail, Sparkles, Split, Table2, Upload, Wand2 } from "lucide-react";
import { DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("getting-started");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="getting-started" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Getting Started
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="Welcome to Tavnit">
          <p>
            Tavnit helps you automatically extract data from documents like invoices, receipts, and forms.
            Instead of manually typing information from each document, Tavnit reads them for you and organizes
            the data in a structured way.
          </p>
          <p>This guide will walk you through the core features. Use the sidebar to jump to any topic.</p>
          <InfoBox color="purple" icon={<Layers size={20} />} title="Flows">
            Templates that tell Tavnit what to extract from a document. Each flow has fields (e.g., Invoice Number, Date, Line Items).
          </InfoBox>
          <InfoBox color="violet" icon={<FolderInput size={20} />} title="Collections">
            Smart routing containers — send mixed document types to one endpoint and Tavnit routes each to the right flow automatically.
          </InfoBox>
          <InfoBox color="blue" icon={<Database size={20} />} title="Buckets">
            Structured spreadsheet-like storage for extracted data. Flows can write their results directly into a bucket.
          </InfoBox>
          <InfoBox color="green" icon={<Wand2 size={20} />} title="Cleaners">
            AI-powered enrichment tools that re-process and normalise data fields using custom rules and extraction hints.
          </InfoBox>
          <InfoBox color="yellow" icon={<Split size={20} />} title="Splitters">
            Identify and separate different document types from a mixed batch, routing each page group to the correct flow.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Step 1: Create a Flow">
          <p>
            A &ldquo;flow&rdquo; is like a template that tells Tavnit what information to look for in your
            documents. For example, an invoice flow might look for invoice numbers, dates, and line items.
          </p>
          <NumberedList
            items={[
              'Click the "New Flow" button on the Flows page',
              'Enter a name for your flow (e.g., "Invoice Processing")',
              "Select the type of document you'll be processing",
              "Review and customize the fields Tavnit discovered",
              'Click "Activate" to make your flow ready to use',
            ]}
          />
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Step 2: Understanding Fields">
          <p>
            When you upload sample documents, Tavnit uses AI to discover what information can be extracted.
            There are two types of fields:
          </p>
          <InfoBox color="purple" icon={<Info size={20} />} title="Metadata Fields">
            Single values that appear once per document, like invoice number, date, or vendor name.
          </InfoBox>
          <InfoBox color="violet" icon={<Table2 size={20} />} title="Table Fields">
            Repeating data like line items on an invoice, each with columns like description, quantity, and
            price.
          </InfoBox>
          <p>You can add, remove, or rename fields to match exactly what you need.</p>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Step 3: Process Documents">
          <p>Once your flow is active, you can process documents in several ways:</p>
          <InfoBox color="green" icon={<Upload size={20} />} title="Manual Upload">
            Go to the Runs page, select your flow, and upload documents directly through the web interface.
          </InfoBox>
          <InfoBox color="violet" icon={<Mail size={20} />} title="Email Integration">
            Send documents as email attachments to your flow&apos;s unique email address. See the Email
            Integration tab for details.
          </InfoBox>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="API Integration">
            Send documents programmatically from your own applications or automation tools. See the API
            Integration tab for details.
          </InfoBox>
          <p>
            After processing, you&apos;ll see the extracted data on the run details page. You can also export
            results or receive them via webhook.
          </p>
        </DocCard>
      </section>
    </>
  );
}
