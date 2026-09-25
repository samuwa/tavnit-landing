# Tavnit Lite — herramientas gratis en el landing

Herramientas de un solo uso (modelo iLovePDF) montadas sobre el producto real.
Cada herramienta es un recurso fijo dentro de una org dedicada del producto
("Tavnit Lite"): un Flow, un Matcher sobre un Flow, o un Splitter. El landing
llama al API existente con la key de esa org y muestra el resultado en
pantalla. Descargar (Excel, documentos separados) pide iniciar sesión.

Tres tipos de herramienta (`kind` en el registro):

- `extract`: un documento → un Flow → tabla (Excel). Factura, líneas de factura, packing list, BL, contrato (solo metadata: una fila), recibo.
- `compare`: 2–3 documentos → el mismo Flow → un Matcher empareja las líneas. OC vs factura (modo benchmark, la OC es la referencia) y cotizaciones (multilateral, columna Champion).
- `split`: un PDF escaneado → un Splitter → los documentos que contiene, clasificados; se descargan uno a uno o en zip.

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
| Líneas de factura (mismo Flow, otra página) | `/tools/invoice-line-item-extractor` | `/es/herramientas/extraer-lineas-de-factura` |
| OC vs factura | `/tools/po-vs-invoice-check` | `/es/herramientas/comparar-factura-con-orden-de-compra` |
| Cotizaciones | `/tools/compare-supplier-quotes` | `/es/herramientas/comparar-cotizaciones` |
| Separar PDF escaneado | `/tools/split-scanned-pdf` | `/es/herramientas/separar-pdf-escaneado` |
| Packing list a Excel | `/tools/packing-list-to-excel` | `/es/herramientas/packing-list-a-excel` |
| BL a Excel | `/tools/bill-of-lading-to-excel` | `/es/herramientas/bl-a-excel` |
| Fechas de contratos | `/tools/contract-renewal-date-extractor` | `/es/herramientas/fechas-de-renovacion-de-contratos` |
| Recibos a Excel | `/tools/receipt-to-excel` | `/es/herramientas/recibos-a-excel` |

API (mismo origen, nunca desde otro dominio):

- `POST /api/lite/runs` — multipart `tool`, `locale`, `file` (o `sample=1`), `cf-turnstile-response`, honeypot `website`. Devuelve `{ runId, pages, remaining }`.
- `GET /api/lite/runs/:id` — estado y filas (solo la sesión que lo creó).
- `GET /api/lite/runs/:id/document` — el archivo subido, en línea (solo la sesión dueña; el URL firmado del storage nunca sale al navegador).
- `GET /api/lite/runs/:id/download` — Excel; 401 `auth_required` si no hay sesión de Tavnit. `?hide=a,b` deja fuera las columnas que el visitante quitó en la tabla.
- `POST /api/lite/compare` — JSON `{ tool, runIds }` (corridas completadas de esta sesión, en orden de casilla; la casilla 0 es la referencia). Llama a `POST /api/matchers/:id/run` del producto; no gasta cuota (los documentos ya la gastaron). `GET /api/lite/compare/:id` lee la fila `matches` de la org Lite y la interpreta (`src/lib/lite/compare.ts`); `…/download` la baja en Excel.
- `POST /api/lite/split` — multipart como `runs`, hasta 12 páginas; llama a `POST /api/splits/run`. `GET /api/lite/split/:id` lee la fila `splits`; `…/segment/:n` y `…/download` (zip) sirven los cortes desde el bucket `files` (`<org>/splits/<id>/doc_N.pdf`), con sesión de Tavnit.
- `GET /auth/callback?code=…&next=/ruta` — cierra la confirmación de correo y vuelve a la página.

## Seguridad (lo que hace el servidor, en orden)

1. Origin debe coincidir con el host (corta llamadas desde otros sitios).
2. Honeypot `website`: si viene lleno, responde OK sin hacer nada.
3. Chequeo barato del archivo por sus bytes: tamaño ≤ 4 MB (Vercel corta los cuerpos a 4.5 MB) y magia PDF/PNG/JPEG.
4. Turnstile (cuando `TURNSTILE_SECRET_KEY` está configurado). Recién después se parsea el PDF (≤ 5 páginas), para que el parseo no se pueda usar sin captcha.
5. Cuotas reservadas de forma atómica con `lite_reserve` (migración `20260925090000_lite_reserve.sql`): contar e insertar pasan en una sola transacción, así que peticiones en paralelo no pasan juntas el mismo conteo. Si el backend falla, `lite_release` devuelve el cupo. Las comparaciones tienen su propio límite diario por sesión e IP y exigen la marca de Turnstile. 5 documentos al día por sesión anónima y por IP (hash HMAC, nunca la IP; `LITE_RUNS_PER_DAY` lo cambia, útil para probar), y un tope global diario (`LITE_DAILY_CAP`) que protege el saldo de créditos de la org Lite.
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
   - Los hints de `descripcion`/`cantidad`/`total_linea` (y sus equivalentes en inglés) dicen explícitamente que no se crean filas para Subtotal, Descuento, Impuesto, Envío ni Total (ajustado el 2026-09-24: sin eso el modelo devolvía esas filas como líneas).
   - `Factura (Lite)` → `TAVNIT_LITE_INVOICE_FLOW_ID=105a016a-c21d-4b07-9b29-89399bd00cf4`. Campos: `proveedor`, `ruc_proveedor`, `numero_factura`, `fecha`, `moneda`, `subtotal`, `impuesto`, `total`; tabla: `descripcion`, `cantidad`, `unidad`, `precio_unitario`, `total_linea`.
   - `Invoice (Lite)` → `TAVNIT_LITE_INVOICE_FLOW_ID_EN=d20676f1-4183-4dd0-bac6-a32727d4d7f5`. Mismos campos en inglés.
   Sin HITL (la herramienta espera `completed`, nunca `awaiting_approval`). Sin webhook ni correo de salida. No renombrar campos: son las columnas que ve el visitante.
3. **Variables en Vercel** (ver `.env.example`): `TAVNIT_LITE_API_KEY`, `TAVNIT_LITE_INVOICE_FLOW_ID`, `TAVNIT_LITE_INVOICE_FLOW_ID_EN`, `LITE_IP_SALT`, `LITE_DAILY_CAP`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` ya existen.
4. **Supabase → Authentication → URL Configuration**: agregar `https://www.tavnit.io/auth/callback` a Redirect URLs (si no, la confirmación de correo no vuelve a la página).
5. **Turnstile**: crear el widget en Cloudflare para `www.tavnit.io` (modo managed) y poner las dos keys.
6. **Tabla `lite_runs`**: migraciones `20260923150000_lite_runs.sql`, `20260924100000_lite_runs_purged.sql` y `20260924160000_lite_runs_kind.sql` (todas aplicadas). `kind` = run | split | match: la cuota cuenta documentos (run y split); un match no cuenta.
7. **Search Console**: reenviar el sitemap y pedir indexación de las cuatro URLs nuevas.

## Ejemplos grabados (no se corren)

El botón "Probar con … de ejemplo" no corre nada: el mismo documento da siempre el mismo resultado, así que correrlo en cada clic gastaría un documento del cupo del visitante y créditos de la org Lite para mostrar algo que ya sabemos. Cada ejemplo se corrió una vez contra el motor real con `node scripts/record-lite-samples.mjs` (dev server en :3010 con `LITE_RUNS_PER_DAY` alto) y el resultado vive en `src/lib/lite/samples/<tool>.<locale>.json`. La página recorre las mismas etapas de progreso (~6,5 s) y muestra la grabación.

- `GET /api/lite/sample/:tool?locale=` — la grabación (pública, cacheable).
- `GET /api/lite/sample/:tool/download?locale=&hide=` — Excel (extracción o comparación) o zip de los cortes (separador), armado desde la grabación; pide sesión como toda descarga y deja una fila `lite_runs` con `is_sample` y quién descargó (el lead).
- `GET /api/lite/sample/:tool/segment/:n` — un corte del PDF de ejemplo según el rango de páginas grabado.

Volver a grabar cuando cambie un Flow, Matcher o Splitter detrás de un ejemplo (o su PDF en `public/lite/`).

## Hojas de cálculo: números, fechas, moneda y traducción (kind `clean`)

Dos herramientas sobre un Excel o CSV, no sobre un documento: **Comas y puntos en números** (`/tools/fix-number-format-excel`, `/es/herramientas/convertir-comas-a-puntos-excel`) y **Formato de fechas** (`/tools/fix-date-format-excel`, `/es/herramientas/cambiar-formato-de-fecha-excel`). Cada una corre un Cleaner fijo de la org Lite por `POST /api/sweeps/run`.

Cómo encaja cualquier archivo con un Cleaner fijo (opción A): los 6 Cleaners tienen 10 columnas genéricas `col_1..col_10` en modo replace. El visitante elige hasta 10 columnas (marcamos las que parecen números o fechas), el landing las renombra a `col_n`, manda **solo esas columnas** y al volver rearma su archivo completo desde `lite_runs.meta` (encabezado, filas originales, qué celdas se mandaron).

Lo que hace el landing antes del Cleaner (`src/lib/lite/clean.ts`), verificado en el código de Flask:
- El parser de números del motor borra las comas (`1.234,56` → 1.23456), así que el landing normaliza con el separador decimal que elige el visitante y manda `1234.56`.
- El parser de fechas sin formato solo lee ISO, así que las fechas con números van a ISO con el orden día/mes elegido; las escritas en palabras van tal cual y las lee la conversión con IA del Cleaner (`aiConversion`).
- El sweep falla (PGRST102) si hay celdas vacías o textos que pandas lee como NaN (`N/A`, `null`…): esas celdas van con un relleno (`0` / `1970-01-01`) y al rearmar se deja el valor original.
- El resultado del sweep trae solo las columnas del Cleaner; se une por orden de fila.
- Costo: 1 crédito por 500 celdas no vacías enviadas (máx. 500 filas × 10 = 10 créditos).

Rutas: `POST /api/lite/clean/preview` (lee el archivo, sugiere columnas y separador; no guarda ni cuenta cupo), `POST /api/lite/clean` (Turnstile, cupo atómico `kind = sweep`, sweep, `meta`), `GET /api/lite/clean/:id`, `GET /api/lite/clean/:id/download?fmt=csv` (con cuenta). La purga borra la fila `sweeps` y limpia `meta` a las 24 h. Migración `20260925150000_lite_sweeps.sql` (aplicada).

| Cleaner | id |
|---|---|
| Números 1234.56 (`plain`) | `ae6142e5-d82b-4770-9f73-42ded6129b5f` |
| Números 1,234.56 (`us`) | `665e70df-f246-43b7-8315-1eefcfeca5d4` |
| Números 1.234,56 (`latam`) | `83042443-e913-4b2d-baac-25eddf25231b` |
| Fechas yyyy-MM-dd (`iso`) | `e4a0006f-ed7d-4bd8-b831-8ebaa4f6e8fc` |
| Fechas dd/MM/yyyy (`dmy`) | `85f5fb7c-c4e5-4d35-8def-18f86b670be0` |
| Fechas MM/dd/yyyy (`mdy`) | `f77f582b-96ae-4fe6-9f45-928808ccd2f9` |

### Moneda y traducción (campos derivados, 2026-09-25)

**Convertir moneda** (`/tools/convert-currency-excel`, `/es/herramientas/convertir-moneda-excel`) y **Traducir columnas** (`/tools/translate-excel-columns`, `/es/herramientas/traducir-excel`). Estos Cleaners no reemplazan la columna: agregan una nueva al lado, `Precio (USD)`, `Descripción (EN)`.

- Cada Cleaner tiene 10 campos base de texto `in_1..in_10` y 10 campos derivados `out_1..out_10` (`source_field: in_n`). Los `in_n` son obligatorios: el sweep borra toda columna que el Cleaner no define antes de correr los derivados.
- Moneda: el landing manda `1234.56 EUR` (número normalizado + código ISO que eligió el visitante); el Cleaner usa `source_currency: auto_detect`, `mode: live`, 2 decimales. Las tasas vienen de Frankfurter (Banco Central Europeo, ~30 monedas): **no hay COP, PEN, CLP, ARS ni PAB** (en Panamá, USD). La lista de origen es `SOURCE_CURRENCIES` en `clean.ts`.
- Traducción: `source_language: auto`, `skip_if_target_language`, `preserve_formatting`. Usa OpenAI por celda, por eso el máximo es 200 filas (`MODE_MAX_ROWS`).
- Relleno de celdas vacías: un espacio `" "` (pandas no lo lee como NaN, no se cobra y los derivados lo saltan).

Un Cleaner por destino: **30 monedas** (todas las del BCE; JPY, KRW e ISK con 0 decimales) y **43 idiomas** (cualquier código ISO 639-1 sirve: el motor se lo pasa al modelo). Los ids están en `defs/currency-converter.ts` y `defs/translate-columns.ts`. Para agregar un destino: clonar el Cleaner de USD o de `en` (cleaners + sus 20 cleaner_fields, cambiando `target_currency` / `target_language`) y sumar la línea en el def; el desplegable, la validación y el nombre (con `Intl.DisplayNames`) salen solos. Los primeros del desplegable son `POPULAR_OUTPUTS` en `clean.ts`. BGN salió de la lista: el BCE dejó de publicarlo cuando Bulgaria adoptó el euro.

## Recursos en la org Lite (2026-09-24)

Los ids viven en `src/lib/lite/defs/<tool>.ts` (no son secretos); la variable de entorno del mismo nombre los sobreescribe por ambiente. Todos creados por PostgREST con la misma forma que los crea la app.

| Herramienta | Recurso | ES | EN |
|---|---|---|---|
| invoice-to-excel, invoice-line-items | Flow | `105a016a-c21d-4b07-9b29-89399bd00cf4` | `d20676f1-4183-4dd0-bac6-a32727d4d7f5` |
| packing-list-to-excel | Flow | `66894dc3-f46e-4a81-a27f-19dbd0bde093` | `7c89abd1-2474-4d4e-ae75-359361165b05` |
| bill-of-lading-to-excel | Flow | `d93ac748-3fcc-4092-93f1-c4a62bba1b0f` | `fe48e725-0762-4062-a53a-53f32f438508` |
| contract-dates | Flow (solo metadata) | `362045dc-1e57-4f45-9d0d-3f20ea90aede` | `96dce8f8-9da0-4554-bb8f-dc47026f5d16` |
| receipt-to-excel | Flow | `9a1c4c22-8563-4e93-8ac2-aceee1c6d639` | `d708a645-53b6-434e-b3f3-3bff8e52a094` |
| po-invoice-check | Flow "Documento de compra" | `c7ceb372-091f-42cf-806a-935130bed96e` | `be5e1230-9163-435d-a6b3-76c7ba11da6c` |
| po-invoice-check | Matcher benchmark (id `numero`, match `descripcion`, comp. `precio_unitario`) | `951b84c3-853b-4bfe-a42b-abc77ac4a16b` | `0c6cb6b6-fd57-4b97-8383-115db5c3ae53` |
| quote-comparison | Flow "Cotización" | `a42ada9c-1cfd-485b-b9af-b1747edd300f` | `80b9fab0-5322-4e48-a004-dbcedc09223c` |
| quote-comparison | Matcher multilateral (id `proveedor`, sin context_fields: con `unidad` fusionaba líneas) | `397abda0-99fe-412c-b709-feb774ea91db` | `704f121a-4366-489f-bacf-d448d2480ab5` |
| split-scanned-pdf | Splitter "Separador (Lite)" + 8 splitter_docs con `output_action: none` | `5f692a95-d6a7-4752-b09a-ff81d176f856` | — |

Limpieza: `purgeExpiredRuns` borra también las filas `splits` (y sus objetos en `files/<org>/splits/<id>/`) y `matches` de la org Lite pasadas las 24 h.

## Cómo agregar una herramienta

1. Definición en `src/lib/lite/defs/<tool>.ts` (id, kind, rutas EN/ES, ids del Flow/Matcher/Splitter, `columnOrder`, `lineFields`, samples en `public/lite/`) y su import en `src/lib/lite/tools.ts`.
2. Copy en `src/lib/lite/copy/<tool>.ts`: el vocabulario del documento (`DocVocab`: factura, una factura, tus facturas…) y solo lo que cambia frente a la base (`copy-base.ts`, escrita con tokens `{doc}`, `{a_doc}`, `{all_docs}`… y `{limit}` para el cupo diario). Los arreglos (faqs, pasos, ideas de Cleaner) se reemplazan enteros. Import en `src/lib/lite/copy.ts`.
3. Dos páginas de 10 líneas (`page.tsx` + `opengraph-image.tsx`) en `src/app/tools/<slug>/` y `src/app/es/herramientas/<slug>/`.
4. El hub, el sitemap y el footer salen del registro solos; `llms.txt` se edita a mano.
4. Enlaces en Footer. Sitemap, hub y llms.txt salen del registro.

## Pruebas

- `node --conditions=react-server --import tsx scripts/lite-check.mts` — Excel, normalización de filas y validación de subidas.
- Con el servidor local, la página funciona sin backend (muestra "no disponible"); el flujo completo necesita la key y el flow de la org Lite.
- El lead de cada descarga queda en `lite_runs` (`user_id`, `user_email`, `downloaded_at`); pendiente pasarlo al CRM del admin con origen "lite".

## De Lite a Tavnit (handoff)

Lo que un visitante prueba en Lite llega a su cuenta en la app. Sin Flask: tablas en Supabase, el landing escribe, la app lee.

- `lite_intents` (migración `20260925180000_lite_intents.sql`): una fila por señal — `used` (obtuvo un resultado con una herramienta) o `cta` (tocó un botón hacia Tavnit, con `feature`: `flow`, `webhook`, `email-out`, `review`, `matcher`, `cleaner`, `agent`, `bucket`, `input:*`). `payload` lleva, por ejemplo, las columnas que quitó. Solo el servidor del landing escribe (service role); RLS deja a cada usuario leer solo sus filas.
- `lite_handoffs` + `claim_lite_handoff(token)`: cada botón hacia Tavnit (`TavnitLink`, `src/components/lite/intent.tsx`) pasa por `POST /api/lite/intent` con `handoff: true`, que crea un token aleatorio de un solo uso y abre `app.tavnit.io/?lite=<token>`. La app lo guarda en localStorage, y al iniciar sesión llama a la función (SECURITY DEFINER), que une las filas de esa sesión de Lite al usuario que llama y a nadie más; el token vence a los 7 días y se canjea una vez. Si el visitante ya había iniciado sesión en Lite, las filas nacen con su `user_id`.
- En la app (tavnit-nextjs, rama `feat/lite-handoff`): `src/lib/lite-handoff.ts` traduce las filas a un plan. En `/welcome` el cuestionario viene prellenado (tipos de documento y objetivos), aparece "Probaste X en Tavnit Lite", y al terminar se crean hasta 3 Flows desde las plantillas que corresponden (se agregaron las plantillas `packing-list` y `bill-of-lading`); `org_onboarding.answers.lite` guarda herramientas, features y lo sembrado, y la guía de primeros pasos marca como sugerido lo que tocó (Matcher, Cleaner, integraciones…). Créditos iniciales: 0, por decisión del 2026-09-25.
