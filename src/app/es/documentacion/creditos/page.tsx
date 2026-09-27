import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  BarChart3,
  Clock,
  Coins,
  Gift,
  HelpCircle,
  Mail,
  PiggyBank,
  Receipt,
  Wallet,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  Related,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("credits", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="credits" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Créditos y facturación
        </h1>

        <DocCard icon={<Wallet size={24} />} title="Cómo funcionan los créditos">
          <Lead>
            Tavnit cobra en créditos. Tu organización tiene un saldo compartido, y cada operación
            que hace trabajo (leer páginas, enrutar un documento, navegar con un Agente) descuenta
            créditos de él. Esta página es la lista única de todos los precios.
          </Lead>
          <BulletList
            items={[
              "El saldo pertenece a la organización, no a un usuario. Los Runs de todos descuentan de él.",
              "Los precios son por unidad de trabajo (páginas, documentos, celdas, minutos), nunca por usuario.",
              "El saldo nunca baja de cero. Cuando no alcanza para una operación, Tavnit la rechaza o la detiene (lo vemos abajo).",
              "Los créditos usados no se reembolsan cuando un Run falla o se cancela.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuesta cada operación">
          <DataTable
            head={["Operación", "Precio", "Notas"]}
            rows={[
              [
                <DocLink key="p1" href="/es/documentacion/flows">Extracción de un Flow</DocLink>,
                "1 crédito por página",
                "Una imagen cuenta como una página; una hoja de cálculo cuenta por equivalentes de página de su primera hoja visible. Lo que importa es el número de páginas, no cuántas filas salen.",
              ],
              [
                <DocLink key="p2" href="/es/documentacion/colecciones">Enrutamiento de una Colección</DocLink>,
                "1 crédito por documento",
                "Se cobra sin importar lo que decida el enrutador, además de la extracción del Flow.",
              ],
              [
                <DocLink key="p3" href="/es/documentacion/subjects">Enrutamiento de un Subject</DocLink>,
                "Gratis, o 1 crédito por documento",
                "Encontrar el expediente por referencia o nombre es gratis. Solo cuesta 1 crédito cuando el Subject tiene varios tipos de documento y la IA elige el tipo.",
              ],
              [
                <DocLink key="p4" href="/es/documentacion/splitters">Split</DocLink>,
                "1 crédito por página del archivo original",
                "Sin importar cuántos documentos salgan. Luego cada segmento paga su propia extracción (y el enrutamiento, si va a una Colección).",
              ],
              [
                <DocLink key="p5" href="/es/documentacion/cleaners">Limpieza de un Cleaner</DocLink>,
                "1 crédito por cada 500 celdas no vacías",
                "Redondeado hacia arriba, mínimo 1. Se cuenta sobre la salida de la limpieza.",
              ],
              [
                <DocLink key="p6" href="/es/documentacion/agentes">Run de un Agente</DocLink>,
                "3 créditos por minuto",
                "Tiempo de navegador redondeado al minuto siguiente, mínimo 1 minuto, cobrado tanto si el Run tiene éxito como si falla.",
              ],
              [
                <DocLink key="p7" href="/es/documentacion/matchers">Matcher</DocLink>,
                "1 crédito por cada 200 celdas comparadas",
                "Redondeado hacia arriba, mínimo 1. Solo cuentan las columnas que usa el Matcher; cuando cada Run se compara con todos los demás, cuenta cada pareja.",
              ],
              [
                <DocLink key="p8" href="/es/documentacion/inspectores">Inspector</DocLink>,
                "Lista de verificación gratis; 1 crédito por comparación con IA",
                "Las reglas simples no cuestan nada. Cada comparación con IA que se evalúa cuesta 1 crédito. Los documentos subidos a una inspección pagan 1 crédito de enrutamiento cada uno, más la extracción.",
              ],
              [
                <DocLink key="p9" href="/es/documentacion/fillers">Filler</DocLink>,
                "Rellenado gratis; 1 crédito por documento enrutado",
                "Escribir los PDFs es gratis. Los documentos que sueltas con Subir y enrutar pagan 1 crédito de enrutamiento cada uno, más la extracción.",
              ],
              [
                <DocLink key="p10" href="/es/documentacion/signals">Signals (waves)</DocLink>,
                "1 crédito por minuto de voz",
                "Por cada minuto iniciado de voz detectada, mínimo 1. El silencio que se recorta antes de la transcripción nunca se cobra.",
              ],
              [
                <DocLink key="p11" href="/es/documentacion/nets">Nets (catches)</DocLink>,
                "Según el volumen, mínimo 1",
                "1 crédito por cada 50 publicaciones nuevas obtenidas, + 1 por cada 10 filas conservadas (publicaciones y comentarios), + 1 por cada 5 imágenes leídas, + 1 por cada 60 segundos de audio, cada parte redondeada hacia arriba; mínimo 1 si se obtuvo algo. Los catches fallidos o cancelados son gratis, igual que las pruebas de un Net (40 por organización cada 24 horas).",
              ],
              [
                <DocLink key="p12" href="/es/documentacion/pipelines">Pipeline</DocLink>,
                "Sin cargo propio",
                "Cada paso paga el precio de su propia función. Crear el borrador de un Pipeline con la IA es gratis; para iniciar una ejecución necesitas un saldo positivo.",
              ],
              [
                "Prompting de un Bucket",
                "1 crédito por pregunta",
                "Indexar una columna para Prompting cuesta 1 crédito por cada 500 valores indexados, mínimo 1.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<Gift size={20} />} title="Gratis">
            La <strong>revisión humana</strong> (aprobar, corregir, rechazar), los{" "}
            <strong>asistentes de IA</strong> que sugieren campos, reglas, revisiones y diseños de
            Pipeline, el rellenado de formularios PDF, adjuntar Runs existentes y asignar a mano
            documentos retenidos o sin coincidencia no cuestan créditos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Cuándo se cobra">
          <DataTable
            head={["Operación", "Se verifica", "Se cobra"]}
            rows={[
              [
                "Run de un Flow",
                "Cuando el Run empieza",
                "Al empezar, por el número de páginas. Un reintento automático del mismo Run nunca paga dos veces.",
              ],
              ["Enrutamiento de Colección, inspección o fill", "Al subir", "Cuando empieza el enrutamiento, sea cual sea el resultado"],
              ["Split, limpieza", "Antes de empezar, con una estimación", "Cuando termina"],
              ["Matcher", "Antes de empezar", "Cuando se completa o, con revisión humana activa, cuando un revisor aprueba. Un Match rechazado no se cobra."],
              ["Run de un Agente", "Al menos 3 créditos para empezar", "Cuando termina el Run, por los minutos usados"],
              ["Wave", "Antes de la transcripción", "Solo si tiene éxito"],
              ["Catch", "Antes de los pasos costosos", "Solo si tiene éxito"],
            ]}
          />
          <p>
            Un Run de Flow que se pausa para{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> ya pagó su
            extracción. El trabajo que se ejecuta después de la aprobación (un Cleaner vinculado,
            por ejemplo) se cobra en ese momento.
          </p>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Cuando se acaba el saldo">
          <Lead>
            Nada se ejecuta a crédito. Las operaciones que no se pueden pagar se rechazan de entrada
            o se detienen limpiamente antes de hacer trabajo que cuesta.
          </Lead>
          <DataTable
            head={["Operación", "Qué pasa"]}
            rows={[
              ["Run de un Flow", "Falla con “Insufficient credits”. No se reintenta automáticamente."],
              ["Run de una Colección", "Falla antes del enrutamiento; no se procesa nada."],
              ["Documento de un Subject", "Queda retenido para asignarlo a mano en lugar de fallar (solo cuando hace falta la clasificación con IA)."],
              ["Split, limpieza, Matcher, Wave, Pipeline, subida a un Filler o a una inspección", "Se rechaza al iniciarlo; la app muestra el diálogo Créditos Insuficientes. Un wave también puede fallar antes de la transcripción si sus minutos de voz cuestan más que el saldo."],
              ["Run de un Agente", "No empieza con menos de 3 créditos; los Runs programados se omiten. Si los créditos se acaban a mitad del Run, se descuenta el saldo restante y el Run registra el cobro parcial."],
              ["Catch programado", "Se omite o falla con “Insufficient credits”."],
            ]}
          />
          <WarningBox>
            El trabajo que llega por correo o por programación no espera a que recargues. Vigila el
            saldo si dependes del correo de entrada o de tareas programadas.
          </WarningBox>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Dónde ver tu saldo y tu uso">
          <DataTable
            head={["Dónde", "Qué ves"]}
            rows={[
              [
                <Fragment key="w1">
                  <strong>Configuración → Facturación y Uso</strong> (solo Propietarios)
                </Fragment>,
                "El saldo (CRÉDITOS) y los créditos usados este mes; Ver detalles abre Uso de Créditos para Este Mes o Todo el Tiempo, desglosado en Extracción, Limpieza, División y Enrutamiento. También tu PLAN, el ALMACENAMIENTO DE BUCKETS (100 MB por organización) y el HISTORIAL de transacciones.",
              ],
              [
                <Fragment key="w2">
                  <strong>Panel</strong>
                </Fragment>,
                "La tarjeta Créditos Disponibles. Cuando el saldo está casi vacío, muestra un botón Contáctanos.",
              ],
              [
                <Fragment key="w3">
                  <strong>Runs</strong>
                </Fragment>,
                "La tarjeta Créditos Usados.",
              ],
              [
                "Las páginas de cada función",
                "Los Runs de Agentes, los Matches, los waves y los catches muestran los créditos que usó cada uno.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Cómo conseguir más créditos">
          <p>
            Por ahora no está abierta la compra autoservicio. Para agregar créditos, contacta al
            equipo de Tavnit: el botón <strong>Contáctanos</strong> de la pestaña Facturación y Uso,
            del Panel y del diálogo Créditos Insuficientes abre un correo para nosotros.
          </p>
          <p>
            Para ver precios y opciones por volumen, consulta los{" "}
            <DocLink href="/pricing">precios</DocLink> o{" "}
            <DocLink href="/es/agendar">agenda una llamada</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<PiggyBank size={24} />} title="Gastar menos créditos">
          <BulletList
            items={[
              "Envía los documentos directamente a un Flow cuando ya conoces su tipo: el enrutamiento suma un crédito por documento.",
              "Divide paquetes antes de la extracción solo cuando realmente contienen varios documentos.",
              "Dale a tus Subjects un solo tipo de documento cuando puedas, o sube directamente a un expediente: así el enrutamiento es gratis.",
              "Configura un tiempo máximo de ejecución corto en los Agentes que todavía estás ajustando.",
              "Adjunta Runs existentes a los Fillers y a las revisiones de los Subjects en lugar de volver a subir documentos.",
            ]}
          />
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Preguntas frecuentes">
          <DataTable
            head={["Pregunta", "Respuesta"]}
            rows={[
              [
                "¿Se reembolsa un Run fallido?",
                "No. La extracción se cobra cuando el Run empieza, y los créditos usados no se reembolsan.",
              ],
              [
                "¿Cuesta algo un Run cancelado?",
                "Sí, los créditos ya usados. Un Run de Agente cancelado paga los minutos que estuvo en ejecución.",
              ],
              [
                "¿Los reintentos automáticos cuestan más?",
                "No. Un Run reintentado con el mismo ID de Run solo se cobra una vez.",
              ],
              [
                "¿Quién puede ver la facturación?",
                "Solo el Propietario de la organización ve la pestaña Facturación y Uso. Los demás miembros ven el saldo en el Panel.",
              ],
              [
                "¿Cuesta más usar la API o el conector MCP?",
                "No. El trabajo iniciado por la API o por MCP cuesta lo mismo que en la app.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Receipt size={20} />} title="Precios en la página de cada función">
            Cada página de función repite sus propios precios en una sección de costos. Si alguna vez
            difieren de esta página, la referencia es esta.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion",
              label: "Primeros pasos",
              description: "Crea tu primer Flow y procesa un documento.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Quién puede gestionar la facturación",
              description: "Qué pueden hacer los Propietarios, Administradores, Miembros y usuarios Solo HITL.",
            },
            {
              href: "/es/documentacion/agentes",
              label: "Límites y tiempo de ejecución de los Agentes",
              description: "El tiempo máximo y el límite de pasos que acotan lo que puede costar un Run.",
            },
            {
              href: "/es/documentacion/api",
              label: "Inicia trabajo con la API REST",
              description: "Los Runs iniciados por la API cuestan lo mismo que en la app.",
            },
          ]}
        />
      </section>
    </>
  );
}
