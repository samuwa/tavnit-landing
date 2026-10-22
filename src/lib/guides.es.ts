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
/**
 * `spanishOnly`: the guide has no English twin. Its `slug` then equals
 * `slugEs` (it is only a key), the page emits no hreflang pair and the
 * sitemap lists it as a plain URL. Used for the tariff-classification
 * cluster, where the searches are Spanish and Panamanian (RGI, notas
 * legales, partida arancelaria) and an English version would be a
 * translation nobody asked for.
 */
export type GuideEs = Guide & { slugEs: string; spanishOnly?: true };

export function esGuidePath(g: Pick<GuideEs, "slugEs">): string {
  return `/es/guias/${g.slugEs}`;
}

export const GUIDES_ES: GuideEs[] = [
  {
    slug: "hs-code-classification-explained",
    slugEs: "clasificacion-arancelaria",
    title: "Clasificación arancelaria: qué es, RGI y 2 ejemplos",
    h1: "Clasificación arancelaria: qué es, cómo se determina la partida con las RGI y dos ejemplos resueltos",
    description:
      "Qué es la clasificación arancelaria, cómo se determina la partida con las RGI 1 a 6 y las notas legales, y dos ejemplos resueltos paso a paso.",
    lede: "La clasificación arancelaria asigna a cada mercancía un código del Sistema Armonizado, la nomenclatura internacional con la que las aduanas determinan derechos, impuestos y controles. Los seis primeros dígitos son universales; cada país los extiende a ocho, diez o más dígitos en sus líneas arancelarias nacionales. Una fracción equivocada es el impuesto equivocado, un embarque retenido o una multa.",
    published: "2026-09-08",
    updated: "2026-10-21",
    readingMinutes: 9,
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
        heading: "Dos ejemplos resueltos, paso a paso",
        paragraphs: [
          "La secuencia es siempre la misma: describir la mercancía por materia, función y presentación; ubicar la sección y el capítulo; leer sus notas legales; elegir la partida de cuatro dígitos por el texto (RGI 1); bajar a la subpartida de seis (RGI 6); y terminar en la fracción nacional que fija los impuestos. Dos casos muestran cómo cambia el camino según el producto.",
          "Una computadora portátil. La factura dice “notebook 14 pulgadas, 16 GB”. Es una máquina, así que Sección XVI, capítulo 84. La nota de capítulo define qué cuenta como máquina automática para tratamiento de datos, y el producto cumple. Partida 84.71 por el texto de la partida (RGI 1). Subpartida 8471.30: máquinas portátiles de peso inferior o igual a 10 kg con unidad central, teclado y visualizador (RGI 6). Desde ahí, el arancel nacional agrega los dígitos que fijan el DAI y el ITBMS. No hubo que desempatar nada: la descripción era suficiente y el texto de la partida decidió.",
          "Un juego de peluquería en estuche de cuero: máquina eléctrica de cortar el pelo, tijeras, peine, cepillo y toalla, vendido como un conjunto. Cada artículo por separado cae en una partida distinta. Como se presenta acondicionado para la venta al por menor y responde a una misma necesidad, se clasifica como un todo por el artículo que le da el carácter esencial (RGI 3 b): la máquina de cortar el pelo, partida 85.10. El estuche va con el conjunto y no aparte (RGI 5 a). Este es el ejemplo que usan las propias notas explicativas del SA, y es el tipo de caso donde dos personas sin un criterio escrito llegan a dos fracciones distintas.",
        ],
        bullets: [
          "Materia, función y presentación antes que el nombre comercial: “notebook” no clasifica, “máquina portátil de tratamiento de datos de menos de 10 kg” sí.",
          "Las notas de sección y de capítulo se leen antes de elegir la partida, no después.",
          "Cuando el producto cabe en dos partidas, la RGI 3 decide en orden: la descripción más específica, luego el carácter esencial, y por último la partida que va última en orden numérico.",
          "La clasificación no termina en seis dígitos. Termina en la fracción del arancel nacional, y esa fracción es la que se declara.",
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
        { label: "Las seis RGI explicadas con ejemplos", href: "/es/guias/reglas-generales-de-interpretacion-rgi" },
        { label: "Notas legales de sección y capítulo", href: "/es/guias/notas-legales-de-seccion-y-capitulo" },
        { label: "Partida arancelaria: cinco ejemplos resueltos", href: "/es/guias/partida-arancelaria-ejemplos" },
        { label: "Aduanas y clasificación arancelaria para Panamá", href: "/es/aduanas" },
        { label: "Customs automation — en inglés", href: "/use-cases/customs-trade" },
        { label: "Cleaners — tipo de campo de código arancelario (docs en inglés)", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "¿Qué es una partida arancelaria?", a: "En el Sistema Armonizado, la partida es el nivel de cuatro dígitos (84.71, por ejemplo) y la subpartida el de seis. En Panamá y en buena parte de Centroamérica, “partida arancelaria” se usa también para la fracción nacional completa, la línea de ocho o más dígitos a la que se atan el DAI, el ITBMS y el ISC. Cuando alguien pide “la partida” de un producto, casi siempre quiere esa fracción nacional, no solo los cuatro dígitos." },
      { q: "¿Cuál es la diferencia entre el código SA y la fracción arancelaria?", a: "El código SA son los seis dígitos internacionales que define la Organización Mundial de Aduanas. La fracción arancelaria es la extensión que hace cada país — ocho, diez o más dígitos — y a la que se atan los derechos y los impuestos nacionales. El Arancel Nacional de Panamá, el TARIC de la Unión Europea y el HTS de Estados Unidos son aranceles nacionales construidos sobre el SA." },
      { q: "¿Puede la inteligencia artificial clasificar fracciones arancelarias con precisión?", a: "Puede proponer buenas clasificaciones cuando parte de una descripción de producto adecuada, trabaja contra el arancel nacional completo con sus notas legales y explica su razonamiento. Lo que no debe hacer es presentar declaraciones sin supervisión: el enfoque responsable es una propuesta con nivel de confianza y razonamiento, revisada por un corredor de aduana autorizado en las líneas de baja confianza o de alto valor." },
      { q: "¿Qué son las RGI 1 a 6 y en qué orden se aplican?", a: "Las Reglas Generales para la Interpretación del Sistema Armonizado se aplican en orden. RGI 1: mandan los textos de las partidas y las notas legales de sección y capítulo; la mayoría de los productos se clasifica aquí. RGI 2: artículos incompletos o sin montar y mezclas de materias. RGI 3: cuando el producto cabe en dos o más partidas, primero la descripción más específica (3 a), luego el carácter esencial (3 b) y, si no, la partida que va última en orden numérico (3 c). RGI 4: la mercancía que no encaja en ninguna partida se clasifica con la más análoga. RGI 5: estuches y envases. RGI 6: la clasificación a nivel de subpartida, comparando solo subpartidas del mismo nivel." },
      { q: "¿Qué son las notas legales en la clasificación arancelaria?", a: "Son las notas de sección y de capítulo que forman parte del texto legal del arancel. Incluyen o excluyen mercancía concreta de una partida sin importar lo que el título de la partida parezca decir, y definen términos (qué cuenta como “máquina”, “parte” o “juego”). Por la RGI 1 tienen la misma fuerza que los textos de las partidas, así que se leen antes de elegir la partida, no después. Ignorarlas es la causa más común de una fracción equivocada en productos rutinarios." },
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
  // ---- Clúster de clasificación arancelaria (solo en español) ----
  // Search Console, oct 2026: "rgi aduana", "rgi 1 y 6", "rgi 3", "que es rgi en
  // aduanas", "que son las notas legales en la clasificacion arancelaria",
  // "criterios de clasificación arancelaria", "partida arancelaria ejemplo",
  // "dame la partida arancelaria", "clasificacion arancelaria de este producto".
  {
    slug: "reglas-generales-de-interpretacion-rgi",
    slugEs: "reglas-generales-de-interpretacion-rgi",
    spanishOnly: true,
    title: "Reglas Generales de Interpretación (RGI) con ejemplos",
    h1: "Las seis Reglas Generales de Interpretación (RGI) explicadas con ejemplos",
    description:
      "Qué dice cada una de las seis RGI del Sistema Armonizado, en qué orden se aplican y un ejemplo resuelto por regla, de la RGI 1 a la RGI 6.",
    lede: "Las Reglas Generales de Interpretación (RGI) son las seis reglas, parte del texto legal del Sistema Armonizado, que dicen cómo se clasifica una mercancía cuando el nombre comercial no basta. Se aplican en orden: la RGI 1 resuelve la mayoría de los casos con el texto de la partida y las notas legales; la 2 y la 3 cubren los artículos incompletos, las mezclas y los conjuntos; la 4 lo que no encaja en ninguna partida; la 5 los estuches y envases; y la 6 la subpartida.",
    published: "2026-10-21",
    updated: "2026-10-21",
    readingMinutes: 9,
    sections: [
      {
        heading: "Qué son las RGI y por qué son ley",
        paragraphs: [
          "El Sistema Armonizado no es solo una lista de códigos. Es un convenio internacional de la Organización Mundial de Aduanas, y el texto legal que todos los países miembros adoptan tiene tres partes: las Reglas Generales de Interpretación, las notas legales de sección, capítulo y subpartida, y los textos de las partidas y subpartidas. Las RGI van primero porque son las instrucciones de uso de todo lo demás.",
          "Panamá aplica el SA 2022 a través del Arancel Nacional de Importación (VII Enmienda), que reproduce las seis reglas al inicio. Por eso una clasificación que cita la RGI en la que se apoyó es defendible ante la aduana, y una que solo dice “es lo que más se parece” no. Las notas explicativas de la OMA ayudan a interpretar, pero no son ley; las RGI sí.",
          "La regla más importante sobre las reglas es el orden: se aplican una tras otra, y solo se pasa a la siguiente cuando la anterior no resuelve. La mayoría de las mercancías se clasifica con la RGI 1 y termina con la RGI 6. Las reglas 2 a 5 existen para los casos intermedios.",
        ],
      },
      {
        heading: "RGI 1: los textos de las partidas y las notas legales mandan",
        paragraphs: [
          "Los títulos de las secciones, de los capítulos y de los subcapítulos solo tienen valor indicativo. La clasificación se determina legalmente por los textos de las partidas y por las notas de sección o de capítulo, y, si no son contrarias a esos textos, por las reglas siguientes. Eso dice la RGI 1, y es la regla con la que se resuelve casi todo.",
          "Ejemplo. Una camiseta de punto, de algodón. El texto de la partida 61.09 dice “T-shirts y camisetas interiores, de punto”. La nota 1 del Capítulo 61 confirma que el capítulo solo cubre prendas de punto. El producto cumple el texto de la partida y la nota: partida 61.09 por RGI 1, sin necesidad de ninguna otra regla. Lo que sí hace falta es leer la nota, porque si la camiseta fuera tejida (no de punto) saldría del Capítulo 61 y se iría al 62.",
          "El error típico con la RGI 1 es clasificar por el título del capítulo. “Capítulo 84: máquinas” suena a que cualquier aparato va ahí; el título no clasifica nada, los textos de las partidas sí.",
        ],
      },
      {
        heading: "RGI 2: artículos incompletos, sin montar y mezclas",
        paragraphs: [
          "La RGI 2 a) dice que la referencia a un artículo en una partida alcanza también al artículo incompleto o sin terminar, siempre que presente las características esenciales del artículo completo, y al artículo completo o terminado que se presente desmontado o sin montar todavía. Una bicicleta que viaja en caja, desarmada, se clasifica como bicicleta en la partida 87.12, no como un lote de partes. Un vehículo sin motor sigue siendo un vehículo.",
          "La RGI 2 b) extiende la referencia a una materia (“de madera”, “de caucho”) a las mezclas y asociaciones de esa materia con otras, y la referencia a un producto de una materia determinada a los productos constituidos total o parcialmente por ella. Pero añade lo importante: cuando por esa extensión el producto cabe en dos o más partidas, se clasifica por la RGI 3. Es decir, la RGI 2 b) abre la puerta a la RGI 3; no la cierra.",
        ],
        bullets: [
          "Desmontado o sin montar: se clasifica como el artículo completo (RGI 2 a).",
          "Incompleto con el carácter esencial del completo: igual que el completo (RGI 2 a).",
          "Mezcla o combinación de materias: la partida de la materia se extiende, y si aparecen dos partidas posibles, se resuelve con la RGI 3 (RGI 2 b).",
        ],
      },
      {
        heading: "RGI 3: cuando la mercancía cabe en dos o más partidas",
        paragraphs: [
          "Es la regla que resuelve la mayoría de los casos difíciles, y tiene tres pasos que también se aplican en orden. RGI 3 a): la partida más específica tiene prioridad sobre la más genérica. Las alfombras textiles diseñadas para automóvil podrían ser “partes y accesorios de vehículos” (87.08) o “alfombras y demás revestimientos textiles para el suelo” (57.03); la segunda describe el producto con más precisión y gana. Cuando dos partidas se refieren cada una a solo una parte de las materias o de los artículos del conjunto, se consideran igual de específicas y se pasa al siguiente paso.",
          "RGI 3 b): las mezclas, los productos compuestos de materias diferentes y los surtidos acondicionados para la venta al por menor se clasifican por la materia o el artículo que les confiere el carácter esencial. El ejemplo de las propias notas explicativas: un paquete con espagueti crudo, un sobre de queso rallado y una lata pequeña de salsa de tomate, vendido como un solo producto, se clasifica como pasta (19.02), porque la pasta es lo que le da el carácter al conjunto. Un juego de peluquería con máquina eléctrica de cortar el pelo, tijeras, peine y cepillo en estuche va con la máquina (85.10).",
          "RGI 3 c): si ni la 3 a) ni la 3 b) resuelven, la mercancía se clasifica en la última partida por orden de numeración entre las que podrían considerarse. Es la regla de desempate final, y rara vez se llega a ella; cuando se llega, hay que poder explicar por qué ninguna materia da el carácter esencial.",
        ],
      },
      {
        heading: "RGI 4: la mercancía que no encaja en ninguna partida",
        paragraphs: [
          "Si una mercancía no puede clasificarse con las reglas anteriores, se clasifica en la partida de los artículos con los que tenga mayor analogía. En la práctica se usa muy poco, porque casi todos los capítulos terminan en una partida o subpartida “los demás” que recoge lo que no tiene texto propio. Los productos nuevos de verdad tienden a vivir un tiempo en esos “los demás” hasta que una enmienda del SA les da sitio: el SA 2022 creó, por ejemplo, la subpartida 8517.13 para los teléfonos inteligentes y la 8543.40 para los cigarrillos electrónicos.",
        ],
      },
      {
        heading: "RGI 5: estuches y envases",
        paragraphs: [
          "RGI 5 a): los estuches para cámaras, instrumentos musicales, armas, instrumentos de dibujo, collares y continentes similares, especialmente diseñados para contener un artículo determinado, susceptibles de uso prolongado y presentados con el artículo, se clasifican con él. Un estuche de guitarra vendido con la guitarra es guitarra. La excepción: si el continente es el que da el carácter esencial al conjunto (un estuche de plata con un peine barato), se clasifica por el estuche.",
          "RGI 5 b): los envases que normalmente se usan para esa clase de mercancía se clasifican con ella. Salvo que sean claramente reutilizables: los cilindros de gas se clasifican como cilindros, no como gas.",
        ],
      },
      {
        heading: "RGI 6: la subpartida",
        paragraphs: [
          "Las cinco primeras reglas llegan hasta la partida de cuatro dígitos. La RGI 6 dice que la clasificación en las subpartidas de una misma partida se determina por los textos de esas subpartidas y las notas de subpartida, aplicando las reglas anteriores con los cambios necesarios, y entendiendo que solo pueden compararse subpartidas del mismo nivel. En el arancel, el nivel se ve en los guiones: una subpartida de un guión se compara con las de un guión; las de dos guiones, con las de dos guiones de la misma subpartida de un guión.",
          "Ejemplo. Café tostado, sin descafeinar. Partida 09.01 por RGI 1. Dentro de ella, el primer nivel separa “café sin tostar” de “café tostado”; se elige tostado. En el segundo nivel, dentro de tostado, “sin descafeinar” o “descafeinado”: 0901.21. Comparar 0901.21 directamente con 0901.11 sería saltarse un nivel, que es justo lo que la RGI 6 prohíbe.",
          "A partir de la subpartida de seis dígitos empieza el arancel nacional. En Panamá, la fracción nacional es la que fija el DAI, el ITBMS y, cuando aplica, el ISC, y la RGI 6 se sigue aplicando por analogía a esos niveles: se comparan subdivisiones del mismo nivel y se leen las notas que el arancel nacional añada.",
        ],
      },
      {
        heading: "Cómo citar una RGI en una clasificación defendible",
        paragraphs: [
          "Una clasificación que la aduana acepta y que un corredor puede defender dos años después tiene siempre la misma forma: la descripción técnica de la mercancía, la regla que decidió, la nota legal que aplicó y la fracción final.",
        ],
        bullets: [
          "Describe la mercancía por materia, función y presentación antes de buscar el código; el nombre comercial no clasifica.",
          "Escribe qué regla decidió: “RGI 1 y 6” para los casos directos, “RGI 3 b)” cuando hubo que elegir por carácter esencial.",
          "Cita la nota de sección o capítulo que incluyó o excluyó el producto, si la hubo.",
          "Guarda el razonamiento junto con la declaración. Un mismo producto debe clasificarse igual la próxima vez, lo haga quien lo haga.",
        ],
      },
    ],
    tavnit: {
      heading: "Dónde entra Tavnit",
      paragraphs: [
        "El clasificador arancelario de Tavnit trabaja sobre el Arancel Nacional de Importación de Panamá (VII Enmienda, SA 2022), con sus líneas nacionales, las tasas de DAI, ITBMS e ISC, las notas legales de sección y capítulo y las RGI, y clasifica cada línea de mercancía a partir de la descripción que extrae de la factura y del packing list. Devuelve la fracción, el nivel de confianza y el razonamiento, con la regla y la nota que decidieron el caso.",
        "Las líneas de baja confianza o de alto valor pasan por revisión del corredor antes de que se presente nada, y cada decisión queda en una bitácora de auditoría. Así, la clasificación defendible que describe esta guía no depende de la memoria de una persona.",
      ],
      links: [
        { label: "Clasificación arancelaria: qué es, RGI y dos ejemplos", href: "/es/guias/clasificacion-arancelaria" },
        { label: "Notas legales de sección y capítulo", href: "/es/guias/notas-legales-de-seccion-y-capitulo" },
        { label: "Aduanas y clasificación arancelaria para Panamá", href: "/es/aduanas" },
      ],
    },
    faqs: [
      { q: "¿Cuántas Reglas Generales de Interpretación hay?", a: "Seis. Las cinco primeras clasifican hasta la partida de cuatro dígitos y la sexta lleva la clasificación a la subpartida. La RGI 2 tiene dos apartados (a y b), la RGI 3 tres (a, b y c) y la RGI 5 dos (a y b)." },
      { q: "¿Las RGI se aplican en orden?", a: "Sí, y ese es el punto central. Se empieza siempre por la RGI 1; solo si el texto de la partida y las notas legales no resuelven se pasa a la 2, luego a la 3 (en orden a, b, c) y, en último caso, a la 4. La 5 cubre estuches y envases en cualquier caso, y la 6 se aplica al llegar a la subpartida." },
      { q: "¿Qué diferencia hay entre la RGI 3 a) y la RGI 3 b)?", a: "La 3 a) compara partidas: gana la más específica. La 3 b) mira la mercancía: cuando dos partidas son igual de específicas, se clasifica por la materia o el artículo que le da el carácter esencial. Se aplica primero la 3 a); la 3 b) entra solo cuando la 3 a) no decide." },
      { q: "¿Qué es la RGI 6 en aduanas?", a: "La regla que lleva la clasificación de la partida de cuatro dígitos a la subpartida. Dice que se usan los textos de las subpartidas y las notas de subpartida, aplicando las reglas anteriores, y que solo se comparan subpartidas del mismo nivel (del mismo número de guiones)." },
      { q: "¿Las RGI aplican en Panamá?", a: "Sí. El Arancel Nacional de Importación de Panamá está construido sobre el Sistema Armonizado (SA 2022, VII Enmienda) y reproduce las seis reglas, que forman parte de su texto legal. La fracción nacional que se declara es el resultado de aplicarlas hasta la subpartida y seguir, por analogía, en los niveles nacionales." },
    ],
  },
  {
    slug: "notas-legales-de-seccion-y-capitulo",
    slugEs: "notas-legales-de-seccion-y-capitulo",
    spanishOnly: true,
    title: "Notas legales del arancel: qué son y cómo se usan",
    h1: "Notas legales de sección y de capítulo: qué son, qué fuerza tienen y cómo se leen",
    description:
      "Qué son las notas legales de sección, de capítulo y de subpartida del Sistema Armonizado, por qué mandan sobre el título de la partida, y cinco ejemplos de notas que cambian la clasificación.",
    lede: "Las notas legales son los textos que aparecen al inicio de cada sección y de cada capítulo del arancel (y, en algunos capítulos, antes de las subpartidas) y que definen términos, excluyen o incluyen mercancías y fijan reglas especiales, como las de las partes. Por la RGI 1 tienen la misma fuerza que los textos de las partidas: una nota que excluye un producto de un capítulo manda, aunque el título de la partida parezca cubrirlo.",
    published: "2026-10-21",
    updated: "2026-10-21",
    readingMinutes: 8,
    sections: [
      {
        heading: "Tres clases de notas: de sección, de capítulo y de subpartida",
        paragraphs: [
          "El Sistema Armonizado se organiza en 21 secciones y 97 capítulos. Cada sección y cada capítulo pueden abrir con notas, numeradas, que forman parte del texto legal de la nomenclatura. Las notas de sección aplican a todos los capítulos de la sección; las de capítulo, a las partidas del capítulo. Desde la RGI 6, además, existen notas de subpartida, que solo aplican al clasificar dentro de una partida.",
          "Hay capítulos sin notas y capítulos con más de una página de ellas. Las secciones XI (textiles), XV (metales comunes), XVI (máquinas y aparatos eléctricos) y XVII (material de transporte) concentran las más largas, porque son las que más productos compuestos y más partes manejan.",
        ],
      },
      {
        heading: "Por qué mandan: RGI 1 y RGI 6",
        paragraphs: [
          "La RGI 1 lo dice textualmente: los títulos de las secciones, capítulos y subcapítulos solo tienen valor indicativo, y la clasificación se determina por los textos de las partidas y por las notas de sección o de capítulo. La RGI 6 repite lo mismo para las subpartidas y sus notas. Es decir, las notas no son una ayuda para interpretar el arancel; son el arancel.",
          "La consecuencia práctica: cuando el texto de una partida parece cubrir un producto pero una nota de sección o de capítulo lo excluye, la nota gana. Y al revés: una nota puede meter en una partida algo que su texto no menciona. Leer solo los títulos de las partidas produce clasificaciones seguras de sí mismas y equivocadas.",
        ],
      },
      {
        heading: "Notas legales y notas explicativas no son lo mismo",
        paragraphs: [
          "Las notas explicativas las publica la Organización Mundial de Aduanas aparte de la nomenclatura. Describen partida por partida qué comprende y qué no, con ejemplos. Son la referencia que usan las aduanas y los tribunales para interpretar, y conviene leerlas, pero no son texto legal: una clasificación no se apoya en una nota explicativa en contra de una nota legal.",
          "Lo mismo vale para los criterios de clasificación que la OMA publica sobre productos concretos y para las resoluciones de clasificación de cada aduana: orientan, y en el caso de las resoluciones obligan a quien las obtuvo, pero el texto que manda es el de las partidas y las notas legales.",
        ],
      },
      {
        heading: "Lo que hace una nota: definir, excluir, incluir, ordenar",
        paragraphs: [
          "Casi todas las notas legales hacen una de cuatro cosas. Definen un término que el texto de las partidas usa sin explicar. Excluyen mercancías de una sección o capítulo y dicen a dónde van. Incluyen expresamente algo que de otro modo quedaría en duda. O fijan un orden para resolver un tipo de caso, casi siempre las partes y los accesorios. Cinco ejemplos que aparecen todos los días en un embarque:",
        ],
        bullets: [
          "Definir (Capítulo 64, nota 4): para el calzado, la materia de la parte superior es la que tiene la mayor superficie exterior, y la de la suela, la que tiene la mayor superficie en contacto con el suelo. Esta nota decide si una zapatilla con parte superior textil y refuerzos de cuero va a la partida 64.04 (parte superior textil) o a la 64.03 (parte superior de cuero), y no es cuestión de opinión: se mide.",
          "Excluir (Sección XVI, nota 1): la sección de máquinas y aparatos eléctricos excluye, entre otros, las correas de transmisión de plástico (Capítulo 39) o de caucho (partida 40.10) y los artículos de los Capítulos 82 y 83 (herramientas y manufacturas de metal). Una correa de caucho para una máquina no es “parte de máquina”: es correa de caucho.",
          "Ordenar partes de uso general (Sección XV, nota 2): tornillos, pernos, tuercas, muelles, cerraduras, bisagras y similares de metal común son “partes de uso general” y se clasifican siempre en su propia partida (los tornillos de acero, en la 73.18), nunca como parte de la máquina o del mueble al que van destinados.",
          "Ordenar partes de máquinas (Sección XVI, nota 2): una parte que por sí misma es un artículo de una partida de los Capítulos 84 u 85 (un motor, una bomba, un transformador) va a su propia partida; una parte destinada exclusiva o principalmente a una máquina va con esa máquina; y las demás caen en las partidas residuales de partes (84.87 u 85.48).",
          "Incluir por defecto (Capítulos 61 y 62, nota 9): las prendas que no puedan identificarse como de hombre o niño ni como de mujer o niña se clasifican en las partidas de prendas para mujer o niña. Una camisa unisex no se clasifica “a criterio”; la nota ya decidió.",
        ],
      },
      {
        heading: "Cómo leerlas en la práctica",
        paragraphs: [
          "El método que evita las clasificaciones seguras y equivocadas es mecánico: antes de elegir la partida, leer las notas de la sección y del capítulo candidatos, completas, y comprobar una por una si alguna define, excluye o incluye el producto. Lleva cinco minutos la primera vez y ninguno la segunda, porque el producto se repite.",
        ],
        bullets: [
          "Ubica la sección y el capítulo candidatos por la materia y la función del producto.",
          "Lee las notas de esa sección y de ese capítulo antes de leer las partidas, y marca las que mencionan tu producto o su materia.",
          "Si una nota excluye el producto, sigue a donde la nota lo manda y repite la lectura allí.",
          "Si una nota define un término del texto de la partida (“de punto”, “parte superior”, “partes de uso general”), aplica la definición, no el sentido corriente de la palabra.",
          "Al bajar a la subpartida, lee las notas de subpartida del capítulo, si las hay.",
          "Deja escrito qué nota aplicaste. Es lo que diferencia una clasificación defendible de una adivinanza acertada.",
        ],
      },
      {
        heading: "Las notas del arancel nacional",
        paragraphs: [
          "A partir de los seis dígitos del SA, cada país abre sus propias subdivisiones, y algunos aranceles añaden notas propias que solo aplican a esos niveles nacionales. La regla práctica es leer el arancel que se va a declarar, no solo la nomenclatura internacional. En Panamá, la fracción del Arancel Nacional de Importación es la que determina el DAI, el ITBMS y el ISC, y es a ese nivel al que hay que llegar con las notas leídas.",
        ],
      },
    ],
    tavnit: {
      heading: "Dónde entra Tavnit",
      paragraphs: [
        "El clasificador de Tavnit no busca el código por parecido con el nombre comercial: clasifica contra el Arancel Nacional de Importación de Panamá (VII Enmienda, SA 2022) aplicando las notas legales de sección y capítulo y las RGI, y registra qué nota y qué regla decidieron cada línea. El resultado es una fracción nacional con su razonamiento, no un código a seis dígitos elegido por similitud.",
        "La descripción con la que trabaja sale de la factura y del packing list del embarque, extraídos en el mismo Run, y las líneas de baja confianza pasan por el corredor antes de presentarse. Cada decisión queda en la bitácora de auditoría, con la nota citada.",
      ],
      links: [
        { label: "Las seis RGI explicadas con ejemplos", href: "/es/guias/reglas-generales-de-interpretacion-rgi" },
        { label: "Clasificación arancelaria: qué es, RGI y dos ejemplos", href: "/es/guias/clasificacion-arancelaria" },
        { label: "Aduanas y clasificación arancelaria para Panamá", href: "/es/aduanas" },
      ],
    },
    faqs: [
      { q: "¿Qué son las notas legales en la clasificación arancelaria?", a: "Son los textos numerados que abren cada sección y cada capítulo del Sistema Armonizado (y, en algunos capítulos, las subpartidas). Definen términos, excluyen o incluyen mercancías y fijan reglas para casos como las partes. Forman parte del texto legal de la nomenclatura y, por la RGI 1, tienen la misma fuerza que los textos de las partidas." },
      { q: "¿Las notas legales son obligatorias?", a: "Sí. La RGI 1 establece que la clasificación se determina por los textos de las partidas y por las notas de sección o de capítulo. Una nota que excluye un producto de un capítulo manda sobre el título de la partida, y una clasificación que la ignore es incorrecta aunque el texto de la partida parezca encajar." },
      { q: "¿Cuál es la diferencia entre notas legales y notas explicativas?", a: "Las notas legales están dentro de la nomenclatura y son ley. Las notas explicativas las publica aparte la Organización Mundial de Aduanas para interpretar partida por partida; son la referencia habitual de aduanas y tribunales, pero no obligan. Ante un conflicto, manda la nota legal." },
      { q: "¿Dónde se leen las notas legales?", a: "Al inicio de cada sección y de cada capítulo del arancel, antes de la lista de partidas. Las notas de subpartida aparecen a continuación de las notas de capítulo, en los capítulos que las tienen. En el Arancel Nacional de Importación de Panamá están reproducidas en el mismo lugar." },
      { q: "¿Qué pasa si el título de la partida y una nota se contradicen?", a: "Gana la nota. Los títulos de secciones y capítulos solo son indicativos, y una nota de exclusión o de definición prevalece sobre la lectura literal del texto de la partida. Es el caso más común de clasificación equivocada en productos rutinarios." },
    ],
  },
  {
    slug: "partida-arancelaria-ejemplos",
    slugEs: "partida-arancelaria-ejemplos",
    spanishOnly: true,
    title: "Partida arancelaria: qué es y 5 ejemplos resueltos",
    h1: "Partida arancelaria: qué es, cómo se encuentra y cinco ejemplos resueltos paso a paso",
    description:
      "Qué es una partida arancelaria, qué la diferencia de la subpartida y de la fracción nacional, y cinco productos clasificados paso a paso: celular, camiseta, zapatillas, café y cargador.",
    lede: "La partida arancelaria es, en sentido estricto, el código de cuatro dígitos del Sistema Armonizado que agrupa una familia de mercancías (85.17, teléfonos; 61.09, camisetas de punto). En el uso diario de Panamá y Centroamérica, “partida” también nombra la fracción nacional completa, la línea de ocho o más dígitos a la que se atan el DAI, el ITBMS y el ISC. Encontrarla es un procedimiento de seis pasos, y aquí se recorre con cinco productos corrientes.",
    published: "2026-10-21",
    updated: "2026-10-21",
    readingMinutes: 10,
    sections: [
      {
        heading: "Partida, subpartida y fracción: la misma palabra para tres cosas",
        paragraphs: [
          "El Sistema Armonizado tiene capítulos de dos dígitos, partidas de cuatro y subpartidas de seis. Esos seis dígitos son idénticos en todos los países miembros. Lo que sigue es nacional: Panamá, por ejemplo, extiende cada subpartida en las líneas de su Arancel Nacional de Importación, y es esa línea, la fracción, la que se declara y la que determina los impuestos.",
          "Cuando alguien pregunta “¿cuál es la partida arancelaria de este producto?”, casi siempre quiere la fracción nacional, no los cuatro dígitos. Esta guía llega hasta la subpartida de seis dígitos, que es común a todos los países, y señala dónde empieza el tramo nacional. Los dígitos nacionales y las tasas se leen en el arancel vigente del país donde se declara.",
        ],
      },
      {
        heading: "El método en seis pasos",
        paragraphs: [
          "La secuencia es siempre la misma, y los ejemplos de abajo la siguen al pie de la letra.",
        ],
        bullets: [
          "Describir la mercancía por materia, función y presentación, no por su nombre comercial.",
          "Ubicar la sección y el capítulo candidatos.",
          "Leer las notas legales de esa sección y ese capítulo, buscando definiciones y exclusiones.",
          "Elegir la partida de cuatro dígitos por el texto de la partida (RGI 1), o por las RGI 2 a 5 si el texto no basta.",
          "Bajar a la subpartida de seis dígitos comparando solo subpartidas del mismo nivel (RGI 6).",
          "Seguir en el arancel nacional hasta la fracción que fija los impuestos, y dejar escrito el razonamiento.",
        ],
      },
      {
        heading: "Ejemplo 1: un teléfono inteligente",
        paragraphs: [
          "Descripción: teléfono móvil con pantalla táctil, sistema operativo y acceso a redes celulares e internet. Es un aparato eléctrico de telecomunicación: Sección XVI, Capítulo 85. Las notas de la Sección XVI no lo excluyen. La partida 85.17 cubre los teléfonos, incluidos los teléfonos inteligentes y los demás teléfonos para redes celulares: partida 85.17 por RGI 1.",
          "Dentro de la partida, el primer nivel agrupa los “teléfonos, incluidos los teléfonos inteligentes y demás teléfonos para redes celulares u otras redes inalámbricas”, y el segundo nivel distingue los teléfonos inteligentes: subpartida 8517.13 (RGI 6). Esa subpartida la creó el SA 2022; en la edición anterior los teléfonos celulares iban en la 8517.12, y un arancel que no se haya actualizado todavía la mostrará así. De 8517.13 en adelante, dígitos nacionales.",
        ],
      },
      {
        heading: "Ejemplo 2: una camiseta de algodón",
        paragraphs: [
          "Descripción: camiseta de manga corta, de tejido de punto, 100 % algodón. Sección XI (textiles). La primera decisión es el capítulo: el 61 cubre las prendas de punto y el 62 las que no son de punto; la nota 1 del Capítulo 61 lo fija. La partida 61.09, “T-shirts y camisetas interiores, de punto”, describe el producto por su texto: RGI 1.",
          "En la subpartida, el único criterio es la materia: 6109.10 “de algodón” frente a 6109.90 “de las demás materias textiles”. Resultado: 6109.10. Si la misma camiseta fuera tejida en lugar de punto, se iría al Capítulo 62 (camisas y blusas, partidas 62.05 y 62.06), con otra tasa. Es el error más frecuente en prendas: no mirar si el tejido es de punto.",
        ],
      },
      {
        heading: "Ejemplo 3: unas zapatillas deportivas",
        paragraphs: [
          "Descripción: calzado deportivo con suela de caucho y parte superior textil con refuerzos sintéticos. Sección XII, Capítulo 64. Aquí decide una nota legal antes que el texto de la partida: la nota 4 del capítulo dice que la materia de la parte superior es la que tenga la mayor superficie exterior, y la de la suela, la que tenga la mayor superficie en contacto con el suelo. Medida la superficie, la parte superior es textil y la suela, de caucho.",
          "Con eso, la partida 64.04 (calzado con suela de caucho, plástico, cuero natural o regenerado y parte superior de materia textil) por RGI 1, y no la 64.03, que exige parte superior de cuero. En la subpartida, 6404.11 cubre el calzado de deporte, de tenis, de baloncesto, de gimnasia, de entrenamiento y similares, con suela de caucho o plástico: 6404.11 por RGI 6. Si los refuerzos de cuero sumaran más superficie que el textil, la respuesta cambiaría a 64.03; por eso la nota pide medir.",
        ],
      },
      {
        heading: "Ejemplo 4: café tostado en grano",
        paragraphs: [
          "Descripción: café tostado, en grano, sin descafeinar, en bolsas de un kilo. Sección II (productos del reino vegetal), Capítulo 9 (café, té, yerba mate y especias). La partida 09.01 cubre el café, incluso tostado o descafeinado: RGI 1.",
          "La subpartida tiene dos niveles. Primero, “café sin tostar” frente a “café tostado”: tostado. Después, dentro del tostado, “sin descafeinar” (0901.21) frente a “descafeinado” (0901.22): 0901.21. El mismo café, pero en forma de extracto soluble (“café instantáneo”), ya no es café del Capítulo 9: es un extracto, esencia o concentrado de café de la partida 21.01. Dos productos que en la factura se llaman igual y que se clasifican en capítulos distintos.",
        ],
      },
      {
        heading: "Ejemplo 5: un cargador de celular",
        paragraphs: [
          "Descripción: adaptador de corriente que convierte la corriente alterna de la red en corriente continua para cargar un teléfono. La tentación es declararlo como “parte o accesorio de teléfono”. La nota 2 a) de la Sección XVI lo impide: una parte que por sí misma es un artículo comprendido en una partida de los Capítulos 84 u 85 se clasifica en su propia partida, sea cual sea la máquina a la que se destine.",
          "Un cargador es un convertidor estático (un rectificador): partida 85.04, “transformadores eléctricos, convertidores eléctricos estáticos…”, por RGI 1 y la nota citada. Subpartida 8504.40, “convertidores estáticos”, por RGI 6. Que venga en la misma caja que el teléfono no cambia nada si se factura y se presenta por separado; si viene dentro de la caja del teléfono como un conjunto para la venta al por menor, entra la RGI 3 b) y el conjunto se clasifica por el teléfono.",
        ],
      },
      {
        heading: "Dónde se equivocan estos cinco productos a diario",
        paragraphs: [
          "Los cinco ejemplos son mercancía corriente, y aun así cada uno tiene un error típico que aparece en las declaraciones todas las semanas.",
        ],
        bullets: [
          "Teléfonos: declarar la subpartida de la edición anterior del SA porque el arancel que se consultó no está actualizado.",
          "Prendas: clasificar una camisa tejida en el Capítulo 61 (de punto) o al revés, sin comprobar el tejido.",
          "Calzado: elegir la partida por la apariencia de la parte superior sin medir la superficie, como manda la nota 4 del Capítulo 64.",
          "Café: declarar el café soluble en la partida 09.01, cuando es un extracto de la 21.01.",
          "Cargadores y accesorios: declararlos como “partes” del aparato principal, contra la nota 2 de la Sección XVI.",
        ],
      },
    ],
    tavnit: {
      heading: "Dónde entra Tavnit",
      paragraphs: [
        "Tavnit extrae la descripción de cada línea de la factura comercial y del packing list del embarque y la clasifica contra el Arancel Nacional de Importación de Panamá (VII Enmienda, SA 2022), aplicando las notas legales y las RGI, hasta la fracción nacional que fija el DAI, el ITBMS y el ISC. Cada línea sale con su fracción, su nivel de confianza y el razonamiento: la regla y la nota que decidieron, como en los cinco ejemplos de arriba.",
        "Las líneas de baja confianza o de alto valor las revisa el corredor antes de que se presente la declaración, y cada clasificación queda en una bitácora de auditoría. Un producto clasificado una vez se clasifica igual la siguiente.",
      ],
      links: [
        { label: "Clasificación arancelaria: qué es, RGI y dos ejemplos", href: "/es/guias/clasificacion-arancelaria" },
        { label: "Las seis RGI explicadas con ejemplos", href: "/es/guias/reglas-generales-de-interpretacion-rgi" },
        { label: "Notas legales de sección y capítulo", href: "/es/guias/notas-legales-de-seccion-y-capitulo" },
        { label: "Aduanas y clasificación arancelaria para Panamá", href: "/es/aduanas" },
      ],
    },
    faqs: [
      { q: "¿Qué es la partida arancelaria de un producto?", a: "En sentido estricto, el código de cuatro dígitos del Sistema Armonizado que agrupa su familia de mercancías (85.17 para los teléfonos). En el uso corriente de Panamá y Centroamérica, también la fracción nacional completa, de ocho o más dígitos, que es la que se declara y la que fija los impuestos." },
      { q: "¿Cuántos dígitos tiene una partida arancelaria?", a: "La partida tiene cuatro dígitos y la subpartida seis; hasta ahí el código es igual en todos los países del Sistema Armonizado. La fracción nacional añade dígitos propios de cada país (ocho, diez o más). Cuando se pide “la partida” para una declaración, se espera la fracción nacional completa." },
      { q: "¿Cómo sé la partida arancelaria de mi producto?", a: "Siguiendo los seis pasos de esta guía: describir la mercancía por materia, función y presentación; ubicar sección y capítulo; leer sus notas legales; elegir la partida por el texto (RGI 1); bajar a la subpartida (RGI 6); y terminar en la fracción del arancel nacional vigente. Para mercancía de valor o recurrente, muchas aduanas emiten resoluciones anticipadas de clasificación que fijan la fracción antes de importar." },
      { q: "¿La partida arancelaria es la misma en todos los países?", a: "Hasta los seis dígitos, sí: la subpartida del Sistema Armonizado es común a todos los países miembros. A partir de ahí cada país tiene sus propias subdivisiones y sus propias tasas, así que el código completo de una fracción panameña no sirve tal cual en México o en España." },
      { q: "¿Puedo usar la partida que puso mi proveedor en la factura?", a: "Como pista, sí; como respuesta, no. El proveedor clasificó bajo el arancel de su país y, a veces, con una edición anterior del Sistema Armonizado. Los seis primeros dígitos suelen coincidir, pero la fracción nacional y la responsabilidad de declararla bien son del importador o de su corredor." },
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
