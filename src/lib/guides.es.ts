import type { Guide } from "@/lib/guides";

/**
 * Spanish guides — twins of entries in src/lib/guides.ts, keyed by the
 * English `slug` for hreflang and served at /es/guias/<slugEs>.
 *
 * Not every English guide has a Spanish twin, and that is intended: a guide
 * exists here only when the Spanish-speaking market asks the question. The
 * tariff-classification guide is the priority — the classifier is built on
 * Panama's Arancel Nacional and the searchers are Panamanian brokers — and
 * PO matching is the highest-demand topic on the site overall. The other
 * English guides are linked from the hub as "en inglés" rather than
 * translated for completeness.
 *
 * Same rules as guides.ts: vendor-neutral until the last section, fixed
 * `published`, `updated` bumped only for substantive edits, and the register
 * of .agents/product-marketing.md.
 */
export type GuideEs = Guide & { slugEs: string };

export function esGuidePath(g: Pick<GuideEs, "slugEs">): string {
  return `/es/guias/${g.slugEs}`;
}

export const GUIDES_ES: GuideEs[] = [
  {
    slug: "hs-code-classification-explained",
    slugEs: "clasificacion-arancelaria",
    title: "Clasificación arancelaria: qué es y cómo automatizarla",
    h1: "Clasificación arancelaria: qué es, cómo se decide y cómo automatizarla",
    description:
      "Qué es el Sistema Armonizado, por qué clasificar es un juicio y no una búsqueda, qué son las RGI y las notas legales, y cómo automatizarlo con responsabilidad.",
    lede: "La clasificación arancelaria asigna a cada mercancía un código del Sistema Armonizado, la nomenclatura internacional con la que las aduanas determinan derechos, impuestos y controles. Los seis primeros dígitos son universales; cada país los extiende a ocho, diez o más dígitos en sus líneas arancelarias nacionales. Una fracción equivocada es el impuesto equivocado, un embarque retenido o una multa.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "Cómo está construido el Sistema Armonizado",
        paragraphs: [
          "El Sistema Armonizado (SA) lo mantiene la Organización Mundial de Aduanas y se revisa aproximadamente cada cinco años; la edición vigente es el SA 2022. Se organiza en 21 secciones, 97 capítulos (2 dígitos), partidas (4 dígitos) y subpartidas (6 dígitos). Esos seis dígitos son idénticos en todos los países miembros, y eso es lo que hace que el sistema sea armonizado. A partir del sexto dígito, cada país agrega sus propias subdivisiones — las líneas arancelarias nacionales — y es a esas líneas a las que se atan los derechos de importación y los impuestos internos.",
          "El Arancel Nacional de Importación de Panamá, por ejemplo, extiende la nomenclatura del SA 2022 (VII Enmienda) en 9,671 líneas arancelarias nacionales, cada una con su derecho de importación (DAI), su ITBMS y, cuando aplica, su impuesto selectivo al consumo (ISC). Una clasificación no termina a seis dígitos; termina cuando cae en la fracción arancelaria nacional que determina lo que se paga.",
        ],
      },
      {
        heading: "Por qué clasificar es un juicio, no una búsqueda",
        paragraphs: [
          "Si clasificar fuera buscar en un diccionario — entra el nombre del producto, sale el código — se habría automatizado hace décadas. No lo es, porque la nomenclatura clasifica la mercancía por su materia, su función y la forma en que se presenta, y una misma descripción comercial puede encajar de manera plausible en varias partidas. ¿Una funda de asiento de auto con calefacción es un artículo textil, una parte de vehículo o un aparato eléctrico de calentamiento? Cada opción tiene una tasa distinta.",
          "Los criterios de desempate son las Reglas Generales para la Interpretación del Sistema Armonizado, las RGI. La Regla 1 establece que mandan los textos de las partidas y las notas legales de sección y de capítulo. La Regla 2 cubre los artículos incompletos y las mezclas. La Regla 3 resuelve la mercancía que podría caer en dos o más partidas: primero la descripción más específica, luego el carácter esencial y, si no, la partida que va última en orden numérico. Las Reglas 4 a 6 tratan la mercancía no comprendida en otra parte, los envases y la clasificación a nivel de subpartida. Una clasificación defendible cita la regla en la que se apoyó.",
          "Después están las notas legales: notas de sección y de capítulo que incluyen o excluyen mercancía específica de una partida sin importar lo que el texto de la partida parezca decir. Un clasificador que lee los títulos de las partidas e ignora las notas se va a equivocar con toda confianza en un conjunto predecible de productos.",
        ],
      },
      {
        heading: "Dónde falla la clasificación en la práctica",
        paragraphs: [
          "La mayoría de las clasificaciones erróneas no son un caso difícil de RGI 3. Son un producto rutinario mal descrito. La factura comercial dice “partes”, “muestras” o una marca, y quien clasifica adivina o se detiene a preguntar. La descripción es la materia prima de la clasificación, y suele ser el insumo más débil de todo el proceso.",
        ],
        bullets: [
          "Descripciones vagas en la factura comercial — una marca o un número de modelo sin decir qué es el artículo ni de qué está hecho.",
          "Embarques mixtos donde una sola línea de la factura cubre varios productos distintos que se clasifican de forma diferente.",
          "Confiar en el código SA que declaró el proveedor, que fue clasificado bajo el arancel de otro país y posiblemente para otro propósito.",
          "Reutilizar la fracción del año pasado después de que un cambio de edición del SA movió el producto.",
          "Ignorar las notas de capítulo y clasificar solo a partir del título de la partida.",
          "No dejar registro de por qué se eligió una fracción, de modo que el mismo producto termina clasificado de tres formas por tres personas.",
        ],
      },
      {
        heading: "Cómo se ve una automatización responsable",
        paragraphs: [
          "El objetivo no es una máquina que clasifique sin supervisión. La legislación aduanera pone la declaración en manos del importador o del corredor de aduana autorizado, y lo seguirá haciendo. El objetivo es un sistema que proponga una clasificación con su razonamiento en el momento en que se procesa la documentación del embarque, para que el especialista revise en lugar de investigar.",
        ],
        bullets: [
          "Partir de la descripción de la mercancía extraída de forma textual, más cualquier detalle de material, función y composición que traiga la factura o la lista de empaque.",
          "Clasificar contra el arancel nacional — el conjunto completo de líneas nacionales con sus tasas — y no solo contra los seis dígitos del SA, y siempre contra la edición vigente.",
          "Aplicar las notas legales de capítulo y de sección y las RGI, y registrar qué regla y qué nota decidieron el caso.",
          "Devolver una fracción, un nivel de confianza y el razonamiento; enviar las líneas de baja confianza o de alto valor a un corredor para revisión antes de presentar la declaración.",
          "Conservar una bitácora de auditoría por cada clasificación. Cuando la aduana pregunte por una fracción dos años después, el razonamiento es la defensa.",
          "Aprender de las correcciones del corredor: un producto clasificado una vez debe clasificarse igual la próxima vez.",
        ],
      },
    ],
    tavnit: {
      heading: "Dónde entra Tavnit",
      paragraphs: [
        "Tavnit extrae el juego de documentos del embarque — factura comercial, lista de empaque, conocimiento de embarque, certificado de origen — como campos tipificados, y luego un Cleaner de clasificación arancelaria clasifica cada línea de mercancía a partir de la descripción extraída, en el mismo Run. Para Panamá, el clasificador trabaja sobre el Arancel Nacional de Importación oficial (VII Enmienda, SA 2022) con sus líneas nacionales y las tasas de DAI, ITBMS e ISC, aplicando las notas legales de capítulo y las RGI, de modo que el resultado es una fracción arancelaria nacional con su razonamiento y no una adivinanza a seis dígitos.",
        "Cada clasificación pasa por revisión humana antes de que se presente cualquier cosa, con una bitácora de auditoría de solo anexar que registra quién aprobó qué fracción. Los datos estructurados y ya clasificados pueden entonces pre-llenar el formulario de la declaración en lugar de volver a tipearse.",
      ],
      links: [
        { label: "Aduanas y clasificación arancelaria para Panamá", href: "/es/aduanas" },
        { label: "Customs automation — en inglés", href: "/use-cases/customs-trade" },
        { label: "Cleaners — tipo de campo de código arancelario (docs en inglés)", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "¿Cuál es la diferencia entre el código SA y la fracción arancelaria?", a: "El código SA son los seis dígitos internacionales que define la Organización Mundial de Aduanas. La fracción arancelaria es la extensión que hace cada país — ocho, diez o más dígitos — y a la que se atan los derechos y los impuestos nacionales. El Arancel Nacional de Panamá, el TARIC de la Unión Europea y el HTS de Estados Unidos son aranceles nacionales construidos sobre el SA." },
      { q: "¿Puede la inteligencia artificial clasificar fracciones arancelarias con precisión?", a: "Puede proponer buenas clasificaciones cuando parte de una descripción de producto adecuada, trabaja contra el arancel nacional completo con sus notas legales y explica su razonamiento. Lo que no debe hacer es presentar declaraciones sin supervisión: el enfoque responsable es una propuesta con nivel de confianza y razonamiento, revisada por un corredor de aduana autorizado en las líneas de baja confianza o de alto valor." },
      { q: "¿Puedo usar el código SA que mi proveedor puso en la factura?", a: "Tómalo como una pista, no como una respuesta. El proveedor clasificó bajo el arancel de su propio país, posiblemente para control de exportaciones y no para derechos de importación, y posiblemente con una edición anterior del SA. La responsabilidad de la fracción en la declaración de importación es del importador o del corredor." },
    ],
  },
  {
    slug: "how-to-match-invoices-to-purchase-orders",
    slugEs: "conciliar-facturas-con-ordenes-de-compra",
    title: "Cómo conciliar facturas con órdenes de compra (2 y 3 vías)",
    h1: "Cómo conciliar facturas con órdenes de compra",
    description:
      "Qué es conciliar facturas con órdenes de compra (PO matching), en qué difieren dos y tres vías, por qué falla a mano y cómo automatizarlo sin cambiar tu ERP.",
    lede: "La conciliación de facturas con órdenes de compra verifica que la factura de un proveedor coincida con la orden que cobra: mismo proveedor, mismos artículos, mismas cantidades, mismos precios. La de dos vías compara factura contra orden; la de tres vías agrega la nota de recepción. Es el control que evita pagar lo que no se pidió o no llegó.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "Qué verifica realmente la conciliación con la orden de compra",
        paragraphs: [
          "Una orden de compra (OC) es una promesa de comprar; una factura es una solicitud de pago. Conciliarlas responde una sola pregunta — ¿esta factura está cobrando exactamente lo que acordamos? — en cuatro dimensiones: el proveedor, los artículos, las cantidades y los precios unitarios. Una quinta, los totales, es consecuencia de las otras cuatro y es lo menos útil de verificar por sí solo.",
          "Los totales son una verificación débil porque coinciden por accidente más seguido de lo que esperarías. Una factura que cobra diez unidades a $12 en lugar de doce unidades a $10 tiene el total correcto y todo lo demás incorrecto. La conciliación a nivel de encabezado atrapa la factura que no tiene OC; solo la conciliación línea por línea atrapa la factura con las líneas equivocadas.",
        ],
      },
      {
        heading: "Conciliación de dos vías y de tres vías",
        paragraphs: [
          "La conciliación de dos vías compara la factura contra la orden de compra. Confirma que acordaste comprar esto, a este precio. No confirma que lo recibiste, y por eso suele reservarse para servicios, suscripciones y bienes de bajo valor, donde el costo de un paso de recepción pesa más que el riesgo.",
          "La conciliación de tres vías agrega la nota de recepción — la nota de entrega, la lista de empaque o el recibo de almacén que registra lo que llegó físicamente. Ahora la factura tiene que coincidir tanto con lo que se pidió como con lo que se recibió. Un proveedor que despacha ocho y cobra diez se atrapa aquí y en ningún otro lado. Es el estándar para bienes físicos, y la mayoría de los marcos de auditoría la exigen por encima de un umbral de materialidad.",
          "Algunos equipos hablan de conciliación de cuatro vías, agregando un registro de inspección o de aceptación de calidad. Es la misma idea con un documento más, y aplica la misma mecánica.",
        ],
      },
      {
        heading: "Por qué falla la conciliación manual",
        paragraphs: [
          "La orden de compra está estructurada: salió de tu propio sistema. La factura no. Llegó como PDF desde el sistema del proveedor, con el formato del proveedor, con los números de parte del proveedor y con la descripción que el proveedor le da a cada artículo. Antes de que pueda haber cualquier comparación, alguien tiene que leer ese PDF y traducirlo a la misma forma que la OC. En la mayoría de los equipos de cuentas por pagar, esa traducción es una persona con dos ventanas abiertas.",
          "Por ahí entran los errores. La comparación en sí no es difícil; una hoja de cálculo la hace. La transcripción sí es difícil, porque es repetitiva, los formatos cambian de proveedor a proveedor, y una cantidad equivocada se ve exactamente igual que una correcta. La falla de conciliación que viven la mayoría de las empresas no es una falla de la lógica de conciliación. Es una falla de captura de datos antes de llegar a ella.",
        ],
        bullets: [
          "Los números de parte del proveedor no coinciden con tus SKU internos, así que emparejar líneas exige una tabla de equivalencias que nadie mantiene.",
          "Las descripciones cambian de redacción — “Tornillo azul 10 unid.” contra “TORN-AZL x10” — y la comparación por texto exacto falla con artículos que son el mismo.",
          "La unidad de medida y el tamaño del empaque cambian la aritmética: 1 caja de 12 contra 12 unidades.",
          "Las entregas parciales y las facturas divididas hacen que una OC corresponda a varias facturas, y la conciliación pasa a ser de varios a uno.",
          "El flete, los recargos y los impuestos aparecen en la factura pero no en la OC, y hay que clasificarlos como diferencias aceptables y no como discrepancias.",
        ],
      },
      {
        heading: "Tolerancias: decidir qué cuenta como discrepancia",
        paragraphs: [
          "Ninguna conciliación real es exacta. Los precios se cotizan antes de que se mueva una moneda; los proveedores redondean; el flete se estima. Un proceso de conciliación que detiene cada factura por una diferencia de un centavo se va a apagar en menos de un mes. La solución es una política de tolerancias: una regla, acordada de antemano, sobre cuánta variación es aceptable en cada dimensión antes de retener la factura.",
          "Las políticas típicas permiten una variación pequeña — porcentual o absoluta — en el precio unitario, variación cero en la cantidad para bienes físicos, y un margen aparte para las líneas de flete y recargos. Lo importante es que la regla esté escrita y la aplique el sistema, no que la decida quien esté conciliando ese día. Las facturas dentro de la tolerancia fluyen; las que quedan fuera se detienen y pasan a una persona.",
        ],
      },
      {
        heading: "Cómo automatizarla, paso a paso",
        paragraphs: [
          "La automatización no empieza con un software de conciliación. Empieza por llevar los dos documentos a la misma forma estructurada, para que la comparación sea una consulta y no una lectura.",
        ],
        bullets: [
          "Define un solo esquema de campos para los documentos de compra: número de OC, proveedor, SKU de la línea, descripción, cantidad, precio unitario, importe de la línea, total. Úsalo por igual para las OC, las facturas y las notas de entrega.",
          "Extrae cada factura entrante a ese esquema. Es el paso que la mayoría de los equipos se salta, y es el paso que hace posible todo lo que viene después.",
          "Normaliza los números de parte del proveedor a tus SKU con una búsqueda contra tu maestro de artículos; donde no exista una equivalencia, empareja las líneas por similitud semántica de la descripción y no por texto exacto.",
          "Verifica primero la factura contra sí misma: ¿precio unitario por cantidad da el importe de la línea, y las líneas suman el total? Los errores aritméticos son los más baratos de atrapar y los más vergonzosos de pagar.",
          "Concilia los campos de encabezado por el número de OC, y después concilia las líneas dentro de la OC emparejada. Aplica tu política de tolerancias por dimensión.",
          "Envía solo las excepciones a un revisor, con la factura, la OC y la discrepancia concreta frente a él. Las que coinciden, contabilízalas directo en el ERP.",
          "Conserva una bitácora de auditoría de quién aprobó qué y cuándo. La piden los auditores; también el proveedor cuando disputa un pago incompleto.",
        ],
      },
    ],
    tavnit: {
      heading: "Dónde entra Tavnit",
      paragraphs: [
        "Tavnit hace la extracción y le da forma a los datos. Las órdenes de compra, las facturas y las notas de entrega llegan por correo o por API y se extraen a los mismos campos tipificados, sea cual sea el formato del proveedor. Un Cleaner de búsqueda mapea los números de parte del proveedor a tus SKU; un Cleaner de fórmula verifica la aritmética de cada línea; una condición marca todo lo que quede fuera de tu tolerancia.",
        "Para la conciliación línea por línea, un Matcher toma el Run de la OC como referencia y empareja con él cada línea de la factura — de forma semántica, con un LLM como desempate para los pares dudosos — poniendo cantidad y precio unitario lado a lado y listando las líneas sin pareja como advertencias. Las facturas marcadas se detienen para un revisor con nombre, con una bitácora de auditoría de solo anexar; el resto va a tu ERP por API o webhook.",
      ],
      links: [
        { label: "Conciliación de órdenes de compra", href: "/es/casos-de-uso/ordenes-de-compra" },
        { label: "Facturas de proveedores", href: "/es/casos-de-uso/facturas-de-proveedores" },
        { label: "Notas de entrega y recepción de mercancía", href: "/es/casos-de-uso/notas-de-entrega" },
      ],
    },
    faqs: [
      { q: "¿Cuál es la diferencia entre conciliación de dos vías y de tres vías?", a: "La de dos vías compara la factura con la orden de compra: ¿acordamos comprar esto a este precio? La de tres vías compara además contra la nota de recepción: ¿de verdad llegó? La de tres vías es el estándar para bienes físicos; la de dos vías es común en servicios y compras de bajo valor." },
      { q: "¿Se puede automatizar por completo la conciliación de facturas con órdenes de compra?", a: "La comparación sí. La parte que se resiste a la automatización es llevar el PDF de la factura del proveedor a la misma forma estructurada que tu OC, porque el formato, los números de parte y las descripciones cambian con cada proveedor. Una vez que la extracción está automatizada, conciliar es una consulta, y solo las excepciones necesitan a una persona." },
      { q: "¿Qué tolerancia debo fijar para conciliar facturas con órdenes de compra?", a: "No hay un número universal. La mayoría de las políticas permiten una variación pequeña — porcentual o absoluta — en el precio unitario, variación cero en la cantidad para bienes físicos, y tratan el flete y los recargos como líneas aceptables aparte. Lo importante es que la regla esté escrita y que el sistema la aplique de forma consistente." },
    ],
  },
];

/** Keyed by the English slug — the hreflang pairing key. */
export const GUIDE_ES_BY_SLUG: Record<string, GuideEs> = Object.fromEntries(
  GUIDES_ES.map((g) => [g.slug, g]),
);

export const GUIDE_ES_BY_SLUG_ES: Record<string, GuideEs> = Object.fromEntries(
  GUIDES_ES.map((g) => [g.slugEs, g]),
);
