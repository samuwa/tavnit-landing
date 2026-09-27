import type { Metadata } from "next";
import DocsShell from "@/components/docs/DocsShell";
import { docsRootSchema } from "@/lib/schema";

/**
 * Spanish docs layout. The twin of src/app/docs/layout.tsx: same shell (it
 * reads the locale from the URL), Spanish defaults and the Spanish ItemList.
 * Each page sets its own title, description, canonical and hreflang through
 * docMetadata(slug, "es").
 */
export const metadata: Metadata = {
  title: "Documentación",
  description:
    "Documentación de Tavnit. Extracción de documentos con IA, Agents que actúan en el navegador, revisión humana, conector MCP para asistentes de IA, Collections, Cleaners, Splitters, Buckets, API REST, correo, webhooks y roles de usuario.",
};

export default function DocsLayoutEs({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docsRootSchema("es")) }}
      />
      <DocsShell>{children}</DocsShell>
    </>
  );
}
