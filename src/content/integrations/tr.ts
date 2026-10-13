import type { IntegrationsContent } from "@/content/types";

/**
 * Integrations: the /integrations hub (cards included) and /integrations/mcp — Türkçe (tr).
 */
const tr: IntegrationsContent = {
  hub: {
    title: "Entegrasyonlar — API, E-posta, Webhook'lar ve MCP",
    description:
      "Tavnit'e girmenin ve çıkmanın tüm yolları: yapay zekâ asistanları için bir MCP bağlayıcısı, REST API, e-posta yönlendirme, webhook'lar ve Zapier, Make ile n8n tarifleri.",
    ogTitle: "Tavnit Entegrasyonları",
    breadcrumbHome: "Ana sayfa",
    h1: "Entegrasyonlar",
    intro:
      "Belgeler Tavnit'e, gönderen ekibe en uygun hangi yol ise o yoldan ulaşır — uygulamaya bırakılır, bir adrese iletilir, bir uç noktaya gönderilir ya da bir yapay zekâ asistanı tarafından istenir. Çıkarılan veriler de aynı şekilde geri döner.",
    introMore:
      "Her yol aynı Flow'ları çalıştırır; böylece yapılandırdığınız şema, temizleme kuralları ve inceleme adımları, belge nasıl gelirse gelsin uygulanır.",
    whichHeading: "Hangisini kullanmalısınız?",
    which: [
      "**Belgeleri kişiler gönderiyorsa** — örneğin tedarikçi faturalarının geldiği bir muhasebe gelen kutusu — [e-posta](/docs/email-integration) kullanın. Kimsenin yeni bir araç öğrenmesi gerekmez; zaten yaptıkları gibi iletirler.",
      "**Belgeleri bir sistem gönderiyorsa** [REST API](/docs/api-integration) kullanın ve sonuçların [webhook](/docs/webhooks) ile geri gönderilmesini sağlayın. Ara kodu yazmak istemiyorsanız aynı uç noktalar Zapier, Make, n8n ve Power Automate'ten de çalışır.",
      "**Bir yapay zekâ asistanıyla birlikte çalışıyorsanız** [MCP bağlayıcısını](/integrations/mcp) kullanın. claude.ai veya Cursor'a yalnızca bir giriş yolu değil, tüm Pipeline'ı verir: asistanınız çıkarım Flow'ları kurabilir, temizleme kuralları ekleyebilir, belgeleri bunlardan geçirebilir ve daha önce çıkardıklarınızı sorgulayabilir — siz dosyaları elle taşımadan.",
    ],
    finalHeading: "Tek bir belgeyle başlayın",
    finalBody:
      "Bir Flow kurun, içinden bir belge geçirin ve çıktıyı gördükten sonra teslimatı bağlayın. Başlangıç için ücretsiz krediler.",
    finalCta: "Ücretsiz başlayın",
  },
  items: [
    {
      label: "MCP Bağlayıcısı",
      href: "/integrations/mcp",
      summary:
        "Tavnit'i claude.ai, Cursor veya herhangi bir MCP istemcisine ekleyin. Asistanınız çıkarım Flow'ları kurabilir, temizleme kuralları ekleyebilir, belgeleri bunlardan geçirebilir ve çıkarılan verileri sorgulayabilir — hepsi sohbetle.",
      own: true,
    },
    {
      label: "REST API",
      href: "/docs/api-integration",
      summary:
        "Belgeleri bir API anahtarıyla programlı olarak gönderin. Multipart veya base64 yükleme; Python ve JavaScript örnekleriyle.",
      own: false,
    },
    {
      label: "E-posta",
      href: "/docs/email-integration",
      summary:
        "Belgeleri özel bir adrese iletin ya da otomatik yönlendirin, her ekten veri çıkarılsın — sonuçlar da ihtiyacı olan kişiye e-postayla gitsin, uygulamayı hiç açmadan.",
      own: false,
    },
    {
      label: "Webhook'lar",
      href: "/docs/webhooks",
      summary:
        "Bir çalıştırma biter bitmez tipli sonuçları kendi uç noktanıza gönderin; çıkarılan veriler sistemlerinize otomatik olarak ulaşsın.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n ve Power Automate",
      href: "/docs/api-integration",
      summary:
        "Aynı uç noktaları çağıran kodsuz tarifler; kod yazmak yerine bağlantıları görsel olarak kurmayı tercih eden ekipler için.",
      own: false,
    },
    {
      label: "Bucket'lar",
      href: "/docs/buckets",
      summary:
        "Çıkarılan satırları yerleşik yapılandırılmış depolamada tutun — yerinde düzenleyin, sorgulayın ve grafiğe dökün ya da CSV ve Excel'e aktarın.",
      own: false,
    },
  ],
  mcp: {
    title: "Claude ve Cursor için MCP ile Belge Veri Çıkarımı",
    description:
      "Tavnit'i MCP üzerinden claude.ai veya Cursor'a bağlayın. Asistanınız çıkarım Flow'ları kurabilir, belgeleri bunlardan geçirebilir ve sonuçları sorgulayabilir — tipli ve temizlenmiş olarak.",
    ogTitle: "Belge Veri Çıkarımı için MCP Sunucusu | Tavnit",
    schemaHeadline: "Belge Veri Çıkarımı için MCP Sunucusu — Claude ve Cursor",
    schemaName: "MCP Bağlayıcısı",
    breadcrumbHome: "Ana sayfa",
    breadcrumbHub: "Entegrasyonlar",
    breadcrumbSelf: "MCP Bağlayıcısı",
    badge: "Model Context Protocol",
    h1: "Yapay zekâ asistanınıza gerçek bir belge Pipeline'ı verin",
    lede:
      "Tavnit bir MCP sunucusu çalıştırır. Onu claude.ai veya Cursor'a bağladığınızda asistanınız tüm belge Pipeline'ına erişir: çıkarım Flow'ları kurabilir, temizleme kuralları ekleyebilir, belgeleri bunlardan geçirebilir ve sonuçları geri okuyabilir — eline verilen bir dosyanın yorumunu değil, tanımladığınız alanların tam kendisini, temizlenmiş ve tipli olarak.",
    ledeMore: "Kurulum, asistanınızın ayarlarına yapıştırdığınız bir URL'den ibarettir. SDK yok, çalıştırılacak sunucu yok, kod yok.",
    ctaStart: "Ücretsiz başlayın",
    ctaSetup: "Kurulum kılavuzu",
    problemHeading: "Asistanlar belgelerde neden zorlanır",
    problem: [
      "Yapay zekâ asistanları akıl yürütmede iyi, veri Pipeline'ı olmakta kötüdür. Birine taranmış bir fatura verin, okur — muhtemelen doğru, bazen yanlış ve ikinci seferde farklı biçimde. Şema yoktur, bu yüzden alan adları çalıştırmadan çalıştırmaya kayar. Doğrulama yoktur, bu yüzden yanlış okunmuş bir toplam doğrusuyla tıpatıp aynı görünür. Ve ne olduğuna dair bir kayıt yoktur; çıktı muhasebeye ya da uyumluluğa dokunduğu anda bu önem kazanır.",
      "Tek seferlik bir soru için bu sorun değildir, ama bir süreç olarak işlemez. Bir asistanın gerçekte ihtiyaç duyduğu şey, belgelerinizi nasıl okuyacağını zaten bilen bir araçtır.",
    ],
    compareHeading: "PDF yapıştırmak ve Flow çağırmak",
    compareCapability: "Özellik",
    compareChat: "Dosyayı sohbete yapıştırmak",
    compareMcp: "MCP bağlayıcısı üzerinden",
    compareRows: [
      ["Çıktı yapısı", "Model o seferde ne döndürürse", "Her seferinde Flow'unuzun tanımladığı alanlar"],
      ["Alan adları", "Çalıştırmadan çalıştırmaya kayar", "Şemanızla sabitlenir"],
      ["Temizleme kuralları", "Yok", "Cleaner'lar otomatik uygulanır"],
      ["İnsan incelemesi", "Mümkün değil", "İsteğe bağlı, denetim iziyle"],
      ["Sonuçların gittiği yer", "Sohbette", "Bucket'lar, webhook, e-posta veya API"],
      ["Hacimde tekrarlanabilir", "Hayır", "Evet — aynı Flow, istediğiniz kadar belge"],
    ],
    capabilitiesHeading: "Bağlandıktan sonra asistanınızın yapabilecekleri",
    capabilities: [
      {
        title: "Tarif ederek Flow kurun",
        body: "Asistana neyi yakalaması gerektiğini söyleyin — tedarikçi, tarihler, toplamlar, kalemler — o da çıkarım Flow'unu kuruluşunuzda, çalışmaya hazır şekilde oluşturur. Bir Pipeline kurmak, bir öğleden sonralık yapılandırma değil, tek bir sohbet mesajı olur.",
      },
      {
        title: "Temizleme kuralları ekleyin",
        body: "Toplamların USD'ye çevrilmesini, tarihlerin normalleştirilmesini veya değerlerin referans verilerle eşleştirilmesini isteyin; asistan Cleaner'ı oluşturur ve Flow'a ekler — aynı kurallar bundan sonra, nasıl gelirse gelsin her belgede çalışır.",
      },
      {
        title: "Bir belgeyi Flow'dan geçirin",
        body: "Asistandan bir faturayı, sözleşmeyi veya formu çıkarım Flow'larınızdan biriyle işlemesini isteyin. Size onları anlatan bir paragraf değil, tanımladığınız alanları tipli ve temizlenmiş olarak döndürür.",
      },
      {
        title: "Daha önce çıkardıklarınızı sorgulayın",
        body: "Bucket'larınıza soru sorun — geçen çeyrek bir tedarikçiye ne ödediniz, hangi sözleşmeler gelecek ay yenileniyor — yanıt modelin hafızasından değil, canlı verilerinizden gelir.",
      },
    ],
    askHeading: "Sorabileceğiniz şeyler:",
    ask: [
      "Navlun faturalarımızdan tedarikçiyi, tarihleri, toplamları ve kalemleri yakalayan bir Flow oluştur.",
      "O Flow'a tüm toplamları USD'ye çeviren bir Cleaner ekle.",
      "Bu faturayı Supplier Invoices Flow'umdan geçir ve kalemleri göster.",
      "Invoices Bucket'ıma göre geçen çeyrek Acme Corp'a ne ödedik?",
      "Bu üç sözleşmeden yenileme tarihlerini çıkar ve karşılaştır.",
      "Şu anda hangi çalıştırmalar inceleme bekliyor?",
    ],
    fitsHeading: "Zaten kurduğunuz Pipeline'ı kullanır",
    fitsIntro:
      "Bağlayıcı ayrı bir çıkarım motoru değildir. Tavnit'in geri kalanıyla aynı Flow'ları çağırır — onları uygulamada siz kurmuş olun ya da asistan sizin için oluşturmuş olsun — yani isteği yapan bir asistan olduğunda da yapılandırdığınız her kural geçerliliğini korur.",
    fits: [
      "[Collection'lar](/docs/collections) gelen belgeyi yine sınıflandırır ve doğru Flow'a yönlendirir.",
      "[Cleaner'lar](/docs/cleaners) yine biçimleri standartlaştırır, para birimlerini çevirir ve eşlemelerinizi uygular.",
      "[İnsan incelemesi](/docs/human-in-the-loop), istediğiniz durumlarda bir çalıştırmayı yine duraklatır — bir asistan onay adımınızı atlayamaz.",
      "Sonuçlar yine [Bucket'lara](/docs/buckets) gider; böylece asistanın çıkardığı veriler sonradan da sorgulanabilir.",
    ],
    scopeHeading: "Kapsam ve erişim",
    scopeCards: [
      {
        title: "Yetkileriniz kadar, fazlası değil",
        body: "Bağlayıcı kendi API anahtarınızdan üretilir ve yalnızca onu oluşturduğunuz kuruluşa erişir. Asistan rolünüzü devralır — uygulamada sizin yapamayacağınız hiçbir şeyi yapamaz.",
      },
      {
        title: "URL'yi bir kimlik bilgisi gibi koruyun",
        body: "Bağlayıcı URL'sine sahip olan herkes Flow'larınıza ve Bucket'larınıza erişebilir. URL'ler süreli olarak geçerlidir ve birini yenilemek önceki değeri anında geçersiz kılar.",
      },
    ],
    scopeMore:
      "Tüm ayrıntılar [bağlayıcı belgelerinde](/docs/mcp-connector) ve [kullanıcı rolleri başvuru sayfasında](/docs/user-roles). Sunucu uç noktası `{mcpUrl}` adresidir.",
    setupHeading: "Bağlama",
    setupBody:
      "Tavnit'teki Entegrasyonlar sayfasında bir bağlayıcı URL'si oluşturun, ardından claude.ai'de Ayarlar → Bağlayıcılar bölümüne yapıştırın ya da Cursor'a uzak MCP sunucusu olarak ekleyin. Birkaç dakika sürer ve kod gerektirmez.",
    setupLink: "Adım adım kurulum kılavuzunu okuyun",
    faqHeading: "Sık sorulan sorular",
    faqs: [
      {
        q: "Bunun Claude'a PDF yapıştırmaktan farkı ne?",
        a: "PDF yapıştırmak, asistandan daha önce hiç görmediği, ayrıştırmak üzere tasarlanmadığı bir biçimdeki belgeyi şemasız ve sonucu kontrol etme imkânı olmadan okumasını istemektir. MCP bağlayıcısı ise belgeyi sizin tanımladığınız bir çıkarım Flow'undan geçirir; böylece her seferinde aynı adlandırılmış alanları, aynı tiplerde, aynı temizleme kuralları ve aynı inceleme adımı uygulanmış olarak alırsınız. Asistana bir yorum değil, yapılandırılmış veri ulaşır.",
      },
      {
        q: "Asistan Flow ve Cleaner kurabilir mi, yoksa yalnızca çalıştırabilir mi?",
        a: "İkisini de yapabilir. Bağlayıcı üzerinden asistan, çıkarım Flow'larını ve temizleme kurallarını sizin uygulamada yaptığınız gibi oluşturabilir: istediğiniz alanları, tabloları ve dönüşümleri sade bir dille tarif edersiniz, bunlar kuruluşunuzda oluşturulur ve gelecekteki her belgede çalışmaya hazır olur. Oluşturma yetkisi rolünüze bağlıdır — Owner ve Admin'ler kurabilir, Member ve Viewer'lar yalnızca çalıştırabilir ya da yalnızca okuyabilir.",
      },
      {
        q: "Hangi yapay zekâ asistanlarıyla çalışır?",
        a: "Pro veya üzeri plandaki claude.ai, Cursor ve uzak MCP sunucusu URL'si kabul eden her istemci. MCP açık bir protokoldür; bu nedenle destek belirli bir sağlayıcıyla sınırlı değildir.",
      },
      {
        q: "Kod yazmam gerekiyor mu?",
        a: "Hayır. Tavnit'te bir bağlayıcı URL'si oluşturur ve asistanınızın ayarlarına yapıştırırsınız. Çağırdığı Flow'u kurmak da kodsuzdur — istediğiniz alanları tarif edersiniz, Tavnit de onları çıkarır.",
      },
      {
        q: "Asistan şirket hesabımdaki her şeyi görebilir mi?",
        a: "Hayır. Bağlayıcı kendi API anahtarınızdan üretilir; bu yüzden yalnızca oturum açtığınız kuruluşa, rolünüzün yetkileriyle erişir. Bir Member, uygulamada kendisinin yapamayacağı bir şeyi asistana da yaptıramaz; özel Bucket'lar da size erişim verilmedikçe özel kalır.",
      },
      {
        q: "Bağlayıcıyı kullanmak ek ücretli mi?",
        a: "Hayır. Bağlayıcı üzerinden işlenen belgeler, uygulamadan yüklemek veya API'yi çağırmakla aynı şekilde, sayfa başına bir kredilik normal oranda kredi harcar. MCP erişimi için ayrı bir ücret yoktur.",
      },
      {
        q: "Bağlayıcı URL'sinin süresi dolunca ne olur?",
        a: "Bağlayıcı URL'leri süreli olarak geçerlidir; Tavnit sizinkinin ne zaman oluşturulduğunu ve ne zaman sona ereceğini gösterir. Yenileme yeni bir URL üretir ve öncekini anında geçersiz kılar; eski URL'yi tutan istemciler siz yeni değeri yapıştırana kadar çalışmaz.",
      },
    ],
    finalHeading: "Asistanınızı gerçek belgelere yönlendirin",
    finalBody:
      "Bir Flow kurun, bir bağlayıcı URL'si oluşturun ve sormaya başlayın. Başlangıç için ücretsiz krediler; kart gerekmez.",
    finalPricing: "Fiyatları görün",
    finalDemo: "Demo planlayın",
  },
};

export default tr;
