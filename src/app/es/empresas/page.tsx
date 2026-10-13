import EnterpriseServices, { enterpriseMetadata } from "@/components/EnterpriseServices";

export const metadata = enterpriseMetadata("es");

export default function SpanishEnterprisePage() {
  return <EnterpriseServices locale="es" />;
}
