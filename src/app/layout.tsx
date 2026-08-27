import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { APP_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/site";
import { siteSchema } from "@/lib/schema";
import Analytics, { CONSENT_DEFAULT_SCRIPT } from "@/components/Analytics";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  // `template` lets child routes set a short title and inherit the brand suffix.
  title: {
    default: "Tavnit — AI Document Pipeline: Extract, Review, Act",
    template: "%s | Tavnit",
  },
  description: SITE_DESCRIPTION,
  // NOTE: the `keywords` meta field was removed here. Google dropped support in
  // 2009, and the Princeton GEO study found keyword stuffing actively *reduces*
  // citation rates in AI search (~-10%) — so it was a small net negative.
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // `images` is intentionally omitted from openGraph/twitter: the generated
  // opengraph-image.tsx / twitter-image.tsx routes supply them automatically.
  // The previous hardcoded /assets/og-image.png was never committed and 404'd.
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "Tavnit — Extract Data from PDFs with AI, Review It, Then Act",
    description:
      "AI document pipeline: extract, clean, review with your team, and act with AI browser agents. Invoices, contracts, receipts — automatically. Start free.",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tavnit — Extract Data from PDFs with AI, Review It, Then Act",
    description:
      "AI document pipeline: extract, clean, review with your team, and act with AI browser agents — automatically.",
    creator: TWITTER_HANDLE,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      en: `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  category: "technology",
  other: {
    "theme-color": "#3b82f6",
    "msapplication-TileColor": "#3b82f6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Consent Mode v2 defaults must precede gtag.js (loaded by <Analytics />). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        <link rel="dns-prefetch" href={APP_URL} />
        <link rel="preconnect" href={APP_URL} crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema()) }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
