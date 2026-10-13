import type { HomeCopy } from "@/content/types";

/**
 * Home (components/LocalizedHome.tsx) — Türkçe (tr). Formal "siz";
 * product nouns stay English (Flow, Cleaner, Bucket), Turkish suffixes
 * attached with an apostrophe.
 */
const tr: HomeCopy = {
  title: "Tavnit — Belgelerinizdeki verileri yapay zekâyla çıkarın, inceleyin ve harekete geçin",
  description:
    "Faturaları, çeki listelerini, sözleşmeleri ve formları tedarikçiye özel şablonlar olmadan yapılandırılmış verilere dönüştürün. Hiçbir şey kaydedilmeden önce ekibiniz inceler ve onaylar. API, e-posta ve MCP.",
  schemaName: "Tavnit Türkçe",
  breadcrumbHome: "Ana sayfa",
  readInEnglish: "Read this page in English",
  eyebrow: "Yapay zekâ ile belge operasyonları",
  h1: "Belgelerinizdeki verileri yapay zekâyla çıkarın, ekibinizle inceleyin ve harekete geçin",
  lede:
    "Tavnit; faturaları, çeki listelerini, sözleşmeleri ve formları yapılandırılmış verilere dönüştürür — tedarikçiye özel şablon gerekmeden. Hiçbir şey kaydedilmeden önce ekibiniz inceler ve onaylar; onaylanan veriler sistemlerinize API, webhook veya e-posta ile ulaşır.",
  ctaDemo: "Demo planlayın",
  ctaTry: "Ücretsiz deneyin",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Sorun",
  problems: [
    "Her ay aynı alanlar, yüz farklı düzenden yeniden yazılıyor. Her tedarikçi faturasını farklı biçimlendiriyor ve ekibinizden biri bunu elle bir tabloya ya da sisteme aktarıyor.",
    "Şablon tabanlı OCR araçları, tedarikçi düzenini değiştirene kadar çalışır — sonra sessizce bozulur. “PDF'inizle sohbet edin” araçları ise rakam uydurur; ne inceleme adımı ne denetim izi ne de sistemlerinize bir çıkış yolu sunar.",
    "Yanlış bir toplam, doğrusuyla tıpatıp aynı görünür. Asıl maliyet veri girişine harcanan saatler değil; kimse fark etmeden muhasebe kayıtlarınıza ya da gümrük beyannamenize ulaşan hatadır.",
  ],
  stepsHeading: "Nasıl çalışır: çıkarın, inceleyin, harekete geçin",
  steps: [
    {
      title: "Çıkarın",
      body: "İhtiyaç duyduğunuz alanları bir kez tanımlarsınız — fatura numarası, tedarikçi, miktar ve fiyatıyla kalemler — Tavnit de bunları düzeni ne olursa olsun her PDF'ten, taramadan veya fotoğraftan çıkarır. Tedarikçiye özel şablon yok.",
    },
    {
      title: "İnceleyin",
      body: "Cleaner'lar verileri temizler ve doğrular: tarih biçimleri, para birimleri, kalem aritmetiği, ana verilerinize karşı eşlemeler. Tutmayan her şey durur ve adı belirlenmiş bir inceleyiciye gider. Her işlem, yalnızca ekleme yapılabilen bir denetim izine kaydedilir.",
    },
    {
      title: "Harekete geçin",
      body: "Onaylanan veriler API veya webhook ile ERP'nize ya da muhasebe sisteminize ulaşır, sorgulanabilir bir Bucket'ta saklanır, PDF formlarını doldurur ya da sizin adınıza bir web portalında çalışan bir Agent'ı besler.",
    },
  ],
  useCasesHeading: "Kullanım senaryoları",
  useCasesIntro:
    "Her sayfa, o belge türünde hangi alanların önemli olduğunu ve genellikle neyin ters gittiğini anlatır — bir belge türünü diğerinden zorlaştıran kısımları.",
  useCasesAll: "{count} kullanım senaryosunun tümünü görün",
  integrationsHeading: "Zaten kullandığınız araçlarla çalışır",
  integrations: [
    "E-posta: PDF'i bir Tavnit adresine iletin, verileri geri alın. Sıfır entegrasyon.",
    "REST API ve webhook'lar: belgeleri kendi sisteminizden gönderin, sonuçları işlem biter bitmez alın. Zapier, Make, n8n ve Power Automate için hazır tarifler.",
    "MCP bağlayıcısı: Tavnit'i claude.ai veya Cursor'a bağlayın, asistanınızdan belgeleri işlemesini ya da çıkarılan verilerinizi sorgulamasını isteyin.",
    "Bucket'lar: hiçbir şeyi dışa aktarmadan, doğal dilde sorgulayıp grafiğe dökebileceğiniz yerleşik yapılandırılmış depolama.",
  ],
  integrationsAll: "Tüm entegrasyonlar",
  faqHeading: "Sık sorulan sorular",
  faqs: [
    {
      q: "Her tedarikçi için şablon oluşturmam gerekiyor mu?",
      a: "Hayır. Alanları bir Flow'da bir kez tanımlarsınız, Tavnit de onları her düzende bulur. Bir tedarikçi faturasının biçimini değiştirirse sizin hiçbir şey yapmanız gerekmez.",
    },
    {
      q: "Yanlış bir değerin sistemime girmesini nasıl önlerim?",
      a: "İnsan incelemesiyle. Her belgede onay isteyebilir ya da yalnızca bir Cleaner kuralı bir şey yakaladığında onay isteyebilirsiniz — örneğin miktar çarpı birim fiyat kalem toplamını tutmadığında. İnceleyici belgeyi ve çıkarılan verileri görür, düzeltir veya onaylar; her işlem denetim izine kaydedilir.",
    },
    {
      q: "Belgeleri nasıl gönderirim?",
      a: "Nasıl isterseniz: PDF ekli e-postayı bir Tavnit adresine iletin, uygulamaya yükleyin ya da API ile gönderin. Sonuçlar webhook, API veya e-posta ile gider ya da sorgulayıp grafiğe dökebileceğiniz bir Bucket'ta saklanır.",
    },
    {
      q: "Benim dilimde çalışıyor mu?",
      a: "Evet. Tavnit her dilde yazılmış belgelerden veri çıkarır; verileri sisteminizin kullandığı alan adlarıyla geri alabilirsiniz. Uygulamanın kendisi de birçok dilde kullanılabilir.",
    },
    {
      q: "Ücreti ne kadar?",
      a: "Fiyatlandırma kredi esaslıdır: 1 kredi, işlenen 1 sayfadır. Bir demo planlayın; hacminize ve gerçek belgelerinize birlikte bakalım.",
    },
  ],
  finalHeading: "Kendi belgelerinizden biriyle deneyin",
  finalBody:
    "Gerçek bir fatura ya da çeki listesi getirin. Demoda ilk Flow'unuzu birlikte kuruyoruz ve verilerin canlı olarak çıktığını izliyorsunuz.",
};

export default tr;
