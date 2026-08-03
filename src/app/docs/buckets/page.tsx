import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, ArrowLeftRight, BarChart3, Database, FileDown, FilePlus, FileUp, Fingerprint, Info, Lock, Shield, Table2, Users, Workflow } from "lucide-react";
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
            "A Tavnit Bucket open in the data grid, with typed columns and the Filter, Sort, formula, Graph and Export controls.",
          width: 1327,
          height: 692,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Buckets
        </h1>

        <DocCard icon={<Database size={24} />} title="What are Buckets?">
          <Lead>
            A Bucket is a structured table that lives inside Tavnit. Flows write their extracted rows
            into it automatically, you can append to it over the API or from a CSV, and you can
            filter, sort, compute and chart the result without exporting it anywhere.
          </Lead>
          <p>
            A flow run stores the result of <em>one</em> document. A Bucket is where results
            accumulate across every run, so the question changes from &ldquo;what did this invoice
            say?&rdquo; to &ldquo;what have we been billed this quarter?&rdquo;. Every row has to
            match the Bucket&apos;s columns, which is what keeps that aggregate meaningful.
          </p>
          <Screenshot
            src="/assets/docs-bucket-grid-2026-08.jpg"
            alt="A Tavnit Bucket named Data Set open in the grid view. Typed columns for age, sex, bmi, children, smoker, region and charges hold 1,339 rows, with Insert, Filter, Sort, formula, Graph and Export controls in the toolbar and a column list plus connected flows in the left panel."
            caption="A Bucket in the grid. Column types are shown beside each name, and the row count and paging sit along the bottom."
            width={1327}
            height={692}
          />
          <InfoBox color="purple" icon={<Workflow size={20} />} title="Flows + Buckets">
            You can link flows to buckets so that extracted data is automatically written into the bucket
            after each document is processed. This lets you aggregate results from multiple runs into one place.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to Use Buckets">
          <p>Buckets are ideal for:</p>
          <BulletList
            items={[
              "Aggregating extraction results from multiple flow runs into a single table",
              "Building datasets that combine document data with external sources",
              "Syncing data from external systems via the API",
              "Creating a central data store that multiple flows write into",
            ]}
          />
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs Flow Runs">
            Flow runs store individual document results. Buckets aggregate data across runs
            and external sources into a unified table you can export or query.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Bucket">
          <p>Follow these steps to create a bucket:</p>
          <NumberedList
            items={[
              'Go to the Buckets page from the main navigation',
              'Click "New Bucket" and give it a name',
              "Define the columns (name and data type for each)",
              "Optionally link flows that should write data into this bucket",
              "Save your bucket",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Column names matter">
            When using the API, every row you send must have exactly the same column names as your bucket.
            Choose clear, consistent names upfront.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Fingerprint size={24} />} title="Finding Your Bucket ID & Name">
          <p>To use the Buckets API, you need your bucket&apos;s ID and name. Both are available in the bucket info dialog:</p>
          <NumberedList
            items={[
              "Go to the Buckets page",
              "Tap the info icon on the bucket you want to use",
              "Copy the Bucket ID and Bucket Name (both are copyable with a single tap)",
            ]}
          />
          <InfoBox color="green" icon={<Shield size={20} />} title="Safety check">
            The API requires both bucket_id and bucket_name to prevent accidental writes to the wrong bucket.
            If the name doesn&apos;t match the ID, the request is rejected.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Four ways data gets in">
          <Lead>
            Nothing about a Bucket assumes the data came from a document. Flow exports, Cleaner
            actions, agents, the API and CSV import all write into the same table, which is what
            makes a Bucket useful as reference data as well as a destination.
          </Lead>
          <DataTable
            head={["Source", "How it works", "Typical use"]}
            rows={[
              [
                "Bucket export on a flow",
                "Each completed run appends its rows, with extracted fields mapped onto Bucket columns.",
                "Accumulating every invoice you process into one table.",
              ],
              [
                <Fragment key="f0">
                  A <DocLink href="/docs/cleaners">Cleaner</DocLink> action
                </Fragment>,
                "A conditional action writes a value back into an existing Bucket row that a Lookup matched.",
                "Marking an order received, or decrementing a stock count.",
              ],
              [
                <Fragment key="f1">
                  An <DocLink href="/docs/agents">agent</DocLink>
                </Fragment>,
                "One row per agent run, with captures mapped onto columns.",
                "Recording live supplier prices fetched from a portal.",
              ],
              [
                <Fragment key="f2">
                  The <DocLink href="/docs/api-integration">REST API</DocLink> or a CSV import
                </Fragment>,
                "Append rows directly, by request or by upload.",
                "Loading a price list or customer catalogue to look values up against.",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<ArrowLeftRight size={20} />} title="Buckets read as well as write">
            A Bucket is not only a destination. Cleaner <strong>Lookup</strong> fields pull values
            out of one to enrich a row, and <strong>Bucket Check</strong> fields ask whether a row
            already exists — which is how de-duplication works. Load your catalogue into a Bucket and
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
            filter and sort, add computed columns, and page through large tables — a Bucket with
            thousands of rows stays usable in the browser.
          </Lead>
          <DataTable
            head={["Control", "What it does"]}
            rows={[
              ["Insert", "Add rows or columns to the table."],
              ["Filter", "Narrow the view to rows matching conditions you set."],
              ["Sort", "Order by one or more columns."],
              [
                <Fragment key="f3">
                  <InlineCode>f(x)</InlineCode>
                </Fragment>,
                "Add a computed column derived from the others.",
              ],
              ["Graph", "Chart the data in place — see below."],
              ["Export", "Download the current rows as CSV."],
              ["Undo / redo", "Step back through edits made in the grid."],
            ]}
          />
          <p>
            Each column carries a type — text, number, date or boolean — shown beside its name.
            Types are what let sorting, aggregation and charts behave correctly, so a numeric column
            that arrived as text is worth fixing at the source rather than in the grid.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Access Control">
          <p>
            Every bucket has a visibility setting and supports per-member access grants,
            so you can control exactly who can see or edit your data.
          </p>
          <InfoBox color="blue" icon={<Users size={20} />} title="Org-wide (default)">
            All members of your organisation can view the bucket. Admins and owners can always edit it.
          </InfoBox>
          <InfoBox color="yellow" icon={<Lock size={20} />} title="Private">
            Only users who have been explicitly granted access can see or edit this bucket.
            Only admins and owners can make a bucket private.
          </InfoBox>
          <p>Member-level grants (for private buckets or fine-grained control):</p>
          <BulletList
            items={[
              "View — can open the bucket and read its data",
              "Edit — can add, update, and delete rows",
              "Admin — can change columns, visibility, and manage other members' access",
            ]}
          />
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Charts">
          <p>
            You can create charts directly from bucket data to visualise trends and aggregations
            without exporting to another tool.
          </p>
          <InfoBox color="purple" icon={<BarChart3 size={20} />} title="Supported chart types">
            Bar, Line, Pie, and Scatter charts are available. Each chart is saved with the bucket
            and visible to anyone who can access it.
          </InfoBox>
          <p>Creating a chart:</p>
          <NumberedList
            items={[
              "Open the bucket's detail page",
              'Click "Add Chart" in the charts section',
              "Choose chart type and select x-axis and y-axis fields",
              "For bar and line charts, choose an aggregation (sum, average, count)",
              "Save — the chart appears immediately and updates with new data",
            ]}
          />
        </DocCard>

        <DocCard icon={<FileDown size={24} />} title="CSV Import & Export">
          <p>Buckets support importing data from CSV files and exporting all rows to CSV.</p>
          <InfoBox color="green" icon={<FileUp size={20} />} title="Import from CSV">
            Upload a CSV file and Tavnit will map its columns to your bucket&apos;s columns.
            Column names in the CSV must match the bucket&apos;s column names exactly.
          </InfoBox>
          <InfoBox color="blue" icon={<FileDown size={20} />} title="Export to CSV">
            Download all current rows as a CSV file from the bucket&apos;s detail page.
            Useful for sending data to other tools or creating offline backups.
          </InfoBox>
          <p>Both import and export are available from the toolbar at the top of the bucket&apos;s data table.</p>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Look values up in a Bucket, and write back to it",
              description:
                "Lookup, Bucket Check and the edit-row action — the field types that read and update stored rows.",
            },
            {
              href: "/docs/api-integration",
              label: "Append rows over the REST API",
              description:
                "The Buckets endpoint, with Python and JavaScript examples and the bucket_id plus bucket_name safety check.",
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
