import type { HomeCopy } from "@/content/types";
import type { Locale } from "@/lib/locales";
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
 * Home copy per language. English is not here: "/" is the rich animated home
 * (src/app/page.tsx); ./en.ts is only the translation source.
 * One file per language; see src/content/README.md.
 */
export const HOME_COPY: Record<Exclude<Locale, "en">, HomeCopy> = {
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
