import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
import type { DocsPageSchemaData } from "../types";

/** /pt-br/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "Ative o gatilho por e-mail". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Extraia dados de anexos de e-mail com um gatilho por e-mail do Tavnit",
    description:
      "Ative o gatilho por e-mail de um flow do Tavnit para obter um endereço de caixa de entrada exclusivo e, em seguida, encaminhe documentos para ele. Cada anexo suportado vira um run de extração próprio.",
    steps: [
      {
        name: "Abra o flow",
        text: "Vá até Flows no app do Tavnit e abra o flow que deve receber documentos.",
      },
      {
        name: "Ative o gatilho por e-mail",
        text: "Abra o painel Gatilho por e-mail na página de detalhes do flow e ative-o. O Endereço da caixa de entrada do flow aparece.",
      },
      {
        name: "Copie o endereço",
        text: "Clique em Copiar ao lado do Endereço da caixa de entrada. Se quiser, adicione Remetentes permitidos ou ative Processar corpo do e-mail no mesmo painel.",
      },
      {
        name: "Envie um documento de teste",
        text: "Envie um único PDF por e-mail para o endereço e acompanhe a página Runs. Um novo run aparece com a origem E-mail.",
      },
      {
        name: "Automatize o encaminhamento",
        text: "Quando o teste funcionar, crie uma regra no seu cliente de e-mail ou na caixa compartilhada que encaminhe automaticamente as mensagens correspondentes para o endereço.",
      },
    ],
  },
};

export default function EmailIntegrationPtBr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integração por e-mail
      </h1>

      <DocCard icon={<Mail size={24} />} title="Como funciona o processamento de e-mails">
        <Lead>
          Cada flow do Tavnit pode ter o seu próprio endereço de caixa de entrada. Quando você ativa o
          gatilho por e-mail e envia um documento para esse endereço, o Tavnit pega cada anexo
          suportado, cria um run de extração separado para ele e o processa exatamente como se você
          o tivesse enviado pelo app.
        </Lead>
        <p>
          Nada é instalado e nada fica consultando a sua caixa de correio: você encaminha os e-mails
          para o endereço e o Tavnit reage. Esse é o caminho mais curto de “as faturas chegam por
          e-mail” para “as faturas chegam como linhas estruturadas”, sem nenhum código. Collections,
          Splitters, Pipelines, Matchers e Subjects também têm os seus próprios endereços.
        </p>
        <BulletList
          items={[
            "Encaminhar faturas ou recibos direto da sua caixa de entrada",
            "Uma caixa compartilhada de contas a pagar com uma regra de encaminhamento automático",
            "Deixar que fornecedores enviem documentos sem precisar dar a eles um login no Tavnit",
            "Extrair dados que chegam na própria mensagem, como confirmações de pedido sem anexo",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="Ative o gatilho por e-mail">
        <Lead>
          O gatilho vem desativado. Ative-o na página de detalhes do flow, copie o endereço que ele
          fornece e envie um documento como teste antes de apontar uma regra de encaminhamento para
          ele.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Vá até <strong>Flows</strong> e abra o flow que deve receber documentos.
            </Fragment>,
            <Fragment key="f1">
              Abra o painel <strong>Gatilho por e-mail</strong> e ative-o. O{" "}
              <strong>Endereço da caixa de entrada</strong> do flow aparece.
            </Fragment>,
            <Fragment key="f2">
              Clique em <strong>Copiar</strong> ao lado do endereço. No mesmo painel, você pode
              adicionar <strong>Remetentes permitidos</strong> ou ativar{" "}
              <strong>Processar corpo do e-mail</strong> (ambos explicados abaixo).
            </Fragment>,
            <Fragment key="f3">
              Envie um PDF para o endereço e confira a página <strong>Runs</strong>. Um novo run
              aparece com a origem <strong>E-mail</strong>, e o endereço do remetente fica registrado
              no run.
            </Fragment>,
            "Quando isso funcionar, crie a regra de encaminhamento no seu cliente de e-mail ou na caixa compartilhada.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Um run por anexo">
          Um e-mail com três faturas anexadas gera três runs separados, cada um com o seu próprio
          resultado e a sua própria linha na lista de Runs. Ele não gera um único run com três
          documentos.
        </InfoBox>
        <WarningBox>
          E-mails enviados para um endereço cujo gatilho está desativado (ou para uma Collection
          inativa) são aceitos e descartados: o remetente não recebe devolução nem erro. Se
          documentos parecerem sumir, verifique primeiro a chave de ativação.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Remetentes permitidos">
        <Lead>
          Por padrão, qualquer remetente pode iniciar um run enviando um e-mail para o endereço.
          Adicione endereços em <strong>Remetentes permitidos</strong> no painel Gatilho por e-mail e
          só esses remetentes serão aceitos; e-mails de qualquer outra pessoa são descartados
          silenciosamente.
        </Lead>
        <BulletList
          items={[
            "As entradas são endereços de e-mail completos, não domínios. A comparação ignora maiúsculas e minúsculas e os nomes de exibição.",
            "Deixe a lista vazia para aceitar e-mails de qualquer remetente.",
            "A lista está disponível no gatilho por e-mail de flows, Collections, Splitters, Pipelines, Matchers e Subjects.",
            <Fragment key="f4">
              Quando você encaminha por uma caixa compartilhada, o remetente que o Tavnit vê
              normalmente é a caixa que faz o encaminhamento, então é esse o endereço a permitir.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="Processe o corpo do e-mail">
        <Lead>
          Alguns dados nunca chegam como anexo: uma confirmação de pedido, um aviso de reserva, um
          fornecedor que escreve as quantidades na mensagem. Ative{" "}
          <strong>Processar corpo do e-mail</strong> e o Tavnit converte o corpo da mensagem em PDF e
          o processa como qualquer outro documento. Está disponível em flows e Collections.
        </Lead>
        <DataTable
          head={["Modo", "O que acontece"]}
          rows={[
            [
              <Fragment key="f5"><strong>Somente quando não houver anexos</strong> (padrão)</Fragment>,
              "O corpo só é processado quando o e-mail não tem nenhum documento anexado. Uma nota de apresentação do tipo “segue em anexo” junto a uma fatura é ignorada, para que um e-mail nunca inicie dois runs.",
            ],
            [
              <Fragment key="f6"><strong>Sempre</strong></Fragment>,
              "O corpo é processado junto com cada anexo, cada um em seu próprio run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "O PDF do corpo aparece na revisão como qualquer outro documento, e o run é marcado como vindo do corpo do e-mail.",
            "Cadeias de respostas citadas e assinaturas são removidas quando o provedor de e-mail consegue identificá-las.",
            "Imagens dentro da mensagem não são lidas. Imagens embutidas na assinatura não contam como anexos na hora de decidir se o corpo deve ser processado.",
            "Um corpo quase sem texto (“ok”, “obrigado”, um encaminhamento vazio) não é processado.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Quais recursos têm um endereço de e-mail">
        <Lead>
          O gatilho por e-mail não se limita a flows. Aponte um endereço para uma etapa inteira de
          triagem, um pipeline ou uma comparação, em vez de um único tipo de documento.
        </Lead>
        <DataTable
          head={["Enviar para", "Formato do endereço", "O que acontece"]}
          rows={[
            [
              "Um flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Cada anexo é extraído por esse flow.",
            ],
            [
              "Uma Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Cada anexo é classificado e encaminhado para o flow ou Splitter certo. Veja{" "}
                <DocLink href="/docs/collections">como as Collections encaminham documentos</DocLink>.
              </Fragment>,
            ],
            [
              "Um Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Cada anexo é primeiro dividido nos seus documentos separados. Veja{" "}
                <DocLink href="/docs/splitters">como dividir arquivos com vários documentos</DocLink>.
              </Fragment>,
            ],
            [
              "Um Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Cada anexo em PDF ou imagem inicia uma execução. Veja{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Um Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Todos os anexos em PDF ou imagem de um e-mail são comparados juntos em uma única
                comparação (sempre no modo multilateral), e o resultado é respondido na mesma
                conversa. Veja <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Um Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Cada anexo é arquivado no caso certo por uma referência no assunto, no corpo ou no
                nome do arquivo, ou pelo endereço com sufixo “+” do próprio caso. Veja{" "}
                <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Copie o endereço exato do painel Gatilho por e-mail do recurso; os formatos acima só ajudam a diferenciá-los."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Qual endereço os fornecedores devem usar?">
          Se um remetente só envia um tipo de documento, dê a ele o endereço do flow. Se ele envia
          uma mistura (faturas, pedidos de compra, notas de entrega), dê o endereço da Collection e
          deixe o Tavnit fazer a triagem. Se ele envia um PDF com vários documentos, dê o endereço do
          Splitter.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="O que o Tavnit aceita">
        <Lead>
          Flows, Collections, Splitters e Subjects leem PDFs, imagens comuns e planilhas. Pipelines e
          Matchers leem apenas PDFs e imagens. Todo o resto da mensagem é ignorado sem fazer o
          restante falhar: um arquivo não suportado não impede que os outros anexos sejam
          processados.
        </Lead>
        <DataTable
          head={["Aceito", "Extensões"]}
          rows={[
            ["Documentos PDF", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Imagens",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Planilhas (exceto Pipelines e Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Um anexo é ignorado em vez de processado quando qualquer uma destas condições é verdadeira:</p>
        <DataTable
          head={["Motivo", "Como se apresenta"]}
          rows={[
            [
              "Tipo de arquivo não suportado",
              "Documentos do Word, arquivos compactados, encaminhamentos .eml e qualquer coisa sem uma extensão reconhecida.",
            ],
            ["Anexo vazio", "Um arquivo de zero bytes, normalmente um encaminhamento corrompido."],
            [
              "Arquivo ilegível",
              "O arquivo tem uma extensão válida, mas não pode ser aberto: um download truncado, um arquivo renomeado ou uma planilha que não pode ser interpretada.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Imagens de assinatura contam como anexos">
          Um logotipo na assinatura do e-mail muitas vezes chega como anexo de imagem, e um flow o
          processa como qualquer outra imagem. Se isso criar runs indesejados, encaminhe apenas os
          documentos, ou use Remetentes permitidos e uma regra de encaminhamento que remova as
          imagens embutidas.
        </InfoBox>
        <p>
          O limite de tamanho de anexo do seu provedor de e-mail vale antes mesmo de o Tavnit ver a
          mensagem. Se uma digitalização grande for devolvida no envio, faça o upload pelo app ou
          envie-a para a <DocLink href="/docs/api-integration">REST API</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Como as planilhas são tratadas">
        <Lead>
          Uma planilha anexada é tratada como um documento, não como uma tabela a importar. O que
          acontece depende de para onde você a envia.
        </Lead>
        <DataTable
          head={["Enviada para", "O que o Tavnit faz"]}
          rows={[
            [
              "Um flow",
              "Extrai da primeira aba visível.",
            ],
            [
              "Uma Collection",
              "Classifica o arquivo pela primeira aba e depois o entrega ao flow escolhido, que lê a primeira aba visível.",
            ],
            [
              "Um Splitter",
              "Trata cada aba visível e não vazia como um documento próprio, classifica cada uma e a envia adiante como um arquivo de uma única aba.",
            ],
          ]}
        />
        <p>
          Abas muito grandes são rejeitadas com um erro. Para carregar uma planilha como linhas
          estruturadas, use um sweep de um{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Proteção contra duplicatas">
        <Lead>
          Às vezes os servidores de e-mail entregam a mesma mensagem mais de uma vez, por exemplo
          depois de um tempo limite. O Tavnit reconhece uma mensagem reentregue ao mesmo endereço e
          não a processa de novo, então uma nova tentativa nunca cria runs duplicados.
        </Lead>
        <BulletList
          items={[
            "O Tavnit confirma o recebimento da mensagem em segundos e processa os anexos em segundo plano, então é seguro enviar um e-mail com muitos anexos.",
            "Se o processamento for interrompido, ele continua de onde parou em vez de recomeçar.",
            "Uma mensagem enviada para dois endereços diferentes do Tavnit é processada uma vez em cada endereço.",
            "Enviar o mesmo arquivo de novo em um novo e-mail é uma nova mensagem e é processado de novo.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Envie os resultados de volta por e-mail">
        <Lead>
          A Saída por e-mail é o caminho de volta: quando um run termina com sucesso, o Tavnit envia
          o resultado por e-mail para os endereços que você configurar. Ela é independente do
          gatilho por e-mail: você pode usar qualquer um dos dois sozinho, ou ambos para formar um
          ciclo completo de envio e retorno.
        </Lead>
        <NumberedList
          items={[
            "Abra a página de detalhes do flow.",
            <Fragment key="f21">
              Abra o painel <strong>Saída por e-mail</strong>.
            </Fragment>,
            <Fragment key="f22">
              Adicione um ou mais <strong>Endereços dos destinatários</strong>.
            </Fragment>,
            <Fragment key="f23">
              Escolha o que cada mensagem leva em <strong>Anexos</strong> e salve.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Opção", "O que chega"]}
          rows={[
            ["Extração em JSON", "O resultado extraído como JSON formatado no corpo da mensagem."],
            [
              "Extração em CSV",
              <Fragment key="f24">
                As linhas como anexo <InlineCode>rows.csv</InlineCode>, a forma mais rápida de levar
                os resultados para uma planilha.
              </Fragment>,
            ],
            ["Resultados de formulários", "Os PDFs preenchidos, quando o flow preenche um modelo de formulário."],
            [
              "Documento original",
              "O arquivo de origem (PDF, imagem ou planilha) que foi processado, anexado junto com os resultados.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Campos de arquivo chegam como links">
          Campos que contêm um arquivo ou uma imagem não vêm embutidos no JSON. Eles chegam como
          links com validade limitada, porque o Tavnit mantém os documentos armazenados privados: um
          caminho de armazenamento bruto não poderia ser acessado a partir de uma caixa de entrada.
        </InfoBox>
        <BulletList
          items={[
            "O e-mail de saída só é enviado para runs concluídos com sucesso. Um run com falha não envia nada.",
            "O assunto traz o nome do flow mais um detalhe de cada run, para que os clientes de e-mail não agrupem todos os runs de um flow em uma única conversa.",
            <Fragment key="f25">
              Se o flow tiver a <DocLink href="/docs/human-in-the-loop">revisão humana</DocLink>{" "}
              ativada, o e-mail espera até que um revisor aprove o run.
            </Fragment>,
            <Fragment key="f26">
              Para entregas entre sistemas, um{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink> é mais adequado do que o e-mail.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Exemplo prático: uma caixa de contas a pagar">
        <Lead>
          A configuração mais comum é uma caixa compartilhada que já recebe faturas de fornecedores,
          encaminhada para uma Collection para que o formato de cada fornecedor caia no flow certo,
          com os resultados enviados por e-mail à equipe financeira e gravados em um Bucket.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Crie um flow para cada tipo de documento que você recebe, por exemplo{" "}
              <em>Faturas de fornecedores</em> e <em>Notas de entrega</em>, e dê a cada um uma
              descrição clara.
            </Fragment>,
            <Fragment key="f28">
              Coloque os dois flows em uma <DocLink href="/docs/collections">Collection</DocLink> e
              ative o gatilho por e-mail da Collection. Adicione a caixa compartilhada aos Remetentes
              permitidos.
            </Fragment>,
            <Fragment key="f29">
              Na caixa compartilhada, encaminhe para o endereço da Collection toda mensagem com anexo
              vinda dos domínios dos seus fornecedores.
            </Fragment>,
            <Fragment key="f30">
              Em cada flow, ative a <strong>Saída por e-mail</strong> com o anexo CSV para a equipe
              financeira e adicione uma{" "}
              <DocLink href="/docs/buckets">exportação para Bucket</DocLink>, para que os dados se
              acumulem em uma única tabela.
            </Fragment>,
            <Fragment key="f31">
              Adicione um <DocLink href="/docs/cleaners">Cleaner</DocLink> com uma ação condicional
              que envie tudo o que passar do seu limite de aprovação para a{" "}
              <DocLink href="/docs/human-in-the-loop">revisão humana</DocLink> antes da entrega.
            </Fragment>,
          ]}
        />
        <p>
          Ninguém do financeiro precisa abrir o Tavnit. As faturas chegam onde sempre chegaram, e os
          dados estruturados voltam para a mesma caixa de entrada.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Solução de problemas">
        <Lead>
          Como os e-mails recebidos são aceitos silenciosamente, um documento que não aparece não
          deixa nenhum erro na sua caixa de entrada. Siga esta lista: a causa quase sempre é a chave
          de ativação do gatilho, os Remetentes permitidos, o tipo de anexo ou uma regra de
          encaminhamento que remove os anexos.
        </Lead>
        <DataTable
          head={["Sintoma", "Causa provável", "Solução"]}
          rows={[
            [
              "Nenhum run aparece",
              "O gatilho por e-mail está desativado, o endereço pertence a outro flow ou o remetente não está em Remetentes permitidos.",
              "Verifique de novo a chave de ativação e a lista de Remetentes permitidos, e copie o endereço outra vez no painel Gatilho por e-mail.",
            ],
            [
              "Alguns anexos foram processados, outros não",
              "Os que faltam são de um tipo não suportado, estão vazios ou são ilegíveis.",
              "Compare as extensões com a lista de aceitos acima.",
            ],
            [
              "Só a imagem da assinatura foi processada",
              "O documento real não foi anexado: ele foi enviado como link, ou o encaminhamento o descartou.",
              "Encaminhe como anexo, e não embutido, e verifique se a regra preserva os anexos.",
            ],
            [
              "Um e-mail sem anexo não fez nada",
              "Processar corpo do e-mail está desativado, ou o corpo tinha quase nenhum texto.",
              "Ative Processar corpo do e-mail no painel Gatilho por e-mail (flows e Collections).",
            ],
            [
              "A nota de apresentação gerou o seu próprio run",
              "Processar corpo do e-mail está configurado como Sempre.",
              "Mude o modo para Somente quando não houver anexos.",
            ],
            [
              "Os runs aparecem, mas falham",
              "O problema é o próprio documento, não o caminho do e-mail.",
              "Abra o run e leia o log; a falha é um problema de extração.",
            ],
            [
              "Os resultados nunca chegam por e-mail",
              "A Saída por e-mail não está configurada, o run falhou ou está aguardando revisão.",
              "Verifique primeiro o status do run e depois a configuração da Saída por e-mail.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Encaminhe documentos variados automaticamente com Collections",
            description:
              "Aponte um único endereço de e-mail para vários flows e deixe o Tavnit escolher o certo para cada documento.",
          },
          {
            href: "/docs/splitters",
            label: "Divida arquivos com vários documentos antes da extração",
            description: "Para remetentes que juntam vários documentos em um único anexo.",
          },
          {
            href: "/docs/webhooks",
            label: "Entregue resultados aos seus próprios sistemas com webhooks",
            description:
              "A alternativa legível por máquinas à Saída por e-mail, com novas tentativas automáticas.",
          },
          {
            href: "/docs/api-integration",
            label: "Envie documentos pela REST API",
            description:
              "Para volumes e tamanhos de arquivo que o e-mail não comporta, com tratamento explícito de erros.",
          },
        ]}
      />
    </section>
  );
}
