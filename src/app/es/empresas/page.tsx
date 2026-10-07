import type { Metadata } from "next";
import EnterpriseServices, { ENTERPRISE_PATHS, enterpriseMetadataCopy } from "@/components/EnterpriseServices";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

const { title, description } = enterpriseMetadataCopy("es");

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: ENTERPRISE_PATHS.es,
    languages: languageAlternates(ENTERPRISE_PATHS.en, ENTERPRISE_PATHS.es),
  },
  openGraph: {
    type: "website",
    url: ENTERPRISE_PATHS.es,
    title: "Tavnit Enterprise",
    description,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

export default function SpanishEnterprisePage() {
  return <EnterpriseServices locale="es" />;
}
