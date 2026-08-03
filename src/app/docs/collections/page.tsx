import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, ArrowLeftRight, CheckCircle2, Code2, Eye, FilePlus, FolderInput, Info, Layers, Mail, Sparkles, Workflow } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("collections");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="collections" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Collections
        </h1>

        <DocCard icon={<FolderInput size={24} />} title="What are Collections?">
          <p>
            Collections are AI-powered document routing containers that group multiple flows together.
            When you send a document to a collection, Tavnit automatically analyzes it and routes it to the most appropriate flow.
          </p>
          <p>
            Think of a collection as a smart mailbox that knows how to sort your documents automatically.
          </p>
          <InfoBox color="purple" icon={<Sparkles size={20} />} title="How it works">
            Tavnit uses AI vision to analyze the first page of your document, comparing it with the names and descriptions
            of the flows in your collection. It then routes the document to the best matching flow for extraction.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to Use Collections">
          <p>Collections are ideal when you receive different types of documents from the same source:</p>
          <BulletList
            items={[
              "A vendor portal that sends invoices, purchase orders, and receipts",
              "An email inbox receiving various document types",
              "An API integration where document types vary",
              "Any situation where you don't know which flow to use upfront",
            ]}
          />
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Collections vs Direct Flows">
            Use a direct flow when you know exactly what type of document you&apos;re processing.
            Use a collection when documents vary and need intelligent routing.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Collection">
          <p>Follow these steps to create your first collection:</p>
          <NumberedList
            items={[
              'Go to the Collections page from the main navigation',
              'Click "New Collection" and give it a descriptive name',
              "Add the flows you want to include in the collection",
              "Optionally set a default flow for unmatched documents",
              "Save and activate your collection",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Tip: Use descriptive flow names">
            The AI uses flow names and descriptions to make routing decisions. Clear names like &ldquo;Acme Corp Invoices&rdquo;
            or &ldquo;Shipping Receipts&rdquo; help the AI route documents more accurately.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="How Routing Works">
          <p>When a document is submitted to a collection, here&apos;s what happens:</p>
          <NumberedList
            items={[
              "Tavnit extracts the first page of your document",
              "AI vision analyzes headers, logos, layout, and key text",
              "The document is compared with each flow's name and description",
              "The best matching flow is selected for extraction",
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Default Flow">
            If the AI can&apos;t find a clear match, it will use your default flow (if configured).
            If no default flow is set, the document processing will be cancelled.
          </InfoBox>
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Routing Confidence">
            Each routing decision includes a confidence score and explanation.
            You can review these in the collection runs to understand why documents were routed to specific flows.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Email Trigger for Collections">
          <p>Just like flows, collections can receive documents via email:</p>
          <NumberedList
            items={[
              "Open your collection's settings",
              'Enable the "Email Trigger" option',
              "Copy the collection's unique email address",
              "Forward or send documents to that address",
            ]}
          />
          <p>
            Documents sent to the collection email will be automatically analyzed and routed to the appropriate flow.
          </p>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Viewing Collection Results">
          <p>Track your collection&apos;s activity from the collection details page:</p>
          <InfoBox color="purple" icon={<Layers size={20} />} title="Collection Runs">
            View all documents processed through the collection, including which flow each was routed to,
            the AI&apos;s routing confidence, and the reasoning behind each decision.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Flow Run Results">
            Click on any collection run to see the resulting flow run and extracted data.
            The extraction results are the same as if you had sent the document directly to that flow.
          </InfoBox>
        </DocCard>
      </section>
    </>
  );
}
