import type { Metadata } from "next";
import EnterpriseServices, { ENTERPRISE_PATHS, enterpriseMetadataCopy } from "@/components/EnterpriseServices";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

const { title, description } = enterpriseMetadataCopy("en");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: ENTERPRISE_PATHS.en,
    languages: languageAlternates(ENTERPRISE_PATHS.en, ENTERPRISE_PATHS.es),
  },
  openGraph: {
    type: "website",
    url: ENTERPRISE_PATHS.en,
    title: "Tavnit Enterprise",
    description,
    siteName: "Tavnit",
    locale: EN_LOCALE_OG,
    alternateLocale: [ES_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

export default function EnterprisePage() {
  return <EnterpriseServices locale="en" />;
}
