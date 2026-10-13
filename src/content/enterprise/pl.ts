import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Polski (pl). Translated from ./en.ts. */
const pl: EnterpriseCopy = {
  title: "Usługi Enterprise — wdrożenie, kontrola i doradztwo biznesowe",
  description:
    "Tavnit Enterprise: umowa na Twoich warunkach, praktyczne wdrożenie, role użytkowników i ścieżka audytu, bezpośrednie wsparcie oraz doradztwo biznesowe w optymalizacji digitalizacji dokumentów i wprowadzania danych.",
  home: "Strona główna",
  breadcrumbLabel: "Ścieżka nawigacji",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Usługi Enterprise",
  lead:
    "Dla organizacji, które przetwarzają duże ilości dokumentów albo potrzebują własnych warunków: umowa, praktyczna pomoc we wdrożeniu Tavnit na produkcję i doradztwo w zakresie całego procesu — oprócz samej platformy.",
  servicesHeading: "Co obejmuje Enterprise",
  services: [
    {
      title: "Umowa na Twoich warunkach",
      body: "Wolumen, warunki handlowe i płatności ustalone w umowie dopasowanej do Twoich dokumentów, zamiast samoobsługowego planu.",
    },
    {
      title: "Praktyczne wdrożenie",
      body: "Razem z Tobą konfigurujemy Flows, Cleaners, reguły weryfikacji i integracje (API, webhooki, e-mail) na Twoich prawdziwych dokumentach i zostawiamy je działające na produkcji.",
    },
    {
      title: "Kontrola i audyt",
      body: "Role użytkowników, w tym rola wyłącznie dla weryfikatorów, warunkowa weryfikacja ręczna oraz niemodyfikowalna ścieżka audytu każdego wyświetlenia, edycji i zatwierdzenia.",
      links: [
        { label: "Role użytkowników", href: "/docs/user-roles" },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Bezpośrednie wsparcie",
      body: "Bezpośredni kontakt z zespołem, który tworzy produkt, po angielsku i po hiszpańsku.",
    },
  ],
  advisory: {
    eyebrow: "Doradztwo biznesowe",
    heading: "Doradztwo biznesowe",
    subheading: "Optymalizacja procesów digitalizacji dokumentów i wprowadzania danych",
    intro:
      "Oprócz platformy doradzamy firmom, które chcą uporządkować i usprawnić sposób, w jaki odbierają, digitalizują i rejestrują informacje z dokumentów — niezależnie od tego, czy efekt końcowy zostanie zautomatyzowany w Tavnit.",
    scopeHeading: "Zakres",
    scope: [
      { title: "Diagnoza obecnego procesu", body: "Jakie dokumenty przychodzą, jakimi kanałami i w jakiej ilości; kto je wprowadza, ile to trwa i skąd biorą się błędy." },
      { title: "Digitalizacja", body: "Zasady skanowania i przechwytywania, organizacja i nazewnictwo plików, rozdzielanie mieszanych partii i zachowanie identyfikowalności oryginałów." },
      { title: "Wprowadzanie danych", body: "Które pola są naprawdę potrzebne, standardowe formaty dat, kwot i walut, walidacje oraz porównanie z danymi referencyjnymi." },
      { title: "Kontrole", body: "Gdzie potrzebna jest weryfikacja ręczna, rozdział obowiązków i ścieżka audytu, o którą zapyta audytor lub regulator." },
      { title: "Integracja", body: "Jak dane trafiają do Twojego ERP, systemu księgowego lub arkuszy oraz które kroki warto automatyzować, a których nie." },
      { title: "Wdrożenie i szkolenia", body: "Etapowy plan wdrożenia i szkolenia dla osób, które wprowadzają, weryfikują i wykorzystują dane." },
    ],
    deliverablesHeading: "Rezultaty",
    deliverables:
      "Pisemna diagnoza obecnego procesu, projekt proponowanego procesu wraz z kontrolami oraz etapowy plan wdrożenia ze wskaźnikami do pomiaru efektów — czasem wprowadzania na dokument, odsetkiem poprawek i liczbą dokumentów oczekujących na weryfikację.",
  },
  ctaHeading: "Porozmawiajmy",
  ctaBody: "Opowiedz nam o swoich dokumentach i wolumenie, a powiemy Ci, która z tych usług pasuje.",
  ctaButton: "Umów spotkanie",
  ctaEmail: "albo napisz na",
};

export default pl;
