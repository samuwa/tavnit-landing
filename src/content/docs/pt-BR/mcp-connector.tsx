import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /pt-br/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "Conecte o claude.ai". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Conecte o Tavnit ao claude.ai com o conector MCP",
    description:
      "Gere uma URL de conector do Tavnit na página Integrações e adicione-a ao claude.ai como conector personalizado, para que o seu assistente possa trabalhar com os seus dados do Tavnit.",
    steps: [
      {
        name: "Abra Integrações no Tavnit",
        text: "Entre no app do Tavnit e abra Integrações na barra lateral. Confira se você está na organização cujos dados o assistente deve acessar.",
      },
      {
        name: "Gere a URL do conector",
        text: "No cartão Conector personalizado, selecione Gerar URL do conector. O Tavnit emite a URL a partir da sua chave de API e mostra quando ela foi criada e quando expira.",
      },
      {
        name: "Copie a URL",
        text: "Copie a URL do conector com o botão de copiar. Trate-a como uma senha.",
      },
      {
        name: "Adicione-a como conector personalizado no claude.ai",
        text: "No claude.ai, vá em Settings, depois em Connectors, depois em Add custom connector, e cole a URL. Conectores personalizados exigem um plano Claude Pro ou superior.",
      },
      {
        name: "Confirme a conexão",
        text: "Inicie um novo chat e pergunte ao assistente quais ferramentas do Tavnit ele tem. Se ele as listar, o conector está ativo.",
      },
    ],
  },
};

export default function McpConnectorPtBr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Conector MCP
      </h1>

      <DocCard icon={<Plug size={24} />} title="O que o conector MCP faz">
        <Lead>
          O conector MCP adiciona a sua organização do Tavnit como uma ferramenta dentro de um
          assistente de IA. Depois de conectado, você pode perguntar ao assistente sobre os seus dados
          do Tavnit em linguagem natural, e ele responde a partir da sua conta em tempo real, em vez
          de adivinhar.
        </Lead>
        <p>
          MCP (Model Context Protocol) é o padrão aberto que permite que assistentes de IA chamem
          ferramentas externas. O Tavnit mantém um servidor MCP em <InlineCode>mcp.tavnit.io</InlineCode>,
          e a URL do conector é a credencial que aponta um cliente para a sua organização. Ele
          funciona com o <strong>claude.ai</strong> (Pro ou superior), o <strong>Cursor</strong> e
          qualquer outro cliente que aceite a URL de um servidor MCP remoto.
        </p>
        <p>
          Para saber para que serve o conector e como ele se compara a colar um arquivo em um chat,
          veja a{" "}
          <Link href={localizedPath("/integrations/mcp", "pt-BR")} className="text-accent hover:underline">
            visão geral do conector MCP
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Ativado mediante solicitação">
          O conector é ativado por organização. Se você não vê o cartão Conector personalizado na
          página Integrações, fale com o suporte para ativá-lo na sua organização.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Antes de começar">
        <Lead>
          Você precisa de três coisas: uma organização com o conector ativado, a sua chave de API e
          um cliente MCP. O conector é emitido a partir da sua própria chave, então ele só acessa a
          organização em que você estava quando o gerou, e o assistente age com essa chave.
        </Lead>
        <DataTable
          head={["Requisito", "De onde vem"]}
          rows={[
            [
              "Cartão Conector personalizado",
              <Fragment key="f0">
                Na página <strong>Integrações</strong>, somente quando o conector está ativado para a
                sua organização. Peça ao suporte se ele não aparecer.
              </Fragment>,
            ],
            [
              "A sua chave de API",
              <Fragment key="f1">
                O cartão <strong>Chave de API</strong> na mesma página: uma chave por membro por
                organização. Se ele mostrar <em>No API key found. Please log in again.</em>, saia e
                entre novamente.
              </Fragment>,
            ],
            [
              "Um cliente MCP",
              <Fragment key="f2">
                O claude.ai em um plano Pro ou superior, o Cursor ou qualquer cliente que aceite a URL
                de um servidor MCP remoto.
              </Fragment>,
            ],
            [
              "A sua função",
              <Fragment key="f3">
                O assistente usa a sua chave de API, então só pode fazer o que a sua chave pode
                fazer. Por exemplo, uma chave da função <strong>Somente HITL</strong> é recusada nas
                requisições de processamento. Veja{" "}
                <DocLink href="/docs/user-roles">funções de usuário</DocLink> e{" "}
                <DocLink href="/docs/api-integration">a página da API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Conecte o claude.ai">
        <Lead>
          Gere a URL no Tavnit e cole-a no claude.ai como conector personalizado. Não há nada para
          instalar nem arquivo de configuração para editar.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Abra <strong>Integrações</strong> na barra lateral do Tavnit. Confira primeiro o
              seletor de organização: o conector fica vinculado à organização em que você estiver.
            </Fragment>,
            <Fragment key="f5">
              No cartão <strong>Conector personalizado</strong>, selecione{" "}
              <strong>Gerar URL do conector</strong>.
            </Fragment>,
            <Fragment key="f6">Copie a URL com o botão de copiar.</Fragment>,
            <Fragment key="f7">
              No claude.ai, vá em <strong>Settings → Connectors → Add custom connector</strong> e
              cole a URL.
            </Fragment>,
            <Fragment key="f8">
              Abra um novo chat e pergunte ao assistente quais ferramentas do Tavnit ele tem. Se ele
              as listar, o conector está ativo.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Conecte o Cursor ou outro cliente MCP">
        <Lead>
          Qualquer cliente que suporte servidores MCP remotos aceita a mesma URL. Adicione-a como um
          servidor remoto (por URL), não como um servidor baseado em comando: não há processo local
          para executar, porque o conector aponta para um servidor hospedado.
        </Lead>
        <NumberedList
          items={[
            "Gere e copie a URL do conector na página Integrações, como acima.",
            <Fragment key="f9">
              No Cursor, abra as configurações de MCP e adicione um novo servidor do tipo{" "}
              <strong>remote</strong> / URL.
            </Fragment>,
            <Fragment key="f10">
              Cole a URL do conector como URL do servidor. Não é preciso um campo separado para a
              chave de API: a URL já carrega a credencial.
            </Fragment>,
            "Recarregue o cliente e confira se o Tavnit aparece na lista de ferramentas.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Uma URL, vários clientes">
          Você tem uma URL de conector por vez e pode colá-la em mais de um cliente. Todos agem como
          você na mesma organização, então uma atualização desconecta todos eles de uma só vez.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="O que o seu assistente pode fazer">
        <Lead>
          Pelo conector, o assistente trabalha com os dados do Tavnit da sua organização usando a sua
          chave de API. Criar e configurar flows, Cleaners, pipelines e a sua equipe continua sendo
          feito no app.
        </Lead>
        <p>
          As ferramentas que o conector oferece são listadas pelo seu cliente MCP, e a forma mais
          rápida de vê-las é perguntar ao assistente. Pergunte em linguagem natural e diga o nome do
          flow, Bucket ou run a que você se refere, do jeito que aparece no app.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Os seus dados, a sua organização">
          O conector só acessa a organização em que foi gerado. Para trabalhar com outra
          organização, mude para ela no Tavnit e gere uma URL lá. O trabalho iniciado pelo
          assistente segue a sua configuração como qualquer outro run: se um flow pede{" "}
          <DocLink href="/docs/human-in-the-loop">revisão humana</DocLink>, o run continua esperando
          por ela.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Expiração e atualização">
        <Lead>
          As URLs de conector têm validade limitada. O cartão Conector personalizado mostra quando a
          URL foi criada e quanto tempo ainda resta, e avisa você nas últimas 24 horas. Atualizar
          emite uma nova URL e invalida a antiga imediatamente.
        </Lead>
        <DataTable
          head={["Estado", "O que você vê", "O que fazer"]}
          rows={[
            [
              "Ativa",
              <Fragment key="s0">A URL, a data de criação e os dias que faltam para expirar.</Fragment>,
              "Nada.",
            ],
            [
              "Expira em breve (menos de 24 horas)",
              <Fragment key="f16">
                O tempo restante em horas ou minutos e um aviso âmbar:{" "}
                <em>O conector expira em breve — atualize agora para evitar interrupções.</em>
              </Fragment>,
              "Atualize e cole a nova URL em todos os clientes que a usam.",
            ],
            [
              "Expirada",
              <Fragment key="f17">
                Um aviso vermelho:{" "}
                <em>Este conector expirou. Atualize para gerar uma nova URL.</em>
              </Fragment>,
              "Atualize e cole de novo. Os clientes com a URL antiga já pararam de funcionar.",
            ],
          ]}
        />
        <p>
          Para atualizar, selecione <strong>Atualizar URL</strong> e confirme com{" "}
          <strong>Atualizar</strong> na caixa de diálogo <em>Atualizar a URL do conector?</em>.
        </p>
        <WarningBox>
          Atualizar não é uma rotação que você possa fazer por etapas. No momento em que você
          confirma, a URL anterior para de funcionar e todo assistente que a usa falha até você colar
          a nova. Atualize quando puder atualizar os clientes logo em seguida.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Trate a URL como uma senha">
        <Lead>
          A URL do conector é uma credencial. Qualquer pessoa que a tenha pode acessar os dados da sua
          organização como se fosse você, sem fazer login. É seguro colá-la nas configurações de um
          cliente MCP; não é seguro compartilhá-la em um chamado, em uma mensagem de chat ou em uma
          captura de tela.
        </Lead>
        <BulletList
          items={[
            "Não faça commit dela em um repositório nem a cole em um documento compartilhado.",
            "Desfoque-a ou corte-a de qualquer captura de tela antes de compartilhar.",
            "Se ela vazar, atualize-a imediatamente: isso invalida a URL exposta na hora.",
            "Gerar uma nova chave de API é uma ação separada na mesma página; faça isso também se achar que a própria chave foi exposta.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Solução de problemas">
        <Lead>
          A maioria dos problemas com o conector se resume a uma de quatro coisas: o recurso não está
          ativado, a sessão expirou, a URL expirou ou o cliente está usando uma URL que foi
          substituída por uma atualização.
        </Lead>
        <DataTable
          head={["Sintoma", "Causa", "Solução"]}
          rows={[
            [
              "Não há cartão Conector personalizado em Integrações",
              "O conector não está ativado para a sua organização.",
              "Fale com o suporte para ativá-lo.",
            ],
            [
              <Fragment key="f18"><InlineCode>Conectores personalizados exigem uma sessão válida do Tavnit. Tente sair e entrar novamente.</InlineCode></Fragment>,
              "O Tavnit não conseguiu validar a sua chave para emitir ou ler a URL.",
              "Saia e entre novamente e depois gere a URL outra vez.",
            ],
            [
              "O assistente deixou de ver o Tavnit",
              "A URL expirou, ou alguém a atualizou.",
              "Procure no cartão um aviso de expirada ou de expiração próxima, atualize e cole de novo em todos os clientes.",
            ],
            [
              "O assistente vê os dados errados",
              "A URL foi gerada enquanto você estava em outra organização.",
              "Mude de organização no Tavnit, gere uma URL nova e substitua a antiga.",
            ],
            [
              "O assistente não consegue executar uma ação",
              "A sua função não permite.",
              "Verifique a sua função antes de supor uma falha do conector.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Quando usar o conector em vez da API">
        <Lead>
          Use o conector para trabalhos conversacionais e pontuais: perguntas avulsas, explorar
          dados armazenados, verificações rápidas. Use a REST API para tudo o que for agendado, de
          alto volume ou embutido em outro sistema, quando você precisa de tratamento explícito de
          erros e de novas tentativas.
        </Lead>
        <DataTable
          head={["Situação", "Use"]}
          rows={[
            ["Um colega pergunta quanto um fornecedor faturou no último trimestre", "Conector MCP"],
            ["Você quer explorar os seus dados em um chat", "Conector MCP"],
            ["Todas as faturas de um portal de fornecedores, toda noite", "REST API ou um gatilho por e-mail"],
            ["O seu próprio produto precisa dos dados extraídos", "REST API mais webhooks"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Referência da REST API do Tavnit",
            description:
              "Todos os endpoints, com autenticação por chave de API, campos das requisições, respostas e exemplos em Python e JavaScript.",
          },
          {
            href: "/docs/buckets",
            label: "Armazene os dados extraídos em Buckets",
            description: "As tabelas estruturadas onde ficam os seus dados extraídos.",
          },
          {
            href: "/docs/user-roles",
            label: "Funções de usuário e permissões",
            description: "O que Proprietário, Administrador, Membro e Somente HITL podem fazer.",
          },
        ]}
      />
    </section>
  );
}
