import type { GuidesContent } from "@/content/types";

/**
 * Guides: the /guides hub copy and every guide — Türkçe (tr).
 * Slugs, dates, `readingMinutes` and every `href` stay as in English.
 */
const tr: GuidesContent = {
  hub: {
    title: "Kılavuzlar — PO Eşleştirme, Fatura Kalemleri, HS Kodları ve Belge Otomasyonu",
    description:
      "Belge otomasyonunun ardındaki sorunlara sade bir dille kılavuzlar: faturaları satın alma siparişleriyle eşleştirme, fatura kalemlerini çıkarma, HS kodlarını sınıflandırma ve daha fazlası.",
    ogTitle: "Tavnit Kılavuzları",
    ogDescription:
      "PO eşleştirme, kalem çıkarımı, HS kodu sınıflandırması ve belge operasyonlarının geri kalanı için sade dilde kılavuzlar.",
    breadcrumbHome: "Ana sayfa",
    name: "Kılavuzlar",
    h1: "Belge otomasyonu kılavuzları",
    intro:
      "Ürünün ardındaki sorunlar, kendi terimleriyle açıklanıyor: PO eşleştirme neyi kontrol eder, fatura tabloları neden zor çıkarılır, gümrük tarife sınıflandırması gerçekte nasıl işler. Son bölüme kadar hiçbir sağlayıcıya bağlı değil; son bölümde Tavnit'in neyi otomatikleştirdiğini anlatıyoruz.",
    minRead: "{m} dk okuma",
    read: "Okuyun",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Faturalar Satın Alma Siparişleriyle Nasıl Eşleştirilir (İki ve Üç Yönlü)",
      h1: "Faturalar satın alma siparişleriyle nasıl eşleştirilir",
      description:
        "PO eşleştirme nedir, iki yönlü ve üç yönlü eşleştirme arasındaki fark nedir, manuel eşleştirme nerede başarısız olur ve ERP'nizi değiştirmeden nasıl otomatikleştirilir.",
      lede: "Fatura–PO eşleştirmesi, bir tedarikçi faturasının dayandığı satın alma siparişiyle (PO) uyuşup uyuşmadığını kontrol eder: aynı tedarikçi, aynı kalemler, aynı miktarlar, aynı fiyatlar. İki yönlü eşleştirme faturayı PO ile karşılaştırır; üç yönlü eşleştirme buna mal kabul belgesini ekler. Bir şirketin sipariş etmediği ya da teslim almadığı şeyler için ödeme yapmasını engelleyen kontrol budur.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "PO eşleştirme gerçekte neyi kontrol eder",
          paragraphs: [
            "Satın alma siparişi bir satın alma taahhüdüdür; fatura ise bir ödeme talebidir. Bunları eşleştirmek tek bir soruyu yanıtlar — bu fatura tam olarak üzerinde anlaştığımız şeyi mi istiyor? — ve bunu dört boyutta yapar: tedarikçi, kalemler, miktarlar ve birim fiyatlar. Beşinci boyut olan toplamlar, diğer dördünün bir sonucudur ve tek başına kontrol edilecek en az yararlı şeydir.",
            "Toplamların zayıf bir kontrol olmasının nedeni, beklediğinizden çok daha sık tesadüfen tutmalarıdır. On iki birimi 10 $'dan değil de on birimi 12 $'dan faturalayan bir faturanın toplamı doğru, geri kalan her şeyi yanlıştır. Başlık düzeyinde eşleştirme PO'su olmayan faturayı yakalar; yanlış kalemleri olan faturayı ise yalnızca kalem düzeyinde eşleştirme yakalar.",
          ],
        },
        {
          heading: "İki yönlü ve üç yönlü eşleştirme",
          paragraphs: [
            "İki yönlü eşleştirme faturayı satın alma siparişiyle karşılaştırır. Bunu bu fiyattan almayı kabul ettiğinizi doğrular. Teslim aldığınızı doğrulamaz; bu yüzden genellikle hizmetler, abonelikler ve kabul adımının maliyetinin riski aştığı düşük değerli mallar için kullanılır.",
            "Üç yönlü eşleştirme mal kabul belgesini ekler — fiziksel olarak neyin geldiğini kaydeden irsaliye, sevk fişi ya da depo giriş fişi. Artık faturanın hem sipariş edilenle hem de teslim alınanla uyuşması gerekir. Sekiz gönderip on faturalayan bir tedarikçi burada yakalanır, başka hiçbir yerde değil. Fiziksel mallar için standart budur ve çoğu denetim çerçevesi belirli bir önemlilik eşiğinin üzerinde bunu bekler.",
            "Bazı ekipler, bir muayene ya da kalite kabul kaydını ekleyerek dört yönlü eşleştirmeden söz eder. Bir belge daha eklenmiş aynı fikirdir ve aynı mekanizma geçerlidir.",
          ],
        },
        {
          heading: "Manuel eşleştirme neden bozulur",
          paragraphs: [
            "Satın alma siparişi yapılandırılmıştır — kendi sisteminizden çıkmıştır. Fatura öyle değildir. Tedarikçinin sisteminden, tedarikçinin düzeninde, tedarikçinin parça numaraları ve her kalemi tedarikçinin tarif ediş biçimiyle bir PDF olarak gelir. Herhangi bir karşılaştırma yapılmadan önce birinin o PDF'i okuyup PO ile aynı yapıya çevirmesi gerekir. Çoğu borç hesapları ekibinde bu çeviri, önünde iki pencere açık bir kişidir.",
            "Hatalar tam da buradan girer. Karşılaştırmanın kendisi zor değildir; bir tablo bunu yapabilir. Zor olan veri aktarımıdır, çünkü tekrarlıdır, düzenler tedarikçiden tedarikçiye değişir ve yanlış bir miktar doğrusuyla tıpatıp aynı görünür. Çoğu şirketin yaşadığı eşleştirme hatası, eşleştirme mantığının hatası değildir. Ondan önceki veri girişinin hatasıdır.",
          ],
          bullets: [
            "Tedarikçi parça numaraları dahili SKU'lardan farklıdır; bu yüzden kalem eşleştirmesi, kimsenin güncel tutmadığı bir eşleme tablosuna ihtiyaç duyar.",
            "Açıklamaların ifadesi farklıdır — “Blue widget 10pk” karşısında “WIDGET-BLU x10” — bu yüzden birebir metin eşleştirmesi aslında aynı olan kalemlerde başarısız olur.",
            "Ölçü birimi ve ambalaj boyutu aritmetiği değiştirir: 12'lik 1 koli ile 12 adet.",
            "Kısmi teslimatlar ve bölünmüş faturalar, bir PO'nun birden fazla faturaya karşılık geldiği, yani eşleşmenin çoka-bir olduğu anlamına gelir.",
            "Navlun, ek ücretler ve vergiler faturada yer alır ama PO'da yer almaz; bunların uyumsuzluk değil, kabul edilebilir farklar olarak sınıflandırılması gerekir.",
          ],
        },
        {
          heading: "Toleranslar: neyin uyumsuzluk sayılacağına karar vermek",
          paragraphs: [
            "Gerçek dünyada hiçbir eşleşme birebir değildir. Fiyatlar kur değişmeden önce verilir; tedarikçiler yuvarlar; navlun tahminidir. Bir kuruşluk farkta her faturayı durduran bir eşleştirme süreci bir ay içinde kapatılır. Çözüm bir tolerans politikasıdır: fatura bekletilmeden önce her boyutta ne kadar sapmanın kabul edilebilir olduğuna dair önceden kararlaştırılmış bir kural.",
            "Tipik politikalar birim fiyatta küçük bir yüzde ya da mutlak sapmaya, fiziksel mallarda miktarda sıfır sapmaya ve navlun ile ek ücret kalemleri için ayrı bir paya izin verir. Önemli olan kuralın yazılı olması ve o gün eşleştirmeyi kim yapıyorsa onun kararına değil, sistem tarafından uygulanmasıdır. Tolerans içindeki faturalar akar; dışındakiler durur ve bir kişiye gider.",
          ],
        },
        {
          heading: "Adım adım nasıl otomatikleştirilir",
          paragraphs: [
            "Otomasyon eşleştirme yazılımıyla başlamaz. Her iki belgeyi aynı yapılandırılmış şekle getirmekle başlar; böylece karşılaştırma bir okuma değil, bir sorgu olur.",
          ],
          bullets: [
            "Sipariş belgeleri için tek bir alan şeması tanımlayın: PO numarası, tedarikçi, kalem SKU'su, açıklama, miktar, birim fiyat, kalem tutarı, toplam. Bunu PO'lar, faturalar ve irsaliyeler için aynı şekilde kullanın.",
            "Gelen her faturayı bu şemaya çıkarın. Çoğu ekibin atladığı adım budur ve sonraki her şeyi mümkün kılan adım da budur.",
            "Tedarikçi parça numaralarını, ürün ana verilerinize karşı bir eşlemeyle kendi SKU'larınıza normalleştirin; eşleme olmayan yerlerde kalemleri birebir metne göre değil, açıklamanın anlamsal benzerliğine göre eşleştirin.",
            "Önce faturayı kendi içinde doğrulayın: birim fiyat çarpı miktar kalem tutarına eşit mi, kalemlerin toplamı genel toplamı veriyor mu? Aritmetik hatalar yakalaması en ucuz ve ödenmesi en utanç verici hatalardır.",
            "Başlık alanlarını PO numarasına göre, ardından kalemleri eşleşen PO içinde eşleştirin. Tolerans politikanızı her boyut için uygulayın.",
            "Yalnızca istisnaları; fatura, PO ve somut uyuşmazlık önünde olacak şekilde bir inceleyiciye yönlendirin. Eşleşenleri doğrudan ERP'ye kaydedin.",
            "Kimin neyi ne zaman onayladığına dair bir denetim izi tutun. Denetçiler bunu ister; eksik ödemeye itiraz eden tedarikçi de.",
          ],
        },
      ],
      tavnit: {
        heading: "Tavnit'in yeri",
        paragraphs: [
          "Tavnit çıkarımı ve şekillendirmeyi yapar. Satın alma siparişleri, faturalar ve irsaliyeler e-posta veya API ile gelir ve tedarikçinin düzeni ne olursa olsun aynı tipli alanlara çıkarılır. Bir eşleme (lookup) Cleaner'ı tedarikçi parça numaralarını SKU'larınıza eşler; bir formül Cleaner'ı kalem aritmetiğini kontrol eder; bir koşul da toleransınızın dışındaki her şeyi işaretler.",
          "Kalem düzeyinde eşleştirme için bir Matcher, PO çalıştırmasını referans (benchmark) alır ve her fatura kalemini ona eşler — anlamsal olarak, sınırdaki çiftler için bir LLM karar vericisiyle — miktar ve birim fiyatı yan yana koyar ve eşleşmeyen kalemleri uyarı olarak listeler. İşaretlenen faturalar, yalnızca ekleme yapılabilen bir denetim iziyle, adı belirlenmiş bir inceleyici için bekletilir; geri kalanlar API veya webhook ile ERP'nize gider.",
        ],
        links: [
          { label: "PO eşleştirme yazılımı", href: "/use-cases/purchase-orders" },
          { label: "Fatura işleme", href: "/use-cases/invoice-processing" },
          { label: "İrsaliyeler ve mal kabul kontrolleri", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "İki yönlü ve üç yönlü eşleştirme arasındaki fark nedir?", a: "İki yönlü eşleştirme faturayı satın alma siparişiyle karşılaştırır — bunu bu fiyattan almayı kabul ettik mi? Üç yönlü eşleştirme ayrıca mal kabul belgesiyle karşılaştırır — gerçekten geldi mi? Fiziksel mallar için standart üç yönlüdür; iki yönlü ise hizmetler ve düşük değerli alımlarda yaygındır." },
        { q: "PO eşleştirme tamamen otomatikleştirilebilir mi?", a: "Karşılaştırma otomatikleştirilebilir. Otomasyona direnen kısım, tedarikçinin fatura PDF'ini PO'nuzla aynı yapılandırılmış şekle getirmektir; çünkü her tedarikçinin düzeni, parça numaraları ve açıklamaları farklıdır. Çıkarım otomatikleştirildiğinde eşleştirme bir sorgu olur ve yalnızca istisnalar bir insana ihtiyaç duyar." },
        { q: "PO eşleştirme için hangi toleransı belirlemeliyim?", a: "Evrensel bir sayı yoktur. Çoğu politika birim fiyatta küçük bir yüzde ya da mutlak sapmaya, fiziksel mallarda miktarda sıfır sapmaya izin verir ve navlun ile ek ücretleri ayrı, kabul edilebilir kalemler olarak ele alır. Önemli olan kuralın yazılı olması ve sistem tarafından tutarlı biçimde uygulanmasıdır." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Faturalardan Kalem Çıkarımı: Nedir ve Neden Zordur",
      h1: "Faturalardan kalem çıkarımı",
      description:
        "Fatura kalemlerini çıkarmak neden toplamları çıkarmaktan daha zordur, iyi bir kalem çıkarımı ne döndürür ve şablon olmadan her tedarikçi düzeninden tablo verisi nasıl alınır.",
      lede: "Kalem çıkarımı, faturadaki tekrarlanan tabloyu — açıklaması, SKU'su, miktarı, birim fiyatı ve tutarıyla her ürün veya hizmet satırını — yalnızca tedarikçi, tarih ve toplam gibi başlık alanlarını değil, yapılandırılmış satırlar olarak çıkarır. PO eşleştirmeyi, harcama analizini ve stok mutabakatını mümkün kılan budur ve çoğu OCR aracının yanlış yaptığı kısımdır.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Başlık alanları ve kalemler",
          paragraphs: [
            "Her faturanın bir kez görünen ve bulunması kolay birkaç başlık alanı vardır — tedarikçi, fatura numarası, tarih, vade tarihi, para birimi, toplam. Bir de tablosu vardır. Tablo üç satır da olabilir, üç yüz satır da; sayfalara yayılabilir; diğer her tedarikçinin tablosundan farklı sütunlara sahip olabilir. Başlığı çıkarmak size ne kadar ödeyeceğinizi söyler. Kalemleri çıkarmak ise neye ödeme yaptığınızı söyler; sonraki her sürecin gerçekte sorduğu soru da budur.",
            "Harcama analizi kalem kategorilerine ihtiyaç duyar. PO eşleştirme kalem miktarlarına ve fiyatlarına. Stok yönetimi kalem SKU'larına. Vergi, kalem düzeyindeki oranlara. Kalemleri olmadan çıkarılmış bir fatura, içeriği olmayan bir ödeme talimatıdır.",
          ],
        },
        {
          heading: "Tablolar neden zor kısımdır",
          paragraphs: [
            "Toplam, sayfanın tahmin edilebilir bir bölgesindeki tek bir değerdir. Tablo ise bir yapıdır ve bu yapı her yerde farklıdır. Klasik OCR karakterleri ve konumları okur; “Miktar” sütununun altındaki sayının iki hücre solundaki açıklamaya ait olduğunu, açıklamanın ikinci satıra taştığını ya da son üç satırın kalem değil ara toplam olduğunu bilmez.",
          ],
          bullets: [
            "Sütun setleri tedarikçiye göre değişir: bazılarında SKU ve açıklama vardır, bazılarında yalnızca açıklama, bazıları da birim fiyatı net ve brüt olarak ikiye böler.",
            "Çok satırlı açıklamalar taşar ve ikinci satır, konuma dayalı bir ayrıştırıcıya yeni bir satır gibi görünür.",
            "Tablolar sayfalara yayılır; başlıklar tekrarlanır ya da tekrarlanmaz, her sayfanın altında ara toplamlar yer alır.",
            "Kalem olmayan satırlar — ara toplamlar, indirimler, navlun, vergi, “devam ediyor” — tablonun içinde durur ve ürün olarak çıkarılmamalı, sınıflandırılmalıdır.",
            "Birleştirilmiş hücreler, bir sonraki sütuna kayan sağa hizalı sayılar ve taramadaki eğiklik, koordinata dayalı ayrıştırmayı bozar.",
            "Birimler ve ambalaj boyutları kendi sütunlarında değil, açıklamanın içinde saklıdır (“12'lik koli başına”).",
          ],
        },
        {
          heading: "Şablon tabanlı ve şablonsuz çıkarım",
          paragraphs: [
            "Şablon tabanlı araçlar tabloları, her tedarikçinin düzeni için tablo bölgesini ve sütunları sizin çizmenizle çözer. İşe yarar — o tedarikçi için, fatura biçimini değiştirene kadar; o noktada biri fark edene kadar sessizce yanlış satırlar üretir. Bakım maliyeti tedarikçi sayınızla birlikte büyür; yüzlerce tedarikçisi olan ekiplerin bu araçları bırakmasının nedeni budur.",
            "Şablonsuz çıkarım, bir fatura kaleminin ne olduğunu bir insanın anladığı gibi anlayan bir model kullanır ve düzen ne olursa olsun bir kez tanımladığınız şemaya göre — açıklama, miktar, birim fiyat, tutar — satırlar döndürür. Bedeli, bir modelin yanlış okuyabilmesidir; bu yüzden çıktıya güvenilmemeli, doğrulanmalıdır: her satırda aritmetik kontroller, bir kontrol başarısız olduğunda da insan incelemesi.",
          ],
        },
        {
          heading: "İyi bir kalem çıktısı neye benzer",
          paragraphs: [
            "Çıktı metin değil, tablo olmalıdır: kalem başına bir satır, alan başına tipli bir sütun; sayılar sayı, tarihler tarih olarak. Her satır, sonraki sürecinizin ihtiyaç duyduğu alanları taşımalı ve başlığa ait hiçbir şeyi içermemelidir. Kalem olmayan satırlar araya karışmamalı, hariç tutulmalı ya da işaretlenmelidir. Ve çıktı doğrulanabilir olmalıdır: birim fiyat çarpı miktar kalem tutarına eşit değilse o satır yanlıştır ve bunu belirtmelidir.",
          ],
          bullets: [
            "Açıklama — olduğu gibi, çünkü sonraki her eşleştirme ya da kategorizasyon ondan türetilir.",
            "SKU veya parça numarası — tedarikçininki, bir eşleme çözebiliyorsa sizinki de.",
            "Miktar ve ölçü birimi — ayrı alanlar olarak.",
            "Birim fiyat ve kalem tutarı — ikisi birden, böylece aritmetik kontrol edilebilir.",
            "Mevzuatın gerektirdiği yerlerde kalem başına vergi oranı veya kodu.",
            "Satır düzeyinde doğrulama durumu: aritmetik geçti ya da nedeniyle birlikte işaretlendi.",
          ],
        },
      ],
      tavnit: {
        heading: "Tavnit'in yeri",
        paragraphs: [
          "Tavnit'te kalemler bir Flow üzerindeki tablo alanlarıdır: sütunları bir kez adlandırırsınız ve her tedarikçinin her faturası, tedarikçiye özel şablon olmadan bu sütunlara tipli satırlar olarak çıkarılır. Bir formül Cleaner'ı her satırda birim fiyat çarpı miktarı doğrular; bir eşleme Cleaner'ı tedarikçi parça numaralarını SKU'larınıza çözümler; bir kategori Cleaner'ı harcama kategorilerini atar. Bir kontrolü geçemeyen satırlar çalıştırmayı bir inceleyiciye yönlendirir. Sonuçlar sorgulayabileceğiniz ya da grafiğe dökebileceğiniz bir Bucket'a düşer veya API ya da webhook ile doğrudan sistemlerinize gider.",
        ],
        links: [
          { label: "Fatura veri çıkarımı", href: "/use-cases/invoice-processing" },
          { label: "Flow'lar — tablo alanlarını tanımlama", href: "/docs/flows" },
          { label: "Cleaner'lar — formül ve eşleme alanları", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "OCR faturalardan kalem çıkarabilir mi?", a: "Düz OCR karakterleri ve konumlarını çıkarır; tablo yapısını anlamaz, bu yüzden hâlâ satırlara ayrıştırılması gereken bir metin üretir. Güvenilir kalem çıkarımı, bir fatura kaleminin ne olduğunu anlayan bir katman gerektirir: ya tedarikçiye özel bir şablon ya da düzenler arasında genelleme yapabilen bir model." },
        { q: "Fatura tablolarını tedarikçi başına şablon olmadan nasıl çıkarırım?", a: "Düzen ne olursa olsun tanımladığınız şemaya — açıklama, miktar, birim fiyat, tutar — göre satırlar döndüren bir çıkarım modeli kullanın, ardından her satırı aritmetik bir kontrolle doğrulayın ve başarısız olanları bir inceleyiciye yönlendirin. Tavnit'in tablo alanları tam olarak bunu yapar." },
        { q: "Çok sayfalı fatura tabloları nasıl ele alınmalı?", a: "Çıkarım, tabloyu sayfalar boyunca tek bir mantıksal tablo olarak ele almalı, tekrarlanan başlıkları ve sayfa başı ara toplamları yok saymalı ve tek bir satır kümesi döndürmelidir. Sayfa geçişinde hiçbir şeyin düşmediğinden emin olmak için satırların toplamının fatura toplamını verdiğini kontrol edin." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "HS Kodu Sınıflandırması — ve Nasıl Otomatikleştirilir",
      h1: "HS kodu sınıflandırması: nedir ve nasıl otomatikleştirilir",
      description:
        "Armonize Sistem nasıl işler, tarife sınıflandırması neden bir muhakeme işidir, Genel Yorum Kuralları nerede devreye girer ve sorumlu bir otomasyon neye benzer.",
      lede: "HS kodu sınıflandırması, ticareti yapılan her ürüne Armonize Sistem'den bir kod atar; bu, gümrük idarelerinin gümrük vergisi oranlarını, vergileri ve kontrolleri belirlemek için kullandığı uluslararası nomenklatürdür. İlk altı hane küreseldir; ülkeler bunu ulusal tarife pozisyonları için sekiz, on veya daha fazla haneye genişletir (Türkiye'de GTİP). Kodu yanlış belirlemek; yanlış vergi, geciken bir sevkiyat ya da ceza demektir.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Armonize Sistem nasıl kurgulanmıştır",
          paragraphs: [
            "Armonize Sistem, Dünya Gümrük Örgütü tarafından yönetilir ve yaklaşık beş yılda bir revize edilir; güncel sürüm HS 2022'dir. 21 bölüm, 97 fasıl (2 hane), pozisyon (4 hane) ve alt pozisyon (6 hane) olarak düzenlenmiştir. Bu altı hane her üye ülkede aynıdır; sistemi armonize yapan da budur. Altı hanenin ötesinde her ülke kendi alt bölümlerini — ulusal tarife pozisyonlarını — ekler ve gerçek vergi oranları ile yurt içi vergiler bunlara bağlanır.",
            "Örneğin Panama'nın Arancel Nacional de Importación'ı, HS 2022 nomenklatürünü yaklaşık 9.700 ulusal tarife pozisyonuna genişletir; her biri kendi ithalat vergisini (DAI), satış vergisini (ITBMS) ve uygulanabildiği yerde özel tüketim vergisini (ISC) taşır. Bir sınıflandırma altı hanede bitmez; ödenecek tutarı belirleyen ulusal pozisyona ulaştığında biter.",
          ],
        },
        {
          heading: "Sınıflandırma neden arama değil, muhakemedir",
          paragraphs: [
            "Sınıflandırma bir sözlük araması olsaydı — ürün adı girer, kod çıkar — onlarca yıl önce otomatikleştirilmiş olurdu. Öyle değil; çünkü nomenklatür malları neyden yapıldıklarına, ne işe yaradıklarına ve nasıl sunulduklarına göre sınıflandırır ve tek bir ürün açıklaması makul biçimde birden fazla pozisyona uyabilir. Isıtmalı bir araba koltuğu kılıfı bir tekstil eşyası mıdır, bir taşıt parçası mı, yoksa elektrikli bir ısıtma cihazı mı? Her birinin oranı farklıdır.",
            "Belirleyici olan, Armonize Sistemin Yorumlanmasına İlişkin Genel Kurallar'dır (GYK). Kural 1, pozisyon metinlerinin ve bölüm ile fasıl hukuki notlarının esas alınacağını söyler. Kural 2 eksik mallar ve karışımlarla ilgilidir. Kural 3, iki veya daha fazla pozisyona girebilecek malları ele alır — önce en özel tanım, sonra esas nitelik, sonra sayısal sırada en son gelen pozisyon. Kural 4 ile 6, başka yerde yer almayan mallar, ambalaj ve alt pozisyon düzeyinde sınıflandırmayı düzenler. Savunulabilir bir sınıflandırma, dayandığı kuralı belirtir.",
            "Bir de hukuki notlar vardır: pozisyon metni ne der gibi görünürse görünsün belirli malları bir pozisyona dahil eden ya da ondan hariç tutan fasıl ve bölüm notları. Pozisyon başlıklarını okuyup notları yok sayan bir sınıflandırıcı, tahmin edilebilir bir ürün grubunda kendinden emin biçimde yanılır.",
          ],
        },
        {
          heading: "Sınıflandırma uygulamada nerede yanlış gider",
          paragraphs: [
            "Yanlış sınıflandırmanın çoğu zorlu bir GYK 3 vakası değildir. Kötü tarif edilmiş sıradan bir üründür. Ticari faturada “parçalar”, “numuneler” ya da bir marka adı yazar; sınıflandırmayı yapan kişi ya tahmin eder ya da durup sorar. Açıklama sınıflandırmanın ham maddesidir ve genellikle süreçteki en zayıf girdidir.",
          ],
          bullets: [
            "Ticari faturada belirsiz açıklamalar — ürünün ne olduğunu veya neyden yapıldığını belirtmeyen bir marka ya da model numarası.",
            "Tek bir fatura satırının farklı sınıflandırılan birkaç ayrı ürünü kapsadığı karışık sevkiyatlar.",
            "Başka bir ülkenin tarifesine göre ve muhtemelen başka bir amaçla sınıflandırılmış, tedarikçinin beyan ettiği HS koduna güvenmek.",
            "Bir HS sürüm değişikliği ürünün yerini değiştirdikten sonra geçen yılın kodunu kullanmaya devam etmek.",
            "Fasıl notlarını yok sayıp yalnızca pozisyon başlığına göre sınıflandırmak.",
            "Bir kodun neden seçildiğine dair kayıt olmaması; böylece aynı ürünün üç kişi tarafından üç farklı şekilde sınıflandırılması.",
          ],
        },
        {
          heading: "Sorumlu bir otomasyon neye benzer",
          paragraphs: [
            "Amaç gözetimsiz sınıflandırma yapan bir makine değildir. Gümrük mevzuatı beyan sorumluluğunu ithalatçıya ya da yetkili gümrük müşavirine yükler ve yüklemeye devam edecektir. Amaç, sevkiyat evrakı işlendiği anda gerekçesiyle birlikte bir sınıflandırma öneren bir sistemdir; böylece uzman araştırmak yerine inceleme yapar.",
          ],
          bullets: [
            "Çıkarılan mal açıklamasıyla, olduğu gibi, artı fatura veya çeki listesindeki malzeme, işlev ve bileşim ayrıntılarıyla başlayın.",
            "Yalnızca altı haneli HS'ye göre değil, ulusal tarifeye — oranlarıyla birlikte tüm ulusal pozisyonlara — ve güncel sürüme göre sınıflandırın.",
            "Fasıl ve bölüm hukuki notlarını ve GYK'yı uygulayın; vakayı hangi kuralın ve hangi notun belirlediğini kaydedin.",
            "Bir kod, bir güven düzeyi ve gerekçe döndürün; düşük güvenli veya yüksek değerli satırları, beyanname verilmeden önce incelenmek üzere bir gümrük müşavirine yönlendirin.",
            "Her sınıflandırma için bir denetim izi tutun. Gümrük iki yıl sonra bir kodu sorguladığında savunmanız gerekçedir.",
            "Müşavirin düzeltmelerinden öğrenin: bir kez sınıflandırılmış bir ürün bir dahaki sefere de aynı şekilde sınıflandırılmalıdır.",
          ],
        },
      ],
      tavnit: {
        heading: "Tavnit'in yeri",
        paragraphs: [
          "Tavnit, sevkiyat belge setini — ticari fatura, çeki listesi, konşimento, menşe şahadetnamesi — tipli alanlara çıkarır; ardından bir HS kodu Cleaner'ı, aynı çalıştırma sırasında her mal satırını çıkarılan açıklamasından sınıflandırır. Panama için sınıflandırıcı, ulusal pozisyonları ve DAI, ITBMS ve ISC oranlarıyla resmî Arancel Nacional (VII Enmienda, HS 2022) üzerinde çalışır, hukuki fasıl notlarını ve GYK'yı uygular; böylece çıktı altı haneli bir tahmin değil, gerekçesiyle birlikte bir ulusal tarife pozisyonudur.",
          "Sınıflandırmalar, herhangi bir beyan yapılmadan önce İnsan incelemesinden geçer; hangi kodu kimin onayladığı, yalnızca ekleme yapılabilen bir denetim izine kaydedilir. Yapılandırılmış ve sınıflandırılmış veriler daha sonra beyanname formuna yeniden yazılmak yerine onu önceden doldurabilir.",
        ],
        links: [
          { label: "HS sınıflandırmalı gümrük otomasyonu", href: "/use-cases/customs-trade" },
          { label: "Aduanas y clasificación arancelaria (Panamá) — İspanyolca", href: "/es/aduanas" },
          { label: "Cleaner'lar — HS kodu alan tipi", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "HS kodu ile tarife kodu arasındaki fark nedir?", a: "HS kodu, Dünya Gümrük Örgütü tarafından tanımlanan altı haneli uluslararası koddur. Tarife kodu ise bir ülkenin bunu genişletmesidir — sekiz, on veya daha fazla hane — ve ulusal vergi oranları buna bağlanır. Panama'nın Arancel Nacional'ı, AB'nin TARIC'i, ABD'nin HTS'si ve Türkiye'nin GTİP'i, HS üzerine kurulmuş ulusal tarifelerdir." },
        { q: "Yapay zekâ HS kodlarını doğru sınıflandırabilir mi?", a: "İyi bir ürün açıklamasından yola çıktığında, hukuki notlarıyla birlikte tüm ulusal tarifeye göre çalıştığında ve gerekçesini açıkladığında iyi sınıflandırma önerileri sunabilir. Gözetimsiz beyanname vermemelidir: sorumlu yaklaşım, güven düzeyi ve gerekçesiyle bir öneri sunmak ve düşük güvenli ya da yüksek değerli satırları yetkili bir gümrük müşavirinin incelemesine bırakmaktır." },
        { q: "Tedarikçimin faturaya yazdığı HS kodunu kullanabilir miyim?", a: "Bunu bir yanıt değil, bir ipucu olarak değerlendirin. Tedarikçi kendi ülkesinin tarifesine göre, muhtemelen ithalat vergisi için değil ihracat kontrolleri için ve muhtemelen eski bir HS sürümüne göre sınıflandırmıştır. İthalat beyannamesindeki koddan ithalatçı veya gümrük müşaviri sorumludur." },
      ],
    },
  ],
};

export default tr;
