import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import ApiIntegrationContent from "@/components/docs/ApiIntegrationContent";

export const metadata = docMetadata("api-integration");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="api-integration" />
      <ApiIntegrationContent />
    </>
  );
}
