import type { GuidesContent } from "@/content/types";

/** Guides: the /guides hub copy and every guide — Polski (pl). Translated from ./en.ts and src/lib/guides.ts. */
const pl: GuidesContent = {
  hub: {
    title: "Poradniki — dopasowanie do zamówień, pozycje faktur, kody HS i automatyzacja dokumentów",
    description:
      "Przystępne poradniki o problemach stojących za automatyzacją dokumentów: dopasowywanie faktur do zamówień zakupu, wyciąganie pozycji z faktur, klasyfikacja kodów HS i nie tylko.",
    ogTitle: "Poradniki Tavnit",
    ogDescription:
      "Przystępne poradniki o dopasowywaniu do zamówień, wyciąganiu pozycji faktur, klasyfikacji kodów HS i innych operacjach na dokumentach.",
    breadcrumbHome: "Strona główna",
    name: "Poradniki",
    h1: "Poradniki automatyzacji dokumentów",
    intro:
      "Problemy stojące za produktem, wyjaśnione na ich własnych warunkach: co sprawdza dopasowanie do zamówienia, dlaczego tabele na fakturach tak trudno wyciągnąć, jak naprawdę działa klasyfikacja taryfowa. Bez promowania żadnego dostawcy aż do ostatniej sekcji, w której piszemy, co automatyzuje Tavnit.",
    minRead: "{m} min czytania",
    read: "Czytaj",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Jak dopasować faktury do zamówień zakupu (2-way i 3-way)",
      h1: "Jak dopasować faktury do zamówień zakupu",
      description:
        "Czym jest dopasowanie do zamówienia, czym różni się dopasowanie dwu- i trójstronne, gdzie zawodzi dopasowanie ręczne i jak je zautomatyzować bez wymiany ERP.",
      lede: "Dopasowanie faktury do zamówienia zakupu (PO) sprawdza, czy faktura dostawcy zgadza się z zamówieniem, którego dotyczy: ten sam dostawca, te same towary, te same ilości, te same ceny. Dopasowanie dwustronne porównuje fakturę z zamówieniem; trójstronne dodaje dokument przyjęcia towaru. To kontrola, która chroni firmę przed płaceniem za coś, czego nie zamówiła albo nie otrzymała.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Co właściwie sprawdza dopasowanie do zamówienia",
          paragraphs: [
            "Zamówienie zakupu to obietnica zakupu; faktura to prośba o zapłatę. Dopasowanie ich odpowiada na jedno pytanie — czy ta faktura żąda dokładnie tego, na co się umówiliśmy? — w czterech wymiarach: dostawca, towary, ilości i ceny jednostkowe. Piąty wymiar, sumy, wynika z pozostałych czterech i jest najmniej przydatny jako samodzielna kontrola.",
            "Sumy są słabą kontrolą, bo zgadzają się przypadkiem częściej, niż można by się spodziewać. Faktura na dziesięć sztuk po 12 USD zamiast dwunastu po 10 USD ma poprawną sumę i wszystko inne błędne. Dopasowanie na poziomie nagłówka wyłapie fakturę bez zamówienia; tylko dopasowanie na poziomie pozycji wyłapie fakturę z błędnymi pozycjami.",
          ],
        },
        {
          heading: "Dopasowanie dwustronne a trójstronne",
          paragraphs: [
            "Dopasowanie dwustronne porównuje fakturę z zamówieniem zakupu. Potwierdza, że zgodziłeś się to kupić po tej cenie. Nie potwierdza, że to otrzymałeś, dlatego zwykle stosuje się je do usług, subskrypcji i towarów o niskiej wartości, gdzie koszt etapu przyjęcia przewyższa ryzyko.",
            "Dopasowanie trójstronne dodaje dokument przyjęcia towaru — dowód dostawy, list przewozowy lub przyjęcie magazynowe, które rejestrują, co fizycznie dotarło. Teraz faktura musi zgadzać się zarówno z tym, co zamówiono, jak i z tym, co przyjęto. Dostawca, który wysyła osiem, a fakturuje dziesięć, zostanie wyłapany tutaj i nigdzie indziej. To standard dla towarów fizycznych, a większość ram audytowych oczekuje go powyżej progu istotności.",
            "Niektóre zespoły mówią o dopasowaniu czterostronnym, dodając protokół kontroli lub odbioru jakościowego. To ta sama idea z jednym dokumentem więcej i ta sama mechanika.",
          ],
        },
        {
          heading: "Dlaczego dopasowanie ręczne zawodzi",
          paragraphs: [
            "Zamówienie zakupu jest uporządkowane — pochodzi z Twojego własnego systemu. Faktura nie. Przyszła jako PDF z systemu dostawcy, w jego układzie, z jego numerami części i jego opisem każdej pozycji. Zanim cokolwiek da się porównać, ktoś musi przeczytać ten PDF i przełożyć go na ten sam kształt co zamówienie. W większości działów zobowiązań to tłumaczenie wykonuje osoba z dwoma otwartymi oknami.",
            "To właśnie tam pojawiają się błędy. Samo porównanie nie jest trudne; poradzi sobie z nim arkusz kalkulacyjny. Trudne jest przepisywanie, bo jest powtarzalne, układy różnią się u każdego dostawcy, a błędna ilość wygląda dokładnie jak poprawna. Problem z dopasowaniem, którego doświadcza większość firm, nie wynika z logiki dopasowania, tylko z wprowadzania danych na wcześniejszym etapie.",
          ],
          bullets: [
            "Numery części dostawcy różnią się od wewnętrznych SKU, więc parowanie pozycji wymaga tabeli mapowań, której nikt nie aktualizuje.",
            "Opisy różnią się sformułowaniami — „Niebieski widget 10 szt.” kontra „WIDGET-BLU x10” — więc dokładne dopasowanie tekstu zawodzi przy identycznych towarach.",
            "Jednostka miary i wielkość opakowania zmieniają arytmetykę: 1 karton po 12 kontra 12 sztuk.",
            "Dostawy częściowe i podzielone faktury oznaczają, że jedno zamówienie odpowiada kilku fakturom, a dopasowanie jest typu wiele-do-jednego.",
            "Fracht, dopłaty i podatki pojawiają się na fakturze, ale nie w zamówieniu, i trzeba je zaklasyfikować jako dopuszczalne różnice, a nie niezgodności.",
          ],
        },
        {
          heading: "Tolerancje: co uznać za niezgodność",
          paragraphs: [
            "Żadne rzeczywiste dopasowanie nie jest dokładne. Ceny podaje się, zanim zmieni się kurs waluty; dostawcy zaokrąglają; fracht jest szacowany. Proces dopasowania, który zatrzymuje każdą fakturę z różnicą jednego centa, zostanie wyłączony w ciągu miesiąca. Rozwiązaniem jest polityka tolerancji: ustalona z góry reguła, ile odchylenia w każdym wymiarze jest dopuszczalne, zanim faktura zostanie wstrzymana.",
            "Typowe polityki dopuszczają niewielkie procentowe lub kwotowe odchylenie ceny jednostkowej, zerowe odchylenie ilości dla towarów fizycznych i osobny limit na pozycje frachtu i dopłat. Ważne, żeby reguła była spisana i stosowana przez system, a nie ustalana przez tego, kto akurat danego dnia dopasowuje. Faktury mieszczące się w tolerancji przechodzą dalej; te poza nią zatrzymują się i trafiają do człowieka.",
          ],
        },
        {
          heading: "Jak to zautomatyzować krok po kroku",
          paragraphs: [
            "Automatyzacja nie zaczyna się od oprogramowania do dopasowywania. Zaczyna się od sprowadzenia obu dokumentów do tego samego uporządkowanego kształtu, tak aby porównanie było zapytaniem, a nie lekturą.",
          ],
          bullets: [
            "Zdefiniuj jeden schemat pól dla dokumentów zamówieniowych: numer zamówienia, dostawca, SKU pozycji, opis, ilość, cena jednostkowa, wartość pozycji, suma. Używaj go dla zamówień, faktur i dowodów dostawy.",
            "Wyciągaj każdą przychodzącą fakturę do tego schematu. Większość zespołów pomija ten krok, a to on umożliwia wszystko, co dzieje się dalej.",
            "Ujednolicaj numery części dostawcy do swoich SKU, korzystając z kartoteki towarów; gdy brakuje mapowania, paruj pozycje na podstawie znaczenia opisu, a nie dokładnego tekstu.",
            "Najpierw sprawdź fakturę samą ze sobą: czy cena jednostkowa razy ilość daje wartość pozycji i czy pozycje sumują się do kwoty całkowitej? Błędy arytmetyczne najtaniej wyłapać i najbardziej wstyd je zapłacić.",
            "Dopasuj pola nagłówka po numerze zamówienia, a potem pozycje w ramach dopasowanego zamówienia. Stosuj politykę tolerancji w każdym wymiarze.",
            "Kieruj do weryfikatora tylko wyjątki — z fakturą, zamówieniem i konkretną niezgodnością przed oczami. Dopasowane faktury księguj od razu w ERP.",
            "Prowadź ścieżkę audytu: kto, co i kiedy zatwierdził. Audytorzy o nią pytają; dostawca też, gdy kwestionuje niepełną płatność.",
          ],
        },
      ],
      tavnit: {
        heading: "Gdzie pasuje Tavnit",
        paragraphs: [
          "Tavnit zajmuje się ekstrakcją i nadawaniem kształtu. Zamówienia zakupu, faktury i dowody dostawy przychodzą e-mailem lub przez API i są wyciągane do tych samych typowanych pól, niezależnie od układu dostawcy. Cleaner typu lookup mapuje numery części dostawcy na Twoje SKU; Cleaner z formułą sprawdza arytmetykę pozycji; warunek oznacza wszystko, co wykracza poza tolerancję.",
          "Przy dopasowaniu na poziomie pozycji Matcher traktuje przetworzone zamówienie jako punkt odniesienia i paruje z nim każdą pozycję faktury — semantycznie, z rozstrzygnięciem przez LLM w przypadkach granicznych — zestawiając obok siebie ilość i cenę jednostkową, a niedopasowane pozycje wymieniając jako ostrzeżenia. Oznaczone faktury czekają na wskazanego weryfikatora z niemodyfikowalną ścieżką audytu; pozostałe trafiają do ERP przez API lub webhook.",
        ],
        links: [
          { label: "Oprogramowanie do dopasowania zamówień", href: "/use-cases/purchase-orders" },
          { label: "Przetwarzanie faktur", href: "/use-cases/invoice-processing" },
          { label: "Dowody dostawy i kontrola przyjęcia towaru", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "Czym różni się dopasowanie dwustronne od trójstronnego?", a: "Dopasowanie dwustronne porównuje fakturę z zamówieniem zakupu — czy zgodziliśmy się kupić to po tej cenie? Trójstronne porównuje ją także z dokumentem przyjęcia towaru — czy to faktycznie dotarło? Trójstronne to standard dla towarów fizycznych; dwustronne jest powszechne przy usługach i zakupach o niskiej wartości." },
        { q: "Czy dopasowanie do zamówień można w pełni zautomatyzować?", a: "Samo porównanie — tak. Automatyzacji opiera się sprowadzenie PDF-a faktury dostawcy do tego samego uporządkowanego kształtu co zamówienie, bo układ, numery części i opisy każdego dostawcy są inne. Gdy ekstrakcja jest zautomatyzowana, dopasowanie staje się zapytaniem, a człowiek potrzebny jest tylko przy wyjątkach." },
        { q: "Jaką tolerancję ustawić przy dopasowaniu do zamówień?", a: "Nie ma uniwersalnej liczby. Większość polityk dopuszcza niewielkie procentowe lub kwotowe odchylenie ceny jednostkowej, zerowe odchylenie ilości dla towarów fizycznych, a fracht i dopłaty traktuje jako osobne dopuszczalne pozycje. Najważniejsze, żeby reguła była spisana i konsekwentnie stosowana przez system." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Wyciąganie pozycji z faktur: czym jest i dlaczego jest trudne",
      h1: "Wyciąganie pozycji z faktur",
      description:
        "Dlaczego wyciąganie pozycji z faktur jest trudniejsze niż wyciąganie sum, co powinna zwracać dobra ekstrakcja pozycji i jak pobrać dane z tabel w dowolnym układzie dostawcy bez szablonów.",
      lede: "Wyciąganie pozycji pobiera z faktury powtarzającą się tabelę — każdą pozycję towaru lub usługi z opisem, SKU, ilością, ceną jednostkową i wartością — do postaci uporządkowanych wierszy, a nie tylko pola nagłówka, takie jak dostawca, data i suma. To ono umożliwia dopasowanie do zamówień, analizę wydatków i uzgadnianie stanów magazynowych — i to właśnie z nim większość narzędzi OCR sobie nie radzi.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Pola nagłówka a pozycje",
          paragraphs: [
            "Każda faktura ma kilka pól nagłówka — dostawca, numer faktury, data, termin płatności, waluta, suma — które występują raz i łatwo je znaleźć. Potem jest tabela. Może mieć trzy wiersze albo trzysta; może rozciągać się na kilka stron; może mieć inny zestaw kolumn niż tabela każdego innego dostawcy. Wyciągnięcie nagłówka mówi Ci, ile zapłacić. Wyciągnięcie pozycji mówi, za co płacisz — a o to pyta każdy dalszy proces.",
            "Analiza wydatków potrzebuje kategorii pozycji. Dopasowanie do zamówień potrzebuje ilości i cen pozycji. Magazyn potrzebuje SKU pozycji. Podatki potrzebują stawek na poziomie pozycji. Faktura wyciągnięta bez pozycji to polecenie zapłaty bez treści.",
          ],
        },
        {
          heading: "Dlaczego tabele to najtrudniejsza część",
          paragraphs: [
            "Suma to pojedyncza wartość w przewidywalnym miejscu strony. Tabela to struktura, a ta struktura wszędzie jest inna. Klasyczne OCR odczytuje znaki i ich położenie; nie wie, że liczba pod „Ilość” należy do opisu dwie komórki w lewo, że opis przeszedł do drugiej linii ani że ostatnie trzy wiersze to sumy częściowe, a nie towary.",
          ],
          bullets: [
            "Zestawy kolumn różnią się u dostawców: jedni mają SKU i opis, inni tylko opis, jeszcze inni dzielą cenę jednostkową na netto i brutto.",
            "Wielowierszowe opisy się zawijają, a druga linia wygląda dla parsera opartego na pozycji jak nowy wiersz.",
            "Tabele rozciągają się na kilka stron, z powtórzonymi nagłówkami albo bez, i z sumami narastającymi na dole każdej strony.",
            "Wiersze niebędące towarami — sumy częściowe, rabaty, fracht, podatek, „ciąg dalszy” — siedzą w tabeli i trzeba je zaklasyfikować, a nie wyciągać jako produkty.",
            "Scalone komórki, wyrównane do prawej liczby wchodzące w sąsiednią kolumnę i przekrzywione skany psują parsowanie oparte na współrzędnych.",
            "Jednostki i wielkości opakowań kryją się w opisie („za karton 12 szt.”), a nie we własnej kolumnie.",
          ],
        },
        {
          heading: "Ekstrakcja z szablonami a bez szablonów",
          paragraphs: [
            "Narzędzia oparte na szablonach rozwiązują problem tabel, każąc Ci zaznaczyć obszar tabeli i kolumny dla układu każdego dostawcy. To działa — dla tego dostawcy, dopóki nie zmieni formatu faktury; od tego momentu narzędzie po cichu produkuje błędne wiersze, dopóki ktoś tego nie zauważy. Koszt utrzymania rośnie z liczbą dostawców, dlatego zespoły z setkami dostawców porzucają takie narzędzia.",
            "Ekstrakcja bez szablonów korzysta z modelu, który rozumie, czym jest pozycja faktury — tak jak człowiek — i zwraca wiersze według schematu zdefiniowanego raz — opis, ilość, cena jednostkowa, wartość — niezależnie od układu. Kompromis polega na tym, że model może się pomylić, dlatego wynik należy weryfikować, a nie przyjmować na wiarę: kontrole arytmetyczne w każdym wierszu i weryfikacja ręczna, gdy kontrola nie przejdzie.",
          ],
        },
        {
          heading: "Jak wygląda dobry wynik ekstrakcji pozycji",
          paragraphs: [
            "Wynik powinien być tabelą, a nie tekstem: jeden wiersz na pozycję, jedna typowana kolumna na pole, liczby jako liczby, daty jako daty. Każdy wiersz powinien zawierać pola potrzebne dalszemu procesowi i nic, co należy do nagłówka. Wiersze niebędące towarami powinny być pominięte lub oznaczone, a nie wymieszane z resztą. A wynik powinien dać się sprawdzić: jeśli cena jednostkowa razy ilość nie równa się wartości pozycji, ten wiersz jest błędny i powinien to sygnalizować.",
          ],
          bullets: [
            "Opis — dosłownie, bo na nim opiera się każde późniejsze dopasowanie czy kategoryzacja.",
            "SKU lub numer części — dostawcy, a także Twój, jeśli da się go ustalić z tabeli referencyjnej.",
            "Ilość i jednostka miary — jako osobne pola.",
            "Cena jednostkowa i wartość pozycji — obie, aby można było sprawdzić arytmetykę.",
            "Stawka lub kod podatku dla każdej pozycji, jeśli wymagają tego przepisy.",
            "Status weryfikacji na poziomie wiersza: arytmetyka się zgadza albo wiersz oznaczony z podaniem powodu.",
          ],
        },
      ],
      tavnit: {
        heading: "Gdzie pasuje Tavnit",
        paragraphs: [
          "W Tavnit pozycje to pola tabelaryczne we Flow: raz nazywasz kolumny, a każda faktura od każdego dostawcy jest wyciągana do tych kolumn jako typowane wiersze, bez szablonu dla dostawcy. Cleaner z formułą sprawdza w każdym wierszu cenę jednostkową razy ilość; Cleaner typu lookup mapuje numery części dostawcy na Twoje SKU; Cleaner kategorii przypisuje kategorie wydatków. Wiersze, które nie przejdą kontroli, kierują przetwarzanie do weryfikatora. Wyniki trafiają do Bucketu, który możesz przeszukiwać i wizualizować, albo prosto do Twoich systemów przez API lub webhook.",
        ],
        links: [
          { label: "Ekstrakcja danych z faktur", href: "/use-cases/invoice-processing" },
          { label: "Flows — definiowanie pól tabelarycznych", href: "/docs/flows" },
          { label: "Cleaners — pola z formułą i lookup", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Czy OCR potrafi wyciągnąć pozycje z faktur?", a: "Zwykłe OCR wyciąga znaki i ich położenie; nie rozumie struktury tabeli, więc daje tekst, który wciąż trzeba rozbić na wiersze. Niezawodna ekstrakcja pozycji wymaga warstwy, która rozumie, czym jest pozycja faktury — albo szablonu dla każdego dostawcy, albo modelu, który radzi sobie z różnymi układami." },
        { q: "Jak wyciągać tabele z faktur bez szablonu dla każdego dostawcy?", a: "Użyj modelu ekstrakcji, który zwraca wiersze według zdefiniowanego przez Ciebie schematu — opis, ilość, cena jednostkowa, wartość — niezależnie od układu, a potem sprawdzaj każdy wiersz kontrolą arytmetyczną i kieruj błędy do weryfikatora. Tak działają pola tabelaryczne w Tavnit." },
        { q: "Jak obsługiwać tabele na fakturach wielostronicowych?", a: "Ekstrakcja powinna traktować tabelę jako jedną logiczną całość na wszystkich stronach, ignorując powtórzone nagłówki i sumy narastające na poszczególnych stronach, i zwracać jeden zestaw wierszy. Sprawdź, czy wiersze sumują się do kwoty faktury, aby upewnić się, że nic nie zginęło na przełomie stron." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "Klasyfikacja kodów HS wyjaśniona — i jak ją zautomatyzować",
      h1: "Klasyfikacja kodów HS: czym jest i jak ją zautomatyzować",
      description:
        "Jak działa Zharmonizowany System, dlaczego klasyfikacja taryfowa wymaga osądu, gdzie wchodzą Ogólne reguły interpretacji i jak wygląda odpowiedzialna automatyzacja.",
      lede: "Klasyfikacja kodów HS przypisuje każdemu towarowi w obrocie kod ze Zharmonizowanego Systemu — międzynarodowej nomenklatury, na podstawie której organy celne ustalają stawki celne, podatki i kontrole. Pierwsze sześć cyfr jest wspólne dla całego świata; poszczególne kraje rozszerzają je do ośmiu, dziesięciu lub więcej cyfr dla krajowych pozycji taryfowych. Błędny kod oznacza złą stawkę cła, opóźnioną przesyłkę albo karę.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Jak zbudowany jest Zharmonizowany System",
          paragraphs: [
            "Zharmonizowany System prowadzi Światowa Organizacja Celna i aktualizuje go mniej więcej co pięć lat; obecna edycja to HS 2022. Składa się z 21 sekcji, 97 działów (2 cyfry), pozycji (4 cyfry) i podpozycji (6 cyfr). Te sześć cyfr jest identyczne w każdym kraju członkowskim — to właśnie czyni system zharmonizowanym. Powyżej sześciu cyfr każdy kraj dodaje własne podziały — krajowe pozycje taryfowe — do których przypisane są faktyczne stawki celne i podatki krajowe.",
            "Panamska Arancel Nacional de Importación rozszerza na przykład nomenklaturę HS 2022 do około 9 700 krajowych pozycji taryfowych, z których każda ma swoją stawkę cła przywozowego (DAI), podatek od sprzedaży (ITBMS) i, w stosownych przypadkach, selektywny podatek konsumpcyjny (ISC). Klasyfikacja nie kończy się na sześciu cyfrach; kończy się, gdy trafia na krajową pozycję, która określa należności.",
          ],
        },
        {
          heading: "Dlaczego klasyfikacja to osąd, a nie wyszukiwanie",
          paragraphs: [
            "Gdyby klasyfikacja była wyszukiwaniem w słowniku — nazwa produktu na wejściu, kod na wyjściu — zautomatyzowano by ją dekady temu. Tak nie jest, bo nomenklatura klasyfikuje towary według tego, z czego są wykonane, do czego służą i jak są prezentowane, a jeden opis produktu może pasować do kilku pozycji. Czy podgrzewany pokrowiec na fotel samochodowy to wyrób tekstylny, część pojazdu czy elektryczne urządzenie grzewcze? Każda z tych opcji ma inną stawkę.",
            "Rozstrzygają to Ogólne reguły interpretacji Zharmonizowanego Systemu (ORI, ang. GRI). Reguła 1 mówi, że decydują brzmienie pozycji oraz uwagi do sekcji i działów. Reguła 2 dotyczy towarów niekompletnych i mieszanin. Reguła 3 obejmuje towary, które mogłyby należeć do dwóch lub więcej pozycji — najpierw najbardziej szczegółowy opis, potem zasadniczy charakter, a na końcu pozycja ostatnia w kolejności numerycznej. Reguły 4–6 dotyczą towarów nigdzie indziej niewymienionych, opakowań i klasyfikacji na poziomie podpozycji. Klasyfikacja, którą da się obronić, wskazuje regułę, na której się opiera.",
            "Do tego dochodzą uwagi prawne: uwagi do działów i sekcji, które włączają określone towary do pozycji lub je z niej wyłączają, niezależnie od tego, co zdaje się mówić tekst pozycji. Klasyfikator, który czyta tytuły pozycji i ignoruje uwagi, będzie pewny siebie i w błędzie w przewidywalnej grupie produktów.",
          ],
        },
        {
          heading: "Gdzie klasyfikacja zawodzi w praktyce",
          paragraphs: [
            "Większość błędnych klasyfikacji to nie trudne przypadki z reguły 3. To rutynowe produkty źle opisane. Faktura handlowa mówi „części”, „próbki” albo podaje nazwę marki, a osoba klasyfikująca zgaduje albo zatrzymuje się, żeby dopytać. Opis jest surowcem klasyfikacji i zwykle najsłabszym elementem całego procesu.",
          ],
          bullets: [
            "Niejasne opisy na fakturze handlowej — marka lub numer modelu bez informacji, czym jest towar i z czego jest wykonany.",
            "Mieszane przesyłki, w których jedna pozycja faktury obejmuje kilka różnych produktów klasyfikowanych odmiennie.",
            "Poleganie na kodzie HS zadeklarowanym przez dostawcę, nadanym według taryfy innego kraju i być może w innym celu.",
            "Używanie zeszłorocznego kodu po zmianie edycji HS, która przeniosła produkt gdzie indziej.",
            "Ignorowanie uwag do działów i klasyfikowanie wyłącznie na podstawie tytułu pozycji.",
            "Brak zapisu, dlaczego wybrano dany kod, przez co ten sam produkt jest klasyfikowany na trzy sposoby przez trzy osoby.",
          ],
        },
        {
          heading: "Jak wygląda odpowiedzialna automatyzacja",
          paragraphs: [
            "Celem nie jest maszyna, która klasyfikuje bez nadzoru. Prawo celne nakłada odpowiedzialność za zgłoszenie na importera lub licencjonowanego agenta celnego i tak pozostanie. Celem jest system, który proponuje klasyfikację wraz z uzasadnieniem w momencie przetwarzania dokumentów przesyłki, tak aby specjalista weryfikował, a nie szukał od zera.",
          ],
          bullets: [
            "Zacznij od wyciągniętego, dosłownego opisu towaru oraz wszelkich informacji o materiale, funkcji i składzie z faktury lub listy pakunkowej.",
            "Klasyfikuj według taryfy krajowej — pełnego zestawu krajowych pozycji ze stawkami — a nie tylko sześciocyfrowego HS, i według aktualnej edycji.",
            "Stosuj uwagi prawne do działów i sekcji oraz ORI i zapisuj, która reguła i która uwaga rozstrzygnęły sprawę.",
            "Zwracaj kod, poziom pewności i uzasadnienie; pozycje o niskiej pewności lub wysokiej wartości kieruj do agenta celnego do weryfikacji przed złożeniem zgłoszenia.",
            "Prowadź ścieżkę audytu dla każdej klasyfikacji. Gdy urząd celny zakwestionuje kod dwa lata później, uzasadnienie będzie Twoją obroną.",
            "Ucz się na poprawkach agenta celnego: produkt raz sklasyfikowany powinien następnym razem zostać sklasyfikowany tak samo.",
          ],
        },
      ],
      tavnit: {
        heading: "Gdzie pasuje Tavnit",
        paragraphs: [
          "Tavnit wyciąga zestaw dokumentów przesyłki — fakturę handlową, listę pakunkową, konosament, świadectwo pochodzenia — do typowanych pól, a następnie Cleaner kodów HS klasyfikuje każdą pozycję towarową na podstawie wyciągniętego opisu w ramach tego samego przetwarzania. Dla Panamy klasyfikator pracuje na oficjalnej Arancel Nacional (VII Enmienda, HS 2022) z jej krajowymi pozycjami i stawkami DAI, ITBMS i ISC, stosując uwagi prawne do działów i ORI, więc wynikiem jest krajowa pozycja taryfowa z uzasadnieniem, a nie zgadywany sześciocyfrowy kod.",
          "Klasyfikacje przechodzą przez weryfikację ręczną, zanim cokolwiek zostanie złożone, z niemodyfikowalną ścieżką audytu tego, kto zatwierdził który kod. Uporządkowane, sklasyfikowane dane mogą następnie wstępnie wypełnić formularz zgłoszenia, zamiast być do niego przepisywane.",
        ],
        links: [
          { label: "Automatyzacja celna z klasyfikacją HS", href: "/use-cases/customs-trade" },
          { label: "Aduanas y clasificación arancelaria (Panamá) — po hiszpańsku", href: "/es/aduanas" },
          { label: "Cleaners — typ pola kodu HS", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Czym różni się kod HS od kodu taryfowego?", a: "Kod HS to sześciocyfrowy kod międzynarodowy zdefiniowany przez Światową Organizację Celną. Kod taryfowy to jego krajowe rozszerzenie — osiem, dziesięć lub więcej cyfr — do którego przypisane są krajowe stawki cła i podatków. Panamska Arancel Nacional, unijny TARIC i amerykańska HTS to taryfy krajowe zbudowane na HS." },
        { q: "Czy AI potrafi trafnie klasyfikować kody HS?", a: "Potrafi dobrze proponować klasyfikacje, gdy pracuje na dobrym opisie produktu, według pełnej taryfy krajowej z uwagami prawnymi, i wyjaśnia swoje rozumowanie. Nie powinna składać zgłoszeń bez nadzoru: odpowiedzialne podejście to propozycja z poziomem pewności i uzasadnieniem, weryfikowana przez licencjonowanego agenta celnego w przypadku pozycji o niskiej pewności lub wysokiej wartości." },
        { q: "Czy mogę po prostu użyć kodu HS, który dostawca podał na fakturze?", a: "Traktuj go jako wskazówkę, nie odpowiedź. Dostawca klasyfikował według taryfy własnego kraju, być może na potrzeby kontroli eksportu, a nie cła przywozowego, i być może według starszej edycji HS. Za kod w zgłoszeniu przywozowym odpowiada importer lub agent celny." },
      ],
    },
  ],
};

export default pl;
