import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /tr/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "claude.ai'yi bağlayın". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit'i MCP bağlayıcısıyla claude.ai'ye bağlayın",
    description:
      "Entegrasyonlar sayfasında bir Tavnit bağlayıcı URL'si oluşturun ve bunu claude.ai'ye özel bağlayıcı olarak ekleyin; böylece asistanınız Tavnit verilerinizle çalışabilir.",
    steps: [
      {
        name: "Tavnit'te Entegrasyonlar'ı açın",
        text: "Tavnit uygulamasında oturum açın ve kenar çubuğundan Entegrasyonlar'ı açın. Asistanın verilerine erişmesini istediğiniz kuruluşta olduğunuzu kontrol edin.",
      },
      {
        name: "Bağlayıcı URL'sini oluşturun",
        text: "Özel Bağlayıcı kartında Bağlayıcı URL'si oluştur'u seçin. Tavnit, URL'yi API anahtarınızdan üretir ve ne zaman oluşturulduğunu ve ne zaman sona ereceğini gösterir.",
      },
      {
        name: "URL'yi kopyalayın",
        text: "Bağlayıcı URL'sini kopyalama düğmesiyle kopyalayın. Ona bir parola gibi davranın.",
      },
      {
        name: "claude.ai'de özel bağlayıcı olarak ekleyin",
        text: "claude.ai'de Settings, ardından Connectors, ardından Add custom connector'a gidin ve URL'yi yapıştırın. Özel bağlayıcılar için en az Claude Pro planı gerekir.",
      },
      {
        name: "Bağlantıyı doğrulayın",
        text: "Yeni bir sohbet başlatın ve asistana hangi Tavnit araçlarına sahip olduğunu sorun. Bunları listeliyorsa bağlayıcı etkindir.",
      },
    ],
  },
};

export default function McpConnectorTr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP Bağlayıcısı
      </h1>

      <DocCard icon={<Plug size={24} />} title="MCP bağlayıcısı ne yapar">
        <Lead>
          MCP bağlayıcısı, Tavnit kuruluşunuzu bir yapay zekâ asistanının içine araç olarak ekler.
          Bağlandıktan sonra asistana Tavnit verileriniz hakkında gündelik dille soru sorabilirsiniz;
          asistan tahmin yürütmek yerine canlı hesabınızdaki verilere dayanarak yanıt verir.
        </Lead>
        <p>
          MCP (Model Context Protocol), yapay zekâ asistanlarının harici araçları çağırmasını sağlayan
          açık standarttır. Tavnit, <InlineCode>mcp.tavnit.io</InlineCode> adresinde bir MCP sunucusu
          çalıştırır; bağlayıcı URL&apos;si ise bir istemciyi kuruluşunuza yönlendiren kimlik bilgisidir.{" "}
          <strong>claude.ai</strong> (Pro ve üzeri), <strong>Cursor</strong> ve uzak bir MCP sunucusu
          URL&apos;si kabul eden diğer tüm istemcilerle çalışır.
        </p>
        <p>
          Bağlayıcının ne işe yaradığını ve bir sohbete dosya yapıştırmaktan nasıl farklı olduğunu
          öğrenmek için{" "}
          <Link href={localizedPath("/integrations/mcp", "tr")} className="text-accent hover:underline">
            MCP bağlayıcısına genel bakış
          </Link>{" "}
          sayfasına bakın.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="İstek üzerine etkinleştirilir">
          Bağlayıcı kuruluş bazında açılır. Entegrasyonlar sayfasında Özel Bağlayıcı kartını
          görmüyorsanız, kuruluşunuz için etkinleştirilmesi amacıyla destek ekibiyle iletişime geçin.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Başlamadan önce">
        <Lead>
          Üç şeye ihtiyacınız var: bağlayıcının etkin olduğu bir kuruluş, API anahtarınız ve bir MCP
          istemcisi. Bağlayıcı kendi anahtarınızdan üretilir; bu nedenle yalnızca onu oluşturduğunuz
          sırada içinde bulunduğunuz kuruluşa erişir ve asistan bu anahtarla işlem yapar.
        </Lead>
        <DataTable
          head={["Gereksinim", "Nereden gelir"]}
          rows={[
            [
              "Özel Bağlayıcı kartı",
              <Fragment key="f0">
                <strong>Entegrasyonlar</strong> sayfasında, yalnızca bağlayıcı kuruluşunuz için
                etkinleştirilmişse bulunur. Eksikse destek ekibine başvurun.
              </Fragment>,
            ],
            [
              "API anahtarınız",
              <Fragment key="f1">
                Aynı sayfadaki <strong>API Anahtarı</strong> kartı: her kuruluşta üye başına bir
                anahtar. Kartta <em>API anahtarı bulunamadı. Lütfen yeniden giriş yapın.</em>{" "}
                yazıyorsa çıkış yapıp yeniden giriş yapın.
              </Fragment>,
            ],
            [
              "Bir MCP istemcisi",
              <Fragment key="f2">
                Pro veya üzeri bir plandaki claude.ai, Cursor ya da uzak bir MCP sunucusu URL&apos;si kabul
                eden herhangi bir istemci.
              </Fragment>,
            ],
            [
              "Rolünüz",
              <Fragment key="f3">
                Asistan API anahtarınızı kullanır; bu yüzden yalnızca anahtarınızın yapabildiklerini
                yapabilir. Örneğin <strong>Yalnızca HITL</strong> rolüne ait bir anahtar, işleme
                isteklerinde reddedilir. Bkz.{" "}
                <DocLink href="/docs/user-roles">kullanıcı rolleri</DocLink> ve{" "}
                <DocLink href="/docs/api-integration">API sayfası</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="claude.ai'yi bağlayın">
        <Lead>
          URL&apos;yi Tavnit&apos;te oluşturun, ardından claude.ai&apos;ye özel bağlayıcı olarak yapıştırın.
          Kurulacak bir şey ya da düzenlenecek bir yapılandırma dosyası yoktur.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Tavnit kenar çubuğunda <strong>Entegrasyonlar</strong>&apos;ı açın. Önce kuruluş seçiciyi
              kontrol edin: bağlayıcı, o anda içinde bulunduğunuz kuruluşa bağlıdır.
            </Fragment>,
            <Fragment key="f5">
              <strong>Özel Bağlayıcı</strong> kartında <strong>Bağlayıcı URL&apos;si oluştur</strong>&apos;u
              seçin.
            </Fragment>,
            <Fragment key="f6">URL&apos;yi kopyalama düğmesiyle kopyalayın.</Fragment>,
            <Fragment key="f7">
              claude.ai&apos;de <strong>Settings → Connectors → Add custom connector</strong> yolunu izleyin
              ve URL&apos;yi yapıştırın.
            </Fragment>,
            <Fragment key="f8">
              Yeni bir sohbet açın ve asistana hangi Tavnit araçlarına sahip olduğunu sorun. Bunları
              listeliyorsa bağlayıcı etkindir.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Cursor'ı veya başka bir MCP istemcisini bağlayın">
        <Lead>
          Uzak MCP sunucularını destekleyen her istemci aynı URL&apos;yi kabul eder. URL&apos;yi komut tabanlı
          değil, uzak (URL) sunucu olarak ekleyin: bağlayıcı barındırılan bir sunucuyu gösterdiği için
          çalıştırılacak yerel bir süreç yoktur.
        </Lead>
        <NumberedList
          items={[
            "Bağlayıcı URL'sini yukarıda anlatıldığı gibi Entegrasyonlar sayfasından oluşturup kopyalayın.",
            <Fragment key="f9">
              Cursor&apos;da MCP ayarlarını açın ve <strong>remote</strong> / URL türünde yeni bir sunucu
              ekleyin.
            </Fragment>,
            <Fragment key="f10">
              Bağlayıcı URL&apos;sini sunucu URL&apos;si olarak yapıştırın. Ayrı bir API anahtarı alanına gerek
              yoktur: URL kimlik bilgisini zaten içerir.
            </Fragment>,
            "İstemciyi yeniden yükleyin ve Tavnit'in araç listesinde göründüğünü kontrol edin.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Tek URL, birden fazla istemci">
          Aynı anda tek bir bağlayıcı URL&apos;niz olur ve bunu birden fazla istemciye yapıştırabilirsiniz.
          Hepsi aynı kuruluşta sizin adınıza işlem yapar; bu yüzden bir yenileme hepsinin bağlantısını
          aynı anda keser.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Asistanınız neler yapabilir">
        <Lead>
          Asistan, bağlayıcı aracılığıyla API anahtarınızı kullanarak kuruluşunuzun Tavnit verileriyle
          çalışır. Flow&apos;ların, Cleaner&apos;ların, Pipeline&apos;ların ve ekibinizin oluşturulması ve
          yapılandırılması uygulamada kalır.
        </Lead>
        <p>
          Bağlayıcının sunduğu araçları MCP istemciniz listeler; bunları görmenin en hızlı yolu
          asistana sormaktır. Gündelik dille sorun ve kastettiğiniz Flow&apos;u, Bucket&apos;ı veya Run&apos;ı
          uygulamada göründüğü adıyla belirtin.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Sizin verileriniz, sizin kuruluşunuz">
          Bağlayıcı yalnızca oluşturulduğu kuruluşa erişir. Başka bir kuruluşla çalışmak için
          Tavnit&apos;te o kuruluşa geçin ve orada bir URL oluşturun. Asistandan başlatılan işler, diğer
          tüm Run&apos;lar gibi kurulumunuzu izler: bir Flow{" "}
          <DocLink href="/docs/human-in-the-loop">insan incelemesi</DocLink> gerektiriyorsa Run yine
          bu incelemeyi bekler.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Süre sonu ve yenileme">
        <Lead>
          Bağlayıcı URL&apos;leri süreyle sınırlıdır. Özel Bağlayıcı kartı, URL&apos;nin ne zaman
          oluşturulduğunu ve ne kadar süresi kaldığını gösterir ve son 24 saatinde sizi uyarır.
          Yenileme yeni bir URL üretir ve eskisini hemen geçersiz kılar.
        </Lead>
        <DataTable
          head={["Durum", "Ne görürsünüz", "Ne yapmalısınız"]}
          rows={[
            [
              "Etkin",
              <Fragment key="s0">URL, oluşturulma zamanı ve sona ermesine kalan gün sayısı.</Fragment>,
              "Hiçbir şey.",
            ],
            [
              "Süresi yakında doluyor (24 saatten az)",
              <Fragment key="f16">
                Saat veya dakika cinsinden kalan süre ve sarı bir uyarı:{" "}
                <em>Bağlayıcının süresi yakında doluyor — kesinti yaşamamak için şimdi yenileyin.</em>
              </Fragment>,
              "Yenileyin, ardından yeni URL'yi onu kullanan her istemciye yapıştırın.",
            ],
            [
              "Süresi doldu",
              <Fragment key="f17">
                Kırmızı bir uyarı:{" "}
                <em>Bu bağlayıcının süresi doldu. Yeni bir URL oluşturmak için yenileyin.</em>
              </Fragment>,
              "Yenileyin ve yeniden yapıştırın. Eski URL'yi kullanan istemciler çalışmayı çoktan durdurmuştur.",
            ],
          ]}
        />
        <p>
          Yenilemek için <strong>URL&apos;yi Yenile</strong>&apos;yi seçin ve{" "}
          <em>Bağlayıcı URL&apos;si yenilensin mi?</em> iletişim kutusunda <strong>Yenile</strong> ile
          onaylayın.
        </p>
        <WarningBox>
          Yenileme, aşamalı olarak hazırlayabileceğiniz bir rotasyon değildir. Onayladığınız anda
          önceki URL çalışmayı durdurur ve onu kullanan her asistan, yenisini yapıştırana kadar hata
          verir. İstemcileri hemen güncelleyebileceğiniz bir zamanda yenileyin.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="URL'ye bir parola gibi davranın">
        <Lead>
          Bağlayıcı URL&apos;si bir kimlik bilgisidir. Ona sahip olan herkes, oturum açmadan kuruluşunuzun
          verilerine sizin adınıza erişebilir. Bir MCP istemcisinin ayarlarına yapıştırmak güvenlidir;
          bir destek talebinde, sohbet mesajında veya ekran görüntüsünde paylaşmak güvenli değildir.
        </Lead>
        <BulletList
          items={[
            "Onu bir depoya commit etmeyin ve paylaşılan bir belgeye yapıştırmayın.",
            "Paylaşmadan önce her ekran görüntüsünde bulanıklaştırın veya kırparak çıkarın.",
            "Sızarsa hemen yenileyin: bu, açığa çıkan URL'yi anında geçersiz kılar.",
            "API anahtarınızı yeniden oluşturmak aynı sayfadaki ayrı bir işlemdir; anahtarın kendisinin açığa çıktığını düşünüyorsanız bunu da yapın.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Sorun giderme">
        <Lead>
          Bağlayıcı sorunlarının çoğu dört nedenden birine dayanır: özellik etkin değildir, oturumun
          süresi dolmuştur, URL&apos;nin süresi dolmuştur ya da istemci, bir yenilemeyle değiştirilmiş bir
          URL&apos;yi kullanmaktadır.
        </Lead>
        <DataTable
          head={["Belirti", "Neden", "Çözüm"]}
          rows={[
            [
              "Entegrasyonlar'da Özel Bağlayıcı kartı yok",
              "Bağlayıcı kuruluşunuz için etkin değil.",
              "Açılması için destek ekibiyle iletişime geçin.",
            ],
            [
              <Fragment key="f18"><InlineCode>Özel bağlayıcılar geçerli bir Tavnit oturumu gerektirir. Çıkış yapıp yeniden giriş yapmayı deneyin.</InlineCode></Fragment>,
              "Tavnit, URL'yi üretmek veya okumak için anahtarınızı doğrulayamadı.",
              "Çıkış yapıp yeniden giriş yapın, ardından URL'yi tekrar oluşturun.",
            ],
            [
              "Asistan artık Tavnit'i görmüyor",
              "URL'nin süresi doldu veya biri onu yeniledi.",
              "Kartta süresi dolmuş ya da dolmak üzere olduğuna dair bir uyarı olup olmadığını kontrol edin, yenileyin ve URL'yi her istemciye yeniden yapıştırın.",
            ],
            [
              "Asistan yanlış verileri görüyor",
              "URL, siz başka bir kuruluştayken oluşturuldu.",
              "Tavnit'te kuruluş değiştirin, yeni bir URL oluşturun ve eskisinin yerine koyun.",
            ],
            [
              "Asistan bir işlemi gerçekleştiremiyor",
              "Rolünüz buna izin vermiyor.",
              "Bağlayıcıda bir arıza olduğunu varsaymadan önce rolünüzü kontrol edin.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="API yerine bağlayıcı ne zaman kullanılmalı">
        <Lead>
          Bağlayıcıyı sohbet tarzı, anlık işler için kullanın: tek seferlik sorular, depolanan
          verileri keşfetme, hızlı kontroller. Zamanlanmış, yüksek hacimli veya başka bir sisteme
          gömülü olan ve açık hata yönetimi ile yeniden denemeler gerektiren her şey için REST API&apos;yi
          kullanın.
        </Lead>
        <DataTable
          head={["Durum", "Kullanın"]}
          rows={[
            ["Bir iş arkadaşınız, bir tedarikçinin geçen çeyrekte ne faturaladığını soruyor", "MCP bağlayıcısı"],
            ["Verilerinizi bir sohbette keşfetmek istiyorsunuz", "MCP bağlayıcısı"],
            ["Bir tedarikçi portalındaki her fatura, her gece", "REST API veya bir e-posta tetikleyicisi"],
            ["Kendi ürününüzün çıkarılan verilere ihtiyacı var", "REST API ve webhook'lar"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API başvuru kılavuzu",
            description:
              "API anahtarıyla kimlik doğrulama, istek alanları, yanıtlar ve Python ile JavaScript örnekleriyle birlikte her uç nokta.",
          },
          {
            href: "/docs/buckets",
            label: "Çıkarılan verileri Bucket'larda saklayın",
            description: "Çıkarılan verilerinizin bulunduğu yapılandırılmış tablolar.",
          },
          {
            href: "/docs/user-roles",
            label: "Kullanıcı rolleri ve izinler",
            description: "Sahip, Yönetici, Üye ve Yalnızca HITL rollerinin her birinin neler yapabildiği.",
          },
        ]}
      />
    </section>
  );
}
