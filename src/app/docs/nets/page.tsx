import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Activity,
  AlertTriangle,
  CalendarClock,
  Code2,
  Coins,
  FilePlus,
  FlaskConical,
  HelpCircle,
  Ban,
  Info,
  Lock,
  PlayCircle,
  Radar,
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

export const metadata = docMetadata("nets");

const CATCH_CURL = `curl -X POST https://run.tavnit.io/api/nets/NET_ID/catch \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{}'`;

const BACKFILL_BODY = `{
  "window_start": "2026-09-01T00:00:00Z",
  "window_end": "2026-09-15T00:00:00Z"
}`;

const STATUS_CURL = `curl https://run.tavnit.io/api/catches/CATCH_ID \\
  -H "X-API-Key: $TAVNIT_API_KEY"`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="nets" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Nets
        </h1>

        <DocCard icon={<Radar size={24} />} title="What is a Net?">
          <Lead>
            A Net collects public social media posts from the accounts, hashtags, places or post
            links you choose, keeps the ones that match a plain-language relevance rule, and fills
            your own columns for every post and comment.
          </Lead>
          <p>
            Each execution of a Net is a <strong>Catch</strong>: it covers a time window, fetches what
            was posted in it, and produces one table. Run Catches by hand, on a schedule or over the
            API, and the <strong>Trends</strong> view compares them over time. Nets currently work
            with Instagram.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta, enabled on request">
            Nets are in beta and are enabled per organisation. If you don&apos;t see
            &ldquo;Nets&rdquo; in the sidebar, contact the Tavnit team to turn them on.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to use a Net">
          <BulletList
            items={[
              "Tracking complaints about your products: which product, what went wrong and whether you replied",
              "Finding businesses that ask for suppliers in a city or under a hashtag",
              "Following what people say about a topic: stance, themes and claims",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Net">
          <NumberedList
            items={[
              <Fragment key="c1">
                Open <strong>&ldquo;Nets&rdquo;</strong> in the sidebar and click{" "}
                <strong>&ldquo;New Net&rdquo;</strong>.
              </Fragment>,
              <Fragment key="c2">
                Choose how to start: <strong>&ldquo;Describe it&rdquo;</strong> (write a sentence and
                the AI drafts the scope, relevance rule and columns),{" "}
                <strong>&ldquo;Start from a template&rdquo;</strong>,{" "}
                <strong>&ldquo;Copy an existing Net&rdquo;</strong> or{" "}
                <strong>&ldquo;Blank Net&rdquo;</strong>.
              </Fragment>,
              "If you described it, review the draft, uncheck anything you don't want, and click “Create Net”. Suggested accounts may not exist, so check them in the Test tab.",
              "Otherwise fill in the builder: Basics, Collect, Per post & comment, Per thread, and Media & limits (below), then click “Create Net”.",
              "The Net opens on its Test tab. Run a test before your first Catch.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="The builder">
          <DataTable
            head={["Section", "Settings"]}
            rows={[
              ["Basics", "Name, and Purpose (what the Net is for; the AI reads it as context)."],
              [
                "Collect",
                "Scope: Accounts, Hashtags, Places (an Instagram location link or id) and Post links, plus Exclude accounts and Exclude hashtags, which are dropped right after fetching, before any AI. Comments: “Collect comments” and “Comments per post”. Relevance rule: which posts count, in plain language.",
              ],
              [
                "Per post & comment",
                "Fields (free values), Yes/No checks (true or false) and Categories (exactly one option, or none), filled for every post and every comment.",
              ],
              [
                "Per thread",
                "Thread questions (yes/no, answered once per post and its comments, such as “Did the brand reply?”) and Thread categories (one option for the whole conversation).",
              ],
              [
                "Media & limits",
                "Read post images and Images per post; Transcribe Reel audio and Seconds of audio per Reel; Posts per Catch (max); Settle delay (hours); First Catch looks back (days).",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="No keyword search">
            Instagram has no keyword search, so a Net always starts from accounts, hashtags, places or
            post links. Put your keywords in the relevance rule. Posts that fail the rule are dropped
            before comments, media or columns cost anything.
          </InfoBox>
          <DataTable
            head={["Limit", "Default", "Range"]}
            rows={[
              ["Comments per post", "20", "Up to 100"],
              ["Images per post", "5", "Up to 20"],
              ["Seconds of audio per Reel", "180", "10 to 600"],
              ["Posts per Catch (max)", "500", "Up to 5,000"],
              ["Settle delay (hours)", "48", "0 to 720"],
              ["First Catch looks back (days)", "7", "1 to 365"],
            ]}
          />
          <p>
            Images are read for text and content (flyers, price lists, damaged products). For Reels
            only the sound is transcribed; the video itself is never processed, and music-only Reels
            are skipped. The settle delay makes recent posts wait for a later Catch so their comment
            thread has time to fill in.
          </p>
          <p>
            Every row also carries built-in columns, whose names you can&apos;t reuse: Platform, Type,
            Post ID, Comment ID, URL, Author, Posted At, Likes, Comments, Views, Media, Hashtags,
            Location, Text, Image Text and Transcript. Your columns follow them.
          </p>
        </DocCard>

        <DocCard icon={<FlaskConical size={24} />} title="The Test tab">
          <Lead>
            <strong>&ldquo;Run test&rdquo;</strong> fetches a small sample from your scope, shows what
            is kept, dropped or excluded, and previews the table, before any Catch. Tests are free.
          </Lead>
          <BulletList
            items={[
              "The test always uses your current edits, including unsaved ones. Save them when the results look right.",
              "Tabs: Kept, Dropped, Excluded and Table preview (the first kept posts with their comments, structured with your columns).",
              "“Per Catch (estimate)” projects posts per day, posts per Catch, rows per Catch and credits per Catch. “At least” means the sample hit its cap.",
              "“Tune the scope” suggests hashtags or accounts to add or exclude and a revised rule; one click updates the draft, then test again to compare.",
              "If you only changed the rule or columns, “Test again” reuses the last sample: no new fetch, only your rule and columns run again.",
            ]}
          />
          <p>A fresh sample takes about a minute. Each organisation can run up to 40 tests per 24 hours.</p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Running a Catch">
          <NumberedList
            items={[
              <Fragment key="r1">
                Click <strong>&ldquo;Run Catch&rdquo;</strong>.
              </Fragment>,
              <Fragment key="r2">
                Pick <strong>&ldquo;Since the last Catch&rdquo;</strong> (picks up where the last
                Catch ended and stops at the settle delay before now; the first Catch looks back the
                configured number of days) or <strong>&ldquo;A date range (backfill)&rdquo;</strong>{" "}
                with From and To dates.
              </Fragment>,
              <Fragment key="r3">
                Click <strong>&ldquo;Start Catch&rdquo;</strong>. The Catch appears under{" "}
                <strong>&ldquo;Catches&rdquo;</strong> with its window, posts kept, rows, credits,
                status and source (Manual, Scheduled or API).
              </Fragment>,
            ]}
          />
          <p>
            A backfill doesn&apos;t move the resume point, and posts already processed are skipped.
            Because posts are fetched newest first, reaching far back may need a higher Posts per
            Catch cap. Only one &ldquo;since the last Catch&rdquo; Catch of a Net runs at a time, and
            an inactive Net can&apos;t run.
          </p>
          <p>
            While it runs, a Catch shows its stage: Fetching posts, Checking relevance, Fetching
            comments, Reading images and audio, Filling your columns, and Delivering. It ends as
            completed, failed or cancelled. <strong>&ldquo;Cancel Catch&rdquo;</strong> stops it;
            nothing is charged or delivered, and the posts can be caught again.
          </p>
          <p>
            A completed Catch shows new posts, kept posts, comments, rows, images read, audio
            transcribed and credits. Its table can be filtered to posts or comments, searched, and
            downloaded as CSV or JSON; each row links to the post (&ldquo;Open post&rdquo;) and each
            value says where it came from (the item&apos;s text, the parent post, the Reel&apos;s
            audio, metadata or an image).
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Schedule">
          <p>
            On the <strong>&ldquo;Schedule&rdquo;</strong> tab, turn on{" "}
            <strong>&ldquo;Run on a schedule&rdquo;</strong> and choose a frequency: every hour, every
            day, weekdays (Mon–Fri), every week or a custom cron expression. Each scheduled Catch picks
            up where the last one ended. The tab shows where the next Catch starts. The schedule is
            paused while the Net is inactive.
          </p>
        </DocCard>

        <DocCard icon={<Activity size={24} />} title="Trends">
          <p>
            <strong>&ldquo;Trends&rdquo;</strong> appears after the first completed Catches and
            compares them:
          </p>
          <BulletList
            items={[
              "Posts kept per Catch, and posts by day in the latest Catch",
              "Spikes in the latest Catch, flagged once there are 3 earlier Catches to compare with",
              "The biggest changes in your categories, checks, thread questions and thread categories versus the previous Catch",
              "Category distribution and Yes/No check results in the latest Catch",
              "Top hashtags and top authors",
            ]}
          />
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Where the data goes">
          <DataTable
            head={["Output", "How it works"]}
            rows={[
              ["Email", "Sends each Catch's table as a CSV to the recipients you list."],
              [
                "Webhook",
                <Fragment key="o2">
                  POSTs each Catch&apos;s rows as JSON to an <InlineCode>https://</InlineCode> URL.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="o3">
                  Writes every completed Catch&apos;s rows into a{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink>, optionally with a Catch ID column.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cost">
          <p>A Catch is charged when it completes, adding up four parts:</p>
          <DataTable
            head={["Part", "Rate"]}
            rows={[
              ["Posts fetched (relevance check)", "1 credit per 50 posts"],
              ["Rows structured (kept posts and comments)", "1 credit per 10 rows"],
              ["Images read", "1 credit per 5 images"],
              ["Reel audio transcribed", "1 credit per 60 seconds"],
            ]}
          />
          <p>
            Each part is rounded up, and a Catch that fetched anything costs at least 1 credit. A
            Catch with nothing new in its window, a failed Catch and a cancelled Catch cost nothing,
            and tests are free. You need at least 1 credit to start a Catch. The Test tab&apos;s
            estimate shows what a Catch of your Net is likely to cost. See{" "}
            <DocLink href="/docs/credits">Credits</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <p>
            Copy the ID from <strong>&ldquo;Net ID&rdquo;</strong> and queue a Catch. An empty body
            runs &ldquo;since the last Catch&rdquo;:
          </p>
          <CodeBlock lang="bash — queue a Catch" code={CATCH_CURL} />
          <p>
            Send <InlineCode>window_start</InlineCode> (and optionally{" "}
            <InlineCode>window_end</InlineCode>, which defaults to now) as ISO timestamps for a
            backfill:
          </p>
          <CodeBlock lang="JSON — backfill body" code={BACKFILL_BODY} />
          <p>
            The response (202) carries the <InlineCode>catch_id</InlineCode>. Check its status, and get
            the <InlineCode>columns</InlineCode> and <InlineCode>rows</InlineCode> once completed, with:
          </p>
          <CodeBlock lang="bash — Catch status and output" code={STATUS_CURL} />
          <p>
            <InlineCode>POST /api/catches/CATCH_ID/cancel</InlineCode> cancels a queued or running
            Catch. Errors: 400 for a bad window, 402 for insufficient credits, 403 when Nets
            aren&apos;t enabled for your organisation, 409 for an inactive Net or a &ldquo;since the
            last Catch&rdquo; Catch already in progress. See the{" "}
            <DocLink href="/docs/api-integration">REST API</DocLink> page for authentication.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Who can do what">
          <DataTable
            head={["Action", "Roles"]}
            rows={[
              ["Create, edit and delete Nets", "Owner, Admin"],
              ["Run Catches and view results", "Owner, Admin, Member"],
            ]}
          />
          <p>
            See <DocLink href="/docs/user-roles">User roles</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Ban size={24} />} title="Limitations">
          <BulletList
            items={[
              "Instagram only, and only public posts.",
              "No keyword search: collection starts from accounts, hashtags, places or post links.",
              "Up to 5,000 posts per Catch.",
              "Reel video is never analysed, only its audio; music-only Reels are skipped.",
              "If a thread can't be structured, its rows are kept with empty columns and the Catch says how many.",
            ]}
          />
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Symptom", "What to check"]}
            rows={[
              ["A test returns nothing for an account", "The handle may not exist or may not be public. Check it on Instagram."],
              ["Too many irrelevant posts are kept", "Make the relevance rule more specific, or exclude the accounts and hashtags that bring noise."],
              ["“Run Catch” fails with a conflict", "The Net is inactive, or a “since the last Catch” Catch is already running."],
              ["A backfill misses older posts", "Raise Posts per Catch (max): posts are fetched newest first."],
              ["Recent posts are missing", "They are younger than the settle delay and will be picked up by a later Catch."],
              ["Tests are refused", "Your organisation reached 40 tests in 24 hours. Try again later."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/buckets",
              label: "Store Catch rows in a Bucket",
              description: "Keep every Catch in one table and chart it.",
            },
            {
              href: "/docs/signals",
              label: "Structure recorded conversations with Signals",
              description: "The same idea for audio: members, rules and fields per turn.",
            },
            {
              href: "/docs/credits",
              label: "How credits are charged",
              description: "Per-feature costs, including Catches.",
            },
            {
              href: "/docs/api-integration",
              label: "Authenticate with the REST API",
              description: "API keys, the base URL and error codes shared by every endpoint.",
            },
          ]}
        />
      </section>
    </>
  );
}
