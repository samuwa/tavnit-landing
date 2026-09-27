import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Activity,
  AlertTriangle,
  Ban,
  CalendarClock,
  Code2,
  Coins,
  FilePlus,
  FlaskConical,
  HelpCircle,
  Info,
  Lock,
  PlayCircle,
  Radar,
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

export const metadata = docMetadata("nets", "es");

const CATCH_CURL = `curl -X POST https://run.tavnit.io/api/nets/NET_ID/catch \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{}'`;

const BACKFILL_BODY = `{
  "window_start": "2026-09-01T00:00:00Z",
  "window_end": "2026-09-15T00:00:00Z"
}`;

const STATUS_CURL = `curl https://run.tavnit.io/api/catches/CATCH_ID \\
  -H "X-API-Key: $TAVNIT_API_KEY"`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="nets" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Nets
        </h1>

        <DocCard icon={<Radar size={24} />} title="¿Qué es una Net?">
          <Lead>
            Una Net recolecta publicaciones públicas de redes sociales de las cuentas, hashtags,
            lugares o enlaces de publicaciones que elijas, conserva las que cumplen una regla de
            relevancia escrita en lenguaje simple y llena tus propias columnas para cada publicación y
            comentario.
          </Lead>
          <p>
            Cada ejecución de una Net es un <strong>Catch</strong>: cubre una ventana de tiempo,
            recolecta lo que se publicó en ella y produce una tabla. Ejecuta Catches a mano, de forma
            programada o por la API, y la vista de <strong>Tendencias</strong> los compara en el
            tiempo. Por ahora las Nets funcionan con Instagram.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta, se activa a solicitud">
            Las Nets están en beta y se activan por organización. Si no ves &ldquo;Nets&rdquo; en la
            barra lateral, contacta al equipo de Tavnit para activarlas.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar una Net">
          <BulletList
            items={[
              "Seguir las quejas sobre tus productos: qué producto, qué salió mal y si respondiste",
              "Encontrar negocios que buscan proveedores en una ciudad o bajo un hashtag",
              "Seguir lo que la gente dice sobre un tema: postura, temas y afirmaciones",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear una Net">
          <NumberedList
            items={[
              <Fragment key="c1">
                Abre <strong>&ldquo;Nets&rdquo;</strong> en la barra lateral y haz clic en{" "}
                <strong>&ldquo;Nueva Net&rdquo;</strong>.
              </Fragment>,
              <Fragment key="c2">
                Elige cómo empezar: <strong>&ldquo;Descríbela&rdquo;</strong> (escribe una frase y la
                IA propone el alcance, la regla de relevancia y las columnas),{" "}
                <strong>&ldquo;Empezar desde una plantilla&rdquo;</strong>,{" "}
                <strong>&ldquo;Copiar una Net existente&rdquo;</strong> o{" "}
                <strong>&ldquo;Net en blanco&rdquo;</strong>.
              </Fragment>,
              "Si la describiste, revisa la propuesta, desmarca lo que no quieras y haz clic en “Crear Net”. Las cuentas sugeridas podrían no existir, así que revísalas en la pestaña Prueba.",
              "Si no, completa el constructor: Básico, Recolectar, Por publicación y comentario, Por hilo, y Medios y límites (abajo), y haz clic en “Crear Net”.",
              "La Net se abre en su pestaña Prueba. Ejecuta una prueba antes de tu primer Catch.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="El constructor">
          <DataTable
            head={["Sección", "Ajustes"]}
            rows={[
              ["Básico", "Nombre, y Propósito (para qué sirve la Net; la IA lo lee como contexto)."],
              [
                "Recolectar",
                "Alcance: Cuentas, Hashtags, Lugares (un enlace o id de ubicación de Instagram) y Enlaces de publicaciones, además de Excluir cuentas y Excluir hashtags, que se descartan justo después de recolectar, antes de cualquier IA. Comentarios: “Recolectar comentarios” y “Comentarios por publicación”. Regla de relevancia: qué publicaciones cuentan, en lenguaje simple.",
              ],
              [
                "Por publicación y comentario",
                "Campos (valores libres), Verificaciones Sí/No (verdadero o falso) y Categorías (exactamente una opción, o ninguna), que se llenan para cada publicación y cada comentario.",
              ],
              [
                "Por hilo",
                "Preguntas de hilo (sí/no, respondidas una vez por publicación y sus comentarios, como “¿Respondió la marca?”) y Categorías de hilo (una opción para toda la conversación).",
              ],
              [
                "Medios y límites",
                "Leer imágenes de publicaciones e Imágenes por publicación; Transcribir el audio de Reels y Segundos de audio por Reel; Publicaciones por Catch (máx.); Espera de asentamiento (horas); El primer Catch mira hacia atrás (días).",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Sin búsqueda por palabras clave">
            Instagram no tiene búsqueda por palabras clave, así que una Net siempre parte de cuentas,
            hashtags, lugares o enlaces de publicaciones. Pon tus palabras clave en la regla de
            relevancia. Las publicaciones que no la cumplen se descartan antes de que comentarios,
            medios o columnas cuesten algo.
          </InfoBox>
          <DataTable
            head={["Límite", "Valor por defecto", "Rango"]}
            rows={[
              ["Comentarios por publicación", "20", "Hasta 100"],
              ["Imágenes por publicación", "5", "Hasta 20"],
              ["Segundos de audio por Reel", "180", "De 10 a 600"],
              ["Publicaciones por Catch (máx.)", "500", "Hasta 5.000"],
              ["Espera de asentamiento (horas)", "48", "De 0 a 720"],
              ["El primer Catch mira hacia atrás (días)", "7", "De 1 a 365"],
            ]}
          />
          <p>
            Las imágenes se leen para extraer texto y contenido (volantes, listas de precios,
            productos dañados). En los Reels solo se transcribe el sonido; el video nunca se procesa,
            y los Reels solo con música se omiten. La espera de asentamiento hace que las
            publicaciones recientes esperen a un Catch posterior para que su hilo de comentarios
            tenga tiempo de llenarse.
          </p>
          <p>
            Cada fila también lleva columnas incluidas, cuyos nombres no puedes reutilizar: Platform,
            Type, Post ID, Comment ID, URL, Author, Posted At, Likes, Comments, Views, Media, Hashtags,
            Location, Text, Image Text y Transcript. Tus columnas van después.
          </p>
        </DocCard>

        <DocCard icon={<FlaskConical size={24} />} title="La pestaña Prueba">
          <Lead>
            <strong>&ldquo;Ejecutar prueba&rdquo;</strong> recolecta una muestra pequeña de tu alcance,
            muestra qué se conserva, se descarta o se excluye, y previsualiza la tabla, antes de
            cualquier Catch. Las pruebas son gratis.
          </Lead>
          <BulletList
            items={[
              "La prueba siempre usa tus cambios actuales, incluso los que no guardaste. Guárdalos cuando los resultados se vean bien.",
              "Pestañas: Conservadas, Descartadas, Excluidas y Vista previa de tabla (las primeras publicaciones conservadas con sus comentarios, estructuradas con tus columnas).",
              "“Por Catch (estimado)” proyecta publicaciones por día, publicaciones por Catch, filas por Catch y créditos por Catch. “Como mínimo” significa que la muestra llegó a su tope.",
              "“Ajusta el alcance” sugiere hashtags o cuentas para agregar o excluir y una regla revisada; un clic actualiza el borrador, y luego pruebas de nuevo para comparar.",
              "Si solo cambiaste la regla o las columnas, “Probar de nuevo” reutiliza la última muestra: no recolecta de nuevo, solo vuelven a correr tu regla y tus columnas.",
            ]}
          />
          <p>Una muestra nueva toma alrededor de un minuto. Cada organización puede ejecutar hasta 40 pruebas cada 24 horas.</p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Ejecutar un Catch">
          <NumberedList
            items={[
              <Fragment key="r1">
                Haz clic en <strong>&ldquo;Ejecutar Catch&rdquo;</strong>.
              </Fragment>,
              <Fragment key="r2">
                Elige <strong>&ldquo;Desde el último Catch&rdquo;</strong> (retoma donde terminó el
                último Catch y se detiene a la espera de asentamiento antes de ahora; el primer Catch
                mira hacia atrás la cantidad de días configurada) o{" "}
                <strong>&ldquo;Un rango de fechas (retroactivo)&rdquo;</strong> con las fechas Desde y
                Hasta.
              </Fragment>,
              <Fragment key="r3">
                Haz clic en <strong>&ldquo;Iniciar Catch&rdquo;</strong>. El Catch aparece en{" "}
                <strong>&ldquo;Catches&rdquo;</strong> con su ventana, publicaciones conservadas,
                filas, créditos, estado y origen (Manual, Programado o API).
              </Fragment>,
            ]}
          />
          <p>
            Un Catch retroactivo no mueve el punto de retoma, y las publicaciones ya procesadas se
            omiten. Como las publicaciones se recolectan de la más reciente a la más antigua, llegar
            muy atrás puede requerir un tope mayor de Publicaciones por Catch. Solo corre un Catch
            &ldquo;desde el último Catch&rdquo; a la vez por Net, y una Net inactiva no puede
            ejecutarse.
          </p>
          <p>
            Mientras corre, un Catch muestra su etapa: Recolectando publicaciones, Revisando
            relevancia, Recolectando comentarios, Leyendo imágenes y audio, Llenando tus columnas y
            Entregando. Termina como Completado, Fallido o Cancelado.{" "}
            <strong>&ldquo;Cancelar Catch&rdquo;</strong> lo detiene; no se cobra ni se entrega nada, y
            las publicaciones podrán recolectarse de nuevo.
          </p>
          <p>
            Un Catch completado muestra publicaciones nuevas, conservadas, comentarios, filas,
            imágenes leídas, audio transcrito y créditos. Su tabla se puede filtrar por publicaciones
            o comentarios, buscar y descargar como CSV o JSON; cada fila enlaza a la publicación
            (&ldquo;Abrir publicación&rdquo;) y cada valor indica de dónde salió (el texto del
            elemento, la publicación original, el audio del Reel, los metadatos o una imagen).
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Programación">
          <p>
            En la pestaña <strong>&ldquo;Programación&rdquo;</strong>, activa{" "}
            <strong>&ldquo;Ejecutar de forma programada&rdquo;</strong> y elige una frecuencia: cada
            hora, cada día, días hábiles (lun–vie), cada semana o un cron personalizado. Cada Catch
            programado retoma donde terminó el anterior. La pestaña muestra dónde empieza el próximo
            Catch. La programación queda en pausa mientras la Net está inactiva.
          </p>
        </DocCard>

        <DocCard icon={<Activity size={24} />} title="Tendencias">
          <p>
            <strong>&ldquo;Tendencias&rdquo;</strong> aparece tras los primeros Catches completados y
            los compara:
          </p>
          <BulletList
            items={[
              "Publicaciones conservadas por Catch, y publicaciones por día en el último Catch",
              "Picos en el último Catch, que se marcan cuando hay 3 Catches anteriores para comparar",
              "Los mayores cambios en tus categorías, verificaciones, preguntas de hilo y categorías de hilo respecto al Catch anterior",
              "La distribución de categorías y los resultados de las verificaciones Sí/No en el último Catch",
              "Hashtags principales y autores principales",
            ]}
          />
        </DocCard>

        <DocCard icon={<Send size={24} />} title="A dónde van los datos">
          <DataTable
            head={["Salida", "Cómo funciona"]}
            rows={[
              ["Correo", "Envía la tabla de cada Catch como CSV a los destinatarios que indiques."],
              [
                "Webhook",
                <Fragment key="o2">
                  Envía las filas de cada Catch como JSON por POST a una URL{" "}
                  <InlineCode>https://</InlineCode>.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="o3">
                  Escribe las filas de cada Catch completado en un{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, con una columna de ID del
                  Catch si quieres.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Costo">
          <p>Un Catch se cobra al completarse, sumando cuatro partes:</p>
          <DataTable
            head={["Parte", "Tarifa"]}
            rows={[
              ["Publicaciones recolectadas (revisión de relevancia)", "1 crédito por cada 50 publicaciones"],
              ["Filas estructuradas (publicaciones y comentarios conservados)", "1 crédito por cada 10 filas"],
              ["Imágenes leídas", "1 crédito por cada 5 imágenes"],
              ["Audio de Reels transcrito", "1 crédito por cada 60 segundos"],
            ]}
          />
          <p>
            Cada parte se redondea hacia arriba, y un Catch que recolectó algo cuesta al menos 1
            crédito. Un Catch sin nada nuevo en su ventana, uno fallido y uno cancelado no cuestan
            nada, y las pruebas son gratis. Necesitas al menos 1 crédito para iniciar un Catch. El
            estimado de la pestaña Prueba muestra cuánto costará probablemente un Catch de tu Net.
            Consulta <DocLink href="/es/documentacion/creditos">Créditos</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <p>
            Copia el ID desde <strong>&ldquo;ID de la Net&rdquo;</strong> y encola un Catch. Un cuerpo
            vacío ejecuta &ldquo;desde el último Catch&rdquo;:
          </p>
          <CodeBlock lang="bash — encolar un Catch" code={CATCH_CURL} />
          <p>
            Envía <InlineCode>window_start</InlineCode> (y, si quieres,{" "}
            <InlineCode>window_end</InlineCode>, que por defecto es ahora) como marcas de tiempo ISO
            para un Catch retroactivo:
          </p>
          <CodeBlock lang="JSON — cuerpo retroactivo" code={BACKFILL_BODY} />
          <p>
            La respuesta (202) trae el <InlineCode>catch_id</InlineCode>. Consulta su estado, y
            obtén las <InlineCode>columns</InlineCode> y <InlineCode>rows</InlineCode> una vez
            completado, con:
          </p>
          <CodeBlock lang="bash — estado y resultado del Catch" code={STATUS_CURL} />
          <p>
            <InlineCode>POST /api/catches/CATCH_ID/cancel</InlineCode> cancela un Catch en cola o en
            ejecución. Errores: 400 por una ventana inválida, 402 por créditos insuficientes, 403 si
            las Nets no están activadas para tu organización, 409 por una Net inactiva o un Catch
            &ldquo;desde el último Catch&rdquo; ya en curso. Consulta la página de la{" "}
            <DocLink href="/es/documentacion/api">API REST</DocLink> para la autenticación.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Quién puede hacer qué">
          <DataTable
            head={["Acción", "Roles"]}
            rows={[
              ["Crear, editar y eliminar Nets", "Propietario, Administrador"],
              ["Ejecutar Catches y ver resultados", "Propietario, Administrador, Miembro"],
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/roles-de-usuario">Roles de usuario</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Ban size={24} />} title="Limitaciones">
          <BulletList
            items={[
              "Solo Instagram, y solo publicaciones públicas.",
              "Sin búsqueda por palabras clave: la recolección parte de cuentas, hashtags, lugares o enlaces de publicaciones.",
              "Hasta 5.000 publicaciones por Catch.",
              "El video de los Reels nunca se analiza, solo su audio; los Reels solo con música se omiten.",
              "Si un hilo no se puede estructurar, sus filas se conservan con columnas vacías y el Catch indica cuántos fueron.",
            ]}
          />
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Síntoma", "Qué revisar"]}
            rows={[
              ["Una prueba no devuelve nada para una cuenta", "La cuenta podría no existir o no ser pública. Revísala en Instagram."],
              ["Se conservan demasiadas publicaciones irrelevantes", "Haz la regla de relevancia más específica, o excluye las cuentas y hashtags que traen ruido."],
              ["“Ejecutar Catch” falla con un conflicto", "La Net está inactiva, o ya hay un Catch “desde el último Catch” en curso."],
              ["Un Catch retroactivo no trae publicaciones antiguas", "Sube Publicaciones por Catch (máx.): las publicaciones se recolectan de la más reciente a la más antigua."],
              ["Faltan publicaciones recientes", "Son más recientes que la espera de asentamiento y las tomará un Catch posterior."],
              ["Se rechazan las pruebas", "Tu organización llegó a 40 pruebas en 24 horas. Intenta más tarde."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/buckets",
              label: "Guarda las filas de los Catches en un Bucket",
              description: "Conserva todos los Catches en una tabla y grafícalos.",
            },
            {
              href: "/es/documentacion/signals",
              label: "Estructura conversaciones grabadas con Signals",
              description: "La misma idea para audio: miembros, reglas y campos por turno.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cómo se cobran los créditos",
              description: "Costos por función, incluidos los Catches.",
            },
            {
              href: "/es/documentacion/api",
              label: "Autentícate con la API REST",
              description: "API keys, la URL base y los códigos de error comunes a todos los endpoints.",
            },
          ]}
        />
      </section>
    </>
  );
}
