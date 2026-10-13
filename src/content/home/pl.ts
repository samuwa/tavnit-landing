import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — Polski (pl). Translated from ./en.ts. */
const pl: HomeCopy = {
  title: "Tavnit — Wyciągaj dane z dokumentów dzięki AI, weryfikuj je i działaj",
  description:
    "Zamieniaj faktury, listy pakunkowe, umowy i formularze w uporządkowane dane — bez szablonów dla każdego dostawcy. Twój zespół weryfikuje i zatwierdza, zanim cokolwiek zostanie zapisane. API, e-mail i MCP.",
  schemaName: "Tavnit po polsku",
  breadcrumbHome: "Strona główna",
  readInEnglish: "Read this page in English",
  eyebrow: "Operacje na dokumentach z AI",
  h1: "Wyciągaj dane z dokumentów dzięki AI, weryfikuj je z zespołem i działaj",
  lede:
    "Tavnit zamienia faktury, listy pakunkowe, umowy i formularze w uporządkowane dane — bez szablonów dla każdego dostawcy. Twój zespół weryfikuje i zatwierdza, zanim cokolwiek zostanie zapisane, a zatwierdzone dane trafiają do Twoich systemów przez API, webhook lub e-mail.",
  ctaDemo: "Umów demo",
  ctaTry: "Wypróbuj za darmo",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Problem",
  problems: [
    "Te same pola, co miesiąc przepisywane ze stu różnych układów. Każdy dostawca formatuje fakturę po swojemu, a ktoś z Twojego zespołu kopiuje ją ręcznie do arkusza albo do systemu.",
    "Narzędzia OCR oparte na szablonach działają, dopóki dostawca nie zmieni układu — a potem zawodzą bez ostrzeżenia. Narzędzia typu „porozmawiaj ze swoim PDF-em” zmyślają liczby i nie mają weryfikacji, ścieżki audytu ani drogi do Twoich systemów.",
    "Błędna suma wygląda dokładnie tak samo jak poprawna. Prawdziwym kosztem nie są godziny wprowadzania danych, tylko błąd, który niezauważony trafia do Twoich ksiąg albo do zgłoszenia celnego.",
  ],
  stepsHeading: "Jak to działa: wyciągnij, zweryfikuj, działaj",
  steps: [
    {
      title: "Wyciągnij",
      body: "Raz definiujesz potrzebne pola — numer faktury, dostawcę, pozycje z ilością i ceną — a Tavnit wyciąga je z każdego PDF-a, skanu czy zdjęcia, niezależnie od układu. Bez szablonów dla poszczególnych dostawców.",
    },
    {
      title: "Zweryfikuj",
      body: "Cleaners czyszczą i walidują dane: formaty dat, waluty, arytmetykę pozycji, porównanie z danymi referencyjnymi. Wszystko, co się nie zgadza, zatrzymuje się i trafia do wskazanego weryfikatora. Każda czynność jest zapisywana w niemodyfikowalnej ścieżce audytu.",
    },
    {
      title: "Działaj",
      body: "Zatwierdzone dane trafiają do Twojego ERP lub systemu księgowego przez API albo webhook, są zapisywane w Buckecie, który możesz przeszukiwać, wypełniają formularze PDF albo zasilają agenta, który pracuje za Ciebie w portalu internetowym.",
    },
  ],
  useCasesHeading: "Zastosowania",
  useCasesIntro:
    "Każda strona opisuje, które pola mają znaczenie w danym typie dokumentu i co zwykle idzie nie tak — czyli to, co sprawia, że jeden typ dokumentu jest trudniejszy od innego.",
  useCasesAll: "Zobacz wszystkie zastosowania ({count})",
  integrationsHeading: "Działa z narzędziami, których już używasz",
  integrations: [
    "E-mail: przekaż PDF na adres Tavnit i odbierz dane z powrotem. Zero integracji.",
    "REST API i webhooki: wysyłaj dokumenty ze swojego systemu i odbieraj wyniki, gdy tylko będą gotowe. Gotowe przepisy dla Zapier, Make, n8n i Power Automate.",
    "Konektor MCP: podłącz Tavnit do claude.ai lub Cursor i poproś asystenta, żeby przetworzył dokumenty albo przeszukał wyciągnięte dane.",
    "Buckets: wbudowany magazyn uporządkowanych danych, który możesz przeszukiwać zwykłym językiem i wizualizować na wykresach — bez eksportowania czegokolwiek.",
  ],
  integrationsAll: "Wszystkie integracje",
  faqHeading: "Częste pytania",
  faqs: [
    {
      q: "Czy muszę budować szablon dla każdego dostawcy?",
      a: "Nie. Definiujesz pola raz w Flow, a Tavnit znajduje je w każdym układzie. Jeśli dostawca zmieni format faktury, nie musisz nic robić.",
    },
    {
      q: "Jak nie dopuścić błędnej wartości do mojego systemu?",
      a: "Dzięki weryfikacji ręcznej. Możesz wymagać zatwierdzenia każdego dokumentu albo tylko wtedy, gdy reguła Cleanera coś wykryje — na przykład że ilość razy cena jednostkowa nie zgadza się z wartością pozycji. Weryfikator widzi dokument i wyciągnięte dane, poprawia lub zatwierdza, a każda czynność trafia do ścieżki audytu.",
    },
    {
      q: "Jak wysyłać dokumenty?",
      a: "Jak wolisz: przekaż e-mail z załączonym PDF-em na adres Tavnit, wgraj pliki w aplikacji albo wyślij je przez API. Wyniki wychodzą przez webhook, API lub e-mail albo są zapisywane w Buckecie, który możesz przeszukiwać i wizualizować.",
    },
    {
      q: "Czy to działa w moim języku?",
      a: "Tak. Tavnit wyciąga dane z dokumentów w dowolnym języku, a dane możesz zwracać z nazwami pól, których używa Twój system. Sama aplikacja jest dostępna w kilku językach.",
    },
    {
      q: "Ile to kosztuje?",
      a: "Cennik opiera się na kredytach: 1 kredyt to 1 przetworzona strona. Umów demo, a przyjrzymy się Twojemu wolumenowi i Twoim prawdziwym dokumentom.",
    },
  ],
  finalHeading: "Wypróbuj na jednym ze swoich dokumentów",
  finalBody:
    "Przynieś prawdziwą fakturę albo listę pakunkową. Podczas demo razem zbudujemy Twój pierwszy Flow, a Ty zobaczysz na żywo, jak pojawiają się dane.",
};

export default pl;
