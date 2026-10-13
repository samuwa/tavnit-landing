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

/** /tr/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Şemayı oluşturun". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Bir belgeden yapılandırılmış veri çıkaran bir Tavnit Flow'u oluşturma",
    description:
      "Bir Flow oluşturun, meta veri ve tablo alanlarını tanımlayın, çıkarma ipuçlarını yalnızca gereken yerlere ekleyin ve Flow'u gerçek bir belgeyle test edin.",
    steps: [
      {
        name: "Flow'u oluşturun ve tanımlayın",
        text: "Flow'lar sayfasında Flow Oluştur'a tıklayın ve bir şablon, bir yapay zekâ önerisi veya boş bir Flow seçin. Ona bir ad ve işlediği belgeleri anlatan bir açıklama verin — açıklama, yapay zekânın verileri daha doğru çıkarmasına da yardımcı olur.",
      },
      {
        name: "Meta veri alanlarını ekleyin",
        text: "Fatura numarası, düzenleme tarihi veya tedarikçi gibi belge başına bir kez görünen her değer için bir alan ekleyin ve veri türünü ayarlayın.",
      },
      {
        name: "Tablo alanlarını ekleyin",
        text: "Tekrarlanan kalem tablosunun açıklama, miktar, birim fiyat ve tutar gibi her sütunu için bir alan ekleyin.",
      },
      {
        name: "Gereken yerlere çıkarma ipuçları ekleyin",
        text: "İpuçlarını yalnızca ihtiyaç duyan alanlara ekleyin: gerçek örnek değerler, değerin yanında durduğu etiket, göründüğü sayfa bölgesi veya basılı sütun başlığı.",
      },
      {
        name: "Gerçek bir belgeyle test edin",
        text: "Yeni bir Flow zaten Aktif durumdadır. Çalıştır'a tıklayın, gerçek bir belge işleyin, sonucu kaynakla karşılaştırın ve yanlış gelen her alanın ipuçlarını sıkılaştırın.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Bir Tavnit Flow'unun veri şeması: meta veri alanları ve tablo alanları yan yana tanımlanmış.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsTr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flow&apos;lar
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Flow nedir">
        <Lead>
          Flow, tek bir belge türünün tanımıdır: çıkarılmasını istediğiniz alanlar, yapay zekâya bu
          alanları nerede bulacağını söyleyen ipuçları ve sonrasına bağlanan her şey. Tavnit&apos;te
          bir belgeyi veriye dönüştüren nesne odur — Collection&apos;lar, Subject&apos;ler,
          Splitter&apos;lar ve Cleaner&apos;lar, bir Flow&apos;un ürettiğini beslemek veya iyileştirmek
          için vardır.
        </Lead>
        <p>
          Çizilecek bir şablon ya da eşlenecek koordinatlar yoktur. Alanları sade bir dille tarif
          edersiniz ve Flow farklı düzenlerde çalışır; böylece tek bir <em>Tedarikçi faturaları</em>{" "}
          Flow&apos;u, faturaları birbirine hiç benzemeyen yirmi tedarikçiyi işleyebilir. Veri çıkarma
          kalitesinin neredeyse tamamının şemada ve ipuçlarında kazanılıp kaybedilmesinin nedeni de
          budur.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Invoice Processor adlı bir Tavnit Flow'unun veri şeması. Meta Veri Alanları paneli, Invoice Number, Due Date ve Total gibi dokuz tek değerli alanı veri türleriyle listeler; yanındaki Tablo Alanları paneli Description, Quantity, Price ve Amount alanlarını listeler. Soldaki çubuk Son Run'lar, E-posta Tetikleyici, Collection'lar, Cleaner, Agent, Form Şablonları, E-posta Çıktısı, Webhook, Bucket Dışa Aktarımı, İnsan incelemesi ve Flow ID öğelerini gruplar."
          caption="Bir Flow'un veri şeması. Solda meta veri alanları, sağda tekrarlanan tablo alanları, çubukta ise Flow'a eklenebilen her şey."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Yalnızca şema zorunludur">
          Bir Flow&apos;un en az bir alana ihtiyacı vardır. Çubuktaki diğer her şey — Cleaner, Agent,
          webhook, e-posta, Bucket dışa aktarımı, inceleme — isteğe bağlıdır ve hiçbir şeyi yeniden
          kurmadan sonradan eklenebilir. Flow oluşturup düzenleyebilenler Sahipler ve
          Yöneticilerdir.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Flow oluşturun">
        <Lead>
          Flow&apos;lar sayfasında <strong>Flow Oluştur</strong>&apos;a tıklayın; Tavnit{" "}
          <em>“Nasıl başlamak istersiniz?”</em> diye sorar. Üç yolun hepsi aynı düzenlenebilir
          Flow&apos;a çıkar, bu yüzden sizi iyi bir ilk taslağa en hızlı ulaştıranı seçin.
        </Lead>
        <DataTable
          head={["Seçenek", "Ne yapar", "En uygun olduğu durum"]}
          rows={[
            [
              "Şablondan",
              <Fragment key="c0">
                İki sekmeli bir galeri açar. <strong>Tavnit şablonları</strong>, alanları ve
                ipuçları önceden doldurulmuş hazır Flow&apos;lardır; <strong>Flow&apos;larım</strong>{" "}
                sekmesinde ise kendi aktif Flow&apos;larınızdan biri için{" "}
                <strong>Kopya Oluştur</strong>&apos;u kullanabilirsiniz.
              </Fragment>,
              "Belgeniz yaygın bir türse veya zaten sahip olduğunuz bir Flow'a yakınsa.",
            ],
            [
              "Yapay zekâ önerisi",
              "Örnek bir PDF veya görsel yükleyin. Yapay zekâ onu okur, alanları algılar ve bir ad, bir açıklama ve ipuçlarıyla birlikte bir şema taslağı hazırlar. Flow'u oluşturmadan önce ihtiyacınız olmayanların işaretini kaldırın ve istediğiniz alanı düzenleyin.",
              "Belgeniz işletmenize özgüyse ve hızlı bir başlangıç istiyorsanız.",
            ],
            [
              "Sıfırdan başla",
              "Boş bir şema. Her alanı kendiniz tanımlarsınız.",
              "Neye ihtiyacınız olduğunu tam olarak biliyorsanız veya mevcut bir süreci yeniden kuruyorsanız.",
            ],
          ]}
        />
        <p>
          Tavnit şablonları faturaları, satın alma siparişlerini, fişleri, banka ekstrelerini,
          irsaliyeleri, laboratuvar sonuçlarını, sözleşmeleri, teklifleri, alacak dekontlarını,
          kimlik belgelerini ve özgeçmişleri kapsar. Organizasyonunuzu kurarken karşılama sorularını
          yanıtladıysanız, belgelerinize uyan şablonlar önce gösterilir ve boş Flow&apos;lar sayfası{" "}
          <strong>Bu Flow&apos;ları oluştur</strong> ile hepsini tek tıkla oluşturmayı önerir.
        </p>
        <p>
          Her yol bir ad (en az 3 karakter) ve bir açıklamayla (en az 10 karakter) tamamlanır. Flow,
          düzenleyicide kısa bir <em>“Flow&apos;unuzu kurun”</em> rehberiyle açılır ve en baştan{" "}
          <strong>Aktif</strong> durumdadır — devre dışı bırakmak için üst çubuktaki anahtarı
          kullanın. Aktif olmayan bir Flow çalıştırılamaz.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="Yapay zekâ önerisi Run oluşturmaz">
          Örnek bir belgeden Flow taslağı hazırlamak bir Run oluşturmaz. Taslağı bir başlangıç noktası
          olarak görün — kullanmayacağınız alanları silin, çünkü her fazladan alan, incelenecek ve
          ters gidebilecek bir şey daha demektir.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Meta veri alanları ve tablo alanları">
        <Lead>
          Her alan, değerin belge başına bir kez mi yoksa satır başına bir kez mi göründüğüne göre iki
          türden biridir. Bu, şemadaki en belirleyici seçimdir: webhook yükünüzün, Bucket
          satırlarınızın, CSV dosyanızın ve inceleme ekranınızın biçimini belirler.
        </Lead>
        <DataTable
          head={["", "Meta veri alanı", "Tablo alanı"]}
          rows={[
            ["Görünme sıklığı", "Belge başına bir kez", "Tekrarlanan bir tablonun her satırında bir kez"],
            [
              "Bir faturada",
              "Fatura numarası, düzenleme tarihi, tedarikçi, toplam",
              "Açıklama, miktar, birim fiyat, tutar",
            ],
            [
              "Çıktıda",
              <Fragment key="f0">
                <InlineCode>metadata</InlineCode> nesnesi
              </Fragment>,
              <Fragment key="f1">
                <InlineCode>rows</InlineCode> içinde satır başına bir giriş
              </Fragment>,
            ],
            [
              "Bir Bucket'ta",
              "O belgeden dışa aktarılan her satıra tekrar yazılır",
              "Her biri bir Bucket satırı",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Türü yanlış seçmek klasik hatadır">
          Bir kalem sütununu meta veri alanı olarak tanımlarsanız, yirmi satırlık bir tablodan tek bir
          değer alırsınız. Bir fatura toplamını tablo alanı olarak tanımlarsanız, aynı sayı her satırda
          tekrarlanır. Emin değilseniz, değerin ikinci bir kopyasının aynı belgede hiç görünüp
          görünemeyeceğini kendinize sorun.
        </InfoBox>
        <p>
          <strong>Yalnızca meta veri alanları</strong> olan bir Flow — bir kimlik belgesi, bir sertifika,
          tek sayfalık bir form — belge başına bu değerleri içeren tek bir satır döndürür; böylece
          sonuç, diğer her Run gibi tablo görünümünüze, Bucket&apos;ınıza, webhook&apos;unuza ve
          e-postanıza ulaşır.
        </p>
        <p>
          Bir Flow, ürettiği her satıra <strong>Sistem Sütunları</strong> da ekleyebilir — Flow ID,
          Flow adı ve Run ID. Birkaç Flow aynı <DocLink href="/docs/buckets">Bucket</DocLink>&apos;a
          yazıyorsa ve bir satırın hangi belgeden geldiğini bilmeniz gerekiyorsa bunları açın.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Veri türleri">
        <Lead>
          Her alanın bir türü vardır. Türler süs değildir: bir değerin doğru sıralanıp
          sıralanmayacağını, toplanıp toplanmayacağını, bir Cleaner kuralında karşılaştırılıp
          karşılaştırılamayacağını ve grafiğe doğru dökülüp dökülmeyeceğini belirler. Türleri
          Flow&apos;da doğru ayarlamak, sonraki her aşamada iş kazandırır.
        </Lead>
        <DataTable
          head={["Tür", "Ne için", "Notlar"]}
          rows={[
            ["Metin", "Adlar, adresler, açıklamalar, referans kodları", "Güvenli varsayılan."],
            [
              "Sayı",
              "Toplamlar, miktarlar, fiyatlar, oranlar",
              "Değeri daha sonra toplamak, karşılaştırmak veya grafiğe dökmek istiyorsanız gereklidir.",
            ],
            [
              "Tarih",
              "Düzenleme tarihleri, vade tarihleri, teslim tarihleri",
              <Fragment key="f2">
                Tutarlı bir çıktı biçimine dönüştürmek veri çıkarmanın değil, bir{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>&apos;ın işidir.
              </Fragment>,
            ],
            [
              "Karışık/Alfanümerik",
              "Harf ve rakamları birleştiren değerler — parça numaraları, konteyner kodları, vergi numaraları",
              "Baştaki sıfırların veya harflerin korunması gerekiyorsa Sayı yerine bunu kullanın.",
            ],
            [
              "Görsel",
              "Belgede basılı görseller: fotoğraflar, logolar, imzalar, kaşeler",
              "Çıkarılır ve güvenli bir şekilde saklanır, ardından süreli bir bağlantı olarak teslim edilir.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Basıldığı gibi çıkarın, sonra normalleştirin">
          Türü yeniden biçimlendirmek için kullanmayın. Değeri belgede göründüğü gibi alın, ardından
          para birimlerini dönüştürmeyi, tarihleri yeniden yazmayı ve ondalık ayırıcıları düzeltmeyi
          bir Cleaner&apos;a bırakın. Aynı zamanda dönüştürme de yapan bir veri çıkarmada, bir sayı
          yanlış geldiğinde hata ayıklamak daha zordur.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Çıkarma ipuçları">
        <Lead>
          İpuçları, şablon yazmadan bir alanı netleştirmenin yoludur. En çok, bir belgede birbirine
          benzeyen birkaç değer olduğunda önemlidir — aynı başlık bloğunda üç tarih, iki toplam, bir
          sipariş numarası ve bir fatura numarası.
        </Lead>
        <p>
          <strong>Bir meta veri alanı için</strong> bunlardan istediklerinizi birleştirebilirsiniz:
        </p>
        <DataTable
          head={["İpucu", "Yapay zekâya ne söyler", "Ne için uygun"]}
          rows={[
            [
              "Örnek değerler",
              "Belgelerinizden kopyalanmış gerçek değerler.",
              "Neredeyse her şey. En değerli tek ipucu — biçimi, uzunluğu ve yapıyı aynı anda gösterir.",
            ],
            [
              "Bir etiketin yanında",
              <Fragment key="f3">
                Değerin yanında durduğu basılı etiket. Varyantları listeleyin:{" "}
                <em>Invoice Number, Invoice #, Inv No</em>.
              </Fragment>,
              "Farklı tedarikçilerin farklı etiketlediği başlık alanları.",
            ],
            [
              "Belirli bir sayfa bölgesinde",
              "Dokuz bölgeden biri — sol üstten sağ alta.",
              "Sağ üstteki belge numarası gibi her zaman aynı köşede bulunan değerler.",
            ],
            [
              "Beklenen aralık",
              "Bir alt sınır, bir üst sınır veya her ikisi. Kesin bir kural olarak değil, yol gösterici olarak değerlendirilir.",
              "Ondalık nokta yanlış okumalarını yakalamak — 270,30 yerine 27.030 tutarındaki bir toplam.",
            ],
            [
              "Ek ipuçları",
              "Yukarıdaki seçeneklerin kapsamadığı her şey için serbest metin.",
              "“Brüt tutarı asla değil, net tutarı kullan” gibi kurallar.",
            ],
          ]}
        />
        <p>
          <strong>Bir tablo alanı için</strong> ipuçları farklıdır, çünkü yapay zekâ sayfadaki bir
          noktayı değil bir sütunu bulmaya çalışır:
        </p>
        <DataTable
          head={["İpucu", "Yapay zekâya ne söyler"]}
          rows={[
            [
              "Kaynak türü",
              "Sütunları olan gerçek bir tablodaki veriler için Tablo; sözleşme gibi yapılandırılmamış metindeki satır benzeri değerler için Serbest biçim.",
            ],
            [
              "Sütun başlıkları",
              "Basıldığı hâliyle başlık metni. Tek bir alanın hepsiyle eşleşmesi için tedarikçilerinizin kullandığı her varyantı listeleyin.",
            ],
            ["Beklenen aralık", "O sütundaki sayılar için bir makullük aralığı."],
            ["Örnek değerler", "Belgelerinizden gerçek hücre değerleri."],
            [
              "Ek bilgi",
              "Başlık tek başına belirsiz olduğunda sütunun gerçekte neyi temsil ettiği — “indirim öncesi birim fiyat”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="İpuçları olmadan başlayın">
          Alanları ekleyin, gerçek bir belge çalıştırın ve yalnızca sonucun yanlış olduğu yerlere ipucu
          ekleyin. Her şeye baştan ipucu vermek, hiç belirsiz olmayan alanlara zaman harcatır ve
          gereğinden fazla ayrıntılı bir ipucu, öngörmediğiniz bir düzeni dışarıda bırakarak veri
          çıkarmayı kötüleştirebilir. Flow&apos;un birkaç Run&apos;ı olduğunda{" "}
          <strong>Teşhis et</strong> sizin için ipuçları önerebilir.
        </InfoBox>
        <p>
          Örnek değerler <strong>Tarih</strong> ve <strong>Görsel</strong> alanlarında kullanılmaz; bu
          yüzden tarihle ilgili yönlendirmeleri ek ipuçları kutusuna yazın.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Bileşik alanlar">
        <Lead>
          Bazı tablo sütunları tek bir hücrede birkaç değer tutar — tek bir kutuya basılmış{" "}
          <em>S:2 M:5 L:3</em> gibi bir beden ve miktar dökümü. Bileşik alan bu hücreyi alt alanlara
          böler; böylece her parça, daha sonra ayrıştırmanız gereken bir metin yerine kendi değeri
          olur.
        </Lead>
        <NumberedList
          items={[
            "Bir tablo alanı ekleyin ve Bileşik alan seçeneğini açın.",
            <Fragment key="f4">
              Hücreyi oluşturan alt alanları tanımlayın — örneğin metin olarak{" "}
              <InlineCode>size</InlineCode> ve sayı olarak <InlineCode>quantity</InlineCode>.
            </Fragment>,
            "Gruplamanın belgelerinizde nasıl göründüğünü gösteren örnek değerler ekleyin.",
          ]}
        />
        <p>
          Alt alanlar tek değer tutar, bu yüzden Metin, Sayı, Tarih veya Karışık/Alfanümerik olabilirler
          — ama Görsel olamazlar. Bileşik alanlar yalnızca tablo alanlarında kullanılabilir, çünkü
          bütün amaç tekrarlanan bir hücreyi açmaktır.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Çok değerli meta veri alanları">
          Meta veri tarafındaki karşılığı <strong>Birden fazla değer kabul et</strong> seçeneğidir.
          Tek bir belge aynı türden birkaç şeyi meşru olarak taşıyabiliyorsa — bir dizi fiş numarası,
          birkaç satın alma siparişi referansı — bunu açın; alan tek bir değer yerine bir liste
          döndürür. Görsel alanlarında kullanılamaz.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Görsel çıkarma">
        <Lead>
          Görsel alanı, belgeden metin yerine bir görsel alır: bir ürün fotoğrafı, bir imza, bir kaşe,
          bir logo. Meta veri görsel alanı belge başına bir görsel tutar; tablo görsel alanı ise her
          satıra o satıra ait görseli verir.
        </Lead>
        <BulletList
          items={[
            "Görseller gizli olarak saklanır, bu yüzden sonraki adımlara ham bayt olarak değil süreli bağlantılar olarak ulaşır",
            "Aynı türde bağlantı webhook yükünde, e-posta çıktısında ve CSV hücresinde görünür; Run sayfasından yapılan bir dışa aktarma yeni bağlantılar üretir",
            "Teslimatlardaki bağlantılar yedi gün geçerlidir — bağlantıyı saklamak yerine görseli indirin",
            "Görsel alanları bileşik olamaz ve birden fazla değer kabul edemez; örnek değer ipuçları da bunlara uygulanmaz",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Şemayı oluşturun">
        <Lead>
          Önce meta veri alanlarını, sonra tablo alanlarını, en son da ipuçlarını oluşturun. Erkenden
          gerçek bir belgeyle test edin — kâğıt üzerinde doğru görünen bir şema ile gerçek
          evraklarınıza dayanan bir şema aynı şey değildir.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              <strong>Flow Oluştur</strong>&apos;a tıklayın ve bir şablon, bir yapay zekâ önerisi veya
              boş bir Flow seçin. Ona belgeyi anlatan bir ad (<em>Tedarikçi faturaları</em>) ve gerçek
              bir açıklama verin — açıklama veri çıkarmanın doğruluğunu artırır ve daha sonra bir{" "}
              <DocLink href="/docs/collections">Collection</DocLink>&apos;ın eşleştirme yaptığı
              bilgidir.
            </Fragment>,
            <Fragment key="f6">
              <strong>Meta Veri Alanları</strong> altında, belge başına bir kez görünen her değer için{" "}
              <strong>Alan Ekle</strong>&apos;ye tıklayın ve bu sırada veri türünü ayarlayın.
            </Fragment>,
            <Fragment key="f7">
              <strong>Tablo Alanları</strong> altında, tekrarlanan kalem tablosunun her sütunu için
              bir alan ekleyin.
            </Fragment>,
            <Fragment key="f8">
              <strong>Çıkarma ipuçlarını</strong> yalnızca ihtiyaç duyan alanlara ekleyin.
            </Fragment>,
            <Fragment key="f9">
              Flow zaten <strong>Aktif</strong> durumdadır. <strong>Çalıştır</strong>&apos;a tıklayın,
              gerçek bir belge işleyin ve sonucu kaynakla karşılaştırın.
            </Fragment>,
          ]}
        />
        <p>Alanları yeniden sıralamak için tutamaçlarından sürükleyin.</p>
        <WarningBox>
          Bir alanı yeniden adlandırmak, sonraki her tüketicideki anahtarı değiştirir: webhook yükü,
          Bucket sütun eşlemesi, CSV başlığı ve onu okuyan her{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>. Zaten çalışan bir Flow&apos;daki bir alanı
          yeniden adlandırmadan önce nelerin bağlı olduğunu kontrol edin.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Bir Flow hangi dosyaları okur">
        <Lead>
          Bir Flow, her yoldan — yükleme, e-posta ve API — PDF&apos;leri, görselleri ve tabloları kabul
          eder. Her dosyanın nasıl okunacağına Tavnit karar verir, bu yüzden biçim başına hiçbir şey
          yapılandırmanız gerekmez.
        </Lead>
        <DataTable
          head={["Dosya", "Biçimler", "Nasıl okunur"]}
          rows={[
            [
              "PDF",
              "PDF",
              "Dijital PDF'ler doğrudan okunur. Taranmış PDF'ler otomatik olarak algılanır ve önce OCR ile okunur.",
            ],
            [
              "Görsel",
              "PNG, JPG, JPEG, JFIF",
              "Taranmış bir sayfa gibi okunur. JFIF, bazı Windows tarayıcılarının varsayılan olarak kaydettiği JPEG çeşididir ve her JPEG gibi çalışır.",
            ],
            [
              "Tablo",
              "XLSX, XLS, CSV",
              "İlk görünür sayfa okunur. Diğer ve gizli sayfalar yok sayılır, bu yüzden istediğiniz verileri ilk sayfaya koyun.",
            ],
          ]}
        />
        <p>
          Çok büyük sayfalar açık bir hata mesajıyla reddedilir. Bir çalışma kitabının her sayfasını
          ayrı bir belge olarak işlemek için onu bunun yerine bir{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>&apos;dan geçirin.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Kötü Tarama: kötü çıkan dosyalar için OCR'ı zorlayın">
          Taranmış belgeler zaten otomatik olarak OCR ile okunur. Bazı dosyalar dijital görünür ama
          bozuk bir metin katmanı taşır — gömülü dökümü zayıf bir tarama, alışılmadık bir araçtan
          dışa aktarılmış bir PDF. Bunlar için Flow&apos;un ayarlarında <strong>Kötü Tarama</strong>
          &apos;yı açın ve etkinleştirin: Flow&apos;daki her dosya önce OCR ile okunur ve veri çıkarma
          kurtarılan metinden yapılır. OCR kullanılamıyorsa veya başarısız olursa Run otomatik olarak
          standart işleme hattına geri döner.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Bir Flow'a neler ekleyebilirsiniz">
        <Lead>
          Neyin çıkacağına şema karar verir; ona ne olacağına Flow&apos;un geri kalanı. Aşağıdaki her
          öğe bağımsızdır — yalnızca ihtiyacınız olanı, istediğiniz sırada ve istediğiniz zaman
          ekleyin.
        </Lead>
        <DataTable
          head={["Aşama", "Ek", "Ne yapar"]}
          rows={[
            [
              "Girdiler",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-posta Tetikleyici</DocLink>
              </Fragment>,
              "Flow'a kendi gelen kutusu adresini verir; böylece iletilen belgeler (PDF, görsel veya tablo) otomatik olarak işlenir.",
            ],
            [
              "Girdiler",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collection&apos;lar</DocLink>
              </Fragment>,
              "Belgeleri bu Flow'a yönlendirebilen Collection'ları listeler.",
            ],
            [
              "İşleme",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Her Run'ın satırlarını işler: yeniden biçimlendirir, dönüştürür, hesaplar, eşleştirir ve kuralları tetikler.",
            ],
            [
              "İşleme",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "Veri çıkarmadan sonra çalışır ve çıkarılan alanları girdi olarak kullanır.",
            ],
            [
              "İşleme",
              "Form Şablonları",
              "Bir Run'ın çıkarılan değerleriyle bir PDF şablonunu doldurur.",
            ],
            [
              "Çıktılar",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">E-posta Çıktısı</DocLink>
              </Fragment>,
              "Her başarılı Run'dan sonra sonuçları bir veya daha fazla adrese e-postayla gönderir; isteğe bağlı olarak JSON, CSV, doldurulmuş form ve orijinal belge ekleriyle.",
            ],
            [
              "Çıktılar",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Sonuçları uç noktanıza POST eder. Yalnızca HTTPS.",
            ],
            [
              "Çıktılar",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Bucket Dışa Aktarımı</DocLink>
              </Fragment>,
              "Her Run'ın satırlarını, alanları sütunlara eşleyerek yapılandırılmış bir tabloya ekler.",
            ],
            [
              "Ayarlar",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">İnsan incelemesi</DocLink>
              </Fragment>,
              "Herhangi bir şey teslim edilmeden önce Run'ları bir inceleyici için duraklatır.",
            ],
            ["Ayarlar", "Kötü Tarama", "Flow'daki her dosya için OCR'ı zorlar (yukarıya bakın)."],
            [
              "Ayarlar",
              "Flow ID",
              <Fragment key="f18">
                <DocLink href="/docs/api-integration">API</DocLink>&apos;yi çağırırken
                ilettiğiniz tanımlayıcı.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>E-posta Tetikleyici seçenekleri.</strong> Tetikleyici açıldığında panel,
          Flow&apos;un gelen kutusu adresini ve iki ayarı gösterir.{" "}
          <strong>İzin Verilen Gönderenler</strong>, e-postayla kimin Run başlatabileceğini sınırlar;
          her gönderenden kabul etmek için boş bırakın. <strong>E-posta Gövdesini İşle</strong>,
          verileri ileti metninin kendisinden de çıkarır: ya <em>Yalnızca ek yoksa</em> (varsayılan;
          böylece bir açıklama notu asla ikinci bir Run başlatmaz) ya da <em>Her zaman</em>.
          Gönderenin adresi her Run&apos;a kaydedilir ve Run&apos;lar sayfasında gösterilir.{" "}
          <DocLink href="/docs/email-integration">E-posta entegrasyonu</DocLink> ayrıntıları ele
          alır.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Bir Flow'u teşhis edin">
        <Lead>
          Bir Flow bazı belgeleri işledikten sonra, Flow&apos;un üst çubuğundaki{" "}
          <strong>Teşhis et</strong> düğmesi <strong>Flow doktoru</strong>&apos;nu açar. Flow doktoru
          son tamamlanan Run&apos;larınızı inceler, sürekli boş veya yanlış türde gelen alanları bulur
          ve düzeltmeler önerir.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Flow&apos;u açın ve <strong>Teşhis et</strong>&apos;e tıklayın. Düğme, Flow&apos;un en az
              bir alanı olduğunda Sahipler ve Yöneticiler için görünür.
            </Fragment>,
            "Tavnit son Run'ları okur, alanların başarısız olduğu birkaç belgeyi yeniden okur ve düzeltme taslakları hazırlar. Bu biraz zaman alır.",
            <Fragment key="d1">
              Sonucu gözden geçirin. Her sorunlu alan, ne sıklıkla boş kaldığını veya yanlış türde
              geldiğini gösterir; <strong>Mevcut</strong> ipucu <strong>Önerilen</strong> ipucunun
              yanında yer alır. Ayrıca bir <strong>Önerilen açıklama</strong> da sunulabilir.
            </Fragment>,
            <Fragment key="d2">
              Katıldığınız düzeltmeleri tutun veya düzenleyin ve <strong>Uygula</strong>&apos;ya
              tıklayın. Siz uygulayana kadar hiçbir şey değişmez; paneli kapatmak önerileri atar.
            </Fragment>,
          ]}
        />
        <p>
          Her şey yolundaysa <em>“Çıkarma sağlıklı görünüyor”</em> mesajını görürsünüz. Teşhis yalnızca
          siz tıkladığınızda çalışır. Düzeltmeleri uyguladıktan sonra işe yaradıklarını doğrulamak
          için gerçek bir belgeyi yeniden çalıştırın.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Run'lar: bir belge işlendiğinde ne olur">
          <Lead>
            Her belge bir Run olur ve her Run aynı sırayı izler. Sırayı bilmek, bir şey geç geldiğinde,
            yanlış geldiğinde veya hiç gelmediğinde nereye bakacağınızı söyler.
          </Lead>
          <NumberedList
            items={[
              "Belge saklanır ve Run sıraya alınır.",
              "Veri çıkarma belgeyi okur ve meta veri değerleri ile tablo satırları üretir.",
              "Bir Cleaner bağlıysa bu satırları işler — dönüştürmeler, hesaplanan sütunlar, eşleştirmeler.",
              "Koşullu kurallar tetiklenir: satırlar çıkarılabilir, bildirimler gönderilebilir, inceleme istenebilir.",
              "İnceleme gerekiyorsa Run duraklar ve bir inceleyici onaylayana kadar hiçbir şey teslim edilmez.",
              "Çıktılar çalışır: e-posta, Bucket dışa aktarımı ve webhook. Ardından Run tamamlandı olarak işaretlenir ve varsa bağlı Agent başlar.",
            ]}
          />
          <DataTable
            head={["Run durumu", "Anlamı"]}
            rows={[
              ["Beklemede (sırada)", "Saklandı ve bir worker bekliyor."],
              ["İşleniyor", "Veriler çıkarılıyor, temizleniyor veya teslim ediliyor. Run sayfası mevcut aşamayı gösterir."],
              [
                "Yeniden deneniyor",
                "Önceki bir deneme geçici bir nedenle başarısız oldu ve Run otomatik olarak yeniden sıraya alındı (aşağıya bakın).",
              ],
              [
                "HITL incelemesi bekliyor",
                <Fragment key="f19">
                  <DocLink href="/docs/human-in-the-loop">İnsan incelemesi</DocLink> için duraklatıldı.
                  Henüz hiçbir şey teslim edilmedi.
                </Fragment>,
              ],
              ["Tamamlandı", "Veri çıkarma bitti ve yapılandırılmış her çıktı çalıştı."],
              [
                "İptal edildi",
                "Biri Run'ı sıradayken veya işlenirken iptal etti ya da bir inceleyici reddetti. Başka hiçbir şey teslim edilmez.",
              ],
              ["Başarısız", "Belge işlenemedi. Nedeni Run'ın günlüğünde yazar."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Run'larla çalışma">
        <Lead>
          <strong>Run&apos;lar</strong> sayfası organizasyonunuzdaki her Run&apos;ı listeler; her
          Flow&apos;un ayrıca kendi <strong>Son Run&apos;lar</strong> sekmesi vardır. Durum, tarih
          aralığı, Flow, kullanıcı, kaynak veya yapıştırılmış bir Run ID ile daraltmak için{" "}
          <strong>Filtrele</strong>&apos;yi kullanın.
        </Lead>
        <DataTable
          head={["Eylem", "Nerede", "Notlar"]}
          rows={[
            [
              "Ayrıntıları Görüntüle",
              "Run eylemleri menüsü veya satıra tıklama",
              "Kaynak dosyanın yanında çıkarılan veriler, Run bilgileri ve işleme günlüğü.",
            ],
            [
              "CSV İndir",
              "Run eylemleri menüsü",
              "Yalnızca tamamlanan Run'lar. CSV Dışa Aktar ve JSON Dışa Aktar da Run sayfasında bulunur.",
            ],
            [
              "Dosyayı İndir",
              "Run eylemleri menüsü veya Run sayfasındaki İndir",
              "Orijinal kaynak dosya. Tablolar sayfa içinde önizlenemez, görüntülemek için indirin.",
            ],
            [
              "Run'ı İptal Et",
              "Run eylemleri menüsü",
              "Yalnızca hâlâ sırada olan veya çalışan Run'lar için.",
            ],
          ]}
        />
        <p>
          <strong>Tetikleyen</strong> sütunu Run&apos;ı kimin başlattığını gösterir — yükleme için
          kullanıcıyı, e-postayla gelen bir Run için gönderenin adresini. <strong>Kaynak</strong>{" "}
          sütunu nasıl geldiğini söyler: elle yükleme, API, e-posta vb.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Başarısız Run'lar ve otomatik yeniden denemeler">
        <Lead>
          Çoğu başarısızlık belgeden kaynaklanır — okunamayan bir dosya veya desteklenmeyen bir tür —
          ve yeniden denemek işe yaramaz. Birkaçı ise öyle değildir: bir işleme worker&apos;ı Run
          ortasında yeniden başlar veya bir yapay zekâ sağlayıcısında geçici bir kesinti olur. Bunlar
          için bir organizasyon, Tavnit&apos;in kendiliğinden yeniden denemesini sağlayabilir.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              <strong>Ayarlar</strong> → <strong>Organizasyon</strong> →{" "}
              <strong>Başarısız Run&apos;lar</strong> bölümüne gidin. Bu sekmeyi yalnızca Sahip
              görebilir.
            </Fragment>,
            <Fragment key="r1">
              <strong>Başarısız Run&apos;ları otomatik olarak yeniden dene</strong> seçeneğini açın.
            </Fragment>,
            <Fragment key="r2">
              <strong>Run başına en fazla yeniden deneme</strong> değerini 1, 2 veya 3 olarak ayarlayın.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Yeniden denenen bir Run aynı Run ID'yi korur; böylece API sorgulaması, webhook'lar ve bağlantılar çalışmaya devam eder.",
            "Çıktılar yalnızca bir Run tamamlandığında tetiklenir, bu yüzden yeniden deneme bir belgeyi asla iki kez teslim etmez.",
            "Asla yeniden denenmeyenler: geçersiz dosyalar, desteklenmeyen türler, iptal edilen Run'lar, inceleme için duraklatılan Run'lar ve bir günden daha önce oluşturulan Run'lar.",
            "Worker yeniden başlatması nedeniyle kaybedilen bir Run otomatik olarak algılanır. Otomatik yeniden deneme açıksa yeniden sıraya alınır; kapalıysa Başarısız olarak işaretlenir.",
            "Run sayfası, her biri Worker kayboldu veya Başarısız olarak işaretlenmiş ve hatasıyla birlikte Önceki denemeleri listeler; Run'lar listesi ise bir yeniden deneme rozeti gösterir.",
          ]}
        />
        <p>
          Başarısızlıkla biten Run&apos;lardan haberdar olmak için aynı sekmedeki{" "}
          <strong>Run Hatası Bildirimleri</strong> altına adres ekleyin.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Veri çıkarma kalitesini artırma">
        <Lead>
          Bir alan yanlış geldiğinde, düzeltme neredeyse her zaman belgede değil o alanın tanımındadır.
          Flow&apos;un Run&apos;ları varsa <strong>Teşhis et</strong> ile başlayın, ardından bunları
          sırayla deneyin — ilk ikisi çoğu durumu çözer.
        </Lead>
        <DataTable
          head={["Belirti", "Olası neden", "Çözüm"]}
          rows={[
            [
              "Birbirine benzeyen birkaç değerden yanlış olanı",
              "Onları birbirinden ayıran bir şey yok.",
              "Değerin yanında durduğu etiketi veya göründüğü sayfa bölgesini ekleyin.",
            ],
            [
              "Bir alan boş geliyor",
              "Alan adı tek başına onu tanımlamaya yetmedi.",
              "İki üç gerçek örnek değer ekleyin — genellikle tek başına yeterlidir.",
            ],
            [
              "Çok sayıda kalem varken yalnızca bir tanesi",
              "Meta veri alanı olarak tanımlanmış.",
              "Tablo alanı olarak yeniden tanımlayın.",
            ],
            [
              "Aynı değer her satırda tekrarlanıyor",
              "Belge düzeyindeki bir değer tablo alanı olarak tanımlanmış.",
              "Meta veri alanı olarak yeniden tanımlayın.",
            ],
            [
              "Sayılar yüz kat farklı",
              "Ondalık ve binlik ayırıcılar ters okunmuş.",
              "Bir beklenen aralık belirleyin ve biçimi bir Cleaner'da normalleştirin.",
            ],
            [
              "Baştaki sıfırlar veya harfler kayboluyor",
              "Alanın türü Sayı.",
              "Karışık/Alfanümerik olarak değiştirin.",
            ],
            [
              "Sütunlar birbirine karışıyor",
              "İki sütunun başlıkları birbirine benziyor.",
              "Basılı sütun başlıklarını ekleyin ve sütunu Ek bilgi alanında tarif edin.",
            ],
            [
              "Bazı tedarikçilerde iyi, diğerlerinde kötü",
              "İpuçları tek bir tedarikçinin düzenini tarif ediyor.",
              "Diğer tedarikçilerin etiket ve başlık varyantlarını aynı alana ekleyin.",
            ],
            [
              "Dijital görünen bir dosyadan bozuk metin",
              "PDF'in gömülü metin katmanı bozuk.",
              "Flow'un dosyayı OCR ile okuması için Kötü Tarama'yı açın.",
            ],
            [
              "Bir tablo dosyası boş veya eksik geliyor",
              "Veriler ilk görünür sayfada değil.",
              "Verileri ilk sayfaya taşıyın veya çok sayfalı çalışma kitapları için bir Splitter kullanın.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Her seferinde tek bir şeyi değiştirin">
          Her değişiklikten sonra aynı belgeyi yeniden çalıştırın. Dört ipucunu birden düzenleyip
          yeniden çalıştırmak, sonucun iyileştiğini söyler ama hangi değişikliğin bunu sağladığını
          söylemez — ve dördünden biri durumu kötüleştirmiş olabilir.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Veri çıkarmayı değil, veriyi düzeltin">
          Değer doğru ama biçim yanlışsa — tarihler, para birimleri, birimler, büyük/küçük harf —
          Flow&apos;a dokunmayın ve bir <DocLink href="/docs/cleaners">Cleaner</DocLink> ekleyin.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Bir Flow'un çıkardığını normalleştirin ve zenginleştirin",
            description:
              "Tarihleri yeniden biçimlendirin, para birimlerini dönüştürün, toplamları hesaplayın ve bir kuralı ihlal eden satırları işaretleyin.",
          },
          {
            href: "/docs/email-integration",
            label: "Belgeleri bir Flow'a e-postayla gönderin",
            description:
              "Gelen kutusu adresi, izin verilen gönderenler, e-posta gövdesinin işlenmesi ve e-posta çıktısı.",
          },
          {
            href: "/docs/collections",
            label: "Belgeleri otomatik olarak doğru Flow'a yönlendirin",
            description:
              "Bir Flow'un adının ve açıklamasının veri çıkarma doğruluğunun ötesinde neden önemli olduğu.",
          },
          {
            href: "/docs/api-integration",
            label: "Bir Flow'u kendi kodunuzdan tetikleyin",
            description:
              "Flow ID, API anahtarıyla kimlik doğrulama ve Python ile JavaScript örnekleri.",
          },
          {
            href: "/docs/webhooks",
            label: "Bir Flow'un ürettiği yükü görün",
            description:
              "Meta veri alanlarının ve tablo alanlarının uç noktanızın aldığı JSON'da nasıl göründüğü.",
          },
        ]}
      />
    </section>
  );
}
