import type { EnterpriseCopy } from "@/content/types";
import type { Locale } from "@/lib/locales";
import en from "./en";
import es from "./es";
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
 * Enterprise services copy per language.
 * One file per language; see src/content/README.md.
 */
export const ENTERPRISE_COPY: Record<Locale, EnterpriseCopy> = {
  en,
  es,
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
