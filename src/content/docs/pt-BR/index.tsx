import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /pt-BR/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Passo 1: crie um Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Extrair dados estruturados de um documento com o Tavnit",
    description:
      "Crie um Flow do Tavnit a partir de um modelo, de um documento de exemplo ou do zero, confira os campos, processe um documento e leia o resultado estruturado — sem desenhar modelos e sem código.",
    steps: [
      {
        name: "Abra a caixa de diálogo de criação",
        text: "Na página Flows, clique em Criar Flow.",
      },
      {
        name: "Escolha um ponto de partida",
        text: "Escolha A partir de um modelo (um modelo do Tavnit ou uma cópia de um dos seus Flows), Sugestão da IA (envie um PDF ou uma imagem de exemplo e a IA esboça os campos) ou Começar do zero.",
      },
      {
        name: "Dê nome e descrição ao Flow",
        text: "Dê ao Flow um nome com pelo menos 3 caracteres e uma descrição com pelo menos 10 que diga quais documentos ele processa.",
      },
      {
        name: "Revise o esquema de dados",
        text: "No editor, adicione, edite ou exclua campos até que o esquema seja exatamente o que você precisa. Um Flow novo já está Ativo.",
      },
      {
        name: "Processe um documento",
        text: "Clique em Executar, envie um documento real e confira o resultado.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "A página Runs do Tavnit, que lista cada documento processado com seu Flow, sua origem e seu status.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedPtBR() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Primeiros passos
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="O que o Tavnit faz">
        <Lead>
          O Tavnit lê documentos e devolve dados estruturados. Você descreve uma vez os campos que
          quer, envia notas fiscais, recibos, pedidos de compra, extratos, planilhas ou formulários e
          recebe linhas tipadas — sem montar um modelo para cada layout nem escrever código de
          parsing.
        </Lead>
        <p>
          A extração é o ponto de partida, não o produto inteiro. Em torno dela, o Tavnit pode
          separar e dividir os arquivos que chegam, limpar e enriquecer as linhas, comparar e
          verificar documentos entre si, preencher formulários, pausar para uma pessoa revisar,
          guardar os resultados em tabelas, entregá-los aos seus sistemas e passá-los a um agente de
          navegador que age com eles. Esta página traz o mapa e acompanha você no seu primeiro
          documento.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Algumas áreas estão em Beta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals e Nets levam o selo{" "}
          <strong>Beta</strong> no app. Você já pode usá-los, mas as telas e as opções ainda podem
          mudar.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Um mapa do Tavnit">
        <Lead>
          A barra lateral do app agrupa cada área pela tarefa que ela cumpre, desde receber os
          documentos até agir com os dados. A documentação segue os mesmos grupos, então esta tabela
          também serve de sumário.
        </Lead>
        <DataTable
          head={["Grupo", "Área", "O que faz"]}
          rows={[
            [
              "Entrada",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Uma caixa de entrada ou um endpoint para documentos variados: cada um é classificado e encaminhado ao Flow certo.",
            ],
            [
              "Entrada",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Modele uma entidade, como uma compra ou um paciente, e reúna os documentos dela em casos por referência.",
            ],
            [
              "Entrada",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Corte um arquivo que contém vários documentos em documentos separados e envie cada um adiante.",
            ],
            [
              "Processamento",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "O esquema de um tipo de documento: os campos a extrair e tudo o que está ligado a eles. Tudo começa aqui.",
            ],
            [
              "Processamento",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Reformate, converta, calcule, consulte e valide as linhas extraídas, e dispare ações quando algo parecer errado.",
            ],
            [
              "Processamento",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Agentes de navegador que cumprem uma missão em linguagem natural em um site, muitas vezes usando dados extraídos como entrada.",
            ],
            [
              "Inteligência",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Compare registros linha a linha entre documentos — cotações entre si, uma nota fiscal com o seu pedido.",
            ],
            [
              "Inteligência",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Aplique uma checklist a um conjunto de documentos relacionados e receba um veredito de aprovado ou reprovado.",
            ],
            [
              "Inteligência",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "Preencha modelos de formulário em PDF com dados extraídos dos seus documentos.",
            ],
            [
              "Orquestração",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Encadeie etapas de ponta a ponta em uma tela visual.",
            ],
            [
              "Orquestração",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Mapa de Pipelines</DocLink>
              </Fragment>,
              "Uma visão única de como os documentos circulam pela sua organização.",
            ],
            [
              "Dados e atividade",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Tabelas em que os resultados se acumulam ao longo dos Runs, prontas para consultar, gerar gráficos e exportar.",
            ],
            [
              "Dados e atividade",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "O histórico de cada documento processado, com o resultado, o arquivo de origem e o log.",
            ],
            [
              "Dados e atividade",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Revisão humana</DocLink>
              </Fragment>,
              "Uma fila de revisão em que uma pessoa aprova, edita ou rejeita os resultados antes da entrega.",
            ],
            [
              "Áudio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Transforme conversas gravadas em linhas estruturadas.",
            ],
            [
              "Social",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Transforme publicações de redes sociais em linhas estruturadas e tendências.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Não está vendo Agents, Signals ou Nets?">
          Essas três áreas são ativadas por organização. Se elas não aparecem na sua barra lateral,
          fale com a equipe do Tavnit para ativá-las.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="O que separa os meus documentos?">
          Se cada arquivo contém um documento, mas você não sabe de que tipo, use uma{" "}
          <DocLink href="/docs/collections">Collection</DocLink>. Se um arquivo contém vários
          documentos, use um <DocLink href="/docs/splitters">Splitter</DocLink>. Se os documentos
          pertencem ao mesmo conjunto — a mesma compra, o mesmo paciente —, use um{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Se você já sabe que documento é, envie-o
          direto ao Flow e dispense os três.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="Seus primeiros minutos">
        <Lead>
          Uma organização nova começa com um caminho curto de configuração, então você raramente se
          depara com uma tela vazia.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Perguntas de boas-vindas.</strong> Depois que você cria sua organização, o
              Tavnit faz quatro perguntas rápidas: que documentos você vai processar, o que você quer
              alcançar, como seus documentos chegam hoje e mais ou menos quantos você recebe por mês.
              Elas levam uns 30 segundos, e você pode clicar em <strong>Pular</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Flows iniciais em um clique.</strong> Se você respondeu, a página Flows vazia
              oferece os modelos que correspondem aos seus documentos em{" "}
              <em>“Com base nas suas respostas, podemos configurar isto para você”</em>. Clique em{" "}
              <strong>Criar estes Flows</strong> e eles são criados para você, prontos para editar.
            </Fragment>,
            <Fragment key="o2">
              <strong>Modelos iniciais.</strong> O Tavnit traz Flows prontos para notas fiscais,
              pedidos de compra, recibos, extratos bancários, guias de remessa, resultados de
              laboratório, contratos, cotações, notas de crédito, documentos de identidade e
              currículos. Os modelos que correspondem às suas respostas aparecem primeiro.
            </Fragment>,
            <Fragment key="o3">
              <strong>O guia de primeiros passos.</strong> Um pequeno painel no canto do app com
              três abas: <strong>Checklist</strong> (etapas de configuração que se marcam sozinhas à
              medida que você as conclui), <strong>Esta tela</strong> (dicas para a página em que você
              está) e <strong>Recursos</strong> (todas as áreas disponíveis para você). Se você o
              ocultar, reabra-o pelo menu <strong>Ajuda e suporte</strong>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Passo 1: crie um Flow">
        <Lead>
          Um Flow é o esquema de um tipo de documento. Dê a ele o nome do documento, não do projeto —{" "}
          <em>Notas fiscais de fornecedores</em>, não <em>Automação T1</em> —, porque o nome e a
          descrição também são o que uma Collection usa para encaminhar documentos a ele.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Na página <strong>Flows</strong>, clique em <strong>Criar Flow</strong>.
            </Fragment>,
            <Fragment key="f6">
              Escolha um ponto de partida: <strong>A partir de um modelo</strong> (um modelo do Tavnit
              ou uma cópia de um dos seus próprios Flows em <strong>Meus Flows</strong>),{" "}
              <strong>Sugestão da IA</strong> (envie um PDF ou uma imagem de exemplo e a IA esboça os
              campos) ou <strong>Começar do zero</strong>.
            </Fragment>,
            <Fragment key="f7">
              Dê ao Flow um nome com pelo menos 3 caracteres e uma descrição com pelo menos 10 que
              diga quais documentos ele processa.
            </Fragment>,
            <Fragment key="f8">
              No editor, adicione, edite ou exclua campos até que o esquema seja exatamente o que
              você precisa. Um Flow novo já está <strong>Ativo</strong>.
            </Fragment>,
            <Fragment key="f9">
              Clique em <strong>Executar</strong>, envie um documento real e confira o resultado.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> aborda cada uma dessas etapas em detalhes —
          tipos de campo, tipos de dados, as dicas que dizem à IA onde procurar e o botão{" "}
          <strong>Diagnosticar</strong>, que propõe correções assim que um Flow tem Runs reais.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="A descrição importa">
          A descrição é obrigatória e vale a pena duas vezes: ela ajuda a IA a extrair com mais
          precisão e é o que permite que uma{" "}
          <DocLink href="/docs/collections">Collection</DocLink> encaminhe documentos ao Flow. Uma
          descrição vaga piora as duas coisas.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Passo 2: campos de metadados e campos de tabela">
        <Lead>
          O Tavnit distingue os valores que aparecem uma vez por documento dos valores que se
          repetem. Essa única distinção define o formato de tudo o que vem depois — o payload do seu
          webhook, as linhas do seu Bucket e o seu CSV seguem essa lógica.
        </Lead>
        <DataTable
          head={["Tipo de campo", "Aparece", "Em uma nota fiscal"]}
          rows={[
            [
              "Campo de metadados",
              "Uma vez por documento",
              "Número da nota, data de emissão, fornecedor, total",
            ],
            [
              "Campo de tabela",
              "Uma vez por item de linha",
              "Descrição, quantidade, preço unitário, valor",
            ],
          ]}
        />
        <p>
          Cada campo também tem um tipo de dados — Texto, Número, Data, Misto/Alfanumérico ou
          Imagem —, e acertar esse tipo importa mais do que parece: um total tipado como texto não
          soma, não compara e não vira gráfico. Um Flow só com campos de metadados devolve uma única
          linha por documento. <DocLink href="/docs/flows">Flows</DocLink> aborda o esquema completo,
          incluindo dicas de extração, campos compostos e como corrigir um campo que volta errado.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Passo 3: envie documentos">
        <Lead>
          Quatro formas de entrada, todas gerando o mesmo tipo de Run. Comece com um envio manual
          para comprovar que o Flow funciona e depois passe para a via que corresponde à forma como
          os documentos realmente chegam até você.
        </Lead>
        <DataTable
          head={["Via", "Ideal para", "Configuração"]}
          rows={[
            [
              "Envio pelo app",
              "Testes e documentos avulsos",
              "Nenhuma. Selecione vários arquivos de uma vez e cada um vira um Run próprio",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-mail</DocLink>
              </Fragment>,
              "Documentos que já chegam a uma caixa de entrada",
              "Ative o Gatilho de e-mail do Flow e encaminhe as mensagens para o endereço dele",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
              "Seus próprios sistemas e grandes volumes",
              "Uma chave de API e um POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">Conector MCP</DocLink>
              </Fragment>,
              "Trabalho pontual a partir de um assistente de IA",
              "Ativado por organização mediante solicitação; depois, uma URL de conector em Integrações",
            ],
          ]}
        />
        <p>
          Os Flows aceitam PDFs, imagens (PNG, JPG, JPEG e JFIF) e planilhas (XLSX, XLS e CSV). Em
          uma planilha, o Flow lê a primeira aba visível. Documentos digitalizados são detectados e
          lidos com OCR automaticamente.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="A página Runs do Tavnit listando documentos processados, cada um com seu Flow, quem o acionou, sua origem e seu status, abaixo de indicadores de Runs concluídos, Runs em andamento e total de Runs."
          caption="Cada documento vira um Run. A página Runs mostra o que foi processado, como chegou e como terminou."
        />
        <p>
          Abra qualquer Run para ver os campos extraídos ao lado do documento de origem, além do log
          do que aconteceu durante o processamento. Esse log é o primeiro lugar para olhar quando um
          resultado não é o que você esperava.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Próximos passos">
        <Lead>
          Quando a extração estiver funcionando, o próximo passo depende do que está errado com os
          dados ou do que você precisa fazer com eles.
        </Lead>
        <DataTable
          head={["Se você precisa…", "Leia"]}
          rows={[
            [
              "Extrair mais campos ou corrigir um que volta errado",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "Corrigir formatos, converter moedas, calcular totais ou sinalizar linhas com problema",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "Ter uma pessoa conferindo os resultados antes que sigam adiante",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Revisão humana</DocLink>
              </Fragment>,
            ],
            [
              "Levar os dados para os seus próprios sistemas",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> ou a{" "}
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
            ],
            [
              "Manter os resultados reunidos e consultá-los",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "Comparar documentos ou verificá-los contra uma lista de regras",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> e{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "Conectar várias etapas em um único processo",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "Agir com os dados em outro lugar da web",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "Controlar quem pode ver e alterar o quê",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Funções de usuário</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Monte o esquema de dados de um Flow em detalhes",
            description:
              "Tipos de campo, tipos de dados, dicas de extração, campos compostos, Runs e tudo o que você pode ligar a um Flow.",
          },
          {
            href: "/docs/api-integration",
            label: "Processe documentos com a API REST do Tavnit",
            description:
              "Envio multipart e base64, autenticação por chave de API, exemplos em Python e JavaScript e receitas no-code.",
          },
          {
            href: "/docs/email-integration",
            label: "Extraia dados de anexos de e-mail",
            description: "Dê a um Flow sua própria caixa de entrada e encaminhe documentos para ela.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Veja como tudo se conecta",
            description:
              "Um mapa ao vivo dos seus Flows, Collections, Splitters, Cleaners e Buckets.",
          },
        ]}
      />
    </section>
  );
}
