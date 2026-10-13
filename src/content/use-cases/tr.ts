import type { UseCasesContent } from "@/content/types";

/**
 * Use cases: the /use-cases hub copy and every use-case page — Türkçe (tr).
 * `slug` and every `pipeline[].href` stay English (they are URLs).
 */
const tr: UseCasesContent = {
  hub: {
    title: "Kullanım Senaryoları — Faturalar, Sözleşmeler, Özgeçmişler ve Daha Fazlası",
    description:
      "Ekiplerin Tavnit'i belge türüne göre nasıl kullandığı — faturalar, sözleşmeler, özgeçmişler, fişler, satın alma siparişleri ve gümrük evrakı; her birinde nelerin ters gittiğiyle birlikte.",
    ogTitle: "Tavnit Kullanım Senaryoları",
    breadcrumbHome: "Ana sayfa",
    breadcrumb: "Kullanım Senaryoları",
    h1: "Kullanım senaryoları",
    intro:
      "Ne gönderirseniz gönderin Pipeline aynıdır — çıkarın, temizleyin, inceleyin, harekete geçin. Değişen, hangi alanların önemli olduğu ve genellikle neyin ters gittiğidir.",
    introMore:
      "Aşağıdaki her sayfa, o belge türünden çıkarmaya değer alanları, düzenli olarak bozulan kısımları ve Pipeline'ın hangi aşamasının gerçekten fark yarattığını anlatır.",
    notSeeingHeading: "Belge türünüzü göremiyor musunuz?",
    notSeeing:
      "Bunlar ekiplerin en çok sorduğu türlerdir, Tavnit'in desteklediklerinin listesi değil. Belge türüne özel kurulacak bir yapılandırma yoktur — istediğiniz alanları tarif edersiniz ve aynı çıkarım, taramalar ve el yazısı dahil her PDF'i veya görseli okur.",
    notSeeingMore:
      "İrsaliyeler, banka ekstreleri, sigorta hasar talepleri, tıbbi formlar, sertifikalar ve başvuru formları da aynı şekilde çalışır. [Başlangıç kılavuzundan](/docs) başlayın ve sizin için önemli olan alanları tanımlayın.",
    finalHeading: "Tek bir belgeyle başlayın",
    finalBody:
      "Bir Flow kurun, içinden gerçek bir belge geçirin ve herhangi bir bağlantı kurmadan önce çıktıyı değerlendirin. Başlangıç için ücretsiz krediler.",
    finalCta: "Ücretsiz başlayın",
  },
  items: [
    {
      slug: "invoice-processing",
      label: "Fatura İşleme",
      badge: "Finans ve Borç Hesapları",
      h1: "Otomatik fatura veri çıkarımı",
      title: "Kalem Bazında Fatura Veri Çıkarımı Yazılımı",
      description:
        "Tedarikçi faturalarından, düzeni ne olursa olsun tedarikçiyi, fatura numarasını, tarihleri, toplamları ve tüm kalemleri çıkarın; muhasebe kayıtlarınıza ulaşmadan önce inceleyin.",
      summary:
        "Her tedarikçi düzeninden tedarikçi, numara, tarihler, toplamlar ve kalemler — muhasebe kayıtlarınıza ulaşmadan önce inceleme ile.",
      lede: "Tavnit, tedarikçi faturalarını her düzende okur ve tedarikçiyi, fatura numarasını, tarihleri, vergiyi, toplamları ve her kalemi tipli alanlar olarak döndürür. Tedarikçiye özel kurulacak şablon yoktur. Bir inceleyici onaylayana kadar hiçbir şey muhasebe kayıtlarınıza işlenmez ve her onay kayıt altına alınır.",
      problem: [
        "Borç hesapları bu sorunun klasik örneğidir: her ay, yüz farklı düzenden yeniden yazılan aynı sekiz alan. Her tedarikçi farklı biçimlendirir; bazıları tarama, bazıları taramanın fotoğrafını gönderir ve şablonunu değiştirenler bunu haber vermeden yapar.",
        "Şablon tabanlı araçlar ilk sorunu kötü çözer — her tedarikçi için bir düzen yapılandırırsınız ve her yeni tedarikçi bir kurulum işi demektir. Bir tedarikçi faturasını yeniden tasarladığı anda şablon sessizce bozulur ve hatalar muhasebe kayıtlarınıza akar.",
      ],
      fields: [
        { name: "Tedarikçi adı ve adresi", note: "Çoğu zaman kayıtlarınızdaki ticari addan farklıdır — bir eşleme (lookup) Cleaner'ı onu tedarikçi listenizle eşleştirebilir." },
        { name: "Fatura numarası", note: "Sayı olarak değil, metin olarak tiplenir. Baştaki sıfırlar ve önekler önemlidir ve sayısal ayrıştırma bunları yok eder." },
        { name: "Düzenleme ve vade tarihleri", note: "Biçimler ülkeye göre değişir. Bir tarih Cleaner'ı GG/AA ve AA/GG biçimlerini tek bir çıktı biçimine normalleştirir." },
        { name: "Kalemler", note: "Tekrarlanan bir tablo: açıklama, miktar, birim fiyat, tutar. Çoğu aracın ya atladığı ya da düzleştirdiği kısım." },
        { name: "Ara toplam, vergi, indirim, toplam", note: "Dördünü de çıkarmaya değer; böylece aritmetiğe güvenmek yerine onu kontrol edebilirsiniz." },
        { name: "Para birimi", note: "Bir para birimi Cleaner'ı aynı anda tutarları raporlama para biriminize çevirebilir." },
        { name: "PO numarası", note: "Bulunduğu durumlarda faturayı bir satın alma siparişiyle otomatik eşleştirmenizi sağlayan alandır." },
      ],
      gotchas: [
        {
          title: "Çıkarım genellikle kalemlerde başarısız olur",
          body: "Başlık alanları kolaydır. Sayfa geçişine taşan, birleştirilmiş hücreleri olan ya da açıklamaları iki satıra bölen bir tablo, çoğu aracın makul görünen ama yanlış bir şey döndürdüğü yerdir. Bir Flow'daki tablo alanları tekrarlanan satırları satır olarak ele alır; böylece beş kalemli bir fatura tek bir metin yığını yerine beş kayıt döndürür.",
        },
        {
          title: "Yanlış bir toplam, doğrusuyla tıpatıp aynı görünür",
          body: "Doğru okunmuş 1.240,00 € ile aslında 1.249,00 € olan ama 1.240,00 € diye yanlış okunmuş bir tutar arasında görsel bir fark yoktur. Koşullu incelemenin gerekçesi budur: bir Cleaner kuralı kalemlerin ara toplamı verdiğini kontrol edip yalnızca başarısız olanları bir insana yönlendirebilir; böylece önemli olan birkaçını yakalamak için her şeyi incelemezsiniz.",
        },
        {
          title: "Birden fazla fatura tek bir PDF'te gelir",
          body: "Bir tedarikçi ekstresi ya da taranmış bir parti çoğu zaman tek bir dosyada birkaç fatura içerir. Önce bir Splitter onları ayırır; böylece her biri, birleşik bir karmaşa yerine kendi çıkarılmış kaydıyla kendi çalıştırması olur.",
        },
      ],
      pipeline: [
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Tedarikçiler faturaları zaten e-postayla gönderiyor. Borç hesapları gelen kutusunu otomatik yönlendirin; kimse uygulamayı açmadan her ek işlenir." },
        { label: "Splitter'lar", href: "/docs/splitters", why: "Toplu ya da zımbalı taramaları, çıkarımdan önce tek tek faturalara ayırır." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Tarihleri normalleştirir, para birimini çevirir, tedarikçileri tedarikçi listenizle eşleştirir ve tutmayan aritmetiği işaretler." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Bir çalıştırmayı onay için bekletir — her faturayı ya da yalnızca bir kuralın işaretlediklerini — ve kimin neyi onayladığını yalnızca ekleme yapılabilen bir kayıtta tutar." },
        { label: "Webhook'lar", href: "/docs/webhooks", why: "Onaylanan kaydı, incelemeden geçtiği anda doğrudan muhasebe sisteminize gönderir." },
      ],
      faqs: [
        { q: "Taranmış ve fotoğraflanmış faturaları işleyebilir mi?", a: "Evet. Taramalar, fotoğraflar ve görsel tabanlı PDF'ler çıkarımdan önce OCR'dan geçer. Kalite yine de önemlidir — net bir tarama, açılı çekilmiş bir telefon fotoğrafından daha güvenilir çıkarılır — sınırdaki durumlar için inceleme adımının var olmasının nedeni de budur." },
        { q: "Her tedarikçi için şablon kurmam gerekiyor mu?", a: "Hayır. İstediğiniz alanları bir kez tanımlarsınız ve aynı Flow, her tedarikçinin her düzendeki faturasını okur. Yeni bir tedarikçi eklemek hiçbir yapılandırma gerektirmez." },
        { q: "Yalnızca toplamları değil, kalemleri de çıkarabilir mi?", a: "Evet. Kalemler tablo alanları olarak tanımlanır; böylece tekrarlanan bir tablo, açıklama, miktar, birim fiyat ve tutarı ayrı ayrı tiplenmiş olarak satır başına bir kayıt döndürür." },
        { q: "Farklı para birimlerini nasıl ele alır?", a: "Para birimi kendi alanı olarak çıkarılır ve bir Cleaner işlem sırasında tutarları raporlama para biriminize çevirebilir; böylece sonraki sistemler tek ve tutarlı bir birim alır." },
      ],
    },
    {
      slug: "contract-analysis",
      label: "Sözleşme Analizi",
      badge: "Hukuk ve Satın Alma",
      h1: "Sözleşme veri çıkarımı",
      title: "Sözleşme Veri Çıkarımı — Koşullar ve Yenileme Tarihleri",
      description:
        "Bir sözleşme portföyünden tarafları, yürürlük ve yenileme tarihlerini, ödeme koşullarını, bildirim sürelerini ve sorumluluk sınırlarını gerçekten sorgulayabileceğiniz bir tabloya çıkarın.",
      summary:
        "Bir sözleşme portföyünden taraflar, yenileme tarihleri, bildirim süreleri ve ödeme koşulları, sorgulanabilir bir tabloya.",
      lede: "Tavnit imzalanmış sözleşmeleri okur ve yükümlülük doğuran koşulları — taraflar, yürürlük ve yenileme tarihleri, bildirim süreleri, ödeme koşulları, sorumluluk sınırları — yapılandırılmış alanlar olarak döndürür. Portföy, okumanız gereken bir klasör olmaktan çıkar ve sorgulayabileceğiniz bir tabloya dönüşür.",
      problem: [
        "Çoğu kuruluş kendi sözleşmeleri hakkındaki temel soruları yanıtlayamaz. Hangi sözleşmeler gelecek çeyrek otomatik yenileniyor? Toplam sorumluluk riskimiz ne? Hangi tedarikçilerin 90 günlük bildirim süresi var? Yanıtlar mevcuttur, ama kimsenin açmaya vakit bulamadığı yüzlerce PDF'e dağılmıştır.",
        "Maliyet okumanın kendisi değildir — fark edilmeden geçen yenilemeler ve bir uyuşmazlıktan önce değil, uyuşmazlık sırasında keşfedilen koşullardır.",
      ],
      fields: [
        { name: "Taraflar ve imzalayan tüzel kişiler", note: "Tüzel kişi çoğu zaman ticari ad değildir; ikisini de yakalamaya değer." },
        { name: "Yürürlük ve bitiş tarihleri", note: "İleride sormak isteyeceğiniz her yenileme sorusunu belirleyen ikili." },
        { name: "Otomatik yenileme ve bildirim süresi", note: "Bir yenilemenin bir tercih mi yoksa bir sürpriz mi olacağına karar veren iki alan." },
        { name: "Ödeme koşulları ve tutarlar", note: "30 gün vade, kilometre taşları, fiyat artış hükümleri. Sıklıkla tabloda değil, metin içinde." },
        { name: "Sorumluluk sınırı ve tazminatlar", note: "Genellikle bir sayı değil, bir maddedir. Metin olarak, varsa ayrıştırılmış bir değerle birlikte çıkarmaya değer." },
        { name: "Uygulanacak hukuk ve yetkili mahkeme", note: "Kısa, çıkarması kolay ve bir portföy genelinde elle bulması zahmetli." },
        { name: "Fesih hakları", note: "Haklı veya haksız nedenle fesih ve her birinin gerektirdiği bildirim." },
      ],
      gotchas: [
        {
          title: "Yanıt bir alanda değil, metinde",
          body: "Bir fatura toplamı bir kutuya koyar. Bir sözleşme ise bildirim süresini bir maddenin ortasına, bazen rakamla değil yazıyla gömer. Çıkarım ipuçları, bir etiketin eşleşmesini ummak yerine Flow'a koşulun ne anlama geldiğini ve genellikle nerede geçtiğini anlatmanızı sağlar.",
        },
        {
          title: "Ek protokoller yanıtı değiştirir",
          body: "Geçerli koşullar çoğu zaman asıl sözleşmede değil, bir ek protokoldedir. Her belgeyi kendi çalıştırması olarak ele alın ve imza tarihini bir alan olarak tutun; böylece güncel durum, hangi dosyanın en yeni olduğuna dair bir varsayım değil, bir sorgu olur.",
        },
        {
          title: "Burada hata pahalıdır, bu yüzden inceleme isteğe bağlı değildir",
          body: "Yanlış okunmuş bir yenileme tarihi, zamanında çıkamadığınız bir sözleşmedir. Bu, her çalıştırmada incelemenin orantılı olduğu ve yalnızca ekleme yapılabilen denetim izinin çıkarım kadar önemli olduğu bir kullanım senaryosudur — bir koşulu kimin ve ne zaman doğruladığını gösterebilirsiniz.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "Çıkarım ipuçları yapay zekâya bir koşulun ne anlama geldiğini anlatır; bu, burada etiketli alanları olan belgelere göre çok daha önemlidir." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Her koşulu kimin doğruladığının kalıcı kaydıyla, her çalıştırmada inceleme." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Portföyü sorgulanabilir bir tabloya dönüştürür — gelecek çeyrek hangi sözleşmeler yenileniyor, bildirim süresine göre sıralı." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Tarih biçimlerini normalleştirir ve bir bitiş tarihi ile bildirim süresinden son bildirim tarihini hesaplayabilir." },
      ],
      faqs: [
        { q: "Tutarlı bir yapısı olmayan sözleşmeleri işleyebilir mi?", a: "Evet — olağan durum da budur. Yapılandırılacak bir şablon yoktur. İstediğiniz koşulları tarif edersiniz ve Flow onları nerede geçerlerse geçsinler bulur; çıkarım ipuçlarının burada yapılandırılmış belgelere göre daha önemli olmasının nedeni budur." },
        { q: "Ek protokoller ve yan mektuplar ne olacak?", a: "Her birini imza tarihi bir alan olarak yakalanmış şekilde kendi çalıştırması olarak işleyin. Güncel durum böylece hangi PDF'in en yeni olduğunu tahmin etmekten değil, Bucket'ınızı sorgulamaktan gelir." },
        { q: "Çıkarılan veriler sorgulanabilir mi?", a: "Evet. Sonuçlar bir Bucket'a tipli sütunlar olarak düşer; böylece hiçbir şeyi dışa aktarmadan tüm portföy genelinde filtreleyebilir, sıralayabilir ve grafiğe dökebilirsiniz." },
      ],
    },
    {
      slug: "resume-screening",
      label: "Özgeçmiş Taraması",
      badge: "İK ve İşe Alım",
      h1: "Özgeçmiş ayrıştırma ve tarama",
      title: "Özgeçmiş Ayrıştırma Yazılımı — Yapılandırılmış Aday Verileri",
      description:
        "Her biçimdeki özgeçmişleri tutarlı aday kayıtlarına — iletişim, beceriler, unvanlar, tarihler, eğitim — dönüştürün; tarama bir okuma değil, bir filtre olsun.",
      summary:
        "Her biçimdeki özgeçmişler tutarlı aday kayıtlarına dönüşür; tarama okumak yerine filtrelemek olur.",
      lede: "Tavnit özgeçmişleri her düzende okur ve tutarlı aday kayıtları döndürür: iletişim bilgileri, beceriler, tarihleriyle iş unvanları, eğitim ve sertifikalar. Her aday aynı alanlarla tanımlandığından tarama, iki yüz PDF açmak yerine bir tabloyu filtrelemeye dönüşür.",
      problem: [
        "Özgeçmişler, çoğu ekibin ele aldığı en az standartlaşmış belgelerdir. Tek sütun ya da iki sütun, tablo ya da düz metin, tarihleri kenar çubuğunda duran tasarım odaklı bir düzen. Bir insan hepsini okur; yazılım genellikle yarısını okuyabilir.",
        "Asıl maliyet tutarsızlıktır. Yüz özgeçmişin her biri biraz farklı özetlendiğinde adayları aynı kriterlere göre karşılaştırmak imkânsızlaşır ve tarama sessizce ilk inceleyicinin kimi beğendiğine dönüşür.",
      ],
      fields: [
        { name: "Ad ve iletişim bilgileri", note: "Sıklıkla bir başlıkta, kenar çubuğunda ya da bir görselde yer alır — en yaygın çıkarım hatalarından biri." },
        { name: "İşverenler ve tarihleriyle iş unvanları", note: "Tek bir değer değil, tekrarlanan bir tablo. Tablo alanları her pozisyonu kendi satırı olarak tutar." },
        { name: "Toplam deneyim yılı", note: "Nadiren belirtilir. Bir formül Cleaner'ı, bir beyana güvenmek yerine bunu pozisyon tarihlerinden hesaplayabilir." },
        { name: "Beceriler", note: "En iyisi olduğu gibi çıkarıp sonra normalleştirmektir — bir kategori Cleaner'ı 'JS', 'JavaScript' ve 'ES6' değerlerini tek bir değere eşleyebilir." },
        { name: "Eğitim ve sertifikalar", note: "Kurum, nitelik, yıl. Tekrarlanan bir başka yapı." },
        { name: "Konum ve çalışma izni", note: "Çoğu zaman ilk kesin filtredir ve çoğu zaman başlığa gömülüdür." },
      ],
      gotchas: [
        {
          title: "İki sütunlu düzenler basit okuyucuları bozar",
          body: "Kenar çubuklu, tasarım odaklı bir özgeçmiş, basit metin çıkarımı yapan her şeye yukarıdan aşağı birbirine karışmış anlamsız bir metin olarak görünür. Düzene duyarlı çıkarım kenar çubuğunu ve ana sütunu ayrı tutar; kenar çubuğundaki iletişim bilgilerinin yine doğru alana düşmesinin nedeni budur.",
        },
        {
          title: "Beceriler normalleştirilmezse filtre işe yaramaz",
          body: "Olduğu gibi çıkarıldığında 'JS', 'JavaScript', 'Javascript (ES6)' ve 'JAVASCRIPT' dört ayrı değer olarak gelir ve herhangi birine göre filtrelemek diğerlerini kaçırır. Bir kategori Cleaner'ı varyantları kontrollü bir sözlüğe eşler; böylece filtre gerçekten nitelikli olan herkesi döndürür.",
        },
        {
          title: "Bunlar kişisel veridir ve kurallar daha sıkıdır",
          body: "Özgeçmişler tanımı gereği kişisel veridir ve birçok yargı bölgesinde aday verileri saklama sınırlarına ve silinme hakkına tabidir. Bucket görünürlüğü ve kullanıcı bazlı erişim izinleri, aday kayıtlarını tüm kuruluşa açık tutmak yerine süreci yürüten kişilerle sınırlamanızı sağlar.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "Tablo alanları her pozisyonu ve her niteliği tek bir metin yığını yerine kendi satırı olarak tutar." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Beceri adlarını kontrollü bir sözlüğe normalleştirir ve toplam deneyimi pozisyon tarihlerinden hesaplar." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Aday kayıtları filtrelenebilir bir tablo olarak; Bucket bazlı erişimle başvuru verileri tüm kuruluşa görünmez." },
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "E-postayla gelen başvurular, ekleri dahil, geldikleri anda işlenir." },
      ],
      faqs: [
        { q: "İki sütunlu ve tasarımlı özgeçmişleri işleyebilir mi?", a: "Evet. Çıkarım, ham metni yukarıdan aşağı okumak yerine düzene duyarlıdır; bu yüzden kenar çubukları ve çok sütunlu düzenler birbirine karışıp anlamsızlaşmaz." },
        { q: "Beceri adlarını standartlaştırabilir mi?", a: "Evet. Olduğu gibi çıkarın, ardından varyantları kontrollü bir sözlüğe eşlemek için bir kategori Cleaner'ı kullanın; böylece bir beceriye göre filtrelemek o beceriye sahip her adayı döndürür." },
        { q: "Aday verilerinin gizliliği nasıl korunur?", a: "Bucket'lar tüm kuruluşa görünür olmak yerine özel olabilir ve kullanıcı bazında Viewer veya Editor izinleri verilebilir. Aday kayıtları süreci yürüten kişilerle sınırlı kalır." },
      ],
    },
    {
      slug: "expense-reports",
      label: "Masraf Raporları",
      badge: "Finans ve Çalışanlar",
      h1: "Fiş ve masraf raporu işleme",
      title: "Fiş OCR ve Masraf Raporu Otomasyonu",
      description:
        "Fotoğraflanmış fişleri kategorize edilmiş masraf satırlarına — işyeri, tarih, tutar, vergi ve kategori — dönüştürün; masraf iadesi veri girişi değil, bir inceleme olsun.",
      summary:
        "Fotoğraflanmış fişler kategorize edilmiş masraf satırlarına dönüşür; masraf iadesi veri girişi değil, bir inceleme olur.",
      lede: "Tavnit fişleri okur — kötü ışıkta fotoğraflanmış buruşuk olanlar dahil — ve işyerini, tarihi, tutarı, vergiyi ve kategoriyi tipli alanlar olarak döndürür. Masraflar kategorize edilmiş ve kontrol edilebilir olarak gelir; böylece bir raporu onaylamak bir yeniden yazma işi değil, bir inceleme olur.",
      problem: [
        "Masraf süreci iki uçta da başarısız olur. Çalışanlar formu doldurmak sıkıcı olduğu için göndermeyi erteler; finans da form tutarsız doldurulduğu için gönderileni yeniden yazar. İadeler gecikir ve sürecin hiçbir kısmından kimse memnun değildir.",
        "Fişler aynı zamanda çoğu şirketin işlediği en düşük kaliteli belgelerdir: solmuş termal kâğıt, açılı fotoğraflanmış, katlanmış, bazen kısmen başka bir dilde.",
      ],
      fields: [
        { name: "İşyeri adı", note: "Çoğu zaman metin değil stilize bir logodur — fişteki zor alanlardan biri." },
        { name: "İşlem tarihi ve saati", note: "Saat, harcırah ve mükerrer tespiti için sanıldığından daha önemlidir." },
        { name: "Toplam, vergi ve bahşiş", note: "Vergiyi ayırmak iade için, bahşişi ayırmak politika için önemlidir." },
        { name: "Ödeme yöntemi ve kartın son dört hanesi", note: "Kart ekstresiyle otomatik mutabakat yapmanızı sağlayan alan." },
        { name: "Masraf kategorisi", note: "En iyisi çalışana sormak yerine işyeri ve kalemlerden bir yapay zekâ kategori Cleaner'ının çıkarmasıdır." },
        { name: "Para birimi", note: "Seyahat masrafları harcandıkları para biriminde gelir; dönüşüm Pipeline'ın işidir." },
      ],
      gotchas: [
        {
          title: "Fiş kalitesi gerçekten kötüdür",
          body: "Solmuş termal kâğıt, parlama, katlar ve açılar istisna değil, kuraldır. Çıkarım çoğunu halleder, ama bu koşullu incelemenin yerini hak ettiği bir belge türüdür: düşük güvenli veya politika dışı tutarları bir insan için işaretleyin, temiz olanların geçmesine izin verin.",
        },
        {
          title: "Asıl iş kategorizasyondur",
          body: "Toplamı okumak kolaydır. Bir restoran harcamasının müşteri ağırlama mı yoksa ekip yemeği mi olduğuna karar vermek, finansın zamanını tüketen kısımdır. Bir yapay zekâ kategori Cleaner'ı işyeri ve kalemlerden bir kategori atar; böylece çalışan tahmin etmez, finans da sınıflandırmak yerine düzeltir.",
        },
        {
          title: "Mükerrerler yaygın ve pahalıdır",
          body: "Aynı fişin iki kez gönderilmesi — bir kez fotoğraf, bir kez işyerinden gelen PDF olarak — fazla iadenin olağan bir kaynağıdır. İşyerini, tam tutarı ve zaman damgasını çıkarmak, bunu bir denetimde keşfetmek yerine Bucket'ta tespit etmeniz için yeterlidir.",
        },
      ],
      pipeline: [
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Çalışanlar bir uygulama öğrenmek yerine fişleri bir adrese iletir. Dijital fişler geldikleri anda otomatik yönlendirilebilir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Yapay zekâyla kategori atar, döviz tutarlarını çevirir ve işyeri adlarını standartlaştırır." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Koşullu inceleme — yalnızca bir eşiği aşan ya da politika dışı kalan masraflar onaylayıcıya ulaşır." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Masraflar, ödemeden önce gruplayabileceğiniz, grafiğe dökebileceğiniz ve mükerrerlere karşı kontrol edebileceğiniz bir tablo olarak." },
      ],
      faqs: [
        { q: "Buruşuk bir fişin fotoğrafını okuyabilir mi?", a: "Genellikle evet. Fotoğraflar, solmuş termal kâğıtlar ve katlanmış fişler OCR'dan geçer; ancak kalite tavanı belirler — Pipeline'ın en az emin olduğu fişler için koşullu incelemenin var olmasının nedeni budur." },
        { q: "Masraflar otomatik olarak kategorize edilebilir mi?", a: "Evet. Bir yapay zekâ kategori Cleaner'ı işyeri ve kalemlerden bir kategori atar; böylece finans her şeyi sınıflandırmak yerine ara sıra çıkan uç durumları düzeltir." },
        { q: "Seyahat masraflarındaki dövizler ne olacak?", a: "Para birimi ayrı bir çıkarılan alandır ve bir dönüşüm Cleaner'ı işlem sırasında tutarları raporlama para biriminizde yeniden ifade edebilir." },
      ],
    },
    {
      slug: "purchase-orders",
      label: "Satın Alma Siparişleri",
      badge: "Satın Alma ve Borç Hesapları",
      h1: "PO eşleştirme yazılımı: faturaları satın alma siparişleriyle otomatik eşleştirin",
      title: "Otomatik PO Eşleştirme — Faturalar ve Satın Alma Siparişleri",
      description:
        "PO eşleştirme yazılımı: satın alma siparişlerini ve faturaları aynı alanlara çıkarın, kalemleri otomatik eşleştirin ve yalnızca uyumsuzlukları bir inceleyiciye yönlendirin.",
      summary:
        "Satın alma siparişleri ve faturalar tek bir yapıya çıkarılır, kalem kalem eşleştirilir; yalnızca uyumsuzluklar bir inceleyiciye gider.",
      lede: "Tavnit satın alma siparişlerini (PO) ve onları izleyen faturaları okur; PO numarasını, tedarikçiyi, SKU'ları, miktarları ve fiyatları tipli alanlar olarak çıkarır ve fatura kalemlerini PO kalemleriyle otomatik olarak eşleştirir — tedarikçi bir kalemi farklı tarif etse bile. Başlık düzeyinde eşleştirme PO numarası üzerinden bir eşlemedir; kalem düzeyinde eşleştirme bir Matcher karşılaştırmasıdır; uyuşmayan her şey muhasebe kayıtlarınıza değil, adı belirlenmiş bir inceleyiciye gider.",
      problem: [
        "PO eşleştirme, faturalanan şeyin sipariş edilen şey olduğunun kontrolüdür. Çoğu ekipte hâlâ gözle yapılır: bir borç hesapları uzmanı fatura PDF'ini açar, satın alma siparişini bulur ve miktarları ile fiyatları kalem kalem karşılaştırır. Yavaştır ve iki pahalı hata — yanlış miktar ve yanlış birim fiyat — doğrularıyla tıpatıp aynı göründükleri için tam da burada gözden kaçar.",
        "ERP'lerdeki otomatik PO eşleştirme araçları, her iki belgenin de zaten yapılandırılmış olduğunu varsayar. Değillerdir. Satın alma siparişi sizin sisteminizden çıkmıştır, ama fatura tedarikçinin sisteminden, bir PDF olarak, onun parça numaraları ve onun düzeniyle gelir. Onu karşılaştırılabilir bir yapıya getirmek sorunun çözülmemiş yarısıdır ve Tavnit'in yaptığı da bu yarıdır.",
      ],
      fields: [
        { name: "PO numarası", note: "Her şeyin üzerinden birleştiği anahtar. Metin olarak çıkarın — önekler ve baştaki sıfırlar anlamlıdır ve tedarikçiler onu faturanın farklı yerlerine koyar." },
        { name: "Tedarikçi ve alıcı", note: "Faturadaki tedarikçi adı, tedarikçi kaydınızla nadiren birebir eşleşir. Bir eşleme Cleaner'ı onu tedarikçi kimliğinize çözümler." },
        { name: "Kalemler: açıklama, SKU, miktar", note: "Her iki belgede de tekrarlanan bir tablo. Tedarikçi parça numaraları genellikle sizinkinden farklıdır; açıklamaların ifadesi de farklıdır — kalem eşleştirmesini zorlaştıran budur." },
        { name: "Birim fiyat ve satır tutarı", note: "İkisi birden; böylece birim fiyat × miktar, PO ile karşılaştırılmadan önce faturanın kendi üzerinde doğrulanabilir." },
        { name: "Fatura ve PO toplamları", note: "Başlık düzeyinde eşleşme. Toplam tutarken bir kalem tutmuyorsa bu bir miktar/fiyat takasıdır — yalnızca toplama bakan kontrolün kaçırdığı durum." },
        { name: "Teslim tarihi ve irsaliye referansı", note: "Üç yönlü eşleştirmedeki üçüncü belge. İrsaliyeler de aynı şekilde çıkarılır; irsaliyeler sayfasına bakın." },
        { name: "Ödeme koşulları ve para birimi", note: "Fatura PO ile uyuşmadığında etkisi boyutlarını aşan kısa alanlar." },
      ],
      gotchas: [
        {
          title: "İki yönlü, üç yönlü: eşleştirme ancak yapılar uyuşursa işler",
          body: "İki yönlü eşleştirme faturayı PO ile karşılaştırır; üç yönlü eşleştirme mal kabul belgesini ekler. Belgeler farklı alan adlarına çıkarıldığında ikisi de çöker. PO'ları, faturaları ve irsaliyeleri aynı alan şemasını — PO numarası, SKU, miktar, birim fiyat — paylaşan Flow'lardan geçirmek, eşleştirmeyi bir belge okuması olmaktan çıkarıp bir karşılaştırmaya dönüştürür.",
        },
        {
          title: "Tedarikçi parça numaraları sizin parça numaralarınız değildir",
          body: "PO sizin SKU'nuzu listeler; fatura tedarikçininkini. Bir eşleme Cleaner'ı işlem sırasında tedarikçi parça numaralarını referans verilerinize göre SKU'larınıza eşler; böylece fatura zaten çevrilmiş olarak gelir. Referansın olmadığı yerlerde bir Matcher kalemleri açıklamanın anlamına göre eşleştirir — birebir değil, anlamsal olarak — sınırdaki çiftler için de bir LLM karar verici kullanır.",
        },
        {
          title: "Yalnızca toplamlar değil, kalem düzeyinde eşleştirme",
          body: "PO çalıştırmasını referans (benchmark), faturayı da ona karşı karşılaştırılan çalıştırma olarak belirleyin. Matcher her fatura kalemini bir PO kalemiyle eşleştirir ve miktar ile birim fiyatı yan yana koyar; eşleşmeyen kalemler sessizce atılmak yerine uyarı olarak listelenir. Yalnızca toplama bakan bir kontrol, yanlış kalemler için doğru tutarı faturalayan bir faturayı geçirir.",
        },
        {
          title: "Bir insana yalnızca istisnalar ulaşmalı",
          body: "Her faturada inceleme, manuel süreci yeniden yaratır. Bir formül Cleaner'ı faturanın kendisinde birim fiyat × miktarın satır tutarına eşit olduğunu doğrular, bir koşul da toleransınızın dışındaki kalemleri işaretler. İnsan incelemesi yalnızca işaretlenen çalıştırmalar için tetiklenir; böylece inceleyici eşleşen üç yüz faturayı değil, uyuşmayan üç faturayı görür.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Tedarikçiler PO'ları, faturaları ve irsaliyeleri tek bir adrese gönderir. Collection'lar her belgeyi sınıflandırır ve doğru Flow'a yönlendirir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Tedarikçi parça numaralarını ve tedarikçi adlarını eşlemeyle ana verilerinize bağlar, kalem aritmetiğini doğrular ve tolerans dışındaki değerleri işaretler." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "PO'ları ve faturaları aynı yapıda tutar; böylece başlık düzeyinde eşleştirme PO numarası üzerinden bir sorgu olur." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Yalnızca işaretlenen faturalar, kimin neyi onayladığını gösteren yalnızca ekleme yapılabilen bir denetim iziyle, adı belirlenmiş bir inceleyici için bekletilir." },
        { label: "API entegrasyonu", href: "/docs/api-integration", why: "Eşleşmiş ve onaylanmış faturaları manuel bir adım olmadan ERP'nize veya borç hesapları sisteminize gönderir." },
      ],
      faqs: [
        { q: "PO eşleştirme nedir?", a: "PO eşleştirme, bir faturanın dayandığı satın alma siparişiyle uyuştuğunun kontrolüdür — aynı tedarikçi, aynı kalemler, aynı miktarlar ve fiyatlar. İki yönlü eşleştirme faturayı PO ile karşılaştırır; üç yönlü eşleştirme mal kabul belgesini de kontrol eder. Bir tedarikçiye sipariş edilmemiş ya da teslim edilmemiş bir şey için ödeme yapılmasını engelleyen kontroldür." },
        { q: "Tavnit faturaları satın alma siparişleriyle otomatik eşleştirebilir mi?", a: "Evet. İkisini de aynı alan yapısına çıkarın; başlık düzeyinde eşleştirme Bucket'ınızda PO numarası üzerinden bir sorguya dönüşür. Kalem düzeyinde eşleştirme için benchmark modundaki bir Matcher PO'yu referans alır ve her fatura kalemini ona eşler, miktar ile birim fiyatı yan yana gösterir. Eşleştirilemeyen kalemler uyarı olarak listelenir." },
        { q: "Tedarikçi kendi parça numaralarını veya açıklamalarını kullanıyorsa?", a: "Referans verileriniz varsa bir eşleme Cleaner'ı işlem sırasında tedarikçi parça numaralarını SKU'larınıza eşler. Yoksa Matcher kalemleri birebir metne göre değil açıklamanın anlamına göre, sınırdaki çiftler için bir LLM karar vericiyle eşleştirir; böylece \"Blue widget 10pk\" ile \"WIDGET-BLU x10\" aynı satıra düşer." },
        { q: "Bir fatura eşleşmediğinde ne olur?", a: "Durur. Bir koşul Cleaner'ı çalıştırmayı işaretler ve İnsan incelemesi onu adı belirlenmiş bir inceleyiciye yönlendirir; inceleyici faturayı, çıkarılan değerleri ve uyuşmazlığı görür. Eşleşen faturalar API veya webhook ile doğrudan ERP'nize geçer. Her görüntüleme, düzenleme ve onay, yalnızca ekleme yapılabilen bir denetim izine yazılır." },
        { q: "İrsaliyelerle üç yönlü eşleştirme yapıyor mu?", a: "İrsaliyeler ve mal kabul belgeleri, PO'lar ve faturalarla aynı şekilde — imzalı teslim belgelerindeki el yazısı miktarlar dahil — aynı alan yapısına çıkarılır; böylece eşleştirmenin üçüncü ayağı, PO'ya karşı karşılaştırılan üçüncü bir çalıştırma olur." },
        { q: "ERP'mizi değiştirmemiz gerekiyor mu?", a: "Hayır. Tavnit onun önünde durur: belgeler e-posta veya API ile gelir, çıkarılır ve eşleştirilir, onaylanan sonuçlar REST API veya webhook ile ERP'nize ya da borç hesapları sisteminize iletilir. Kod yazmamayı tercih eden ekipler için Zapier, Make ve n8n tarifleri mevcuttur." },
        { q: "Kalemler ayrı ayrı mı gelir?", a: "Evet. Kalemler tablo alanlarıdır; böylece her satır SKU, açıklama, miktar, birim fiyat ve satır tutarını ayrı tipli değerler olarak döndürür — kalem düzeyinde karşılaştırmayı mümkün kılan da budur." },
      ],
    },
    {
      slug: "customs-trade",
      label: "Gümrük ve Dış Ticaret",
      badge: "Lojistik ve Dış Ticaret",
      h1: "Gümrük belgesi otomasyonu",
      title: "HS Kodu Sınıflandırmalı Gümrük Otomasyonu",
      description:
        "Ticari faturaları, çeki listelerini ve konşimentoları çıkarın; malları HS tarife kodlarına işlemden sonra değil, işlem sırasında sınıflandırın.",
      summary:
        "Ticari faturalar, çeki listeleri ve konşimentolar çıkarılır — HS tarife sınıflandırması Pipeline'ın içinde.",
      lede: "Tavnit gümrük evrakını — ticari faturalar, çeki listeleri, konşimentolar, menşe şahadetnameleri — okur ve göndericiyi, alıcıyı, mal tanımlarını, ağırlıkları ve değerleri tipli alanlar olarak döndürür. Bir HS kodu Cleaner'ı malları işlem sırasında tarife kodlarına sınıflandırır; böylece beyannameler yeniden yazılmak yerine yapılandırılmış verilerden hazırlanır.",
      problem: [
        "Tek bir sevkiyat, aynı bilgileri farklı düzenlerde tekrarlayan bir belge yığını üretir ve bir gümrük beyannamesi bunların uzlaştırılmış ve doğru olmasını gerektirir. İş, zaman baskısı altında yapılan veri aktarımı artı sınıflandırmadır ve bir hata geciken bir sevkiyat ya da ceza demektir.",
        "Sınıflandırma uzmanlık gerektiren kısımdır. Belirli bir tanım için tarife koduna karar vermek, çoğu çıkarım aracının hiç denemediği bir muhakeme işidir ve otomasyon bittikten sonra manuel bir adım olarak kalır.",
      ],
      fields: [
        { name: "Gönderici ve alıcı", note: "Beyannameyi belirleyen tam ticari unvanlar ve adresler." },
        { name: "Kalem başına mal tanımı", note: "Tarife sınıflandırmasının türetildiği metin — olduğu gibi çıkarmaya değer." },
        { name: "HS tarife kodu", note: "Sonradan aranmak yerine işlem sırasında bir Cleaner tarafından tanımdan sınıflandırılır." },
        { name: "Miktar, net ve brüt ağırlık", note: "Ağırlıklar çeki listesinde, değerler faturada olduğundan ikisinin uzlaştırılması gerekir." },
        { name: "Menşe ülkesi", note: "Vergi oranlarını ve tercihli rejimi belirler. Sıklıkla sevkiyat başına değil, kalem başına." },
        { name: "Teslim şekli (Incoterms) ve beyan edilen değer", note: "Neyin vergiye tabi olduğunu ve kimin neden sorumlu olduğunu belirler." },
        { name: "Konteyner ve konşimento numaraları", note: "Belge setini tek bir sevkiyata bağlamanızı sağlayan anahtarlar." },
      ],
      gotchas: [
        {
          title: "Zor kısım sınıflandırmadır ve yerleşiktir",
          body: "Çoğu belge aracı çıkarımda durur ve tarife sınıflandırmasını manuel iş olarak bırakır. Tavnit, malları çalıştırma sırasında çıkarılan tanımdan sınıflandıran bir HS kodu Cleaner'ı sunar; böylece uzmanlık adımı Pipeline'dan sonra değil, içinde gerçekleşir.",
        },
        {
          title: "Bir sevkiyat, birkaç belge, tek bir doğru",
          body: "Ticari fatura değerleri, çeki listesi ağırlıkları, konşimento da konteyneri taşır. Bir Collection her belge türünü kendi Flow'una yönlendirir; sevkiyat referansına göre anahtarlanmış ortak bir Bucket da bunları tek bir tabloda yeniden birleştirir.",
        },
        {
          title: "Buradaki hatalar düzeltme değil, cezadır",
          body: "Yanlış beyan edilmiş bir kod ya da değer, muhasebe değil gümrük meselesidir. Bu, her beyannamede incelemenin orantılı olduğu ve bir sınıflandırmaya nasıl varıldığını göstermeniz istendiğinde yalnızca ekleme yapılabilen denetim izinin gerçekten işe yaradığı bir kullanım senaryosudur.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Tek bir gelen kutusundaki faturaları, çeki listelerini ve konşimentoları otomatik olarak doğru Flow'a yönlendirir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Malları HS tarife kodlarına sınıflandırır, para birimlerini çevirir ve ağırlıkları ile birimleri standartlaştırır." },
        { label: "Splitter'lar", href: "/docs/splitters", why: "Sevkiyat evrakı genellikle tek bir birleşik PDF olarak gelir. Splitter'lar onu çıkarımdan önce ayırır." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Her beyannameyi göndermeden önce, hangi sınıflandırmayı kimin onayladığının kaydıyla inceleyin." },
      ],
      faqs: [
        { q: "Gerçekten HS tarife kodu atıyor mu?", a: "Evet. Bir HS kodu Cleaner'ı malları çalıştırma sırasında çıkarılan tanımdan sınıflandırır; böylece sınıflandırma sonradan manuel bir adım olarak değil, Pipeline'ın içinde gerçekleşir. Beyannameler sizin sorumluluğunuzda kalır; göndermeden önce incelemenin önerilmesinin nedeni budur." },
        { q: "Bir sevkiyatın tüm belge setini işleyebilir mi?", a: "Evet. Bir Collection ticari faturaları, çeki listelerini ve konşimentoları kendi Flow'larına yönlendirir; sevkiyat referansına göre anahtarlanmış sonuçlar tek bir kayıtta yeniden birleşir." },
        { q: "Evrak tek bir birleşik PDF olarak gelirse?", a: "Önce bir Splitter birleşik dosyayı onu oluşturan belgelere ayırır; böylece her biri kendisi için kurulmuş Flow tarafından çıkarılır." },
      ],
    },
    {
      slug: "bank-statements",
      label: "Banka Ekstreleri",
      badge: "Finans ve Kredi",
      h1: "Banka ekstresi veri çıkarımı",
      title: "Banka Ekstresi Çıkarımı — PDF'ten İşlem Satırlarına",
      description:
        "Her bankanın ekstre PDF'lerini işlem satırlarına — tarih, açıklama, tutar, yürüyen bakiye — dönüştürün; mutabakata ya da değerlendirmeye hazır.",
      summary: "Her bankanın ekstre PDF'leri; mutabakat yapabileceğiniz, kategorize edebileceğiniz veya değerlendirebileceğiniz işlem satırlarına dönüşür.",
      lede: "Tavnit her kurumun banka ekstresi PDF'lerini okur ve her işlemi bir satır olarak döndürür: tarih, açıklama, borç veya alacak ve yürüyen bakiye. Bakiye de çıkarıldığı için aritmetik varsayılmak yerine kontrol edilebilir — çıktıyı mutabakat için güvenli kılan da budur.",
      problem: [
        "Her banka ekstrelerini farklı biçimlendirir ve hiçbiri makineler için biçimlendirmez. Sütunlar kayar, işlemler iki satıra taşar ve diziyi bir arada tutan tek şey yürüyen bakiyedir. Kredi değerlendirmesi, ön muhasebe veya mutabakat yapan herkes sonunda verileri yeniden girer ya da banka başına bir bağlayıcıya para öder.",
        "Açık bankacılık, mevcut olduğu ve müşterinin onay verdiği yerlerde bunu çözer. Geri kalan her şey için — geçmiş dönemler, ticari hesaplar, API'si olmayan bankalar, kanıt olarak sunulan ekstreler — eldeki tek kaynak PDF'tir.",
      ],
      fields: [
        { name: "Hesap sahibi, hesap numarası ve şube kodu", note: "Genellikle yalnızca ilk sayfada yer alır; bu yüzden çok sayfalı bir ekstre boyunca taşınması gerekir." },
        { name: "Ekstre dönemi", note: "Toplamların ne anlama geldiğini belirler ve biri verileri elle yeniden girdiğinde en sık eksik kalan şeydir." },
        { name: "İşlem tarihi", note: "Sıklıkla yılsız kısaltılır — yıl satırdan değil, ekstre döneminden gelir." },
        { name: "Açıklama veya karşı taraf", note: "Banka tarafından kısaltılır ve kırpılır. Bir kategori Cleaner'ı işyerini ve türü buradan çıkarır." },
        { name: "Borç, alacak ve yürüyen bakiye", note: "Üçünü de çıkarın. Hiçbir satırın düşmediğini doğrulamanızı sağlayan bakiyedir." },
        { name: "Açılış ve kapanış bakiyesi", note: "Tüm ekstrenin sağlama toplamı." },
      ],
      gotchas: [
        {
          title: "Bakiye olmadan düşen bir satır görünmezdir",
          body: "Çıkarım bir işlemi kaçırırsa kalan satırlar yine son derece makul görünür. Yürüyen bakiyeyi çıkarmak bunu tespit edilebilir bir hataya dönüştürür: bir formül Cleaner'ı her satırın bakiyesinin önceki bakiye artı hareket tutarına eşit olduğunu kontrol edebilir ve ekstreyi geçirmek yerine işaretler.",
        },
        {
          title: "İşlemler taşar ve taşan satırlar yeni işlem değildir",
          body: "Uzun karşı taraf adları ikinci satıra taşar ve basit tablo okuma, tek bir ödemeyi tutarı boş iki satıra dönüştürür. Tablo alanları bir satırı satır olarak ele alır; böylece taşan bir açıklama kendi tutarına bağlı kalır.",
        },
        {
          title: "Tarihler nadiren yıl içerir",
          body: "Çoğu ekstre '14 Mar' yazar ve yıl için en üstteki döneme güvenir. Bu bir insan için yeterli, bir veritabanı için yanlıştır — özellikle bir ocak ekstresinde yıl sınırı geçilirken. Ekstre dönemini çıkarın ve tam tarihi bir formül Cleaner'ıyla ondan türetin.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "İşlemler tablo alanlarıdır; böylece her biri bir metin bloğu yerine kendi tipli satırı olarak döner." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Tam tarihleri ekstre döneminden türetir, yürüyen bakiyeleri doğrular ve karşı tarafları kategorize eder." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "İşlemler sorgulanabilir bir tablo olarak düşer — karşı tarafa göre filtreleyin, aya göre gruplayın, bakiyeyi grafiğe dökün." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Hepsini incelemek yerine yalnızca bakiye kontrolünü geçemeyen ekstreleri bir kişiye yönlendirir." },
      ],
      faqs: [
        { q: "Her bankayla çalışır mı?", a: "Evet. Banka başına yapılandırılacak bir şablon yoktur — aynı Flow, ticari hesaplar ve bir açık bankacılık API'sinin kapsamayacağı geçmiş dönemler dahil, her kurumun ekstrelerini okur." },
        { q: "Hiçbir işlemin kaçırılmadığını nasıl bilirim?", a: "Her işlemle birlikte yürüyen bakiyeyi çıkarın, ardından her satırın bir öncekiyle tutarlı olduğunu doğrulamak için bir formül Cleaner'ı kullanın. Kontrolü geçemeyen bir ekstre sessizce geçmek yerine işaretlenir." },
        { q: "İşlemler otomatik olarak kategorize edilebilir mi?", a: "Evet. Bir yapay zekâ kategori Cleaner'ı açıklamadan bir kategori atar; böylece ön muhasebe ham banka metninden değil, sınıflandırılmış satırlardan başlar." },
      ],
    },
    {
      slug: "supplier-quotes",
      label: "Tedarikçi Teklifleri",
      badge: "Satın Alma ve Tedarik",
      h1: "Tedarikçi teklifi karşılaştırma",
      title: "Tedarikçi Tekliflerini Karşılaştırın ve Fiyatları Kıyaslayın",
      description:
        "Rakip tekliflerden kalemleri çıkarın ve otomatik olarak karşılaştırın — tedarikçiler arasında eşdeğer kalemleri eşleştirip her kalem için en iyi fiyatı belirleyerek.",
      summary: "Rakip teklifler çıkarılır ve kalem kalem karşılaştırılır; her kalem için en iyi fiyat belirlenir.",
      lede: "Tavnit rakip tedarikçi tekliflerinden kalemleri çıkarır; ardından Matcher'lar tedarikçiler arasında eşdeğer kalemleri eşleştirir ve her kalem için fiyata göre bir kazanan belirler. Üç PDF ve elle hazırladığınız bir tablo yerine bir karşılaştırma tablosu elde edersiniz.",
      problem: [
        "Teklif karşılaştırmak, tedarik sürecinin asla kolaylaşmayan kısmıdır. Üç tedarikçi üç farklı düzen gönderir, aynı kalemi üç farklı şekilde tarif eder ve farklı ambalaj boyutları için fiyat verir. Biri bir tablo hazırlar, her şeyi yeniden yazar ve doğru satırları eşleştirdiğini umar.",
        "Asıl zorluk eşleştirmedir. 'M8 hex bolt 50mm', 'Bolt, hex, M8x50' ve 'HEX BOLT M8 50MM zinc' aynı kalemdir ve hiçbir birebir eşleme bunları asla eşleştiremez.",
      ],
      fields: [
        { name: "Tedarikçi kimliği", note: "Karşılaştırmadaki her katılımcıyı adlandıran alan. Bir teklif, bir tedarikçi." },
        { name: "Kalem açıklaması", note: "Tedarikçiler arasında eşleştirilen metin. Olduğu gibi çıkarın — çok erken normalleştirmek, eşleştirmenin ihtiyaç duyduğu sinyali yok eder." },
        { name: "Birim fiyat", note: "Kazananın belirlendiği sayısal alan. 'Fiyat sorunuz' gibi sayısal olmayan girdiler sessizce yok sayılmak yerine hariç tutulur ve raporlanır." },
        { name: "Miktar ve ölçü birimi", note: "Eşleştirme bağlamı olarak kullanılır; böylece 12'li bir paket tek bir adetle eşleştirilmez." },
        { name: "Teslim süresi", note: "Fiyatlar yakın olduğunda çoğu zaman belirleyici faktördür ve manuel karşılaştırmalarda nadiren yakalanır." },
        { name: "Geçerlilik tarihi ve ödeme koşulları", note: "Daha kötü koşullara sahip daha ucuz bir teklif her zaman daha ucuz değildir." },
      ],
      gotchas: [
        {
          title: "Aynı kalem hiçbir zaman iki kez aynı şekilde tarif edilmez",
          body: "Birebir eşleştirmenin başarısız olmasının ve karşılaştırmanın neredeyse her yerde manuel kalmasının nedeni budur. Matcher'lar satırları metin eşitliğine göre değil anlamsal olarak, belirsiz çiftler için bir LLM karar vericiyle eşleştirir; böylece aynı kalemin farklı ifade edilmiş açıklamaları yine hizalanır.",
        },
        {
          title: "Ambalaj boyutu karşılaştırmayı sessizce bozar",
          body: "12'lik bir koli teklifiyle tek adet teklifini kıyaslamak bir fiyat farkı değil, bir birim hatasıdır — ve iki sayı da makul göründüğü için incelemeden sağ çıkan hatadır. Bağlam alanları miktarı ve ölçü birimini eşleştirmeye dahil etmenizi sağlar; böylece farklı kalemler yanlış bir kazanan üretmek yerine eşleşmeden kalır.",
        },
        {
          title: "Her kalemin karşılaştırılabilir bir fiyatı yoktur",
          body: "Tekliflerde 'fiyat sorunuz', 'dahil' ve boş hücreler bulunur. Karşılaştırma bu satırları sessizce atmak yerine kazanan belirlemenin dışında tutar ve satıra bir uyarı kaydeder; böylece her şeyin karşılaştırıldığını varsaymak yerine neyin karşılaştırılmadığını görebilirsiniz.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "Tek bir Flow, her tedarikçinin teklif düzenini aynı alan yapısına okur — karşılaştırmanın ön koşulu budur." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Para birimlerini çevirir; böylece farklı para birimlerindeki teklifler aynı esasa göre karşılaştırılır." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Teklifleri zaman içinde saklar; böylece bugünkü fiyat, aynı tedarikçinin geçen çeyrek verdiği teklifle karşılaştırılabilir." },
      ],
      faqs: [
        { q: "Her tedarikçinin farklı tarif ettiği kalemleri nasıl eşleştiriyor?", a: "Eşleştirme birebir değil, anlamsaldır: kalem açıklamaları anlamlarına göre karşılaştırılır, belirsiz çiftleri bir LLM karar verici çözer. 'M8 hex bolt 50mm' ile 'Bolt, hex, M8x50', sizin bir eş anlamlılar listesi tutmanıza gerek kalmadan eşleşir." },
        { q: "Hepsini karşılaştırmak yerine tek bir tedarikçiyi referans alabilir miyim?", a: "Evet. Benchmark modu bir teklifi referans kabul eder ve diğer her teklifi onunla karşılaştırır; mevcut bir tedarikçiniz olduğunda ve piyasayı yokladığınızda doğru yapı budur." },
        { q: "Karşılaştırılamayan kalemlere ne olur?", a: "Sayısal olmayan fiyatlara sahip satırlar kazanan belirlemenin dışında tutulur ve o satıra karşı uyarı olarak kaydedilir; böylece karşılaştırmadaki boşluklar gizli kalmak yerine görünür olur." },
      ],
    },
    {
      slug: "compliance-checks",
      label: "Uyumluluk Kontrolleri",
      badge: "Uyumluluk ve Risk",
      h1: "Belge uyumluluk kontrolleri",
      title: "Otomatik Belge Uyumluluk Kontrol Listeleri",
      description:
        "Bir belge setini dallanan bir kontrol listesine göre kontrol edin — her şey eksiksiz, tutarlı ve politikaya uygun mu — ve bir denetçiye teslim edebileceğiniz bir rapor üretin.",
      summary: "Bir belge seti dallanan bir kontrol listesine göre kontrol edilir; denetlenebilir bir geçti/kaldı raporu üretilir.",
      lede: "Tavnit'in Inspector'ı bir belge setini sizin tanımladığınız bir kontrol listesine göre kontrol eder. Yüklenen her dosyayı beklenen yuvasına yönlendirir, kuralların ihtiyaç duyduğu bilgileri çıkarır ve kontrol listesini deterministik olarak değerlendirir — böylece aynı kanıt her zaman aynı kararı, ekli bir raporla birlikte üretir.",
      problem: [
        "Uyumluluk incelemesi genellikle elinde bir kontrol listesi ve bir klasör olan bir kişidir: doğru belgelerin mevcut olduğunu, değerlerin belgeler arasında uyuştuğunu ve hiçbir şeyin süresinin dolmadığını teyit eder. Yavaştır, inceleyiciden inceleyiciye tutarsızdır ve bir şeyin neden geçtiğinin kanıtı o kişinin hatırladıklarıdır.",
        "Hata genellikle kaçırılmış bir belge değildir. Kimsenin yan yana karşılaştırmadığı iki belge arasında uyuşmayan bir değerdir.",
      ],
      fields: [
        { name: "Beklenen belge yuvaları", note: "Setin içermesi gerekenler. Eksik bir zorunlu yuva yalnızca bir boşluk değil, başlı başına bir bulgudur." },
        { name: "Kimlik ve tüzel kişi alanları", note: "Belgeler arasında uyuşması gereken değerler — adlar, sicil numaraları, adresler." },
        { name: "Tarihler ve geçerlilik süresi", note: "Sertifikaların ve lisansların süresi dolar. Bir şeyin geçerli olup olmadığı bir alan değil, bir kuraldır." },
        { name: "Tutarlar ve beyan edilen değerler", note: "Belgeler arası tutarlılık kontrolleri burada yaşar: fatura değeri beyanla uyuşuyor mu?" },
        { name: "İmza ve kaşe varlığı", note: "İçerik değil varlık; en yaygın manuel kontrollerden biri." },
        { name: "Kalem başına kontrol sonucu", note: "Kural başına geçti, kaldı veya uygulanamaz; sonucu belirleyen değerle birlikte." },
      ],
      gotchas: [
        {
          title: "Asıl kontrol bir belgenin içinde değil, belgeler arasındadır",
          body: "Her araç bir sertifikadan bir değer okuyabilir. Önemli bulgu, sertifikadaki değerin faturadakiyle uyuşmamasıdır. Bir inceleme değerlendirmeden önce tüm seti topladığından, kontrol listesi kuralları yalnızca tek bir belgenin içinde değil, belgeler arasında karşılaştırma yapabilir.",
        },
        {
          title: "Kontrol listeleri dallanır; düz olanlar boşlukları gizler",
          body: "Bir kuralın uygulanıp uygulanmayacağı genellikle önceki bir yanıta bağlıdır — mallar kısıtlıysa bir lisans gerekir. Dallanan bir kontrol listesi bunu doğrudan ifade eder; böylece bir inceleme lisansı yalnızca gerçekten gerektiğinde ister ve onu sessizce uygulanamaz olarak işaretlemez.",
        },
        {
          title: "Bir denetçi neye karar verdiğinizi değil, nasıl karar verdiğinizi sorar",
          body: "Değerlendirme deterministiktir — aynı belgeler her seferinde yeni bir yargı değil, aynı sonucu üretir — ve sonuç bir rapora yazılır. İncelemeyle birleştiğinde hangi değerlerin çıkarıldığını, hangi kuralların tetiklendiğini ve sonucu kimin onayladığını gösterebilirsiniz.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Tek bir yere gelen karışık kanıtlar, herhangi bir kontrol yapılmadan önce sınıflandırılır ve doğru Flow'a yönlendirilir." },
        { label: "Flow'lar", href: "/docs/flows", why: "Her belge türünün kendi Flow'u vardır; böylece bir kural serbest metinde arama yapmak yerine adlandırılmış bir alana başvurabilir." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Bir inceleyici incelemeyi onaylar; yalnızca ekleme yapılabilen iz de hangi bulguyu kimin kabul ettiğini kaydeder." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Zaman içindeki sonuçlar raporlanabilir hâle gelir — kaç set, hangi kural nedeniyle, hangi ayda kaldı." },
      ],
      faqs: [
        { q: "Farklı belgeler arasındaki değerleri karşılaştırabilir mi?", a: "Evet — asıl amaç da bu. Bir inceleme değerlendirmeden önce tüm belge setini toplar; böylece kurallar her belgeyi tek başına doğrulamakla kalmaz, bir belgedeki değerin diğerindekiyle uyuştuğunu da kontrol edebilir." },
        { q: "Sonuç tekrarlanabilir mi?", a: "Kontrol listesi değerlendirmesi deterministiktir. Aynı belgeler ve aynı kontrol listesi aynı sonucu üretir; biri bir setin neden geçtiğini sorduğunda sonucu savunulabilir kılan da budur." },
        { q: "Zorunlu bir belge eksikse ne olur?", a: "Eksik bir zorunlu girdi başlı başına bir bulgudur. İnceleme bir boşlukla tamamlanmak yerine bunu raporlar; adlandırılmış bir yuva belirtilmeden yüklenen dosyalar da otomatik olarak yönlendirilir ya da eşleşmemiş olarak işaretlenir." },
      ],
    },
    {
      slug: "form-filling",
      label: "Form Doldurma",
      badge: "Operasyon ve Dış Ticaret",
      h1: "Otomatik PDF form doldurma",
      title: "PDF Formlarını Çıkarılan Belge Verileriyle Doldurun",
      description:
        "Resmî PDF formlarını birkaç kaynak belgeden çıkarılan verilerle otomatik olarak doldurun; herhangi bir şey düzenlenmeden önce onay alın.",
      summary: "Resmî PDF formları, birkaç kaynak belgeye dağılmış verilerle otomatik olarak doldurulur.",
      lede: "Tavnit doldurulabilir PDF formlarını, aynı anda birkaç kaynak belgeden çıkarılan verilerle doldurur. Bir beyanname tek seferde bir fatura, bir çeki listesi ve bir konşimentodan doldurulabilir; doldurulmuş PDF düzenlenmeden önce değerleri bir kişi onaylar.",
      problem: [
        "Şaşırtıcı miktarda ofis işi, aldığınız belgelerdeki değerleri başka birinin istediği bir forma kopyalamaktır. Gümrük beyannameleri, sigorta formları, hibe başvuruları, resmî bildirimler — bilgi zaten mevcuttur, üç dört PDF'e dağılmıştır ve bir kişi onu elle taşır.",
        "Hataların en az affedildiği yer de burasıdır. Bir kuruma giden formdaki bir aktarım hatası dahili bir düzeltme değil, bir ret ya da cezadır.",
      ],
      fields: [
        { name: "Kaynak belge seti", note: "Kaynak Flow başına bir yuva. Her zorunlu yuvanın tamamlanmış bir çalıştırması olduğunda form doldurulur." },
        { name: "Alan eşlemeleri", note: "Hangi çıkarılan alanın hangi PDF alanını doldurduğu. Şablon başına bir kez yapılandırılır, her seferinde yeniden kullanılır." },
        { name: "Kaynak olarak Cleaner çıktıları", note: "Eşlenen bir değer ham çıkarım yerine bir Cleaner'dan gelebilir; böylece dönüştürülmüş veya hesaplanmış değerler forma düşer." },
        { name: "İnsanın dolduracağı alanlar", note: "Kimsenin çıkarmadığı değerler — bir referans numarası, bir imza yetkilisi — onay sırasında girilir." },
        { name: "Birden fazla şablon", note: "Tek bir kaynak belge seti, aynı geçişte birkaç farklı formu doldurabilir." },
      ],
      gotchas: [
        {
          title: "Veriler tek bir belgede değil, belgelere dağılmıştır",
          body: "Genel belge araçlarının form doldurmayı çözememesinin nedeni budur: her seferinde tek bir dosyadan çıkarım yaparlar. Doldurma işlemi kaynak Flow başına bir çalıştırma alır ve formu hepsinden birlikte doldurur; böylece çeki listesindeki ağırlıklar ve faturadaki değerler aynı çıktıya ulaşır.",
        },
        {
          title: "Belgeler hangi sırayla gelirse o sırayla gelir",
          body: "Tüm seti nadiren bir kerede alırsınız. Bir doldurma açık kalır, belgeler geldikçe çalıştırmaları toplar ve her zorunlu yuva karşılandığında tetiklenir. Hangi yuvaya ait oldukları belirtilmeden yüklenen dosyalar otomatik olarak sınıflandırılır ve yönlendirilir; eşleşmeyen her şey elle atanabilir.",
        },
        {
          title: "Bazı alanlar kaynak belgelerde hiç bulunmaz",
          body: "Her gerçek formda öncesinde hiçbir yerde bulunmayan değerler vardır — dahili bir referans, beyan sahibinin adı, bir imza bloğu. Bunlar insanın dolduracağı alanlardır ve onay adımında girilir; bu adım aynı zamanda PDF düzenlenmeden önce çıkarımın yanlış yaptığı her şeyi düzeltmek için doğal noktadır.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "Kaynak belge türü başına bir Flow; form hepsinden aynı anda beslenir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Değerleri dönüştürür ve hesaplar; böylece forma düşen değer zaten gerekli birim veya biçimdedir." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Düzenlemeden önce onay; düzeltmeler ve insanın girdiği alanlar aynı adımda yakalanır." },
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Bir adrese iletilen kaynak belgeler, kimse uygulamayı açmadan doldurmayı besler." },
      ],
      faqs: [
        { q: "Bir form birkaç belgeden doldurulabilir mi?", a: "Evet. Her kaynak belge türünün kendi yuvası vardır ve form hepsinden birlikte doldurulur — beyannameler ve talepler için olağan durum budur." },
        { q: "Hiçbir belgede olmayan alanlar ne olacak?", a: "Bunlar insanın dolduracağı alanlardır; onay adımında düzeltmelerle birlikte girilir, böylece son PDF düzenlenmeden önce kontrol edilir." },
        { q: "Tek bir belge seti birden fazla formu doldurabilir mi?", a: "Evet. Bir yapılandırma birkaç şablon içerebilir ve her biri tek bir geçişte aynı çalıştırma setinden doldurulur." },
      ],
    },
    {
      slug: "call-analytics",
      label: "Çağrı Analitiği",
      badge: "Satış ve Destek",
      h1: "Kayıtlı görüşmeleri veriye dönüştürün",
      title: "Çağrı Analitiği — Kayıtlı Görüşmeleri Yapılandırın",
      description:
        "Satış, destek ve gişe kayıtlarını bir tabloya dönüştürün — kim ne dedi, hangi kurallara uyuldu ve her görüşme nasıl sonuçlandı.",
      summary: "Satış, destek ve gişe kayıtları; konuşma sıralarından, kurallardan ve sonuçlardan oluşan bir tabloya dönüşür.",
      lede: "Tavnit Signals ses kayıtlarını düz bir tabloya dönüştürür. Konuşmacıları ayırır, bir kaydı içindeki ayrı görüşmelere böler, her birini sınıflandırır ve kurallarınızı ile çıkarım alanlarınızı konuşma sırası bazında değerlendirir — böylece bir günlük çağrı, saatlerce dinlemeniz gereken bir kayıt yerine filtreleyebileceğiniz satırlara dönüşür.",
      problem: [
        "Bir şirketin öğrendiklerinin çoğu görüşmelerde olur ve bunların neredeyse hiçbiri kayda geçmez. Kayıtlar vardır, ama incelemek dinlemek demektir; bu yüzden pratikte bir yönetici birkaçından örnek alır ve onlardan genelleme yapar.",
        "Kalite kontrolün yapıldığı yerlerde bu, her çağrıdan sonra bir puan kartı dolduran bir kişidir — pahalı, inceleyiciden inceleyiciye tutarsız ve hacmin yalnızca küçük bir kısmını kapsayan bir iş.",
      ],
      fields: [
        { name: "Etkileşim türü", note: "Tek bir kayıt çoğu zaman birkaç görüşme içerir. Her biri sınıflandırılır — satış, destek, iade — ya da diğer olarak işaretlenir." },
        { name: "Konuşmacı rolü", note: "Konuşma sıraları satış temsilcisi veya müşteri gibi beklenen katılımcılara atanır; beklenmeyen sesler diğer olarak etiketlenir." },
        { name: "Sıra düzeyinde kurallar", note: "Her konuşma sırasına uygulanan evet/hayır kontrolleri — kampanyadan söz edildi mi, yasal uyarı okundu mu." },
        { name: "Çıkarım alanları", note: "Her konuşma sırasından alınan veriler; örneğin bahsedilen ürünler veya dile getirilen itirazlar." },
        { name: "İçerik kategorileri", note: "Her sıra etiketlenir — itiraz, soru, sorun, çözüm, teşekkür — böylece örüntüler sayılabilir hâle gelir." },
        { name: "Görüşme sonucu", note: "Tüm görüşme için bir kez değerlendirilir: satış kapandı mı, sorun çözüldü mü." },
      ],
      gotchas: [
        {
          title: "Bir kayıt tek bir görüşme değildir",
          body: "Bir gişeden ya da destek hattından alınmış bir vardiya kaydı birçok ayrı konuşma içerir. Dosyayı tek bir görüşme olarak ele almak hiçbir şeyi anlatmayan ortalamalar üretir. Kayıtlar önce ayrı etkileşimlere bölünür, her biri kendi başına sınıflandırılır ve değerlendirilir — çok belgeli bir PDF'i bölmenin ses dünyasındaki karşılığı.",
        },
        {
          title: "Sıra düzeyindeki ve görüşme düzeyindeki sorular farklı sorulardır",
          body: "'İndirimden söz edildi mi' her konuşma sırasına sorulur ve birkaç kez doğru olabilir. 'Satış sonuçlandı mı' ise tüm konuşmaya bir kez sorulur. İkisini karıştırmak, sonuç isterken bahsetme sayan bir metrik verir; bu yüzden ikisi ayrı değerlendirilir ve görüşme düzeyindeki yanıt o etkileşimin satırlarında tekrarlanır.",
        },
        {
          title: "İnsanları kaydetmenin kuralları vardır",
          body: "Çağrı kaydı için onay ve saklama gereklilikleri yargı bölgesine göre değişir ve belgelere göre daha sıkıdır. Bu, Pipeline'ın karar verdiği bir şey değil, sizin yükümlülüğünüzdür — ama Bucket bazlı görünürlük ve erişim izinleri, dökümleri ve sonuçları yalnızca ihtiyacı olan kişilerle sınırlamanızı sağlar.",
        },
      ],
      pipeline: [
        { label: "Bucket'lar", href: "/docs/buckets", why: "Tamamlanan kayıtlar otomatik olarak bir Bucket'a aktarılır; böylece çağrılar sorgulayıp grafiğe dökebileceğiniz bir veri kümesinde birikir." },
        { label: "Webhook'lar", href: "/docs/webhooks", why: "Bir kaydın işlenmesi biter bitmez çıktı tablosunu kendi sistemlerinize gönderir." },
        { label: "Kullanıcı rolleri", href: "/docs/user-roles", why: "Görüşme verileri hassastır; roller ve Bucket bazlı izinler onu programı yürüten kişilerle sınırlar." },
      ],
      faqs: [
        { q: "Hangi ses biçimleri destekleniyor?", a: "MP3, WAV ve FLAC kayıtları yüklenip işlenebilir." },
        { q: "Birçok ayrı görüşme içeren bir kaydı işleyebilir mi?", a: "Evet. Bir kayıt önce ayrı etkileşimlerine bölünür, her biri ayrı ayrı sınıflandırılır ve değerlendirilir — böylece bir gişedeki tüm vardiya, harmanlanmış tek bir ortalama yerine görüşme bazında sonuçlar üretir." },
        { q: "Örnek almak yerine her çağrıyı puanlayabilir miyim?", a: "Evet. Kurallar işlenen her kaydın her konuşma sırasında değerlendirilir; manuel kalite kontrolden pratikteki fark da budur — örneklem değil, tam kapsam." },
      ],
    },
    {
      slug: "delivery-notes",
      label: "İrsaliyeler",
      badge: "Lojistik ve Depo",
      h1: "İrsaliye ve teslim belgesi yakalama",
      title: "İrsaliye Veri Çıkarımı ve Mal Kabul Kontrolleri",
      description:
        "Gerçekte neyin teslim edildiğini, el yazısı notlar dahil imzalı irsaliyelerden ve teslim belgelerinden yakalayın ve sipariş edilenle karşılaştırın.",
      summary: "Gerçekte neyin teslim edildiği, imzalı irsaliyelerden ve teslim belgelerinden yakalanır — el yazısı dahil.",
      lede: "Tavnit irsaliyeleri ve teslim belgelerini, şoförlerin ve teslim alanların eklediği el yazısı notlar dahil okur ve teslim edilen miktarları yapılandırılmış satırlar olarak döndürür. Satın alma siparişleri de aynı yapıya çıkarıldığı için teslim edileni sipariş edilenle karşılaştırmak bir sorguya dönüşür.",
      problem: [
        "İrsaliye, fiziksel olarak neyin geldiğinin tek kaydıdır ve genellikle zincirdeki en düşük kaliteli belgedir: bir sahada fotoğraflanmış, baskının üzerine imzalanmış, miktarların farklı olduğu yerlerde elle not düşülmüş.",
        "Uyuşmazlıklarda en çok önemli olan belge de odur. Fatura on iki, irsaliye on diyorsa kanıt irsaliyedir — tabii biri ne yazdığını kayda geçirdiyse.",
      ],
      fields: [
        { name: "İrsaliye ve PO numarası", note: "Teslimatı sipariş edilene bağlayan anahtarlar." },
        { name: "Kalem başına teslim edilen miktar", note: "Gerçekten önemli olan sayı ve en sık elle düzeltilen sayı." },
        { name: "El yazısı düzeltmeler", note: "Üstü çizilmiş miktarlar ve kenar notları gerçek rakamı taşır. Bunları yok saymak yanlış rakamı yakalamak demektir." },
        { name: "Teslim alanın adı ve imza varlığı", note: "İmzanın varlığı sıklıkla kabul kriteridir." },
        { name: "Teslim tarihi ve saati", note: "Hizmet seviyesi ölçümünü ve uyuşmazlık sürelerini belirler." },
        { name: "Durum veya hasar notları", note: "Serbest metin, genellikle el yazısıyla ve her talebin dayanağı." },
      ],
      gotchas: [
        {
          title: "Önemli olan el yazısıdır",
          body: "Basılı bir irsaliye neyin gelmesi gerektiğini söyler. El yazısı düzeltme ise neyin geldiğini. Çıkarım baskının yanı sıra el yazısını da okur; sevkiyatı planlandığı gibi değil, teslim edildiği gibi yakalamanın farkı budur.",
        },
        {
          title: "Ofiste taranmamış, sahada fotoğraflanmış",
          body: "Teslim belgeleri açılı, kötü ışıkta, bazen kadrajda bir başparmakla çekilmiş telefon fotoğrafları olarak gelir. Çıkarım çoğuyla başa çıkar, ama bu, her yakalamaya güvenmek yerine düşük güvenli sonuçları bir kişiye yönlendirmeye değecek bir belge türüdür.",
        },
        {
          title: "Değer yakalamada değil, karşılaştırmadadır",
          body: "Teslim edilen bir miktar tek başına size pek bir şey söylemez. İrsaliyeleri satın alma siparişlerinizle aynı alan yapısına çıkarmak, üç yönlü eşleştirmeyi ışığa tutulan üç belge yerine PO numarası üzerinden bir sorguya dönüştürür.",
        },
      ],
      pipeline: [
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Şoförler ve taşıyıcılar fotoğraflanmış teslim belgelerini e-postayla gönderir; bunları iletmek her birini geldiği anda işler." },
        { label: "Flow'lar", href: "/docs/flows", why: "Teslim edilen kalemler, satın alma siparişleri için kullanılan yapıya uyan tablo alanlarıdır." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Teslimatları ve siparişleri tek bir yerde tutar; böylece farklar bir denetimle değil, bir sorguyla ortaya çıkar." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Yanılmanın bedelinin bir uyuşmazlık olduğu kötü yakalamaları ve düzeltilmiş miktarları inceler." },
      ],
      faqs: [
        { q: "El yazısı düzeltmeleri okuyabilir mi?", a: "Evet. El yazısı basılı metinle birlikte çıkarılır; bu burada önemlidir, çünkü doğru olan genellikle el yazısıyla yazılmış miktardır." },
        { q: "Telefonla çekilmiş fotoğraflarla çalışır mı?", a: "Genellikle evet. Teslim belgelerinde fotoğraflar, açılar ve kötü ışık olağandır. Sınırdaki yakalamaların sessizce geçmek yerine bir kişiye ulaşması için koşullu incelemeyi etkinleştirmeye değer." },
        { q: "Teslimatlar siparişlerle karşılaştırılabilir mi?", a: "İkisini de aynı alan yapısına çıkarın; karşılaştırma, belgeden belgeye manuel bir kontrol yerine Bucket'ınızda PO numarası üzerinden bir sorgu olur." },
      ],
    },
    {
      slug: "insurance-claims",
      label: "Sigorta Hasar Talepleri",
      badge: "Sigorta ve Hasar",
      h1: "Sigorta hasar belgesi işleme",
      title: "Sigorta Hasar Belgesi Veri Çıkarımı",
      description:
        "Hasar formlarını ve destekleyici kanıtlarını — ekspertiz tahminleri, faturalar, raporlar ve fotoğraflar — birlikte işleyerek yapılandırılmış ve incelenebilir tek bir kayda dönüştürün.",
      summary: "Hasar formları ve destekleyici kanıtlar birlikte işlenir; yapılandırılmış ve incelenebilir tek bir kayıt oluşur.",
      lede: "Tavnit bir hasar talebini ve onu destekleyen kanıtları tek bir set olarak işler: hasar formu, onarım tahminleri, faturalar ve raporlar. Her belge türü kendi Flow'una yönlendirilir ve sonuçlar, dosya sorumlusunun okumak zorunda olduğu bir klasör yerine değerlendirebileceği tek bir kayıtta birleşir.",
      problem: [
        "Bir hasar talebi hiçbir zaman tek bir belge değildir. Bir form artı talep sahibinin gönderdiği her şeydir — tahminler, fişler, bir polis tutanağı, fotoğraflar — günler içinde, hiçbir sıra gözetmeden, e-postayla gelir.",
        "Dosya sorumluları zamanlarının çoğunu değerlendirmeye değil, bir araya getirmeye harcar: ekleri açmak, tutarları bulmak, talep edilen rakamın tahmindeki rakamla uyuştuğunu kontrol etmek.",
      ],
      fields: [
        { name: "Hasar ve poliçe numarası", note: "Setteki her şeyin üzerinden birleştiği anahtarlar ve çoğu zaman belgeler arasında tutarlı olan tek şey." },
        { name: "Talep sahibi ve olay bilgileri", note: "Hasarın tarihi, yeri ve tanımı; genellikle form ile bir anlatım arasında dağılmış hâlde." },
        { name: "Talep edilen tutar", note: "Formun söylediği. Kanıtların desteklediği tutardan ayrı olarak çıkarmaya değer." },
        { name: "Destekleyici tutarlar", note: "Tahmin ve fatura toplamları — talep edilen tutarın uyuşması gereken rakamlar." },
        { name: "Üçüncü taraf bilgileri", note: "Rücu için gereken diğer taraflar, sigortacılar ve referans numaraları." },
        { name: "Ek başına belge türü", note: "Her dosyanın ne olduğunu bilmek, onu hangi Flow'un okuyacağını belirler." },
      ],
      gotchas: [
        {
          title: "Kanıtlar geç ve düzensiz gelir",
          body: "Set tamamlanmadan değerlendirme başlayamaz ve set günler içinde tamamlanır. Collection'lar her eki geldiği anda sınıflandırır; böylece kayıt kademeli olarak oluşur ve yeni bir şey geldiğinde birinin tüm klasörü yeniden okuması gerekmez.",
        },
        {
          title: "Talep edilen tutar ile kanıtlanan tutar farklı alanlardır",
          body: "Talep başına tek bir sayı çıkarmak, önemli olan kontrolü kaybettirir. Talep edileni ve tahminler ile faturaların gerçekte ne tuttuğunu yakalayın; fark, dosya sorumlusunun fark etmesi gereken bir şey olmaktan çıkar ve filtreleyebileceğiniz bir değere dönüşür.",
        },
        {
          title: "Hasar dosyaları kişiseldir, çoğu zaman da tıbbidir",
          body: "Hasar talepleri rutin olarak sağlık bilgileri, kimlik belgeleri ve finansal ayrıntılar içerir. Kullanıcı bazlı erişim izinlerine sahip özel Bucket'lar, bir talebi kuruluştaki herkese değil, onunla ilgilenen dosya sorumlularına görünür tutar.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Her eki sınıflandırır — form, tahmin, fatura, rapor — ve kendisi için kurulmuş Flow'a yönlendirir." },
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Talepler e-postayla gelir; bir Collection adresine iletmek her eki geldiği anda işler." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Tarihleri ve para birimlerini normalleştirir, talep edilen ve kanıtlanan tutarlar arasındaki farkı hesaplar." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Dosya sorumluları, kararın ve kararı verenin kalıcı kaydıyla onaylar veya reddeder." },
      ],
      faqs: [
        { q: "Birçok farklı eki olan bir talebi işleyebilir mi?", a: "Evet. Bir Collection her eki sınıflandırır ve doğru Flow'a yönlendirir; böylece hasar formu, tahmin ve fatura, her biri o belge türü için kurulmuş Flow tarafından okunur." },
        { q: "Rakamların uyuşmadığı talepleri işaretleyebilir mi?", a: "Talep edilen tutarı ve destekleyici toplamları ayrı alanlar olarak çıkarın, ardından farkı hesaplamak için bir Cleaner kullanın. Kontrolü geçemeyen talepler otomatik olarak incelemeye yönlendirilebilir." },
        { q: "Hassas hasar verileri nasıl korunur?", a: "Bucket'lar tüm kuruluşa görünür olmak yerine özel olabilir ve kullanıcı bazında Viewer veya Editor izinleri verilebilir; böylece bir talep yalnızca onunla çalışan dosya sorumlularına görünür." },
      ],
    },
    {
      slug: "identity-verification",
      label: "Kimlik ve Müşteri Kabulü",
      badge: "KYC ve Müşteri Kabulü",
      h1: "Kimlik ve müşteri kabul belgesi yakalama",
      title: "Müşteri Kabulü için KYC Belgesi Veri Çıkarımı",
      description:
        "Müşteri kabulü sırasında kimlik ve adres belgelerini yakalayın, bilgilerin belgeler arasında uyuştuğunu kontrol edin ve kararın denetlenebilir bir kaydını tutun.",
      summary: "Kimlik ve adres belgeleri yakalanır, tutarlılık açısından çapraz kontrol edilir ve denetlenebilir biçimde kaydedilir.",
      lede: "Tavnit müşteri kabulü sırasında toplanan belgeleri — kimlik belgeleri, adres kanıtı, kuruluş evrakı — okur ve adları, numaraları, tarihleri ve adresleri yapılandırılmış alanlar olarak döndürür. Tüm set birlikte işlendiği için bilgilerin belgeler arasında uyuşup uyuşmadığı bir varsayım değil, bir kontrol olur.",
      problem: [
        "Bir müşteriyi kabul etmek, belgeleri toplamak, okumak ve aynı kişiyi ya da tüzel kişiyi tanımladıklarını teyit etmek demektir. Okumak sıkıcıdır; teyit etmek risk taşıyan kısımdır ve gözle yapılır.",
        "Hacim durumu daha da kötüleştirir. Düzenli olarak müşteri kabul eden bir ekip, sonunda inceleyiciler arasında tutarsız standartlarla ve neyin ne zaman kontrol edildiğine dair güvenilir bir kayıt olmadan kalır.",
      ],
      fields: [
        { name: "Basıldığı şekliyle tam ad", note: "Olduğu gibi çıkarın. Sıralama ve harf çevirisi belgeler arasında farklılık gösterir ve bu fark kontrolün ta kendisidir." },
        { name: "Doğum tarihi", note: "Belgeler arası tutarlılık için en yararlı tek alan." },
        { name: "Belge numarası ve türü", note: "Pasaport, kimlik kartı, ehliyet — her birinin kendi numaralandırma kuralları vardır." },
        { name: "Düzenleme ve geçerlilik tarihleri", note: "Geçerlilik bir alan değil, bir kuraldır: süresi dolmuş bir belge bir bulgudur." },
        { name: "Adres", note: "Müşterinin beyan ettiğiyle uyuşması gereken adres kanıtı belgelerinden." },
        { name: "Tüzel kişi sicil bilgileri", note: "Kurumsal müşteri kabulü için — sicil numarası, kayıtlı merkez adresi, yöneticiler." },
      ],
      gotchas: [
        {
          title: "Adlar uyuşmaz ve bu normaldir",
          body: "Aynı kişi üç belgede 'Jose Garcia Lopez', 'J. García' ve 'GARCIA LOPEZ, JOSE' olarak görünür. Adları çıkarım sırasında normalleştirmek yerine olduğu gibi çıkarın, sonra bilinçli olarak karşılaştırın — çok erken normalleştirmek, değerlendirmeniz gereken farkın ta kendisini yok eder.",
        },
        {
          title: "Fotoğraflanmış kimlik olağandır ve kalite değişkendir",
          body: "Müşteriler belgeleri telefonla fotoğraflar; makine tarafından okunabilir bölgenin üzerinde parlama çoğu zaman vardır. Bir hatanın bedeli düşünüldüğünde müşteri kabulünde inceleme orantılıdır; denetim izi de hangi belgeyi kimin kabul ettiğini kaydeder.",
        },
        {
          title: "İşleyeceğiniz en sıkı düzenlenen veri budur",
          body: "Kimlik belgeleri, sıradan iş belgelerinin taşımadığı saklama sınırları, silinme hakları ve erişim yükümlülükleri taşır. Özel Bucket'lar ve kullanıcı bazlı izinler müşteri kabul dosyalarını uyumluluk ekibiyle sınırlar; yalnızca ekleme yapılabilen iz de kimin neye eriştiğini kanıtlar.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Müşteri ne gönderdiyse — pasaport, fatura, kuruluş belgesi — sınıflandırır ve her birini doğru Flow'a yönlendirir." },
        { label: "Flow'lar", href: "/docs/flows", why: "Belge türü başına bir Flow; böylece bir kontrol metin içinde arama yapmak yerine adlandırılmış bir alana başvurabilir." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Hangi belgeyi kimin onayladığının kalıcı kaydıyla her müşteri kabulünde onay." },
        { label: "Kullanıcı rolleri", href: "/docs/user-roles", why: "Kimlik belgelerini tüm kuruluş yerine onlara ihtiyaç duyan ekiple sınırlar." },
      ],
      faqs: [
        { q: "Bir belgenin gerçek olduğunu doğruluyor mu?", a: "Hayır. Tavnit belgelerin söylediklerini çıkarır ve yapılandırır, bir set genelinde tutarlılığı kontrol etmenizi sağlar. Düzenleyen kurumlara karşı sahicilik doğrulaması ayrı bir uzmanlık alanıdır ve bu onun yerini tutmaz." },
        { q: "Bilgilerin belgeler arasında uyuştuğunu kontrol edebilir mi?", a: "Evet. Seti birlikte işleyin ve çıkarılan alanları — ad, doğum tarihi, adres — karşılaştırın; böylece bir uyumsuzluk, inceleyicinin fark etmesi gereken bir şey olmaktan çıkar ve bir değer olarak ortaya çıkar." },
        { q: "Kimlik verileri nasıl kısıtlı tutulur?", a: "Kullanıcı bazlı erişim izinlerine sahip özel Bucket'lar görünürlüğü uyumluluk ekibiyle sınırlar; yalnızca ekleme yapılabilen denetim izi de her görüntüleme, düzenleme ve onayı kaydeder." },
      ],
    },
    {
      slug: "lease-agreements",
      label: "Kira ve Gayrimenkul",
      badge: "Gayrimenkul ve Tesis Yönetimi",
      h1: "Kira sözleşmesi veri çıkarımı",
      title: "Kira Sözleşmesi Özetleme — Kira, Koşullar ve Fesih Tarihleri",
      description:
        "Kira sözleşmelerini tüm portföy genelinde yapılandırılmış kayıtlara özetleyin — kira, kira artış tarihleri, fesih maddeleri, hizmet bedelleri ve onarım yükümlülükleri.",
      summary: "Kira sözleşmeleri yapılandırılmış kayıtlara özetlenir: kira, artış tarihleri, fesih tarihleri ve yükümlülükler.",
      lede: "Tavnit kira sözleşmelerini yapılandırılmış kayıtlara özetler: taraflar, kiralanan taşınmaz, süre, kira ve kira artış tarihleri, fesih maddeleri, hizmet bedeli esası ve onarım yükümlülükleri. PDF olarak tutulan bir portföy, bir sonraki kira artışının bir okuma egzersizi değil, bir filtre olduğu bir tabloya dönüşür.",
      problem: [
        "Kira sözleşmesi özetleme, tam da yanıtlar alanlarda basılı değil metnin içine gömülü olduğu için yerleşik bir manuel iştir. Şirketler bunun için tekrar tekrar para öder ve ortaya çıkan tablo, bir sözleşme değiştirildiği anda eskir.",
        "Bunun olmamasının bedeli somut ve pahalıdır: kaçırılmış bir fesih tarihi, kullanılmamış bir opsiyon, itiraz edilmeden geçmiş bir kira artışı.",
      ],
      fields: [
        { name: "Kiraya veren, kiracı ve kefil", note: "Ticari adlar değil tüzel kişiler; sonraki belgelerle sıklıkla değiştirilir." },
        { name: "Kiralanan taşınmaz", note: "Temiz bir adres olarak nadiren; metin içinde ve plan referansıyla tarif edilir." },
        { name: "Süre, başlangıç ve bitiş", note: "Belgedeki diğer tüm tarihlerin omurgası." },
        { name: "Kira ve kira artış tarihleri", note: "Artış esası — piyasa değeri, endeksli, kademeli — tutar kadar önemlidir." },
        { name: "Fesih maddeleri ve koşulları", note: "Koşulları karşılanmamış bir fesih hakkı, fesih hakkı değildir. İkisini de çıkarın." },
        { name: "Hizmet bedeli ve onarım yükümlülükleri", note: "Sorumluluğun gerçekte nerede olduğu; genellikle belgedeki en uzun maddeler." },
      ],
      gotchas: [
        {
          title: "Tarihler belirtilmez, tanımlanır",
          body: "Bir kira sözleşmesi fesih tarihini nadiren yazar. Kiracının, altı ay önceden bildirimde bulunarak, sürenin başlangıcının beşinci yıl dönümünde sözleşmeyi feshedebileceğini söyler. Başlangıcı, yıl dönümünü ve bildirim süresini alan olarak çıkarın, ardından gerçek son tarihi bir formül Cleaner'ının hesaplamasına izin verin — ihtiyacınız olan tarih zaten budur.",
        },
        {
          title: "Geçerli belge çoğu zaman kira sözleşmesinin kendisi değildir",
          body: "Değişiklik protokolleri, tadilat izinleri ve yan mektuplar durumu değiştirir; asıl kira sözleşmesi ise sanki bunlar yokmuş gibi okunmaya devam eder. Her birini tarihi yakalanmış şekilde kendi çalıştırması olarak işleyin; böylece güncel durum, birinin açtığı PDF'ten değil tüm setten türetilir.",
        },
        {
          title: "Koşullu bir hakkı koşulsuz okumak bir risktir",
          body: "Fesih maddeleri rutin olarak taşınmazın boş teslimine ya da kiranın güncel ödenmiş olmasına bağlıdır. Hakkı koşulları olmadan yakalamak, kendinden emin biçimde yanlış bir portföy tablosu üretir; bu da hiç tablo olmamasından kötüdür. Koşulları kendi alanı olarak çıkarın ve inceleyin.",
        },
      ],
      pipeline: [
        { label: "Flow'lar", href: "/docs/flows", why: "Çıkarım ipuçları burada vazgeçilmezdir — modelin yalnızca nereye bakacağını değil, bir fesih koşulunun ne olduğunu da bilmesi gerekir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Kira artışı ve fesih son tarihlerini başlangıç tarihlerinden ve bildirim sürelerinden hesaplar." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Portföy bir tablo olarak: hangi sözleşmeler gelecek yıl feshedilebiliyor, bildirim son tarihine göre sıralı." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Her özeti inceleyin. Burada yanlış bir tarihin bedeli yıllarca ödenen kirayla ölçülür." },
      ],
      faqs: [
        { q: "Fesih ve kira artış tarihlerini hesaplayabilir mi?", a: "Evet. Başlangıç tarihini, hakkın bağlı olduğu yıl dönümünü ve bildirim süresini çıkarın; ardından bir formül Cleaner'ı gerçek son tarihi türetir — genellikle istediğiniz de maddenin kendisi değil, bu tarihtir." },
        { q: "Değişiklik protokolleri ne olacak?", a: "Her belgeyi, tarihi bir alan olarak yakalanmış şekilde kendi çalıştırması olarak işleyin. Güncel durum böylece en yeni dosyanın geçerli olduğunu varsaymaktan değil, tüm seti sorgulamaktan gelir." },
        { q: "Bir fesih maddesine bağlı koşulları yakalıyor mu?", a: "Yakalamalı ve bu sayfa bunun şart olduğunu savunuyor — koşulları olmadan kaydedilmiş bir fesih hakkı, kesinmiş gibi okunan ama kesin olmayan bir portföy tablosu üretir. Koşulları kendi alanı olarak çıkarın ve inceleyin." },
      ],
    },
    {
      slug: "timesheets",
      label: "Puantajlar",
      badge: "Bordro ve Personel",
      h1: "Puantaj ve vardiya kaydı yakalama",
      title: "Bordro için Puantaj Veri Çıkarımı",
      description:
        "Gönderilen puantajlardan — basılı, el yazısı veya fotoğraflanmış — çalışma saatlerini yakalayın ve bordroya ulaşmadan önce kurallara göre kontrol edin.",
      summary: "Basılı, el yazısı ve fotoğraflanmış puantajlardan yakalanan saatler, bordrodan önce kontrol edilir.",
      lede: "Tavnit gönderilen puantajları, el yazısı ve fotoğraflanmış olanlar dahil okur ve çalışanı, tarihi, saatleri ve maliyet kodunu satırlar olarak döndürür. Kurallar toplamları bordroya herhangi bir şey ulaşmadan önce kontrol edebilir; böylece maaş düzeltmesine dönüşen hatalar henüz ucuzken yakalanır.",
      problem: [
        "Bordro bir son tarihe göre çalışır ve puantajlar her sahanın ya da ajansın kullandığı biçimde gelir — bir tablo çıktısı, vardiya sonunda fotoğraflanmış bir kâğıt, bir alt yüklenicinin kendi sisteminden gelen bir PDF.",
        "Biri bunları zaman baskısı altında yeniden girer; aktarım hatalarının ortaya çıktığı koşul da tam olarak budur. Bordro çalıştırıldıktan sonra fark edilen yanlış bir rakam bir düzeltme, bir mahsup ve tatsız bir konuşma demektir.",
      ],
      fields: [
        { name: "Çalışan adı veya sicil numarası", note: "Puantajlardaki adlar bordro kayıtlarıyla nadiren birebir eşleşir — bir eşleme Cleaner'ı bunları eşler." },
        { name: "Tarih veya hafta sonu tarihi", note: "Saatlerin hangi bordro dönemine ait olduğunu belirler ve dönem sınırında yanlış okunması kolaydır." },
        { name: "Başlangıç, bitiş ve mola saatleri", note: "Yalnızca toplamı değil bileşenleri çıkarmak, toplamın doğrulanmasını sağlar." },
        { name: "Toplam saat", note: "Gönderildiği şekliyle çıkarmaya ve hesaplanan toplamla karşılaştırmaya değer." },
        { name: "Fazla mesai ve ek ücretli saatler", note: "Farklı oranlar; bu yüzden yanlış sınıflandırma bir yuvarlama hatası değil, bir maaş hatasıdır." },
        { name: "Maliyet kodu veya proje", note: "İş bazlı maliyetlendirmeyi belirler ve en sık boş bırakılan alandır." },
      ],
      gotchas: [
        {
          title: "Beyan edilen toplam ile gerçek toplam beklediğinizden sık uyuşmaz",
          body: "İnsanlar kendi saatlerini toplar ve yanlış toplar. Beyan edilen toplamın yanı sıra başlangıç, bitiş ve mola saatlerini çıkarmak, bir formül Cleaner'ının saatleri hesaplayıp karşılaştırmasını sağlar — ortaya çıkan farklar genellikle çıkarım hataları değil, gerçek aritmetik hatalarıdır.",
        },
        {
          title: "El yazısı puantajlar zor ve yaygın bir durumdur",
          body: "Saha ve vardiya işleri hâlâ gün sonunda fotoğraflanan kâğıtlarla yürür. El yazısı çıkarılır ama güven düzeyi değişir; bu, belirsiz yakalamaları incelemeye yönlendirmenin sorunu bir maaş bordrosunda keşfetmekten daha iyi olduğu bir kullanım senaryosudur.",
        },
        {
          title: "Puantajlardaki adlar bordrodaki adlar değildir",
          body: "'Dave S.', 'David Smith' ve bir sicil numarası aynı kişiyi ifade eder ve bordronun ihtiyacı numaradır. Bir eşleme Cleaner'ı işlem sırasında gönderilen adları çalışan listenizle eşleştirir; böylece eşleşmeyen girişler tahmin edilmek yerine işaretlenir.",
        },
      ],
      pipeline: [
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Sahalar ve ajanslar hafta sonunda puantajları e-postayla gönderir; iletmek onları geldikleri anda işler." },
        { label: "Splitter'lar", href: "/docs/splitters", why: "Tüm ekibin puantajlarını içeren tek bir PDF, çalışan başına bir çalıştırmaya dönüşür." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Saatleri giriş-çıkış zamanlarından hesaplar, adları bordro kayıtlarıyla eşleştirir ve tutmayan toplamları işaretler." },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop", why: "Bir kişiye yalnızca kontrolü geçemeyen puantajlar ulaşır; bordro son tarihinde bunu uygulanabilir kılan da budur." },
      ],
      faqs: [
        { q: "El yazısı puantajları okuyabilir mi?", a: "Evet. El yazısı basılı metinle birlikte çıkarılır, ancak güven düzeyi okunaklılığa göre değişir — belirsiz puantajları incelemeye yönlendirmeyi burada etkinleştirmeye değmesinin nedeni budur." },
        { q: "Saatlerin tuttuğunu kontrol edebilir mi?", a: "Evet. Beyan edilen toplamla birlikte başlangıç, bitiş ve mola saatlerini çıkarın; bir formül Cleaner'ı saatleri hesaplar ve ikisinin uyuşmadığı her puantajı işaretler." },
        { q: "Adlar bordro sistemimizle uyuşmazsa ne olur?", a: "Bir eşleme Cleaner'ı işlem sırasında gönderilen adları çalışan listenizle eşleştirir. Eşleştiremediği girişler tahmin edilmek yerine işaretlenir; böylece bordroya kime ait olduğu belirsiz hiçbir şey ulaşmaz." },
      ],
    },
    {
      slug: "utility-bills",
      label: "Tüketim Faturaları",
      badge: "Tesis Yönetimi ve ESG",
      h1: "Tüketim faturası ve sayaç verisi çıkarımı",
      title: "Maliyet ve Emisyon İçin Tüketim Faturası Veri Çıkarımı",
      description:
        "Maliyet kontrolü ve emisyon raporlaması için bir gayrimenkul portföyündeki elektrik, gaz ve su faturalarından tüketimi, tarifeleri ve sayaç okumalarını çıkarın.",
      summary: "Bir portföy genelinde tüketim, tarifeler ve sayaç okumaları çıkarılır; maliyet ve emisyon raporlaması için.",
      lede: "Tavnit elektrik, gaz, su ve atık faturalarını okur ve tesis başına tüketimi, tarifeyi, sayaç okumalarını ve ücretleri döndürür. Bir portföyün faturaları, eğilimini izleyebileceğiniz bir tabloya dönüşür — hem maliyet kontrolünün hem de emisyon raporlamasının gerçekte ihtiyaç duyduğu şey budur.",
      problem: [
        "Birkaç tesisten fazlasını yöneten herkes birkaç tedarikçiden birkaç biçimde fatura alır ve bunların başına güvenilir biçimde gelen tek şey ödenmektir. Tüketim verileri — analitik değeri olan kısım — PDF'te kalır.",
        "Emisyon raporlaması bunu acil hâle getirdi. Kapsam 1 ve 2 raporlaması, tesis ve dönem bazında kWh cinsinden tüketim gerektirir ve çoğu kuruluş için bu veriler yalnızca kimsenin aktarmadığı bir fatura yığını olarak mevcuttur.",
      ],
      fields: [
        { name: "Tesisat adresi ve sayaç numarası (MPAN/MPRN)", note: "Bir faturayı bir tesise bağlayan tanımlayıcı. Adresler tek başına tedarikçiler arasında güvenilir değildir." },
        { name: "Fatura dönemi", note: "Faturalar nadiren takvim aylarına denk gelir; çeyreğe göre topladığınızda bu önemlidir." },
        { name: "Birimiyle tüketim", note: "kWh, m³ veya litre. Birim, sayı kadar önemlidir ve her zaman aynı şekilde belirtilmez." },
        { name: "Sayaç okumaları ve tahmini okuma işareti", note: "Tahmini bir okuma bir ölçüm değildir; onu ölçüm gibi ele almak eğilimi bozar." },
        { name: "Tarife ve sabit ücret", note: "Bir fiyat değişikliğini bir tüketim değişikliğinden ayıran şey." },
        { name: "Toplam ücretler ve vergi", note: "Gerçekte ödenenle maliyet mutabakatı için." },
      ],
      gotchas: [
        {
          title: "Tahmini okumalar veri değildir",
          body: "Tedarikçiler bir sayacı okuyamadıklarında tahmin eder, sonra bir sonraki gerçek okumada düzeltir. İkisini ayırt etmeden oluşturulan bir eğilim, hiç yaşanmamış bir sıçrama ve ardından hiç yaşanmamış bir düşüş gösterir. Tahmini okuma işaretini kendi alanı olarak çıkarın; böylece tahminler hariç tutulabilir veya ayrı ele alınabilir.",
        },
        {
          title: "Fatura dönemleri hiçbir şeye denk gelmez",
          body: "Bir tedarikçi aylık, bir diğeri 28 günde bir, bir üçüncüsü üç ayda bir faturalar ve hiçbiri sizin raporlama dönemlerinize denk gelmez. Tek bir tarih yerine dönem başlangıcını ve bitişini çıkarın; böylece tüketim gerçekte raporladığınız dönemlere paylaştırılabilir.",
        },
        {
          title: "Birimler farklıdır ve tuzak gazdadır",
          body: "Gaz sıklıkla metreküp olarak faturalanır ve kWh olarak raporlanır; dönüşüm de faturada basılı bir kalori değerine bağlıdır. Varsaymak yerine birimi ve dönüşüm katsayısını çıkarın, ardından dönüşümü bir birim Cleaner'ına bırakın — standart bir katsayı varsaymak, çoğu emisyon rakamının sessizce yanlış gittiği yerdir.",
        },
      ],
      pipeline: [
        { label: "Collection'lar", href: "/docs/collections", why: "Farklı hizmetlerin ve tedarikçilerin faturaları birlikte gelir ve otomatik olarak doğru Flow'a yönlendirilir." },
        { label: "Cleaner'lar", href: "/docs/cleaners", why: "Birimleri tek bir raporlama esasına çevirir ve dönemlere paylaştırılmış tüketimi hesaplar." },
        { label: "Bucket'lar", href: "/docs/buckets", why: "Tesis ve dönem bazında tüketim, grafiğe dökülebilir bir tablo olarak — hem finansın hem de ESG raporlamasının ihtiyaç duyduğu biçim." },
        { label: "E-posta entegrasyonu", href: "/docs/email-integration", why: "Tedarikçiler faturaları e-postayla gönderir; bunları iletmek, bir veri girişi projesine gerek kalmadan veri kümesini oluşturur." },
      ],
      faqs: [
        { q: "Farklı hizmetlerin ve tedarikçilerin faturalarını işleyebilir mi?", a: "Evet. Bir Collection her faturayı sınıflandırır ve doğru Flow'a yönlendirir; böylece elektrik, gaz ve su faturaları, tedarikçinin düzeni ne olursa olsun, her biri kendisi için kurulmuş Flow tarafından okunur." },
        { q: "Veriler emisyon raporlaması için kullanılabilir mi?", a: "Birimleri yakalanmış şekilde tesis ve dönem bazında tüketim üretir; bu tür raporlamanın ihtiyaç duyduğu girdi de budur. Standart bir katsayı varsaymak yerine tahmini okuma işaretini ve dönüşüm katsayısını çıkarın — çoğu emisyon rakamı tam da bu varsayımda yanlış gider." },
        { q: "Bir fiyat artışını bir tüketim artışından ayırabilir mi?", a: "Tüketimle birlikte tarifeyi ve sabit ücreti çıkarın; ikisi, eğilimlerini bağımsız olarak izleyebileceğiniz ayrı sütunlara dönüşür." },
      ],
    },
  ],
};

export default tr;
