import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tavnit - AI Document Data Extraction",
    short_name: "Tavnit",
    description:
      "Extract structured data from PDFs automatically with AI. Process invoices, contracts, receipts and forms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a1a",
    theme_color: "#667eea",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
