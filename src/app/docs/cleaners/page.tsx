import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Calculator,
  CalendarClock,
  Clock,
  Code,
  FilePlus,
  HelpCircle,
  Info,
  Package,
  PenLine,
  Radar,
  Send,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  Table2,
  Wand2,
  Zap,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("cleaners");

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="cleaners"
          primaryImage={{
            url: "/assets/docs-cleaner-fields-2026-08.jpg",
            caption:
              "A Tavnit Cleaner detail page listing every field type in the left rail with a count for each.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Cleaners
        </h1>

        <DocCard icon={<Wand2 size={24} />} title="What a Cleaner does">
          <Lead>
            A Cleaner is a set of rules that runs over rows of data: the rows a flow has extracted,
            or a spreadsheet you upload. It standardises formats, converts currencies and units,
            translates text, computes new columns, looks values up against your own data, flags
            outliers, collects values from a reviewer, and can trigger actions when a row breaks a
            rule.
          </Lead>
          <p>
            Extraction answers &ldquo;what does this document say?&rdquo;. A Cleaner answers
            &ldquo;what shape does that have to be in before it can go into our systems?&rdquo;:
            one date format, one currency, part numbers matched to your catalogue, a total that adds
            up.
          </p>
          <DataTable
            head={["", "A flow", "A Cleaner"]}
            rows={[
              ["Works on", "A document", "The rows a flow produced, or an uploaded CSV or Excel file"],
              ["Produces", "Raw extracted fields", "Normalised, enriched and validated columns"],
              [
                "Typical job",
                "Read the invoice",
                "Convert EUR to USD, reformat the dates, flag the total that does not match",
              ],
              [
                "Attached to",
                "Nothing: it is the starting point",
                "Any number of flows (each flow has at most one Cleaner), or run on its own",
              ],
            ]}
          />
          <p>
            One execution of a Cleaner over a batch of rows is called a <strong>sweep</strong>.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Cleaner">
          <Lead>
            Click <strong>Create Cleaner</strong> on the Cleaners page. Tavnit first asks{" "}
            <em>&ldquo;Where does the data come from?&rdquo;</em> and offers four starting points.
          </Lead>
          <DataTable
            head={["Option", "What happens"]}
            rows={[
              [
                <strong key="c0">From a flow</strong>,
                "Pick the flow whose output this Cleaner will receive. Its output fields become the base fields, and the name is suggested from the flow.",
              ],
              [
                <strong key="c1">From a file</strong>,
                "Upload a sample CSV or Excel file. Its header row becomes the base fields.",
              ],
              [
                <strong key="c2">From a template</strong>,
                "Duplicate one of your existing Cleaners, with all its fields and settings, and edit the copy.",
              ],
              [
                <strong key="c3">Start from scratch</strong>,
                "Open the full builder and define everything by hand.",
              ],
            ]}
          />
          <p>
            For <strong>From a flow</strong> and <strong>From a file</strong>, the next step also
            offers <strong>Suggest cleaning rules with AI</strong>. Leave it off and the Cleaner is
            created with just the base fields. Turn it on and, optionally, describe what you want to
            clean or compute (for example <em>&ldquo;Normalize supplier names and format the RUC
            without dashes&rdquo;</em>), then click <strong>Suggest rules</strong>.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="How AI rule suggestions work">
            The AI studies your columns and real sample values (for a flow, rows from its most
            recent completed run) and drafts rules such as AI formatting, date and number formats,
            formulas, categories, conditionals and conversions. You can uncheck any suggestion or
            open it in the same editor the builder uses; a rule marked &ldquo;Needs attention&rdquo;
            needs a fix before it is valid. Everything stays editable after the Cleaner is created.
          </InfoBox>
          <p>
            <strong>Start from scratch</strong> opens the builder, where you name the Cleaner and
            work through the same sections the detail page has:
          </p>
          <NumberedList
            items={[
              <Fragment key="f0">
                <strong>Base Fields.</strong> Choose a <strong>Data Source</strong>:{" "}
                <strong>Manual</strong> to define columns from scratch, <strong>From Flow</strong> to
                import a flow&apos;s output fields, or <strong>From File</strong> to parse a CSV or
                Excel header row. At least one field is needed.
              </Fragment>,
              <Fragment key="f1">
                <strong>Computed fields.</strong> Add any of the field types in the reference below.
                Optional: a Cleaner with only base fields is a valid pass-through.
              </Fragment>,
              <Fragment key="f2">
                <strong>Outputs.</strong> An email address and a webhook URL for sweeps the Cleaner
                runs on its own. Optional.
              </Fragment>,
              <Fragment key="f3">
                <strong>Skip Rows.</strong> Drop the first N rows or empty rows of uploads. Optional.
              </Fragment>,
            ]}
          />
          <p>
            To have every run of a flow swept automatically, link the Cleaner to it: tick{" "}
            <strong>Link this cleaner to the flow</strong> when you build from a flow, or choose the
            Cleaner in the flow&apos;s <strong>Cleaner</strong> setting. A flow can have only one
            Cleaner; one Cleaner can serve several flows, listed under{" "}
            <strong>Linked Flows</strong> on its detail page. Creating and editing Cleaners requires
            the Admin or Owner role.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Keep base fields in step with the flow">
            If a linked flow&apos;s fields change, use <strong>Sync from Flow</strong> (or{" "}
            <strong>Resync fields</strong> next to the flow under Linked Flows). It shows what is
            new in the flow, which types changed and what no longer exists, and applies the
            differences. Removing a column is optional, and computed fields that reference a removed
            column must be updated by hand.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Field type reference">
          <Lead>
            Every column in a Cleaner has a type that decides what it does. The detail page groups
            them in its left rail under <strong>Input</strong> and <strong>Computed</strong>, with a
            count for each. This is the complete set, in the order the app lists them.
          </Lead>
          <Screenshot
            src="/assets/docs-cleaner-fields-2026-08.jpg"
            alt="A Tavnit Cleaner detail page. The left rail lists every field type — Base Fields, AI Formatted, Date Format, Number Format, Calculated, Category, HS Code, Lookup, Bucket Check, Conditional Actions, Conditional, Currency, Translation, Unit Conv. and Summary — with a count beside each, next to the Cleaner's base field list."
            caption="Field types are grouped in the Cleaner's left rail, with a count showing how many of each this Cleaner uses."
          />
          <DataTable
            head={["Field type", "What it produces"]}
            rows={[
              ["Base Fields", "A column from the incoming data, passed through to the output."],
              [
                "AI Formatted",
                "An AI rewrite driven by your instructions: normalising a supplier name, tidying an address, standardising a description. Reads the input columns you pick, or the whole row.",
              ],
              [
                "Date Format",
                "A date column re-rendered in one output format, with optional AI conversion for values the input format cannot parse.",
              ],
              [
                "Number Format",
                "A numeric column with a fixed number of decimals (0 to 6) and your choice of thousands and decimal separators.",
              ],
              ["Calculated", "A value derived by an arithmetic formula from other columns in the same row."],
              [
                "Category",
                "An AI classification into a fixed list of at least two options you define: expense type, department, priority.",
              ],
              ["HS Code", "An AI tariff classification against the Panama tariff schedule (HS 2022)."],
              [
                "Human Input",
                <Fragment key="t0">
                  A column a reviewer fills in during{" "}
                  <DocLink href="/docs/human-in-the-loop">human review</DocLink>, as free text or
                  from a menu. See below.
                </Fragment>,
              ],
              [
                "Lookup",
                <Fragment key="t1">
                  A value pulled from a <DocLink href="/docs/buckets">Bucket</DocLink> by matching
                  this row against it (a catalogue price, a customer code), with a fallback value
                  when nothing matches. Match conditions can compare values exactly or use AI
                  matching.
                </Fragment>,
              ],
              [
                "Bucket Check",
                "A yes/no answer to whether this row already exists in a Bucket. Useful for de-duplication.",
              ],
              [
                "Conditional Actions",
                "Not a value: a rule that fires actions when a row matches. See below.",
              ],
              [
                "Conditional",
                "An if/else value: if, else-if and else branches that test the row's contents, each with its own output value.",
              ],
              [
                "Currency",
                "A monetary value converted to a target currency, at a live rate or a fixed rate you set. The source currency can be auto-detected.",
              ],
              [
                "Translation",
                "Text translated into a target language, optionally keeping formatting and skipping rows already in that language.",
              ],
              [
                "Unit Conv.",
                "A measurement converted between units: mass, length, volume, temperature, area, speed or data size.",
              ],
              ["Summary", "One aggregate computed across all rows of the sweep, written on every row."],
              [
                "Anomaly Check",
                "true/false for values that stand out from the rest of the sweep. Deterministic, no AI.",
              ],
              [
                "Date Calculation",
                "Days, weeks, months or years between two dates, or a date shifted from today or from a column. Deterministic, no AI.",
              ],
            ]}
          />
          <InfoBox
            color="violet"
            icon={<ArrowLeftRight size={20} />}
            title="Replace the column, or add a new one"
          >
            Most computed fields have an output mode. <strong>Replace column</strong> overwrites a column
            in place: you pick the column, and the field takes its name. <strong>New column</strong>{" "}
            keeps the original and writes the result alongside it under a name you choose. Keep the
            original when a reviewer will need to see what the document actually said, for example
            when converting currency.
          </InfoBox>
          <p>
            Any field can be marked <strong>Exclude from output</strong>: it stays available to
            computed columns but does not appear in what the Cleaner delivers. That is how you use an
            intermediate value (a raw amount, a lookup key) without shipping it downstream.
          </p>
        </DocCard>

        <DocCard icon={<SlidersHorizontal size={24} />} title="Formatting and conversion options">
          <Lead>
            The formatting and conversion types each have a small set of settings. These are the ones
            that change the result.
          </Lead>
          <DataTable
            head={["Field type", "Settings"]}
            rows={[
              [
                "Date Format",
                "Input format (dd/mm/yyyy or mm/dd/yyyy) and output format (yyyy-MM-dd, dd/MM/yyyy, MM/dd/yyyy or MMM d, yyyy). Turn on AI conversion and values the input format cannot parse, in any language or notation, are converted by AI into the output format. Add optional special instructions (for example “source date + 40 days”) and every value is processed by AI instead.",
              ],
              ["Number Format", "Decimals, thousands separator (none, comma, period or space) and decimal separator."],
              [
                "AI Formatted",
                "The input columns the AI reads (none selected means the whole row) and instructions describing the transformation.",
              ],
              [
                "Category",
                "The options, the columns the AI evaluates (none selected means the whole row) and optional instructions.",
              ],
              [
                "Currency",
                "Source currency (or auto-detect), target currency, and live rate or fixed rate. In live mode the editor previews the current rate.",
              ],
              [
                "Translation",
                "Source and target language, preserve formatting, and only translate if not already in the target language.",
              ],
              ["Unit Conv.", "Category, source unit (or auto-detect) and target unit."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Zap size={24} />} title="Conditional Actions">
          <Lead>
            A Conditional Actions field is a rule: <em>when a row matches these conditions, do these
            things</em>. It is the only field type that changes what happens to the data rather than
            what a cell contains, and it is how validation failures become something other than a
            number in a table.
          </Lead>
          <DataTable
            head={["Action", "What it does"]}
            rows={[
              [
                "Skip Row",
                "Drops the matching row from the output entirely: the way to filter out subtotals, blank lines and header junk.",
              ],
              [
                "Human in the Loop",
                <Fragment key="f6">
                  Pauses the flow run for{" "}
                  <DocLink href="/docs/human-in-the-loop">human review</DocLink> and assigns the
                  reviewers you name on the action. The matching rows and fields are flagged in the
                  review screen.
                </Fragment>,
              ],
              [
                "Send Email",
                "Sends a notification to the recipients you list, with a subject and body you write. One send per rule per sweep, not one per matching row.",
              ],
              [
                "Send Webhook",
                "POSTs a notification to a URL you specify. Same one-send-per-rule behaviour.",
              ],
              [
                "Edit Bucket Row",
                <Fragment key="f7">
                  Writes a value back into the <DocLink href="/docs/buckets">Bucket</DocLink> row a
                  Lookup field matched: marking an order received, decrementing stock, setting a
                  status. The sweep page lists every cell changed under Bucket Changes.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Conditions are grouped, and groups combine with AND or OR, so you can express things like{" "}
            <em>(total &gt; 10,000 OR currency is not USD) AND supplier is not on the approved
            list</em>. Conditions can read computed columns too, including Summary and Anomaly Check
            fields. A rule with no conditions at all fires on every row.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Notifications fire even if the run is rejected">
            Email and webhook actions are dispatched as soon as the rule matches, before any review
            pause. That is deliberate: <em>alert me when this happens</em> should not depend on
            whether a reviewer later approves the run. They fire on standalone sweeps too; the Human
            in the Loop action only applies to flow runs, since a standalone sweep has no review
            step.
          </InfoBox>
          <p>
            <strong>Worked example.</strong> On an invoice Cleaner, add a Conditional Actions field
            with two rules. The first matches rows where the line total does not equal quantity ×
            unit price and sends the run to Human in the Loop. The second matches any invoice over
            your approval threshold and emails the finance lead. Everything else flows straight
            through to the Bucket without a human touching it.
          </p>
        </DocCard>

        <DocCard icon={<Calculator size={24} />} title="Calculated fields and formulas">
          <Lead>
            A Calculated field evaluates an arithmetic expression against the row it is on. Reference
            other columns by name in braces, and start the formula with an equals sign if you like:
            both <InlineCode>{"={Quantity} * {Unit Price}"}</InlineCode> and{" "}
            <InlineCode>{"{Quantity} * {Unit Price}"}</InlineCode> work.
          </Lead>
          <DataTable
            head={["Supported", "Notes"]}
            rows={[
              [
                <Fragment key="f8"><InlineCode>+ − * / % **</InlineCode></Fragment>,
                "Add, subtract, multiply, divide, remainder, power. Parentheses group as usual.",
              ],
              [
                <Fragment key="f9"><InlineCode>{"{Field Name}"}</InlineCode></Fragment>,
                "A reference to another column in the same row, including other Calculated and Summary fields. Spaces in the name are fine.",
              ],
              [
                "Numbers written as text",
                <Fragment key="f10">
                  Coerced automatically, so <InlineCode>&ldquo;1,234.50&rdquo;</InlineCode> behaves
                  as a number.
                </Fragment>,
              ],
              ["Blank cells", "Count as zero, so a missing optional column does not break the row."],
              [
                "Format result",
                "Optional decimals and separators for the displayed result. The value stays numeric, so formatted fields still work in other formulas.",
              ],
            ]}
          />
          <WarningBox>
            Formulas are arithmetic only: there are no functions, no text operations and no
            conditionals. For if/else logic use a Conditional field; for totals across rows use a
            Summary field; for date arithmetic use Date Calculation. Dividing by zero leaves that
            cell blank and records an error on the row, so guard columns that can legitimately be
            zero.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Sigma size={24} />} title="Summary fields">
          <Lead>
            Summary fields aggregate across every row in the sweep instead of computing per row, and
            write the result on every row. They answer &ldquo;what is the total of this
            document?&rdquo; without you having to sum the rows downstream.
          </Lead>
          <DataTable
            head={["Aggregation", "Result"]}
            rows={[
              ["Sum", "Total of a numeric column"],
              ["Average", "Mean of a numeric column"],
              ["Minimum / Maximum", "Smallest and largest value"],
              ["Median", "Middle value of a numeric column"],
              ["Count (non-empty)", "How many values the column holds"],
              ["Count distinct", "How many distinct values appear"],
            ]}
          />
          <BulletList
            items={[
              "Only include rows matching: optional condition groups, so you can sum just the rows of one category or status.",
              "Format result: optional decimals and separators, as on Calculated fields. The value stays numeric.",
              "Multi-value cells: when a column holds several values per row (a multi-value flow field, such as every deduction line on a payslip), each value counts. Sum adds them all, Count counts each one and Average divides by the number of values.",
              "Summary results can be used in formulas and in Conditional Actions conditions.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Human Input fields">
          <Lead>
            A Human Input field is a column nobody extracts: a reviewer types or picks its value on
            the review screen. Use it for information that is not in the document, such as the
            warehouse a delivery goes to or an approval code.
          </Lead>
          <BulletList
            items={[
              "Input type: Free text, or Menu. A menu takes its options from the distinct values of a Bucket column, optionally filtered by conditions on other Bucket columns or on the current row's values.",
              "Value is mandatory: when on, approval is blocked until every row has a value. Turn it off to allow blanks.",
              "Reviewers: pick at least one. They are added to the reviewers of the run.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Every flow run goes to review">
            While a Cleaner has a Human Input field in its output, every flow run through that
            Cleaner pauses for human review, whatever the data looks like. Standalone sweeps have no
            review step and deliver the column blank. A Human Input field excluded from the output
            has no effect.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Radar size={24} />} title="Anomaly Check">
          <Lead>
            An Anomaly Check flags rows whose value in one column stands out from the rest of the
            sweep: a quantity far from the others, or a code from a category almost nothing else
            uses. It returns <InlineCode>true</InlineCode> when the value stands out and{" "}
            <InlineCode>false</InlineCode> otherwise. It is deterministic and uses no AI.
          </Lead>
          <DataTable
            head={["Setting", "What it does"]}
            rows={[
              [
                "Column to check",
                "Any earlier column, including computed ones such as HS Code or Calculated.",
              ],
              [
                "Detection",
                "Auto (numeric columns get outlier detection, everything else rare-value detection), Numeric outliers, or Rare values.",
              ],
              [
                "Numeric outliers",
                "Compares each value to the sweep's median using a robust spread, so one outlier cannot hide itself. Tune the sensitivity cutoff (higher means fewer flags) and the direction: both sides, only unusually low or only unusually high.",
              ],
              [
                "Rare values",
                "Flags values whose group falls below a share of rows you set. Compare only the first N characters to group codes, for example 2 for HS chapters or 4 for headings.",
              ],
              [
                "Compare within",
                "Optionally judge each value only against rows that share another column's value.",
              ],
              ["Minimum rows", "Sweeps with fewer values than this flag nothing."],
            ]}
          />
          <p>
            An Anomaly Check only produces a flag. To act on it, add a Conditional Actions rule such
            as <em>this field equals true → Human in the Loop</em>. The review screen then shows why
            each value was flagged.
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Date Calculation">
          <Lead>
            A Date Calculation does date arithmetic on every row, deterministically and without AI.
            It has two modes.
          </Lead>
          <DataTable
            head={["Calculation", "Returns"]}
            rows={[
              [
                "Difference between two dates",
                "A whole number of units from Start to End (End − Start), negative when End is earlier. Start and End are each a column or Today, but not both Today. Use it for days until an expiry date, or an age.",
              ],
              [
                "Shift a date",
                "A date (YYYY-MM-DD) moved forward or back by a whole amount of days, weeks, months or years from a column or from Today. A negative amount moves it earlier.",
              ],
            ]}
          />
          <BulletList
            items={[
              "Units for a difference: Days, Weeks (whole weeks), Months (complete, like an age), Calendar months (month boundaries crossed, ignoring the day) and Years (complete).",
              "Today is your organization's date when the data is processed.",
              "A blank date gives a blank cell. Pair the result with a Conditional field (for example days_to_expiry >= 30 → yes, else → no) to flag rows.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Package size={24} />} title="HS Code classification">
          <Lead>
            The HS Code field assigns a customs tariff code to each row from its product description.
            It works down the Panama tariff schedule (HS 2022): section, then chapter, then heading,
            then national tariff line, rather than pattern-matching a description against a code
            list.
          </Lead>
          <BulletList
            items={[
              "Benchmark Fields: the columns the classifier reads, usually the product description, sometimes with material or use alongside it. Leave it unset and the whole row is used.",
              "Instructions for AI: the cases your catalogue gets wrong, such as how to treat kits, spare parts, or goods that could sit in two chapters.",
              "Section preselect (recommended): starts the cascade at the 22 HS sections before chapters.",
              "Output Format: the code only (for example 0101.29.00.00.00) or the code plus its description.",
              "Rows are classified independently, so one hard row does not affect the others.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="It is a classification, not a ruling">
            Tariff classification is a judgement call that customs authorities make. Treat the output
            as a strong first pass to be checked, not as a filing-ready declaration. It is a good
            candidate for an Anomaly Check on the first characters of the code, or for{" "}
            <DocLink href="/docs/human-in-the-loop">human review</DocLink> before delivery.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Shaping and delivering the output">
          <Lead>
            After the computed columns, a Cleaner can drop junk rows, choose and order the columns
            it ships, reshape long data into wide, and send the result to an email address or a
            webhook.
          </Lead>
          <DataTable
            head={["Setting", "What it does"]}
            rows={[
              [
                "Skip Rows",
                "Don't skip any rows, skip the first N rows, or skip empty rows of manual uploads before cleaning: for spreadsheets with title rows above the header.",
              ],
              [
                "Output Fields",
                "Chooses which fields appear in the cleaned output, and in what order: drag them to set the column order. That order is the column order everywhere the output goes. At least one field must stay included.",
              ],
              [
                "Pivot",
                "Delivers rows in wide format: one column per distinct value of a label column (sizes, for example), filled from a value column. See below.",
              ],
              [
                "Email Output",
                "Emails the cleaned result to this address after each sweep the Cleaner runs on its own.",
              ],
              [
                "Webhook",
                <Fragment key="f11">
                  POSTs the cleaned result to this URL after each sweep the Cleaner runs on its own.
                  HTTPS only. See <DocLink href="/docs/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Which sweeps use the Cleaner's own outputs">
            The Cleaner&apos;s Email Output and Webhook deliver the sweeps it runs on its own: Clean
            Dataset uploads and API sweeps. A flow run&apos;s sweep delivers through that flow&apos;s
            own email output and webhook instead, so nothing receives the same document twice.
          </InfoBox>
          <p>
            <strong>Pivot</strong> is the delivery format, not just a view. Choose the{" "}
            <strong>Column to explode</strong>, the column the <strong>Values from</strong>, how to{" "}
            <strong>Group rows by</strong> (all other columns automatically, or columns you choose),
            and what to do when a label repeats within a group: sum the values, keep the first
            value, or keep the first value and flag a warning. Optional{" "}
            <strong>Summary columns</strong> (Sum, Average, Minimum, Maximum or Count) are computed
            per row across the exploded columns and appear at the far right. Under{" "}
            <strong>Apply to</strong>, choose the webhook payload, the email output and downloads;
            when downloads are on, the sweep page opens on the pivoted view.
          </p>
          <InfoBox color="violet" icon={<Info size={20} />} title="Pivot does not reach Buckets">
            Stored rows stay in long format, and Bucket exports always receive the un-pivoted rows,
            so the stored table keeps one row per record.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Sweeps">
          <Lead>
            A sweep is one execution of a Cleaner over a batch of rows.
          </Lead>
          <DataTable
            head={["How a sweep starts", "When to use it"]}
            rows={[
              [
                "Linked to a flow",
                "Every run of that flow is swept as soon as extraction completes. This is the normal setup.",
              ],
              [
                "Clean Dataset",
                "Upload a CSV, XLSX or XLS file with the Clean button on the Cleaner (or Clean Dataset on the Cleaners page): a supplier price list, a legacy export.",
              ],
              ["API", "Send a file or JSON rows to the Cleaner from your own systems. See below."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="The sweep page">
          <Lead>
            Open any sweep from the Cleaner&apos;s <strong>Sweep History</strong> to see exactly
            what it did. The page updates live while the sweep is processing.
          </Lead>
          <BulletList
            items={[
              "Status (Processing, Completed, Failed or Cancelled) with the Rows and Source of the sweep.",
              "Warnings: per-row problems such as a formula that divided by zero or a value that could not be read as a number. Problems stay attached to the row that caused them, so one bad row does not fail the sweep.",
              "Sweep Information: the Cleaner, when the sweep was created, and the source run and flow when it came from a flow.",
              "The data table, with a Cleaned / Pivoted / Raw toggle to compare the output with what came in, and Expand for a full-screen view. You can select and copy cells.",
              "CSV and JSON export of the current view. With a pivot applied to downloads, the export has the pivoted shape.",
              "Outputs: a log of each delivery (email, webhook, notifications) and whether it succeeded.",
              "Bucket Changes: every Bucket cell the sweep's Edit Bucket Row actions changed.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Code size={24} />} title="Running a Cleaner from the API">
          <Lead>
            A Cleaner can run on its own from your systems, with no flow involved. Copy its ID from
            the <strong>Cleaner ID</strong> panel and authenticate with your API key.
          </Lead>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              [
                <InlineCode key="a0">POST /api/sweeps/run</InlineCode>,
                <Fragment key="a1">
                  Multipart upload of a CSV or XLSX file with <InlineCode>cleaner_id</InlineCode>{" "}
                  and <InlineCode>file</InlineCode> (optional <InlineCode>sheet_name</InlineCode>).
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"POST /api/cleaners/<cleaner_id>/process"}</InlineCode>,
                <Fragment key="a3">
                  The same, and also accepts rows as JSON (
                  <InlineCode>{'{"rows": [...]}'}</InlineCode>) instead of a file.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Both return HTTP 202 with a <InlineCode>sweep_id</InlineCode>. When the sweep completes,
            the Cleaner&apos;s own Email Output and Webhook deliver the cleaned rows. See the{" "}
            <DocLink href="/docs/api-integration">API page</DocLink> for authentication and the
            response shape.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="Where a Cleaner sits in the pipeline">
          <Lead>
            Cleaning happens after extraction and before delivery. That order matters: everything
            downstream (the review screen, the webhook payload, the Bucket rows, an agent&apos;s
            input variables) sees the cleaned output, not the raw extraction.
          </Lead>
          <NumberedList
            items={[
              "The flow extracts rows from the document.",
              "The linked Cleaner sweeps those rows: formats, conversions, lookups, computed columns.",
              "Conditional Actions fire: rows are dropped, notifications go out, review may be requested. A Human Input field always requests review.",
              <Fragment key="f12">
                If review was triggered, the run pauses and a reviewer sees the <em>cleaned</em>{" "}
                table.
              </Fragment>,
              <Fragment key="f13">
                On completion, results are delivered through the flow&apos;s outputs: email,
                webhook, <DocLink href="/docs/buckets">Bucket</DocLink>, form fill, or a chained{" "}
                <DocLink href="/docs/agents">agent</DocLink>.
              </Fragment>,
            ]}
          />
          <p>
            The <DocLink href="/docs/pipeline-map">Pipeline Map</DocLink> shows this for your own
            workspace, including which flows share a Cleaner.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to check"]}
            rows={[
              [
                "A column is empty in the output",
                "Open the sweep's Warnings. A Lookup with no match returns its fallback value (or nothing); a formula that divided by zero leaves the cell blank.",
              ],
              [
                "A column is missing from the output",
                "It may be excluded under Output Fields, or it is a Conditional Actions rule, which never produces a column.",
              ],
              [
                "The Cleaner's webhook did not fire on a flow run",
                "Expected: flow runs deliver through the flow's own outputs. The Cleaner's Email Output and Webhook cover Clean Dataset and API sweeps.",
              ],
              [
                "Every run of a flow goes to review",
                "The Cleaner has a Human Input field in its output, or a Conditional Actions rule with no conditions sends everything to Human in the Loop.",
              ],
              [
                "A computed field reads a column the flow no longer produces",
                "Use Sync from Flow, then update the computed fields that referenced the removed column.",
              ],
              ["The Bucket rows are not pivoted", "Expected: Bucket exports always receive un-pivoted rows."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/human-in-the-loop",
              label: "Send rule-breaking runs for human review",
              description:
                "The Human in the Loop action, Human Input fields, and what a reviewer can change.",
            },
            {
              href: "/docs/buckets",
              label: "Look values up in Buckets and write back to them",
              description:
                "The structured tables Lookup, Bucket Check, Human Input menus and Edit Bucket Row work against.",
            },
            {
              href: "/docs/webhooks",
              label: "Deliver cleaned results to your systems",
              description: "Payload shape and retry behaviour for sweep and run webhooks.",
            },
          ]}
        />
      </section>
    </>
  );
}
