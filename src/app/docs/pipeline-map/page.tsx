import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Database,
  Filter,
  Info,
  Layers,
  LayoutGrid,
  Search,
  Workflow,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  Related,
  Screenshot,
} from "@/components/docs/ui";

export const metadata = docMetadata("pipeline-map");

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="pipeline-map"
        primaryImage={{
          url: "/assets/docs-pipeline-map-2026-08.jpg",
          caption:
            "The Tavnit Pipeline Map in Columns layout, showing Splitters and Collections feeding a flow, then Cleaners, then Buckets.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Pipeline Map
        </h1>

        <DocCard icon={<Workflow size={24} />} title="What the Pipeline Map shows">
          <Lead>
            The Pipeline Map draws every object in your workspace as a node and every connection
            between them as a line. It answers questions that are painful to answer by clicking
            through detail pages: what feeds this flow, which Cleaner do these two flows share, and
            which Bucket is nothing writing to.
          </Lead>
          <p>
            Open it from <strong>Pipeline Map</strong> in the sidebar. It is a full page, not an
            overlay, and it reads from your live configuration — so it is always current rather than
            a diagram somebody drew once and stopped updating.
          </p>
          <Screenshot
            src="/assets/docs-pipeline-map-2026-08.jpg"
            alt="The Tavnit Pipeline Map in Columns layout. An Input column holds two Splitters and two Collections, a Processing column holds one flow and two Cleaners, an Audio column holds a Signal, and a Data and Activity column holds three Buckets, with connecting lines showing how documents move between them."
            caption="Columns layout. Documents move left to right: input, processing, then storage."
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Reading the map">
          <Lead>
            Nodes are grouped into stages that follow the direction documents actually travel:
            everything that brings a document in sits on the left, everything that processes it in
            the middle, and everything that stores the result on the right.
          </Lead>
          <DataTable
            head={["Stage", "Contains", "What a line into it means"]}
            rows={[
              [
                "Input",
                <>
                  <DocLink href="/docs/splitters">Splitters</DocLink> and{" "}
                  <DocLink href="/docs/collections">Collections</DocLink>
                </>,
                "Documents arrive here first, to be split apart or classified.",
              ],
              [
                "Processing",
                <>
                  Flows and <DocLink href="/docs/cleaners">Cleaners</DocLink>
                </>,
                "This flow receives documents from that Collection or Splitter; this Cleaner sweeps that flow's output.",
              ],
              [
                "Data & activity",
                <>
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </>,
                "This flow or Cleaner writes its results into that Bucket.",
              ],
            ]}
          />
          <p>
            Each group shows a count, and each can be sorted — <em>Connected First</em> pushes the
            wired-up nodes to the top so the unconnected ones stand out at the bottom. Clicking any
            node opens its detail page.
          </p>
        </DocCard>

        <DocCard icon={<LayoutGrid size={24} />} title="Three layouts">
          <Lead>
            The same graph can be drawn three ways. Switch between them from the toolbar; none of
            them changes your configuration, only how it is arranged on screen.
          </Lead>
          <DataTable
            head={["Layout", "Best for"]}
            rows={[
              [
                "Columns",
                "The default. Reading the pipeline left to right as a sequence of stages — the clearest view for explaining the setup to someone else.",
              ],
              [
                "Lanes",
                "Following a single path through the workspace when many objects share the same stage.",
              ],
              [
                "Orbits",
                "Spotting the busiest hubs — which flow or Bucket everything else clusters around.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Filter size={24} />} title="Finding things in a large workspace">
          <Lead>
            Once a workspace has a few dozen objects the whole graph stops fitting on screen. The
            toolbar has the tools for that: search, filters, zoom and a fit-to-screen control that
            frames everything at once.
          </Lead>
          <BulletList
            items={[
              "Search nodes by name to jump straight to one",
              "Filter the map down to the object types you care about — the toolbar shows how many filters are active, with a one-click Clear all",
              "Zoom in and out, or use Fit to frame the whole graph",
              "Export the map as an image when you need it in a document or a review",
            ]}
          />
          <InfoBox color="blue" icon={<Search size={20} />} title="Finding orphans">
            Sort each group by <em>Connected First</em> and read the bottom of each column. A flow
            with no Cleaner and no Bucket is throwing its results away unless something is collecting
            them over the API; a Bucket with nothing pointing at it is only being written to by hand.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When the map is worth opening">
          <Lead>
            The map is a diagnostic tool rather than something you use daily. It earns its keep at
            the moments when you need to understand the shape of the workspace rather than the
            contents of one run.
          </Lead>
          <BulletList
            items={[
              "Before deleting anything — the map shows what else is wired to it",
              "When a document ends up in the wrong place and you need to see the routing path it took",
              "When onboarding someone, as a one-screen explanation of how the workspace fits together",
              "After a build-out, to check nothing was left unconnected",
              "When two teams have each configured flows and you want to find duplicated work",
            ]}
          />
          <InfoBox color="violet" icon={<Database size={20} />} title="Structure, not throughput">
            The map shows how things are connected, not how much is flowing through them. For
            volumes, credits and failures, use the Runs list and each object&apos;s own activity
            history.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/collections",
              label: "How Collections route documents",
              description: "The classification step that produces the Input-stage links on the map.",
            },
            {
              href: "/docs/cleaners",
              label: "How Cleaners transform extracted data",
              description: "Why several flows often share one Cleaner node.",
            },
            {
              href: "/docs/buckets",
              label: "Where extracted results are stored",
              description: "The Buckets on the right-hand side, and what writes into them.",
            },
            {
              href: "/docs/splitters",
              label: "Splitting multi-document PDFs",
              description: "The other Input-stage object, and how it chains into Collections.",
            },
          ]}
        />
      </section>
    </>
  );
}
