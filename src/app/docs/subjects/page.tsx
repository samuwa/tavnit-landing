import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  Briefcase,
  Code,
  FilePlus,
  FileText,
  FolderInput,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("subjects");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="subjects" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Subjects
        </h1>

        <DocCard icon={<Briefcase size={24} />} title="What is a Subject?">
          <Lead>
            A Subject models something your business tracks that is made of several documents — a
            purchase, a patient, a shipment, a claim. Each instance is a <strong>Case</strong>, and
            Tavnit files every incoming document into the right Case and extracts it with the right
            flow.
          </Lead>
          <p>
            A <DocLink href="/docs/flows">flow</DocLink> handles one kind of document. A Subject
            sits one level up: it says &ldquo;a purchase is a quote, a purchase order and an
            invoice&rdquo;, gives every purchase a reference such as <InlineCode>PT-0042</InlineCode>,
            and keeps all of that purchase&apos;s documents, runs and checks together on one page.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="Beta">
            Subjects is a Beta feature. It is visible to every organisation, and its screens may
            still change.
          </InfoBox>
          <DataTable
            head={["Concept", "What it is"]}
            rows={[
              ["Subject", "The definition: its document types, reference prefix, intake email and checks."],
              [
                "Case",
                "One instance of the Subject, with a reference (PT-0042), a unique name, a workflow status and an open or closed state.",
              ],
              [
                "Document type",
                "A typed slot in every Case (Quote, Invoice…), each tied to the flow that extracts it.",
              ],
              [
                "Held document",
                "A document Tavnit could not file with certainty. It waits for a person to assign it.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to use a Subject">
          <BulletList
            items={[
              "Several different documents belong to the same real-world thing, and you want them side by side",
              "Documents arrive by email over days or weeks, and each one must land on the right file",
              "You want to run comparisons or checklists across the documents of one Case — quotes against each other, an invoice against its order",
              "A partner or an agent sends documents that carry your reference number",
            ]}
          />
          <InfoBox color="blue" icon={<Route size={20} />} title="Subjects vs Collections">
            A <DocLink href="/docs/collections">Collection</DocLink> answers &ldquo;what kind of
            document is this?&rdquo; and sends it to a flow. A Subject also answers &ldquo;which
            purchase does it belong to?&rdquo; — and it answers that without AI, by reference or
            exact name.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Subject">
          <NumberedList
            items={[
              <Fragment key="s1">
                Open <strong>Subjects</strong> and click <strong>&ldquo;New Subject&rdquo;</strong>.
              </Fragment>,
              <Fragment key="s2">
                Answer <strong>&ldquo;What makes up each case?&rdquo;</strong>:{" "}
                <strong>From your flows</strong> (pick the documents that make up a Case — one
                document type per flow), <strong>From an existing subject</strong> (duplicates its
                document types and checks) or <strong>Start from scratch</strong>.
              </Fragment>,
              <Fragment key="s3">
                Give it a <strong>Name</strong> and a <strong>Reference prefix</strong> of 1–8
                letters or digits, such as <InlineCode>PT</InlineCode>. Tavnit warns you if another
                Subject already uses the prefix.
              </Fragment>,
              <Fragment key="s4">
                Optionally set the <strong>Case label</strong> (singular and plural) — for example
                &ldquo;Purchase&rdquo; and &ldquo;Purchases&rdquo;. The Subject&apos;s pages then
                say &ldquo;New purchase&rdquo; instead of the generic term.
              </Fragment>,
              <Fragment key="s5">
                Click <strong>Create</strong>, then review the <strong>Document types</strong> tab.
              </Fragment>,
            ]}
          />
          <WarningBox>
            The reference prefix cannot be changed after creation. References already issued have
            to stay valid, so choose a prefix you are happy to see on every email and filename.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FileText size={24} />} title="Document types">
          <Lead>
            Each document type is a slot in every Case, processed by one flow. When a document is
            filed into a slot, Tavnit starts a run of that flow, and the run&apos;s results appear
            on the Case.
          </Lead>
          <p>
            Add a type from the <strong>Document types</strong> tab with a <strong>Name</strong>{" "}
            (e.g. &ldquo;Quote&rdquo;) and a <strong>Flow</strong>. Two switches control each type:
          </p>
          <DataTable
            head={["Switch", "Effect"]}
            rows={[
              [
                "Multiple",
                "Off: a Case holds one document of this type, and a second one is held for review instead of being filed. On: the Case accepts any number (several quotes, for instance).",
              ],
              [
                "Required",
                "Marks the type as expected on every Case. The Case page shows a Required tag and a tick once a completed document of that type is present.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Briefcase size={24} />} title="Cases">
          <Lead>
            A Case is opened by hand, over the API, or by an agent. Its reference is issued
            automatically from the prefix and a counter — gap-free and never reused.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="c1">
                On the Subject, click <strong>New &lt;case label&gt;</strong> (for example
                &ldquo;New purchase&rdquo;).
              </Fragment>,
              "Type a name. It must be unique within the Subject, because a document whose email subject or filename equals the name is filed into this Case.",
              <Fragment key="c3">
                Click <strong>Create</strong>. The Case gets the next reference, such as{" "}
                <InlineCode>PT-0043</InlineCode>.
              </Fragment>,
            ]}
          />
          <p>The Case page brings everything together:</p>
          <BulletList
            items={[
              "The reference, name, workflow status and Open or Closed state",
              "Its documents grouped by document type, each with its routing status and a View results link to the run",
              <Fragment key="c4">
                A drop zone to upload documents straight into the Case (you choose the document type
                when the Subject has more than one)
              </Fragment>,
              <Fragment key="c5">
                <strong>Email this &lt;case label&gt;</strong> — the Case&apos;s own address, when
                email intake is on
              </Fragment>,
              "The Checks section, with the matches and inspections already run on the Case",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Workflow status and open/closed are separate">
            <strong>Workflow statuses</strong> (Settings tab) are your own comma-separated labels,
            such as <InlineCode>new, in_progress, done</InlineCode>, with a{" "}
            <strong>Default status</strong> for new Cases. Change a Case&apos;s status from the
            selector on its page. Open and closed is a separate lifecycle that controls intake —
            see below.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="How documents find their Case">
          <Lead>
            Filing a document into a Case never uses AI. Tavnit looks for the Case reference, then
            for an exact Case name. If neither gives a single clear answer, the document is held
            for a person rather than guessed.
          </Lead>
          <p>
            This applies to documents sent to the intake email, uploaded with{" "}
            <strong>Add docs</strong> on the Subject, or posted to the Subject over the API.
          </p>
          <p>
            References are read tolerantly: <InlineCode>PT-0042</InlineCode>,{" "}
            <InlineCode>pt 42</InlineCode> and <InlineCode>PT0042</InlineCode> all mean Case 42.
            Tavnit checks the places a reference can appear in order of authority, and the first one
            that contains a reference decides:
          </p>
          <DataTable
            head={["Source", "Order checked"]}
            rows={[
              [
                "Email",
                "Case address (plus-tag) → email subject → email body → attachment filename → document text",
              ],
              ["Upload or API", "Filename → document text"],
            ]}
          />
          <BulletList
            items={[
              "One reference that matches a Case: the document is filed there.",
              "Two different references in the same place: held as ambiguous.",
              "A reference that matches no Case: held — a mistyped number never falls back to a name match.",
              "No reference anywhere: Tavnit compares the email subject and the filename (without extension) with Case names — whole value, ignoring case and surrounding spaces. Never a partial match, never the body.",
            ]}
          />
          <p>
            Once the Case is known, Tavnit picks the document type. A Subject with one document type
            needs no decision. With several types, an AI classifier reads the first page and chooses
            among them — this is the only AI step.
          </p>
          <InfoBox color="green" icon={<ShieldCheck size={20} />} title="Uploading straight into a Case skips routing">
            A document dropped on a Case page, sent to the Case&apos;s own address, or posted to the
            Case over the API already knows its Case. Uploads on the Case page and over the API also
            name the document type, so nothing is classified.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Email intake">
          <NumberedList
            items={[
              <Fragment key="e1">
                Open the Subject&apos;s <strong>Email intake</strong> tab and turn the switch on.
              </Fragment>,
              <Fragment key="e2">
                Copy the <strong>Intake address</strong> and forward documents to it, or give it to
                suppliers and partners.
              </Fragment>,
              "Optionally restrict which senders are accepted with the sender whitelist on the same tab.",
            ]}
          />
          <p>Three things route an emailed attachment to its Case:</p>
          <BulletList
            items={[
              <Fragment key="e4">
                A reference such as <InlineCode>PT-0042</InlineCode> in the subject, body or filename.
                Replies keep the subject line, so a whole thread follows the Case automatically.
              </Fragment>,
              <Fragment key="e5">
                The Case&apos;s own address: the intake address with the reference added as a
                plus-tag, e.g. <InlineCode>intake+PT-0042@…</InlineCode>. It is shown on the Case
                page as <strong>Email this &lt;case label&gt;</strong>.
              </Fragment>,
              "An email subject or filename that exactly equals a Case name.",
            ]}
          />
          <p>
            Each attachment is handled separately. For the address formats and the attachment types
            Tavnit accepts, see <DocLink href="/docs/email-integration">email integration</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Held documents and manual triage">
          <Lead>
            Anything Tavnit cannot file with certainty lands in <strong>Held documents</strong>,
            with the reason written under it. Nothing is processed until someone decides.
          </Lead>
          <p>For each held document you can:</p>
          <BulletList
            items={[
              <Fragment key="h1">
                <strong>Assign</strong> it: pick a Case and a document type. Tavnit starts the
                flow run on the stored file — no new upload. Assigning to a
                closed Case is allowed, because a person chose it explicitly.
              </Fragment>,
              <Fragment key="h2">
                <strong>New &lt;case label&gt; from doc</strong>: open a new Case and file the
                document into it in one step.
              </Fragment>,
              <Fragment key="h3">
                <strong>Discard</strong> it.
              </Fragment>,
            ]}
          />
          <p>
            A file Tavnit cannot process at all — an unsupported type or an invalid file — shows as
            Failed instead of Held. Document statuses are Queued, Routing, Routed, Held, Failed and
            Discarded.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Closing and reopening a Case">
          <p>
            Click <strong>Close</strong> on a Case when its file is complete. From then on,
            documents routed to it automatically are held instead of filed, so a late reply cannot
            reopen finished work by accident. The Case page says it is closed, and uploads on the
            Case page are hidden.
          </p>
          <p>
            <strong>Reopen</strong> restores automatic intake. Closing is always reversible.
          </p>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Case checks: Matchers and Inspectors">
          <Lead>
            Bind <DocLink href="/docs/matchers">Matchers</DocLink> and{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink> to the Subject once, then run
            them on any Case from its page. They work on the Case&apos;s completed runs — nothing is
            uploaded or extracted again.
          </Lead>
          <DataTable
            head={["Check", "Set up on the Checks tab", "Run from the Case"]}
            rows={[
              [
                "Matcher",
                "Bind a matcher. It compares documents of the matcher's flow — for example quotes side by side.",
                "Needs at least two completed documents of that flow on the Case. The row shows how many eligible runs there are.",
              ],
              [
                "Inspector",
                "Bind an inspector and map each of its inputs to a document type (by default, the type that uses the same flow).",
                "Adopts the Case's completed runs. If a required input has no completed document, Tavnit lists what is missing.",
              ],
            ]}
          />
          <p>
            Click <strong>Run</strong> next to a check. Its result is listed on the Case with its
            status and, for inspections, the verdict; open it for the full comparison or checklist.
          </p>
        </DocCard>

        <DocCard icon={<Bot size={24} />} title="Agents that deliver to a Subject">
          <p>
            An <DocLink href="/docs/agents">agent</DocLink> can file what it collects straight into
            a Subject. In the agent&apos;s delivery settings, choose the <strong>Subject</strong>,
            the field that gives the <strong>Case name</strong>, which captured files to file as
            which document type, optional fields to <strong>Store as case params</strong>, and what
            to do <strong>If the case already exists</strong>: <strong>Skip</strong> or{" "}
            <strong>Add missing documents</strong>.
          </p>
          <p>
            Cases are matched by name, so running the agent again never creates a duplicate.
            Documents filed this way show an <strong>Agent</strong> link back to the agent run.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            The Subject endpoints use the same <InlineCode>X-API-Key</InlineCode> header as the rest
            of the <DocLink href="/docs/api-integration">REST API</DocLink>:
          </p>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              [
                <InlineCode key="a1">POST /api/subjects/&lt;subject_id&gt;/process</InlineCode>,
                "Send a document to the Subject; it is routed to a Case exactly like an upload. Returns 202 with a subject_doc_id.",
              ],
              [
                <InlineCode key="a2">POST /api/cases/&lt;case_id&gt;/docs</InlineCode>,
                "Upload straight into a Case (doc_type_id is required when the Subject has several types). Returns the run_id.",
              ],
              [
                <InlineCode key="a3">POST /api/subjects/&lt;subject_id&gt;/cases</InlineCode>,
                "Open a Case with a name and optional params object. The reference is issued for you.",
              ],
              [
                <InlineCode key="a4">GET /api/subjects/&lt;subject_id&gt;/cases</InlineCode>,
                "List Cases, filtered by state, status or search, up to 200 per page.",
              ],
              [
                <InlineCode key="a5">GET /api/cases/&lt;case_id&gt;</InlineCode>,
                "Read a Case and its documents, each with the run_id to poll for results.",
              ],
              [
                <InlineCode key="a6">POST /api/cases/&lt;case_id&gt;/close</InlineCode>,
                "Close a Case; /reopen reopens it.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Who can do what">
          <BulletList
            items={[
              "Admins and Owners create Subjects and bind Matchers and Inspectors. The creator of a Subject can also edit or delete it.",
              "Every member except HITL Only users works Cases: opens them, uploads, triages held documents, changes status, closes, reopens and runs checks.",
            ]}
          />
          <p>
            A Subject can be deactivated instead of deleted: it stops accepting new documents and
            Cases, and <strong>Reactivate</strong> brings it back. See{" "}
            <DocLink href="/docs/user-roles">user roles</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Held reason", "What to do"]}
            rows={[
              [
                "No case reference or case name found",
                "Ask senders to include the reference, use the Case's own address, or assign it by hand.",
              ],
              [
                "Ambiguous: multiple case references found",
                "The email or file mentions two Cases. Assign it to the right one.",
              ],
              [
                "Reference … matches no case",
                "The number is wrong or the Case doesn't exist yet. Open the Case, then assign the document.",
              ],
              ["Case … is closed", "Reopen the Case, or assign the document to it explicitly."],
              [
                "Document type … already filled",
                "Turn on Multiple for that type, or discard the duplicate.",
              ],
              [
                "No clear document type",
                "The classifier could not choose. Assign the type by hand; clearer flow names and descriptions help it next time.",
              ],
              [
                "Flow for document type … is unavailable",
                "The type's flow was deleted or deactivated. Point the type at an active flow.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Document types need an active flow">
            A document type whose flow is inactive or deleted cannot take documents. Check the
            Document types tab after reorganising your flows.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/matchers",
              label: "Compare documents within a Case",
              description: "How Matchers pair rows across runs and build a comparison table.",
            },
            {
              href: "/docs/inspectors",
              label: "Run a checklist over a Case",
              description: "Inspectors evaluate rules across several documents and give a verdict.",
            },
            {
              href: "/docs/email-integration",
              label: "Email addresses and attachments",
              description: "Address formats, accepted file types and sender whitelists.",
            },
          ]}
        />
      </section>
    </>
  );
}
