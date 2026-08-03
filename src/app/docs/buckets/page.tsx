import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, ArrowLeftRight, BarChart3, Database, FileDown, FilePlus, FileUp, Fingerprint, Info, Lock, Shield, Users, Workflow } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("buckets");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="buckets" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Buckets
        </h1>

        <DocCard icon={<Database size={24} />} title="What are Buckets?">
          <p>
            Buckets are structured data tables that collect and organize information.
            They can receive data automatically from your flows or be populated programmatically via the API.
          </p>
          <p>
            Think of a bucket as a spreadsheet with defined columns. Each row of data must match
            the bucket&apos;s column structure, ensuring consistency across all entries.
          </p>
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
      </section>
    </>
  );
}
