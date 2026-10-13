import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — Polski (pl). Translated from ./en.ts. */
const pl: IntegrationsContent = {
  hub: {
    title: "Integracje — API, e-mail, webhooki i MCP",
    description:
      "Wszystkie drogi do Tavnit i z powrotem: konektor MCP dla asystentów AI, REST API, przekazywanie e-maili, webhooki oraz przepisy dla Zapier, Make i n8n.",
    ogTitle: "Integracje Tavnit",
    breadcrumbHome: "Strona główna",
    h1: "Integracje",
    intro:
      "Dokumenty trafiają do Tavnit tak, jak wygodnie jest zespołowi, który je wysyła — wgrane w aplikacji, przekazane na adres e-mail, wysłane do endpointu albo zlecone przez asystenta AI. Wyciągnięte dane wychodzą tymi samymi drogami.",
    introMore:
      "Każda droga uruchamia te same Flows, więc skonfigurowany schemat, reguły czyszczenia i kroki weryfikacji obowiązują niezależnie od tego, jak dokument dotarł.",
    whichHeading: "Którą drogę wybrać?",
    which: [
      "**Jeśli dokumenty wysyłają ludzie** — na przykład skrzynka działu księgowości, do której trafiają faktury od dostawców — użyj [e-maila](/docs/email-integration). Nikt nie musi uczyć się nowego narzędzia; wszyscy przekazują wiadomości tak jak dotąd.",
      "**Jeśli wysyła je system**, użyj [REST API](/docs/api-integration), a wyniki odbieraj przez [webhook](/docs/webhooks). Jeśli wolisz nie pisać kodu integracyjnego, te same endpointy działają z Zapier, Make, n8n i Power Automate.",
      "**Jeśli pracujesz z asystentem AI**, użyj [konektora MCP](/integrations/mcp). Daje on claude.ai lub Cursor cały pipeline, a nie tylko wejście: asystent może budować Flows ekstrakcji, dodawać reguły czyszczenia, przepuszczać przez nie dokumenty i przeszukiwać to, co już wyciągnąłeś — bez ręcznego przenoszenia plików.",
    ],
    finalHeading: "Zacznij od jednego dokumentu",
    finalBody:
      "Zbuduj Flow, przepuść przez niego dokument i podłącz dostarczanie wyników, gdy już zobaczysz efekt. Darmowe kredyty na start.",
    finalCta: "Zacznij za darmo",
  },
  items: [
    {
      label: "Konektor MCP",
      href: "/integrations/mcp",
      summary:
        "Dodaj Tavnit do claude.ai, Cursor lub dowolnego klienta MCP. Asystent może budować Flows ekstrakcji, dodawać reguły czyszczenia, przepuszczać przez nie dokumenty i przeszukiwać wyciągnięte dane — wszystko na czacie.",
      own: true,
    },
    {
      label: "REST API",
      href: "/docs/api-integration",
      summary:
        "Wysyłaj dokumenty programowo z kluczem API. Przesyłanie multipart lub base64, z przykładami w Pythonie i JavaScripcie.",
      own: false,
    },
    {
      label: "E-mail",
      href: "/docs/email-integration",
      summary:
        "Przekazuj dokumenty ręcznie lub automatycznie na dedykowany adres, a dane z każdego załącznika zostaną wyciągnięte — wyniki trafią e-mailem do osób, które ich potrzebują, bez otwierania aplikacji.",
      own: false,
    },
    {
      label: "Webhooki",
      href: "/docs/webhooks",
      summary:
        "Wysyłaj typowane wyniki do własnego endpointu w chwili zakończenia przetwarzania, aby wyciągnięte dane automatycznie trafiały do Twoich systemów.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n i Power Automate",
      href: "/docs/api-integration",
      summary:
        "Przepisy no-code, które wywołują te same endpointy — dla zespołów, które wolą połączyć wszystko wizualnie, niż pisać kod.",
      own: false,
    },
    {
      label: "Buckets",
      href: "/docs/buckets",
      summary:
        "Przechowuj wyciągnięte wiersze we wbudowanym magazynie danych — edytuj je na miejscu, przeszukuj, twórz wykresy albo eksportuj do CSV i Excel.",
      own: false,
    },
  ],
  mcp: {
    title: "Ekstrakcja dokumentów przez MCP dla Claude i Cursor",
    description:
      "Połącz Tavnit z claude.ai lub Cursor przez MCP. Asystent może budować Flows ekstrakcji, przepuszczać przez nie dokumenty i przeszukiwać wyniki — typowane i oczyszczone.",
    ogTitle: "Serwer MCP do ekstrakcji danych z dokumentów | Tavnit",
    schemaHeadline: "Serwer MCP do ekstrakcji danych z dokumentów — Claude i Cursor",
    schemaName: "Konektor MCP",
    breadcrumbHome: "Strona główna",
    breadcrumbHub: "Integracje",
    breadcrumbSelf: "Konektor MCP",
    badge: "Model Context Protocol",
    h1: "Daj swojemu asystentowi AI prawdziwy pipeline dokumentów",
    lede:
      "Tavnit udostępnia serwer MCP. Podłącz go do claude.ai lub Cursor, a Twój asystent dostanie cały pipeline dokumentów: może budować Flows ekstrakcji, dodawać reguły czyszczenia, przepuszczać przez nie dokumenty i odczytywać wyniki — dokładnie te pola, które zdefiniowałeś, oczyszczone i typowane, a nie interpretację pliku, który mu podano.",
    ledeMore: "Konfiguracja to adres URL, który wklejasz w ustawieniach asystenta. Bez SDK, bez serwera do utrzymania, bez kodu.",
    ctaStart: "Zacznij za darmo",
    ctaSetup: "Instrukcja konfiguracji",
    problemHeading: "Dlaczego asystenci mają problem z dokumentami",
    problem: [
      "Asystenci AI świetnie rozumują, ale słabo sprawdzają się jako pipeline danych. Daj im zeskanowaną fakturę, a ją przeczytają — pewnie poprawnie, czasem nie, a za drugim razem inaczej. Nie ma schematu, więc nazwy pól zmieniają się między uruchomieniami. Nie ma walidacji, więc źle odczytana suma wygląda dokładnie jak poprawna. I nie ma zapisu tego, co się stało, a to ma znaczenie, gdy tylko wynik dotyka księgowości albo zgodności z przepisami.",
      "Na jednorazowe pytanie to wystarczy, ale jako proces się nie sprawdza. Asystent potrzebuje narzędzia, które już wie, jak czytać Twoje dokumenty.",
    ],
    compareHeading: "Wklejenie PDF-a a wywołanie Flow",
    compareCapability: "Funkcja",
    compareChat: "Wklejenie pliku na czat",
    compareMcp: "Przez konektor MCP",
    compareRows: [
      ["Kształt wyniku", "Cokolwiek model zwróci tym razem", "Pola zdefiniowane w Twoim Flow, za każdym razem"],
      ["Nazwy pól", "Zmieniają się między uruchomieniami", "Ustalone przez Twój schemat"],
      ["Reguły czyszczenia", "Brak", "Cleaners stosowane automatycznie"],
      ["Weryfikacja ręczna", "Niemożliwa", "Opcjonalna, ze ścieżką audytu"],
      ["Gdzie trafiają wyniki", "Na czat", "Buckets, webhook, e-mail lub API"],
      ["Powtarzalność przy dużej skali", "Nie", "Tak — ten sam Flow, dowolna liczba dokumentów"],
    ],
    capabilitiesHeading: "Co może Twój asystent po podłączeniu",
    capabilities: [
      {
        title: "Zbudować Flow na podstawie opisu",
        body: "Powiedz asystentowi, co ma wyciągać — dostawcę, daty, sumy, pozycje — a utworzy Flow ekstrakcji w Twojej organizacji, gotowy do uruchomienia. Konfiguracja pipeline’u staje się wiadomością na czacie, a nie popołudniem w ustawieniach.",
      },
      {
        title: "Dodać reguły czyszczenia",
        body: "Poproś o przeliczenie sum na USD, ujednolicenie dat albo dopasowanie wartości do danych referencyjnych, a asystent utworzy Cleaner i podłączy go do Flow — te same reguły będą potem działać na każdym kolejnym dokumencie, niezależnie od tego, jak dotrze.",
      },
      {
        title: "Przepuścić dokument przez Flow",
        body: "Poproś asystenta o przetworzenie faktury, umowy lub formularza przez jeden z Twoich Flows ekstrakcji. Zwróci zdefiniowane przez Ciebie pola, typowane i oczyszczone, a nie akapit, który je opisuje.",
      },
      {
        title: "Przeszukać to, co już wyciągnąłeś",
        body: "Zadawaj pytania o swoje Buckets — ile zapłaciłeś dostawcy w zeszłym kwartale, które umowy odnawiają się w przyszłym miesiącu — a odpowiedź pochodzi z Twoich aktualnych danych, a nie z pamięci modelu.",
      },
    ],
    askHeading: "O co możesz go poprosić:",
    ask: [
      "Utwórz Flow, który wyciąga dostawcę, daty, sumy i pozycje z naszych faktur za fracht.",
      "Dodaj do tego Flow Cleaner, który przelicza każdą sumę na USD.",
      "Przepuść tę fakturę przez mój Flow Faktury dostawców i pokaż mi pozycje.",
      "Ile zapłaciliśmy Acme Corp w zeszłym kwartale według mojego Bucketa Faktury?",
      "Wyciągnij daty odnowienia z tych trzech umów i porównaj je.",
      "Które przetwarzania czekają teraz na weryfikację?",
    ],
    fitsHeading: "Korzysta z pipeline’u, który już masz",
    fitsIntro:
      "Konektor nie jest osobnym silnikiem ekstrakcji. Wywołuje te same Flows co reszta Tavnit — niezależnie od tego, czy zbudowałeś je w aplikacji, czy utworzył je dla Ciebie asystent — więc każda skonfigurowana reguła obowiązuje także wtedy, gdy żądanie wysyła asystent.",
    fits: [
      "[Collections](/docs/collections) nadal klasyfikują przychodzący dokument i kierują go do właściwego Flow.",
      "[Cleaners](/docs/cleaners) nadal ujednolicają formaty, przeliczają waluty i stosują Twoje tabele referencyjne.",
      "[Weryfikacja ręczna](/docs/human-in-the-loop) nadal wstrzymuje przetwarzanie, gdy tego zażądałeś — asystent nie pominie Twojego kroku zatwierdzania.",
      "[Buckets](/docs/buckets) nadal odbierają wyniki, więc to, co wyciągnie asystent, można potem przeszukiwać.",
    ],
    scopeHeading: "Zakres i dostęp",
    scopeCards: [
      {
        title: "Twoje uprawnienia, nic ponad nie",
        body: "Konektor jest wydawany na podstawie Twojego własnego klucza API i ma dostęp tylko do organizacji, w której go wygenerowałeś. Asystent dziedziczy Twoją rolę — nie zrobi niczego, czego Ty nie możesz zrobić w aplikacji.",
      },
      {
        title: "Traktuj URL jak dane logowania",
        body: "Każdy, kto ma URL konektora, ma dostęp do Twoich Flows i Buckets. Adresy URL mają ograniczony czas ważności, a odświeżenie natychmiast unieważnia poprzedni.",
      },
    ],
    scopeMore:
      "Szczegóły znajdziesz w [dokumentacji konektora](/docs/mcp-connector) i [opisie ról użytkowników](/docs/user-roles). Endpoint serwera to `{mcpUrl}`.",
    setupHeading: "Podłączenie",
    setupBody:
      "Wygeneruj URL konektora na stronie Integracje w Tavnit, a następnie wklej go w claude.ai w Ustawienia → Konektory albo dodaj go w Cursor jako zdalny serwer MCP. Zajmuje to kilka minut i nie wymaga kodu.",
    setupLink: "Przeczytaj instrukcję konfiguracji krok po kroku",
    faqHeading: "Częste pytania",
    faqs: [
      {
        q: "Czym to się różni od wklejenia PDF-a do Claude?",
        a: "Wklejając PDF, prosisz asystenta o przeczytanie dokumentu, którego nigdy nie widział, w formacie, do którego parsowania nie został stworzony, bez schematu i bez możliwości sprawdzenia wyniku. Konektor MCP przepuszcza dokument przez zdefiniowany przez Ciebie Flow ekstrakcji, więc za każdym razem dostajesz te same nazwane pola, w tych samych typach, z tymi samymi regułami czyszczenia i tym samym krokiem weryfikacji. Asystent otrzymuje uporządkowane dane, a nie interpretację.",
      },
      {
        q: "Czy asystent może budować Flows i Cleaners, czy tylko je uruchamiać?",
        a: "Jedno i drugie. Przez konektor asystent może tworzyć Flows ekstrakcji i reguły czyszczenia tak samo jak Ty w aplikacji: opisz zwykłym językiem pola, tabele i przekształcenia, a zostaną utworzone w Twojej organizacji, gotowe do działania na każdym kolejnym dokumencie. Tworzenie zależy od Twojej roli — Właściciele i Administratorzy mogą budować, Członkowie i Obserwatorzy mogą tylko uruchamiać lub przeglądać.",
      },
      {
        q: "Którzy asystenci AI z tym współpracują?",
        a: "claude.ai w planie Pro lub wyższym, Cursor i każdy klient, który przyjmuje URL zdalnego serwera MCP. MCP to otwarty protokół, więc obsługa nie ogranicza się do jednego dostawcy.",
      },
      {
        q: "Czy muszę pisać kod?",
        a: "Nie. Generujesz URL konektora w Tavnit i wklejasz go w ustawieniach asystenta. Budowa Flow, który asystent wywołuje, też nie wymaga kodu — opisujesz pola, których potrzebujesz, a Tavnit je wyciąga.",
      },
      {
        q: "Czy asystent widzi wszystko na koncie mojej firmy?",
        a: "Nie. Konektor jest wydawany na podstawie Twojego własnego klucza API, więc ma dostęp tylko do organizacji, w której byłeś zalogowany, z uprawnieniami Twojej roli. Członek nie zmusi asystenta do zrobienia czegoś, czego Członek nie może zrobić w aplikacji, a prywatne Buckets pozostają prywatne, chyba że przyznano Ci do nich dostęp.",
      },
      {
        q: "Czy korzystanie z konektora kosztuje dodatkowo?",
        a: "Nie. Dokumenty przetwarzane przez konektor zużywają kredyty według zwykłej stawki — jeden kredyt za stronę — tak samo jak przy wgrywaniu w aplikacji czy wywoływaniu API. Za dostęp przez MCP nie ma osobnej opłaty.",
      },
      {
        q: "Co się dzieje, gdy URL konektora wygaśnie?",
        a: "Adresy URL konektora mają ograniczony czas ważności, a Tavnit pokazuje, kiedy Twój został utworzony i kiedy wygasa. Odświeżenie wydaje nowy URL i natychmiast unieważnia poprzedni, więc każdy klient, który wciąż używa starego, przestaje działać, dopóki nie wkleisz nowego.",
      },
    ],
    finalHeading: "Skieruj asystenta na prawdziwe dokumenty",
    finalBody:
      "Zbuduj Flow, wygeneruj URL konektora i zacznij zadawać pytania. Darmowe kredyty na start, bez karty płatniczej.",
    finalPricing: "Zobacz cennik",
    finalDemo: "Umów demo",
  },
};

export default pl;
