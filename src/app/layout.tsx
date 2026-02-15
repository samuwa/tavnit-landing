import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tavnit - AI Document Data Extraction | PDF to Structured Data in Seconds",
  description:
    "Extract structured data from PDFs automatically with AI. Process invoices, contracts, receipts and forms. Auto-clean, store, and visualize — from document to dashboard in seconds. Free trial.",
  keywords:
    "AI document extraction, PDF data extraction, invoice processing automation, PDF to JSON, PDF to CSV, document to structured data, AI OCR, intelligent document processing, IDP, automated data entry",
  authors: [{ name: "Tavnit" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
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
  other: {
    "theme-color": "#667eea",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Tavnit",
                  url: "https://tavnit.io",
                  logo: "https://tavnit.io/assets/tavnit_logo.png",
                  description:
                    "AI-powered document data extraction platform — extract, clean, store, and visualize structured data from any document.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "support@tavnit.com",
                    contactType: "customer support",
                  },
                },
                {
                  "@type": "WebSite",
                  name: "Tavnit",
                  url: "https://tavnit.io",
                  description:
                    "AI document data extraction — from PDF to clean, structured, visualized data in seconds.",
                },
                {
                  "@type": "SoftwareApplication",
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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
