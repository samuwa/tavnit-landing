import type { GuidesContent } from "@/content/types";

/** Guides: the /guides hub copy and every guide — Português (Brasil) (pt-BR). */
const ptBR: GuidesContent = {
  hub: {
    title: "Guias — Conciliação com Pedidos, Itens de Linha, Códigos SH e Automação de Documentos",
    description:
      "Guias em linguagem simples sobre os problemas por trás da automação de documentos: conciliar notas fiscais com pedidos de compra, extrair os itens das notas, classificar códigos SH e mais.",
    ogTitle: "Guias do Tavnit",
    ogDescription:
      "Guias em linguagem simples sobre conciliação com pedidos de compra, extração de itens de linha, classificação de códigos SH e o restante das operações com documentos.",
    breadcrumbHome: "Início",
    name: "Guias",
    h1: "Guias de automação de documentos",
    intro:
      "Os problemas por trás do produto, explicados nos seus próprios termos: o que a conciliação com o pedido de compra verifica, por que as tabelas das notas fiscais são difíceis de extrair, como a classificação tarifária funciona de verdade. Neutros em relação a fornecedores até a última seção, onde dizemos o que o Tavnit automatiza.",
    minRead: "{m} min de leitura",
    read: "Ler",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Como conciliar notas fiscais com pedidos de compra (2 e 3 vias)",
      h1: "Como conciliar notas fiscais com pedidos de compra",
      description:
        "O que é a conciliação com o pedido de compra, como diferem a conciliação de duas e de três vias, onde a conciliação manual falha e como automatizá-la sem trocar de ERP.",
      lede: "A conciliação entre nota fiscal e pedido de compra verifica se a nota do fornecedor está de acordo com o pedido que ela cobra: mesmo fornecedor, mesmos itens, mesmas quantidades, mesmos preços. A conciliação de duas vias compara a nota com o pedido; a de três vias acrescenta o comprovante de recebimento da mercadoria. É o controle que impede a empresa de pagar por algo que não pediu ou não recebeu.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "O que a conciliação com o pedido realmente verifica",
          paragraphs: [
            "Um pedido de compra é uma promessa de compra; uma nota fiscal é um pedido de pagamento. Conciliá-los responde a uma única pergunta — esta nota está cobrando exatamente o que combinamos? — em quatro dimensões: o fornecedor, os itens, as quantidades e os preços unitários. Uma quinta, os totais, é consequência das outras quatro e é o que menos adianta conferir isoladamente.",
            "Os totais são uma verificação fraca porque coincidem por acaso com mais frequência do que se imagina. Uma nota que cobra dez unidades a US$ 12 em vez de doze unidades a US$ 10 tem o total certo e todo o resto errado. A conciliação no nível do cabeçalho pega a nota sem pedido; só a conciliação linha a linha pega a nota com as linhas erradas.",
          ],
        },
        {
          heading: "Conciliação de duas vias versus de três vias",
          paragraphs: [
            "A conciliação de duas vias compara a nota fiscal com o pedido de compra. Ela confirma que vocês concordaram em comprar aquilo, por aquele preço. Não confirma que vocês receberam, e por isso costuma ficar reservada para serviços, assinaturas e mercadorias de baixo valor, em que o custo de uma etapa de recebimento supera o risco.",
            "A conciliação de três vias acrescenta o comprovante de recebimento — a nota de entrega, o romaneio ou o registro do armazém que documenta o que chegou fisicamente. Agora a nota precisa bater tanto com o que foi pedido quanto com o que foi recebido. Um fornecedor que envia oito e cobra dez é pego aqui e em nenhum outro lugar. É o padrão para mercadorias físicas, e a maioria dos marcos de auditoria espera que seja aplicada acima de um limite de materialidade.",
            "Algumas equipes falam em conciliação de quatro vias, acrescentando um registro de inspeção ou de aceite de qualidade. É a mesma ideia com um documento a mais, e a mesma mecânica se aplica.",
          ],
        },
        {
          heading: "Por que a conciliação manual falha",
          paragraphs: [
            "O pedido de compra é estruturado — saiu do seu próprio sistema. A nota fiscal não. Ela chegou como um PDF do sistema do fornecedor, no layout do fornecedor, com os códigos de peça do fornecedor e a descrição que o fornecedor dá a cada item. Antes de qualquer comparação, alguém precisa ler esse PDF e traduzi-lo para o mesmo formato do pedido. Na maioria das equipes de contas a pagar, essa tradução é uma pessoa com duas janelas abertas.",
            "É aí que os erros entram. A comparação em si não é difícil; uma planilha resolve. A transcrição é difícil, porque é repetitiva, os layouts mudam a cada fornecedor e uma quantidade errada parece exatamente igual a uma certa. A falha de conciliação que a maioria das empresas vive não é uma falha da lógica de conciliação. É uma falha de digitação que acontece antes dela.",
          ],
          bullets: [
            "Os códigos de peça do fornecedor diferem dos SKUs internos, então parear linhas exige uma tabela de correspondência que ninguém mantém.",
            "As descrições mudam de redação — “Blue widget 10pk” contra “WIDGET-BLU x10” —, então a comparação de texto exato falha em itens que são o mesmo.",
            "Unidade de medida e tamanho de embalagem mudam a conta: 1 caixa com 12 versus 12 unidades.",
            "Entregas parciais e notas divididas fazem um pedido corresponder a várias notas, e a conciliação vira muitos-para-um.",
            "Frete, sobretaxas e impostos aparecem na nota, mas não no pedido, e precisam ser classificados como diferenças aceitáveis, não como divergências.",
          ],
        },
        {
          heading: "Tolerâncias: decidir o que conta como divergência",
          paragraphs: [
            "Nenhuma conciliação do mundo real é exata. Os preços são cotados antes de o câmbio mudar; fornecedores arredondam; o frete é estimado. Um processo de conciliação que trava toda nota com um centavo de diferença vai ser desligado em um mês. A solução é uma política de tolerância: uma regra, combinada com antecedência, de quanta variação é aceitável em cada dimensão antes de a nota ser retida.",
            "Políticas típicas permitem uma pequena variação percentual ou absoluta no preço unitário, variação zero na quantidade para mercadorias físicas e uma margem separada para linhas de frete e sobretaxas. O que importa é que a regra esteja escrita e seja aplicada pelo sistema, não decidida por quem estiver conciliando naquele dia. As notas dentro da tolerância seguem; as que ficam fora param e vão para uma pessoa.",
          ],
        },
        {
          heading: "Como automatizar, passo a passo",
          paragraphs: [
            "A automação não começa com um software de conciliação. Começa colocando os dois documentos no mesmo formato estruturado, para que a comparação seja uma consulta e não uma leitura.",
          ],
          bullets: [
            "Defina um único esquema de campos para documentos de compra: número do pedido, fornecedor, SKU da linha, descrição, quantidade, preço unitário, valor da linha, total. Use-o igualmente para pedidos, notas fiscais e notas de entrega.",
            "Extraia cada nota recebida para esse esquema. É a etapa que a maioria das equipes pula, e é a etapa que torna possível tudo o que vem depois.",
            "Normalize os códigos de peça do fornecedor para os seus SKUs com uma consulta ao seu cadastro de itens; onde não houver correspondência, pareie as linhas pela semelhança semântica da descrição, não pelo texto exato.",
            "Verifique primeiro a nota contra ela mesma: preço unitário vezes quantidade dá o valor da linha, e as linhas somam o total? Erros de conta são os mais baratos de pegar e os mais constrangedores de pagar.",
            "Concilie os campos do cabeçalho pelo número do pedido e depois as linhas dentro do pedido conciliado. Aplique sua política de tolerância em cada dimensão.",
            "Encaminhe só as exceções para um revisor, com a nota, o pedido e a divergência específica diante dele. Lance as conciliadas direto no ERP.",
            "Mantenha uma trilha de auditoria de quem aprovou o quê e quando. Os auditores pedem; o fornecedor também, quando contesta um pagamento a menor.",
          ],
        },
      ],
      tavnit: {
        heading: "Onde o Tavnit entra",
        paragraphs: [
          "O Tavnit faz a extração e a padronização. Pedidos de compra, notas fiscais e notas de entrega chegam por e-mail ou API e são extraídos para os mesmos campos tipados, seja qual for o layout do fornecedor. Um Cleaner de consulta mapeia os códigos de peça do fornecedor para os seus SKUs; um Cleaner de fórmula confere a aritmética das linhas; uma condição sinaliza o que estiver fora da sua tolerância.",
          "Para a conciliação linha a linha, um Matcher toma a execução do pedido como referência e pareia cada linha da nota com ela — semanticamente, com um LLM como desempate nos pares duvidosos —, colocando quantidade e preço unitário lado a lado e listando as linhas sem par como alertas. As notas sinalizadas ficam pausadas para um revisor designado, com trilha de auditoria imutável; o resto vai para o seu ERP por API ou webhook.",
        ],
        links: [
          { label: "Software de conciliação com pedidos de compra", href: "/use-cases/purchase-orders" },
          { label: "Processamento de notas fiscais", href: "/use-cases/invoice-processing" },
          { label: "Notas de entrega e conferência de recebimento", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "Qual a diferença entre a conciliação de duas e de três vias?", a: "A conciliação de duas vias compara a nota fiscal com o pedido de compra — concordamos em comprar isto por este preço? A de três vias também compara com o comprovante de recebimento — a mercadoria chegou mesmo? A de três vias é o padrão para mercadorias físicas; a de duas vias é comum para serviços e compras de baixo valor." },
        { q: "A conciliação com o pedido de compra pode ser totalmente automatizada?", a: "A comparação, sim. O que resiste à automação é colocar o PDF da nota do fornecedor no mesmo formato estruturado do seu pedido, porque o layout, os códigos de peça e as descrições de cada fornecedor são diferentes. Com a extração automatizada, conciliar vira uma consulta, e só as exceções precisam de uma pessoa." },
        { q: "Que tolerância devo definir na conciliação?", a: "Não existe um número universal. A maioria das políticas permite uma pequena variação percentual ou absoluta no preço unitário, variação zero na quantidade para mercadorias físicas, e trata frete e sobretaxas como linhas aceitáveis à parte. O importante é que a regra esteja escrita e seja aplicada de forma consistente pelo sistema." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Extração de itens de linha de notas fiscais: o que é e por que é difícil",
      h1: "Extração de itens de linha de notas fiscais",
      description:
        "Por que extrair os itens de uma nota fiscal é mais difícil que extrair os totais, o que uma boa extração de itens devolve e como obter os dados da tabela de qualquer layout de fornecedor sem modelos.",
      lede: "A extração de itens de linha tira a tabela repetida de uma nota fiscal — cada produto ou serviço com descrição, SKU, quantidade, preço unitário e valor — e a transforma em linhas estruturadas, em vez de pegar só os campos do cabeçalho, como fornecedor, data e total. É ela que torna possíveis a conciliação com pedidos, a análise de gastos e a conciliação de estoque, e é a parte que a maioria das ferramentas de OCR erra.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Campos do cabeçalho versus itens de linha",
          paragraphs: [
            "Toda nota fiscal tem alguns campos de cabeçalho — fornecedor, número da nota, data, vencimento, moeda, total — que aparecem uma vez e são fáceis de localizar. Depois vem a tabela. Ela pode ter três linhas ou trezentas; pode ocupar várias páginas; pode ter um conjunto de colunas diferente da tabela de qualquer outro fornecedor. Extrair o cabeçalho diz quanto pagar. Extrair as linhas diz pelo que você está pagando, que é a pergunta que todo processo seguinte realmente faz.",
            "A análise de gastos precisa das categorias das linhas. A conciliação com pedidos precisa das quantidades e dos preços das linhas. O estoque precisa dos SKUs das linhas. Os impostos precisam das alíquotas por linha. Uma nota extraída sem as linhas é uma ordem de pagamento sem conteúdo.",
          ],
        },
        {
          heading: "Por que as tabelas são a parte difícil",
          paragraphs: [
            "Um total é um único valor em uma região previsível da página. Uma tabela é uma estrutura, e a estrutura muda em todo lugar. O OCR clássico lê caracteres e posições; ele não sabe que o número abaixo de “Qtd” pertence à descrição duas células à esquerda, nem que a descrição quebrou para uma segunda linha, nem que as três últimas linhas são subtotais e não itens.",
          ],
          bullets: [
            "O conjunto de colunas varia por fornecedor: alguns têm SKU e descrição, outros só descrição, outros dividem o preço unitário em líquido e bruto.",
            "Descrições de várias linhas quebram, e a segunda linha parece uma nova linha para um leitor baseado em posição.",
            "As tabelas atravessam páginas, com ou sem cabeçalhos repetidos, e com totais parciais no fim de cada uma.",
            "Linhas que não são itens — subtotais, descontos, frete, impostos, “continua” — ficam dentro da tabela e precisam ser classificadas, não extraídas como produtos.",
            "Células mescladas, números alinhados à direita invadindo a coluna seguinte e digitalizações tortas quebram qualquer leitura baseada em coordenadas.",
            "Unidades e tamanhos de embalagem se escondem na descrição (“por caixa com 12”) em vez de terem coluna própria.",
          ],
        },
        {
          heading: "Extração com modelos versus sem modelos",
          paragraphs: [
            "As ferramentas baseadas em modelos resolvem as tabelas fazendo você desenhar a região da tabela e as colunas para o layout de cada fornecedor. Funciona — para aquele fornecedor, até ele mudar o formato da nota, quando passa a produzir linhas erradas em silêncio até alguém perceber. O custo de manutenção cresce com o número de fornecedores, e é por isso que equipes com centenas deles abandonam essas ferramentas.",
            "A extração sem modelos usa um modelo de IA que entende o que é uma linha de nota fiscal, como uma pessoa entende, e devolve linhas de acordo com um esquema que você define uma vez — descrição, quantidade, preço unitário, valor —, independentemente do layout. A contrapartida é que um modelo pode ler errado, e por isso o resultado deve ser verificado, não aceito de olhos fechados: conferências aritméticas em cada linha e revisão humana quando uma conferência falha.",
          ],
        },
        {
          heading: "Como é uma boa saída de itens de linha",
          paragraphs: [
            "A saída deve ser uma tabela, não texto: uma linha por item, uma coluna tipada por campo, com números como números e datas como datas. Cada linha deve trazer os campos de que o seu processo seguinte precisa e nada que pertença ao cabeçalho. Linhas que não são itens devem ser excluídas ou sinalizadas, não misturadas. E a saída deve ser verificável: se preço unitário vezes quantidade não der o valor da linha, essa linha está errada e deve dizer isso.",
          ],
          bullets: [
            "Descrição — literal, porque é dela que qualquer conciliação ou categorização posterior é derivada.",
            "SKU ou código de peça — o do fornecedor, mais o seu, se uma consulta conseguir resolvê-lo.",
            "Quantidade e unidade de medida — em campos separados.",
            "Preço unitário e valor da linha — os dois, para que a conta possa ser conferida.",
            "Alíquota ou código de imposto por linha, quando a legislação exigir.",
            "Um status de verificação por linha: conta conferida, ou sinalizada com o motivo.",
          ],
        },
      ],
      tavnit: {
        heading: "Onde o Tavnit entra",
        paragraphs: [
          "No Tavnit, os itens de linha são campos de tabela de um Flow: você nomeia as colunas uma vez, e toda nota de todo fornecedor é extraída para essas colunas como linhas tipadas, sem modelo por fornecedor. Um Cleaner de fórmula confere preço unitário vezes quantidade em cada linha; um Cleaner de consulta resolve os códigos de peça do fornecedor para os seus SKUs; um Cleaner de categoria atribui categorias de gasto. Linhas que falham numa conferência mandam a execução para um revisor. Os resultados ficam em um Bucket que você pode consultar ou transformar em gráficos, ou vão direto para os seus sistemas por API ou webhook.",
        ],
        links: [
          { label: "Extração de dados de notas fiscais", href: "/use-cases/invoice-processing" },
          { label: "Flows — como definir campos de tabela", href: "/docs/flows" },
          { label: "Cleaners — campos de fórmula e de consulta", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "O OCR consegue extrair os itens de linha de notas fiscais?", a: "O OCR puro extrai caracteres e suas posições; ele não entende a estrutura da tabela, então produz um texto que ainda precisa ser convertido em linhas. Uma extração confiável de itens precisa de uma camada que entenda o que é uma linha de nota fiscal: ou um modelo por fornecedor, ou um modelo de IA que generalize entre layouts." },
        { q: "Como extrair tabelas de notas fiscais sem um modelo por fornecedor?", a: "Use um modelo de extração que devolva linhas de acordo com um esquema que você define — descrição, quantidade, preço unitário, valor —, seja qual for o layout, e depois verifique cada linha com uma conferência aritmética, encaminhando as falhas para um revisor. É isso que os campos de tabela do Tavnit fazem." },
        { q: "Como lidar com tabelas de notas fiscais com várias páginas?", a: "A extração deve tratar a tabela como uma única tabela lógica ao longo das páginas, ignorando cabeçalhos repetidos e totais parciais por página, e devolver um único conjunto de linhas. Confira se as linhas somam o total da nota para garantir que nada se perdeu numa quebra de página." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "Classificação de códigos SH explicada — e como automatizá-la",
      h1: "Classificação de códigos SH: o que é e como automatizá-la",
      description:
        "Como funciona o Sistema Harmonizado, por que a classificação tarifária é trabalho de julgamento, onde entram as Regras Gerais de Interpretação e como é uma automação responsável.",
      lede: "A classificação de códigos SH atribui a cada produto comercializado um código do Sistema Harmonizado, a nomenclatura internacional que as autoridades aduaneiras usam para determinar alíquotas, impostos e controles. Os seis primeiros dígitos são globais; cada país os estende para oito, dez ou mais dígitos nas suas linhas tarifárias nacionais. Errar o código significa o imposto errado, um embarque atrasado ou uma multa.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Como o Sistema Harmonizado é estruturado",
          paragraphs: [
            "O Sistema Harmonizado é mantido pela Organização Mundial das Aduanas e revisado mais ou menos a cada cinco anos; a edição atual é o SH 2022. Ele se organiza em 21 seções, 97 capítulos (2 dígitos), posições (4 dígitos) e subposições (6 dígitos). Esses seis dígitos são idênticos em todos os países membros, e é isso que torna o sistema harmonizado. Além dos seis dígitos, cada país acrescenta suas próprias subdivisões — as linhas tarifárias nacionais —, às quais se vinculam as alíquotas de importação e os impostos internos.",
            "O Arancel Nacional de Importación do Panamá, por exemplo, estende a nomenclatura do SH 2022 para cerca de 9.700 linhas tarifárias nacionais, cada uma com seu imposto de importação (DAI), seu imposto sobre vendas (ITBMS) e, quando aplicável, o imposto seletivo ao consumo (ISC). Uma classificação não termina nos seis dígitos; termina quando chega à linha nacional que determina o que é devido.",
          ],
        },
        {
          heading: "Por que classificar é julgamento, não consulta",
          paragraphs: [
            "Se a classificação fosse uma consulta a dicionário — entra o nome do produto, sai o código —, teria sido automatizada décadas atrás. Não é, porque a nomenclatura classifica as mercadorias pelo material de que são feitas, pela função que exercem e pela forma como são apresentadas, e uma única descrição de produto pode caber de forma plausível em várias posições. Uma capa de banco de carro aquecida é um artigo têxtil, uma peça de veículo ou um aparelho elétrico de aquecimento? Cada um tem uma alíquota diferente.",
            "Os critérios de desempate são as Regras Gerais para a Interpretação do Sistema Harmonizado, as RGI. A Regra 1 diz que prevalecem os textos das posições e as notas legais de seção e de capítulo. A Regra 2 trata de mercadorias incompletas e de misturas. A Regra 3 resolve mercadorias que poderiam se enquadrar em duas ou mais posições — primeiro a descrição mais específica, depois a característica essencial, depois a posição que vem por último na ordem numérica. As Regras 4 a 6 tratam de mercadorias não incluídas em outro lugar, de embalagens e da classificação no nível de subposição. Uma classificação defensável cita a regra em que se baseou.",
            "E há as notas legais: notas de capítulo e de seção que incluem ou excluem mercadorias específicas de uma posição, independentemente do que o texto da posição pareça dizer. Um classificador que lê os títulos das posições e ignora as notas vai errar com toda a confiança em um conjunto previsível de produtos.",
          ],
        },
        {
          heading: "Onde a classificação erra na prática",
          paragraphs: [
            "A maior parte das classificações erradas não é um caso difícil de RGI 3. É um produto comum mal descrito. A fatura comercial diz “peças” ou “amostras” ou um nome de marca, e quem classifica ou chuta ou para para perguntar. A descrição é a matéria-prima da classificação, e costuma ser a informação mais fraca do processo.",
          ],
          bullets: [
            "Descrições vagas na fatura comercial — uma marca ou um número de modelo, sem dizer o que o item é ou de que é feito.",
            "Embarques mistos em que uma linha da fatura abrange vários produtos distintos que se classificam de forma diferente.",
            "Confiar no código SH declarado pelo fornecedor, classificado sob a tarifa de outro país e possivelmente para outra finalidade.",
            "Reaproveitar o código do ano passado depois que uma nova edição do SH mudou o produto de lugar.",
            "Ignorar as notas de capítulo e classificar só pelo título da posição.",
            "Nenhum registro de por que um código foi escolhido, de modo que o mesmo produto é classificado de três jeitos por três pessoas.",
          ],
        },
        {
          heading: "Como é uma automação responsável",
          paragraphs: [
            "O objetivo não é uma máquina que classifique sem supervisão. A legislação aduaneira atribui a declaração ao importador ou ao despachante habilitado, e vai continuar atribuindo. O objetivo é um sistema que proponha uma classificação com o seu raciocínio, no momento em que a documentação do embarque é processada, para que o especialista revise em vez de pesquisar.",
          ],
          bullets: [
            "Parta da descrição da mercadoria extraída, literal, mais os detalhes de material, função e composição presentes na fatura ou no romaneio.",
            "Classifique contra a tarifa nacional — o conjunto completo de linhas nacionais com suas alíquotas —, não só contra o SH de seis dígitos, e contra a edição vigente.",
            "Aplique as notas legais de capítulo e de seção e as RGI, e registre qual regra e qual nota decidiram o caso.",
            "Devolva um código, um grau de confiança e o raciocínio; encaminhe linhas de baixa confiança ou de alto valor para revisão de um despachante antes de registrar a declaração.",
            "Mantenha uma trilha de auditoria por classificação. Quando a aduana questionar um código dois anos depois, o raciocínio é a defesa.",
            "Aprenda com as correções do despachante: um produto classificado uma vez deve ser classificado do mesmo jeito na próxima.",
          ],
        },
      ],
      tavnit: {
        heading: "Onde o Tavnit entra",
        paragraphs: [
          "O Tavnit extrai o conjunto de documentos do embarque — fatura comercial, romaneio, conhecimento de embarque, certificado de origem — para campos tipados, e então um Cleaner de código SH classifica cada linha de mercadoria a partir da descrição extraída, na mesma execução. Para o Panamá, o classificador trabalha sobre o Arancel Nacional oficial (VII Enmienda, SH 2022), com suas linhas nacionais e as alíquotas de DAI, ITBMS e ISC, aplicando as notas legais de capítulo e as RGI, de modo que o resultado é uma linha tarifária nacional com raciocínio, e não um palpite de seis dígitos.",
          "As classificações passam pela revisão humana antes de qualquer registro, com uma trilha de auditoria imutável de quem aprovou cada código. Os dados estruturados e classificados podem então preencher previamente o formulário da declaração, em vez de serem redigitados nele.",
        ],
        links: [
          { label: "Automação aduaneira com classificação SH", href: "/use-cases/customs-trade" },
          { label: "Aduanas y clasificación arancelaria (Panamá) — em espanhol", href: "/es/aduanas" },
          { label: "Cleaners — tipo de campo código SH", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Qual a diferença entre um código SH e um código tarifário?", a: "O código SH é o código internacional de seis dígitos definido pela Organização Mundial das Aduanas. Um código tarifário é a extensão que cada país faz dele — oito, dez ou mais dígitos —, à qual se vinculam as alíquotas nacionais de impostos. O Arancel Nacional do Panamá, a TARIC da UE e o HTS dos EUA são todas tarifas nacionais construídas sobre o SH." },
        { q: "A IA consegue classificar códigos SH com precisão?", a: "Ela consegue propor boas classificações quando trabalha a partir de uma boa descrição do produto, contra a tarifa nacional completa com suas notas legais, e explica o seu raciocínio. Não deve registrar declarações sem supervisão: a abordagem responsável é uma proposta com grau de confiança e raciocínio, revisada por um despachante habilitado nas linhas de baixa confiança ou alto valor." },
        { q: "Posso simplesmente usar o código SH que o fornecedor colocou na fatura?", a: "Trate-o como uma pista, não como uma resposta. O fornecedor classificou sob a tarifa do próprio país, possivelmente para controle de exportação e não para o imposto de importação, e possivelmente sob uma edição mais antiga do SH. O importador ou o despachante é responsável pelo código na declaração de importação." },
      ],
    },
  ],
};

export default ptBR;
