import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Polski (pl), translated from ./en.ts.
 *
 * Same structure as en.ts: `base` is one complete tool written with document
 * tokens, `tools` supplies each tool's words and only the strings that differ.
 *
 * Polish declines nouns, so the vocab keys are used as GRAMMATICAL CASES, not
 * as their English meaning (the key names are fixed by the type):
 *   doc           mianownik lp.        „faktura”
 *   docs          mianownik/biernik lm. „faktury”
 *   a_doc         biernik lp.          „fakturę”
 *   the_doc       dopełniacz lp.       „faktury”
 *   the_docs      dopełniacz lm.       „faktur”
 *   your_doc      mianownik lp. + zaimek „twoja faktura”
 *   your_docs     biernik lm. + zaimek  „swoje faktury”
 *   all_your_docs biernik lm.          „wszystkie swoje faktury”
 *   all_docs      dopełniacz lm.       „wszystkich faktur”
 *   each_doc      dopełniacz lp.       „każdej faktury”
 *   another_doc   biernik lp.          „inną fakturę”
 *   this_doc      biernik lp.          „tę fakturę”
 * Base strings avoid gendered words (adjectives, past tenses, pronouns) next
 * to a token, so they read correctly for feminine and masculine words alike.
 */

const INVOICE_VOCAB = {
  doc: "faktura",
  docs: "faktury",
  a_doc: "fakturę",
  the_doc: "faktury",
  the_docs: "faktur",
  your_doc: "twoja faktura",
  your_docs: "swoje faktury",
  all_your_docs: "wszystkie swoje faktury",
  all_docs: "wszystkich faktur",
  each_doc: "każdej faktury",
  another_doc: "inną fakturę",
  this_doc: "tę fakturę",
};

const SPREADSHEET_VOCAB = {
  doc: "arkusz",
  docs: "arkusze",
  a_doc: "arkusz",
  the_doc: "arkusza",
  the_docs: "arkuszy",
  your_doc: "twój arkusz",
  your_docs: "swoje arkusze",
  all_your_docs: "wszystkie swoje arkusze",
  all_docs: "wszystkich arkuszy",
  each_doc: "każdego arkusza",
  another_doc: "inny arkusz",
  this_doc: "ten arkusz",
};

const pl: LiteLocaleCopy = {
  base: {
    title: "{Doc} do Excela za darmo: AI wyciąga pozycje z każdego dokumentu",
    description:
      "Wgraj {a_doc} jako PDF lub zdjęcie i dostań pozycje w tabeli Excel: opis, ilość, cenę jednostkową i wartość. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
    label: "{Doc} do Excela",
    h1: "Zamień {a_doc} w plik Excel",
    intro:
      "Wgraj PDF lub zdjęcie. Tavnit odczyta nagłówek i każdy wiersz tabeli, a potem odda ci wszystko jako arkusz kalkulacyjny. Bez szablonów dla każdego dostawcy: to samo narzędzie obsłuży {all_your_docs}.",
    trust: ["PDF, JPG lub PNG · do 5 stron", "{limit} darmowych dokumentów dziennie", "Wszystko usuwamy po 24 h"],
    drop: {
      title: "Przeciągnij tutaj {a_doc}",
      hint: "albo wybierz plik z komputera",
      choose: "Wybierz plik",
      sample: "Wypróbuj na przykładowym dokumencie",
      formats: "PDF, JPG lub PNG · do 4 MB i 5 stron",
    },
    stages: [
      "Wgrywamy dokument",
      "Czytamy nagłówek",
      "Szukamy tabeli pozycji",
      "Porządkujemy kolumny",
      "Prawie gotowe",
    ],
    result: {
      heading: "Gotowe: {file}",
      rowWord: ["wiersz", "wierszy"],
      pageWord: ["strona", "str."],
      summary: "{rows} · {pages}",
      truncated: "Widzisz {shown} z {total} wierszy. Excel zawiera te same {shown}.",
      readyIn: "gotowe w {s} s",
      sum: "Suma",
      viewer: "Twój dokument",
      openDocument: "Zobacz dokument",
      closeDocument: "Zamknij",
      retention: "usunie się sam po 24 h",
      hideColumn: "Usuń kolumnę",
      hiddenCols: ["Usunięto 1 kolumnę. Excel jej nie zawiera.", "Usunięte kolumny: {n}. Excel ich nie zawiera."],
      restoreAll: "Przywróć wszystkie",
      restoreOne: "Przywróć {col}",
      ghostColumn: "+ Twoje pole",
      ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: numer zamówienia, termin płatności, centrum kosztów…",
      flowNote: "Te kolumny ({fields}) to pola stałego Flow dla {the_docs}. Na swoim koncie to ty wybierasz pola.",
      flowNoteCta: "Zobacz jak",
      download: "Pobierz Excel",
      downloading: "Przygotowujemy plik",
      another: "Przetwórz {another_doc}",
      empty: "Nie znaleźliśmy w tym dokumencie tabeli pozycji. Wypróbuj {a_doc} z ilościami i cenami w każdym wierszu.",
    },
    errors: {
      empty: "Plik jest pusty.",
      too_large: "Plik ma ponad 4 MB. Skompresuj go albo wgraj tylko strony {the_doc}.",
      unsupported: "Przyjmujemy tylko pliki PDF, JPG lub PNG.",
      unreadable: "Nie udało się otworzyć tego PDF-a. Jeśli jest chroniony hasłem, usuń hasło i spróbuj ponownie.",
      too_many_pages: "Darmowa wersja przetwarza do 5 stron na dokument.",
      captcha: "Nie udało się potwierdzić, że nie jesteś botem. Odśwież stronę i spróbuj ponownie.",
      quota: "Dzisiejszy limit {limit} darmowych dokumentów jest już wykorzystany. Odnowi się jutro, a jeśli chcesz działać dalej, załóż konto.",
      daily_cap: "Darmowe narzędzie wyczerpało na dziś swoją przepustowość. Wróć jutro albo załóż konto i kontynuuj od razu.",
      unavailable: "Narzędzie jest teraz niedostępne. Spróbuj ponownie za kilka minut.",
      backend: "Coś poszło nie tak podczas przetwarzania dokumentu. Spróbuj ponownie.",
      failed: "Nie udało się wyciągnąć danych z tego dokumentu. Wypróbuj {another_doc} albo przykład.",
      timeout: "Trwa to dłużej niż zwykle. Odczekaj chwilę i spróbuj ponownie.",
      forbidden: "Ta akcja nie jest stąd dozwolona.",
      bad_request: "Brakuje pliku albo nie dało się go odczytać.",
    },
    auth: {
      title: "Załóż darmowe konto, żeby pobrać",
      body: "Excel pobierze się od razu. Z kontem możesz też w ten sposób przetworzyć {all_your_docs} za jednym zamachem.",
      google: "Kontynuuj z Google",
      or: "albo przez e-mail",
      signin: "Zaloguj się",
      signup: "Załóż konto",
      name: "Imię",
      email: "E-mail",
      password: "Hasło",
      submitSignin: "Zaloguj się i pobierz",
      submitSignup: "Załóż konto i pobierz",
      switchToSignin: "Mam już konto",
      switchToSignup: "Nie mam jeszcze konta",
      checkEmail:
        "Wysłaliśmy ci e-mail z potwierdzeniem konta. Otwórz go, a gdy tu wrócisz, Excel będzie gotowy do pobrania.",
      existing: "Ten adres e-mail ma już konto. Zaloguj się, żeby pobrać.",
      forgot: "Nie pamiętam hasła",
      close: "Zamknij",
      generic: "Nie udało się dokończyć rejestracji. Sprawdź e-mail i hasło, a potem spróbuj ponownie.",
    },
    next: {
      heading: "I co dalej?",
      lead: "To był jeden dokument. Z kontem to samo dzieje się w przypadku {each_doc}, a pozycje nie kończą drogi w Excelu: płyną dalej same.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Flow ekstrakcji",
      items: [
        {
          short: "Trafia do skrzynki",
          via: "e-mail",
          title: "Wynik ląduje w twojej skrzynce",
          body: "Gdy ekstrakcja się skończy, Tavnit wysyła e-mail na adresy ustawione we Flow, z wierszami w załączniku rows.csv. Przy włączonej weryfikacji e-mail czeka na zatwierdzenie.",
          linkLabel: "Wysyłka e-mailem",
          href: "/docs/email-integration",
          scene: [{ label: "Ekstrakcja się kończy" }, { label: "Tavnit przygotowuje e-mail" }, { label: "Trafia do wybranych osób", result: "rows.csv w załączniku" }],
        },
        {
          short: "Trafia do ERP",
          via: "webhook",
          title: "Trafia do twojego ERP przez webhook",
          body: "Gdy przebieg się zakończy, Tavnit wysyła POST z wierszami i run_id na podany przez ciebie URL. Zapier, Make i n8n odbierają go swoim wyzwalaczem webhook; żadna natywna integracja nie jest potrzebna.",
          linkLabel: "Webhooki",
          href: "/docs/webhooks",
          scene: [{ label: "Wyciągnięte wiersze" }, { label: "Jeden POST z wierszami i run_id" }, { label: "Pojawiają się w twoim systemie", result: "6 pozycji, nikt nic nie przepisywał" }],
        },
        {
          short: "Weryfikacja przed księgowaniem",
          via: "weryfikacja",
          title: "Człowiek zatwierdza, zanim dane pójdą dalej",
          body: "Włącz weryfikację we Flow, a każdy przebieg się zatrzyma. Weryfikujący widzi edytowalną tabelę obok oryginalnego dokumentu: poprawia komórki, wyklucza wiersze, dodaje kolumny, a potem zatwierdza albo odrzuca. Dopiero po zatwierdzeniu wychodzą e-mail, webhook i zapis do Bucketa; każda decyzja zostaje w historii. Jest też rola tylko do weryfikacji, dla osób, które nie powinny widzieć niczego więcej.",
          linkLabel: "Weryfikacja ręczna",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "Przebieg czeka na weryfikację" }, { label: "Człowiek poprawia dane obok dokumentu" }, { label: "Zatwierdzone: dopiero wtedy wysłane", result: "1 poprawiona komórka · w historii" }],
        },
        {
          short: "Porównanie ofert",
          via: "Matcher",
          title: "Porównaj kilka ofert pozycja po pozycji",
          body: "Matcher bierze kilka przebiegów tego samego Flow, na przykład trzy oferty dostawców, paruje pozycje po opisie i w kolumnie Champion oznacza najtańszą ofertę dla każdej pozycji.",
          linkLabel: "Oferty dostawców",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Trzy oferty, jeden Flow" }, { label: "Matcher paruje pozycje" }, { label: "Kolumna Champion: najlepsza na pozycję", result: "Dostawca B wygrywa 4 z 5" }],
        },
        {
          short: "Reguły i walidacje",
          via: "Cleaner",
          title: "Cleaner czyści i sprawdza każdy wiersz",
          body: "Format daty, format liczb, pola wyliczane, przeliczanie walut po publikowanych kursach i akcje warunkowe: gdy pozycja nie przejdzie kontroli, wyślij ją do weryfikacji, e-mailem albo webhookiem.",
          linkLabel: "Cleanery",
          href: "/docs/cleaners",
          scene: [{ label: "Dane w takiej postaci, w jakiej przyszły" }, { label: "Cleaner stosuje twoje reguły" }, { label: "Czyste, z oznaczonymi błędami", result: "data, liczba i suma w porządku" }],
        },
        {
          short: "Agent otwiera portal",
          via: "Agent",
          title: "Agent loguje się do portalu dostawcy",
          body: "Opisujesz zadanie zwykłymi słowami, podajesz startowy URL i dane logowania w sejfie, którego model nigdy nie widzi. Gdy ekstrakcja się skończy, Agent rusza sam z polami dokumentu i przynosi to, o co poprosisz, w uporządkowanej formie: cenę, czas dostawy, pliki.",
          linkLabel: "Agenci",
          href: "/docs/agents",
          scene: [{ label: "Ekstrakcja się kończy" }, { label: "Agent przegląda portal" }, { label: "Przynosi dane w uporządkowanej formie", result: "cena 18,50 · dostawa 5 dni" }],
        },
        {
          short: "Pytania o twoje dane",
          via: "Bucket",
          title: "Zadawaj pytania o {your_docs}",
          body: "Wiersze trafiają do Bucketa. Pytasz zwykłym językiem; Tavnit zamienia pytanie w plan (suma, filtr, miesiąc), wykonuje go na bazie danych i odpowiada liczbą. Model nigdy sam nie liczy.",
          linkLabel: "Buckety",
          href: "/docs/buckets",
          scene: [{ label: "„Ile kupiliśmy od Istmo w sierpniu?”" }, { label: "Plan: suma · dostawca · miesiąc" }, { label: "Liczba policzona w bazie danych", result: "12 480 USD · 4 {docs}" }],
        },
      ],
      hint: "Kliknij opcję albo chip Tavnit, żeby zobaczyć, co się dzieje.",
      flow: {
        title: "Flow: to ty decydujesz o kolumnach",
        body: "Flow to definicja jednego typu dokumentu: lista pól, które chcesz wyciągnąć, każde z nazwą, typem danych i informacją, czy występuje raz na dokument, czy raz na pozycję, a w razie potrzeby ze wskazówką, gdzie szukać. Włącz go, a każdy dokument, który przyjdzie, zostanie odczytany dokładnie pod kątem tych pól; tabela na wyjściu ma jedną kolumnę na każde pole. To narzędzie używa stałego Flow dla {the_docs} z {fields} polami. Na swoim koncie dodajesz, usuwasz i zmieniasz nazwy pól oraz tworzysz Flow dla każdego innego dokumentu. Bez szablonów i bez współrzędnych.",
        linkLabel: "Jak definiuje się Flow",
        href: "/docs/flows",
        scene: [{ label: "Definiujesz pola w dwóch grupach: dokument i tabela" }, { label: "Nagłówek czyta raz, a tabelę wiersz po wierszu" }, { label: "Wiersz na pozycję: wartości dokumentu się powtarzają, wartości tabeli zmieniają", result: "5 pól → 5 kolumn" }],
        name: "{Doc}",
        kinds: ["Pola dokumentu", "Pola tabeli"],
        add: { name: "purchase_order", type: "Tekst", hint: "Obok „PO” lub „Zamówienie” · np. PO-2291", save: "Zapisz", value: "PO-2291" },
        activate: "Aktywny",
      },
      inputs: {
        show: "Jak {your_doc} trafia do Tavnit?",
        hide: "Ukryj źródła",
        items: [
          {
            short: "E-mailem",
            via: "jeden adres na Flow",
            title: "Przekaż e-mail i gotowe",
            body: "Każdy Flow ma własny adres, np. lite-<id>@mg.tavnit.io. Przekaż wiadomość, w której załączniku jest {doc}, a każdy załącznik stanie się osobnym przebiegiem. Temat i treść wiadomości nie są czytane.",
            linkLabel: "Przyjmowanie e-maili",
            href: "/docs/email-integration",
            scene: [{ label: "Przekazujesz e-mail z załącznikiem" }, { label: "Trafia na adres Flow" }, { label: "Każdy załącznik to przebieg", result: "1 załącznik → 1 przebieg" }],
          },
          {
            short: "Ręczne wgranie",
            via: "z aplikacji",
            title: "Wgraj plik w aplikacji",
            body: "Upuść PDF lub zdjęcie na Flow, a przebieg ruszy od razu. Tak samo jak tutaj, tylko na twoim koncie i bez dziennego limitu.",
            linkLabel: "Flow",
            href: "/docs/flows",
            scene: [{ label: "Upuszczasz plik na Flow" }, { label: "Przebieg rusza" }, { label: "Wiersze w kilka sekund", result: "jak tutaj, bez limitu" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Z twojego systemu, przez API",
            body: "Jeden POST na /api/runs/process z plikiem i flow_id, z twoim kluczem API. Odpowiedź to 202 z run_id; odpytujesz GET /api/runs/<id>, aż przebieg będzie completed i wrócą wiersze.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST z plikiem i flow_id" }, { label: "202: run_id, w kolejce" }, { label: "GET aż do completed", result: "status: completed · 6 wierszy" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "jedno wywołanie HTTP",
            title: "Z Zapiera, Make lub n8n",
            body: "Nie ma natywnej aplikacji i nie jest potrzebna: krok HTTP (Custom Request w Zapierze, Make a request w Make) wysyła plik na /api/runs/process. Wiersze wracają webhookiem do wyzwalacza tego samego narzędzia.",
            linkLabel: "Integracje",
            href: "/integrations",
            scene: [{ label: "Krok HTTP w twoim scenariuszu" }, { label: "Tavnit przetwarza plik" }, { label: "Webhook zwraca wiersze", result: "z powrotem w Zapierze, Make lub n8n" }],
          },
          {
            short: "Kilka w jednym PDF",
            via: "Splitter je rozdziela",
            title: "Kilka dokumentów w jednym PDF",
            body: "Splitter znajduje początek każdego dokumentu, klasyfikuje każdy fragment według opisanych przez ciebie typów i wysyła go do właściwego Flow. Jeden skan, a w nim trzy {docs}, daje trzy przebiegi.",
            linkLabel: "Splittery",
            href: "/docs/splitters",
            scene: [{ label: "Jeden PDF, w nim trzy {docs}" }, { label: "Splitter tnie i klasyfikuje" }, { label: "Trzy przebiegi, po jednym na dokument", result: "3 fragmenty · 3 przebiegi" }],
          },
        ],
      },
      replay: "Odtwórz ponownie",
      tryIt: "Wypróbuj to w Tavnit",
      tryItSignedIn: "Zrób to na moim koncie",
      primary: "Załóż darmowe konto",
      primarySignedIn: "Przejdź do Tavnit",
      sameLogin: "Masz już konto. Zaloguj się do Tavnit tymi samymi danymi ({email}); poprosimy o to jeszcze raz, bo to inna witryna.",
      secondary: "Umów demo",
    },
    cleaners: {
      heading: "Z Cleanerem możesz…",
      lead: "Proste reguły, które działają same dla {each_doc} po ekstrakcji. Cztery pomysły na twoich własnych danych:",
      tag: "Cleanery",
      ideas: [
        { icon: "date", title: "Jeden zapis daty", from: "{date}", to: "{iso}", note: "ten sam format dla {each_doc}" },
        { icon: "sum", title: "Pozycje muszą dać sumę częściową", from: "pozycje {sum}", to: "suma częściowa {subtotal}", note: "jeśli się nie zgadza, nikt nie zapłaci w ciemno", check: "sum" },
        { icon: "money", title: "Przelicz na swoją walutę", from: "{total} {currency}", to: "twoja waluta", note: "po kursie z dnia {the_doc}" },
        { icon: "approve", title: "Zatwierdzanie powyżej kwoty", from: "suma {total}", to: "zatwierdź przed zapłatą", note: "gdy przekracza {threshold}" },
      ],
      ok: "Zgadza się",
      off: "Do weryfikacji",
      outro: "Cleanery buduje się w Tavnit na polach, które są dla ciebie ważne. To tylko przykłady.",
      cta: "Załóż darmowe konto i wypróbuj je",
      ctaSignedIn: "Otwórz Tavnit i wypróbuj je",
      learn: "Czym jest Cleaner",
    },
    after: {
      title: "Twój Excel jest gotowy",
      lead: "Powstał ze stałego Flow z {fields} polami. Na swoim koncie to ty wybierasz pola, a tak wygląda praca Tavnit w przypadku {each_doc}:",
      close: "Zamknij",
      saved: "zapisano w pobranych plikach",
    },
    how: {
      heading: "Jak to działa",
      steps: [
        {
          title: "Wgraj {a_doc}",
          body: "PDF, zdjęcie lub skan. Dowolny dostawca, dowolny język, dowolny układ.",
        },
        {
          title: "Tavnit czyta dokument",
          body: "Znajduje nagłówek (dostawca, numer, data, sumy) i tabelę pozycji z ilościami i cenami.",
        },
        {
          title: "Sprawdź i pobierz",
          body: "Tabela pojawia się na ekranie. Z darmowym kontem zabierasz ją jako Excel.",
        },
      ],
    },
    faqHeading: "Najczęstsze pytania",
    faqs: [
      {
        q: "Co obejmuje darmowa wersja?",
        a: "{limit} dokumentów dziennie, z pełnym wynikiem na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
      },
      {
        q: "Jakie formaty są obsługiwane?",
        a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron. Jeśli {your_doc} ma więcej stron, wgraj dokument w częściach albo załóż konto.",
      },
      {
        q: "Czy mogę wybrać inne kolumny?",
        a: "Nie tutaj: to narzędzie używa stałego Flow dla {the_docs} z 13 polami. Na swoim koncie tworzysz własne Flow, dla {the_docs} albo dowolnych innych dokumentów, z polami, których potrzebujesz: na poziomie dokumentu (numer zamówienia, termin płatności, centrum kosztów) albo pozycji (kod produktu, rabat). Bez szablonów: opisujesz pole i w razie potrzeby podpowiadasz, gdzie go szukać.",
      },
      {
        q: "Czy muszę ustawiać szablon dla każdego dostawcy?",
        a: "Nie. Tavnit nie używa szablonów: czyta każdy dokument tak, jak przychodzi, nawet jeśli dostawca jutro zmieni układ swoich {the_docs}.",
      },
      {
        q: "Co dzieje się z moim plikiem?",
        a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach plik i wyciągnięte wiersze usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez dokumentu i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
      },
      {
        q: "Dlaczego pobranie wymaga konta?",
        a: "Bo darmowa wersja służy do wypróbowania. Z kontem możesz tak samo przetworzyć {all_your_docs}, dostawać wyniki e-mailem i wysyłać je do swojego systemu.",
      },
      {
        q: "Czy działa dla {the_docs} z dowolnego kraju?",
        a: "Tak. Obsługuje {docs} po angielsku, hiszpańsku i w innych językach, z wyszczególnionym podatkiem lub bez. Testowaliśmy je m.in. na dokumentach z USA, Panamy, Meksyku i Kolumbii.",
      },
      {
        q: "Jak to zautomatyzować?",
        a: "Załóż konto, zbuduj Flow z wybranymi polami i przekazuj {docs} na jego adres e-mail albo podłącz go przez API, webhooki, Zapier, Make lub n8n. Wynik trafia do twojego ERP lub Google Sheets i nikt niczego nie przepisuje.",
      },
    ],
  },

  hub: {
    title: "Darmowe narzędzia AI do dokumentów: faktura do Excela i więcej",
    description:
      "Darmowe narzędzia do jednego zadania, zbudowane na silniku Tavnit: zamień fakturę w Excel i nie tylko. Bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
    h1: "Darmowe narzędzia",
    intro:
      "Każde narzędzie robi jedną rzecz z jednym dokumentem i pokazuje prawdziwy wynik. Działają na tym samym silniku, którego firmy używają, żeby automatyzować dokumenty w Tavnit, tylko tutaj po jednym naraz.",
    breadcrumbHome: "Strona główna",
    breadcrumbHub: "Narzędzia",
    groups: { extract: "Dokument do Excela", compare: "Porównywanie dokumentów", split: "Porządkowanie skanów", clean: "Czyszczenie arkuszy" },
    outro: "Wszystkie działają na tym samym silniku, którego firmy używają, żeby automatyzować dokumenty w Tavnit. Gdy chcesz, żeby działo się to samo, dla wszystkich twoich dokumentów, masz do tego konto.",
    outroCta: "Załóż darmowe konto",
  },

  shell: {
    lite: "Lite",
    tools: "Narzędzia",
    site: "O Tavnit",
    cta: "Załóż darmowe konto",
    ctaSignedIn: "Przejdź do Tavnit",
    nav: { product: "Produkt", useCases: "Zastosowania", docs: "Dokumentacja" },
    demo: "Umów demo",
    signin: "Zaloguj się",
    allTools: "Zobacz wszystkie narzędzia",
    allToolsHint: "Za darmo. Zobacz prawdziwy wynik bez rejestracji, a z kontem zabierz go ze sobą.",
    groups: { extract: "Dokument do Excela", compare: "Porównywanie dokumentów", split: "Porządkowanie skanów", clean: "Czyszczenie arkuszy" },
    account: {
      signedInAs: "Zalogowano jako",
      open: "Przejdź do Tavnit",
      openHint: "Pełna platforma: Flow, automatyzacje i cały twój wolumen",
      signOut: "Wyloguj się",
      menu: "Twoje konto",
    },
    auth: {
      title: "Załóż darmowe konto",
      body: "To samo konto pobiera tutaj twoje wyniki i automatyzuje wszystkie twoje dokumenty w Tavnit.",
      submitSignin: "Zaloguj się",
      submitSignup: "Załóż konto",
    },
    menu: "Menu",
    close: "Zamknij",
    privacy: "Prywatność",
    terms: "Regulamin",
    contact: "Kontakt",
    rights: "Tavnit. Darmowe narzędzia zbudowane na silniku produktu.",
  },

  related: {
    heading: "Gdy chodzi o każdy dokument, a nie jeden",
    lead: "To narzędzie przetwarza jeden dokument naraz. Ten sam silnik może przyjmować je e-mailem lub przez API, przepuszczać przez weryfikację twojego zespołu i dostarczać do twoich systemów.",
    useCase: "Jak to zautomatyzować:",
    guide: "Poradnik:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Faktura do Excela za darmo: AI odczyta pozycje" },
    },
    /** Invoice line item extractor: same Flow and words as invoice → Excel. */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Darmowy ekstraktor pozycji z faktur: wiersze do Excela",
        description:
          "Wyciągnij pozycje z faktury (opis, ilość, cenę jednostkową i wartość) jako wiersze Excela, z dostawcą, numerem i datą w każdym wierszu. PDF lub zdjęcie, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Ekstraktor pozycji z faktur",
        h1: "Wyciągnij pozycje z faktury",
        intro:
          "Każdy wiersz tabeli faktury (opis, ilość, jednostka, cena jednostkowa i wartość) staje się osobnym wierszem, a nagłówek (dostawca, numer, data, sumy) powtarza się w każdym z nich. Właśnie w takiej postaci księgowość i dział zobowiązań potrzebują pozycji, żeby je zaksięgować, uzgodnić albo porównać z zamówieniem. Działa na PDF-ach, skanach i zdjęciach, bez szablonów dla każdego dostawcy.",
        drop: {
          title: "Przeciągnij fakturę, z której potrzebujesz pozycji",
          sample: "Wypróbuj na fakturze z sześcioma pozycjami",
        },
        stages: [
          "Wgrywamy fakturę",
          "Czytamy nagłówek",
          "Wykrywamy tabelę pozycji",
          "Rozdzielamy wiersze",
          "Prawie gotowe",
        ],
        result: {
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla faktur: nagłówek i pozycje. Na swoim koncie to ty wybierasz pola.",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            {
              title: "Wgraj fakturę",
              body: "PDF tekstowy, skan lub zdjęcie. Jedna strona albo kilka, maksymalnie 5.",
            },
            {
              title: "Tavnit rozdziela pozycje",
              body: "Znajduje tabelę nawet bez linii obramowania, czyta każdy wiersz (opis, ilość, jednostka, cena, wartość) i dołącza do niego nagłówek.",
            },
            {
              title: "Sprawdź i pobierz",
              body: "Na ekranie widzisz jeden wiersz na pozycję. Z darmowym kontem zabierasz wynik jako Excel, bez kolumn, których nie potrzebujesz.",
            },
          ],
        },
        faqs: [
          {
            q: "Czym jest pozycja faktury?",
            a: "To każdy wiersz tabeli szczegółów: jeden produkt lub usługa z opisem, ilością, jednostką, ceną jednostkową i wartością. Sumy w stopce (suma częściowa, podatek, razem) nie są pozycjami; trafiają do pól nagłówka powtarzanych w każdym wierszu.",
          },
          {
            q: "Dlaczego dostawca i numer są w każdym wierszu?",
            a: "Żeby każdy wiersz był samodzielny: możesz filtrować, sumować albo wkleić pozycje z wielu faktur do jednego arkusza i nie stracić informacji, z której faktury pochodzą. Właśnie takiego kształtu oczekuje ERP, tabela przestawna czy uzgodnienie.",
          },
          {
            q: "Czy działa, gdy tabela zajmuje kilka stron?",
            a: "Tak. Tavnit śledzi tabelę z jednej strony na drugą i zwraca wszystkie pozycje po kolei, nie traktując powtórzonego nagłówka kolumn jak wiersza. Darmowa wersja obsługuje do 5 stron.",
          },
          {
            q: "A zawinięte opisy albo scalone komórki?",
            a: "Opis, który ciągnie się w następnym wierszu, zostaje dołączony do swojej pozycji; scalona komórka trafia do wszystkich pozycji, które obejmuje. Nie opieramy się na liniach tabeli, tylko na tym, która ilość, cena i wartość należą do którego opisu.",
          },
          {
            q: "Jak traktowane są rabaty i podatki na pozycjach?",
            a: "Wartość każdej pozycji wychodzi tak, jak jest wydrukowana. Rabat lub podatek, który faktura pokazuje w osobnym wierszu, nie staje się pozycją; traktujemy go jak sumę dokumentu. Jeśli twoje faktury wykazują podatek przy każdej pozycji, na koncie dodasz to pole do Flow.",
          },
          {
            q: "Czy mogę porównać pozycje z moim zamówieniem?",
            a: "Tak, darmowym narzędziem do porównania zamówienia z fakturą (/tools/po-vs-invoice-check): wgraj oba dokumenty, a ono oznaczy pozycje z inną ceną lub ilością, pozycje brakujące i pozycje dodane.",
          },
          {
            q: "Czy potrzebuję szablonu dla każdego dostawcy?",
            a: "Nie. Tavnit czyta każdą fakturę tak, jak przychodzi; jeśli dostawca jutro zmieni jej wygląd, wszystko dalej działa. Dlatego równie dobrze radzi sobie z fakturami z różnych krajów i w różnych językach.",
          },
          {
            q: "Jak zrobić to dla setek faktur?",
            a: "Z kontem tworzysz Flow z tymi samymi polami (albo własnymi) i przekazujesz faktury na jego adres e-mail albo wysyłasz je przez API. Każda faktura trafia jako wiersze do twojego ERP, Google Sheets albo Bucketa i nikt niczego nie przepisuje.",
          },
        ],
      },
    },
    /** PO vs invoice check: two documents, one purchase-document Flow, a Matcher. */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Darmowe porównanie zamówienia z fakturą, pozycja po pozycji",
        description:
          "Wgraj zamówienie zakupu i fakturę, a Tavnit porówna je pozycja po pozycji: różnice cen, różnice ilości, pozycje brakujące na fakturze i pozycje spoza zamówienia. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Zamówienie a faktura",
        h1: "Sprawdź fakturę z zamówieniem zakupu",
        intro:
          "Wgraj zamówienie zakupu i fakturę jako PDF lub zdjęcie. Tavnit czyta oba dokumenty, paruje każdą pozycję zamówienia z pozycją faktury, która oznacza to samo, nawet gdy tekst się różni, i pokazuje, gdzie zmieniła się cena, gdzie ilość, czego brakuje na fakturze i czego nigdy nie było w zamówieniu.",
        trust: ["Zamówienie i faktura · PDF lub zdjęcie", "{limit} darmowych dokumentów dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj dokument",
          sample: "Wypróbuj na przykładowym zamówieniu i fakturze",
          formats: "PDF, JPG lub PNG · do 4 MB i 5 stron na dokument",
        },
        stages: ["Wgrywamy dokumenty", "Czytamy zamówienie zakupu", "Czytamy fakturę", "Parujemy pozycje", "Prawie gotowe"],
        result: {
          another: "Porównaj inne dokumenty",
          download: "Pobierz porównanie jako Excel",
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla dokumentów zakupowych. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: centrum kosztów, numer przyjęcia, projekt…",
        },
        errors: {
          no_lines: "W jednym z dwóch dokumentów nie znaleźliśmy pozycji z ilościami i cenami. Sprawdź, czy to zamówienie zakupu i faktura z tabelą pozycji.",
          not_ready: "Wciąż czytamy dokumenty. Odczekaj chwilę i spróbuj ponownie.",
          failed: "Nie udało się odczytać jednego z dokumentów. Wypróbuj inne pliki albo przykłady.",
          too_large: "Jeden z plików ma ponad 4 MB. Skompresuj go albo wgraj tylko strony dokumentu.",
        },
        next: {
          lead: "To było jedno zamówienie i jedna faktura. Z kontem każda przychodząca faktura jest sama sprawdzana z zamówieniem, a wynik nie kończy drogi w Excelu: płynie dalej.",
          source: "Twoje zamówienie i faktura",
          flow: {
            name: "Dokument zakupowy",
            add: { name: "receipt_number", type: "Tekst", hint: "Obok „Przyjęcie” · np. REC-1187", save: "Zapisz", value: "REC-1187" },
          },
          inputs: { show: "Jak twoje dokumenty trafiają do Tavnit?" },
        },
        cleaners: {
          heading: "Z Cleanerem możesz…",
          lead: "Proste reguły, które działają same przy każdym porównaniu. Cztery pomysły:",
          ideas: [
            { icon: "alert", title: "Zablokuj fakturę, gdy cena wzrośnie o ponad 2%", from: "cena w zamówieniu 22,40", to: "na fakturze 23,90", note: "różnica jest oznaczona, zanim ktokolwiek ją zapłaci" },
            { icon: "approve", title: "Zatwierdzenie, gdy ilość się różni", from: "zamówienie: 300 szt.", to: "faktura: 280", note: "zakupy potwierdzają dostawę częściową albo błąd" },
            { icon: "mail", title: "E-mail do zakupów z różnicami", from: "porównanie gotowe", to: "e-mail na zakupy@", note: "tylko gdy jest co sprawdzić" },
            { icon: "sum", title: "Suma faktury a suma zamówienia", from: "zamówienie 5 189,07", to: "faktura 4 960,63", note: "jeśli się nie zgadza, faktura staje przed zaksięgowaniem" },
          ],
          outro: "Cleanery buduje się w Tavnit na polach, które są dla ciebie ważne. To tylko przykłady.",
        },
        after: {
          lead: "Powstał ze stałego Flow z {fields} polami i Matchera. Na swoim koncie to ty wybierasz pola, a tak to wygląda, gdy Tavnit sprawdza każdą przychodzącą fakturę:",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj oba dokumenty", body: "Zamówienie zakupu i fakturę, jako PDF lub zdjęcie. Dowolny dostawca, dowolny język, dowolny układ." },
            { title: "Tavnit czyta oba jednym Flow", body: "Nagłówek (numer, data, dostawca, sumy) i każdą pozycję z ilością i ceną, w obu dokumentach." },
            { title: "Matcher paruje pozycje", body: "Każda pozycja zamówienia zostaje połączona z pozycją faktury, która oznacza to samo, a cena i ilość są porównywane. Z kontem zabierasz porównanie jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} dokumentów dziennie (jedno porównanie zużywa dwa), z pełnym wynikiem na ekranie. Pobranie porównania jako Excel wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Jak paruje pozycje, gdy tekst nie jest identyczny?",
            a: "Matcher w Tavnit porównuje opisy po znaczeniu, a nie litera po literze: „Ryż długoziarnisty 20 lb” i „RYŻ D/ZIARN. PREMIUM 20LB” to ta sama pozycja. Gdy dwa opisy są bliskie, ale niejednoznaczne, drugi krok rozstrzyga, czy chodzi o ten sam towar.",
          },
          {
            q: "Jaką tolerancję stosuje dla cen?",
            a: "Cena jest oznaczana jako inna, gdy różni się o ponad 0,5% lub o więcej niż jeden cent. Ilości porównujemy dokładnie. Na swoim koncie ustawiasz własną tolerancję Cleanerem.",
          },
          {
            q: "Co znaczą „Brak na fakturze” i „Spoza zamówienia”?",
            a: "„Brak na fakturze” to pozycja zamówienia, której dostawca nie zafakturował (dostawa częściowa lub w toku). „Spoza zamówienia” to zafakturowana pozycja, której nikt nie zamówił w tym zamówieniu.",
          },
          {
            q: "Czy mogę porównać też przyjęcie towaru (three-way match)?",
            a: "Nie tutaj: darmowa wersja porównuje dwa dokumenty. Na swoim koncie dodajesz przyjęcie towaru jako trzeci dokument tego samego Flow, a Matcher sprawdza wszystkie trzy. Możesz też zbudować reguły Cleanera, żeby faktura nie została zaksięgowana, dopóki przyjęcie się nie zgadza.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron na dokument. Działa z zamówieniami z ERP i fakturami od dowolnego dostawcy.",
          },
          {
            q: "Co dzieje się z moimi plikami?",
            a: "Są przetwarzane na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służą. Po 24 godzinach pliki i porównanie usuwają się same; zachowujemy tylko informację, że przebieg się odbył, bez dokumentów i ich treści.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Flow dla swoich dokumentów zakupowych i Matcher na jego podstawie. Faktury przychodzą e-mailem lub przez API, są parowane z zamówieniem, a różnice wychodzą e-mailem, webhookiem albo trafiają do twojego ERP i nikt niczego nie przepisuje.",
          },
        ],
        compare: {
          slots: [
            { title: "Zamówienie zakupu", hint: "PDF lub zdjęcie zamówienia", sample: "Przykładowe zamówienie" },
            { title: "Faktura", hint: "PDF lub zdjęcie faktury", sample: "Przykładowa faktura" },
          ],
          run: "Porównaj",
          sampleAll: "Wypróbuj na przykładowym zamówieniu i fakturze",
          stages: ["Czytamy zamówienie i fakturę", "Porządkujemy pozycje", "Matcher paruje pozycje", "Prawie gotowe"],
          heading: "Porównanie gotowe",
          summary: "{n} · {ref} vs {doc}",
          labels: {
            description: "Opis",
            quantity: "Ilość",
            price: "Cena",
            total: "Wartość",
            status: "Status",
            ref: "Zam.",
            doc: "Faktura",
            supplier: "Dostawca",
            champion: "Champion",
            wins: "wygrane pozycje: {n}",
            lines: ["pozycja", "poz."],
          },
          status: {
            ok: "Zgadza się",
            price: "Inna cena",
            qty: "Inna ilość",
            both: "Inna cena i ilość",
            missing: "Brak na fakturze",
            extra: "Spoza zamówienia",
          },
          empty: "Nie udało się sparować żadnej pozycji. Sprawdź, czy oba dokumenty mają tabelę pozycji z ilościami i cenami.",
          another: "Porównaj inne dokumenty",
          download: "Pobierz porównanie jako Excel",
        },
      },
    },
    /** Split a scanned PDF into its documents: a Splitter, not a Flow. */
    "split-scanned-pdf": {
      vocab: {
        doc: "zeskanowany PDF",
        docs: "zeskanowane PDF-y",
        a_doc: "zeskanowany PDF",
        the_doc: "pliku PDF",
        the_docs: "plików PDF",
        your_doc: "twój PDF",
        your_docs: "swoje PDF-y",
        all_your_docs: "wszystkie swoje PDF-y",
        all_docs: "wszystkich plików PDF",
        each_doc: "każdego pliku PDF",
        another_doc: "inny PDF",
        this_doc: "ten PDF",
      },
      overrides: {
        title: "Podziel zeskanowany PDF na dokumenty za darmo (AI)",
        description:
          "Wgraj jeden PDF z kilkoma dokumentami zeskanowanymi razem (faktury, zamówienia, paragony, umowy) i odbierz każdy dokument osobno, sklasyfikowany według typu. Za darmo, bez zaznaczania stron.",
        label: "Podziel zeskanowany PDF",
        h1: "Podziel zeskanowany PDF na dokumenty",
        intro:
          "Dziesięć kartek przeszło przez skaner, a wyszedł jeden PDF. Wgraj go: Tavnit przeczyta każdą stronę, znajdzie początek każdego dokumentu i odda ci je jeden po drugim, każdy z typem (faktura, zamówienie zakupu, paragon, lista pakunkowa, konosament, umowa…). Bez dzielenia po liczbie stron i bez ręcznego zaznaczania.",
        trust: ["Jeden PDF · do 12 stron", "{limit} darmowych dokumentów dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj zeskanowany PDF",
          hint: "jeden PDF z kilkoma dokumentami w środku",
          choose: "Wybierz plik",
          sample: "Wypróbuj na przykładowym skanie",
          formats: "PDF · do 4 MB i 12 stron",
        },
        stages: ["Wgrywamy PDF", "Czytamy każdą stronę", "Szukamy początku każdego dokumentu", "Klasyfikujemy", "Prawie gotowe"],
        result: {
          retention: "usunie się sam po 24 h",
          downloading: "Przygotowujemy plik",
          another: "Podziel inny PDF",
          empty: "Nie znaleźliśmy w tym PDF-ie więcej niż jednego dokumentu.",
          flowNote: "Te typy należą do stałego Splittera tego narzędzia. Na swoim koncie to ty definiujesz typy.",
        },
        errors: {
          too_large: "Plik ma ponad 4 MB. Skompresuj go albo podziel skan na dwie części.",
          too_many_pages: "Darmowa wersja dzieli do 12 stron na PDF. Z kontem nie ma limitu.",
          unsupported: "Przyjmujemy tylko PDF, JPG lub PNG. Żeby podzielić dokumenty, wgraj PDF ze skanera.",
          failed: "Nie udało się podzielić tego PDF-a. Wypróbuj inny skan albo przykład.",
          empty: "Plik jest pusty.",
        },
        next: {
          lead: "To był jeden PDF. Z kontem każdy dokument wycięty przez Splitter trafia do własnego Flow: faktura do ekstrakcji faktur, zamówienie do swojej, paragon do rozliczenia wydatków. Nikt już niczego ręcznie nie rozdziela ani nie klasyfikuje.",
          source: "Twój PDF",
          flow: {
            title: "Ze Splittera do Flow: każdy dokument do swojej ekstrakcji",
            body: "Splitter znajduje początek każdego dokumentu i klasyfikuje go według typów, które opisujesz słowami. To narzędzie używa stałego Splittera z ośmioma typami i bez wyjść: po prostu oddaje ci dokumenty. Na swoim koncie definiujesz własne typy i dla każdego decydujesz, dokąd trafia: do Flow, który wyciąga jego pola (jak poniżej, z {fields} polami), na e-mail albo do Collection. Bez szablonów i bez współrzędnych.",
            linkLabel: "Jak działa Splitter",
            href: "/docs/splitters",
          },
          inputs: {
            show: "Jak twój PDF trafia do Tavnit?",
          },
        },
        cleaners: {
          heading: "Po podziale, w Tavnit…",
          lead: "Każdy typ dokumentu może mieć własne miejsce docelowe, bez ręcznego sortowania. Cztery przykłady:",
          ideas: [
            { icon: "text", title: "Każda faktura do swojego Flow i dalej do ERP", from: "faktura (s. 1–2)", to: "Flow faktur → ERP", note: "wyciągnięta i zaksięgowana bez dotykania" },
            { icon: "mail", title: "Paragony do rozliczenia wydatków", from: "paragon (s. 5)", to: "wydatki@twojafirma", note: "każdy paragon trafia do osoby, która go rozlicza" },
            { icon: "calendar", title: "Umowy do archiwum prawnego razem z datami", from: "umowa (s. 6–7)", to: "Flow umów", note: "wygaśnięcie i odnowienie w jednej tabeli" },
            { icon: "alert", title: "Powiadomienie, gdy czegoś nie rozpoznano", from: "niesklasyfikowana strona", to: "weryfikacja ręczna", note: "nic się nie gubi i nie trafia w złe miejsce" },
          ],
          outro: "Miejsca docelowe ustawia się w Tavnit dla każdego typu dokumentu. To tylko przykłady.",
          cta: "Załóż darmowe konto i skonfiguruj to",
          ctaSignedIn: "Otwórz Tavnit i skonfiguruj to",
          learn: "Czym jest Splitter",
        },
        after: {
          title: "Twoje dokumenty są gotowe",
          lead: "Powstały ze stałego Splittera z ośmioma typami. Na swoim koncie to ty definiujesz typy, a każdy dokument sam trafia dalej do swojego Flow:",
          close: "Zamknij",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj skan", body: "Jeden PDF z kilkoma dokumentami w środku, dokładnie taki, jaki wyszedł ze skanera. Dowolna kolejność, dowolna liczba stron na dokument." },
            { title: "Tavnit dzieli i klasyfikuje", body: "Czyta każdą stronę, wykrywa, gdzie zaczyna się każdy dokument, i przypisuje mu typ: faktura, zamówienie zakupu, paragon, lista pakunkowa, konosament, umowa, nota kredytowa lub inny." },
            { title: "Pobierz każdy dokument", body: "Widzisz listę z zakresami stron i typami. Z darmowym kontem pobierasz każdy PDF osobno albo wszystkie w jednym pliku zip." },
          ],
        },
        faqs: [
          {
            q: "Skąd wie, gdzie kończy się jeden dokument, a zaczyna następny?",
            a: "AI patrzy na wszystkie strony naraz, tak jak zrobiłby to człowiek: zmiany nagłówka, firmy, numeracji stron, układu. Nie liczy stron i nie szuka znaczników, dlatego działa, gdy jedna faktura ma dwie strony, a paragon tylko jedną.",
          },
          {
            q: "Jakie typy dokumentów rozpoznaje?",
            a: "Tutaj osiem: faktura, zamówienie zakupu, paragon, lista pakunkowa, konosament, umowa, nota kredytowa i inny. Z kontem definiujesz własne typy, opisując je słowami, i dla każdego decydujesz, dokąd trafia: do Flow, który wyciąga jego dane, na e-mail albo do Collection.",
          },
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} dokumentów dziennie, z pełnym wynikiem na ekranie. Pobranie rozdzielonych PDF-ów wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Ile stron mogę wgrać?",
            a: "W darmowej wersji do 12 stron na PDF, maksymalnie 4 MB. Z kontem nie ma limitu stron, a skany możesz wysyłać e-mailem prosto do Splittera.",
          },
          {
            q: "Czy działa ze słabymi skanami albo z kilkoma językami?",
            a: "Tak. Radzi sobie ze skanami krzywymi, w odcieniach szarości i z pieczątkami, a także z dokumentami po angielsku, hiszpańsku lub w innych językach wymieszanymi w jednym PDF-ie. Jeśli strony nie da się odczytać, zostaje oznaczona jako niesklasyfikowana, zamiast dostać zmyślony typ.",
          },
          {
            q: "Co dzieje się z moim plikiem?",
            a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach PDF i rozdzielone dokumenty usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez pliku i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
          },
          {
            q: "Dlaczego pobranie wymaga konta?",
            a: "Bo darmowa wersja służy do wypróbowania. Z kontem możesz dzielić każdy skan, wysyłać każdy dokument do jego Flow i dostawać wyciągnięte dane w swoim ERP albo e-mailem.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Splitter ze swoimi typami dokumentów i przekazuj skany na jego adres e-mail albo podłącz go przez API. Każdy wycięty dokument sam trafia do swojego Flow, a stamtąd do twojego ERP, Google Sheets albo skrzynki.",
          },
        ],
        split: {
          heading: "Gotowe: {file}",
          summary: "{n} na {pages}",
          segmentWord: ["dokument", "dok."],
          pageWord: ["str.", "str."],
          pages: "s. {from}–{to}",
          pageOne: "s. {from}",
          unmatched: "Niesklasyfikowany",
          type: "Typ",
          reason: "Dlaczego",
          download: "Pobierz",
          downloadAll: "Pobierz wszystkie (zip)",
          stages: ["Wgrywamy PDF", "Czytamy każdą stronę", "Szukamy początku każdego dokumentu", "Klasyfikujemy", "Prawie gotowe"],
          empty: "Nie znaleźliśmy w tym PDF-ie więcej niż jednego dokumentu.",
          another: "Podziel inny PDF",
        },
      },
    },
    /** Packing list → Excel: shipment header once, one row per goods line. */
    "packing-list-to-excel": {
      vocab: {
        doc: "lista pakunkowa",
        docs: "listy pakunkowe",
        a_doc: "listę pakunkową",
        the_doc: "listy pakunkowej",
        the_docs: "list pakunkowych",
        your_doc: "twoja lista pakunkowa",
        your_docs: "swoje listy pakunkowe",
        all_your_docs: "wszystkie swoje listy pakunkowe",
        all_docs: "wszystkich list pakunkowych",
        each_doc: "każdej listy pakunkowej",
        another_doc: "inną listę pakunkową",
        this_doc: "tę listę pakunkową",
      },
      overrides: {
        title: "Lista pakunkowa do Excela za darmo: AI wyciąga każdą pozycję",
        description:
          "Wgraj listę pakunkową jako PDF lub zdjęcie i dostań każdą pozycję w tabeli Excel: opis, ilość, opakowania, wagę netto i brutto, wymiary, a do tego nadawcę, odbiorcę i porty. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Lista pakunkowa do Excela",
        h1: "Zamień listę pakunkową w plik Excel",
        intro:
          "Wgraj PDF lub zdjęcie. Tavnit odczyta nagłówek wysyłki (nadawca, odbiorca, porty, sumy) i każdą pozycję towaru z opakowaniami, wagami i wymiarami, a potem odda ci wszystko jako arkusz kalkulacyjny. Bez szablonów dla każdego dostawcy: to samo narzędzie obsłuży listy pakunkowe wszystkich twoich wysyłek.",
        drop: {
          title: "Przeciągnij tutaj listę pakunkową",
          sample: "Wypróbuj na przykładowej liście pakunkowej",
        },
        stages: ["Wgrywamy dokument", "Czytamy nagłówek wysyłki", "Szukamy pozycji towaru", "Porządkujemy kolumny", "Prawie gotowe"],
        result: {
          empty: "Nie znaleźliśmy w tym dokumencie pozycji towaru. Wypróbuj listę pakunkową z opakowaniami, wagami lub ilościami w każdym wierszu.",
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla list pakunkowych. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: kontener, znaki, kod HS, numer B/L…",
        },
        next: {
          lead: "To była jedna lista pakunkowa. Z kontem to samo dzieje się z każdą przychodzącą listą pakunkową, a pozycje nie kończą drogi w Excelu: płyną dalej same.",
          source: "Twoja lista pakunkowa",
          flow: {
            name: "Lista pakunkowa",
            add: { name: "container", type: "Tekst", hint: "Obok „Kontener” · np. MSKU-4417", save: "Zapisz", value: "MSKU-4417" },
          },
          inputs: { show: "Jak twoja lista pakunkowa trafia do Tavnit?" },
        },
        cleaners: {
          lead: "Proste reguły, które działają same dla każdej listy pakunkowej po ekstrakcji. Cztery pomysły na twoich własnych danych:",
          ideas: [
            { icon: "date", title: "Jeden zapis daty", from: "{date}", to: "{iso}", note: "ten sam format dla każdej listy pakunkowej" },
            { icon: "alert", title: "Waga brutto musi przekraczać netto", from: "netto > brutto", to: "do weryfikacji", note: "odwrócona pozycja nigdy nie trafi niezauważona do zgłoszenia" },
            { icon: "calendar", title: "Przypomnienie przed wypłynięciem", from: "data wysyłki", to: "przypomnienie 2 dni wcześniej", note: "dla agencji celnej i logistyki" },
            { icon: "mail", title: "Kopia dla agencji celnej", from: "wyciągnięta lista pakunkowa", to: "e-mail z Excelem", note: "razem z powiązaną fakturą" },
          ],
        },
        after: {
          lead: "Powstał ze stałego Flow z {fields} polami. Na swoim koncie to ty wybierasz pola, a tak wygląda praca Tavnit w przypadku każdej listy pakunkowej:",
        },
        how: {
          steps: [
            { title: "Wgraj listę pakunkową", body: "PDF, zdjęcie lub skan. Dowolny nadawca, dowolny język, dowolny układ." },
            {
              title: "Tavnit czyta dokument",
              body: "Znajduje nagłówek (nadawca, odbiorca, porty, sumy) i tabelę towarów z opakowaniami, wagą netto, wagą brutto i wymiarami każdej pozycji.",
            },
            { title: "Sprawdź i pobierz", body: "Tabela pojawia się na ekranie. Z darmowym kontem zabierasz ją jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} dokumentów dziennie, z pełnym wynikiem na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron. Jeśli twoja lista pakunkowa jest dłuższa, wgraj ją w częściach albo załóż konto.",
          },
          {
            q: "Jakie kolumny wyciąga z listy pakunkowej?",
            a: "Na poziomie dokumentu: nadawcę, odbiorcę, numer, datę, powiązaną fakturę, port załadunku, port wyładunku oraz sumy opakowań i wag. Na poziomie pozycji: opis, ilość, jednostkę, opakowania, wagę netto, wagę brutto i wymiary. Wartości dokumentu powtarzają się w każdym wierszu, więc tabelę od razu można filtrować.",
          },
          {
            q: "Czy mogę wybrać inne kolumny?",
            a: "Nie tutaj: to narzędzie używa stałego Flow dla list pakunkowych z 17 polami. Na swoim koncie tworzysz własne Flow, dla list pakunkowych albo dowolnych innych dokumentów, z polami, których potrzebujesz: na poziomie dokumentu (kontener, plomba, numer B/L, incoterm) albo pozycji (znaki, kod HS, objętość). Bez szablonów: opisujesz pole i w razie potrzeby podpowiadasz, gdzie go szukać.",
          },
          {
            q: "Czy działa z listami pakunkowymi z każdego kraju?",
            a: "Tak. Obsługuje listy pakunkowe po angielsku, hiszpańsku i w innych językach, z wagami w kg lub lb i wymiarami w cm lub calach, dokładnie tak, jak są wydrukowane. Testowaliśmy je m.in. na wysyłkach z Panamy, Kolumbii, Meksyku, Chin i USA.",
          },
          {
            q: "Czy muszę ustawiać szablon dla każdego dostawcy?",
            a: "Nie. Tavnit nie używa szablonów: czyta każdy dokument tak, jak przychodzi, nawet jeśli nadawca jutro zmieni układ swojej listy pakunkowej.",
          },
          {
            q: "Co dzieje się z moim plikiem?",
            a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach plik i wyciągnięte wiersze usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez dokumentu i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Flow z wybranymi polami i przekazuj listy pakunkowe na jego adres e-mail albo podłącz go przez API, webhooki, Zapier, Make lub n8n. Każda wysyłka trafia do twojego systemu celnego, ERP lub Google Sheets i nikt niczego nie przepisuje.",
          },
        ],
      },
    },
    /** Bill of lading → Excel: B/L header, one row per container line. */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "konosament",
        docs: "konosamenty",
        a_doc: "konosament",
        the_doc: "konosamentu",
        the_docs: "konosamentów",
        your_doc: "twój konosament",
        your_docs: "swoje konosamenty",
        all_your_docs: "wszystkie swoje konosamenty",
        all_docs: "wszystkich konosamentów",
        each_doc: "każdego konosamentu",
        another_doc: "inny konosament",
        this_doc: "ten konosament",
      },
      overrides: {
        title: "Konosament do Excela za darmo: wyciągnij dane z B/L",
        description:
          "Wgraj konosament (B/L) jako PDF lub zdjęcie i dostań dane w tabeli Excel: numer B/L, przewoźnika, nadawcę, odbiorcę, statek, porty i jeden wiersz na kontener z plombą, towarem, opakowaniami, wagą i objętością. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Konosament do Excela",
        h1: "Zamień konosament w plik Excel",
        intro:
          "Wgraj PDF lub zdjęcie B/L. Tavnit odczyta nagłówek (numer B/L, przewoźnik, nadawca, odbiorca, statek, podróż, porty, data załadunku na statek) i każdą pozycję ładunku z kontenerem, plombą, opakowaniami, wagą brutto i objętością, a potem odda ci wszystko jako arkusz kalkulacyjny. Bez szablonów dla każdego przewoźnika: ten sam Flow czyta MSC, Maersk, Hapag-Lloyd czy dowolnego NVOCC.",
        drop: {
          title: "Przeciągnij tutaj konosament",
          sample: "Wypróbuj na przykładowym B/L",
        },
        stages: ["Wgrywamy dokument", "Czytamy nagłówek B/L", "Szukamy pozycji ładunku", "Porządkujemy kolumny", "Prawie gotowe"],
        result: {
          empty: "Nie znaleźliśmy w tym dokumencie pozycji ładunku. Wypróbuj konosament z tabelą kontenerów i towarów.",
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla konosamentów. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: incoterm, miejsce dostawy, numer bookingu, ETA…",
          another: "Przetwórz inny konosament",
        },
        errors: {
          too_large: "Plik ma ponad 4 MB. Skompresuj go albo wgraj tylko strony B/L.",
        },
        next: {
          lead: "To był jeden konosament. Z kontem to samo dzieje się z każdym B/L od każdego przewoźnika i agenta, a dane nie kończą drogi w Excelu: płyną same dalej, do twojego systemu celnego lub spedycyjnego.",
          source: "Twój B/L",
          flow: {
            name: "Konosament",
            add: { name: "incoterm", type: "Tekst", hint: "Obok „Incoterm” · np. CIF Manzanillo", save: "Zapisz", value: "CIF" },
          },
          inputs: { show: "Jak twój B/L trafia do Tavnit?" },
        },
        cleaners: {
          lead: "Proste reguły, które działają same dla każdego konosamentu po ekstrakcji. Cztery pomysły na twoich własnych danych:",
          ideas: [
            { icon: "date", title: "Jeden zapis daty załadunku", from: "{date}", to: "{iso}", note: "ten sam format dla każdego B/L" },
            { icon: "alert", title: "Waga brutto poza zakresem", from: "waga brutto na kontener", to: "oznacz powyżej 26 000 kg", note: "żeby nikt nie zamówił ciężarówki, która jej nie uciągnie" },
            { icon: "calendar", title: "Przypomnienie przed przypłynięciem", from: "data załadunku + czas tranzytu", to: "przypomnienie 5 dni wcześniej", note: "żeby zgłoszenie było gotowe, zanim statek przybije" },
            { icon: "mail", title: "Prosto do agencji celnej", from: "wyciągnięty B/L", to: "e-mail z tabelą w załączniku", note: "trafia do agencji bez ręcznego przekazywania" },
          ],
        },
        after: {
          lead: "Powstał ze stałego Flow z {fields} polami. Na swoim koncie to ty wybierasz pola, a tak wygląda praca Tavnit w przypadku każdego konosamentu:",
        },
        how: {
          steps: [
            { title: "Wgraj B/L", body: "PDF, zdjęcie lub skan. Dowolny przewoźnik, dowolny agent, dowolny układ formularza." },
            { title: "Tavnit czyta dokument", body: "Znajduje nagłówek (numer B/L, strony, statek, podróż, porty, data załadunku, warunki frachtu) i tabelę ładunku: jeden wiersz na kontener z plombą, towarem, opakowaniami, wagą i objętością." },
            { title: "Sprawdź i pobierz", body: "Tabela pojawia się na ekranie. Z darmowym kontem zabierasz ją jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} dokumentów dziennie, z pełnym wynikiem na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Co wyciąga z konosamentu?",
            a: "Z nagłówka: numer B/L, przewoźnika, nadawcę, odbiorcę, stronę do powiadomienia (notify party), statek, podróż, port załadunku, port wyładunku, datę załadunku na statek, warunki frachtu i listę kontenerów. Z tabeli ładunku, jeden wiersz na pozycję: kontener, plombę, opis towaru, liczbę i rodzaj opakowań, wagę brutto i objętość. Wartości nagłówka powtarzają się w każdym wierszu, więc arkusz łatwo filtrować i sumować.",
          },
          {
            q: "Czy mogę wybrać inne kolumny?",
            a: "Nie tutaj: to narzędzie używa stałego Flow dla konosamentów z 19 polami. Na swoim koncie tworzysz własne Flow, dla konosamentów albo dowolnych innych dokumentów, z polami, których potrzebujesz: na poziomie dokumentu (incoterm, miejsce dostawy, numer bookingu, ETA) albo pozycji (kod HS, znaki, temperatura kontenera chłodniczego). Bez szablonów: opisujesz pole i w razie potrzeby podpowiadasz, gdzie go szukać.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron. Jeśli twój B/L jest dłuższy albo w jednym skanie jest kilka B/L, wgraj je w częściach albo załóż konto.",
          },
          {
            q: "Czy działa z B/L każdego przewoźnika?",
            a: "Tak. Nie używa szablonów: czyta każdy B/L tak, jak przychodzi, czy to master B/L przewoźnika, house B/L spedytora, czy sea waybill, po angielsku lub hiszpańsku. Testowaliśmy je na układach MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen i NVOCC.",
          },
          {
            q: "Co dzieje się z moim plikiem?",
            a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach plik i wyciągnięte wiersze usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez dokumentu i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
          },
          {
            q: "Dlaczego pobranie wymaga konta?",
            a: "Bo darmowa wersja służy do wypróbowania. Z kontem możesz w ten sam sposób przetwarzać wszystkie swoje konosamenty, dostawać wynik e-mailem i wysyłać go do systemu celnego lub spedycyjnego.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Flow z wybranymi polami i przekazuj B/L na jego adres e-mail (ten, na który wysyła je przewoźnik lub spedytor) albo podłącz go przez API, webhooki, Zapier, Make lub n8n. Dane trafiają do twojego systemu celnego, ERP lub Google Sheets i nikt niczego nie przepisuje.",
          },
        ],
      },
    },
    /** Compare supplier quotes: the Matcher pairs lines across suppliers and marks the Champion. */
    "quote-comparison": {
      vocab: {
        doc: "oferta",
        docs: "oferty",
        a_doc: "ofertę",
        the_doc: "oferty",
        the_docs: "ofert",
        your_doc: "twoja oferta",
        your_docs: "swoje oferty",
        all_your_docs: "wszystkie swoje oferty",
        all_docs: "wszystkich ofert",
        each_doc: "każdej oferty",
        another_doc: "inną ofertę",
        this_doc: "tę ofertę",
      },
      overrides: {
        title: "Porównaj oferty dostawców za darmo: tabela pozycja po pozycji",
        description:
          "Wgraj dwie lub trzy oferty jako PDF lub zdjęcie i dostań jedną tabelę porównawczą: każda pozycja z ceną każdego dostawcy i zaznaczoną najtańszą. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Porównanie ofert dostawców",
        h1: "Porównaj oferty dostawców",
        intro:
          "Wgraj dwie lub trzy oferty na to samo zapytanie. Tavnit czyta każdą z nich, paruje pozycje nawet wtedy, gdy każdy dostawca opisuje je inaczej, i buduje jedną tabelę z każdą ceną i najtańszą opcją dla każdej pozycji. Bez szablonów i bez ręcznego klepania arkusza.",
        trust: ["2 lub 3 oferty · PDF lub zdjęcie", "{limit} darmowych dokumentów dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj ofertę",
          hint: "PDF lub zdjęcie",
          sample: "Wypróbuj na trzech przykładowych ofertach",
          formats: "PDF, JPG lub PNG · do 4 MB i 5 stron na ofertę",
        },
        stages: ["Czytamy oferty", "Porządkujemy pozycje", "Matcher paruje pozycje", "Prawie gotowe"],
        result: {
          flowNote: "Każda oferta przechodzi przez stały Flow z {fields} polami, a Matcher je zestawia. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: markę, gwarancję, czas dostawy dla każdej pozycji…",
          download: "Pobierz porównanie jako Excel",
          another: "Porównaj inne oferty",
          empty: "Nie znaleźliśmy w tej ofercie pozycji z cenami. Wypróbuj ofertę z towarami, ilościami i cenami w każdym wierszu.",
        },
        errors: {
          too_large: "Jedna z ofert ma ponad 4 MB. Skompresuj ją albo wgraj tylko strony z pozycjami.",
          failed: "Nie udało się odczytać jednej z ofert. Wypróbuj inną albo przykłady.",
          no_lines: "Jedna z ofert nie ma pozycji z cenami, więc nie ma czego porównać. Sprawdź, czy każda zawiera towary z ceną jednostkową.",
          not_ready: "Wciąż czytamy oferty. Daj nam chwilę i spróbuj ponownie.",
        },
        auth: {
          title: "Załóż darmowe konto, żeby pobrać tabelę",
          body: "Excel pobierze się od razu. Z kontem możesz też porównywać więcej niż trzy oferty i robić to przy każdym przetargu, który się pojawi.",
        },
        next: {
          lead: "To były trzy oferty wgrane ręcznie. Z kontem każda oferta, która przychodzi e-mailem, trafia do swojego Flow, Matcher sam je zestawia, a tabela płynie dalej: do zakupów, do ERP albo do osoby, która zatwierdza.",
          source: "Twoje oferty",
          flow: {
            name: "Oferta",
            add: { name: "brand", type: "Tekst", hint: "Obok „Marka” albo w opisie", save: "Zapisz", value: "Argos" },
          },
          inputs: { show: "Jak twoje oferty trafiają do Tavnit?" },
        },
        cleaners: {
          lead: "Proste reguły, które działają same dla każdej oferty po jej odczytaniu. Cztery pomysły:",
          ideas: [
            { icon: "date", title: "Jeden zapis daty", from: "{date}", to: "{iso}", note: "ten sam format dla każdej oferty" },
            { icon: "alert", title: "Alert, gdy dostawca podniesie cenę o ponad 5%", from: "dzisiejsza cena", to: "vs. ostatnia oferta", note: "dla każdej pozycji, przed wyborem dostawcy" },
            { icon: "approve", title: "Zatwierdzenie wyboru dostawcy", from: "tabela porównawcza", to: "osoba, która decyduje", note: "zamówienie wychodzi dopiero po zatwierdzeniu" },
            { icon: "calendar", title: "Pamiętaj o ważności oferty", from: "ważna do {date}", to: "przypomnienie 5 dni wcześniej", note: "żeby cena nie przepadła" },
          ],
        },
        after: {
          title: "Twoja tabela porównawcza jest gotowa",
          lead: "Powstała ze stałego Flow z {fields} polami i Matchera. Na swoim koncie to ty wybierasz pola, a tak to wygląda, gdy Tavnit zestawia każdą ofertę:",
        },
        how: {
          steps: [
            { title: "Wgraj dwie lub trzy oferty", body: "PDF lub zdjęcie, na to samo zapytanie. Dowolny dostawca, dowolny układ, dowolny sposób opisania towaru." },
            { title: "Tavnit czyta je i zestawia", body: "Wyciąga pozycje z każdej oferty, a Matcher paruje towary, nawet gdy są opisane inaczej. Najtańsza oferta dla każdej pozycji jest oznaczona jako Champion." },
            { title: "Sprawdź i pobierz", body: "Tabela pojawia się na ekranie. Z darmowym kontem zabierasz ją jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} dokumentów dziennie (porównanie trzech ofert liczy się jako trzy), z pełną tabelą na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Jak paruje pozycje, gdy każdy dostawca opisuje je inaczej?",
            a: "Za pomocą Matchera w Tavnit. Porównuje znaczenie każdego opisu, a nie dokładny tekst: „cement szary 42,5 kg” i „cement portlandzki typ I, szary, worek 42,5 kg” lądują w tym samym wierszu. W razie wątpliwości drugi krok rozstrzyga, czy to ten sam towar.",
          },
          {
            q: "Co oznacza Champion?",
            a: "Dostawcę z najniższą ceną jednostkową w danej pozycji. Przy remisie widać obu. Pozycje wycenione tylko przez jednego dostawcę nie mają konkurencji, ale też są pokazane.",
          },
          {
            q: "Czy mogę porównać więcej niż trzy oferty?",
            a: "Nie tutaj: darmowa wersja przyjmuje maksymalnie trzy. Na koncie Matcher porównuje do dziesięciu przebiegów tego samego Flow, a tabelę możesz wysłać e-mailem albo do ERP.",
          },
          {
            q: "Czy mogę wybrać inne kolumny?",
            a: "Nie tutaj: to narzędzie używa stałego Flow dla ofert. Na swoim koncie tworzysz własny Flow z polami, których potrzebujesz (marka, gwarancja, czas dostawy dla pozycji), i ustawiasz Matcher tak, żeby porównywał wybrane pole: cenę, czas dostawy albo dowolną liczbę.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron na ofertę.",
          },
          {
            q: "Co dzieje się z moimi plikami?",
            a: "Są przetwarzane na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służą. Po 24 godzinach pliki, wyciągnięte pozycje i tabela usuwają się same; zachowujemy tylko informację, że przebieg się odbył.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Flow dla ofert z własnymi polami i Matcher na jego podstawie. Przekazuj oferty na adres e-mail Matchera, a gdy wszystkie dotrą, tabela porównawcza powstanie sama: e-mailem, webhookiem albo w twoim ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Oferta A", hint: "PDF lub zdjęcie", sample: "Przykładowa oferta A" },
            { title: "Oferta B", hint: "PDF lub zdjęcie", sample: "Przykładowa oferta B" },
            { title: "Oferta C", hint: "PDF lub zdjęcie", sample: "Przykładowa oferta C", optional: true },
          ],
          run: "Porównaj",
          sampleAll: "Wypróbuj na trzech przykładowych ofertach",
          stages: ["Czytamy oferty", "Porządkujemy pozycje", "Matcher paruje pozycje", "Prawie gotowe"],
          heading: "Tabela porównawcza gotowa",
          summary: "{n} · {ref}",
          labels: {
            description: "Opis",
            quantity: "Ilość",
            price: "Cena jedn.",
            total: "Wartość",
            status: "Status",
            ref: "A",
            doc: "B",
            supplier: "Dostawca",
            champion: "Champion",
            wins: "wygrane pozycje: {n}",
            lines: ["pozycja", "poz."],
          },
          status: { ok: "Zgadza się", price: "Inna cena", qty: "Inna ilość", both: "Inna cena i ilość", missing: "Brak wyceny", extra: "Tylko w tej ofercie" },
          empty: "Matcher nie znalazł w ofertach porównywalnych pozycji. Sprawdź, czy dotyczą tego samego zapytania i mają towary z ceną jednostkową.",
          another: "Porównaj inne oferty",
          download: "Pobierz porównanie jako Excel",
        },
      },
    },
    /** Contract key dates: one row per contract (a metadata-only Flow). */
    "contract-dates": {
      vocab: {
        doc: "umowa",
        docs: "umowy",
        a_doc: "umowę",
        the_doc: "umowy",
        the_docs: "umów",
        your_doc: "twoja umowa",
        your_docs: "swoje umowy",
        all_your_docs: "wszystkie swoje umowy",
        all_docs: "wszystkich umów",
        each_doc: "każdej umowy",
        another_doc: "inną umowę",
        this_doc: "tę umowę",
      },
      overrides: {
        title: "Darmowy ekstraktor dat odnowienia umów (AI)",
        description:
          "Wgraj umowę jako PDF i dostań jej kluczowe daty w jednym wierszu Excela: strony, początek, koniec, automatyczne odnowienie, okres wypowiedzenia i termin na wypowiedzenie. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik.",
        label: "Daty w umowach",
        h1: "Wyciągnij kluczowe daty z umowy",
        intro:
          "Wgraj PDF. Tavnit przeczyta umowę i odda jeden wiersz ze stronami, datą podpisania, początkiem i końcem okresu obowiązywania, informacją o automatycznym odnowieniu, okresem wypowiedzenia i ostatnim dniem, w którym możesz ją wypowiedzieć. Działa z umowami o świadczenie usług, najmu, dostaw i licencyjnymi, w dowolnym formacie.",
        drop: {
          title: "Przeciągnij tutaj umowę",
          sample: "Wypróbuj na przykładowej umowie",
        },
        stages: ["Wgrywamy dokument", "Czytamy strony umowy", "Szukamy okresu i odnowienia", "Liczymy termin wypowiedzenia", "Prawie gotowe"],
        result: {
          empty: "Nie znaleźliśmy w tym dokumencie stron ani dat. Wypróbuj podpisaną umowę z klauzulą o okresie obowiązywania.",
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla umów. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: wewnętrzny opiekun, centrum kosztów, kara umowna…",
          another: "Przetwórz inną umowę",
        },
        next: {
          lead: "To była jedna umowa. Z kontem to samo dzieje się z każdą przychodzącą umową, a daty nie kończą drogi w Excelu: podnoszą alarm przed terminem.",
          source: "Twoja umowa",
          inputs: { show: "Jak twoja umowa trafia do Tavnit?" },
          flow: {
            name: "Umowa",
            add: { name: "owner", type: "Tekst", hint: "Kto podpisuje ją po naszej stronie", save: "Zapisz", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Proste reguły, które działają same dla każdej umowy po jej odczytaniu. Cztery pomysły na twoich własnych danych:",
          ideas: [
            { icon: "date", title: "Jeden zapis daty", from: "{date}", to: "{iso}", note: "ten sam format dla każdej umowy" },
            { icon: "calendar", title: "Przypomnienie 60 dni przed końcem", from: "end_date", to: "przypomnienie na czas", note: "zanim minie termin wypowiedzenia" },
            { icon: "alert", title: "Automatyczne odnowienie: najpierw weryfikacja", from: "auto_renewal = Yes", to: "do weryfikacji", note: "żeby żadna umowa nie odnowiła się, zanim ktoś na nią spojrzy" },
            { icon: "mail", title: "E-mail do opiekuna umowy", from: "umowa odczytana", to: "e-mail z wierszem", note: "osoba, która ją podpisała, dostaje daty" },
          ],
        },
        after: {
          lead: "Powstał ze stałego Flow z {fields} polami. Na swoim koncie to ty wybierasz pola, a tak to wygląda, gdy Tavnit czyta każdą umowę:",
        },
        how: {
          steps: [
            { title: "Wgraj umowę", body: "PDF tekstowy lub zeskanowany. Dowolny rodzaj umowy, niezależnie od tego, kto ją przygotował." },
            { title: "Tavnit czyta dokument", body: "Znajduje strony, podpis, okres obowiązywania, klauzulę odnowienia i okres wypowiedzenia, a potem wylicza termin na wypowiedzenie." },
            { title: "Sprawdź i pobierz", body: "Wiersz pojawia się na ekranie. Z darmowym kontem zabierasz go jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} umów dziennie, z pełnym wynikiem na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Jakie daty i informacje wyciąga?",
            a: "Strony, datę podpisania, początek i koniec okresu obowiązywania, długość tego okresu, informację o automatycznym odnowieniu, okres wypowiedzenia, termin na złożenie wypowiedzenia, wartość z walutą i prawo właściwe. Czego umowa nie mówi, zostaje puste: żadna data nigdy nie jest wymyślana.",
          },
          {
            q: "Dlaczego wynik to jeden wiersz?",
            a: "Bo umowa ma jeden okres obowiązywania, jedną datę podpisania i jeden zestaw stron. Z kontem możesz przepuścić cały folder umów i dostać tabelę z jednym wierszem na umowę, gotową do sortowania po dacie końca.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "PDF (tekstowy lub zeskanowany), JPG i PNG, do 4 MB i 5 stron. Jeśli twoja umowa jest dłuższa, wgraj strony z klauzulami o okresie i odnowieniu albo załóż konto.",
          },
          {
            q: "Czy mogę wybrać inne kolumny?",
            a: "Nie tutaj: to narzędzie używa stałego Flow dla umów z 14 polami. Na swoim koncie tworzysz własne Flow, dla umów albo dowolnych innych dokumentów, z polami, których potrzebujesz: wewnętrzny opiekun, kara umowna, gwarancja. Bez szablonów: opisujesz pole i w razie potrzeby podpowiadasz, gdzie go szukać.",
          },
          {
            q: "Co dzieje się z moim plikiem?",
            a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach plik i wyciągnięty wiersz usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez dokumentu i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
          },
          {
            q: "Czy działa z umowami z każdego kraju?",
            a: "Tak. Obsługuje umowy po angielsku, hiszpańsku i w innych językach, z dowolnym formatem daty. Testowaliśmy je m.in. na umowach z USA, Panamy, Meksyku i Kolumbii.",
          },
          {
            q: "Jak dostać ostrzeżenie przed datą końca?",
            a: "Załóż konto, zbuduj Flow z wybranymi polami i przekazuj umowy na jego adres e-mail albo podłącz go przez API, webhooki, Zapier, Make lub n8n. Cleaner porównuje termin wypowiedzenia z dzisiejszą datą i wysyła e-mail lub webhook do osoby, która ma podjąć decyzję.",
          },
        ],
      },
    },
    /** Receipt → Excel: mostly phone photos of thermal tickets. */
    "receipt-to-excel": {
      vocab: {
        doc: "paragon",
        docs: "paragony",
        a_doc: "paragon",
        the_doc: "paragonu",
        the_docs: "paragonów",
        your_doc: "twój paragon",
        your_docs: "swoje paragony",
        all_your_docs: "wszystkie swoje paragony",
        all_docs: "wszystkich paragonów",
        each_doc: "każdego paragonu",
        another_doc: "inny paragon",
        this_doc: "ten paragon",
      },
      overrides: {
        title: "Paragon do Excela za darmo: ze zdjęcia do arkusza",
        description:
          "Wgraj zdjęcie lub PDF paragonu i dostań jego pozycje w Excelu: sprzedawcę, datę, produkty, ilości, podatek, napiwek i sumę. Za darmo, bez szablonów i bez rejestracji, żeby zobaczyć wynik. OCR paragonu do arkusza w kilka sekund.",
        label: "Paragon do Excela",
        h1: "Zamień paragon w plik Excel",
        intro:
          "Zrób zdjęcie paragonu albo wgraj PDF. Tavnit odczyta sprzedawcę, datę, każdy produkt z ceną i sumy, a potem odda ci wszystko jako arkusz kalkulacyjny. Wyblakłe, krzywe czy pogniecione paragony termiczne też działają: nie ma żadnego szablonu do ustawiania.",
        drop: {
          title: "Przeciągnij tutaj zdjęcie paragonu",
          sample: "Wypróbuj na przykładowym paragonie",
        },
        stages: ["Wgrywamy paragon", "Czytamy sprzedawcę i datę", "Szukamy produktów", "Porządkujemy kolumny", "Prawie gotowe"],
        result: {
          empty: "Nie znaleźliśmy na tym paragonie żadnych produktów. Wypróbuj ostrzejsze zdjęcie, z całym paragonem w kadrze i bez cieni.",
          flowNote: "Te kolumny ({fields}) to pola stałego Flow dla paragonów. Na swoim koncie to ty wybierasz pola.",
          ghostHint: "W Tavnit dodajesz takie pola, jakie chcesz: centrum kosztów, kto wydał, projekt, kategoria…",
        },
        next: {
          lead: "To był jeden paragon. Z kontem to samo dzieje się z każdym przychodzącym paragonem, a pozycje nie kończą drogi w Excelu: płyną dalej same.",
          source: "Twój paragon",
          inputs: { show: "Jak twój paragon trafia do Tavnit?" },
          flow: {
            name: "Paragon",
            add: { name: "cost_center", type: "Tekst", hint: "Kto wydał albo jaki projekt", save: "Zapisz", value: "Sprzedaż" },
          },
        },
        cleaners: {
          lead: "Proste reguły, które działają same dla każdego paragonu po jego odczytaniu. Cztery pomysły na twoich własnych danych:",
          ideas: [
            { icon: "date", title: "Jeden zapis daty", from: "{date}", to: "{iso}", note: "ten sam format dla każdego paragonu w rozliczeniu wydatków" },
            { icon: "sum", title: "Produkty muszą dać sumę częściową", from: "produkty {sum}", to: "suma częściowa {subtotal}", note: "jeśli się nie zgadza, zdjęcie zostało źle odczytane i ktoś to sprawdzi", check: "sum" },
            { icon: "approve", title: "Zatwierdzanie powyżej kwoty", from: "suma {total}", to: "zatwierdź przed zwrotem kosztów", note: "gdy przekracza {threshold}" },
            { icon: "money", title: "Przelicz na swoją walutę", from: "{total} {currency}", to: "twoja waluta", note: "po kursie z dnia paragonu, przy podróżach" },
          ],
        },
        after: {
          lead: "Powstał ze stałego Flow z {fields} polami. Na swoim koncie to ty wybierasz pola, a tak to wygląda, gdy Tavnit obsługuje każdy paragon z podróży albo z całego miesiąca:",
        },
        how: {
          steps: [
            { title: "Wgraj paragon", body: "Zdjęcie z telefonu albo PDF. Dowolny sprzedawca, dowolny język, nawet mocno wyblakły paragon." },
            { title: "Tavnit czyta dokument", body: "Znajduje sprzedawcę, datę, numer, każdy produkt z ceną oraz sumę częściową, podatek, napiwek i sumę." },
            { title: "Sprawdź i pobierz", body: "Tabela pojawia się na ekranie. Z darmowym kontem zabierasz ją jako Excel." },
          ],
        },
        faqs: [
          {
            q: "Co obejmuje darmowa wersja?",
            a: "{limit} paragonów dziennie, z pełnym wynikiem na ekranie. Pobranie Excela wymaga konta Tavnit, które nic nie kosztuje.",
          },
          {
            q: "Czy działa ze zdjęciem z telefonu?",
            a: "Tak, to typowy przypadek. JPG, PNG i PDF do 4 MB. Pomaga, gdy cały paragon jest w kadrze, światło jest równe, a palce go nie zasłaniają; krzywe lub lekko nieostre zdjęcie też zostanie odczytane.",
          },
          {
            q: "Jakie formaty są obsługiwane?",
            a: "JPG, PNG i PDF (tekstowy lub zeskanowany), do 4 MB i 5 stron. Długi paragon z supermarketu zmieści się na jednym zdjęciu.",
          },
          {
            q: "Czy muszę ustawiać szablon dla każdego sprzedawcy?",
            a: "Nie. Tavnit nie używa szablonów: czyta każdy paragon tak, jak przychodzi, czy to z restauracji, apteki, taksówki, czy ze stacji benzynowej.",
          },
          {
            q: "Czy mogę wybrać inne kolumny?",
            a: "Nie tutaj: to narzędzie używa stałego Flow dla paragonów z 15 polami. Na swoim koncie tworzysz własne Flow z polami, których potrzebujesz: na poziomie dokumentu (centrum kosztów, kto wydał, projekt, kategoria) albo pozycji (kod produktu). Bez szablonów: opisujesz pole i w razie potrzeby podpowiadasz, gdzie go szukać.",
          },
          {
            q: "Co dzieje się z moim plikiem?",
            a: "Jest przetwarzany na koncie Tavnit przeznaczonym wyłącznie dla darmowych narzędzi i do niczego więcej nie służy. Po 24 godzinach zdjęcie i wyciągnięte wiersze usuwają się automatycznie; zachowujemy tylko informację, że przebieg się odbył, bez dokumentu i jego treści. Jeśli chcesz, żeby zniknęły wcześniej, napisz na support@tavnit.io.",
          },
          {
            q: "Mam pięćdziesiąt paragonów z podróży. Jeden po drugim?",
            a: "Tutaj tak. Z kontem wysyłasz wszystkie naraz: przekazujesz je e-mailem do Flow, wrzucasz hurtem albo podłączasz przez API, a każdy paragon trafia jako wiersze do tego samego Excela, Google Sheets albo twojego systemu wydatków.",
          },
          {
            q: "Jak to zautomatyzować?",
            a: "Załóż konto, zbuduj Flow z wybranymi polami i przekazuj zdjęcia paragonów na jego adres e-mail albo podłącz go przez API, webhooki, Zapier, Make lub n8n. Rozliczenie wydatków buduje się samo.",
          },
        ],
      },
    },
    /** Number format: the chosen columns out in one number format. */
    "number-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Popraw format liczb w Excelu lub CSV za darmo",
        description:
          "Wgraj plik Excel lub CSV z liczbami typu 1.234,56 albo 1,234.56 i odbierz je w jednym formacie, gotowe do sumowania. Ty wybierasz kolumny i format. Za darmo, bez rejestracji, żeby zobaczyć wynik.",
        label: "Popraw format liczb",
        h1: "Popraw format liczb w swoim arkuszu",
        intro:
          "Wgraj plik Excel lub CSV. Wybierz, w których kolumnach są liczby i jak mają wyglądać: 1234.56, 1,234.56 czy 1.234,56. Tavnit przekonwertuje każdą z nich i odda ci plik z tymi samymi kolumnami w tej samej kolejności.",
        trust: ["CSV lub Excel · do 500 wierszy", "{limit} darmowych plików dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj plik Excel lub CSV",
          hint: "albo wybierz plik z komputera",
          choose: "Wybierz plik",
          sample: "Wypróbuj na przykładowym pliku",
          formats: "CSV lub .xlsx · do 4 MB i 500 wierszy",
        },
        errors: {
          unsupported: "Tylko pliki CSV lub Excel (.xlsx).",
          xls: "To stary plik Excela (.xls). Otwórz go w Excelu i zapisz jako .xlsx lub .csv.",
          too_many_rows: "Darmowa wersja obsługuje do 500 wierszy. Wgraj część pliku.",
          too_many_columns: "Wybierz maksymalnie 10 kolumn naraz.",
          no_columns: "Wybierz co najmniej jedną kolumnę.",
          nothing_to_clean: "W tych kolumnach nie znaleźliśmy liczb do konwersji.",
          empty: "Plik jest pusty albo nie ma wierszy pod nagłówkiem.",
          unreadable: "Nie udało się odczytać pliku. Jeśli to plik Excela, zapisz go ponownie jako .xlsx.",
          failed: "Nie udało się przekonwertować tego pliku. Spróbuj ponownie albo użyj przykładowego pliku.",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj plik", body: "CSV albo plik Excela, z separatorem w postaci przecinka lub średnika." },
            { title: "Wybierz kolumny i format", body: "Zaznaczamy kolumny, które wyglądają na liczby. Ty mówisz, czy miejsca dziesiętne oddziela u ciebie przecinek, czy kropka, i jak liczby mają wyglądać." },
            { title: "Sprawdź i pobierz", body: "Zmienione komórki są wyróżnione. Z darmowym kontem zabierasz plik jako Excel lub CSV." },
          ],
        },
        faqs: [
          { q: "Dlaczego Excel nie chce zsumować moich liczb?", a: "Bo czyta je jako tekst. Dzieje się tak, gdy plik pochodzi z systemu lub kraju, który zapisuje miejsca dziesiętne inaczej niż ty: 1.234,56 w Excelu ustawionym na 1,234.56 albo odwrotnie. Gdy sprowadzisz je do jednego formatu, znów staną się liczbami." },
          { q: "Skąd wiecie, czy miejsca dziesiętne oddziela przecinek, czy kropka?", a: "Zgadujemy na podstawie twoich wartości: jeśli pojawia się 1.234,56, separatorem dziesiętnym jest przecinek. Gdy nie da się tego rozstrzygnąć, na przykład przy samym 1.234, wybierasz ty. Ten wybór decyduje o tym, jak zostanie odczytana każda liczba." },
          { q: "Jaki format wybrać?", a: "1234.56, bez separatora tysięcy, to format, który bez problemu odczyta każdy system, formuła i import. 1,234.56 i 1.234,56 służą do pokazywania pliku ludziom, zależnie od kraju." },
          { q: "Co dzieje się z komórkami, które nie są liczbami?", a: "Zostają bez zmian. Procent (15%), tekst (N/D) czy pusta komórka pozostają nietknięte: zmienia się tylko to, co jest ewidentnie liczbą." },
          { q: "Jakie formaty są obsługiwane?", a: "CSV rozdzielany przecinkami, średnikami lub tabulatorami oraz Excel .xlsx, do 4 MB i 500 wierszy. Jeśli masz stary plik Excela (.xls), zapisz go jako .xlsx." },
          { q: "Co dzieje się z moim plikiem?", a: "Służy tylko do tej konwersji i jest usuwany po 24 godzinach razem z wynikiem. Wynik widzi tylko twoja przeglądarka." },
          { q: "Jak sprawić, żeby działo się to samo?", a: "W Tavnit ta sama reguła to Cleaner: działa sam na każdym dokumencie, z którego wyciągasz dane, i na każdym pliku, który przychodzi e-mailem lub przez API, obok dat, walut i kontroli." },
        ],
        clean: {
          setup: {
            heading: "Wybierz kolumny i format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolumny z liczbami",
            columnsHint: "Maksymalnie {max}. Zaznaczyliśmy te, które wyglądają na liczby.",
            tooMany: "Możesz wybrać maksymalnie {max} kolumn naraz.",
            inputLabel: "W twoim pliku separatorem dziesiętnym jest",
            inputOptions: { comma: "przecinek · 1.234,56", dot: "kropka · 1,234.56" },
            outputLabel: "Liczby mają wyglądać tak",
            outputOptions: { plain: "1234.56 · do formuł i systemów", us: "1,234.56", latam: "1.234,56" },
            preview: "Pierwsze wiersze",
            run: "Konwertuj",
            change: "Zmień plik",
          },
          stages: ["Wgrywamy plik", "Czytamy kolumny", "Konwertujemy liczby", "Budujemy twój plik"],
          heading: "Gotowe: {file}",
          summary: "Zmieniono {cells} w {cols}",
          cellWord: ["komórkę", "komórek"],
          columnWord: ["kol.", "kol."],
          unchanged: "Żadna komórka nie wymagała zmiany: wszystkie były już w tym formacie.",
          highlight: "Zmienione komórki są zaznaczone na niebiesko.",
          shown: "Widzisz {shown} z {total} wierszy. Plik do pobrania zawiera wszystkie.",
          download: "Pobierz",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Konwertuj inny plik",
          automate: {
            heading: "Niech dzieje się to z każdym plikiem",
            body: "W Tavnit ta reguła to Cleaner. Ustawiasz go raz, a on działa sam na każdej fakturze, z której wyciągasz dane, i na każdym pliku, który przychodzi e-mailem lub przez API, obok dat, walut i kontroli.",
            cta: "Załóż darmowe konto",
            docs: "Czym jest Cleaner",
          },
        },
      },
    },
    /** Date format: numeric dates by rules, dates in words through the Cleaner's AI. */
    "date-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Popraw format dat w Excelu lub CSV za darmo",
        description:
          "Wgraj plik Excel lub CSV z mieszanymi datami (03/04/2024, 12 marca 2024, 2024-03-12) i odbierz je wszystkie w jednym formacie. Ty wybierasz kolumny i format. Za darmo, bez rejestracji, żeby zobaczyć wynik.",
        label: "Popraw format dat",
        h1: "Sprowadź wszystkie daty w arkuszu do jednego formatu",
        intro:
          "Wgraj plik Excel lub CSV. Wybierz, które kolumny zawierają daty i jak mają wyglądać: 2024-03-12, 12/03/2024 czy 03/12/2024. Tavnit przekonwertuje każdą z nich, także daty zapisane słownie, i odda ci plik z tymi samymi kolumnami.",
        trust: ["CSV lub Excel · do 500 wierszy", "{limit} darmowych plików dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj plik Excel lub CSV",
          hint: "albo wybierz plik z komputera",
          choose: "Wybierz plik",
          sample: "Wypróbuj na przykładowym pliku",
          formats: "CSV lub .xlsx · do 4 MB i 500 wierszy",
        },
        errors: {
          unsupported: "Tylko pliki CSV lub Excel (.xlsx).",
          xls: "To stary plik Excela (.xls). Otwórz go w Excelu i zapisz jako .xlsx lub .csv.",
          too_many_rows: "Darmowa wersja obsługuje do 500 wierszy. Wgraj część pliku.",
          too_many_columns: "Wybierz maksymalnie 10 kolumn naraz.",
          no_columns: "Wybierz co najmniej jedną kolumnę.",
          nothing_to_clean: "W tych kolumnach nie znaleźliśmy dat do konwersji.",
          empty: "Plik jest pusty albo nie ma wierszy pod nagłówkiem.",
          unreadable: "Nie udało się odczytać pliku. Jeśli to plik Excela, zapisz go ponownie jako .xlsx.",
          failed: "Nie udało się przekonwertować tego pliku. Spróbuj ponownie albo użyj przykładowego pliku.",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj plik", body: "CSV albo plik Excela, z datami w dowolnej postaci: z ukośnikami, myślnikami, kropkami albo słownie." },
            { title: "Wybierz kolumny i format", body: "Zaznaczamy kolumny, które wyglądają na daty. Ty mówisz, czy w twoim pliku najpierw jest dzień, czy miesiąc, i jak daty mają wyglądać." },
            { title: "Sprawdź i pobierz", body: "Zmienione komórki są wyróżnione. Z darmowym kontem zabierasz plik jako Excel lub CSV." },
          ],
        },
        faqs: [
          { q: "Skąd wiecie, czy 03/04/2024 to 3 kwietnia, czy 4 marca?", a: "Z jednej daty nie da się tego rozstrzygnąć. Dlatego pytamy, czy w twoim pliku najpierw jest dzień, czy miesiąc, i podpowiadamy odpowiedź, gdy w kolumnie jest data typu 15/04/2024, którą da się odczytać tylko w jeden sposób." },
          { q: "Czy rozumie daty zapisane słownie?", a: "Tak. „March 5th 2024”, „12 marca 2024” czy „1 Apr 2024” odczytuje AI, a tego formuła w Excelu nie potrafi. Daty liczbowe odczytujemy regułami, bez AI." },
          { q: "Jaki format wybrać?", a: "2024-03-12 (rok, miesiąc, dzień) to format, który każdy system odczyta bez pomyłki i który poprawnie się sortuje. 03/12/2024 to zwyczaj amerykański; 12/03/2024 jest typowy w Europie i Ameryce Łacińskiej." },
          { q: "Co dzieje się z komórkami, które nie są datami?", a: "Zostają bez zmian, tak jak puste komórki. Gdy daty nie da się odczytać z pewnością, zostawiamy ją w oryginalnej postaci, zamiast zgadywać." },
          { q: "A jeśli mój plik Excela już przechowuje je jako daty?", a: "Bierzemy je takimi, jakie są, bez ponownego odczytywania, i zmieniamy tylko format." },
          { q: "Co dzieje się z moim plikiem?", a: "Służy tylko do tej konwersji i jest usuwany po 24 godzinach razem z wynikiem. Wynik widzi tylko twoja przeglądarka." },
          { q: "Jak sprawić, żeby działo się to samo?", a: "W Tavnit ta sama reguła to Cleaner: działa sam na każdym dokumencie, z którego wyciągasz dane, i na każdym pliku, który przychodzi e-mailem lub przez API, obok liczb, walut i kontroli." },
        ],
        clean: {
          setup: {
            heading: "Wybierz kolumny i format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolumny z datami",
            columnsHint: "Maksymalnie {max}. Zaznaczyliśmy te, które wyglądają na daty.",
            tooMany: "Możesz wybrać maksymalnie {max} kolumn naraz.",
            inputLabel: "W twoim pliku daty liczbowe zaczynają się od",
            inputOptions: { dmy: "dnia · 31/12/2024", mdy: "miesiąca · 12/31/2024" },
            outputLabel: "Daty mają wyglądać tak",
            outputOptions: { iso: "2024-03-12 · rok, miesiąc, dzień", dmy: "12/03/2024 · dzień, miesiąc, rok", mdy: "03/12/2024 · miesiąc, dzień, rok" },
            preview: "Pierwsze wiersze",
            run: "Konwertuj",
            change: "Zmień plik",
          },
          stages: ["Wgrywamy plik", "Czytamy kolumny", "Konwertujemy daty", "Czytamy daty zapisane słownie", "Budujemy twój plik"],
          heading: "Gotowe: {file}",
          summary: "Zmieniono {cells} w {cols}",
          cellWord: ["komórkę", "komórek"],
          columnWord: ["kol.", "kol."],
          unchanged: "Żadna komórka nie wymagała zmiany: wszystkie były już w tym formacie.",
          highlight: "Zmienione komórki są zaznaczone na niebiesko.",
          shown: "Widzisz {shown} z {total} wierszy. Plik do pobrania zawiera wszystkie.",
          download: "Pobierz",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Konwertuj inny plik",
          automate: {
            heading: "Niech dzieje się to z każdym plikiem",
            body: "W Tavnit ta reguła to Cleaner. Ustawiasz go raz, a on działa sam na każdej fakturze, umowie czy pliku, który przychodzi, obok liczb, walut i kontroli.",
            cta: "Załóż darmowe konto",
            docs: "Czym jest Cleaner",
          },
        },
      },
    },
    /** Currency converter: a converted column next to each amount column, ECB reference rates. */
    "currency-converter": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Przelicz waluty w Excelu po dzisiejszym kursie za darmo",
        description:
          "Wgraj plik Excel lub CSV z cenami lub kwotami i dostań każdą kolumnę przeliczoną na dolary, euro, funty lub jedną z 30 walut po dziennym kursie referencyjnym. Za darmo, bez rejestracji, żeby zobaczyć wynik.",
        label: "Przelicz walutę",
        h1: "Przelicz kwoty w swoim arkuszu na inną walutę",
        intro:
          "Wgraj plik Excel lub CSV. Wybierz kolumny z kwotami, walutę, w której są, i tę, której potrzebujesz. Tavnit doda obok każdej z nich przeliczoną kolumnę po kursie z danego dnia i odda ci cały plik.",
        trust: ["CSV lub Excel · do 500 wierszy", "{limit} darmowych plików dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj plik Excel lub CSV",
          hint: "albo wybierz plik z komputera",
          choose: "Wybierz plik",
          sample: "Wypróbuj na przykładowym pliku",
          formats: "CSV lub .xlsx · do 4 MB i 500 wierszy",
        },
        errors: {
          unsupported: "Tylko pliki CSV lub Excel (.xlsx).",
          xls: "To stary plik Excela (.xls). Otwórz go w Excelu i zapisz jako .xlsx lub .csv.",
          too_many_rows: "Darmowa wersja obsługuje do 500 wierszy. Wgraj część pliku.",
          too_many_columns: "Wybierz maksymalnie 10 kolumn naraz.",
          no_columns: "Wybierz co najmniej jedną kolumnę.",
          nothing_to_clean: "W tych kolumnach nie znaleźliśmy kwot do przeliczenia.",
          empty: "Plik jest pusty albo nie ma wierszy pod nagłówkiem.",
          unreadable: "Nie udało się odczytać pliku. Jeśli to plik Excela, zapisz go ponownie jako .xlsx.",
          failed: "Nie udało się przeliczyć tego pliku. Spróbuj ponownie albo użyj przykładowego pliku.",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj plik", body: "CSV albo plik Excela z cenami, sumami lub dowolną kolumną kwot." },
            { title: "Wybierz waluty", body: "Zaznaczamy kolumny, które wyglądają na kwoty. Ty mówisz, w jakiej są walucie, jak zapisano w nich miejsca dziesiętne i na co je przeliczyć." },
            { title: "Sprawdź i pobierz", body: "Każda przeliczona kolumna stoi obok oryginalnej. Z darmowym kontem zabierasz plik jako Excel lub CSV." },
          ],
        },
        faqs: [
          { q: "Jakiego kursu używa?", a: "Dziennego kursu referencyjnego publikowanego przez Europejski Bank Centralny. Jest taki sam dla całego pliku i jest kursem referencyjnym, a nie kursem kupna czy sprzedaży twojego banku." },
          { q: "Jakie waluty mogę przeliczać?", a: "Dolar amerykański (USD), euro (EUR), funt (GBP), złoty (PLN), peso meksykańskie (MXN), real (BRL), juan (CNY), dolar kanadyjski, jen, frank szwajcarski i pozostałe waluty publikowane przez Europejski Bank Centralny, łącznie 30. Możesz przeliczać z każdej z nich na każdą." },
          { q: "Czy działa z peso kolumbijskim, solem, peso chilijskim albo balboa?", a: "Jeszcze nie: tych walut nie ma w kursach Europejskiego Banku Centralnego. W Panamie, gdzie balboa ma parytet z dolarem, możesz wybrać USD." },
          { q: "Co dzieje się z moimi oryginalnymi kolumnami?", a: "Zostają bez zmian. Przeliczenie trafia do nowej kolumny obok nich, na przykład „Price (USD)”, żeby łatwo było porównać." },
          { q: "Co dzieje się z komórkami, które nie są kwotami?", a: "W przeliczonej kolumnie zostają puste. Tekst, procent czy pusta komórka nie są przeliczane." },
          { q: "Co dzieje się z moim plikiem?", a: "Służy tylko do tego przeliczenia i jest usuwany po 24 godzinach razem z wynikiem. Wynik widzi tylko twoja przeglądarka." },
          { q: "Jak sprawić, żeby działo się to samo?", a: "W Tavnit przeliczanie walut to Cleaner: działa sam na każdej fakturze, z której wyciągasz dane, i na każdym pliku, który przychodzi e-mailem lub przez API, obok dat, liczb i kontroli." },
        ],
        clean: {
          setup: {
            heading: "Wybierz kolumny i waluty",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolumny z kwotami",
            columnsHint: "Maksymalnie {max}. Zaznaczyliśmy te, które wyglądają na kwoty.",
            tooMany: "Możesz wybrać maksymalnie {max} kolumn naraz.",
            sourceLabel: "Kwoty są w walucie",
            sourceHint: "Waluty z kursem Europejskiego Banku Centralnego.",
            inputLabel: "Separatorem dziesiętnym jest",
            inputOptions: { comma: "przecinek · 1.234,56", dot: "kropka · 1,234.56" },
            outputPopular: "Najczęściej używane",
            outputAll: "Wszystkie waluty",
            outputLabel: "Przelicz na",
            outputOptions: {},
            preview: "Pierwsze wiersze",
            run: "Przelicz",
            change: "Zmień plik",
          },
          stages: ["Wgrywamy plik", "Czytamy kwoty", "Pobieramy dzienny kurs", "Przeliczamy", "Budujemy twój plik"],
          heading: "Gotowe: {file}",
          summary: "Przeliczono {cells} w {cols}",
          cellWord: ["komórkę", "komórek"],
          columnWord: ["kol.", "kol."],
          unchanged: "W tych kolumnach nie znaleźliśmy kwot do przeliczenia.",
          highlight: "Przeliczone kolumny są zaznaczone na niebiesko.",
          shown: "Widzisz {shown} z {total} wierszy. Plik do pobrania zawiera wszystkie.",
          download: "Pobierz",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Przelicz inny plik",
          automate: {
            heading: "Niech dzieje się to z każdą fakturą",
            body: "W Tavnit przeliczanie walut to Cleaner. Ustawiasz go raz, a każda faktura czy oferta w innej walucie przychodzi już przeliczona, obok dat, liczb i kontroli.",
            cta: "Załóż darmowe konto",
            docs: "Czym jest Cleaner",
          },
        },
      },
    },
    /** Translate columns: a translated column next to each chosen text column (200 rows). */
    "translate-columns": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Tłumacz kolumny Excela za darmo",
        description:
          "Wgraj plik Excel lub CSV i przetłumacz wybrane kolumny na ponad 40 języków: angielski, hiszpański, portugalski, chiński i inne. Każde tłumaczenie trafia obok swojej kolumny. Za darmo, bez rejestracji, żeby zobaczyć wynik.",
        label: "Tłumacz kolumny",
        h1: "Przetłumacz kolumny swojego arkusza",
        intro:
          "Wgraj plik Excel lub CSV. Wybierz kolumny do przetłumaczenia i język docelowy. Tavnit wykryje język źródłowy i doda tłumaczenie obok każdej kolumny, nie ruszając reszty pliku.",
        trust: ["CSV lub Excel · do 200 wierszy", "{limit} darmowych plików dziennie", "Wszystko usuwamy po 24 h"],
        drop: {
          title: "Przeciągnij tutaj plik Excel lub CSV",
          hint: "albo wybierz plik z komputera",
          choose: "Wybierz plik",
          sample: "Wypróbuj na przykładowym pliku",
          formats: "CSV lub .xlsx · do 4 MB i 200 wierszy",
        },
        errors: {
          unsupported: "Tylko pliki CSV lub Excel (.xlsx).",
          xls: "To stary plik Excela (.xls). Otwórz go w Excelu i zapisz jako .xlsx lub .csv.",
          too_many_rows: "Darmowe tłumaczenie obsługuje do 200 wierszy. Wgraj część pliku.",
          too_many_columns: "Wybierz maksymalnie 10 kolumn naraz.",
          no_columns: "Wybierz co najmniej jedną kolumnę.",
          nothing_to_clean: "W tych kolumnach nie znaleźliśmy tekstu do przetłumaczenia.",
          empty: "Plik jest pusty albo nie ma wierszy pod nagłówkiem.",
          unreadable: "Nie udało się odczytać pliku. Jeśli to plik Excela, zapisz go ponownie jako .xlsx.",
          failed: "Nie udało się przetłumaczyć tego pliku. Spróbuj ponownie albo użyj przykładowego pliku.",
        },
        how: {
          heading: "Jak to działa",
          steps: [
            { title: "Wgraj plik", body: "CSV albo plik Excela z opisami, instrukcjami, komentarzami lub dowolną kolumną tekstu." },
            { title: "Wybierz kolumny i język", body: "Zaznaczamy kolumny z tekstem. Ty wybierasz język; język źródłowy wykrywamy za ciebie." },
            { title: "Sprawdź i pobierz", body: "Każde tłumaczenie stoi obok oryginalnej kolumny. Z darmowym kontem zabierasz plik jako Excel lub CSV." },
          ],
        },
        faqs: [
          { q: "Jakie języki mogę wybrać?", a: "Ponad 40: angielski, hiszpański, portugalski, francuski, niemiecki, chiński, włoski, japoński, koreański, arabski, rosyjski, hindi, turecki, wietnamski i wiele innych. Język źródłowy wykrywamy komórka po komórce, więc działa to nawet wtedy, gdy w pliku są różne języki." },
          { q: "Co dzieje się z kodami, liczbami i nazwami własnymi?", a: "Zostają zachowane. Tłumaczenie respektuje formatowanie, jednostki i kody; komórka, która już jest w języku docelowym, zostaje bez zmian." },
          { q: "Dlaczego limit to 200 wierszy?", a: "Bo każdą komórkę tłumaczy model językowy. Darmowa wersja obsługuje do 200 wierszy na plik; na koncie nie ma takiego limitu." },
          { q: "Co dzieje się z moimi oryginalnymi kolumnami?", a: "Zostają bez zmian. Tłumaczenie trafia do nowej kolumny obok nich, na przykład „Description (ES)”." },
          { q: "Czy mogę tego używać do opisów towarów w odprawie celnej?", a: "Tak, to częste zastosowanie: przełożenie opisów z faktury handlowej lub listy pakunkowej na angielski albo hiszpański przed klasyfikacją towarów." },
          { q: "Co dzieje się z moim plikiem?", a: "Służy tylko do tego tłumaczenia i jest usuwany po 24 godzinach razem z wynikiem. Wynik widzi tylko twoja przeglądarka." },
          { q: "Jak sprawić, żeby działo się to samo?", a: "W Tavnit tłumaczenie to Cleaner: działa sam na każdym dokumencie, z którego wyciągasz dane, i na każdym pliku, który przychodzi e-mailem lub przez API, obok dat, liczb i walut." },
        ],
        clean: {
          setup: {
            heading: "Wybierz kolumny i język",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolumny z tekstem",
            columnsHint: "Maksymalnie {max}. Zaznaczyliśmy te z tekstem.",
            tooMany: "Możesz wybrać maksymalnie {max} kolumn naraz.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Najczęściej używane",
            outputAll: "Wszystkie języki",
            outputLabel: "Przetłumacz na",
            outputOptions: {},
            preview: "Pierwsze wiersze",
            run: "Przetłumacz",
            change: "Zmień plik",
          },
          stages: ["Wgrywamy plik", "Czytamy kolumny", "Wykrywamy język", "Tłumaczymy", "Budujemy twój plik"],
          heading: "Gotowe: {file}",
          summary: "Przetłumaczono {cells} w {cols}",
          cellWord: ["komórkę", "komórek"],
          columnWord: ["kol.", "kol."],
          unchanged: "W tych kolumnach nie znaleźliśmy tekstu do przetłumaczenia.",
          highlight: "Przetłumaczone kolumny są zaznaczone na niebiesko.",
          shown: "Widzisz {shown} z {total} wierszy. Plik do pobrania zawiera wszystkie.",
          download: "Pobierz",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Przetłumacz inny plik",
          automate: {
            heading: "Niech dzieje się to z każdym dokumentem",
            body: "W Tavnit tłumaczenie to Cleaner. Ustawiasz go raz, a każda faktura, lista pakunkowa czy plik, który przychodzi, ma już przetłumaczone opisy.",
            cta: "Załóż darmowe konto",
            docs: "Czym jest Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Za darmo. Bez szablonów. Pozycje twojej faktury jako arkusz.",
    "invoice-line-items": "Za darmo. Wiersz na pozycję, nagłówek w każdym wierszu. Bez szablonów.",
    "po-invoice-check": "Za darmo. Każda pozycja zamówienia kontra faktura: cena, ilość, braki i nadwyżki.",
    "split-scanned-pdf": "Za darmo. Wgrywasz jeden skan, dostajesz każdy dokument, od razu sklasyfikowany.",
    "packing-list-to-excel": "Za darmo. Bez szablonów. Każda pozycja listy pakunkowej jako arkusz.",
    "bill-of-lading-to-excel": "Za darmo. Bez szablonów. Strony, statek, porty i wiersz na każdy kontener.",
    "quote-comparison": "Za darmo. Dwie lub trzy oferty, jedna tabela, najtańsza opcja w każdej pozycji.",
    "contract-dates": "Za darmo. Strony, okres, automatyczne odnowienie i termin wypowiedzenia w jednym wierszu.",
    "receipt-to-excel": "Za darmo. Zrób zdjęcie paragonu i dostań jego pozycje jako arkusz.",
    "number-format": "Za darmo. Każda kolumna liczb w jednym formacie: 1234.56, 1,234.56 lub 1.234,56.",
    "date-format": "Za darmo. Mieszane daty na wejściu, jeden format na wyjściu, nawet daty zapisane słownie.",
    "currency-converter": "Za darmo. Każda kolumna cen przeliczona po dziennym kursie referencyjnym.",
    "translate-columns": "Za darmo. Każda kolumna tekstu przetłumaczona na jeden z ponad 40 języków.",
  },
};

export default pl;
