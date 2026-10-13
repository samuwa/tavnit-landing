import type { UseCasesContent } from "@/content/types";
import type { UseCase } from "@/lib/use-cases";

/** Use cases: the /use-cases hub copy and every use-case page — Português (Brasil) (pt-BR). */
const items: UseCase[] = [
  {
    slug: "invoice-processing",
    label: "Processamento de notas fiscais",
    badge: "Finanças e Contas a Pagar",
    h1: "Extração automática de dados de notas fiscais",
    title: "Software de extração de dados de notas fiscais com itens de linha",
    description:
      "Extraia fornecedor, número da nota, datas, totais e todos os itens das notas fiscais de fornecedores em qualquer layout, com revisão antes que qualquer coisa chegue à sua contabilidade.",
    summary:
      "Fornecedor, número, datas, totais e itens extraídos de qualquer layout de fornecedor — com revisão antes de chegar à sua contabilidade.",
    lede: "O Tavnit lê notas fiscais de fornecedores em qualquer layout e devolve fornecedor, número da nota, datas, impostos, totais e cada item de linha como campos tipados. Sem modelo por fornecedor para montar. Nada é lançado na contabilidade até que um revisor aprove, e cada aprovação fica registrada.",
    problem: [
      "Contas a pagar é a versão clássica deste problema: os mesmos oito campos, redigitados a partir de cem layouts diferentes, todo mês. Cada fornecedor formata de um jeito, alguns mandam digitalizações, outros mandam fotos de digitalizações, e os que mudam o modelo fazem isso sem avisar.",
      "Ferramentas baseadas em modelos lidam mal com o primeiro problema — você configura um layout por fornecedor, e cada fornecedor novo vira uma tarefa de configuração. No momento em que um fornecedor redesenha a nota, o modelo quebra em silêncio e os erros descem direto para a sua contabilidade.",
    ],
    fields: [
      { name: "Nome e endereço do fornecedor", note: "Muitas vezes difere do nome fantasia que você tem cadastrado — um Cleaner de consulta pode associá-lo à sua lista de fornecedores." },
      { name: "Número da nota", note: "Tipado como texto, não como número. Zeros à esquerda e prefixos importam e são destruídos pela conversão numérica." },
      { name: "Datas de emissão e vencimento", note: "Os formatos variam por país. Um Cleaner de data normaliza DD/MM e MM/DD para um único formato de saída." },
      { name: "Itens de linha", note: "Uma tabela repetida: descrição, quantidade, preço unitário, valor. A parte que a maioria das ferramentas pula ou achata." },
      { name: "Subtotal, impostos, desconto, total", note: "Vale extrair os quatro para que a conta possa ser conferida em vez de aceita na confiança." },
      { name: "Moeda", note: "Um Cleaner de moeda pode convertê-la para a sua moeda de reporte ao mesmo tempo." },
      { name: "Número do pedido de compra", note: "Quando presente, é o que permite conciliar a nota com um pedido de compra automaticamente." },
    ],
    gotchas: [
      {
        title: "Os itens de linha são onde a extração costuma falhar",
        body: "Os campos do cabeçalho são fáceis. Uma tabela que atravessa uma quebra de página, tem células mescladas ou espalha descrições por duas linhas é onde a maioria das ferramentas devolve algo plausível e errado. Os campos de tabela de um Flow tratam linhas repetidas como linhas, então uma nota com cinco itens devolve cinco registros, e não um bloco de texto.",
      },
      {
        title: "Um total errado parece exatamente igual a um certo",
        body: "Não há diferença visual entre um €1.240,00 lido corretamente e um €1.240,00 lido errado que na verdade era €1.249,00. Este é o argumento a favor da revisão condicional: uma regra de Cleaner pode conferir se os itens somam o subtotal e mandar só as falhas para uma pessoa, para você não precisar revisar tudo para pegar as poucas que importam.",
      },
      {
        title: "Várias notas chegam em um só PDF",
        body: "Um extrato de fornecedor ou um lote digitalizado muitas vezes traz várias notas em um único arquivo. Um Splitter as separa primeiro, para que cada uma vire sua própria execução, com seu próprio registro extraído, em vez de uma confusão mesclada.",
      },
    ],
    pipeline: [
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Os fornecedores já mandam notas por e-mail. Encaminhe automaticamente a caixa de contas a pagar e cada anexo é processado sem ninguém abrir o app." },
      { label: "Splitters", href: "/docs/splitters", why: "Separa digitalizações em lote ou grampeadas em notas individuais antes da extração." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza datas, converte moedas, associa fornecedores à sua lista e sinaliza contas que não fecham." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Retém uma execução para aprovação — toda nota, ou só as que uma regra sinalizou — com um registro imutável de quem aprovou o quê." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Envia o registro aprovado direto para o seu sistema contábil assim que passa pela revisão." },
    ],
    faqs: [
      { q: "Funciona com notas digitalizadas e fotografadas?", a: "Sim. Digitalizações, fotos e PDFs de imagem passam por OCR antes da extração. A qualidade ainda importa — uma digitalização nítida é extraída com mais confiabilidade que uma foto de celular tirada de lado —, e é para os casos limítrofes que existe a revisão." },
      { q: "Preciso configurar um modelo por fornecedor?", a: "Não. Você define os campos que quer uma única vez, e o mesmo Flow lê notas de qualquer fornecedor em qualquer layout. Adicionar um fornecedor novo não exige nenhuma configuração." },
      { q: "Ele extrai os itens de linha, e não só os totais?", a: "Sim. Os itens de linha são definidos como campos de tabela, então uma tabela repetida devolve um registro por linha, com descrição, quantidade, preço unitário e valor tipados separadamente." },
      { q: "Como ele lida com moedas diferentes?", a: "A moeda é extraída como um campo próprio, e um Cleaner pode converter os valores para a sua moeda de reporte durante o processamento, para que os sistemas seguintes recebam uma unidade consistente." },
    ],
  },
  {
    slug: "contract-analysis",
    label: "Análise de contratos",
    badge: "Jurídico e Compras",
    h1: "Extração de dados de contratos",
    title: "Extração de dados de contratos — cláusulas e datas de renovação",
    description:
      "Tire partes, datas de vigência e de renovação, condições de pagamento, prazos de aviso prévio e limites de responsabilidade de uma carteira de contratos e coloque tudo em uma tabela que você consegue consultar.",
    summary:
      "Partes, datas de renovação, prazos de aviso prévio e condições de pagamento extraídos de uma carteira de contratos para uma tabela consultável.",
    lede: "O Tavnit lê contratos assinados e devolve as cláusulas que geram obrigações — partes, datas de vigência e de renovação, prazos de aviso prévio, condições de pagamento, limites de responsabilidade — como campos estruturados. A carteira vira uma tabela que você consulta, em vez de uma pasta que você precisa ler.",
    problem: [
      "A maioria das organizações não consegue responder perguntas básicas sobre os próprios contratos. Quais acordos renovam automaticamente no próximo trimestre? Qual é a nossa exposição total de responsabilidade? Quais fornecedores têm aviso prévio de 90 dias? As respostas existem, espalhadas por centenas de PDFs que ninguém tem tempo de abrir.",
      "O custo não é a leitura — são as renovações que passam despercebidas e as cláusulas descobertas durante uma disputa, e não antes dela.",
    ],
    fields: [
      { name: "Partes e entidades signatárias", note: "A pessoa jurídica muitas vezes não é o nome fantasia, e vale capturar os dois." },
      { name: "Datas de início de vigência e de término", note: "O par que move todas as perguntas sobre renovação que você vai querer fazer depois." },
      { name: "Renovação automática e aviso prévio", note: "Os dois campos que decidem se uma renovação é uma escolha ou uma surpresa." },
      { name: "Condições e valores de pagamento", note: "30 dias, marcos, reajustes. Frequentemente em texto corrido, não em tabela." },
      { name: "Limite de responsabilidade e indenizações", note: "Normalmente uma cláusula, não um número. Vale extrair como texto mais um valor interpretado, quando existir." },
      { name: "Lei aplicável e foro", note: "Curto, fácil de extrair e tedioso de encontrar manualmente em uma carteira inteira." },
      { name: "Direitos de rescisão", note: "Imotivada, motivada, e o aviso prévio que cada uma exige." },
    ],
    gotchas: [
      {
        title: "A resposta está no texto, não em um campo",
        body: "Uma nota fiscal coloca o total em uma caixa. Um contrato enterra o prazo de aviso prévio no meio de uma cláusula, às vezes por extenso em vez de em algarismos. As dicas de extração permitem dizer ao Flow o que a cláusula significa e onde ela costuma aparecer, em vez de torcer para que um rótulo coincida.",
      },
      {
        title: "Aditivos mudam a resposta",
        body: "As condições vigentes muitas vezes estão em um aditivo, não no original. Trate cada documento como sua própria execução e guarde a data de assinatura como campo, para que a posição atual seja uma consulta, e não uma suposição sobre qual arquivo é o mais recente.",
      },
      {
        title: "Errar aqui custa caro, então a revisão não é opcional",
        body: "Uma data de renovação lida errado é um contrato do qual você não saiu a tempo. Este é um caso em que revisar todas as execuções é proporcional, e em que a trilha de auditoria imutável importa tanto quanto a extração — você consegue mostrar quem confirmou cada cláusula e quando.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "As dicas de extração dizem à IA o que uma cláusula significa, o que importa muito mais aqui do que em documentos com campos rotulados." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Revisão em todas as execuções, com um registro permanente de quem confirmou cada cláusula." },
      { label: "Buckets", href: "/docs/buckets", why: "Transforma a carteira em uma tabela consultável — quais acordos renovam no próximo trimestre, ordenados por prazo de aviso." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza formatos de data e pode calcular o prazo de aviso a partir da data de término e do aviso prévio." },
    ],
    faqs: [
      { q: "Funciona com contratos sem estrutura consistente?", a: "Sim — esse é o caso normal. Não há modelo para configurar. Você descreve as cláusulas que quer e o Flow as localiza onde quer que apareçam, e é por isso que as dicas de extração importam mais aqui do que em documentos estruturados." },
      { q: "E os aditivos e cartas complementares?", a: "Processe cada um como sua própria execução, com a data de assinatura capturada como campo. A posição atual passa então a vir de uma consulta ao seu Bucket, e não de adivinhar qual PDF é o mais recente." },
      { q: "Os dados extraídos podem ser consultados?", a: "Sim. Os resultados chegam a um Bucket como colunas tipadas, então você pode filtrar, ordenar e criar gráficos sobre a carteira inteira sem exportar nada." },
    ],
  },
  {
    slug: "resume-screening",
    label: "Triagem de currículos",
    badge: "RH e Recrutamento",
    h1: "Leitura e triagem de currículos",
    title: "Software de leitura de currículos — dados de candidatos estruturados",
    description:
      "Transforme currículos em qualquer formato em registros de candidatos consistentes — contato, habilidades, cargos, datas, formação — para que a triagem seja um filtro, não uma leitura.",
    summary:
      "Currículos em qualquer formato transformados em registros de candidatos consistentes, para que a triagem vire um filtro e não uma leitura.",
    lede: "O Tavnit lê currículos em qualquer layout e devolve registros de candidatos consistentes: dados de contato, habilidades, cargos com datas, formação e certificações. Como todo candidato é descrito nos mesmos campos, a triagem passa a ser filtrar uma tabela em vez de abrir duzentos PDFs.",
    problem: [
      "Currículos são o documento menos padronizado que a maioria das equipes lida. Uma coluna ou duas, tabelas ou texto corrido, um layout de designer com as datas numa barra lateral. Uma pessoa lê qualquer um deles; um software normalmente lê mais ou menos a metade.",
      "O custo real é a inconsistência. Quando cem currículos são resumidos cada um de um jeito ligeiramente diferente, comparar candidatos pelos mesmos critérios deixa de ser possível, e a triagem silenciosamente vira quem o primeiro revisor achou mais simpático.",
    ],
    fields: [
      { name: "Nome e dados de contato", note: "Frequentemente num cabeçalho, numa barra lateral ou numa imagem — uma das falhas de extração mais comuns." },
      { name: "Cargos com empregadores e datas", note: "Uma tabela repetida, não um valor único. Os campos de tabela mantêm cada cargo como uma linha própria." },
      { name: "Total de anos de experiência", note: "Raramente declarado. Um Cleaner de fórmula pode calculá-lo a partir das datas dos cargos em vez de confiar no que está escrito." },
      { name: "Habilidades", note: "Melhor extraídas literalmente e depois normalizadas — um Cleaner de categoria pode mapear 'JS', 'JavaScript' e 'ES6' para um único valor." },
      { name: "Formação e certificações", note: "Instituição, titulação, ano. Outra estrutura repetida." },
      { name: "Localização e autorização de trabalho", note: "Muitas vezes o primeiro filtro eliminatório, e muitas vezes escondido no cabeçalho." },
    ],
    gotchas: [
      {
        title: "Layouts de duas colunas quebram leitores ingênuos",
        body: "Um currículo de designer com barra lateral, lido de cima para baixo, vira um emaranhado sem sentido para qualquer ferramenta que faça extração simples de texto. A extração sensível ao layout mantém a barra lateral e a coluna principal separadas, e é por isso que os dados de contato numa barra lateral ainda caem no campo certo.",
      },
      {
        title: "Sem normalizar as habilidades, o filtro é inútil",
        body: "Extraídas literalmente, você obtém 'JS', 'JavaScript', 'Javascript (ES6)' e 'JAVASCRIPT' como quatro valores distintos, e filtrar por qualquer um deles deixa os outros de fora. Um Cleaner de categoria mapeia as variantes para um vocabulário controlado, para que o filtro de fato devolva todos os qualificados.",
      },
      {
        title: "São dados pessoais, e as regras são mais rígidas",
        body: "Currículos são dados pessoais por definição, e em várias jurisdições os dados de candidatos têm prazos de retenção e direito à eliminação. A visibilidade dos Buckets e as permissões de acesso por usuário permitem manter os registros de candidatos restritos a quem conduz o processo, em vez de visíveis para toda a organização.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Os campos de tabela mantêm cada cargo e cada formação como uma linha própria, e não como um bloco de texto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza nomes de habilidades para um vocabulário controlado e calcula a experiência total a partir das datas dos cargos." },
      { label: "Buckets", href: "/docs/buckets", why: "Registros de candidatos como uma tabela filtrável, com acesso por Bucket para que os dados dos candidatos não fiquem visíveis para toda a organização." },
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Candidaturas que chegam por e-mail são processadas assim que chegam, com anexos e tudo." },
    ],
    faqs: [
      { q: "Funciona com currículos de duas colunas e com design elaborado?", a: "Sim. A extração é sensível ao layout, em vez de ler o texto bruto de cima para baixo, então barras laterais e layouts de várias colunas não se misturam num emaranhado sem sentido." },
      { q: "Ele consegue padronizar os nomes das habilidades?", a: "Sim. Extraia literalmente e depois use um Cleaner de categoria para mapear as variantes para um vocabulário controlado, para que filtrar por uma habilidade devolva todos os candidatos que a têm." },
      { q: "Como os dados dos candidatos ficam protegidos?", a: "Os Buckets podem ser privados em vez de visíveis para a organização, com permissões de Viewer ou Editor por usuário. Os registros de candidatos ficam restritos a quem conduz o processo." },
    ],
  },
  {
    slug: "expense-reports",
    label: "Relatórios de despesas",
    badge: "Finanças e Colaboradores",
    h1: "Processamento de recibos e relatórios de despesas",
    title: "OCR de recibos e automação de relatórios de despesas",
    description:
      "Transforme recibos fotografados em linhas de despesa categorizadas — estabelecimento, data, valor, impostos e categoria — para que o reembolso seja uma revisão, não digitação.",
    summary:
      "Recibos fotografados transformados em linhas de despesa categorizadas, para que o reembolso seja uma revisão e não digitação.",
    lede: "O Tavnit lê recibos — inclusive os amassados, fotografados com pouca luz — e devolve estabelecimento, data, valor, impostos e categoria como campos tipados. As despesas chegam categorizadas e verificáveis, então aprovar um relatório é uma revisão, e não um trabalho de transcrição.",
    problem: [
      "O processamento de despesas falha nas duas pontas. Os colaboradores adiam o envio porque preencher o formulário é chato, e o financeiro depois redigita o que foi enviado porque o formulário foi preenchido de forma inconsistente. Os reembolsos atrasam, e ninguém gosta de nenhuma parte disso.",
      "Os recibos também são os documentos de pior qualidade que a maioria das empresas processa: papel térmico desbotado, fotografado de lado, dobrado, às vezes em parte em outro idioma.",
    ],
    fields: [
      { name: "Nome do estabelecimento", note: "Muitas vezes um logotipo estilizado em vez de texto — um dos campos mais difíceis de um recibo." },
      { name: "Data e hora da transação", note: "A hora importa mais do que se imagina para diárias e para detectar duplicatas." },
      { name: "Total, impostos e gorjeta", note: "Separar os impostos importa para a recuperação; separar a gorjeta importa para a política." },
      { name: "Meio de pagamento e últimos quatro dígitos", note: "O que permite conciliar automaticamente com a fatura do cartão." },
      { name: "Categoria da despesa", note: "Melhor inferida por um Cleaner de categoria com IA a partir do estabelecimento e dos itens do que perguntada ao colaborador." },
      { name: "Moeda", note: "Despesas de viagem chegam na moeda em que foram gastas; a conversão é tarefa do pipeline." },
    ],
    gotchas: [
      {
        title: "A qualidade dos recibos é realmente ruim",
        body: "Papel térmico desbotado, reflexos, dobras e ângulos são a regra, não a exceção. A extração dá conta da maior parte, mas este é um tipo de documento em que a revisão condicional faz sentido: sinalize valores de baixa confiança ou fora da política para uma pessoa e deixe os limpos passarem.",
      },
      {
        title: "Categorizar é o trabalho de verdade",
        body: "Ler o total é fácil. Decidir se uma conta de restaurante é entretenimento de cliente ou almoço da equipe é a parte que consome o tempo do financeiro. Um Cleaner de categoria com IA atribui uma categoria a partir do estabelecimento e dos itens, para que o colaborador não precise adivinhar e o financeiro corrija em vez de classificar.",
      },
      {
        title: "Duplicatas são comuns e caras",
        body: "O mesmo recibo enviado duas vezes — uma fotografado, outra como PDF do estabelecimento — é uma fonte rotineira de reembolso a mais. Extrair estabelecimento, valor exato e horário dá o suficiente para detectá-lo no Bucket, em vez de descobri-lo numa auditoria.",
      },
    ],
    pipeline: [
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Os colaboradores encaminham recibos para um endereço em vez de aprender um app. Recibos digitais podem ser encaminhados automaticamente assim que chegam." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Atribui uma categoria com IA, converte moeda estrangeira e padroniza os nomes dos estabelecimentos." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Revisão condicional — só despesas acima de um limite ou fora da política chegam a um aprovador." },
      { label: "Buckets", href: "/docs/buckets", why: "As despesas como uma tabela que você pode agrupar, transformar em gráficos e verificar em busca de duplicatas antes de pagar." },
    ],
    faqs: [
      { q: "Ele consegue ler a foto de um recibo amassado?", a: "Normalmente, sim. Fotos, papel térmico desbotado e recibos dobrados passam por OCR, embora a qualidade defina o limite — e é por isso que existe a revisão condicional para aqueles de que o pipeline tem menos certeza." },
      { q: "As despesas podem ser categorizadas automaticamente?", a: "Sim. Um Cleaner de categoria com IA atribui uma categoria a partir do estabelecimento e dos itens, então o financeiro corrige um ou outro caso limítrofe em vez de classificar tudo." },
      { q: "E a moeda estrangeira nas despesas de viagem?", a: "A moeda é um campo extraído à parte, e um Cleaner de conversão pode expressar os valores na sua moeda de reporte durante o processamento." },
    ],
  },
  {
    slug: "purchase-orders",
    label: "Pedidos de compra",
    badge: "Compras e Contas a Pagar",
    h1: "Software de conciliação com pedidos de compra: concilie notas fiscais com pedidos automaticamente",
    title: "Conciliação automática de notas fiscais com pedidos de compra",
    description:
      "Software de conciliação com pedidos de compra: extraia pedidos e notas fiscais para os mesmos campos, pareie os itens automaticamente e mande só as divergências para um revisor.",
    summary:
      "Pedidos de compra e notas fiscais extraídos para o mesmo formato, pareados linha a linha, com só as divergências enviadas a um revisor.",
    lede: "O Tavnit lê pedidos de compra e as notas fiscais que vêm depois deles, extrai número do pedido, fornecedor, SKUs, quantidades e preços como campos tipados e pareia automaticamente as linhas da nota com as linhas do pedido — mesmo quando o fornecedor descreve o item de outro jeito. A conciliação no nível do cabeçalho é uma consulta pelo número do pedido; a conciliação linha a linha é uma comparação feita por um Matcher; o que não bate vai para um revisor designado, e não para a sua contabilidade.",
    problem: [
      "Conciliar com o pedido de compra é conferir se o que foi cobrado é o que foi pedido. Na maioria das equipes isso ainda é feito no olho: um analista de contas a pagar abre o PDF da nota, encontra o pedido e compara quantidades e preços linha a linha. É lento, e é por onde passam os dois erros caros — uma quantidade errada e um preço unitário errado —, porque eles parecem exatamente iguais aos certos.",
      "As ferramentas de conciliação automática dos ERPs presumem que os dois documentos já estão estruturados. Não estão. O pedido saiu do seu sistema, mas a nota saiu do sistema do fornecedor, em PDF, com os códigos de peça e o layout dele. Colocá-la num formato comparável é a metade não resolvida do problema, e é a metade que o Tavnit resolve.",
    ],
    fields: [
      { name: "Número do pedido de compra", note: "A chave em que tudo se une. Extraia como texto — prefixos e zeros à esquerda são significativos, e os fornecedores o colocam em lugares diferentes da nota." },
      { name: "Fornecedor e comprador", note: "O nome que o fornecedor usa na nota raramente coincide literalmente com o cadastro. Um Cleaner de consulta o resolve para o seu código de fornecedor." },
      { name: "Itens de linha: descrição, SKU, quantidade", note: "Uma tabela repetida nos dois documentos. Os códigos de peça do fornecedor costumam diferir dos seus; as descrições mudam de redação — é isso que torna difícil conciliar as linhas." },
      { name: "Preço unitário e valor da linha", note: "Os dois, para que preço unitário × quantidade possa ser verificado na própria nota antes de compará-la com o pedido." },
      { name: "Totais da nota e do pedido", note: "Conciliação no nível do cabeçalho. Um total que bate enquanto uma linha diverge é uma troca entre quantidade e preço — o caso que uma conferência só de totais deixa passar." },
      { name: "Data de entrega e referência da nota de entrega", note: "O terceiro documento de uma conciliação de três vias. As notas de entrega são extraídas do mesmo jeito; veja a página de notas de entrega." },
      { name: "Condições de pagamento e moeda", note: "Campos curtos com consequências enormes quando a nota diverge do pedido." },
    ],
    gotchas: [
      {
        title: "Duas vias, três vias: a conciliação só funciona se os formatos coincidirem",
        body: "A conciliação de duas vias compara a nota com o pedido; a de três vias acrescenta o comprovante de recebimento. As duas desmoronam quando os documentos são extraídos com nomes de campo diferentes. Passar pedidos, notas fiscais e notas de entrega por Flows que compartilham o mesmo esquema de campos — número do pedido, SKU, quantidade, preço unitário — é o que transforma a conciliação numa comparação, e não na leitura de um documento.",
      },
      {
        title: "Os códigos de peça do fornecedor não são os seus",
        body: "O pedido lista o seu SKU; a nota lista o do fornecedor. Um Cleaner de consulta mapeia os códigos do fornecedor para os seus SKUs com base nos seus dados de referência durante o processamento, então a nota já chega traduzida. Onde não há referência, um Matcher pareia as linhas pelo significado da descrição — semântico, não exato —, com um LLM como desempate nos pares duvidosos.",
      },
      {
        title: "Conciliação linha a linha, não só de totais",
        body: "Defina a execução do pedido como referência e a nota como a execução comparada com ela. O Matcher pareia cada linha da nota com uma linha do pedido e coloca quantidade e preço unitário lado a lado, listando as linhas sem par como alertas em vez de descartá-las em silêncio. Uma conferência só de totais aprovaria uma nota que cobrou o valor certo pelos itens errados.",
      },
      {
        title: "Só as exceções devem chegar a uma pessoa",
        body: "Revisar todas as notas recria o processo manual. Um Cleaner de fórmula verifica se preço unitário × quantidade é igual ao valor da linha na própria nota, e uma condição sinaliza as linhas fora da sua tolerância. A revisão humana só é acionada para as execuções sinalizadas, então o revisor vê as três notas que divergem, não as trezentas que batem.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Os fornecedores mandam pedidos, notas fiscais e notas de entrega para um único endereço. As Collections classificam cada documento e o encaminham ao Flow certo." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Mapeia códigos de peça e nomes de fornecedores para os seus dados mestres por consulta, verifica a aritmética das linhas e sinaliza valores fora da tolerância." },
      { label: "Buckets", href: "/docs/buckets", why: "Guarda pedidos e notas no mesmo formato, então a conciliação no nível do cabeçalho é uma consulta pelo número do pedido." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Só as notas sinalizadas ficam pausadas para um revisor designado, com trilha de auditoria imutável de quem aprovou o quê." },
      { label: "Integração por API", href: "/docs/api-integration", why: "Envia as notas conciliadas e aprovadas para o seu ERP ou sistema de contas a pagar sem etapa manual." },
    ],
    faqs: [
      { q: "O que é a conciliação com o pedido de compra?", a: "É a conferência de que uma nota fiscal está de acordo com o pedido de compra que ela cobra — mesmo fornecedor, mesmos itens, mesmas quantidades e preços. A conciliação de duas vias compara a nota com o pedido; a de três vias também confere o comprovante de recebimento. É o controle que impede que um fornecedor receba por algo que não foi pedido ou não foi entregue." },
      { q: "O Tavnit consegue conciliar notas fiscais com pedidos de compra automaticamente?", a: "Sim. Extraia os dois para a mesma estrutura de campos e a conciliação no nível do cabeçalho vira uma consulta pelo número do pedido no seu Bucket. Para a conciliação linha a linha, um Matcher no modo de referência toma o pedido como base e pareia cada linha da nota com ele, mostrando quantidade e preço unitário lado a lado. As linhas que não podem ser pareadas aparecem como alertas." },
      { q: "E se o fornecedor usar os próprios códigos de peça ou descrições?", a: "Um Cleaner de consulta mapeia os códigos do fornecedor para os seus SKUs durante o processamento, quando você tem dados de referência. Quando não tem, o Matcher pareia as linhas pelo significado da descrição e não pelo texto exato, com um LLM como desempate nos pares duvidosos, então \"Blue widget 10pk\" e \"WIDGET-BLU x10\" caem na mesma linha." },
      { q: "O que acontece quando uma nota não bate?", a: "Ela para. Um Cleaner de condição sinaliza a execução e a revisão humana a encaminha para um revisor designado, que vê a nota, os valores extraídos e a divergência. As notas que batem seguem direto para o seu ERP por API ou webhook. Cada visualização, edição e aprovação é gravada numa trilha de auditoria imutável." },
      { q: "Ele faz conciliação de três vias com notas de entrega?", a: "As notas de entrega e os comprovantes de recebimento são extraídos do mesmo jeito que pedidos e notas fiscais — inclusive quantidades escritas à mão em comprovantes assinados — para o mesmo formato de campos, então a terceira perna da conciliação é uma terceira execução comparada com o pedido." },
      { q: "Precisamos trocar de ERP?", a: "Não. O Tavnit fica na frente dele: os documentos chegam por e-mail ou API, são extraídos e conciliados, e os resultados aprovados são entregues ao seu ERP ou sistema de contas a pagar por API REST ou webhook. Existem receitas para Zapier, Make e n8n para equipes que preferem não escrever código." },
      { q: "Os itens de linha vêm separados?", a: "Sim. Os itens de linha são campos de tabela, então cada linha devolve SKU, descrição, quantidade, preço unitário e valor da linha como valores tipados separados — o que é justamente o que torna possível comparar linha a linha." },
    ],
  },
  {
    slug: "customs-trade",
    label: "Aduana e comércio exterior",
    badge: "Logística e Comércio Exterior",
    h1: "Automação de documentos aduaneiros",
    title: "Automação aduaneira com classificação de códigos SH",
    description:
      "Extraia faturas comerciais, romaneios e conhecimentos de embarque e classifique as mercadorias nos códigos tarifários SH durante o processamento, e não depois dele.",
    summary:
      "Faturas comerciais, romaneios e conhecimentos de embarque extraídos — com a classificação tarifária SH integrada ao pipeline.",
    lede: "O Tavnit lê a documentação aduaneira — faturas comerciais, romaneios, conhecimentos de embarque, certificados de origem — e devolve exportador, consignatário, descrição das mercadorias, pesos e valores como campos tipados. Um Cleaner de código SH classifica as mercadorias nos códigos tarifários durante o processamento, então as declarações são preparadas a partir de dados estruturados, e não redigitadas.",
    problem: [
      "Um único embarque gera uma pilha de documentos que repetem os mesmos fatos em layouts diferentes, e uma declaração aduaneira exige que eles estejam conciliados e corretos. O trabalho é transcrição mais classificação, feito sob pressão de tempo, em que um erro significa um embarque atrasado ou uma multa.",
      "A classificação é a parte especializada. Decidir o código tarifário de uma descrição é um trabalho de julgamento que a maioria das ferramentas de extração nem tenta, deixando-o como uma etapa manual depois que a automação termina.",
    ],
    fields: [
      { name: "Exportador e consignatário", note: "Nomes jurídicos e endereços completos, que movem a declaração." },
      { name: "Descrição das mercadorias por linha", note: "O texto de onde a classificação tarifária é derivada — vale extraí-lo literalmente." },
      { name: "Código tarifário SH", note: "Classificado a partir da descrição por um Cleaner durante o processamento, e não pesquisado depois." },
      { name: "Quantidade, peso líquido e bruto", note: "Os pesos estão no romaneio e os valores na fatura, então os dois precisam ser conciliados." },
      { name: "País de origem", note: "Define alíquotas e tratamento preferencial. Muitas vezes vem por linha, e não por embarque." },
      { name: "Incoterms e valor declarado", note: "Determinam o que é tributável e quem responde pelo quê." },
      { name: "Números do contêiner e do B/L", note: "As chaves que permitem amarrar o conjunto de documentos a um único embarque." },
    ],
    gotchas: [
      {
        title: "A classificação é a parte difícil, e ela vem integrada",
        body: "A maioria das ferramentas de documentos para na extração e deixa a classificação tarifária como trabalho manual. O Tavnit traz um Cleaner de código SH que classifica as mercadorias a partir da descrição extraída durante a execução, então a etapa especializada acontece dentro do pipeline, e não depois dele.",
      },
      {
        title: "Um embarque, vários documentos, uma verdade",
        body: "A fatura comercial traz os valores, o romaneio traz os pesos, o conhecimento de embarque traz o contêiner. Uma Collection encaminha cada tipo de documento ao seu próprio Flow, e um Bucket compartilhado, com a referência do embarque como chave, os reúne num único retrato.",
      },
      {
        title: "Aqui erros são multas, não correções",
        body: "Um código ou valor declarado errado é um problema aduaneiro, não contábil. Este é um caso em que revisar todas as declarações é proporcional, e em que a trilha de auditoria imutável é realmente útil quando pedem para você mostrar como chegou a uma classificação.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Encaminha faturas, romaneios e conhecimentos de embarque de uma única caixa de entrada para o Flow certo, automaticamente." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Classifica as mercadorias nos códigos tarifários SH, converte moedas e padroniza pesos e unidades." },
      { label: "Splitters", href: "/docs/splitters", why: "A documentação do embarque costuma chegar num único PDF combinado. Os Splitters a separam antes da extração." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Revise cada declaração antes do registro, com o histórico de quem aprovou cada classificação." },
    ],
    faqs: [
      { q: "Ele realmente atribui códigos tarifários SH?", a: "Sim. Um Cleaner de código SH classifica as mercadorias a partir da descrição extraída durante a execução, então a classificação acontece dentro do pipeline, e não como uma etapa manual depois. As declarações continuam sendo responsabilidade sua, e por isso recomendamos a revisão antes do registro." },
      { q: "Ele dá conta do conjunto completo de documentos de um embarque?", a: "Sim. Uma Collection encaminha faturas comerciais, romaneios e conhecimentos de embarque para os seus próprios Flows, e os resultados, com a referência do embarque como chave, se reúnem num único registro." },
      { q: "E se a documentação chegar num único PDF combinado?", a: "Um Splitter primeiro separa o arquivo combinado nos documentos que o compõem, para que cada um seja extraído pelo Flow feito para ele." },
    ],
  },
  {
    slug: "bank-statements",
    label: "Extratos bancários",
    badge: "Finanças e Crédito",
    h1: "Extração de dados de extratos bancários",
    title: "Extração de extratos bancários — de PDF para linhas de transação",
    description:
      "Transforme PDFs de extrato de qualquer banco em linhas de transação — data, descrição, valor, saldo — prontas para conciliar ou analisar.",
    summary: "PDFs de extrato de qualquer banco transformados em linhas de transação que você pode conciliar, categorizar ou analisar.",
    lede: "O Tavnit lê PDFs de extratos bancários de qualquer instituição e devolve cada transação como uma linha: data, descrição, débito ou crédito e saldo. Como o saldo também é extraído, a conta pode ser conferida em vez de presumida — e é isso que torna o resultado seguro para conciliar.",
    problem: [
      "Cada banco formata os extratos de um jeito, e nenhum deles formata para máquinas. Colunas mudam de lugar, transações quebram em duas linhas, e o saldo é a única coisa que amarra a sequência. Quem faz análise de crédito, contabilidade ou conciliação acaba redigitando ou pagando por um conector por banco.",
      "O open banking resolve isso onde está disponível e o cliente consente. Para todo o resto — períodos históricos, contas empresariais, bancos sem API, extratos apresentados como comprovante — o PDF é a única fonte que existe.",
    ],
    fields: [
      { name: "Titular, número da conta e agência", note: "Normalmente só na primeira página, então precisa ser levado adiante num extrato de várias páginas." },
      { name: "Período do extrato", note: "Define o que os totais significam, e é o que mais falta quando alguém redigita à mão." },
      { name: "Data da transação", note: "Muitas vezes abreviada e sem ano — o ano vem do período do extrato, não da linha." },
      { name: "Descrição ou contraparte", note: "Truncada e abreviada pelo banco. Um Cleaner de categoria infere estabelecimento e tipo a partir dela." },
      { name: "Débito, crédito e saldo", note: "Extraia os três. O saldo é o que permite verificar que nenhuma linha se perdeu." },
      { name: "Saldo inicial e final", note: "O dígito verificador do extrato inteiro." },
    ],
    gotchas: [
      {
        title: "Uma linha perdida é invisível sem o saldo",
        body: "Se a extração perder uma transação, as linhas restantes continuam parecendo perfeitamente plausíveis. Extrair o saldo transforma isso num erro detectável: um Cleaner de fórmula pode verificar se o saldo de cada linha é igual ao saldo anterior mais o movimento e sinalizar o extrato em vez de deixá-lo passar.",
      },
      {
        title: "Transações quebram de linha, e a continuação não é uma transação nova",
        body: "Nomes longos de contraparte transbordam para uma segunda linha, e uma leitura ingênua de tabela transforma um pagamento em duas linhas com um valor em branco. Os campos de tabela tratam uma linha como uma linha, então uma descrição quebrada continua presa ao seu valor.",
      },
      {
        title: "As datas raramente trazem o ano",
        body: "A maioria dos extratos imprime '14 mar' e conta com o período no topo para o ano. Isso serve para uma pessoa e está errado para um banco de dados — principalmente na virada do ano, num extrato de janeiro. Extraia o período do extrato e derive a data completa a partir dele com um Cleaner de fórmula.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "As transações são campos de tabela, então cada uma volta como uma linha tipada própria, e não como um bloco de texto." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Deriva datas completas a partir do período do extrato, verifica os saldos e categoriza as contrapartes." },
      { label: "Buckets", href: "/docs/buckets", why: "As transações chegam como uma tabela consultável — filtre por contraparte, agrupe por mês, faça o gráfico do saldo." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Encaminha a uma pessoa só os extratos que falham na conferência de saldo, em vez de revisar todos." },
    ],
    faqs: [
      { q: "Funciona com qualquer banco?", a: "Sim. Não há modelo por banco para configurar — o mesmo Flow lê extratos de qualquer instituição, inclusive contas empresariais e períodos históricos que uma API de open banking não cobriria." },
      { q: "Como sei que nenhuma transação ficou de fora?", a: "Extraia o saldo junto com cada transação e use um Cleaner de fórmula para verificar se cada linha fecha com a anterior. Um extrato que falha na conferência é sinalizado em vez de passar em silêncio." },
      { q: "As transações podem ser categorizadas automaticamente?", a: "Sim. Um Cleaner de categoria com IA atribui uma categoria a partir da descrição, então a contabilidade parte de linhas classificadas, e não do texto bruto do banco." },
    ],
  },
  {
    slug: "supplier-quotes",
    label: "Cotações de fornecedores",
    badge: "Compras e Sourcing",
    h1: "Comparação de cotações de fornecedores",
    title: "Compare cotações de fornecedores e faça benchmark de preços",
    description:
      "Extraia os itens de cotações concorrentes e compare-os automaticamente — associando itens equivalentes entre fornecedores e apontando o melhor preço por linha.",
    summary: "Cotações concorrentes extraídas e comparadas linha a linha, com o melhor preço apontado por item.",
    lede: "O Tavnit extrai os itens de cotações concorrentes de fornecedores, e depois os Matchers pareiam itens equivalentes entre fornecedores e apontam um vencedor por linha pelo preço. Você recebe uma tabela comparativa, em vez de três PDFs e uma planilha montada à mão.",
    problem: [
      "Comparar cotações é a parte do sourcing que nunca fica mais fácil. Três fornecedores mandam três layouts, descrevem o mesmo item de três jeitos diferentes e cotam tamanhos de embalagem diferentes. Alguém monta uma planilha, redigita tudo e torce para ter associado as linhas certas.",
      "A associação é a dificuldade real. 'M8 hex bolt 50mm', 'Bolt, hex, M8x50' e 'HEX BOLT M8 50MM zinc' são o mesmo item, e nenhuma consulta por correspondência exata vai pareá-los.",
    ],
    fields: [
      { name: "Identificação do fornecedor", note: "O campo que nomeia cada participante da comparação. Uma cotação, um fornecedor." },
      { name: "Descrição do item", note: "O texto que é associado entre fornecedores. Extraia-o literalmente — normalizar cedo demais destrói o sinal de que a associação precisa." },
      { name: "Preço unitário", note: "O campo numérico que decide o vencedor. Entradas não numéricas como 'sob consulta' são excluídas e reportadas, e não ignoradas em silêncio." },
      { name: "Quantidade e unidade de medida", note: "Usadas como contexto da associação, para que um pacote com 12 não seja pareado com uma unidade avulsa." },
      { name: "Prazo de entrega", note: "Muitas vezes o fator decisivo quando os preços estão próximos, e raramente capturado em comparações manuais." },
      { name: "Validade e condições de pagamento", note: "Uma cotação mais barata com condições piores nem sempre é mais barata." },
    ],
    gotchas: [
      {
        title: "O mesmo item nunca é descrito do mesmo jeito duas vezes",
        body: "É por isso que a correspondência exata falha e que a comparação continua manual em quase todo lugar. Os Matchers pareiam as linhas semanticamente, e não por igualdade de texto, com um LLM como desempate nos pares ambíguos, então descrições redigidas de forma diferente para o mesmo item continuam se alinhando.",
      },
      {
        title: "O tamanho da embalagem quebra uma comparação em silêncio",
        body: "Uma cotação para uma caixa com 12 contra uma cotação para uma unidade não é uma diferença de preço, é um erro de unidade — e é o erro que sobrevive à revisão, porque os dois números parecem razoáveis. Os campos de contexto permitem incluir quantidade e unidade de medida na associação, para que itens diferentes continuem sem par em vez de produzirem um vencedor errado.",
      },
      {
        title: "Nem toda linha tem um preço comparável",
        body: "As cotações trazem 'sob consulta', 'incluso' e células em branco. Em vez de descartar essas linhas discretamente, a comparação as exclui da disputa e registra um alerta na linha, para que você veja o que não foi comparado em vez de presumir que tudo foi.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Um único Flow lê o layout da cotação de cada fornecedor para a mesma estrutura de campos — a condição para conseguir compará-las." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converte moedas para que cotações em moedas diferentes sejam comparadas na mesma base." },
      { label: "Buckets", href: "/docs/buckets", why: "Guarda as cotações ao longo do tempo, para que o preço de hoje possa ser conferido com o que o mesmo fornecedor cotou no trimestre passado." },
    ],
    faqs: [
      { q: "Como ele associa itens que cada fornecedor descreve de um jeito?", a: "A associação é semântica, e não exata: as descrições dos itens são comparadas pelo significado, com um LLM resolvendo os pares ambíguos. 'M8 hex bolt 50mm' e 'Bolt, hex, M8x50' formam par sem que você mantenha uma lista de sinônimos." },
      { q: "Posso comparar todos com um único fornecedor de referência em vez de comparar todos entre si?", a: "Sim. O modo de referência trata uma cotação como base e compara todas as outras com ela, o que é o formato certo quando você tem um fornecedor atual e está testando o mercado." },
      { q: "O que acontece com as linhas que não podem ser comparadas?", a: "Linhas com preços não numéricos são excluídas da disputa e registradas como alertas naquela linha, para que as lacunas da comparação fiquem visíveis em vez de escondidas." },
    ],
  },
  {
    slug: "compliance-checks",
    label: "Verificações de compliance",
    badge: "Compliance e Riscos",
    h1: "Verificações de compliance de documentos",
    title: "Checklists automáticos de compliance de documentos",
    description:
      "Verifique um conjunto de documentos com um checklist ramificado — está tudo presente, consistente e dentro da política? — e gere um relatório que você pode entregar a um auditor.",
    summary: "Um conjunto de documentos verificado com um checklist ramificado, gerando um relatório de aprovado/reprovado auditável.",
    lede: "O Inspector do Tavnit verifica um conjunto de documentos com um checklist que você define. Ele encaminha cada arquivo enviado para o espaço esperado, extrai o que as regras precisam e avalia o checklist de forma determinística — então as mesmas evidências sempre produzem o mesmo veredito, com um relatório anexado.",
    problem: [
      "A revisão de compliance costuma ser uma pessoa com um checklist e uma pasta, confirmando que os documentos certos estão presentes, que os valores batem entre eles e que nada venceu. É lenta, é inconsistente entre revisores, e a prova de por que algo foi aprovado é o que essa pessoa lembrar.",
      "O modo de falha normalmente não é um documento esquecido. É um valor que diverge entre dois documentos que ninguém comparou lado a lado.",
    ],
    fields: [
      { name: "Espaços de documentos esperados", note: "O que o conjunto deve conter. A falta de um espaço obrigatório é em si uma constatação, não só uma ausência." },
      { name: "Campos de identidade e de entidade", note: "Os valores que precisam bater entre documentos — nomes, números de registro, endereços." },
      { name: "Datas e vencimentos", note: "Certificados e licenças vencem. Estar dentro da validade é uma regra, não um campo." },
      { name: "Valores e valores declarados", note: "As verificações de consistência entre documentos moram aqui: o valor da fatura bate com o da declaração?" },
      { name: "Presença de assinaturas e carimbos", note: "Presença, não conteúdo, e uma das verificações manuais mais comuns." },
      { name: "Resultado do checklist por item", note: "Aprovado, reprovado ou não se aplica, por regra, com o valor que o determinou." },
    ],
    gotchas: [
      {
        title: "A verificação de verdade é entre documentos, não dentro de um",
        body: "Qualquer ferramenta consegue ler um valor de um certificado. A constatação que importa é que o valor do certificado diverge do valor da fatura. Como uma inspeção reúne o conjunto inteiro antes de avaliar, as regras do checklist podem comparar entre documentos, e não só dentro de cada um.",
      },
      {
        title: "Checklists se ramificam, e os planos escondem lacunas",
        body: "Se uma regra se aplica normalmente depende de uma resposta anterior — se a mercadoria é controlada, então uma licença é obrigatória. Um checklist ramificado expressa isso diretamente, então a inspeção pede a licença só quando ela é de fato necessária, e não a marca discretamente como não aplicável.",
      },
      {
        title: "Um auditor pergunta como você decidiu, não o que decidiu",
        body: "A avaliação é determinística — os mesmos documentos produzem o mesmo resultado, e não um julgamento novo a cada vez — e o resultado é gravado num relatório. Junto com a revisão, você consegue mostrar quais valores foram extraídos, quais regras foram acionadas e quem aprovou o resultado.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Evidências misturadas que chegam a um só lugar são classificadas e encaminhadas ao Flow certo antes de qualquer verificação." },
      { label: "Flows", href: "/docs/flows", why: "Cada tipo de documento tem seu próprio Flow, então uma regra pode referenciar um campo nomeado em vez de procurar em texto livre." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Um revisor aprova a inspeção, e a trilha imutável registra quem aceitou cada constatação." },
      { label: "Buckets", href: "/docs/buckets", why: "Os resultados ao longo do tempo viram relatórios — quantos conjuntos reprovaram, em qual regra, em qual mês." },
    ],
    faqs: [
      { q: "Ele consegue comparar valores entre documentos diferentes?", a: "Sim — essa é a ideia. Uma inspeção reúne o conjunto inteiro de documentos antes de avaliar, então as regras podem verificar se um valor num documento bate com um valor em outro, em vez de só validar cada um isoladamente." },
      { q: "O resultado é repetível?", a: "A avaliação do checklist é determinística. Os mesmos documentos e o mesmo checklist produzem o mesmo resultado, e é isso que torna o resultado defensável quando alguém pergunta por que um conjunto foi aprovado." },
      { q: "E se faltar um documento obrigatório?", a: "A falta de uma entrada obrigatória é em si uma constatação. A inspeção a reporta em vez de terminar com uma lacuna, e os arquivos enviados sem um espaço definido são encaminhados automaticamente ou sinalizados como sem correspondência." },
    ],
  },
  {
    slug: "form-filling",
    label: "Preenchimento de formulários",
    badge: "Operações e Comércio Exterior",
    h1: "Preenchimento automático de formulários PDF",
    title: "Preencha formulários PDF com dados extraídos de documentos",
    description:
      "Preencha formulários PDF oficiais automaticamente com dados extraídos de vários documentos de origem, com aprovação antes de qualquer emissão.",
    summary: "Formulários PDF oficiais preenchidos automaticamente com dados espalhados por vários documentos de origem.",
    lede: "O Tavnit preenche formulários PDF editáveis com dados extraídos de vários documentos de origem ao mesmo tempo. Uma declaração pode ser preenchida a partir de uma fatura, um romaneio e um conhecimento de embarque de uma só vez, com uma pessoa aprovando os valores antes de o PDF preenchido ser emitido.",
    problem: [
      "Uma parte surpreendente do trabalho de escritório é copiar valores dos documentos que você recebeu para um formulário que outra pessoa exige. Declarações aduaneiras, formulários de seguro, pedidos de subsídio, obrigações regulatórias — a informação já existe, espalhada por três ou quatro PDFs, e uma pessoa a transfere à mão.",
      "É também onde os erros são menos perdoáveis. Um deslize de transcrição num formulário que vai para um órgão público é uma rejeição ou uma multa, não uma correção interna.",
    ],
    fields: [
      { name: "Conjunto de documentos de origem", note: "Um espaço por Flow de origem. O formulário é preenchido quando todos os espaços obrigatórios têm uma execução concluída." },
      { name: "Mapeamento de campos", note: "Qual campo extraído preenche qual campo do PDF. Configurado uma vez por modelo, reutilizado sempre." },
      { name: "Saídas de Cleaners como origem", note: "Um valor mapeado pode vir de um Cleaner em vez da extração bruta, então valores convertidos ou calculados chegam ao formulário." },
      { name: "Campos de preenchimento manual", note: "Valores que ninguém extrai — um número de referência, um signatário — informados na aprovação." },
      { name: "Vários modelos", note: "Um conjunto de documentos de origem pode preencher vários formulários diferentes de uma só vez." },
    ],
    gotchas: [
      {
        title: "Os dados estão espalhados por documentos, não reunidos em um",
        body: "É por isso que as ferramentas genéricas de documentos não resolvem o preenchimento de formulários: elas extraem um arquivo de cada vez. O preenchimento usa uma execução por Flow de origem e completa o formulário com todas elas juntas, então os pesos de um romaneio e os valores de uma fatura chegam à mesma saída.",
      },
      {
        title: "Os documentos chegam na ordem em que chegam",
        body: "Raramente você recebe o conjunto completo de uma vez. Um preenchimento fica aberto, reunindo execuções à medida que os documentos chegam, e é disparado quando todos os espaços obrigatórios estão atendidos. Arquivos enviados sem indicar a que espaço pertencem são classificados e encaminhados automaticamente, e o que ficar sem correspondência pode ser atribuído à mão.",
      },
      {
        title: "Alguns campos nunca estão nos documentos de origem",
        body: "Todo formulário real tem valores que não existem em lugar nenhum antes — uma referência interna, o nome do declarante, um bloco de assinatura. Esses são campos de preenchimento manual, informados na etapa de aprovação, que também é o momento natural de corrigir qualquer coisa que a extração errou antes de o PDF ser emitido.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Um Flow por tipo de documento de origem; o formulário puxa de todos eles ao mesmo tempo." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converte e calcula valores para que o que chega ao formulário já esteja na unidade ou no formato exigido." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Aprovação antes da emissão, com correções e campos informados por pessoas capturados na mesma etapa." },
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Documentos de origem encaminhados para um endereço alimentam o preenchimento sem ninguém abrir o app." },
    ],
    faqs: [
      { q: "Um formulário pode ser preenchido a partir de vários documentos?", a: "Sim. Cada tipo de documento de origem tem seu próprio espaço, e o formulário é preenchido com todos eles juntos — que é o caso normal em declarações e sinistros." },
      { q: "E os campos que não estão em nenhum documento?", a: "Esses são campos de preenchimento manual, informados na etapa de aprovação junto com as correções, então o PDF final é conferido antes de ser emitido." },
      { q: "Um conjunto de documentos pode preencher mais de um formulário?", a: "Sim. Uma configuração pode ter vários modelos, e todos são preenchidos a partir do mesmo conjunto de execuções de uma só vez." },
    ],
  },
  {
    slug: "call-analytics",
    label: "Análise de chamadas",
    badge: "Vendas e Atendimento",
    h1: "Transforme conversas gravadas em dados",
    title: "Análise de chamadas — estruture conversas gravadas",
    description:
      "Transforme gravações de vendas, atendimento e balcão numa tabela — quem disse o quê, quais regras foram cumpridas e como cada conversa terminou.",
    summary: "Gravações de vendas, atendimento e balcão transformadas numa tabela de falas, regras e resultados.",
    lede: "O Tavnit Signals transforma gravações de áudio numa tabela plana. Ele separa os interlocutores, divide uma gravação nas suas conversas distintas, classifica cada uma e avalia suas regras e campos de extração fala a fala — então um dia de chamadas vira linhas que você filtra, e não horas que você precisa ouvir.",
    problem: [
      "As conversas são onde acontece a maior parte do que uma empresa aprende, e quase nada disso é capturado. As gravações existem, mas revisá-las significa ouvir, então na prática um gestor escuta um punhado e generaliza a partir dele.",
      "Onde existe controle de qualidade, é uma pessoa com uma planilha de avaliação preenchendo um formulário depois de cada chamada — caro, inconsistente entre avaliadores e cobrindo uma fração do volume.",
    ],
    fields: [
      { name: "Tipo de interação", note: "Uma gravação muitas vezes contém várias conversas. Cada uma é classificada — venda, suporte, devolução — ou marcada como outra." },
      { name: "Papel do interlocutor", note: "As falas são atribuídas aos participantes esperados, como vendedor ou cliente; vozes inesperadas são rotuladas como outras." },
      { name: "Regras por fala", note: "Verificações de sim/não aplicadas a cada fala — a promoção foi mencionada, o aviso legal foi lido." },
      { name: "Campos de extração", note: "Dados tirados de cada fala, como produtos mencionados ou objeções levantadas." },
      { name: "Categorias de conteúdo", note: "Cada fala rotulada — objeção, pergunta, problema, solução, agradecimento — para que os padrões possam ser contados." },
      { name: "Resultado da conversa", note: "Avaliado uma vez sobre a conversa inteira: a venda foi fechada, o problema foi resolvido." },
    ],
    gotchas: [
      {
        title: "Uma gravação não é uma conversa",
        body: "A gravação de um turno de balcão ou de uma linha de atendimento contém muitas trocas separadas. Tratar o arquivo como uma única conversa produz médias que não descrevem nada. As gravações são primeiro divididas em interações distintas, cada uma classificada e avaliada por si — o equivalente em áudio a dividir um PDF com vários documentos.",
      },
      {
        title: "Perguntas por fala e perguntas por conversa são perguntas diferentes",
        body: "'O desconto foi mencionado?' é perguntado a cada fala e pode ser verdadeiro várias vezes. 'A venda foi concluída?' é perguntado uma vez sobre a troca inteira. Misturar as duas gera uma métrica que conta menções quando você queria resultados, então as duas são avaliadas separadamente e a resposta da conversa se repete nas linhas daquela interação.",
      },
      {
        title: "Gravar pessoas vem com regras",
        body: "Os requisitos de consentimento e retenção para gravação de chamadas variam por jurisdição e são mais rígidos que os de documentos. Essa é uma obrigação sua, e não algo que o pipeline decide — mas a visibilidade por Bucket e as permissões de acesso permitem manter transcrições e resultados restritos a quem precisa deles.",
      },
    ],
    pipeline: [
      { label: "Buckets", href: "/docs/buckets", why: "As gravações concluídas são exportadas para um Bucket automaticamente, então as chamadas se acumulam em algo que você pode consultar e transformar em gráficos." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Envia a tabela de saída para os seus próprios sistemas assim que uma gravação termina de ser processada." },
      { label: "Funções de usuário", href: "/docs/user-roles", why: "Dados de conversas são sensíveis; funções e permissões por Bucket os mantêm com quem conduz o programa." },
    ],
    faqs: [
      { q: "Quais formatos de áudio são suportados?", a: "Gravações em MP3, WAV e FLAC podem ser enviadas e processadas." },
      { q: "Ele dá conta de uma gravação com muitas conversas separadas?", a: "Sim. A gravação é primeiro dividida nas suas interações distintas, e cada uma é classificada e avaliada separadamente — então um turno inteiro num balcão produz resultados por conversa, e não uma única média misturada." },
      { q: "Posso avaliar todas as chamadas em vez de uma amostra?", a: "Sim. As regras são avaliadas em cada fala de cada gravação processada, e essa é a diferença prática em relação ao controle de qualidade manual — cobertura total em vez de amostra." },
    ],
  },
  {
    slug: "delivery-notes",
    label: "Notas de entrega",
    badge: "Logística e Armazém",
    h1: "Captura de notas de entrega e comprovantes de entrega",
    title: "Extração de notas de entrega e conferência de recebimento",
    description:
      "Capture o que foi realmente entregue a partir de notas de entrega e comprovantes assinados, incluindo as anotações à mão, e confira com o que foi pedido.",
    summary: "O que foi realmente entregue, capturado de notas e comprovantes assinados — com escrita à mão e tudo.",
    lede: "O Tavnit lê notas de entrega e comprovantes de entrega, incluindo as anotações à mão que motoristas e recebedores acrescentam, e devolve as quantidades entregues como linhas estruturadas. Como os pedidos de compra são extraídos para o mesmo formato, conferir o entregue com o pedido vira uma consulta.",
    problem: [
      "A nota de entrega é o único registro do que chegou fisicamente, e costuma ser o documento de pior qualidade da cadeia: fotografado no pátio, assinado por cima do texto impresso, anotado à mão onde as quantidades divergiram.",
      "É também o documento que mais importa nas disputas. Se a nota fiscal diz doze e a nota de entrega diz dez, a nota de entrega é a prova — desde que alguém tenha capturado o que ela dizia.",
    ],
    fields: [
      { name: "Número da nota de entrega e do pedido", note: "As chaves que amarram a entrega ao que foi pedido." },
      { name: "Quantidade entregue por linha", note: "O número que realmente importa, e o que mais é corrigido à mão." },
      { name: "Correções à mão", note: "Quantidades riscadas e anotações na margem trazem o número real. Ignorá-las significa capturar o errado." },
      { name: "Nome do recebedor e presença de assinatura", note: "A presença de uma assinatura muitas vezes é o critério de aceite." },
      { name: "Data e hora da entrega", note: "Movem a medição de SLA e os prazos de disputa." },
      { name: "Observações de estado ou avarias", note: "Texto livre, geralmente escrito à mão, e a base de qualquer reclamação." },
    ],
    gotchas: [
      {
        title: "A escrita à mão é a parte importante",
        body: "Uma nota de entrega impressa diz o que deveria chegar. A correção à mão diz o que chegou. A extração lê escrita à mão tanto quanto texto impresso, e essa é a diferença entre capturar o embarque como planejado e capturar o embarque como entregue.",
      },
      {
        title: "Fotografado no pátio, não digitalizado no escritório",
        body: "Os comprovantes chegam como fotos de celular de lado, com pouca luz, às vezes com um dedo na imagem. A extração dá conta da maior parte, mas este é um tipo de documento em que vale a pena encaminhar resultados de baixa confiança a uma pessoa em vez de confiar em toda captura.",
      },
      {
        title: "O valor está na comparação, não na captura",
        body: "Uma quantidade entregue sozinha diz pouco. Extrair as notas de entrega para a mesma estrutura de campos dos seus pedidos de compra transforma a conciliação de três vias numa consulta pelo número do pedido, e não em três documentos erguidos contra a luz.",
      },
    ],
    pipeline: [
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Motoristas e transportadoras mandam por e-mail os comprovantes fotografados; encaminhá-los processa cada um assim que chega." },
      { label: "Flows", href: "/docs/flows", why: "As linhas entregues são campos de tabela, na mesma estrutura usada para os pedidos de compra." },
      { label: "Buckets", href: "/docs/buckets", why: "Guarda entregas e pedidos num só lugar, então as divergências aparecem numa consulta, e não numa auditoria." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Revisa as capturas ruins e as quantidades corrigidas, onde o custo de errar é uma disputa." },
    ],
    faqs: [
      { q: "Ele consegue ler correções escritas à mão?", a: "Sim. A escrita à mão é extraída junto com o texto impresso, o que importa aqui porque a quantidade escrita à mão costuma ser a correta." },
      { q: "Funciona com fotos tiradas no celular?", a: "Normalmente, sim. Fotos, ângulos tortos e pouca luz são a regra nos comprovantes de entrega. Vale ativar a revisão condicional para que as capturas limítrofes cheguem a uma pessoa em vez de passarem em silêncio." },
      { q: "As entregas podem ser conferidas com os pedidos?", a: "Extraia os dois para a mesma estrutura de campos e a comparação vira uma consulta pelo número do pedido no seu Bucket, em vez de uma conferência manual documento a documento." },
    ],
  },
  {
    slug: "insurance-claims",
    label: "Sinistros de seguro",
    badge: "Seguros e Sinistros",
    h1: "Processamento de documentos de sinistros",
    title: "Extração de documentos de sinistros de seguro",
    description:
      "Processe os formulários de sinistro junto com as evidências que os acompanham — orçamentos, notas fiscais, laudos e fotos — num único registro estruturado e revisável.",
    summary: "Formulários de sinistro e evidências processados juntos num único registro estruturado e revisável.",
    lede: "O Tavnit processa um sinistro e as evidências que o sustentam como um conjunto: o formulário do sinistro, os orçamentos de reparo, as notas fiscais e os laudos. Cada tipo de documento é encaminhado ao seu próprio Flow, e os resultados se reúnem num único registro que o analista pode avaliar, em vez de uma pasta que ele precisa ler.",
    problem: [
      "Um sinistro nunca é um único documento. É um formulário mais tudo o que o segurado enviou — orçamentos, recibos, um boletim de ocorrência, fotografias —, chegando ao longo de dias, sem ordem, por e-mail.",
      "Os analistas passam a maior parte do tempo montando em vez de avaliando: abrindo anexos, encontrando os valores, conferindo se o valor reclamado bate com o do orçamento.",
    ],
    fields: [
      { name: "Número do sinistro e da apólice", note: "As chaves em que todo o conjunto se une, e muitas vezes a única coisa consistente entre os documentos." },
      { name: "Dados do segurado e do incidente", note: "Data, local e descrição do dano, geralmente divididos entre o formulário e um relato." },
      { name: "Valor reclamado", note: "O que o formulário diz. Vale extrair separadamente do que as evidências sustentam." },
      { name: "Valores das evidências", note: "Totais de orçamentos e notas fiscais — os números com que o valor reclamado deve fechar." },
      { name: "Dados de terceiros", note: "Outras partes, seguradoras e números de referência, necessários para o ressarcimento." },
      { name: "Tipo de documento por anexo", note: "Saber o que é cada arquivo determina qual Flow o lê." },
    ],
    gotchas: [
      {
        title: "As evidências chegam tarde e fora de ordem",
        body: "A avaliação não pode começar até o conjunto estar completo, e o conjunto se completa ao longo de dias. As Collections classificam cada anexo assim que ele chega, então o registro vai sendo montado aos poucos, em vez de alguém reler a pasta inteira cada vez que algo novo aparece.",
      },
      {
        title: "O valor reclamado e o valor comprovado são campos diferentes",
        body: "Extrair um único número por sinistro perde a verificação que importa. Capture o que foi reclamado e quanto os orçamentos e as notas realmente somam, e a divergência vira um valor que você pode filtrar, em vez de algo que o analista precisa perceber.",
      },
      {
        title: "Processos de sinistro são pessoais, e muitas vezes médicos",
        body: "Sinistros rotineiramente contêm informações de saúde, documentos de identidade e dados financeiros. Buckets privados com permissões de acesso por usuário mantêm um sinistro visível para os analistas responsáveis por ele, e não para toda a organização.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Classifica cada anexo — formulário, orçamento, nota fiscal, laudo — e o encaminha ao Flow feito para ele." },
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Os sinistros chegam por e-mail; encaminhar para o endereço de uma Collection processa cada anexo assim que chega." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normaliza datas e moedas e calcula a diferença entre o valor reclamado e o comprovado." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Os analistas aprovam ou recusam, com um registro permanente da decisão e de quem a tomou." },
    ],
    faqs: [
      { q: "Ele dá conta de um sinistro com muitos anexos diferentes?", a: "Sim. Uma Collection classifica cada anexo e o encaminha ao Flow certo, então um formulário de sinistro, um orçamento e uma nota fiscal são lidos, cada um, pelo Flow feito para aquele tipo de documento." },
      { q: "Ele consegue sinalizar sinistros em que os números não batem?", a: "Extraia o valor reclamado e os totais das evidências como campos separados e use um Cleaner para calcular a diferença. Os sinistros que falham na conferência podem ser encaminhados para revisão automaticamente." },
      { q: "Como os dados sensíveis dos sinistros ficam protegidos?", a: "Os Buckets podem ser privados em vez de visíveis para a organização, com permissões de Viewer ou Editor por usuário, então um sinistro só fica visível para os analistas que trabalham nele." },
    ],
  },
  {
    slug: "identity-verification",
    label: "Identidade e onboarding",
    badge: "KYC e Onboarding",
    h1: "Captura de documentos de identidade e onboarding",
    title: "Extração de documentos KYC para onboarding de clientes",
    description:
      "Capture documentos de identidade e comprovantes de endereço no onboarding, verifique se os dados batem entre eles e mantenha um registro auditável da decisão.",
    summary: "Documentos de identidade e de endereço capturados, conferidos quanto à consistência e registrados de forma auditável.",
    lede: "O Tavnit lê os documentos coletados no onboarding — documentos de identidade, comprovantes de endereço, atos constitutivos — e devolve nomes, números, datas e endereços como campos estruturados. Como o conjunto inteiro é processado junto, saber se os dados batem entre os documentos vira uma verificação, e não uma suposição.",
    problem: [
      "Fazer o onboarding de um cliente significa coletar documentos, lê-los e confirmar que descrevem a mesma pessoa ou empresa. A leitura é tediosa; a confirmação é a parte que carrega o risco, e é feita no olho.",
      "O volume piora tudo. Uma equipe que faz onboarding com frequência acaba com critérios inconsistentes entre revisores e nenhum registro confiável do que foi verificado e quando.",
    ],
    fields: [
      { name: "Nome completo como impresso", note: "Extraia literalmente. A ordem e a transliteração variam entre documentos, e essa diferença é a verificação." },
      { name: "Data de nascimento", note: "O campo mais útil para conferir consistência entre documentos." },
      { name: "Número e tipo do documento", note: "Passaporte, documento de identidade, carteira de motorista — cada um com suas próprias convenções de numeração." },
      { name: "Datas de emissão e validade", note: "A validade é uma regra, não um campo: um documento vencido é uma constatação." },
      { name: "Endereço", note: "Dos comprovantes de endereço, que precisam bater com o que o cliente declarou." },
      { name: "Dados de registro da empresa", note: "Para onboarding empresarial — número de registro, sede, administradores." },
    ],
    gotchas: [
      {
        title: "Os nomes não batem, e isso é normal",
        body: "A mesma pessoa aparece como 'Jose Garcia Lopez', 'J. García' e 'GARCIA LOPEZ, JOSE' em três documentos. Extraia os nomes literalmente em vez de normalizá-los durante a extração, e depois compare de forma deliberada — normalizar cedo demais joga fora justamente a diferença que você precisa avaliar.",
      },
      {
        title: "Documento fotografado é a regra, e a qualidade varia",
        body: "Os clientes fotografam documentos com o celular, muitas vezes com um reflexo bem em cima da zona de leitura mecânica. Revisar o onboarding é proporcional ao custo de um erro, e a trilha de auditoria registra quem aceitou cada documento.",
      },
      {
        title: "São os dados mais regulados que você vai processar",
        body: "Documentos de identidade têm prazos de retenção, direito à eliminação e obrigações de acesso que documentos comerciais comuns não têm. Buckets privados e permissões por usuário mantêm os arquivos de onboarding com a equipe de compliance, e a trilha imutável comprova quem acessou o quê.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Classifica o que o cliente enviou — passaporte, conta de consumo, certidão de constituição — e encaminha cada um ao Flow certo." },
      { label: "Flows", href: "/docs/flows", why: "Um Flow por tipo de documento, então uma verificação pode referenciar um campo nomeado em vez de procurar no texto." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Aprovação de cada onboarding, com um registro permanente de quem aprovou cada documento." },
      { label: "Funções de usuário", href: "/docs/user-roles", why: "Restringe os documentos de identidade à equipe que precisa deles, e não à organização inteira." },
    ],
    faqs: [
      { q: "Ele verifica se um documento é autêntico?", a: "Não. O Tavnit extrai e estrutura o que os documentos dizem e permite conferir a consistência entre eles. A verificação de autenticidade junto às autoridades emissoras é uma especialidade à parte, e isto não a substitui." },
      { q: "Ele consegue verificar se os dados batem entre documentos?", a: "Sim. Processe o conjunto junto e compare os campos extraídos — nome, data de nascimento, endereço —, para que uma divergência apareça como um valor, e não como algo que o revisor precisa notar." },
      { q: "Como os dados de identidade ficam restritos?", a: "Buckets privados com permissões de acesso por usuário limitam a visibilidade à equipe de compliance, e a trilha de auditoria imutável registra cada visualização, edição e aprovação." },
    ],
  },
  {
    slug: "lease-agreements",
    label: "Locações e imóveis",
    badge: "Imobiliário e Facilities",
    h1: "Extração de dados de contratos de locação",
    title: "Resumo de contratos de locação — aluguel, prazos e datas de rescisão",
    description:
      "Resuma contratos de locação em registros estruturados — aluguel, datas de revisão, cláusulas de rescisão antecipada, encargos e obrigações de manutenção — em uma carteira inteira.",
    summary: "Contratos de locação resumidos em registros estruturados: aluguel, revisões, datas de rescisão e obrigações.",
    lede: "O Tavnit resume contratos de locação em registros estruturados: partes, imóvel locado, prazo, aluguel e datas de revisão, cláusulas de rescisão antecipada, critério dos encargos e obrigações de manutenção. Uma carteira guardada em PDFs vira uma tabela em que a próxima revisão do aluguel é um filtro, e não um exercício de leitura.",
    problem: [
      "Resumir contratos de locação é um trabalho manual consolidado justamente porque as respostas estão enterradas na redação, e não impressas em campos. As empresas pagam por isso, repetidas vezes, e a planilha resultante fica desatualizada no momento em que um contrato é alterado.",
      "O custo de não tê-la é específico e caro: uma data de rescisão perdida, uma opção não exercida, uma revisão de aluguel que passou sem contestação.",
    ],
    fields: [
      { name: "Locador, locatário e fiador", note: "Pessoas jurídicas, e não nomes fantasia, e frequentemente alteradas por instrumentos posteriores." },
      { name: "Imóvel locado", note: "Descrito em texto e por referência a planta, raramente como um endereço limpo." },
      { name: "Prazo, início e término", note: "A espinha dorsal de todas as outras datas do documento." },
      { name: "Aluguel e datas de revisão", note: "O critério de revisão — valor de mercado, índice, escalonado — importa tanto quanto o valor." },
      { name: "Cláusulas de rescisão antecipada e condições", note: "Um direito de rescisão com condições não cumpridas não é um direito de rescisão. Extraia os dois." },
      { name: "Encargos e obrigações de manutenção", note: "Onde a responsabilidade realmente fica, e geralmente as cláusulas mais longas do documento." },
    ],
    gotchas: [
      {
        title: "As datas são definidas, não declaradas",
        body: "Um contrato de locação raramente imprime a data de rescisão. Ele diz que o locatário pode rescindir no quinto aniversário do início do prazo, com seis meses de aviso prévio. Extraia o início, o aniversário e o aviso prévio como campos e deixe um Cleaner de fórmula calcular o prazo real — que é a data de que você precisava.",
      },
      {
        title: "O documento que vale muitas vezes não é o contrato",
        body: "Aditivos, autorizações de obra e cartas complementares mudam a posição, e o contrato original continua sendo lido como se eles não existissem. Processe cada um como sua própria execução, com a data capturada, para que a posição atual seja derivada do conjunto completo, e não do PDF que alguém abriu.",
      },
      {
        title: "Um direito condicional lido como incondicional é um passivo",
        body: "As cláusulas de rescisão costumam estar condicionadas à entrega do imóvel desocupado ou ao aluguel em dia. Capturar o direito sem as condições produz uma tabela da carteira confiantemente errada, o que é pior do que não ter tabela. Extraia as condições como campo próprio e revise-as.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "As dicas de extração são essenciais aqui — o modelo precisa saber o que é uma condição de rescisão, e não só onde procurar." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Calcula os prazos de revisão e de rescisão a partir das datas de início e dos avisos prévios." },
      { label: "Buckets", href: "/docs/buckets", why: "A carteira como tabela: quais contratos podem ser rescindidos no ano que vem, ordenados pelo prazo do aviso." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Revise todos os resumos. Aqui, o custo de uma data errada se mede em anos de aluguel." },
    ],
    faqs: [
      { q: "Ele consegue calcular datas de rescisão e de revisão?", a: "Sim. Extraia a data de início, o aniversário ao qual o direito está vinculado e o aviso prévio, e um Cleaner de fórmula deriva o prazo real — que normalmente é o que você queria, e não a cláusula em si." },
      { q: "E os aditivos?", a: "Processe cada documento como sua própria execução, com a data capturada como campo. A posição atual passa então a vir de uma consulta ao conjunto inteiro, em vez de presumir que o arquivo mais novo é o que vale." },
      { q: "Ele captura as condições associadas a uma cláusula de rescisão?", a: "Deveria, e esta página defende que precisa — um direito de rescisão registrado sem as suas condições produz uma tabela da carteira que parece certa e não é. Extraia as condições como campo próprio e revise-as." },
    ],
  },
  {
    slug: "timesheets",
    label: "Folhas de ponto",
    badge: "Folha de pagamento e Staffing",
    h1: "Captura de folhas de ponto e registros de turno",
    title: "Extração de dados de folhas de ponto para a folha de pagamento",
    description:
      "Capture as horas das folhas de ponto enviadas — impressas, escritas à mão ou fotografadas — e confira-as com regras antes que cheguem à folha de pagamento.",
    summary: "Horas capturadas de folhas de ponto impressas, escritas à mão e fotografadas, conferidas antes da folha de pagamento.",
    lede: "O Tavnit lê as folhas de ponto enviadas, incluindo as escritas à mão e as fotografadas, e devolve trabalhador, data, horas e centro de custo como linhas. Regras podem conferir os totais antes que qualquer coisa chegue à folha de pagamento, então os erros que viram correções de salário são pegos enquanto ainda custam pouco.",
    problem: [
      "A folha de pagamento tem prazo, e as folhas de ponto chegam no formato que cada obra ou agência usa — uma planilha impressa, uma folha de papel fotografada no fim do turno, um PDF do sistema de um subcontratado.",
      "Alguém as redigita sob pressão de tempo, que é exatamente a condição em que os erros de transcrição acontecem. Um número errado descoberto depois do fechamento é uma correção, um ajuste e uma conversa desagradável.",
    ],
    fields: [
      { name: "Nome ou matrícula do trabalhador", note: "Os nomes nas folhas de ponto raramente batem exatamente com o cadastro da folha — um Cleaner de consulta faz a correspondência." },
      { name: "Data ou semana de referência", note: "Determina a que período de pagamento as horas pertencem, e é fácil de ler errado numa virada de período." },
      { name: "Horários de entrada, saída e intervalo", note: "Extrair os componentes, e não só o total, permite verificar o total." },
      { name: "Total de horas", note: "Vale extrair como foi informado e comparar com o total calculado." },
      { name: "Horas extras e adicionais", note: "Valores diferentes, então uma classificação errada é um erro de pagamento, e não de arredondamento." },
      { name: "Centro de custo ou projeto", note: "Move o custeio por projeto, e é o campo que mais fica em branco." },
    ],
    gotchas: [
      {
        title: "O total informado e o total real divergem mais do que se imagina",
        body: "As pessoas somam as próprias horas, e erram. Extrair os horários de entrada, saída e intervalo junto com o total informado permite que um Cleaner de fórmula calcule as horas e compare — e as divergências que aparecem normalmente são erros de conta genuínos, não erros de extração.",
      },
      {
        title: "Folhas de ponto à mão são o caso difícil, e são comuns",
        body: "Trabalho em obras e por turnos ainda funciona com papel fotografado no fim do dia. A escrita à mão é extraída, mas a confiança varia, e este é um caso em que encaminhar capturas incertas para revisão é melhor do que descobrir o problema no holerite.",
      },
      {
        title: "Os nomes nas folhas de ponto não são os nomes da folha de pagamento",
        body: "'Dave S.', 'David Smith' e uma matrícula se referem à mesma pessoa, e a folha de pagamento precisa da matrícula. Um Cleaner de consulta compara os nomes enviados com a sua lista de trabalhadores durante o processamento, então as entradas sem correspondência são sinalizadas em vez de adivinhadas.",
      },
    ],
    pipeline: [
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Obras e agências mandam as folhas por e-mail no fim da semana; encaminhá-las processa cada uma assim que chega." },
      { label: "Splitters", href: "/docs/splitters", why: "Um único PDF com as folhas de uma equipe inteira vira uma execução por trabalhador." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Calcula as horas a partir dos horários, faz a correspondência dos nomes com o cadastro da folha e sinaliza totais que não fecham." },
      { label: "Revisão humana", href: "/docs/human-in-the-loop", why: "Só as folhas que falham numa conferência chegam a uma pessoa, e é isso que torna viável cumprir o prazo da folha de pagamento." },
    ],
    faqs: [
      { q: "Ele consegue ler folhas de ponto escritas à mão?", a: "Sim. A escrita à mão é extraída junto com o texto impresso, embora a confiança varie com a legibilidade — e é por isso que vale ativar aqui o encaminhamento de folhas incertas para revisão." },
      { q: "Ele consegue conferir se as horas fecham?", a: "Sim. Extraia os horários de entrada, saída e intervalo junto com o total informado, e um Cleaner de fórmula calcula as horas e sinaliza qualquer folha em que os dois divirjam." },
      { q: "E se os nomes não baterem com o nosso sistema de folha de pagamento?", a: "Um Cleaner de consulta compara os nomes enviados com a sua lista de trabalhadores durante o processamento. As entradas sem correspondência são sinalizadas em vez de adivinhadas, então nada chega à folha de pagamento sem atribuição." },
    ],
  },
  {
    slug: "utility-bills",
    label: "Contas de consumo",
    badge: "Facilities e ESG",
    h1: "Extração de dados de contas de consumo e medidores",
    title: "Extração de contas de consumo para custos e emissões",
    description:
      "Extraia consumo, tarifas e leituras de medidores das contas de consumo de uma carteira de imóveis, para controle de custos e relatórios de emissões.",
    summary: "Consumo, tarifas e leituras de medidores extraídos de uma carteira inteira, para relatórios de custos e de emissões.",
    lede: "O Tavnit lê contas de energia elétrica, gás, água e resíduos e devolve consumo, tarifa, leituras de medidor e encargos por unidade. As contas de uma carteira viram uma tabela da qual você pode acompanhar a tendência — que é o que o controle de custos e os relatórios de emissões realmente exigem.",
    problem: [
      "Quem administra mais que um punhado de unidades recebe contas de vários fornecedores em vários formatos, e a única coisa que acontece com elas com certeza é o pagamento. Os dados de consumo — a parte com valor analítico — ficam no PDF.",
      "Os relatórios de emissões tornaram isso urgente. Os relatórios de Escopo 1 e 2 precisam do consumo em kWh por unidade e por período, e para a maioria das organizações esses dados só existem como uma pilha de contas que ninguém transcreveu.",
    ],
    fields: [
      { name: "Endereço de fornecimento e número do medidor (MPAN/MPRN)", note: "O identificador que amarra uma conta a uma unidade. Só o endereço não é confiável entre fornecedores." },
      { name: "Período de faturamento", note: "As contas raramente coincidem com os meses do calendário, o que importa quando você agrega por trimestre." },
      { name: "Consumo com unidade", note: "kWh, m³ ou litros. A unidade importa tanto quanto o número e nem sempre é indicada do mesmo jeito." },
      { name: "Leituras do medidor e indicador de estimativa", note: "Uma leitura estimada não é uma medição, e tratá-la como tal corrompe uma tendência." },
      { name: "Tarifa e encargo fixo", note: "O que separa uma mudança de preço de uma mudança de consumo." },
      { name: "Encargos totais e impostos", note: "Para conciliar os custos com o que foi efetivamente pago." },
    ],
    gotchas: [
      {
        title: "Leituras estimadas não são dados",
        body: "Os fornecedores estimam quando não conseguem ler um medidor e corrigem na leitura real seguinte. Uma tendência montada sem distinguir as duas mostra um pico que nunca aconteceu seguido de uma queda que nunca aconteceu. Extraia o indicador de estimativa como campo próprio para que as estimativas possam ser excluídas ou tratadas à parte.",
      },
      {
        title: "Os períodos de faturamento não coincidem com nada",
        body: "Um fornecedor fatura mensalmente, outro a cada 28 dias, um terceiro trimestralmente, e nenhum coincide com os seus períodos de reporte. Extraia o início e o fim do período em vez de uma única data, para que o consumo possa ser rateado entre os períodos que você realmente reporta.",
      },
      {
        title: "As unidades variam, e o gás é a armadilha",
        body: "O gás muitas vezes é faturado em metros cúbicos e reportado em kWh, e a conversão depende de um poder calorífico impresso na conta. Extraia a unidade e o fator de conversão em vez de presumi-los, e deixe um Cleaner de unidades fazer a conversão — presumir um fator padrão é onde a maioria dos números de emissões erra sem ninguém perceber.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Contas de serviços e fornecedores diferentes chegam juntas e são encaminhadas ao Flow certo automaticamente." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converte as unidades para uma base única de reporte e calcula o consumo rateado por período." },
      { label: "Buckets", href: "/docs/buckets", why: "Consumo por unidade e por período numa tabela pronta para gráficos — o formato de que precisam tanto o financeiro quanto os relatórios ESG." },
      { label: "Integração por e-mail", href: "/docs/email-integration", why: "Os fornecedores mandam as contas por e-mail; encaminhá-las monta o conjunto de dados sem um projeto de digitação." },
    ],
    faqs: [
      { q: "Ele dá conta de contas de serviços e fornecedores diferentes?", a: "Sim. Uma Collection classifica cada conta e a encaminha ao Flow certo, então contas de luz, gás e água são lidas, cada uma, pelo Flow feito para elas, seja qual for o layout do fornecedor." },
      { q: "Os dados servem para relatórios de emissões?", a: "Ele produz o consumo por unidade e por período com as unidades capturadas, que é a entrada de que esses relatórios precisam. Extraia o indicador de estimativa e o fator de conversão em vez de presumir um padrão — essa suposição é onde a maioria dos números de emissões erra." },
      { q: "Ele consegue separar um aumento de preço de um aumento de consumo?", a: "Extraia a tarifa e o encargo fixo junto com o consumo, e os dois viram colunas separadas cuja tendência você acompanha de forma independente." },
    ],
  },
];

const ptBR: UseCasesContent = {
  hub: {
    title: "Casos de uso — Notas fiscais, contratos, currículos e mais",
    description:
      "Como as equipes usam o Tavnit por tipo de documento — notas fiscais, contratos, currículos, recibos, pedidos de compra e documentação aduaneira, com o que cada um costuma errar.",
    ogTitle: "Casos de uso do Tavnit",
    breadcrumbHome: "Início",
    breadcrumb: "Casos de uso",
    h1: "Casos de uso",
    intro:
      "O pipeline é o mesmo, seja o que for que você envie — extrair, limpar, revisar, agir. O que muda é quais campos importam e o que costuma dar errado.",
    introMore:
      "Cada página abaixo mostra os campos que vale a pena extrair daquele tipo de documento, as partes que costumam quebrar e qual etapa do pipeline faz a diferença.",
    notSeeingHeading: "Não encontrou o seu tipo de documento?",
    notSeeing:
      "Estes são os tipos sobre os quais as equipes mais perguntam, não uma lista do que o Tavnit suporta. Não há configuração por tipo de documento para montar — você descreve os campos que quer e a mesma extração lê qualquer PDF ou imagem, incluindo digitalizações e escrita à mão.",
    notSeeingMore:
      "Notas de entrega, extratos bancários, sinistros de seguro, formulários médicos, certificados e fichas de inscrição funcionam todos do mesmo jeito. Comece pelo [guia de primeiros passos](/docs) e defina os campos que importam para você.",
    finalHeading: "Comece com um documento",
    finalBody:
      "Crie um Flow, envie algo real por ele e avalie o resultado antes de integrar qualquer coisa. Créditos grátis para começar.",
    finalCta: "Comece grátis",
  },
  items,
};

export default ptBR;
