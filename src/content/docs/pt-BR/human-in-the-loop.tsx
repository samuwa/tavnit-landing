import { Fragment } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/**
 * /pt-BR/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "Revisão humana" in Brazilian Portuguese; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Ative a revisão em um Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Adicionar uma etapa de revisão humana a um Flow do Tavnit",
    description:
      "Ative a revisão humana em um Flow e atribua revisores para que cada Run pause à espera de aprovação antes que seus resultados sejam entregues adiante.",
    steps: [
      {
        name: "Abra o painel Revisão humana do Flow",
        text: "Vá até Flows no app do Tavnit, abra o Flow e selecione o painel Revisão humana na barra lateral dele.",
      },
      {
        name: "Ative a revisão",
        text: "Ative a revisão humana. A partir desse momento, os novos Runs do Flow pausam em vez de entregar seus resultados.",
      },
      {
        name: "Atribua revisores",
        text: "Em Revisores, escolha um ou mais membros da sua organização. Só os revisores atribuídos podem aprovar ou rejeitar os Runs pausados do Flow.",
      },
      {
        name: "Processe um documento e confira a fila",
        text: "Processe um documento. Ele deve aparecer como Aguardando revisão na fila Revisão humana de cada revisor atribuído.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "A tela de revisão humana do Tavnit: uma grade de dados editável ao lado do documento de origem, com as ações Aprovar e Rejeitar.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopPtBR() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Revisão humana (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="O que a revisão humana faz">
        <Lead>
          A revisão humana coloca um ponto de verificação entre a extração e a entrega. Um Run que
          precisa de revisão para depois da extração e da limpeza com o status{" "}
          <strong>Aguardando aprovação</strong>: nenhum e-mail é enviado, nenhum webhook dispara,
          nenhuma linha de Bucket é gravada e nenhum Agent vinculado começa até que um revisor
          designado o aprove.
        </Lead>
        <p>
          A palavra importante é <em>antes</em>. A revisão não é uma correção que você aplica depois
          que dados ruins já chegaram ao seu ERP; a etapa de entrega ainda não foi executada. Quando o
          revisor aprova, o Run retoma exatamente de onde parou, levando as edições dele.
        </p>
        <BulletList
          items={[
            "Dados de alto valor que precisam ser verificados antes de seguir adiante",
            "Uma exigência de compliance de ter uma etapa de aprovação manual documentada",
            "Documentos em que a extração costuma acertar, mas em que um erro ocasional sai caro",
            "Valores que só uma pessoa pode informar, como um centro de custo interno ou um código de aprovação",
            "Fornecedores novos ou formatos novos, até você confiar no Flow",
          ]}
        />
        <p>
          Os Runs de Flow são o caso principal, mas a mesma fila também reúne{" "}
          <DocLink href="/docs/matchers">correspondências</DocLink>,{" "}
          <DocLink href="/docs/inspectors">inspeções</DocLink> e{" "}
          <DocLink href="/docs/fillers">preenchimentos</DocLink> pausados. Veja{" "}
          <em>Outros itens que aguardam revisão</em> abaixo.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Três formas de pausar um Run de Flow">
        <Lead>
          O interruptor no nível do Flow é uma das formas de enviar Runs para revisão, não a única.
          Um <DocLink href="/docs/cleaners">Cleaner</DocLink> ligado ao Flow pode pausar Runs por
          conta própria, mesmo com o interruptor desligado. Quando vários gatilhos se aplicam ao
          mesmo Run, as listas de revisores são combinadas.
        </Lead>
        <DataTable
          head={["Gatilho", "O que pausa", "Ideal para"]}
          rows={[
            [
              "Configuração do Flow (painel Revisão humana)",
              "Todos os Runs do Flow, independentemente do que foi extraído.",
              "Um tipo de documento que sempre precisa de aprovação, ou um Flow que você acabou de montar e em que ainda não confia.",
            ],
            [
              "Regra de Ações condicionais do Cleaner com a ação Revisão humana",
              "Só os Runs em que uma linha correspondeu à regra, por exemplo um total acima de um limite ou um identificador fiscal ausente.",
              "Grandes volumes em que a maioria dos Runs está certa e você só quer olhar as exceções.",
            ],
            [
              "Campo de Entrada humana do Cleaner",
              "Todo Run que passa pelo Cleaner, porque uma pessoa precisa digitar ou escolher o valor.",
              "Dados que nem estão no documento e precisam ser acrescentados por alguém.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Você não precisa revisar tudo">
          Revisar todos os Runs anula o propósito de automatizar a extração. A via condicional
          costuma ser a certa: no Cleaner, adicione um campo de Ações condicionais, dê a ele uma
          condição como <em>total &gt; 10.000</em>, adicione a ação Revisão humana e escolha os
          revisores. Só os Runs que correspondem param. O interruptor do Flow pode ficar desligado.
        </InfoBox>
        <p>
          Quando uma regra do Cleaner dispara a pausa, o Tavnit registra quais linhas e quais campos
          corresponderam. A tela de revisão destaca exatamente essas células, então o revisor começa
          pelo motivo da retenção do Run, em vez de ler a tabela inteira. Se a regra for alimentada
          por um campo de Verificação de anomalias, o revisor também vê por que cada valor foi
          sinalizado.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Ative a revisão em um Flow">
        <Lead>
          O interruptor do Flow fica nas configurações do próprio Flow. Só um Owner ou um Admin pode
          alterá-lo. Os revisores são escolhidos entre os membros da sua organização.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Abra o Flow e selecione o painel <strong>Revisão humana</strong> na barra lateral dele.
            </Fragment>,
            <Fragment key="f1">Ative a revisão.</Fragment>,
            <Fragment key="f2">
              Em <strong>Revisores</strong>, escolha um ou mais membros da sua organização.
            </Fragment>,
            <Fragment key="f3">
              Processe um documento e confirme que ele aparece como{" "}
              <strong>Aguardando revisão</strong> na fila <strong>Revisão humana</strong> dos
              revisores.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Com a revisão ativada e nenhum revisor atribuído, o painel avisa{" "}
          <em>&ldquo;Nenhum revisor selecionado — as aprovações não chegarão a ninguém.&rdquo;</em>{" "}
          Nesse caso, os Runs pausados ficam sem ninguém que possa aprová-los. Atribua pelo menos um
          revisor antes de enviar documentos.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Com um Cleaner ligado, os revisores veem os dados limpos"
        >
          Quando o Flow tem um Cleaner, a pausa acontece depois da limpeza, então a tabela em
          revisão é a saída limpa, com moedas convertidas, datas reformatadas e colunas calculadas.
          É isso que será entregue, então é isso que deve ser conferido.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Campos de Entrada humana">
        <Lead>
          Um campo de Entrada humana é uma coluna do Cleaner que nunca é extraída: um revisor a
          preenche na tela de revisão. Use-o para um centro de custo, uma conta contábil, um código
          de aprovação interno ou qualquer outra coisa que o documento não informe.
        </Lead>
        <DataTable
          head={["Opção", "O que faz"]}
          rows={[
            ["Texto livre", "O revisor digita o valor."],
            [
              "Menu",
              "O revisor escolhe entre os valores distintos de uma coluna de Bucket (Bucket de opções e Coluna de opções), opcionalmente filtrados por condições, inclusive condições sobre os campos da linha atual.",
            ],
            [
              "Valor obrigatório",
              "A aprovação fica bloqueada até que todas as linhas tenham um valor. Desative para permitir valores em branco.",
            ],
            ["Revisores", "Quem pode preencher o campo e aprovar; combinados com os revisores do Flow."],
          ]}
        />
        <p>
          Todo Run que passa por um Cleaner com um campo de Entrada humana pausa para revisão, com o
          interruptor do Flow ligado ou não. Na tela de revisão, a coluna aparece marcada como{" "}
          <strong>Requer entrada humana</strong>, com a contagem de linhas preenchidas, e Aprovar
          fica bloqueado (
          <em>&ldquo;Preencha todos os valores obrigatórios de entrada humana para aprovar&rdquo;</em>
          ) até que todos os valores obrigatórios estejam preenchidos.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="A fila de revisão">
        <Lead>
          A página <strong>Revisão humana</strong> na barra lateral lista tudo o que está esperando
          por você, do mais recente ao mais antigo. Ela mostra só os itens em que você é revisor; os
          revisores não veem as filas uns dos outros.
        </Lead>
        <BulletList
          items={[
            "Indicadores de resumo no topo: Aguardando revisão, Pendente mais antigo, Sua função e Flows com HITL",
            "Um cartão por item: o nome do arquivo e o Flow, no caso de um Run, com um selo Correspondência ou Preenchimento para esses tipos, e o status Aguardando revisão",
            "Um ponto vermelho no ícone da barra lateral sempre que algo espera por você. Ele se atualiza em tempo real, sem recarregar a página",
            "Os revisores atribuídos também recebem um e-mail com um link direto no momento em que um Run, uma correspondência, uma inspeção ou um preenchimento precisa deles",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Revisando um Run">
        <Lead>
          A tela de revisão é dividida: a tabela extraída à esquerda, o documento original à
          direita. Você confere um valor com a origem sem sair da página, corrige-o ali mesmo e
          aprova. O divisor pode ser arrastado e, no celular, você alterna entre os dois painéis.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="A tela de revisão do Tavnit para um Run aguardando revisão: uma grade de dados editável à esquerda com as colunas Subtotal, Amount e Weight e caixas de seleção por linha, a nota fiscal de origem exibida à direita e os botões Rejeitar e Aprovar no cabeçalho."
          caption="Um Run aguardando revisão. A grade à esquerda é a saída limpa que será entregue; o documento de origem fica ao lado para conferência."
        />
        <DataTable
          head={["Na grade de dados você pode", "Como"]}
          rows={[
            ["Editar um valor", "Clique duas vezes na célula e digite."],
            [
              "Alterar várias células de uma vez",
              "Selecione arrastando, com Shift+clique ou clicando no cabeçalho de uma coluna e depois use Aplicar à seleção.",
            ],
            ["Tirar uma linha da saída", "Desmarque-a. As linhas excluídas não são entregues."],
            [
              "Adicionar ou remover uma coluna",
              "Use Adicionar coluna ou Remover coluna. Uma coluna removida pode ser restaurada antes de você aprovar.",
            ],
            ["Ver o que disparou a pausa", "As células que uma regra do Cleaner encontrou ficam destacadas."],
            ["Preencher campos de Entrada humana", "Digite o valor ou escolha-o no menu."],
            ["Ver o que você mudou", "As células editadas continuam destacadas até você aprovar."],
          ]}
        />
        <BulletList
          items={[
            "O painel do documento mostra PDFs com navegação por páginas e também arquivos de imagem; planilhas podem ser baixadas",
            "Ajustar à largura, Ajustar à altura e zoom manual; arraste para mover",
            "Ctrl/Cmd + e − para zoom, Ctrl/Cmd + 0 para redefinir",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Aprovando e rejeitando">
        <Lead>
          Aprovar incorpora suas edições ao Run e o libera para as etapas seguintes. Rejeitar cancela
          o Run e não entrega nada. As duas decisões são definitivas para aquele Run: a pausa é uma
          barreira única, não um estado que você pode alternar de um lado para o outro.
        </Lead>
        <DataTable
          head={["Decisão", "O que acontece com o Run", "O que é entregue"]}
          rows={[
            [
              "Aprovar",
              "Sua tabela editada substitui a saída extraída e o Run segue até Concluído, com o selo Aprovado no HITL.",
              <Fragment key="f4">
                Tudo o que o Flow está configurado para fazer: saída por e-mail, webhook, exportação
                para <DocLink href="/docs/buckets">Bucket</DocLink>, preenchimento de formulários e um{" "}
                <DocLink href="/docs/agents">Agent</DocLink> vinculado, tudo com os dados aprovados.
              </Fragment>,
            ],
            [
              "Rejeitar",
              "O Run passa a Cancelado, com o selo Rejeitado no HITL, e o seu motivo (opcional, mas recomendado) fica registrado.",
              "Nada. Nenhum e-mail, nenhum webhook, nenhuma linha de Bucket, nenhum Run de Agent.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="A primeira decisão vale">
          Não é preciso que todos os revisores atribuídos aprovem. A primeira aprovação ou rejeição
          resolve o Run; se um segundo revisor estava com ele aberto, a decisão dele é recusada porque
          o Run já não está aguardando aprovação. Atualize a fila para ver o estado atual.
        </InfoBox>
        <p>
          A página do Run mostra quem decidiu (<strong>Aprovado por</strong> ou{" "}
          <strong>Rejeitado por</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Outros itens que aguardam revisão">
        <Lead>
          Matchers, Inspectors e Fillers têm as próprias configurações de revisão, e os itens
          pausados deles caem na mesma fila, com a mesma regra de que a primeira decisão vale e a
          mesma trilha de auditoria.
        </Lead>
        <DataTable
          head={["Item", "Quando pausa", "O que o revisor faz"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Correspondência</DocLink>,
              "Quando a revisão humana está ativada no Matcher: toda correspondência.",
              "Confere e corrige o pareamento de linhas entre documentos feito pela IA, pode excluir linhas e depois aprova ou rejeita.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Inspeção</DocLink>,
              "Quando a revisão humana está ativada no Inspector, ou quando uma verificação reprovada solicita revisão pelas suas ações em caso de falha.",
              "Dispensa verificações reprovadas com uma justificativa e depois aprova para finalizar o veredito, ou rejeita para cancelar a inspeção.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Preenchimento</DocLink>,
              "Quando a revisão humana está ativada no Filler, ou sempre que ele tem campos de Preenchimento humano mapeados.",
              "Revisa os formulários preenchidos, digita os valores de Preenchimento humano e depois aprova para liberar os formulários, ou rejeita.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Quem pode revisar">
        <Lead>
          Só as pessoas atribuídas como revisoras podem aprovar ou rejeitar um Run de Flow. Ser Admin
          não basta por si só: um Admin que não está na lista de revisores não recebe o Run na sua
          fila e não pode aprová-lo.
        </Lead>
        <BulletList
          items={[
            "As listas de revisores do Flow são gerenciadas por um Owner ou um Admin",
            "A ação Revisão humana de um Cleaner e cada campo de Entrada humana têm os próprios revisores, combinados com os do Flow",
            "Qualquer membro pode ser revisor, seja qual for a sua função",
            "A função Somente HITL foi feita para revisores: esses membros veem só a fila Revisão humana e podem revisar, mas não podem executar nem alterar mais nada",
          ]}
        />
        <p>
          Veja <DocLink href="/docs/user-roles">funções de usuário e permissões</DocLink> para saber
          o que cada função pode alterar.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="A trilha de auditoria somente de inclusão">
        <Lead>
          Cada ação de revisão é gravada em um log permanente, somente de inclusão, com data e hora e
          a identidade do revisor. As entradas não podem ser editadas nem excluídas, então o registro
          de quem mudou o quê, e de como os dados estavam antes de alguém mexer neles, sobrevive à
          revisão.
        </Lead>
        <DataTable
          head={["Evento registrado", "Quando é gravado"]}
          rows={[
            ["Revisores notificados", "O Run entra na fila de revisão e os revisores recebem um e-mail."],
            ["Célula editada", "Um valor é alterado, com o valor antigo e o novo."],
            ["Linha adicionada / linha removida", "O revisor adiciona uma linha ou exclui uma."],
            ["Coluna adicionada / coluna removida", "O revisor muda o formato da tabela."],
            ["Aprovado", "A decisão, o revisor e quantas edições foram feitas."],
            ["Rejeitado", "A decisão, o revisor e o motivo informado."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Os dados anteriores à revisão também são guardados">
          O Tavnit armazena a saída como estava antes de o revisor mexer nela, junto com a versão
          aprovada. Um auditor pode comparar a extração com o resultado entregue sem precisar
          reconstruí-la a partir do log de eventos.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Solução de problemas">
        <DataTable
          head={["Sintoma", "Causa provável e solução"]}
          rows={[
            [
              "Os Runs pausam mesmo com o interruptor do Flow desligado",
              "O Cleaner do Flow tem uma regra de Ações condicionais com a ação Revisão humana, ou um campo de Entrada humana.",
            ],
            [
              "Um Run está Aguardando aprovação, mas não aparece na minha fila",
              "Você não está na lista de revisores dele. Peça a um Owner ou Admin para adicionar você ao Flow (ou à regra do Cleaner que o pausou).",
            ],
            [
              "Aprovar é recusado porque você não é um revisor configurado",
              "Só os revisores atribuídos podem decidir. Se nenhum revisor foi atribuído, adicione um no Flow; ninguém mais pode liberar o Run.",
            ],
            [
              "Aprovar é recusado porque o Run não está aguardando aprovação",
              "Outro revisor decidiu primeiro. Atualize a fila.",
            ],
            [
              "Aprovar fica bloqueado por falta de entrada humana",
              "Um campo de Entrada humana obrigatório ainda está vazio em algumas linhas. Preencha-as ou torne o campo opcional no Cleaner.",
            ],
            [
              "O Agent vinculado não foi executado",
              "Ele só é executado após a aprovação. Um Run rejeitado nunca o inicia.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="A revisão leva tempo">
          Um Run pausado espera o tempo que for preciso. Se os resultados alimentam um processo com
          prazo, garanta que os revisores acompanhem a fila ou o e-mail, ou restrinja a pausa às
          exceções com uma regra do Cleaner.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Dispare a revisão de forma condicional com um Cleaner",
            description:
              "As Ações condicionais pausam só os Runs que violam uma regra; os campos de Entrada humana coletam valores de um revisor.",
          },
          {
            href: "/docs/user-roles",
            label: "Funções de usuário e permissões",
            description: "Quem pode atribuir revisores e o que a função Somente HITL pode fazer.",
          },
          {
            href: "/docs/agents",
            label: "Aja com os dados aprovados usando Agents",
            description: "Um Agent vinculado só começa depois que o revisor aprova.",
          },
          {
            href: "/docs/webhooks",
            label: "Entregue os resultados aprovados com webhooks",
            description: "O que dispara quando um revisor aprova e o que nunca dispara se ele rejeitar.",
          },
          {
            href: "/docs/buckets",
            label: "Guarde os dados aprovados em Buckets",
            description: "As tabelas estruturadas que só recebem linhas aprovadas por um revisor.",
          },
        ]}
      />
    </section>
  );
}
