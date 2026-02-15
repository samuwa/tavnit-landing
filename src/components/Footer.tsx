import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Documentation", href: "/docs" },
  { label: "API Reference", href: "/docs#api-integration" },
  { label: "Sign In", href: "https://app.tavnit.io" },
];

const company = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const resources = [
  { label: "Use Cases", href: "#use-cases" },
  { label: "Integration Guide", href: "/docs#getting-started" },
  { label: "Documentation", href: "/docs" },
  { label: "Sign In", href: "https://app.tavnit.io" },
];

export default function Footer() {
  return (
    <footer className="py-10 pb-6 md:py-16 md:pb-8 bg-black/40 backdrop-blur-sm border-t border-white/5 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/assets/tavnit_logo.png"
                alt="Tavnit - AI Document Data Extraction Platform"
                width={120}
                height={60}
                className="h-[48px] md:h-[60px] w-auto brightness-200"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[300px]">
              AI-powered document extraction that transforms PDFs into structured data.
            </p>
          </div>

          {/* Quick Links (visible on mobile, hidden on desktop where we show separate columns) */}
          <div className="lg:hidden">
            <h4 className="text-base font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Desktop columns */}
          <div className="hidden lg:block">
            <h4 className="text-base font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-base font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-base font-semibold text-white mb-6">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">GitHub</Link></li>
              <li><Link href="mailto:support@tavnit.com" className="text-sm text-gray-500 hover:text-white transition-colors">support@tavnit.com</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
          <p>&copy; 2026 Tavnit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
