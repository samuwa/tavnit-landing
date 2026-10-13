import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /pl/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "Włącz wyzwalacz e-mail". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Wyodrębniaj dane z załączników e-mail za pomocą wyzwalacza e-mail Tavnit",
    description:
      "Włącz wyzwalacz e-mail w Flow Tavnit, aby dostać dedykowany adres skrzynki, a potem przekazuj na niego dokumenty. Każdy obsługiwany załącznik staje się osobnym Run ekstrakcji.",
    steps: [
      {
        name: "Otwórz Flow",
        text: "Przejdź do Flows w aplikacji Tavnit i otwórz Flow, który ma odbierać dokumenty.",
      },
      {
        name: "Włącz wyzwalacz e-mail",
        text: "Otwórz panel Wyzwalacz e-mail na stronie szczegółów Flow i włącz go. Pojawi się Adres skrzynki Flow.",
      },
      {
        name: "Skopiuj adres",
        text: "Kliknij Kopiuj obok Adresu skrzynki. Opcjonalnie w tym samym panelu dodaj Dozwolonych nadawców lub włącz Przetwarzaj treść e-maila.",
      },
      {
        name: "Wyślij dokument testowy",
        text: "Wyślij na ten adres pojedynczy plik PDF i obserwuj stronę Runs. Pojawi się nowy Run ze źródłem E-mail.",
      },
      {
        name: "Zautomatyzuj przekazywanie",
        text: "Gdy test zadziała, dodaj w swoim kliencie poczty lub wspólnej skrzynce regułę, która automatycznie przekazuje pasujące wiadomości na ten adres.",
      },
    ],
  },
};

export default function EmailIntegrationPl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integracja e-mail
      </h1>

      <DocCard icon={<Mail size={24} />} title="Jak działa przetwarzanie e-maili">
        <Lead>
          Każdy Flow w Tavnit może mieć własny adres skrzynki. Gdy włączysz wyzwalacz e-mail i
          wyślesz dokument na ten adres, Tavnit bierze każdy obsługiwany załącznik, tworzy dla niego
          osobny Run ekstrakcji i przetwarza go dokładnie tak, jakby został przesłany w aplikacji.
        </Lead>
        <p>
          Niczego nie instalujesz i nic nie odpytuje twojej skrzynki: przekazujesz pocztę na adres, a
          Tavnit reaguje. To najkrótsza droga od &bdquo;faktury przychodzą e-mailem&rdquo; do
          &bdquo;faktury przychodzą jako ustrukturyzowane wiersze&rdquo;, bez żadnego kodu.
          Collections, Splitters, Pipelines, Matchers i Subjects też mają własne adresy.
        </p>
        <BulletList
          items={[
            "Przekazywanie faktur lub paragonów prosto ze skrzynki odbiorczej",
            "Wspólna skrzynka działu zobowiązań z regułą automatycznego przekazywania",
            "Przyjmowanie dokumentów od dostawców bez dawania im loginu do Tavnit",
            "Wyodrębnianie danych zawartych w samej wiadomości, na przykład potwierdzeń zamówień bez załącznika",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="Włącz wyzwalacz e-mail">
        <Lead>
          Wyzwalacz jest domyślnie wyłączony. Włącz go na stronie szczegółów Flow, skopiuj adres,
          który otrzymasz, i wyślij jeden dokument testowo, zanim skierujesz na niego regułę
          przekazywania.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Przejdź do <strong>Flows</strong> i otwórz Flow, który ma odbierać dokumenty.
            </Fragment>,
            <Fragment key="f1">
              Otwórz panel <strong>Wyzwalacz e-mail</strong> i włącz go. Pojawi się{" "}
              <strong>Adres skrzynki</strong> Flow.
            </Fragment>,
            <Fragment key="f2">
              Kliknij <strong>Kopiuj</strong> obok adresu. W tym samym panelu możesz dodać{" "}
              <strong>Dozwolonych nadawców</strong> lub włączyć{" "}
              <strong>Przetwarzaj treść e-maila</strong> (obie opcje opisano niżej).
            </Fragment>,
            <Fragment key="f3">
              Wyślij na niego jeden plik PDF i sprawdź stronę <strong>Runs</strong>. Pojawi się nowy
              Run ze źródłem <strong>E-mail</strong>, a adres nadawcy zostanie zapisany w Run.
            </Fragment>,
            "Gdy to zadziała, dodaj regułę przekazywania w swoim kliencie poczty lub wspólnej skrzynce.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Jeden Run na załącznik">
          E-mail z trzema załączonymi fakturami tworzy trzy osobne Runs, każdy z własnym wynikiem i
          własnym wierszem na liście Runs. Nie powstaje jeden Run zawierający trzy dokumenty.
        </InfoBox>
        <WarningBox>
          Poczta wysłana na adres z wyłączonym wyzwalaczem (lub do nieaktywnej Collection) jest
          przyjmowana i odrzucana: nadawca nie dostaje zwrotki ani błędu. Jeśli dokumenty zdają się
          znikać, najpierw sprawdź przełącznik.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Dozwoleni nadawcy">
        <Lead>
          Domyślnie każdy nadawca może uruchomić Run, wysyłając e-mail na adres. Dodaj adresy do{" "}
          <strong>Dozwoleni nadawcy</strong> w panelu Wyzwalacz e-mail, a akceptowani będą tylko ci
          nadawcy; poczta od wszystkich innych jest po cichu odrzucana.
        </Lead>
        <BulletList
          items={[
            "Wpisy to pełne adresy e-mail, nie domeny. Dopasowanie ignoruje wielkość liter i nazwy wyświetlane.",
            "Zostaw listę pustą, aby akceptować e-maile od dowolnego nadawcy.",
            "Lista jest dostępna w wyzwalaczu e-mail Flows, Collections, Splitters, Pipelines, Matchers i Subjects.",
            <Fragment key="f4">
              Gdy przekazujesz pocztę przez wspólną skrzynkę, nadawcą widocznym dla Tavnit jest
              zwykle skrzynka, która przekazuje wiadomość, więc to jej adres trzeba dopuścić.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="Przetwarzanie treści e-maila">
        <Lead>
          Niektóre dane nigdy nie przychodzą jako załącznik: potwierdzenie zamówienia, informacja o
          rezerwacji, dostawca wpisujący ilości w wiadomości. Włącz{" "}
          <strong>Przetwarzaj treść e-maila</strong>, a Tavnit zamieni treść wiadomości na PDF i
          przetworzy ją jak każdy inny dokument. Opcja jest dostępna we Flows i Collections.
        </Lead>
        <DataTable
          head={["Tryb", "Co się dzieje"]}
          rows={[
            [
              <Fragment key="f5"><strong>Tylko gdy nie ma załączników</strong> (domyślnie)</Fragment>,
              "Treść jest przetwarzana tylko wtedy, gdy e-mail nie ma załączonego dokumentu. Notatka „w załączniku” obok faktury jest pomijana, więc jeden e-mail nigdy nie uruchamia dwóch Runs.",
            ],
            [
              <Fragment key="f6"><strong>Zawsze</strong></Fragment>,
              "Treść jest przetwarzana razem z każdym załącznikiem, każdy w osobnym Run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "PDF z treścią pojawia się w weryfikacji jak każdy inny dokument, a Run jest oznaczony jako pochodzący z treści e-maila.",
            "Cytowane wątki odpowiedzi i podpisy są usuwane tam, gdzie dostawca poczty potrafi je rozpoznać.",
            "Obrazy wewnątrz wiadomości nie są odczytywane. Obrazy w podpisie osadzone w treści nie liczą się jako załączniki przy decydowaniu, czy treść ma zostać przetworzona.",
            "Treść prawie bez tekstu („ok”, „dzięki”, puste przekazanie) nie jest przetwarzana.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Które funkcje mają adres e-mail">
        <Lead>
          Wyzwalacz e-mail nie ogranicza się do Flows. Zamiast pojedynczego typu dokumentu możesz
          skierować adres na cały etap sortowania, Pipeline lub porównanie.
        </Lead>
        <DataTable
          head={["Wysyłka do", "Format adresu", "Co się dzieje"]}
          rows={[
            [
              "Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Każdy załącznik jest wyodrębniany przez ten Flow.",
            ],
            [
              "Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Każdy załącznik jest klasyfikowany i kierowany do właściwego Flow lub Splittera.
                Zobacz, <DocLink href="/docs/collections">jak Collections kierują dokumenty</DocLink>.
              </Fragment>,
            ],
            [
              "Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Każdy załącznik jest najpierw dzielony na osobne dokumenty. Zobacz{" "}
                <DocLink href="/docs/splitters">dzielenie plików z wieloma dokumentami</DocLink>.
              </Fragment>,
            ],
            [
              "Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Każdy załącznik PDF lub obraz uruchamia jedno wykonanie. Zobacz{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Wszystkie załączniki PDF lub obrazy z jednego e-maila są porównywane razem w jednym
                dopasowaniu (zawsze w trybie wielostronnym), a wynik przychodzi jako odpowiedź w tym
                samym wątku. Zobacz <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Każdy załącznik trafia do właściwej sprawy na podstawie odniesienia w temacie,
                treści lub nazwie pliku albo przez własny adres plus sprawy. Zobacz{" "}
                <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Skopiuj dokładny adres z panelu Wyzwalacz e-mail danej funkcji; powyższe formaty pomagają tylko je rozróżnić."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Którego adresu powinni używać dostawcy?">
          Jeśli nadawca zawsze wysyła tylko jeden typ dokumentu, daj mu adres Flow. Jeśli wysyła
          różne (faktury, zamówienia zakupu, dowody dostawy), daj mu adres Collection i pozwól
          Tavnit je posortować. Jeśli wysyła jeden PDF zawierający kilka dokumentów, daj mu adres
          Splittera.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Co akceptuje Tavnit">
        <Lead>
          Flows, Collections, Splitters i Subjects odczytują pliki PDF, popularne obrazy i arkusze
          kalkulacyjne. Pipelines i Matchers odczytują tylko pliki PDF i obrazy. Wszystko inne w
          wiadomości jest pomijane bez psucia reszty: jeden nieobsługiwany plik nie powstrzymuje
          przetwarzania pozostałych załączników.
        </Lead>
        <DataTable
          head={["Akceptowane", "Rozszerzenia"]}
          rows={[
            ["Dokumenty PDF", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Obrazy",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Arkusze kalkulacyjne (nie w Pipelines ani Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Załącznik jest pomijany zamiast przetwarzany, gdy spełniony jest którykolwiek z tych warunków:</p>
        <DataTable
          head={["Powód pominięcia", "Jak to wygląda"]}
          rows={[
            [
              "Nieobsługiwany typ pliku",
              "Dokumenty Word, archiwa, przekazania .eml i wszystko bez rozpoznawanego rozszerzenia.",
            ],
            ["Pusty załącznik", "Plik o rozmiarze zero bajtów, zwykle wynik nieudanego przekazania."],
            [
              "Nieczytelny plik",
              "Plik ma prawidłowe rozszerzenie, ale nie da się go otworzyć: niepełne pobranie, plik o zmienionej nazwie albo arkusz kalkulacyjny, którego nie da się sparsować.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Obrazy w podpisie liczą się jako załączniki">
          Logo w podpisie e-maila często przychodzi jako załącznik graficzny, a Flow przetworzy je
          jak każdy inny obraz. Jeśli tworzy to niechciane Runs, przekazuj tylko dokumenty albo
          użyj Dozwolonych nadawców i reguły przekazywania, która usuwa obrazy osadzone w treści.
        </InfoBox>
        <p>
          Limit rozmiaru załączników twojego dostawcy poczty obowiązuje, zanim Tavnit w ogóle
          zobaczy wiadomość. Jeśli duży skan zostanie odrzucony po stronie nadawcy, prześlij go w
          aplikacji albo wyślij przez <DocLink href="/docs/api-integration">REST API</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Jak obsługiwane są arkusze kalkulacyjne">
        <Lead>
          Załącznik z arkuszem kalkulacyjnym jest traktowany jak dokument, a nie jak tabela do
          zaimportowania. To, co się dzieje, zależy od tego, dokąd go wyślesz.
        </Lead>
        <DataTable
          head={["Wysłano do", "Co robi Tavnit"]}
          rows={[
            [
              "Flow",
              "Wyodrębnia dane z pierwszego widocznego arkusza.",
            ],
            [
              "Collection",
              "Klasyfikuje plik według pierwszego arkusza, a potem przekazuje go do wybranego Flow, który odczytuje pierwszy widoczny arkusz.",
            ],
            [
              "Splitter",
              "Traktuje każdy widoczny, niepusty arkusz jako osobny dokument, klasyfikuje każdy z nich i przesyła dalej jako plik z jednym arkuszem.",
            ],
          ]}
        />
        <p>
          Bardzo duże arkusze są odrzucane z błędem. Aby zamiast tego wczytać arkusz kalkulacyjny
          jako ustrukturyzowane wiersze, użyj czyszczenia (sweep) w{" "}
          <DocLink href="/docs/cleaners">Cleanerze</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Ochrona przed duplikatami">
        <Lead>
          Serwery pocztowe czasem dostarczają tę samą wiadomość więcej niż raz, na przykład po
          przekroczeniu limitu czasu. Tavnit rozpoznaje ponownie dostarczoną wiadomość na ten sam
          adres i nie przetwarza jej drugi raz, więc ponowienie nigdy nie tworzy zduplikowanych
          Runs.
        </Lead>
        <BulletList
          items={[
            "Tavnit potwierdza odbiór wiadomości w ciągu kilku sekund i przetwarza załączniki w tle, więc możesz bezpiecznie wysłać e-mail z wieloma załącznikami.",
            "Jeśli przetwarzanie zostanie przerwane, wznawia się w miejscu, w którym się zatrzymało, zamiast zaczynać od nowa.",
            "Jedna wiadomość wysłana na dwa różne adresy Tavnit jest przetwarzana raz pod każdym adresem.",
            "Ponowne wysłanie tego samego pliku w nowym e-mailu to nowa wiadomość i zostanie przetworzona ponownie.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Odsyłanie wyników e-mailem">
        <Lead>
          Wysyłka e-mailem to droga powrotna: gdy Run zakończy się pomyślnie, Tavnit wysyła wynik
          e-mailem na skonfigurowane adresy. Działa niezależnie od wyzwalacza e-mail: możesz używać
          każdego z nich osobno albo obu, aby zbudować pełną pętlę „wyślij i odbierz”.
        </Lead>
        <NumberedList
          items={[
            "Otwórz stronę szczegółów Flow.",
            <Fragment key="f21">
              Otwórz panel <strong>Wysyłka e-mailem</strong>.
            </Fragment>,
            <Fragment key="f22">
              Dodaj jeden lub więcej adresów w <strong>Adresy odbiorców</strong>.
            </Fragment>,
            <Fragment key="f23">
              W sekcji <strong>Załączniki</strong> wybierz, co ma zawierać każda wiadomość, i zapisz.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Opcja", "Co przychodzi"]}
          rows={[
            ["Ekstrakcja JSON", "Wyodrębniony wynik jako sformatowany JSON w treści wiadomości."],
            [
              "Ekstrakcja CSV",
              <Fragment key="f24">
                Wiersze jako załącznik <InlineCode>rows.csv</InlineCode>, najszybszy sposób, by
                przenieść wyniki do arkusza kalkulacyjnego.
              </Fragment>,
            ],
            ["Wyniki formularzy", "Wypełnione pliki PDF, gdy Flow wypełnia szablon formularza."],
            [
              "Oryginalny dokument",
              "Przetworzony plik źródłowy (PDF, obraz lub arkusz kalkulacyjny), załączony obok wyników.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Pola plików przychodzą jako linki">
          Pola zawierające plik lub obraz nie są osadzane w JSON. Przychodzą jako linki ważne przez
          ograniczony czas, ponieważ Tavnit przechowuje dokumenty prywatnie: surowej ścieżki w
          magazynie nie dałoby się pobrać ze skrzynki odbiorczej.
        </InfoBox>
        <BulletList
          items={[
            "E-mail z wynikami jest wysyłany tylko dla Runs, które zakończyły się pomyślnie. Nieudany Run niczego nie wysyła.",
            "Temat zawiera nazwę Flow oraz szczegół dotyczący danego Run, więc klienty poczty nie zwijają wszystkich Runs jednego Flow w jeden wątek.",
            <Fragment key="f25">
              Jeśli Flow ma włączoną <DocLink href="/docs/human-in-the-loop">weryfikację ręczną</DocLink>,
              e-mail czeka, aż weryfikator zatwierdzi Run.
            </Fragment>,
            <Fragment key="f26">
              Do dostarczania między systemami lepiej niż e-mail sprawdza się{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Przykład krok po kroku: skrzynka działu zobowiązań">
        <Lead>
          Typowa konfiguracja to wspólna skrzynka, która już odbiera faktury od dostawców,
          przekazywane do Collection, dzięki czemu format każdego dostawcy trafia do właściwego
          Flow, a wyniki są wysyłane e-mailem do działu finansów i zapisywane w Buckecie.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Zbuduj po jednym Flow dla każdego typu dokumentu, który otrzymujesz, na przykład{" "}
              <em>Faktury dostawców</em> i <em>Dowody dostawy</em>, i nadaj każdemu jasny opis.
            </Fragment>,
            <Fragment key="f28">
              Umieść oba Flows w <DocLink href="/docs/collections">Collection</DocLink> i włącz
              wyzwalacz e-mail Collection. Dodaj wspólną skrzynkę do Dozwolonych nadawców.
            </Fragment>,
            <Fragment key="f29">
              We wspólnej skrzynce przekazuj każdą wiadomość z załącznikiem z domen twoich dostawców
              na adres Collection.
            </Fragment>,
            <Fragment key="f30">
              W każdym Flow włącz <strong>Wysyłka e-mailem</strong> z załącznikiem CSV dla działu
              finansów i dodaj <DocLink href="/docs/buckets">eksport do Bucketu</DocLink>, aby dane
              gromadziły się w jednej tabeli.
            </Fragment>,
            <Fragment key="f31">
              Dodaj <DocLink href="/docs/cleaners">Cleaner</DocLink> z akcją warunkową, która
              kieruje wszystko powyżej twojego progu zatwierdzania do{" "}
              <DocLink href="/docs/human-in-the-loop">weryfikacji ręcznej</DocLink>, zanim zostanie
              dostarczone.
            </Fragment>,
          ]}
        />
        <p>
          Nikt w dziale finansów nie musi otwierać Tavnit. Faktury przychodzą tam, gdzie zawsze, a
          ustrukturyzowane dane wracają do tej samej skrzynki.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Rozwiązywanie problemów">
        <Lead>
          Ponieważ poczta przychodząca jest przyjmowana po cichu, dokument, który się nie pojawia,
          nie zostawia żadnego błędu w twojej skrzynce. Przejdź po kolei tę listę: przyczyną jest
          prawie zawsze przełącznik wyzwalacza, Dozwoleni nadawcy, typ załącznika albo reguła
          przekazywania, która usuwa załączniki.
        </Lead>
        <DataTable
          head={["Objaw", "Prawdopodobna przyczyna", "Rozwiązanie"]}
          rows={[
            [
              "Nie pojawia się żaden Run",
              "Wyzwalacz e-mail jest wyłączony, adres należy do innego Flow albo nadawcy nie ma na liście Dozwoleni nadawcy.",
              "Sprawdź ponownie przełącznik i listę Dozwoleni nadawcy, a potem skopiuj adres jeszcze raz z panelu Wyzwalacz e-mail.",
            ],
            [
              "Część załączników przetworzona, część nie",
              "Brakujące mają nieobsługiwany typ, są puste lub nieczytelne.",
              "Porównaj rozszerzenia z listą akceptowanych powyżej.",
            ],
            [
              "Przetworzono tylko obraz z podpisu",
              "Właściwy dokument nie był załączony: był podlinkowany albo przekazanie go pominęło.",
              "Przekazuj jako załącznik, a nie w treści, i sprawdź, czy reguła zachowuje załączniki.",
            ],
            [
              "E-mail bez załącznika niczego nie uruchomił",
              "Przetwarzaj treść e-maila jest wyłączone albo treść prawie nie zawierała tekstu.",
              "Włącz Przetwarzaj treść e-maila w panelu Wyzwalacz e-mail (Flows i Collections).",
            ],
            [
              "Notatka przewodnia utworzyła własny Run",
              "Przetwarzaj treść e-maila ma ustawiony tryb Zawsze.",
              "Zmień tryb na Tylko gdy nie ma załączników.",
            ],
            [
              "Runs się pojawiają, ale kończą się błędem",
              "Problemem jest sam dokument, a nie droga e-mailowa.",
              "Otwórz Run i przeczytaj jego log; błąd dotyczy ekstrakcji.",
            ],
            [
              "Wyniki nigdy nie przychodzą e-mailem",
              "Wysyłka e-mailem nie jest skonfigurowana, Run się nie powiódł albo czeka na weryfikację.",
              "Najpierw sprawdź status Run, potem konfigurację Wysyłki e-mailem.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Automatyczne kierowanie różnych dokumentów za pomocą Collections",
            description:
              "Skieruj jeden adres e-mail na kilka Flows i pozwól Tavnit wybrać właściwy dla każdego dokumentu.",
          },
          {
            href: "/docs/splitters",
            label: "Dzielenie plików z wieloma dokumentami przed ekstrakcją",
            description: "Dla nadawców, którzy łączą kilka dokumentów w jednym załączniku.",
          },
          {
            href: "/docs/webhooks",
            label: "Dostarczanie wyników do własnych systemów przez webhooki",
            description:
              "Czytelna maszynowo alternatywa dla Wysyłki e-mailem, z ponawianiem prób.",
          },
          {
            href: "/docs/api-integration",
            label: "Wysyłanie dokumentów przez REST API",
            description:
              "Dla wolumenów i rozmiarów plików, których e-mail nie uniesie, z jawną obsługą błędów.",
          },
        ]}
      />
    </section>
  );
}
