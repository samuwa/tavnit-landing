import type { GuidesContent } from "@/content/types";
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
 * Guides per language. Spanish is not here: /es/guias has its own Spanish
 * slugs and data (src/lib/guides.es.ts).
 * One file per language; see src/content/README.md.
 */
export const GUIDE_CONTENT: Record<Exclude<Locale, "es">, GuidesContent> = {
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
