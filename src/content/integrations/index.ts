import type { IntegrationsContent } from "@/content/types";
import type { Locale } from "@/lib/locales";
import en from "./en";
import ptBR from "./pt-BR";
import fr from "./fr";
import de from "./de";
import it from "./it";
import nl from "./nl";
import pl from "./pl";
import tr from "./tr";
import zhHans from "./zh-Hans";
import ja from "./ja";
import ko from "./ko";

/**
 * Integrations pages per language. Spanish is not here: /es/integraciones and
 * /es/integraciones/mcp are their own pages (src/lib/integrations.es.ts).
 * One file per language; see src/content/README.md.
 */
export const INTEGRATION_CONTENT: Record<Exclude<Locale, "es">, IntegrationsContent> = {
  en,
  "pt-BR": ptBR,
  fr,
  de,
  it,
  nl,
  pl,
  tr,
  "zh-Hans": zhHans,
  ja,
  ko,
};
