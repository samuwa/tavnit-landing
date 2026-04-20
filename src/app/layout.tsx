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
  title: "Tavnit - AI Document Data Extraction | PDF to Structured Data in Seconds",
  description:
    "Extract structured data from PDFs automatically with AI. Process invoices, contracts, receipts and forms. Auto-clean, store, and visualize — from document to dashboard in seconds. Free trial.",
  keywords:
    "AI document extraction, PDF data extraction, invoice processing automation, PDF to JSON, PDF to CSV, document to structured data, AI OCR, intelligent document processing, IDP, automated data entry, document automation, receipt scanning, contract analysis",
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
      "AI-powered document extraction pipeline. Extract, clean, store, and visualize data from invoices, contracts, receipts — automatically. Start free.",
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
      "AI-powered document extraction pipeline. Extract, clean, store, and visualize data from invoices, contracts, receipts — automatically.",
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
                  dateModified: "2026-04-20",
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
                    "Smart Document Routing with Collections",
                    "AI Data Cleaning with Cleaners",
                    "Built-in Data Storage with Buckets",
                    "Charts and Data Visualization",
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
                    text: "Tavnit is an AI-powered document data extraction platform that transforms PDFs and documents into clean, structured data. It handles the full pipeline: extract data with AI, auto-clean and validate it, store it in built-in databases, and visualize it with charts — all without code.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of documents can Tavnit process?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tavnit can process any PDF or image-based document including invoices, contracts, receipts, expense reports, resumes, forms, purchase orders, and more.",
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
                {
                  "@type": "Question",
                  name: "Does Tavnit have an API?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Tavnit provides a full REST API with API key authentication, webhook notifications, email triggers, and Python and JavaScript SDKs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Tavnit Collections?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Collections let you group multiple extraction flows under a single endpoint. AI automatically analyzes each document and routes it to the correct flow for processing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Tavnit Cleaners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cleaners are Tavnit's post-extraction data transformation layer. They standardize date and number formats, add calculated fields, apply AI-powered categorization, and validate data.",
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
