import { Fragment } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/**
 * /pl/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "Weryfikacja ręczna" in Polish; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Włącz weryfikację dla Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Dodaj do Flow w Tavnit krok weryfikacji ręcznej",
    description:
      "Włącz weryfikację ręczną (Human in the Loop) we Flow i przypisz weryfikatorów, aby każdy Run czekał na zatwierdzenie, zanim jego wyniki zostaną przekazane dalej.",
    steps: [
      {
        name: "Otwórz panel Weryfikacja ręczna we Flow",
        text: "W aplikacji Tavnit przejdź do Flows, otwórz Flow i wybierz panel Weryfikacja ręczna na jego pasku bocznym.",
      },
      {
        name: "Włącz weryfikację",
        text: "Włącz weryfikację ręczną. Od tej chwili nowe Runs tego Flow są wstrzymywane, zamiast dostarczać swoje wyniki.",
      },
      {
        name: "Przypisz weryfikatorów",
        text: "W sekcji Weryfikatorzy wybierz jednego lub kilku członków swojej organizacji. Tylko przypisani weryfikatorzy mogą zatwierdzać lub odrzucać wstrzymane Runs tego Flow.",
      },
      {
        name: "Uruchom dokument i sprawdź kolejkę",
        text: "Przetwórz jeden dokument. Powinien pojawić się ze statusem Oczekuje na weryfikację w kolejce Weryfikacja ręczna każdego przypisanego weryfikatora.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "Ekran weryfikacji ręcznej w Tavnit: edytowalna siatka danych obok dokumentu źródłowego, z akcjami Zatwierdź i Odrzuć.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopPl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Weryfikacja ręczna (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="Co robi weryfikacja ręczna">
        <Lead>
          Weryfikacja ręczna (Human in the Loop) wstawia punkt kontrolny między ekstrakcję a
          dostarczenie wyników. Run, który wymaga weryfikacji, zatrzymuje się po ekstrakcji i
          czyszczeniu ze statusem <strong>Oczekuje na zatwierdzenie</strong>: żaden e-mail nie
          zostaje wysłany, żaden webhook się nie uruchamia, żaden wiersz nie trafia do Bucket i żaden
          podpięty agent nie startuje, dopóki wyznaczony weryfikator go nie zatwierdzi.
        </Lead>
        <p>
          Kluczowe słowo to <em>zanim</em>. Weryfikacja nie jest poprawką nanoszoną po tym, jak
          błędne dane trafiły już do Twojego ERP; krok dostarczenia jeszcze się nie wykonał. Gdy
          weryfikator zatwierdzi, Run wznawia działanie dokładnie w miejscu, w którym się zatrzymał,
          razem z jego poprawkami.
        </p>
        <BulletList
          items={[
            "Dane o dużej wartości, które trzeba zweryfikować, zanim trafią dalej",
            "Wymóg zgodności, który nakazuje udokumentowany krok ręcznego zatwierdzenia",
            "Dokumenty, w których ekstrakcja zwykle jest poprawna, ale pomyłka czasem drogo kosztuje",
            "Wartości, które może podać tylko człowiek, np. wewnętrzne centrum kosztów lub kod zatwierdzenia",
            "Nowi dostawcy lub nowe formaty, dopóki nie zaufasz Flow",
          ]}
        />
        <p>
          Głównym przypadkiem są Runs z Flows, ale do tej samej kolejki trafiają też wstrzymane{" "}
          <DocLink href="/docs/matchers">dopasowania</DocLink>,{" "}
          <DocLink href="/docs/inspectors">inspekcje</DocLink> i{" "}
          <DocLink href="/docs/fillers">wypełnienia</DocLink>. Zobacz sekcję{" "}
          <em>Inne elementy, które czekają na weryfikację</em> poniżej.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Trzy sposoby wstrzymania Run z Flow">
        <Lead>
          Przełącznik na poziomie Flow to jeden ze sposobów kierowania Runs do weryfikacji, ale nie
          jedyny. <DocLink href="/docs/cleaners">Cleaner</DocLink> podpięty do Flow może wstrzymywać
          Runs samodzielnie, nawet przy wyłączonym przełączniku. Gdy do tego samego Run ma
          zastosowanie kilka wyzwalaczy, ich listy weryfikatorów są łączone.
        </Lead>
        <DataTable
          head={["Wyzwalacz", "Co zostaje wstrzymane", "Najlepszy do"]}
          rows={[
            [
              "Ustawienie Flow (panel Weryfikacja ręczna)",
              "Każdy Run tego Flow, niezależnie od tego, co zostało wyodrębnione.",
              "Typu dokumentu, który zawsze wymaga akceptacji, albo Flow, który właśnie zbudowałeś i któremu jeszcze nie ufasz.",
            ],
            [
              "Reguła Akcje warunkowe w Cleanerze z akcją Human in the Loop",
              "Tylko Runs, w których wiersz spełnił regułę, np. suma powyżej progu lub brakujący numer identyfikacji podatkowej.",
              "Dużych wolumenów, w których większość Runs jest w porządku, a sprawdzać chcesz tylko wyjątki.",
            ],
            [
              "Pole Dane od człowieka w Cleanerze",
              "Każdy Run, który przechodzi przez Cleaner, bo człowiek musi wpisać lub wybrać wartość.",
              "Danych, których w ogóle nie ma w dokumencie i ktoś musi je dodać.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Nie musisz weryfikować wszystkiego">
          Weryfikowanie każdego Run przekreśla sens automatyzacji ekstrakcji. Zwykle właściwa jest
          droga warunkowa: w Cleanerze dodaj pole Akcje warunkowe, nadaj mu warunek, np.{" "}
          <em>total &gt; 10,000</em>, dodaj akcję Human in the Loop i wybierz jej weryfikatorów.
          Zatrzymają się tylko pasujące Runs. Przełącznik Flow może pozostać wyłączony.
        </InfoBox>
        <p>
          Gdy wstrzymanie wywołuje reguła Cleanera, Tavnit zapisuje, które wiersze i które pola ją
          spełniły. Ekran weryfikacji oznacza dokładnie te komórki, więc weryfikator zaczyna od
          powodu wstrzymania Run, zamiast czytać całą tabelę. Jeśli regułę zasila pole Wykrywanie
          anomalii, weryfikator widzi też, dlaczego każda wartość została oznaczona.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Włącz weryfikację dla Flow">
        <Lead>
          Przełącznik Flow znajduje się we własnych ustawieniach Flow. Zmienić go może tylko
          Właściciel lub Administrator. Weryfikatorów wybiera się spośród członków Twojej
          organizacji.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Otwórz Flow i wybierz panel <strong>Weryfikacja ręczna</strong> na jego pasku bocznym.
            </Fragment>,
            <Fragment key="f1">Włącz weryfikację.</Fragment>,
            <Fragment key="f2">
              W sekcji <strong>Weryfikatorzy</strong> wybierz jednego lub kilku członków swojej
              organizacji.
            </Fragment>,
            <Fragment key="f3">
              Przetwórz jeden dokument i upewnij się, że pojawia się ze statusem{" "}
              <strong>Oczekuje na weryfikację</strong> w kolejce{" "}
              <strong>Weryfikacja ręczna</strong> weryfikatorów.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Gdy weryfikacja jest włączona, a nie przypisano żadnych weryfikatorów, panel ostrzega:{" "}
          <em>„Nie wybrano weryfikatorów — prośby o zatwierdzenie do nikogo nie trafią.”</em>{" "}
          Wstrzymanych Runs nie będzie wtedy miał kto zatwierdzić. Przypisz co najmniej jednego
          weryfikatora, zanim zaczniesz wysyłać dokumenty.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Z podpiętym Cleanerem weryfikatorzy widzą oczyszczone dane"
        >
          Gdy Flow ma Cleaner, wstrzymanie następuje po czyszczeniu, więc weryfikowana tabela to
          oczyszczony wynik z przeliczonymi walutami, przeformatowanymi datami i kolumnami
          obliczanymi. To właśnie on zostanie dostarczony, więc to właśnie jego warto sprawdzić.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Pola Dane od człowieka">
        <Lead>
          Pole Dane od człowieka to kolumna Cleanera, która nigdy nie jest wyodrębniana: wypełnia ją
          weryfikator na ekranie weryfikacji. Używaj go do centrum kosztów, konta księgowego,
          wewnętrznego kodu zatwierdzenia lub czegokolwiek innego, czego dokument nie może Ci
          powiedzieć.
        </Lead>
        <DataTable
          head={["Opcja", "Co robi"]}
          rows={[
            ["Dowolny tekst", "Weryfikator wpisuje wartość."],
            [
              "Menu",
              "Weryfikator wybiera spośród unikalnych wartości kolumny Bucket (Bucket z opcjami i Kolumna z opcjami), opcjonalnie filtrowanych warunkami, w tym warunkami dotyczącymi pól bieżącego wiersza.",
            ],
            [
              "Wartość jest obowiązkowa",
              "Zatwierdzenie jest zablokowane, dopóki każdy wiersz nie ma wartości. Wyłącz tę opcję, aby dopuścić puste pola.",
            ],
            ["Weryfikatorzy", "Kto może wypełnić pole i zatwierdzić; łączeni z weryfikatorami Flow."],
          ]}
        />
        <p>
          Każdy Run, który przechodzi przez Cleaner z polem Dane od człowieka, zostaje wstrzymany do
          weryfikacji, niezależnie od tego, czy przełącznik Flow jest włączony. Na ekranie
          weryfikacji kolumna jest oznaczona jako <strong>Wymaga danych od człowieka</strong> z
          liczbą wypełnionych wierszy, a Zatwierdź pozostaje zablokowane (
          <em>„Wypełnij wszystkie wymagane wartości, aby zatwierdzić”</em>), dopóki nie zostaną
          podane wszystkie obowiązkowe wartości.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="Kolejka weryfikacji">
        <Lead>
          Strona <strong>Weryfikacja ręczna</strong> na pasku bocznym pokazuje wszystko, co na
          Ciebie czeka, od najnowszych. Widzisz na niej tylko elementy, w których jesteś
          weryfikatorem; weryfikatorzy nie widzą nawzajem swoich kolejek.
        </Lead>
        <BulletList
          items={[
            "Podsumowanie na górze: Oczekuje na weryfikację, Najstarsze oczekujące, Twoja rola i Flows z HITL",
            "Jedna karta na element: nazwa pliku i Flow w przypadku Run, z etykietą Dopasowanie lub Wypełnienie dla tych rodzajów, oraz status Oczekuje na weryfikację",
            "Czerwona kropka na ikonie paska bocznego, gdy coś na Ciebie czeka. Aktualizuje się w czasie rzeczywistym, bez odświeżania strony",
            "Przypisani weryfikatorzy dostają też e-mail z bezpośrednim linkiem w chwili, gdy Run, dopasowanie, inspekcja lub wypełnienie ich potrzebuje",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Weryfikacja Run">
        <Lead>
          Ekran weryfikacji jest podzielony: wyodrębniona tabela po lewej, oryginalny dokument po
          prawej. Sprawdzasz wartość ze źródłem bez opuszczania strony, poprawiasz ją na miejscu i
          zatwierdzasz. Separator można przeciągać, a na telefonie przełączasz się między dwoma
          panelami.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="Ekran weryfikacji w Tavnit dla Run oczekującego na weryfikację: po lewej edytowalna siatka danych z kolumnami Subtotal, Amount i Weight oraz polami wyboru przy wierszach, po prawej wyrenderowana faktura źródłowa, a w nagłówku przyciski Odrzuć i Zatwierdź."
          caption="Run oczekujący na weryfikację. Siatka po lewej to oczyszczony wynik, który zostanie dostarczony; obok leży dokument źródłowy do porównania."
        />
        <DataTable
          head={["W siatce danych możesz", "Jak"]}
          rows={[
            ["Edytować wartość", "Kliknij dwukrotnie komórkę i wpisz."],
            [
              "Zmienić wiele komórek naraz",
              "Zaznacz przeciągnięciem, kliknięciem z Shift lub kliknięciem nagłówka kolumny, a potem użyj Zastosuj do zaznaczonych.",
            ],
            ["Usunąć wiersz z wyniku", "Odznacz go. Wykluczone wiersze nie są dostarczane."],
            ["Dodać lub usunąć kolumnę", "Użyj Dodaj kolumnę lub Usuń kolumnę. Usuniętą kolumnę można przywrócić przed zatwierdzeniem."],
            ["Zobaczyć, co wywołało wstrzymanie", "Komórki, które spełniły regułę Cleanera, są oznaczone."],
            ["Wypełnić pola Dane od człowieka", "Wpisz wartość lub wybierz ją z menu."],
            ["Zobaczyć, co zmieniłeś", "Edytowane komórki pozostają podświetlone aż do zatwierdzenia."],
          ]}
        />
        <BulletList
          items={[
            "Panel dokumentu wyświetla pliki PDF z nawigacją między stronami oraz pliki graficzne; arkusze kalkulacyjne można pobrać",
            "Dopasuj do szerokości, Dopasuj do wysokości i ręczne powiększenie; przeciągnij, aby przesunąć widok",
            "Ctrl/Cmd + i − powiększają i pomniejszają, Ctrl/Cmd + 0 przywraca widok",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Zatwierdzanie i odrzucanie">
        <Lead>
          Zatwierdzenie włącza Twoje poprawki do Run i przekazuje go dalej. Odrzucenie anuluje Run i
          niczego nie dostarcza. Obie decyzje są dla danego Run ostateczne: wstrzymanie to
          jednorazowa bramka, a nie stan, który można przełączać tam i z powrotem.
        </Lead>
        <DataTable
          head={["Decyzja", "Co dzieje się z Run", "Co zostaje dostarczone"]}
          rows={[
            [
              "Zatwierdź",
              "Twoja poprawiona tabela zastępuje wyodrębniony wynik, a Run zostaje wznowiony i kończy się ze statusem Zakończony oraz plakietką Zatwierdzony w HITL.",
              <Fragment key="f4">
                Wszystko, co Flow ma skonfigurowane: wysyłka e-mailem, webhook, eksport do{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink>, wypełnianie formularzy i podpięty{" "}
                <DocLink href="/docs/agents">agent</DocLink> — wszystko z zatwierdzonymi danymi.
              </Fragment>,
            ],
            [
              "Odrzuć",
              "Run otrzymuje status Anulowany z plakietką Odrzucony w HITL, a Twój powód (opcjonalny, ale zalecany) zostaje zapisany.",
              "Nic. Żadnego e-maila, żadnego webhooka, żadnego wiersza w Bucket, żadnego Run agenta.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Wygrywa pierwsza decyzja">
          Nie potrzebujesz akceptacji wszystkich przypisanych weryfikatorów. Pierwsze zatwierdzenie
          lub odrzucenie rozstrzyga Run; jeśli drugi weryfikator miał go otwartego, jego decyzja
          zostanie odrzucona, bo Run nie oczekuje już na zatwierdzenie. Odśwież kolejkę, aby
          zobaczyć aktualny stan.
        </InfoBox>
        <p>
          Strona Run pokazuje, kto podjął decyzję (<strong>Zatwierdził(a)</strong> lub{" "}
          <strong>Odrzucił(a)</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Inne elementy, które czekają na weryfikację">
        <Lead>
          Matchers, Inspectors i Fillers mają własne ustawienia weryfikacji, a ich wstrzymane
          elementy trafiają do tej samej kolejki, z tą samą zasadą „wygrywa pierwsza decyzja” i tą
          samą ścieżką audytu.
        </Lead>
        <DataTable
          head={["Element", "Kiedy zostaje wstrzymany", "Co robi weryfikator"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Dopasowanie</DocLink>,
              "Gdy w Matcherze włączona jest weryfikacja ręczna: każde dopasowanie.",
              "Sprawdza i poprawia dokonane przez AI parowanie wierszy między dokumentami, może wykluczyć wiersze, a potem zatwierdza lub odrzuca.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Inspekcja</DocLink>,
              "Gdy w Inspectorze włączona jest weryfikacja ręczna albo gdy niezaliczona kontrola żąda weryfikacji w ramach swoich akcji przy niepowodzeniu.",
              "Uchyla niezaliczone kontrole z podaniem powodu, a potem zatwierdza, aby uczynić werdykt ostatecznym, lub odrzuca, aby anulować inspekcję.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Wypełnienie</DocLink>,
              "Gdy w Fillerze włączona jest weryfikacja ręczna albo zawsze, gdy ma zmapowane pola Wypełnienie ręczne.",
              "Przegląda wypełnione formularze, wpisuje wartości Wypełnienie ręczne, a potem zatwierdza, aby wydać formularze, lub odrzuca.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Kto może weryfikować">
        <Lead>
          Tylko osoby przypisane jako weryfikatorzy mogą zatwierdzić lub odrzucić Run z Flow. Sama
          rola Administratora nie wystarcza: Administrator, którego nie ma na liście weryfikatorów,
          nie dostaje tego Run do swojej kolejki i nie może go zatwierdzić.
        </Lead>
        <BulletList
          items={[
            "Listami weryfikatorów Flow zarządza Właściciel lub Administrator",
            "Akcja Human in the Loop w Cleanerze i każde pole Dane od człowieka mają własnych weryfikatorów, łączonych z weryfikatorami Flow",
            "Weryfikatorem może być każdy członek, niezależnie od roli",
            "Rola Tylko HITL powstała z myślą o weryfikatorach: tacy członkowie widzą tylko kolejkę Weryfikacja ręczna i mogą weryfikować, ale nie mogą niczego uruchamiać ani zmieniać",
          ]}
        />
        <p>
          Zobacz <DocLink href="/docs/user-roles">role i uprawnienia użytkowników</DocLink>, aby
          dowiedzieć się, co może zmieniać każda rola.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="Niezmienny dziennik audytu">
        <Lead>
          Każda czynność weryfikacyjna jest zapisywana w trwałym dzienniku, do którego można tylko
          dopisywać, wraz ze znacznikiem czasu i tożsamością weryfikatora. Wpisów nie da się
          edytować ani usuwać, więc zapis tego, kto co zmienił i jak wyglądały dane, zanim ich
          dotknął, przetrwa weryfikację.
        </Lead>
        <DataTable
          head={["Rejestrowane zdarzenie", "Kiedy jest zapisywane"]}
          rows={[
            ["Powiadomienie weryfikatorów", "Run trafia do kolejki weryfikacji, a weryfikatorzy dostają e-mail."],
            ["Edycja komórki", "Wartość zostaje zmieniona; zapisywane są stara i nowa wartość."],
            ["Dodanie / usunięcie wiersza", "Weryfikator dodaje wiersz lub wyklucza jeden z nich."],
            ["Dodanie / usunięcie kolumny", "Weryfikator zmienia kształt tabeli."],
            ["Zatwierdzenie", "Decyzja, weryfikator i liczba wprowadzonych poprawek."],
            ["Odrzucenie", "Decyzja, weryfikator i podany powód."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Dane sprzed weryfikacji też są zachowywane">
          Tavnit przechowuje wynik w postaci sprzed ingerencji weryfikatora obok zatwierdzonej
          wersji. Audytor może porównać ekstrakcję z dostarczonym wynikiem bez odtwarzania go z
          dziennika zdarzeń.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Rozwiązywanie problemów">
        <DataTable
          head={["Objaw", "Prawdopodobna przyczyna i rozwiązanie"]}
          rows={[
            [
              "Runs są wstrzymywane, choć przełącznik Flow jest wyłączony",
              "Cleaner tego Flow ma regułę Akcje warunkowe z akcją Human in the Loop albo pole Dane od człowieka.",
            ],
            [
              "Run oczekuje na zatwierdzenie, ale nie ma go w mojej kolejce",
              "Nie ma Cię na jego liście weryfikatorów. Poproś Właściciela lub Administratora, aby dodał Cię do Flow (albo do reguły Cleanera, która go wstrzymała).",
            ],
            [
              "Zatwierdzenie zostaje odrzucone, bo nie jesteś skonfigurowanym weryfikatorem",
              "Decydować mogą tylko przypisani weryfikatorzy. Jeśli nie przypisano żadnego, dodaj go we Flow; nikt inny nie może zwolnić Run.",
            ],
            [
              "Zatwierdzenie zostaje odrzucone, bo Run nie oczekuje na zatwierdzenie",
              "Inny weryfikator zdecydował pierwszy. Odśwież kolejkę.",
            ],
            [
              "Zatwierdzenie jest zablokowane z powodu brakujących danych od człowieka",
              "Obowiązkowe pole Dane od człowieka jest w niektórych wierszach nadal puste. Wypełnij je albo ustaw pole w Cleanerze jako opcjonalne.",
            ],
            [
              "Podpięty agent się nie uruchomił",
              "Uruchamia się dopiero po zatwierdzeniu. Odrzucony Run nigdy go nie uruchamia.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Weryfikacja wymaga czasu">
          Wstrzymany Run czeka tak długo, jak trzeba. Jeśli wyniki zasilają proces, w którym liczy
          się czas, zadbaj o to, by weryfikatorzy pilnowali swojej kolejki lub poczty, albo zawęź
          wstrzymywanie do wyjątków za pomocą reguły Cleanera.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Uruchamiaj weryfikację warunkowo za pomocą Cleanera",
            description:
              "Akcje warunkowe wstrzymują tylko Runs, które łamią regułę; pola Dane od człowieka zbierają wartości od weryfikatora.",
          },
          {
            href: "/docs/user-roles",
            label: "Role i uprawnienia użytkowników",
            description: "Kto może przypisywać weryfikatorów i co może rola Tylko HITL.",
          },
          {
            href: "/docs/agents",
            label: "Działaj na zatwierdzonych danych za pomocą agentów",
            description: "Podpięty agent startuje dopiero po zatwierdzeniu przez weryfikatora.",
          },
          {
            href: "/docs/webhooks",
            label: "Dostarczaj zatwierdzone wyniki przez webhooki",
            description:
              "Co się uruchamia, gdy weryfikator zatwierdzi, i co nigdy się nie uruchamia, gdy odrzuci.",
          },
          {
            href: "/docs/buckets",
            label: "Przechowuj zatwierdzone dane w Buckets",
            description: "Ustrukturyzowane tabele, które przyjmują tylko wiersze zaakceptowane przez weryfikatora.",
          },
        ]}
      />
    </section>
  );
}
