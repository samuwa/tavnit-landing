import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ClipboardCheck, Eye, Info, Lock, Shield, Star, Table2, UserCog, Users } from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          User Roles &amp; Permissions
        </h1>

        <DocCard icon={<Shield size={24} />} title="Overview">
          <Lead>
            Every Tavnit user belongs to an organisation with exactly one of four roles: Owner,
            Admin, Member or HITL Only. The role is set when you invite someone and decides what
            they can see and do across the whole app — there is no per-feature override except for
            Bucket access grants.
          </Lead>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
            <RoleBadge label="Owner" color="border-purple-500/30 bg-purple-500/[0.06]" icon={<Star size={22} className="text-purple-400" />} subtitle="Full control" />
            <RoleBadge label="Admin" color="border-blue-500/30 bg-blue-500/[0.06]" icon={<UserCog size={22} className="text-blue-400" />} subtitle="Manages people & content" />
            <RoleBadge label="Member" color="border-cyan-500/30 bg-cyan-500/[0.06]" icon={<Users size={22} className="text-cyan-400" />} subtitle="Runs flows" />
            <RoleBadge label="HITL Only" color="border-amber-500/30 bg-amber-500/[0.06]" icon={<ClipboardCheck size={22} className="text-amber-400" />} subtitle="Reviews only" />
          </div>
          <DataTable
            head={["Role", "In one line", "Give it to"]}
            rows={[
              ["Owner", "Full control, including billing and deleting the organisation.", "The person accountable for the account. Usually one."],
              ["Admin", "Builds and manages everything except billing and org settings.", "Whoever configures flows, Cleaners and Buckets day to day."],
              ["Member", "Runs existing flows and reads results. Cannot change configuration.", "People who process documents but should not rewire the pipeline."],
              ["HITL Only", "Can do nothing but review runs they are assigned to.", "Approvers and auditors who must never touch configuration or data."],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Roles are per organisation">
            The same person can be an Owner in one organisation and a Member in another. Switching
            organisation switches your role with it, so check the switcher before wondering why a
            button disappeared.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Star size={24} />} title="Owner">
          <InfoBox color="purple" icon={<Info size={20} />} title="One owner per org">
            There is normally one owner — the person who created the organisation,
            or someone explicitly promoted to owner. The owner cannot be removed or
            demoted by anyone except themselves.
          </InfoBox>
          <p>Owners have unrestricted access to everything:</p>
          <BulletList
            items={[
              "Create, edit, and delete flows, buckets, collections, cleaners, and matchers",
              "Trigger runs and view all results",
              "Invite and remove any team member, including other admins",
              "Promote or demote members to any role (including admin)",
              "Edit organisation name and settings",
              "View and manage billing and subscription",
              "Delete the organisation",
              "Set any bucket to private",
              "Control all bucket access — including changing admin permissions",
            ]}
          />
        </DocCard>

        <DocCard icon={<UserCog size={24} />} title="Admin">
          <InfoBox color="blue" icon={<Info size={20} />} title="Trusted power users">
            Admins help run day-to-day operations. They can create and manage content
            and invite new members, but cannot touch billing, org settings, or other admins.
          </InfoBox>
          <p>Admins can:</p>
          <BulletList
            items={[
              "Create, edit, and delete flows, buckets, collections, and cleaners",
              "Create and manage their own matchers, and edit any matcher",
              "Trigger runs and view all results",
              "Invite new members to the org (member role only)",
              "Remove members from the org",
              "Edit and delete any flow, collection, or matcher created by members",
              "Open the bucket access screen and change member access levels",
            ]}
          />
          <p>Admins cannot:</p>
          <BulletList
            items={[
              "Edit org settings or billing",
              "Delete the organisation",
              "Set a bucket to private",
              "Change another admin's permissions or role",
              "Invite someone as admin or owner (owner only)",
            ]}
          />
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Member">
          <InfoBox color="green" icon={<Info size={20} />} title="Read and run, with limited create">
            Members are regular users. They can use flows that already exist and
            manage their own matchers, but cannot create flows or modify shared resources.
          </InfoBox>
          <p>Members can:</p>
          <BulletList
            items={[
              "Trigger runs on existing flows and view all run results",
              "View flow details — including fields, webhook, email trigger, email output, data cleaning, and export to bucket settings",
              "Create, edit, and delete their own matchers",
              "Run matches on existing matchers",
              "View all org-visible buckets (read-only by default)",
              "Write data to a bucket if an admin or owner grants them editor access",
            ]}
          />
          <p>Members cannot:</p>
          <BulletList
            items={[
              "Create new flows, buckets, collections, or cleaners",
              "Edit or delete any flow, or its fields and features",
              "Toggle or configure flow features (webhook, email trigger, email output, data cleaning, export to bucket)",
              "Edit or delete matchers created by others",
              "Invite or remove team members",
              "See private buckets unless explicitly granted access",
              "Access the bucket access management screen",
              "See the billing or org settings pages",
            ]}
          />
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="HITL Only">
          <Lead>
            HITL Only is a deliberately narrow role: the holder can review and decide on the runs
            they are assigned to, and nothing else. Every processing and data operation is refused,
            in the app and over the API alike, with an explicit &ldquo;your role only permits HITL
            reviews&rdquo; response.
          </Lead>
          <p>Someone with this role can:</p>
          <BulletList
            items={[
              <Fragment key="f0">
                Open the <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink> queue
                and see runs where they are a named reviewer
              </Fragment>,
              "Read the extracted data next to the source document",
              "Edit values, add or drop rows and columns during review",
              "Approve a run, or reject it with a reason",
            ]}
          />
          <p>They cannot:</p>
          <BulletList
            items={[
              "Upload a document or trigger a run of any kind",
              "See or change flows, Collections, Cleaners, Splitters or Agents",
              "Read or write Bucket data outside a review",
              "Call the processing API — those endpoints refuse the role outright",
              "Invite anyone, or see billing and organisation settings",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Assignment is still separate">
            The role permits reviewing; it does not grant it. A HITL Only user still has to be added
            to a flow&apos;s reviewer list by an Owner or Admin, or named on a Cleaner&apos;s review
            action. Without that they sign in to an empty queue.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Permissions at a Glance">
          <Lead>
            What Owner, Admin and Member can each do, feature by feature. HITL Only is deliberately
            absent: it is denied every row in this table, and its only capability is reviewing runs
            it has been assigned.
          </Lead>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              {/* Table Header */}
              <div className="flex items-center pb-3 border-b border-white/[0.08]">
                <div className="flex-1" />
                <div className="w-16 text-center"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Owner</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Admin</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Member</span></div>
              </div>

              <PermissionGroupHeader label="Flows" />
              <PermissionRow label="Create flows" owner={true} admin={true} member={false} />
              <PermissionRow label="Edit / delete flows" owner={true} admin={true} member={false} />
              <PermissionRow label="View flow features & fields" owner={true} admin={true} member={true} />
              <PermissionRow label="Configure flow features" owner={true} admin={true} member={false} note="Webhook, email, data cleaning, bucket export" />
              <PermissionRow label="Trigger runs" owner={true} admin={true} member={true} />
              <PermissionRow label="View run results" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Matchers" />
              <PermissionRow label="Create matchers" owner={true} admin={true} member={true} />
              <PermissionRow label="Edit / delete own matchers" owner={true} admin={true} member={true} />
              <PermissionRow label="Edit / delete any matcher" owner={true} admin={true} member={false} />
              <PermissionRow label="Run matches" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Buckets — Configuration" />
              <PermissionRow label="Create / edit / delete buckets" owner={true} admin={true} member={false} />
              <PermissionRow label="Set bucket to private" owner={true} admin={false} member={false} />
              <PermissionRow label="Open access management screen" owner={true} admin={true} member={false} />
              <PermissionRow label="Change admin access levels" owner={true} admin={false} member={false} />
              <PermissionRow label="Change member access levels" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Buckets — Data" />
              <PermissionRow label="View org-visible buckets" owner={true} admin={true} member={true} />
              <PermissionRow label="View private buckets" owner={true} admin={false} member={false} note="Requires explicit grant" />
              <PermissionRow label="Edit data (org-visible)" owner={true} admin={true} member={false} note="Member needs editor grant" />
              <PermissionRow label="Edit data (private)" owner={true} admin={false} member={false} note="Requires editor grant" />

              <PermissionGroupHeader label="Collections & Cleaners" />
              <PermissionRow label="Create collections / cleaners" owner={true} admin={true} member={false} />
              <PermissionRow label="Edit / delete any" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Team" />
              <PermissionRow label="Invite members" owner={true} admin={true} member={false} />
              <PermissionRow label="Remove members" owner={true} admin={true} member={false} />
              <PermissionRow label="Promote to admin" owner={true} admin={false} member={false} />
              <PermissionRow label="Promote to owner" owner={true} admin={false} member={false} />

              <PermissionGroupHeader label="Organisation" />
              <PermissionRow label="Edit org settings" owner={true} admin={false} member={false} />
              <PermissionRow label="View & manage billing" owner={true} admin={false} member={false} />
              <PermissionRow label="Delete organisation" owner={true} admin={false} member={false} />
            </div>
          </div>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Bucket Access System">
          <p>
            Buckets have a two-layer access system that lets owners and admins control
            exactly who can see and edit each bucket independently of their org role.
          </p>
          <InfoBox color="purple" icon={<Eye size={20} />} title="Layer 1 — Visibility">
            Each bucket is either Org-visible (everyone in the org can see it) or Private
            (only the owner and users with an explicit grant can see it).
            Only the org owner can toggle a bucket to private.
          </InfoBox>
          <InfoBox color="green" icon={<Lock size={20} />} title="Layer 2 — Access Level">
            Each user can be granted Viewer (read-only) or Editor (read + write) access
            to a specific bucket. These grants are stored independently of the user&apos;s org role.
          </InfoBox>
          <p>To manage access, open a bucket and tap the settings icon &rarr; Manage Access.
            The access screen groups users by role and lets you set each person&apos;s level
            individually, or use the &ldquo;Set all&rdquo; controls to update an entire group at once.</p>
          <WarningBox>
            A Bucket grant widens access, it does not narrow it. Granting a Member editor access to
            one private Bucket does not stop them reading every org-visible Bucket. If data must
            stay restricted, the Bucket has to be private in the first place.
          </WarningBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/human-in-the-loop",
              label: "Assign reviewers to a flow",
              description:
                "How the reviewer list works, and why a HITL Only user needs to be on it.",
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
