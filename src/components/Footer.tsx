import Image from "next/image";
import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL, SUPPORT_EMAIL } from "@/lib/site";

/**
 * Site footer.
 *
 * This is the primary internal-linking surface. The previous version had four
 * columns of same-page "#anchor" links plus a GitHub URL — so a crawler landing
 * on the homepage found almost no routes to follow, and the 13 documentation
 * pages were reachable only from inside /docs.
 *
 * Two rules here:
 *  - All links are root-relative ("/#features", not "#features") so they resolve
 *    correctly from /pricing, /docs/* and the legal pages.
 *  - The same columns render on mobile and desktop. The old markup duplicated
 *    the list into a mobile-only "Quick Links" block and desktop-only columns,
 *    which meant mobile users never saw Connect, and the two lists drifted.
 */

type FooterLink = { label: string; href: string; external?: boolean };

const product: FooterLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Agents", href: "/#agents" },
  { label: "Human in the Loop", href: "/#human-in-the-loop" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Pricing", href: "/pricing" },
];

const documentation: FooterLink[] = [
  { label: "Getting Started", href: "/docs" },
  { label: "Collections", href: "/docs/collections" },
  { label: "Cleaners", href: "/docs/cleaners" },
  { label: "Buckets", href: "/docs/buckets" },
  { label: "Agents", href: "/docs/agents" },
  { label: "Human in the Loop", href: "/docs/human-in-the-loop" },
  { label: "Pipeline Map", href: "/docs/pipeline-map" },
];

const integrations: FooterLink[] = [
  { label: "MCP Connector", href: "/docs/mcp-connector" },
  { label: "REST API", href: "/docs/api-integration" },
  { label: "Email Integration", href: "/docs/email-integration" },
  { label: "Webhooks", href: "/docs/webhooks" },
  { label: "Splitters", href: "/docs/splitters" },
  { label: "User Roles", href: "/docs/user-roles" },
];

const company: FooterLink[] = [
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Contact", href: `mailto:${SUPPORT_EMAIL}` },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const columns: { title: string; links: FooterLink[] }[] = [
  { title: "Product", links: product },
  { title: "Documentation", links: documentation },
  { title: "Integrations", links: integrations },
  { title: "Company", links: company },
];

export default function Footer() {
  return (
    <footer className="py-10 pb-6 md:py-16 md:pb-8 bg-black/40 backdrop-blur-sm border-t border-white/5 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-6">
              <Image
                src="/assets/tavnit_logo.png"
                alt="Tavnit - AI Document Data Extraction Platform"
                width={174}
                height={60}
                className="h-[48px] md:h-[60px] w-auto"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[300px]">
              AI document operations — extract, clean, review, and act on data from any document.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-base font-semibold text-white mb-4 md:mb-6">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
          <p>&copy; 2026 Tavnit. All rights reserved.</p>
          <p>
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-gray-400 transition-colors">
              {SUPPORT_EMAIL}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
