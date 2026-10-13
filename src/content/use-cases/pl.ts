import type { UseCasesContent } from "@/content/types";

/** Use cases: the /use-cases hub copy and every use-case page — Polski (pl). Translated from ./en.ts and src/lib/use-cases.ts. */
const pl: UseCasesContent = {
  hub: {
    title: "Zastosowania — faktury, umowy, CV i nie tylko",
    description:
      "Jak zespoły korzystają z Tavnit w zależności od typu dokumentu — faktury, umowy, CV, paragony, zamówienia zakupu i dokumenty celne — wraz z tym, co w każdym z nich najczęściej idzie nie tak.",
    ogTitle: "Zastosowania Tavnit",
    breadcrumbHome: "Strona główna",
    breadcrumb: "Zastosowania",
    h1: "Zastosowania",
    intro:
      "Pipeline jest ten sam, cokolwiek do niego wyślesz — wyciągnij, oczyść, zweryfikuj, działaj. Zmienia się to, które pola mają znaczenie i co zwykle idzie nie tak.",
    introMore:
      "Każda strona poniżej opisuje pola, które warto wyciągać z danego typu dokumentu, elementy, które regularnie sprawiają kłopoty, oraz etap pipeline’u, który robi tam największą różnicę.",
    notSeeingHeading: "Nie widzisz swojego typu dokumentu?",
    notSeeing:
      "To typy, o które zespoły pytają najczęściej, a nie lista tego, co obsługuje Tavnit. Nie trzeba niczego konfigurować pod konkretny typ dokumentu — opisujesz pola, których potrzebujesz, a ta sama ekstrakcja czyta każdy PDF lub obraz, łącznie ze skanami i pismem odręcznym.",
    notSeeingMore:
      "Dowody dostawy, wyciągi bankowe, roszczenia ubezpieczeniowe, formularze medyczne, certyfikaty i wnioski działają dokładnie tak samo. Zacznij od [przewodnika dla początkujących](/docs) i zdefiniuj pola, które są dla Ciebie ważne.",
    finalHeading: "Zacznij od jednego dokumentu",
    finalBody:
      "Zbuduj Flow, przepuść przez niego coś prawdziwego i oceń wynik, zanim cokolwiek podłączysz. Darmowe kredyty na start.",
    finalCta: "Zacznij za darmo",
  },
  items: [
    {
      slug: "invoice-processing",
      label: "Przetwarzanie faktur",
      badge: "Finanse i zobowiązania",
      h1: "Automatyczna ekstrakcja danych z faktur",
      title: "Oprogramowanie do ekstrakcji danych z faktur, z pozycjami",
      description:
        "Wyciągaj dostawcę, numer faktury, daty, sumy i wszystkie pozycje z faktur dostawców w dowolnym układzie, z weryfikacją, zanim cokolwiek trafi do ksiąg.",
      summary:
        "Dostawca, numer, daty, sumy i pozycje wyciągnięte z faktury w dowolnym układzie — z weryfikacją, zanim trafią do ksiąg.",
      lede: "Tavnit czyta faktury dostawców w dowolnym układzie i zwraca dostawcę, numer faktury, daty, podatek, sumy i każdą pozycję jako typowane pola. Bez szablonu dla każdego dostawcy. Nic nie trafia do ksiąg, dopóki weryfikator tego nie zatwierdzi, a każde zatwierdzenie jest rejestrowane.",
      problem: [
        "Zobowiązania wobec dostawców to klasyczna wersja tego problemu: te same osiem pól przepisywanych co miesiąc ze stu różnych układów. Każdy dostawca formatuje fakturę inaczej, niektórzy przysyłają skany, inni zdjęcia skanów, a ci, którzy zmieniają szablon, robią to bez ostrzeżenia.",
        "Narzędzia oparte na szablonach słabo sobie z tym radzą — konfigurujesz układ dla każdego dostawcy, a każdy nowy dostawca to kolejne zadanie. Gdy tylko dostawca przeprojektuje fakturę, szablon po cichu przestaje działać, a błędy spływają do Twoich ksiąg.",
      ],
      fields: [
        { name: "Nazwa i adres dostawcy", note: "Często różni się od nazwy handlowej w Twojej kartotece — Cleaner typu lookup może dopasować ją do listy dostawców." },
        { name: "Numer faktury", note: "Typowany jako tekst, a nie liczba. Wiodące zera i prefiksy mają znaczenie, a parsowanie liczbowe je niszczy." },
        { name: "Data wystawienia i termin płatności", note: "Formaty różnią się w zależności od kraju. Cleaner dat ujednolica DD/MM i MM/DD do jednego formatu." },
        { name: "Pozycje", note: "Powtarzająca się tabela: opis, ilość, cena jednostkowa, wartość. Część, którą większość narzędzi pomija albo spłaszcza." },
        { name: "Suma netto, podatek, rabat, suma brutto", note: "Warto wyciągać wszystkie cztery, żeby arytmetykę dało się sprawdzić, a nie brać na wiarę." },
        { name: "Waluta", note: "Cleaner walut może jednocześnie przeliczyć kwoty na Twoją walutę sprawozdawczą." },
        { name: "Numer zamówienia (PO)", note: "Jeśli występuje, to właśnie on pozwala automatycznie dopasować fakturę do zamówienia zakupu." },
      ],
      gotchas: [
        {
          title: "Ekstrakcja zwykle zawodzi na pozycjach",
          body: "Pola nagłówka są łatwe. Tabela, która przechodzi przez podział strony, ma scalone komórki albo opisy rozbite na dwie linie, to miejsce, gdzie większość narzędzi zwraca coś wiarygodnego i błędnego. Pola tabelaryczne we Flow traktują powtarzające się wiersze jako wiersze, więc faktura z pięcioma pozycjami zwraca pięć rekordów, a nie jeden blok tekstu.",
        },
        {
          title: "Błędna suma wygląda dokładnie jak poprawna",
          body: "Nie ma żadnej wizualnej różnicy między poprawnie odczytanym 1 240,00 € a błędnie odczytanym 1 240,00 €, które w rzeczywistości wynosiło 1 249,00 €. To argument za warunkową weryfikacją: reguła Cleanera może sprawdzić, czy pozycje sumują się do kwoty netto, i kierować do człowieka tylko niezgodności, więc nie musisz przeglądać wszystkiego, żeby wyłapać tych kilka ważnych przypadków.",
        },
        {
          title: "Kilka faktur przychodzi w jednym PDF-ie",
          body: "Zestawienie od dostawcy albo zeskanowana partia często zawiera kilka faktur w jednym pliku. Splitter najpierw je rozdziela, więc każda staje się osobnym przetworzeniem z własnym rekordem, zamiast jednego wymieszanego bałaganu.",
        },
      ],
      pipeline: [
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Dostawcy już wysyłają faktury e-mailem. Ustaw automatyczne przekazywanie ze skrzynki działu zobowiązań, a każdy załącznik zostanie przetworzony bez otwierania aplikacji." },
        { label: "Splitters", href: "/docs/splitters", why: "Rozdziela skany w partiach lub zszyte dokumenty na pojedyncze faktury przed ekstrakcją." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Ujednolica daty, przelicza waluty, dopasowuje dostawców do Twojej listy i oznacza arytmetykę, która się nie zgadza." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Wstrzymuje przetworzenie do zatwierdzenia — każdą fakturę albo tylko te oznaczone przez regułę — z niemodyfikowalnym zapisem tego, kto co zatwierdził." },
        { label: "Webhooki", href: "/docs/webhooks", why: "Wysyła zatwierdzony rekord prosto do Twojego systemu księgowego w chwili, gdy przejdzie weryfikację." },
      ],
      faqs: [
        { q: "Czy obsługuje zeskanowane i sfotografowane faktury?", a: "Tak. Skany, zdjęcia i PDF-y oparte na obrazach przechodzą przez OCR przed ekstrakcją. Jakość nadal ma znaczenie — ostry skan daje bardziej niezawodne wyniki niż zdjęcie telefonem pod kątem — i właśnie dlatego istnieje weryfikacja przypadków granicznych." },
        { q: "Czy muszę konfigurować szablon dla każdego dostawcy?", a: "Nie. Definiujesz potrzebne pola raz, a ten sam Flow czyta faktury od każdego dostawcy w każdym układzie. Dodanie nowego dostawcy nie wymaga żadnej konfiguracji." },
        { q: "Czy wyciąga pozycje, a nie tylko sumy?", a: "Tak. Pozycje definiuje się jako pola tabelaryczne, więc powtarzająca się tabela zwraca jeden rekord na wiersz z osobno typowanym opisem, ilością, ceną jednostkową i wartością." },
        { q: "Jak radzi sobie z różnymi walutami?", a: "Waluta jest wyciągana jako osobne pole, a Cleaner może podczas przetwarzania przeliczyć kwoty na Twoją walutę sprawozdawczą, więc dalsze systemy otrzymują jedną spójną jednostkę." },
      ],
    },
    {
      slug: "contract-analysis",
      label: "Analiza umów",
      badge: "Prawo i zakupy",
      h1: "Ekstrakcja danych z umów",
      title: "Ekstrakcja danych z umów — warunki i daty odnowienia",
      description:
        "Wyciągaj strony, daty wejścia w życie i odnowienia, warunki płatności, okresy wypowiedzenia i limity odpowiedzialności z portfela umów do tabeli, którą naprawdę da się przeszukiwać.",
      summary:
        "Strony, daty odnowienia, okresy wypowiedzenia i warunki płatności wyciągnięte z portfela umów do przeszukiwalnej tabeli.",
      lede: "Tavnit czyta podpisane umowy i zwraca warunki, z których wynikają zobowiązania — strony, daty wejścia w życie i odnowienia, okresy wypowiedzenia, warunki płatności, limity odpowiedzialności — jako uporządkowane pola. Portfel umów staje się tabelą, którą możesz przeszukiwać, a nie folderem, który musisz przeczytać.",
      problem: [
        "Większość organizacji nie potrafi odpowiedzieć na podstawowe pytania o własne umowy. Które umowy odnawiają się automatycznie w przyszłym kwartale? Jaka jest nasza łączna ekspozycja na odpowiedzialność? Którzy dostawcy mają 90-dniowy okres wypowiedzenia? Odpowiedzi istnieją, rozproszone w setkach PDF-ów, których nikt nie ma czasu otworzyć.",
        "Kosztem nie jest czytanie — tylko odnowienia, które przechodzą niezauważone, i warunki odkrywane w trakcie sporu, a nie przed nim.",
      ],
      fields: [
        { name: "Strony i podmioty podpisujące", note: "Podmiot prawny często nie jest nazwą handlową, a warto zapisać obie." },
        { name: "Data wejścia w życie i wygaśnięcia", note: "Para, od której zależy każde pytanie o odnowienie, jakie zechcesz później zadać." },
        { name: "Automatyczne odnowienie i okres wypowiedzenia", note: "Dwa pola, które decydują, czy odnowienie jest wyborem, czy niespodzianką." },
        { name: "Warunki i kwoty płatności", note: "Termin 30 dni, kamienie milowe, klauzule waloryzacyjne. Często opisane prozą, a nie w tabeli." },
        { name: "Limit odpowiedzialności i odszkodowania", note: "Zwykle klauzula, a nie liczba. Warto wyciągać jako tekst plus sparsowaną wartość, jeśli istnieje." },
        { name: "Prawo właściwe i jurysdykcja", note: "Krótkie, łatwe do wyciągnięcia i żmudne do ręcznego wyszukania w całym portfelu." },
        { name: "Prawo do rozwiązania umowy", note: "Bez podania przyczyny, z ważnej przyczyny oraz wymagany w każdym przypadku okres wypowiedzenia." },
      ],
      gotchas: [
        {
          title: "Odpowiedź jest w prozie, a nie w polu",
          body: "Faktura podaje sumę w ramce. Umowa ukrywa okres wypowiedzenia w środku klauzuli, czasem słownie, a nie cyframi. Wskazówki ekstrakcji pozwalają powiedzieć Flow, co oznacza dany warunek i gdzie zwykle się pojawia, zamiast liczyć na to, że etykieta się zgodzi.",
        },
        {
          title: "Aneksy zmieniają odpowiedź",
          body: "Obowiązujące warunki często znajdują się w aneksie, a nie w oryginale. Traktuj każdy dokument jako osobne przetworzenie i zapisuj datę podpisania jako pole, aby aktualny stan był wynikiem zapytania, a nie założenia, który plik jest najnowszy.",
        },
        {
          title: "Błąd jest tu kosztowny, więc weryfikacja nie jest opcjonalna",
          body: "Błędnie odczytana data odnowienia to umowa, z której nie wyszedłeś na czas. To zastosowanie, w którym weryfikacja każdego przetworzenia jest uzasadniona, a niemodyfikowalna ścieżka audytu liczy się tak samo jak ekstrakcja — możesz pokazać, kto i kiedy potwierdził dany warunek.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Wskazówki ekstrakcji mówią AI, co oznacza dany warunek — tutaj ma to znacznie większe znaczenie niż w dokumentach z opisanymi polami." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikacja każdego przetworzenia, z trwałym zapisem tego, kto potwierdził każdy warunek." },
        { label: "Buckets", href: "/docs/buckets", why: "Zamienia portfel w przeszukiwalną tabelę — które umowy odnawiają się w przyszłym kwartale, posortowane według okresu wypowiedzenia." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Ujednolica formaty dat i potrafi wyliczyć termin wypowiedzenia z daty wygaśnięcia i okresu wypowiedzenia." },
      ],
      faqs: [
        { q: "Czy radzi sobie z umowami bez spójnej struktury?", a: "Tak — to normalna sytuacja. Nie ma szablonu do konfigurowania. Opisujesz warunki, których potrzebujesz, a Flow znajduje je, gdziekolwiek się pojawiają — dlatego wskazówki ekstrakcji mają tu większe znaczenie niż w dokumentach ustrukturyzowanych." },
        { q: "A co z aneksami i listami bocznymi?", a: "Przetwarzaj każdy z nich osobno, zapisując datę podpisania jako pole. Aktualny stan wynika wtedy z zapytania do Bucketu, a nie ze zgadywania, który PDF jest najnowszy." },
        { q: "Czy wyciągnięte dane można przeszukiwać?", a: "Tak. Wyniki trafiają do Bucketu jako typowane kolumny, więc możesz filtrować, sortować i tworzyć wykresy dla całego portfela bez eksportowania czegokolwiek." },
      ],
    },
    {
      slug: "resume-screening",
      label: "Selekcja CV",
      badge: "HR i rekrutacja",
      h1: "Parsowanie i selekcja CV",
      title: "Oprogramowanie do parsowania CV — uporządkowane dane kandydatów",
      description:
        "Zamieniaj CV w dowolnym formacie w spójne profile kandydatów — kontakt, umiejętności, stanowiska, daty, wykształcenie — aby selekcja była filtrowaniem, a nie czytaniem.",
      summary:
        "CV w dowolnym formacie zamienione w spójne profile kandydatów, dzięki czemu selekcja staje się filtrowaniem, a nie czytaniem.",
      lede: "Tavnit czyta CV w dowolnym układzie i zwraca spójne profile kandydatów: dane kontaktowe, umiejętności, stanowiska z datami, wykształcenie i certyfikaty. Ponieważ każdy kandydat jest opisany tymi samymi polami, selekcja polega na filtrowaniu tabeli, a nie na otwieraniu dwustu PDF-ów.",
      problem: [
        "CV to najmniej ustandaryzowany dokument, z jakim ma do czynienia większość zespołów. Jedna kolumna albo dwie, tabele albo proza, designerski układ z datami na pasku bocznym. Człowiek przeczyta każde z nich; oprogramowanie zwykle mniej więcej połowę.",
        "Prawdziwym kosztem jest niespójność. Gdy każde ze stu CV jest podsumowane nieco inaczej, porównywanie kandydatów według tych samych kryteriów przestaje być możliwe, a selekcja po cichu sprowadza się do tego, kogo polubił pierwszy weryfikator.",
      ],
      fields: [
        { name: "Imię, nazwisko i dane kontaktowe", note: "Często w nagłówku, na pasku bocznym albo na obrazie — jeden z częstszych błędów ekstrakcji." },
        { name: "Stanowiska z pracodawcami i datami", note: "Powtarzająca się tabela, a nie pojedyncza wartość. Pola tabelaryczne zapisują każde stanowisko jako osobny wiersz." },
        { name: "Łączny staż pracy", note: "Rzadko podawany. Cleaner z formułą może go wyliczyć z dat zatrudnienia, zamiast ufać deklaracji." },
        { name: "Umiejętności", note: "Najlepiej wyciągać dosłownie, a potem ujednolicać — Cleaner kategorii może sprowadzić „JS”, „JavaScript” i „ES6” do jednej wartości." },
        { name: "Wykształcenie i certyfikaty", note: "Uczelnia, kwalifikacja, rok. Kolejna powtarzająca się struktura." },
        { name: "Lokalizacja i prawo do pracy", note: "Często pierwszy twardy filtr i często ukryty w nagłówku." },
      ],
      gotchas: [
        {
          title: "Układy dwukolumnowe psują naiwne czytniki",
          body: "Designerskie CV z paskiem bocznym czytane od góry do dołu to dla prostej ekstrakcji tekstu przemieszany bełkot. Ekstrakcja uwzględniająca układ trzyma pasek boczny i główną kolumnę osobno, dlatego dane kontaktowe z paska bocznego i tak trafiają do właściwego pola.",
        },
        {
          title: "Umiejętności trzeba ujednolicić, inaczej filtr jest bezużyteczny",
          body: "Przy dosłownej ekstrakcji dostajesz „JS”, „JavaScript”, „Javascript (ES6)” i „JAVASCRIPT” jako cztery różne wartości, a filtrowanie po jednej pomija pozostałe. Cleaner kategorii mapuje warianty na kontrolowany słownik, dzięki czemu filtr faktycznie zwraca wszystkich kwalifikujących się kandydatów.",
        },
        {
          title: "To dane osobowe, a zasady są surowsze",
          body: "CV z definicji zawierają dane osobowe, a w wielu jurysdykcjach dane kandydatów podlegają limitom przechowywania i prawu do usunięcia. Widoczność Bucketów i uprawnienia dla poszczególnych użytkowników pozwalają ograniczyć dostęp do profili kandydatów do osób prowadzących rekrutację, zamiast udostępniać je całej organizacji.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Pola tabelaryczne zapisują każde stanowisko i każdą kwalifikację jako osobny wiersz, a nie jeden blok tekstu." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Ujednolica nazwy umiejętności według kontrolowanego słownika i wylicza łączny staż z dat zatrudnienia." },
        { label: "Buckets", href: "/docs/buckets", why: "Profile kandydatów jako filtrowalna tabela, z dostępem nadawanym per Bucket, więc dane aplikujących nie są widoczne dla całej organizacji." },
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Aplikacje przychodzące e-mailem są przetwarzane od razu, razem z załącznikami." },
      ],
      faqs: [
        { q: "Czy radzi sobie z dwukolumnowymi i designerskimi CV?", a: "Tak. Ekstrakcja uwzględnia układ, zamiast czytać surowy tekst od góry do dołu, więc paski boczne i układy wielokolumnowe nie mieszają się w bełkot." },
        { q: "Czy potrafi ujednolicić nazwy umiejętności?", a: "Tak. Wyciągaj dosłownie, a potem użyj Cleanera kategorii, aby zmapować warianty na kontrolowany słownik — wtedy filtrowanie po umiejętności zwraca każdego kandydata, który ją ma." },
        { q: "Jak chronione są dane kandydatów?", a: "Buckets mogą być prywatne zamiast widocznych dla całej organizacji, z uprawnieniami Obserwatora lub Edytora nadawanymi poszczególnym użytkownikom. Profile kandydatów pozostają dostępne tylko dla osób prowadzących rekrutację." },
      ],
    },
    {
      slug: "expense-reports",
      label: "Raporty wydatków",
      badge: "Finanse i pracownicy",
      h1: "Przetwarzanie paragonów i raportów wydatków",
      title: "OCR paragonów i automatyzacja raportów wydatków",
      description:
        "Zamieniaj sfotografowane paragony w skategoryzowane pozycje wydatków — sprzedawca, data, kwota, podatek i kategoria — aby zwrot kosztów był weryfikacją, a nie wprowadzaniem danych.",
      summary:
        "Sfotografowane paragony zamienione w skategoryzowane pozycje wydatków, dzięki czemu zwrot kosztów to weryfikacja, a nie wprowadzanie danych.",
      lede: "Tavnit czyta paragony — także pogniecione i sfotografowane przy słabym świetle — i zwraca sprzedawcę, datę, kwotę, podatek i kategorię jako typowane pola. Wydatki przychodzą skategoryzowane i gotowe do sprawdzenia, więc zatwierdzenie raportu to weryfikacja, a nie przepisywanie.",
      problem: [
        "Rozliczanie wydatków zawodzi na obu końcach. Pracownicy odkładają zgłoszenia, bo wypełnianie formularza jest żmudne, a dział finansów potem przepisuje to, co zgłoszono, bo formularz był wypełniony niespójnie. Zwroty się opóźniają i nikt nie lubi żadnej części tego procesu.",
        "Paragony to też dokumenty najgorszej jakości, jakie przetwarza większość firm: wyblakły papier termiczny, zdjęcia pod kątem, zagięcia, czasem częściowo w innym języku.",
      ],
      fields: [
        { name: "Nazwa sprzedawcy", note: "Często to stylizowane logo, a nie tekst — jedno z trudniejszych pól na paragonie." },
        { name: "Data i godzina transakcji", note: "Godzina ma większe znaczenie, niż się wydaje — przy dietach i wykrywaniu duplikatów." },
        { name: "Suma, podatek i napiwek", note: "Wyodrębnienie podatku ma znaczenie przy jego odzyskiwaniu; wyodrębnienie napiwku — przy zgodności z polityką." },
        { name: "Metoda płatności i cztery ostatnie cyfry karty", note: "To pozwala automatycznie uzgodnić wydatek z wyciągiem z karty." },
        { name: "Kategoria wydatku", note: "Najlepiej, gdy wywnioskuje ją Cleaner kategorii AI na podstawie sprzedawcy i pozycji, zamiast pytać pracownika." },
        { name: "Waluta", note: "Wydatki z podróży przychodzą w walucie, w której je poniesiono; przeliczenie należy do pipeline’u." },
      ],
      gotchas: [
        {
          title: "Jakość paragonów jest naprawdę zła",
          body: "Wyblakły papier termiczny, odblaski, zagięcia i krzywe ujęcia to norma, a nie wyjątek. Ekstrakcja radzi sobie z większością z nich, ale to typ dokumentu, w którym warunkowa weryfikacja jest na swoim miejscu: oznaczaj kwoty o niskiej pewności lub niezgodne z polityką do sprawdzenia przez człowieka, a czyste przepuszczaj.",
        },
        {
          title: "Kategoryzacja to właściwa praca",
          body: "Odczytanie sumy jest łatwe. Zdecydowanie, czy rachunek z restauracji to reprezentacja, czy zespołowy posiłek, to część, która pochłania czas działu finansów. Cleaner kategorii AI przypisuje kategorię na podstawie sprzedawcy i pozycji, więc pracownik nie zgaduje, a finanse poprawiają zamiast klasyfikować.",
        },
        {
          title: "Duplikaty są częste i kosztowne",
          body: "Ten sam paragon zgłoszony dwa razy — raz jako zdjęcie, raz jako PDF od sprzedawcy — to rutynowe źródło nadmiernych zwrotów. Wyciągnięcie sprzedawcy, dokładnej kwoty i znacznika czasu wystarczy, by wykryć to w Buckecie, a nie podczas audytu.",
        },
      ],
      pipeline: [
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Pracownicy przekazują paragony na adres e-mail, zamiast uczyć się aplikacji. Paragony cyfrowe mogą być przekazywane automatycznie od razu po otrzymaniu." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Przypisuje kategorię dzięki AI, przelicza obce waluty i ujednolica nazwy sprzedawców." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikacja warunkowa — do zatwierdzającego trafiają tylko wydatki powyżej progu lub niezgodne z polityką." },
        { label: "Buckets", href: "/docs/buckets", why: "Wydatki jako tabela, którą możesz grupować, wizualizować i sprawdzać pod kątem duplikatów przed wypłatą." },
      ],
      faqs: [
        { q: "Czy przeczyta zdjęcie pogniecionego paragonu?", a: "Zwykle tak. Zdjęcia, wyblakły papier termiczny i zagięte paragony przechodzą przez OCR, choć jakość wyznacza granicę możliwości — dlatego istnieje warunkowa weryfikacja dla przypadków, których pipeline jest najmniej pewny." },
        { q: "Czy wydatki mogą być kategoryzowane automatycznie?", a: "Tak. Cleaner kategorii AI przypisuje kategorię na podstawie sprzedawcy i pozycji, więc dział finansów poprawia sporadyczne przypadki brzegowe, zamiast klasyfikować wszystko." },
        { q: "A co z obcymi walutami w wydatkach z podróży?", a: "Waluta to osobne wyciągane pole, a Cleaner przeliczeń może podczas przetwarzania przeliczyć kwoty na Twoją walutę sprawozdawczą." },
      ],
    },
    {
      slug: "purchase-orders",
      label: "Zamówienia zakupu",
      badge: "Zakupy i zobowiązania",
      h1: "Oprogramowanie do dopasowania zamówień: automatycznie łącz faktury z zamówieniami zakupu",
      title: "Automatyczne dopasowanie faktur do zamówień zakupu (PO)",
      description:
        "Oprogramowanie do dopasowania zamówień: wyciągaj zamówienia zakupu i faktury do tych samych pól, automatycznie paruj pozycje i kieruj do weryfikatora tylko niezgodności.",
      summary:
        "Zamówienia zakupu i faktury wyciągnięte do jednego kształtu, sparowane pozycja po pozycji, a do weryfikatora trafiają tylko niezgodności.",
      lede: "Tavnit czyta zamówienia zakupu i faktury, które po nich przychodzą, wyciąga numer zamówienia, dostawcę, SKU, ilości i ceny jako typowane pola i automatycznie paruje pozycje faktury z pozycjami zamówienia — nawet gdy dostawca opisuje towar inaczej. Dopasowanie na poziomie nagłówka to wyszukanie po numerze zamówienia; dopasowanie na poziomie pozycji to porównanie w Matcherze; wszystko, co się nie zgadza, trafia do wskazanego weryfikatora, a nie do Twoich ksiąg.",
      problem: [
        "Dopasowanie do zamówienia to kontrola, czy zafakturowano to, co zamówiono. W większości zespołów wciąż robi się ją na oko: księgowy otwiera PDF faktury, odszukuje zamówienie i porównuje ilości i ceny pozycja po pozycji. To powolne i właśnie tu prześlizgują się dwa kosztowne błędy — zła ilość i zła cena jednostkowa — bo wyglądają dokładnie jak poprawne.",
        "Narzędzia do automatycznego dopasowania w systemach ERP zakładają, że oba dokumenty są już ustrukturyzowane. Nie są. Zamówienie pochodzi z Twojego systemu, ale faktura z systemu dostawcy, jako PDF, z jego numerami części i jego układem. Sprowadzenie jej do porównywalnej postaci to nierozwiązana połowa problemu — i to właśnie tę połowę rozwiązuje Tavnit.",
      ],
      fields: [
        { name: "Numer zamówienia (PO)", note: "Klucz, po którym wszystko się łączy. Wyciągaj go jako tekst — prefiksy i wiodące zera mają znaczenie, a dostawcy umieszczają go w różnych miejscach faktury." },
        { name: "Dostawca i nabywca", note: "Nazwa dostawcy na fakturze rzadko dosłownie zgadza się z rekordem w kartotece. Cleaner typu lookup przypisuje ją do Twojego identyfikatora dostawcy." },
        { name: "Pozycje: opis, SKU, ilość", note: "Powtarzająca się tabela w obu dokumentach. Numery części dostawcy zwykle różnią się od Twoich, a opisy — sformułowaniami. To właśnie utrudnia dopasowanie pozycji." },
        { name: "Cena jednostkowa i wartość pozycji", note: "Obie, aby można było sprawdzić cenę jednostkową × ilość na samej fakturze, zanim zostanie porównana z zamówieniem." },
        { name: "Sumy faktury i zamówienia", note: "Dopasowanie na poziomie nagłówka. Suma, która się zgadza, gdy pozycja się nie zgadza, oznacza zamianę ilości z ceną — przypadek, którego nie wyłapie kontrola samej sumy." },
        { name: "Data dostawy i numer dowodu dostawy", note: "Trzeci dokument w dopasowaniu trójstronnym. Dowody dostawy wyciąga się tak samo; zobacz stronę o dowodach dostawy." },
        { name: "Warunki płatności i waluta", note: "Krótkie pola o ogromnych konsekwencjach, gdy faktura nie zgadza się z zamówieniem." },
      ],
      gotchas: [
        {
          title: "Dwu- czy trójstronne: dopasowanie działa tylko wtedy, gdy kształty się zgadzają",
          body: "Dopasowanie dwustronne porównuje fakturę z zamówieniem; trójstronne dodaje dokument przyjęcia towaru. Oba się rozpadają, gdy dokumenty są wyciągane do różnych nazw pól. Przepuszczanie zamówień, faktur i dowodów dostawy przez Flows o wspólnym schemacie pól — numer zamówienia, SKU, ilość, cena jednostkowa — zamienia dopasowanie w porównanie, a nie lekturę dokumentów.",
        },
        {
          title: "Numery części dostawcy to nie Twoje numery części",
          body: "Zamówienie zawiera Twoje SKU; faktura — numery dostawcy. Cleaner typu lookup mapuje podczas przetwarzania numery części dostawcy na Twoje SKU na podstawie danych referencyjnych, więc faktura przychodzi już przetłumaczona. Gdy brakuje danych referencyjnych, Matcher paruje pozycje według znaczenia opisu — semantycznie, a nie dosłownie — z rozstrzygnięciem przez LLM w przypadkach granicznych.",
        },
        {
          title: "Dopasowanie na poziomie pozycji, nie tylko sum",
          body: "Ustaw przetworzone zamówienie jako punkt odniesienia, a fakturę jako przetworzenie z nim porównywane. Matcher paruje każdą pozycję faktury z pozycją zamówienia i zestawia obok siebie ilość i cenę jednostkową, a niedopasowane pozycje wymienia jako ostrzeżenia, zamiast je po cichu pomijać. Kontrola samej sumy przepuściłaby fakturę, która naliczyła właściwą kwotę za niewłaściwe towary.",
        },
        {
          title: "Do człowieka powinny trafiać tylko wyjątki",
          body: "Weryfikacja każdej faktury odtwarza proces ręczny. Cleaner z formułą sprawdza na samej fakturze, czy cena jednostkowa × ilość równa się wartości pozycji, a warunek oznacza pozycje poza tolerancją. Weryfikacja ręczna uruchamia się tylko dla oznaczonych przetworzeń, więc weryfikator widzi trzy faktury, które się nie zgadzają, a nie trzysta, które pasują.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Dostawcy wysyłają zamówienia, faktury i dowody dostawy na jeden adres. Collection klasyfikuje każdy dokument i kieruje go do właściwego Flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Mapuje numery części i nazwy dostawców na Twoje dane referencyjne, sprawdza arytmetykę pozycji i oznacza wartości poza tolerancją." },
        { label: "Buckets", href: "/docs/buckets", why: "Przechowuje zamówienia i faktury w tym samym kształcie, więc dopasowanie na poziomie nagłówka to zapytanie po numerze zamówienia." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Tylko oznaczone faktury czekają na wskazanego weryfikatora, z niemodyfikowalną ścieżką audytu tego, kto co zatwierdził." },
        { label: "Integracja API", href: "/docs/api-integration", why: "Przesyła dopasowane, zatwierdzone faktury do Twojego ERP lub systemu zobowiązań bez ręcznego kroku." },
      ],
      faqs: [
        { q: "Czym jest dopasowanie do zamówienia?", a: "Dopasowanie do zamówienia (PO matching) to kontrola, czy faktura zgadza się z zamówieniem zakupu, którego dotyczy — ten sam dostawca, te same towary, te same ilości i ceny. Dopasowanie dwustronne porównuje fakturę z zamówieniem; trójstronne sprawdza też dokument przyjęcia towaru. To kontrola, która chroni przed zapłaceniem dostawcy za coś, czego nie zamówiono lub nie dostarczono." },
        { q: "Czy Tavnit może automatycznie dopasowywać faktury do zamówień zakupu?", a: "Tak. Wyciągnij oba dokumenty do tej samej struktury pól, a dopasowanie na poziomie nagłówka staje się zapytaniem po numerze zamówienia w Twoim Buckecie. Przy dopasowaniu na poziomie pozycji Matcher w trybie punktu odniesienia traktuje zamówienie jako bazę i paruje z nim każdą pozycję faktury, pokazując obok siebie ilość i cenę jednostkową. Pozycje, których nie da się sparować, są wymieniane jako ostrzeżenia." },
        { q: "Co jeśli dostawca używa własnych numerów części lub opisów?", a: "Jeśli masz dane referencyjne, Cleaner typu lookup mapuje podczas przetwarzania numery części dostawcy na Twoje SKU. Jeśli nie, Matcher paruje pozycje według znaczenia opisu, a nie dokładnego tekstu, z rozstrzygnięciem przez LLM w przypadkach granicznych, więc „Niebieski widget 10 szt.” i „WIDGET-BLU x10” trafiają do tego samego wiersza." },
        { q: "Co się dzieje, gdy faktura się nie zgadza?", a: "Zatrzymuje się. Cleaner z warunkiem oznacza przetworzenie, a weryfikacja ręczna kieruje je do wskazanego weryfikatora, który widzi fakturę, wyciągnięte wartości i niezgodność. Zgodne faktury przechodzą prosto do ERP przez API lub webhook. Każde wyświetlenie, edycja i zatwierdzenie trafia do niemodyfikowalnej ścieżki audytu." },
        { q: "Czy obsługuje dopasowanie trójstronne z dowodami dostawy?", a: "Dowody dostawy i dokumenty przyjęcia towaru są wyciągane tak samo jak zamówienia i faktury — łącznie z odręcznie wpisanymi ilościami na podpisanych potwierdzeniach odbioru — do tego samego kształtu pól, więc trzecia noga dopasowania to trzecie przetworzenie porównywane z zamówieniem." },
        { q: "Czy musimy zmieniać ERP?", a: "Nie. Tavnit działa przed nim: dokumenty przychodzą e-mailem lub przez API, są wyciągane i dopasowywane, a zatwierdzone wyniki trafiają do Twojego ERP lub systemu zobowiązań przez REST API lub webhook. Dla zespołów, które wolą nie pisać kodu, są gotowe przepisy dla Zapier, Make i n8n." },
        { q: "Czy pozycje są przekazywane osobno?", a: "Tak. Pozycje to pola tabelaryczne, więc każdy wiersz zwraca SKU, opis, ilość, cenę jednostkową i wartość jako osobne typowane wartości — dopiero to umożliwia porównanie na poziomie pozycji." },
      ],
    },
    {
      slug: "customs-trade",
      label: "Cło i handel",
      badge: "Logistyka i handel",
      h1: "Automatyzacja dokumentów celnych",
      title: "Automatyzacja celna z klasyfikacją kodów HS",
      description:
        "Wyciągaj dane z faktur handlowych, list pakunkowych i konosamentów oraz klasyfikuj towary według kodów taryfowych HS w trakcie przetwarzania, a nie po nim.",
      summary:
        "Faktury handlowe, listy pakunkowe i konosamenty wyciągnięte — z klasyfikacją taryfową HS wbudowaną w pipeline.",
      lede: "Tavnit czyta dokumenty celne — faktury handlowe, listy pakunkowe, konosamenty, świadectwa pochodzenia — i zwraca nadawcę, odbiorcę, opisy towarów, wagi i wartości jako typowane pola. Cleaner kodów HS klasyfikuje towary według kodów taryfowych w trakcie przetwarzania, więc zgłoszenia przygotowuje się z uporządkowanych danych, a nie przez przepisywanie.",
      problem: [
        "Jedna przesyłka generuje stos dokumentów, które powtarzają te same fakty w różnych układach, a zgłoszenie celne wymaga, by były uzgodnione i poprawne. Praca to przepisywanie plus klasyfikacja, wykonywane pod presją czasu, a błąd oznacza opóźnioną przesyłkę albo karę.",
        "Klasyfikacja to część specjalistyczna. Ustalenie kodu taryfowego dla danego opisu wymaga osądu, a większość narzędzi do ekstrakcji w ogóle się tego nie podejmuje — zostaje to ręcznym krokiem po zakończeniu automatyzacji.",
      ],
      fields: [
        { name: "Nadawca i odbiorca", note: "Pełne nazwy prawne i adresy, od których zależy zgłoszenie." },
        { name: "Opis towaru w każdej pozycji", note: "Tekst, z którego wynika klasyfikacja taryfowa — warto wyciągać go dosłownie." },
        { name: "Kod taryfowy HS", note: "Klasyfikowany na podstawie opisu przez Cleaner w trakcie przetwarzania, a nie wyszukiwany później." },
        { name: "Ilość, waga netto i brutto", note: "Wagi są na liście pakunkowej, a wartości na fakturze, więc tę parę trzeba uzgodnić." },
        { name: "Kraj pochodzenia", note: "Wpływa na stawki celne i preferencje. Często podawany dla każdej pozycji, a nie całej przesyłki." },
        { name: "Incoterms i wartość deklarowana", note: "Określa, co podlega cłu i kto za co odpowiada." },
        { name: "Numery kontenerów i konosamentu", note: "Klucze, które pozwalają powiązać zestaw dokumentów z jedną przesyłką." },
      ],
      gotchas: [
        {
          title: "Klasyfikacja to najtrudniejsza część — i jest wbudowana",
          body: "Większość narzędzi do dokumentów kończy na ekstrakcji, a klasyfikację taryfową zostawia jako pracę ręczną. Tavnit oferuje Cleaner kodów HS, który klasyfikuje towary na podstawie wyciągniętego opisu w trakcie przetwarzania, więc specjalistyczny krok odbywa się wewnątrz pipeline’u, a nie po nim.",
        },
        {
          title: "Jedna przesyłka, kilka dokumentów, jedna prawda",
          body: "Faktura handlowa zawiera wartości, lista pakunkowa — wagi, konosament — kontener. Collection kieruje każdy typ dokumentu do osobnego Flow, a wspólny Bucket z kluczem w postaci numeru przesyłki składa je w jeden obraz.",
        },
        {
          title: "Błędy oznaczają tu kary, a nie korekty",
          body: "Błędnie zadeklarowany kod lub wartość to sprawa celna, a nie księgowa. To zastosowanie, w którym weryfikacja każdego zgłoszenia jest uzasadniona, a niemodyfikowalna ścieżka audytu naprawdę się przydaje, gdy trzeba pokazać, jak doszło do danej klasyfikacji.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Automatycznie kieruje faktury, listy pakunkowe i konosamenty z jednej skrzynki do właściwego Flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Klasyfikuje towary według kodów taryfowych HS, przelicza waluty i ujednolica wagi i jednostki." },
        { label: "Splitters", href: "/docs/splitters", why: "Dokumenty przesyłki zwykle przychodzą jako jeden połączony PDF. Splitter rozdziela go przed ekstrakcją." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikuj każde zgłoszenie przed złożeniem, z zapisem tego, kto zatwierdził którą klasyfikację." },
      ],
      faqs: [
        { q: "Czy naprawdę przypisuje kody taryfowe HS?", a: "Tak. Cleaner kodów HS klasyfikuje towary na podstawie wyciągniętego opisu w trakcie przetwarzania, więc klasyfikacja odbywa się wewnątrz pipeline’u, a nie jako ręczny krok później. Za zgłoszenia nadal odpowiadasz Ty, dlatego zalecamy weryfikację przed złożeniem." },
        { q: "Czy obsłuży pełny zestaw dokumentów przesyłki?", a: "Tak. Collection kieruje faktury handlowe, listy pakunkowe i konosamenty do osobnych Flows, a wyniki powiązane numerem przesyłki składają się w jeden rekord." },
        { q: "Co jeśli dokumenty przychodzą jako jeden połączony PDF?", a: "Splitter najpierw rozdziela połączony plik na poszczególne dokumenty, więc każdy z nich jest wyciągany przez Flow zbudowany specjalnie dla niego." },
      ],
    },
    {
      slug: "bank-statements",
      label: "Wyciągi bankowe",
      badge: "Finanse i kredyty",
      h1: "Ekstrakcja danych z wyciągów bankowych",
      title: "Ekstrakcja wyciągów bankowych — z PDF do wierszy transakcji",
      description:
        "Zamieniaj PDF-y wyciągów z dowolnego banku w wiersze transakcji — data, opis, kwota, saldo bieżące — gotowe do uzgodnienia lub oceny.",
      summary: "PDF-y wyciągów z dowolnego banku zamienione w wiersze transakcji, które możesz uzgadniać, kategoryzować lub oceniać.",
      lede: "Tavnit czyta PDF-y wyciągów bankowych z dowolnej instytucji i zwraca każdą transakcję jako wiersz: data, opis, obciążenie lub uznanie oraz saldo bieżące. Ponieważ saldo też jest wyciągane, arytmetykę można sprawdzić, a nie zakładać — i właśnie dlatego wynik nadaje się do bezpiecznego uzgadniania.",
      problem: [
        "Każdy bank formatuje wyciągi inaczej i żaden nie robi tego z myślą o maszynach. Kolumny się przesuwają, transakcje zawijają się na dwie linie, a saldo bieżące to jedyne, co spina całą sekwencję. Każdy, kto ocenia zdolność kredytową, prowadzi księgowość lub uzgadnia salda, kończy na przepisywaniu albo płaceniu za konektor do każdego banku.",
        "Open banking rozwiązuje ten problem tam, gdzie jest dostępny i klient wyraził zgodę. W pozostałych przypadkach — okresy historyczne, rachunki firmowe, banki bez API, wyciągi dostarczane jako dowód — PDF jest jedynym dostępnym źródłem.",
      ],
      fields: [
        { name: "Posiadacz rachunku, numer rachunku i kod banku", note: "Zwykle tylko na pierwszej stronie, więc trzeba je przenieść na cały wielostronicowy wyciąg." },
        { name: "Okres wyciągu", note: "Określa, co oznaczają sumy, i najczęściej jest pomijany przy ręcznym przepisywaniu." },
        { name: "Data transakcji", note: "Często skrócona, bez roku — rok wynika z okresu wyciągu, a nie z wiersza." },
        { name: "Opis lub kontrahent", note: "Skrócony i ucięty przez bank. Cleaner kategorii wnioskuje z niego sprzedawcę i typ transakcji." },
        { name: "Obciążenie, uznanie i saldo bieżące", note: "Wyciągaj wszystkie trzy. Saldo pozwala sprawdzić, czy nie zgubiono żadnych wierszy." },
        { name: "Saldo początkowe i końcowe", note: "Suma kontrolna całego wyciągu." },
      ],
      gotchas: [
        {
          title: "Bez salda zgubiony wiersz jest niewidoczny",
          body: "Jeśli ekstrakcja pominie jedną transakcję, pozostałe wiersze nadal wyglądają zupełnie wiarygodnie. Wyciągnięcie salda bieżącego zamienia to w wykrywalny błąd: Cleaner z formułą może sprawdzić, czy saldo w każdym wierszu równa się poprzedniemu saldu plus operacja, i oznaczyć wyciąg, zamiast go przepuścić.",
        },
        {
          title: "Transakcje się zawijają, a zawinięte linie to nie nowe transakcje",
          body: "Długie nazwy kontrahentów przechodzą do drugiej linii, a naiwne czytanie tabeli zamienia jedną płatność w dwa wiersze, z których jeden nie ma kwoty. Pola tabelaryczne traktują wiersz jako wiersz, więc zawinięty opis pozostaje przy swojej kwocie.",
        },
        {
          title: "Daty rzadko zawierają rok",
          body: "Większość wyciągów drukuje „14 mar” i polega na okresie podanym u góry, jeśli chodzi o rok. Dla człowieka to wystarczy, dla bazy danych — nie, zwłaszcza na przełomie roku w styczniowym wyciągu. Wyciągnij okres wyciągu i wylicz z niego pełną datę Cleanerem z formułą.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Transakcje to pola tabelaryczne, więc każda wraca jako osobny typowany wiersz, a nie blok tekstu." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Wylicza pełne daty z okresu wyciągu, sprawdza salda bieżące i kategoryzuje kontrahentów." },
        { label: "Buckets", href: "/docs/buckets", why: "Transakcje trafiają do przeszukiwalnej tabeli — filtruj po kontrahencie, grupuj po miesiącach, rysuj wykres salda." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Kieruje do człowieka tylko wyciągi, które nie przeszły kontroli salda, zamiast weryfikować wszystkie." },
      ],
      faqs: [
        { q: "Czy działa z każdym bankiem?", a: "Tak. Nie ma szablonu do konfigurowania dla poszczególnych banków — ten sam Flow czyta wyciągi z każdej instytucji, w tym rachunki firmowe i okresy historyczne, których nie obejmie API open bankingu." },
        { q: "Skąd mam wiedzieć, że żadna transakcja nie została pominięta?", a: "Wyciągaj saldo bieżące razem z każdą transakcją, a potem Cleanerem z formułą sprawdzaj, czy każdy wiersz uzgadnia się z poprzednim. Wyciąg, który nie przejdzie kontroli, zostaje oznaczony, zamiast po cichu przejść dalej." },
        { q: "Czy transakcje mogą być kategoryzowane automatycznie?", a: "Tak. Cleaner kategorii AI przypisuje kategorię na podstawie opisu, więc księgowość zaczyna od sklasyfikowanych wierszy, a nie od surowego tekstu z banku." },
      ],
    },
    {
      slug: "supplier-quotes",
      label: "Oferty dostawców",
      badge: "Zakupy i sourcing",
      h1: "Porównywanie ofert dostawców",
      title: "Porównuj oferty dostawców i ceny referencyjne",
      description:
        "Wyciągaj pozycje z konkurencyjnych ofert i porównuj je automatycznie — dopasowując równoważne towary u różnych dostawców i wskazując najlepszą cenę dla każdej pozycji.",
      summary: "Konkurencyjne oferty wyciągnięte i porównane pozycja po pozycji, z najlepszą ceną wskazaną dla każdego towaru.",
      lede: "Tavnit wyciąga pozycje z konkurencyjnych ofert dostawców, a następnie Matchers parują równoważne towary u różnych dostawców i wskazują zwycięzcę cenowego dla każdej pozycji. Dostajesz tabelę porównawczą zamiast trzech PDF-ów i ręcznie zbudowanego arkusza.",
      problem: [
        "Porównywanie ofert to część sourcingu, która nigdy nie staje się łatwiejsza. Trzech dostawców przysyła trzy układy, opisuje ten sam towar na trzy sposoby i podaje różne wielkości opakowań. Ktoś buduje arkusz, przepisuje wszystko i ma nadzieję, że dopasował właściwe wiersze.",
        "Prawdziwą trudnością jest dopasowanie. „Śruba sześciokątna M8 50 mm”, „Śruba, sześciokątna, M8x50” i „ŚRUBA SZEŚCIOKĄTNA M8 50MM ocynk” to ten sam towar, a żadne dokładne wyszukiwanie nigdy ich nie sparuje.",
      ],
      fields: [
        { name: "Tożsamość dostawcy", note: "Pole, które identyfikuje każdego uczestnika porównania. Jedna oferta, jeden dostawca." },
        { name: "Opis towaru", note: "Tekst dopasowywany między dostawcami. Wyciągaj go dosłownie — zbyt wczesne ujednolicanie niszczy sygnał, którego potrzebuje dopasowanie." },
        { name: "Cena jednostkowa", note: "Pole liczbowe, na podstawie którego wybierany jest zwycięzca. Wartości nieliczbowe, takie jak „cena na zapytanie”, są wykluczane i raportowane, a nie po cichu ignorowane." },
        { name: "Ilość i jednostka miary", note: "Używane jako kontekst dopasowania, aby opakowanie 12 sztuk nie zostało sparowane z pojedynczą sztuką." },
        { name: "Czas realizacji", note: "Często czynnik decydujący, gdy ceny są zbliżone, i rzadko uwzględniany w ręcznych porównaniach." },
        { name: "Termin ważności i warunki płatności", note: "Tańsza oferta z gorszymi warunkami nie zawsze jest tańsza." },
      ],
      gotchas: [
        {
          title: "Ten sam towar nigdy nie jest opisany dwa razy tak samo",
          body: "Dlatego dokładne dopasowanie zawodzi i dlatego porównywanie niemal wszędzie pozostaje ręczne. Matchers parują wiersze semantycznie, a nie przez równość ciągów znaków, z rozstrzygnięciem przez LLM w niejednoznacznych parach, więc różnie sformułowane opisy tego samego towaru i tak trafiają obok siebie.",
        },
        {
          title: "Wielkość opakowania po cichu psuje porównanie",
          body: "Oferta na karton 12 sztuk zestawiona z ofertą na jedną sztukę to nie różnica cen, tylko błąd jednostek — i to błąd, który przechodzi weryfikację, bo obie liczby wyglądają rozsądnie. Pola kontekstowe pozwalają uwzględnić w dopasowaniu ilość i jednostkę miary, więc różne towary pozostają niesparowane, zamiast wyłaniać błędnego zwycięzcę.",
        },
        {
          title: "Nie każda pozycja ma porównywalną cenę",
          body: "Oferty zawierają „cena na zapytanie”, „w cenie” i puste komórki. Zamiast po cichu usuwać takie wiersze, porównanie wyklucza je z rywalizacji i zapisuje przy wierszu ostrzeżenie, dzięki czemu widzisz, czego nie porównano, zamiast zakładać, że porównano wszystko.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Jeden Flow czyta układ oferty każdego dostawcy do tej samej struktury pól — to warunek wstępny, by w ogóle je porównać." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Przelicza waluty, aby oferty w różnych walutach były porównywane na tej samej podstawie." },
        { label: "Buckets", href: "/docs/buckets", why: "Przechowuje oferty w czasie, więc dzisiejszą cenę można porównać z tym, co ten sam dostawca zaoferował w zeszłym kwartale." },
      ],
      faqs: [
        { q: "Jak dopasowuje towary opisane inaczej przez każdego dostawcę?", a: "Dopasowanie jest semantyczne, a nie dokładne: opisy towarów są porównywane według znaczenia, a niejednoznaczne pary rozstrzyga LLM. „Śruba sześciokątna M8 50 mm” i „Śruba, sześciokątna, M8x50” łączą się w parę bez utrzymywania listy synonimów." },
        { q: "Czy mogę porównywać z jednym dostawcą zamiast ze wszystkimi?", a: "Tak. Tryb punktu odniesienia traktuje jedną ofertę jako bazę i porównuje z nią wszystkie pozostałe — to właściwe podejście, gdy masz obecnego dostawcę i sprawdzasz rynek." },
        { q: "Co dzieje się z pozycjami, których nie da się porównać?", a: "Wiersze z cenami nieliczbowymi są wykluczane z rywalizacji i zapisywane jako ostrzeżenia przy danym wierszu, więc luki w porównaniu są widoczne, a nie ukryte." },
      ],
    },
    {
      slug: "compliance-checks",
      label: "Kontrole zgodności",
      badge: "Zgodność i ryzyko",
      h1: "Kontrole zgodności dokumentów",
      title: "Automatyczne listy kontrolne zgodności dokumentów",
      description:
        "Sprawdzaj zestaw dokumentów według rozgałęzionej listy kontrolnej — czy wszystko jest obecne, spójne i zgodne z polityką — i twórz raport, który możesz przekazać audytorowi.",
      summary: "Zestaw dokumentów sprawdzony według rozgałęzionej listy kontrolnej, z raportem zaliczone/niezaliczone gotowym do audytu.",
      lede: "Inspector w Tavnit sprawdza zestaw dokumentów według zdefiniowanej przez Ciebie listy kontrolnej. Przypisuje każdy wgrany plik do oczekiwanego miejsca, wyciąga to, czego potrzebują reguły, i ocenia listę kontrolną w sposób deterministyczny — więc te same dowody zawsze dają ten sam werdykt, z dołączonym raportem.",
      problem: [
        "Kontrola zgodności to zwykle osoba z listą kontrolną i folderem, która potwierdza, że są właściwe dokumenty, że wartości się w nich zgadzają i że nic nie wygasło. To powolne, niespójne między weryfikatorami, a dowodem, dlaczego coś przeszło, jest to, co ta osoba zapamiętała.",
        "Problemem zwykle nie jest brakujący dokument. Jest nim wartość, która różni się między dwoma dokumentami, których nikt nie porównał obok siebie.",
      ],
      fields: [
        { name: "Oczekiwane miejsca na dokumenty", note: "Co powinien zawierać zestaw. Brak wymaganego dokumentu to samo w sobie ustalenie, a nie tylko luka." },
        { name: "Pola tożsamości i podmiotu", note: "Wartości, które muszą zgadzać się między dokumentami — nazwy, numery rejestrowe, adresy." },
        { name: "Daty i ważność", note: "Certyfikaty i licencje wygasają. To, czy coś jest ważne, to reguła, a nie pole." },
        { name: "Kwoty i wartości deklarowane", note: "Tu mieszczą się kontrole spójności między dokumentami: czy wartość faktury zgadza się z deklaracją?" },
        { name: "Obecność podpisów i pieczęci", note: "Obecność, a nie treść — jedna z częstszych kontroli ręcznych." },
        { name: "Wynik dla każdego punktu listy", note: "Zaliczone, niezaliczone albo nie dotyczy, dla każdej reguły, wraz z wartością, która o tym zdecydowała." },
      ],
      gotchas: [
        {
          title: "Prawdziwa kontrola odbywa się między dokumentami, a nie w jednym",
          body: "Każde narzędzie odczyta wartość z certyfikatu. Ważne ustalenie to fakt, że wartość na certyfikacie różni się od tej na fakturze. Ponieważ inspekcja zbiera cały zestaw przed oceną, reguły listy kontrolnej mogą porównywać dokumenty między sobą, a nie tylko sprawdzać każdy z osobna.",
        },
        {
          title: "Listy kontrolne się rozgałęziają, a płaskie ukrywają luki",
          body: "To, czy reguła ma zastosowanie, zwykle zależy od wcześniejszej odpowiedzi — jeśli towary podlegają ograniczeniom, wymagana jest licencja. Rozgałęziona lista kontrolna wyraża to wprost, więc inspekcja prosi o licencję tylko wtedy, gdy jest naprawdę potrzebna, i nie oznacza jej po cichu jako „nie dotyczy”.",
        },
        {
          title: "Audytor pyta, jak zdecydowałeś, a nie co zdecydowałeś",
          body: "Ocena jest deterministyczna — te same dokumenty dają ten sam wynik, zamiast za każdym razem nowego osądu — a wynik jest zapisywany w raporcie. W połączeniu z weryfikacją możesz pokazać, które wartości wyciągnięto, które reguły zadziałały i kto zatwierdził wynik.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Mieszane dowody trafiające w jedno miejsce są klasyfikowane i kierowane do właściwego Flow, zanim zacznie się jakakolwiek kontrola." },
        { label: "Flows", href: "/docs/flows", why: "Każdy typ dokumentu ma własny Flow, więc reguła może odwoływać się do nazwanego pola, zamiast przeszukiwać wolny tekst." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikator zatwierdza inspekcję, a niemodyfikowalna ścieżka zapisuje, kto zaakceptował które ustalenie." },
        { label: "Buckets", href: "/docs/buckets", why: "Wyniki w czasie można raportować — ile zestawów nie przeszło, na której regule, w którym miesiącu." },
      ],
      faqs: [
        { q: "Czy może porównywać wartości między różnymi dokumentami?", a: "Tak — o to właśnie chodzi. Inspekcja zbiera cały zestaw dokumentów przed oceną, więc reguły mogą sprawdzić, czy wartość w jednym dokumencie zgadza się z wartością w innym, a nie tylko walidować każdy z osobna." },
        { q: "Czy wynik jest powtarzalny?", a: "Ocena listy kontrolnej jest deterministyczna. Te same dokumenty i ta sama lista kontrolna dają ten sam wynik — dzięki temu da się go obronić, gdy ktoś zapyta, dlaczego zestaw przeszedł." },
        { q: "Co jeśli brakuje wymaganego dokumentu?", a: "Brak wymaganego dokumentu to samo w sobie ustalenie. Inspekcja go raportuje, zamiast kończyć się z luką, a pliki wgrane bez wskazania miejsca są przypisywane automatycznie lub oznaczane jako niedopasowane." },
      ],
    },
    {
      slug: "form-filling",
      label: "Wypełnianie formularzy",
      badge: "Operacje i handel",
      h1: "Automatyczne wypełnianie formularzy PDF",
      title: "Wypełniaj formularze PDF danymi wyciągniętymi z dokumentów",
      description:
        "Automatycznie wypełniaj oficjalne formularze PDF danymi wyciągniętymi z kilku dokumentów źródłowych, z zatwierdzeniem, zanim cokolwiek zostanie wydane.",
      summary: "Oficjalne formularze PDF wypełniane automatycznie danymi rozproszonymi w kilku dokumentach źródłowych.",
      lede: "Tavnit wypełnia edytowalne formularze PDF danymi wyciągniętymi jednocześnie z kilku dokumentów źródłowych. Zgłoszenie można uzupełnić na podstawie faktury, listy pakunkowej i konosamentu za jednym razem, a człowiek zatwierdza wartości, zanim wypełniony PDF zostanie wydany.",
      problem: [
        "Zaskakująco dużo pracy biurowej polega na kopiowaniu wartości z otrzymanych dokumentów do formularza, którego wymaga ktoś inny. Zgłoszenia celne, formularze ubezpieczeniowe, wnioski o dotacje, sprawozdania dla regulatorów — informacje już istnieją, rozproszone w trzech czy czterech PDF-ach, a człowiek przenosi je ręcznie.",
        "To także miejsce, gdzie błędy są najmniej wybaczalne. Pomyłka przy przepisywaniu w formularzu dla urzędu oznacza odrzucenie albo karę, a nie wewnętrzną korektę.",
      ],
      fields: [
        { name: "Zestaw dokumentów źródłowych", note: "Jedno miejsce na każdy Flow źródłowy. Formularz wypełnia się, gdy każde wymagane miejsce ma zakończone przetworzenie." },
        { name: "Mapowanie pól", note: "Które wyciągnięte pole wypełnia które pole PDF. Konfigurowane raz dla szablonu i używane za każdym razem." },
        { name: "Wyniki Cleanerów jako źródła", note: "Mapowana wartość może pochodzić z Cleanera, a nie z surowej ekstrakcji, więc do formularza trafiają wartości przeliczone lub wyliczone." },
        { name: "Pola wypełniane ręcznie", note: "Wartości, których nikt nie wyciąga — numer referencyjny, osoba podpisująca — podawane przy zatwierdzaniu." },
        { name: "Wiele szablonów", note: "Jeden zestaw dokumentów źródłowych może za jednym razem wypełnić kilka różnych formularzy." },
      ],
      gotchas: [
        {
          title: "Dane są rozproszone w dokumentach, a nie w jednym",
          body: "Dlatego ogólne narzędzia do dokumentów nie rozwiązują problemu wypełniania formularzy: wyciągają dane z jednego pliku naraz. Wypełnianie korzysta z jednego przetworzenia na każdy Flow źródłowy i uzupełnia formularz ze wszystkich naraz, więc wagi z listy pakunkowej i wartości z faktury trafiają do tego samego wyniku.",
        },
        {
          title: "Dokumenty przychodzą w dowolnej kolejności",
          body: "Rzadko dostajesz cały zestaw naraz. Wypełnienie pozostaje otwarte, zbiera przetworzenia w miarę napływu dokumentów i uruchamia się, gdy każde wymagane miejsce jest zapełnione. Pliki wgrane bez wskazania miejsca są klasyfikowane i przypisywane automatycznie, a niedopasowane można przypisać ręcznie.",
        },
        {
          title: "Niektórych pól nigdy nie ma w dokumentach źródłowych",
          body: "Każdy prawdziwy formularz ma wartości, których nie ma nigdzie wcześniej — wewnętrzny numer referencyjny, nazwisko zgłaszającego, blok podpisu. To pola wypełniane ręcznie, podawane na etapie zatwierdzenia, który jest też naturalnym momentem, by poprawić wszystko, co ekstrakcja odczytała źle, zanim PDF zostanie wydany.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Jeden Flow na każdy typ dokumentu źródłowego; formularz korzysta ze wszystkich naraz." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Przelicza i wylicza wartości, aby to, co trafia do formularza, było już w wymaganej jednostce lub formacie." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Zatwierdzenie przed wydaniem, z poprawkami i polami wypełnianymi ręcznie na tym samym etapie." },
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Dokumenty źródłowe przekazane na adres e-mail zasilają wypełnianie bez otwierania aplikacji." },
      ],
      faqs: [
        { q: "Czy jeden formularz można wypełnić danymi z kilku dokumentów?", a: "Tak. Każdy typ dokumentu źródłowego ma własne miejsce, a formularz jest wypełniany ze wszystkich naraz — to normalna sytuacja przy zgłoszeniach i roszczeniach." },
        { q: "A co z polami, których nie ma w żadnym dokumencie?", a: "To pola wypełniane ręcznie, wprowadzane na etapie zatwierdzenia razem z poprawkami, więc końcowy PDF jest sprawdzony przed wydaniem." },
        { q: "Czy jeden zestaw dokumentów może wypełnić więcej niż jeden formularz?", a: "Tak. Konfiguracja może zawierać kilka szablonów, a każdy z nich jest wypełniany z tego samego zestawu przetworzeń za jednym razem." },
      ],
    },
    {
      slug: "call-analytics",
      label: "Analityka rozmów",
      badge: "Sprzedaż i wsparcie",
      h1: "Zamień nagrane rozmowy w dane",
      title: "Analityka rozmów — uporządkuj nagrane rozmowy",
      description:
        "Zamieniaj nagrania rozmów sprzedażowych, wsparcia i obsługi przy ladzie w tabelę — kto co powiedział, które reguły zostały spełnione i jak zakończyła się każda rozmowa.",
      summary: "Nagrania rozmów sprzedażowych, wsparcia i obsługi przy ladzie zamienione w tabelę wypowiedzi, reguł i wyników.",
      lede: "Tavnit Signals zamienia nagrania audio w płaską tabelę. Rozdziela mówców, dzieli nagranie na odrębne rozmowy, klasyfikuje każdą z nich i ocenia Twoje reguły oraz pola ekstrakcji wypowiedź po wypowiedzi — więc dzień rozmów staje się wierszami, które możesz filtrować, a nie godzinami, których musisz wysłuchać.",
      problem: [
        "To w rozmowach firma dowiaduje się najwięcej, a prawie nic z tego nie jest zapisywane. Nagrania istnieją, ale ich przegląd oznacza słuchanie, więc w praktyce menedżer odsłuchuje kilka i na tej podstawie uogólnia.",
        "Tam, gdzie kontrola jakości w ogóle się odbywa, to osoba z kartą oceny wypełniająca formularz po każdej rozmowie — drogo, niespójnie między oceniającymi i tylko dla ułamka wolumenu.",
      ],
      fields: [
        { name: "Typ interakcji", note: "Jedno nagranie często zawiera kilka rozmów. Każda jest klasyfikowana — sprzedaż, wsparcie, zwrot — albo oznaczana jako inna." },
        { name: "Rola mówcy", note: "Wypowiedzi są przypisywane oczekiwanym uczestnikom, takim jak sprzedawca czy klient; nieoczekiwane głosy są oznaczane jako inne." },
        { name: "Reguły na poziomie wypowiedzi", note: "Kontrole tak/nie stosowane do każdej wypowiedzi — czy wspomniano o promocji, czy odczytano zastrzeżenie." },
        { name: "Pola ekstrakcji", note: "Dane wyciągane z każdej wypowiedzi, np. wspomniane produkty lub zgłoszone zastrzeżenia." },
        { name: "Kategorie treści", note: "Każda wypowiedź oznaczona — zastrzeżenie, pytanie, problem, rozwiązanie, podziękowanie — więc wzorce da się policzyć." },
        { name: "Wynik rozmowy", note: "Oceniany raz dla całej rozmowy: czy sprzedaż została zamknięta, czy problem rozwiązano." },
      ],
      gotchas: [
        {
          title: "Jedno nagranie to nie jedna rozmowa",
          body: "Nagranie całej zmiany przy ladzie lub na infolinii zawiera wiele odrębnych rozmów. Traktowanie pliku jako jednej rozmowy daje średnie, które niczego nie opisują. Nagrania są najpierw dzielone na odrębne interakcje, a każda jest klasyfikowana i oceniana osobno — to dźwiękowy odpowiednik dzielenia wielodokumentowego PDF-a.",
        },
        {
          title: "Pytania o wypowiedź i o rozmowę to różne pytania",
          body: "„Czy wspomniano o rabacie” zadaje się każdej wypowiedzi i może być prawdą kilka razy. „Czy sprawę rozwiązano” zadaje się raz całej rozmowie. Pomieszanie tych pytań daje wskaźnik, który liczy wzmianki, gdy chodziło o wyniki, więc oba są oceniane osobno, a odpowiedź na poziomie rozmowy powtarza się we wszystkich wierszach danej interakcji.",
        },
        {
          title: "Nagrywanie ludzi wiąże się z przepisami",
          body: "Wymogi dotyczące zgody i przechowywania nagrań rozmów różnią się w zależności od jurysdykcji i są surowsze niż w przypadku dokumentów. To Twój obowiązek, a nie coś, o czym decyduje pipeline — ale widoczność i uprawnienia na poziomie Bucketu pozwalają ograniczyć dostęp do transkrypcji i wyników do osób, które ich potrzebują.",
        },
      ],
      pipeline: [
        { label: "Buckets", href: "/docs/buckets", why: "Przetworzone nagrania są automatycznie eksportowane do Bucketu, więc rozmowy gromadzą się w czymś, co możesz przeszukiwać i wizualizować." },
        { label: "Webhooki", href: "/docs/webhooks", why: "Wysyła tabelę wyników do Twoich systemów, gdy tylko nagranie zostanie przetworzone." },
        { label: "Role użytkowników", href: "/docs/user-roles", why: "Dane z rozmów są wrażliwe; role i uprawnienia per Bucket ograniczają je do osób prowadzących program." },
      ],
      faqs: [
        { q: "Jakie formaty audio są obsługiwane?", a: "Można wgrywać i przetwarzać nagrania MP3, WAV i FLAC." },
        { q: "Czy poradzi sobie z nagraniem zawierającym wiele osobnych rozmów?", a: "Tak. Nagranie jest najpierw dzielone na odrębne interakcje, a każda jest klasyfikowana i oceniana osobno — więc cała zmiana przy ladzie daje wyniki dla każdej rozmowy, a nie jedną uśrednioną wartość." },
        { q: "Czy mogę ocenić każdą rozmowę, a nie tylko próbkę?", a: "Tak. Reguły są oceniane dla każdej wypowiedzi w każdym przetworzonym nagraniu — to praktyczna różnica w stosunku do ręcznej kontroli jakości: pełne pokrycie zamiast próbki." },
      ],
    },
    {
      slug: "delivery-notes",
      label: "Dowody dostawy",
      badge: "Logistyka i magazyn",
      h1: "Przechwytywanie dowodów dostawy i potwierdzeń odbioru",
      title: "Ekstrakcja dowodów dostawy i kontrola przyjęcia towaru",
      description:
        "Zapisuj, co faktycznie dostarczono, na podstawie podpisanych dowodów dostawy i potwierdzeń odbioru (POD), łącznie z odręcznymi adnotacjami, i porównuj to z tym, co zamówiono.",
      summary: "To, co faktycznie dostarczono, odczytane z podpisanych dowodów dostawy i potwierdzeń odbioru — łącznie z pismem odręcznym.",
      lede: "Tavnit czyta dowody dostawy i potwierdzenia odbioru, łącznie z odręcznymi adnotacjami kierowców i odbiorców, i zwraca dostarczone ilości jako uporządkowane wiersze. Ponieważ zamówienia zakupu są wyciągane do tego samego kształtu, porównanie dostarczonego z zamówionym staje się zapytaniem.",
      problem: [
        "Dowód dostawy to jedyny zapis tego, co fizycznie dotarło, i zwykle najgorszej jakości dokument w całym łańcuchu: sfotografowany na placu, podpisany na wydruku, z ręcznymi poprawkami tam, gdzie ilości się różniły.",
        "To także dokument, który ma największe znaczenie w sporach. Jeśli faktura mówi dwanaście, a dowód dostawy dziesięć, to dowód dostawy jest dowodem — o ile ktoś zapisał, co na nim było.",
      ],
      fields: [
        { name: "Numer dowodu dostawy i zamówienia", note: "Klucze, które łączą dostawę z tym, co zamówiono." },
        { name: "Dostarczona ilość w każdej pozycji", note: "Liczba, która naprawdę się liczy, i ta najczęściej poprawiana ręcznie." },
        { name: "Odręczne poprawki", note: "Przekreślone ilości i notatki na marginesie zawierają prawdziwą liczbę. Pominięcie ich oznacza zapisanie błędnej." },
        { name: "Nazwisko odbiorcy i obecność podpisu", note: "Obecność podpisu jest często testem odbioru." },
        { name: "Data i godzina dostawy", note: "Wpływa na pomiar SLA i terminy w sporach." },
        { name: "Uwagi o stanie lub uszkodzeniach", note: "Wolny tekst, zwykle odręczny, i podstawa każdej reklamacji." },
      ],
      gotchas: [
        {
          title: "Pismo odręczne to najważniejsza część",
          body: "Wydrukowany dowód dostawy mówi, co miało dotrzeć. Odręczna poprawka mówi, co dotarło. Ekstrakcja czyta zarówno pismo odręczne, jak i druk — i to jest różnica między zapisaniem przesyłki zgodnie z planem a zapisaniem przesyłki, jaką faktycznie dostarczono.",
        },
        {
          title: "Sfotografowane na placu, a nie zeskanowane w biurze",
          body: "Potwierdzenia odbioru przychodzą jako zdjęcia z telefonu, pod kątem, przy słabym świetle, czasem z kciukiem w kadrze. Ekstrakcja radzi sobie z większością z nich, ale to typ dokumentu, przy którym warto kierować wyniki o niskiej pewności do człowieka, zamiast ufać każdemu odczytowi.",
        },
        {
          title: "Wartość tkwi w porównaniu, a nie w samym odczycie",
          body: "Sama dostarczona ilość mówi niewiele. Wyciąganie dowodów dostawy do tej samej struktury pól co zamówienia zakupu zamienia dopasowanie trójstronne w zapytanie po numerze zamówienia, zamiast oglądania trzech dokumentów pod światło.",
        },
      ],
      pipeline: [
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Kierowcy i przewoźnicy wysyłają zdjęcia potwierdzeń odbioru e-mailem; przekazanie ich dalej przetwarza każde od razu po otrzymaniu." },
        { label: "Flows", href: "/docs/flows", why: "Dostarczone pozycje to pola tabelaryczne o tej samej strukturze co zamówienia zakupu." },
        { label: "Buckets", href: "/docs/buckets", why: "Przechowuje dostawy i zamówienia w jednym miejscu, więc rozbieżności wychodzą w zapytaniu, a nie podczas audytu." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikuje słabe odczyty i poprawione ilości, gdzie kosztem pomyłki jest spór." },
      ],
      faqs: [
        { q: "Czy czyta odręczne poprawki?", a: "Tak. Pismo odręczne jest wyciągane razem z drukiem, co ma tu znaczenie, bo to odręcznie wpisana ilość jest zwykle tą prawdziwą." },
        { q: "Czy działa ze zdjęciami zrobionymi telefonem?", a: "Zwykle tak. Zdjęcia, krzywe ujęcia i słabe światło to norma przy potwierdzeniach odbioru. Warto włączyć warunkową weryfikację, aby wątpliwe odczyty trafiały do człowieka, zamiast przechodzić po cichu." },
        { q: "Czy dostawy można sprawdzać względem zamówień?", a: "Wyciągnij oba do tej samej struktury pól, a porównanie stanie się zapytaniem po numerze zamówienia w Twoim Buckecie, zamiast ręcznego zestawiania dokumentów." },
      ],
    },
    {
      slug: "insurance-claims",
      label: "Roszczenia ubezpieczeniowe",
      badge: "Ubezpieczenia i szkody",
      h1: "Przetwarzanie dokumentów roszczeń ubezpieczeniowych",
      title: "Ekstrakcja danych z dokumentów roszczeń ubezpieczeniowych",
      description:
        "Przetwarzaj formularze zgłoszenia szkody razem z dokumentacją — kosztorysami, fakturami, raportami i zdjęciami — w jeden uporządkowany rekord gotowy do weryfikacji.",
      summary: "Formularze zgłoszenia szkody i dokumentacja przetworzone razem w jeden uporządkowany rekord gotowy do weryfikacji.",
      lede: "Tavnit przetwarza roszczenie i dokumenty, które je potwierdzają, jako jeden zestaw: formularz zgłoszenia, kosztorysy naprawy, faktury i raporty. Każdy typ dokumentu trafia do własnego Flow, a wyniki składają się w jeden rekord, który likwidator może ocenić, zamiast czytać cały folder.",
      problem: [
        "Roszczenie nigdy nie jest jednym dokumentem. To formularz plus wszystko, co przysłał poszkodowany — kosztorysy, paragony, raport policyjny, zdjęcia — przychodzące przez kilka dni, w dowolnej kolejności, e-mailem.",
        "Likwidatorzy spędzają większość czasu na kompletowaniu, a nie ocenianiu: otwierają załączniki, szukają kwot, sprawdzają, czy żądana kwota zgadza się z tą z kosztorysu.",
      ],
      fields: [
        { name: "Numer szkody i numer polisy", note: "Klucze, po których łączy się wszystko w zestawie, i często jedyny element spójny we wszystkich dokumentach." },
        { name: "Dane poszkodowanego i zdarzenia", note: "Data, miejsce i opis szkody, zwykle rozproszone między formularzem a opisem zdarzenia." },
        { name: "Kwota roszczenia", note: "To, co mówi formularz. Warto wyciągać osobno od tego, co potwierdzają dokumenty." },
        { name: "Kwoty z dokumentacji", note: "Sumy z kosztorysów i faktur — liczby, z którymi powinna zgadzać się kwota roszczenia." },
        { name: "Dane osób trzecich", note: "Inne strony, ubezpieczyciele i numery referencyjne, potrzebne do regresu." },
        { name: "Typ dokumentu dla każdego załącznika", note: "Wiedza, czym jest każdy plik, decyduje o tym, który Flow go przeczyta." },
      ],
      gotchas: [
        {
          title: "Dokumentacja przychodzi z opóźnieniem i w dowolnej kolejności",
          body: "Ocena nie może się zacząć, dopóki zestaw nie jest kompletny, a kompletuje się przez kilka dni. Collections klasyfikują każdy załącznik w chwili, gdy dotrze, więc rekord buduje się stopniowo, zamiast żeby ktoś za każdym razem czytał cały folder od nowa.",
        },
        {
          title: "Kwota żądana i kwota udokumentowana to różne pola",
          body: "Wyciągnięcie jednej liczby na roszczenie gubi najważniejszą kontrolę. Zapisz to, czego zażądano, i to, ile faktycznie wynoszą kosztorysy i faktury, a rozbieżność stanie się wartością, po której możesz filtrować, zamiast czymś, co likwidator musi zauważyć.",
        },
        {
          title: "Akta szkód są osobiste, a często medyczne",
          body: "Roszczenia rutynowo zawierają informacje o zdrowiu, dokumenty tożsamości i dane finansowe. Prywatne Buckets z uprawnieniami dla poszczególnych użytkowników sprawiają, że roszczenie widzą likwidatorzy, którzy się nim zajmują, a nie wszyscy w organizacji.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Klasyfikuje każdy załącznik — formularz, kosztorys, fakturę, raport — i kieruje go do Flow zbudowanego dla niego." },
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Roszczenia przychodzą e-mailem; przekazanie ich na adres Collection przetwarza każdy załącznik w chwili, gdy dotrze." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Ujednolica daty i waluty oraz wylicza różnicę między kwotą żądaną a udokumentowaną." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Likwidatorzy zatwierdzają lub odrzucają, a decyzja i jej autor są trwale zapisywani." },
      ],
      faqs: [
        { q: "Czy poradzi sobie z roszczeniem z wieloma różnymi załącznikami?", a: "Tak. Collection klasyfikuje każdy załącznik i kieruje go do właściwego Flow, więc formularz zgłoszenia, kosztorys i faktura są czytane przez Flow zbudowany dla danego typu dokumentu." },
        { q: "Czy może oznaczać roszczenia, w których liczby się nie zgadzają?", a: "Wyciągnij kwotę roszczenia i sumy z dokumentacji jako osobne pola, a potem użyj Cleanera do wyliczenia różnicy. Roszczenia, które nie przejdą kontroli, mogą automatycznie trafiać do weryfikacji." },
        { q: "Jak chronione są wrażliwe dane roszczeń?", a: "Buckets mogą być prywatne zamiast widocznych dla całej organizacji, z uprawnieniami Obserwatora lub Edytora nadawanymi poszczególnym użytkownikom, więc roszczenie widzą tylko likwidatorzy, którzy się nim zajmują." },
      ],
    },
    {
      slug: "identity-verification",
      label: "Tożsamość i onboarding",
      badge: "KYC i onboarding",
      h1: "Przechwytywanie dokumentów tożsamości i onboardingu",
      title: "Ekstrakcja dokumentów KYC przy onboardingu klientów",
      description:
        "Przechwytuj dokumenty tożsamości i potwierdzenia adresu podczas onboardingu, sprawdzaj, czy dane są w nich zgodne, i prowadź zapis decyzji gotowy do audytu.",
      summary: "Dokumenty tożsamości i adresu przechwycone, sprawdzone pod kątem spójności i zapisane w sposób gotowy do audytu.",
      lede: "Tavnit czyta dokumenty zbierane podczas onboardingu — dokumenty tożsamości, potwierdzenia adresu, dokumenty rejestrowe spółki — i zwraca imiona i nazwiska, numery, daty i adresy jako uporządkowane pola. Ponieważ cały zestaw jest przetwarzany razem, zgodność danych między dokumentami staje się kontrolą, a nie założeniem.",
      problem: [
        "Onboarding klienta oznacza zebranie dokumentów, przeczytanie ich i potwierdzenie, że opisują tę samą osobę lub podmiot. Czytanie jest żmudne; potwierdzanie to część obarczona ryzykiem — i robi się je na oko.",
        "Wolumen pogarsza sprawę. Zespół, który regularnie przeprowadza onboarding, kończy z niespójnymi standardami między weryfikatorami i bez wiarygodnego zapisu tego, co i kiedy sprawdzono.",
      ],
      fields: [
        { name: "Pełne imię i nazwisko w brzmieniu z dokumentu", note: "Wyciągaj dosłownie. Kolejność i transliteracja różnią się między dokumentami, a ta różnica jest właśnie przedmiotem kontroli." },
        { name: "Data urodzenia", note: "Najbardziej przydatne pojedyncze pole do kontroli spójności między dokumentami." },
        { name: "Numer i rodzaj dokumentu", note: "Paszport, dowód osobisty, prawo jazdy — każdy z własnymi zasadami numeracji." },
        { name: "Data wydania i ważności", note: "Ważność to reguła, a nie pole: nieważny dokument to ustalenie." },
        { name: "Adres", note: "Z dokumentów potwierdzających adres, który musi zgadzać się z tym, co zadeklarował klient." },
        { name: "Dane rejestrowe podmiotu", note: "Przy onboardingu firm — numer rejestrowy, siedziba, członkowie zarządu." },
      ],
      gotchas: [
        {
          title: "Nazwiska się nie zgadzają i to normalne",
          body: "Ta sama osoba występuje jako „Jose Garcia Lopez”, „J. García” i „GARCIA LOPEZ, JOSE” w trzech dokumentach. Wyciągaj imiona i nazwiska dosłownie, zamiast ujednolicać je podczas ekstrakcji, a potem porównuj świadomie — zbyt wczesne ujednolicanie wyrzuca dokładnie tę różnicę, którą musisz ocenić.",
        },
        {
          title: "Zdjęcia dokumentów tożsamości to norma, a jakość bywa różna",
          body: "Klienci fotografują dokumenty telefonem, nierzadko z odblaskiem na strefie odczytu maszynowego. Weryfikacja przy onboardingu jest uzasadniona, biorąc pod uwagę koszt pomyłki, a ścieżka audytu zapisuje, kto zaakceptował który dokument.",
        },
        {
          title: "To najbardziej regulowane dane, jakie przetworzysz",
          body: "Dokumenty tożsamości podlegają limitom przechowywania, prawu do usunięcia i obowiązkom w zakresie dostępu, których nie mają zwykłe dokumenty biznesowe. Prywatne Buckets i uprawnienia dla poszczególnych użytkowników ograniczają dostęp do akt onboardingu do zespołu compliance, a niemodyfikowalna ścieżka dokumentuje, kto miał do czego dostęp.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Klasyfikuje wszystko, co przysłał klient — paszport, rachunek za media, odpis z rejestru — i kieruje każdy dokument do właściwego Flow." },
        { label: "Flows", href: "/docs/flows", why: "Jeden Flow na każdy typ dokumentu, więc kontrola może odwoływać się do nazwanego pola, zamiast przeszukiwać tekst." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Zatwierdzenie każdego onboardingu, z trwałym zapisem tego, kto zatwierdził który dokument." },
        { label: "Role użytkowników", href: "/docs/user-roles", why: "Ogranicza dostęp do dokumentów tożsamości do zespołu, który ich potrzebuje, a nie całej organizacji." },
      ],
      faqs: [
        { q: "Czy weryfikuje autentyczność dokumentu?", a: "Nie. Tavnit wyciąga i porządkuje to, co mówią dokumenty, i pozwala sprawdzić spójność w obrębie zestawu. Weryfikacja autentyczności w organach wydających to osobna specjalizacja, której to nie zastępuje." },
        { q: "Czy może sprawdzić, czy dane zgadzają się między dokumentami?", a: "Tak. Przetwarzaj zestaw razem i porównuj wyciągnięte pola — imię i nazwisko, datę urodzenia, adres — więc niezgodność pojawia się jako wartość, a nie coś, co weryfikator musi wypatrzyć." },
        { q: "Jak ograniczany jest dostęp do danych tożsamości?", a: "Prywatne Buckets z uprawnieniami dla poszczególnych użytkowników ograniczają widoczność do zespołu compliance, a niemodyfikowalna ścieżka audytu zapisuje każde wyświetlenie, edycję i zatwierdzenie." },
      ],
    },
    {
      slug: "lease-agreements",
      label: "Najem i nieruchomości",
      badge: "Nieruchomości i zarządzanie obiektami",
      h1: "Ekstrakcja danych z umów najmu",
      title: "Abstrakty umów najmu — czynsz, warunki i daty wypowiedzenia",
      description:
        "Zamieniaj umowy najmu w uporządkowane rekordy — czynsz, daty rewizji, klauzule wcześniejszego rozwiązania, opłaty eksploatacyjne i obowiązki naprawcze — w całym portfelu.",
      summary: "Umowy najmu zamienione w uporządkowane rekordy: czynsz, rewizje, daty wypowiedzenia i obowiązki.",
      lede: "Tavnit przygotowuje abstrakty umów najmu jako uporządkowane rekordy: strony, przedmiot najmu, okres, czynsz i daty rewizji, klauzule wcześniejszego rozwiązania, podstawę opłat eksploatacyjnych i obowiązki naprawcze. Portfel przechowywany jako PDF-y staje się tabelą, w której najbliższa rewizja czynszu to filtr, a nie ćwiczenie z czytania.",
      problem: [
        "Przygotowywanie abstraktów umów najmu to ugruntowana praca ręczna właśnie dlatego, że odpowiedzi są ukryte w treści umowy, a nie wydrukowane w polach. Firmy płacą za nią wielokrotnie, a powstały arkusz dezaktualizuje się w chwili, gdy umowa zostanie zmieniona.",
        "Koszt jego braku jest konkretny i wysoki: przegapiona data wypowiedzenia, niewykorzystana opcja, rewizja czynszu, która przeszła bez sprzeciwu.",
      ],
      fields: [
        { name: "Wynajmujący, najemca i poręczyciel", note: "Podmioty prawne, a nie nazwy handlowe — często zmieniane późniejszymi aneksami." },
        { name: "Przedmiot najmu", note: "Opisany prozą i odniesieniem do planu, rzadko jako czysty adres." },
        { name: "Okres, rozpoczęcie i zakończenie", note: "Kręgosłup wszystkich innych dat w dokumencie." },
        { name: "Czynsz i daty rewizji", note: "Podstawa rewizji — rynkowa, indeksacyjna, schodkowa — ma takie samo znaczenie jak kwota." },
        { name: "Klauzule wcześniejszego rozwiązania i warunki", note: "Prawo do rozwiązania z niespełnionymi warunkami to nie prawo do rozwiązania. Wyciągaj jedno i drugie." },
        { name: "Opłaty eksploatacyjne i obowiązki naprawcze", note: "Gdzie faktycznie leży odpowiedzialność — zwykle najdłuższe klauzule w dokumencie." },
      ],
      gotchas: [
        {
          title: "Daty są zdefiniowane, a nie podane",
          body: "Umowa najmu rzadko podaje datę wcześniejszego rozwiązania. Mówi, że najemca może rozwiązać umowę w piątą rocznicę rozpoczęcia najmu z sześciomiesięcznym wypowiedzeniem. Wyciągnij datę rozpoczęcia, rocznicę i okres wypowiedzenia jako pola, a potem pozwól Cleanerowi z formułą wyliczyć faktyczny termin — czyli datę, której potrzebowałeś.",
        },
        {
          title: "Obowiązującym dokumentem często nie jest sama umowa",
          body: "Aneksy, zgody na zmiany i listy boczne zmieniają sytuację, a pierwotna umowa wciąż brzmi tak, jakby ich nie było. Przetwarzaj każdy dokument osobno z zapisaną datą, aby aktualny stan wynikał z pełnego zestawu, a nie z PDF-a, który akurat ktoś otworzył.",
        },
        {
          title: "Warunkowe prawo odczytane jako bezwarunkowe to ryzyko",
          body: "Klauzule wcześniejszego rozwiązania są rutynowo uzależnione od wydania lokalu wolnego od osób i rzeczy albo od uregulowania czynszu. Zapisanie prawa bez warunków daje tabelę portfela, która jest pewna siebie i błędna — a to gorsze niż brak tabeli. Wyciągaj warunki jako osobne pole i je weryfikuj.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Wskazówki ekstrakcji są tu niezbędne — model musi wiedzieć, czym jest warunek rozwiązania, a nie tylko gdzie szukać." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Wylicza terminy rewizji i wcześniejszego rozwiązania z dat rozpoczęcia i okresów wypowiedzenia." },
        { label: "Buckets", href: "/docs/buckets", why: "Portfel jako tabela: które umowy można rozwiązać w przyszłym roku, posortowane według terminu wypowiedzenia." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Weryfikuj każdy abstrakt. Koszt błędnej daty mierzy się tu w latach czynszu." },
      ],
      faqs: [
        { q: "Czy potrafi wyliczyć daty rozwiązania i rewizji?", a: "Tak. Wyciągnij datę rozpoczęcia, rocznicę, z którą wiąże się prawo, i okres wypowiedzenia, a Cleaner z formułą wyliczy faktyczny termin — zwykle to jego potrzebujesz, a nie samej klauzuli." },
        { q: "A co z aneksami do umowy?", a: "Przetwarzaj każdy dokument osobno, zapisując jego datę jako pole. Aktualny stan wynika wtedy z zapytania do całego zestawu, a nie z założenia, że najnowszy plik jest rozstrzygający." },
        { q: "Czy zapisuje warunki związane z klauzulą wcześniejszego rozwiązania?", a: "Powinien — i ta strona przekonuje, że musi. Prawo do rozwiązania zapisane bez warunków daje tabelę portfela, która wygląda na pewną, a taka nie jest. Wyciągaj warunki jako osobne pole i je weryfikuj." },
      ],
    },
    {
      slug: "timesheets",
      label: "Karty czasu pracy",
      badge: "Płace i obsada",
      h1: "Przechwytywanie kart czasu pracy i ewidencji zmian",
      title: "Ekstrakcja danych z kart czasu pracy na potrzeby płac",
      description:
        "Przechwytuj godziny z kart czasu pracy — drukowanych, odręcznych lub sfotografowanych — i sprawdzaj je regułami, zanim trafią do płac.",
      summary: "Godziny z drukowanych, odręcznych i sfotografowanych kart czasu pracy, sprawdzone przed naliczeniem płac.",
      lede: "Tavnit czyta przesłane karty czasu pracy, także odręczne i sfotografowane, i zwraca pracownika, datę, godziny i kod kosztowy jako wiersze. Reguły mogą sprawdzić sumy, zanim cokolwiek trafi do płac, więc błędy, które zamieniłyby się w korekty wynagrodzeń, są wyłapywane, póki są jeszcze tanie.",
      problem: [
        "Lista płac ma swój termin, a karty czasu pracy przychodzą w formie, jakiej używa każda lokalizacja czy agencja — wydruk z arkusza, papierowa karta sfotografowana pod koniec zmiany, PDF z systemu podwykonawcy.",
        "Ktoś przepisuje je pod presją czasu, czyli dokładnie w warunkach, w których powstają błędy. Błędna liczba odkryta po naliczeniu płac to korekta, wyrównanie i nieprzyjemna rozmowa.",
      ],
      fields: [
        { name: "Imię i nazwisko lub numer pracownika", note: "Nazwiska na kartach rzadko dokładnie zgadzają się z kartoteką płacową — Cleaner typu lookup je mapuje." },
        { name: "Data lub koniec tygodnia", note: "Określa, do którego okresu rozliczeniowego należą godziny, i łatwo ją źle odczytać na granicy okresów." },
        { name: "Godzina rozpoczęcia, zakończenia i przerwy", note: "Wyciąganie składników, a nie tylko sumy, pozwala sprawdzić sumę." },
        { name: "Łączna liczba godzin", note: "Warto wyciągać w wersji podanej na karcie i porównywać z sumą wyliczoną." },
        { name: "Nadgodziny i godziny z dodatkiem", note: "Inne stawki, więc błędna klasyfikacja to błąd w wynagrodzeniu, a nie zaokrąglenie." },
        { name: "Kod kosztowy lub projekt", note: "Decyduje o rozliczaniu kosztów zleceń i jest polem najczęściej pozostawianym pustym." },
      ],
      gotchas: [
        {
          title: "Podana suma i prawdziwa suma różnią się częściej, niż myślisz",
          body: "Ludzie sami sumują swoje godziny i się mylą. Wyciąganie godzin rozpoczęcia, zakończenia i przerw oprócz podanej sumy pozwala Cleanerowi z formułą wyliczyć godziny i je porównać — wykryte rozbieżności to zwykle prawdziwe błędy arytmetyczne, a nie błędy ekstrakcji.",
        },
        {
          title: "Odręczne karty to trudny przypadek — i częsty",
          body: "Praca na budowach i zmianowa wciąż opiera się na papierze fotografowanym pod koniec dnia. Pismo odręczne jest wyciągane, ale pewność bywa różna, a to zastosowanie, w którym kierowanie niepewnych odczytów do weryfikacji jest lepsze niż odkrycie problemu na pasku wypłaty.",
        },
        {
          title: "Nazwiska na kartach to nie nazwiska w systemie płacowym",
          body: "„Dawid S.”, „Dawid Sowa” i numer pracownika to ta sama osoba, a system płacowy potrzebuje numeru. Cleaner typu lookup dopasowuje podczas przetwarzania podane nazwiska do Twojej listy pracowników, więc niedopasowane wpisy są oznaczane, a nie zgadywane.",
        },
      ],
      pipeline: [
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Lokalizacje i agencje wysyłają karty e-mailem pod koniec tygodnia; przekazanie ich dalej przetwarza je od razu po otrzymaniu." },
        { label: "Splitters", href: "/docs/splitters", why: "Jeden PDF z kartami całej brygady staje się osobnym przetworzeniem dla każdego pracownika." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Wylicza godziny na podstawie czasów, dopasowuje nazwiska do kartoteki płacowej i oznacza sumy, które się nie zgadzają." },
        { label: "Weryfikacja ręczna", href: "/docs/human-in-the-loop", why: "Do człowieka trafiają tylko karty, które nie przeszły kontroli — dzięki temu da się to zrobić przed terminem wypłaty." },
      ],
      faqs: [
        { q: "Czy czyta odręczne karty czasu pracy?", a: "Tak. Pismo odręczne jest wyciągane razem z drukiem, choć pewność zależy od czytelności — dlatego warto tu włączyć kierowanie niepewnych kart do weryfikacji." },
        { q: "Czy sprawdza, czy godziny się sumują?", a: "Tak. Wyciągnij godziny rozpoczęcia, zakończenia i przerw razem z podaną sumą, a Cleaner z formułą wyliczy godziny i oznaczy każdą kartę, na której te wartości się różnią." },
        { q: "Co jeśli nazwiska nie zgadzają się z naszym systemem płacowym?", a: "Cleaner typu lookup dopasowuje podczas przetwarzania podane nazwiska do Twojej listy pracowników. Wpisy, których nie da się dopasować, są oznaczane, a nie zgadywane, więc nic nie trafia do płac bez przypisania." },
      ],
    },
    {
      slug: "utility-bills",
      label: "Rachunki za media",
      badge: "Zarządzanie obiektami i ESG",
      h1: "Ekstrakcja danych z rachunków za media i odczytów liczników",
      title: "Ekstrakcja rachunków za media na potrzeby kosztów i emisji",
      description:
        "Wyciągaj zużycie, taryfy i odczyty liczników z rachunków za media w całym portfelu nieruchomości — do kontroli kosztów i raportowania emisji.",
      summary: "Zużycie, taryfy i odczyty liczników wyciągnięte w całym portfelu — do raportowania kosztów i emisji.",
      lede: "Tavnit czyta rachunki za prąd, gaz, wodę i wywóz odpadów i zwraca zużycie, taryfę, odczyty liczników i opłaty dla każdej lokalizacji. Rachunki z całego portfela stają się tabelą, w której widać trendy — a tego właśnie wymagają zarówno kontrola kosztów, jak i raportowanie emisji.",
      problem: [
        "Każdy, kto zarządza więcej niż kilkoma lokalizacjami, dostaje rachunki od kilku dostawców w kilku formatach, a jedyne, co dzieje się z nimi niezawodnie, to zapłata. Dane o zużyciu — część o wartości analitycznej — zostają w PDF-ie.",
        "Raportowanie emisji sprawiło, że to stało się pilne. Raportowanie w zakresie 1 i 2 wymaga zużycia w kWh według lokalizacji i okresu, a w większości organizacji te dane istnieją tylko jako stos rachunków, których nikt nie przepisał.",
      ],
      fields: [
        { name: "Adres punktu poboru i numer licznika (np. MPAN/MPRN)", note: "Identyfikator, który wiąże rachunek z lokalizacją. Same adresy są zawodne przy różnych dostawcach." },
        { name: "Okres rozliczeniowy", note: "Rachunki rzadko pokrywają się z miesiącami kalendarzowymi, co ma znaczenie przy agregacji kwartalnej." },
        { name: "Zużycie z jednostką", note: "kWh, m³ lub litry. Jednostka jest równie ważna jak liczba i nie zawsze jest podawana tak samo." },
        { name: "Odczyty liczników i oznaczenie szacunku", note: "Odczyt szacunkowy to nie pomiar, a traktowanie go jak pomiaru psuje trend." },
        { name: "Taryfa i opłata stała", note: "To odróżnia zmianę ceny od zmiany zużycia." },
        { name: "Łączne opłaty i podatek", note: "Do uzgodnienia kosztów z tym, co faktycznie zapłacono." },
      ],
      gotchas: [
        {
          title: "Odczyty szacunkowe to nie dane",
          body: "Dostawcy szacują, gdy nie mogą odczytać licznika, a potem korygują przy następnym rzeczywistym odczycie. Trend zbudowany bez rozróżnienia jednych i drugich pokazuje skok, którego nie było, a potem spadek, którego też nie było. Wyciągaj oznaczenie szacunku jako osobne pole, aby szacunki można było wykluczyć lub traktować osobno.",
        },
        {
          title: "Okresy rozliczeniowe do niczego nie pasują",
          body: "Jeden dostawca rozlicza się co miesiąc, drugi co 28 dni, trzeci co kwartał, a żaden nie pokrywa się z Twoimi okresami sprawozdawczymi. Wyciągaj początek i koniec okresu, a nie jedną datę, aby zużycie dało się rozłożyć na okresy, za które faktycznie raportujesz.",
        },
        {
          title: "Jednostki się różnią, a gaz to pułapka",
          body: "Gaz jest często rozliczany w metrach sześciennych, a raportowany w kWh, a przelicznik zależy od wartości opałowej podanej na rachunku. Wyciągaj jednostkę i współczynnik konwersji, zamiast je zakładać, a przeliczenie zostaw Cleanerowi jednostek — założenie standardowego współczynnika to miejsce, w którym większość danych o emisjach po cichu się psuje.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Rachunki od różnych dostawców mediów przychodzą razem i są automatycznie kierowane do właściwego Flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Przelicza jednostki na jedną podstawę raportową i wylicza zużycie rozłożone na okresy." },
        { label: "Buckets", href: "/docs/buckets", why: "Zużycie według lokalizacji i okresu jako tabela z wykresami — w formacie potrzebnym zarówno finansom, jak i raportowaniu ESG." },
        { label: "Integracja e-mail", href: "/docs/email-integration", why: "Dostawcy wysyłają rachunki e-mailem; przekazywanie ich dalej buduje zbiór danych bez projektu wprowadzania danych." },
      ],
      faqs: [
        { q: "Czy obsługuje rachunki od różnych dostawców mediów?", a: "Tak. Collection klasyfikuje każdy rachunek i kieruje go do właściwego Flow, więc rachunki za prąd, gaz i wodę są czytane przez Flow zbudowany dla nich, niezależnie od układu dostawcy." },
        { q: "Czy dane nadają się do raportowania emisji?", a: "Daje zużycie według lokalizacji i okresu z zapisanymi jednostkami, czyli dane wejściowe, których takie raportowanie potrzebuje. Wyciągaj oznaczenie szacunku i współczynnik konwersji, zamiast zakładać standardowy — to założenie jest źródłem większości błędów w danych o emisjach." },
        { q: "Czy potrafi oddzielić wzrost cen od wzrostu zużycia?", a: "Wyciągaj taryfę i opłatę stałą razem ze zużyciem, a staną się osobnymi kolumnami, których trendy możesz śledzić niezależnie." },
      ],
    },
  ],
};

export default pl;
