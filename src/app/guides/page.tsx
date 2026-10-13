import GuidesHub, { guidesHubMetadata } from "@/components/GuidesHub";

export const metadata = guidesHubMetadata("en");

export default function GuidesHubPage() {
  return <GuidesHub locale="en" />;
}
