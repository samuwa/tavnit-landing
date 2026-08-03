import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, ArrowLeftRight, BarChart3, Clock, FilePlus, Table2, Upload, Wand2 } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("cleaners");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="cleaners" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Cleaners
        </h1>

        <DocCard icon={<Wand2 size={24} />} title="What are Cleaners?">
          <p>
            Cleaners are AI-powered enrichment configurations that re-process and normalise specific
            fields in your extracted data. Where a flow extracts raw values from a document, a cleaner
            applies rules, validation, and AI reasoning to clean or enrich those values.
          </p>
          <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="Flows vs Cleaners">
            A flow extracts data from a document. A cleaner takes that data and cleans or enriches it —
            for example normalising date formats, correcting misspellings, or classifying values into categories.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Cleaner Fields">
          <p>Each cleaner defines one or more fields to process. For every field you can configure:</p>
          <BulletList
            items={[
              "Extraction hints — examples and patterns that guide the AI",
              "Allowed values — restrict output to a fixed list of options",
              "Sub-fields — break a field into nested child fields",
              "Regex patterns — validate or transform the extracted value",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Tip: Be specific with hints">
            The more examples you provide in the extraction hints, the more accurately the AI will clean your data.
            Include edge cases and common variations.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Cleaner">
          <p>Use the multi-step creation wizard to set up a cleaner:</p>
          <NumberedList
            items={[
              'Go to Cleaners in the main navigation and click "New Cleaner"',
              "Give your cleaner a descriptive name",
              "Upload sample documents — the AI will discover candidate fields",
              "Review and customise the discovered fields, adding hints and constraints",
              "Link the cleaner to one or more flows (optional)",
              "Save and activate",
            ]}
          />
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Running a Sweep">
          <p>
            A &ldquo;sweep&rdquo; is one execution of a cleaner against a batch of documents or extracted data.
            You can trigger sweeps manually or link them to flow runs so they fire automatically.
          </p>
          <InfoBox color="green" icon={<Upload size={20} />} title="Manual sweep">
            Open the cleaner&apos;s detail page, click &ldquo;Run Sweep&rdquo;, and select the data to process.
          </InfoBox>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Linked to a flow">
            When a cleaner is linked to a flow, it can be set to run automatically after each extraction run completes.
          </InfoBox>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Viewing Sweep Results">
          <p>After a sweep completes, open it from the Sweeps history on the cleaner&apos;s page to see:</p>
          <BulletList
            items={[
              "Per-field cleaned values and confidence scores",
              "Number of records processed and any failures",
              "Credit usage for the sweep",
              "A comparison of input vs output values",
            ]}
          />
        </DocCard>
      </section>
    </>
  );
}
