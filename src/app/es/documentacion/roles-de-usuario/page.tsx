import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ClipboardCheck, Eye, Info, KeyRound, Lock, Mail, Shield, Star, Table2, UserCog, Users } from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  PermissionGroupHeader,
  PermissionRow,
  Related,
  RoleBadge,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("user-roles", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="user-roles" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Roles de usuario
        </h1>

        <DocCard icon={<Shield size={24} />} title="Descripción general">
          <Lead>
            Cada usuario de Tavnit pertenece a una organización con exactamente uno de cuatro roles:
            Propietario, Administrador, Miembro o Solo HITL. El rol se define al invitar a alguien y
            determina qué puede ver y hacer en toda la app. La única excepción por elemento es el
            acceso a Buckets, que se otorga persona por persona.
          </Lead>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
            <RoleBadge label="Propietario" color="border-purple-500/30 bg-purple-500/[0.06]" icon={<Star size={22} className="text-purple-400" />} subtitle="Control total" />
            <RoleBadge label="Administrador" color="border-blue-500/30 bg-blue-500/[0.06]" icon={<UserCog size={22} className="text-blue-400" />} subtitle="Gestiona personas y contenido" />
            <RoleBadge label="Miembro" color="border-cyan-500/30 bg-cyan-500/[0.06]" icon={<Users size={22} className="text-cyan-400" />} subtitle="Ejecuta lo que existe" />
            <RoleBadge label="Solo HITL" color="border-amber-500/30 bg-amber-500/[0.06]" icon={<ClipboardCheck size={22} className="text-amber-400" />} subtitle="Solo revisa" />
          </div>
          <DataTable
            head={["Rol", "En una línea", "Asígnalo a"]}
            rows={[
              ["Propietario", "Control total, incluida la configuración de la organización, la facturación y la eliminación de la organización.", "Las personas responsables de la cuenta."],
              ["Administrador", "Crea y gestiona todo y administra el equipo, excepto la configuración de la organización y la facturación.", "Quien configura Flows, Cleaners, Pipelines y Buckets en el día a día."],
              ["Miembro", "Ejecuta lo que ya existe, trabaja expedientes y lee resultados. No puede cambiar la mayor parte de la configuración.", "Personas que procesan documentos pero no deben modificar el pipeline."],
              ["Solo HITL", "Solo puede revisar los elementos que tiene asignados.", "Aprobadores y auditores que nunca deben tocar la configuración ni los datos."],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Los roles son por organización">
            La misma persona puede ser Propietario en una organización y Miembro en otra. Al cambiar
            de organización cambia también tu rol, así que revisa el selector de organización antes
            de preguntarte por qué desapareció un botón.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Star size={24} />} title="Propietario">
          <InfoBox color="purple" icon={<Info size={20} />} title="Siempre al menos un Propietario">
            Quien crea la organización es su primer Propietario, y un Propietario puede ascender a
            otras personas a Propietario. Toda organización debe conservar al menos uno: el rol del
            último Propietario no se puede cambiar hasta ascender a otra persona. Nadie puede cambiar
            su propio rol ni eliminarse a sí mismo desde la página del equipo.
          </InfoBox>
          <p>Los Propietarios tienen acceso sin restricciones a todo:</p>
          <BulletList
            items={[
              "Todo lo que puede hacer un Administrador (ver abajo)",
              "Invitar personas con cualquier rol, y cambiar el rol de cualquier otro miembro o eliminarlo, incluidos Administradores y otros Propietarios",
              'Editar la organización en Configuración → "Organización": nombre, zona horaria, notificaciones de fallo de Run y el reintento automático de "Runs fallidos"',
              'Ver y gestionar "Facturación y Uso"',
              "Eliminar la organización",
              "Hacer privado un Bucket y definir el acceso de los Administradores a cualquier Bucket",
            ]}
          />
        </DocCard>

        <DocCard icon={<UserCog size={24} />} title="Administrador">
          <InfoBox color="blue" icon={<Info size={20} />} title="Usuarios avanzados de confianza">
            Los Administradores llevan la operación del día a día. Pueden crear y cambiar cualquier
            cosa del espacio de trabajo y gestionar a los Miembros, pero no pueden tocar la
            configuración de la organización, la facturación ni a otros Administradores.
          </InfoBox>
          <p>Los Administradores pueden:</p>
          <BulletList
            items={[
              "Crear, editar y eliminar Flows, Colecciones, Subjects, Splitters, Cleaners, Agentes, Inspectores, Fillers, Signals, Nets, Pipelines y Buckets",
              "Configurar Agentes, incluidas las variables y los secretos que usan",
              "Gestionar las vinculaciones de los Subjects y las asignaciones de grabadores de los Signals",
              "Ejecutar todo y ver todos los resultados",
              "Invitar personas nuevas como Miembro o Solo HITL",
              "Cambiar el rol de los Miembros y usuarios Solo HITL, o eliminarlos",
              "Ver el Registro de Auditoría de la organización",
              "Abrir la página de Acceso de un Bucket y definir el acceso de cada Miembro",
            ]}
          />
          <p>Los Administradores no pueden:</p>
          <BulletList
            items={[
              "Editar la configuración de la organización ni ver la facturación",
              "Eliminar la organización",
              "Hacer privado un Bucket",
              "Cambiar el rol, el acceso o la membresía de otro Administrador o de un Propietario",
              "Invitar a alguien como Administrador o Propietario",
            ]}
          />
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Miembro">
          <InfoBox color="green" icon={<Info size={20} />} title="Ejecuta lo que existe">
            Los Miembros usan el espacio de trabajo que armó un Administrador. Pueden ejecutar todas
            las funciones y leer todos los resultados, y gestionar por completo los Matchers, pero no
            pueden crear ni cambiar la mayor parte de la configuración.
          </InfoBox>
          <p>Los Miembros pueden:</p>
          <BulletList
            items={[
              "Ejecutar Flows y ver todos los Runs y resultados",
              "Ver los detalles de los Flows, incluidos los campos y la configuración de cada función",
              "Ejecutar splits, Agentes, Inspectores, Fillers, Pipelines, waves de Signals y catches de Nets",
              "Trabajar expedientes en los Subjects: abrirlos, editarlos y cerrarlos, subir documentos, resolver documentos retenidos y ejecutar validaciones",
              "Crear, editar, eliminar y ejecutar cualquier Matcher",
              "Ver todos los Buckets visibles en la organización, y editar los datos de un Bucket si un Propietario o Administrador les da acceso de Editor",
              "Ver la página Equipo y su propia clave API",
            ]}
          />
          <p>Los Miembros no pueden:</p>
          <BulletList
            items={[
              "Crear Flows, Colecciones, Subjects, Splitters, Cleaners, Agentes, Inspectores, Fillers, Signals, Nets, Pipelines ni Buckets",
              "Editar o eliminar configuración que no crearon, ni activar o desactivar funciones de un Flow (webhook, disparador de email, salida por email, limpieza de datos, Exportar a Bucket)",
              "Invitar, eliminar o cambiar el rol de nadie",
              "Ver Buckets privados sin un permiso explícito, ni abrir la página de Acceso de un Bucket",
              "Ver la configuración de la organización, la facturación ni el Registro de Auditoría",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Quien crea conserva la edición">
            Los Flows, Colecciones, Subjects, Inspectores y Fillers siguen siendo editables por la
            persona que los creó. Si un Administrador que armó un Flow pasa luego a Miembro, todavía
            puede editar y eliminar ese Flow.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Solo HITL">
          <Lead>
            Solo HITL es un rol deliberadamente limitado: quien lo tiene puede revisar y decidir
            sobre los elementos que tiene asignados, y nada más. Su barra lateral solo muestra la
            cola de <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>, y
            cualquier operación de procesamiento o de datos se rechaza, tanto en la app como en la
            API.
          </Lead>
          <p>Alguien con este rol puede:</p>
          <BulletList
            items={[
              "Abrir la cola de Revisión Humana y ver los Runs, matches, inspecciones y fills que esperan su revisión",
              "Leer los datos extraídos junto al documento original",
              "Editar valores y agregar o quitar filas y columnas durante la revisión",
              "Aprobar un elemento, o rechazarlo indicando un motivo",
            ]}
          />
          <p>No puede:</p>
          <BulletList
            items={[
              "Subir un documento ni iniciar ningún tipo de Run",
              "Ver el Panel, los Runs ni la configuración de ninguna función",
              "Leer o escribir datos de Buckets fuera de una revisión",
              "Llamar a la API de procesamiento: esos endpoints rechazan el rol directamente",
              "Invitar a nadie, ni ver la facturación o la configuración de la organización",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="La asignación sigue siendo aparte">
            El rol permite revisar; no asigna revisiones. Un usuario Solo HITL igual tiene que estar
            nombrado como revisor, por ejemplo en la lista de revisores de un Flow o en la acción de
            revisión de un Cleaner. Sin eso, al iniciar sesión encuentra la cola vacía.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Permisos de un vistazo">
          <Lead>
            Lo que pueden hacer el Propietario, el Administrador y el Miembro, función por función.
            Solo HITL no aparece a propósito: se le niega cada fila de esta tabla, y su única
            capacidad es revisar los elementos que tiene asignados.
          </Lead>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              {/* Encabezado de la tabla */}
              <div className="flex items-center pb-3 border-b border-tint/[0.08]">
                <div className="flex-1" />
                <div className="w-16 text-center"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Prop.</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Admin.</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Miembro</span></div>
              </div>

              <PermissionGroupHeader label="Flows" />
              <PermissionRow label="Crear Flows" owner={true} admin={true} member={false} />
              <PermissionRow label="Editar / eliminar Flows" owner={true} admin={true} member={false} note="O quien creó el Flow" />
              <PermissionRow label="Ver funciones y campos del Flow" owner={true} admin={true} member={true} />
              <PermissionRow label="Configurar funciones del Flow" owner={true} admin={true} member={false} note="Webhook, email, limpieza de datos, Exportar a Bucket, revisión" />
              <PermissionRow label="Ejecutar Runs" owner={true} admin={true} member={true} />
              <PermissionRow label="Ver Runs y resultados" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Colecciones y Subjects" />
              <PermissionRow label="Crear Colecciones / Subjects" owner={true} admin={true} member={false} />
              <PermissionRow label="Editar / eliminar Colecciones / Subjects" owner={true} admin={true} member={false} note="O quien los creó" />
              <PermissionRow label="Gestionar vinculaciones de Subjects" owner={true} admin={true} member={false} />
              <PermissionRow label="Trabajar expedientes" owner={true} admin={true} member={true} note="Abrir, editar, cerrar, subir, resolver documentos retenidos, ejecutar validaciones" />

              <PermissionGroupHeader label="Splitters y Cleaners" />
              <PermissionRow label="Crear / editar / eliminar Splitters" owner={true} admin={true} member={false} />
              <PermissionRow label="Ejecutar splits" owner={true} admin={true} member={true} />
              <PermissionRow label="Crear / editar / eliminar Cleaners" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Agentes" />
              <PermissionRow label="Crear / configurar / eliminar Agentes" owner={true} admin={true} member={false} note="Incluidas las variables y los secretos guardados" />
              <PermissionRow label="Ejecutar Agentes" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Matchers, Inspectores y Fillers" />
              <PermissionRow label="Crear / editar / eliminar cualquier Matcher" owner={true} admin={true} member={true} />
              <PermissionRow label="Ejecutar matches" owner={true} admin={true} member={true} />
              <PermissionRow label="Crear Inspectores / Fillers" owner={true} admin={true} member={false} />
              <PermissionRow label="Editar / eliminar Inspectores / Fillers" owner={true} admin={true} member={false} note="O quien los creó" />
              <PermissionRow label="Ejecutar inspecciones / fills" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Signals y Nets" />
              <PermissionRow label="Crear / editar / eliminar Signals y Nets" owner={true} admin={true} member={false} />
              <PermissionRow label="Gestionar grabadores de Signals" owner={true} admin={true} member={false} />
              <PermissionRow label="Ejecutar waves / catches" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Pipelines" />
              <PermissionRow label="Crear / editar / eliminar Pipelines" owner={true} admin={true} member={false} />
              <PermissionRow label="Ejecutar Pipelines" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Buckets: configuración" />
              <PermissionRow label="Crear / editar / eliminar Buckets" owner={true} admin={true} member={false} />
              <PermissionRow label="Hacer privado un Bucket" owner={true} admin={false} member={false} />
              <PermissionRow label="Abrir la página de Acceso" owner={true} admin={true} member={false} />
              <PermissionRow label="Cambiar el acceso de Administradores" owner={true} admin={false} member={false} />
              <PermissionRow label="Cambiar el acceso de Miembros" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Buckets: datos" />
              <PermissionRow label="Ver Buckets visibles en la Org" owner={true} admin={true} member={true} />
              <PermissionRow label="Ver Buckets privados" owner={true} admin={false} member={false} note="Administradores y Miembros necesitan un permiso explícito" />
              <PermissionRow label="Editar datos (visible en la Org)" owner={true} admin={true} member={false} note="Administradores salvo que tengan Solo lectura; Miembros necesitan permiso de Editor" />
              <PermissionRow label="Editar datos (privado)" owner={true} admin={false} member={false} note="Requiere permiso de Editor" />

              <PermissionGroupHeader label="Equipo" />
              <PermissionRow label="Invitar como Miembro / Solo HITL" owner={true} admin={true} member={false} />
              <PermissionRow label="Invitar como Administrador / Propietario" owner={true} admin={false} member={false} />
              <PermissionRow label="Cambiar rol / eliminar Miembros y Solo HITL" owner={true} admin={true} member={false} />
              <PermissionRow label="Cambiar rol / eliminar Administradores y Propietarios" owner={true} admin={false} member={false} />
              <PermissionRow label="Ver el Registro de Auditoría" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Integraciones y API" />
              <PermissionRow label="Usar tu propia clave API" owner={true} admin={true} member={true} note="Tiene los límites de tu rol" />
              <PermissionRow label="Generar un conector MCP" owner={true} admin={true} member={true} note="Si está activado para tu organización" />

              <PermissionGroupHeader label="Organización" />
              <PermissionRow label="Editar la configuración de la organización" owner={true} admin={false} member={false} note="Nombre, zona horaria, notificaciones, reintento automático de Runs fallidos" />
              <PermissionRow label="Ver y gestionar la facturación" owner={true} admin={false} member={false} />
              <PermissionRow label="Eliminar la organización" owner={true} admin={false} member={false} />
            </div>
          </div>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Invitar a tu equipo">
          <p>Los Propietarios y Administradores invitan personas desde la página Equipo:</p>
          <NumberedList
            items={[
              'Ve a Equipo y haz clic en "Invitar Miembro"',
              'Elige "Por correo" y escribe su dirección, o "Código" para crear un código que compartes tú',
              "Elige el rol. Los Administradores solo pueden ofrecer Miembro o Solo HITL; los Propietarios pueden ofrecer cualquier rol",
              'Haz clic en "Enviar invitación". Tavnit envía un correo de invitación con un enlace para unirse; si la persona aún no tiene cuenta, la crea en el camino',
            ]}
          />
          <p>
            Las invitaciones y los códigos vencen a los 7 días. En &ldquo;Invitaciones
            Pendientes&rdquo; puedes &ldquo;Reenviar&rdquo; un correo, usar &ldquo;Copiar
            enlace&rdquo; para enviarlo por otro medio, o revocarla. Más adelante, usa &ldquo;Cambiar
            Rol&rdquo; o elimina a alguien desde la lista de miembros.
          </p>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Claves API, el conector MCP y funciones que se activan a pedido">
          <BulletList
            items={[
              <Fragment key="f0">
                Cada miembro tiene su propia{" "}
                <DocLink href="/es/documentacion/api">clave API</DocLink> (Configuración →
                &ldquo;Cuenta&rdquo; → &ldquo;Clave API&rdquo;), y las solicitudes hechas con ella
                quedan limitadas al rol de ese miembro. Los endpoints de procesamiento rechazan las
                claves de usuarios Solo HITL.
              </Fragment>,
              <Fragment key="f1">
                El <DocLink href="/es/documentacion/conector-mcp">conector MCP</DocLink> se genera a
                partir de tu propia clave en la página Integraciones, así que un asistente de IA que
                lo use tiene exactamente tus permisos. El conector se activa por organización, a
                pedido.
              </Fragment>,
              "Los Agentes, Signals, Nets y el chat de Buckets también se activan por organización. Cuando están desactivados no aparecen para nadie, sin importar su rol. Contacta a soporte para activarlos.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Sistema de acceso a Buckets">
          <p>
            Los Buckets tienen una segunda capa de acceso que permite a Propietarios y
            Administradores controlar exactamente quién puede ver y editar cada Bucket, además del
            rol en la organización.
          </p>
          <InfoBox color="purple" icon={<Eye size={20} />} title="Capa 1: visibilidad">
            Cada Bucket es Visible en la Org (todos en la organización pueden verlo) o Privado (solo
            el Propietario y los usuarios con permiso explícito pueden verlo). Solo el Propietario de
            la organización puede hacer privado un Bucket.
          </InfoBox>
          <InfoBox color="green" icon={<Lock size={20} />} title="Capa 2: nivel de acceso">
            A cada usuario se le puede dar acceso de Solo lectura o de Editor a un Bucket concreto (y,
            en un Bucket privado, Sin acceso). Estos permisos se guardan de forma independiente del
            rol del usuario en la organización.
          </InfoBox>
          <p>
            Para gestionar el acceso, abre la página de detalles del Bucket y elige
            &ldquo;Acceso&rdquo;. La página agrupa a las personas por rol y muestra el nivel de cada
            una; puedes definirlo individualmente, usar &ldquo;Asignar a todos:&rdquo; para
            actualizar un grupo completo, o restablecer una excepción al valor por defecto del rol.
          </p>
          <WarningBox>
            Un permiso de Bucket amplía el acceso, no lo restringe. Dar a un Miembro acceso de Editor
            a un Bucket privado no le impide leer todos los Buckets visibles en la organización. Si
            los datos deben quedar restringidos, el Bucket tiene que ser privado desde el principio.
          </WarningBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/revision-humana",
              label: "Asigna revisores",
              description:
                "Cómo funcionan las listas de revisores y por qué un usuario Solo HITL necesita estar en una.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Buckets privados y permisos de acceso",
              description:
                "La segunda capa de acceso sobre los roles de la organización, por Bucket y por persona.",
            },
            {
              href: "/es/documentacion/conector-mcp",
              label: "Los roles también se aplican a los asistentes de IA",
              description:
                "Un conector hereda los permisos del miembro que lo generó.",
            },
            {
              href: "/es/documentacion/api",
              label: "Los roles se aplican a las claves API",
              description:
                "Cada miembro tiene su propia clave, con los límites de su rol.",
            },
          ]}
        />
      </section>
    </>
  );
}
