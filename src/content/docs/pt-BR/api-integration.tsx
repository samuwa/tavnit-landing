"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import {
  AudioLines,
  Bot,
  Briefcase,
  CircleDot,
  ClipboardCheck,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  FolderInput,
  Info,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Paperclip,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Split,
  Star,
  Target,
  UserCheck,
  Wand2,
  Webhook,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";
import {
  AGENT_RUN_RESPONSE,
  AGENT_TRIGGER_REQUEST,
  API_ERROR_EXAMPLE,
  API_KEY_RESPONSE,
  BUCKET_READ_REQUEST,
  BUCKET_READ_RESPONSE,
  BUCKET_WRITE_RESPONSE,
  BUCKETS_JSON_EXAMPLE,
  CASE_REQUEST,
  CASE_RESPONSE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTION_PROCESS_RESPONSE,
  COLLECTIONS_JSON_EXAMPLE,
  FILLER_REQUEST,
  HITL_RUN_APPROVE_REQUEST,
  INSPECTOR_PROCESS_REQUEST,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_RUN_POLL_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  MATCHER_RUN_REQUEST,
  NET_CATCH_REQUEST,
  PIPELINE_EXECUTE_REQUEST,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_RUN_POLL_CODE,
  PYTHON_SPLITTERS_CODE,
  RUN_GET_RESPONSE,
  RUN_PROCESS_RESPONSE,
  SIGNAL_RUN_REQUEST,
  SOURCE_FILE_RESPONSE,
  SPLIT_RUN_RESPONSE,
  SPLITTERS_JSON_EXAMPLE,
  SWEEP_RUN_RESPONSE,
} from "@/components/docs/code-samples";

/**
 * /pt-br/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
 * A client module (tab and language state), so it exports no `schema`; the
 * English page has none either. Code samples are shared and stay English.
 */

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* The app deep-links to the No-Code tab with #no-code. Reading the hash
 * through an external store keeps the server render on "code" (no hydration
 * mismatch) and also follows later hash changes. */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const hashIsNoCode = () => window.location.hash === "#no-code";
const serverHash = () => false;

const H3 = "text-base font-semibold text-fg-2 mt-6 mb-1";

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 font-mono text-[13px]">
      <span className="rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-0.5 text-[11px] font-bold text-white">
        {method}
      </span>
      <span className="break-all text-fg-2">{path}</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
      {(["python", "javascript"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            lang === l
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          {l === "python" ? "Python" : "JavaScript"}
        </button>
      ))}
    </div>
  );
}

const FIELD_HEAD = ["Campo", "Obrigatório", "Descrição"];

export default function ApiIntegrationPtBr() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integração via API
      </h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setChosenTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Code
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setChosenTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          No-Code
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Code" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="Como a API funciona">
          <p>
            A REST API do Tavnit permite que o seu próprio código faça o que você faz no app: enviar
            documentos para um flow, uma collection, um splitter ou um pipeline, executar cleaners,
            matchers, inspectors, fillers, signals e agents, ler e gravar Buckets, gerenciar os casos
            de um Subject e aprovar ou rejeitar revisões humanas.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                URL base: <InlineCode>https://run.tavnit.io/api</InlineCode>. Todos os caminhos abaixo
                são relativos a ela.
              </Fragment>,
              <Fragment key="b1">
                Toda requisição leva a sua chave de API no header <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                O processamento é assíncrono. Os endpoints que iniciam um trabalho respondem na hora com{" "}
                <strong>202 Accepted</strong> e um id, e o trabalho roda em segundo plano. Você obtém o
                resultado consultando periodicamente (runs, runs de agent, Catches, casos) ou por um{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> configurado no recurso.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Recursos em Beta">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals e Nets estão em Beta. Os
            endpoints deles já funcionam, mas os detalhes ainda podem mudar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Autenticação e IDs">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">Chave de API</h3>
          <p>
            Abra <strong>Integrações</strong> na barra lateral do app. O cartão{" "}
            <strong>Chave de API</strong> mostra a sua chave (é ali que você a revela e copia). Cada
            membro tem a sua própria chave em cada organização, e uma requisição age como esse membro
            nessa organização.
          </p>
          <WarningBox>
            Mantenha a sua chave de API em segredo. <strong>Gerar nova chave</strong>, no mesmo
            cartão, invalida a chave atual imediatamente, e tudo o que ainda a usa para de funcionar.
          </WarningBox>
          <p>Uma requisição sem uma chave válida recebe:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Funções</h3>
          <p>
            A chave carrega a sua função. Membros com a função <strong>Somente HITL</strong> só podem
            usar os endpoints de aprovação e rejeição da revisão humana e os endpoints da chave de API.
            Todos os endpoints de processamento e de dados os recusam com <strong>403</strong> e{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode>. Veja{" "}
            <DocLink href="/docs/user-roles">funções de usuário</DocLink>.
          </p>

          <h3 className={H3}>IDs</h3>
          <p>
            Cada flow, collection, splitter, cleaner, bucket, agent, matcher, inspector, filler e
            pipeline mostra o seu ID na página de detalhes, com um botão de copiar. Os recursos
            precisam pertencer à organização da sua chave: o ID de outra organização responde 403 ou
            404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Envio de arquivos">
          <p>Os endpoints que recebem um documento o aceitam de uma de duas formas:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Upload de arquivo multipart">
            Envie o arquivo como multipart/form-data em um campo chamado file, com os demais campos
            como campos de formulário. Funciona em todos os endpoints de arquivo.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 em um corpo JSON">
            Envie JSON com file_base64 (o conteúdo do arquivo) e filename (com a extensão), mais os
            demais campos. Útil quando uma ferramenta de automação entrega base64 em vez de um arquivo.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Arquivos aceitos"]}
            rows={[
              ["POST /runs/process", "Sim", "PDF, imagens (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), planilhas (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Sim", "Os mesmos dos runs"],
              ["POST /splits/run", "Sim", "Os mesmos dos runs"],
              ["POST /pipelines/{id}/execute", "Sim", "PDF e imagens"],
              ["POST /signals/{id}/run", "Sim", "Áudio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Não", "Planilhas: CSV, XLSX, XLS"],
              ["Inspectors, fillers, subjects e casos", "Não", "O documento como arquivo multipart"],
            ]}
          />
          <p>Uma única requisição pode ter até 150 MB. O tipo de arquivo é deduzido da extensão do filename.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Respostas e erros">
          <p>
            As respostas são JSON com um indicador <InlineCode>success</InlineCode>. Os erros trazem
            uma string <InlineCode>error</InlineCode>, às vezes uma <InlineCode>message</InlineCode>,
            e chaves extras que explicam o problema:
          </p>
          <CodeBlock lang="Exemplo 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Status", "Significado"]}
            rows={[
              ["200 / 201", "Concluído (leituras, cancelamentos, aprovações) / criado (casos, fills, inspeções)."],
              ["202", "Aceito: o trabalho está na fila. Guarde o id retornado."],
              ["400", "Um campo obrigatório está ausente ou é inválido, o tipo de arquivo não é suportado, ou o recurso está inativo ou não configurado."],
              ["401", "X-API-Key ausente ou inválido."],
              ["402", "A sua organização não pode iniciar novos trabalhos agora; entre em contato com a equipe do Tavnit."],
              ["403", "O recurso pertence a outra organização, a sua função é Somente HITL, ou você não é revisor desse item."],
              ["404", "O ID não existe na sua organização."],
              ["409", "Conflito com o estado atual: nome do bucket não confere, já cancelado ou concluído, caso fechado, posição já preenchida."],
              ["429", "Runs demais já aguardando um agent."],
              ["500", "Erro inesperado. Pode tentar de novo mais tarde com segurança."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Referência de endpoints">
          <DataTable
            head={["Recurso", "Método e caminho", "O que faz"]}
            rows={[
              ["Flows", "POST /runs/process", "Extrai um documento com um flow"],
              ["Flows", "GET /runs/{run_id}", "Status do run e dados extraídos"],
              ["Flows", "GET /runs/{run_id}/source-file", "O documento original"],
              ["Collections", "POST /collections/process", "A IA encaminha um documento para o flow ou splitter certo"],
              ["Collections", "GET /collection-runs/{id}/source-file", "O documento original"],
              ["Splitters", "POST /splits/run", "Divide um arquivo com vários documentos"],
              ["Splitters", "GET /splits/{split_id}/source-file", "O pacote original"],
              ["Cleaners", "POST /sweeps/run", "Executa um sweep sobre uma planilha"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Executa um sweep sobre linhas enviadas como JSON"],
              ["Buckets", "POST /buckets/write", "Acrescenta ou substitui linhas"],
              ["Buckets", "GET /buckets/read", "Lê linhas, paginadas"],
              ["Agents", "POST /bots/{agent_id}/runs", "Inicia um run de agent"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Consulta um run de agent"],
              ["Agents", "GET /bots/{agent_id}/runs", "Lista os runs de um agent"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Cancela um run de agent"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Compara runs concluídos"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Adiciona um documento a uma inspeção"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Abre um fill e adiciona documentos"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Executa um pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Estrutura um arquivo de áudio (uma Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Encaminha um documento para um caso"],
              ["Nets", "POST /nets/{net_id}/catch", "Inicia um Catch"],
              ["Revisão humana", "POST /runs/{run_id}/hitl/approve", "Aprova ou rejeita itens pausados"],
              ["Chave de API", "GET /me/api-key", "Lê ou gera novamente a sua chave"],
            ]}
          />
          <p>Cada recurso é detalhado abaixo, com os seus outros endpoints.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: processar um documento">
          <p>Envie um documento para um flow. O Tavnit cria um run e faz a extração em segundo plano.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Sim", "O flow que extrai o documento."],
              ["file", "Sim*", "O documento (multipart)."],
              ["file_base64 + filename", "Sim*", "Em vez de file: o conteúdo em base64 e o nome do arquivo com a extensão."],
              ["content_type", "Não", "Tipo MIME de um arquivo em base64."],
              ["source", "Não", "Rótulo gravado no run: api (padrão), email, manual_upload ou collection."],
            ]}
            caption="* Envie file ou file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Resposta 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Erros: 400 (sem arquivo, sem flow_id, arquivo não suportado ou inválido), 403 (flow de
            outra organização), 404 (flow não encontrado). Uma requisição rejeitada ainda cria um run
            com falha quando possível e retorna o seu <InlineCode>run_id</InlineCode>, para que você o
            encontre em <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Obter o run e os seus dados</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Consulte até que o <InlineCode>status</InlineCode> seja final. Status:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (pausado para{" "}
            <DocLink href="/docs/human-in-the-loop">revisão humana</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> e{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> contém as linhas
            extraídas e fica <InlineCode>null</InlineCode> até o run ser concluído, inclusive enquanto
            ele aguarda aprovação. Quando <InlineCode>columns</InlineCode> estiver presente, use-o para
            a ordem das colunas. <InlineCode>attempt</InlineCode> e{" "}
            <InlineCode>previous_attempts</InlineCode> mostram as novas tentativas automáticas.
            Adicione <InlineCode>?include_document=true</InlineCode> para receber também um link
            assinado para o arquivo original. Isso funciona para todos os runs, inclusive os criados
            por collections, splitters, pipelines e e-mail.
          </p>
          <CodeBlock lang="Resposta 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (enviar e consultar)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (enviar e consultar)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Obter o documento original</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Retorna uma URL assinada para o arquivo como foi enviado, qualquer que seja o status do
            run. O parâmetro opcional <InlineCode>expires_in</InlineCode> define a validade do link em
            segundos (de 60 a 604800, padrão de 7 dias). Com{" "}
            <InlineCode>?download=true</InlineCode> a resposta é o próprio arquivo.
          </p>
          <CodeBlock lang="Resposta 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: deixe a IA encaminhar o documento">
          <p>
            Envie um documento sem escolher o flow: a IA escolhe o melhor flow ou splitter da
            collection. Use quando você recebe tipos de documento variados.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            O mesmo corpo de <InlineCode>/runs/process</InlineCode>, com{" "}
            <InlineCode>collection_id</InlineCode> em vez de <InlineCode>flow_id</InlineCode> (ou
            coloque o ID no caminho: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            A collection precisa estar ativa e ter pelo menos um flow ou splitter ativo; caso
            contrário, a chamada responde 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Resposta 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            O flow escolhido cria um run normal, e o payload do webhook dele inclui{" "}
            <InlineCode>collection_run_id</InlineCode>, para que você relacione o resultado à sua
            requisição. O original fica disponível na hora em{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (com as
            mesmas opções do arquivo de origem do run). Veja{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: dividir um arquivo com vários documentos">
          <p>
            Envie um arquivo que contém vários documentos. O splitter encontra onde cada um começa e
            termina, classifica cada um e envia cada parte para onde o seu tipo de documento indica.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            O mesmo corpo de <InlineCode>/runs/process</InlineCode>, com{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Resposta 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            As partes enviadas a flows viram runs próprios, e os webhooks delas trazem{" "}
            <InlineCode>split_id</InlineCode>. O pacote original fica em{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Veja{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: executar um sweep">
          <p>
            Um sweep executa um cleaner sobre linhas de dados para normalizar, classificar, consultar
            ou enriquecer valores. Envie as linhas como planilha ou como JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Sim", "O cleaner a executar."],
              ["file", "Sim", "CSV, XLSX ou XLS, somente multipart. Cabeçalhos na primeira linha; cada campo base que o cleaner exige precisa ser uma coluna, sem duplicatas."],
              ["sheet_name", "Não", "Qual aba de uma pasta de trabalho ler (padrão: a primeira)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Envie JSON com <InlineCode>rows</InlineCode> (um array de objetos) ou um{" "}
            <InlineCode>file</InlineCode> multipart, como acima.
          </p>
          <CodeBlock lang="Corpo JSON" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Resposta 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Um cleaner com configuração inválida responde 400 com{" "}
            <InlineCode>validation_errors</InlineCode>. Veja{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: gravar e ler linhas">
          <p>
            Envie linhas para um bucket a partir dos seus próprios sistemas, ou leia o que os seus
            flows gravaram ali. Encontre o ID e o nome do bucket tocando no ícone de informações na
            página do bucket. O nome é uma verificação de segurança: se ele não corresponder ao ID, a
            chamada responde <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Sim", "O bucket."],
              ["bucket_name", "Sim", "O nome exato dele."],
              ["overwrite", "Sim", "Booleano. false acrescenta as linhas; true substitui todas as linhas existentes."],
              ["rows", "Sim", "Array de objetos, até 50.000 por requisição."],
            ]}
          />
          <p>
            Envie o corpo como <InlineCode>application/json</InlineCode>. Cada linha precisa ter
            exatamente as colunas do bucket, pelo nome da coluna ou pelo nome de exibição: uma coluna
            ausente ou desconhecida cancela a gravação inteira com 400, listando{" "}
            <InlineCode>missing_columns</InlineCode> e <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Resposta 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Ler linhas</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Parâmetros de consulta: <InlineCode>bucket_id</InlineCode> e{" "}
            <InlineCode>bucket_name</InlineCode> (obrigatórios), <InlineCode>limit</InlineCode> (de 1
            a 1000, padrão 100) e <InlineCode>offset</InlineCode> (padrão 0). Pagine com{" "}
            <InlineCode>offset</InlineCode> enquanto <InlineCode>has_more</InlineCode> for true;{" "}
            <InlineCode>total_count</InlineCode> conta todas as linhas. As chaves de{" "}
            <InlineCode>data</InlineCode> de cada linha são os nomes das colunas; use{" "}
            <InlineCode>columns</InlineCode> para os nomes de exibição. Os links de arquivos
            armazenados voltam como URLs assinadas novas.
          </p>
          <CodeBlock lang="Requisição" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Resposta 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Veja <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: iniciar e consultar runs">
          <p>
            Inicie um agent a partir do seu código e colete o que ele capturou. Os agents são
            habilitados por organização, mediante solicitação: fale com o suporte para ativá-los.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            O JSON opcional <InlineCode>{'{"inputs": {...}}'}</InlineCode> substitui as variáveis de
            entrada do agent neste run. Só as variáveis que o agent declara são usadas, e valores
            secretos nunca são aceitos. Você também pode chamar{" "}
            <InlineCode>POST /bots/runs</InlineCode> com <InlineCode>bot_id</InlineCode> no corpo.
            Cada chamada inicia um novo run.
          </p>
          <CodeBlock lang="Requisição" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> é <InlineCode>queued</InlineCode>, ou{" "}
            <InlineCode>waiting</InlineCode> quando o agent executa um run por vez e está ocupado (ele
            começa sozinho quando chega a vez dele). 409 quando o agent está arquivado, 429 quando
            runs demais já estão aguardando.
          </p>

          <h3 className={H3}>Consultar, listar e cancelar</h3>
          <DataTable
            head={["Endpoint", "O que faz"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Um run: status, tempos, entrada (sem os segredos) e saída com links de arquivo assinados. Também em GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Os mais recentes primeiro, sem entrada nem saída. Consulta: status (queued, running, completed, failed, cancelled), limit (de 1 a 100, padrão 20), offset. Retorna runs e total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Cancela um run aguardando, na fila ou em execução. 409 quando o run já terminou. Também em POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Veja <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: comparar runs">
          <p>Compare runs concluídos do flow do matcher, por exemplo faturas contra pedidos de compra.</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Sim", "Dois ou mais runs concluídos do flow do matcher."],
              ["benchmark_run_id", "No modo benchmark", "O run com o qual os outros são comparados."],
            ]}
          />
          <CodeBlock lang="Requisição" code={MATCHER_RUN_REQUEST} />
          <p>
            Não existe endpoint de API para ler uma comparação: receba o resultado pelo webhook ou
            pela saída por e-mail do matcher, ou no app. Veja{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: verificar um conjunto de documentos">
          <p>
            Uma inspeção reúne documentos, encaminha cada um para uma posição do inspector, faz a
            extração e avalia o checklist.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            <InlineCode>file</InlineCode> multipart. Sem <InlineCode>inspection_id</InlineCode>, uma
            nova inspeção é criada; passe o <InlineCode>inspection_id</InlineCode> retornado para
            adicionar mais documentos a ela (ela ainda precisa estar coletando; caso contrário, 409). O
            inspector precisa estar ativo.
          </p>
          <CodeBlock lang="Requisição" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "O que faz"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Cria uma inspeção vazia (201) para adicionar documentos depois."],
              ["POST /inspections/{inspection_id}/fire", "Para de coletar e avalia agora. 400 com missing_inputs quando uma posição obrigatória não tem documento."],
            ]}
          />
          <p>
            O resultado chega pelo webhook ou pela saída por e-mail do inspector. Veja{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: preencher formulários PDF">
          <p>
            Um fill reúne os documentos de que um filler precisa, faz a extração e grava os valores
            nos modelos PDF do filler.
          </p>
          <DataTable
            head={["Endpoint", "O que faz"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Abre um fill (201, retorna fill_id). O filler precisa de um modelo e de mapeamentos de campos."],
              ["POST /fills/{fill_id}/route-upload", "Arquivo multipart; a IA o encaminha para uma posição livre (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Arquivo multipart para uma posição específica; inicia o run dessa posição (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: reutiliza um run concluído para uma posição (202)."],
              ["POST /fills/{fill_id}/fire", "Preenche agora, em vez de esperar todas as posições. 400 com missing_inputs quando uma posição obrigatória está vazia."],
              ["POST /fillers/{filler_id}/templates", "Adiciona um modelo PDF (arquivo multipart, name opcional). Mapeie os campos dele no app."],
            ]}
          />
          <CodeBlock lang="Requisição" code={FILLER_REQUEST} />
          <p>
            Os PDFs preenchidos chegam pelo webhook ou pela saída por e-mail do filler. Veja{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: executar">
          <p>Inicie uma execução de um pipeline com um documento.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            <InlineCode>file</InlineCode> multipart ou <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF ou imagem. 400 quando o pipeline está inativo ou o
            grafo dele não pode ser executado (com <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Requisição" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Cancele com <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            (409 quando não está em execução). Os resultados saem pelos nós Output do pipeline. Veja{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: estruturar um arquivo de áudio">
          <p>Envie uma gravação, e o signal a transforma em dados estruturados (uma Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            <InlineCode>file</InlineCode> multipart ou base64. Áudio de até 150 MB e 8 horas, com no
            máximo 2 horas de fala detectada.
          </p>
          <CodeBlock lang="Requisição" code={SIGNAL_RUN_REQUEST} />
          <p>
            O resultado chega pelo webhook do signal ou no app. Veja{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects e casos">
          <p>Arquive documentos nos casos de um Subject e gerencie os casos a partir do seu código.</p>
          <DataTable
            head={["Endpoint", "O que faz"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Arquivo multipart; o Tavnit o encaminha para um caso (202, retorna subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Arquivo multipart direto em um caso, sem encaminhamento. doc_type_id é obrigatório, a menos que o subject tenha um único tipo de documento. Retorna o run_id (202). 409 quando o caso está fechado ou esse tipo de documento já foi preenchido."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id e doc_type_id: arquiva manualmente um documento retido (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (obrigatório, único, até 200 caracteres) e params (objeto opcional). Cria um caso (201). 409 quando o nome já existe."],
              ["GET /subjects/{subject_id}/cases", "Consulta: state (open ou closed), status, search, limit (até 200, padrão 50), offset. Retorna cases e total."],
              ["GET /cases/{case_id}", "O caso e os seus documentos, cada um com o run_id a consultar em GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Fecha o caso (200). Novos documentos para ele ficam retidos em vez de arquivados. 409 quando já está fechado."],
              ["POST /cases/{case_id}/reopen", "Reabre o caso (200). 409 quando ele está aberto."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: executa um inspector vinculado sobre os runs concluídos do caso (202)."],
            ]}
          />
          <CodeBlock lang="Requisição" code={CASE_REQUEST} />
          <CodeBlock lang="Resposta 201" code={CASE_RESPONSE} />
          <p>
            Veja <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: iniciar um Catch">
          <p>As Nets são habilitadas por organização. Sem acesso, estes endpoints respondem 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Sem corpo, o Catch continua de onde o último terminou. Envie{" "}
            <InlineCode>window_start</InlineCode> e/ou <InlineCode>window_end</InlineCode> (timestamps
            ISO) para preencher um intervalo retroativamente. 409 quando a Net está inativa ou quando
            um Catch que continua do último já está em andamento.
          </p>
          <CodeBlock lang="Requisição" code={NET_CATCH_REQUEST} />
          <p>
            Consulte <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: status, etapa, contagens e,
            depois de concluído, <InlineCode>output</InlineCode> com colunas e linhas. Cancele com{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Veja{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Revisão humana: aprovar ou rejeitar">
          <p>
            Itens pausados para revisão podem ser aprovados ou rejeitados a partir das suas próprias
            ferramentas. Só um revisor configurado daquele flow, matcher, inspector ou filler pode
            agir (caso contrário, 403), e o item precisa estar{" "}
            <InlineCode>awaiting_approval</InlineCode> (caso contrário, 409). Estes endpoints estão
            abertos à função Somente HITL.
          </p>
          <DataTable
            head={["Endpoint", "Corpo"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (obrigatório): as linhas finais; diff (lista opcional de edições). 400 com missing_fields quando um campo obrigatório de entrada humana está vazio."],
              ["POST /matches/{match_id}/hitl/approve", "groups (o agrupamento final), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id e reason para cada item reprovado a dispensar), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (valores dos campos por modelo), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Os mesmos caminhos terminando em /hitl/reject, com um reason opcional."],
            ]}
          />
          <CodeBlock lang="Requisição" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Aprovar retoma a entrega (webhook, e-mail, bucket). Rejeitar um run o cancela. Veja{" "}
            <DocLink href="/docs/human-in-the-loop">Revisão humana</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpoints da chave de API">
          <DataTable
            head={["Endpoint", "O que faz"]}
            rows={[
              ["GET /me/api-key", "Retorna a sua chave para a organização."],
              ["POST /me/api-key/regenerate", "Emite uma nova chave e invalida a antiga na hora. Atualize todas as integrações."],
            ]}
          />
          <CodeBlock lang="Resposta 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Visão geral das ferramentas de automação">
          <p>
            Você não precisa escrever código para conectar o Tavnit aos seus fluxos de trabalho.
            Qualquer plataforma de automação que consiga enviar uma requisição HTTP pode iniciar
            trabalhos no Tavnit, e qualquer plataforma que consiga receber um webhook pode receber os
            resultados.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Cenários visuais: um módulo HTTP chama o Tavnit e um Custom webhook recebe os resultados.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: o Catch Hook recebe os resultados e uma ação POST inicia os runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Auto-hospedado ou na nuvem: um nó Webhook recebe os resultados e um nó HTTP Request
            inicia os runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Uma ação HTTP chama a API da mesma forma.
          </InfoBox>
          <p>
            Toda requisição precisa do header <InlineCode>X-API-Key</InlineCode> com a sua chave, que
            fica em <strong>Integrações</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Receba os resultados na sua automação">
          <NumberedList
            items={[
              "Na sua plataforma, crie um gatilho de webhook (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: nó Webhook, POST) e copie a URL dele.",
              "No Tavnit, cole-a como o webhook de um flow (painel Webhook) ou de um nó Output de um pipeline.",
              "Processe um documento para que a plataforma aprenda o payload e, em seguida, mapeie os campos para o Sheets, um CRM, um ERP e assim por diante.",
            ]}
          />
          <p>
            O payload está descrito na <DocLink href="/docs/webhooks">página de webhooks</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integração com o Make">
          <p>
            O Make (antigo Integromat) é uma plataforma visual de automação que permite conectar
            apps e automatizar fluxos de trabalho sem escrever código.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Visitar o Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Primeiros passos com o Make">
          <NumberedList
            items={[
              "Acesse make.com e crie uma conta",
              'Clique em "Create a new scenario" no seu painel',
              "Você verá uma tela em branco onde pode adicionar módulos",
              'Procure por "HTTP" e adicione o módulo "Make a request"',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="O que é um cenário?">
            Um cenário é um fluxo de trabalho automatizado no Make. Ele é formado por módulos (apps)
            conectados entre si. Quando um módulo é acionado ou recebe dados, ele passa esses dados
            para o próximo módulo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configure o módulo HTTP">
          <p>
            Depois de adicionar o módulo HTTP, configure-o para enviar documentos ao Tavnit. Você pode
            usar qualquer uma destas duas abordagens:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Opção 1: multipart/form-data (quando você tem um objeto de arquivo)
          </h3>
          <NumberedList
            items={[
              'Adicione um módulo HTTP "Make a request" ao seu cenário',
              <Fragment key="f14">
                Configure a requisição:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Método: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Na aba Headers, adicione:
                <BulletList
                  items={[
                    "Nome do header: X-API-Key",
                    "Valor do header: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Defina o Body type como "multipart/form-data"',
              <Fragment key="f16">
                Adicione os campos do formulário:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (mapeie a partir do módulo anterior)",
                    "source: api (opcional)",
                  ]}
                />
              </Fragment>,
              "Execute o seu cenário para testar",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Opção 2: JSON + base64 (quando você tem uma string base64)
          </h3>
          <p>Se o seu módulo anterior produz uma string base64 em vez de um arquivo, use esta abordagem:</p>
          <NumberedList
            items={[
              'Defina o Body type como "Raw" e selecione "JSON (application/json)"',
              <Fragment key="f17">
                Na aba Headers, adicione também:
                <BulletList
                  items={[
                    "Nome do header: Content-Type",
                    "Valor do header: application/json",
                  ]}
                />
              </Fragment>,
              "Defina o corpo JSON como:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mapeando o conteúdo base64">
            Substitua {"{{previous_module.base64_content}}"} pelo mapeamento real do seu módulo
            anterior. No Make, clique no campo e selecione a saída base64 do módulo que fornece o seu
            arquivo. Mantenha a extensão em filename: o Tavnit a usa para detectar o tipo de arquivo.
          </InfoBox>
          <p>
            A chamada responde na hora com um <InlineCode>run_id</InlineCode>. Os dados extraídos
            chegam depois pelo webhook do flow, ou você pode buscá-los com um segundo módulo HTTP que
            chame <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Outras plataformas (Zapier, Power Automate, n8n)">
          <p>A mesma abordagem funciona em qualquer plataforma de automação que suporte requisições HTTP:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Se a sua plataforma entrega um objeto de arquivo">
            Use multipart/form-data com um campo &ldquo;file&rdquo; contendo o arquivo, mais o campo flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Se a sua plataforma entrega uma string base64">
            Use um corpo JSON com flow_id, filename e file_base64 (o conteúdo base64 da etapa anterior).
          </InfoBox>
          <p>
            Os dois métodos chamam o mesmo endpoint e produzem resultados de extração idênticos. Para
            processar arquivos que chegam ao Google Drive, OneDrive ou Dropbox, use o gatilho
            &ldquo;New file in folder&rdquo; e envie o arquivo por POST da mesma forma.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Usando a API de Collections">
          <p>
            Se você recebe tipos diferentes de documentos e quer que a IA encaminhe cada um para o
            flow certo, chame a collection em vez de um flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Use <InlineCode>collection_id</InlineCode> em vez de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Usando a API de Splitters">
          <p>
            Se você recebe PDFs combinados com vários documentos e precisa separá-los, chame o
            splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Use <InlineCode>splitter_id</InlineCode> em vez de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Iniciando um pipeline">
          <p>
            Para executar um pipeline inteiro em vez de um único flow, envie o arquivo por POST
            (<InlineCode>file</InlineCode> multipart, ou JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>) para{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            com o mesmo header. O ID do pipeline vai na URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Usando a API de Cleaners">
          <p>
            Para limpar linhas de dados a partir da sua automação, envie-as como JSON para o cleaner.
            Um arquivo de planilha vai para{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, como multipart com{" "}
            <InlineCode>cleaner_id</InlineCode> (esse endpoint não aceita base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Método: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Usando a API de Buckets">
          <p>
            Para enviar linhas a um bucket sem mandar um documento, use o endpoint de gravação. Cada
            linha precisa conter todas as colunas do bucket.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Método: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Como encontrar o ID e o nome do bucket">
            Abra a página de detalhes do bucket e toque no ícone de informações. Os dois valores podem ser copiados com um único toque.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Outros recursos">
          <p>
            Agents, matchers, inspectors, fillers, signals, subjects e Nets são iniciados da mesma
            forma: uma requisição HTTP com o header <InlineCode>X-API-Key</InlineCode>. Mude para a
            aba <strong>Code</strong> para ver os campos de cada endpoint.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Receba resultados com webhooks",
            description: "O payload que o Tavnit envia quando um run é concluído e como construir um receptor.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Conecte um assistente de IA com o conector MCP",
            description: "Use o Tavnit a partir do claude.ai, do Cursor ou de outro cliente MCP.",
          },
          {
            href: "/docs/user-roles",
            label: "Funções de usuário e permissões",
            description: "Por que uma chave Somente HITL pode revisar, mas não processar.",
          },
        ]}
      />
    </section>
  );
}
