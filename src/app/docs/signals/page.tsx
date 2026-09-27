import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AudioLines,
  Code2,
  FilePlus,
  FlaskConical,
  HelpCircle,
  Info,
  Layers,
  Lock,
  Mic,
  PlayCircle,
  Send,
  Table2,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
} from "@/components/docs/ui";

export const metadata = docMetadata("signals");

const RUN_CURL = `curl -X POST https://run.tavnit.io/api/signals/SIGNAL_ID/run \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -F "file=@call.mp3"`;

const RUN_RESPONSE = `{
  "success": true,
  "wave_id": "…",
  "signal_id": "…",
  "status": "queued",
  "audio_seconds": 754,
  "message": "Wave queued for processing."
}`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="signals" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Signals
        </h1>

        <DocCard icon={<AudioLines size={24} />} title="What is a Signal?">
          <Lead>
            A Signal turns recorded conversations into a table. You describe who takes part, what
            kinds of conversation to expect and what you want to know; Tavnit transcribes the audio,
            works out who said what, splits the recording into separate conversations and fills your
            columns turn by turn.
          </Lead>
          <p>
            The Signal is the configuration. Each audio file you run through it produces a{" "}
            <strong>Wave</strong>: one execution with its own transcript, player and output table. A
            shop-floor recording of a whole shift can hold dozens of sales conversations; a Wave
            finds each one and structures it separately.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta, enabled on request">
            Signals are in beta and are enabled per organisation. If you don&apos;t see
            &ldquo;Signals&rdquo; in the sidebar, contact the Tavnit team to turn them on.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to use a Signal">
          <BulletList
            items={[
              "Checking whether salespeople mention a promotion, and which products customers ask about",
              "Scoring support or intake calls against a checklist of things that should happen",
              "Turning interviews into rows you can filter, chart and store in a Bucket",
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="What you configure">
          <Lead>
            Only a name and at least one member type are required. Everything else is optional and
            adds columns or filters to the output.
          </Lead>
          <DataTable
            head={["Setting", "What it does"]}
            rows={[
              ["Member Types", "The participants you expect (for example Salesperson and Customer), each with an optional description of how to recognise them. Unexpected speakers are labelled “Other”."],
              ["Interaction Types", "The kinds of conversation to capture (Sale, Support, Return…). Each detected conversation is classified as one of them, or “Other”. Leave empty to capture every conversation, untyped."],
              ["Rules", "Yes/no checks evaluated on every turn, such as “Was the keyboards promotion mentioned?”. Each occurrence becomes a row. A rule can apply to all interaction types or only some (“Applies to”)."],
              ["Extraction Fields", "Data pulled from every turn, such as “Products mentioned”. Each field becomes a column."],
              ["Content Categories", "Each turn is labelled with the best-fitting category, such as “objection”."],
              ["Conversation Rules", "Yes/no checks judged once over the whole conversation, such as “Was the sale resolved?”. Each becomes a true/false column."],
              ["Conversation Categories", "Classification groups with options (for example Outcome: Won / Lost). One option is picked per group for the whole conversation."],
              ["Exclude other interactions", "Leaves conversations that match none of your interaction types out of the output."],
              ["Include Wave ID column", "Adds a leading Wave ID column so rows from several Waves can be joined, in CSV, webhook and Bucket exports."],
            ]}
          />
          <p>
            Descriptions matter: the AI reads them to decide who is who and when a rule or category
            applies. Names must be unique within each list and can&apos;t reuse a built-in column
            name.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Signal">
          <NumberedList
            items={[
              <Fragment key="c1">
                Open <strong>&ldquo;Signals&rdquo;</strong> in the sidebar and click{" "}
                <strong>&ldquo;Create Signal&rdquo;</strong>.
              </Fragment>,
              <Fragment key="c2">
                Choose how to start: <strong>&ldquo;Conversation preset&rdquo;</strong> (a sales,
                support or interview setup), <strong>&ldquo;From an existing signal&rdquo;</strong>{" "}
                (duplicates its full configuration) or <strong>&ldquo;Start from scratch&rdquo;</strong>.
              </Fragment>,
              "Enter a Signal Name (at least 3 characters) and define at least one member type.",
              "Optionally add interaction types, per-turn rules, extraction fields and content categories, then conversation-level rules and category groups.",
              "Under Options, decide whether to exclude unmatched interactions, add a Wave ID column or send results to a webhook.",
              <Fragment key="c6">
                Click <strong>&ldquo;Create Signal&rdquo;</strong>. Recorders, Bucket export and the
                Signal ID for the API are set up on the Signal&apos;s page once it exists.
              </Fragment>,
            ]}
          />
          <p>
            To change the configuration later, open the Signal and click{" "}
            <strong>&ldquo;Edit&rdquo;</strong> on any configuration section, then{" "}
            <strong>&ldquo;Save&rdquo;</strong>. Changes apply to new Waves; each Wave keeps a copy
            of the configuration it ran with.
          </p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Running a Wave">
          <NumberedList
            items={[
              <Fragment key="r1">
                Click <strong>&ldquo;Run Wave&rdquo;</strong> on the Signal&apos;s page (or on the
                Signals list, then select the Signal).
              </Fragment>,
              <Fragment key="r2">
                Under <strong>&ldquo;Upload Audio&rdquo;</strong>, choose the recording.
              </Fragment>,
              "The Wave is queued and processed in the background. Its page updates automatically.",
            ]}
          />
          <DataTable
            head={["Limit", "Value"]}
            rows={[
              ["Formats", "mp3, mp4, mpeg, mpga, m4a, wav, webm"],
              ["File size", "Up to 150 MB"],
              ["Recording length", "Up to 8 hours of audio, with at most 2 hours of detected speech"],
            ]}
          />
          <p>
            Long silences are cut before any processing, so a full-shift
            recording with long quiet stretches is fine. The spoken language is detected
            automatically. A Signal that has been deactivated can&apos;t run Waves until you activate
            it again.
          </p>
          <p>
            A Wave moves from <strong>Queued</strong> to <strong>Running</strong> (&ldquo;Structuring
            audio&hellip;&rdquo;) and ends as <strong>Completed</strong> or <strong>Failed</strong>.
            Every Wave of a Signal is listed in its <strong>&ldquo;Waves&rdquo;</strong> section, with
            a status filter.
          </p>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Reading a Wave">
          <Lead>
            A completed Wave shows the duration (and how much of it was speech), the number of
            interactions (and how many were excluded) and turns.
          </Lead>
          <BulletList
            items={[
              <Fragment key="w1">
                <strong>Audio</strong>: a player for the recording, with{" "}
                <strong>&ldquo;Download original&rdquo;</strong>.
              </Fragment>,
              <Fragment key="w2">
                <strong>Conversation</strong>: the transcript by speaker and member type. Search it,
                show <strong>&ldquo;Only extractions&rdquo;</strong>, use{" "}
                <strong>&ldquo;Play from here&rdquo;</strong> on any turn, and{" "}
                <strong>&ldquo;Export transcript&rdquo;</strong>.
              </Fragment>,
              <Fragment key="w3">
                <strong>Interactions</strong>: a profile of each detected conversation: duration,
                turns, the longest turn, each speaker&apos;s share of the talk and categories, every
                extracted value (click one to jump to that turn) and the conversation-level verdicts.
                Excluded interactions are marked.
              </Fragment>,
              <Fragment key="w4">
                <strong>Results</strong>: the output table, filterable by interaction, with{" "}
                <strong>&ldquo;Export CSV&rdquo;</strong>, <strong>&ldquo;Export JSON&rdquo;</strong>{" "}
                and <strong>&ldquo;Export to bucket&rdquo;</strong>.
              </Fragment>,
            ]}
          />
          <p>The output table always starts with these columns, followed by your extraction fields and conversation-level columns:</p>
          <DataTable
            head={["Column", "Contents"]}
            rows={[
              ["Interaction", "Which conversation in the recording the row belongs to."],
              ["Interaction Type", "One of your interaction types, or Other."],
              ["Turn / Timedate", "The turn number and when it was spoken."],
              ["Member / Member Type", "The speaker and the member type they were mapped to."],
              ["Content / Content Category", "What was said and its category."],
              ["Rule / Rule Check", "The rule the row is about. Rule Check is true on the rule\u2019s first occurrence in an interaction; a rule that never occurred still gets one row per interaction, with Rule Check false."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Mic size={24} />} title="Recorders">
          <Lead>
            Recorders are organisation members who capture sessions with the{" "}
            <strong>Tavnit Recorder</strong> Android app and send them to a Signal, where each one
            becomes a Wave automatically.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="rc1">
                Open the Signal and go to <strong>&ldquo;Recorders&rdquo;</strong>.
              </Fragment>,
              <Fragment key="rc2">
                Click <strong>&ldquo;Add recorder&rdquo;</strong> and pick the member.
              </Fragment>,
              "Enter a Referring ID (a free-form identifier such as an employee number, stamped on every Wave that recorder uploads) and choose the member type they record as.",
            ]}
          />
          <p>
            A recorder can be set to Active or Disabled, edited or removed. Removing one keeps the
            Waves it already uploaded. Waves from the app show when they were recorded, the Referring
            ID and the member type.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Where the data goes">
          <DataTable
            head={["Output", "How it works"]}
            rows={[
              [
                "Webhook",
                <Fragment key="o1">
                  Sends the output table to an <InlineCode>https://</InlineCode> URL when a Wave
                  completes. See <DocLink href="/docs/webhooks">Webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Bucket Export",
                <Fragment key="o2">
                  Writes every completed Wave&apos;s rows into a{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink>. Map each Wave column to a Bucket
                  column and optionally add a Wave ID column.
                </Fragment>,
              ],
              ["Manual export", "From a Wave: Export CSV, Export JSON or Export to bucket."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <p>
            Copy the ID from <strong>&ldquo;Signal ID&rdquo;</strong> on the Signal&apos;s page and
            post the audio as multipart <InlineCode>file</InlineCode> (or as JSON with{" "}
            <InlineCode>file_base64</InlineCode> and <InlineCode>filename</InlineCode>):
          </p>
          <CodeBlock lang="bash — queue a Wave" code={RUN_CURL} />
          <CodeBlock lang="JSON — 202 response" code={RUN_RESPONSE} />
          <p>
            Errors: 400 for a missing, empty, unsupported or too-long file, 402 when your
            organization can&apos;t start new work right now (contact the Tavnit team), 403/404 when the
            Signal isn&apos;t in your organisation. Follow the Wave in the app. See the{" "}
            <DocLink href="/docs/api-integration">REST API</DocLink> page for authentication.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Who can do what">
          <DataTable
            head={["Action", "Roles"]}
            rows={[
              ["Create, edit and delete Signals", "Owner, Admin"],
              ["Manage recorders", "Owner, Admin"],
              ["Run Waves", "Owner, Admin, Member"],
            ]}
          />
          <p>
            See <DocLink href="/docs/user-roles">User roles</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Symptom", "What to check"]}
            rows={[
              ["The upload is rejected", "Check the format (mp3, mp4, mpeg, mpga, m4a, wav, webm), the 150 MB size limit and the 8-hour length limit."],
              ["“Run Wave” is disabled", "The Signal is inactive. Activate it first."],
              ["Speakers are assigned to the wrong member type", "Add descriptions to your member types saying how to tell them apart (role, what they typically say)."],
              ["Conversations land in Other", "Describe each interaction type more concretely, or leave interaction types empty to capture everything."],
              ["The Wave failed after queuing", "Check that the recording has at most 2 hours of speech."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/buckets",
              label: "Store Wave rows in a Bucket",
              description: "Filter, chart and join the rows of many Waves in one table.",
            },
            {
              href: "/docs/webhooks",
              label: "Receive results by webhook",
              description: "How Tavnit posts results to your endpoint.",
            },
            {
              href: "/docs/nets",
              label: "Structure social media posts with Nets",
              description: "The same idea for public Instagram posts and comments.",
            },
          ]}
        />
      </section>
    </>
  );
}
