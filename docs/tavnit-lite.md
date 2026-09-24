# Tavnit Lite — herramientas gratis en el landing

Herramientas de un solo uso (modelo iLovePDF) montadas sobre el producto real.
Cada herramienta es un Flow fijo dentro de una org dedicada del producto
("Tavnit Lite"); el landing llama al API existente con la key de esa org y
muestra el resultado en pantalla. Descargar el Excel pide iniciar sesión.

Regla de oro: **tavnit-flask no se toca.** Todo lo de Lite vive en este repo
(páginas, rutas con cuota, Excel, leads) y en la org Lite creada desde la app.

## Diseño

Las páginas Lite no usan el shell oscuro del sitio: tienen su propio `LiteShell`
claro (papel de libro contable: fondo cálido con rayas finas, tinta oscura,
verde de hoja de cálculo). La hoja blanca del centro es la herramienta en sus
tres estados: zona de carga, filas de relleno mientras procesa, y la hoja de
cálculo real (letras de columna, números de fila, cuadrícula). El bloque
"¿Y ahora qué?" (`WhatNext`) es un diagrama SVG que solo aparece con
resultados: tu factura → Tavnit → seis destinos; en móvil se apila.

## Rutas

| Página | EN | ES |
|---|---|---|
| Hub | `/tools` | `/es/herramientas` |
| Factura a Excel | `/tools/invoice-to-excel` | `/es/herramientas/factura-a-excel` |

API (mismo origen, nunca desde otro dominio):

- `POST /api/lite/runs` — multipart `tool`, `locale`, `file` (o `sample=1`), `cf-turnstile-response`, honeypot `website`. Devuelve `{ runId, pages, remaining }`.
- `GET /api/lite/runs/:id` — estado y filas (solo la sesión que lo creó).
- `GET /api/lite/runs/:id/document` — el archivo subido, en línea (solo la sesión dueña; el URL firmado del storage nunca sale al navegador).
- `GET /api/lite/runs/:id/download` — Excel; 401 `auth_required` si no hay sesión de Tavnit.
- `GET /auth/callback?code=…&next=/ruta` — cierra la confirmación de correo y vuelve a la página.

## Seguridad (lo que hace el servidor, en orden)

1. Origin debe coincidir con el host (corta llamadas desde otros sitios).
2. Honeypot `website`: si viene lleno, responde OK sin hacer nada.
3. El archivo se valida por sus bytes, no por nombre ni content-type: tamaño ≤ 10 MB, magia PDF/PNG/JPEG, PDF parseado y ≤ 5 páginas (los créditos se cobran por página).
4. Turnstile (cuando `TURNSTILE_SECRET_KEY` está configurado).
5. Cuotas: 3 corridas al día por sesión anónima y por IP (hash HMAC, nunca la IP), y un tope global diario (`LITE_DAILY_CAP`) que protege el saldo de créditos de la org Lite.
6. Propiedad: cada run queda ligado a una cookie httpOnly de sesión; consultar o descargar un run ajeno da 404.
7. Descarga: además de la propiedad, exige usuario autenticado (Supabase, verificado contra el servidor de auth, no solo la cookie).
8. La API key de la org Lite solo existe en el servidor. Nunca se registra contenido de archivos.
9. El Excel se genera sin librerías con advisories (fflate + XML a mano); las celdas que empiezan por `= + - @` se neutralizan para evitar inyección de fórmulas.

## Retención: todo se borra a las 24 horas

Ni la app ni el API borran runs, así que el landing lo hace con el mismo
mecanismo con el que el backend los guarda (verificado en código y en el
proyecto real): el original en `files/<org>/<run>/original.<ext>`, las filas
en `runs.output_json`. El cron `/api/cron/lite-cleanup` (cada hora,
`vercel.json`) toma los runs con más de `LITE_RETENTION_HOURS` (24), borra
los objetos de storage en `files` y `run_file_json`, borra la fila de `runs`
y marca `lite_runs.purged_at` limpiando `filename`. Solo toca runs de la org
`TAVNIT_LITE_ORG_ID` (guardarraíl en cada DELETE) y deja en paz los que
sigan `queued`/`running`. Los runs de la org sin fila en `lite_runs`
(pruebas) también se purgan: la org existe solo para esto.

Operación manual con el mismo secreto: `?dry_run=1` reporta sin borrar,
`?max_age_hours=n` cambia la ventana, `?limit=n` el lote. El cliente guarda
el run en el navegador con la misma vida (24 h) y, si al volver ya no
existe, vuelve al estado vacío sin mostrar error.

## Cuenta para descargar

El modal ofrece "Continuar con Google" primero y correo + contraseña debajo.
Es el mismo Google y el mismo proyecto de Supabase que la app: quien crea
cuenta en Lite es el mismo usuario en app.tavnit.io (el admin sigue gateado
por `platform_admins`). Google y el enlace de confirmación por correo salen
de la página y vuelven por `/auth/callback?next=<página>?auth=1`; antes de
salir la herramienta guarda el run en `sessionStorage` (`tavnit_lite_run`,
24 h) y al volver lo restaura, vuelve a pedir las filas al servidor y dispara
la descarga sola. Un simple reload también restaura el resultado.

Requisito: `https://www.tavnit.io/auth/callback` (y en local
`http://localhost:3010/auth/callback`) en Supabase → Authentication → URL
Configuration → Redirect URLs. Con Google no viaja el idioma en los
metadatos, así que el correo de bienvenida sale en español para todos.

## Puesta en marcha (checklist)

1. **Org "Tavnit Lite"** en app.tavnit.io con un miembro cuyo API key se usará solo aquí. Cargarle créditos; ese saldo es el freno de emergencia.
2. **Flows creados el 2026-09-23** en la org Tavnit Lite (`0a2ad765-8d66-4e15-8c24-82fa128ea3b0`), con la misma forma que los crea la app (`flows` + `flow_fields`, hints en el formato `Location/Column header --- ...`):
   - `Factura (Lite)` → `TAVNIT_LITE_INVOICE_FLOW_ID=105a016a-c21d-4b07-9b29-89399bd00cf4`. Campos: `proveedor`, `ruc_proveedor`, `numero_factura`, `fecha`, `moneda`, `subtotal`, `impuesto`, `total`; tabla: `descripcion`, `cantidad`, `unidad`, `precio_unitario`, `total_linea`.
   - `Invoice (Lite)` → `TAVNIT_LITE_INVOICE_FLOW_ID_EN=d20676f1-4183-4dd0-bac6-a32727d4d7f5`. Mismos campos en inglés.
   Sin HITL (la herramienta espera `completed`, nunca `awaiting_approval`). Sin webhook ni correo de salida. No renombrar campos: son las columnas que ve el visitante.
3. **Variables en Vercel** (ver `.env.example`): `TAVNIT_LITE_API_KEY`, `TAVNIT_LITE_INVOICE_FLOW_ID`, `TAVNIT_LITE_INVOICE_FLOW_ID_EN`, `LITE_IP_SALT`, `LITE_DAILY_CAP`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` ya existen.
4. **Supabase → Authentication → URL Configuration**: agregar `https://www.tavnit.io/auth/callback` a Redirect URLs (si no, la confirmación de correo no vuelve a la página).
5. **Turnstile**: crear el widget en Cloudflare para `www.tavnit.io` (modo managed) y poner las dos keys.
6. **Tabla `lite_runs`**: migración `supabase/migrations/20260923150000_lite_runs.sql` (aplicada el 2026-09-23).
7. **Search Console**: reenviar el sitemap y pedir indexación de las cuatro URLs nuevas.

## Cómo agregar una herramienta

1. Entrada en `src/lib/lite/tools.ts` (id, env del flow, rutas EN/ES, sample opcional en `public/lite/`).
2. Copy EN y ES en `src/lib/lite/copy.ts` (solo strings: cruza al cliente).
3. Dos páginas de 10 líneas en `src/app/tools/<slug>/page.tsx` y `src/app/es/herramientas/<slug>/page.tsx`.
4. Enlaces en Footer. Sitemap, hub y llms.txt salen del registro.

## Pruebas

- `node --conditions=react-server --import tsx scripts/lite-check.mts` — Excel, normalización de filas y validación de subidas.
- Con el servidor local, la página funciona sin backend (muestra "no disponible"); el flujo completo necesita la key y el flow de la org Lite.
- El lead de cada descarga queda en `lite_runs` (`user_id`, `user_email`, `downloaded_at`); pendiente pasarlo al CRM del admin con origen "lite".
