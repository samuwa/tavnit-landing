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

/** /tr/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "E-posta tetikleyicisini açın". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit e-posta tetikleyicisiyle e-posta eklerinden veri çıkarın",
    description:
      "Özel bir gelen kutusu adresi almak için bir Tavnit Flow'unda e-posta tetikleyicisini etkinleştirin, ardından belgeleri bu adrese iletin. Desteklenen her ek kendi çıkarma Run'ına dönüşür.",
    steps: [
      {
        name: "Flow'u açın",
        text: "Tavnit uygulamasında Flow'lar sayfasına gidin ve belge almasını istediğiniz Flow'u açın.",
      },
      {
        name: "E-posta tetikleyicisini etkinleştirin",
        text: "Flow'un ayrıntı sayfasında E-posta Tetikleyici panelini açın ve tetikleyiciyi açık konuma getirin. Flow'un Gelen Kutusu Adresi görünür.",
      },
      {
        name: "Adresi kopyalayın",
        text: "Gelen Kutusu Adresi'nin yanındaki Kopyala'ya tıklayın. İsterseniz aynı panelde İzin Verilen Gönderenler ekleyin veya E-posta Gövdesini İşle seçeneğini açın.",
      },
      {
        name: "Bir test belgesi gönderin",
        text: "Adrese tek bir PDF gönderin ve Run'lar sayfasını izleyin. Kaynağı E-posta olan yeni bir Run görünür.",
      },
      {
        name: "İletmeyi otomatikleştirin",
        text: "Test çalıştıktan sonra e-posta istemcinizde veya paylaşılan gelen kutunuzda, eşleşen iletileri adrese otomatik olarak ileten bir kural ekleyin.",
      },
    ],
  },
};

export default function EmailIntegrationTr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        E-posta Entegrasyonu
      </h1>

      <DocCard icon={<Mail size={24} />} title="E-posta işleme nasıl çalışır">
        <Lead>
          Her Tavnit Flow&apos;unun kendi gelen kutusu adresi olabilir. E-posta tetikleyicisini
          etkinleştirip bu adrese bir belge gönderdiğinizde Tavnit desteklenen her eki alır, her biri
          için ayrı bir çıkarma Run&apos;ı oluşturur ve eki tam olarak uygulamada yüklemişsiniz gibi işler.
        </Lead>
        <p>
          Hiçbir şey kurulmaz ve hiçbir şey posta kutunuzu yoklamaz: siz e-postaları adrese iletirsiniz,
          Tavnit de tepki verir. Bu, &ldquo;faturalar e-postayla geliyor&rdquo; durumundan
          &ldquo;faturalar yapılandırılmış satırlar olarak geliyor&rdquo; durumuna kod yazmadan
          ulaşmanın en kısa yoludur. Collection&apos;ların, Splitter&apos;ların, Pipeline&apos;ların, Matcher&apos;ların ve
          Subject&apos;lerin de kendi adresleri vardır.
        </p>
        <BulletList
          items={[
            "Faturaları veya makbuzları doğrudan gelen kutunuzdan iletmek",
            "Otomatik iletme kuralı olan paylaşılan bir borç hesapları posta kutusu",
            "Tedarikçilere Tavnit hesabı vermeden belge gönderebilmelerini sağlamak",
            "Ek içermeyen sipariş onayları gibi, iletinin kendisinde gelen verileri çıkarmak",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="E-posta tetikleyicisini açın">
        <Lead>
          Tetikleyici varsayılan olarak kapalıdır. Flow&apos;un ayrıntı sayfasından açın, size verdiği
          adresi kopyalayın ve bir iletme kuralını ona yönlendirmeden önce test olarak tek bir belge
          gönderin.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              <strong>Flow&apos;lar</strong> sayfasına gidin ve belge almasını istediğiniz Flow&apos;u açın.
            </Fragment>,
            <Fragment key="f1">
              <strong>E-posta Tetikleyici</strong> panelini açın ve tetikleyiciyi açık konuma getirin.
              Flow&apos;un <strong>Gelen Kutusu Adresi</strong> görünür.
            </Fragment>,
            <Fragment key="f2">
              Adresin yanındaki <strong>Kopyala</strong>&apos;ya tıklayın. Aynı panelde{" "}
              <strong>İzin Verilen Gönderenler</strong> ekleyebilir veya{" "}
              <strong>E-posta Gövdesini İşle</strong> seçeneğini açabilirsiniz (ikisi de aşağıda
              açıklanmıştır).
            </Fragment>,
            <Fragment key="f3">
              Adrese bir PDF gönderin ve <strong>Run&apos;lar</strong> sayfasını kontrol edin. Kaynağı{" "}
              <strong>E-posta</strong> olan yeni bir Run görünür ve gönderenin adresi Run&apos;a kaydedilir.
            </Fragment>,
            "Bu çalıştıktan sonra e-posta istemcinizde veya paylaşılan gelen kutunuzda iletme kuralını ekleyin.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Her ek için bir Run">
          Üç fatura eklenmiş bir e-posta, her birinin kendi sonucu ve Run&apos;lar listesinde kendi satırı
          olan üç ayrı Run oluşturur. Üç belge içeren tek bir Run oluşturmaz.
        </InfoBox>
        <WarningBox>
          Tetikleyicisi kapalı bir adrese (veya etkin olmayan bir Collection&apos;a) gönderilen e-postalar
          kabul edilir ve atılır: gönderen ne geri dönen bir ileti ne de bir hata alır. Belgeler
          kayboluyor gibi görünüyorsa önce anahtarı kontrol edin.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="İzin Verilen Gönderenler">
        <Lead>
          Varsayılan olarak herhangi bir gönderen, adrese e-posta göndererek bir Run başlatabilir. E-posta
          Tetikleyici panelinde <strong>İzin Verilen Gönderenler</strong> listesine adres eklediğinizde
          yalnızca bu gönderenler kabul edilir; diğer herkesten gelen e-postalar sessizce atılır.
        </Lead>
        <BulletList
          items={[
            "Girdiler alan adları değil, tam e-posta adresleridir. Eşleştirme büyük/küçük harfi ve görünen adları dikkate almaz.",
            "Herhangi bir gönderenden e-posta kabul etmek için listeyi boş bırakın.",
            "Liste; Flow'ların, Collection'ların, Splitter'ların, Pipeline'ların, Matcher'ların ve Subject'lerin e-posta tetikleyicisinde kullanılabilir.",
            <Fragment key="f4">
              Paylaşılan bir posta kutusu üzerinden ilettiğinizde Tavnit&apos;in gördüğü gönderen genellikle
              iletmeyi yapan posta kutusudur; izin verilmesi gereken adres de odur.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="E-posta gövdesini işleyin">
        <Lead>
          Bazı veriler hiçbir zaman ek olarak gelmez: bir sipariş onayı, bir rezervasyon bildirimi,
          miktarları iletinin içine yazan bir tedarikçi. <strong>E-posta Gövdesini İşle</strong>{" "}
          seçeneğini açtığınızda Tavnit ileti gövdesini bir PDF&apos;e dönüştürür ve diğer tüm belgeler gibi
          işler. Flow&apos;larda ve Collection&apos;larda kullanılabilir.
        </Lead>
        <DataTable
          head={["Mod", "Ne olur"]}
          rows={[
            [
              <Fragment key="f5"><strong>Yalnızca ek yoksa</strong> (varsayılan)</Fragment>,
              "Gövde yalnızca e-postada belge eki olmadığında işlenir. Bir faturanın yanındaki “ekte bulabilirsiniz” türünden bir ön not atlanır; böylece tek bir e-posta asla iki Run başlatmaz.",
            ],
            [
              <Fragment key="f6"><strong>Her zaman</strong></Fragment>,
              "Gövde, her ekle birlikte ve her biri kendi Run'ında olmak üzere işlenir.",
            ],
          ]}
        />
        <BulletList
          items={[
            "Gövde PDF'i incelemede diğer tüm belgeler gibi görünür ve Run, e-posta gövdesinden geldiği şeklinde işaretlenir.",
            "Alıntılanan yanıt zincirleri ve imzalar, e-posta sağlayıcısının bunları tanımlayabildiği durumlarda çıkarılır.",
            "İletinin içindeki görseller okunmaz. Gövdenin işlenip işlenmeyeceğine karar verilirken satır içi imza görselleri ek olarak sayılmaz.",
            "Neredeyse hiç metin içermeyen bir gövde (“tamam”, “teşekkürler”, boş bir iletme) işlenmez.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Hangi özelliklerin e-posta adresi var">
        <Lead>
          E-posta tetikleyicisi Flow&apos;larla sınırlı değildir. Bir adresi tek bir belge türü yerine bütün
          bir sınıflandırma aşamasına, bir Pipeline&apos;a veya bir karşılaştırmaya yönlendirebilirsiniz.
        </Lead>
        <DataTable
          head={["Gönderim yeri", "Adres biçimi", "Ne olur"]}
          rows={[
            [
              "Bir Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Her ekten o Flow ile veri çıkarılır.",
            ],
            [
              "Bir Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Her ek sınıflandırılır ve doğru Flow&apos;a veya Splitter&apos;a yönlendirilir. Bkz.{" "}
                <DocLink href="/docs/collections">Collection&apos;lar belgeleri nasıl yönlendirir</DocLink>.
              </Fragment>,
            ],
            [
              "Bir Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Her ek önce ayrı belgelerine bölünür. Bkz.{" "}
                <DocLink href="/docs/splitters">çok belgeli dosyaları bölme</DocLink>.
              </Fragment>,
            ],
            [
              "Bir Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Her PDF veya görsel eki bir yürütme başlatır. Bkz.{" "}
                <DocLink href="/docs/pipelines">Pipeline&apos;lar</DocLink>.
              </Fragment>,
            ],
            [
              "Bir Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Bir e-postanın tüm PDF ve görsel ekleri tek bir eşleştirmede birlikte karşılaştırılır
                (her zaman çok taraflı modda) ve sonuç aynı yazışma dizisinde yanıt olarak gönderilir.
                Bkz. <DocLink href="/docs/matchers">Matcher&apos;lar</DocLink>.
              </Fragment>,
            ],
            [
              "Bir Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Her ek; konu satırındaki, gövdedeki veya dosya adındaki bir referansa ya da vakanın kendi
                artı adresine göre doğru vakaya dosyalanır. Bkz.{" "}
                <DocLink href="/docs/subjects">Subject&apos;ler</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Tam adresi özelliğin E-posta Tetikleyici panelinden kopyalayın; yukarıdaki biçimler yalnızca adresleri birbirinden ayırt etmenize yardımcı olur."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Tedarikçiler hangi adresi kullanmalı?">
          Bir gönderen her zaman tek bir belge türü gönderiyorsa ona Flow adresini verin. Karışık
          türler (faturalar, satın alma siparişleri, irsaliyeler) gönderiyorsa Collection adresini
          verin ve sınıflandırmayı Tavnit&apos;e bırakın. Birkaç belge içeren tek bir PDF gönderiyorsa
          Splitter adresini verin.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Tavnit neleri kabul eder">
        <Lead>
          Flow&apos;lar, Collection&apos;lar, Splitter&apos;lar ve Subject&apos;ler PDF&apos;leri, yaygın görsel biçimlerini ve
          elektronik tabloları okur. Pipeline&apos;lar ve Matcher&apos;lar yalnızca PDF&apos;leri ve görselleri okur.
          İletideki diğer her şey, geri kalanı başarısız kılmadan atlanır: desteklenmeyen tek bir
          dosya, diğer eklerin işlenmesini durdurmaz.
        </Lead>
        <DataTable
          head={["Kabul edilen", "Uzantılar"]}
          rows={[
            ["PDF belgeleri", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Görseller",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Elektronik tablolar (Pipeline'lar ve Matcher'lar hariç)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Aşağıdakilerden herhangi biri geçerliyse ek işlenmez, atlanır:</p>
        <DataTable
          head={["Atlanma nedeni", "Neye benzer"]}
          rows={[
            [
              "Desteklenmeyen dosya türü",
              "Word belgeleri, arşivler, .eml iletmeleri ve tanınan bir uzantısı olmayan her şey.",
            ],
            ["Boş ek", "Sıfır baytlık bir dosya; genellikle bozuk bir iletme."],
            [
              "Okunamayan dosya",
              "Dosyanın uzantısı geçerlidir ancak açılamaz: yarım kalmış bir indirme, adı değiştirilmiş bir dosya veya ayrıştırılamayan bir elektronik tablo.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="İmza görselleri ek olarak sayılır">
          E-posta imzasındaki bir logo çoğu zaman görsel eki olarak gelir ve bir Flow onu diğer tüm
          görseller gibi işler. Bu istenmeyen Run&apos;lara yol açıyorsa yalnızca belgeleri iletin ya da
          İzin Verilen Gönderenler&apos;i ve satır içi görselleri kaldıran bir iletme kuralını kullanın.
        </InfoBox>
        <p>
          E-posta sağlayıcınızın ek boyutu sınırı, ileti Tavnit&apos;e ulaşmadan önce uygulanır. Büyük bir
          tarama gönderen tarafta geri dönerse onu uygulamada yükleyin veya bunun yerine{" "}
          <DocLink href="/docs/api-integration">REST API</DocLink>&apos;ye gönderin.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Elektronik tablolar nasıl işlenir">
        <Lead>
          Elektronik tablo eki, içe aktarılacak bir tablo olarak değil, bir belge olarak ele alınır. Ne
          olacağı, onu nereye gönderdiğinize bağlıdır.
        </Lead>
        <DataTable
          head={["Gönderildiği yer", "Tavnit ne yapar"]}
          rows={[
            [
              "Bir Flow",
              "İlk görünür sayfadan veri çıkarır.",
            ],
            [
              "Bir Collection",
              "Dosyayı ilk sayfasına göre sınıflandırır, ardından seçilen Flow'a devreder; Flow da ilk görünür sayfayı okur.",
            ],
            [
              "Bir Splitter",
              "Görünür ve boş olmayan her sayfayı ayrı bir belge olarak ele alır, her birini sınıflandırır ve tek sayfalık bir dosya olarak yoluna gönderir.",
            ],
          ]}
        />
        <p>
          Çok büyük sayfalar bir hatayla reddedilir. Bir elektronik tabloyu bunun yerine
          yapılandırılmış satırlar olarak yüklemek için bir{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> temizlemesi kullanın.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Yineleme koruması">
        <Lead>
          E-posta sunucuları bazen aynı iletiyi birden fazla kez teslim eder; örneğin bir zaman
          aşımından sonra. Tavnit, aynı adrese yeniden teslim edilen bir iletiyi tanır ve onu tekrar
          işlemez; böylece bir yeniden deneme asla yinelenen Run&apos;lar oluşturmaz.
        </Lead>
        <BulletList
          items={[
            "Tavnit iletiyi saniyeler içinde onaylar ve ekleri arka planda işler; bu nedenle çok sayıda ek içeren bir e-posta göndermek güvenlidir.",
            "İşleme kesintiye uğrarsa baştan başlamak yerine kaldığı yerden devam eder.",
            "İki farklı Tavnit adresine gönderilen tek bir ileti, her adreste bir kez işlenir.",
            "Aynı dosyayı yeni bir e-postayla tekrar göndermek yeni bir iletidir ve yeniden işlenir.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Sonuçları e-postayla geri gönderin">
        <Lead>
          E-posta Çıktısı dönüş ayağıdır: bir Run başarıyla tamamlandığında Tavnit sonucu
          yapılandırdığınız adreslere e-postayla gönderir. E-posta tetikleyicisinden bağımsızdır: ikisini
          ayrı ayrı kullanabilir ya da gönder-geri al döngüsünü tamamlamak için birlikte
          kullanabilirsiniz.
        </Lead>
        <NumberedList
          items={[
            "Flow'un ayrıntı sayfasını açın.",
            <Fragment key="f21">
              <strong>E-posta Çıktısı</strong> panelini açın.
            </Fragment>,
            <Fragment key="f22">
              <strong>Alıcı Adresleri</strong> alanına bir veya daha fazla adres ekleyin.
            </Fragment>,
            <Fragment key="f23">
              Her iletinin ne taşıyacağını <strong>Ekler</strong> altında seçin, ardından kaydedin.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Seçenek", "Ne gelir"]}
          rows={[
            ["JSON çıkarma", "Çıkarılan sonuç, ileti gövdesinde biçimlendirilmiş JSON olarak."],
            [
              "CSV çıkarma",
              <Fragment key="f24">
                Satırlar bir <InlineCode>rows.csv</InlineCode> eki olarak; sonuçları bir elektronik
                tabloya aktarmanın en hızlı yolu.
              </Fragment>,
            ],
            ["Form sonuçları", "Flow bir form şablonu doldurduğunda doldurulmuş PDF'ler."],
            [
              "Orijinal belge",
              "İşlenen kaynak dosya (PDF, görsel veya elektronik tablo), sonuçların yanına eklenmiş olarak.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Dosya alanları bağlantı olarak gelir">
          Bir dosya veya görsel tutan alanlar JSON&apos;a gömülmez. Süreyle sınırlı bağlantılar olarak
          gelirler, çünkü Tavnit depolanan belgeleri gizli tutar: ham bir depolama yolu bir gelen
          kutusundan erişilebilir olmazdı.
        </InfoBox>
        <BulletList
          items={[
            "Çıktı e-postası yalnızca başarıyla tamamlanan Run'larda gönderilir. Başarısız bir Run hiçbir şey göndermez.",
            "Konu satırı, Flow adının yanında Run'a özgü bir ayrıntı içerir; böylece e-posta istemcileri bir Flow'un tüm Run'larını tek bir yazışma dizisinde toplamaz.",
            <Fragment key="f25">
              Flow&apos;da <DocLink href="/docs/human-in-the-loop">insan incelemesi</DocLink>{" "}
              etkinse e-posta, bir inceleyici Run&apos;ı onaylayana kadar bekler.
            </Fragment>,
            <Fragment key="f26">
              Makineden makineye teslim için e-posta yerine bir{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink> daha uygundur.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Uygulamalı örnek: bir borç hesapları gelen kutusu">
        <Lead>
          Yaygın kurulum şöyledir: tedarikçi faturalarını zaten alan paylaşılan bir posta kutusu, her
          tedarikçinin biçimi doğru Flow&apos;a düşsün diye bir Collection&apos;a iletilir; sonuçlar finans
          ekibine e-postayla gönderilir ve bir Bucket&apos;a aktarılır.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Aldığınız her belge türü için bir Flow oluşturun; örneğin{" "}
              <em>Tedarikçi Faturaları</em> ve <em>İrsaliyeler</em>. Her birine açık bir açıklama
              verin.
            </Fragment>,
            <Fragment key="f28">
              İki Flow&apos;u da bir <DocLink href="/docs/collections">Collection</DocLink>&apos;a koyun ve
              Collection&apos;ın e-posta tetikleyicisini etkinleştirin. Paylaşılan posta kutusunu İzin
              Verilen Gönderenler&apos;e ekleyin.
            </Fragment>,
            <Fragment key="f29">
              Paylaşılan posta kutusunda, tedarikçi alan adlarınızdan gelen ve ek içeren her iletiyi
              Collection adresine iletin.
            </Fragment>,
            <Fragment key="f30">
              Her Flow&apos;da finans ekibi için CSV ekiyle <strong>E-posta Çıktısı</strong>&apos;nı açın ve
              verilerin tek bir tabloda birikmesi için bir{" "}
              <DocLink href="/docs/buckets">Bucket dışa aktarımı</DocLink> ekleyin.
            </Fragment>,
            <Fragment key="f31">
              Onay eşiğinizin üzerindeki her şeyi teslim edilmeden önce{" "}
              <DocLink href="/docs/human-in-the-loop">insan incelemesine</DocLink> gönderen koşullu bir
              eylem içeren bir <DocLink href="/docs/cleaners">Cleaner</DocLink> ekleyin.
            </Fragment>,
          ]}
        />
        <p>
          Finans ekibinden kimsenin Tavnit&apos;i açması gerekmez. Faturalar her zamanki yere gelir ve
          yapılandırılmış veriler aynı gelen kutusuna geri döner.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Sorun giderme">
        <Lead>
          Gelen e-postalar sessizce kabul edildiğinden, ortaya çıkmayan bir belge gelen kutunuzda
          hiçbir hata bırakmaz. Bu listeyi sırayla izleyin: neden neredeyse her zaman tetikleyici
          anahtarı, İzin Verilen Gönderenler, ek türü veya ekleri kaldıran bir iletme kuralıdır.
        </Lead>
        <DataTable
          head={["Belirti", "Olası neden", "Çözüm"]}
          rows={[
            [
              "Hiç Run görünmüyor",
              "E-posta tetikleyicisi kapalı, adres başka bir Flow'a ait ya da gönderen İzin Verilen Gönderenler listesinde değil.",
              "Anahtarı ve İzin Verilen Gönderenler listesini yeniden kontrol edin ve adresi E-posta Tetikleyici panelinden tekrar kopyalayın.",
            ],
            [
              "Bazı ekler işlendi, diğerleri işlenmedi",
              "Eksik olanlar desteklenmeyen türde, boş veya okunamaz.",
              "Uzantıları yukarıdaki kabul edilenler listesiyle karşılaştırın.",
            ],
            [
              "Yalnızca imza görseli işlendi",
              "Asıl belge eklenmemişti: bağlantı olarak verilmişti ya da iletme sırasında düştü.",
              "Satır içi yerine ek olarak iletin ve kuralın ekleri koruduğunu kontrol edin.",
            ],
            [
              "Eki olmayan bir e-posta hiçbir şey yapmadı",
              "E-posta Gövdesini İşle kapalı ya da gövdede neredeyse hiç metin yoktu.",
              "E-posta Tetikleyici panelinde E-posta Gövdesini İşle seçeneğini açın (Flow'lar ve Collection'lar).",
            ],
            [
              "Ön not kendi Run'ını oluşturdu",
              "E-posta Gövdesini İşle, Her zaman olarak ayarlı.",
              "Modu Yalnızca ek yoksa olarak değiştirin.",
            ],
            [
              "Run'lar görünüyor ama başarısız oluyor",
              "Sorun e-posta yolunda değil, belgenin kendisinde.",
              "Run'ı açın ve günlüğünü okuyun; hata bir çıkarma sorunudur.",
            ],
            [
              "Sonuçlar e-postayla hiç gelmiyor",
              "E-posta Çıktısı ayarlanmamış, Run başarısız oldu ya da incelemeyi bekliyor.",
              "Önce Run'ın durumunu, ardından E-posta Çıktısı yapılandırmasını kontrol edin.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Karışık belgeleri Collection'larla otomatik yönlendirin",
            description:
              "Tek bir e-posta adresini birkaç Flow'a yönlendirin ve her belge için doğru olanı Tavnit seçsin.",
          },
          {
            href: "/docs/splitters",
            label: "Çok belgeli dosyaları çıkarmadan önce bölün",
            description: "Birkaç belgeyi tek bir ekte bir araya getiren gönderenler için.",
          },
          {
            href: "/docs/webhooks",
            label: "Sonuçları webhook'larla kendi sistemlerinize teslim edin",
            description:
              "E-posta Çıktısı'nın yeniden deneme davranışına sahip, makine tarafından okunabilir alternatifi.",
          },
          {
            href: "/docs/api-integration",
            label: "Belgeleri REST API üzerinden gönderin",
            description:
              "E-postanın taşıyamayacağı hacimler ve dosya boyutları için, açık hata yönetimiyle.",
          },
        ]}
      />
    </section>
  );
}
