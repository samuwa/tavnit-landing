import UseCasesHub, { metadataForUseCasesHub } from "@/components/UseCasesHub";

export const metadata = metadataForUseCasesHub("en");

export default function UseCasesPage() {
  return <UseCasesHub locale="en" />;
}
