import type { UseCase } from "@/lib/use-cases";

/**
 * Spanish use-case pages — the twins of src/lib/use-cases.ts.
 *
 * Same shape, same facts, Spanish copy and Spanish URLs. Each entry keeps the
 * English `slug` as the pairing key: that is what both sides of the hreflang
 * pair look each other up by, and what the sitemap and llms.txt use to say
 * "this page exists in two languages" rather than listing two unrelated URLs.
 *
 * `slugEs` is the Spanish URL segment under /es/casos-de-uso/. Customs is the
 * one exception: it shipped first at /es/aduanas, that URL is already
 * submitted to Search Console and linked from LinkedIn, so it keeps it via
 * `path` instead of moving to the shared prefix and needing a redirect.
 *
 * Copy is adapted, not translated: the reader is an operations or finance
 * lead in Panama or elsewhere in Latin America, and the register follows
 * .agents/product-marketing.md — "tú", concrete, product nouns in English
 * (Flow, Cleaner, Bucket, Matcher), no hype. Every product claim must exist
 * in the English entry; this file is not where features get invented.
 *
 * Ordering is deliberate and differs from English: customs first, then the
 * trade and procurement documents, because that is the Panama market. The
 * footer takes the first six.
 */
export type UseCaseEs = UseCase & {
  /** Spanish URL segment under /es/casos-de-uso/. */
  slugEs: string;
  /** Full path override, for pages that live outside the shared prefix. */
  path?: string;
};

/** Canonical path of a Spanish use-case page. */
export function esUseCasePath(uc: Pick<UseCaseEs, "slugEs" | "path">): string {
  return uc.path ?? `/es/casos-de-uso/${uc.slugEs}`;
}

export const USE_CASES_ES: UseCaseEs[] = [
  {
    slug: "customs-trade",
    slugEs: "aduanas",
    path: "/es/aduanas",
    label: "Aduanas y comercio exterior",
    badge: "Logística y comercio exterior · Panamá",
    h1: "Automatización aduanera con clasificación arancelaria para Panamá",
    title: "Automatización aduanera con clasificación arancelaria para Panamá",
    description:
      "Extrae facturas comerciales, listas de empaque y BL, y clasifica la mercancía en el Arancel Nacional de Panamá (VII Enmienda, SA 2022) con DAI, ITBMS e ISC — con revisión del corredor antes de declarar.",
    summary:
      "Factura comercial, lista de empaque y BL extraídos, con clasificación arancelaria de Panamá integrada en el proceso.",
    lede: "Tavnit lee la documentación del embarque — factura comercial, lista de empaque, conocimiento de embarque, certificado de origen — y devuelve embarcador, consignatario, descripciones, pesos y valores como campos tipificados. Un Cleaner clasifica cada línea de mercancía en el Arancel Nacional de Panamá (VII Enmienda, SA 2022) durante el mismo procesamiento, con DAI, ITBMS e ISC y el razonamiento de la clasificación, para que el corredor revise en lugar de investigar.",
    problem: [
      "Un solo embarque genera una pila de documentos que repiten los mismos datos en formatos distintos — factura comercial, lista de empaque, conocimiento de embarque, certificado de origen — y la declaración exige que estén conciliados y correctos. El trabajo es transcripción más clasificación, contra reloj, donde un error es un embarque retenido o una multa.",
      "La clasificación es la parte especializada. Decidir la fracción arancelaria a partir de una descripción es un juicio técnico que la mayoría de las herramientas de extracción ni siquiera intenta: se queda como paso manual después de que la automatización termina. Y la descripción en la factura del proveedor suele ser el insumo más débil de todo el proceso.",
    ],
    fields: [
      { name: "Embarcador y consignatario", note: "Nombre legal completo y dirección; son los que van a la declaración." },
      { name: "Descripción de la mercancía por línea", note: "El texto del que se deriva la clasificación. Conviene extraerlo textual, sin resumir." },
      { name: "Fracción arancelaria", note: "Clasificada por un Cleaner durante el procesamiento, contra el Arancel Nacional vigente, no buscada a mano después." },
      { name: "DAI, ITBMS e ISC aplicables", note: "Vienen con la línea arancelaria nacional. Una clasificación a seis dígitos no está terminada: falta la línea que determina lo que se paga." },
      { name: "Cantidad, peso neto y bruto", note: "Los pesos están en la lista de empaque y los valores en la factura; hay que conciliar ambos." },
      { name: "País de origen", note: "Determina la tasa y el trato preferencial. Con frecuencia es por línea, no por embarque." },
      { name: "Incoterm y valor declarado", note: "Define qué es gravable y quién responde por qué." },
      { name: "Número de contenedor y de BL", note: "Las llaves que permiten volver a unir todo el juego de documentos con un solo embarque." },
    ],
    gotchas: [
      {
        title: "La clasificación es lo difícil, y aquí está integrada",
        body: "Tavnit incluye un Cleaner de clasificación arancelaria construido sobre el Arancel Nacional de Importación de Panamá — VII Enmienda, Sistema Armonizado 2022 — con sus 9,671 líneas arancelarias nacionales y las tasas de DAI, ITBMS e ISC de cada una. Aplica las notas legales de sección y capítulo y las Reglas Generales de Interpretación, y devuelve la fracción con su razonamiento, no una adivinanza a seis dígitos.",
      },
      {
        title: "Un embarque, varios documentos, una sola verdad",
        body: "La factura comercial trae los valores, la lista de empaque los pesos, el BL el contenedor. Una Collection identifica cada tipo de documento y lo envía a su propio Flow; un Bucket compartido, con el número de embarque como llave, vuelve a unirlos en un solo registro.",
      },
      {
        title: "Aquí los errores son multas, no correcciones",
        body: "Una fracción o un valor mal declarado es un problema aduanero, no contable. Es un caso donde la revisión en cada declaración está justificada: el corredor ve la clasificación propuesta con su razonamiento, la confirma o la corrige, y la bitácora de auditoría inalterable registra quién aprobó qué. Cuando la aduana pregunta por una fracción dos años después, ese razonamiento es la defensa.",
      },
      {
        title: "El código del proveedor no es tu código",
        body: "El proveedor clasificó bajo el arancel de su país, quizás para control de exportaciones y quizás con una enmienda anterior. Sirve como pista, no como respuesta. La responsabilidad de la fracción en la declaración de importación es del importador y del corredor.",
      },
    ],
    pipeline: [
      { label: "Correo electrónico", href: "/docs/email-integration", why: "El juego de documentos llega por correo, como siempre. Lo reenvías a una dirección de Tavnit y el proceso arranca solo." },
      { label: "Splitters", href: "/docs/splitters", why: "La documentación del embarque suele venir en un solo PDF combinado. El Splitter la separa antes de extraer." },
      { label: "Collections", href: "/docs/collections", why: "Identifica factura, lista de empaque y BL y envía cada uno al Flow correcto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Clasifica la mercancía en el Arancel Nacional, convierte monedas y estandariza pesos y unidades." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "El corredor revisa cada clasificación antes de declarar, con registro de quién aprobó qué." },
      { label: "Llenado de formularios", href: "/es/casos-de-uso/llenado-de-formularios", why: "Los datos extraídos y aprobados pre-llenan el formulario de declaración en lugar de re-tipearse." },
    ],
    faqs: [
      {
        q: "¿Realmente asigna la fracción arancelaria?",
        a: "Sí. Un Cleaner de clasificación arancelaria clasifica cada línea de mercancía a partir de la descripción extraída, durante el mismo procesamiento, contra el Arancel Nacional de Panamá vigente (VII Enmienda, SA 2022). Devuelve la línea arancelaria nacional con DAI, ITBMS e ISC y el razonamiento — qué regla y qué nota legal decidieron el caso. La declaración sigue siendo responsabilidad del corredor, por eso recomendamos revisión antes de presentar.",
      },
      {
        q: "¿Qué pasa cuando la descripción en la factura es vaga?",
        a: "Es el caso más común de error en clasificación. El Cleaner usa toda la información disponible en la factura y la lista de empaque — material, función, composición, marca y modelo — y cuando la confianza es baja, marca la línea para que el corredor la resuelva en lugar de adivinar.",
      },
      {
        q: "¿Procesa el juego completo de documentos del embarque?",
        a: "Sí. Una Collection envía factura comercial, lista de empaque y conocimiento de embarque a su propio Flow, y los resultados se reúnen en un solo registro usando el número de embarque como llave.",
      },
      {
        q: "¿Y si los documentos llegan en un solo PDF?",
        a: "Un Splitter separa el archivo combinado en sus documentos individuales antes de la extracción, para que cada uno pase por el Flow diseñado para él.",
      },
      {
        q: "¿Funciona para otros países además de Panamá?",
        a: "La extracción de documentos de embarque funciona para cualquier país. El clasificador arancelario está construido sobre el Arancel Nacional de Panamá; para otras jurisdicciones, la clasificación a seis dígitos del Sistema Armonizado es común y la extensión nacional se puede configurar. Cuéntanos tu caso en la demostración.",
      },
      {
        q: "¿Cómo trabajan los corredores de aduana con Tavnit?",
        a: "Normalmente reenvían el correo del cliente con la documentación a una dirección de Tavnit. Minutos después tienen el juego de documentos extraído, cada línea clasificada con su razonamiento, y una cola de revisión con solo lo que requiere criterio. Lo aprobado pre-llena la declaración o sale por API hacia su sistema.",
      },
    ],
  },
  {
    slug: "invoice-processing",
    slugEs: "facturas-de-proveedores",
    label: "Facturas de proveedores",
    badge: "Finanzas y cuentas por pagar",
    h1: "Extracción automática de datos de facturas",
    title: "Extracción de datos de facturas con líneas de detalle",
    description:
      "Extrae proveedor, número de factura, fechas, totales y líneas de detalle de facturas en cualquier formato, con revisión antes de que lleguen a tu contabilidad.",
    summary:
      "Proveedor, número, fechas, totales y líneas de detalle de cualquier formato — con revisión antes de llegar a tu contabilidad.",
    lede: "Tavnit lee facturas de proveedores en cualquier formato y devuelve proveedor, número de factura, fechas, impuesto, totales y cada línea de detalle como campos tipificados. Sin plantillas por proveedor. Nada se registra en tu contabilidad hasta que un revisor lo aprueba, y cada aprobación queda registrada.",
    problem: [
      "Cuentas por pagar es la versión clásica de este problema: los mismos ocho campos, re-tipeados desde cien formatos distintos, cada mes. Cada proveedor diseña su factura a su manera, algunos mandan escaneos, otros mandan fotos de escaneos, y los que cambian de formato lo hacen sin avisar.",
      "Las herramientas basadas en plantillas resuelven mal la primera parte: configuras un formato por proveedor, y cada proveedor nuevo es una tarea de configuración. En cuanto un proveedor rediseña su factura, la plantilla se rompe en silencio y los errores fluyen río abajo hasta tu contabilidad.",
    ],
    fields: [
      { name: "Nombre y dirección del proveedor", note: "Con frecuencia difiere del nombre comercial que tienes registrado — un Cleaner de búsqueda puede emparejarlo con tu lista de proveedores." },
      { name: "Número de factura", note: "Se tipifica como texto, no como número. Los ceros a la izquierda y los prefijos importan, y un parseo numérico los destruye." },
      { name: "Fecha de emisión y de vencimiento", note: "Los formatos varían por país. Un Cleaner de fecha normaliza DD/MM y MM/DD a un solo formato de salida." },
      { name: "Líneas de detalle", note: "Una tabla repetitiva: descripción, cantidad, precio unitario, importe. La parte que la mayoría de las herramientas omite o aplana." },
      { name: "Subtotal, impuesto, descuento y total", note: "Vale la pena extraer los cuatro para poder verificar la aritmética en vez de confiar en ella." },
      { name: "Moneda", note: "Un Cleaner de moneda puede convertirla a tu moneda de reporte en el mismo paso." },
      { name: "Número de orden de compra (OC)", note: "Cuando está presente, es lo que permite emparejar la factura con la orden de compra automáticamente." },
    ],
    gotchas: [
      {
        title: "Las líneas de detalle son donde la extracción suele fallar",
        body: "Los campos de encabezado son fáciles. Una tabla que cruza un salto de página, tiene celdas combinadas o parte las descripciones en dos renglones es donde la mayoría de las herramientas devuelve algo plausible y equivocado. Los campos de tabla de un Flow tratan las filas repetidas como filas, así que una factura de cinco líneas devuelve cinco registros y no un bloque de texto.",
      },
      {
        title: "Un total equivocado se ve exactamente igual que uno correcto",
        body: "No hay diferencia visual entre un $1,240.00 bien leído y un $1,240.00 mal leído que en realidad era $1,249.00. Ese es el argumento a favor de la revisión condicional: una regla en un Cleaner puede comprobar que las líneas sumen el subtotal y enviar a revisión humana solo las que fallan, para que no tengas que revisar todo con tal de atrapar las pocas que importan.",
      },
      {
        title: "Varias facturas llegan en un solo PDF",
        body: "Un estado de cuenta del proveedor o un lote escaneado suele contener varias facturas en un mismo archivo. Un Splitter las separa primero, para que cada una sea su propio Run con su propio registro extraído, en lugar de una mezcla imposible de conciliar.",
      },
    ],
    pipeline: [
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Los proveedores ya mandan las facturas por correo. Reenvía automáticamente la bandeja de cuentas por pagar y cada adjunto se procesa sin que nadie abra la aplicación." },
      { label: "Splitters", href: "/docs/splitters", why: "Separa los escaneos en lote o engrapados en facturas individuales antes de la extracción." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza fechas, convierte monedas, empareja proveedores contra tu lista y marca la aritmética que no cuadra." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Retiene la ejecución hasta que alguien la apruebe — cada factura, o solo las que una regla marcó — con un registro de solo anexar de quién aprobó qué." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Envía el registro aprobado directo a tu sistema contable en el momento en que pasa la revisión." },
    ],
    faqs: [
      { q: "¿Procesa facturas escaneadas o fotografiadas?", a: "Sí. Escaneos, fotos y PDFs de imagen pasan por OCR antes de la extracción. La calidad sigue importando — un escaneo nítido se extrae con más confiabilidad que una foto de celular en ángulo — y por eso existe la revisión para los casos marginales." },
      { q: "¿Tengo que configurar una plantilla por proveedor?", a: "No. Defines una sola vez los campos que quieres, y el mismo Flow lee facturas de cualquier proveedor en cualquier formato. Agregar un proveedor nuevo no requiere configuración." },
      { q: "¿Extrae las líneas de detalle, no solo los totales?", a: "Sí. Las líneas se definen como campos de tabla, así que una tabla repetitiva devuelve un registro por fila con descripción, cantidad, precio unitario e importe tipificados por separado." },
      { q: "¿Cómo maneja distintas monedas?", a: "La moneda se extrae como un campo propio, y un Cleaner puede convertir los importes a tu moneda de reporte durante el procesamiento, para que los sistemas posteriores reciban una sola unidad consistente." },
    ],
  },
  {
    slug: "purchase-orders",
    slugEs: "ordenes-de-compra",
    label: "Órdenes de compra",
    badge: "Compras y cuentas por pagar",
    h1: "Software de PO matching: conciliación de órdenes de compra con facturas",
    title: "Conciliación de órdenes de compra con facturas (PO matching)",
    description:
      "Software de PO matching: extrae órdenes de compra y facturas en los mismos campos, empareja las líneas automáticamente y envía a revisión solo las diferencias.",
    summary:
      "Órdenes de compra y facturas extraídas en una misma estructura, emparejadas línea por línea, con solo las diferencias enviadas a un revisor.",
    lede: "Tavnit lee órdenes de compra y facturas, extrae número de OC, proveedor, SKU, cantidades y precios como campos tipados, y empareja cada línea de la factura con su línea de la OC aunque el proveedor lo describa distinto. El encabezado se concilia por número de OC; las líneas, en un Matcher; lo que no coincide se detiene ante un revisor.",
    problem: [
      "La conciliación de órdenes de compra es la verificación de que lo facturado es lo que se pidió. En la mayoría de los equipos todavía se hace a ojo: alguien de cuentas por pagar abre el PDF de la factura, busca la orden de compra (OC) y compara cantidades y precios línea por línea. Es lento, y es justo donde se cuelan los dos errores caros — una cantidad equivocada y un precio unitario equivocado — porque se ven exactamente igual que los correctos.",
      "Las herramientas de conciliación automática de los ERP asumen que ambos documentos ya están estructurados. No lo están. La OC salió de tu sistema, pero la factura salió del sistema del proveedor, como PDF, con sus códigos de artículo y su propio diseño. Llevarla a una forma comparable es la mitad del problema que sigue sin resolverse, y es la mitad que hace Tavnit.",
    ],
    fields: [
      { name: "Número de OC", note: "La llave con la que se une todo. Extráelo como texto: los prefijos y los ceros a la izquierda importan, y cada proveedor lo coloca en un lugar distinto de la factura." },
      { name: "Proveedor y comprador", note: "El nombre que el proveedor escribe en su factura rara vez coincide al pie de la letra con tu registro de proveedores. Un Cleaner de búsqueda lo resuelve a tu ID de proveedor." },
      { name: "Líneas: descripción, SKU, cantidad", note: "Una tabla repetida en ambos documentos. Los códigos del proveedor casi nunca son los tuyos y las descripciones cambian de redacción — eso es lo que hace difícil emparejar líneas." },
      { name: "Precio unitario e importe de la línea", note: "Los dos, para verificar que precio unitario × cantidad cuadra en la propia factura antes de compararla con la OC." },
      { name: "Totales de la factura y de la OC", note: "La conciliación a nivel de encabezado. Un total que coincide mientras una línea no coincide es un intercambio de cantidad por precio — el caso que una verificación de solo totales deja pasar." },
      { name: "Fecha de entrega y referencia de la nota de entrega", note: "El tercer documento en una conciliación de tres vías. Las notas de entrega se extraen de la misma forma; mira la página de notas de entrega." },
      { name: "Condiciones de pago y moneda", note: "Campos cortos con consecuencias desproporcionadas cuando la factura no coincide con la OC." },
    ],
    gotchas: [
      {
        title: "De dos vías o de tres: la conciliación solo funciona si las estructuras coinciden",
        body: "Una conciliación de dos vías compara la factura con la OC; una de tres vías suma la nota de recepción. Las dos se caen cuando los documentos se extraen con nombres de campo distintos. Pasar OC, facturas y notas de entrega por Flows que comparten el mismo esquema de campos — número de OC, SKU, cantidad, precio unitario — es lo que convierte la conciliación en una comparación, en lugar de una lectura de documentos.",
      },
      {
        title: "Los códigos del proveedor no son tus códigos",
        body: "La OC lista tu SKU; la factura lista el del proveedor. Un Cleaner de búsqueda mapea los códigos del proveedor a tus SKU contra tus datos de referencia durante el procesamiento, así la factura llega ya traducida. Donde no existe referencia, un Matcher empareja las líneas por el significado de la descripción — semántico, no exacto — con un desempate por LLM para los pares dudosos.",
      },
      {
        title: "Conciliación por línea, no solo por totales",
        body: "Define el Run de la OC como base (modo benchmark) y el Run de la factura como el que se compara contra ella. El Matcher empareja cada línea de la factura con una línea de la OC y pone cantidad y precio unitario lado a lado; las líneas sin pareja se listan como advertencias en lugar de desaparecer en silencio. Una verificación de solo totales aprobaría una factura que cobra el importe correcto por los artículos equivocados.",
      },
      {
        title: "Solo las excepciones deberían llegar a una persona",
        body: "Revisar cada factura reproduce el proceso manual. Un Cleaner de fórmula verifica que precio unitario × cantidad sea igual al importe de la línea en la propia factura, y una condición marca las líneas fuera de la tolerancia que tú definas. La revisión humana se activa solo para los Runs marcados, así el revisor ve las tres facturas que no cuadran, no las trescientas que sí.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Los proveedores envían OC, facturas y notas de entrega a una sola dirección. Collections clasifica cada documento y lo envía al Flow correcto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Mapea códigos de artículo y nombres de proveedor a tus datos maestros por búsqueda, verifica la aritmética de cada línea y marca los valores fuera de tolerancia." },
      { label: "Buckets", href: "/docs/buckets", why: "Guarda OC y facturas en la misma estructura, así la conciliación a nivel de encabezado es una consulta por número de OC." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Solo las facturas marcadas se detienen para un revisor con nombre, con una bitácora de auditoría de solo anexar que registra quién aprobó qué." },
      { label: "API", href: "/docs/api-integration", why: "Envía las facturas conciliadas y aprobadas a tu ERP o sistema de cuentas por pagar sin un paso manual." },
    ],
    faqs: [
      { q: "¿Qué es el PO matching o conciliación de órdenes de compra?", a: "Es la verificación de que una factura coincide con la orden de compra que factura: mismo proveedor, mismos artículos, mismas cantidades y precios. Una conciliación de dos vías compara la factura con la OC; una de tres vías revisa además la nota de recepción. Es el control que evita pagarle a un proveedor por algo que no se pidió o no se entregó." },
      { q: "¿Tavnit puede conciliar facturas con órdenes de compra automáticamente?", a: "Sí. Extrae ambos documentos en la misma estructura de campos y la conciliación a nivel de encabezado se vuelve una consulta por número de OC en tu Bucket. Para la conciliación por línea, un Matcher en modo benchmark toma la OC como base y empareja cada línea de la factura con ella, mostrando cantidad y precio unitario lado a lado. Las líneas que no encuentran pareja se listan como advertencias." },
      { q: "¿Y si el proveedor usa sus propios códigos o descripciones?", a: "Un Cleaner de búsqueda mapea los códigos del proveedor a tus SKU durante el procesamiento cuando tienes datos de referencia. Cuando no los tienes, el Matcher empareja las líneas por el significado de la descripción y no por el texto exacto, con un desempate por LLM para los pares dudosos, así “Widget azul paq. 10” y “WIDGET-AZL x10” caen en la misma fila." },
      { q: "¿Qué pasa cuando una factura no coincide con la OC?", a: "Se detiene. Un Cleaner de condición marca el Run y la revisión humana lo envía a un revisor con nombre, que ve la factura, los valores extraídos y la diferencia. Las facturas que sí coinciden pasan directo a tu ERP por API o webhook. Cada vista, edición y aprobación queda escrita en una bitácora de auditoría de solo anexar." },
      { q: "¿Hace conciliación de tres vías con notas de entrega?", a: "Las notas de entrega y las notas de recepción se extraen igual que las OC y las facturas — incluidas las cantidades escritas a mano en pruebas de entrega firmadas — en la misma estructura de campos, así que la tercera pata de la conciliación es un tercer Run comparado contra la OC." },
      { q: "¿Tenemos que cambiar nuestro ERP?", a: "No. Tavnit se coloca delante de él: los documentos llegan por correo o API, se extraen y concilian, y los resultados aprobados se entregan a tu ERP o sistema de cuentas por pagar por API REST o webhook. Hay recetas para Zapier, Make y n8n para equipos que prefieren no escribir código." },
      { q: "¿Las líneas de detalle salen por separado?", a: "Sí. Las líneas son campos de tabla, así que cada fila devuelve SKU, descripción, cantidad, precio unitario e importe como valores tipados separados — que es lo que hace posible la comparación por línea." },
    ],
  },
  {
    slug: "supplier-quotes",
    slugEs: "cotizaciones-de-proveedores",
    label: "Cotizaciones de proveedores",
    badge: "Compras y abastecimiento",
    h1: "Comparación de cotizaciones de proveedores",
    title: "Comparar cotizaciones de proveedores automáticamente",
    description:
      "Extrae las líneas de cotizaciones de distintos proveedores y compáralas automáticamente: empareja artículos equivalentes y nombra el mejor precio por línea.",
    summary: "Cotizaciones de varios proveedores extraídas y comparadas línea por línea, con el mejor precio señalado por artículo.",
    lede: "Tavnit extrae las líneas de cotizaciones de proveedores que compiten entre sí; después, los Matchers emparejan los artículos equivalentes entre proveedores y nombran un campeón por línea según el precio. Obtienes una tabla comparativa en lugar de tres PDF y una hoja de cálculo armada a mano.",
    problem: [
      "Comparar cotizaciones es la parte de compras que nunca se vuelve más fácil. Tres proveedores mandan tres diseños, describen el mismo artículo de tres formas distintas y cotizan presentaciones diferentes. Alguien arma una hoja de cálculo, re-tipea todo y espera haber emparejado las filas correctas.",
      "El emparejamiento es la dificultad real. “Perno hexagonal M8 50mm”, “Perno, hex., M8x50” y “PERNO HEX M8 50MM zincado” son el mismo artículo, y ninguna búsqueda por coincidencia exacta los va a emparejar jamás.",
    ],
    fields: [
      { name: "Identidad del proveedor", note: "El campo que nombra a cada participante de la comparación. Una cotización, un proveedor." },
      { name: "Descripción del artículo", note: "El texto que se empareja entre proveedores. Extráelo textual — normalizarlo demasiado pronto destruye la señal que el emparejamiento necesita." },
      { name: "Precio unitario", note: "El campo numérico sobre el que se decide el campeón. Las entradas no numéricas como “precio a consultar” se excluyen y se reportan, en lugar de ignorarse en silencio." },
      { name: "Cantidad y unidad de medida", note: "Se usan como contexto del emparejamiento, para que un paquete de 12 no quede emparejado con una unidad suelta." },
      { name: "Tiempo de entrega", note: "Muchas veces es lo que decide cuando los precios están cerca, y casi nunca se captura en una comparación manual." },
      { name: "Vigencia y condiciones de pago", note: "Una cotización más barata con peores condiciones no siempre es más barata." },
    ],
    gotchas: [
      {
        title: "El mismo artículo nunca se describe igual dos veces",
        body: "Por eso falla el emparejamiento exacto y por eso la comparación sigue siendo manual casi en todas partes. Los Matchers emparejan las filas por significado y no por igualdad de texto, con un desempate por LLM para los pares ambiguos, así que descripciones distintas del mismo artículo igual quedan alineadas.",
      },
      {
        title: "La presentación rompe la comparación sin que nadie lo note",
        body: "Una cotización por caja de 12 contra una cotización por unidad no es una diferencia de precio, es un error de unidad — y es el error que sobrevive a la revisión porque los dos números se ven razonables. Los campos de contexto te permiten incluir cantidad y unidad de medida en el emparejamiento, así los artículos distintos quedan sin pareja en lugar de producir un ganador equivocado.",
      },
      {
        title: "No todas las líneas tienen un precio comparable",
        body: "Las cotizaciones traen “precio a consultar”, “incluido” y celdas vacías. En lugar de descartar esas filas en silencio, la comparación las excluye del campeonato y registra una advertencia en la fila, así ves qué no se comparó en lugar de asumir que todo lo fue.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Un solo Flow lee el diseño de cotización de cada proveedor en la misma estructura de campos — la condición previa para poder compararlas." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Convierte monedas para que cotizaciones en distintas divisas se comparen sobre la misma base." },
      { label: "Buckets", href: "/docs/buckets", why: "Conserva las cotizaciones en el tiempo, así el precio de hoy se puede contrastar con lo que el mismo proveedor cotizó el trimestre pasado." },
    ],
    faqs: [
      { q: "¿Cómo empareja artículos que cada proveedor describe de forma distinta?", a: "El emparejamiento es semántico y no exacto: las descripciones se comparan por significado, con un desempate por LLM que resuelve los pares ambiguos. “Perno hexagonal M8 50mm” y “Perno, hex., M8x50” quedan emparejados sin que tengas que mantener una lista de sinónimos." },
      { q: "¿Puedo comparar contra un solo proveedor en lugar de contra todos?", a: "Sí. El modo benchmark toma una cotización como base y compara todas las demás contra ella, que es la forma correcta cuando tienes un proveedor actual y estás sondeando el mercado." },
      { q: "¿Qué pasa con las líneas que no se pueden comparar?", a: "Las filas con precios no numéricos se excluyen del campeonato y quedan registradas como advertencias en esa fila, así los vacíos de la comparación son visibles en lugar de quedar ocultos." },
    ],
  },
  {
    slug: "delivery-notes",
    slugEs: "notas-de-entrega",
    label: "Notas de entrega",
    badge: "Logística y almacén",
    h1: "Captura de notas de entrega y pruebas de entrega",
    title: "Extracción de notas de entrega y control de recepción",
    description:
      "Captura lo que realmente se entregó desde notas de entrega firmadas y pruebas de entrega, incluidas las anotaciones a mano, y compáralo con lo ordenado.",
    summary: "Lo que realmente se entregó, capturado de notas firmadas y pruebas de entrega — escritura a mano incluida.",
    lede: "Tavnit lee notas de entrega y pruebas de entrega (POD), incluidas las anotaciones a mano que agregan conductores y receptores, y devuelve las cantidades entregadas como filas estructuradas. Como las órdenes de compra se extraen con la misma estructura, comparar lo entregado contra lo ordenado se convierte en una consulta.",
    problem: [
      "La nota de entrega es el único registro de lo que físicamente llegó, y suele ser el documento de peor calidad de toda la cadena: fotografiado en un patio, firmado encima del texto impreso, anotado a mano donde las cantidades no coincidieron.",
      "También es el documento que más pesa en una disputa. Si la factura dice doce y la nota dice diez, la nota es la evidencia — siempre que alguien haya capturado lo que decía.",
    ],
    fields: [
      { name: "Número de nota de entrega y de orden de compra (OC)", note: "Las llaves que vinculan la entrega con lo que se ordenó." },
      { name: "Cantidad entregada por línea", note: "El número que realmente importa, y el que con más frecuencia se corrige a mano." },
      { name: "Correcciones a mano", note: "Las cantidades tachadas y las notas al margen traen la cifra real. Ignorarlas es capturar la equivocada." },
      { name: "Nombre del receptor y presencia de firma", note: "Que haya una firma es, con frecuencia, la prueba de aceptación." },
      { name: "Fecha y hora de entrega", note: "Alimenta la medición de SLA y los plazos en una disputa." },
      { name: "Notas de condición o daños", note: "Texto libre, casi siempre a mano, y la base de cualquier reclamo." },
    ],
    gotchas: [
      {
        title: "La parte importante es la escritura a mano",
        body: "Una nota de entrega impresa dice lo que debía llegar. La corrección a mano dice lo que llegó. La extracción lee escritura a mano además de texto impreso, y esa es la diferencia entre capturar el envío como se planeó y capturarlo como se entregó.",
      },
      {
        title: "Fotografiado en un patio, no escaneado en una oficina",
        body: "Las pruebas de entrega llegan como fotos de celular en ángulo, con mala luz, a veces con un pulgar en el encuadre. La extracción resuelve la mayoría, pero es un tipo de documento donde vale la pena enrutar los resultados de baja confianza a una persona en lugar de confiar en cada captura.",
      },
      {
        title: "El valor está en la comparación, no en la captura",
        body: "Una cantidad entregada por sí sola dice poco. Extraer las notas de entrega con la misma estructura de campos que tus órdenes de compra convierte la conciliación de tres vías en una consulta por número de OC, en lugar de tres documentos puestos a contraluz.",
      },
    ],
    pipeline: [
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Conductores y transportistas envían las pruebas de entrega fotografiadas por correo; reenviarlas procesa cada una al llegar." },
      { label: "Flows", href: "/docs/flows", why: "Las líneas entregadas son campos de tabla, con la misma estructura que se usa para las órdenes de compra." },
      { label: "Buckets", href: "/docs/buckets", why: "Guarda entregas y órdenes en un mismo lugar, así las diferencias aparecen como una consulta en lugar de una auditoría." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Revisa las capturas deficientes y las cantidades corregidas, donde el costo de equivocarse es una disputa." },
    ],
    faqs: [
      { q: "¿Puede leer correcciones escritas a mano?", a: "Sí. La escritura a mano se extrae junto con el texto impreso, y aquí eso importa porque la cantidad escrita a mano suele ser la correcta." },
      { q: "¿Funciona con fotos tomadas con un celular?", a: "Por lo general, sí. Fotos, ángulos y mala iluminación son la norma en las pruebas de entrega. Conviene activar la revisión condicional para que las capturas dudosas lleguen a una persona en lugar de pasar en silencio." },
      { q: "¿Se pueden comparar las entregas contra las órdenes de compra?", a: "Extrae ambas con la misma estructura de campos y la comparación es una consulta por número de OC en tu Bucket, en lugar de un cotejo manual documento por documento." },
    ],
  },
  {
    slug: "form-filling",
    slugEs: "llenado-de-formularios",
    label: "Llenado de formularios",
    badge: "Operaciones y comercio exterior",
    h1: "Llenado automático de formularios PDF",
    title: "Llenar formularios PDF con datos extraídos de documentos",
    description:
      "Llena formularios PDF oficiales automáticamente con datos extraídos de varios documentos fuente, con aprobación de una persona antes de emitir el PDF.",
    summary: "Formularios PDF oficiales llenados automáticamente con datos repartidos en varios documentos fuente.",
    lede: "Tavnit llena formularios PDF rellenables con datos extraídos de varios documentos fuente a la vez. Una declaración puede completarse a partir de una factura, una lista de empaque y un conocimiento de embarque en una sola pasada, con una persona que aprueba los valores antes de emitir el PDF llenado.",
    problem: [
      "Una parte sorprendente del trabajo de oficina consiste en copiar valores de documentos que recibiste a un formulario que alguien más exige. Declaraciones aduaneras, formularios de seguros, solicitudes de subsidios, reportes regulatorios — la información ya existe, repartida en tres o cuatro PDFs, y una persona la traslada a mano.",
      "Y es justo donde los errores se perdonan menos. Un error de transcripción en un formulario que va a una autoridad es un rechazo o una multa, no una corrección interna.",
    ],
    fields: [
      { name: "Conjunto de documentos fuente", note: "Un espacio por cada Flow fuente. El formulario se llena cuando cada espacio requerido tiene un Run completado." },
      { name: "Mapeo de campos", note: "Qué campo extraído llena qué campo del PDF. Se configura una vez por plantilla y se reutiliza cada vez." },
      { name: "Salidas de Cleaners como fuente", note: "Un valor mapeado puede venir de un Cleaner en lugar de la extracción cruda, para que valores convertidos o calculados lleguen al formulario." },
      { name: "Campos de llenado humano", note: "Valores que nadie extrae — un número de referencia, un firmante — que se completan al momento de aprobar." },
      { name: "Varias plantillas", note: "Un mismo conjunto de documentos fuente puede llenar varios formularios distintos en la misma pasada." },
    ],
    gotchas: [
      {
        title: "Los datos están repartidos en varios documentos, no en uno",
        body: "Por eso las herramientas genéricas de documentos no resuelven el llenado de formularios: extraen de un archivo a la vez. El llenado toma un Run por cada Flow fuente y completa el formulario con todos juntos, así los pesos de la lista de empaque y los valores de la factura llegan a la misma salida.",
      },
      {
        title: "Los documentos llegan en el orden en que llegan",
        body: "Rara vez recibes el juego completo de una vez. Un llenado queda abierto, acumulando Runs a medida que llegan los documentos, y se dispara cuando cada espacio requerido está cubierto. Los archivos subidos sin indicar a qué espacio pertenecen se clasifican y enrutan automáticamente, y lo que no coincida con ninguno se puede asignar a mano.",
      },
      {
        title: "Algunos campos nunca están en los documentos fuente",
        body: "Todo formulario real tiene valores que no existen en ningún documento previo — una referencia interna, el nombre del declarante, un bloque de firma. Esos son campos de llenado humano, que se completan en el paso de aprobación, que además es el punto natural para corregir cualquier cosa que la extracción haya captado mal antes de emitir el PDF.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Un Flow por cada tipo de documento fuente; el formulario toma datos de todos a la vez." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Convierte y calcula valores para que lo que llega al formulario ya esté en la unidad o el formato requerido." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Aprobación antes de emitir, con las correcciones y los campos de llenado humano capturados en el mismo paso." },
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Los documentos fuente reenviados a una dirección alimentan el llenado sin que nadie abra la aplicación." },
    ],
    faqs: [
      { q: "¿Se puede llenar un formulario a partir de varios documentos?", a: "Sí. Cada tipo de documento fuente tiene su propio espacio, y el formulario se completa con todos juntos — que es el caso normal en declaraciones y reclamos." },
      { q: "¿Qué pasa con los campos que no están en ningún documento?", a: "Son campos de llenado humano: se ingresan en el paso de aprobación junto con cualquier corrección, así el PDF final se revisa antes de emitirse." },
      { q: "¿Un mismo juego de documentos puede llenar más de un formulario?", a: "Sí. Una configuración puede tener varias plantillas, y todas se llenan a partir del mismo conjunto de Runs en una sola pasada." },
    ],
  },
  {
    slug: "contract-analysis",
    slugEs: "contratos",
    label: "Contratos",
    badge: "Legal y compras",
    h1: "Extracción de datos de contratos",
    title: "Extracción de datos de contratos: plazos y renovaciones",
    description:
      "Extrae partes, fechas de vigencia y renovación, condiciones de pago, plazos de preaviso y límites de responsabilidad de tus contratos, en una tabla consultable.",
    summary:
      "Partes, fechas de renovación, plazos de preaviso y condiciones de pago de toda tu cartera de contratos en una tabla consultable.",
    lede: "Tavnit lee contratos firmados y devuelve los términos que generan obligaciones — partes, fechas de vigencia y renovación, plazos de preaviso, condiciones de pago, límites de responsabilidad — como campos estructurados. La cartera se convierte en una tabla que puedes consultar, en lugar de una carpeta que tienes que leer.",
    problem: [
      "La mayoría de las organizaciones no puede responder preguntas básicas sobre sus propios contratos. ¿Cuáles se renuevan automáticamente el próximo trimestre? ¿Cuál es nuestra exposición total de responsabilidad? ¿Qué proveedores tienen preaviso de 90 días? Las respuestas existen, repartidas en cientos de PDFs que nadie tiene tiempo de abrir.",
      "El costo no es la lectura: son las renovaciones que pasan inadvertidas, y los términos que se descubren durante una disputa y no antes de ella.",
    ],
    fields: [
      { name: "Partes y entidades firmantes", note: "La entidad legal muchas veces no es el nombre comercial, y vale la pena capturar ambos." },
      { name: "Fecha de vigencia y de vencimiento", note: "El par que responde cualquier pregunta sobre renovaciones que quieras hacer después." },
      { name: "Renovación automática y plazo de preaviso", note: "Los dos campos que deciden si una renovación es una decisión o una sorpresa." },
      { name: "Condiciones de pago e importes", note: "Pago a 30 días, hitos, escalonamientos. Con frecuencia en prosa y no en una tabla." },
      { name: "Límite de responsabilidad e indemnizaciones", note: "Normalmente es una cláusula, no un número. Conviene extraerlo como texto más un valor parseado cuando exista." },
      { name: "Ley aplicable y jurisdicción", note: "Corto, fácil de extraer y tedioso de buscar a mano en toda una cartera." },
      { name: "Derechos de terminación", note: "Por conveniencia, por causa, y el preaviso que exige cada uno." },
    ],
    gotchas: [
      {
        title: "La respuesta está en la prosa, no en un campo",
        body: "Una factura pone el total en un recuadro. Un contrato entierra el plazo de preaviso en mitad de una cláusula, a veces en palabras y no en cifras. Las pistas de extracción te permiten explicarle al Flow qué significa el término y dónde suele aparecer, en vez de esperar que coincida una etiqueta.",
      },
      {
        title: "Las adendas cambian la respuesta",
        body: "Los términos vigentes están muchas veces en una adenda, no en el original. Trata cada documento como su propio Run y conserva la fecha de firma como campo, para que la posición actual sea una consulta y no una suposición sobre cuál archivo es el más reciente.",
      },
      {
        title: "Equivocarse aquí sale caro, así que la revisión no es opcional",
        body: "Una fecha de renovación mal leída es un contrato del que no saliste a tiempo. Es un caso donde la revisión en cada ejecución es proporcional al riesgo, y donde la bitácora de auditoría de solo anexar importa tanto como la extracción: puedes demostrar quién confirmó un término y cuándo.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Las pistas de extracción le dicen a la IA qué significa un término, algo que aquí pesa mucho más que en documentos con campos etiquetados." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Revisión en cada ejecución, con un registro permanente de quién confirmó cada término." },
      { label: "Buckets", href: "/docs/buckets", why: "Convierte la cartera en una tabla consultable: qué contratos se renuevan el próximo trimestre, ordenados por plazo de preaviso." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza formatos de fecha y puede calcular la fecha límite de preaviso a partir del vencimiento y el plazo de preaviso." },
    ],
    faqs: [
      { q: "¿Funciona con contratos que no tienen una estructura consistente?", a: "Sí — ese es el caso normal. No hay plantilla que configurar. Describes los términos que quieres y el Flow los localiza donde aparezcan, y por eso las pistas de extracción importan más aquí que en documentos estructurados." },
      { q: "¿Qué pasa con las adendas y las cartas complementarias?", a: "Procesa cada una como su propio Run, capturando la fecha de firma como campo. La posición actual sale entonces de consultar tu Bucket y no de adivinar cuál PDF es el más reciente." },
      { q: "¿Los datos extraídos se pueden consultar?", a: "Sí. Los resultados caen en un Bucket como columnas tipificadas, así que puedes filtrar, ordenar y graficar sobre toda la cartera sin exportar nada." },
    ],
  },
  {
    slug: "bank-statements",
    slugEs: "estados-de-cuenta",
    label: "Estados de cuenta",
    badge: "Finanzas y crédito",
    h1: "Extracción de datos de estados de cuenta bancarios",
    title: "Lectura de estados de cuenta PDF a transacciones",
    description:
      "Convierte estados de cuenta PDF de cualquier banco en filas de transacciones — fecha, descripción, monto y saldo — listas para conciliar o evaluar un crédito.",
    summary: "Estados de cuenta PDF de cualquier banco convertidos en filas de transacciones que puedes conciliar, categorizar o evaluar.",
    lede: "Tavnit lee estados de cuenta bancarios en PDF de cualquier institución y devuelve cada transacción como una fila: fecha, descripción, débito o crédito y saldo. Como el saldo también se extrae, la aritmética se puede verificar en lugar de asumirse, y eso es lo que hace que el resultado sea seguro para conciliar.",
    problem: [
      "Cada banco formatea sus estados de cuenta de forma distinta, y ninguno los formatea para máquinas. Las columnas se mueven, las transacciones se parten en dos líneas y el saldo es lo único que mantiene unida la secuencia. Quien evalúa créditos, lleva contabilidad o concilia termina re-tipeando o pagando un conector por banco.",
      "La banca abierta resuelve esto donde existe y el cliente da su consentimiento. Para todo lo demás — períodos históricos, cuentas empresariales, bancos sin API, estados de cuenta entregados como evidencia — el PDF es la única fuente que hay.",
    ],
    fields: [
      { name: "Titular, número de cuenta y código bancario", note: "Casi siempre solo en la primera página, así que hay que arrastrarlo a lo largo de un estado de cuenta de varias páginas." },
      { name: "Período del estado de cuenta", note: "Define qué significan los totales, y es lo que más se olvida cuando alguien re-tipea a mano." },
      { name: "Fecha de la transacción", note: "Con frecuencia abreviada y sin año — el año sale del período del estado de cuenta, no de la fila." },
      { name: "Descripción o contraparte", note: "Truncada y abreviada por el banco. Un Cleaner de categoría infiere el comercio y el tipo de movimiento a partir de ella." },
      { name: "Débito, crédito y saldo", note: "Extrae los tres. El saldo es lo que te permite verificar que no se perdió ninguna fila." },
      { name: "Saldo inicial y saldo final", note: "La suma de control de todo el estado de cuenta." },
    ],
    gotchas: [
      {
        title: "Una fila perdida es invisible sin el saldo",
        body: "Si la extracción omite una transacción, el resto de las filas siguen viéndose perfectamente plausibles. Extraer el saldo convierte eso en un error detectable: un Cleaner de fórmula puede verificar que el saldo de cada fila sea igual al saldo anterior más el movimiento, y marcar el estado de cuenta en lugar de dejarlo pasar.",
      },
      {
        title: "Las transacciones se parten, y una línea partida no es una transacción nueva",
        body: "Los nombres largos de contraparte se desbordan a una segunda línea, y una lectura ingenua de la tabla convierte un pago en dos filas, una de ellas sin monto. Los campos de tabla tratan una fila como una fila, así que una descripción partida se queda pegada a su monto.",
      },
      {
        title: "Las fechas casi nunca traen el año",
        body: "La mayoría de los estados de cuenta imprimen “14 mar” y dependen del período del encabezado para el año. Para una persona está bien; para una base de datos está mal — sobre todo al cruzar el cambio de año en un estado de cuenta de enero. Extrae el período y deriva la fecha completa con un Cleaner de fórmula.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Las transacciones son campos de tabla, así que cada una vuelve como su propia fila tipada en lugar de un bloque de texto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Deriva fechas completas a partir del período, verifica los saldos fila por fila y categoriza las contrapartes." },
      { label: "Buckets", href: "/docs/buckets", why: "Las transacciones quedan en una tabla consultable — filtra por contraparte, agrupa por mes, grafica el saldo." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Envía a una persona solo los estados de cuenta que fallan la verificación de saldos, en lugar de revisarlos todos." },
    ],
    faqs: [
      { q: "¿Funciona con cualquier banco?", a: "Sí. No hay que configurar una plantilla por banco: el mismo Flow lee estados de cuenta de cualquier institución, incluidas cuentas empresariales y períodos históricos que una API de banca abierta no cubriría." },
      { q: "¿Cómo sé que no se perdió ninguna transacción?", a: "Extrae el saldo junto con cada transacción y usa un Cleaner de fórmula para verificar que cada fila concilia con la anterior. Un estado de cuenta que falla la verificación queda marcado en lugar de pasar en silencio." },
      { q: "¿Se pueden categorizar las transacciones automáticamente?", a: "Sí. Un Cleaner de categoría con IA asigna una categoría a partir de la descripción, así la contabilidad arranca desde filas clasificadas y no desde el texto crudo del banco." },
    ],
  },
  {
    slug: "expense-reports",
    slugEs: "gastos-y-recibos",
    label: "Gastos y recibos",
    badge: "Finanzas y colaboradores",
    h1: "Procesamiento de recibos e informes de gastos",
    title: "OCR de recibos y automatización de informes de gastos",
    description:
      "Convierte fotos de recibos en líneas de gasto categorizadas — comercio, fecha, importe, impuesto y categoría — para que reembolsar sea revisar, no tipear.",
    summary:
      "Fotos de recibos convertidas en líneas de gasto categorizadas, para que reembolsar sea revisar y no capturar datos.",
    lede: "Tavnit lee recibos — incluso arrugados y fotografiados con mala luz — y devuelve comercio, fecha, importe, impuesto y categoría como campos tipificados. Los gastos llegan categorizados y verificables, así que aprobar un informe de gastos es una revisión y no un trabajo de transcripción.",
    problem: [
      "El procesamiento de gastos falla por los dos extremos. Los colaboradores postergan el envío porque llenar el formulario es tedioso, y luego finanzas vuelve a tipear lo enviado porque el formulario se llenó de forma inconsistente. Los reembolsos se atrasan, y nadie disfruta ninguna parte del proceso.",
      "Los recibos son además los documentos de peor calidad que procesa la mayoría de las empresas: papel térmico desteñido, fotografiado en ángulo, doblado, a veces parcialmente en otro idioma.",
    ],
    fields: [
      { name: "Nombre del comercio", note: "Muchas veces es un logo estilizado y no texto — uno de los campos más difíciles de un recibo." },
      { name: "Fecha y hora de la transacción", note: "La hora importa más de lo que la gente espera para viáticos y para detectar duplicados." },
      { name: "Total, impuesto y propina", note: "Separar el impuesto (ITBMS o IVA) importa para el crédito fiscal; separar la propina importa para la política de gastos." },
      { name: "Método de pago y últimos cuatro dígitos", note: "Lo que permite conciliar contra el estado de cuenta de la tarjeta de forma automática." },
      { name: "Categoría del gasto", note: "Mejor que la infiera un Cleaner de categoría con IA a partir del comercio y las líneas, en vez de pedírsela al colaborador." },
      { name: "Moneda", note: "Los gastos de viaje llegan en la moneda en que se gastó; la conversión va dentro del proceso." },
    ],
    gotchas: [
      {
        title: "La calidad de los recibos es realmente mala",
        body: "Papel térmico desteñido, reflejos, dobleces y ángulos son la norma, no la excepción. La extracción resuelve la mayoría, pero este es un tipo de documento donde la revisión condicional se gana su lugar: marca los importes de baja confianza o fuera de política para una persona y deja pasar los limpios.",
      },
      {
        title: "La categorización es el verdadero trabajo",
        body: "Leer el total es fácil. Decidir si un cargo de restaurante es atención a clientes o una comida de equipo es la parte que consume el tiempo de finanzas. Un Cleaner de categoría con IA asigna una categoría a partir del comercio y las líneas, así que el colaborador no adivina y finanzas corrige en vez de clasificar.",
      },
      {
        title: "Los duplicados son comunes y caros",
        body: "El mismo recibo enviado dos veces — una vez fotografiado, otra como PDF del comercio — es una fuente rutinaria de sobre-reembolso. Extraer comercio, importe exacto y hora te da lo suficiente para detectarlo en el Bucket en vez de descubrirlo en una auditoría.",
      },
    ],
    pipeline: [
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Los colaboradores reenvían los recibos a una dirección en vez de aprender una aplicación. Los recibos digitales se pueden reenviar automáticamente al llegar." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Asigna una categoría con IA, convierte moneda extranjera y estandariza los nombres de los comercios." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Revisión condicional — solo los gastos por encima de un umbral o fuera de política llegan a un aprobador." },
      { label: "Buckets", href: "/docs/buckets", why: "Los gastos como una tabla que puedes agrupar, graficar y revisar en busca de duplicados antes de pagar." },
    ],
    faqs: [
      { q: "¿Puede leer la foto de un recibo arrugado?", a: "Normalmente sí. Fotos, papel térmico desteñido y recibos doblados pasan por OCR, aunque la calidad marca el techo — y por eso existe la revisión condicional para los casos en que el proceso tiene menos certeza." },
      { q: "¿Los gastos se pueden categorizar automáticamente?", a: "Sí. Un Cleaner de categoría con IA asigna una categoría a partir del comercio y las líneas, así que finanzas corrige el caso excepcional en vez de clasificar todo." },
      { q: "¿Qué pasa con la moneda extranjera en los gastos de viaje?", a: "La moneda es un campo extraído propio, y un Cleaner de conversión puede reexpresar los importes en tu moneda de reporte durante el procesamiento." },
    ],
  },
  {
    slug: "compliance-checks",
    slugEs: "cumplimiento-documental",
    label: "Cumplimiento documental",
    badge: "Cumplimiento y riesgo",
    h1: "Verificación de cumplimiento documental automatizada",
    title: "Listas de verificación de cumplimiento documental",
    description:
      "Verifica un juego de documentos contra una lista de verificación con ramas — presencia, consistencia y política — y genera un reporte listo para el auditor.",
    summary: "Un juego de documentos verificado contra una lista de verificación con ramas, con un reporte auditable de aprobado o rechazado.",
    lede: "El Inspector de Tavnit verifica un juego de documentos contra una lista de verificación que tú defines. Envía cada archivo cargado al espacio que le corresponde, extrae lo que las reglas necesitan y evalúa la lista de forma determinista — así la misma evidencia produce siempre el mismo veredicto, con un reporte adjunto.",
    problem: [
      "La revisión de cumplimiento suele ser una persona con una lista y una carpeta, confirmando que los documentos correctos están presentes, que los valores coinciden entre ellos y que nada está vencido. Es lento, es inconsistente entre revisores, y la evidencia de por qué algo pasó es lo que esa persona recuerde.",
      "La falla habitual no es un documento faltante. Es un valor que no coincide entre dos documentos que nadie puso lado a lado.",
    ],
    fields: [
      { name: "Espacios de documentos esperados", note: "Lo que el juego debería contener. Un espacio obligatorio vacío es un hallazgo en sí mismo, no solo una ausencia." },
      { name: "Campos de identidad y de entidad", note: "Los valores que deben coincidir entre documentos — nombres, números de registro, direcciones." },
      { name: "Fechas y vencimientos", note: "Los certificados y las licencias vencen. Si algo está vigente es una regla, no un campo." },
      { name: "Montos y valores declarados", note: "Aquí viven las verificaciones de consistencia entre documentos: ¿el valor de la factura coincide con el de la declaración?" },
      { name: "Firmas y sellos presentes", note: "Presencia más que contenido, y una de las verificaciones manuales más comunes." },
      { name: "Resultado por ítem de la lista", note: "Aprobado, rechazado o no aplica, por regla, con el valor que lo determinó." },
    ],
    gotchas: [
      {
        title: "La verificación real es entre documentos, no dentro de uno",
        body: "Cualquier herramienta puede leer un valor de un certificado. El hallazgo que importa es que el valor del certificado no coincide con el de la factura. Como una inspección reúne el juego completo antes de evaluar, las reglas de la lista pueden comparar entre documentos y no solo dentro de uno.",
      },
      {
        title: "Las listas tienen ramas, y las listas planas esconden vacíos",
        body: "Que una regla aplique casi siempre depende de una respuesta anterior — si la mercancía está restringida, entonces se requiere una licencia. Una lista de verificación con ramas expresa eso directamente, así la inspección pide la licencia solo cuando de verdad hace falta y no la marca como no aplica sin avisar.",
      },
      {
        title: "El auditor pregunta cómo decidiste, no qué decidiste",
        body: "La evaluación es determinista — los mismos documentos producen el mismo resultado, en lugar de un juicio nuevo cada vez — y el resultado se escribe en un reporte. Sumado a la revisión, puedes mostrar qué valores se extrajeron, qué reglas se activaron y quién aprobó el resultado.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "La evidencia mezclada que llega a un solo lugar se clasifica y se envía al Flow correcto antes de cualquier verificación." },
      { label: "Flows", href: "/docs/flows", why: "Cada tipo de documento tiene su propio Flow, así una regla puede referirse a un campo con nombre en lugar de buscar en texto libre." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Un revisor firma la inspección, y la bitácora de solo anexar registra quién aceptó cada hallazgo." },
      { label: "Buckets", href: "/docs/buckets", why: "Los resultados a lo largo del tiempo se vuelven reportables — cuántos juegos fallaron, en qué regla, en qué mes." },
    ],
    faqs: [
      { q: "¿Puede comparar valores entre documentos distintos?", a: "Sí — ese es el punto. Una inspección reúne el juego completo de documentos antes de evaluar, así las reglas pueden verificar que un valor de un documento coincide con el de otro, en lugar de validar cada uno por separado." },
      { q: "¿El resultado es repetible?", a: "La evaluación de la lista de verificación es determinista. Los mismos documentos y la misma lista producen el mismo resultado, que es lo que hace defendible la respuesta cuando alguien pregunta por qué un juego pasó." },
      { q: "¿Qué pasa si falta un documento obligatorio?", a: "Un insumo obligatorio ausente es un hallazgo en sí mismo. La inspección lo reporta en lugar de completarse con un vacío, y los archivos cargados sin un espacio asignado se enrutan automáticamente o se marcan como sin pareja." },
    ],
  },
  {
    slug: "insurance-claims",
    slugEs: "reclamos-de-seguros",
    label: "Reclamos de seguros",
    badge: "Seguros y reclamos",
    h1: "Procesamiento de documentos de reclamos de seguros",
    title: "Extracción de datos de reclamos de seguros",
    description:
      "Procesa formularios de reclamo y su evidencia de respaldo en conjunto — cotizaciones, facturas, informes y fotos — en un solo registro estructurado y revisable.",
    summary: "Formularios de reclamo y evidencias de respaldo procesados juntos en un solo registro estructurado y revisable.",
    lede: "Tavnit procesa un reclamo y la evidencia que lo respalda como un solo conjunto: el formulario de reclamo, las cotizaciones de reparación, las facturas y los informes. Cada tipo de documento se enruta a su propio Flow, y los resultados se reúnen en un único registro que un analista puede evaluar, en lugar de una carpeta que tiene que leer.",
    problem: [
      "Un reclamo nunca es un solo documento. Es un formulario más todo lo que el asegurado envió — cotizaciones, recibos, un informe policial, fotografías — que llega a lo largo de días, sin orden, por correo.",
      "Los analistas de reclamos dedican la mayor parte de su tiempo a armar el expediente en lugar de evaluarlo: abrir adjuntos, encontrar los montos, verificar que la cifra reclamada coincida con la cifra de la cotización.",
    ],
    fields: [
      { name: "Número de reclamo y de póliza", note: "Las llaves con las que se une todo el conjunto, y muchas veces lo único consistente entre documentos." },
      { name: "Datos del asegurado y del incidente", note: "Fecha, lugar y descripción de la pérdida, normalmente repartidos entre el formulario y una narrativa." },
      { name: "Monto reclamado", note: "Lo que dice el formulario. Conviene extraerlo por separado de lo que la evidencia respalda." },
      { name: "Montos de respaldo", note: "Totales de cotizaciones y facturas — las cifras con las que el monto reclamado debería conciliar." },
      { name: "Datos de terceros", note: "Otras partes, aseguradoras y números de referencia, necesarios para el recobro." },
      { name: "Tipo de documento por adjunto", note: "Saber qué es cada archivo determina qué Flow lo lee." },
    ],
    gotchas: [
      {
        title: "La evidencia llega tarde y sin orden",
        body: "La evaluación no puede empezar hasta que el conjunto esté completo, y el conjunto se completa a lo largo de días. Las Collections clasifican cada adjunto en cuanto llega, así el registro se construye de forma incremental, en lugar de que alguien relea toda la carpeta cada vez que aparece algo nuevo.",
      },
      {
        title: "El monto reclamado y el monto evidenciado son campos distintos",
        body: "Extraer un solo número por reclamo pierde la verificación que importa. Captura lo que se reclamó y lo que realmente suman las cotizaciones y las facturas, y la diferencia se vuelve un valor por el que puedes filtrar, en lugar de algo que un analista tiene que notar.",
      },
      {
        title: "Los expedientes de reclamos son personales, y muchas veces médicos",
        body: "Los reclamos contienen de forma rutinaria información de salud, documentos de identidad y detalle financiero. Los Buckets privados con permisos de acceso por usuario mantienen un reclamo visible para los analistas que lo llevan, no para toda la organización.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Clasifica cada adjunto — formulario, cotización, factura, informe — y lo enruta al Flow construido para él." },
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Los reclamos llegan por correo; reenviarlos a la dirección de una Collection procesa cada adjunto en cuanto llega." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza fechas y monedas, y calcula la diferencia entre el monto reclamado y el evidenciado." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Los analistas aprueban o rechazan con un registro permanente de la decisión y de quién la tomó." },
    ],
    faqs: [
      { q: "¿Puede manejar un reclamo con muchos adjuntos distintos?", a: "Sí. Una Collection clasifica cada adjunto y lo enruta al Flow correcto, así un formulario de reclamo, una cotización y una factura los lee cada uno el Flow construido para ese tipo de documento." },
      { q: "¿Puede señalar reclamos donde los números no coinciden?", a: "Extrae el monto reclamado y los totales de respaldo como campos separados, y usa un Cleaner para calcular la diferencia. Los reclamos que no pasan la verificación se pueden enrutar a revisión automáticamente." },
      { q: "¿Cómo se protegen los datos sensibles de un reclamo?", a: "Los Buckets pueden ser privados en lugar de visibles para toda la organización, con permisos por usuario de Viewer o Editor, así un reclamo solo lo ven los analistas que lo trabajan." },
    ],
  },
  {
    slug: "identity-verification",
    slugEs: "verificacion-de-identidad",
    label: "Identidad y onboarding",
    badge: "KYC y onboarding",
    h1: "Captura de documentos de identidad y onboarding",
    title: "Extracción de documentos KYC para onboarding de clientes",
    description:
      "Captura cédulas, pasaportes y comprobantes de domicilio en el onboarding, verifica que los datos coincidan entre documentos y deja un registro auditable.",
    summary: "Documentos de identidad y domicilio capturados, cruzados entre sí para verificar consistencia y registrados de forma auditable.",
    lede: "Tavnit lee los documentos que recoges durante el onboarding — cédula o pasaporte, comprobante de domicilio, documentos de constitución de la sociedad — y devuelve nombres, números, fechas y direcciones como campos estructurados. Como el juego completo se procesa junto, comprobar que los datos coinciden entre documentos pasa de ser una suposición a ser una verificación.",
    problem: [
      "Incorporar a un cliente significa recopilar documentos, leerlos y confirmar que describen a la misma persona o a la misma empresa. La lectura es tediosa; la confirmación es la parte que carga el riesgo, y hoy se hace a ojo, comparando un PDF contra otro.",
      "El volumen lo empeora. Un equipo que incorpora clientes de forma constante termina con criterios distintos entre revisores y sin un registro confiable de qué se verificó, cuándo y por quién.",
    ],
    fields: [
      { name: "Nombre completo tal como aparece impreso", note: "Extráelo textual. El orden y la transliteración cambian entre documentos, y esa diferencia es precisamente lo que hay que verificar." },
      { name: "Fecha de nacimiento", note: "El campo más útil para comprobar consistencia entre documentos." },
      { name: "Número y tipo de documento", note: "Cédula, pasaporte, licencia de conducir — cada uno con su propia convención de numeración." },
      { name: "Fechas de emisión y vencimiento", note: "El vencimiento es una regla más que un campo: un documento vencido es un hallazgo." },
      { name: "Dirección", note: "Viene del comprobante de domicilio — recibo de luz, estado de cuenta — y debe coincidir con lo que el cliente declaró." },
      { name: "Datos de registro de la sociedad", note: "Para onboarding de empresas — número de registro o RUC, domicilio social, directores." },
    ],
    gotchas: [
      {
        title: "Los nombres no coinciden, y eso es normal",
        body: "La misma persona aparece como “Jose Garcia Lopez”, “J. García” y “GARCIA LOPEZ, JOSE” en tres documentos distintos. Extrae los nombres textuales en lugar de normalizarlos durante la extracción, y compáralos después de forma deliberada — normalizar demasiado pronto borra justo la diferencia que necesitas evaluar.",
      },
      {
        title: "La identificación fotografiada es la norma, y la calidad varía",
        body: "Los clientes fotografían sus documentos con el celular, y el reflejo sobre la zona de lectura mecánica aparece más veces de las que quisieras. Revisar cada onboarding es proporcional a lo que cuesta un error, y la bitácora de auditoría registra después quién aceptó qué documento.",
      },
      {
        title: "Son los datos más regulados que vas a procesar",
        body: "Los documentos de identidad traen plazos de retención, derechos de eliminación y obligaciones de acceso que los documentos comerciales corrientes no tienen. Los Buckets privados y los permisos por usuario mantienen los archivos de onboarding dentro del equipo de cumplimiento, y la bitácora de solo anexar evidencia quién accedió a qué.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Clasifica lo que el cliente haya enviado — pasaporte, recibo de servicios, certificado de constitución — y envía cada documento al Flow correcto." },
      { label: "Flows", href: "/docs/flows", why: "Un Flow por tipo de documento, para que una verificación pueda referirse a un campo con nombre en lugar de buscar en el texto." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Aprobación en cada onboarding, con un registro permanente de quién aprobó qué documento." },
      { label: "Roles de usuario", href: "/docs/user-roles", why: "Restringe los documentos de identidad al equipo que los necesita, en lugar de a toda la organización." },
    ],
    faqs: [
      { q: "¿Verifica que un documento sea auténtico?", a: "No. Tavnit extrae y estructura lo que los documentos dicen, y te permite comprobar la consistencia dentro de un juego de documentos. La verificación de autenticidad contra las autoridades emisoras es una especialidad aparte, y esto no la reemplaza." },
      { q: "¿Puede comprobar que los datos coincidan entre documentos?", a: "Sí. Procesa el juego completo y compara los campos extraídos — nombre, fecha de nacimiento, dirección — para que una discrepancia aparezca como un valor y no como algo que un revisor tiene que detectar a simple vista." },
      { q: "¿Cómo se restringe el acceso a los datos de identidad?", a: "Los Buckets privados con permisos de acceso por usuario limitan la visibilidad al equipo de cumplimiento, y la bitácora de auditoría de solo anexar registra cada consulta, edición y aprobación." },
    ],
  },
  {
    slug: "lease-agreements",
    slugEs: "contratos-de-arrendamiento",
    label: "Arrendamientos e inmuebles",
    badge: "Bienes raíces e instalaciones",
    h1: "Extracción de datos de contratos de arrendamiento",
    title: "Extracción de contratos de arrendamiento: canon y plazos",
    description:
      "Convierte contratos de arrendamiento en fichas estructuradas: canon, revisiones, terminación anticipada, gastos comunes y reparaciones, en todo el portafolio.",
    summary: "Contratos de arrendamiento convertidos en registros estructurados: canon, revisiones, fechas de terminación y obligaciones.",
    lede: "Tavnit convierte contratos de arrendamiento en registros estructurados: partes, inmueble arrendado, plazo, canon y fechas de revisión, cláusulas de terminación anticipada, base de los gastos comunes y obligaciones de reparación. Un portafolio guardado como PDFs se vuelve una tabla donde la próxima revisión de canon es un filtro, no un ejercicio de lectura.",
    problem: [
      "Resumir contratos de arrendamiento en una ficha (el “lease abstract”) es un trabajo manual bien establecido precisamente porque las respuestas están enterradas en la redacción, no impresas en campos. Las empresas lo pagan, una y otra vez, y la hoja de cálculo resultante queda desactualizada en cuanto se firma una adenda.",
      "El costo de no tenerlo es específico y caro: una fecha de terminación anticipada que se pasó, una opción que nadie ejerció, una revisión de canon que ocurrió sin que nadie la cuestionara.",
    ],
    fields: [
      { name: "Arrendador, arrendatario y fiador", note: "Entidades legales, no nombres comerciales, y con frecuencia modificadas por adendas posteriores." },
      { name: "Inmueble arrendado", note: "Descrito en prosa y por referencia a un plano; rara vez como una dirección limpia." },
      { name: "Plazo, inicio y vencimiento", note: "La columna vertebral de todas las demás fechas del documento." },
      { name: "Canon y fechas de revisión", note: "La base de la revisión — valor de mercado, indexada, escalonada — importa tanto como el monto." },
      { name: "Cláusulas de terminación anticipada y sus condiciones", note: "Un derecho de terminación con condiciones incumplidas no es un derecho de terminación. Extrae ambos." },
      { name: "Gastos comunes y obligaciones de reparación", note: "Dónde recae realmente la responsabilidad, y normalmente las cláusulas más largas del documento." },
    ],
    gotchas: [
      {
        title: "Las fechas se definen, no se declaran",
        body: "Un contrato rara vez imprime la fecha de terminación anticipada. Dice que el arrendatario puede terminar en el quinto aniversario del inicio del plazo, con seis meses de preaviso. Extrae el inicio, el aniversario y el plazo de preaviso como campos, y deja que un Cleaner de fórmula calcule la fecha límite real — que es la fecha que necesitabas.",
      },
      {
        title: "El documento que rige a menudo no es el contrato",
        body: "Las adendas, las autorizaciones de mejoras y las cartas laterales cambian la posición, y el contrato original sigue leyéndose como si no existieran. Procesa cada documento como su propio Run, con su fecha capturada, para que la posición vigente se derive del juego completo y no del PDF que alguien abrió.",
      },
      {
        title: "Un derecho condicional leído como incondicional es un pasivo",
        body: "Las cláusulas de terminación anticipada suelen estar condicionadas a entregar el inmueble desocupado o a estar al día con el canon. Capturar el derecho sin las condiciones produce una tabla de portafolio que está confiadamente equivocada, lo cual es peor que no tener tabla. Extrae las condiciones como su propio campo y revísalas.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Las pistas de extracción son esenciales aquí — el modelo necesita saber qué es una condición de terminación, no solo dónde buscar." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Calcula las fechas límite de revisión y de terminación a partir de la fecha de inicio y los plazos de preaviso." },
      { label: "Buckets", href: "/docs/buckets", why: "El portafolio como tabla: qué contratos pueden terminarse el año que viene, ordenados por fecha límite de preaviso." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Revisa cada ficha. El costo de una fecha equivocada aquí se mide en años de canon." },
    ],
    faqs: [
      { q: "¿Puede calcular las fechas de terminación anticipada y de revisión de canon?", a: "Sí. Extrae la fecha de inicio, el aniversario al que se ata el derecho y el plazo de preaviso, y un Cleaner de fórmula deriva la fecha límite real — que normalmente es lo que querías, más que la cláusula en sí." },
      { q: "¿Qué pasa con las adendas y modificaciones al contrato?", a: "Procesa cada documento como su propio Run, con su fecha capturada como campo. La posición vigente sale entonces de consultar el juego completo, en lugar de asumir que el archivo más reciente es el que manda." },
      { q: "¿Captura las condiciones de una cláusula de terminación anticipada?", a: "Debería, y esta página sostiene que es obligatorio — un derecho de terminación registrado sin sus condiciones produce una tabla de portafolio que se lee como segura y no lo es. Extrae las condiciones como su propio campo y revísalas." },
    ],
  },
  {
    slug: "timesheets",
    slugEs: "registro-de-horas",
    label: "Registro de horas",
    badge: "Planilla y personal",
    h1: "Captura de registros de horas y turnos",
    title: "OCR de hojas de tiempo y registros de horas para planilla",
    description:
      "Captura horas de registros de tiempo impresos, escritos a mano o fotografiados, y verifícalas contra reglas antes de que lleguen a la planilla (nómina).",
    summary: "Horas capturadas de registros impresos, manuscritos y fotografiados, verificadas antes de la planilla.",
    lede: "Tavnit lee los registros de horas que te envían, incluidos los escritos a mano y los fotografiados, y devuelve trabajador, fecha, horas y código de costo como filas. Las reglas pueden verificar los totales antes de que nada llegue a la planilla, así los errores que terminan en correcciones de pago se detectan mientras todavía son baratos.",
    problem: [
      "La planilla corre contra una fecha límite, y los registros de horas llegan en la forma que cada obra, sucursal o agencia use — una hoja de cálculo impresa, una hoja de papel fotografiada al final del turno, un PDF del sistema propio de un subcontratista.",
      "Alguien los vuelve a digitar bajo presión de tiempo, que es exactamente la condición en la que ocurren los errores de transcripción. Una cifra equivocada descubierta después de correr la planilla es una corrección, un ajuste y una conversación incómoda.",
    ],
    fields: [
      { name: "Nombre o número del trabajador", note: "Los nombres en los registros rara vez coinciden exactamente con los de planilla — un Cleaner de búsqueda los mapea." },
      { name: "Fecha o semana de cierre", note: "Determina a qué período de pago pertenecen las horas, y es fácil de leer mal cuando cae en el límite entre períodos." },
      { name: "Hora de entrada, salida y descansos", note: "Extraer los componentes, y no solo el total, permite verificar el total." },
      { name: "Total de horas", note: "Vale la pena extraerlo tal como se reportó y compararlo con el total calculado." },
      { name: "Horas extra y con recargo", note: "Tarifas distintas, así que clasificarlas mal es un error de pago, no de redondeo." },
      { name: "Código de costo o proyecto", note: "Alimenta el costeo por trabajo, y es el campo que más veces queda en blanco." },
    ],
    gotchas: [
      {
        title: "El total reportado y el total real difieren más de lo que esperarías",
        body: "La gente suma sus propias horas, y se equivoca. Extraer entrada, salida y descansos además del total reportado permite que un Cleaner de fórmula calcule las horas y las compare — las discrepancias que salen a la luz suelen ser errores aritméticos reales, no errores de extracción.",
      },
      {
        title: "Los registros a mano son el caso difícil, y son comunes",
        body: "El trabajo en obra y por turnos todavía corre sobre papel fotografiado al final del día. La escritura a mano se extrae, pero la confianza varía, y este es un caso donde enviar a revisión las capturas inciertas es mejor que descubrir el problema en un comprobante de pago.",
      },
      {
        title: "Los nombres del registro no son los nombres de planilla",
        body: "“Carlos R.”, “Carlos Rodríguez” y un número de empleado se refieren a la misma persona, y la planilla necesita el número. Un Cleaner de búsqueda cruza los nombres reportados contra tu lista de trabajadores durante el procesamiento, así las entradas sin correspondencia se marcan en lugar de adivinarse.",
      },
    ],
    pipeline: [
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Las obras y las agencias envían las hojas por correo al cierre de la semana; reenviarlas las procesa en cuanto llegan." },
      { label: "Splitters", href: "/docs/splitters", why: "Un solo PDF con las hojas de toda una cuadrilla se convierte en un Run por trabajador." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Calcula horas a partir de los tiempos, cruza nombres con los registros de planilla y marca los totales que no cuadran." },
      { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "Solo las hojas que fallan una verificación llegan a una persona, que es lo que hace esto viable con una fecha límite de planilla encima." },
    ],
    faqs: [
      { q: "¿Puede leer registros de horas escritos a mano?", a: "Sí. La escritura a mano se extrae igual que el texto impreso, aunque la confianza varía con la legibilidad — por eso vale la pena activar aquí el envío a revisión de las hojas inciertas." },
      { q: "¿Puede verificar que las horas sumen bien?", a: "Sí. Extrae entrada, salida y descansos junto con el total reportado, y un Cleaner de fórmula calcula las horas y marca cualquier hoja donde los dos no coincidan." },
      { q: "¿Y si los nombres no coinciden con nuestro sistema de planilla?", a: "Un Cleaner de búsqueda cruza los nombres reportados contra tu lista de trabajadores durante el procesamiento. Las entradas que no puede emparejar se marcan en lugar de adivinarse, así nada llega a la planilla sin atribuir." },
    ],
  },
  {
    slug: "utility-bills",
    slugEs: "facturas-de-servicios",
    label: "Facturas de servicios",
    badge: "Instalaciones y ESG",
    h1: "Extracción de datos de facturas de servicios y medidores",
    title: "Extracción de facturas de luz, agua y gas para costos y ESG",
    description:
      "Extrae consumo, tarifas y lecturas de medidor de facturas de luz, agua y gas de todo tu portafolio de sitios, para control de costos y reportes de emisiones.",
    summary: "Consumo, tarifas y lecturas de medidor extraídos en todo el portafolio, para reportes de costos y emisiones.",
    lede: "Tavnit lee facturas de electricidad, gas, agua y recolección de desechos y devuelve consumo, tarifa, lecturas de medidor y cargos por sitio. Las facturas de todo un portafolio se convierten en una tabla con la que puedes ver tendencias — que es lo que el control de costos y el reporte de emisiones realmente necesitan.",
    problem: [
      "Quien administra más de un puñado de sitios recibe facturas de varios proveedores en varios formatos, y lo único que les pasa de forma confiable es que se pagan. Los datos de consumo — la parte con valor analítico — se quedan dentro del PDF.",
      "El reporte de emisiones volvió esto urgente. Reportar Alcance 1 y 2 exige el consumo en kWh por sitio y por período, y para la mayoría de las organizaciones esos datos existen solo como una pila de facturas que nadie ha transcrito.",
    ],
    fields: [
      { name: "Dirección del suministro y número de medidor / NIC", note: "El identificador que ata una factura a un sitio. Las direcciones por sí solas no son confiables entre proveedores." },
      { name: "Período de facturación", note: "Las facturas rara vez coinciden con el mes calendario, y eso importa cuando agregas por trimestre." },
      { name: "Consumo con su unidad", note: "kWh, m³ o litros. La unidad es tan importante como el número, y no siempre se expresa igual." },
      { name: "Lecturas de medidor e indicador de estimación", note: "Una lectura estimada no es una medición, y tratarla como tal corrompe la tendencia." },
      { name: "Tarifa y cargo fijo", note: "Lo que separa un cambio de precio de un cambio de consumo." },
      { name: "Total de cargos e impuestos", note: "Para conciliar el costo contra lo que realmente se pagó." },
    ],
    gotchas: [
      {
        title: "Las lecturas estimadas no son datos",
        body: "Cuando el proveedor no puede leer el medidor, estima, y corrige en la siguiente lectura real. Una tendencia construida sin distinguir las dos muestra un pico que nunca ocurrió seguido de una caída que tampoco. Extrae el indicador de estimación como su propio campo, para poder excluir las estimaciones o tratarlas aparte.",
      },
      {
        title: "Los períodos de facturación no se alinean con nada",
        body: "Un proveedor factura por mes, otro cada 28 días, un tercero por trimestre, y ninguno coincide con tus períodos de reporte. Extrae el inicio y el fin del período en lugar de una sola fecha, para poder prorratear el consumo entre los períodos sobre los que realmente reportas.",
      },
      {
        title: "Las unidades difieren, y el gas es la trampa",
        body: "El gas se factura con frecuencia en metros cúbicos y se reporta en kWh, y la conversión depende de un poder calorífico impreso en la factura. Extrae la unidad y el factor de conversión en lugar de asumirlos, y deja que un Cleaner de unidades haga la conversión — asumir un factor estándar es donde la mayoría de las cifras de emisiones se equivocan sin que nadie lo note.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Las facturas de distintos servicios y proveedores llegan juntas y se envían automáticamente al Flow correcto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Convierte las unidades a una sola base de reporte y calcula el consumo prorrateado por período." },
      { label: "Buckets", href: "/docs/buckets", why: "Consumo por sitio y período como una tabla graficable — el formato que necesitan tanto finanzas como el reporte ESG." },
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Los proveedores envían las facturas por correo; reenviarlas construye el conjunto de datos sin un proyecto de digitación." },
    ],
    faqs: [
      { q: "¿Maneja facturas de distintos servicios y proveedores?", a: "Sí. Una Collection clasifica cada factura y la envía al Flow correcto, así las facturas de luz, gas y agua las lee cada una el Flow construido para ellas, sea cual sea el formato del proveedor." },
      { q: "¿Los datos sirven para el reporte de emisiones?", a: "Produce consumo por sitio y período con las unidades capturadas, que es el insumo que ese reporte necesita. Extrae el indicador de estimación y el factor de conversión en lugar de asumir uno estándar — esa suposición es donde la mayoría de las cifras de emisiones se equivocan." },
      { q: "¿Puede separar un aumento de precio de un aumento de consumo?", a: "Extrae la tarifa y el cargo fijo junto con el consumo, y los dos se vuelven columnas separadas cuya tendencia puedes seguir de forma independiente." },
    ],
  },
  {
    slug: "resume-screening",
    slugEs: "hojas-de-vida",
    label: "Hojas de vida",
    badge: "Recursos humanos y reclutamiento",
    h1: "Lectura y filtrado de hojas de vida",
    title: "Lectura automática de hojas de vida (CV) para reclutamiento",
    description:
      "Convierte hojas de vida de cualquier formato en registros de candidatos consistentes — contacto, habilidades, cargos, fechas, educación — para filtrar, no leer.",
    summary:
      "Hojas de vida en cualquier formato convertidas en registros consistentes, para que el filtrado reemplace la lectura una por una.",
    lede: "Tavnit lee hojas de vida en cualquier diseño y devuelve registros de candidatos consistentes: datos de contacto, habilidades, cargos con fechas, educación y certificaciones. Como cada candidato queda descrito en los mismos campos, filtrar una tabla reemplaza abrir doscientos PDFs uno por uno.",
    problem: [
      "La hoja de vida es el documento menos estandarizado que maneja la mayoría de los equipos. Dos columnas o una, tablas o prosa, un diseño vistoso con las fechas en una barra lateral. Una persona lee cualquiera de ellas; el software suele leer más o menos la mitad.",
      "El costo real es la inconsistencia. Cuando cien hojas de vida se resumen cada una de forma ligeramente distinta, comparar candidatos con los mismos criterios deja de ser posible, y el filtrado termina siendo, sin que nadie lo decida, lo que le gustó al primer revisor.",
    ],
    fields: [
      { name: "Nombre y datos de contacto", note: "Con frecuencia en un encabezado, una barra lateral o una imagen — una de las fallas de extracción más comunes." },
      { name: "Cargos con empleador y fechas", note: "Una tabla repetitiva, no un valor único. Los campos de tabla mantienen cada puesto como su propia fila." },
      { name: "Años totales de experiencia", note: "Rara vez se declara. Un Cleaner de fórmula puede calcularlo a partir de las fechas de cada puesto en vez de confiar en lo que afirma el candidato." },
      { name: "Habilidades", note: "Mejor extraerlas textuales y luego normalizarlas — un Cleaner de categoría puede mapear 'JS', 'JavaScript' y 'ES6' a un solo valor." },
      { name: "Educación y certificaciones", note: "Institución, título, año. Otra estructura repetitiva." },
      { name: "Ubicación y permiso de trabajo", note: "Suele ser el primer filtro duro, y suele estar enterrado en el encabezado." },
    ],
    gotchas: [
      {
        title: "Los diseños a dos columnas rompen a los lectores ingenuos",
        body: "Una hoja de vida con barra lateral, leída de arriba abajo por cualquier herramienta que solo extrae texto plano, se convierte en un intercalado sin sentido. La extracción consciente del diseño mantiene separadas la barra lateral y la columna principal, y por eso los datos de contacto en una barra lateral siguen cayendo en el campo correcto.",
      },
      {
        title: "Sin normalizar las habilidades, el filtro no sirve",
        body: "Extraídas textuales, obtienes 'JS', 'JavaScript', 'Javascript (ES6)' y 'JAVASCRIPT' como cuatro valores distintos, y filtrar por cualquiera de ellos pierde a los demás. Un Cleaner de categoría mapea las variantes a un vocabulario controlado, para que el filtro devuelva de verdad a todos los que califican.",
      },
      {
        title: "Son datos personales, y las reglas son más estrictas",
        body: "Una hoja de vida es dato personal por definición, y en varias jurisdicciones los datos de candidatos tienen límites de retención y derecho a eliminación. La visibilidad del Bucket y los permisos por usuario te permiten mantener los registros de candidatos restringidos a quienes llevan el proceso, en vez de visibles para toda la organización.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Los campos de tabla mantienen cada puesto y cada título como su propia fila, en vez de un solo bloque de texto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza los nombres de habilidades a un vocabulario controlado y calcula la experiencia total a partir de las fechas de cada puesto." },
      { label: "Buckets", href: "/docs/buckets", why: "Registros de candidatos como una tabla filtrable, con acceso por Bucket para que los datos de postulantes no sean visibles en toda la organización." },
      { label: "Correo electrónico", href: "/docs/email-integration", why: "Las postulaciones que llegan por correo se procesan al recibirse, adjuntos incluidos." },
    ],
    faqs: [
      { q: "¿Lee hojas de vida a dos columnas o con diseño gráfico?", a: "Sí. La extracción es consciente del diseño en vez de leer texto plano de arriba abajo, así que las barras laterales y los diseños a varias columnas no se intercalan en un texto sin sentido." },
      { q: "¿Puede estandarizar los nombres de las habilidades?", a: "Sí. Extrae textual y luego usa un Cleaner de categoría para mapear las variantes a un vocabulario controlado, para que filtrar por una habilidad devuelva a todos los candidatos que la tienen." },
      { q: "¿Cómo se protege la privacidad de los datos de los candidatos?", a: "Los Buckets pueden ser privados en vez de visibles para toda la organización, con permisos de Viewer o Editor por usuario. Los registros de candidatos quedan restringidos a las personas que llevan el proceso." },
    ],
  },
  {
    slug: "call-analytics",
    slugEs: "analisis-de-llamadas",
    label: "Análisis de llamadas",
    badge: "Ventas y soporte",
    h1: "Convierte conversaciones grabadas en datos",
    title: "Análisis de llamadas: grabaciones convertidas en datos",
    description:
      "Convierte grabaciones de ventas, soporte y mostrador en una tabla: quién dijo qué, qué reglas se cumplieron y cómo se resolvió cada conversación.",
    summary: "Grabaciones de ventas, soporte y mostrador convertidas en una tabla de turnos, reglas y resultados.",
    lede: "Tavnit Signals convierte grabaciones de audio en una tabla plana. Separa a los hablantes, divide una grabación en sus conversaciones distintas, clasifica cada una y evalúa tus reglas y campos de extracción turno por turno — así un día de llamadas se vuelve filas que puedes filtrar, en lugar de horas que tienes que escuchar.",
    problem: [
      "Las conversaciones son donde ocurre la mayor parte de lo que una empresa aprende, y casi nada de eso se captura. Las grabaciones existen, pero revisarlas significa escucharlas, así que en la práctica un gerente toma una muestra de unas pocas y generaliza a partir de ellas.",
      "Donde sí hay control de calidad, es una persona con una hoja de puntuación llenando un formulario después de cada llamada — costoso, inconsistente entre revisores y cubriendo apenas una fracción del volumen.",
    ],
    fields: [
      { name: "Tipo de interacción", note: "Una grabación suele contener varias conversaciones. Cada una se clasifica — venta, soporte, devolución — o se marca como otra." },
      { name: "Rol del hablante", note: "Los turnos se atribuyen a los participantes esperados, como vendedor o cliente; las voces inesperadas se etiquetan como otro." },
      { name: "Reglas por turno", note: "Verificaciones de sí/no aplicadas a cada turno — se mencionó la promoción, se leyó el aviso legal." },
      { name: "Campos de extracción", note: "Datos que se toman de cada turno, como productos mencionados u objeciones planteadas." },
      { name: "Categorías de contenido", note: "Cada turno etiquetado — objeción, pregunta, problema, solución, agradecimiento — para que los patrones se puedan contar." },
      { name: "Resultado de la conversación", note: "Se juzga una sola vez sobre toda la conversación: se cerró la venta, se resolvió el problema." },
    ],
    gotchas: [
      {
        title: "Una grabación no es una conversación",
        body: "La grabación de una jornada completa en un mostrador o en una línea de soporte contiene muchos intercambios separados. Tratar el archivo como una sola conversación produce promedios que no describen nada. Las grabaciones se dividen primero en interacciones distintas, cada una clasificada y evaluada por su cuenta — el equivalente en audio de separar un PDF que trae varios documentos.",
      },
      {
        title: "Las preguntas por turno y por conversación son preguntas distintas",
        body: "“¿Se mencionó el descuento?” se pregunta en cada turno y puede ser cierto varias veces. “¿Se cerró la venta?” se pregunta una sola vez sobre todo el intercambio. Mezclarlas te da una métrica que cuenta menciones cuando querías resultados, así que las dos se evalúan por separado y la respuesta a nivel de conversación se repite en todas las filas de esa interacción.",
      },
      {
        title: "Grabar a personas tiene reglas",
        body: "Los requisitos de consentimiento y retención para grabar llamadas varían según la jurisdicción y son más estrictos que para documentos. Esa es tu obligación, no algo que el pipeline decida — pero la visibilidad por Bucket y los permisos de acceso te permiten mantener transcripciones y resultados restringidos a las personas que los necesitan.",
      },
    ],
    pipeline: [
      { label: "Buckets", href: "/docs/buckets", why: "Las grabaciones completadas se exportan a un Bucket automáticamente, así las llamadas se acumulan en algo que puedes consultar y graficar." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Envía la tabla de salida a tus propios sistemas en cuanto una grabación termina de procesarse." },
      { label: "Roles de usuario", href: "/docs/user-roles", why: "Los datos de conversaciones son sensibles; los roles y los permisos por Bucket los mantienen entre las personas que llevan el programa." },
    ],
    faqs: [
      { q: "¿Qué formatos de audio acepta?", a: "Se pueden subir y procesar grabaciones en MP3, WAV y FLAC." },
      { q: "¿Puede manejar una grabación con muchas conversaciones separadas?", a: "Sí. Una grabación se divide primero en sus interacciones distintas, y cada una se clasifica y evalúa por separado — así una jornada completa en un mostrador produce resultados por conversación en lugar de un promedio mezclado." },
      { q: "¿Puedo evaluar todas las llamadas en lugar de una muestra?", a: "Sí. Las reglas se evalúan en cada turno de cada grabación procesada, y esa es la diferencia práctica frente al control de calidad manual — cobertura completa en lugar de una muestra." },
    ],
  },
];

/** Keyed by the English slug — the pairing key for hreflang. */
export const USE_CASE_ES_BY_SLUG: Record<string, UseCaseEs> = Object.fromEntries(
  USE_CASES_ES.map((u) => [u.slug, u]),
);

/** Keyed by the Spanish URL segment — what /es/casos-de-uso/[slug] receives. */
export const USE_CASE_ES_BY_SLUG_ES: Record<string, UseCaseEs> = Object.fromEntries(
  USE_CASES_ES.filter((u) => !u.path).map((u) => [u.slugEs, u]),
);
