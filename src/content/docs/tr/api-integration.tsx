"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import {
  AudioLines,
  Bot,
  Briefcase,
  CircleDot,
  ClipboardCheck,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  FolderInput,
  Info,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Paperclip,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Split,
  Star,
  Target,
  UserCheck,
  Wand2,
  Webhook,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";
import {
  AGENT_RUN_RESPONSE,
  AGENT_TRIGGER_REQUEST,
  API_ERROR_EXAMPLE,
  API_KEY_RESPONSE,
  BUCKET_READ_REQUEST,
  BUCKET_READ_RESPONSE,
  BUCKET_WRITE_RESPONSE,
  BUCKETS_JSON_EXAMPLE,
  CASE_REQUEST,
  CASE_RESPONSE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTION_PROCESS_RESPONSE,
  COLLECTIONS_JSON_EXAMPLE,
  FILLER_REQUEST,
  HITL_RUN_APPROVE_REQUEST,
  INSPECTOR_PROCESS_REQUEST,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_RUN_POLL_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  MATCHER_RUN_REQUEST,
  NET_CATCH_REQUEST,
  PIPELINE_EXECUTE_REQUEST,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_RUN_POLL_CODE,
  PYTHON_SPLITTERS_CODE,
  RUN_GET_RESPONSE,
  RUN_PROCESS_RESPONSE,
  SIGNAL_RUN_REQUEST,
  SOURCE_FILE_RESPONSE,
  SPLIT_RUN_RESPONSE,
  SPLITTERS_JSON_EXAMPLE,
  SWEEP_RUN_RESPONSE,
} from "@/components/docs/code-samples";

/**
 * /tr/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
 * A client module (tab and language state), so it exports no `schema`; the
 * English page has none either. Code samples are shared and stay English.
 */

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* The app deep-links to the No-Code tab with #no-code. Reading the hash
 * through an external store keeps the server render on "code" (no hydration
 * mismatch) and also follows later hash changes. */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const hashIsNoCode = () => window.location.hash === "#no-code";
const serverHash = () => false;

const H3 = "text-base font-semibold text-fg-2 mt-6 mb-1";

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 font-mono text-[13px]">
      <span className="rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-0.5 text-[11px] font-bold text-white">
        {method}
      </span>
      <span className="break-all text-fg-2">{path}</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
      {(["python", "javascript"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            lang === l
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          {l === "python" ? "Python" : "JavaScript"}
        </button>
      ))}
    </div>
  );
}

const FIELD_HEAD = ["Alan", "Zorunlu", "Açıklama"];

export default function ApiIntegrationTr() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API Entegrasyonu
      </h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setChosenTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Kod
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setChosenTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Kodsuz
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Kod" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="API nasıl çalışır">
          <p>
            Tavnit REST API, kendi kodunuzun uygulamada yaptıklarınızı yapmasını sağlar: belgeleri bir
            Flow&apos;a, Collection&apos;a, Splitter&apos;a veya Pipeline&apos;a göndermek; Cleaner&apos;ları, Matcher&apos;ları,
            Inspector&apos;ları, Filler&apos;ları, Signals&apos;ı ve Agent&apos;ları çalıştırmak; Bucket&apos;ları okumak ve
            yazmak; Subject vakalarını yönetmek ve insan incelemelerini onaylamak veya reddetmek.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                Temel URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. Aşağıdaki tüm yollar
                buna görelidir.
              </Fragment>,
              <Fragment key="b1">
                Her istek, API anahtarınızı <InlineCode>X-API-Key</InlineCode> başlığında taşır.
              </Fragment>,
              <Fragment key="b2">
                İşleme eşzamansızdır. İş başlatan uç noktalar hemen bir kimlikle birlikte{" "}
                <strong>202 Accepted</strong> yanıtı verir ve iş arka planda çalışır. Sonucu yoklama
                yaparak (Run&apos;lar, Agent Run&apos;ları, Catch&apos;ler, vakalar) ya da özellikte yapılandırılmış
                bir <DocLink href="/docs/webhooks">webhook</DocLink> üzerinden alırsınız.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Beta özellikleri">
            Pipeline&apos;lar, Subject&apos;ler, Matcher&apos;lar, Inspector&apos;lar, Filler&apos;lar, Signals ve Nets Beta
            aşamasındadır. Uç noktaları bugün çalışır, ancak ayrıntılar hâlâ değişebilir.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Kimlik doğrulama ve kimlikler">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API anahtarı</h3>
          <p>
            Uygulamanın kenar çubuğunda <strong>Entegrasyonlar</strong>&apos;ı açın.{" "}
            <strong>API Anahtarı</strong> kartı anahtarınızı gösterir (orada görüntüleyip
            kopyalayabilirsiniz). Her üyenin her kuruluşta kendi anahtarı vardır ve bir istek, o
            kuruluşta o üye olarak işlem yapar.
          </p>
          <WarningBox>
            API anahtarınızı gizli tutun. Aynı karttaki <strong>Yeniden oluştur</strong> mevcut
            anahtarı hemen geçersiz kılar ve onu hâlâ kullanan her şey çalışmayı durdurur.
          </WarningBox>
          <p>Geçerli bir anahtar içermeyen bir istek şu yanıtı alır:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Roller</h3>
          <p>
            Anahtar rolünüzü taşır. <strong>Yalnızca HITL</strong> rolüne sahip üyeler yalnızca insan
            incelemesi onaylama ve reddetme uç noktalarını ve API anahtarı uç noktalarını
            kullanabilir. Tüm işleme ve veri uç noktaları onları <strong>403</strong> ve{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode> ile reddeder. Bkz.{" "}
            <DocLink href="/docs/user-roles">kullanıcı rolleri</DocLink>.
          </p>

          <h3 className={H3}>Kimlikler</h3>
          <p>
            Her Flow, Collection, Splitter, Cleaner, Bucket, Agent, Matcher, Inspector, Filler ve
            Pipeline, kimliğini ayrıntı sayfasında bir kopyalama düğmesiyle birlikte gösterir.
            Kaynaklar anahtarınızın kuruluşuna ait olmalıdır: başka bir kuruluşun kimliği 403 veya 404
            yanıtı alır.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Dosya gönderme">
          <p>Belge alan uç noktalar belgeyi iki yoldan biriyle kabul eder:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart dosya yükleme">
            Dosyayı multipart/form-data olarak file adlı bir alanda, diğer alanları da form alanları
            olarak gönderin. Tüm dosya uç noktalarında çalışır.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="JSON gövdesinde Base64">
            Diğer alanlarla birlikte file_base64 (dosya içeriği) ve filename (uzantısıyla birlikte)
            içeren bir JSON gönderin. Bir otomasyon aracı size dosya yerine Base64 verdiğinde
            kullanışlıdır.
          </InfoBox>
          <DataTable
            head={["Uç nokta", "Base64", "Kabul edilen dosyalar"]}
            rows={[
              ["POST /runs/process", "Evet", "PDF, görseller (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), elektronik tablolar (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Evet", "Run'larla aynı"],
              ["POST /splits/run", "Evet", "Run'larla aynı"],
              ["POST /pipelines/{id}/execute", "Evet", "PDF ve görseller"],
              ["POST /signals/{id}/run", "Evet", "Ses: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Hayır", "Elektronik tablolar: CSV, XLSX, XLS"],
              ["Inspector'lar, Filler'lar, Subject'ler ve vakalar", "Hayır", "Multipart dosya olarak belge"],
            ]}
          />
          <p>
            Tek bir istek en fazla 150 MB olabilir. Dosya türü, dosya adının uzantısından belirlenir.
          </p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Yanıtlar ve hatalar">
          <p>
            Yanıtlar, <InlineCode>success</InlineCode> bayrağı içeren JSON&apos;dur. Hatalar bir{" "}
            <InlineCode>error</InlineCode> dizesi, bazen bir <InlineCode>message</InlineCode> ve
            sorunu açıklayan ek anahtarlar taşır:
          </p>
          <CodeBlock lang="409 örneği" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Durum", "Anlamı"]}
            rows={[
              ["200 / 201", "Tamamlandı (okumalar, iptaller, onaylar) / oluşturuldu (vakalar, doldurmalar, denetimler)."],
              ["202", "Kabul edildi: iş kuyruğa alındı. Döndürülen kimliği saklayın."],
              ["400", "Zorunlu bir alan eksik veya geçersiz, dosya türü desteklenmiyor ya da kaynak etkin değil veya kurulmamış."],
              ["401", "X-API-Key eksik veya geçersiz."],
              ["402", "Kuruluşunuz şu anda yeni iş başlatamıyor; Tavnit ekibiyle iletişime geçin."],
              ["403", "Kaynak başka bir kuruluşa ait, rolünüz Yalnızca HITL ya da o öğenin inceleyicisi değilsiniz."],
              ["404", "Kimlik kuruluşunuzda mevcut değil."],
              ["409", "Mevcut durumla çakışma: Bucket adı eşleşmiyor, zaten iptal edilmiş veya tamamlanmış, vaka kapalı, yuva zaten dolu."],
              ["429", "Bir Agent için zaten çok fazla Run bekliyor."],
              ["500", "Beklenmeyen hata. Daha sonra yeniden denemek güvenlidir."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Uç nokta başvurusu">
          <DataTable
            head={["Özellik", "Yöntem ve yol", "Ne yapar"]}
            rows={[
              ["Flows", "POST /runs/process", "Bir belgeden bir Flow ile veri çıkarır"],
              ["Flows", "GET /runs/{run_id}", "Run durumu ve çıkarılan veriler"],
              ["Flows", "GET /runs/{run_id}/source-file", "Orijinal belge"],
              ["Collections", "POST /collections/process", "Yapay zekâ bir belgeyi doğru Flow'a veya Splitter'a yönlendirir"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Orijinal belge"],
              ["Splitters", "POST /splits/run", "Çok belgeli bir dosyayı böler"],
              ["Splitters", "GET /splits/{split_id}/source-file", "Orijinal paket"],
              ["Cleaners", "POST /sweeps/run", "Bir elektronik tabloyu temizler"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "JSON olarak gönderilen satırları temizler"],
              ["Buckets", "POST /buckets/write", "Satır ekler veya değiştirir"],
              ["Buckets", "GET /buckets/read", "Satırları sayfalar hâlinde okur"],
              ["Agents", "POST /bots/{agent_id}/runs", "Bir Agent Run'ı başlatır"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Bir Agent Run'ını yoklar"],
              ["Agents", "GET /bots/{agent_id}/runs", "Bir Agent'ın Run'larını listeler"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Bir Agent Run'ını iptal eder"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Tamamlanmış Run'ları eşleştirir"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Bir denetime belge ekler"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Bir doldurma açar ve belge ekler"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Bir Pipeline yürütür"],
              ["Signals", "POST /signals/{signal_id}/run", "Bir ses dosyasını yapılandırır (bir Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Bir belgeyi bir vakaya yönlendirir"],
              ["Nets", "POST /nets/{net_id}/catch", "Bir Catch başlatır"],
              ["İnsan incelemesi", "POST /runs/{run_id}/hitl/approve", "Duraklatılmış öğeleri onaylar veya reddeder"],
              ["API anahtarı", "GET /me/api-key", "Anahtarınızı okur veya yeniden oluşturur"],
            ]}
          />
          <p>Her özellik, diğer uç noktalarıyla birlikte aşağıda ayrıntılı olarak açıklanmıştır.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: bir belgeyi işleyin">
          <p>
            Bir Flow&apos;a tek bir belge gönderin. Tavnit bir Run oluşturur ve belgeden arka planda veri
            çıkarır.
          </p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Evet", "Belgeden veri çıkaracak Flow."],
              ["file", "Evet*", "Belge (multipart)."],
              ["file_base64 + filename", "Evet*", "file yerine: Base64 içeriği ve uzantısıyla birlikte dosya adı."],
              ["content_type", "Hayır", "Base64 dosyası için MIME türü."],
              ["source", "Hayır", "Run'da saklanan etiket: api (varsayılan), email, manual_upload veya collection."],
            ]}
            caption="* Ya file ya da file_base64 + filename gönderin."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="202 yanıtı" code={RUN_PROCESS_RESPONSE} />
          <p>
            Hatalar: 400 (dosya yok, flow_id yok, desteklenmeyen veya geçersiz dosya), 403 (başka bir
            kuruluşun Flow&apos;u), 404 (Flow bulunamadı). Reddedilen bir istek, mümkün olduğunda yine de
            başarısız bir Run oluşturur ve onu <strong>Run&apos;lar</strong> sayfasında bulabilmeniz için{" "}
            <InlineCode>run_id</InlineCode> değerini döndürür.
          </p>

          <h3 className={H3}>Run&apos;ı ve verilerini alın</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            <InlineCode>status</InlineCode> son bir duruma ulaşana kadar yoklayın. Durumlar:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (
            <DocLink href="/docs/human-in-the-loop">insan incelemesi</DocLink> için duraklatıldı),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> ve{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> çıkarılan satırları
            içerir ve Run tamamlanana kadar, onay beklediği süre de dahil olmak üzere{" "}
            <InlineCode>null</InlineCode> kalır. <InlineCode>columns</InlineCode> ayarlıysa sütun
            sırası için onu kullanın. <InlineCode>attempt</InlineCode> ve{" "}
            <InlineCode>previous_attempts</InlineCode> otomatik yeniden denemeleri gösterir. Orijinal
            dosyaya imzalı bir bağlantı da almak için <InlineCode>?include_document=true</InlineCode>{" "}
            ekleyin. Bu, Collection&apos;ların, Splitter&apos;ların, Pipeline&apos;ların ve e-postanın oluşturduğu
            Run&apos;lar dahil her Run için çalışır.
          </p>
          <CodeBlock lang="200 yanıtı" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (gönder ve yokla)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (gönder ve yokla)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Orijinal belgeyi alın</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Run&apos;ın durumu ne olursa olsun, dosyanın yüklendiği hâline imzalı bir URL döndürür. İsteğe
            bağlı <InlineCode>expires_in</InlineCode>, bağlantının ömrünü saniye cinsinden belirler (60
            ile 604800 arası, varsayılan 7 gün). <InlineCode>?download=true</InlineCode> ile yanıt
            dosyanın kendisidir.
          </p>
          <CodeBlock lang="200 yanıtı" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: belgeyi yapay zekâ yönlendirsin">
          <p>
            Flow seçmeden bir belge gönderin: yapay zekâ, Collection&apos;ın en uygun Flow&apos;unu veya
            Splitter&apos;ını seçer. Karışık belge türleri aldığınızda kullanın.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            <InlineCode>/runs/process</InlineCode> ile aynı gövde, ancak{" "}
            <InlineCode>flow_id</InlineCode> yerine <InlineCode>collection_id</InlineCode> ile (veya
            kimliği yola koyun: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            Collection etkin olmalı ve en az bir etkin Flow&apos;u veya Splitter&apos;ı bulunmalıdır; aksi
            hâlde çağrı 400 yanıtı verir.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="202 yanıtı" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            Seçilen Flow normal bir Run oluşturur ve webhook yükü{" "}
            <InlineCode>collection_run_id</InlineCode> içerir; böylece sonucu isteğinizle
            eşleştirebilirsiniz. Orijinal belgeye hemen{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> adresinden
            erişilebilir (Run kaynak dosyasıyla aynı seçenekler). Bkz.{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: çok belgeli bir dosyayı bölün">
          <p>
            Birkaç belge içeren bir dosya gönderin. Splitter her belgenin nerede başlayıp bittiğini
            bulur, onu sınıflandırır ve her parçayı belge türünün belirttiği yere gönderir.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            <InlineCode>/runs/process</InlineCode> ile aynı gövde, ancak{" "}
            <InlineCode>splitter_id</InlineCode> ile.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="202 yanıtı" code={SPLIT_RUN_RESPONSE} />
          <p>
            Flow&apos;lara gönderilen parçalar kendi Run&apos;larına dönüşür ve webhook&apos;ları{" "}
            <InlineCode>split_id</InlineCode> taşır. Orijinal paket{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode> adresindedir. Bkz.{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: temizleme çalıştırın">
          <p>
            Bir temizleme (sweep), değerleri normalleştirmek, sınıflandırmak, aramak veya
            zenginleştirmek için bir Cleaner&apos;ı veri satırları üzerinde çalıştırır. Satırları bir
            elektronik tablo olarak veya JSON olarak gönderin.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Evet", "Çalıştırılacak Cleaner."],
              ["file", "Evet", "CSV, XLSX veya XLS, yalnızca multipart. Başlıklar ilk satırda; Cleaner'ın gerektirdiği her temel alan, yinelenmeden bir sütun olmalıdır."],
              ["sheet_name", "Hayır", "Bir çalışma kitabının hangi sayfasının okunacağı (varsayılan: ilki)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            <InlineCode>rows</InlineCode> (nesnelerden oluşan bir dizi) içeren bir JSON veya yukarıdaki
            gibi multipart bir <InlineCode>file</InlineCode> gönderin.
          </p>
          <CodeBlock lang="JSON gövdesi" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="202 yanıtı" code={SWEEP_RUN_RESPONSE} />
          <p>
            Kurulumu geçersiz olan bir Cleaner, <InlineCode>validation_errors</InlineCode> ile 400
            yanıtı verir. Bkz. <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: satır yazın ve okuyun">
          <p>
            Kendi sistemlerinizden bir Bucket&apos;a satır gönderin veya Flow&apos;larınızın orada sakladıklarını
            okuyun. Bucket kimliğini ve adını, Bucket&apos;ın sayfasındaki bilgi simgesine dokunarak bulun.
            Ad bir güvenlik denetimidir: kimlikle eşleşmezse çağrı <strong>409</strong> yanıtı verir.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Evet", "Bucket."],
              ["bucket_name", "Evet", "Tam adı."],
              ["overwrite", "Evet", "Boolean. false satırları ekler; true mevcut tüm satırları değiştirir."],
              ["rows", "Evet", "Nesnelerden oluşan dizi; istek başına en fazla 50.000."],
            ]}
          />
          <p>
            Gövdeyi <InlineCode>application/json</InlineCode> olarak gönderin. Her satır, sütun adına
            veya görünen ada göre tam olarak Bucket&apos;ın sütunlarını içermelidir: eksik veya bilinmeyen
            bir sütun, <InlineCode>missing_columns</InlineCode> ve{" "}
            <InlineCode>extra_columns</InlineCode> listesiyle birlikte 400 vererek tüm yazma işlemini
            iptal eder.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="202 yanıtı" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Satırları okuyun</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Sorgu parametreleri: <InlineCode>bucket_id</InlineCode> ve{" "}
            <InlineCode>bucket_name</InlineCode> (zorunlu), <InlineCode>limit</InlineCode> (1 ile 1000
            arası, varsayılan 100) ve <InlineCode>offset</InlineCode> (varsayılan 0).{" "}
            <InlineCode>has_more</InlineCode> true olduğu sürece <InlineCode>offset</InlineCode> ile
            sayfa sayfa ilerleyin; <InlineCode>total_count</InlineCode> tüm satırları sayar. Satır{" "}
            <InlineCode>data</InlineCode> anahtarları sütun adlarıdır; görünen adlar için{" "}
            <InlineCode>columns</InlineCode> kullanın. Saklanan dosya bağlantıları yeni imzalı URL&apos;ler
            olarak döner.
          </p>
          <CodeBlock lang="İstek" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="200 yanıtı" code={BUCKET_READ_RESPONSE} />
          <p>
            Bkz. <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: Run tetikleyin ve yoklayın">
          <p>
            Kodunuzdan bir Agent başlatın ve yakaladıklarını toplayın. Agent&apos;lar istek üzerine kuruluş
            bazında etkinleştirilir: açılması için destek ekibiyle iletişime geçin.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            İsteğe bağlı JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode>, Agent&apos;ın girdi
            değişkenlerini bu Run için geçersiz kılar. Yalnızca Agent&apos;ın tanımladığı değişkenler
            kullanılır ve gizli değerler asla kabul edilmez. Gövdede <InlineCode>bot_id</InlineCode>{" "}
            ile <InlineCode>POST /bots/runs</InlineCode> çağrısı da yapabilirsiniz. Her çağrı yeni bir
            Run başlatır.
          </p>
          <CodeBlock lang="İstek" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> değeri <InlineCode>queued</InlineCode> olur; Agent aynı
            anda tek Run çalıştırıyorsa ve meşgulse <InlineCode>waiting</InlineCode> olur (sırası
            geldiğinde kendiliğinden başlar). Agent arşivlenmişse 409, zaten çok fazla Run bekliyorsa
            429 döner.
          </p>

          <h3 className={H3}>Yoklama, listeleme ve iptal</h3>
          <DataTable
            head={["Uç nokta", "Ne yapar"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Tek bir Run: durum, zamanlamalar, girdi (gizli değerler çıkarılmış) ve imzalı dosya bağlantılarıyla çıktı. GET /bots/{agent_id}/runs/{bot_run_id} adresinde de bulunur."],
              ["GET /bots/{agent_id}/runs", "En yeniden eskiye, girdi ve çıktı olmadan. Sorgu: status (queued, running, completed, failed, cancelled), limit (1 ile 100 arası, varsayılan 20), offset. runs ve total döndürür."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Bekleyen, kuyruktaki veya çalışan bir Run'ı iptal eder. Run zaten bittiyse 409. POST /bots/{agent_id}/runs/{bot_run_id}/cancel adresinde de bulunur."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Bkz. <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: Run'ları eşleştirin">
          <p>
            Matcher&apos;ın Flow&apos;una ait tamamlanmış Run&apos;ları karşılaştırın; örneğin faturaları satın alma
            siparişleriyle.
          </p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Evet", "Matcher'ın Flow'una ait iki veya daha fazla tamamlanmış Run."],
              ["benchmark_run_id", "Benchmark modunda", "Diğerlerinin karşılaştırıldığı Run."],
            ]}
          />
          <CodeBlock lang="İstek" code={MATCHER_RUN_REQUEST} />
          <p>
            Bir eşleştirmeyi okumak için API uç noktası yoktur: sonucu Matcher&apos;ın webhook&apos;u veya
            e-posta çıktısı üzerinden ya da uygulamada alın. Bkz.{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: bir belge setini kontrol edin">
          <p>
            Bir denetim belgeleri toplar, her birini Inspector&apos;ın bir yuvasına yönlendirir, veri
            çıkarır ve kontrol listesini değerlendirir.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart <InlineCode>file</InlineCode>. <InlineCode>inspection_id</InlineCode> olmadan
            yeni bir denetim oluşturulur; ona daha fazla belge eklemek için döndürülen{" "}
            <InlineCode>inspection_id</InlineCode> değerini gönderin (denetim hâlâ belge topluyor
            olmalıdır, aksi hâlde 409). Inspector etkin olmalıdır.
          </p>
          <CodeBlock lang="İstek" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Uç nokta", "Ne yapar"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Daha sonra belge eklemek üzere boş bir denetim oluşturur (201)."],
              ["POST /inspections/{inspection_id}/fire", "Belge toplamayı durdurur ve hemen değerlendirir. Zorunlu bir yuvada belge yoksa missing_inputs ile 400."],
            ]}
          />
          <p>
            Sonuç, Inspector&apos;ın webhook&apos;u veya e-posta çıktısı üzerinden gelir. Bkz.{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: PDF formlarını doldurun">
          <p>
            Bir doldurma, Filler&apos;ın ihtiyaç duyduğu belgeleri toplar, onlardan veri çıkarır ve
            değerleri Filler&apos;ın PDF şablonlarına yazar.
          </p>
          <DataTable
            head={["Uç nokta", "Ne yapar"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Bir doldurma açar (201, fill_id döndürür). Filler'ın bir şablona ve alan eşlemelerine ihtiyacı vardır."],
              ["POST /fills/{fill_id}/route-upload", "Multipart file; yapay zekâ onu açık bir yuvaya yönlendirir (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Belirli bir yuva için multipart file; o yuvanın Run'ını başlatır (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: tamamlanmış bir Run'ı bir yuva için yeniden kullanır (202)."],
              ["POST /fills/{fill_id}/fire", "Her yuvayı beklemek yerine hemen doldurur. Zorunlu bir yuva boşsa missing_inputs ile 400."],
              ["POST /fillers/{filler_id}/templates", "Bir şablon PDF'i ekler (multipart file, isteğe bağlı name). Alanlarını uygulamada eşleyin."],
            ]}
          />
          <CodeBlock lang="İstek" code={FILLER_REQUEST} />
          <p>
            Doldurulmuş PDF&apos;ler, Filler&apos;ın webhook&apos;u veya e-posta çıktısı üzerinden gelir. Bkz.{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: yürütün">
          <p>Bir belgeyle bir Pipeline&apos;ın tek bir yürütmesini başlatın.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart <InlineCode>file</InlineCode> veya <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF veya görsel. Pipeline etkin değilse ya da grafiği
            çalışamıyorsa 400 (<InlineCode>validation_errors</InlineCode> ile).
          </p>
          <CodeBlock lang="İstek" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode> ile iptal
            edin (çalışmıyorsa 409). Sonuçlar Pipeline&apos;ın çıktı düğümlerinden çıkar. Bkz.{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: bir ses dosyasını yapılandırın">
          <p>Bir kayıt gönderin; Signal onu yapılandırılmış verilere (bir Wave) dönüştürür.</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart <InlineCode>file</InlineCode> veya Base64. En fazla 150 MB ve 8 saatlik ses; en
            fazla 2 saat algılanan konuşma.
          </p>
          <CodeBlock lang="İstek" code={SIGNAL_RUN_REQUEST} />
          <p>
            Sonuç, Signal&apos;ın webhook&apos;u üzerinden veya uygulamada gelir. Bkz.{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects ve vakalar">
          <p>Belgeleri bir Subject&apos;in vakalarına dosyalayın ve vakaları kodunuzdan yönetin.</p>
          <DataTable
            head={["Uç nokta", "Ne yapar"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart file; Tavnit onu bir vakaya yönlendirir (202, subject_doc_id döndürür)."],
              ["POST /cases/{case_id}/docs", "Yönlendirme olmadan doğrudan bir vakaya multipart file. Subject'in yalnızca bir belge türü olmadığı sürece doc_type_id zorunludur. run_id döndürür (202). Vaka kapalıysa veya o belge türü zaten doluysa 409."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id ve doc_type_id: bekletilen bir belgeyi elle dosyalar (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (zorunlu, benzersiz, en fazla 200 karakter) ve params (isteğe bağlı nesne). Bir vaka oluşturur (201). Ad zaten varsa 409."],
              ["GET /subjects/{subject_id}/cases", "Sorgu: state (open veya closed), status, search, limit (en fazla 200, varsayılan 50), offset. cases ve total döndürür."],
              ["GET /cases/{case_id}", "Vaka ve belgeleri; her belge, GET /runs/{run_id} adresinde yoklanacak run_id ile birlikte."],
              ["POST /cases/{case_id}/close", "Vakayı kapatır (200). Ona gelen yeni belgeler dosyalanmak yerine bekletilir. Zaten kapalıysa 409."],
              ["POST /cases/{case_id}/reopen", "Vakayı yeniden açar (200). Açıksa 409."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: bağlı bir Inspector'ı vakanın tamamlanmış Run'ları üzerinde çalıştırır (202)."],
            ]}
          />
          <CodeBlock lang="İstek" code={CASE_REQUEST} />
          <CodeBlock lang="201 yanıtı" code={CASE_RESPONSE} />
          <p>
            Bkz. <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: bir Catch başlatın">
          <p>Nets kuruluş bazında etkinleştirilir. Erişim yoksa bu uç noktalar 403 yanıtı verir.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Gövde olmadan Catch, bir öncekinin bittiği yerden devam eder. Bunun yerine bir aralığı
            geriye dönük doldurmak için <InlineCode>window_start</InlineCode> ve/veya{" "}
            <InlineCode>window_end</InlineCode> (ISO zaman damgaları) gönderin. Net etkin değilse ya da
            bir öncekinden devam eden bir Catch zaten sürüyorsa 409.
          </p>
          <CodeBlock lang="İstek" code={NET_CATCH_REQUEST} />
          <p>
            <InlineCode>{"GET /catches/{catch_id}"}</InlineCode> adresini yoklayın: durum, aşama,
            sayımlar ve tamamlandığında sütunlar ile satırları içeren <InlineCode>output</InlineCode>.{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode> ile iptal edin. Bkz.{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="İnsan incelemesi: onaylayın veya reddedin">
          <p>
            İnceleme için duraklatılan öğeler kendi araçlarınızdan onaylanabilir veya reddedilebilir.
            Yalnızca o Flow&apos;un, Matcher&apos;ın, Inspector&apos;ın veya Filler&apos;ın yapılandırılmış bir inceleyicisi
            işlem yapabilir (aksi hâlde 403) ve öğenin durumu{" "}
            <InlineCode>awaiting_approval</InlineCode> olmalıdır (aksi hâlde 409). Bu uç noktalar
            Yalnızca HITL rolüne açıktır.
          </p>
          <DataTable
            head={["Uç nokta", "Gövde"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (zorunlu): son satırlar; diff (isteğe bağlı düzenleme listesi). Zorunlu bir insan girdisi alanı boşsa missing_fields ile 400."],
              ["POST /matches/{match_id}/hitl/approve", "groups (son gruplama), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (muaf tutulacak her başarısız öğe için item_id ve reason), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (şablon başına alan değerleri), diff, allow_missing_human_fields."],
              [".../hitl/reject", "/hitl/reject ile biten aynı yollar, isteğe bağlı bir reason ile."],
            ]}
          />
          <CodeBlock lang="İstek" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Onaylama teslimatı (webhook, e-posta, Bucket) sürdürür. Bir Run&apos;ı reddetmek onu iptal
            eder. Bkz. <DocLink href="/docs/human-in-the-loop">İnsan incelemesi (HITL)</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="API anahtarı uç noktaları">
          <DataTable
            head={["Uç nokta", "Ne yapar"]}
            rows={[
              ["GET /me/api-key", "Kuruluş için anahtarınızı döndürür."],
              ["POST /me/api-key/regenerate", "Yeni bir anahtar üretir ve eskisini hemen geçersiz kılar. Tüm entegrasyonları güncelleyin."],
            ]}
          />
          <CodeBlock lang="200 yanıtı" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="Kodsuz" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Otomasyon araçlarına genel bakış">
          <p>
            Tavnit&apos;i iş akışlarınıza bağlamak için kod yazmanız gerekmez. HTTP isteği gönderebilen her
            otomasyon platformu Tavnit&apos;te iş başlatabilir ve webhook alabilen her platform sonuçları
            alabilir.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Görsel senaryolar: bir HTTP modülü Tavnit&apos;i çağırır ve bir Custom webhook sonuçları alır.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook sonuçları alır ve bir POST eylemi Run&apos;ları başlatır.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Kendi sunucunuzda veya bulutta: bir Webhook düğümü sonuçları alır ve bir HTTP Request
            düğümü Run&apos;ları başlatır.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Bir HTTP eylemi API&apos;yi aynı şekilde çağırır.
          </InfoBox>
          <p>
            Her istek, <strong>Entegrasyonlar</strong> sayfasındaki anahtarınızı içeren{" "}
            <InlineCode>X-API-Key</InlineCode> başlığına ihtiyaç duyar.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Sonuçları otomasyonunuzda alın">
          <NumberedList
            items={[
              "Platformunuzda bir webhook tetikleyicisi oluşturun (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: Webhook düğümü, POST) ve URL'sini kopyalayın.",
              "Tavnit'te bunu bir Flow'un webhook'u (Webhook paneli) veya bir Pipeline çıktı düğümünün webhook'u olarak yapıştırın.",
              "Platformun yükü öğrenmesi için bir belge işleyin, ardından alanları Sheets, bir CRM, bir ERP vb. ile eşleyin.",
            ]}
          />
          <p>
            Yük, <DocLink href="/docs/webhooks">webhook&apos;lar sayfasında</DocLink> açıklanmıştır.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make entegrasyonu">
          <p>
            Make (eski adıyla Integromat), hiç kod yazmadan uygulamaları bağlamanıza ve iş akışlarını
            otomatikleştirmenize olanak tanıyan görsel bir otomasyon platformudur.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Make&apos;i ziyaret edin <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Make ile başlarken">
          <NumberedList
            items={[
              "make.com adresine gidin ve bir hesap oluşturun",
              "Panonuzdan “Create a new scenario” seçeneğine tıklayın",
              "Modül ekleyebileceğiniz boş bir tuval göreceksiniz",
              "“HTTP” araması yapın ve “Make a request” modülünü ekleyin",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Senaryo nedir?">
            Senaryo, Make&apos;teki otomatik bir iş akışıdır. Birbirine bağlı modüllerden (uygulamalardan)
            oluşur. Bir modül tetiklendiğinde veya veri aldığında bu veriyi bir sonraki modüle aktarır.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="HTTP modülünü yapılandırın">
          <p>
            HTTP modülünü ekledikten sonra, Tavnit&apos;e belge gönderecek şekilde yapılandırın. Şu iki
            yaklaşımdan birini kullanabilirsiniz:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Seçenek 1: Multipart/form-data (bir dosya nesneniz olduğunda)
          </h3>
          <NumberedList
            items={[
              "Senaryonuza bir HTTP “Make a request” modülü ekleyin",
              <Fragment key="f14">
                İsteği yapılandırın:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Headers sekmesinde şunları ekleyin:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Body type değerini “multipart/form-data” olarak ayarlayın",
              <Fragment key="f16">
                Form alanlarını ekleyin:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (önceki modülden eşleyin)",
                    "source: api (isteğe bağlı)",
                  ]}
                />
              </Fragment>,
              "Test etmek için senaryonuzu çalıştırın",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Seçenek 2: JSON + Base64 (bir Base64 dizeniz olduğunda)
          </h3>
          <p>Önceki modülünüz dosya yerine bir Base64 dizesi veriyorsa şu yaklaşımı kullanın:</p>
          <NumberedList
            items={[
              "Body type değerini “Raw” olarak ayarlayın ve “JSON (application/json)” seçeneğini seçin",
              <Fragment key="f17">
                Headers sekmesinde ayrıca şunları ekleyin:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "JSON gövdesini şu şekilde ayarlayın:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Base64 içeriğini eşleme">
            {"{{previous_module.base64_content}}"} ifadesini önceki modülünüzden gelen gerçek eşlemeyle
            değiştirin. Make&apos;te alana tıklayın ve dosyanızı sağlayan modülün Base64 çıktısını seçin.
            filename içinde uzantıyı koruyun: Tavnit dosya türünü algılamak için onu kullanır.
          </InfoBox>
          <p>
            Çağrı hemen bir <InlineCode>run_id</InlineCode> ile yanıt verir. Çıkarılan veriler daha
            sonra Flow&apos;un webhook&apos;u üzerinden gelir ya da bunları{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode> adresini çağıran
            ikinci bir HTTP modülüyle alabilirsiniz.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Diğer platformlar (Zapier, Power Automate, n8n)">
          <p>Aynı yaklaşım, HTTP isteklerini destekleyen her otomasyon platformunda çalışır:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Platformunuz size bir dosya nesnesi veriyorsa">
            Dosyayı içeren bir &ldquo;file&rdquo; alanı ve flow_id alanıyla multipart/form-data
            kullanın.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Platformunuz size bir Base64 dizesi veriyorsa">
            flow_id, filename ve file_base64 (önceki adımdan gelen Base64 içeriği) içeren bir JSON
            gövdesi kullanın.
          </InfoBox>
          <p>
            Her iki yöntem de aynı uç noktayı çağırır ve aynı çıkarma sonuçlarını üretir. Google
            Drive, OneDrive veya Dropbox&apos;a düşen dosyaları işlemek için &ldquo;klasörde yeni
            dosya&rdquo; tetikleyicisini kullanın ve dosyayı aynı şekilde POST ile gönderin.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Collections API'sini kullanma">
          <p>
            Farklı türde belgeler alıyorsanız ve her birini yapay zekânın doğru Flow&apos;a yönlendirmesini
            istiyorsanız, bir Flow yerine Collection&apos;ı çağırın.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19"><InlineCode>flow_id</InlineCode> yerine <InlineCode>collection_id</InlineCode> kullanın</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Splitters API'sini kullanma">
          <p>
            Birkaç belge içeren birleşik PDF&apos;ler alıyorsanız ve bunların ayrılması gerekiyorsa
            Splitter&apos;ı çağırın.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23"><InlineCode>flow_id</InlineCode> yerine <InlineCode>splitter_id</InlineCode> kullanın</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Bir Pipeline başlatma">
          <p>
            Tek bir Flow yerine bütün bir Pipeline&apos;ı çalıştırmak için dosyayı (multipart{" "}
            <InlineCode>file</InlineCode> veya JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>) aynı başlıkla{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            adresine POST ile gönderin. Pipeline kimliği URL&apos;de yer alır.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Cleaners API'sini kullanma">
          <p>
            Otomasyonunuzdan gelen veri satırlarını temizlemek için bunları JSON olarak Cleaner&apos;a
            gönderin. Bir elektronik tablo dosyası ise bunun yerine{" "}
            <InlineCode>cleaner_id</InlineCode> ile multipart olarak{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode> adresine gider (bu uç nokta
            Base64 kabul etmez).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Buckets API'sini kullanma">
          <p>
            Belge göndermeden bir Bucket&apos;a satır göndermek için yazma uç noktasını kullanın. Her satır
            Bucket&apos;ın tüm sütunlarını içermelidir.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Bucket kimliğinizi ve adınızı bulma">
            Bucket&apos;ın ayrıntı sayfasını açın ve bilgi simgesine dokunun. Her iki değer de tek dokunuşla
            kopyalanabilir.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Diğer özellikler">
          <p>
            Agent&apos;lar, Matcher&apos;lar, Inspector&apos;lar, Filler&apos;lar, Signals, Subject&apos;ler ve Nets aynı şekilde
            başlatılır: <InlineCode>X-API-Key</InlineCode> başlığını içeren bir HTTP isteğiyle. Her uç
            noktanın alanları için <strong>Kod</strong> sekmesine geçin.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Sonuçları webhook'larla alın",
            description: "Bir Run tamamlandığında Tavnit'in gönderdiği yük ve bir alıcının nasıl oluşturulacağı.",
          },
          {
            href: "/docs/mcp-connector",
            label: "MCP bağlayıcısıyla bir yapay zekâ asistanı bağlayın",
            description: "Tavnit'i claude.ai, Cursor veya başka bir MCP istemcisinden kullanın.",
          },
          {
            href: "/docs/user-roles",
            label: "Kullanıcı rolleri ve izinler",
            description: "Yalnızca HITL anahtarının neden inceleme yapabildiği ama işleme yapamadığı.",
          },
        ]}
      />
    </section>
  );
}
