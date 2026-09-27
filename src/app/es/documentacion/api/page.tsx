import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import ApiIntegrationContentEs from "@/components/docs/ApiIntegrationContentEs";

export const metadata = docMetadata("api-integration", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="api-integration" locale="es" />
      <ApiIntegrationContentEs />
    </>
  );
}
