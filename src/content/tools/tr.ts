import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Türkçe (tr), translated from ./en.ts.
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 *
 * Turkish marks case with suffixes, so besides the DocVocab keys every vocab
 * below carries the inflected forms the base copy uses: {doc_acc} (accusative,
 * "faturayı"), {doc_dat} (dative), {doc_gen} (genitive), {doc_abl} (ablative,
 * "faturadan"), {docs_acc}, {your_doc_acc}, {your_docs_acc} and
 * {all_your_docs_acc}. fillVocab() replaces any key present on the vocab
 * object, so these work like the standard tokens (capitalised too:
 * {Doc_abl}). Every vocab must define all of them.
 */

const INVOICE_VOCAB = {
  doc: "fatura",
  docs: "faturalar",
  a_doc: "bir fatura",
  the_doc: "fatura",
  the_docs: "faturalar",
  your_doc: "faturanız",
  your_docs: "faturalarınız",
  all_your_docs: "tüm faturalarınız",
  all_docs: "tüm faturalar",
  each_doc: "her fatura",
  another_doc: "başka bir fatura",
  this_doc: "bu fatura",
  doc_acc: "faturayı",
  doc_dat: "faturaya",
  doc_gen: "faturanın",
  doc_abl: "faturadan",
  docs_acc: "faturaları",
  your_doc_acc: "faturanızı",
  your_docs_acc: "faturalarınızı",
  all_your_docs_acc: "tüm faturalarınızı",
};

const PDF_VOCAB = {
  doc: "taranmış PDF",
  docs: "taranmış PDF'ler",
  a_doc: "taranmış bir PDF",
  the_doc: "PDF",
  the_docs: "PDF'ler",
  your_doc: "PDF'iniz",
  your_docs: "PDF'leriniz",
  all_your_docs: "tüm PDF'leriniz",
  all_docs: "tüm PDF'ler",
  each_doc: "her PDF",
  another_doc: "başka bir PDF",
  this_doc: "bu PDF",
  doc_acc: "taranmış PDF'i",
  doc_dat: "taranmış PDF'e",
  doc_gen: "taranmış PDF'in",
  doc_abl: "taranmış PDF'ten",
  docs_acc: "taranmış PDF'leri",
  your_doc_acc: "PDF'inizi",
  your_docs_acc: "PDF'lerinizi",
  all_your_docs_acc: "tüm PDF'lerinizi",
};

const PACKING_LIST_VOCAB = {
  doc: "çeki listesi",
  docs: "çeki listeleri",
  a_doc: "bir çeki listesi",
  the_doc: "çeki listesi",
  the_docs: "çeki listeleri",
  your_doc: "çeki listeniz",
  your_docs: "çeki listeleriniz",
  all_your_docs: "tüm çeki listeleriniz",
  all_docs: "tüm çeki listeleri",
  each_doc: "her çeki listesi",
  another_doc: "başka bir çeki listesi",
  this_doc: "bu çeki listesi",
  doc_acc: "çeki listesini",
  doc_dat: "çeki listesine",
  doc_gen: "çeki listesinin",
  doc_abl: "çeki listesinden",
  docs_acc: "çeki listelerini",
  your_doc_acc: "çeki listenizi",
  your_docs_acc: "çeki listelerinizi",
  all_your_docs_acc: "tüm çeki listelerinizi",
};

const BILL_OF_LADING_VOCAB = {
  doc: "konşimento",
  docs: "konşimentolar",
  a_doc: "bir konşimento",
  the_doc: "konşimento",
  the_docs: "konşimentolar",
  your_doc: "konşimentonuz",
  your_docs: "konşimentolarınız",
  all_your_docs: "tüm konşimentolarınız",
  all_docs: "tüm konşimentolar",
  each_doc: "her konşimento",
  another_doc: "başka bir konşimento",
  this_doc: "bu konşimento",
  doc_acc: "konşimentoyu",
  doc_dat: "konşimentoya",
  doc_gen: "konşimentonun",
  doc_abl: "konşimentodan",
  docs_acc: "konşimentoları",
  your_doc_acc: "konşimentonuzu",
  your_docs_acc: "konşimentolarınızı",
  all_your_docs_acc: "tüm konşimentolarınızı",
};

const QUOTE_VOCAB = {
  doc: "teklif",
  docs: "teklifler",
  a_doc: "bir teklif",
  the_doc: "teklif",
  the_docs: "teklifler",
  your_doc: "teklifiniz",
  your_docs: "teklifleriniz",
  all_your_docs: "tüm teklifleriniz",
  all_docs: "tüm teklifler",
  each_doc: "her teklif",
  another_doc: "başka bir teklif",
  this_doc: "bu teklif",
  doc_acc: "teklifi",
  doc_dat: "teklife",
  doc_gen: "teklifin",
  doc_abl: "tekliften",
  docs_acc: "teklifleri",
  your_doc_acc: "teklifinizi",
  your_docs_acc: "tekliflerinizi",
  all_your_docs_acc: "tüm tekliflerinizi",
};

const CONTRACT_VOCAB = {
  doc: "sözleşme",
  docs: "sözleşmeler",
  a_doc: "bir sözleşme",
  the_doc: "sözleşme",
  the_docs: "sözleşmeler",
  your_doc: "sözleşmeniz",
  your_docs: "sözleşmeleriniz",
  all_your_docs: "tüm sözleşmeleriniz",
  all_docs: "tüm sözleşmeler",
  each_doc: "her sözleşme",
  another_doc: "başka bir sözleşme",
  this_doc: "bu sözleşme",
  doc_acc: "sözleşmeyi",
  doc_dat: "sözleşmeye",
  doc_gen: "sözleşmenin",
  doc_abl: "sözleşmeden",
  docs_acc: "sözleşmeleri",
  your_doc_acc: "sözleşmenizi",
  your_docs_acc: "sözleşmelerinizi",
  all_your_docs_acc: "tüm sözleşmelerinizi",
};

const RECEIPT_VOCAB = {
  doc: "fiş",
  docs: "fişler",
  a_doc: "bir fiş",
  the_doc: "fiş",
  the_docs: "fişler",
  your_doc: "fişiniz",
  your_docs: "fişleriniz",
  all_your_docs: "tüm fişleriniz",
  all_docs: "tüm fişler",
  each_doc: "her fiş",
  another_doc: "başka bir fiş",
  this_doc: "bu fiş",
  doc_acc: "fişi",
  doc_dat: "fişe",
  doc_gen: "fişin",
  doc_abl: "fişten",
  docs_acc: "fişleri",
  your_doc_acc: "fişinizi",
  your_docs_acc: "fişlerinizi",
  all_your_docs_acc: "tüm fişlerinizi",
};

const SPREADSHEET_VOCAB = {
  doc: "elektronik tablo",
  docs: "elektronik tablolar",
  a_doc: "bir elektronik tablo",
  the_doc: "elektronik tablo",
  the_docs: "elektronik tablolar",
  your_doc: "elektronik tablonuz",
  your_docs: "elektronik tablolarınız",
  all_your_docs: "tüm elektronik tablolarınız",
  all_docs: "tüm elektronik tablolar",
  each_doc: "her elektronik tablo",
  another_doc: "başka bir elektronik tablo",
  this_doc: "bu elektronik tablo",
  doc_acc: "elektronik tabloyu",
  doc_dat: "elektronik tabloya",
  doc_gen: "elektronik tablonun",
  doc_abl: "elektronik tablodan",
  docs_acc: "elektronik tabloları",
  your_doc_acc: "elektronik tablonuzu",
  your_docs_acc: "elektronik tablolarınızı",
  all_your_docs_acc: "tüm elektronik tablolarınızı",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc_abl} Excel'e, ücretsiz: her {doc_gen} kalemlerini yapay zekayla çıkarın",
    description:
      "Bir {doc_acc} PDF ya da fotoğraf olarak yükleyin, kalemlerini Excel tablosu olarak alın: açıklama, miktar, birim fiyat ve toplam. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
    label: "{Doc_abl} Excel'e",
    h1: "{Doc_acc} Excel'e dönüştürün",
    intro:
      "PDF'i ya da fotoğrafı yükleyin. Tavnit başlığı ve tablonun her satırını okur, size elektronik tablo olarak geri verir. Tedarikçiye özel şablon yok: aynı araç {all_your_docs} için çalışır.",
    trust: ["PDF, JPG veya PNG · en fazla 5 sayfa", "Günde {limit} ücretsiz belge", "Her şey 24 saat sonra silinir"],
    drop: {
      title: "{Your_doc_acc} buraya bırakın",
      hint: "ya da bilgisayarınızdan bir dosya seçin",
      choose: "Dosya seçin",
      sample: "Örnek bir {doc} ile deneyin",
      formats: "PDF, JPG veya PNG · en fazla 4 MB ve 5 sayfa",
    },
    stages: [
      "Belge yükleniyor",
      "Başlık okunuyor",
      "Kalem tablosu bulunuyor",
      "Sütunlar sıralanıyor",
      "Neredeyse bitti",
    ],
    result: {
      heading: "Tamamlandı: {file}",
      rowWord: ["satır", "satır"],
      pageWord: ["sayfa", "sayfa"],
      summary: "{rows} · {pages}",
      truncated: "{total} satırın {shown} tanesi gösteriliyor. Excel de aynı {shown} satırı içerir.",
      readyIn: "{s} sn'de hazır",
      sum: "Toplam",
      viewer: "Belgeniz",
      openDocument: "Belgeyi görüntüleyin",
      closeDocument: "Kapat",
      retention: "24 saat sonra kendiliğinden silinir",
      hideColumn: "Sütunu kaldırın",
      hiddenCols: ["1 sütun kaldırıldı. Excel'e dahil edilmez.", "{n} sütun kaldırıldı. Excel'e dahil edilmez."],
      restoreAll: "Tümünü geri getirin",
      restoreOne: "{col} sütununu geri getirin",
      ghostColumn: "+ Sizin alanınız",
      ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: sipariş numarası, vade tarihi, masraf merkezi…",
      flowNote: "Bu {fields} sütun, sabit bir {doc} Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
      flowNoteCta: "Nasıl olduğunu görün",
      download: "Excel'i indirin",
      downloading: "Dosya hazırlanıyor",
      another: "{Another_doc} işleyin",
      empty: "Bu belgede kalem tablosu bulamadık. Satır başına miktar ve fiyat içeren bir {doc} deneyin.",
    },
    errors: {
      empty: "Dosya boş.",
      too_large: "Dosya 4 MB'tan büyük. Sıkıştırın ya da yalnızca {doc} sayfalarını yükleyin.",
      unsupported: "Yalnızca PDF, JPG veya PNG dosyaları kabul edilir.",
      unreadable: "Bu PDF'i açamadık. Parolayla korunuyorsa parolayı kaldırıp tekrar deneyin.",
      too_many_pages: "Ücretsiz sürüm belge başına en fazla 5 sayfa işler.",
      captcha: "Bot olmadığınızı doğrulayamadık. Sayfayı yenileyip tekrar deneyin.",
      quota: "Bugünkü {limit} ücretsiz belgenizi kullandınız. Yarın yenilenir; hemen devam etmek için bir hesap da oluşturabilirsiniz.",
      daily_cap: "Ücretsiz araç bugünkü kapasitesine ulaştı. Yarın tekrar gelin ya da bir hesap oluşturup hemen devam edin.",
      unavailable: "Araç şu anda kullanılamıyor. Birkaç dakika sonra tekrar deneyin.",
      backend: "Belge işlenirken bir sorun oluştu. Tekrar deneyin.",
      failed: "Bu belgeden veri çıkaramadık. Başka bir {doc} deneyin ya da örneği kullanın.",
      timeout: "Bu işlem normalden uzun sürüyor. Biraz bekleyip tekrar deneyin.",
      forbidden: "Bu işleme buradan izin verilmiyor.",
      bad_request: "Dosya eksik ya da okunamadı.",
    },
    auth: {
      title: "İndirmek için ücretsiz bir hesap oluşturun",
      body: "Excel hemen iner. Bir hesapla aynı işlemi {all_your_docs} için tek seferde de yapabilirsiniz.",
      google: "Google ile devam edin",
      or: "ya da e-postanızla",
      signin: "Giriş yapın",
      signup: "Hesap oluşturun",
      name: "Ad",
      email: "E-posta",
      password: "Şifre",
      submitSignin: "Giriş yapıp indirin",
      submitSignup: "Hesap oluşturup indirin",
      switchToSignin: "Zaten bir hesabım var",
      switchToSignup: "Henüz bir hesabım yok",
      checkEmail:
        "Hesabınızı onaylamanız için bir e-posta gönderdik. E-postayı açın; geri döndüğünüzde Excel indirilmeye hazır olacak.",
      existing: "Bu e-postaya ait bir hesap zaten var. İndirmek için giriş yapın.",
      forgot: "Şifremi unuttum",
      close: "Kapat",
      generic: "Kaydı tamamlayamadık. E-postayı ve şifreyi kontrol edip tekrar deneyin.",
    },
    next: {
      heading: "Peki sonra?",
      lead: "Şimdi tek bir {doc} işlediniz. Bir hesapla gelen her {doc} aynı şekilde işlenir ve satırlar bir Excel'de kalmaz: kendiliğinden yoluna devam eder.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Veri çıkarma Flow'u",
      items: [
        {
          short: "Gelen kutunuza düşer",
          via: "e-posta",
          title: "Sonuç gelen kutunuza düşer",
          body: "Veri çıkarma bittiğinde Tavnit, Flow'da belirlediğiniz adreslere satırları rows.csv eki olarak e-postayla gönderir. İnceleme açıksa e-posta onayı bekler.",
          linkLabel: "E-posta çıktısı",
          href: "/docs/email-integration",
          scene: [{ label: "Veri çıkarma biter" }, { label: "Tavnit e-postayı hazırlar" }, { label: "Seçtiğiniz kişiye ulaşır", result: "rows.csv ekli" }],
        },
        {
          short: "ERP'nize ulaşır",
          via: "webhook",
          title: "Webhook ile ERP'nize ulaşır",
          body: "Bir çalıştırma tamamlandığında Tavnit, satırları ve run_id'yi verdiğiniz URL'ye POST eder. Zapier, Make ve n8n bunu kendi webhook tetikleyicileriyle alır; yerel bir entegrasyona gerek yoktur.",
          linkLabel: "Webhook'lar",
          href: "/docs/webhooks",
          scene: [{ label: "Çıkarılan satırlar" }, { label: "Satırlar ve run_id ile tek bir POST" }, { label: "Sisteminizde görünürler", result: "6 satır, kimse yazmadan" }],
        },
        {
          short: "Kaydetmeden önce inceleme",
          via: "inceleme",
          title: "Kaydedilmeden önce bir kişi onaylar",
          body: "Flow için incelemeyi açtığınızda her çalıştırma duraklar. İnceleyen kişi düzenlenebilir tabloyu orijinal belgenin yanında görür: hücreleri düzeltir, satırları hariç tutar, sütun ekler ve onaylar ya da reddeder. E-posta, webhook ve Bucket ancak onaydan sonra gönderilir; her karar kayıt altındadır. Başka hiçbir şeyi görmemesi gereken kişiler için yalnızca inceleme yetkisi olan bir rol de vardır.",
          linkLabel: "İnsan incelemesi",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "Çalıştırma inceleme için duraklar" }, { label: "Bir kişi belgenin yanında düzeltir" }, { label: "Onaylandı: ancak o zaman teslim edilir", result: "1 hücre düzeltildi · kayıtlı" }],
        },
        {
          short: "Teklifleri karşılaştırın",
          via: "Matcher",
          title: "Birden fazla teklifi satır satır karşılaştırın",
          body: "Bir Matcher aynı Flow'un birkaç çalıştırmasını, örneğin üç tedarikçi teklifini alır, satırları açıklamaya göre eşleştirir ve her satırdaki en ucuz seçeneği Champion sütununda işaretler.",
          linkLabel: "Tedarikçi teklifleri",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Üç teklif, tek Flow" }, { label: "Matcher satırları eşleştirir" }, { label: "Champion sütunu: her satırda en iyisi", result: "Tedarikçi B, 5 satırın 4'ünü kazanır" }],
        },
        {
          short: "Kurallar ve doğrulamalar",
          via: "Cleaner",
          title: "Bir Cleaner her satırı temizler ve doğrular",
          body: "Tarih biçimi, sayı biçimi, hesaplanan alanlar, yayımlanan kurlarla döviz çevirisi ve koşullu eylemler: bir satır kontrolden geçemezse incelemeye, e-postaya ya da webhook'a gönderin.",
          linkLabel: "Cleaner'lar",
          href: "/docs/cleaners",
          scene: [{ label: "Veriler geldiği gibi" }, { label: "Cleaner kurallarınızı uygular" }, { label: "Temiz, hatalar işaretli", result: "tarih, sayı ve toplam yerli yerinde" }],
        },
        {
          short: "Bir Agent portalı açar",
          via: "Agent",
          title: "Bir Agent tedarikçi portalına giriş yapar",
          body: "Görevi sade bir dille yazarsınız; yanına bir başlangıç URL'si ve modelin asla görmediği bir kasada saklanan kimlik bilgileri eklersiniz. Veri çıkarma tamamlandığında Agent belgenin alanlarıyla kendiliğinden başlar ve istediğinizi tipli veri olarak geri getirir: fiyat, teslim süresi, dosyalar.",
          linkLabel: "Agent'lar",
          href: "/docs/agents",
          scene: [{ label: "Veri çıkarma biter" }, { label: "Agent portalda gezinir" }, { label: "Verileri tipli olarak getirir", result: "fiyat 18.50 · teslim süresi 5 gün" }],
        },
        {
          short: "Verileriniz hakkında sorular",
          via: "Bucket",
          title: "{Your_docs} hakkında soru sorun",
          body: "Satırlar bir Bucket'ta saklanır. Sade bir dille sorarsınız; Tavnit soruyu bir plana (toplam, filtre, ay) dönüştürür, veritabanında çalıştırır ve rakamla yanıt verir. Hesabı asla model yapmaz.",
          linkLabel: "Bucket'lar",
          href: "/docs/buckets",
          scene: [{ label: "\"Ağustos'ta Istmo'dan ne kadarlık alım yaptık?\"" }, { label: "Bir plan: toplam · tedarikçi · ay" }, { label: "Rakam, veritabanında hesaplanır", result: "4 {doc} genelinde $12,480" }],
        },
      ],
      hint: "Ne olduğunu görmek için bir seçeneğe ya da Tavnit çipine dokunun.",
      flow: {
        title: "Flow: sütunlara siz karar verirsiniz",
        body: "Flow, tek bir belge türünün tanımıdır: çıkarmak istediğiniz alanların listesi. Her alanın bir adı, bir veri tipi vardır; belgede bir kez mi yoksa her satırda mı yer aldığı belirtilir ve gerektiğinde nereye bakılacağına dair bir ipucu eklenir. Etkinleştirdiğinizde gelen her belge tam olarak bu alanlar için okunur; çıkan tabloda her alan için bir sütun bulunur. Bu araç {fields} alanlı sabit bir {doc} Flow'u kullanır. Hesabınızda alan ekler, kaldırır, yeniden adlandırır ve başka herhangi bir belge için Flow oluşturursunuz. Şablon yok, koordinat yok.",
        linkLabel: "Flow nasıl tanımlanır?",
        href: "/docs/flows",
        scene: [{ label: "Alanları iki grupta tanımlarsınız: belge ve tablo" }, { label: "Başlığı bir kez, tabloyu satır satır okur" }, { label: "Her kalem bir satır: belge değerleri tekrarlanır, tablo değerleri değişir", result: "5 alan → 5 sütun" }],
        name: "{Doc}",
        kinds: ["Belge alanları", "Tablo alanları"],
        add: { name: "purchase_order", type: "Metin", hint: "\"PO\" yazısının yanında · ör. PO-2291", save: "Kaydet", value: "PO-2291" },
        activate: "Etkin",
      },
      inputs: {
        show: "{Your_doc} nasıl gelir?",
        hide: "Girişleri gizleyin",
        items: [
          {
            short: "E-postayla",
            via: "Flow başına bir adres",
            title: "E-postayı iletin, o kadar",
            body: "Her Flow'un <flow>-lite-<id>@mg.tavnit.io gibi kendine ait bir adresi vardır. {Doc} ekli e-postayı iletin; her ek bir çalıştırmaya dönüşür. Konu ve gövde asla okunmaz.",
            linkLabel: "E-postayla alım",
            href: "/docs/email-integration",
            scene: [{ label: "E-postayı ekiyle birlikte iletirsiniz" }, { label: "Flow'un adresine ulaşır" }, { label: "Her ek bir çalıştırmadır", result: "1 ek → 1 çalıştırma" }],
          },
          {
            short: "Elle yükleme",
            via: "uygulamadan",
            title: "Uygulamadan yükleyin",
            body: "PDF'i ya da fotoğrafı Flow'a bırakın, çalıştırma hemen başlar. Burada yaptığınızın aynısı; üstelik kendi hesabınızla ve günlük sınır olmadan.",
            linkLabel: "Flow'lar",
            href: "/docs/flows",
            scene: [{ label: "Dosyayı Flow'a bırakırsınız" }, { label: "Çalıştırma başlar" }, { label: "Saniyeler içinde satırlar", result: "buradaki gibi, sınırsız" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Sisteminizden, API üzerinden",
            body: "API anahtarınızla dosyayı ve flow_id'yi tek bir POST isteğiyle /api/runs/process adresine gönderin. Yanıt 202 ve run_id ile gelir; çalıştırma tamamlanana kadar /api/runs/<id> adresine GET isteği atarsınız ve satırlar geri gelir.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "Dosya ve flow_id ile POST" }, { label: "202: run_id, kuyrukta" }, { label: "Tamamlanana kadar GET", result: "status: completed · 6 satır" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "tek bir HTTP çağrısı",
            title: "Zapier, Make veya n8n üzerinden",
            body: "Yerel bir uygulama yok, gerekmiyor da: bir HTTP adımı (Zapier'de Custom Request, Make'te Make a request) dosyayı /api/runs/process adresine gönderir. Satırlar bir webhook aracılığıyla aynı aracın tetikleyicisine geri döner.",
            linkLabel: "Entegrasyonlar",
            href: "/integrations",
            scene: [{ label: "Senaryonuzda bir HTTP adımı" }, { label: "Tavnit işler" }, { label: "Webhook satırları geri gönderir", result: "yeniden Zapier, Make veya n8n'de" }],
          },
          {
            short: "Tek PDF'te birkaç belge",
            via: "bir Splitter ayırır",
            title: "Tek bir PDF'te birden fazla belge",
            body: "Bir Splitter her belgenin nerede başladığını bulur, her bölümü tanımladığınız türlere göre sınıflandırır ve her birini kendi Flow'una gönderir. İçinde üç {doc} bulunan tek bir tarama, üç ayrı çalıştırma olarak sonuçlanır.",
            linkLabel: "Splitter'lar",
            href: "/docs/splitters",
            scene: [{ label: "İçinde üç {doc} olan bir PDF" }, { label: "Splitter keser ve sınıflandırır" }, { label: "Üç çalıştırma, her {doc} için bir tane", result: "3 bölüm · 3 çalıştırma" }],
          },
        ],
      },
      replay: "Tekrar oynat",
      tryIt: "Bunu Tavnit'te deneyin",
      tryItSignedIn: "Bunu hesabımda yap",
      primary: "Ücretsiz hesap oluşturun",
      primarySignedIn: "Tavnit'e gidin",
      sameLogin: "Zaten bir hesabınız var. Tavnit'e aynı giriş bilgileriyle ({email}) giriş yapın; farklı bir site olduğu için bir kez daha soracaktır.",
      secondary: "Demo planlayın",
    },
    cleaners: {
      heading: "Bir Cleaner ile şunları yapabilirsiniz…",
      lead: "Veri çıkarmadan sonra her {doc} üzerinde kendiliğinden çalışan basit kurallar. Kendi verilerinizle dört fikir:",
      tag: "Cleaner'lar",
      ideas: [
        { icon: "date", title: "Tarih için tek bir yazım", from: "{date}", to: "{iso}", note: "{each_doc} için aynı biçim" },
        { icon: "sum", title: "Kalemler ara toplamı tutmalı", from: "kalemler {sum}", to: "ara toplam {subtotal}", note: "tutmazsa kimse görmeden ödemez", check: "sum" },
        { icon: "money", title: "Kendi para biriminize çevirin", from: "{total} {currency}", to: "sizin para biriminiz", note: "{doc} tarihindeki kurla" },
        { icon: "approve", title: "Belirli bir tutarın üzerinde onay", from: "toplam {total}", to: "ödemeden önce onay", note: "{threshold} tutarını aştığında" },
      ],
      ok: "Uyuşuyor",
      off: "İncelenecek",
      outro: "Cleaner'lar Tavnit'te, sizin için önemli olan alanlarla kurulur. Bunlar yalnızca örnek.",
      cta: "Ücretsiz hesap oluşturup deneyin",
      ctaSignedIn: "Tavnit'i açıp deneyin",
      learn: "Cleaner nedir?",
    },
    after: {
      title: "Excel'iniz hazır",
      lead: "Bu sonuç {fields} alanlı sabit bir Flow'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit bunu her {doc} için yaptığında şöyle görünür:",
      close: "Kapat",
      saved: "indirilenlere kaydedildi",
    },
    how: {
      heading: "Nasıl çalışır?",
      steps: [
        {
          title: "{Doc_acc} yükleyin",
          body: "PDF, fotoğraf ya da tarama. Her tedarikçi, her dil, her düzen.",
        },
        {
          title: "Tavnit okur",
          body: "Başlığı (tedarikçi, numara, tarih, toplamlar) ve miktarlarla fiyatları içeren kalem tablosunu bulur.",
        },
        {
          title: "İnceleyin ve indirin",
          body: "Tablo ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız.",
        },
      ],
    },
    faqHeading: "Sık sorulan sorular",
    faqs: [
      {
        q: "Ücretsiz sürüm neleri kapsıyor?",
        a: "Günde {limit} belge ve ekranda eksiksiz sonuç. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
      },
      {
        q: "Hangi biçimleri kabul ediyor?",
        a: "PDF (metin ya da taranmış), JPG ve PNG; en fazla 4 MB ve 5 sayfa. {Your_doc} daha uzunsa parçalar halinde yükleyin ya da bir hesap oluşturun.",
      },
      {
        q: "Başka sütunlar seçebilir miyim?",
        a: "Burada hayır: bu araç 13 alanlı sabit bir {doc} Flow'u kullanır. Hesabınızda {docs} ya da başka herhangi bir belge için, ihtiyacınız olan alanlarla kendi Flow'larınızı oluşturursunuz: belge başına (sipariş numarası, vade tarihi, masraf merkezi) ya da satır başına (ürün kodu, indirim). Şablon yok: alanı tarif edersiniz ve gerekirse nereye bakılacağına dair bir ipucu verirsiniz.",
      },
      {
        q: "Her tedarikçi için şablon kurmam gerekir mi?",
        a: "Hayır. Tavnit şablon kullanmaz: her belgeyi geldiği gibi okur; tedarikçi {doc} tasarımını yarın değiştirse bile.",
      },
      {
        q: "Dosyama ne oluyor?",
        a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosya ve çıkarılan satırlar otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeyi ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
      },
      {
        q: "İndirmek için neden hesap gerekiyor?",
        a: "Çünkü ücretsiz sürüm denemek içindir. Bir hesapla aynı veri çıkarmayı {all_your_docs} için çalıştırabilir, belgeleri e-postayla alabilir ve sonucu sisteminize gönderebilirsiniz.",
      },
      {
        q: "Her ülkeden {docs} ile çalışır mı?",
        a: "Evet. İngilizce, İspanyolca ve diğer dillerdeki, vergisi satır satır gösterilen ya da gösterilmeyen {docs} ile çalışır. ABD, Panama, Meksika ve Kolombiya başta olmak üzere birçok ülkeden {docs} üzerinde test edilmiştir.",
      },
      {
        q: "Bunu nasıl otomatik hale getiririm?",
        a: "Bir hesap oluşturun, istediğiniz alanlarla bir Flow kurun ve {docs_acc} Flow'un e-posta adresine iletin ya da API, webhook'lar, Zapier, Make veya n8n ile bağlayın. Sonuç, kimse elle yazmadan ERP'nize ya da Google Sheets'e ulaşır.",
      },
    ],
  },

  hub: {
    title: "Ücretsiz Yapay Zeka Belge Araçları: Faturadan Excel'e ve Fazlası",
    description:
      "Tavnit'in kendi motoru üzerine kurulu, tek işe odaklanan ücretsiz araçlar: faturayı Excel'e dönüştürün ve daha fazlası. Şablon yok, sonucu görmek için kayıt gerekmez.",
    h1: "Ücretsiz araçlar",
    intro:
      "Her araç tek bir belge üzerinde tek bir iş yapar ve size gerçek sonucu gösterir. Şirketlerin belgelerini Tavnit ile otomatikleştirmek için kullandığı motorun aynısıyla çalışır, her seferinde bir belge.",
    breadcrumbHome: "Ana sayfa",
    breadcrumbHub: "Araçlar",
    groups: { extract: "Belgeden Excel'e", compare: "Belgeleri karşılaştırın", split: "Taramaları düzenleyin", clean: "Tabloları temizleyin" },
    outro: "Hepsi, şirketlerin belgelerini Tavnit ile otomatikleştirmek için kullandığı motorun aynısıyla çalışır. Bunun tüm belgeleriniz için kendiliğinden gerçekleşmesini istediğinizde hesabınız hazır.",
    outroCta: "Ücretsiz hesap oluşturun",
  },

  shell: {
    lite: "Lite",
    tools: "Araçlar",
    site: "Tavnit hakkında",
    cta: "Ücretsiz hesap oluşturun",
    ctaSignedIn: "Tavnit'e gidin",
    nav: { product: "Ürün", useCases: "Kullanım alanları", docs: "Dokümantasyon" },
    demo: "Demo planlayın",
    signin: "Giriş yapın",
    allTools: "Tüm araçları görün",
    allToolsHint: "Ücretsiz. Kayıt olmadan gerçek sonucu görün; bir hesapla yanınıza alın.",
    groups: { extract: "Belgeden Excel'e", compare: "Belgeleri karşılaştırın", split: "Taramaları düzenleyin", clean: "Tabloları temizleyin" },
    account: {
      signedInAs: "Oturum açan hesap",
      open: "Tavnit'e gidin",
      openHint: "Platformun tamamı: Flow'lar, otomasyonlar ve tüm hacminiz",
      signOut: "Çıkış yapın",
      menu: "Hesabınız",
    },
    auth: {
      title: "Ücretsiz hesabınızı oluşturun",
      body: "Aynı hesapla buradaki sonuçlarınızı indirir, Tavnit'te de tüm belgelerinizi otomatikleştirirsiniz.",
      submitSignin: "Giriş yapın",
      submitSignup: "Hesap oluşturun",
    },
    menu: "Menü",
    close: "Kapat",
    privacy: "Gizlilik",
    terms: "Koşullar",
    contact: "İletişim",
    rights: "Tavnit. Ürünün kendi motoru üzerine kurulu ücretsiz araçlar.",
  },

  related: {
    heading: "Tek bir belge değil, hepsi söz konusu olduğunda",
    lead: "Bu araç her seferinde tek bir belge işler. Aynı motor belgeleri e-posta ya da API ile alabilir, ekibinizin incelemesinden geçirebilir ve sistemlerinize teslim edebilir.",
    useCase: "Nasıl otomatikleştirilir:",
    guide: "Rehber:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Faturadan Excel'e Ücretsiz Dönüştürücü: Kalemleri Yapay Zeka Okur" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Ücretsiz Fatura Kalemi Çıkarıcı: Satırlar Excel'e",
        description:
          "Fatura kalemlerini (açıklama, miktar, birim fiyat ve tutar) her satırda tedarikçi, numara ve tarihle birlikte Excel satırları olarak çıkarın. PDF ya da fotoğraf; şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Fatura kalemi çıkarıcı",
        h1: "Bir faturanın kalemlerini çıkarın",
        intro:
          "Faturadaki tablonun her satırı (açıklama, miktar, birim, birim fiyat ve tutar) ayrı bir satıra dönüşür; başlık bilgileri (tedarikçi, numara, tarih, toplamlar) her satırda tekrarlanır. Muhasebe ve borç hesapları ekipleri kalemleri kaydetmek, mutabakat yapmak ya da satın alma siparişiyle karşılaştırmak için tam olarak bu yapıya ihtiyaç duyar. PDF, tarama ve fotoğraflarla çalışır; tedarikçiye özel şablon gerekmez.",
        drop: {
          title: "Kalemlerine ihtiyacınız olan faturayı buraya bırakın",
          sample: "Altı kalemli bir faturayla deneyin",
        },
        stages: [
          "Fatura yükleniyor",
          "Başlık okunuyor",
          "Kalem tablosu tespit ediliyor",
          "Her satır ayrıştırılıyor",
          "Neredeyse bitti",
        ],
        result: {
          flowNote: "Bu {fields} sütun, sabit bir fatura Flow'unun alanlarıdır: başlık ve kalemler. Kendi hesabınızda alanları siz seçersiniz.",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            {
              title: "Faturayı yükleyin",
              body: "Metin PDF, tarama ya da fotoğraf. Tek sayfa ya da en fazla 5 sayfa.",
            },
            {
              title: "Tavnit kalemleri ayırır",
              body: "Çizgili kenarlıklar olmasa bile tabloyu bulur, her satırı (açıklama, miktar, birim, fiyat, tutar) okur ve başlık bilgilerini ekler.",
            },
            {
              title: "İnceleyin ve indirin",
              body: "Ekranda her kalem için bir satır. Ücretsiz bir hesapla, ihtiyacınız olmayan sütunları çıkararak Excel olarak yanınıza alırsınız.",
            },
          ],
        },
        faqs: [
          {
            q: "Fatura kalemi nedir?",
            a: "Ayrıntı tablosunun her satırı: açıklaması, miktarı, birimi, birim fiyatı ve tutarıyla bir ürün ya da hizmet. Alt kısımdaki toplamlar (ara toplam, vergi, genel toplam) kalem değildir; her satırda tekrarlanan başlık alanları olarak çıkar.",
          },
          {
            q: "Tedarikçi ve numara neden her satırda görünüyor?",
            a: "Her satır kendi başına anlam taşısın diye: birçok faturanın kalemlerini, hangi faturadan geldiklerini kaybetmeden tek bir sayfada filtreleyebilir, toplayabilir ya da yapıştırabilirsiniz. Bir ERP'nin, pivot tablonun ya da mutabakatın beklediği yapı budur.",
          },
          {
            q: "Tablo birkaç sayfaya yayıldığında da çalışır mı?",
            a: "Evet. Tavnit tabloyu bir sayfadan diğerine takip eder ve sütun başlığını satırmış gibi tekrarlamadan tüm kalemleri sırasıyla döndürür. Ücretsiz sürüm en fazla 5 sayfa işler.",
          },
          {
            q: "Alt satıra kayan açıklamalar ya da birleştirilmiş hücreler ne olur?",
            a: "Bir sonraki satırda devam eden açıklama kendi kalemine eklenir; birleştirilmiş bir hücre kapsadığı satırlara uygulanır. Tablonun çizgilerine değil, hangi miktarın, fiyatın ve tutarın hangi açıklamaya ait olduğunu okumaya dayanırız.",
          },
          {
            q: "Satır bazındaki indirimler ve vergiler nasıl ele alınıyor?",
            a: "Her satırın tutarı basıldığı gibi çıkar. Faturada kendi satırında gösterilen bir indirim ya da vergi kaleme dönüştürülmez; belge toplamı olarak ele alınır. Faturalarınız vergiyi satır satır gösteriyorsa, bir hesapla bu alanı Flow'a ekleyebilirsiniz.",
          },
          {
            q: "Kalemleri satın alma siparişimle karşılaştırabilir miyim?",
            a: "Evet, ücretsiz sipariş ve fatura kontrolüyle (/tools/po-vs-invoice-check): iki belgeyi yükleyin; fiyatı ya da miktarı farklı olan, eksik olan ve sonradan eklenen satırları işaretler.",
          },
          {
            q: "Her tedarikçi için şablon gerekir mi?",
            a: "Hayır. Tavnit her faturayı geldiği gibi okur; tedarikçi tasarımı yarın değiştirse de çalışmaya devam eder. Farklı ülkelerden ve dillerden faturaları aynı kolaylıkla işlemesinin nedeni de budur.",
          },
          {
            q: "Bunu yüzlerce fatura için nasıl yaparım?",
            a: "Bir hesapla bu alanların aynısıyla (ya da kendi alanlarınızla) bir Flow oluşturur, faturaları onun e-posta adresine iletir ya da API ile gönderirsiniz. Her fatura, kimse elle yazmadan satırlar halinde ERP'nize, Google Sheets'e ya da bir Bucket'a ulaşır.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "fatura"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Ücretsiz Sipariş ve Fatura Kontrolü: Satır Satır Eşleştirme",
        description:
          "Satın alma siparişini ve faturayı yükleyin, Tavnit ikisini satır satır eşleştirsin: fiyat farkları, miktar farkları, faturada eksik olan ve siparişte bulunmayan satırlar. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Sipariş ve fatura kontrolü",
        h1: "Bir faturayı satın alma siparişiyle karşılaştırın",
        intro:
          "Satın alma siparişini ve faturayı PDF ya da fotoğraf olarak yükleyin. Tavnit ikisini de okur, siparişteki her satırı, metin farklı olsa bile aynı anlama gelen fatura satırıyla eşleştirir ve fiyatın nerede değiştiğini, miktarın nerede değiştiğini, faturada neyin eksik olduğunu ve neyin siparişte hiç yer almadığını işaretler.",
        trust: ["Bir sipariş ve bir fatura · PDF ya da fotoğraf", "Günde {limit} ücretsiz belge", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Belgeyi buraya bırakın",
          sample: "Örnek bir sipariş ve faturayla deneyin",
          formats: "PDF, JPG veya PNG · belge başına en fazla 4 MB ve 5 sayfa",
        },
        stages: ["Belgeler yükleniyor", "Satın alma siparişi okunuyor", "Fatura okunuyor", "Satırlar eşleştiriliyor", "Neredeyse bitti"],
        result: {
          another: "Başka belgeleri karşılaştırın",
          download: "Karşılaştırmayı Excel olarak indirin",
          flowNote: "Bu {fields} sütun, sabit bir satın alma belgesi Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: masraf merkezi, teslim alma numarası, proje…",
        },
        errors: {
          no_lines: "İki belgeden birinde miktar ve fiyat içeren satır bulamadık. Kalem tablosu olan bir satın alma siparişi ve bir fatura olduklarını kontrol edin.",
          not_ready: "Belgeleri hâlâ okuyoruz. Biraz bekleyip tekrar deneyin.",
          failed: "Belgelerden birini okuyamadık. Başka dosyalar ya da örnekleri deneyin.",
          too_large: "Dosyalardan biri 4 MB'tan büyük. Sıkıştırın ya da yalnızca belge sayfalarını yükleyin.",
        },
        next: {
          lead: "Şimdi bir sipariş ve bir fatura kontrol ettiniz. Bir hesapla gelen her fatura kendiliğinden satın alma siparişiyle karşılaştırılır ve sonuç bir Excel'de kalmaz: yoluna devam eder.",
          source: "Siparişiniz ve faturanız",
          flow: {
            name: "Satın alma belgesi",
            add: { name: "receipt_number", type: "Metin", hint: "\"Receipt\" yazısının yanında · ör. REC-1187", save: "Kaydet", value: "REC-1187" },
          },
          inputs: { show: "Belgeleriniz nasıl gelir?" },
        },
        cleaners: {
          heading: "Bir Cleaner ile şunları yapabilirsiniz…",
          lead: "Her kontrolde kendiliğinden çalışan basit kurallar. Dört fikir:",
          ideas: [
            { icon: "alert", title: "Fiyat %2'den fazla artarsa faturayı durdurun", from: "sipariş fiyatı 22.40", to: "fatura 23.90", note: "fark, kimse ödemeden önce işaretlenir" },
            { icon: "approve", title: "Miktar farklıysa onay", from: "sipariş 300 adet", to: "fatura 280", note: "satın alma kısmi teslimatı ya da hatayı teyit eder" },
            { icon: "mail", title: "Farkları satın almaya e-postayla bildirin", from: "kontrol tamamlandı", to: "purchasing@ adresine e-posta", note: "yalnızca incelenecek bir şey olduğunda" },
            { icon: "sum", title: "Fatura toplamı ile sipariş toplamı", from: "sipariş 5,189.07", to: "fatura 4,960.63", note: "tutmazsa kayda geçmeden durur" },
          ],
          outro: "Cleaner'lar Tavnit'te, sizin için önemli olan alanlarla kurulur. Bunlar yalnızca örnek.",
        },
        after: {
          lead: "Bu sonuç {fields} alanlı sabit bir Flow ve bir Matcher'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit gelen her faturayı kontrol ettiğinde şöyle görünür:",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "İki belgeyi de yükleyin", body: "Satın alma siparişi ve fatura, PDF ya da fotoğraf olarak. Her tedarikçi, her dil, her düzen." },
            { title: "Tavnit ikisini tek bir Flow ile okur", body: "Her ikisinde de başlık (numara, tarih, tedarikçi, toplamlar) ve miktarı ile fiyatıyla birlikte her satır." },
            { title: "Matcher satırları eşleştirir", body: "Siparişteki her satır, aynı anlama gelen fatura satırıyla birleştirilir; fiyat ve miktar karşılaştırılır. Hesabınızla karşılaştırmayı Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} belge (bir kontrol iki belge kullanır) ve ekranda eksiksiz sonuç. Karşılaştırmayı Excel olarak indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Metin aynı değilken satırları nasıl eşleştiriyor?",
            a: "Bir Tavnit Matcher'ı açıklamaları harf harf değil, anlamlarına göre karşılaştırır: \"Long grain rice 20 lb\" ile \"RICE L/GRAIN PREMIUM 20LB\" aynı satırdır. İki açıklama birbirine yakın ama belirsiz olduğunda, ikinci bir adım bunların aynı ürün olup olmadığına karar verir.",
          },
          {
            q: "Fiyatlarda hangi toleransı kullanıyor?",
            a: "Bir fiyat %0,5'ten ya da bir sentten fazla değiştiğinde farklı olarak işaretlenir. Miktarlar birebir karşılaştırılır. Hesabınızda bir Cleaner ile kendi toleransınızı belirlersiniz.",
          },
          {
            q: "\"Faturada eksik\" ve \"Siparişte yok\" ne anlama geliyor?",
            a: "\"Faturada eksik\", tedarikçinin faturalamadığı bir sipariş satırıdır (kısmi ya da bekleyen teslimat). \"Siparişte yok\" ise o siparişte kimsenin sipariş etmediği, faturalanmış bir satırdır.",
          },
          {
            q: "Teslim alma belgesiyle üçlü eşleştirme yapabilir miyim?",
            a: "Burada hayır: ücretsiz sürüm iki belgeyi karşılaştırır. Hesabınızda teslim alma belgesini aynı Flow'un üçüncü belgesi olarak ekler ve Matcher'ın üçünü birden kontrol etmesini sağlarsınız ya da teslim alma belgesi tutana kadar faturanın kayda geçmemesi için Cleaner kuralları oluşturursunuz.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "PDF (metin ya da taranmış), JPG ve PNG; belge başına en fazla 4 MB ve 5 sayfa. Bir ERP'den çıkan satın alma siparişleriyle ve her tedarikçinin faturasıyla çalışır.",
          },
          {
            q: "Dosyalarıma ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosyalar ve karşılaştırma kendiliğinden silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeleri ya da içeriklerini değil.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, satın alma belgeleriniz için bir Flow ve onun üzerine bir Matcher kurun. Faturalar e-posta ya da API ile gelir, siparişleriyle eşleştirilir ve farklar kimse elle yazmadan e-postayla, webhook ile ya da doğrudan ERP'nize gider.",
          },
        ],
        compare: {
          slots: [
            { title: "Satın alma siparişi", hint: "Siparişin PDF'i ya da fotoğrafı", sample: "Örnek sipariş" },
            { title: "Fatura", hint: "Faturanın PDF'i ya da fotoğrafı", sample: "Örnek fatura" },
          ],
          run: "Karşılaştırın",
          sampleAll: "Örnek bir sipariş ve faturayla deneyin",
          stages: ["Satın alma siparişi ve fatura okunuyor", "Satırlar düzenleniyor", "Matcher satırları eşleştiriyor", "Neredeyse bitti"],
          heading: "Karşılaştırma hazır",
          summary: "{n} · {ref} ve {doc}",
          labels: {
            description: "Açıklama",
            quantity: "Miktar",
            price: "Fiyat",
            total: "Toplam",
            status: "Durum",
            ref: "Sipariş",
            doc: "Fatura",
            supplier: "Tedarikçi",
            champion: "Champion",
            wins: "{n} satır kazandı",
            lines: ["satır", "satır"],
          },
          status: {
            ok: "Uyuşuyor",
            price: "Fiyat farklı",
            qty: "Miktar farklı",
            both: "Fiyat ve miktar farklı",
            missing: "Faturada eksik",
            extra: "Siparişte yok",
          },
          empty: "Hiçbir satırı eşleştiremedik. İki belgede de miktar ve fiyat içeren bir kalem tablosu olduğunu kontrol edin.",
          another: "Başka belgeleri karşılaştırın",
          download: "Karşılaştırmayı Excel olarak indirin",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: PDF_VOCAB,
      overrides: {
        title: "Taranmış PDF'i Belgelere Ayırın, Ücretsiz (Yapay Zeka)",
        description:
          "Birlikte taranmış birkaç belge (faturalar, satın alma siparişleri, fişler, sözleşmeler) içeren tek bir PDF yükleyin; her belgeyi türüne göre sınıflandırılmış olarak ayrı ayrı geri alın. Ücretsiz, sayfa işaretlemeye gerek yok.",
        label: "Taranmış PDF'i ayırın",
        h1: "Taranmış bir PDF'i belgelerine ayırın",
        intro:
          "Tarayıcıdan on kâğıt geçirdiniz ve elinizde tek bir PDF var. Yükleyin: Tavnit her sayfayı okur, her belgenin nerede başladığını bulur ve belgeleri türleriyle (fatura, satın alma siparişi, fiş, çeki listesi, konşimento, sözleşme…) birlikte tek tek geri verir. Sayfa sayısına göre bölme yok, elle işaretlenecek bir şey yok.",
        trust: ["Tek PDF · en fazla 12 sayfa", "Günde {limit} ücretsiz belge", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Taranmış PDF'inizi buraya bırakın",
          hint: "içinde birkaç belge olan tek bir PDF",
          choose: "Dosya seçin",
          sample: "Örnek bir taramayla deneyin",
          formats: "PDF · en fazla 4 MB ve 12 sayfa",
        },
        stages: ["PDF yükleniyor", "Her sayfa okunuyor", "Her belgenin başladığı yer bulunuyor", "Sınıflandırılıyor", "Neredeyse bitti"],
        result: {
          retention: "24 saat sonra kendiliğinden silinir",
          downloading: "Dosya hazırlanıyor",
          another: "Başka bir PDF ayırın",
          empty: "Bu PDF'te birden fazla belge bulamadık.",
          flowNote: "Bu türler, bu aracın sabit Splitter'ına aittir. Kendi hesabınızda türleri siz tanımlarsınız.",
        },
        errors: {
          too_large: "Dosya 4 MB'tan büyük. Sıkıştırın ya da taramayı ikiye bölün.",
          too_many_pages: "Ücretsiz sürüm PDF başına en fazla 12 sayfa ayırır. Bir hesapla sınır yoktur.",
          unsupported: "Yalnızca PDF, JPG veya PNG kabul ediyoruz. Belgeleri ayırmak için tarayıcıdan çıkan PDF'i yükleyin.",
          failed: "Bu PDF'i ayıramadık. Başka bir tarama ya da örneği deneyin.",
          empty: "Dosya boş.",
        },
        next: {
          lead: "Şimdi tek bir PDF ayırdınız. Bir hesapla Splitter'ın ayırdığı her belge kendi Flow'una gider: fatura, fatura veri çıkarmaya; satın alma siparişi kendi Flow'una; fiş, masraf raporuna. Artık kimse elle ayırmaz ya da sınıflandırmaz.",
          source: "PDF'iniz",
          flow: {
            title: "Splitter'dan Flow'a: her belge kendi veri çıkarma sürecine",
            body: "Bir Splitter her belgenin nerede başladığını bulur ve onu sizin kelimelerle tanımladığınız türlere göre sınıflandırır. Bu araç sekiz türlü, çıktısı olmayan sabit bir Splitter kullanır: size yalnızca belgeleri verir. Hesabınızda kendi türlerinizi tanımlar ve her biri için nereye gideceğini belirlersiniz: alanlarını çıkaran bir Flow'a (aşağıdaki gibi, {fields} alanla), bir e-postaya ya da bir Collection'a. Şablon yok, koordinat yok.",
            linkLabel: "Splitter nasıl çalışır?",
            href: "/docs/splitters",
          },
          inputs: {
            show: "PDF'iniz nasıl gelir?",
          },
        },
        cleaners: {
          heading: "Ayırdıktan sonra Tavnit'te…",
          lead: "Her belge türünün, kimse elle düzenlemeden kendi varış noktası olabilir. Dört örnek:",
          ideas: [
            { icon: "text", title: "Her fatura kendi Flow'una, oradan ERP'ye", from: "fatura (s. 1–2)", to: "Fatura Flow'u → ERP", note: "el değmeden çıkarılır ve kaydedilir" },
            { icon: "mail", title: "Fişler masraf raporuna", from: "fiş (s. 5)", to: "masraf@sirketiniz", note: "her fiş, mutabakatı yapan kişiye ulaşır" },
            { icon: "calendar", title: "Sözleşmeler tarihleriyle hukuk arşivine", from: "sözleşme (s. 6–7)", to: "Sözleşme Flow'u", note: "bitiş ve yenileme tarihleri tek bir tabloda" },
            { icon: "alert", title: "Bir şey tanınmadığında uyarı", from: "sınıflandırılmamış sayfa", to: "insan incelemesi", note: "hiçbir şey kaybolmaz ya da yanlış yere gitmez" },
          ],
          outro: "Varış noktaları Tavnit'te belge türüne göre ayarlanır. Bunlar yalnızca örnek.",
          cta: "Ücretsiz hesap oluşturup kurun",
          ctaSignedIn: "Tavnit'i açıp kurun",
          learn: "Splitter nedir?",
        },
        after: {
          title: "Belgeleriniz hazır",
          lead: "Bu belgeler sekiz türlü sabit bir Splitter'dan çıktı. Hesabınızda türleri siz tanımlarsınız ve her belge kendiliğinden kendi Flow'una gider:",
          close: "Kapat",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "Taramayı yükleyin", body: "İçinde birkaç belge olan, tarayıcıdan çıktığı haliyle tek bir PDF. Sıra fark etmez, belge başına sayfa sayısı da." },
            { title: "Tavnit ayırır ve sınıflandırır", body: "Her sayfayı okur, her belgenin nerede başladığını tespit eder ve ona bir tür atar: fatura, satın alma siparişi, fiş, çeki listesi, konşimento, sözleşme, alacak dekontu ya da diğer." },
            { title: "Her belgeyi indirin", body: "Sayfa aralıkları ve türleriyle listeyi görürsünüz. Ücretsiz bir hesapla her PDF'i ayrı ayrı ya da hepsini bir zip dosyasında indirirsiniz." },
          ],
        },
        faqs: [
          {
            q: "Bir belgenin nerede bitip diğerinin nerede başladığını nasıl biliyor?",
            a: "Yapay zeka, bir insanın yapacağı gibi tüm sayfalara birlikte bakar: başlık, şirket, sayfa numaralandırması ya da düzendeki değişiklikler. Sayfa saymaz ya da işaret aramaz; bu yüzden bir fatura iki sayfa, fiş tek sayfa olduğunda da çalışır.",
          },
          {
            q: "Hangi belge türlerini tanıyor?",
            a: "Burada sekiz tür: fatura, satın alma siparişi, fiş, çeki listesi, konşimento, sözleşme, alacak dekontu ve diğer. Bir hesapla kendi türlerinizi kelimelerle tarif ederek tanımlar ve her biri için nereye gideceğine karar verirsiniz: verilerini çıkaran bir Flow'a, bir e-postaya ya da bir Collection'a.",
          },
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} belge ve ekranda eksiksiz sonuç. Ayrılmış PDF'leri indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Kaç sayfa yükleyebilirim?",
            a: "Ücretsiz sürümde PDF başına en fazla 12 sayfa ve 4 MB. Bir hesapla sayfa sınırı yoktur ve taramaları doğrudan Splitter'a e-postayla gönderebilirsiniz.",
          },
          {
            q: "Kötü taramalarla ya da karışık dillerle çalışır mı?",
            a: "Evet. Eğri, gri tonlamalı ve damgalı taramaları; aynı PDF içinde İngilizce, İspanyolca ya da başka dillerde karışık belgeleri işler. Okunamayan bir sayfaya uydurma bir tür verilmez, sınıflandırılmamış olarak işaretlenir.",
          },
          {
            q: "Dosyama ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra PDF ve ayrılmış belgeler otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, dosyayı ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
          },
          {
            q: "İndirmek için neden hesap gerekiyor?",
            a: "Çünkü ücretsiz sürüm denemek içindir. Bir hesapla her taramayı ayırabilir, her belgeyi kendi Flow'una gönderebilir ve çıkarılan verileri ERP'nizde ya da e-postayla alabilirsiniz.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, belge türlerinizle bir Splitter kurun ve taramaları onun e-posta adresine iletin ya da API ile bağlayın. Ayırdığı her belge kendiliğinden kendi Flow'una, oradan da ERP'nize, Google Sheets'e ya da bir gelen kutusuna gider.",
          },
        ],
        split: {
          heading: "Tamamlandı: {file}",
          summary: "{pages} içinde {n}",
          segmentWord: ["belge", "belge"],
          pageWord: ["sayfa", "sayfa"],
          pages: "s. {from}–{to}",
          pageOne: "s. {from}",
          unmatched: "Sınıflandırılmamış",
          type: "Tür",
          reason: "Neden",
          download: "İndirin",
          downloadAll: "Tümünü indirin (zip)",
          stages: ["PDF yükleniyor", "Her sayfa okunuyor", "Her belgenin başladığı yer bulunuyor", "Sınıflandırılıyor", "Neredeyse bitti"],
          empty: "Bu PDF'te birden fazla belge bulamadık.",
          another: "Başka bir PDF ayırın",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Everything not overridden here comes from the base
     * copy with the words below filled in.
     */
    "packing-list-to-excel": {
      vocab: PACKING_LIST_VOCAB,
      overrides: {
        title: "Çeki Listesinden Excel'e, Ücretsiz: Yapay Zeka Her Satırı Çıkarır",
        description:
          "Bir çeki listesini (packing list) PDF ya da fotoğraf olarak yükleyin, her satırı Excel tablosu olarak alın: açıklama, miktar, koli, net ve brüt ağırlık, ölçüler; gönderici, alıcı ve limanlarla birlikte. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Çeki listesinden Excel'e",
        h1: "Bir çeki listesini Excel'e dönüştürün",
        intro:
          "PDF'i ya da fotoğrafı yükleyin. Tavnit sevkiyat başlığını (gönderici, alıcı, limanlar, toplamlar) ve her mal satırını koli sayısı, ağırlıkları ve ölçüleriyle birlikte okur, size elektronik tablo olarak geri verir. Tedarikçiye özel şablon yok: aynı araç tüm sevkiyatlarınızın çeki listeleri için çalışır.",
        drop: {
          title: "Çeki listenizi buraya bırakın",
          sample: "Örnek bir çeki listesiyle deneyin",
        },
        stages: ["Belge yükleniyor", "Sevkiyat başlığı okunuyor", "Mal satırları bulunuyor", "Sütunlar sıralanıyor", "Neredeyse bitti"],
        result: {
          empty: "Bu belgede mal satırı bulamadık. Satır başına koli, ağırlık ya da miktar içeren bir çeki listesi deneyin.",
          flowNote: "Bu {fields} sütun, sabit bir çeki listesi Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: konteyner, marka, GTİP kodu, konşimento numarası…",
        },
        next: {
          lead: "Şimdi tek bir çeki listesi işlediniz. Bir hesapla gelen her çeki listesi aynı şekilde işlenir ve satırlar bir Excel'de kalmaz: kendiliğinden yoluna devam eder.",
          source: "Çeki listeniz",
          flow: {
            name: "Çeki listesi",
            add: { name: "container", type: "Metin", hint: "\"Container\" yazısının yanında · ör. MSKU-4417", save: "Kaydet", value: "MSKU-4417" },
          },
          inputs: { show: "Çeki listeniz nasıl gelir?" },
        },
        cleaners: {
          lead: "Veri çıkarmadan sonra her çeki listesi üzerinde kendiliğinden çalışan basit kurallar. Kendi verilerinizle dört fikir:",
          ideas: [
            { icon: "date", title: "Tarih için tek bir yazım", from: "{date}", to: "{iso}", note: "her çeki listesi için aynı biçim" },
            { icon: "alert", title: "Brüt ağırlık netten büyük olmalı", from: "net > brüt", to: "incelenecek", note: "ters girilmiş bir satır asla fark edilmeden beyan edilmez" },
            { icon: "calendar", title: "Yüklemeden önce hatırlatma", from: "sevkiyat tarihi", to: "2 gün önce hatırlatma", note: "gümrük müşavirinize ve lojistik ekibinize" },
            { icon: "mail", title: "Gümrük müşavirine kopya", from: "çıkarılan çeki listesi", to: "Excel ekli e-posta", note: "ilgili faturayla birlikte" },
          ],
        },
        after: {
          lead: "Bu sonuç {fields} alanlı sabit bir Flow'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit bunu her çeki listesi için yaptığında şöyle görünür:",
        },
        how: {
          steps: [
            { title: "Çeki listesini yükleyin", body: "PDF, fotoğraf ya da tarama. Her gönderici, her dil, her düzen." },
            {
              title: "Tavnit okur",
              body: "Başlığı (gönderici, alıcı, limanlar, toplamlar) ve her satırda koli, net ağırlık, brüt ağırlık ve ölçüleri içeren mal tablosunu bulur.",
            },
            { title: "İnceleyin ve indirin", body: "Tablo ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} belge ve ekranda eksiksiz sonuç. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "PDF (metin ya da taranmış), JPG ve PNG; en fazla 4 MB ve 5 sayfa. Çeki listeniz daha uzunsa parçalar halinde yükleyin ya da bir hesap oluşturun.",
          },
          {
            q: "Bir çeki listesinden hangi sütunları çıkarıyor?",
            a: "Belge başına: gönderici, alıcı, numara, tarih, ilgili fatura, yükleme limanı, boşaltma limanı ve koli ile ağırlık toplamları. Satır başına: açıklama, miktar, birim, koli, net ağırlık, brüt ağırlık ve ölçüler. Belge değerleri her satırda tekrarlanır, böylece tablo kendi başına filtrelenebilir.",
          },
          {
            q: "Başka sütunlar seçebilir miyim?",
            a: "Burada hayır: bu araç 17 alanlı sabit bir çeki listesi Flow'u kullanır. Hesabınızda çeki listeleri ya da başka herhangi bir belge için, ihtiyacınız olan alanlarla kendi Flow'larınızı oluşturursunuz: belge başına (konteyner, mühür, konşimento numarası, teslim şekli) ya da satır başına (marka, GTİP kodu, hacim). Şablon yok: alanı tarif edersiniz ve gerekirse nereye bakılacağına dair bir ipucu verirsiniz.",
          },
          {
            q: "Her ülkeden çeki listeleriyle çalışır mı?",
            a: "Evet. İngilizce, İspanyolca ve diğer dillerdeki çeki listelerini, kg ya da lb cinsinden ağırlıkları ve cm ya da inç cinsinden ölçüleri basıldığı gibi işler. Panama, Kolombiya, Meksika, Çin ve ABD başta olmak üzere birçok ülkeden sevkiyatlar üzerinde test edilmiştir.",
          },
          {
            q: "Her tedarikçi için şablon kurmam gerekir mi?",
            a: "Hayır. Tavnit şablon kullanmaz: her belgeyi geldiği gibi okur; gönderici çeki listesinin düzenini yarın değiştirse bile.",
          },
          {
            q: "Dosyama ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosya ve çıkarılan satırlar otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeyi ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, istediğiniz alanlarla bir Flow kurun ve çeki listelerini Flow'un e-posta adresine iletin ya da API, webhook'lar, Zapier, Make veya n8n ile bağlayın. Her sevkiyat, kimse elle yazmadan gümrük sisteminize, ERP'nize ya da Google Sheets'e ulaşır.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. Everything that is specific to an ocean B/L:
     * header fields, one row per container line, customs and forwarder use
     * cases. Turkish trade says "konşimento"; B/L is kept next to it.
     */
    "bill-of-lading-to-excel": {
      vocab: BILL_OF_LADING_VOCAB,
      overrides: {
        title: "Konşimentodan Excel'e, Ücretsiz: B/L Verilerini Çıkarın",
        description:
          "Bir konşimentoyu (B/L) PDF ya da fotoğraf olarak yükleyin, verilerini Excel tablosu olarak alın: B/L numarası, taşıyıcı, gönderici, alıcı, gemi, limanlar ve her konteyner için mühür, mal, koli, ağırlık ve hacim içeren bir satır. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Konşimentodan Excel'e",
        h1: "Bir konşimentoyu Excel'e dönüştürün",
        intro:
          "Konşimentonun PDF'ini ya da fotoğrafını yükleyin. Tavnit başlığı (B/L numarası, taşıyıcı, gönderici, alıcı, gemi, sefer, limanlar, gemiye yükleme tarihi) ve her yük satırını konteyner, mühür, koli, brüt ağırlık ve hacmiyle birlikte okur, size elektronik tablo olarak geri verir. Taşıyıcıya özel şablon yok: aynı Flow MSC, Maersk, Hapag-Lloyd ya da herhangi bir NVOCC belgesini okur.",
        drop: {
          title: "Konşimentonuzu buraya bırakın",
          sample: "Örnek bir B/L ile deneyin",
        },
        stages: ["Belge yükleniyor", "B/L başlığı okunuyor", "Yük satırları bulunuyor", "Sütunlar sıralanıyor", "Neredeyse bitti"],
        result: {
          empty: "Bu belgede yük satırı bulamadık. Konteyner ve mal tablosu içeren bir konşimento deneyin.",
          flowNote: "Bu {fields} sütun, sabit bir konşimento Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: teslim şekli (incoterm), teslim yeri, booking numarası, ETA…",
          another: "Başka bir konşimento işleyin",
        },
        errors: {
          too_large: "Dosya 4 MB'tan büyük. Sıkıştırın ya da yalnızca B/L sayfalarını yükleyin.",
        },
        next: {
          lead: "Şimdi tek bir konşimento işlediniz. Bir hesapla her taşıyıcıdan ve acenteden gelen her B/L aynı şekilde işlenir ve veriler bir Excel'de kalmaz: kendiliğinden gümrük ya da navlun sisteminize ilerler.",
          source: "B/L'niz",
          flow: {
            name: "Konşimento",
            add: { name: "incoterm", type: "Metin", hint: "\"Incoterm\" yazısının yanında · ör. CIF Manzanillo", save: "Kaydet", value: "CIF" },
          },
          inputs: { show: "B/L'niz nasıl gelir?" },
        },
        cleaners: {
          lead: "Veri çıkarmadan sonra her konşimento üzerinde kendiliğinden çalışan basit kurallar. Kendi verilerinizle dört fikir:",
          ideas: [
            { icon: "date", title: "Gemiye yükleme tarihi için tek bir yazım", from: "{date}", to: "{iso}", note: "her B/L için aynı biçim" },
            { icon: "alert", title: "Aralık dışı brüt ağırlık", from: "konteyner başına brüt ağırlık", to: "26.000 kg üzerini işaretle", note: "kimse taşıyamayacak bir kamyon ayarlamasın" },
            { icon: "calendar", title: "Varıştan önce hatırlatma", from: "yükleme tarihi + transit süresi", to: "5 gün önceden hatırlatma", note: "beyanname gemi yanaşmadan verilsin" },
            { icon: "mail", title: "Doğrudan gümrük müşavirine", from: "çıkarılan B/L", to: "tablo ekli e-posta", note: "kimse bir şey iletmeden müşavirlik firmasına" },
          ],
        },
        after: {
          lead: "Bu sonuç {fields} alanlı sabit bir Flow'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit bunu her konşimento için yaptığında şöyle görünür:",
        },
        how: {
          steps: [
            { title: "B/L'yi yükleyin", body: "PDF, fotoğraf ya da tarama. Her taşıyıcı, her acente, her form düzeni." },
            { title: "Tavnit okur", body: "Başlığı (B/L numarası, taraflar, gemi, sefer, limanlar, yükleme tarihi, navlun koşulları) ve yük tablosunu bulur: her konteyner için mühür, mal, koli, ağırlık ve hacim içeren bir satır." },
            { title: "İnceleyin ve indirin", body: "Tablo ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} belge ve ekranda eksiksiz sonuç. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Bir konşimentodan neleri çıkarıyor?",
            a: "Başlıktan: B/L numarası, taşıyıcı, gönderici, alıcı, ihbar adresi (notify party), gemi, sefer, yükleme limanı, boşaltma limanı, gemiye yükleme tarihi, navlun koşulları ve konteyner listesi. Yük tablosundan, her kalem için bir satır: konteyner, mühür, mal tanımı, koli sayısı ve türü, brüt ağırlık ve hacim. Başlık değerleri her satırda tekrarlanır, böylece tablo temiz biçimde filtrelenir ve toplanır.",
          },
          {
            q: "Başka sütunlar seçebilir miyim?",
            a: "Burada hayır: bu araç 19 alanlı sabit bir konşimento Flow'u kullanır. Hesabınızda konşimentolar ya da başka herhangi bir belge için, ihtiyacınız olan alanlarla kendi Flow'larınızı oluşturursunuz: belge başına (teslim şekli, teslim yeri, booking numarası, ETA) ya da satır başına (GTİP kodu, marka, reefer sıcaklığı). Şablon yok: alanı tarif edersiniz ve gerekirse nereye bakılacağına dair bir ipucu verirsiniz.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "PDF (metin ya da taranmış), JPG ve PNG; en fazla 4 MB ve 5 sayfa. B/L'niz daha uzunsa ya da tek bir taramada birkaç B/L varsa parçalar halinde yükleyin veya bir hesap oluşturun.",
          },
          {
            q: "Her taşıyıcının B/L'siyle çalışır mı?",
            a: "Evet. Şablon kullanmaz: her B/L'yi geldiği gibi okur; ister taşıyıcının master B/L'si, ister forwarder'ın house B/L'si, ister sea waybill olsun, İngilizce ya da İspanyolca. MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen ve NVOCC düzenleri üzerinde test edilmiştir.",
          },
          {
            q: "Dosyama ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosya ve çıkarılan satırlar otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeyi ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
          },
          {
            q: "İndirmek için neden hesap gerekiyor?",
            a: "Çünkü ücretsiz sürüm denemek içindir. Bir hesapla aynı veri çıkarmayı tüm konşimentolarınız için çalıştırabilir, sonucu e-postayla alabilir ve gümrük ya da navlun sisteminize gönderebilirsiniz.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, istediğiniz alanlarla bir Flow kurun ve B/L'leri Flow'un e-posta adresine (taşıyıcının ya da forwarder'ın onları gönderdiği adres) iletin ya da API, webhook'lar, Zapier, Make veya n8n ile bağlayın. Veriler, kimse elle yazmadan gümrük sisteminize, ERP'nize ya da Google Sheets'e ulaşır.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically) and marks the cheapest unit price per line as Champion.
     * Nothing here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: QUOTE_VOCAB,
      overrides: {
        title: "Tedarikçi Tekliflerini Ücretsiz Karşılaştırın: Satır Satır Tablo",
        description:
          "İki ya da üç teklifi PDF veya fotoğraf olarak yükleyin, tek bir karşılaştırma tablosu alın: her satırda her tedarikçinin fiyatı ve en ucuzu işaretli. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Tedarikçi tekliflerini karşılaştırın",
        h1: "Tedarikçi tekliflerini karşılaştırın",
        intro:
          "Aynı talep için gelen iki ya da üç teklifi yükleyin. Tavnit her birini okur, her tedarikçi farklı ifade etse bile satırları eşleştirir ve her fiyatı ve satır başına en ucuz seçeneği gösteren tek bir tablo oluşturur. Şablon yok, elle hazırlanan tablo yok.",
        trust: ["2 ya da 3 teklif · PDF ya da fotoğraf", "Günde {limit} ücretsiz belge", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Bir teklifi buraya bırakın",
          hint: "PDF ya da fotoğraf",
          sample: "Üç örnek teklifle deneyin",
          formats: "PDF, JPG veya PNG · teklif başına en fazla 4 MB ve 5 sayfa",
        },
        stages: ["Teklifler okunuyor", "Satırlar düzenleniyor", "Matcher satırları eşleştiriyor", "Neredeyse bitti"],
        result: {
          flowNote: "Her teklif {fields} alanlı sabit bir Flow'dan geçer ve Matcher onları çaprazlar. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: marka, garanti, satır başına teslim süresi…",
          download: "Karşılaştırmayı Excel olarak indirin",
          another: "Başka teklifleri karşılaştırın",
          empty: "Bu teklifte fiyatlı satır bulamadık. Satır başına ürün, miktar ve fiyat içeren bir teklif deneyin.",
        },
        errors: {
          too_large: "Tekliflerden biri 4 MB'tan büyük. Sıkıştırın ya da yalnızca satırların olduğu sayfaları yükleyin.",
          failed: "Tekliflerden birini okuyamadık. Başka bir teklif ya da örnekleri deneyin.",
          no_lines: "Tekliflerden birinde fiyatlı satır yok, bu yüzden karşılaştırılacak bir şey yok. Her birinde birim fiyatlı kalemler olduğunu kontrol edin.",
          not_ready: "Teklifleri hâlâ okuyoruz. Biraz bekleyip tekrar deneyin.",
        },
        auth: {
          title: "Tabloyu indirmek için ücretsiz hesabınızı oluşturun",
          body: "Excel hemen iner. Bir hesapla üçten fazla teklifi karşılaştırabilir ve bunu gelen her ihale için yapabilirsiniz.",
        },
        next: {
          lead: "Şimdi üç teklifi elle karşılaştırdınız. Bir hesapla e-postayla gelen her teklif kendi Flow'una girer, Matcher onları kendiliğinden çaprazlar ve tablo yoluna devam eder: satın almaya, ERP'ye ya da onay verecek kişiye.",
          source: "Teklifleriniz",
          flow: {
            name: "Teklif",
            add: { name: "brand", type: "Metin", hint: "\"Marka\" yazısının yanında ya da açıklamada", save: "Kaydet", value: "Argos" },
          },
          inputs: { show: "Teklifleriniz nasıl gelir?" },
        },
        cleaners: {
          lead: "Her teklif okunduktan sonra kendiliğinden çalışan basit kurallar. Dört fikir:",
          ideas: [
            { icon: "date", title: "Tarih için tek bir yazım", from: "{date}", to: "{iso}", note: "her teklif için aynı biçim" },
            { icon: "alert", title: "Bir tedarikçi %5'ten fazla zam yaparsa uyarı", from: "bugünkü fiyat", to: "son teklife göre", note: "satır bazında, siparişi vermeden önce" },
            { icon: "approve", title: "Tedarikçi seçimini onaylayın", from: "karşılaştırma tablosu", to: "karar veren kişi", note: "satın alma siparişi ancak onaydan sonra çıkar" },
            { icon: "calendar", title: "Teklifin geçerlilik süresini hatırlatın", from: "{date} tarihine kadar geçerli", to: "5 gün önce hatırlatma", note: "fiyat elden kaçmasın" },
          ],
        },
        after: {
          title: "Karşılaştırma tablonuz hazır",
          lead: "Bu sonuç {fields} alanlı sabit bir Flow ve bir Matcher'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit her teklifi çaprazladığında şöyle görünür:",
        },
        how: {
          steps: [
            { title: "İki ya da üç teklif yükleyin", body: "Aynı talep için, PDF ya da fotoğraf olarak. Her tedarikçi, her düzen, her ürünü tarif etme biçimi." },
            { title: "Tavnit okur ve çaprazlar", body: "Her birinin satırlarını çıkarır; Matcher, farklı ifade edilmiş olsalar bile kalemleri eşleştirir. Satır başına en ucuz olan Champion olarak işaretlenir." },
            { title: "İnceleyin ve indirin", body: "Tablo ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} belge (üç teklifin karşılaştırması üç belge sayılır) ve ekranda eksiksiz tablo. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Her tedarikçi farklı ifade ettiğinde satırları nasıl eşleştiriyor?",
            a: "Bir Tavnit Matcher'ı ile. Birebir metni değil, her açıklamanın anlamını karşılaştırır: \"grey cement 42.5 kg\" ile \"Portland cement type I grey, 42.5 kg bag\" aynı satıra düşer. Şüphe olduğunda ikinci bir adım bunların aynı ürün olup olmadığına karar verir.",
          },
          {
            q: "Champion ne anlama geliyor?",
            a: "O satırda birim fiyatı en düşük olan tedarikçi. Eşitlik durumunda ikisi de görünür. Yalnızca bir tedarikçinin fiyat verdiği satırların rakibi yoktur, bunlar da gösterilir.",
          },
          {
            q: "Üçten fazla teklifi karşılaştırabilir miyim?",
            a: "Burada hayır: ücretsiz sürüm en fazla üç teklif alır. Hesabınızda Matcher aynı Flow'un en fazla on çalıştırmasını karşılaştırır ve tabloyu e-postayla ya da ERP'nize gönderebilirsiniz.",
          },
          {
            q: "Başka sütunlar seçebilir miyim?",
            a: "Burada hayır: bu araç sabit bir teklif Flow'u kullanır. Hesabınızda ihtiyacınız olan alanlarla (marka, garanti, satır başına teslim süresi) kendi Flow'unuzu oluşturur ve Matcher'ı istediğiniz alanı karşılaştıracak şekilde ayarlarsınız: fiyat, teslim süresi ya da herhangi bir sayı.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "PDF (metin ya da taranmış), JPG ve PNG; teklif başına en fazla 4 MB ve 5 sayfa.",
          },
          {
            q: "Dosyalarıma ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosyalar, çıkarılan satırlar ve tablo kendiliğinden silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, kendi alanlarınızla bir teklif Flow'u ve üzerine bir Matcher kurun. Teklifleri Matcher'ın e-posta adresine iletin; hepsi geldiğinde karşılaştırma tablosu kendiliğinden çıkar: e-postayla, webhook ile ya da ERP'nize.",
          },
        ],
        compare: {
          slots: [
            { title: "Teklif A", hint: "PDF ya da fotoğraf", sample: "Örnek teklif A" },
            { title: "Teklif B", hint: "PDF ya da fotoğraf", sample: "Örnek teklif B" },
            { title: "Teklif C", hint: "PDF ya da fotoğraf", sample: "Örnek teklif C", optional: true },
          ],
          run: "Karşılaştırın",
          sampleAll: "Üç örnek teklifle deneyin",
          stages: ["Teklifler okunuyor", "Satırlar düzenleniyor", "Matcher satırları eşleştiriyor", "Neredeyse bitti"],
          heading: "Karşılaştırma tablosu hazır",
          summary: "{n} · {ref}",
          labels: {
            description: "Açıklama",
            quantity: "Miktar",
            price: "Birim fiyat",
            total: "Toplam",
            status: "Durum",
            ref: "A",
            doc: "B",
            supplier: "Tedarikçi",
            champion: "Champion",
            wins: "{n} satır kazandı",
            lines: ["satır", "satır"],
          },
          status: { ok: "Uyuşuyor", price: "Farklı fiyat", qty: "Farklı miktar", both: "Fiyat ve miktar farklı", missing: "Fiyat verilmemiş", extra: "Yalnızca bu teklifte" },
          empty: "Matcher teklifler arasında karşılaştırılabilir satır bulamadı. Aynı talep için olduklarını ve birim fiyatlı kalemler içerdiklerini kontrol edin.",
          another: "Başka teklifleri karşılaştırın",
          download: "Karşılaştırmayı Excel olarak indirin",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: CONTRACT_VOCAB,
      overrides: {
        title: "Sözleşme Yenileme Tarihi Çıkarıcı, Ücretsiz (Yapay Zeka)",
        description:
          "Bir sözleşmeyi PDF olarak yükleyin, önemli tarihlerini tek bir Excel satırında alın: taraflar, başlangıç, bitiş, otomatik yenileme, bildirim süresi ve fesih bildiriminin son günü. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez.",
        label: "Sözleşme tarihleri",
        h1: "Bir sözleşmenin önemli tarihlerini çıkarın",
        intro:
          "PDF'i yükleyin. Tavnit sözleşmeyi okur ve size tek bir satır verir: taraflar, imza tarihi, sürenin başlangıcı ve bitişi, otomatik yenilenip yenilenmediği, bildirim süresi ve yenilemeyeceğinizi bildirmeniz gereken son gün. Hizmet, kira, tedarik ve lisans sözleşmelerinde, hangi biçimde gelirse gelsin çalışır.",
        drop: {
          title: "Sözleşmenizi buraya bırakın",
          sample: "Örnek bir sözleşmeyle deneyin",
        },
        stages: ["Belge yükleniyor", "Taraflar okunuyor", "Süre ve yenileme bulunuyor", "Bildirim tarihi hesaplanıyor", "Neredeyse bitti"],
        result: {
          empty: "Bu belgede taraf ya da tarih bulamadık. Süre maddesi olan imzalı bir sözleşme deneyin.",
          flowNote: "Bu {fields} sütun, sabit bir sözleşme Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: şirket içi sorumlu, masraf merkezi, cezai şart…",
          another: "Başka bir sözleşme işleyin",
        },
        next: {
          lead: "Şimdi tek bir sözleşme işlediniz. Bir hesapla gelen her sözleşme aynı şekilde işlenir ve tarihler bir Excel'de kalmaz: son tarih gelmeden alarm verir.",
          source: "Sözleşmeniz",
          inputs: { show: "Sözleşmeniz nasıl gelir?" },
          flow: {
            name: "Sözleşme",
            add: { name: "owner", type: "Metin", hint: "Bizim tarafımızda kim imzalıyor", save: "Kaydet", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Her sözleşme okunduktan sonra kendiliğinden çalışan basit kurallar. Kendi verilerinizle dört fikir:",
          ideas: [
            { icon: "date", title: "Tarih için tek bir yazım", from: "{date}", to: "{iso}", note: "her sözleşme için aynı biçim" },
            { icon: "calendar", title: "Bitişten 60 gün önce hatırlatma", from: "end_date", to: "zamanında hatırlatma", note: "bildirim süresi dolmadan" },
            { icon: "alert", title: "Otomatik yenileme: önce inceleyin", from: "auto_renewal = Yes", to: "incelenecek", note: "hiçbir sözleşme kimse bakmadan yenilenmesin" },
            { icon: "mail", title: "Sorumluya e-posta", from: "okunan sözleşme", to: "satırı içeren e-posta", note: "imzalayan kişi tarihleri alır" },
          ],
        },
        after: {
          lead: "Bu sonuç {fields} alanlı sabit bir Flow'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit her sözleşmeyi okuduğunda şöyle görünür:",
        },
        how: {
          steps: [
            { title: "Sözleşmeyi yükleyin", body: "Metin ya da taranmış PDF. Her tür sözleşme, kim hazırlamış olursa olsun." },
            { title: "Tavnit okur", body: "Tarafları, imzayı, süreyi, yenileme maddesini ve bildirim süresini bulur; bildirim için son tarihi hesaplar." },
            { title: "İnceleyin ve indirin", body: "Satır ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} sözleşme ve ekranda eksiksiz sonuç. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Hangi tarihleri ve bilgileri çıkarıyor?",
            a: "Taraflar, imza tarihi, sürenin başlangıcı ve bitişi, süre uzunluğu, otomatik yenilenip yenilenmediği, bildirim süresi, yenilememe bildirimi için son tarih, para birimiyle birlikte sözleşme bedeli ve uygulanacak hukuk. Sözleşmede yazmayan her şey boş kalır: hiçbir tarih uydurulmaz.",
          },
          {
            q: "Sonuç neden tek bir satır?",
            a: "Çünkü bir sözleşmenin tek bir süresi, tek bir imza tarihi ve tek bir taraflar grubu vardır. Bir hesapla bütün bir sözleşme klasörünü çalıştırabilir ve bitiş tarihine göre sıralanmaya hazır, her sözleşme için bir satır içeren bir tablo alabilirsiniz.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "PDF (metin ya da taranmış), JPG ve PNG; en fazla 4 MB ve 5 sayfa. Sözleşmeniz daha uzunsa süre ve yenileme maddelerinin bulunduğu sayfaları yükleyin ya da bir hesap oluşturun.",
          },
          {
            q: "Başka sütunlar seçebilir miyim?",
            a: "Burada hayır: bu araç 14 alanlı sabit bir sözleşme Flow'u kullanır. Hesabınızda sözleşmeler ya da başka herhangi bir belge için, ihtiyacınız olan alanlarla kendi Flow'larınızı oluşturursunuz: şirket içi sorumlu, cezai şart, teminat. Şablon yok: alanı tarif edersiniz ve gerekirse nereye bakılacağına dair bir ipucu verirsiniz.",
          },
          {
            q: "Dosyama ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra dosya ve çıkarılan satır otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeyi ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
          },
          {
            q: "Her ülkeden sözleşmelerle çalışır mı?",
            a: "Evet. İngilizce, İspanyolca ve diğer dillerdeki sözleşmeleri, her tarih biçimiyle işler. ABD, Panama, Meksika ve Kolombiya başta olmak üzere birçok ülkeden sözleşmeler üzerinde test edilmiştir.",
          },
          {
            q: "Bitiş tarihinden önce nasıl uyarı alırım?",
            a: "Bir hesap oluşturun, istediğiniz alanlarla bir Flow kurun ve sözleşmeleri Flow'un e-posta adresine iletin ya da API, webhook'lar, Zapier, Make veya n8n ile bağlayın. Bir Cleaner bildirim için son tarihi bugünle karşılaştırır ve e-postayı ya da webhook'u karar vermesi gereken kişiye gönderir.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: RECEIPT_VOCAB,
      overrides: {
        title: "Fişten Excel'e, Ücretsiz: Fotoğraftan Tabloya",
        description:
          "Bir fişin fotoğrafını ya da PDF'ini yükleyin, satırlarını Excel'de alın: işletme, tarih, ürünler, miktarlar, vergi, bahşiş ve toplam. Ücretsiz, şablon yok, sonucu görmek için kayıt gerekmez. Saniyeler içinde fişten tabloya OCR.",
        label: "Fişten Excel'e",
        h1: "Bir fişi Excel'e dönüştürün",
        intro:
          "Fişin fotoğrafını çekin ya da PDF'ini yükleyin. Tavnit işletmeyi, tarihi, fiyatıyla birlikte her ürünü ve toplamları okur, size elektronik tablo olarak geri verir. Solmuş, eğri ya da buruşmuş termal fişlerde de çalışır: kurulacak bir şablon yok.",
        drop: {
          title: "Fişinizin fotoğrafını buraya bırakın",
          sample: "Örnek bir fişle deneyin",
        },
        stages: ["Fiş yükleniyor", "İşletme ve tarih okunuyor", "Ürünler bulunuyor", "Sütunlar sıralanıyor", "Neredeyse bitti"],
        result: {
          empty: "Bu fişte ürün bulamadık. Fişin tamamının kadrajda olduğu, gölgesiz ve daha net bir fotoğraf deneyin.",
          flowNote: "Bu {fields} sütun, sabit bir fiş Flow'unun alanlarıdır. Kendi hesabınızda alanları siz seçersiniz.",
          ghostHint: "Tavnit'te istediğiniz alanları eklersiniz: masraf merkezi, harcamayı yapan kişi, proje, kategori…",
        },
        next: {
          lead: "Şimdi tek bir fiş işlediniz. Bir hesapla gelen her fiş aynı şekilde işlenir ve satırlar bir Excel'de kalmaz: kendiliğinden yoluna devam eder.",
          source: "Fişiniz",
          inputs: { show: "Fişiniz nasıl gelir?" },
          flow: {
            name: "Fiş",
            add: { name: "cost_center", type: "Metin", hint: "Harcamayı yapan kişi ya da proje", save: "Kaydet", value: "Sales" },
          },
        },
        cleaners: {
          lead: "Her fiş okunduktan sonra kendiliğinden çalışan basit kurallar. Kendi verilerinizle dört fikir:",
          ideas: [
            { icon: "date", title: "Tarih için tek bir yazım", from: "{date}", to: "{iso}", note: "masraf raporu için her fişte aynı biçim" },
            { icon: "sum", title: "Ürünler ara toplamı tutmalı", from: "ürünler {sum}", to: "ara toplam {subtotal}", note: "tutmazsa fotoğraf kötü okunmuştur ve biri kontrol eder", check: "sum" },
            { icon: "approve", title: "Belirli bir tutarın üzerinde onay", from: "toplam {total}", to: "geri ödemeden önce onay", note: "{threshold} tutarını aştığında" },
            { icon: "money", title: "Kendi para biriminize çevirin", from: "{total} {currency}", to: "sizin para biriminiz", note: "seyahatler için fiş tarihindeki kurla" },
          ],
        },
        after: {
          lead: "Bu sonuç {fields} alanlı sabit bir Flow'dan çıktı. Hesabınızda alanları siz seçersiniz; Tavnit bir seyahatin ya da bir ayın tüm fişleri için bunu yaptığında şöyle görünür:",
        },
        how: {
          steps: [
            { title: "Fişi yükleyin", body: "Telefonla çekilmiş bir fotoğraf ya da PDF. Her işletme, her dil, fiş ne kadar solmuş olursa olsun." },
            { title: "Tavnit okur", body: "İşletmeyi, tarihi, numarayı, fiyatıyla birlikte her ürünü ve ara toplamı, vergiyi, bahşişi ve toplamı bulur." },
            { title: "İnceleyin ve indirin", body: "Tablo ekranda görünür. Ücretsiz bir hesapla Excel olarak yanınıza alırsınız." },
          ],
        },
        faqs: [
          {
            q: "Ücretsiz sürüm neleri kapsıyor?",
            a: "Günde {limit} fiş ve ekranda eksiksiz sonuç. Excel'i indirmek için bir Tavnit hesabı gerekir; hesap ücretsizdir.",
          },
          {
            q: "Telefonumla çektiğim bir fotoğrafla çalışır mı?",
            a: "Evet, olağan kullanım zaten bu. 4 MB'a kadar JPG, PNG ve PDF. Fişin tamamının kadrajda olması, ışığın eşit olması ve üzerinde parmak olmaması işe yarar; eğri ya da hafif bulanık bir çekim de okunur.",
          },
          {
            q: "Hangi biçimleri kabul ediyor?",
            a: "JPG, PNG ve PDF (metin ya da taranmış); en fazla 4 MB ve 5 sayfa. Uzun bir market fişi tek bir fotoğrafa sığar.",
          },
          {
            q: "Her işletme için şablon kurmam gerekir mi?",
            a: "Hayır. Tavnit şablon kullanmaz: her fişi geldiği gibi okur; ister restoran, ister eczane, ister taksi, ister benzin istasyonu olsun.",
          },
          {
            q: "Başka sütunlar seçebilir miyim?",
            a: "Burada hayır: bu araç 15 alanlı sabit bir fiş Flow'u kullanır. Hesabınızda ihtiyacınız olan alanlarla kendi Flow'larınızı oluşturursunuz: belge başına (masraf merkezi, harcamayı yapan kişi, proje, kategori) ya da satır başına (ürün kodu). Şablon yok: alanı tarif edersiniz ve gerekirse nereye bakılacağına dair bir ipucu verirsiniz.",
          },
          {
            q: "Dosyama ne oluyor?",
            a: "Yalnızca ücretsiz araçlara ayrılmış ve başka hiçbir amaçla kullanılmayan bir Tavnit hesabında işlenir. 24 saat sonra fotoğraf ve çıkarılan satırlar otomatik olarak silinir; yalnızca bir çalıştırmanın gerçekleştiği bilgisini saklarız, belgeyi ya da içeriğini değil. Daha erken silinmesini isterseniz support@tavnit.io adresine yazın.",
          },
          {
            q: "Bir seyahatten elli fişim var. Tek tek mi yükleyeceğim?",
            a: "Burada evet. Bir hesapla hepsini bir kerede gönderirsiniz: Flow'a e-postayla iletin, toplu olarak bırakın ya da API ile bağlayın; her fiş aynı Excel'de, Google Sheets'te ya da masraf sisteminizde satırlar olarak çıkar.",
          },
          {
            q: "Bunu nasıl otomatik hale getiririm?",
            a: "Bir hesap oluşturun, istediğiniz alanlarla bir Flow kurun ve fiş fotoğraflarını Flow'un e-posta adresine iletin ya da API, webhook'lar, Zapier, Make veya n8n ile bağlayın. Masraf raporu kendi kendine oluşur.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format: a file exported with "1.234,56" that Excel reads as text, or the
     * other way round.
     */
    "number-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Excel veya CSV'de Sayı Biçimini Ücretsiz Düzeltin",
        description:
          "1.234,56 ya da 1,234.56 gibi sayılar içeren bir Excel veya CSV dosyası yükleyin, hepsini toplanmaya hazır tek bir biçimde geri alın. Sütunları ve biçimi siz seçersiniz. Ücretsiz, sonucu görmek için kayıt gerekmez.",
        label: "Sayı biçimini düzeltin",
        h1: "Tablonuzdaki sayı biçimini düzeltin",
        intro:
          "Excel veya CSV dosyasını yükleyin. Hangi sütunlarda sayı olduğunu ve onları nasıl istediğinizi seçin: 1234.56, 1,234.56 ya da 1.234,56. Tavnit her birini dönüştürür ve dosyanızı aynı sütunlarla, aynı sırayla geri verir.",
        trust: ["CSV veya Excel · en fazla 500 satır", "Günde {limit} ücretsiz dosya", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Excel veya CSV dosyanızı buraya bırakın",
          hint: "ya da bilgisayarınızdan bir dosya seçin",
          choose: "Dosya seçin",
          sample: "Örnek bir dosya deneyin",
          formats: "CSV veya .xlsx · en fazla 4 MB ve 500 satır",
        },
        errors: {
          unsupported: "Yalnızca CSV veya Excel (.xlsx) dosyaları.",
          xls: "Bu eski bir Excel dosyası (.xls). Excel'de açıp .xlsx ya da .csv olarak kaydedin.",
          too_many_rows: "Ücretsiz sürüm en fazla 500 satır işler. Dosyanın bir kısmını yükleyin.",
          too_many_columns: "Bir seferde en fazla 10 sütun seçin.",
          no_columns: "En az bir sütun seçin.",
          nothing_to_clean: "Bu sütunlarda dönüştürülecek sayı bulamadık.",
          empty: "Dosya boş ya da başlığın altında satır yok.",
          unreadable: "Dosyayı okuyamadık. Bir Excel dosyasıysa .xlsx olarak yeniden kaydedin.",
          failed: "Bu dosyayı dönüştüremedik. Tekrar deneyin ya da örnek dosyayı kullanın.",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "Dosyayı yükleyin", body: "Virgülle ya da noktalı virgülle ayrılmış bir CSV veya bir Excel dosyası." },
            { title: "Sütunları ve biçimi seçin", body: "Sayıya benzeyen sütunları biz işaretleriz. Siz ondalık ayırıcınızın virgül mü nokta mı olduğunu ve sayıları nasıl istediğinizi söylersiniz." },
            { title: "İnceleyin ve indirin", body: "Değişen hücreler vurgulanır. Ücretsiz hesabınızla dosyayı Excel ya da CSV olarak alırsınız." },
          ],
        },
        faqs: [
          { q: "Excel sayılarımı neden toplamıyor?", a: "Çünkü onları metin olarak okuyor. Dosya, ondalıkları sizinkinden farklı yazan bir sistemden ya da ülkeden geldiğinde olur: 1,234.56 için ayarlanmış bir Excel'de 1.234,56 ya da tersi. Hepsini tek bir biçime getirmek onları yeniden sayıya dönüştürür." },
          { q: "Ondalık ayırıcımın virgül mü nokta mı olduğunu nasıl anlıyorsunuz?", a: "Değerlerinizden tahmin ederiz: 1.234,56 görünüyorsa ondalık ayırıcı virgüldür. Anlaşılamadığında, örneğin yalnızca 1.234 varsa, siz seçersiniz. Bu seçim her sayının nasıl okunacağını belirler." },
          { q: "Hangi biçimi seçmeliyim?", a: "Binlik ayırıcısı olmayan 1234.56, her sistemin, formülün ve içe aktarmanın sorunsuz okuduğu biçimdir. 1,234.56 ve 1.234,56 ise ülkenize göre dosyayı insanlara göstermek içindir." },
          { q: "Sayı olmayan hücrelere ne oluyor?", a: "Olduğu gibi kalırlar. Bir yüzdeye (%15), metne (N/A) ya da boş bir hücreye dokunulmaz: yalnızca açıkça sayı olan değişir." },
          { q: "Hangi biçimleri kabul ediyor?", a: "Virgül, noktalı virgül ya da sekmeyle ayrılmış CSV ve Excel .xlsx; en fazla 4 MB ve 500 satır. Eski bir Excel dosyanız (.xls) varsa .xlsx olarak kaydedin." },
          { q: "Dosyama ne oluyor?", a: "Yalnızca bu dönüştürme için kullanılır ve 24 saat sonra sonuçla birlikte silinir. Sonucu yalnızca sizin tarayıcınız görebilir." },
          { q: "Bunun kendiliğinden olmasını nasıl sağlarım?", a: "Tavnit'te aynı kural bir Cleaner'dır: çıkardığınız her belgede ya da e-posta veya API ile gelen her dosyada tarihler, para birimleri ve kontrollerle birlikte kendiliğinden çalışır." },
        ],
        clean: {
          setup: {
            heading: "Sütunları ve biçimi seçin",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Sayı içeren sütunlar",
            columnsHint: "En fazla {max}. Sayıya benzeyenleri işaretledik.",
            tooMany: "Bir seferde en fazla {max} sütun seçebilirsiniz.",
            inputLabel: "Dosyanızda ondalık ayırıcı",
            inputOptions: { comma: "virgül · 1.234,56", dot: "nokta · 1,234.56" },
            outputLabel: "Sayıları şöyle istiyorum",
            outputOptions: { plain: "1234.56 · formüller ve sistemler için", us: "1,234.56", latam: "1.234,56" },
            preview: "İlk satırlar",
            run: "Dönüştürün",
            change: "Dosyayı değiştirin",
          },
          stages: ["Dosya yükleniyor", "Sütunlar okunuyor", "Sayılar dönüştürülüyor", "Dosyanız hazırlanıyor"],
          heading: "Tamamlandı: {file}",
          summary: "{cols} içinde {cells} değişti",
          cellWord: ["hücre", "hücre"],
          columnWord: ["sütun", "sütun"],
          unchanged: "Hiçbir hücrenin değişmesi gerekmedi: hepsi zaten bu biçimdeydi.",
          highlight: "Değişen hücreler mavi renkte.",
          shown: "{total} satırın {shown} tanesi gösteriliyor. İndirilen dosyada hepsi var.",
          download: "İndirin",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Başka bir dosya dönüştürün",
          automate: {
            heading: "Bunu her dosyada otomatik yapın",
            body: "Tavnit'te bu kural bir Cleaner'dır. Bir kez kurarsınız; çıkardığınız her faturada ya da e-posta veya API ile gelen her dosyada tarihler, para birimleri ve kontrollerle birlikte kendiliğinden çalışır.",
            cta: "Ücretsiz hesap oluşturun",
            docs: "Cleaner nedir?",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Excel veya CSV'de Tarih Biçimini Ücretsiz Düzeltin",
        description:
          "Karışık tarihler (03/04/2024, March 12 2024, 2024-03-12) içeren bir Excel veya CSV dosyası yükleyin, hepsini tek bir biçimde geri alın. Sütunları ve biçimi siz seçersiniz. Ücretsiz, sonucu görmek için kayıt gerekmez.",
        label: "Tarih biçimini düzeltin",
        h1: "Tablonuzdaki tüm tarihleri tek bir biçime getirin",
        intro:
          "Excel veya CSV dosyasını yükleyin. Hangi sütunların tarih olduğunu ve onları nasıl istediğinizi seçin: 2024-03-12, 12/03/2024 ya da 03/12/2024. Tavnit, yazıyla yazılmış tarihler dahil her birini dönüştürür ve dosyanızı aynı sütunlarla geri verir.",
        trust: ["CSV veya Excel · en fazla 500 satır", "Günde {limit} ücretsiz dosya", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Excel veya CSV dosyanızı buraya bırakın",
          hint: "ya da bilgisayarınızdan bir dosya seçin",
          choose: "Dosya seçin",
          sample: "Örnek bir dosya deneyin",
          formats: "CSV veya .xlsx · en fazla 4 MB ve 500 satır",
        },
        errors: {
          unsupported: "Yalnızca CSV veya Excel (.xlsx) dosyaları.",
          xls: "Bu eski bir Excel dosyası (.xls). Excel'de açıp .xlsx ya da .csv olarak kaydedin.",
          too_many_rows: "Ücretsiz sürüm en fazla 500 satır işler. Dosyanın bir kısmını yükleyin.",
          too_many_columns: "Bir seferde en fazla 10 sütun seçin.",
          no_columns: "En az bir sütun seçin.",
          nothing_to_clean: "Bu sütunlarda dönüştürülecek tarih bulamadık.",
          empty: "Dosya boş ya da başlığın altında satır yok.",
          unreadable: "Dosyayı okuyamadık. Bir Excel dosyasıysa .xlsx olarak yeniden kaydedin.",
          failed: "Bu dosyayı dönüştüremedik. Tekrar deneyin ya da örnek dosyayı kullanın.",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "Dosyayı yükleyin", body: "Tarihlerin geldiği gibi durduğu bir CSV veya Excel dosyası: eğik çizgi, tire, nokta ya da yazıyla." },
            { title: "Sütunları ve biçimi seçin", body: "Tarihe benzeyen sütunları biz işaretleriz. Siz dosyanızda önce günün mü ayın mı geldiğini ve tarihleri nasıl istediğinizi söylersiniz." },
            { title: "İnceleyin ve indirin", body: "Değişen hücreler vurgulanır. Ücretsiz hesabınızla dosyayı Excel ya da CSV olarak alırsınız." },
          ],
        },
        faqs: [
          { q: "03/04/2024'ün 3 Nisan mı yoksa 4 Mart mı olduğunu nasıl anlıyorsunuz?", a: "Tek başına bir tarih bunu söyleyemez. Bu yüzden dosyanızda önce günün mü ayın mı geldiğini sorarız; sütunda 15/04/2024 gibi tek bir şekilde okunabilen bir tarih varsa yanıtı biz öneririz." },
          { q: "Yazıyla yazılmış tarihleri anlıyor mu?", a: "Evet. \"March 5th 2024\", \"12 de marzo de 2024\" ya da \"1 Apr 2024\" yapay zekayla okunur; bir Excel formülünün yapamadığı da tam olarak budur. Sayısal tarihler yapay zeka olmadan, kurallarla okunur." },
          { q: "Hangi biçimi seçmeliyim?", a: "2024-03-12 (yıl, ay, gün), her sistemin karışıklık olmadan okuduğu ve doğru sıralanan biçimdir. 03/12/2024 ABD alışkanlığıdır; 12/03/2024 ise Avrupa'da ve Latin Amerika'da yaygındır." },
          { q: "Tarih olmayan hücrelere ne oluyor?", a: "Boş hücreler gibi olduğu gibi kalırlar. Bir tarih güvenle okunamadığında tahmin etmek yerine geldiği gibi bırakırız." },
          { q: "Excel dosyam tarihleri zaten tarih olarak saklıyorsa?", a: "Onları yeniden okumadan olduğu gibi alırız ve yalnızca biçimi değiştiririz." },
          { q: "Dosyama ne oluyor?", a: "Yalnızca bu dönüştürme için kullanılır ve 24 saat sonra sonuçla birlikte silinir. Sonucu yalnızca sizin tarayıcınız görebilir." },
          { q: "Bunun kendiliğinden olmasını nasıl sağlarım?", a: "Tavnit'te aynı kural bir Cleaner'dır: çıkardığınız her belgede ya da e-posta veya API ile gelen her dosyada sayılar, para birimleri ve kontrollerle birlikte kendiliğinden çalışır." },
        ],
        clean: {
          setup: {
            heading: "Sütunları ve biçimi seçin",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Tarih içeren sütunlar",
            columnsHint: "En fazla {max}. Tarihe benzeyenleri işaretledik.",
            tooMany: "Bir seferde en fazla {max} sütun seçebilirsiniz.",
            inputLabel: "Dosyanızda sayısal tarihlerde önce gelen",
            inputOptions: { dmy: "gün · 31/12/2024", mdy: "ay · 12/31/2024" },
            outputLabel: "Tarihleri şöyle istiyorum",
            outputOptions: { iso: "2024-03-12 · yıl, ay, gün", dmy: "12/03/2024 · gün, ay, yıl", mdy: "03/12/2024 · ay, gün, yıl" },
            preview: "İlk satırlar",
            run: "Dönüştürün",
            change: "Dosyayı değiştirin",
          },
          stages: ["Dosya yükleniyor", "Sütunlar okunuyor", "Tarihler dönüştürülüyor", "Yazıyla yazılmış tarihler okunuyor", "Dosyanız hazırlanıyor"],
          heading: "Tamamlandı: {file}",
          summary: "{cols} içinde {cells} değişti",
          cellWord: ["hücre", "hücre"],
          columnWord: ["sütun", "sütun"],
          unchanged: "Hiçbir hücrenin değişmesi gerekmedi: hepsi zaten bu biçimdeydi.",
          highlight: "Değişen hücreler mavi renkte.",
          shown: "{total} satırın {shown} tanesi gösteriliyor. İndirilen dosyada hepsi var.",
          download: "İndirin",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Başka bir dosya dönüştürün",
          automate: {
            heading: "Bunu her dosyada otomatik yapın",
            body: "Tavnit'te bu kural bir Cleaner'dır. Bir kez kurarsınız; gelen her faturada, sözleşmede ya da dosyada sayılar, para birimleri ve kontrollerle birlikte kendiliğinden çalışır.",
            cta: "Ücretsiz hesap oluşturun",
            docs: "Cleaner nedir?",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Excel'de Para Birimini Günün Kuruyla Ücretsiz Çevirin",
        description:
          "Fiyat ya da tutar içeren bir Excel veya CSV dosyası yükleyin, her sütunu günün referans kuruyla dolara, euroya, sterline ya da 30 para biriminden herhangi birine çevrilmiş olarak alın. Ücretsiz, sonucu görmek için kayıt gerekmez.",
        label: "Para birimi çevirin",
        h1: "Tablonuzdaki tutarları başka bir para birimine çevirin",
        intro:
          "Excel veya CSV dosyasını yükleyin. Tutar sütunlarını, bunların hangi para biriminde olduğunu ve hangisine çevirmek istediğinizi seçin. Tavnit her birinin yanına günün kuruyla çevrilmiş sütunu ekler ve dosyanızın tamamını geri verir.",
        trust: ["CSV veya Excel · en fazla 500 satır", "Günde {limit} ücretsiz dosya", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Excel veya CSV dosyanızı buraya bırakın",
          hint: "ya da bilgisayarınızdan bir dosya seçin",
          choose: "Dosya seçin",
          sample: "Örnek bir dosya deneyin",
          formats: "CSV veya .xlsx · en fazla 4 MB ve 500 satır",
        },
        errors: {
          unsupported: "Yalnızca CSV veya Excel (.xlsx) dosyaları.",
          xls: "Bu eski bir Excel dosyası (.xls). Excel'de açıp .xlsx ya da .csv olarak kaydedin.",
          too_many_rows: "Ücretsiz sürüm en fazla 500 satır işler. Dosyanın bir kısmını yükleyin.",
          too_many_columns: "Bir seferde en fazla 10 sütun seçin.",
          no_columns: "En az bir sütun seçin.",
          nothing_to_clean: "Bu sütunlarda çevrilecek tutar bulamadık.",
          empty: "Dosya boş ya da başlığın altında satır yok.",
          unreadable: "Dosyayı okuyamadık. Bir Excel dosyasıysa .xlsx olarak yeniden kaydedin.",
          failed: "Bu dosyayı dönüştüremedik. Tekrar deneyin ya da örnek dosyayı kullanın.",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "Dosyayı yükleyin", body: "Fiyatlar, toplamlar ya da herhangi bir tutar sütunu içeren bir CSV veya Excel dosyası." },
            { title: "Para birimlerini seçin", body: "Tutara benzeyen sütunları biz işaretleriz. Siz bunların hangi para biriminde olduğunu, ondalıklarının nasıl yazıldığını ve neye çevrileceğini söylersiniz." },
            { title: "İnceleyin ve indirin", body: "Çevrilen her sütun orijinalinin yanında durur. Ücretsiz hesabınızla dosyayı Excel ya da CSV olarak alırsınız." },
          ],
        },
        faqs: [
          { q: "Hangi döviz kurunu kullanıyor?", a: "Avrupa Merkez Bankası'nın yayımladığı günün referans kurunu. Kur tüm dosya için aynıdır ve bir referanstır; bankanızın alış ya da satış kuru değildir." },
          { q: "Hangi para birimlerini çevirebilirim?", a: "ABD doları (USD), euro (EUR), sterlin (GBP), Türk lirası (TRY), Meksika pesosu (MXN), Brezilya reali (BRL), yuan (CNY), Kanada doları, yen, İsviçre frangı ve Avrupa Merkez Bankası'nın yayımladığı diğer para birimleri; toplam 30 adet. Herhangi birinden herhangi birine çevirebilirsiniz." },
          { q: "Kolombiya pesosu, sol, Şili pesosu ya da balboa ile çalışır mı?", a: "Henüz değil: bu para birimleri Avrupa Merkez Bankası'nın kurları arasında yok. Balboanın dolarla başa baş olduğu Panama'da USD'yi seçebilirsiniz." },
          { q: "Orijinal sütunlarıma ne oluyor?", a: "Olduğu gibi kalırlar. Çevrilmiş değerler, karşılaştırabilmeniz için yanlarına yeni bir sütun olarak eklenir; örneğin \"Price (USD)\"." },
          { q: "Tutar olmayan hücrelere ne oluyor?", a: "Çevrilmiş sütunda boş kalırlar. Metin, yüzde ya da boş bir hücre çevrilmez." },
          { q: "Dosyama ne oluyor?", a: "Yalnızca bu dönüştürme için kullanılır ve 24 saat sonra sonuçla birlikte silinir. Sonucu yalnızca sizin tarayıcınız görebilir." },
          { q: "Bunun kendiliğinden olmasını nasıl sağlarım?", a: "Tavnit'te döviz çevirisi bir Cleaner'dır: çıkardığınız her faturada ya da e-posta veya API ile gelen her dosyada tarihler, sayılar ve kontrollerle birlikte kendiliğinden çalışır." },
        ],
        clean: {
          setup: {
            heading: "Sütunları ve para birimlerini seçin",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Tutar içeren sütunlar",
            columnsHint: "En fazla {max}. Tutara benzeyenleri işaretledik.",
            tooMany: "Bir seferde en fazla {max} sütun seçebilirsiniz.",
            sourceLabel: "Tutarların para birimi",
            sourceHint: "Avrupa Merkez Bankası kuru olan para birimleri.",
            inputLabel: "Ondalık ayırıcı",
            inputOptions: { comma: "virgül · 1.234,56", dot: "nokta · 1,234.56" },
            outputPopular: "En çok kullanılanlar",
            outputAll: "Tüm para birimleri",
            outputLabel: "Şuna çevir",
            outputOptions: {},
            preview: "İlk satırlar",
            run: "Dönüştürün",
            change: "Dosyayı değiştirin",
          },
          stages: ["Dosya yükleniyor", "Tutarlar okunuyor", "Günün kuru alınıyor", "Çevriliyor", "Dosyanız hazırlanıyor"],
          heading: "Tamamlandı: {file}",
          summary: "{cols} içinde {cells} çevrildi",
          cellWord: ["hücre", "hücre"],
          columnWord: ["sütun", "sütun"],
          unchanged: "Bu sütunlarda çevrilecek tutar bulamadık.",
          highlight: "Çevrilen sütunlar mavi renkte.",
          shown: "{total} satırın {shown} tanesi gösteriliyor. İndirilen dosyada hepsi var.",
          download: "İndirin",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Başka bir dosya dönüştürün",
          automate: {
            heading: "Bunu her faturada otomatik yapın",
            body: "Tavnit'te döviz çevirisi bir Cleaner'dır. Bir kez kurarsınız; başka bir para birimindeki her fatura ya da teklif, tarihler, sayılar ve kontrollerle birlikte çevrilmiş olarak gelir.",
            cta: "Ücretsiz hesap oluşturun",
            docs: "Cleaner nedir?",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Excel Sütunlarını Ücretsiz Çevirin",
        description:
          "Bir Excel veya CSV dosyası yükleyin, seçtiğiniz sütunları 40'tan fazla dile çevirin: İngilizce, İspanyolca, Portekizce, Çince ve daha fazlası. Her çeviri kendi sütununun yanına eklenir. Ücretsiz, sonucu görmek için kayıt gerekmez.",
        label: "Sütunları çevirin",
        h1: "Tablonuzun sütunlarını çevirin",
        intro:
          "Excel veya CSV dosyasını yükleyin. Hangi sütunların hangi dile çevrileceğini seçin. Tavnit kaynak dili algılar ve çeviriyi her sütunun yanına ekler; dosyanızın geri kalanına dokunmaz.",
        trust: ["CSV veya Excel · en fazla 200 satır", "Günde {limit} ücretsiz dosya", "Her şey 24 saat sonra silinir"],
        drop: {
          title: "Excel veya CSV dosyanızı buraya bırakın",
          hint: "ya da bilgisayarınızdan bir dosya seçin",
          choose: "Dosya seçin",
          sample: "Örnek bir dosya deneyin",
          formats: "CSV veya .xlsx · en fazla 4 MB ve 200 satır",
        },
        errors: {
          unsupported: "Yalnızca CSV veya Excel (.xlsx) dosyaları.",
          xls: "Bu eski bir Excel dosyası (.xls). Excel'de açıp .xlsx ya da .csv olarak kaydedin.",
          too_many_rows: "Ücretsiz çeviri en fazla 200 satır işler. Dosyanın bir kısmını yükleyin.",
          too_many_columns: "Bir seferde en fazla 10 sütun seçin.",
          no_columns: "En az bir sütun seçin.",
          nothing_to_clean: "Bu sütunlarda çevrilecek metin bulamadık.",
          empty: "Dosya boş ya da başlığın altında satır yok.",
          unreadable: "Dosyayı okuyamadık. Bir Excel dosyasıysa .xlsx olarak yeniden kaydedin.",
          failed: "Bu dosyayı çeviremedik. Tekrar deneyin ya da örnek dosyayı kullanın.",
        },
        how: {
          heading: "Nasıl çalışır?",
          steps: [
            { title: "Dosyayı yükleyin", body: "Açıklamalar, talimatlar, yorumlar ya da herhangi bir metin sütunu içeren bir CSV veya Excel dosyası." },
            { title: "Sütunları ve dili seçin", body: "Metin içeren sütunları biz işaretleriz. Siz dili seçersiniz; kaynak dil sizin için algılanır." },
            { title: "İnceleyin ve indirin", body: "Her çeviri, orijinal sütununun yanında durur. Ücretsiz hesabınızla dosyayı Excel ya da CSV olarak alırsınız." },
          ],
        },
        faqs: [
          { q: "Hangi dilleri seçebilirim?", a: "40'tan fazla: İngilizce, İspanyolca, Portekizce, Fransızca, Almanca, Çince, İtalyanca, Japonca, Korece, Arapça, Rusça, Hintçe, Türkçe, Vietnamca ve çok daha fazlası. Kaynak dil hücre hücre algılanır; bu yüzden dosyanızda diller karışık olsa bile çalışır." },
          { q: "Kodlara, sayılara ve özel isimlere ne oluyor?", a: "Korunurlar. Çeviri biçimlendirmeye, birimlere ve kodlara saygı gösterir; zaten hedef dilde olan bir hücre olduğu gibi bırakılır." },
          { q: "Sınır neden 200 satır?", a: "Çünkü her hücre bir dil modeliyle çevrilir. Ücretsiz sürüm dosya başına en fazla 200 satır işler; bir hesapta böyle bir sınır yoktur." },
          { q: "Orijinal sütunlarıma ne oluyor?", a: "Olduğu gibi kalırlar. Çeviri yanlarına yeni bir sütun olarak eklenir; örneğin \"Description (ES)\"." },
          { q: "Gümrükteki ürün açıklamaları için kullanabilir miyim?", a: "Evet, yaygın bir kullanım: malları sınıflandırmadan önce bir ticari faturanın ya da çeki listesinin açıklamalarını İngilizceye veya İspanyolcaya çevirmek." },
          { q: "Dosyama ne oluyor?", a: "Yalnızca bu çeviri için kullanılır ve 24 saat sonra sonuçla birlikte silinir. Sonucu yalnızca sizin tarayıcınız görebilir." },
          { q: "Bunun kendiliğinden olmasını nasıl sağlarım?", a: "Tavnit'te çeviri bir Cleaner'dır: çıkardığınız her belgede ya da e-posta veya API ile gelen her dosyada tarihler, sayılar ve para birimleriyle birlikte kendiliğinden çalışır." },
        ],
        clean: {
          setup: {
            heading: "Sütunları ve dili seçin",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Metin içeren sütunlar",
            columnsHint: "En fazla {max}. Metin içerenleri işaretledik.",
            tooMany: "Bir seferde en fazla {max} sütun seçebilirsiniz.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "En çok kullanılanlar",
            outputAll: "Tüm diller",
            outputLabel: "Şu dile çevir",
            outputOptions: {},
            preview: "İlk satırlar",
            run: "Çevirin",
            change: "Dosyayı değiştirin",
          },
          stages: ["Dosya yükleniyor", "Sütunlar okunuyor", "Dil algılanıyor", "Çevriliyor", "Dosyanız hazırlanıyor"],
          heading: "Tamamlandı: {file}",
          summary: "{cols} içinde {cells} çevrildi",
          cellWord: ["hücre", "hücre"],
          columnWord: ["sütun", "sütun"],
          unchanged: "Bu sütunlarda çevrilecek metin bulamadık.",
          highlight: "Çevrilen sütunlar mavi renkte.",
          shown: "{total} satırın {shown} tanesi gösteriliyor. İndirilen dosyada hepsi var.",
          download: "İndirin",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Başka bir dosya çevirin",
          automate: {
            heading: "Bunu her belgede otomatik yapın",
            body: "Tavnit'te çeviri bir Cleaner'dır. Bir kez kurarsınız; gelen her fatura, çeki listesi ya da dosya, açıklamaları çevrilmiş olarak gelir.",
            cta: "Ücretsiz hesap oluşturun",
            docs: "Cleaner nedir?",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Ücretsiz. Şablon yok. Faturanızın kalemleri elektronik tablo olarak.",
    "invoice-line-items": "Ücretsiz. Her kalem bir satır, başlık her satırda. Şablon yok.",
    "po-invoice-check": "Ücretsiz. Siparişin her satırı faturayla karşılaştırılır: fiyat, miktar, eksik ve fazla satırlar.",
    "split-scanned-pdf": "Ücretsiz. Tek bir tarama girer, her belge sınıflandırılmış olarak çıkar.",
    "packing-list-to-excel": "Ücretsiz. Şablon yok. Çeki listenizin her satırı elektronik tablo olarak.",
    "bill-of-lading-to-excel": "Ücretsiz. Şablon yok. Taraflar, gemi, limanlar ve her konteyner için bir satır.",
    "quote-comparison": "Ücretsiz. İki ya da üç teklif, tek tablo, her satırda en ucuzu işaretli.",
    "contract-dates": "Ücretsiz. Taraflar, süre, otomatik yenileme ve bildirim tarihi, tek satırda.",
    "receipt-to-excel": "Ücretsiz. Fişin fotoğrafını çekin, ürünlerini elektronik tablo olarak alın.",
    "number-format": "Ücretsiz. Her sayı sütunu tek biçimde: 1234.56, 1,234.56 ya da 1.234,56.",
    "date-format": "Ücretsiz. Karışık tarihler girer, tek biçim çıkar; yazıyla yazılmış tarihler bile.",
    "currency-converter": "Ücretsiz. Her fiyat sütunu, günün referans kuruyla çevrilir.",
    "translate-columns": "Ücretsiz. Her metin sütunu, 40'tan fazla dilden birine çevrilir.",
  },
};

export default copy;
