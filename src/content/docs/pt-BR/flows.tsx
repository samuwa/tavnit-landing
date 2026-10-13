import { Fragment } from "react";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
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
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /pt-BR/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Monte o esquema". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Montar um Flow do Tavnit que extrai dados estruturados de um documento",
    description:
      "Crie um Flow, defina seus campos de metadados e de tabela, adicione dicas de extração só onde forem necessárias e teste-o com um documento real.",
    steps: [
      {
        name: "Crie o Flow e descreva-o",
        text: "Na página Flows, clique em Criar Flow e escolha um modelo, uma sugestão da IA ou um Flow em branco. Dê a ele um nome e uma descrição dos documentos que ele processa — a descrição também ajuda a IA a extrair com mais precisão.",
      },
      {
        name: "Adicione campos de metadados",
        text: "Adicione um campo para cada valor que aparece uma vez por documento, como número da nota, data de emissão ou fornecedor, e defina o tipo de dados.",
      },
      {
        name: "Adicione campos de tabela",
        text: "Adicione um campo para cada coluna da tabela de itens que se repete, como descrição, quantidade, preço unitário e valor.",
      },
      {
        name: "Adicione dicas de extração onde for preciso",
        text: "Adicione dicas só aos campos que precisam delas: valores de exemplo reais, o rótulo ao lado do qual o valor fica, a área da página em que ele aparece ou o cabeçalho de coluna impresso.",
      },
      {
        name: "Teste com um documento real",
        text: "Um Flow novo já está Ativo. Clique em Executar, processe um documento real, compare o resultado com a origem e refine as dicas de qualquer campo que tenha voltado errado.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "O esquema de dados de um Flow do Tavnit, com campos de metadados e campos de tabela definidos lado a lado.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsPtBR() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="O que é um Flow">
        <Lead>
          Um Flow é a definição de um tipo de documento: os campos que você quer extrair, as dicas
          que dizem à IA onde encontrá-los e tudo o que está ligado depois. É o objeto do Tavnit que
          transforma um documento em dados — Collections, Subjects, Splitters e Cleaners existem
          para alimentar ou refinar o que um Flow produz.
        </Lead>
        <p>
          Não há modelo para desenhar nem coordenadas para mapear. Você descreve os campos em termos
          simples e o Flow funciona com qualquer layout, então um único Flow{" "}
          <em>Notas fiscais de fornecedores</em> consegue lidar com vinte fornecedores cujas notas
          não se parecem em nada. É também por isso que o esquema e suas dicas são onde quase toda a
          qualidade da extração se ganha ou se perde.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="O esquema de dados de um Flow do Tavnit chamado Invoice Processor. Um painel de campos de metadados lista nove campos de valor único, como Invoice Number, Due Date e Total, com seus tipos de dados, ao lado de um painel de campos de tabela com Description, Quantity, Price e Amount. A barra lateral esquerda agrupa Runs recentes, Gatilho de e-mail, Collections, Cleaner, Agent, Modelos de formulário, Saída por e-mail, Webhook, Exportação para Bucket, Revisão humana e ID do Flow."
          caption="O esquema de dados de um Flow. Campos de metadados à esquerda, campos de tabela que se repetem à direita e tudo o que pode ser ligado ao Flow na barra lateral."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Só o esquema é obrigatório">
          Um Flow precisa de pelo menos um campo. Todo o resto da barra lateral — Cleaner, Agent,
          webhook, e-mail, exportação para Bucket, revisão — é opcional e pode ser adicionado depois
          sem reconstruir nada. Owners e Admins podem criar e editar Flows.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Crie um Flow">
        <Lead>
          Clique em <strong>Criar Flow</strong> na página Flows e o Tavnit pergunta{" "}
          <em>“Como você quer começar?”</em>. Os três caminhos terminam no mesmo Flow editável, então
          escolha o que levar você mais rápido a um bom primeiro rascunho.
        </Lead>
        <DataTable
          head={["Opção", "O que faz", "Ideal quando"]}
          rows={[
            [
              "A partir de um modelo",
              <Fragment key="c0">
                Abre uma galeria com duas abas. <strong>Modelos do Tavnit</strong> são Flows prontos,
                com campos e dicas já preenchidos; <strong>Meus Flows</strong> permite usar{" "}
                <strong>Criar cópia</strong> em um dos seus próprios Flows ativos.
              </Fragment>,
              "Seu documento é de um tipo comum ou parecido com um Flow que você já tem.",
            ],
            [
              "Sugestão da IA",
              "Envie um PDF ou uma imagem de exemplo. A IA lê o arquivo, detecta os campos e esboça um nome, uma descrição e um esquema com dicas. Desmarque o que você não precisa e edite qualquer campo antes de criar o Flow.",
              "Seu documento é específico do seu negócio e você quer sair na frente.",
            ],
            [
              "Começar do zero",
              "Um esquema vazio. Você mesmo define cada campo.",
              "Você sabe exatamente o que precisa ou está reconstruindo um processo existente.",
            ],
          ]}
        />
        <p>
          Os modelos do Tavnit cobrem notas fiscais, pedidos de compra, recibos, extratos bancários,
          guias de remessa, resultados de laboratório, contratos, cotações, notas de crédito,
          documentos de identidade e currículos. Se você respondeu às perguntas de boas-vindas ao
          configurar sua organização, os modelos que correspondem aos seus documentos aparecem
          primeiro, e a página Flows vazia oferece criar todos eles em um clique com{" "}
          <strong>Criar estes Flows</strong>.
        </p>
        <p>
          Todo caminho termina com um nome (pelo menos 3 caracteres) e uma descrição (pelo menos 10
          caracteres). O Flow abre no editor com um guia curto <em>“Configure seu Flow”</em>, e fica{" "}
          <strong>Ativo</strong> desde o início — use o interruptor na barra superior para
          desativá-lo. Um Flow inativo não pode ser executado.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="A sugestão da IA não cria um Run">
          Esboçar um Flow a partir de um documento de exemplo não cria um Run. Trate o rascunho como
          ponto de partida — exclua o que você não vai usar, porque cada campo a mais é mais coisa
          para revisar e mais coisa que pode dar errado.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Campos de metadados e campos de tabela">
        <Lead>
          Todo campo é de um de dois tipos, conforme o valor apareça uma vez por documento ou uma vez
          por linha. Essa é a escolha de maior impacto no esquema: ela determina o formato do payload
          do seu webhook, das linhas do seu Bucket, do seu CSV e da sua tela de revisão.
        </Lead>
        <DataTable
          head={["", "Campo de metadados", "Campo de tabela"]}
          rows={[
            ["Aparece", "Uma vez por documento", "Uma vez por linha de uma tabela que se repete"],
            [
              "Em uma nota fiscal",
              "Número da nota, data de emissão, fornecedor, total",
              "Descrição, quantidade, preço unitário, valor",
            ],
            [
              "Na saída",
              <Fragment key="f0">
                O objeto <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Uma entrada por linha em <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "Em um Bucket",
              "Repetido em cada linha exportada daquele documento",
              "Uma linha de Bucket cada",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Errar o tipo é o erro clássico">
          Definir uma coluna de itens como campo de metadados traz um único valor de uma tabela de
          vinte. Definir o total da nota como campo de tabela repete o mesmo número em todas as
          linhas. Na dúvida, pergunte-se se uma segunda ocorrência do valor poderia aparecer no mesmo
          documento.
        </InfoBox>
        <p>
          Um Flow com <strong>apenas campos de metadados</strong> — um documento de identidade, um
          certificado, um formulário de uma página — devolve uma única linha por documento com esses
          valores, então o resultado chega à sua visualização em tabela, ao Bucket, ao webhook e ao
          e-mail como qualquer outro Run.
        </p>
        <p>
          Um Flow também pode carimbar <strong>Colunas do sistema</strong> em cada linha que gera — o
          ID do Flow, o nome do Flow e o ID do Run. Ative-as quando vários Flows gravam em um mesmo{" "}
          <DocLink href="/docs/buckets">Bucket</DocLink> e você precisa saber de que documento veio
          cada linha.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Tipos de dados">
        <Lead>
          Cada campo tem um tipo. Os tipos não são cosméticos: eles decidem se um valor é ordenado,
          somado, comparado em uma regra de Cleaner e exibido em gráficos corretamente. Defini-los
          bem no Flow poupa trabalho em todas as etapas seguintes.
        </Lead>
        <DataTable
          head={["Tipo", "Use para", "Observações"]}
          rows={[
            ["Texto", "Nomes, endereços, descrições, códigos de referência", "O padrão seguro."],
            [
              "Número",
              "Totais, quantidades, preços, taxas",
              "Obrigatório se você quiser somar, comparar ou fazer gráficos com o valor depois.",
            ],
            [
              "Data",
              "Datas de emissão, de vencimento, de entrega",
              <Fragment key="f2">
                Reformatar para um formato de saída consistente é trabalho de um{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>, não da extração.
              </Fragment>,
            ],
            [
              "Misto/Alfanumérico",
              "Valores que misturam letras e dígitos — códigos de peça, códigos de contêiner, identificadores fiscais",
              "Use este em vez de Número quando zeros à esquerda ou letras precisam ser preservados.",
            ],
            [
              "Imagem",
              "Figuras impressas no documento: fotos, logotipos, assinaturas, carimbos",
              "Extraídas e armazenadas com segurança, depois entregues como um link de validade limitada.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extraia como está impresso, normalize depois">
          Não use o tipo para reformatar. Capture o valor como o documento o mostra e deixe um
          Cleaner converter moedas, reescrever datas e corrigir separadores decimais. Uma extração
          que também transforma é mais difícil de depurar quando um número volta errado.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Dicas de extração">
        <Lead>
          As dicas são a forma de desambiguar um campo sem escrever um modelo. Elas importam mais
          quando um documento contém vários valores parecidos — três datas, dois totais, um número de
          pedido e um número de nota no mesmo bloco do cabeçalho.
        </Lead>
        <p>
          <strong>Para um campo de metadados</strong> você pode combinar qualquer uma destas:
        </p>
        <DataTable
          head={["Dica", "O que diz à IA", "Ideal para"]}
          rows={[
            [
              "Valores de exemplo",
              "Valores reais copiados dos seus documentos.",
              "Quase tudo. A dica de maior valor — mostra formato, tamanho e forma de uma só vez.",
            ],
            [
              "Ao lado de um rótulo",
              <Fragment key="f3">
                O rótulo impresso ao lado do qual o valor fica. Liste as variantes:{" "}
                <em>Número da nota, Nota nº, NF</em>.
              </Fragment>,
              "Campos do cabeçalho que cada fornecedor rotula de um jeito.",
            ],
            [
              "Em uma área específica da página",
              "Uma de nove zonas — do canto superior esquerdo ao inferior direito.",
              "Valores que ficam sempre no mesmo canto, como um número de documento no canto superior direito.",
            ],
            [
              "Intervalo esperado",
              "Um mínimo, um máximo ou ambos. Tratado como orientação, não como regra rígida.",
              "Pegar uma leitura errada da vírgula decimal — um total de 27.030 quando o certo era 270,30.",
            ],
            [
              "Dicas adicionais",
              "Texto livre para tudo o que as opções acima não cobrem.",
              "Regras como “use o valor líquido, nunca o bruto”.",
            ],
          ]}
        />
        <p>
          <strong>Para um campo de tabela</strong> as dicas são outras, porque a IA está localizando
          uma coluna e não um ponto na página:
        </p>
        <DataTable
          head={["Dica", "O que diz à IA"]}
          rows={[
            [
              "Tipo de origem",
              "Tabela, para dados em uma tabela de verdade, com colunas; Formato livre, para valores em forma de linhas dentro de texto não estruturado, como um contrato.",
            ],
            [
              "Cabeçalhos de coluna",
              "O texto do cabeçalho como está impresso. Liste todas as variantes que seus fornecedores usam para que um único campo corresponda a todas.",
            ],
            ["Intervalo esperado", "Um intervalo de plausibilidade para os números daquela coluna."],
            ["Valores de exemplo", "Valores reais de células dos seus documentos."],
            [
              "Informações adicionais",
              "O que a coluna realmente representa, quando só o cabeçalho é ambíguo — “preço unitário antes do desconto”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Comece sem dicas">
          Adicione os campos, execute um documento real e só adicione dicas onde o resultado veio
          errado. Colocar dicas em tudo de antemão gasta tempo com campos que nunca foram ambíguos, e
          uma dica específica demais pode piorar a extração ao excluir um layout que você não
          previu. Quando o Flow tiver alguns Runs, <strong>Diagnosticar</strong> pode propor dicas
          para você.
        </InfoBox>
        <p>
          Os valores de exemplo são ignorados em campos de <strong>Data</strong> e{" "}
          <strong>Imagem</strong>, então coloque qualquer orientação sobre datas na caixa de dicas
          adicionais.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Campos compostos">
        <Lead>
          Algumas colunas de tabela guardam vários valores em uma célula — uma distribuição de
          tamanho e quantidade como <em>P:2 M:5 G:3</em> impressa em um único quadro. Um campo
          composto divide essa célula em subcampos para que cada parte vire um valor próprio, em vez
          de um texto que você teria de interpretar depois.
        </Lead>
        <NumberedList
          items={[
            "Adicione um campo de tabela e ative Campo composto.",
            <Fragment key="f4">
              Defina os subcampos que formam a célula — por exemplo <InlineCode>size</InlineCode>{" "}
              como texto e <InlineCode>quantity</InlineCode> como número.
            </Fragment>,
            "Adicione valores de exemplo que mostrem como o agrupamento aparece nos seus documentos.",
          ]}
        />
        <p>
          Os subcampos guardam valores únicos, então podem ser Texto, Número, Data ou
          Misto/Alfanumérico — mas não Imagem. Campos compostos só existem em campos de tabela,
          porque a ideia é justamente desmembrar uma célula que se repete.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Campos de metadados com vários valores">
          O equivalente nos metadados é <strong>Aceitar vários valores</strong>. Ative-o quando um
          único documento pode legitimamente trazer várias ocorrências da mesma coisa — um conjunto
          de números de recibo, várias referências de pedido de compra — e o campo devolve uma lista
          em vez de um valor. Não está disponível em campos de Imagem.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Extraindo imagens">
        <Lead>
          Um campo de Imagem extrai do documento uma figura em vez de texto: uma foto de produto, uma
          assinatura, um carimbo, um logotipo. Um campo de imagem de metadados guarda uma imagem por
          documento; um campo de imagem de tabela dá a cada linha a imagem que pertence a ela.
        </Lead>
        <BulletList
          items={[
            "As imagens são armazenadas de forma privada, então chegam às etapas seguintes como links de validade limitada, não como bytes brutos",
            "O mesmo tipo de link aparece no payload do webhook, na saída por e-mail e na célula do CSV; uma exportação a partir da página do Run gera links novos",
            "Os links nas entregas valem por sete dias — baixe a imagem em vez de guardar o link",
            "Campos de Imagem não podem ser compostos nem aceitar vários valores, e as dicas de valores de exemplo não se aplicam a eles",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Monte o esquema">
        <Lead>
          Monte primeiro os campos de metadados, depois os campos de tabela e por fim as dicas.
          Teste cedo com um documento real — um esquema que parece certo no papel e um esquema que
          sobrevive à sua papelada de verdade são coisas diferentes.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Clique em <strong>Criar Flow</strong> e escolha um modelo, uma sugestão da IA ou um
              Flow em branco. Dê a ele um nome que descreva o documento (
              <em>Notas fiscais de fornecedores</em>) e uma descrição de verdade — ela melhora a
              precisão da extração e é o que uma{" "}
              <DocLink href="/docs/collections">Collection</DocLink> usa depois para fazer a
              correspondência.
            </Fragment>,
            <Fragment key="f6">
              Em <strong>Campos de metadados</strong>, clique em <strong>Adicionar campo</strong> para
              cada valor que aparece uma vez por documento, definindo o tipo de dados à medida que
              avança.
            </Fragment>,
            <Fragment key="f7">
              Em <strong>Campos de tabela</strong>, adicione um campo para cada coluna da tabela de
              itens que se repete.
            </Fragment>,
            <Fragment key="f8">
              Adicione <strong>dicas de extração</strong> só aos campos que precisam delas.
            </Fragment>,
            <Fragment key="f9">
              O Flow já está <strong>Ativo</strong>. Clique em <strong>Executar</strong>, processe um
              documento real e compare o resultado com a origem.
            </Fragment>,
          ]}
        />
        <p>Arraste os campos pela alça para reordená-los.</p>
        <WarningBox>
          Renomear um campo muda a chave em todos os consumidores seguintes: o payload do webhook, o
          mapeamento de colunas do Bucket, o cabeçalho do CSV e qualquer{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> que o leia. Confira o que está ligado
          antes de renomear um campo em um Flow que já está em produção.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Que arquivos um Flow lê">
        <Lead>
          Um Flow aceita PDFs, imagens e planilhas por todas as vias — envio, e-mail e API. O Tavnit
          decide como ler cada arquivo, então você não configura nada por formato.
        </Lead>
        <DataTable
          head={["Arquivo", "Formatos", "Como é lido"]}
          rows={[
            [
              "PDF",
              "PDF",
              "PDFs digitais são lidos diretamente. PDFs digitalizados são detectados automaticamente e lidos primeiro com OCR.",
            ],
            [
              "Imagem",
              "PNG, JPG, JPEG, JFIF",
              "Lida como uma página digitalizada. JFIF é a variante de JPEG que alguns navegadores no Windows salvam por padrão, e funciona como qualquer JPEG.",
            ],
            [
              "Planilha",
              "XLSX, XLS, CSV",
              "A primeira aba visível é lida. As demais abas e as ocultas são ignoradas, então coloque os dados que você quer na primeira aba.",
            ],
          ]}
        />
        <p>
          Abas muito grandes são recusadas com um erro claro. Para processar cada aba de uma pasta
          de trabalho como um documento próprio, envie-a por um{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Digitalização ruim: force o OCR para arquivos que extraem mal">
          Documentos digitalizados já recebem OCR automaticamente. Alguns arquivos parecem digitais,
          mas trazem uma camada de texto defeituosa — uma digitalização com uma transcrição embutida
          ruim, um PDF exportado de uma ferramenta incomum. Para esses, abra{" "}
          <strong>Digitalização ruim</strong> nas configurações do Flow e ative a opção: a partir daí,
          todo arquivo do Flow é lido primeiro com OCR e a extração trabalha com o texto recuperado.
          Se o OCR não estiver disponível ou falhar, o Run volta automaticamente ao processamento
          padrão.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="O que você pode ligar a um Flow">
        <Lead>
          O esquema decide o que sai; o resto do Flow decide o que acontece com isso. Cada item
          abaixo é independente — ligue só o que você precisa, em qualquer ordem, a qualquer momento.
        </Lead>
        <DataTable
          head={["Etapa", "Item", "O que faz"]}
          rows={[
            [
              "Entradas",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">Gatilho de e-mail</DocLink>
              </Fragment>,
              "Dá ao Flow um endereço de caixa de entrada próprio para que os documentos encaminhados (PDF, imagem ou planilha) sejam processados automaticamente.",
            ],
            [
              "Entradas",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Lista as Collections que podem encaminhar documentos a este Flow.",
            ],
            [
              "Processamento",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Processa as linhas de cada Run: reformata, converte, calcula, consulta e dispara regras.",
            ],
            [
              "Processamento",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "É executado depois da extração, usando os campos extraídos como entradas.",
            ],
            [
              "Processamento",
              "Modelos de formulário",
              "Preenche um modelo em PDF com os valores extraídos de um Run.",
            ],
            [
              "Saídas",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">Saída por e-mail</DocLink>
              </Fragment>,
              "Envia os resultados por e-mail para um ou mais endereços após cada Run bem-sucedido, com anexos opcionais em JSON, CSV, formulários preenchidos e o documento original.",
            ],
            [
              "Saídas",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Envia os resultados por POST ao seu endpoint. Somente HTTPS.",
            ],
            [
              "Saídas",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Exportação para Bucket</DocLink>
              </Fragment>,
              "Acrescenta as linhas de cada Run a uma tabela estruturada, com os campos mapeados para colunas.",
            ],
            [
              "Configurações",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Revisão humana</DocLink>
              </Fragment>,
              "Pausa os Runs para um revisor antes que qualquer coisa seja entregue.",
            ],
            [
              "Configurações",
              "Digitalização ruim",
              "Força o OCR para todos os arquivos do Flow (veja acima).",
            ],
            [
              "Configurações",
              "ID do Flow",
              <Fragment key="f18">
                O identificador que você informa ao chamar a{" "}
                <DocLink href="/docs/api-integration">API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Opções do Gatilho de e-mail.</strong> Com o gatilho ativado, o painel mostra o
          endereço da caixa de entrada do Flow e duas configurações.{" "}
          <strong>Remetentes permitidos</strong> limita quem pode iniciar um Run por e-mail; deixe
          vazio para aceitar qualquer remetente. <strong>Processar corpo do e-mail</strong> também
          extrai do próprio texto da mensagem, seja{" "}
          <em>Somente quando não houver anexos</em> (o padrão, para que uma mensagem de apresentação
          nunca inicie um segundo Run), seja <em>Sempre</em>. O endereço do remetente fica registrado
          em cada Run e aparece na página Runs.{" "}
          <DocLink href="/docs/email-integration">Integração por e-mail</DocLink> traz os detalhes.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Diagnostique um Flow">
        <Lead>
          Quando um Flow já processou alguns documentos, o botão <strong>Diagnosticar</strong> na
          barra superior do Flow abre o <strong>Doutor do Flow</strong>. Ele estuda seus Runs
          concluídos recentes, encontra os campos que voltam vazios ou com o tipo errado com
          frequência e propõe correções.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Abra o Flow e clique em <strong>Diagnosticar</strong>. O botão aparece quando o Flow
              tem pelo menos um campo, para Owners e Admins.
            </Fragment>,
            "O Tavnit lê os Runs recentes, relê alguns dos documentos em que campos falharam e esboça correções. Isso leva um instante.",
            <Fragment key="d1">
              Revise o resultado. Cada campo com problema mostra com que frequência ficou vazio ou
              teve o tipo errado, com a dica em dois quadros lado a lado: <strong>Atual</strong> e{" "}
              <strong>Proposto</strong>. Ele também pode oferecer uma{" "}
              <strong>Descrição sugerida</strong>.
            </Fragment>,
            <Fragment key="d2">
              Mantenha ou edite as correções com que você concorda e clique em{" "}
              <strong>Aplicar</strong>. Nada muda até você aplicar; fechar o painel descarta as
              propostas.
            </Fragment>,
          ]}
        />
        <p>
          Se tudo estiver bem, você verá <em>“A extração parece saudável”</em>. O diagnóstico só
          roda quando você clica no botão. Depois de aplicar as correções, processe de novo um
          documento real para confirmar que elas ajudaram.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: o que acontece quando um documento é processado">
          <Lead>
            Cada documento vira um Run, e todo Run passa pela mesma sequência. Conhecer a ordem diz
            onde procurar quando algo chega atrasado, chega errado ou não chega.
          </Lead>
          <NumberedList
            items={[
              "O documento é armazenado e o Run entra na fila.",
              "A extração o lê e produz valores de metadados e linhas de tabela.",
              "Se houver um Cleaner ligado, ele processa essas linhas — conversões, colunas calculadas, consultas.",
              "As regras condicionais disparam: linhas podem ser descartadas, notificações enviadas, revisão solicitada.",
              "Se a revisão for exigida, o Run pausa e nada é entregue até que um revisor aprove.",
              "As saídas são executadas: e-mail, exportação para Bucket e webhook. O Run é então marcado como concluído e, se houver um Agent vinculado, ele começa.",
            ]}
          />
          <DataTable
            head={["Status do Run", "Significado"]}
            rows={[
              ["Pendente (na fila)", "Armazenado e aguardando um worker."],
              [
                "Processando",
                "Em extração, limpeza ou entrega. A página do Run mostra a etapa atual.",
              ],
              [
                "Tentando novamente",
                "Uma tentativa anterior falhou por um motivo temporário e o Run voltou à fila automaticamente (veja abaixo).",
              ],
              [
                "Aguardando revisão HITL",
                <Fragment key="f19">
                  Pausado para <DocLink href="/docs/human-in-the-loop">revisão humana</DocLink>.
                  Nada foi entregue ainda.
                </Fragment>,
              ],
              ["Concluído", "A extração terminou e todas as saídas configuradas foram executadas."],
              [
                "Cancelado",
                "Alguém cancelou o Run enquanto ele estava na fila ou em processamento, ou um revisor o rejeitou. Nada mais é entregue.",
              ],
              ["Com falha", "Não foi possível processar o documento. O log do Run diz por quê."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Trabalhando com Runs">
        <Lead>
          A página <strong>Runs</strong> lista todos os Runs da sua organização; cada Flow também tem
          a sua própria aba <strong>Runs recentes</strong>. Use <strong>Filtrar</strong> para
          restringir por status, período, Flow, usuário, origem ou um ID de Run colado.
        </Lead>
        <DataTable
          head={["Ação", "Onde", "Observações"]}
          rows={[
            [
              "Ver detalhes",
              "Menu de ações do Run, ou clique na linha",
              "Os dados extraídos ao lado do arquivo de origem, as informações do Run e o log de processamento.",
            ],
            [
              "Baixar CSV",
              "Menu de ações do Run",
              "Somente Runs concluídos. Exportar CSV e Exportar JSON também estão na página do Run.",
            ],
            [
              "Baixar arquivo",
              "Menu de ações do Run, ou Baixar na página do Run",
              "O arquivo de origem original. Planilhas não podem ser visualizadas na própria página, então baixe-as para vê-las.",
            ],
            [
              "Cancelar Run",
              "Menu de ações do Run",
              "Só para Runs ainda na fila ou em execução.",
            ],
          ]}
        />
        <p>
          A coluna <strong>Acionado por</strong> mostra quem iniciou o Run — o usuário, em um envio,
          ou o endereço do remetente, em um Run que chegou por e-mail. A coluna{" "}
          <strong>Origem</strong> diz como ele chegou: envio manual, API, e-mail e assim por diante.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Runs com falha e novas tentativas automáticas">
        <Lead>
          A maioria das falhas é culpa do documento — um arquivo ilegível ou um tipo não suportado —
          e tentar de novo não ajudaria. Algumas não são: um worker de processamento reinicia no
          meio do Run ou um provedor de IA tem uma indisponibilidade temporária. Para esses casos, uma
          organização pode deixar o Tavnit tentar de novo por conta própria.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Vá em <strong>Configurações</strong> → <strong>Organização</strong> →{" "}
              <strong>Runs com falha</strong>. Só o Owner vê esta aba.
            </Fragment>,
            <Fragment key="r1">
              Ative <strong>Tentar novamente os Runs com falha automaticamente</strong>.
            </Fragment>,
            <Fragment key="r2">
              Defina <strong>Máximo de novas tentativas por Run</strong> como 1, 2 ou 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Um Run tentado de novo mantém o mesmo ID, então a consulta pela API, os webhooks e os links continuam funcionando.",
            "As saídas só disparam quando um Run é concluído, então uma nova tentativa nunca entrega um documento duas vezes.",
            "Nunca são tentados de novo: arquivos inválidos, tipos não suportados, Runs cancelados, Runs pausados para revisão e Runs criados há mais de um dia.",
            "Um Run perdido por causa de um worker reiniciado é detectado automaticamente. Com as novas tentativas automáticas ativadas, ele volta à fila; desativadas, ele é marcado como Com falha.",
            "A página do Run lista as Tentativas anteriores, cada uma marcada como Worker perdido ou Com falha, com o erro, e a lista de Runs mostra um selo de nova tentativa.",
          ]}
        />
        <p>
          Para ser avisado sobre Runs que terminam em falha, adicione endereços em{" "}
          <strong>Notificações de falha de Run</strong> na mesma aba.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Melhorando a qualidade da extração">
        <Lead>
          Quando um campo volta errado, a correção quase sempre está na definição desse campo, e não
          no documento. Comece com <strong>Diagnosticar</strong> se o Flow tiver Runs e depois siga
          estes passos — os dois primeiros resolvem a maioria dos casos.
        </Lead>
        <DataTable
          head={["Sintoma", "Causa provável", "Correção"]}
          rows={[
            [
              "O valor errado entre vários valores parecidos",
              "Nada os diferencia.",
              "Adicione o rótulo ao lado do qual o valor fica ou a área da página em que ele aparece.",
            ],
            [
              "Um campo volta vazio",
              "Só o nome do campo não bastou para identificá-lo.",
              "Adicione dois ou três valores de exemplo reais — em geral, isso já basta.",
            ],
            [
              "Só um item de linha, quando há muitos",
              "Ele foi definido como campo de metadados.",
              "Redefina-o como campo de tabela.",
            ],
            [
              "O mesmo valor repetido em todas as linhas",
              "Um valor do nível do documento foi definido como campo de tabela.",
              "Redefina-o como campo de metadados.",
            ],
            [
              "Números errados por um fator de cem",
              "Os separadores decimal e de milhar foram lidos ao contrário.",
              "Defina um intervalo esperado e normalize o formato em um Cleaner.",
            ],
            [
              "Zeros à esquerda ou letras somem",
              "O campo está tipado como Número.",
              "Mude-o para Misto/Alfanumérico.",
            ],
            [
              "Colunas confundidas entre si",
              "Duas colunas têm cabeçalhos parecidos.",
              "Adicione os cabeçalhos de coluna impressos e descreva a coluna em Informações adicionais.",
            ],
            [
              "Bom com alguns fornecedores, ruim com outros",
              "As dicas descrevem o layout de um único fornecedor.",
              "Adicione as variantes de rótulo e de cabeçalho dos outros fornecedores ao mesmo campo.",
            ],
            [
              "Texto truncado ou ilegível em um arquivo que parece digital",
              "A camada de texto embutida no PDF está com defeito.",
              "Ative Digitalização ruim para que o Flow o leia com OCR.",
            ],
            [
              "Uma planilha volta vazia ou incompleta",
              "Os dados não estão na primeira aba visível.",
              "Mova-os para a primeira aba ou use um Splitter para pastas de trabalho com várias abas.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Mude uma coisa de cada vez">
          Processe de novo o mesmo documento após cada mudança. Editar quatro dicas de uma vez e
          processar de novo mostra que o resultado melhorou, mas não qual mudança foi responsável — e
          uma das quatro pode ter piorado as coisas.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Corrija os dados, não a extração">
          Se o valor está certo, mas o formato não — datas, moedas, unidades, maiúsculas e
          minúsculas —, deixe o Flow como está e adicione um{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normalize e enriqueça o que um Flow extrai",
            description:
              "Reformate datas, converta moedas, calcule totais e sinalize linhas que violam uma regra.",
          },
          {
            href: "/docs/email-integration",
            label: "Envie documentos a um Flow por e-mail",
            description:
              "O endereço da caixa de entrada, os remetentes permitidos, o processamento do corpo do e-mail e a saída por e-mail.",
          },
          {
            href: "/docs/collections",
            label: "Encaminhe documentos ao Flow certo automaticamente",
            description:
              "Por que o nome e a descrição de um Flow importam além da precisão da extração.",
          },
          {
            href: "/docs/api-integration",
            label: "Acione um Flow a partir do seu próprio código",
            description:
              "O ID do Flow, a autenticação por chave de API e exemplos em Python e JavaScript.",
          },
          {
            href: "/docs/webhooks",
            label: "Veja o payload que um Flow produz",
            description:
              "Como os campos de metadados e os campos de tabela aparecem no JSON que seu endpoint recebe.",
          },
        ]}
      />
    </section>
  );
}
