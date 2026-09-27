import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Code,
  Database,
  FileDown,
  FilePlus,
  FileUp,
  Fingerprint,
  HelpCircle,
  Info,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Table2,
  Users,
  Workflow,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";

export const metadata = docMetadata("buckets");

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="buckets"
        primaryImage={{
          url: "/assets/docs-bucket-grid-2026-08.jpg",
          caption:
            "A Tavnit Bucket open in the data grid, with typed columns and the Filter, Sort, function row, Graph and Export controls.",
          width: 1327,
          height: 692,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Buckets
        </h1>

        <DocCard icon={<Database size={24} />} title="What are Buckets?">
          <Lead>
            A Bucket is a structured table that lives inside Tavnit. Flows, Signals, Nets, agents
            and pipelines write rows into it automatically, you can add rows over the API or from a
            CSV or Excel file, and you can filter, sort, chart and question the result without
            exporting it anywhere.
          </Lead>
          <p>
            A flow run stores the result of <em>one</em> document. A Bucket is where results
            accumulate across every run, so the question changes from &ldquo;what did this invoice
            say?&rdquo; to &ldquo;what have we been billed this quarter?&rdquo;. Every row has to
            match the Bucket&apos;s columns, which is what keeps that aggregate meaningful.
          </p>
          <Screenshot
            src="/assets/docs-bucket-grid-2026-08.jpg"
            alt="A Tavnit Bucket named Data Set open in the grid view. Typed columns for age, sex, bmi, children, smoker, region and charges hold 1,339 rows, with Insert, Filter, Sort, function row, Graph and Export controls in the toolbar and a column list plus connected flows in the left panel."
            caption="A Bucket in the grid. Column types are shown beside each name, and the row count and paging sit along the bottom."
            width={1327}
            height={692}
          />
          <InfoBox color="purple" icon={<Workflow size={20} />} title="Flows + Buckets">
            Turn on <strong>Bucket Export</strong> on a flow and map its output fields to Bucket
            columns. From then on, every successful run appends its rows, so results from many
            documents build up in one table.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to Use Buckets">
          <p>Buckets are ideal for:</p>
          <BulletList
            items={[
              "Aggregating extraction results from many flow runs into a single table",
              "Keeping reference data (price lists, catalogues, customer lists) that Cleaners look values up against",
              "Syncing data in and out of external systems over the API",
              "Collecting the structured output of Signals, Nets and agents next to your document data",
              "Answering questions about your data in plain language, without a spreadsheet",
            ]}
          />
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs Flow Runs">
            Flow runs store individual document results. Buckets aggregate data across runs
            and other sources into one table you can query, chart and export.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Bucket">
          <p>Owners and Admins can create Buckets:</p>
          <NumberedList
            items={[
              'Go to Buckets in the sidebar and click "Create Bucket" (or start "From template")',
              "Enter a name and, optionally, a description, then pick an icon and a color",
              'Click "Create Bucket". Tavnit then offers "Manage Access" to set who can see it, or "Open Bucket" to go straight to the grid',
              'Add columns: in the grid use "Insert" → "Insert Column", or import a CSV or Excel file and let Tavnit create the columns for you',
              'To fill it from a flow, open the flow, turn on "Bucket Export", link this Bucket and map the flow\'s fields to its columns',
            ]}
          />
          <p>
            Each column has a name and a data type: <strong>Text</strong>, <strong>Number</strong>,{" "}
            <strong>Date</strong>, <strong>Checkbox</strong> or <strong>Dropdown</strong> (a fixed list
            of at least two options). Types are what let sorting, filtering, aggregation and charts
            behave correctly, so a numeric column that arrives as text is worth fixing at the source.
          </p>
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Column names matter">
            When writing over the API, every row must use the Bucket&apos;s column names. A row with
            a column the Bucket doesn&apos;t have aborts the whole write with a column mismatch
            error, so choose clear, consistent names upfront.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Fingerprint size={24} />} title="Finding Your Bucket ID & Name">
          <p>
            To use the Buckets API, you need your bucket&apos;s ID and name. Both are on the
            bucket&apos;s details page:
          </p>
          <NumberedList
            items={[
              'Go to Buckets and click "View details" on the Bucket you want',
              "Copy the Bucket name from the header (it has a copy button)",
              'Open "Bucket ID" under "Features" and copy the ID',
            ]}
          />
          <p>
            The details page also has a <strong>Schema</strong> tab (every column, its type and
            flags), a <strong>Write History</strong> tab (each write, its source and how many rows it
            added), and <strong>Linked Flows</strong>, the flows that export into this Bucket.
          </p>
          <InfoBox color="green" icon={<Shield size={20} />} title="Safety check">
            The API requires both bucket_id and bucket_name to prevent accidental reads and writes
            on the wrong bucket. If the name doesn&apos;t match the ID, the request is rejected.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Where the data comes from">
          <Lead>
            Nothing about a Bucket assumes the data came from a document. Every source below writes
            into the same table, which is what makes a Bucket useful as reference data as well as a
            destination.
          </Lead>
          <DataTable
            head={["Source", "How it works", "Typical use"]}
            rows={[
              [
                <Fragment key="f0">
                  <DocLink href="/docs/flows">Bucket Export</DocLink> on a flow
                </Fragment>,
                "Each successful run appends its rows, with extracted fields mapped onto Bucket columns.",
                "Accumulating every invoice you process into one table.",
              ],
              [
                <Fragment key="f1">
                  A <DocLink href="/docs/cleaners">Cleaner</DocLink> action
                </Fragment>,
                "An action edits a value in an existing Bucket row that a Lookup matched.",
                "Marking an order received, or decrementing a stock count.",
              ],
              [
                <Fragment key="f2">
                  An <DocLink href="/docs/agents">agent</DocLink>
                </Fragment>,
                "An agent with a Bucket delivery writes its captures into the Bucket after each run.",
                "Recording live supplier prices fetched from a portal.",
              ],
              [
                <Fragment key="f3">
                  <DocLink href="/docs/signals">Signals</DocLink> and{" "}
                  <DocLink href="/docs/nets">Nets</DocLink>
                </Fragment>,
                "A Signal can export the rows it structures from each recording; a Net can export the rows of each completed catch.",
                "Tracking call outcomes or social posts alongside document data.",
              ],
              [
                <Fragment key="f4">
                  A <DocLink href="/docs/pipelines">pipeline</DocLink>
                </Fragment>,
                "A Bucket node on the canvas stores what the steps before it produce.",
                "Ending a multi-step pipeline in a table.",
              ],
              [
                <Fragment key="f5">
                  The <DocLink href="/docs/api-integration">REST API</DocLink>
                </Fragment>,
                "Append rows, or replace the table's rows, with one request.",
                "Syncing a price list or customer catalogue from another system.",
              ],
              [
                "CSV or Excel import",
                "Upload a .csv, .xlsx or .xls file from the grid.",
                "Loading an existing spreadsheet once.",
              ],
              [
                "The grid itself",
                "Anyone with edit access can add rows and type, paste or clear values.",
                "Quick corrections and manual entries.",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<ArrowLeftRight size={20} />} title="Buckets read as well as write">
            A Bucket is not only a destination. Cleaner <strong>Lookup</strong> fields pull values
            out of one to enrich a row, and <strong>Bucket Check</strong> fields ask whether a row
            already exists, which is how de-duplication works. Load your catalogue into a Bucket and
            every flow can match against it.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Exports are always un-pivoted">
            If a Cleaner reshapes rows into wide format for delivery, the Bucket still receives the
            original long-format rows. Stored data keeps one row per record so aggregates and
            lookups stay correct.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Working with the data">
          <Lead>
            The grid is closer to a spreadsheet than a read-only report. You can edit in place,
            copy and paste cells, filter and sort, and page through large tables, so a Bucket with
            thousands of rows stays usable in the browser.
          </Lead>
          <DataTable
            head={["Control", "What it does"]}
            rows={[
              ["Insert", "Add a row or a column, import a CSV or Excel file, or open Prompting."],
              ["Filter", "Narrow the view to rows matching conditions you set on any column."],
              ["Sort", "Order the rows by a column, ascending or descending."],
              [
                <Fragment key="f6">
                  <InlineCode>f(x)</InlineCode>
                </Fragment>,
                "Show a function row under the grid with the sum, average, minimum, maximum or count of each column, calculated on the current page.",
              ],
              ["Graph", "Build a chart from the data (see Charts below)."],
              ["Chat", "Open a side panel to ask questions about the data (see below)."],
              ["Export", "Download every row in the Bucket as a CSV file."],
              ["Undo / redo", "Step back and forward through edits made in the grid."],
            ]}
          />
          <p>
            People with view-only access see the same grid with a read-only notice: they can filter,
            sort, chart and export, but not edit.
          </p>
        </DocCard>

        <DocCard icon={<Search size={24} />} title="AI Search on a column">
          <Lead>
            Exact matching fails when the same thing is written different ways: &ldquo;Acme
            Corp.&rdquo;, &ldquo;ACME Corporation&rdquo;, &ldquo;acme&rdquo;. AI Search lets a Cleaner
            match on meaning instead.
          </Lead>
          <NumberedList
            items={[
              'Open the Bucket, click a text column\'s header and choose "Edit column"',
              'Turn on "AI Search"',
              "Set the minimum similarity (1 to 100%, default 90%). Below that threshold a lookup returns empty instead of a weak match",
              'Click "Save Changes". Tavnit indexes the column\'s values in the background',
            ]}
          />
          <p>
            Once it is on, a Cleaner <DocLink href="/docs/cleaners">Lookup</DocLink> can use the{" "}
            <strong>AI Match</strong> operator against that column to find the closest row even when
            the text doesn&apos;t match exactly. AI Search is available on text columns only.
          </p>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Prompting: ask questions in plain language">
          <Lead>
            Prompting answers questions like &ldquo;What is the total amount invoiced by each
            supplier this year?&rdquo; straight from the Bucket, and shows how it got there.
          </Lead>
          <NumberedList
            items={[
              'In the grid, open "Insert" → "Prompting"',
              'Under "Set up Prompting", choose the text columns to index and click "Enable". Tavnit groups their distinct values into categories so questions can filter by meaning',
              'Type your question under "Ask a Question" (up to 2,000 characters) and click "Ask"',
            ]}
          />
          <p>
            Each answer comes with the <strong>Assumptions</strong> it made, the{" "}
            <strong>Matched values</strong> it included or excluded, the result with a{" "}
            <strong>Breakdown</strong> where relevant, and <strong>Sample rows</strong> so you can
            check the data behind it. Past questions stay in <strong>History</strong>.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Access">
            Setting up Prompting requires edit access to the Bucket.
          </InfoBox>
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Chat with the data">
          <p>
            The <strong>Chat</strong> button in the grid opens a side panel where you can have a
            conversation about the Bucket: totals, breakdowns, or &ldquo;show me&rdquo; requests.
            When an answer refers to a set of rows, click <strong>Show in grid</strong> to filter the
            grid to them, and <strong>Clear view</strong> to go back. Chats are saved, so you can
            return to one later or start a <strong>New chat</strong>.
          </p>
          <BulletList
            items={[
              "Chat needs Prompting enabled on at least one text column of the Bucket",
              "Each organisation has a daily message allowance, shown in the panel; it resets the next day",
              "Messages are limited to 2,000 characters",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Enabled on request">
            Bucket chat is enabled per organisation. If you don&apos;t see the Chat button, contact
            support to turn it on.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Access Control">
          <p>
            Every bucket has a visibility setting and supports per-member access grants, so you can
            control exactly who can see or edit your data. Owners and Admins manage it from{" "}
            <strong>Access</strong> on the details page.
          </p>
          <InfoBox color="blue" icon={<Users size={20} />} title="Org-visible (default)">
            All members of your organisation can view the bucket. By default Admins can edit and
            Members can only view; you can change that person by person.
          </InfoBox>
          <InfoBox color="yellow" icon={<Lock size={20} />} title="Private">
            Only the Owner and users who have been explicitly granted access can see this bucket.
            Only the organisation Owner can make a bucket private, and Admins and Members without a
            grant lose access immediately.
          </InfoBox>
          <p>Each person can be given one of two access levels:</p>
          <BulletList
            items={[
              "View only: can open the bucket and read its data",
              "Editor: can also add, edit and delete rows",
            ]}
          />
          <p>
            On a private bucket there is a third option, <strong>No access</strong>. Owners always
            have full access. Admins can set access for Members; only the Owner can change an
            Admin&apos;s access. Changing columns and bucket settings stays with Owners and Admins
            whatever the grant. See <DocLink href="/docs/user-roles">User Roles</DocLink> for the
            full model.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Charts">
          <p>
            You can chart bucket data directly to see trends and aggregations without exporting to
            another tool.
          </p>
          <NumberedList
            items={[
              'Click "Graph" in the grid toolbar',
              "Choose a chart type: Bar, Line, Pie or Scatter (Tavnit marks the best fit for your data)",
              "Pick the field to group by, and whether to count rows or aggregate a numeric field (sum, count, average, minimum or maximum)",
              "Optionally sort, limit to the top 5, 10, 15 or 20, and set a title, color theme, legend and grid",
              'Preview it, then click "Download as PNG" to keep it',
            ]}
          />
          <InfoBox color="purple" icon={<BarChart3 size={20} />} title="Large Buckets">
            Charts use every row for Buckets of up to 10,000 rows. Above that, Tavnit charts a sample
            of about 10,000 rows and tells you so. Charts are not saved with the bucket: download the
            PNG if you need it later.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FileDown size={24} />} title="Import & Export">
          <InfoBox color="green" icon={<FileUp size={20} />} title="Import CSV / Excel">
            Choose &ldquo;Insert&rdquo; → &ldquo;Import CSV / Excel&rdquo; and pick a .csv, .xlsx or
            .xls file. Tavnit matches file columns to Bucket columns by name; for the rest you can map
            each one to an existing column, create it as a new column, or skip it, then click
            &ldquo;Import&rdquo; (or &ldquo;Create &amp; Import&rdquo;).
          </InfoBox>
          <InfoBox color="blue" icon={<FileDown size={20} />} title="Export to CSV">
            &ldquo;Export&rdquo; downloads every row in the Bucket as a CSV file, regardless of the
            filters on screen. Useful for sending data to other tools or keeping an offline backup.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="Buckets API">
          <p>
            Two endpoints work with your API key (<InlineCode>X-API-Key</InlineCode> header). Both
            require <InlineCode>bucket_id</InlineCode> and <InlineCode>bucket_name</InlineCode>.
          </p>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              [
                <Fragment key="f7">
                  <InlineCode>POST /api/buckets/write</InlineCode>
                </Fragment>,
                "Adds rows (overwrite: false) or replaces the table's rows (overwrite: true). Up to 50,000 rows per request.",
              ],
              [
                <Fragment key="f8">
                  <InlineCode>GET /api/buckets/read</InlineCode>
                </Fragment>,
                "Returns the columns and a page of rows, with total_count and has_more. Use limit (default 100, max 1,000) and offset to page.",
              ],
            ]}
          />
          <p>
            Full request and response examples are on the{" "}
            <DocLink href="/docs/api-integration">API page</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to check"]}
            rows={[
              [
                "The grid says it is read-only",
                "You have view-only access. Ask an Owner or Admin to give you Editor access on this Bucket.",
              ],
              [
                "An API write is rejected with a column mismatch",
                "A row uses a column name the Bucket doesn't have. Compare your keys with the Schema tab.",
              ],
              [
                "An API call is rejected with a bucket mismatch",
                "bucket_name doesn't match the Bucket for that bucket_id. Copy both again from the details page.",
              ],
              [
                "A flow runs but no rows appear",
                "Check that Bucket Export is on for the flow and that its fields are mapped to columns. Only successful runs export.",
              ],
              [
                "The Chat button is missing",
                "Bucket chat is enabled per organisation; contact support.",
              ],
              [
                "Chat says it isn't ready",
                "Enable Prompting on at least one text column first.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Look values up in a Bucket, and write back to it",
              description:
                "Lookup, AI Match, Bucket Check and the edit-row action: the field types that read and update stored rows.",
            },
            {
              href: "/docs/api-integration",
              label: "Read and write rows over the REST API",
              description:
                "The Buckets endpoints, with examples and the bucket_id plus bucket_name safety check.",
            },
            {
              href: "/docs/user-roles",
              label: "Who can see and edit a Bucket",
              description:
                "How per-Bucket visibility and access grants layer on top of org roles.",
            },
            {
              href: "/docs/mcp-connector",
              label: "Ask an AI assistant about your Bucket",
              description:
                "The MCP connector lets Claude or Cursor query stored rows in conversation.",
            },
          ]}
        />
      </section>
    </>
  );
}
