import type { Metadata } from "next";
import EnterpriseServices, { enterpriseMetadata } from "@/components/EnterpriseServices";
import { pageLocale, type LangParams } from "../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return enterpriseMetadata(await pageLocale(params));
}

export default async function LangEnterprisePage({ params }: { params: Promise<LangParams> }) {
  return <EnterpriseServices locale={await pageLocale(params)} />;
}
