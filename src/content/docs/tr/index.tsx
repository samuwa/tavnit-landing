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

/** /tr/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "1. adım: bir Flow oluşturun". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit ile bir belgeden yapılandırılmış veri çıkarma",
    description:
      "Bir şablondan, örnek bir belgeden veya sıfırdan bir Tavnit Flow'u oluşturun, alanlarını kontrol edin, bir belge işleyin ve yapılandırılmış sonucu okuyun — şablon çizmeden ve kod yazmadan.",
    steps: [
      {
        name: "Oluşturma penceresini açın",
        text: "Flow'lar sayfasında Flow Oluştur'a tıklayın.",
      },
      {
        name: "Bir başlangıç noktası seçin",
        text: "Şablondan (bir Tavnit şablonu veya Flow'larınızdan birinin kopyası), Yapay zekâ önerisi (örnek bir PDF veya görsel yükleyin, yapay zekâ alanları taslak olarak hazırlasın) ya da Sıfırdan başla seçeneklerinden birini seçin.",
      },
      {
        name: "Flow'u adlandırın ve tanımlayın",
        text: "Flow'a en az 3 karakterlik bir ad ve hangi belgeleri işlediğini anlatan en az 10 karakterlik bir açıklama verin.",
      },
      {
        name: "Veri şemasını gözden geçirin",
        text: "Düzenleyicide şema tam olarak ihtiyacınız olan hâle gelene kadar alan ekleyin, düzenleyin veya silin. Yeni bir Flow zaten Aktif durumdadır.",
      },
      {
        name: "Bir belge işleyin",
        text: "Çalıştır'a tıklayın, gerçek bir belge yükleyin ve sonucu kontrol edin.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "Tavnit'in Run'lar sayfası: işlenen her belge, Flow'u, kaynağı ve durumuyla listelenir.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedTr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Başlarken
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Tavnit ne yapar">
        <Lead>
          Tavnit belgeleri okur ve size yapılandırılmış veri olarak geri verir. İstediğiniz alanları
          bir kez tanımlarsınız; faturalar, fişler, satın alma siparişleri, hesap ekstreleri, tablolar
          veya formlar gönderirsiniz ve türü belirli satırlar alırsınız — her düzen için ayrı bir
          şablon kurmadan ya da tek satır ayrıştırma kodu yazmadan.
        </Lead>
        <p>
          Veri çıkarma ürünün tamamı değil, başlangıç noktasıdır. Tavnit bunun etrafında gelen
          dosyaları ayırabilir ve bölebilir, satırları temizleyip zenginleştirebilir, belgeleri
          birbiriyle karşılaştırıp kontrol edebilir, form doldurabilir, bir kişinin incelemesi için
          bekleyebilir, sonuçları tablolarda saklayabilir, sistemlerinize teslim edebilir ve bunlarla
          işlem yapan bir tarayıcı Agent&apos;ına aktarabilir. Bu sayfa size genel haritayı verir ve ilk
          belgenizde adım adım yol gösterir.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Bazı alanlar Beta aşamasında">
          Pipeline&apos;lar, Subject&apos;ler, Matcher&apos;lar, Inspector&apos;lar, Filler&apos;lar, Signals ve Nets
          uygulamada <strong>Beta</strong> etiketi taşır. Bunları bugün kullanabilirsiniz, ancak
          ekranları ve seçenekleri hâlâ değişebilir.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Tavnit haritası">
        <Lead>
          Uygulamanın kenar çubuğu her alanı yaptığı işe göre gruplar: belgelerin içeri alınmasından
          verilerle işlem yapmaya kadar. Dokümantasyon da aynı grupları izler, bu nedenle bu tablo
          aynı zamanda bir içindekiler tablosu işlevi görür.
        </Lead>
        <DataTable
          head={["Grup", "Alan", "Ne yapar"]}
          rows={[
            [
              "Girdi",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collection&apos;lar</DocLink>
              </Fragment>,
              "Karışık belgeler için tek bir gelen kutusu veya uç nokta: her belge sınıflandırılır ve doğru Flow'a yönlendirilir.",
            ],
            [
              "Girdi",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subject&apos;ler</DocLink>
              </Fragment>,
              "Bir satın alma veya bir hasta gibi bir varlığı modelleyin ve belgelerini referansa göre dosyalarda toplayın.",
            ],
            [
              "Girdi",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitter&apos;lar</DocLink>
              </Fragment>,
              "Birden fazla belge içeren tek bir dosyayı ayrı belgelere bölün ve her birini ilerletin.",
            ],
            [
              "İşleme",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flow&apos;lar</DocLink>
              </Fragment>,
              "Bir belge türünün şeması: çıkarılacak alanlar ve bunlara bağlı her şey. Her şey burada başlar.",
            ],
            [
              "İşleme",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaner&apos;lar</DocLink>
              </Fragment>,
              "Çıkarılan satırları yeniden biçimlendirin, dönüştürün, hesaplayın, eşleştirin ve doğrulayın; bir şey ters göründüğünde eylemler tetikleyin.",
            ],
            [
              "İşleme",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agent&apos;lar</DocLink>
              </Fragment>,
              "Bir web sitesinde sade bir dille tanımlanmış bir görevi yerine getiren tarayıcı Agent'ları; çoğu zaman girdi olarak çıkarılan verileri kullanırlar.",
            ],
            [
              "Zekâ",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matcher&apos;lar</DocLink>
              </Fragment>,
              "Kayıtları belgeler arasında satır satır karşılaştırın — teklifleri birbiriyle, bir faturayı siparişiyle.",
            ],
            [
              "Zekâ",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspector&apos;lar</DocLink>
              </Fragment>,
              "Birbiriyle ilişkili bir belge grubu üzerinde bir kontrol listesi çalıştırın ve geçti ya da kaldı kararı alın.",
            ],
            [
              "Zekâ",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Filler&apos;lar</DocLink>
              </Fragment>,
              "PDF form şablonlarını belgelerinizden çıkarılan verilerle doldurun.",
            ],
            [
              "Orkestrasyon",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipeline&apos;lar</DocLink>
              </Fragment>,
              "Adımları görsel bir tuvalde baştan sona birbirine zincirleyin.",
            ],
            [
              "Orkestrasyon",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline Haritası</DocLink>
              </Fragment>,
              "Belgelerin organizasyonunuzda nasıl ilerlediğinin tek bir resmi.",
            ],
            [
              "Veri ve etkinlik",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Bucket&apos;lar</DocLink>
              </Fragment>,
              "Sonuçların Run'lar boyunca biriktiği, sorgulanmaya, grafiğe dökülmeye ve dışa aktarılmaya hazır tablolar.",
            ],
            [
              "Veri ve etkinlik",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Run&apos;lar</DocLink>
              </Fragment>,
              "İşlenen her belgenin sonucu, kaynak dosyası ve günlüğüyle birlikte geçmişi.",
            ],
            [
              "Veri ve etkinlik",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">İnsan incelemesi (HITL)</DocLink>
              </Fragment>,
              "Bir kişinin sonuçları teslim edilmeden önce onayladığı, düzenlediği veya reddettiği bir inceleme kuyruğu.",
            ],
            [
              "Ses",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signal&apos;lar</DocLink>
              </Fragment>,
              "Kaydedilmiş konuşmaları yapılandırılmış satırlara dönüştürün.",
            ],
            [
              "Sosyal",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Net&apos;ler</DocLink>
              </Fragment>,
              "Sosyal medya gönderilerini yapılandırılmış satırlara ve eğilimlere dönüştürün.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Agent'ları, Signals'ı veya Nets'i göremiyor musunuz?">
          Bu üç alan organizasyon bazında etkinleştirilir. Kenar çubuğunuzda görünmüyorlarsa,
          etkinleştirilmeleri için Tavnit ekibiyle iletişime geçin.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Belgelerimi hangisi ayırır?">
          Her dosyada tek bir belge varsa ama türünü bilmiyorsanız, bir{" "}
          <DocLink href="/docs/collections">Collection</DocLink> kullanın. Tek bir dosyada birden
          fazla belge varsa, bir <DocLink href="/docs/splitters">Splitter</DocLink> kullanın. Belgeler
          birbirine aitse — aynı satın alma, aynı hasta — bir{" "}
          <DocLink href="/docs/subjects">Subject</DocLink> kullanın. Belgenin ne olduğunu zaten
          biliyorsanız, doğrudan Flow&apos;a gönderin ve üçünü de atlayın.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="İlk dakikalarınız">
        <Lead>
          Yeni bir organizasyon kısa bir kurulum yoluyla başlar, bu yüzden boş bir ekranla nadiren
          karşılaşırsınız.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Karşılama soruları.</strong> Organizasyonunuzu oluşturduktan sonra Tavnit dört
              kısa soru sorar: hangi belgeleri işleyeceğiniz, neyi başarmak istediğiniz, belgelerinizin
              bugün nasıl geldiği ve ayda yaklaşık kaç belgeyle uğraştığınız. Yaklaşık 30 saniye
              sürer ve <strong>Atla</strong> ile geçebilirsiniz.
            </Fragment>,
            <Fragment key="o1">
              <strong>Tek tıkla başlangıç Flow&apos;ları.</strong> Soruları yanıtladıysanız, boş Flow&apos;lar
              sayfası belgelerinize uyan şablonları{" "}
              <em>“Yanıtlarınıza göre bunları sizin için kurabiliriz:”</em> başlığı altında sunar.{" "}
              <strong>Bu Flow&apos;ları oluştur</strong>&apos;a tıklayın; Flow&apos;lar düzenlemeye
              hazır şekilde sizin için oluşturulur.
            </Fragment>,
            <Fragment key="o2">
              <strong>Başlangıç şablonları.</strong> Tavnit; faturalar, satın alma siparişleri,
              fişler, banka ekstreleri, irsaliyeler, laboratuvar sonuçları, sözleşmeler, teklifler,
              alacak dekontları, kimlik belgeleri ve özgeçmişler için hazır Flow&apos;larla gelir.
              Yanıtlarınıza uyan şablonlar önce gösterilir.
            </Fragment>,
            <Fragment key="o3">
              <strong>Başlangıç rehberi.</strong> Uygulamanın köşesinde üç sekmeli küçük bir panel:{" "}
              <strong>Kontrol listesi</strong> (siz tamamladıkça kendiliğinden işaretlenen kurulum
              adımları), <strong>Bu ekran</strong> (bulunduğunuz sayfaya dair ipuçları) ve{" "}
              <strong>Özellikler</strong> (kullanımınıza açık her alan). Paneli gizlerseniz{" "}
              <strong>Yardım ve Destek</strong> menüsünden yeniden açabilirsiniz.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="1. adım: bir Flow oluşturun">
        <Lead>
          Bir Flow, bir belge türünün şemasıdır. Ona projenin değil belgenin adını verin —{" "}
          <em>1. çeyrek otomasyonu</em> değil, <em>Tedarikçi faturaları</em> — çünkü ad ve açıklama,
          bir Collection&apos;ın belgeleri ona yönlendirirken kullandığı bilgidir.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              <strong>Flow&apos;lar</strong> sayfasında <strong>Flow Oluştur</strong>&apos;a tıklayın.
            </Fragment>,
            <Fragment key="f6">
              Bir başlangıç noktası seçin: <strong>Şablondan</strong> (bir Tavnit şablonu ya da{" "}
              <strong>Flow&apos;larım</strong> altındaki kendi Flow&apos;larınızdan birinin kopyası),{" "}
              <strong>Yapay zekâ önerisi</strong> (örnek bir PDF veya görsel yükleyin, yapay zekâ
              alanları taslak olarak hazırlasın) veya <strong>Sıfırdan başla</strong>.
            </Fragment>,
            <Fragment key="f7">
              Flow&apos;a en az 3 karakterlik bir ad ve hangi belgeleri işlediğini anlatan en az 10
              karakterlik bir açıklama verin.
            </Fragment>,
            <Fragment key="f8">
              Düzenleyicide şema tam olarak ihtiyacınız olan hâle gelene kadar alan ekleyin, düzenleyin
              veya silin. Yeni bir Flow zaten <strong>Aktif</strong> durumdadır.
            </Fragment>,
            <Fragment key="f9">
              <strong>Çalıştır</strong>&apos;a tıklayın, gerçek bir belge yükleyin ve sonucu kontrol
              edin.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flow&apos;lar</DocLink> sayfası bu adımların her birini
          ayrıntılı olarak ele alır — alan türleri, veri türleri, yapay zekâya nereye bakacağını
          söyleyen ipuçları ve bir Flow&apos;un gerçek Run&apos;ları olduğunda düzeltmeler öneren{" "}
          <strong>Teşhis et</strong> düğmesi.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Açıklama önemlidir">
          Açıklama zorunludur ve iki kez işe yarar: yapay zekânın verileri daha doğru çıkarmasına
          yardımcı olur ve bir <DocLink href="/docs/collections">Collection</DocLink>&apos;ın
          belgeleri Flow&apos;a yönlendirmesini sağlar. Belirsiz bir açıklama ikisini de kötüleştirir.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="2. adım: meta veri alanları ve tablo alanları">
        <Lead>
          Tavnit, belge başına bir kez görünen değerleri tekrarlanan değerlerden ayırır. Bu tek ayrım,
          sonraki her şeyin biçimini belirler — webhook yükünüz, Bucket satırlarınız ve CSV
          dosyanız bu ayrımı izler.
        </Lead>
        <DataTable
          head={["Alan türü", "Görünme sıklığı", "Bir faturada"]}
          rows={[
            [
              "Meta veri alanı",
              "Belge başına bir kez",
              "Fatura numarası, düzenleme tarihi, tedarikçi, toplam",
            ],
            [
              "Tablo alanı",
              "Kalem başına bir kez",
              "Açıklama, miktar, birim fiyat, tutar",
            ],
          ]}
        />
        <p>
          Her alanın ayrıca bir veri türü vardır — Metin, Sayı, Tarih, Karışık/Alfanümerik veya Görsel
          — ve doğru türü seçmek göründüğünden daha önemlidir: metin olarak tanımlanmış bir toplam
          toplanamaz, karşılaştırılamaz ve grafiğe dökülemez. Yalnızca meta veri alanları olan bir
          Flow, belge başına tek bir satır döndürür.{" "}
          <DocLink href="/docs/flows">Flow&apos;lar</DocLink> sayfası; çıkarma ipuçları, bileşik
          alanlar ve yanlış gelen bir alanın nasıl düzeltileceği dahil şemanın tamamını ele alır.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="3. adım: belgeleri gönderin">
        <Lead>
          İçeri girmenin dört yolu vardır ve hepsi aynı türde bir Run üretir. Flow&apos;un çalıştığını
          kanıtlamak için elle yüklemeyle başlayın, ardından belgelerin size gerçekte ulaştığı yola
          geçin.
        </Lead>
        <DataTable
          head={["Yol", "Ne için uygun", "Kurulum"]}
          rows={[
            [
              "Uygulamada yükleme",
              "Testler ve tek seferlik belgeler",
              "Gerekmez. Birden fazla dosyayı aynı anda seçin; her biri kendi Run'ı olur",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-posta</DocLink>
              </Fragment>,
              "Zaten bir gelen kutusuna ulaşan belgeler",
              "Flow'un E-posta Tetikleyici'sini açın ve postaları onun adresine iletin",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "Kendi sistemleriniz ve yüksek hacim",
              "Bir API anahtarı ve bir POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP bağlayıcısı</DocLink>
              </Fragment>,
              "Bir yapay zekâ asistanından anlık işler",
              "İstek üzerine organizasyon bazında etkinleştirilir, ardından Entegrasyonlar'dan bir bağlayıcı URL'si alınır",
            ],
          ]}
        />
        <p>
          Flow&apos;lar PDF&apos;leri, görselleri (PNG, JPG, JPEG ve JFIF) ve tabloları (XLSX, XLS ve
          CSV) kabul eder. Bir tablo dosyasında Flow ilk görünür sayfayı okur. Taranmış belgeler
          otomatik olarak algılanır ve OCR ile okunur.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="Tavnit'in Run'lar sayfası: işlenen belgeler; her biri Flow'u, kimin tetiklediği, kaynağı ve durumuyla listelenir; üstte tamamlanan, çalışan ve toplam Run sayılarını gösteren özet kutucukları bulunur."
          caption="Her belge bir Run olur. Run'lar sayfası neyin işlendiğini, nasıl geldiğini ve nasıl sonuçlandığını gösterir."
        />
        <p>
          Çıkarılan alanları kaynak belgenin yanında ve işleme sırasında olanların günlüğüyle birlikte
          görmek için herhangi bir Run&apos;ı açın. Bir sonuç beklediğiniz gibi değilse bakılacak ilk
          yer bu günlüktür.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Sırada ne var">
        <Lead>
          Veri çıkarma çalıştığında, sonraki adım verilerde neyin yanlış olduğuna veya onlarla ne
          yapmanız gerektiğine bağlıdır.
        </Lead>
        <DataTable
          head={["Şunu yapmanız gerekiyorsa…", "Okuyun"]}
          rows={[
            [
              "Daha fazla alan çıkarmak veya yanlış gelen bir alanı düzeltmek",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flow&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Biçimleri düzeltmek, para birimlerini dönüştürmek, toplamları hesaplamak veya hatalı satırları işaretlemek",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaner&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Sonuçlar bir yere gitmeden önce bir kişiye kontrol ettirmek",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">İnsan incelemesi (HITL)</DocLink>
              </Fragment>,
            ],
            [
              "Verileri kendi sistemlerinize aktarmak",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhook&apos;lar</DocLink> veya{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "Sonuçları bir arada tutmak ve sorgulamak",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Bucket&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Belgeleri karşılaştırmak veya bir kural listesine göre kontrol etmek",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matcher&apos;lar</DocLink> ve{" "}
                <DocLink href="/docs/inspectors">Inspector&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Birkaç adımı tek bir süreçte birleştirmek",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipeline&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Verilerle web'in başka bir yerinde işlem yapmak",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agent&apos;lar</DocLink>
              </Fragment>,
            ],
            [
              "Kimin neyi görebileceğini ve değiştirebileceğini kontrol etmek",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Kullanıcı rolleri</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Bir Flow'un veri şemasını ayrıntılı olarak kurun",
            description:
              "Alan türleri, veri türleri, çıkarma ipuçları, bileşik alanlar, Run'lar ve bir Flow'a ekleyebileceğiniz her şey.",
          },
          {
            href: "/docs/api-integration",
            label: "Belgeleri Tavnit REST API ile işleyin",
            description:
              "Multipart ve base64 yükleme, API anahtarıyla kimlik doğrulama, Python ve JavaScript örnekleri ile kodsuz tarifler.",
          },
          {
            href: "/docs/email-integration",
            label: "E-posta eklerinden veri çıkarın",
            description: "Bir Flow'a kendi gelen kutusunu verin ve belgeleri ona iletin.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Her şeyin nasıl bağlandığını görün",
            description:
              "Flow'larınızın, Collection'larınızın, Splitter'larınızın, Cleaner'larınızın ve Bucket'larınızın canlı haritası.",
          },
        ]}
      />
    </section>
  );
}
