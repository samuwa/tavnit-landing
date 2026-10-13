import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";


/** /pl/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "Połącz claude.ai". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Połącz Tavnit z claude.ai za pomocą konektora MCP",
    description:
      "Wygeneruj URL konektora Tavnit na stronie Integracje i dodaj go w claude.ai jako własny konektor, aby twój asystent mógł pracować z twoimi danymi w Tavnit.",
    steps: [
      {
        name: "Otwórz Integracje w Tavnit",
        text: "Zaloguj się do aplikacji Tavnit i otwórz Integracje na pasku bocznym. Sprawdź, czy jesteś w organizacji, do której danych asystent ma mieć dostęp.",
      },
      {
        name: "Wygeneruj URL konektora",
        text: "Na karcie Własny konektor wybierz Wygeneruj URL konektora. Tavnit wystawia URL na podstawie twojego klucza API i pokazuje, kiedy został utworzony i kiedy wygasa.",
      },
      {
        name: "Skopiuj URL",
        text: "Skopiuj URL konektora przyciskiem kopiowania. Traktuj go jak hasło.",
      },
      {
        name: "Dodaj go w claude.ai jako własny konektor",
        text: "W claude.ai przejdź do Settings, potem Connectors, potem Add custom connector, i wklej URL. Własne konektory wymagają planu Claude Pro lub wyższego.",
      },
      {
        name: "Potwierdź połączenie",
        text: "Rozpocznij nowy czat i zapytaj asystenta, jakie ma narzędzia Tavnit. Jeśli je wymieni, konektor działa.",
      },
    ],
  },
};

export default function McpConnectorPl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Konektor MCP
      </h1>

      <DocCard icon={<Plug size={24} />} title="Co robi konektor MCP">
        <Lead>
          Konektor MCP dodaje twoją organizację Tavnit jako narzędzie w asystencie AI. Po połączeniu
          możesz pytać asystenta o swoje dane w Tavnit zwykłym językiem, a on odpowiada na podstawie
          twojego aktywnego konta, zamiast zgadywać.
        </Lead>
        <p>
          MCP (Model Context Protocol) to otwarty standard, który pozwala asystentom AI wywoływać
          zewnętrzne narzędzia. Tavnit utrzymuje serwer MCP pod adresem{" "}
          <InlineCode>mcp.tavnit.io</InlineCode>, a URL konektora to poświadczenie, które kieruje
          klienta do twojej organizacji. Działa z <strong>claude.ai</strong> (od planu Pro),{" "}
          <strong>Cursor</strong> i każdym innym klientem, który akceptuje URL zdalnego serwera MCP.
        </p>
        <p>
          Do czego służy konektor i czym różni się od wklejenia pliku do czatu, przeczytasz w{" "}
          <Link href={localizedPath("/integrations/mcp", "pl")} className="text-accent hover:underline">
            przeglądzie konektora MCP
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Włączany na prośbę">
          Konektor jest włączany dla każdej organizacji osobno. Jeśli na stronie Integracje nie
          widzisz karty Własny konektor, skontaktuj się z pomocą techniczną, aby włączyć go dla
          swojej organizacji.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Zanim zaczniesz">
        <Lead>
          Potrzebujesz trzech rzeczy: organizacji z włączonym konektorem, swojego klucza API i
          klienta MCP. Konektor jest wystawiany na podstawie twojego własnego klucza, więc ma dostęp
          tylko do organizacji, która była wybrana podczas jego generowania, a asystent działa z tym
          kluczem.
        </Lead>
        <DataTable
          head={["Wymaganie", "Skąd je wziąć"]}
          rows={[
            [
              "Karta Własny konektor",
              <Fragment key="f0">
                Na stronie <strong>Integracje</strong>, tylko gdy konektor jest włączony dla twojej
                organizacji. Jeśli jej brakuje, zapytaj pomoc techniczną.
              </Fragment>,
            ],
            [
              "Twój klucz API",
              <Fragment key="f1">
                Karta <strong>Klucz API</strong> na tej samej stronie: jeden klucz na członka w
                każdej organizacji. Jeśli widzisz <em>No API key found. Please log in again.</em>,
                wyloguj się i zaloguj ponownie.
              </Fragment>,
            ],
            [
              "Klient MCP",
              <Fragment key="f2">
                claude.ai w planie Pro lub wyższym, Cursor albo dowolny klient, który akceptuje URL
                zdalnego serwera MCP.
              </Fragment>,
            ],
            [
              "Twoja rola",
              <Fragment key="f3">
                Asystent używa twojego klucza API, więc może robić tylko to, na co pozwala twój
                klucz. Na przykład klucz roli <strong>Tylko HITL</strong> jest odrzucany przez
                żądania przetwarzania. Zobacz{" "}
                <DocLink href="/docs/user-roles">role użytkowników</DocLink> i{" "}
                <DocLink href="/docs/api-integration">stronę o API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Połącz claude.ai">
        <Lead>
          Wygeneruj URL w Tavnit, a potem wklej go do claude.ai jako własny konektor. Nie trzeba
          niczego instalować ani edytować żadnego pliku konfiguracyjnego.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Otwórz <strong>Integracje</strong> na pasku bocznym Tavnit. Najpierw sprawdź
              przełącznik organizacji: konektor jest powiązany z organizacją, w której akurat
              jesteś.
            </Fragment>,
            <Fragment key="f5">
              Na karcie <strong>Własny konektor</strong> wybierz{" "}
              <strong>Wygeneruj URL konektora</strong>.
            </Fragment>,
            <Fragment key="f6">Skopiuj URL przyciskiem kopiowania.</Fragment>,
            <Fragment key="f7">
              W claude.ai przejdź do <strong>Settings → Connectors → Add custom connector</strong>{" "}
              i wklej URL.
            </Fragment>,
            <Fragment key="f8">
              Otwórz nowy czat i zapytaj asystenta, jakie ma narzędzia Tavnit. Jeśli je wymieni,
              konektor działa.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Połącz Cursor lub innego klienta MCP">
        <Lead>
          Każdy klient obsługujący zdalne serwery MCP przyjmuje ten sam URL. Dodaj go jako serwer
          zdalny (URL), a nie oparty na poleceniu: nie ma żadnego lokalnego procesu do
          uruchomienia, bo konektor wskazuje na hostowany serwer.
        </Lead>
        <NumberedList
          items={[
            "Wygeneruj i skopiuj URL konektora na stronie Integracje, jak wyżej.",
            <Fragment key="f9">
              W Cursor otwórz ustawienia MCP i dodaj nowy serwer typu{" "}
              <strong>remote</strong> / URL.
            </Fragment>,
            <Fragment key="f10">
              Wklej URL konektora jako URL serwera. Osobne pole na klucz API nie jest potrzebne: URL
              zawiera już poświadczenie.
            </Fragment>,
            "Przeładuj klienta i sprawdź, czy Tavnit pojawia się na jego liście narzędzi.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Jeden URL, kilku klientów">
          W danym momencie masz jeden URL konektora i możesz wkleić go do więcej niż jednego
          klienta. Wszyscy działają jako ty w tej samej organizacji, więc odświeżenie rozłącza ich
          wszystkich naraz.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Co może zrobić twój asystent">
        <Lead>
          Przez konektor asystent pracuje z danymi Tavnit twojej organizacji, używając twojego
          klucza API. Budowanie i konfigurowanie Flows, Cleaners, Pipelines oraz zespołu pozostaje w
          aplikacji.
        </Lead>
        <p>
          Narzędzia oferowane przez konektor wyświetla twój klient MCP, a najszybciej zobaczysz je,
          pytając asystenta. Pytaj zwykłym językiem i nazywaj Flow, Bucket lub Run tak, jak nazywa
          się w aplikacji.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Twoje dane, twoja organizacja">
          Konektor ma dostęp tylko do organizacji, w której został wygenerowany. Aby pracować z inną
          organizacją, przełącz się na nią w Tavnit i wygeneruj tam URL. Praca uruchomiona z
          poziomu asystenta przebiega zgodnie z twoją konfiguracją jak każdy inny Run: jeśli Flow
          wymaga <DocLink href="/docs/human-in-the-loop">weryfikacji ręcznej</DocLink>, Run nadal
          na nią czeka.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Wygasanie i odświeżanie">
        <Lead>
          URL-e konektora mają ograniczony czas ważności. Karta Własny konektor pokazuje, kiedy URL
          został utworzony i ile czasu mu zostało, a w ostatnich 24 godzinach ostrzega cię.
          Odświeżenie wystawia nowy URL i natychmiast unieważnia stary.
        </Lead>
        <DataTable
          head={["Stan", "Co widzisz", "Co zrobić"]}
          rows={[
            [
              "Aktywny",
              <Fragment key="s0">URL, datę utworzenia i liczbę dni pozostałych do wygaśnięcia.</Fragment>,
              "Nic.",
            ],
            [
              "Wkrótce wygasa (mniej niż 24 godziny)",
              <Fragment key="f16">
                Pozostały czas w godzinach lub minutach oraz bursztynowe powiadomienie:{" "}
                <em>Konektor wkrótce wygaśnie — odśwież go teraz, aby uniknąć przerwy.</em>
              </Fragment>,
              "Odśwież, a potem wklej nowy URL do każdego klienta, który go używa.",
            ],
            [
              "Wygasły",
              <Fragment key="f17">
                Czerwone powiadomienie:{" "}
                <em>Ten konektor wygasł. Odśwież, aby wygenerować nowy URL.</em>
              </Fragment>,
              "Odśwież i wklej ponownie. Klienci używający starego URL już przestali działać.",
            ],
          ]}
        />
        <p>
          Aby odświeżyć, wybierz <strong>Odśwież URL</strong> i potwierdź przyciskiem{" "}
          <strong>Odśwież</strong> w oknie <em>Odświeżyć URL konektora?</em>.
        </p>
        <WarningBox>
          Odświeżenie to nie rotacja, którą można przygotować etapami. W chwili potwierdzenia
          poprzedni URL przestaje działać, a każdy asystent, który go używa, zgłasza błędy, dopóki
          nie wkleisz nowego. Odświeżaj wtedy, gdy możesz od razu zaktualizować klientów.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Traktuj URL jak hasło">
        <Lead>
          URL konektora to poświadczenie. Każdy, kto go ma, może dostać się do danych twojej
          organizacji jako ty, bez logowania. Bezpiecznie jest wkleić go w ustawieniach klienta MCP;
          niebezpiecznie jest udostępniać go w zgłoszeniu, wiadomości na czacie czy na zrzucie
          ekranu.
        </Lead>
        <BulletList
          items={[
            "Nie commituj go do repozytorium i nie wklejaj do udostępnianego dokumentu.",
            "Przed udostępnieniem zrzutu ekranu rozmyj URL lub go wytnij.",
            "Jeśli wycieknie, natychmiast go odśwież: to od razu unieważnia ujawniony URL.",
            "Ponowne wygenerowanie klucza API to osobna czynność na tej samej stronie; wykonaj ją także, jeśli podejrzewasz, że ujawniony został sam klucz.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Rozwiązywanie problemów">
        <Lead>
          Większość problemów z konektorem sprowadza się do jednej z czterech przyczyn: funkcja nie
          jest włączona, sesja wygasła, URL wygasł albo klient używa URL, który został zastąpiony
          przez odświeżenie.
        </Lead>
        <DataTable
          head={["Objaw", "Przyczyna", "Rozwiązanie"]}
          rows={[
            [
              "Brak karty Własny konektor w Integracjach",
              "Konektor nie jest włączony dla twojej organizacji.",
              "Skontaktuj się z pomocą techniczną, aby go włączyć.",
            ],
            [
              <Fragment key="f18"><InlineCode>Własne konektory wymagają ważnej sesji Tavnit. Spróbuj się wylogować i zalogować ponownie.</InlineCode></Fragment>,
              "Tavnit nie mógł zweryfikować twojego klucza, aby wystawić lub odczytać URL.",
              "Wyloguj się i zaloguj ponownie, a potem wygeneruj URL jeszcze raz.",
            ],
            [
              "Asystent przestał widzieć Tavnit",
              "URL wygasł albo ktoś go odświeżył.",
              "Sprawdź, czy karta pokazuje powiadomienie o wygaśnięciu lub zbliżającym się wygaśnięciu, odśwież URL i wklej go ponownie do każdego klienta.",
            ],
            [
              "Asystent widzi niewłaściwe dane",
              "URL został wygenerowany, gdy wybrana była inna organizacja.",
              "Przełącz organizację w Tavnit, wygeneruj nowy URL i zastąp nim stary.",
            ],
            [
              "Asystent nie może wykonać jakiejś czynności",
              "Twoja rola na to nie pozwala.",
              "Sprawdź swoją rolę, zanim uznasz, że to błąd konektora.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Kiedy używać konektora zamiast API">
        <Lead>
          Używaj konektora do pracy w formie rozmowy i doraźnej: jednorazowych pytań, przeglądania
          zapisanych danych, szybkich sprawdzeń. Używaj REST API do wszystkiego, co działa według
          harmonogramu, w dużej skali lub jest osadzone w innym systemie, gdzie potrzebujesz jawnej
          obsługi błędów i ponowień.
        </Lead>
        <DataTable
          head={["Sytuacja", "Użyj"]}
          rows={[
            ["Współpracownik pyta, ile dostawca zafakturował w zeszłym kwartale", "Konektor MCP"],
            ["Chcesz przeglądać swoje dane w czacie", "Konektor MCP"],
            ["Każda faktura z portalu dostawcy, co noc", "REST API lub wyzwalacz e-mail"],
            ["Twój własny produkt potrzebuje wyodrębnionych danych", "REST API plus webhooki"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Dokumentacja REST API Tavnit",
            description:
              "Każdy endpoint, z uwierzytelnianiem kluczem API, polami żądań, odpowiedziami i przykładami w Pythonie i JavaScripcie.",
          },
          {
            href: "/docs/buckets",
            label: "Przechowywanie wyodrębnionych danych w Buckets",
            description: "Ustrukturyzowane tabele, w których znajdują się twoje wyodrębnione dane.",
          },
          {
            href: "/docs/user-roles",
            label: "Role i uprawnienia użytkowników",
            description: "Co mogą Właściciel, Administrator, Członek i Tylko HITL.",
          },
        ]}
      />
    </section>
  );
}
