import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Tavnit - AI Document Data Extraction | Extract, Review & Act with AI Agents",
  description:
    "Extract structured data from PDFs automatically with AI. Clean and enrich it, route it through human review, and let AI browser agents act on it — with API, webhooks, and an MCP connector for claude.ai and Cursor. Free trial.",
  keywords:
    "AI document extraction, PDF data extraction, invoice processing automation, PDF to JSON, PDF to CSV, document to structured data, AI OCR, intelligent document processing, IDP, automated data entry, document automation, receipt scanning, contract analysis, AI browser agents, browser automation, human in the loop review, MCP connector, document workflow automation",
  authors: [{ name: "Tavnit" }],
  creator: "Tavnit",
  publisher: "Tavnit",
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
  openGraph: {
    type: "website",
    url: "https://tavnit.io/",
    title: "Tavnit - Extract Data from PDFs with AI | Free Trial",
    description:
      "AI document pipeline: extract, clean, review with your team, and act with AI browser agents. Invoices, contracts, receipts — automatically. Start free.",
    images: [
      {
        url: "https://tavnit.io/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tavnit - AI Document Data Extraction Platform",
      },
    ],
    siteName: "Tavnit",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tavnit - Extract Data from PDFs with AI | Free Trial",
    description:
      "AI document pipeline: extract, clean, review with your team, and act with AI browser agents — automatically.",
    images: ["https://tavnit.io/assets/og-image.png"],
    creator: "@tavnit_io",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://tavnit.io"),
  alternates: {
    canonical: "https://tavnit.io/",
    languages: {
      en: "https://tavnit.io/",
      "x-default": "https://tavnit.io/",
    },
  },
  category: "technology",
  other: {
    "theme-color": "#667eea",
    "msapplication-TileColor": "#667eea",
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
        <link rel="dns-prefetch" href="https://app.tavnit.io" />
        <link rel="preconnect" href="https://app.tavnit.io" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://tavnit.io/#organization",
                  name: "Tavnit",
                  url: "https://tavnit.io",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://tavnit.io/assets/tavnit_logo.png",
                    width: 120,
                    height: 60,
                  },
                  description:
                    "AI-powered document data extraction platform — extract, clean, store, and visualize structured data from any document.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "support@tavnit.com",
                    contactType: "customer support",
                    availableLanguage: "English",
                  },
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://tavnit.io/#website",
                  name: "Tavnit",
                  url: "https://tavnit.io",
                  description:
                    "AI document data extraction — from PDF to clean, structured, visualized data in seconds.",
                  publisher: { "@id": "https://tavnit.io/#organization" },
                  inLanguage: "en-US",
                },
                {
                  "@type": "WebPage",
                  "@id": "https://tavnit.io/#webpage",
                  url: "https://tavnit.io",
                  name: "Tavnit - AI Document Data Extraction | PDF to Structured Data in Seconds",
                  isPartOf: { "@id": "https://tavnit.io/#website" },
                  about: { "@id": "https://tavnit.io/#organization" },
                  description:
                    "Extract structured data from PDFs automatically with AI. Process invoices, contracts, receipts and forms.",
                  inLanguage: "en-US",
                  datePublished: "2024-01-01",
                  dateModified: "2026-07-05",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://tavnit.io/#software",
                  name: "Tavnit",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  offers: {
                    "@type": "AggregateOffer",
                    lowPrice: "16",
                    highPrice: "599",
                    priceCurrency: "USD",
                    offerCount: "4",
                  },
                  description:
                    "AI-powered document data extraction platform. Extract structured data from PDFs, auto-clean with AI, store in built-in databases, and visualize with charts.",
                  featureList: [
                    "AI-Powered Document Extraction",
                    "AI Browser Automation Agents",
                    "Human-in-the-Loop Review with Audit Trail",
                    "MCP Connector for AI Assistants",
                    "Smart Document Routing with Collections",
                    "Document Splitting",
                    "AI Data Cleaning with Cleaners",
                    "Built-in Data Storage with Buckets",
                    "Charts and Data Visualization",
                    "PDF Form Filling",
                    "REST API and SDKs",
                    "Email Triggers",
                    "Webhook Notifications",
                  ],
                  screenshot: "https://tavnit.io/assets/og-image.png",
                  url: "https://app.tavnit.io",
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://tavnit.io/#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://tavnit.io",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Tavnit?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tavnit is an AI-powered document platform that turns PDFs and images into clean, structured data — and then puts that data to work. It extracts with AI, cleans and enriches the results, routes them through human review when you want it, stores everything in built-in databases, and can even send AI agents to act on the data across the web. All without code.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of documents can Tavnit process?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Any PDF or image-based document: invoices, contracts, receipts, expense reports, resumes, forms, purchase orders, customs paperwork, and more — including scans and handwriting.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Tavnit Agents?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Agents are AI-powered browser automation bots. You describe a mission in plain language and give a starting URL; the agent opens a real cloud browser, works through the website, and returns structured data matching your schema. You can watch every session live, and a flow can launch an agent automatically with its extracted fields as inputs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Human in the Loop work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Enable review on any flow and its runs pause before results are delivered. Assigned reviewers are notified by email, can edit results directly in the review screen, and approve or reject the run. Every view, edit, and decision is recorded in an append-only audit trail. You can also trigger review conditionally, only when a Cleaner rule flags a value.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use Tavnit from claude.ai or Cursor?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Tavnit ships an MCP (Model Context Protocol) connector: generate a connector URL in the app and paste it into claude.ai (Pro and up), Cursor, or any MCP client. Your AI assistant can then process documents through your flows and query your Buckets directly.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Tavnit have an API?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Tavnit provides a full REST API with API key authentication, webhook notifications, email triggers, and Python and JavaScript examples — plus no-code recipes for Zapier, Make, n8n, and Power Automate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Tavnit Collections?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Collections let you group multiple extraction flows under a single endpoint. AI automatically analyzes each incoming document and routes it to the correct flow for processing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Tavnit Cleaners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cleaners are Tavnit's post-extraction transformation layer. They standardize formats, translate text, convert currencies and units, calculate fields, categorize with AI, match values against your reference data, and classify HS tariff codes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does Tavnit cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tavnit offers monthly subscription plans starting at $16/month for 100 credits (1 credit = 1 page). Plans include Starter ($16/mo), Growth ($77/mo), Pro ($138/mo), and Enterprise ($599/mo).",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>{children}</body>
    </html>
  );
}
