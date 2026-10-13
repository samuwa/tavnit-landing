import { Fragment } from "react";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /pl/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Zbuduj schemat". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Zbuduj w Tavnit Flow, który wyodrębnia dane strukturalne z dokumentu",
    description:
      "Utwórz Flow, zdefiniuj jego pola metadanych i pola tabeli, dodaj wskazówki ekstrakcji tylko tam, gdzie są potrzebne, i przetestuj go na prawdziwym dokumencie.",
    steps: [
      {
        name: "Utwórz Flow i opisz go",
        text: "Na stronie Flows kliknij Utwórz Flow i wybierz szablon, sugestię AI lub pusty Flow. Nadaj mu nazwę i opis dokumentów, które obsługuje — opis pomaga też AI dokładniej wyodrębniać dane.",
      },
      {
        name: "Dodaj pola metadanych",
        text: "Dodaj pole dla każdej wartości, która pojawia się w dokumencie raz, np. numeru faktury, daty wystawienia lub dostawcy, i ustaw jego typ danych.",
      },
      {
        name: "Dodaj pola tabeli",
        text: "Dodaj pole dla każdej kolumny powtarzającej się tabeli pozycji, np. opisu, ilości, ceny jednostkowej i kwoty.",
      },
      {
        name: "Dodaj wskazówki ekstrakcji tam, gdzie są potrzebne",
        text: "Dodawaj wskazówki tylko do pól, które ich potrzebują: prawdziwe przykładowe wartości, etykietę, obok której stoi wartość, obszar strony, w którym się pojawia, lub wydrukowany nagłówek kolumny.",
      },
      {
        name: "Przetestuj na prawdziwym dokumencie",
        text: "Nowy Flow jest od razu Aktywny. Kliknij Uruchom, przetwórz jeden prawdziwy dokument, porównaj wynik ze źródłem i doprecyzuj wskazówki dla każdego pola, które wróciło z błędem.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Schemat danych Flow w Tavnit: pola metadanych i pola tabeli zdefiniowane obok siebie.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsPl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Czym jest Flow">
        <Lead>
          Flow to definicja jednego typu dokumentu: pola, które chcesz wyodrębnić, wskazówki, które
          mówią AI, gdzie ich szukać, i wszystko, co jest podpięte dalej. To obiekt w Tavnit, który
          zamienia dokument w dane — Collections, Subjects, Splitters i Cleaners istnieją po to, by
          zasilać lub dopracowywać to, co produkuje Flow.
        </Lead>
        <p>
          Nie ma szablonu do rysowania ani współrzędnych do mapowania. Opisujesz pola zwykłymi
          słowami, a Flow działa niezależnie od układu, więc jeden Flow <em>Faktury od dostawców</em>{" "}
          poradzi sobie z dwudziestoma dostawcami, których faktury zupełnie się od siebie różnią.
          Dlatego właśnie to schemat i jego wskazówki niemal w całości decydują o jakości
          ekstrakcji.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Schemat danych Flow w Tavnit o nazwie Invoice Processor. Panel Pola metadanych zawiera dziewięć pól pojedynczych wartości, takich jak Invoice Number, Due Date i Total, z ich typami danych, a obok panel Pola tabeli z polami Description, Quantity, Price i Amount. Lewy pasek grupuje pozycje Ostatnie Runs, Wyzwalacz e-mail, Collections, Cleaner, Agent, Szablony formularzy, Wysyłka e-mailem, Webhook, Eksport do Bucket, Weryfikacja ręczna i ID Flow."
          caption="Schemat danych Flow. Pola metadanych po lewej, powtarzające się pola tabeli po prawej, a na pasku wszystko, co można podpiąć do Flow."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Wymagany jest tylko schemat">
          Flow potrzebuje co najmniej jednego pola. Wszystko inne na pasku — Cleaner, agent,
          webhook, e-mail, eksport do Bucket, weryfikacja — jest opcjonalne i można to dodać później
          bez przebudowywania czegokolwiek. Flows mogą tworzyć i edytować Właściciele i
          Administratorzy.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Utwórz Flow">
        <Lead>
          Kliknij <strong>Utwórz Flow</strong> na stronie Flows, a Tavnit zapyta{" "}
          <em>„Jak chcesz zacząć?”</em>. Wszystkie trzy ścieżki kończą się tym samym edytowalnym
          Flow, więc wybierz tę, która najszybciej doprowadzi Cię do dobrej pierwszej wersji.
        </Lead>
        <DataTable
          head={["Opcja", "Co robi", "Najlepsza, gdy"]}
          rows={[
            [
              "Z szablonu",
              <Fragment key="c0">
                Otwiera galerię z dwiema zakładkami. <strong>Szablony Tavnit</strong> to gotowe Flows
                z już wypełnionymi polami i wskazówkami; w zakładce <strong>Moje Flows</strong>{" "}
                możesz użyć <strong>Utwórz kopię</strong> na jednym z własnych aktywnych Flows.
              </Fragment>,
              "Twój dokument jest popularnego typu albo jest podobny do Flow, który już masz.",
            ],
            [
              "Sugestia AI",
              "Prześlij przykładowy PDF lub obraz. AI go czyta, wykrywa pola i przygotowuje projekt nazwy, opisu i schematu ze wskazówkami. Odznacz to, czego nie potrzebujesz, i edytuj dowolne pole przed utworzeniem Flow.",
              "Twój dokument jest specyficzny dla Twojej firmy i chcesz szybko wystartować.",
            ],
            [
              "Zacznij od zera",
              "Pusty schemat. Każde pole definiujesz samodzielnie.",
              "Wiesz dokładnie, czego potrzebujesz, albo odtwarzasz istniejący proces.",
            ],
          ]}
        />
        <p>
          Szablony Tavnit obejmują faktury, zamówienia, paragony, wyciągi bankowe, dowody dostawy,
          wyniki badań laboratoryjnych, umowy, oferty, faktury korygujące, dokumenty tożsamości i
          CV. Jeśli przy zakładaniu organizacji odpowiedziałeś na pytania powitalne, szablony
          pasujące do Twoich dokumentów są wyświetlane jako pierwsze, a pusta strona Flows
          proponuje utworzenie ich wszystkich jednym kliknięciem przycisku{" "}
          <strong>Utwórz te Flows</strong>.
        </p>
        <p>
          Każda ścieżka kończy się nazwą (co najmniej 3 znaki) i opisem (co najmniej 10 znaków).
          Flow otwiera się w edytorze z krótkim przewodnikiem <em>„Skonfiguruj swój Flow”</em> i od
          początku jest <strong>Aktywny</strong> — użyj przełącznika na górnym pasku, aby go
          dezaktywować. Nieaktywnego Flow nie można uruchomić.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="Sugestia AI nie tworzy Run">
          Przygotowanie Flow na podstawie przykładowego dokumentu nie tworzy Run. Traktuj ten projekt
          jako punkt wyjścia — usuń to, czego nie będziesz używać, bo każde dodatkowe pole to więcej
          do sprawdzania i więcej rzeczy, które mogą pójść nie tak.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Pola metadanych i pola tabeli">
        <Lead>
          Każde pole należy do jednego z dwóch rodzajów, zależnie od tego, czy wartość pojawia się
          raz na dokument, czy raz na wiersz. To najbardziej brzemienna w skutki decyzja w
          schemacie: określa kształt payloadu webhooka, wierszy w Bucket, pliku CSV i ekranu
          weryfikacji.
        </Lead>
        <DataTable
          head={["", "Pole metadanych", "Pole tabeli"]}
          rows={[
            ["Występuje", "Raz na dokument", "Raz na wiersz powtarzającej się tabeli"],
            [
              "Na fakturze",
              "Numer faktury, data wystawienia, dostawca, suma",
              "Opis, ilość, cena jednostkowa, kwota",
            ],
            [
              "W wyniku",
              <Fragment key="f0">
                Obiekt <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Jeden wpis na wiersz w <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "W Bucket",
              "Powtarzane w każdym wierszu wyeksportowanym z tego dokumentu",
              "Każdy to osobny wiersz w Bucket",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Pomylenie rodzaju to klasyczny błąd">
          Jeśli zdefiniujesz kolumnę pozycji jako pole metadanych, dostaniesz jedną wartość z tabeli
          liczącej dwadzieścia. Jeśli zdefiniujesz sumę faktury jako pole tabeli, ta sama liczba
          powtórzy się w każdym wierszu. Gdy nie masz pewności, zadaj sobie pytanie, czy w tym samym
          dokumencie mogłaby się kiedykolwiek pojawić druga kopia tej wartości.
        </InfoBox>
        <p>
          Flow zawierający <strong>wyłącznie pola metadanych</strong> — dokument tożsamości,
          certyfikat, jednostronicowy formularz — zwraca jeden wiersz na dokument z tymi
          wartościami, więc wynik i tak trafia do widoku tabeli, do Bucket, do webhooka i do
          e-maila jak każdy inny Run.
        </p>
        <p>
          Flow może też dopisywać <strong>Kolumny systemowe</strong> do każdego zwracanego wiersza
          — ID Flow, nazwę Flow i ID Run. Włącz je, gdy kilka Flows zapisuje do jednego{" "}
          <DocLink href="/docs/buckets">Bucket</DocLink> i musisz wiedzieć, z którego dokumentu
          pochodzi dany wiersz.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Typy danych">
        <Lead>
          Każde pole ma typ. Typy nie są kosmetyką: decydują o tym, czy wartość poprawnie się
          sortuje, sumuje, porównuje w regule Cleanera i trafia na wykres. Prawidłowe ustawienie ich
          już we Flow oszczędza pracy na każdym kolejnym etapie.
        </Lead>
        <DataTable
          head={["Typ", "Do czego", "Uwagi"]}
          rows={[
            ["Tekst", "Nazwy, adresy, opisy, kody referencyjne", "Bezpieczny wybór domyślny."],
            [
              "Liczba",
              "Sumy, ilości, ceny, stawki",
              "Wymagany, jeśli chcesz później sumować, porównywać wartość lub pokazywać ją na wykresie.",
            ],
            [
              "Data",
              "Daty wystawienia, terminy płatności, daty dostawy",
              <Fragment key="f2">
                Przeformatowanie do spójnego formatu wyjściowego to zadanie dla{" "}
                <DocLink href="/docs/cleaners">Cleanera</DocLink>, a nie dla ekstrakcji.
              </Fragment>,
            ],
            [
              "Mieszany/alfanumeryczny",
              "Wartości łączące litery i cyfry — numery części, kody kontenerów, numery identyfikacji podatkowej",
              "Używaj go zamiast typu Liczba, gdy muszą się zachować zera wiodące lub litery.",
            ],
            [
              "Obraz",
              "Elementy graficzne wydrukowane w dokumencie: zdjęcia, logo, podpisy, pieczątki",
              "Wyodrębniane i bezpiecznie przechowywane, a następnie dostarczane jako link ważny przez ograniczony czas.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Wyodrębniaj tak, jak wydrukowano, normalizuj później">
          Nie używaj typu do przeformatowania. Pobierz wartość tak, jak pokazuje ją dokument, a potem
          pozwól Cleanerowi przeliczyć waluty, zapisać daty na nowo i poprawić separatory
          dziesiętne. Ekstrakcję, która przy okazji przekształca dane, trudniej debugować, gdy
          liczba wraca z błędem.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Wskazówki ekstrakcji">
        <Lead>
          Wskazówki pozwalają ujednoznacznić pole bez pisania szablonu. Najbardziej przydają się
          wtedy, gdy dokument zawiera kilka podobnie wyglądających wartości — trzy daty, dwie sumy,
          numer zamówienia i numer faktury w tym samym bloku nagłówka.
        </Lead>
        <p>
          <strong>W polu metadanych</strong> możesz łączyć dowolne z tych wskazówek:
        </p>
        <DataTable
          head={["Wskazówka", "Co mówi AI", "Dobra do"]}
          rows={[
            [
              "Przykładowe wartości",
              "Prawdziwe wartości skopiowane z Twoich dokumentów.",
              "Prawie wszystkiego. Najcenniejsza pojedyncza wskazówka — pokazuje naraz format, długość i kształt.",
            ],
            [
              "Obok etykiety",
              <Fragment key="f3">
                Wydrukowana etykieta, obok której stoi wartość. Wymień warianty:{" "}
                <em>Invoice Number, Invoice #, Inv No</em>.
              </Fragment>,
              "Pól nagłówka, które różni dostawcy opisują różnymi etykietami.",
            ],
            [
              "W określonym obszarze strony",
              "Jedna z dziewięciu stref — od lewego górnego do prawego dolnego rogu.",
              "Wartości, które zawsze są w tym samym rogu, np. numeru dokumentu w prawym górnym rogu.",
            ],
            [
              "Oczekiwany zakres",
              "Minimum, maksimum lub oba. Traktowany jako wskazówka, a nie twarda reguła.",
              "Wychwytywania błędnie odczytanego przecinka dziesiętnego — sumy 27 030 tam, gdzie chodziło o 270,30.",
            ],
            [
              "Dodatkowe wskazówki",
              "Dowolny tekst na wszystko, czego nie obejmują powyższe opcje.",
              "Reguł takich jak „bierz kwotę netto, nigdy brutto”.",
            ],
          ]}
        />
        <p>
          <strong>W polu tabeli</strong> wskazówki są inne, bo AI lokalizuje kolumnę, a nie punkt na
          stronie:
        </p>
        <DataTable
          head={["Wskazówka", "Co mówi AI"]}
          rows={[
            [
              "Typ źródła",
              "Tabela dla danych w prawdziwej tabeli z kolumnami; Dowolna forma dla wartości przypominających wiersze w nieustrukturyzowanym tekście, np. w umowie.",
            ],
            [
              "Nagłówki kolumn",
              "Tekst nagłówka w wydrukowanej postaci. Wymień każdy wariant używany przez Twoich dostawców, żeby jedno pole pasowało do wszystkich.",
            ],
            ["Oczekiwany zakres", "Rozsądny zakres liczb w tej kolumnie."],
            ["Przykładowe wartości", "Prawdziwe wartości komórek z Twoich dokumentów."],
            [
              "Dodatkowe informacje",
              "Co kolumna faktycznie oznacza, gdy sam nagłówek jest niejednoznaczny — „cena jednostkowa przed rabatem”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Zacznij bez wskazówek">
          Dodaj pola, uruchom jeden prawdziwy dokument i dodawaj wskazówki tylko tam, gdzie wynik
          był błędny. Wskazówki dodane od razu wszędzie zabierają czas na polach, które nigdy nie
          były niejednoznaczne, a zbyt szczegółowa wskazówka może pogorszyć ekstrakcję, wykluczając
          układ, którego nie przewidziałeś. Gdy Flow ma już kilka Runs, <strong>Diagnozuj</strong>{" "}
          może zaproponować wskazówki za Ciebie.
        </InfoBox>
        <p>
          Przykładowe wartości są pomijane w polach typu <strong>Data</strong> i{" "}
          <strong>Obraz</strong>, więc wszelkie wskazówki dotyczące dat wpisz w pole dodatkowych
          wskazówek.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Pola złożone">
        <Lead>
          Niektóre kolumny tabeli zawierają kilka wartości w jednej komórce — rozbicie rozmiarów i
          ilości, takie jak <em>S:2 M:5 L:3</em>, wydrukowane w jednym polu. Pole złożone dzieli taką
          komórkę na pola podrzędne, dzięki czemu każda część staje się osobną wartością, a nie
          ciągiem znaków, który trzeba później parsować.
        </Lead>
        <NumberedList
          items={[
            "Dodaj pole tabeli i włącz opcję Pole złożone.",
            <Fragment key="f4">
              Zdefiniuj pola podrzędne, z których składa się komórka — np.{" "}
              <InlineCode>size</InlineCode> jako tekst i <InlineCode>quantity</InlineCode> jako
              liczbę.
            </Fragment>,
            "Dodaj przykładowe wartości pokazujące, jak to grupowanie wygląda w Twoich dokumentach.",
          ]}
        />
        <p>
          Pola podrzędne przechowują pojedyncze wartości, więc mogą być typu Tekst, Liczba, Data lub
          Mieszany/alfanumeryczny — ale nie Obraz. Pola złożone są dostępne tylko w polach tabeli,
          bo cały sens polega na rozpakowaniu powtarzającej się komórki.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Wielowartościowe pola metadanych">
          Odpowiednikiem dla metadanych jest opcja <strong>Akceptuj wiele wartości</strong>. Włącz
          ją, gdy jeden dokument może zasadnie zawierać kilka rzeczy tego samego rodzaju — zestaw
          numerów paragonów, kilka numerów zamówień — a pole zwróci listę zamiast jednej wartości.
          Nie jest dostępna w polach typu Obraz.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Wyodrębnianie obrazów">
        <Lead>
          Pole typu Obraz wyciąga z dokumentu element graficzny zamiast tekstu: zdjęcie produktu,
          podpis, pieczątkę, logo. Obrazowe pole metadanych przechowuje jeden obraz na dokument;
          obrazowe pole tabeli przypisuje każdemu wierszowi należący do niego obraz.
        </Lead>
        <BulletList
          items={[
            "Obrazy są przechowywane prywatnie, więc trafiają dalej jako linki ważne przez ograniczony czas, a nie surowe bajty",
            "Ten sam rodzaj linku pojawia się w payloadzie webhooka, w wysyłce e-mailem i w komórce CSV; eksport ze strony Run generuje świeże linki",
            "Linki w dostarczanych wynikach są ważne przez siedem dni — pobierz obraz, zamiast przechowywać link",
            "Pola typu Obraz nie mogą być złożone ani akceptować wielu wartości, a wskazówki z przykładowymi wartościami ich nie dotyczą",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Zbuduj schemat">
        <Lead>
          Najpierw zbuduj pola metadanych, potem pola tabeli, a na końcu wskazówki. Testuj na
          prawdziwym dokumencie od samego początku — schemat, który dobrze wygląda na papierze, i
          schemat, który radzi sobie z Twoimi faktycznymi dokumentami, to dwie różne rzeczy.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Kliknij <strong>Utwórz Flow</strong> i wybierz szablon, sugestię AI lub pusty Flow.
              Nadaj mu nazwę opisującą dokument (<em>Faktury od dostawców</em>) i rzeczowy opis —
              poprawia on dokładność ekstrakcji i to na jego podstawie{" "}
              <DocLink href="/docs/collections">Collection</DocLink> później dopasowuje dokumenty.
            </Fragment>,
            <Fragment key="f6">
              W sekcji <strong>Pola metadanych</strong> kliknij <strong>Dodaj pole</strong> dla
              każdej wartości, która pojawia się w dokumencie raz, od razu ustawiając typ danych.
            </Fragment>,
            <Fragment key="f7">
              W sekcji <strong>Pola tabeli</strong> dodaj pole dla każdej kolumny powtarzającej się
              tabeli pozycji.
            </Fragment>,
            <Fragment key="f8">
              Dodawaj <strong>wskazówki ekstrakcji</strong> tylko do pól, które ich potrzebują.
            </Fragment>,
            <Fragment key="f9">
              Flow jest już <strong>Aktywny</strong>. Kliknij <strong>Uruchom</strong>, przetwórz
              jeden prawdziwy dokument i porównaj wynik ze źródłem.
            </Fragment>,
          ]}
        />
        <p>Przeciągaj pola za uchwyt, aby zmienić ich kolejność.</p>
        <WarningBox>
          Zmiana nazwy pola zmienia klucz u każdego odbiorcy dalej w łańcuchu: w payloadzie
          webhooka, w mapowaniu kolumn Bucket, w nagłówku CSV i w każdym{" "}
          <DocLink href="/docs/cleaners">Cleanerze</DocLink>, który je odczytuje. Zanim zmienisz
          nazwę pola we Flow, który już działa, sprawdź, co jest do niego podpięte.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Jakie pliki czyta Flow">
        <Lead>
          Flow przyjmuje pliki PDF, obrazy i arkusze kalkulacyjne każdą drogą — przez przesłanie,
          e-mail i API. Tavnit sam decyduje, jak odczytać każdy plik, więc niczego nie konfigurujesz
          osobno dla każdego formatu.
        </Lead>
        <DataTable
          head={["Plik", "Formaty", "Jak jest odczytywany"]}
          rows={[
            [
              "PDF",
              "PDF",
              "Cyfrowe pliki PDF są odczytywane bezpośrednio. Zeskanowane pliki PDF są wykrywane automatycznie i najpierw odczytywane za pomocą OCR.",
            ],
            [
              "Obraz",
              "PNG, JPG, JPEG, JFIF",
              "Odczytywany jak zeskanowana strona. JFIF to odmiana JPEG, którą niektóre przeglądarki w systemie Windows zapisują domyślnie; działa jak każdy JPEG.",
            ],
            [
              "Arkusz kalkulacyjny",
              "XLSX, XLS, CSV",
              "Odczytywany jest pierwszy widoczny arkusz. Pozostałe i ukryte arkusze są ignorowane, więc umieść potrzebne dane w pierwszym arkuszu.",
            ],
          ]}
        />
        <p>
          Bardzo duże arkusze są odrzucane z czytelnym komunikatem błędu. Aby przetworzyć każdy
          arkusz skoroszytu jako osobny dokument, wyślij go zamiast tego przez{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Zły skan: wymuś OCR dla plików, które źle się wyodrębniają">
          Zeskanowane dokumenty już automatycznie przechodzą przez OCR. Niektóre pliki wyglądają na
          cyfrowe, ale mają uszkodzoną warstwę tekstową — skan ze słabą osadzoną transkrypcją, PDF
          wyeksportowany z nietypowego narzędzia. W takim przypadku otwórz <strong>Zły skan</strong>{" "}
          w ustawieniach Flow i włącz tę opcję: każdy plik w tym Flow będzie wtedy najpierw
          odczytywany za pomocą OCR, a ekstrakcja będzie pracować na odzyskanym tekście. Jeśli OCR
          jest niedostępny lub zawiedzie, Run automatycznie wraca do standardowego potoku
          przetwarzania.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Co możesz podpiąć do Flow">
        <Lead>
          Schemat decyduje o tym, co wychodzi; reszta Flow decyduje o tym, co się z tym dzieje.
          Każdy z poniższych elementów jest niezależny — podpinaj tylko to, czego potrzebujesz, w
          dowolnej kolejności i w dowolnym momencie.
        </Lead>
        <DataTable
          head={["Etap", "Element", "Co robi"]}
          rows={[
            [
              "Wejścia",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">Wyzwalacz e-mail</DocLink>
              </Fragment>,
              "Daje Flow własny adres skrzynki odbiorczej, dzięki czemu przekazane dokumenty (PDF, obraz lub arkusz) są przetwarzane automatycznie.",
            ],
            [
              "Wejścia",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Pokazuje Collections, które mogą kierować dokumenty do tego Flow.",
            ],
            [
              "Przetwarzanie",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Przetwarza wiersze każdego Run: formatuje, przelicza, oblicza, wyszukuje i uruchamia reguły.",
            ],
            [
              "Przetwarzanie",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "Uruchamia się po ekstrakcji i używa wyodrębnionych pól jako danych wejściowych.",
            ],
            [
              "Przetwarzanie",
              "Szablony formularzy",
              "Wypełnia szablon PDF wartościami wyodrębnionymi w Run.",
            ],
            [
              "Wyjścia",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">Wysyłka e-mailem</DocLink>
              </Fragment>,
              "Po każdym udanym Run wysyła wyniki e-mailem na jeden lub więcej adresów, opcjonalnie z załącznikami JSON, CSV, wypełnionymi formularzami i oryginalnym dokumentem.",
            ],
            [
              "Wyjścia",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Wysyła wyniki żądaniem POST na Twój endpoint. Tylko HTTPS.",
            ],
            [
              "Wyjścia",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Eksport do Bucket</DocLink>
              </Fragment>,
              "Dopisuje wiersze każdego Run do ustrukturyzowanej tabeli, z polami zmapowanymi na kolumny.",
            ],
            [
              "Ustawienia",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Weryfikacja ręczna</DocLink>
              </Fragment>,
              "Wstrzymuje Runs do weryfikacji, zanim cokolwiek zostanie dostarczone.",
            ],
            ["Ustawienia", "Zły skan", "Wymusza OCR dla każdego pliku w tym Flow (patrz wyżej)."],
            [
              "Ustawienia",
              "ID Flow",
              <Fragment key="f18">
                Identyfikator, który przekazujesz przy wywołaniu{" "}
                <DocLink href="/docs/api-integration">API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Opcje Wyzwalacza e-mail.</strong> Po włączeniu wyzwalacza panel pokazuje adres
          skrzynki odbiorczej Flow i dwa ustawienia. <strong>Dozwoleni nadawcy</strong> ogranicza,
          kto może uruchomić Run e-mailem; zostaw puste, aby przyjmować wiadomości od każdego
          nadawcy. <strong>Przetwarzaj treść e-maila</strong> wyodrębnia dane także z samej treści
          wiadomości — albo <em>Tylko gdy nie ma załączników</em> (domyślnie, żeby notatka
          przewodnia nigdy nie uruchomiła drugiego Run), albo <em>Zawsze</em>. Adres nadawcy jest
          zapisywany przy każdym Run i widoczny na stronie Runs. Szczegóły znajdziesz na stronie{" "}
          <DocLink href="/docs/email-integration">Integracja e-mail</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Zdiagnozuj Flow">
        <Lead>
          Gdy Flow przetworzy już trochę dokumentów, przycisk <strong>Diagnozuj</strong> na górnym
          pasku Flow otwiera <strong>Doktor Flow</strong>. Analizuje on Twoje ostatnie zakończone
          Runs, znajduje pola, które ciągle wracają puste lub z niewłaściwym typem, i proponuje
          poprawki.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Otwórz Flow i kliknij <strong>Diagnozuj</strong>. Przycisk pojawia się, gdy Flow ma
              co najmniej jedno pole, i jest dostępny dla Właścicieli i Administratorów.
            </Fragment>,
            "Tavnit czyta ostatnie Runs, ponownie odczytuje kilka dokumentów, w których pola zawiodły, i przygotowuje poprawki. To chwilę trwa.",
            <Fragment key="d1">
              Przejrzyj wynik. Każde problematyczne pole pokazuje, jak często było puste lub miało
              niewłaściwy typ, ze wskazówką <strong>Obecne</strong> obok wskazówki{" "}
              <strong>Proponowane</strong>. Doktor może też zaproponować{" "}
              <strong>Proponowany opis</strong>.
            </Fragment>,
            <Fragment key="d2">
              Zachowaj lub edytuj poprawki, z którymi się zgadzasz, i kliknij{" "}
              <strong>Zastosuj</strong>. Nic się nie zmienia, dopóki ich nie zastosujesz; zamknięcie
              panelu odrzuca propozycje.
            </Fragment>,
          ]}
        />
        <p>
          Jeśli wszystko wygląda dobrze, zobaczysz <em>„Ekstrakcja wygląda dobrze”</em>. Diagnoza
          uruchamia się tylko wtedy, gdy klikniesz przycisk. Po zastosowaniu poprawek uruchom
          ponownie prawdziwy dokument, aby potwierdzić, że pomogły.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: co się dzieje, gdy dokument jest przetwarzany">
          <Lead>
            Każdy dokument staje się Run, a każdy Run przechodzi przez tę samą sekwencję. Znajomość
            tej kolejności podpowiada, gdzie szukać, gdy coś dociera z opóźnieniem, dociera z
            błędami albo nie dociera wcale.
          </Lead>
          <NumberedList
            items={[
              "Dokument zostaje zapisany, a Run trafia do kolejki.",
              "Ekstrakcja go odczytuje i tworzy wartości metadanych oraz wiersze tabeli.",
              "Jeśli podpięty jest Cleaner, przetwarza te wiersze — przeliczenia, kolumny obliczane, wyszukiwania.",
              "Uruchamiają się reguły warunkowe: wiersze mogą zostać usunięte, powiadomienia wysłane, weryfikacja zażądana.",
              "Jeśli wymagana jest weryfikacja, Run zostaje wstrzymany i nic nie jest dostarczane, dopóki weryfikator nie zatwierdzi.",
              "Uruchamiają się wyjścia: e-mail, eksport do Bucket i webhook. Następnie Run zostaje oznaczony jako zakończony, a podpięty agent, jeśli jest, startuje.",
            ]}
          />
          <DataTable
            head={["Status Run", "Znaczenie"]}
            rows={[
              ["Oczekujący (w kolejce)", "Zapisany i czeka na workera."],
              ["Przetwarzanie", "Trwa ekstrakcja, czyszczenie lub dostarczanie. Strona Run pokazuje bieżący etap."],
              [
                "Ponawianie",
                "Poprzednia próba nie powiodła się z przejściowej przyczyny i Run został automatycznie ponownie dodany do kolejki (patrz niżej).",
              ],
              [
                "Oczekuje na weryfikację HITL",
                <Fragment key="f19">
                  Wstrzymany do <DocLink href="/docs/human-in-the-loop">weryfikacji ręcznej</DocLink>.
                  Nic nie zostało jeszcze dostarczone.
                </Fragment>,
              ],
              ["Zakończony", "Ekstrakcja się zakończyła i każde skonfigurowane wyjście zostało wykonane."],
              [
                "Anulowany",
                "Ktoś anulował Run, gdy był w kolejce lub w trakcie przetwarzania, albo weryfikator go odrzucił. Nic więcej nie jest dostarczane.",
              ],
              ["Nieudany", "Dokumentu nie udało się przetworzyć. Log Run podaje przyczynę."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Praca z Runs">
        <Lead>
          Strona <strong>Runs</strong> pokazuje wszystkie Runs w Twojej organizacji; każdy Flow ma
          też własną zakładkę <strong>Ostatnie Runs</strong>. Użyj <strong>Filtruj</strong>, aby
          zawęzić listę według statusu, zakresu dat, Flow, użytkownika, źródła lub wklejonego ID
          Run.
        </Lead>
        <DataTable
          head={["Akcja", "Gdzie", "Uwagi"]}
          rows={[
            [
              "Zobacz szczegóły",
              "Menu akcji Run lub kliknięcie wiersza",
              "Wyodrębnione dane obok pliku źródłowego, informacje o Run i log przetwarzania.",
            ],
            [
              "Pobierz CSV",
              "Menu akcji Run",
              "Tylko zakończone Runs. Eksportuj CSV i Eksportuj JSON są też dostępne na stronie Run.",
            ],
            [
              "Pobierz plik",
              "Menu akcji Run lub Pobierz na stronie Run",
              "Oryginalny plik źródłowy. Arkuszy kalkulacyjnych nie da się podejrzeć w aplikacji, więc pobierz je, aby je obejrzeć.",
            ],
            [
              "Anuluj Run",
              "Menu akcji Run",
              "Tylko dla Runs, które są jeszcze w kolejce lub w trakcie.",
            ],
          ]}
        />
        <p>
          Kolumna <strong>Uruchomione przez</strong> pokazuje, kto uruchomił Run — użytkownika w
          przypadku przesłania albo adres nadawcy w przypadku Run, który przyszedł e-mailem. Kolumna{" "}
          <strong>Źródło</strong> mówi, jak dotarł: przesłanie ręczne, API, e-mail i tak dalej.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Nieudane Runs i automatyczne ponowienia">
        <Lead>
          Większość niepowodzeń wynika z samego dokumentu — nieczytelnego pliku lub
          nieobsługiwanego typu — i ponowienie by nie pomogło. Kilka jednak nie: worker
          przetwarzający restartuje się w trakcie Run albo dostawca AI ma chwilową awarię. W takich
          przypadkach organizacja może pozwolić Tavnit ponawiać próby samodzielnie.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Przejdź do <strong>Ustawienia</strong> → <strong>Organizacja</strong> →{" "}
              <strong>Nieudane Runs</strong>. Tę zakładkę widzi tylko Właściciel.
            </Fragment>,
            <Fragment key="r1">
              Włącz <strong>Automatycznie ponawiaj nieudane Runs</strong>.
            </Fragment>,
            <Fragment key="r2">
              Ustaw <strong>Maksymalna liczba ponowień na Run</strong> na 1, 2 lub 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Ponowiony Run zachowuje to samo ID Run, więc odpytywanie API, webhooki i linki dalej działają.",
            "Wyjścia uruchamiają się dopiero po zakończeniu Run, więc ponowienie nigdy nie dostarczy dokumentu dwa razy.",
            "Nigdy nie są ponawiane: nieprawidłowe pliki, nieobsługiwane typy, anulowane Runs, Runs wstrzymane do weryfikacji i Runs utworzone ponad dzień wcześniej.",
            "Run utracony przez restart workera jest wykrywany automatycznie. Przy włączonym automatycznym ponawianiu wraca do kolejki; przy wyłączonym zostaje oznaczony jako Nieudany.",
            "Strona Run pokazuje Poprzednie próby, każdą oznaczoną jako Utracony worker lub Nieudany wraz z błędem, a lista Runs pokazuje plakietkę ponowienia.",
          ]}
        />
        <p>
          Aby dostawać informacje o Runs, które kończą się niepowodzeniem, dodaj adresy w sekcji{" "}
          <strong>Powiadomienia o nieudanych Runs</strong> w tej samej zakładce.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Poprawa jakości ekstrakcji">
        <Lead>
          Gdy pole wraca z błędem, poprawka prawie zawsze leży w definicji tego pola, a nie w
          dokumencie. Zacznij od <strong>Diagnozuj</strong>, jeśli Flow ma Runs, a potem przejdź
          przez poniższe punkty — pierwsze dwa rozwiązują większość przypadków.
        </Lead>
        <DataTable
          head={["Objaw", "Prawdopodobna przyczyna", "Poprawka"]}
          rows={[
            [
              "Niewłaściwa z kilku podobnych wartości",
              "Nic ich od siebie nie odróżnia.",
              "Dodaj etykietę, obok której stoi wartość, lub obszar strony, w którym się pojawia.",
            ],
            [
              "Pole wraca puste",
              "Sama nazwa pola nie wystarczyła, by je zidentyfikować.",
              "Dodaj dwie lub trzy prawdziwe przykładowe wartości — zwykle to w zupełności wystarcza.",
            ],
            [
              "Tylko jedna pozycja, choć jest ich wiele",
              "Zostało zdefiniowane jako pole metadanych.",
              "Zdefiniuj je na nowo jako pole tabeli.",
            ],
            [
              "Ta sama wartość powtórzona w każdym wierszu",
              "Wartość na poziomie dokumentu zdefiniowano jako pole tabeli.",
              "Zdefiniuj ją na nowo jako pole metadanych.",
            ],
            [
              "Liczby różniące się o czynnik stu",
              "Separatory dziesiętne i tysięcy odczytano na odwrót.",
              "Ustaw oczekiwany zakres i znormalizuj format w Cleanerze.",
            ],
            [
              "Utracone zera wiodące lub litery",
              "Pole ma typ Liczba.",
              "Zmień typ na Mieszany/alfanumeryczny.",
            ],
            [
              "Kolumny mylone ze sobą",
              "Dwie kolumny mają podobne nagłówki.",
              "Dodaj wydrukowane nagłówki kolumn i opisz kolumnę w polu Dodatkowe informacje.",
            ],
            [
              "Dobrze u jednych dostawców, słabo u innych",
              "Wskazówki opisują układ jednego dostawcy.",
              "Dodaj do tego samego pola warianty etykiet i nagłówków pozostałych dostawców.",
            ],
            [
              "Zniekształcony tekst z pliku, który wygląda na cyfrowy",
              "Osadzona warstwa tekstowa PDF jest uszkodzona.",
              "Włącz Zły skan, aby Flow odczytywał plik za pomocą OCR.",
            ],
            [
              "Arkusz wraca pusty lub niepełny",
              "Dane nie są w pierwszym widocznym arkuszu.",
              "Przenieś je do pierwszego arkusza albo użyj Splittera dla skoroszytów z wieloma arkuszami.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Zmieniaj jedną rzecz naraz">
          Po każdej zmianie uruchom ponownie ten sam dokument. Edycja czterech wskazówek naraz i
          ponowne uruchomienie powiedzą Ci, że wynik się poprawił, ale nie która zmiana to
          sprawiła — a jedna z czterech mogła coś pogorszyć.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Poprawiaj dane, nie ekstrakcję">
          Jeśli wartość jest prawidłowa, ale format nie — daty, waluty, jednostki, wielkość liter —
          zostaw Flow w spokoju i dodaj <DocLink href="/docs/cleaners">Cleanera</DocLink>.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normalizuj i wzbogacaj to, co wyodrębnia Flow",
            description:
              "Przeformatuj daty, przelicz waluty, oblicz sumy i oznacz wiersze, które łamią regułę.",
          },
          {
            href: "/docs/email-integration",
            label: "Wysyłaj dokumenty do Flow e-mailem",
            description:
              "Adres skrzynki odbiorczej, dozwoleni nadawcy, przetwarzanie treści e-maila i wysyłka e-mailem.",
          },
          {
            href: "/docs/collections",
            label: "Automatycznie kieruj dokumenty do właściwego Flow",
            description:
              "Dlaczego nazwa i opis Flow mają znaczenie nie tylko dla dokładności ekstrakcji.",
          },
          {
            href: "/docs/api-integration",
            label: "Uruchamiaj Flow z własnego kodu",
            description:
              "ID Flow, uwierzytelnianie kluczem API oraz przykłady w Pythonie i JavaScripcie.",
          },
          {
            href: "/docs/webhooks",
            label: "Zobacz payload, który tworzy Flow",
            description:
              "Jak pola metadanych i pola tabeli wyglądają w JSON-ie, który otrzymuje Twój endpoint.",
          },
        ]}
      />
    </section>
  );
}
