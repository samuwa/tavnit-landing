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
 * /tr/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "İnsan incelemesi" in Turkish; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Bir Flow için incelemeyi açın". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Bir Tavnit Flow'una insan incelemesi adımı ekleme",
    description:
      "Bir Flow'da insan incelemesini etkinleştirin ve inceleyiciler atayın; böylece her Run, sonuçları sonraki adımlara teslim edilmeden önce onay için duraklar.",
    steps: [
      {
        name: "Flow'un İnsan incelemesi panelini açın",
        text: "Tavnit uygulamasında Flow'lar sayfasına gidin, Flow'u açın ve kenar çubuğunda İnsan incelemesi panelini seçin.",
      },
      {
        name: "İncelemeyi açın",
        text: "İnsan incelemesini açın. Bu andan itibaren Flow'un yeni Run'ları sonuçlarını teslim etmek yerine duraklar.",
      },
      {
        name: "İnceleyicileri atayın",
        text: "İnceleyiciler altında organizasyonunuzun bir veya daha fazla üyesini seçin. Flow'un duraklatılmış Run'larını yalnızca atanan inceleyiciler onaylayabilir veya reddedebilir.",
      },
      {
        name: "Bir belge çalıştırın ve kuyruğu kontrol edin",
        text: "Bir belge işleyin. Belge, atanan her inceleyicinin İnsan incelemesi kuyruğunda İnceleme bekliyor durumuyla görünmelidir.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "Tavnit'in insan incelemesi ekranı: kaynak belgenin yanında düzenlenebilir bir veri tablosu ve Onayla ile Reddet eylemleri.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopTr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        İnsan incelemesi (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="İnsan incelemesi ne yapar">
        <Lead>
          İnsan incelemesi, veri çıkarma ile teslimat arasına bir inceleme kontrol noktası koyar.
          İncelenmesi gereken bir Run, veri çıkarma ve temizlemeden sonra{" "}
          <strong>Onay bekliyor</strong> durumuyla durur: adı belirlenmiş bir inceleyici onaylayana
          kadar hiçbir e-posta gönderilmez, hiçbir webhook tetiklenmez, hiçbir Bucket satırı yazılmaz
          ve bağlı hiçbir Agent başlamaz.
        </Lead>
        <p>
          Buradaki önemli kelime <em>önce</em>&apos;dir. İnceleme, hatalı veriler ERP&apos;nize
          ulaştıktan sonra uyguladığınız bir düzeltme değildir; teslimat adımı henüz çalışmamıştır.
          İnceleyici onayladığında Run, tam olarak durduğu yerden ve inceleyicinin düzenlemeleriyle
          birlikte devam eder.
        </p>
        <BulletList
          items={[
            "Sonraki adımlara geçmeden önce doğrulanması gereken yüksek değerli veriler",
            "Belgelenmiş bir manuel onay adımı gerektiren bir uyumluluk zorunluluğu",
            "Veri çıkarmanın genellikle doğru olduğu ama ara sıra yanlış olmasının pahalıya patladığı belgeler",
            "Dahili bir masraf merkezi veya bir onay kodu gibi yalnızca bir kişinin sağlayabileceği değerler",
            "Flow'a güvenene kadar yeni tedarikçiler veya yeni biçimler",
          ]}
        />
        <p>
          Asıl kullanım alanı Flow Run&apos;larıdır, ancak aynı kuyruk duraklatılmış{" "}
          <DocLink href="/docs/matchers">eşleştirmeleri</DocLink>,{" "}
          <DocLink href="/docs/inspectors">denetimleri</DocLink> ve{" "}
          <DocLink href="/docs/fillers">doldurmaları</DocLink> da toplar. Aşağıdaki{" "}
          <em>İnceleme bekleyen diğer öğeler</em> bölümüne bakın.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Bir Flow Run'ının duraklatılmasının üç yolu">
        <Lead>
          Flow düzeyindeki anahtar, Run&apos;ları incelemeye göndermenin tek yolu değil, yollardan
          biridir. Flow&apos;a bağlı bir <DocLink href="/docs/cleaners">Cleaner</DocLink>, anahtar
          kapalıyken bile Run&apos;ları kendi başına duraklatabilir. Aynı Run için birden fazla
          tetikleyici geçerli olduğunda inceleyici listeleri birleştirilir.
        </Lead>
        <DataTable
          head={["Tetikleyici", "Ne duraklar", "En uygun olduğu durum"]}
          rows={[
            [
              "Flow ayarı (İnsan incelemesi paneli)",
              "Neyin çıkarıldığından bağımsız olarak Flow'un her Run'ı.",
              "Her zaman onay gerektiren bir belge türü veya yeni kurduğunuz ve henüz güvenmediğiniz bir Flow.",
            ],
            [
              "İnsan incelemesi eylemi içeren bir Cleaner Koşullu Eylemler kuralı",
              "Yalnızca bir satırın kurala uyduğu Run'lar; örneğin bir eşiği aşan toplam veya eksik vergi numarası.",
              "Run'ların çoğunun sorunsuz olduğu ve yalnızca istisnalara göz atılmasını istediğiniz yüksek hacimler.",
            ],
            [
              "Cleaner İnsan Girdisi alanı",
              "Cleaner'dan geçen her Run, çünkü değeri bir kişinin yazması veya seçmesi gerekir.",
              "Belgede hiç bulunmayan ve birinin eklemesi gereken veriler.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Her şeyi incelemeniz gerekmez">
          Her Run&apos;ı incelemek, veri çıkarmayı otomatikleştirmenin amacını boşa çıkarır. Doğru yol
          genellikle koşullu olanıdır: Cleaner&apos;da bir Koşullu Eylemler alanı ekleyin, ona{" "}
          <em>toplam &gt; 10.000</em> gibi bir koşul verin, İnsan incelemesi eylemini ekleyin ve
          inceleyicilerini seçin. Yalnızca koşula uyan Run&apos;lar durur. Flow anahtarı kapalı
          kalabilir.
        </InfoBox>
        <p>
          Duraklatmayı bir Cleaner kuralı tetiklediğinde Tavnit hangi satırların ve hangi alanların
          kurala uyduğunu kaydeder. İnceleme ekranı tam olarak bu hücreleri işaretler; böylece
          inceleyici tüm tabloyu okumak yerine Run&apos;ın bekletilme nedeninden başlar. Kural bir
          Anomali Kontrolü alanından besleniyorsa, inceleyici her değerin neden işaretlendiğini de
          görür.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Bir Flow için incelemeyi açın">
        <Lead>
          Flow anahtarı Flow&apos;un kendi ayarlarında bulunur. Yalnızca bir Sahip veya Yönetici
          değiştirebilir. İnceleyiciler organizasyonunuzun üyeleri arasından seçilir.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Flow&apos;u açın ve kenar çubuğunda <strong>İnsan incelemesi</strong> panelini seçin.
            </Fragment>,
            <Fragment key="f1">İncelemeyi açın.</Fragment>,
            <Fragment key="f2">
              <strong>İnceleyiciler</strong> altında organizasyonunuzun bir veya daha fazla üyesini
              seçin.
            </Fragment>,
            <Fragment key="f3">
              Bir belge işleyin ve belgenin inceleyicilerin <strong>İnsan incelemesi</strong>{" "}
              kuyruğunda <strong>İnceleme bekliyor</strong> durumuyla göründüğünü doğrulayın.
            </Fragment>,
          ]}
        />
        <WarningBox>
          İnceleme açıkken hiç inceleyici atanmamışsa panel{" "}
          <em>&ldquo;İnceleyici seçilmedi — onay talepleri kimseye ulaşmayacak.&rdquo;</em> uyarısını
          gösterir. Bu durumda duraklatılan Run&apos;ları onaylayabilecek kimse olmaz. Belge
          göndermeden önce en az bir inceleyici atayın.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Bağlı bir Cleaner varsa inceleyiciler temizlenmiş verileri görür"
        >
          Flow&apos;un bir Cleaner&apos;ı varsa duraklatma temizlemeden sonra gerçekleşir; bu yüzden
          incelenen tablo, dönüştürülmüş para birimleri, yeniden biçimlendirilmiş tarihler ve
          hesaplanan sütunlarla temizlenmiş çıktıdır. Teslim edilecek olan budur, dolayısıyla kontrol
          edilmesi gereken de budur.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="İnsan Girdisi alanları">
        <Lead>
          İnsan Girdisi alanı, hiçbir zaman çıkarılmayan bir Cleaner sütunudur: onu bir inceleyici
          inceleme ekranında doldurur. Bir masraf merkezi, bir muhasebe hesabı, dahili bir onay kodu
          veya belgenin size söyleyemeyeceği başka herhangi bir şey için kullanın.
        </Lead>
        <DataTable
          head={["Seçenek", "Ne yapar"]}
          rows={[
            ["Serbest metin", "İnceleyici değeri yazar."],
            [
              "Menü",
              "İnceleyici, bir Bucket sütununun farklı değerleri arasından seçim yapar (Seçenek Bucket'ı ve Seçenek sütunu); isteğe bağlı olarak, mevcut satırın alanlarına dayalı koşullar da dahil olmak üzere koşullarla filtrelenir.",
            ],
            [
              "Değer zorunlu",
              "Her satırda bir değer olana kadar onay engellenir. Boş değerlere izin vermek için kapatın.",
            ],
            ["İnceleyiciler", "Alanı kimin doldurup onaylayabileceği; Flow'un inceleyicileriyle birleştirilir."],
          ]}
        />
        <p>
          İnsan Girdisi alanı olan bir Cleaner&apos;dan geçen her Run, Flow anahtarı açık olsun ya da
          olmasın inceleme için duraklar. İnceleme ekranında sütun, doldurulan satır sayısıyla birlikte{" "}
          <strong>İnsan girdisi gerekiyor</strong> olarak işaretlenir ve her zorunlu değer girilene
          kadar Onayla engelli kalır (
          <em>&ldquo;Onaylamak için tüm zorunlu insan girdisi değerlerini doldurun&rdquo;</em>).
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="İnceleme kuyruğu">
        <Lead>
          Kenar çubuğundaki <strong>İnsan incelemesi</strong> sayfası sizi bekleyen her şeyi en yeniden
          eskiye doğru listeler. Yalnızca inceleyicisi olduğunuz öğeleri gösterir; inceleyiciler
          birbirlerinin kuyruklarını görmez.
        </Lead>
        <BulletList
          items={[
            "Üstte özet rakamlar: İnceleme Bekliyor, En Eski Bekleyen, Rolünüz ve HITL'li Flow'lar",
            "Her öğe için bir kart: bir Run için dosya adı ve Flow, ilgili türler için Eşleştirme veya Doldurma etiketi ve İnceleme bekliyor durumu",
            "Sizi bekleyen bir şey olduğunda kenar çubuğu simgesinde kırmızı bir nokta. Sayfayı yenilemeden gerçek zamanlı olarak güncellenir",
            "Atanan inceleyiciler, bir Run, eşleştirme, denetim veya doldurma onlara ihtiyaç duyduğu anda doğrudan bağlantı içeren bir e-posta da alır",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Bir Run'ı inceleme">
        <Lead>
          İnceleme ekranı bölünmüş bir görünümdür: solda çıkarılan tablo, sağda orijinal belge. Sayfadan
          ayrılmadan bir değeri kaynakla karşılaştırır, yerinde düzeltir ve onaylarsınız. Ayırıcı
          sürüklenebilir; mobilde iki panel arasında geçiş yaparsınız.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="İnceleme bekleyen bir Run için Tavnit inceleme ekranı: solda Subtotal, Amount ve Weight sütunlarını ve satır onay kutularını gösteren düzenlenebilir bir veri tablosu, sağda görüntülenen kaynak fatura, başlıkta Reddet ve Onayla düğmeleri."
          caption="İnceleme bekleyen bir Run. Soldaki tablo teslim edilecek temizlenmiş çıktıdır; kaynak belge kontrol için hemen yanında durur."
        />
        <DataTable
          head={["Veri tablosunda şunları yapabilirsiniz", "Nasıl"]}
          rows={[
            ["Bir değeri düzenlemek", "Hücreye çift tıklayın ve yazın."],
            [
              "Birçok hücreyi aynı anda değiştirmek",
              "Sürükleyerek, Shift ile tıklayarak veya bir sütun başlığına tıklayarak seçin, ardından Seçilenlere uygula'yı kullanın.",
            ],
            ["Bir satırı çıktıdan çıkarmak", "İşaretini kaldırın. Hariç tutulan satırlar teslim edilmez."],
            ["Sütun eklemek veya kaldırmak", "Sütun ekle veya Sütunu kaldır'ı kullanın. Kaldırılan bir sütun, onaylamadan önce geri getirilebilir."],
            ["Duraklatmayı neyin tetiklediğini görmek", "Bir Cleaner kuralının eşleştiği hücreler işaretlenir."],
            ["İnsan Girdisi alanlarını doldurmak", "Değeri yazın veya menüden seçin."],
            ["Neyi değiştirdiğinizi görmek", "Düzenlenen hücreler siz onaylayana kadar vurgulu kalır."],
          ]}
        />
        <BulletList
          items={[
            "Belge paneli, görsel dosyalarının yanı sıra PDF'leri sayfa gezintisiyle gösterir; tablo dosyaları indirilebilir",
            "Genişliğe sığdır, Yüksekliğe sığdır ve elle yakınlaştırma; kaydırmak için sürükleyin",
            "Yakınlaştırmak için Ctrl/Cmd + ve −, sıfırlamak için Ctrl/Cmd + 0",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Onaylama ve reddetme">
        <Lead>
          Onaylamak, düzenlemelerinizi Run&apos;a katar ve onu sonraki adımlara bırakır. Reddetmek
          Run&apos;ı iptal eder ve hiçbir şey teslim etmez. Her iki karar da o Run için kesindir:
          duraklatma tek seferlik bir kapıdır, ileri geri değiştirebileceğiniz bir durum değildir.
        </Lead>
        <DataTable
          head={["Karar", "Run'a ne olur", "Ne teslim edilir"]}
          rows={[
            [
              "Onayla",
              "Düzenlediğiniz tablo çıkarılan çıktının yerini alır ve Run, HITL Onaylandı rozetiyle Tamamlandı durumuna kadar devam eder.",
              <Fragment key="f4">
                Flow&apos;un yapacak şekilde yapılandırıldığı her şey: e-posta çıktısı, webhook,{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink> dışa aktarımı, form doldurma ve bağlı
                bir <DocLink href="/docs/agents">Agent</DocLink>; hepsi onaylanan verilerle.
              </Fragment>,
            ],
            [
              "Reddet",
              "Run, HITL Reddedildi rozetiyle İptal edildi durumuna geçer ve gerekçeniz (isteğe bağlı ama önerilir) kaydedilir.",
              "Hiçbir şey. E-posta yok, webhook yok, Bucket satırı yok, Agent çalıştırması yok.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="İlk karar geçerlidir">
          Atanan her inceleyicinin onay vermesi gerekmez. İlk onay veya ret Run&apos;ı sonuçlandırır;
          ikinci bir inceleyici Run&apos;ı açık tutuyorsa, Run artık onay beklemediği için onun kararı
          reddedilir. Güncel durumu görmek için kuyruğu yenileyin.
        </InfoBox>
        <p>
          Run&apos;ın sayfası kimin karar verdiğini gösterir (<strong>Onaylayan</strong> veya{" "}
          <strong>Reddeden</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="İnceleme bekleyen diğer öğeler">
        <Lead>
          Matcher&apos;ların, Inspector&apos;ların ve Filler&apos;ların kendi inceleme ayarları vardır
          ve duraklatılan öğeleri, aynı &ldquo;ilk karar geçerlidir&rdquo; kuralı ve aynı denetim
          iziyle aynı kuyruğa düşer.
        </Lead>
        <DataTable
          head={["Öğe", "Ne zaman duraklar", "İnceleyici ne yapar"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Eşleştirme</DocLink>,
              "Matcher için insan incelemesi açıksa: her eşleştirmede.",
              "Belgeler arasındaki satırların yapay zekâ tarafından yapılan eşleşmesini kontrol eder ve düzeltir, satırları hariç tutabilir, ardından onaylar veya reddeder.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Denetim</DocLink>,
              "Inspector için insan incelemesi açıksa veya başarısız bir kontrol, başarısızlık eylemleri aracılığıyla inceleme isterse.",
              "Başarısız kontrollerden bir gerekçeyle feragat eder, ardından kararı kesinleştirmek için onaylar veya denetimi iptal etmek için reddeder.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Doldurma</DocLink>,
              "Filler için insan incelemesi açıksa veya eşlenmiş İnsan doldurması alanları varsa.",
              "Doldurulan formları inceler, İnsan doldurması değerlerini yazar, ardından formları yayınlamak için onaylar veya reddeder.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Kimler inceleyebilir">
        <Lead>
          Bir Flow Run&apos;ını yalnızca inceleyici olarak atanan kişiler onaylayabilir veya
          reddedebilir. Yönetici olmak tek başına yeterli değildir: inceleyici listesinde olmayan bir
          Yönetici, Run&apos;ı kuyruğunda görmez ve onaylayamaz.
        </Lead>
        <BulletList
          items={[
            "Flow inceleyici listelerini bir Sahip veya Yönetici yönetir",
            "Bir Cleaner'ın İnsan incelemesi eyleminin ve her İnsan Girdisi alanının kendi inceleyicileri vardır; bunlar Flow'unkilerle birleştirilir",
            "Rolü ne olursa olsun her üye inceleyici olabilir",
            "Yalnızca HITL rolü inceleyiciler için tasarlanmıştır: bu üyeler yalnızca İnsan incelemesi kuyruğunu görür ve inceleme yapabilir, ancak başka hiçbir şeyi çalıştıramaz veya değiştiremez",
          ]}
        />
        <p>
          Her rolün neyi değiştirebileceğini görmek için{" "}
          <DocLink href="/docs/user-roles">kullanıcı rolleri ve izinler</DocLink> sayfasına bakın.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="Yalnızca eklemeli denetim izi">
        <Lead>
          Her inceleme eylemi, zaman damgası ve inceleyicinin kimliğiyle birlikte kalıcı, yalnızca
          eklemeli bir günlüğe yazılır. Kayıtlar düzenlenemez veya silinemez; böylece kimin neyi
          değiştirdiğinin ve verilerin o kişi dokunmadan önce nasıl göründüğünün kaydı incelemeden sonra
          da korunur.
        </Lead>
        <DataTable
          head={["Kaydedilen olay", "Ne zaman yazılır"]}
          rows={[
            ["İnceleyiciler bilgilendirildi", "Run inceleme kuyruğuna girer ve inceleyicilere e-posta gönderilir."],
            ["Hücre düzenlendi", "Bir değer değiştirilir; eski ve yeni değerle birlikte."],
            ["Satır eklendi / satır kaldırıldı", "İnceleyici bir satır ekler veya bir satırı hariç tutar."],
            ["Sütun eklendi / sütun kaldırıldı", "İnceleyici tablonun yapısını değiştirir."],
            ["Onaylandı", "Karar, inceleyici ve kaç düzenleme yapıldığı."],
            ["Reddedildi", "Karar, inceleyici ve verilen gerekçe."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="İnceleme öncesi veriler de saklanır">
          Tavnit, çıktıyı inceleyici dokunmadan önceki hâliyle onaylanan sürümün yanında saklar. Bir
          denetçi, olay günlüğünden yeniden oluşturmak zorunda kalmadan çıkarılan verileri teslim
          edilen sonuçla karşılaştırabilir.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Sorun giderme">
        <DataTable
          head={["Belirti", "Olası neden ve çözüm"]}
          rows={[
            [
              "Flow anahtarı kapalı olmasına rağmen Run'lar duraklıyor",
              "Flow'un Cleaner'ında İnsan incelemesi eylemi içeren bir Koşullu Eylemler kuralı veya bir İnsan Girdisi alanı var.",
            ],
            [
              "Bir Run Onay bekliyor durumunda ama kuyruğumda değil",
              "Onun inceleyici listesinde değilsiniz. Bir Sahip veya Yöneticiden sizi Flow'a (veya Run'ı duraklatan Cleaner kuralına) eklemesini isteyin.",
            ],
            [
              "Onay, yapılandırılmış bir inceleyici olmadığınız gerekçesiyle reddediliyor",
              "Yalnızca atanan inceleyiciler karar verebilir. Hiç inceleyici atanmadıysa Flow'a bir tane ekleyin; Run'ı başka kimse serbest bırakamaz.",
            ],
            [
              "Onay, Run onay beklemediği için reddediliyor",
              "Başka bir inceleyici önce karar verdi. Kuyruğu yenileyin.",
            ],
            [
              "Onay, eksik insan girdisi nedeniyle engelleniyor",
              "Zorunlu bir İnsan Girdisi alanı bazı satırlarda hâlâ boş. Bunları doldurun veya alanı Cleaner'da isteğe bağlı yapın.",
            ],
            [
              "Bağlı Agent çalışmadı",
              "Yalnızca onaydan sonra çalışır. Reddedilen bir Run onu asla başlatmaz.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="İnceleme zaman alır">
          Duraklatılan bir Run gerektiği kadar bekler. Sonuçlar zamana duyarlı bir sürece giriyorsa,
          inceleyicilerin kuyruklarını veya e-postalarını takip ettiğinden emin olun ya da duraklatmayı
          bir Cleaner kuralıyla istisnalara daraltın.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "İncelemeyi bir Cleaner ile koşullu olarak tetikleyin",
            description:
              "Koşullu Eylemler yalnızca bir kuralı ihlal eden Run'ları duraklatır; İnsan Girdisi alanları bir inceleyiciden değer toplar.",
          },
          {
            href: "/docs/user-roles",
            label: "Kullanıcı rolleri ve izinler",
            description: "İnceleyicileri kimlerin atayabileceği ve Yalnızca HITL rolünün neler yapabileceği.",
          },
          {
            href: "/docs/agents",
            label: "Onaylanan verilerle Agent'lar aracılığıyla işlem yapın",
            description: "Bağlı bir Agent yalnızca inceleyici onayladıktan sonra başlar.",
          },
          {
            href: "/docs/webhooks",
            label: "Onaylanan sonuçları webhook'larla teslim edin",
            description: "Bir inceleyici onayladığında neyin tetiklendiği ve reddettiğinde neyin asla tetiklenmediği.",
          },
          {
            href: "/docs/buckets",
            label: "Onaylanan verileri Bucket'larda saklayın",
            description: "Yalnızca bir inceleyicinin onayladığı satırları alan yapılandırılmış tablolar.",
          },
        ]}
      />
    </section>
  );
}
