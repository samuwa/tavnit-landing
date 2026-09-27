import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Database,
  Filter,
  GitBranch,
  HelpCircle,
  Info,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Route,
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Pipeline Map
        </h1>

        <DocCard icon={<Workflow size={24} />} title="What the Pipeline Map shows">
          <Lead>
            The Pipeline Map draws every object in your workspace as a node and every configured
            connection between them as a line. It answers questions that are painful to answer by
            clicking through detail pages: what feeds this flow, which Cleaner do these two flows
            share, and which Bucket is nothing writing to.
          </Lead>
          <p>
            Open it from <strong>Pipeline Map</strong> in the sidebar. It is a full page of its own
            (at <strong>/pipeline-map</strong>) that fills the screen, with a back arrow to the
            dashboard. It reads from your live configuration, so it is always current rather than a
            diagram somebody drew once and stopped updating.
          </p>
          <Screenshot
            src="/assets/docs-pipeline-map-2026-08.jpg"
            alt="The Tavnit Pipeline Map in Columns layout. An Input column holds two Splitters and two Collections, a Processing column holds one flow and two Cleaners, an Audio column holds a Signal, and a Data and Activity column holds three Buckets, with connecting lines showing how documents move between them."
            caption="Columns layout. Documents move left to right: input, processing, then storage."
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Nodes and layers">
          <Lead>
            The map shows ten kinds of object, grouped into the same layers as the sidebar and
            ordered the way documents travel: what brings a document in on the left, what processes
            and checks it in the middle, and what stores the result on the right.
          </Lead>
          <DataTable
            head={["Layer", "Nodes"]}
            rows={[
              [
                "Input",
                <Fragment key="f0">
                  <DocLink href="/docs/splitters">Splitters</DocLink> and{" "}
                  <DocLink href="/docs/collections">Collections</DocLink>
                </Fragment>,
              ],
              [
                "Processing",
                <Fragment key="f1">
                  <DocLink href="/docs/flows">Flows</DocLink>,{" "}
                  <DocLink href="/docs/cleaners">Cleaners</DocLink> and{" "}
                  <DocLink href="/docs/agents">Agents</DocLink>
                </Fragment>,
              ],
              [
                "Intelligence",
                <Fragment key="f2">
                  <DocLink href="/docs/matchers">Matchers</DocLink>,{" "}
                  <DocLink href="/docs/inspectors">Inspectors</DocLink> and{" "}
                  <DocLink href="/docs/fillers">Fillers</DocLink>
                </Fragment>,
              ],
              [
                "Audio",
                <Fragment key="f3">
                  <DocLink href="/docs/signals">Signals</DocLink>
                </Fragment>,
              ],
              [
                "Data & Activity",
                <Fragment key="f4">
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </Fragment>,
              ],
            ]}
          />
          <p>
            Archived flows, Splitters, Cleaners, agents, Signals and Buckets are left out. Agents and
            Signals appear only if they are enabled for your organisation. Subjects, Nets, pipelines
            and individual runs are not drawn on the map.
          </p>
        </DocCard>

        <DocCard icon={<GitBranch size={24} />} title="How the lines are drawn">
          <Lead>
            Every line comes from a setting you made somewhere else. Hover a node and each of its
            lines is labelled with the relation it stands for.
          </Lead>
          <DataTable
            head={["Line", "Label", "Comes from"]}
            rows={[
              ["Collection → Flow", "routes to", "The flow is in the Collection, or is its fallback flow."],
              ["Collection → Splitter", "routes to", "The Splitter is in the Collection."],
              ["Splitter → Flow or Collection", "sends documents to", "A document type in the Splitter is sent to that flow or Collection."],
              ["Flow → Cleaner", "cleans with", "The flow's data cleaning uses that Cleaner."],
              ["Flow → Bucket", "exports to", "The flow's Bucket Export points at that Bucket."],
              ["Flow → Agent", "triggers", "The flow is linked to that agent."],
              ["Flow → Matcher", "compared by", "The Matcher compares that flow's runs."],
              ["Flow → Inspector", "checked by", "The flow is one of the Inspector's inputs."],
              ["Flow → Filler", "feeds", "The flow is one of the Filler's inputs."],
              ["Agent → Bucket", "delivers to", "The agent has a Bucket delivery."],
              ["Signal → Bucket", "exports to", "The Signal exports to that Bucket."],
              ["Cleaner → Bucket", "writes to", "The Cleaner has a Bucket Check field on that Bucket."],
            ]}
          />
          <p>
            A flow&apos;s lines get thicker the more runs it had in the last 7 days, and briefly pulse
            when a new run starts, so you can see which paths are busy without leaving the map.
          </p>
        </DocCard>

        <DocCard icon={<LayoutGrid size={24} />} title="Three layouts">
          <Lead>
            The same graph can be drawn three ways. Switch between them from the toolbar or with the
            keys 1, 2 and 3; none of them changes your configuration, only how it is arranged on
            screen. The map remembers the last layout you used.
          </Lead>
          <DataTable
            head={["Layout", "How it looks", "Best for"]}
            rows={[
              [
                "Columns",
                "The default. One column per node type inside its layer band, each with a count and its own sort. A column shows up to 30 nodes, then a “Show all” control.",
                "Reading the whole wiring left to right, and explaining the setup to someone else.",
              ],
              [
                "Lanes",
                "One row per flow or Signal: what feeds it on the left, what it sends to on the right, grouped by relation. Nodes that touch no flow or Signal are listed under “Not connected”.",
                "Following one flow end to end when many objects share the same stage.",
              ],
              [
                "Orbits",
                "Each connected flow or Signal is a hub with its direct neighbours on rings around it, inputs on the left and outputs on the right. The most connected hubs come first.",
                "Spotting the busiest hubs, which flow everything else clusters around.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MousePointerClick size={24} />} title="Exploring a node">
          <BulletList
            items={[
              "Hover a node to see its card: whether it is active, its email trigger address, email output, webhook, human review, agent delivery, completion mode (Inspectors and Fillers) or private status (Buckets), plus its number of connections and creation date",
              "Click a node to focus it: its direct connections light up and the card stays pinned with an “Open” button. Click it again, press Esc or click empty space to “Exit focus”",
              "Double-click a node, or press Enter while it is focused, to open its detail page",
              "With a node focused, Shift+click another node to highlight the shortest path between them",
              "Right-click a node for “Open”, “Focus”, “Hide element” (that node type) and “Hide layer”",
              "Use the arrow keys to move between nodes, and / to jump to search",
            ]}
          />
        </DocCard>

        <DocCard icon={<Filter size={24} />} title="Finding things in a large workspace">
          <Lead>
            Once a workspace has a few dozen objects the whole graph stops fitting on screen. The
            toolbar has the tools for that.
          </Lead>
          <BulletList
            items={[
              "“Search nodes...” to find one by name. Search hits always show, even past a column's limit",
              "“Filters” opens a panel with Layers and Elements to hide, Configuration filters (Active, Human review, Webhook, Email), and Options: “Connected only” and “Hide non-matching”. Without the last one, non-matching nodes are dimmed rather than removed. “Clear all” resets everything",
              "Sort each column by Connected First, Name A-Z, Name Z-A or Last Created, or sort every column at once",
              "In Columns, zoom in and out (or use the mouse wheel) and click “Fit” to frame the whole graph; a minimap in the corner shows where you are",
              "“Export SVG” downloads the current Columns or Orbits view as an image",
              "Switch between bright and dark mode for the map",
            ]}
          />
          <p>
            Your filters and sort are remembered in your browser. The address bar keeps the layout,
            search and focused node, so you can share a link that opens the map framed the same way.
            On small screens the map shows a compact list by layer instead of the canvas.
          </p>
          <InfoBox color="blue" icon={<Search size={20} />} title="Finding orphans">
            Sort by <em>Connected First</em> and read the bottom of each column, or turn on{" "}
            <em>Connected only</em> to see what remains. A flow with no Cleaner and no Bucket is
            throwing its results away unless something collects them over the API or a webhook; a
            Bucket with nothing pointing at it is only being written to by hand or over the API.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Pipeline Map and Pipelines">
          <p>
            The map shows the connections that already exist in each feature&apos;s own settings. A{" "}
            <DocLink href="/docs/pipelines">pipeline</DocLink> is different: a canvas you build on
            purpose to chain steps together and run them as one. Pipelines are not drawn on the map;
            use the map to understand how your workspace is wired, and Pipelines to orchestrate a
            specific sequence.
          </p>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When the map is worth opening">
          <Lead>
            The map is a diagnostic tool rather than something you use daily. It earns its keep when
            you need to understand the shape of the workspace rather than the contents of one run.
          </Lead>
          <BulletList
            items={[
              "Before deleting anything: the map shows what else is wired to it",
              "When a document ends up in the wrong place and you need to see the routing path it took",
              "When onboarding someone, as a one-screen explanation of how the workspace fits together",
              "After a build-out, to check nothing was left unconnected",
              "When two teams have each configured flows and you want to find duplicated work",
            ]}
          />
          <InfoBox color="violet" icon={<Database size={20} />} title="Structure, not results">
            Apart from line thickness, the map shows how things are connected, not what flowed
            through them. For individual results, credits and failures, use Runs and each
            object&apos;s own history.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to check"]}
            rows={[
              [
                "The map says there is nothing to map",
                "Create a flow, Bucket or Cleaner first; the map only draws objects that exist.",
              ],
              [
                "An object is missing",
                "Check that it isn't archived, that its layer or type isn't hidden in Filters, and that “Connected only” or “Hide non-matching” isn't removing it. Agents and Signals only show when enabled for your organisation.",
              ],
              [
                "A column ends with “+N”",
                "Columns show 30 nodes each. Click “Show all”, or search for the name.",
              ],
              [
                "Zoom and Fit are missing",
                "They are only available in the Columns layout.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/pipelines",
              label: "Build a pipeline on a canvas",
              description: "Chain splitters, flows, agents, Buckets and more into one run.",
            },
            {
              href: "/docs/collections",
              label: "How Collections route documents",
              description: "The classification step that produces the “routes to” lines on the map.",
            },
            {
              href: "/docs/cleaners",
              label: "How Cleaners transform extracted data",
              description: "Why several flows often share one Cleaner node.",
            },
            {
              href: "/docs/buckets",
              label: "Where results are stored",
              description: "The Buckets on the right-hand side, and what writes into them.",
            },
          ]}
        />
      </section>
    </>
  );
}
