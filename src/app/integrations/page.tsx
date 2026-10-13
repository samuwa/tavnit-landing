import IntegrationsHub, { integrationsHubMetadata } from "@/components/IntegrationsHub";

export const metadata = integrationsHubMetadata("en");

export default function IntegrationsPage() {
  return <IntegrationsHub locale="en" />;
}
