import EnterpriseServices, { enterpriseMetadata } from "@/components/EnterpriseServices";

export const metadata = enterpriseMetadata("en");

export default function EnterprisePage() {
  return <EnterpriseServices locale="en" />;
}
