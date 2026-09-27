import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AudioLines,
  Code2,
  Coins,
  FilePlus,
  FlaskConical,
  HelpCircle,
  Info,
  Layers,
  Lock,
  Mic,
  PlayCircle,
  Send,
  Table2,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
} from "@/components/docs/ui";

export const metadata = docMetadata("signals", "es");

const RUN_CURL = `curl -X POST https://run.tavnit.io/api/signals/SIGNAL_ID/run \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -F "file=@call.mp3"`;

const RUN_RESPONSE = `{
  "success": true,
  "wave_id": "…",
  "signal_id": "…",
  "status": "queued",
  "audio_seconds": 754,
  "estimated_max_credits": 13,
  "message": "Wave queued for processing."
}`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="signals" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Signals
        </h1>

        <DocCard icon={<AudioLines size={24} />} title="¿Qué es un Signal?">
          <Lead>
            Un Signal convierte conversaciones grabadas en una tabla. Describes quién participa, qué
            tipos de conversación esperar y qué quieres saber; Tavnit transcribe el audio, identifica
            quién dijo qué, separa la grabación en conversaciones distintas y llena tus columnas turno
            por turno.
          </Lead>
          <p>
            El Signal es la configuración. Cada archivo de audio que pasas por él produce un{" "}
            <strong>Wave</strong>: una ejecución con su propia transcripción, reproductor y tabla de
            resultados. La grabación de todo un turno en una tienda puede contener decenas de
            conversaciones de venta; un Wave encuentra cada una y la estructura por separado.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta, se activa a solicitud">
            Los Signals están en beta y se activan por organización. Si no ves &ldquo;Signals&rdquo;
            en la barra lateral, contacta al equipo de Tavnit para activarlos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar un Signal">
          <BulletList
            items={[
              "Verificar si los vendedores mencionan una promoción y qué productos preguntan los clientes",
              "Evaluar llamadas de soporte o de admisión contra un checklist de cosas que deberían ocurrir",
              "Convertir entrevistas en filas que puedes filtrar, graficar y guardar en un Bucket",
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Qué configuras">
          <Lead>
            Solo se requieren un nombre y al menos un tipo de miembro. Todo lo demás es opcional y
            agrega columnas o filtros al resultado.
          </Lead>
          <DataTable
            head={["Ajuste", "Qué hace"]}
            rows={[
              ["Tipos de Miembro", "Los participantes que esperas (por ejemplo Vendedor y Cliente), cada uno con una descripción opcional de cómo reconocerlo. Los hablantes inesperados se etiquetan como “Other”."],
              ["Tipos de Interacción", "Los tipos de conversación a capturar (Venta, Soporte, Devolución…). Cada conversación detectada se clasifica como uno de ellos, o “Other”. Déjalo vacío para capturar todas las conversaciones, sin tipo."],
              ["Reglas", "Verificaciones sí/no evaluadas en cada turno, como “¿Se mencionó la promoción de teclados?”. Cada ocurrencia se convierte en una fila. Una regla puede aplicar a todos los tipos de interacción o solo a algunos (“Aplica a”)."],
              ["Campos de Extracción", "Datos que se extraen de cada turno, como “Productos mencionados”. Cada campo se convierte en una columna."],
              ["Categorías de Contenido", "Cada turno se etiqueta con la categoría que mejor encaje, como “objeción”."],
              ["Reglas de Conversación", "Verificaciones sí/no evaluadas una vez sobre toda la conversación, como “¿Se resolvió la venta?”. Cada una se convierte en una columna verdadero/falso."],
              ["Categorías de Conversación", "Grupos de clasificación con opciones (por ejemplo Resultado: Ganada / Perdida). Se elige una opción por grupo para toda la conversación."],
              ["Excluir otras interacciones", "Deja fuera del resultado las conversaciones que no coinciden con ningún tipo de interacción."],
              ["Incluir columna Wave ID", "Agrega una columna Wave ID al inicio para poder combinar filas de varios Waves, en las exportaciones a CSV, webhook y Bucket."],
            ]}
          />
          <p>
            Las descripciones importan: la IA las lee para decidir quién es quién y cuándo aplica una
            regla o una categoría. Los nombres deben ser únicos dentro de cada lista y no pueden
            repetir el nombre de una columna integrada.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Signal">
          <NumberedList
            items={[
              <Fragment key="c1">
                Abre <strong>&ldquo;Signals&rdquo;</strong> en la barra lateral y haz clic en{" "}
                <strong>&ldquo;Crear Signal&rdquo;</strong>.
              </Fragment>,
              <Fragment key="c2">
                Elige cómo empezar: <strong>&ldquo;Preset de conversación&rdquo;</strong> (una base de
                ventas, soporte o entrevista), <strong>&ldquo;Desde un signal existente&rdquo;</strong>{" "}
                (duplica toda su configuración) o <strong>&ldquo;Desde cero&rdquo;</strong>.
              </Fragment>,
              "Escribe el Nombre del Signal (mínimo 3 caracteres) y define al menos un tipo de miembro.",
              "Si quieres, agrega tipos de interacción, reglas, campos de extracción y categorías de contenido por turno, y luego reglas y grupos de categorías a nivel de conversación.",
              "En Opciones, decide si excluir las interacciones sin coincidencia, agregar una columna Wave ID o enviar los resultados a un webhook.",
              <Fragment key="c6">
                Haz clic en <strong>&ldquo;Crear Signal&rdquo;</strong>. Los grabadores, la exportación
                a Bucket y el ID del Signal para la API se configuran en la página del Signal una vez
                creado.
              </Fragment>,
            ]}
          />
          <p>
            Para cambiar la configuración más adelante, abre el Signal y haz clic en{" "}
            <strong>&ldquo;Editar&rdquo;</strong> en cualquier sección de configuración, y luego en{" "}
            <strong>&ldquo;Guardar&rdquo;</strong>. Los cambios aplican a los Waves nuevos; cada Wave
            conserva una copia de la configuración con la que se ejecutó.
          </p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Ejecutar un Wave">
          <NumberedList
            items={[
              <Fragment key="r1">
                Haz clic en <strong>&ldquo;Ejecutar Wave&rdquo;</strong> en la página del Signal (o en
                la lista de Signals, y luego selecciona el Signal).
              </Fragment>,
              <Fragment key="r2">
                En <strong>&ldquo;Subir Audio&rdquo;</strong>, elige la grabación.
              </Fragment>,
              "El Wave queda en cola y se procesa en segundo plano. Su página se actualiza automáticamente.",
            ]}
          />
          <DataTable
            head={["Límite", "Valor"]}
            rows={[
              ["Formatos", "mp3, mp4, mpeg, mpga, m4a, wav, webm"],
              ["Tamaño del archivo", "Hasta 150 MB"],
              ["Duración de la grabación", "Hasta 8 horas de audio, con un máximo de 2 horas de voz detectada"],
            ]}
          />
          <p>
            Los silencios largos se recortan antes de cualquier procesamiento y nunca se cobran, así
            que una grabación de un turno completo con largos ratos en silencio no es problema. El
            idioma hablado se detecta automáticamente. Un Signal desactivado no puede ejecutar Waves
            hasta que lo actives de nuevo.
          </p>
          <p>
            Un Wave pasa de <strong>En cola</strong> a <strong>En ejecución</strong>
            (&ldquo;Estructurando audio&hellip;&rdquo;) y termina como <strong>Completado</strong> o{" "}
            <strong>Fallido</strong>. Todos los Waves de un Signal aparecen en su sección{" "}
            <strong>&ldquo;Waves&rdquo;</strong>, con un filtro por estado.
          </p>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Leer un Wave">
          <Lead>
            Un Wave completado muestra la duración (y cuánto fue voz), el número de interacciones (y
            cuántas se excluyeron), los turnos y los créditos cobrados.
          </Lead>
          <BulletList
            items={[
              <Fragment key="w1">
                <strong>Audio</strong>: un reproductor de la grabación, con{" "}
                <strong>&ldquo;Descargar original&rdquo;</strong>.
              </Fragment>,
              <Fragment key="w2">
                <strong>Conversación</strong>: la transcripción por hablante y tipo de miembro.
                Búscala, muestra <strong>&ldquo;Solo extracciones&rdquo;</strong>, usa{" "}
                <strong>&ldquo;Reproducir desde aquí&rdquo;</strong> en cualquier turno y{" "}
                <strong>&ldquo;Exportar transcripción&rdquo;</strong>.
              </Fragment>,
              <Fragment key="w3">
                <strong>Interacciones</strong>: un perfil de cada conversación detectada: duración,
                turnos, el turno más largo, la participación de cada hablante y sus categorías, cada
                valor extraído (haz clic en uno para saltar a ese turno) y los veredictos a nivel de
                conversación. Las interacciones excluidas aparecen marcadas.
              </Fragment>,
              <Fragment key="w4">
                <strong>Resultados</strong>: la tabla de resultados, filtrable por interacción, con{" "}
                <strong>&ldquo;Exportar CSV&rdquo;</strong>, <strong>&ldquo;Exportar JSON&rdquo;</strong>{" "}
                y <strong>&ldquo;Exportar a bucket&rdquo;</strong>.
              </Fragment>,
            ]}
          />
          <p>La tabla de resultados siempre empieza con estas columnas, seguidas de tus campos de extracción y las columnas a nivel de conversación:</p>
          <DataTable
            head={["Columna", "Contenido"]}
            rows={[
              ["Interaction", "A qué conversación de la grabación pertenece la fila."],
              ["Interaction Type", "Uno de tus tipos de interacción, u Other."],
              ["Turn / Timedate", "El número de turno y cuándo se dijo."],
              ["Member / Member Type", "El hablante y el tipo de miembro que se le asignó."],
              ["Content / Content Category", "Lo que se dijo y su categoría."],
              ["Rule / Rule Check", "La regla a la que se refiere la fila. Rule Check es verdadero en la primera ocurrencia de la regla dentro de una interacción; una regla que nunca ocurrió igual tiene una fila por interacción, con Rule Check en falso."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Mic size={24} />} title="Grabadores">
          <Lead>
            Los grabadores son miembros de la organización que capturan sesiones con la app Android{" "}
            <strong>Tavnit Recorder</strong> y las envían a un Signal, donde cada una se convierte
            automáticamente en un Wave.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="rc1">
                Abre el Signal y ve a <strong>&ldquo;Grabadores&rdquo;</strong>.
              </Fragment>,
              <Fragment key="rc2">
                Haz clic en <strong>&ldquo;Agregar grabador&rdquo;</strong> y elige el miembro.
              </Fragment>,
              "Escribe un ID de referencia (un identificador libre, como un número de empleado, que se estampa en cada Wave que sube ese grabador) y elige el tipo de miembro con el que graba.",
            ]}
          />
          <p>
            Un grabador puede estar Activo o Deshabilitado, editarse o quitarse. Al quitarlo se
            conservan los Waves que ya subió. Los Waves que llegan desde la app muestran cuándo se
            grabaron, el ID de referencia y el tipo de miembro.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="A dónde van los datos">
          <DataTable
            head={["Salida", "Cómo funciona"]}
            rows={[
              [
                "Webhook",
                <Fragment key="o1">
                  Envía la tabla de resultados a una URL <InlineCode>https://</InlineCode> cuando un
                  Wave termina. Consulta <DocLink href="/es/documentacion/webhooks">Webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Exportar a Bucket",
                <Fragment key="o2">
                  Escribe las filas de cada Wave completado en un{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink>. Relaciona cada columna
                  del wave con una columna del bucket y, si quieres, agrega una columna de ID del wave.
                </Fragment>,
              ],
              ["Exportación manual", "Desde un Wave: Exportar CSV, Exportar JSON o Exportar a bucket."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Costo">
          <p>
            Un Wave cuesta <strong>1 crédito por cada minuto iniciado de voz detectada</strong>, con un
            mínimo de 1. El silencio recortado no se cuenta. Necesitas al menos 1 crédito para iniciar
            un Wave; después del análisis de silencios, un Wave cuyo costo real supera tu saldo falla
            antes de cualquier procesamiento con IA, y los créditos solo se descuentan cuando el Wave
            se completa. La página del Wave muestra los créditos cobrados. Consulta{" "}
            <DocLink href="/es/documentacion/creditos">Créditos</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <p>
            Copia el ID desde <strong>&ldquo;ID del Signal&rdquo;</strong> en la página del Signal y
            envía el audio como multipart <InlineCode>file</InlineCode> (o como JSON con{" "}
            <InlineCode>file_base64</InlineCode> y <InlineCode>filename</InlineCode>):
          </p>
          <CodeBlock lang="bash — encolar un Wave" code={RUN_CURL} />
          <CodeBlock lang="JSON — respuesta 202" code={RUN_RESPONSE} />
          <p>
            <InlineCode>estimated_max_credits</InlineCode> es un tope calculado con la duración bruta;
            la cifra real se basa en la voz detectada. Errores: 400 si el archivo falta, está vacío,
            no es compatible o es demasiado largo; 402 si el saldo es menor a 1 crédito; 403/404 si el
            Signal no está en tu organización. Sigue el Wave en la app. Consulta la página de la{" "}
            <DocLink href="/es/documentacion/api">API REST</DocLink> para la autenticación.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Quién puede hacer qué">
          <DataTable
            head={["Acción", "Roles"]}
            rows={[
              ["Crear, editar y eliminar Signals", "Propietario, Administrador"],
              ["Gestionar grabadores", "Propietario, Administrador"],
              ["Ejecutar Waves", "Propietario, Administrador, Miembro"],
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/roles-de-usuario">Roles de usuario</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Síntoma", "Qué revisar"]}
            rows={[
              ["Se rechaza la subida", "Revisa el formato (mp3, mp4, mpeg, mpga, m4a, wav, webm), el límite de 150 MB y el de 8 horas de duración."],
              ["“Ejecutar Wave” está deshabilitado", "El Signal está inactivo. Actívalo primero."],
              ["Los hablantes quedan con el tipo de miembro equivocado", "Agrega descripciones a tus tipos de miembro que expliquen cómo distinguirlos (su rol, lo que suelen decir)."],
              ["Las conversaciones caen en Other", "Describe cada tipo de interacción de forma más concreta, o deja los tipos de interacción vacíos para capturarlo todo."],
              ["El Wave falló después de quedar en cola", "Compara tu saldo de créditos con la duración de la voz, y verifica que la grabación tenga como máximo 2 horas de voz."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/buckets",
              label: "Guarda las filas de los Waves en un Bucket",
              description: "Filtra, grafica y combina las filas de muchos Waves en una sola tabla.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Recibe resultados por webhook",
              description: "Cómo Tavnit envía los resultados a tu endpoint.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cómo se cobran los créditos",
              description: "Costos por función, incluidos los minutos de audio.",
            },
            {
              href: "/es/documentacion/nets",
              label: "Estructura publicaciones de redes sociales con Nets",
              description: "La misma idea para publicaciones y comentarios públicos de Instagram.",
            },
          ]}
        />
      </section>
    </>
  );
}
