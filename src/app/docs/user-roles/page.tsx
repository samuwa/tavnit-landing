import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ClipboardCheck, Eye, Info, KeyRound, Lock, Mail, Shield, Star, Table2, UserCog, Users } from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  PermissionGroupHeader,
  PermissionRow,
  Related,
  RoleBadge,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("user-roles");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="user-roles" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          User Roles
        </h1>

        <DocCard icon={<Shield size={24} />} title="Overview">
          <Lead>
            Every Tavnit user belongs to an organisation with exactly one of four roles: Owner,
            Admin, Member or HITL Only. The role is set when you invite someone and decides what
            they can see and do across the whole app. The only per-item override is Bucket access,
            which is granted person by person.
          </Lead>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
            <RoleBadge label="Owner" color="border-purple-500/30 bg-purple-500/[0.06]" icon={<Star size={22} className="text-purple-400" />} subtitle="Full control" />
            <RoleBadge label="Admin" color="border-blue-500/30 bg-blue-500/[0.06]" icon={<UserCog size={22} className="text-blue-400" />} subtitle="Manages people & content" />
            <RoleBadge label="Member" color="border-cyan-500/30 bg-cyan-500/[0.06]" icon={<Users size={22} className="text-cyan-400" />} subtitle="Runs what exists" />
            <RoleBadge label="HITL Only" color="border-amber-500/30 bg-amber-500/[0.06]" icon={<ClipboardCheck size={22} className="text-amber-400" />} subtitle="Reviews only" />
          </div>
          <DataTable
            head={["Role", "In one line", "Give it to"]}
            rows={[
              ["Owner", "Full control, including organisation settings, billing and deleting the organisation.", "The people accountable for the account."],
              ["Admin", "Builds and manages everything and manages the team, except org settings and billing.", "Whoever configures flows, Cleaners, pipelines and Buckets day to day."],
              ["Member", "Runs what already exists, works Cases and reads results. Cannot change most configuration.", "People who process documents but should not rewire the pipeline."],
              ["HITL Only", "Can do nothing but review the items they are assigned to.", "Approvers and auditors who must never touch configuration or data."],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Roles are per organisation">
            The same person can be an Owner in one organisation and a Member in another. Switching
            organisation switches your role with it, so check the switcher before wondering why a
            button disappeared.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Star size={24} />} title="Owner">
          <InfoBox color="purple" icon={<Info size={20} />} title="At least one owner">
            The person who creates the organisation is its first Owner, and an Owner can promote
            others to Owner. Every organisation must keep at least one: the last Owner&apos;s role
            cannot be changed until someone else has been promoted. Nobody can change their own
            role or remove themselves from the team page.
          </InfoBox>
          <p>Owners have unrestricted access to everything:</p>
          <BulletList
            items={[
              "Everything an Admin can do (below)",
              "Invite people with any role, and change the role of, or remove, any other member, including Admins and other Owners",
              'Edit the organisation in Settings → "Organization": name, timezone, run failure notifications and the "Failed runs" auto-retry setting',
              'View and manage "Billing & Usage"',
              "Delete the organisation",
              "Make a Bucket private, and set Admins' access to any Bucket",
            ]}
          />
        </DocCard>

        <DocCard icon={<UserCog size={24} />} title="Admin">
          <InfoBox color="blue" icon={<Info size={20} />} title="Trusted power users">
            Admins run day-to-day operations. They can build and change anything in the workspace
            and manage Members, but cannot touch organisation settings, billing, or other Admins.
          </InfoBox>
          <p>Admins can:</p>
          <BulletList
            items={[
              "Create, edit and delete flows, Collections, Subjects, Splitters, Cleaners, agents, Inspectors, Fillers, Signals, Nets, pipelines and Buckets",
              "Configure agents, including the variables and secrets they use",
              "Manage Subject bindings and Signal recorder assignments",
              "Run everything and view all results",
              "Invite new people as Member or HITL Only",
              "Change the role of, or remove, Members and HITL Only users",
              "View the organisation's Audit Log",
              "Open a Bucket's Access page and set each Member's access",
            ]}
          />
          <p>Admins cannot:</p>
          <BulletList
            items={[
              "Edit organisation settings or see billing",
              "Delete the organisation",
              "Make a Bucket private",
              "Change another Admin's or an Owner's role, access or membership",
              "Invite someone as Admin or Owner",
            ]}
          />
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Member">
          <InfoBox color="green" icon={<Info size={20} />} title="Run what exists">
            Members use the workspace an Admin has built. They can run every feature and read every
            result, and they can fully manage Matchers, but they cannot create or change most
            configuration.
          </InfoBox>
          <p>Members can:</p>
          <BulletList
            items={[
              "Trigger flow runs and view all runs and results",
              "View flow details, including fields and every feature's settings",
              "Run splits, agents, Inspectors, Fillers, pipelines, Signal waves and Net catches",
              "Work Cases in Subjects: open, edit and close them, upload documents, resolve held documents and run checks",
              "Create, edit, delete and run any Matcher",
              "View all org-visible Buckets, and edit a Bucket's data if an Owner or Admin grants them Editor access",
              "See the Team page and their own API key",
            ]}
          />
          <p>Members cannot:</p>
          <BulletList
            items={[
              "Create flows, Collections, Subjects, Splitters, Cleaners, agents, Inspectors, Fillers, Signals, Nets, pipelines or Buckets",
              "Edit or delete configuration they didn't create, or toggle flow features (webhook, email trigger, email output, data cleaning, Bucket Export)",
              "Invite, remove or change the role of anyone",
              "See private Buckets unless explicitly granted access, or open a Bucket's Access page",
              "See organisation settings, billing or the Audit Log",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Creators keep edit rights">
            Flows, Collections, Subjects, Inspectors and Fillers stay editable by the person who
            created them. If an Admin who built a flow is later changed to Member, they can still
            edit and delete that flow.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="HITL Only">
          <Lead>
            HITL Only is a deliberately narrow role: the holder can review and decide on the items
            they are assigned to, and nothing else. Their sidebar shows only the{" "}
            <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink> queue, and every
            processing and data operation is refused, in the app and over the API alike.
          </Lead>
          <p>Someone with this role can:</p>
          <BulletList
            items={[
              "Open the Human in the Loop queue and see the runs, matches, inspections and fills awaiting their review",
              "Read the extracted data next to the source document",
              "Edit values, add or drop rows and columns during review",
              "Approve an item, or reject it with a reason",
            ]}
          />
          <p>They cannot:</p>
          <BulletList
            items={[
              "Upload a document or trigger a run of any kind",
              "See the dashboard, Runs, or any feature's configuration",
              "Read or write Bucket data outside a review",
              "Call the processing API: those endpoints refuse the role outright",
              "Invite anyone, or see billing and organisation settings",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Assignment is still separate">
            The role permits reviewing; it does not grant it. A HITL Only user still has to be named
            as a reviewer, for example on a flow&apos;s reviewer list or a Cleaner&apos;s review
            action. Without that they sign in to an empty queue.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Permissions at a Glance">
          <Lead>
            What Owner, Admin and Member can each do, feature by feature. HITL Only is deliberately
            absent: it is denied every row in this table, and its only capability is reviewing items
            it has been assigned.
          </Lead>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              {/* Table Header */}
              <div className="flex items-center pb-3 border-b border-tint/[0.08]">
                <div className="flex-1" />
                <div className="w-16 text-center"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Owner</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Admin</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Member</span></div>
              </div>

              <PermissionGroupHeader label="Flows" />
              <PermissionRow label="Create flows" owner={true} admin={true} member={false} />
              <PermissionRow label="Edit / delete flows" owner={true} admin={true} member={false} note="Or the flow's creator" />
              <PermissionRow label="View flow features & fields" owner={true} admin={true} member={true} />
              <PermissionRow label="Configure flow features" owner={true} admin={true} member={false} note="Webhook, email, data cleaning, Bucket Export, review" />
              <PermissionRow label="Trigger runs" owner={true} admin={true} member={true} />
              <PermissionRow label="View runs and results" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Collections & Subjects" />
              <PermissionRow label="Create Collections / Subjects" owner={true} admin={true} member={false} />
              <PermissionRow label="Edit / delete Collections / Subjects" owner={true} admin={true} member={false} note="Or their creator" />
              <PermissionRow label="Manage Subject bindings" owner={true} admin={true} member={false} />
              <PermissionRow label="Work Cases" owner={true} admin={true} member={true} note="Open, edit, close, upload, resolve held documents, run checks" />

              <PermissionGroupHeader label="Splitters & Cleaners" />
              <PermissionRow label="Create / edit / delete Splitters" owner={true} admin={true} member={false} />
              <PermissionRow label="Run splits" owner={true} admin={true} member={true} />
              <PermissionRow label="Create / edit / delete Cleaners" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Agents" />
              <PermissionRow label="Create / configure / delete agents" owner={true} admin={true} member={false} note="Including saved variables and secrets" />
              <PermissionRow label="Run agents" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Matchers, Inspectors & Fillers" />
              <PermissionRow label="Create / edit / delete any Matcher" owner={true} admin={true} member={true} />
              <PermissionRow label="Run matches" owner={true} admin={true} member={true} />
              <PermissionRow label="Create Inspectors / Fillers" owner={true} admin={true} member={false} />
              <PermissionRow label="Edit / delete Inspectors / Fillers" owner={true} admin={true} member={false} note="Or their creator" />
              <PermissionRow label="Run inspections / fills" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Signals & Nets" />
              <PermissionRow label="Create / edit / delete Signals and Nets" owner={true} admin={true} member={false} />
              <PermissionRow label="Manage Signal recorders" owner={true} admin={true} member={false} />
              <PermissionRow label="Run waves / catches" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Pipelines" />
              <PermissionRow label="Create / edit / delete pipelines" owner={true} admin={true} member={false} />
              <PermissionRow label="Run pipelines" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Buckets — Configuration" />
              <PermissionRow label="Create / edit / delete Buckets" owner={true} admin={true} member={false} />
              <PermissionRow label="Make a Bucket private" owner={true} admin={false} member={false} />
              <PermissionRow label="Open the Access page" owner={true} admin={true} member={false} />
              <PermissionRow label="Change Admins' access" owner={true} admin={false} member={false} />
              <PermissionRow label="Change Members' access" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Buckets — Data" />
              <PermissionRow label="View org-visible Buckets" owner={true} admin={true} member={true} />
              <PermissionRow label="View private Buckets" owner={true} admin={false} member={false} note="Admins and Members need an explicit grant" />
              <PermissionRow label="Edit data (org-visible)" owner={true} admin={true} member={false} note="Admins unless set to View only; Members need an Editor grant" />
              <PermissionRow label="Edit data (private)" owner={true} admin={false} member={false} note="Requires an Editor grant" />

              <PermissionGroupHeader label="Team" />
              <PermissionRow label="Invite as Member / HITL Only" owner={true} admin={true} member={false} />
              <PermissionRow label="Invite as Admin / Owner" owner={true} admin={false} member={false} />
              <PermissionRow label="Change role / remove Members and HITL Only" owner={true} admin={true} member={false} />
              <PermissionRow label="Change role / remove Admins and Owners" owner={true} admin={false} member={false} />
              <PermissionRow label="View the Audit Log" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Integrations & API" />
              <PermissionRow label="Use your own API key" owner={true} admin={true} member={true} note="It carries your role's limits" />
              <PermissionRow label="Generate an MCP connector" owner={true} admin={true} member={true} note="When enabled for your organisation" />

              <PermissionGroupHeader label="Organisation" />
              <PermissionRow label="Edit org settings" owner={true} admin={false} member={false} note="Name, timezone, notifications, failed-run auto-retry" />
              <PermissionRow label="View & manage billing" owner={true} admin={false} member={false} />
              <PermissionRow label="Delete organisation" owner={true} admin={false} member={false} />
            </div>
          </div>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Inviting your team">
          <p>Owners and Admins invite people from the Team page:</p>
          <NumberedList
            items={[
              'Go to Team and click "Invite Member"',
              'Choose "By email" and enter their address, or "Invite code" to create a code you share yourself',
              "Pick the role. Admins can only offer Member or HITL Only; Owners can offer any role",
              'Click "Send invitation". Tavnit emails a Tavnit invitation with a link to join; if they have no account yet, they create one on the way in',
            ]}
          />
          <p>
            Invitations and codes expire after 7 days. Under &ldquo;Pending Invitations&rdquo; you can
            &ldquo;Resend&rdquo; an email, &ldquo;Copy link&rdquo; to send it another way, or revoke
            it. Later, use &ldquo;Change Role&rdquo; or remove someone from the member list.
          </p>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="API keys, the MCP connector and gated features">
          <BulletList
            items={[
              <Fragment key="f0">
                Each member has their own <DocLink href="/docs/api-integration">API key</DocLink>{" "}
                (Settings → &ldquo;Account&rdquo; → &ldquo;API Key&rdquo;), and requests made with it
                are limited to that member&apos;s role. HITL Only keys are refused by the processing
                endpoints.
              </Fragment>,
              <Fragment key="f1">
                The <DocLink href="/docs/mcp-connector">MCP connector</DocLink> is generated from your
                own key on the Integrations page, so an AI assistant using it has exactly your
                permissions. The connector is enabled per organisation on request.
              </Fragment>,
              "Agents, Signals, Nets and Bucket chat are also enabled per organisation. When they are off, they don't appear for anyone, whatever their role. Contact support to turn them on.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Bucket Access System">
          <p>
            Buckets have a second access layer that lets Owners and Admins control exactly who can
            see and edit each Bucket, on top of the org role.
          </p>
          <InfoBox color="purple" icon={<Eye size={20} />} title="Layer 1: Visibility">
            Each Bucket is either Org-visible (everyone in the org can see it) or Private (only the
            Owner and users with an explicit grant can see it). Only the org Owner can make a Bucket
            private.
          </InfoBox>
          <InfoBox color="green" icon={<Lock size={20} />} title="Layer 2: Access level">
            Each user can be given View only or Editor access to a specific Bucket (and, on a private
            Bucket, No access). These grants are stored independently of the user&apos;s org role.
          </InfoBox>
          <p>
            To manage access, open the Bucket&apos;s details page and choose &ldquo;Access&rdquo;. The
            page groups people by role and shows each person&apos;s level; you can set it
            individually, use &ldquo;Set all:&rdquo; to update a whole group at once, or reset an
            override back to the role&apos;s default.
          </p>
          <WarningBox>
            A Bucket grant widens access, it does not narrow it. Granting a Member Editor access to
            one private Bucket does not stop them reading every org-visible Bucket. If data must
            stay restricted, the Bucket has to be private in the first place.
          </WarningBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/human-in-the-loop",
              label: "Assign reviewers",
              description:
                "How reviewer lists work, and why a HITL Only user needs to be on one.",
            },
            {
              href: "/docs/buckets",
              label: "Private Buckets and access grants",
              description:
                "The second access layer that sits on top of org roles, per Bucket and per person.",
            },
            {
              href: "/docs/mcp-connector",
              label: "Roles apply to AI assistants too",
              description:
                "A connector inherits the permissions of the member who generated it.",
            },
            {
              href: "/docs/api-integration",
              label: "Roles apply to API keys",
              description:
                "Each member has their own key, and it carries their role's limits.",
            },
          ]}
        />
      </section>
    </>
  );
}
