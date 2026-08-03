import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { Database, ExternalLink, Info, Layers, Wand2, Workflow } from "lucide-react";
import { BulletList, DocCard, InfoBox } from "@/components/docs/ui";

export const metadata = docMetadata("pipeline-map");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="pipeline-map" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Pipeline Map
        </h1>

        <DocCard icon={<Workflow size={24} />} title="What is the Pipeline Map?">
          <p>
            The Pipeline Map is a visual graph that shows your entire data pipeline at a glance.
            It displays all of your flows, cleaners, and buckets as nodes, with lines showing how
            data flows between them.
          </p>
          <InfoBox color="purple" icon={<ExternalLink size={20} />} title="How to open it">
            Click the pipeline icon in the main sidebar. The map slides in as an overlay panel
            so you can keep your current screen in view.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Reading the Map">
          <p>Each node type is colour-coded:</p>
          <InfoBox color="purple" icon={<Layers size={20} />} title="Flows">
            The starting point of your pipeline. Each flow receives documents and extracts data.
          </InfoBox>
          <InfoBox color="green" icon={<Wand2 size={20} />} title="Cleaners">
            Connected to flows they post-process. Lines show which flows feed into each cleaner.
          </InfoBox>
          <InfoBox color="blue" icon={<Database size={20} />} title="Buckets">
            Destination storage nodes. Lines show which flows write their results into each bucket.
          </InfoBox>
          <p>Clicking any node opens its detail page so you can inspect or edit it.</p>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Why Use the Pipeline Map?">
          <p>
            As your organisation grows, keeping track of which flows connect to which cleaners and
            buckets becomes complex. The Pipeline Map gives you:
          </p>
          <BulletList
            items={[
              "A single view of your entire data architecture",
              "Quick identification of orphaned flows (not connected to any bucket or cleaner)",
              "Easy navigation — click any node to jump directly to its detail page",
              "A live snapshot of run statistics on each node",
            ]}
          />
        </DocCard>
      </section>
    </>
  );
}
