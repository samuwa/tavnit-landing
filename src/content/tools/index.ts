import type { LiteLocaleCopy } from "@/lib/lite/copy-base";
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
 * Free tools copy per language (assembled by src/lib/lite/copy.ts).
 * One file per language; see src/content/README.md.
 */
export const LITE_COPY: Record<Locale, LiteLocaleCopy> = {
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
