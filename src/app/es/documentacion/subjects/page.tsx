import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  Briefcase,
  Code,
  Coins,
  FilePlus,
  FileText,
  FolderInput,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
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

export const metadata = docMetadata("subjects", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="subjects" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Subjects
        </h1>

        <DocCard icon={<Briefcase size={24} />} title="¿Qué es un Subject?">
          <Lead>
            Un Subject modela algo que tu empresa sigue y que está formado por varios documentos: una
            compra, un paciente, un embarque, un reclamo. Cada instancia es un{" "}
            <strong>expediente</strong>, y Tavnit archiva cada documento entrante en el expediente
            correcto y lo extrae con el Flow correcto.
          </Lead>
          <p>
            Un <DocLink href="/es/documentacion/flows">Flow</DocLink> procesa un tipo de documento.
            Un Subject está un nivel más arriba: dice &ldquo;una compra es una cotización, una orden
            de compra y una factura&rdquo;, le da a cada compra una referencia como{" "}
            <InlineCode>PT-0042</InlineCode> y reúne en una sola página los documentos, Runs y
            revisiones de esa compra.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="Beta">
            Subjects es una función Beta. Está visible para todas las organizaciones y sus pantallas
            todavía pueden cambiar.
          </InfoBox>
          <DataTable
            head={["Concepto", "Qué es"]}
            rows={[
              ["Subject", "La definición: sus tipos de documento, prefijo de referencia, correo de entrada y revisiones."],
              [
                "Expediente",
                "Una instancia del Subject, con una referencia (PT-0042), un nombre único, un estado de flujo de trabajo y un estado abierto o cerrado.",
              ],
              [
                "Tipo de documento",
                "Un espacio tipado en cada expediente (Cotización, Factura…), cada uno ligado al Flow que lo extrae.",
              ],
              [
                "Documento retenido",
                "Un documento que Tavnit no pudo archivar con certeza. Espera a que una persona lo asigne.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar un Subject">
          <BulletList
            items={[
              "Varios documentos distintos pertenecen a la misma cosa del mundo real y quieres verlos juntos",
              "Los documentos llegan por correo a lo largo de días o semanas, y cada uno debe caer en el expediente correcto",
              "Quieres comparar o revisar los documentos de un mismo expediente: cotizaciones entre sí, una factura contra su orden",
              "Un socio o un Agente envía documentos que llevan tu número de referencia",
            ]}
          />
          <InfoBox color="blue" icon={<Route size={20} />} title="Subjects vs. Colecciones">
            Una <DocLink href="/es/documentacion/colecciones">Colección</DocLink> responde
            &ldquo;¿qué tipo de documento es este?&rdquo; y lo envía a un Flow. Un Subject también
            responde &ldquo;¿a qué compra pertenece?&rdquo;, y lo hace sin IA, por referencia o por
            nombre exacto.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Subject">
          <NumberedList
            items={[
              <Fragment key="s1">
                Abre <strong>Subjects</strong> y haz clic en <strong>&ldquo;Nuevo Subject&rdquo;</strong>.
              </Fragment>,
              <Fragment key="s2">
                Responde <strong>&ldquo;¿Qué compone cada caso?&rdquo;</strong>:{" "}
                <strong>Desde tus flows</strong> (elige los documentos que componen un expediente:
                un tipo de documento por Flow), <strong>Desde un subject existente</strong> (duplica
                sus tipos de documento y revisiones) o <strong>Desde cero</strong>.
              </Fragment>,
              <Fragment key="s3">
                Dale un <strong>Nombre</strong> y un <strong>Prefijo de referencia</strong> de 1 a 8
                letras o dígitos, como <InlineCode>PT</InlineCode>. Tavnit te avisa si otro Subject
                ya usa ese prefijo.
              </Fragment>,
              <Fragment key="s4">
                Si quieres, define la <strong>Etiqueta del expediente</strong> (singular y plural),
                por ejemplo &ldquo;Compra&rdquo; y &ldquo;Compras&rdquo;. Las páginas del Subject
                usarán entonces esas palabras en lugar del término genérico.
              </Fragment>,
              <Fragment key="s5">
                Haz clic en <strong>Crear</strong> y revisa la pestaña{" "}
                <strong>Document types</strong>.
              </Fragment>,
            ]}
          />
          <WarningBox>
            El prefijo de referencia no se puede cambiar después de crearlo. Las referencias ya
            emitidas deben seguir siendo válidas, así que elige un prefijo que no te moleste ver en
            cada correo y cada nombre de archivo.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FileText size={24} />} title="Tipos de documento">
          <Lead>
            Cada tipo de documento es un espacio en cada expediente, procesado por un Flow. Cuando un
            documento se archiva en ese espacio, Tavnit inicia un Run de ese Flow y sus resultados
            aparecen en el expediente.
          </Lead>
          <p>
            Agrega un tipo desde la pestaña <strong>Document types</strong> con un{" "}
            <strong>Name</strong> (p. ej., &ldquo;Cotización&rdquo;) y un <strong>Flow</strong>.
            Algunas de estas pantallas todavía aparecen en inglés en la app, así que citamos los
            nombres tal como se muestran. Dos interruptores controlan cada tipo:
          </p>
          <DataTable
            head={["Interruptor", "Efecto"]}
            rows={[
              [
                "Multiple",
                "Apagado: un expediente acepta un solo documento de este tipo, y un segundo queda retenido para revisión en lugar de archivarse. Encendido: el expediente acepta cualquier cantidad (varias cotizaciones, por ejemplo).",
              ],
              [
                "Required",
                "Marca el tipo como esperado en cada expediente. La página del expediente muestra la etiqueta Required y una marca de verificación cuando hay un documento completado de ese tipo.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Briefcase size={24} />} title="Expedientes">
          <Lead>
            Un expediente se abre a mano, mediante la API o con un Agente. Su referencia se emite
            automáticamente a partir del prefijo y un contador: sin huecos y nunca reutilizada.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="c1">
                En el Subject, haz clic en <strong>New &lt;etiqueta&gt;</strong> (por ejemplo,
                &ldquo;New compra&rdquo;).
              </Fragment>,
              "Escribe un nombre. Debe ser único dentro del Subject, porque un documento cuyo asunto de correo o nombre de archivo sea igual al nombre se archiva en este expediente.",
              <Fragment key="c3">
                Haz clic en <strong>Create</strong>. El expediente recibe la siguiente referencia,
                como <InlineCode>PT-0043</InlineCode>.
              </Fragment>,
            ]}
          />
          <p>La página del expediente lo reúne todo:</p>
          <BulletList
            items={[
              "La referencia, el nombre, el estado de flujo de trabajo y el estado Open o Closed",
              "Sus documentos agrupados por tipo, cada uno con su estado de enrutamiento y un enlace Ver resultados al Run",
              "Una zona para subir documentos directamente al expediente (eliges el tipo de documento cuando el Subject tiene más de uno)",
              <Fragment key="c5">
                <strong>Email this &lt;etiqueta&gt;</strong>: la dirección propia del expediente,
                cuando el correo de entrada está activo
              </Fragment>,
              "La sección de revisiones (Checks), con los Matches e inspecciones que ya se ejecutaron sobre el expediente",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="El estado de trabajo y abierto/cerrado son cosas distintas">
            Los <strong>Workflow statuses</strong> (pestaña Settings) son tus propias etiquetas
            separadas por comas, como <InlineCode>new, in_progress, done</InlineCode>, con un{" "}
            <strong>Default status</strong> para los expedientes nuevos. Cambia el estado de un
            expediente desde el selector de su página. Abierto y cerrado es un ciclo de vida aparte
            que controla la entrada de documentos; lo vemos más abajo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Cómo encuentra cada documento su expediente">
          <Lead>
            Archivar un documento en un expediente nunca usa IA. Tavnit busca la referencia del
            expediente y, si no la hay, un nombre de expediente exacto. Si ninguno da una respuesta
            única y clara, el documento queda retenido para una persona en lugar de adivinar.
          </Lead>
          <p>
            Esto aplica a los documentos enviados al correo de entrada, subidos con{" "}
            <strong>Agregar docs</strong> en el Subject o enviados al Subject mediante la API.
          </p>
          <p>
            Las referencias se leen con tolerancia: <InlineCode>PT-0042</InlineCode>,{" "}
            <InlineCode>pt 42</InlineCode> y <InlineCode>PT0042</InlineCode> significan todas el
            expediente 42. Tavnit revisa los lugares donde puede aparecer una referencia en orden de
            autoridad, y el primero que contiene una referencia decide:
          </p>
          <DataTable
            head={["Origen", "Orden de revisión"]}
            rows={[
              [
                "Correo",
                "Dirección del expediente (etiqueta +) → asunto del correo → cuerpo del correo → nombre del adjunto → texto del documento",
              ],
              ["Subida o API", "Nombre del archivo → texto del documento"],
            ]}
          />
          <BulletList
            items={[
              "Una referencia que coincide con un expediente: el documento se archiva ahí.",
              "Dos referencias distintas en el mismo lugar: queda retenido como ambiguo.",
              "Una referencia que no coincide con ningún expediente: queda retenido; un número mal escrito nunca recurre a la coincidencia por nombre.",
              "Ninguna referencia: Tavnit compara el asunto del correo y el nombre del archivo (sin extensión) con los nombres de los expedientes, como valor completo, sin distinguir mayúsculas y sin espacios alrededor. Nunca una coincidencia parcial, nunca el cuerpo.",
            ]}
          />
          <p>
            Una vez conocido el expediente, Tavnit elige el tipo de documento. Un Subject con un
            solo tipo no necesita decidir nada. Con varios tipos, un clasificador de IA lee la
            primera página y elige entre ellos: es el único paso con IA y cuesta un crédito.
          </p>
          <InfoBox color="green" icon={<ShieldCheck size={20} />} title="Subir directamente a un expediente evita el enrutamiento">
            Un documento que sueltas en la página de un expediente, envías a la dirección propia del
            expediente o publicas en el expediente mediante la API ya sabe cuál es su expediente.
            Las subidas desde la página del expediente y por la API además indican el tipo de
            documento, así que no se clasifica nada ni se cobra crédito de enrutamiento.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Correo de entrada">
          <NumberedList
            items={[
              <Fragment key="e1">
                Abre la pestaña <strong>Email intake</strong> del Subject y activa el interruptor.
              </Fragment>,
              <Fragment key="e2">
                Copia la <strong>Intake address</strong> y reenvía documentos a ella, o dásela a tus
                proveedores y socios.
              </Fragment>,
              "Si quieres, limita qué remitentes se aceptan con la lista de remitentes permitidos de esa misma pestaña.",
            ]}
          />
          <p>Tres cosas llevan un adjunto recibido por correo a su expediente:</p>
          <BulletList
            items={[
              <Fragment key="e4">
                Una referencia como <InlineCode>PT-0042</InlineCode> en el asunto, el cuerpo o el
                nombre del archivo. Las respuestas conservan el asunto, así que todo el hilo sigue
                al expediente automáticamente.
              </Fragment>,
              <Fragment key="e5">
                La dirección propia del expediente: la dirección de entrada con la referencia
                agregada como etiqueta +, p. ej. <InlineCode>intake+PT-0042@…</InlineCode>. Aparece
                en la página del expediente como <strong>Email this &lt;etiqueta&gt;</strong>.
              </Fragment>,
              "Un asunto de correo o un nombre de archivo exactamente igual al nombre de un expediente.",
            ]}
          />
          <p>
            Cada adjunto se procesa por separado. Para los formatos de dirección y los tipos de
            adjunto que acepta Tavnit, consulta la{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">integración por correo</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Documentos retenidos y clasificación manual">
          <Lead>
            Todo lo que Tavnit no puede archivar con certeza llega a <strong>Held documents</strong>,
            con el motivo escrito debajo. Nada se procesa hasta que alguien decide.
          </Lead>
          <p>Para cada documento retenido puedes:</p>
          <BulletList
            items={[
              <Fragment key="h1">
                <strong>Assign</strong>: elige un expediente y un tipo de documento. Tavnit inicia
                el Run del Flow sobre el archivo guardado, sin volver a subirlo y sin crédito de
                enrutamiento. Se permite asignarlo a un expediente cerrado, porque una persona lo
                eligió de forma explícita.
              </Fragment>,
              <Fragment key="h2">
                <strong>New &lt;etiqueta&gt; from doc</strong>: abre un expediente nuevo y archiva
                el documento en él en un solo paso.
              </Fragment>,
              <Fragment key="h3">
                <strong>Discard</strong>: descártalo.
              </Fragment>,
            ]}
          />
          <p>
            Un archivo que Tavnit no puede procesar en absoluto (un tipo no admitido o un archivo
            inválido) aparece como Failed en lugar de Held. Los estados de un documento son Queued,
            Routing, Routed, Held, Failed y Discarded.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Cerrar y reabrir un expediente">
          <p>
            Haz clic en <strong>Close</strong> en un expediente cuando esté completo. A partir de ese
            momento, los documentos que se enrutan a él automáticamente quedan retenidos en lugar de
            archivarse, así que una respuesta tardía no puede reabrir un trabajo terminado por
            accidente. La página indica que el expediente está cerrado y se ocultan las subidas
            desde esa página.
          </p>
          <p>
            <strong>Reopen</strong> restablece la entrada automática. Cerrar siempre se puede
            deshacer.
          </p>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Revisiones del expediente: Matchers e Inspectores">
          <Lead>
            Vincula <DocLink href="/es/documentacion/matchers">Matchers</DocLink> e{" "}
            <DocLink href="/es/documentacion/inspectores">Inspectores</DocLink> al Subject una sola
            vez y ejecútalos en cualquier expediente desde su página. Trabajan sobre los Runs
            completados del expediente: no se vuelve a subir ni a extraer nada.
          </Lead>
          <DataTable
            head={["Revisión", "Configuración en la pestaña Checks", "Ejecución desde el expediente"]}
            rows={[
              [
                "Matcher",
                "Vincula un Matcher. Compara documentos del Flow del Matcher, por ejemplo cotizaciones lado a lado.",
                "Necesita al menos dos documentos completados de ese Flow en el expediente. La fila muestra cuántos Runs elegibles hay.",
              ],
              [
                "Inspector",
                "Vincula un Inspector y asigna cada una de sus entradas a un tipo de documento (por defecto, el tipo que usa el mismo Flow).",
                "Adopta los Runs completados del expediente. Si una entrada requerida no tiene documento completado, Tavnit indica qué falta.",
              ],
            ]}
          />
          <p>
            Haz clic en <strong>Run</strong> junto a la revisión. El resultado aparece en el
            expediente con su estado y, en las inspecciones, el veredicto; ábrelo para ver la
            comparación o la lista de verificación completa. Las revisiones se cobran como cualquier
            otro Match o inspección.
          </p>
        </DocCard>

        <DocCard icon={<Bot size={24} />} title="Agentes que entregan a un Subject">
          <p>
            Un <DocLink href="/es/documentacion/agentes">Agente</DocLink> puede archivar lo que
            recopila directamente en un Subject. En la configuración de entrega del Agente, elige el{" "}
            <strong>Subject</strong>, el campo que da el <strong>Nombre del caso</strong>, qué
            archivos capturados se archivan como qué tipo de documento (
            <strong>Archivar los documentos capturados como</strong>), los campos opcionales para{" "}
            <strong>Guardar como parámetros del caso</strong> y qué hacer{" "}
            <strong>Si el caso ya existe</strong>: <strong>Omitir</strong> o{" "}
            <strong>Agregar los documentos faltantes</strong>.
          </p>
          <p>
            Los expedientes se buscan por nombre, así que volver a ejecutar el Agente nunca crea un
            duplicado. Los documentos archivados así muestran un enlace <strong>Agente</strong> al
            Run del Agente.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Los endpoints de Subjects usan el mismo encabezado <InlineCode>X-API-Key</InlineCode>{" "}
            que el resto de la <DocLink href="/es/documentacion/api">API REST</DocLink>:
          </p>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              [
                <InlineCode key="a1">POST /api/subjects/&lt;subject_id&gt;/process</InlineCode>,
                "Envía un documento al Subject; se enruta a un expediente igual que una subida. Devuelve 202 con un subject_doc_id.",
              ],
              [
                <InlineCode key="a2">POST /api/cases/&lt;case_id&gt;/docs</InlineCode>,
                "Sube directamente a un expediente (doc_type_id es obligatorio si el Subject tiene varios tipos). Sin cargo de enrutamiento; devuelve el run_id.",
              ],
              [
                <InlineCode key="a3">POST /api/subjects/&lt;subject_id&gt;/cases</InlineCode>,
                "Abre un expediente con un name y un objeto params opcional. La referencia se emite por ti.",
              ],
              [
                <InlineCode key="a4">GET /api/subjects/&lt;subject_id&gt;/cases</InlineCode>,
                "Lista expedientes, filtrados por state, status o search, hasta 200 por página.",
              ],
              [
                <InlineCode key="a5">GET /api/cases/&lt;case_id&gt;</InlineCode>,
                "Lee un expediente y sus documentos, cada uno con el run_id que puedes consultar para obtener los resultados.",
              ],
              [
                <InlineCode key="a6">POST /api/cases/&lt;case_id&gt;/close</InlineCode>,
                "Cierra un expediente; /reopen lo reabre.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuestan los Subjects">
          <DataTable
            head={["Cargo", "Cuándo"]}
            rows={[
              ["Gratis", "Encontrar el expediente por referencia o nombre, retener documentos, asignarlos a mano."],
              [
                "1 crédito por documento",
                "Solo cuando el Subject tiene más de un tipo de documento y el clasificador de IA elige el tipo; se cobra sin importar lo que responda.",
              ],
              ["El cargo de extracción del Flow", "Por cada documento archivado, cuando su Run lo procesa."],
              ["El cargo propio de la revisión", "Cuando ejecutas un Matcher o un Inspector en un expediente."],
            ]}
          />
          <p>
            Si el saldo no alcanza para el crédito de clasificación, el documento queda retenido en
            lugar de fallar, y puedes asignarlo a mano. Consulta{" "}
            <DocLink href="/es/documentacion/creditos">Créditos y facturación</DocLink> para ver
            todos los precios.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Quién puede hacer qué">
          <BulletList
            items={[
              "Los Administradores y Propietarios crean Subjects y vinculan Matchers e Inspectores. Quien creó un Subject también puede editarlo o eliminarlo.",
              "Todos los miembros excepto los usuarios Solo HITL trabajan con expedientes: los abren, suben documentos, clasifican los retenidos, cambian el estado, cierran, reabren y ejecutan revisiones.",
            ]}
          />
          <p>
            Un Subject se puede desactivar en lugar de eliminarlo: deja de aceptar documentos y
            expedientes nuevos, y <strong>Reactivar</strong> lo recupera. Consulta los{" "}
            <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <p>Los motivos de retención aparecen en inglés, tal como los muestra la app:</p>
          <DataTable
            head={["Motivo de retención", "Qué hacer"]}
            rows={[
              [
                "No case reference or case name found",
                "Pide a los remitentes que incluyan la referencia, usa la dirección propia del expediente o asígnalo a mano.",
              ],
              [
                "Ambiguous: multiple case references found",
                "El correo o el archivo menciona dos expedientes. Asígnalo al correcto.",
              ],
              [
                "Reference … matches no case",
                "El número está mal o el expediente aún no existe. Abre el expediente y luego asigna el documento.",
              ],
              ["Case … is closed", "Reabre el expediente o asígnale el documento de forma explícita."],
              [
                "Document type … already filled",
                "Activa Multiple para ese tipo o descarta el duplicado.",
              ],
              [
                "No clear document type",
                "El clasificador no pudo decidir. Asigna el tipo a mano; nombres y descripciones de Flow más claros lo ayudan la próxima vez.",
              ],
              [
                "Flow for document type … is unavailable",
                "El Flow del tipo se eliminó o se desactivó. Asigna al tipo un Flow activo.",
              ],
              [
                "Insufficient credits for document-type classification",
                "Agrega créditos o asigna el documento a mano (gratis).",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Los tipos de documento necesitan un Flow activo">
            Un tipo de documento cuyo Flow está inactivo o eliminado no puede recibir documentos.
            Revisa la pestaña Document types después de reorganizar tus Flows.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/matchers",
              label: "Compara documentos dentro de un expediente",
              description: "Cómo los Matchers emparejan filas entre Runs y arman una tabla comparativa.",
            },
            {
              href: "/es/documentacion/inspectores",
              label: "Revisa un expediente con una lista de verificación",
              description: "Los Inspectores evalúan reglas sobre varios documentos y dan un veredicto.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Direcciones de correo y adjuntos",
              description: "Formatos de dirección, tipos de archivo aceptados y listas de remitentes permitidos.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cuánto cuesta todo",
              description: "Todos los precios en créditos de Tavnit y qué pasa cuando se acaba el saldo.",
            },
          ]}
        />
      </section>
    </>
  );
}
