import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ArrowLeftRight, BarChart3, Clock, Code2, FilePlus, Info, Split } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("splitters");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="splitters" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Splitters
        </h1>

        <DocCard icon={<Split size={24} />} title="What are Splitters?">
          <p>
            Splitters identify and separate different document types from a mixed batch.
            When you receive a PDF with multiple document types merged together — for example an invoice
            followed by a delivery note — a splitter finds the boundary between them and routes each section
            to the correct flow for extraction.
          </p>
          <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="Splitters vs Collections">
            A collection routes whole documents to the right flow. A splitter works at the page level,
            separating a single mixed-content file into distinct segments first.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to Use Splitters">
          <p>Splitters are ideal when:</p>
          <BulletList
            items={[
              "You receive multi-document PDFs from scanners or email systems",
              "A vendor sends a single file containing invoices, packing slips, and receipts",
              "Archive batches need to be broken into individual documents for processing",
              "You need page-level classification before extraction",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Splitter">
          <p>Follow these steps to create a splitter:</p>
          <NumberedList
            items={[
              'Go to Splitters in the main navigation and click "New Splitter"',
              "Give the splitter a descriptive name",
              "Upload sample documents that show each document type",
              "Configure identification rules for each document type",
              "Map each document type to a target flow",
              "Save and activate",
            ]}
          />
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Running a Split">
          <p>Once your splitter is configured, you can run it against a mixed-content file:</p>
          <NumberedList
            items={[
              "Open the splitter's detail page",
              'Click "Run Split" and upload the mixed PDF',
              "Tavnit analyses each page and groups them by document type",
              "Each group is sent to its mapped flow for extraction",
            ]}
          />
          <InfoBox color="blue" icon={<Code2 size={20} />} title="API trigger">
            Splits can also be triggered via the API — see the API Integration tab for endpoint details.
          </InfoBox>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Viewing Split Results">
          <p>Open a completed split from the Splits history on the splitter&apos;s page to see:</p>
          <BulletList
            items={[
              "How many page groups were identified",
              "Which flow each group was routed to",
              "Extraction run results for each group",
              "Any pages that could not be classified",
            ]}
          />
        </DocCard>
      </section>
    </>
  );
}
