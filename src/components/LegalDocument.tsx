import Link from "next/link";
import MarketingPage from "@/components/MarketingPage";

/**
 * Shared shell for /privacy and /terms.
 *
 * Content rule for these pages: state only what is verifiable from this
 * workspace — the product's documented behaviour, published pricing, and the
 * roles and access model described in /docs. No backend implementation detail,
 * no named vendors, and no invented specifics such as retention periods,
 * jurisdiction or liability caps. Where a fact is not knowable here, the
 * section is omitted rather than filled with a plausible guess.
 */
export default function LegalDocument({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <MarketingPage>
      <article className="max-w-[760px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-400">{title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>

        <p className="text-gray-400 leading-relaxed mb-10">{intro}</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">{children}</div>
      </article>
    </MarketingPage>
  );
}

/** Section wrapper so headings stay consistent and land in the outline. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
