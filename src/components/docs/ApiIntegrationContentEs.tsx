"use client";

import { Fragment, useState } from "react";
import { ArrowLeftRight, ArrowRight, CircleDot, Code2, Database, Download, ExternalLink, FolderInput, Info, Layers, Lock, Paperclip, Settings2, Split, Star, Wand2, Zap } from "lucide-react";
import { BulletList, CodeBlock, DocCard, InfoBox, InlineCode, NumberedList, WarningBox } from "@/components/docs/ui";
import {
  BUCKETS_JSON_EXAMPLE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTIONS_JSON_EXAMPLE,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_SPLITTERS_CODE,
  SPLITTERS_JSON_EXAMPLE,
} from "@/components/docs/code-samples";

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/**
 * Contenido de la integración por API (español). Gemelo de ApiIntegrationContent.
 *
 * Ambos paneles de pestañas se renderizan siempre y el inactivo se oculta con CSS
 * en lugar de desmontarse, para que la documentación sin código también exista en
 * el HTML servido y los rastreadores la vean.
 *
 * El selector Python/JavaScript dentro de la pestaña de código sigue siendo un
 * renderizado condicional: son ejemplos de código equivalentes, no contenido distinto.
 */
export default function ApiIntegrationContentEs() {
  const [apiTab, setApiTab] = useState<ApiTab>("code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integración por API
      </h1>

      {/* Subpestañas */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setApiTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Código
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setApiTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Sin código
        </button>
      </div>

      {/* ── Pestaña de código ── */}
      <div role="tabpanel" aria-label="Código" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="¿Qué es una API?">
          <p>
            Una API (interfaz de programación de aplicaciones) es como un mensajero que permite que
            distintos programas se comuniquen entre sí. En lugar de subir documentos a mano desde
            nuestro sitio web, puedes escribir un pequeño programa que los envíe automáticamente.
          </p>
          <p>Esto te sirve si quieres:</p>
          <BulletList
            items={[
              "Procesar muchos documentos a la vez",
              "Conectar Tavnit con otras herramientas que usas",
              "Crear flujos de trabajo automatizados",
            ]}
          />
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Credenciales">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API key</h3>
          <p>Tu API key está disponible en la pestaña &ldquo;Integrations&rdquo; después de iniciar sesión.</p>
          <WarningBox>
            Mantén tu API key en secreto. Si la regeneras desde la pestaña &ldquo;Integrations&rdquo;, la
            key anterior quedará desactivada.
          </WarningBox>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">Flow ID</h3>
          <p>El Flow ID aparece en la página de detalles de cada Flow. Úsalo cuando envíes documentos a un Flow específico.</p>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">Collection ID</h3>
          <p>El Collection ID aparece en la página de detalles de cada Collection. Úsalo cuando quieras que la IA dirija los documentos al Flow más adecuado.</p>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">Cleaner ID</h3>
          <p>El Cleaner ID aparece en la página de detalles de cada Cleaner. Úsalo al iniciar un sweep para posprocesar o enriquecer los datos extraídos.</p>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">Splitter ID</h3>
          <p>El Splitter ID aparece en la página de detalles de cada Splitter. Úsalo cuando envíes documentos para dividirlos en tipos de documento individuales.</p>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">Bucket ID y nombre</h3>
          <p>Ambos son obligatorios para escribir en un Bucket por API. Los encuentras tocando el ícono de información en la página de detalles del Bucket. El nombre funciona como verificación de seguridad para evitar escribir por error en el Bucket equivocado.</p>

          <h3 className="text-base font-semibold text-fg-2 mt-5 mb-1">URLs de la API</h3>
          <p className="mb-1">API de Flows (envía a un Flow específico):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></div>
          <p className="mb-1">API de Collections (la IA elige el mejor Flow):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></div>
          <p className="mb-1">API de Cleaners (inicia un sweep):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></div>
          <p className="mb-1">API de Splitters (divide documentos por tipo):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></div>
          <p className="mb-1">API de Buckets (escribe filas en un Bucket):</p>
          <div><InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></div>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Envío de documentos">
          <p>Tavnit acepta documentos de dos formas:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Subida de archivo multipart">
            Envía el archivo como datos binarios (la subida de archivos clásica). Es la mejor opción
            cuando tienes acceso directo al archivo.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Archivo codificado en base64">
            Envía el contenido del archivo como una cadena base64 junto con un nombre de archivo. Es
            útil cuando trabajas con herramientas de automatización o APIs que entregan los archivos
            en base64.
          </InfoBox>
          <p>Ambos métodos usan el mismo endpoint y el mismo encabezado:</p>
          <BulletList
            items={[
              <Fragment key="f0">URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></Fragment>,
              <Fragment key="f1">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Ejemplo de código">
          <p>Elige tu lenguaje de programación:</p>
          <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
            <button
              onClick={() => setLang("python")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === "python"
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
                  : "text-fg-4 hover:text-fg hover:bg-tint/5"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setLang("javascript")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === "javascript"
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
                  : "text-fg-4 hover:text-fg hover:bg-tint/5"
              }`}
            >
              JavaScript
            </button>
          </div>
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="API de Collections">
          <p>
            Las Collections te permiten enviar documentos sin saber qué Flow usar. La IA analiza cada
            documento y lo dirige automáticamente al Flow más adecuado.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Cuándo usar la API de Collections">
            Úsala cuando recibes tipos de documentos mezclados (facturas, recibos, contratos, etc.) y
            quieres que la IA determine el Flow correcto para cada uno.
          </InfoBox>
          <p>La API de Collections funciona igual que la API de Flows, pero usa collection_id en lugar de flow_id:</p>
          <BulletList
            items={[
              <Fragment key="f2">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f3">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f4">Cuerpo: <InlineCode>collection_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Más información sobre las Collections">
            Consulta la sección Collections para ver en detalle cómo funciona el enrutamiento de documentos y cómo configurar Collections en la app.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="API de Cleaners">
          <p>
            Puedes iniciar Cleaners por la API para ejecutar un sweep sobre un documento o un conjunto
            de datos. Esto es útil cuando quieres enriquecer o normalizar datos como parte de un
            pipeline automatizado.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Cuándo usar la API de Cleaners">
            Úsala después de un Run de un Flow para posprocesar o enriquecer los valores extraídos:
            por ejemplo, normalizar formatos de fecha, corregir la ortografía o clasificar valores en
            categorías.
          </InfoBox>
          <p>La API de Cleaners usa un cleaner_id y acepta un archivo para el sweep:</p>
          <BulletList
            items={[
              <Fragment key="f5">URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></Fragment>,
              <Fragment key="f6">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f7">Cuerpo: <InlineCode>cleaner_id</InlineCode> + archivo (multipart o base64)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Más información sobre los Cleaners">
            Consulta la sección Cleaners para ver cómo configurar campos, pistas de extracción y resultados del sweep.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="API de Splitters">
          <p>
            Los Splitters te permiten dividir PDFs con varios documentos en documentos individuales.
            La IA clasifica cada rango de páginas y lo asigna a un tipo de documento definido en el
            Splitter.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Cuándo usar la API de Splitters">
            Úsala cuando recibes PDFs combinados con varios tipos de documentos (por ejemplo, un
            conjunto de facturas, recibos y contratos en un solo archivo) y necesitas separarlos.
          </InfoBox>
          <p>La API de Splitters usa un splitter_id para identificar qué Splitter ejecutar:</p>
          <BulletList
            items={[
              <Fragment key="f8">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f9">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f10">Cuerpo: <InlineCode>splitter_id</InlineCode> + archivo (multipart o base64)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Más información sobre los Splitters">
            Consulta la sección Splitters para ver cómo configurar tipos de documento y acciones de salida.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Database size={24} />} title="API de Buckets">
          <p>
            Escribe filas de datos directamente en un Bucket mediante programación. Es útil para
            sincronizar datos desde sistemas externos o enviar registros sin pasar por un Flow.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Cuándo usar la API de Buckets">
            Úsala cuando quieras insertar o reemplazar filas en un Bucket desde tu propia aplicación,
            una base de datos o una herramienta de automatización, sin depender de ningún Run de un
            Flow.
          </InfoBox>
          <BulletList
            items={[
              <Fragment key="f11">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              <Fragment key="f12">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f13">Cuerpo: <InlineCode>bucket_id</InlineCode>, <InlineCode>bucket_name</InlineCode>, <InlineCode>overwrite</InlineCode> (booleano), <InlineCode>rows</InlineCode> (arreglo)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Más información sobre los Buckets">
            Consulta la sección Buckets para ver la configuración de columnas, el control de acceso, los gráficos y la importación y exportación de CSV.
          </InfoBox>
        </DocCard>
      </div>

      {/* ── Pestaña sin código ── */}
      <div role="tabpanel" aria-label="Sin código" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Herramientas de automatización">
          <p>
            No necesitas escribir código para integrar Tavnit con tus flujos de trabajo. Las
            plataformas de automatización sin código te permiten conectar apps de forma visual y crear
            automatizaciones potentes.
          </p>
          <p>Plataformas sin código populares que funcionan con Tavnit:</p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make.com">
            Plataforma de automatización visual con más de 1000 integraciones. Ideal para flujos de
            trabajo complejos de varios pasos.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Conecta Tavnit con más de 5000 apps mediante &ldquo;Zaps&rdquo; sencillos. Perfecto para
            automatizaciones directas.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Automatización de flujos de trabajo de código abierto. Alójalo tú mismo o usa su servicio
            en la nube para tener control total.
          </InfoBox>
          <p>
            Todas estas plataformas admiten solicitudes HTTP, lo que significa que pueden enviar
            documentos a la API de Tavnit.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integración con Make.com">
          <p>
            Make.com (antes Integromat) es una plataforma de automatización visual que te permite
            conectar apps y automatizar flujos de trabajo sin escribir código.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Visita Make.com <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Primeros pasos con Make.com">
          <NumberedList
            items={[
              "Ve a make.com y crea una cuenta gratuita",
              'Haz clic en "Create a new scenario" desde tu panel',
              "Verás un lienzo en blanco donde puedes agregar módulos",
              'Busca "HTTP" y agrega el módulo "Make a request"',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="¿Qué es un escenario?">
            Un escenario es un flujo de trabajo automatizado en Make.com. Está formado por módulos
            (apps) conectados entre sí. Cuando un módulo se activa o recibe datos, se los pasa al
            siguiente módulo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configura el módulo HTTP">
          <p>
            Después de agregar el módulo HTTP, configúralo para enviar documentos a Tavnit. Puedes
            usar cualquiera de estos dos enfoques:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Opción 1: multipart/form-data (cuando tienes un objeto de archivo)
          </h3>
          <NumberedList
            items={[
              'Agrega un módulo HTTP "Make a request" a tu escenario',
              <Fragment key="f14">
                Configura la solicitud:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Método: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                En la pestaña &ldquo;Headers&rdquo;, agrega:
                <BulletList
                  items={[
                    "Nombre del encabezado: X-API-Key",
                    "Valor del encabezado: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Define el tipo de cuerpo ("Body type") como "multipart/form-data"',
              <Fragment key="f16">
                Agrega los campos del formulario:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "source: api",
                    "file: (mapéalo desde el módulo anterior)",
                  ]}
                />
              </Fragment>,
              "Ejecuta tu escenario para probarlo",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Opción 2: JSON + base64 (cuando tienes una cadena base64)
          </h3>
          <p>Si el módulo anterior entrega una cadena base64 en lugar de un archivo, usa este enfoque:</p>
          <NumberedList
            items={[
              'Define el tipo de cuerpo ("Body type") como "Raw" y selecciona "JSON (application/json)"',
              <Fragment key="f17">
                En la pestaña &ldquo;Headers&rdquo;, agrega también:
                <BulletList
                  items={[
                    "Nombre del encabezado: Content-Type",
                    "Valor del encabezado: application/json",
                  ]}
                />
              </Fragment>,
              "Define el cuerpo JSON así:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Cómo mapear el contenido base64">
            Reemplaza {"{{previous_module.base64_content}}"} por el mapeo real de tu módulo anterior.
            En Make.com, haz clic en el campo y selecciona la salida base64 del módulo que entrega tu
            archivo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Otras plataformas (Zapier, Power Automate, n8n)">
          <p>El mismo enfoque funciona en cualquier plataforma de automatización que admita solicitudes HTTP:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Si tu plataforma te da un objeto de archivo">
            Usa multipart/form-data con un campo &ldquo;file&rdquo; que contenga el archivo, más los campos flow_id y source.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Si tu plataforma te da una cadena base64">
            Usa un cuerpo JSON con flow_id, source, filename y file_base64 (el contenido base64 del paso anterior).
          </InfoBox>
          <p>Ambos métodos llaman al mismo endpoint y producen resultados de extracción idénticos.</p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Uso de la API de Collections">
          <p>
            Si recibes distintos tipos de documentos (facturas, recibos, contratos, etc.) y quieres que
            la IA dirija automáticamente cada documento al Flow correcto, usa la API de Collections.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Collections frente a Flows">
            API de Flows: tú indicas qué Flow usar con flow_id. API de Collections: la IA analiza el documento y elige automáticamente el mejor Flow usando collection_id.
          </InfoBox>
          <p>La configuración es idéntica a la de la API de Flows, con dos pequeños cambios:</p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Usa <InlineCode>collection_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode> en el cuerpo de la solicitud</Fragment>,
            ]}
          />
          <p>Ejemplo de cuerpo JSON para Collections:</p>
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Uso de la API de Cleaners">
          <p>
            Si quieres enriquecer o normalizar los datos extraídos después de un Run de un Flow, usa la
            API de Cleaners para iniciar un sweep desde tu herramienta de automatización.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Cleaners frente a Flows">
            API de Flows: extrae los datos sin procesar de un documento. API de Cleaners: posprocesa esos datos, normalizando, clasificando o enriqueciendo los valores de los campos.
          </InfoBox>
          <p>Configuración en tu módulo HTTP:</p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></Fragment>,
              <Fragment key="f21">Usa <InlineCode>cleaner_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode> en el cuerpo de la solicitud</Fragment>,
            ]}
          />
          <p>Ejemplo de cuerpo JSON para Cleaners:</p>
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Uso de la API de Splitters">
          <p>
            Si recibes PDFs combinados con varios tipos de documentos y necesitas separarlos en
            archivos individuales, usa la API de Splitters.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Splitters frente a Flows">
            API de Flows: extrae datos de un solo documento usando flow_id. API de Splitters: divide un PDF con varios documentos en documentos individuales usando splitter_id.
          </InfoBox>
          <p>La configuración es similar a la de la API de Flows, con estos cambios:</p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Usa <InlineCode>splitter_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode> en el cuerpo de la solicitud</Fragment>,
            ]}
          />
          <p>Ejemplo de cuerpo JSON para Splitters:</p>
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Uso de la API de Buckets">
          <p>
            Si quieres enviar filas de datos a un Bucket desde tu herramienta de automatización, sin
            enviar un documento para extracción, usa la API de escritura de Buckets.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets frente a Flows">
            API de Flows: envía un documento para que la IA lo extraiga. API de Buckets: escribe filas estructuradas directamente en la tabla de un Bucket.
          </InfoBox>
          <p>Configuración en tu módulo HTTP:</p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Método: POST, Content-Type: application/json",
              <Fragment key="f25">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <p>Ejemplo de cuerpo JSON:</p>
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Cómo encontrar el ID y el nombre de tu Bucket">
            Abre la página de detalles del Bucket y toca el ícono de información. Puedes copiar ambos valores con un solo toque.
          </InfoBox>
        </DocCard>
      </div>
    </section>
  );
}
