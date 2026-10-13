import type { DocsNavCopy } from "../types";

/**
 * Polish docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the docs of every language (Flow, Collection, Cleaner, Bucket, Agent…);
 * UI labels follow the app's Polish dictionary (tavnit-nextjs
 * src/lib/i18n/translations.pl.ts), e.g. "Weryfikacja ręczna" for the Human
 * in the Loop page.
 */
const pl: DocsNavCopy = {
  docsName: "Dokumentacja",
  home: "Strona główna",
  description:
    "Dokumentacja Tavnit: ekstrakcja danych z dokumentów z pomocą AI, weryfikacja ręczna, konektor MCP dla asystentów AI, REST API, wyzwalacze e-mail i więcej.",
  chrome: {
    back: "Wróć na stronę główną",
    toggle: "Otwórz lub zamknij menu",
    goHome: "Przejdź na stronę główną",
    contents: "Spis treści",
    close: "Zamknij menu",
    nav: "Dokumentacja",
    languages: "Przeczytaj tę stronę w innym języku",
    englishOnly: "Tylko po angielsku",
    copy: "Kopiuj",
    copied: "Skopiowano!",
    related: "Powiązana dokumentacja",
    keepReading: "Czytaj dalej",
  },
  groupLabels: {
    start: "Na start",
    orchestration: "Orkiestracja",
    input: "Wejście",
    processing: "Przetwarzanie",
    intelligence: "Inteligencja",
    verticals: "Audio i media społecznościowe",
    data: "Dane i weryfikacja",
    integrate: "Integracje",
    organization: "Organizacja",
  },
  labels: {
    "getting-started": "Pierwsze kroki",
    pipelines: "Pipelines",
    "pipeline-map": "Mapa Pipeline'ów",
    collections: "Collections",
    subjects: "Subjects",
    splitters: "Splitters",
    flows: "Flows",
    cleaners: "Cleaners",
    agents: "Agents",
    matchers: "Matchers",
    inspectors: "Inspectors",
    fillers: "Fillers",
    signals: "Signals",
    nets: "Nets",
    buckets: "Buckets",
    "human-in-the-loop": "Weryfikacja ręczna",
    "email-integration": "Integracja e-mail",
    "api-integration": "Integracja API",
    webhooks: "Webhooks",
    "mcp-connector": "Konektor MCP",
    "user-roles": "Role użytkowników",
  },
  pages: {
    "getting-started": {
      heading: "Pierwsze kroki",
      title: "Dokumentacja Tavnit: pierwsze kroki z ekstrakcją AI",
      description:
        "Skonfiguruj swój pierwszy Flow w Tavnit: zdefiniuj pola, prześlij dokument i odbierz dane strukturalne. Bez szablonów i bez kodu.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: zdecyduj, co Tavnit wyciąga z każdego dokumentu",
      description:
        "Schemat danych Flow: pola metadanych i pola tabeli, typy danych, wskazówki ekstrakcji dla AI oraz pola złożone i wielowartościowe.",
    },
    "api-integration": {
      heading: "Integracja API",
      title: "REST API do ekstrakcji z dokumentów: Python, JS i no-code",
      description:
        "Dokumentacja REST API Tavnit: wszystkie endpointy dla Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines i innych, plus przepisy no-code.",
    },
    "email-integration": {
      heading: "Integracja e-mail",
      title: "Automatyczna ekstrakcja danych z załączników e-mail",
      description:
        "Przekazuj dokumenty na adres Flow, Collection lub Splittera, a każdy załącznik zostanie automatycznie przetworzony.",
    },
    "mcp-connector": {
      heading: "Konektor MCP",
      title: "Konektor MCP: połącz Tavnit z Claude i Cursor",
      description:
        "Krok po kroku: utwórz URL konektora, dodaj go w claude.ai lub Cursor, odnów go na czas i napraw najczęstsze błędy.",
    },
    "human-in-the-loop": {
      heading: "Weryfikacja ręczna (Human in the Loop)",
      title: "Weryfikacja ręczna z niezmiennym dziennikiem audytu",
      description:
        "Wstrzymaj Flow do weryfikacji przed dostarczeniem wyników — każdy Run albo tylko oznaczone. Przypisz weryfikatorów, edytuj, zatwierdzaj lub odrzucaj.",
    },
  },
};

export default pl;
