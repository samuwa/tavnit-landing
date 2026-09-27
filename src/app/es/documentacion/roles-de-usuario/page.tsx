import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { ClipboardCheck, Eye, Info, Lock, Shield, Star, Table2, UserCog, Users } from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
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
          Roles de usuario y permisos
        </h1>

        <DocCard icon={<Shield size={24} />} title="Descripción general">
          <Lead>
            Cada usuario de Tavnit pertenece a una organización con exactamente uno de cuatro roles:
            Owner, Admin, Member o HITL Only. El rol se define al invitar a alguien y determina qué
            puede ver y hacer en toda la app. No hay excepciones por función, salvo los permisos de
            acceso a Buckets.
          </Lead>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
            <RoleBadge label="Owner" color="border-purple-500/30 bg-purple-500/[0.06]" icon={<Star size={22} className="text-purple-400" />} subtitle="Control total" />
            <RoleBadge label="Admin" color="border-blue-500/30 bg-blue-500/[0.06]" icon={<UserCog size={22} className="text-blue-400" />} subtitle="Gestiona personas y contenido" />
            <RoleBadge label="Member" color="border-cyan-500/30 bg-cyan-500/[0.06]" icon={<Users size={22} className="text-cyan-400" />} subtitle="Ejecuta Flows" />
            <RoleBadge label="HITL Only" color="border-amber-500/30 bg-amber-500/[0.06]" icon={<ClipboardCheck size={22} className="text-amber-400" />} subtitle="Solo revisa" />
          </div>
          <DataTable
            head={["Rol", "En una línea", "Asígnalo a"]}
            rows={[
              ["Owner", "Control total, incluida la facturación y la eliminación de la organización.", "La persona responsable de la cuenta. Normalmente una sola."],
              ["Admin", "Crea y gestiona todo, excepto la facturación y la configuración de la organización.", "Quien configura Flows, Cleaners y Buckets en el día a día."],
              ["Member", "Ejecuta Flows existentes y lee resultados. No puede cambiar la configuración.", "Personas que procesan documentos pero no deben modificar el pipeline."],
              ["HITL Only", "Solo puede revisar los Runs que tiene asignados.", "Aprobadores y auditores que nunca deben tocar la configuración ni los datos."],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Los roles son por organización">
            La misma persona puede ser Owner en una organización y Member en otra. Al cambiar de
            organización también cambia tu rol, así que revisa el selector antes de preguntarte por
            qué desapareció un botón.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Star size={24} />} title="Owner">
          <InfoBox color="purple" icon={<Info size={20} />} title="Un Owner por organización">
            Normalmente hay un solo Owner: la persona que creó la organización o alguien a quien se
            ascendió explícitamente a Owner. Nadie puede eliminar ni degradar al Owner, excepto él
            mismo.
          </InfoBox>
          <p>Los Owners tienen acceso sin restricciones a todo:</p>
          <BulletList
            items={[
              "Crear, editar y eliminar Flows, Buckets, Collections, Cleaners y Matchers",
              "Iniciar Runs y ver todos los resultados",
              "Invitar y eliminar a cualquier miembro del equipo, incluidos otros Admins",
              "Ascender o degradar miembros a cualquier rol (incluido Admin)",
              "Editar el nombre y la configuración de la organización",
              "Ver y gestionar la facturación y la suscripción",
              "Eliminar la organización",
              "Hacer privado cualquier Bucket",
              "Controlar todo el acceso a los Buckets, incluido cambiar los permisos de los Admins",
            ]}
          />
        </DocCard>

        <DocCard icon={<UserCog size={24} />} title="Admin">
          <InfoBox color="blue" icon={<Info size={20} />} title="Usuarios avanzados de confianza">
            Los Admins ayudan con la operación diaria. Pueden crear y gestionar contenido e invitar a
            nuevos miembros, pero no pueden tocar la facturación, la configuración de la organización
            ni a otros Admins.
          </InfoBox>
          <p>Los Admins pueden:</p>
          <BulletList
            items={[
              "Crear, editar y eliminar Flows, Buckets, Collections y Cleaners",
              "Crear y gestionar sus propios Matchers, y editar cualquier Matcher",
              "Iniciar Runs y ver todos los resultados",
              "Invitar a nuevos miembros a la organización (solo con rol Member)",
              "Eliminar miembros de la organización",
              "Editar y eliminar cualquier Flow, Collection o Matcher creado por Members",
              "Abrir la pantalla de acceso a Buckets y cambiar los niveles de acceso de los Members",
            ]}
          />
          <p>Los Admins no pueden:</p>
          <BulletList
            items={[
              "Editar la configuración o la facturación de la organización",
              "Eliminar la organización",
              "Hacer privado un Bucket",
              "Cambiar los permisos o el rol de otro Admin",
              "Invitar a alguien como Admin u Owner (solo el Owner puede)",
            ]}
          />
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Member">
          <InfoBox color="green" icon={<Info size={20} />} title="Leer y ejecutar, con creación limitada">
            Los Members son usuarios regulares. Pueden usar los Flows que ya existen y gestionar sus
            propios Matchers, pero no pueden crear Flows ni modificar recursos compartidos.
          </InfoBox>
          <p>Los Members pueden:</p>
          <BulletList
            items={[
              "Iniciar Runs en Flows existentes y ver todos los resultados de los Runs",
              "Ver los detalles de un Flow, incluidos campos, webhook, disparador por correo, salida por correo, limpieza de datos y configuración de exportación a Bucket",
              "Crear, editar y eliminar sus propios Matchers",
              "Ejecutar comparaciones con Matchers existentes",
              "Ver todos los Buckets visibles para la organización (solo lectura de forma predeterminada)",
              "Escribir datos en un Bucket si un Admin u Owner le da acceso de editor",
            ]}
          />
          <p>Los Members no pueden:</p>
          <BulletList
            items={[
              "Crear Flows, Buckets, Collections ni Cleaners nuevos",
              "Editar ni eliminar ningún Flow, ni sus campos y funciones",
              "Activar o configurar funciones del Flow (webhook, disparador por correo, salida por correo, limpieza de datos, exportación a Bucket)",
              "Editar ni eliminar Matchers creados por otros",
              "Invitar ni eliminar miembros del equipo",
              "Ver Buckets privados, a menos que se les dé acceso explícito",
              "Acceder a la pantalla de gestión de acceso a Buckets",
              "Ver las páginas de facturación o de configuración de la organización",
            ]}
          />
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="HITL Only">
          <Lead>
            HITL Only es un rol limitado a propósito: quien lo tiene puede revisar y decidir sobre los
            Runs que tiene asignados, y nada más. Cualquier operación de procesamiento o de datos se
            rechaza, tanto en la app como por la API, con una respuesta explícita de &ldquo;your role
            only permits HITL reviews&rdquo;.
          </Lead>
          <p>Alguien con este rol puede:</p>
          <BulletList
            items={[
              <Fragment key="f0">
                Abrir la cola de <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>{" "}
                y ver los Runs en los que figura como revisor
              </Fragment>,
              "Leer los datos extraídos junto al documento de origen",
              "Editar valores y agregar o quitar filas y columnas durante la revisión",
              "Aprobar un Run o rechazarlo indicando un motivo",
            ]}
          />
          <p>No puede:</p>
          <BulletList
            items={[
              "Subir un documento ni iniciar un Run de ningún tipo",
              "Ver ni cambiar Flows, Collections, Cleaners, Splitters ni Agents",
              "Leer ni escribir datos de Buckets fuera de una revisión",
              "Llamar a la API de procesamiento: esos endpoints rechazan el rol directamente",
              "Invitar a nadie, ni ver la facturación o la configuración de la organización",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="La asignación sigue siendo aparte">
            El rol permite revisar, pero no asigna revisiones. Un Owner o Admin todavía tiene que
            agregar al usuario HITL Only a la lista de revisores de un Flow, o nombrarlo en la acción
            de revisión de un Cleaner. Sin eso, al iniciar sesión verá una cola vacía.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Permisos de un vistazo">
          <Lead>
            Qué puede hacer cada rol (Owner, Admin y Member), función por función. HITL Only no
            aparece a propósito: tiene denegadas todas las filas de esta tabla, y su única capacidad
            es revisar los Runs que tiene asignados.
          </Lead>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              {/* Encabezado de la tabla */}
              <div className="flex items-center pb-3 border-b border-tint/[0.08]">
                <div className="flex-1" />
                <div className="w-16 text-center"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Owner</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Admin</span></div>
                <div className="w-16 text-center"><span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Member</span></div>
              </div>

              <PermissionGroupHeader label="Flows" />
              <PermissionRow label="Crear Flows" owner={true} admin={true} member={false} />
              <PermissionRow label="Editar / eliminar Flows" owner={true} admin={true} member={false} />
              <PermissionRow label="Ver funciones y campos del Flow" owner={true} admin={true} member={true} />
              <PermissionRow label="Configurar funciones del Flow" owner={true} admin={true} member={false} note="Webhook, correo, limpieza de datos, exportación a Bucket" />
              <PermissionRow label="Iniciar Runs" owner={true} admin={true} member={true} />
              <PermissionRow label="Ver resultados de Runs" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Matchers" />
              <PermissionRow label="Crear Matchers" owner={true} admin={true} member={true} />
              <PermissionRow label="Editar / eliminar Matchers propios" owner={true} admin={true} member={true} />
              <PermissionRow label="Editar / eliminar cualquier Matcher" owner={true} admin={true} member={false} />
              <PermissionRow label="Ejecutar comparaciones" owner={true} admin={true} member={true} />

              <PermissionGroupHeader label="Buckets: configuración" />
              <PermissionRow label="Crear / editar / eliminar Buckets" owner={true} admin={true} member={false} />
              <PermissionRow label="Hacer privado un Bucket" owner={true} admin={false} member={false} />
              <PermissionRow label="Abrir la pantalla de gestión de acceso" owner={true} admin={true} member={false} />
              <PermissionRow label="Cambiar niveles de acceso de Admins" owner={true} admin={false} member={false} />
              <PermissionRow label="Cambiar niveles de acceso de Members" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Buckets: datos" />
              <PermissionRow label="Ver Buckets visibles para la organización" owner={true} admin={true} member={true} />
              <PermissionRow label="Ver Buckets privados" owner={true} admin={false} member={false} note="Requiere permiso explícito" />
              <PermissionRow label="Editar datos (visibles para la organización)" owner={true} admin={true} member={false} note="El Member necesita permiso de editor" />
              <PermissionRow label="Editar datos (privados)" owner={true} admin={false} member={false} note="Requiere permiso de editor" />

              <PermissionGroupHeader label="Collections y Cleaners" />
              <PermissionRow label="Crear Collections / Cleaners" owner={true} admin={true} member={false} />
              <PermissionRow label="Editar / eliminar cualquiera" owner={true} admin={true} member={false} />

              <PermissionGroupHeader label="Equipo" />
              <PermissionRow label="Invitar miembros" owner={true} admin={true} member={false} />
              <PermissionRow label="Eliminar miembros" owner={true} admin={true} member={false} />
              <PermissionRow label="Ascender a Admin" owner={true} admin={false} member={false} />
              <PermissionRow label="Ascender a Owner" owner={true} admin={false} member={false} />

              <PermissionGroupHeader label="Organización" />
              <PermissionRow label="Editar la configuración de la organización" owner={true} admin={false} member={false} />
              <PermissionRow label="Ver y gestionar la facturación" owner={true} admin={false} member={false} />
              <PermissionRow label="Eliminar la organización" owner={true} admin={false} member={false} />
            </div>
          </div>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Sistema de acceso a Buckets">
          <p>
            Los Buckets tienen un sistema de acceso de dos capas que permite a Owners y Admins
            controlar exactamente quién puede ver y editar cada Bucket, sin importar su rol en la
            organización.
          </p>
          <InfoBox color="purple" icon={<Eye size={20} />} title="Capa 1: visibilidad">
            Cada Bucket es visible para la organización (todos en la organización pueden verlo) o
            privado (solo el Owner y los usuarios con permiso explícito pueden verlo). Solo el Owner
            de la organización puede hacer privado un Bucket.
          </InfoBox>
          <InfoBox color="green" icon={<Lock size={20} />} title="Capa 2: nivel de acceso">
            A cada usuario se le puede dar acceso de Viewer (solo lectura) o Editor (lectura y
            escritura) a un Bucket específico. Estos permisos se guardan de forma independiente del
            rol del usuario en la organización.
          </InfoBox>
          <p>Para gestionar el acceso, abre un Bucket y toca el ícono de configuración &rarr;
            &ldquo;Manage Access&rdquo;. La pantalla de acceso agrupa a los usuarios por rol y te
            permite definir el nivel de cada persona por separado, o usar los controles &ldquo;Set
            all&rdquo; para actualizar un grupo completo a la vez.</p>
          <WarningBox>
            Un permiso de Bucket amplía el acceso, no lo restringe. Dar a un Member acceso de editor
            a un Bucket privado no le impide leer todos los Buckets visibles para la organización. Si
            los datos deben quedar restringidos, el Bucket tiene que ser privado desde el principio.
          </WarningBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/revision-humana",
              label: "Asigna revisores a un Flow",
              description:
                "Cómo funciona la lista de revisores y por qué un usuario HITL Only tiene que estar en ella.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Buckets privados y permisos de acceso",
              description:
                "La segunda capa de acceso, por encima de los roles de la organización, por Bucket y por persona.",
            },
            {
              href: "/es/documentacion/conector-mcp",
              label: "Los roles también aplican a los asistentes de IA",
              description:
                "Un conector hereda los permisos del miembro que lo generó.",
            },
            {
              href: "/es/documentacion/api",
              label: "Los roles aplican a las API keys",
              description:
                "Cada miembro tiene su propia key, y esta lleva los límites de su rol.",
            },
          ]}
        />
      </section>
    </>
  );
}
