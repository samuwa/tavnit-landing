import { docsPageSchema } from "@/lib/schema";
import type { DocSlug } from "./nav";

/**
 * Per-page docs JSON-LD. Server component by design.
 *
 * This previously lived in DocsShell, which is a client component. The schema
 * carries a build-stamped `dateModified`, and that constant is evaluated at
 * module load — build time on the server, page load in the browser — so the two
 * renders disagreed and React reported a hydration mismatch. Emitting it from a
 * server component evaluates it exactly once, and keeps the JSON out of the
 * client bundle.
 */
export default function DocsPageSchema({ slug }: { slug: DocSlug }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(docsPageSchema(slug)) }}
    />
  );
}
