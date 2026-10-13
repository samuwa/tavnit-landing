import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /pl/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Krok 1: utwórz Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Wyodrębnij dane strukturalne z dokumentu za pomocą Tavnit",
    description:
      "Utwórz Flow w Tavnit z szablonu, z przykładowego dokumentu lub od zera, sprawdź jego pola, przetwórz dokument i odczytaj ustrukturyzowany wynik — bez rysowania szablonów i bez kodu.",
    steps: [
      {
        name: "Otwórz okno tworzenia",
        text: "Na stronie Flows kliknij Utwórz Flow.",
      },
      {
        name: "Wybierz punkt wyjścia",
        text: "Wybierz Z szablonu (szablon Tavnit albo kopia jednego z Twoich Flows), Sugestia AI (prześlij przykładowy PDF lub obraz, a AI przygotuje projekt pól) albo Zacznij od zera.",
      },
      {
        name: "Nazwij i opisz Flow",
        text: "Nadaj Flow nazwę o długości co najmniej 3 znaków i opis o długości co najmniej 10 znaków, który mówi, jakie dokumenty obsługuje.",
      },
      {
        name: "Przejrzyj schemat danych",
        text: "W edytorze dodawaj, edytuj lub usuwaj pola, aż schemat będzie dokładnie taki, jakiego potrzebujesz. Nowy Flow jest od razu Aktywny.",
      },
      {
        name: "Przetwórz dokument",
        text: "Kliknij Uruchom, prześlij jeden prawdziwy dokument i sprawdź wynik.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "Strona Runs w Tavnit: lista wszystkich przetworzonych dokumentów z ich Flow, źródłem i statusem.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedPl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Pierwsze kroki
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Co robi Tavnit">
        <Lead>
          Tavnit czyta dokumenty i zwraca Ci dane strukturalne. Raz opisujesz pola, których
          potrzebujesz, wysyłasz faktury, paragony, zamówienia, wyciągi, arkusze kalkulacyjne lub
          formularze i dostajesz typowane wiersze — bez budowania szablonu dla każdego układu i bez
          pisania kodu parsującego.
        </Lead>
        <p>
          Ekstrakcja to punkt wyjścia, a nie cały produkt. Wokół niej Tavnit potrafi sortować i
          dzielić przychodzące pliki, czyścić i wzbogacać wiersze, porównywać i sprawdzać dokumenty
          względem siebie, wypełniać formularze, zatrzymywać się, aż człowiek wszystko sprawdzi,
          zapisywać wyniki w tabelach, dostarczać je do Twoich systemów i przekazywać agentowi
          przeglądarkowemu, który na ich podstawie działa. Ta strona daje Ci mapę i prowadzi przez
          Twój pierwszy dokument.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Niektóre obszary są w wersji Beta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals i Nets mają w aplikacji
          oznaczenie <strong>Beta</strong>. Możesz z nich korzystać już dziś, ale ich ekrany i opcje
          mogą się jeszcze zmienić.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Mapa Tavnit">
        <Lead>
          Pasek boczny aplikacji grupuje wszystkie obszary według zadania, które wykonują — od
          przyjmowania dokumentów po działanie na danych. Dokumentacja trzyma się tych samych grup,
          więc ta tabela służy też jako spis treści.
        </Lead>
        <DataTable
          head={["Grupa", "Obszar", "Co robi"]}
          rows={[
            [
              "Wejście",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Jedna skrzynka lub jeden endpoint dla różnych dokumentów: każdy z nich jest klasyfikowany i kierowany do właściwego Flow.",
            ],
            [
              "Wejście",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Odwzoruj byt taki jak zakup czy pacjent i zbieraj jego dokumenty w sprawy na podstawie numeru referencyjnego.",
            ],
            [
              "Wejście",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Podziel jeden plik zawierający kilka dokumentów na osobne dokumenty i wyślij każdy z nich dalej.",
            ],
            [
              "Przetwarzanie",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "Schemat jednego typu dokumentu: pola do wyodrębnienia i wszystko, co jest do nich podpięte. Tu wszystko się zaczyna.",
            ],
            [
              "Przetwarzanie",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Formatuj, przeliczaj, obliczaj, wyszukuj i waliduj wyodrębnione wiersze oraz uruchamiaj akcje, gdy coś wygląda nie tak.",
            ],
            [
              "Przetwarzanie",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Agenci przeglądarkowi, którzy wykonują na stronie internetowej misję opisaną zwykłym językiem, często na podstawie wyodrębnionych danych.",
            ],
            [
              "Inteligencja",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Porównuj rekordy wiersz po wierszu między dokumentami — oferty między sobą, fakturę z jej zamówieniem.",
            ],
            [
              "Inteligencja",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Przeprowadź listę kontrolną na zestawie powiązanych dokumentów i otrzymaj werdykt: zaliczone lub niezaliczone.",
            ],
            [
              "Inteligencja",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "Wypełniaj szablony formularzy PDF danymi wyodrębnionymi z Twoich dokumentów.",
            ],
            [
              "Orkiestracja",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Łącz kroki od początku do końca na wizualnym płótnie.",
            ],
            [
              "Orkiestracja",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Mapa Pipeline&apos;ów</DocLink>
              </Fragment>,
              "Jeden obraz tego, jak dokumenty przepływają przez Twoją organizację.",
            ],
            [
              "Dane i aktywność",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Tabele, w których wyniki gromadzą się z wielu Runs, gotowe do odpytywania, tworzenia wykresów i eksportu.",
            ],
            [
              "Dane i aktywność",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "Historia każdego przetworzonego dokumentu z wynikiem, plikiem źródłowym i logiem.",
            ],
            [
              "Dane i aktywność",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Weryfikacja ręczna</DocLink>
              </Fragment>,
              "Kolejka weryfikacji, w której człowiek zatwierdza, edytuje lub odrzuca wyniki, zanim zostaną dostarczone.",
            ],
            [
              "Audio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Zamieniaj nagrane rozmowy na ustrukturyzowane wiersze.",
            ],
            [
              "Media społecznościowe",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Zamieniaj posty z mediów społecznościowych na ustrukturyzowane wiersze i trendy.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Nie widzisz Agents, Signals ani Nets?">
          Te trzy obszary są włączane dla każdej organizacji osobno. Jeśli nie ma ich na Twoim pasku
          bocznym, skontaktuj się z zespołem Tavnit, aby je włączyć.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Co posortuje moje dokumenty?">
          Jeśli każdy plik zawiera jeden dokument, ale nie znasz jego typu, użyj{" "}
          <DocLink href="/docs/collections">Collection</DocLink>. Jeśli jeden plik zawiera kilka
          dokumentów, użyj <DocLink href="/docs/splitters">Splittera</DocLink>. Jeśli dokumenty do
          siebie należą — ten sam zakup, ten sam pacjent — użyj{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Jeśli już wiesz, czym jest dokument,
          wyślij go od razu do Flow i pomiń wszystkie trzy.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="Twoje pierwsze minuty">
        <Lead>
          Nowa organizacja zaczyna od krótkiej ścieżki konfiguracji, więc rzadko trafisz na pusty
          ekran.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Pytania powitalne.</strong> Po utworzeniu organizacji Tavnit zadaje cztery
              krótkie pytania: jakie dokumenty będziesz przetwarzać, co chcesz osiągnąć, jak Twoje
              dokumenty docierają dziś i mniej więcej ile ich obsługujesz w miesiącu. Zajmuje to
              około 30 sekund, a pytania możesz pominąć przyciskiem <strong>Pomiń</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Startowe Flows jednym kliknięciem.</strong> Jeśli odpowiesz, pusta strona Flows
              zaproponuje szablony pasujące do Twoich dokumentów pod nagłówkiem{" "}
              <em>„Na podstawie Twoich odpowiedzi możemy je dla Ciebie skonfigurować:”</em>. Kliknij{" "}
              <strong>Utwórz te Flows</strong>, a zostaną utworzone za Ciebie, gotowe do edycji.
            </Fragment>,
            <Fragment key="o2">
              <strong>Szablony startowe.</strong> Tavnit zawiera gotowe Flows dla faktur, zamówień,
              paragonów, wyciągów bankowych, dowodów dostawy, wyników badań laboratoryjnych, umów,
              ofert, faktur korygujących, dokumentów tożsamości i CV. Szablony pasujące do Twoich
              odpowiedzi są wyświetlane jako pierwsze.
            </Fragment>,
            <Fragment key="o3">
              <strong>Przewodnik na start.</strong> Mały panel w rogu aplikacji z trzema
              zakładkami: <strong>Lista kontrolna</strong> (kroki konfiguracji, które odhaczają się
              same, gdy je wykonasz), <strong>Ten ekran</strong> (wskazówki dla strony, na której
              jesteś) i <strong>Funkcje</strong> (wszystkie dostępne dla Ciebie obszary). Jeśli go
              ukryjesz, otworzysz go ponownie z menu <strong>Pomoc i wsparcie</strong>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Krok 1: utwórz Flow">
        <Lead>
          Flow to schemat jednego typu dokumentu. Nazwij go od dokumentu, a nie od projektu —{" "}
          <em>Faktury od dostawców</em>, a nie <em>Automatyzacja Q1</em> — bo nazwa i opis są też
          tym, na podstawie czego Collection kieruje do niego dokumenty.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Na stronie <strong>Flows</strong> kliknij <strong>Utwórz Flow</strong>.
            </Fragment>,
            <Fragment key="f6">
              Wybierz punkt wyjścia: <strong>Z szablonu</strong> (szablon Tavnit albo kopia jednego z
              Twoich Flows w zakładce <strong>Moje Flows</strong>), <strong>Sugestia AI</strong>{" "}
              (prześlij przykładowy PDF lub obraz, a AI przygotuje projekt pól) albo{" "}
              <strong>Zacznij od zera</strong>.
            </Fragment>,
            <Fragment key="f7">
              Nadaj Flow nazwę o długości co najmniej 3 znaków i opis o długości co najmniej 10
              znaków, który mówi, jakie dokumenty obsługuje.
            </Fragment>,
            <Fragment key="f8">
              W edytorze dodawaj, edytuj lub usuwaj pola, aż schemat będzie dokładnie taki, jakiego
              potrzebujesz. Nowy Flow jest od razu <strong>Aktywny</strong>.
            </Fragment>,
            <Fragment key="f9">
              Kliknij <strong>Uruchom</strong>, prześlij jeden prawdziwy dokument i sprawdź wynik.
            </Fragment>,
          ]}
        />
        <p>
          Strona <DocLink href="/docs/flows">Flows</DocLink> szczegółowo omawia każdy z tych kroków
          — rodzaje pól, typy danych, wskazówki, które mówią AI, gdzie szukać, oraz przycisk{" "}
          <strong>Diagnozuj</strong>, który proponuje poprawki, gdy Flow ma już prawdziwe Runs.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Opis ma znaczenie">
          Opis jest wymagany i przydaje się podwójnie: pomaga AI dokładniej wyodrębniać dane i to
          dzięki niemu <DocLink href="/docs/collections">Collection</DocLink> może kierować dokumenty
          do tego Flow. Ogólnikowy opis pogarsza jedno i drugie.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Krok 2: pola metadanych i pola tabeli">
        <Lead>
          Tavnit odróżnia wartości, które pojawiają się w dokumencie raz, od wartości, które się
          powtarzają. To jedno rozróżnienie decyduje o kształcie wszystkiego dalej — payload
          webhooka, wiersze w Bucket i Twój plik CSV podążają za nim.
        </Lead>
        <DataTable
          head={["Rodzaj pola", "Występuje", "Na fakturze"]}
          rows={[
            [
              "Pole metadanych",
              "Raz na dokument",
              "Numer faktury, data wystawienia, dostawca, suma",
            ],
            [
              "Pole tabeli",
              "Raz na pozycję",
              "Opis, ilość, cena jednostkowa, kwota",
            ],
          ]}
        />
        <p>
          Każde pole ma też typ danych — Tekst, Liczba, Data, Mieszany/alfanumeryczny lub Obraz — i
          dobranie go jest ważniejsze, niż się wydaje: sumy zapisanej jako tekst nie da się
          zsumować, porównać ani pokazać na wykresie. Flow zawierający wyłącznie pola metadanych
          zwraca jeden wiersz na dokument. Strona <DocLink href="/docs/flows">Flows</DocLink> omawia
          pełny schemat, w tym wskazówki ekstrakcji, pola złożone i sposób naprawy pola, które wraca
          z błędną wartością.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Krok 3: wysyłaj dokumenty">
        <Lead>
          Cztery drogi wejścia, a każda tworzy ten sam rodzaj Run. Zacznij od ręcznego przesłania,
          żeby sprawdzić, czy Flow działa, a potem przejdź na drogę, która pasuje do tego, jak
          dokumenty faktycznie do Ciebie trafiają.
        </Lead>
        <DataTable
          head={["Droga", "Dobra do", "Konfiguracja"]}
          rows={[
            [
              "Przesłanie w aplikacji",
              "Testów i pojedynczych dokumentów",
              "Żadna. Wybierz kilka plików naraz, a każdy stanie się osobnym Run",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-mail</DocLink>
              </Fragment>,
              "Dokumentów, które już trafiają do skrzynki odbiorczej",
              "Włącz Wyzwalacz e-mail we Flow i przekazuj wiadomości na jego adres",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "Twoich własnych systemów i dużych wolumenów",
              "Klucz API i jedno żądanie POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">Konektor MCP</DocLink>
              </Fragment>,
              "Doraźnej pracy z asystentem AI",
              "Włączany dla organizacji na prośbę, potem URL konektora z Integracji",
            ],
          ]}
        />
        <p>
          Flows przyjmują pliki PDF, obrazy (PNG, JPG, JPEG i JFIF) oraz arkusze kalkulacyjne (XLSX,
          XLS i CSV). W przypadku arkusza Flow czyta pierwszy widoczny arkusz. Zeskanowane dokumenty
          są wykrywane i odczytywane za pomocą OCR automatycznie.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="Strona Runs w Tavnit z listą przetworzonych dokumentów — każdy z Flow, osobą, która go uruchomiła, źródłem i statusem — pod kafelkami podsumowania z liczbą zakończonych, trwających i wszystkich Runs."
          caption="Każdy dokument staje się Run. Strona Runs pokazuje, co zostało przetworzone, jak dotarło i jak się zakończyło."
        />
        <p>
          Otwórz dowolny Run, aby zobaczyć wyodrębnione pola obok dokumentu źródłowego oraz log
          tego, co działo się podczas przetwarzania. Ten log to pierwsze miejsce, do którego warto
          zajrzeć, gdy wynik nie jest taki, jakiego się spodziewasz.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Co dalej">
        <Lead>
          Gdy ekstrakcja już działa, następny krok zależy od tego, co jest nie tak z danymi albo co
          chcesz z nimi zrobić.
        </Lead>
        <DataTable
          head={["Jeśli chcesz…", "Przeczytaj"]}
          rows={[
            [
              "Wyodrębnić więcej pól lub naprawić pole, które wraca z błędem",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "Poprawić formaty, przeliczyć waluty, obliczyć sumy lub oznaczyć błędne wiersze",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "Żeby człowiek sprawdził wyniki, zanim trafią dalej",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Weryfikacja ręczna</DocLink>
              </Fragment>,
            ],
            [
              "Przenieść dane do własnych systemów",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> lub{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "Trzymać wyniki razem i je odpytywać",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "Porównywać dokumenty lub sprawdzać je według listy reguł",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> i{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "Połączyć kilka kroków w jeden proces",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "Działać na danych gdzie indziej w sieci",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "Kontrolować, kto co może widzieć i zmieniać",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Role użytkowników</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Zbuduj szczegółowo schemat danych Flow",
            description:
              "Rodzaje pól, typy danych, wskazówki ekstrakcji, pola złożone, Runs i wszystko, co możesz podpiąć do Flow.",
          },
          {
            href: "/docs/api-integration",
            label: "Przetwarzaj dokumenty przez REST API Tavnit",
            description:
              "Przesyłanie multipart i base64, uwierzytelnianie kluczem API, przykłady w Pythonie i JavaScripcie oraz przepisy no-code.",
          },
          {
            href: "/docs/email-integration",
            label: "Wyodrębniaj dane z załączników e-mail",
            description: "Daj Flow własną skrzynkę odbiorczą i przekazuj do niej dokumenty.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Zobacz, jak wszystko się łączy",
            description:
              "Mapa na żywo Twoich Flows, Collections, Splitters, Cleaners i Buckets.",
          },
        ]}
      />
    </section>
  );
}
