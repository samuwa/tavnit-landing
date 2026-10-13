import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Türkçe (tr). */
const tr: EnterpriseCopy = {
  title: "Kurumsal Hizmetler — Uygulama, Kontrol ve İş Danışmanlığı",
  description:
    "Tavnit Enterprise: sizin koşullarınızla sözleşme, uygulamalı kurulum, kullanıcı rolleri ve denetim izi, doğrudan destek ve belge dijitalleştirme ile veri girişi süreçlerini iyileştirmek için İş Danışmanlığı.",
  home: "Ana sayfa",
  breadcrumbLabel: "Sayfa yolu",
  crumb: "Kurumsal",
  eyebrow: "Tavnit Enterprise",
  h1: "Kurumsal hizmetler",
  lead:
    "Yüksek hacimde belge işleyen ya da kendine özgü koşullara ihtiyaç duyan kuruluşlar için: platformun üzerine bir sözleşme, Tavnit'i canlıya almak için uygulamalı destek ve etrafındaki süreç için danışmanlık.",
  servicesHeading: "Enterprise neleri kapsar",
  services: [
    {
      title: "Sizin koşullarınızla sözleşme",
      body: "Self servis bir plan yerine hacim, ticari koşullar ve ödeme; belgelerinize göre boyutlandırılmış bir sözleşmede karşılıklı olarak belirlenir.",
    },
    {
      title: "Uygulamalı kurulum",
      body: "Flow'ları, Cleaner'ları, inceleme kurallarını ve entegrasyonları (API, webhook'lar, e-posta) gerçek belgeleriniz üzerinde sizinle birlikte kurar ve canlı ortamda çalışır hâlde bırakırız.",
    },
    {
      title: "Kontrol ve denetim",
      body: "Yalnızca inceleme yetkisine sahip bir rol de dahil kullanıcı rolleri, koşullu insan incelemesi ve her görüntüleme, düzenleme ve onayın kaydedildiği, yalnızca ekleme yapılabilen bir denetim izi.",
      links: [
        { label: "Kullanıcı rolleri", href: "/docs/user-roles" },
        { label: "İnsan incelemesi", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Doğrudan destek",
      body: "Ürünü geliştiren ekiple İngilizce ve İspanyolca doğrudan iletişim hattı.",
    },
  ],
  advisory: {
    eyebrow: "İş Danışmanlığı",
    heading: "İş Danışmanlığı",
    subheading: "Belge dijitalleştirme ve veri girişi süreçlerinin iyileştirilmesi",
    intro:
      "Platformun yanı sıra, belgelerindeki bilgileri nasıl aldıklarını, dijitalleştirdiklerini ve kaydettiklerini düzene sokmak ve iyileştirmek isteyen şirketlere danışmanlık veriyoruz — sonuç Tavnit ile otomatikleştirilsin ya da otomatikleştirilmesin.",
    scopeHeading: "Neleri kapsar",
    scope: [
      { title: "Mevcut sürecin teşhisi", body: "Hangi belgeler, hangi kanallardan ve ne hacimde geliyor; bunları kim kaydediyor, ne kadar sürüyor ve hatalar nereden kaynaklanıyor." },
      { title: "Dijitalleştirme", body: "Tarama ve yakalama kriterleri, dosya düzeni ve adlandırma, karışık partilerin ayrılması ve asıl belgelerin izlenebilir tutulması." },
      { title: "Veri girişi", body: "Gerçekten hangi alanlara ihtiyaç var; tarihler, tutarlar ve para birimleri için standart biçimler, doğrulamalar ve ana verilere karşı kontroller." },
      { title: "Kontroller", body: "İnsan incelemesinin nerede gerektiği, görevler ayrılığı ve bir denetçinin ya da düzenleyici kurumun isteyeceği denetim izi." },
      { title: "Entegrasyon", body: "Verilerin ERP'nize, muhasebe sisteminize veya tablolarınıza nasıl ulaştığı; hangi adımların otomatikleştirilmeye değer olduğu, hangilerinin olmadığı." },
      { title: "Yaygınlaştırma ve eğitim", body: "Aşamalı bir uygulama planı ve verileri kaydeden, inceleyen ve kullanan kişiler için eğitim." },
    ],
    deliverablesHeading: "Teslimatlar",
    deliverables:
      "Mevcut sürecin yazılı teşhisi, kontrolleriyle birlikte önerilen sürecin tasarımı ve sonucu ölçmek için göstergeler içeren aşamalı bir uygulama planı — belge başına kayıt süresi, düzeltme oranı, inceleme bekleyen belgeler.",
  },
  ctaHeading: "Bizimle konuşun",
  ctaBody: "Belgelerinizi ve hacminizi anlatın; bu hizmetlerden hangisinin size uygun olduğunu söyleyelim.",
  ctaButton: "Toplantı planlayın",
  ctaEmail: "ya da şu adrese yazın:",
};

export default tr;
