import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — Português (Brasil) (pt-BR). */
const ptBR: IntegrationsContent = {
  hub: {
    title: "Integrações — API, E-mail, Webhooks e MCP",
    description:
      "Todas as formas de entrar no Tavnit e sair dele: um conector MCP para assistentes de IA, uma API REST, encaminhamento por e-mail, webhooks e receitas para Zapier, Make e n8n.",
    ogTitle: "Integrações do Tavnit",
    breadcrumbHome: "Início",
    h1: "Integrações",
    intro:
      "Os documentos chegam ao Tavnit do jeito que for melhor para quem os envia — arrastados para o app, encaminhados para um endereço, enviados a um endpoint ou solicitados por um assistente de IA. Os dados extraídos saem pelos mesmos caminhos.",
    introMore:
      "Todas as rotas executam os mesmos Flows, então o esquema, as regras de limpeza e as etapas de revisão que você configurou valem seja qual for a forma como o documento chega.",
    whichHeading: "Qual delas você deve usar?",
    which: [
      "**Se são pessoas que enviam os documentos** — por exemplo, uma caixa de contas a pagar que recebe notas fiscais de fornecedores —, use o [e-mail](/docs/email-integration). Ninguém precisa aprender uma ferramenta nova; basta encaminhar como já fazem hoje.",
      "**Se é um sistema que os envia**, use a [API REST](/docs/api-integration) e receba os resultados de volta por [webhook](/docs/webhooks). Se preferir não escrever código de integração, os mesmos endpoints funcionam a partir do Zapier, Make, n8n e Power Automate.",
      "**Se você trabalha junto com um assistente de IA**, use o [conector MCP](/integrations/mcp). Ele dá ao claude.ai ou ao Cursor o pipeline inteiro, não só uma porta de entrada: seu assistente pode criar Flows de extração, anexar regras de limpeza, processar documentos com eles e consultar o que você já extraiu — sem você ter que mover arquivos à mão.",
    ],
    finalHeading: "Comece com um documento",
    finalBody:
      "Crie um Flow, envie algo por ele e configure a entrega quando já estiver vendo o resultado. Créditos grátis para começar.",
    finalCta: "Comece grátis",
  },
  items: [
    {
      label: "Conector MCP",
      href: "/integrations/mcp",
      summary:
        "Adicione o Tavnit ao claude.ai, ao Cursor ou a qualquer cliente MCP. Seu assistente pode criar Flows de extração, anexar regras de limpeza, processar documentos com eles e consultar os dados extraídos — tudo pelo chat.",
      own: true,
    },
    {
      label: "API REST",
      href: "/docs/api-integration",
      summary:
        "Envie documentos de forma programática com uma chave de API. Upload multipart ou base64, com exemplos em Python e JavaScript.",
      own: false,
    },
    {
      label: "E-mail",
      href: "/docs/email-integration",
      summary:
        "Encaminhe documentos, manual ou automaticamente, para um endereço exclusivo e tenha cada anexo extraído — com os resultados enviados por e-mail a quem precisar, sem abrir o app.",
      own: false,
    },
    {
      label: "Webhooks",
      href: "/docs/webhooks",
      summary:
        "Envie resultados tipados para o seu próprio endpoint assim que uma execução termina, para que os dados extraídos cheguem aos seus sistemas automaticamente.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n e Power Automate",
      href: "/docs/api-integration",
      summary:
        "Receitas no-code que chamam os mesmos endpoints, para equipes que preferem montar a integração visualmente em vez de escrever código.",
      own: false,
    },
    {
      label: "Buckets",
      href: "/docs/buckets",
      summary:
        "Guarde as linhas extraídas em um armazenamento estruturado integrado — edite-as no lugar, consulte e crie gráficos, ou exporte para CSV e Excel.",
      own: false,
    },
  ],
  mcp: {
    title: "Extração de documentos via MCP para Claude e Cursor",
    description:
      "Conecte o Tavnit ao claude.ai ou ao Cursor via MCP. Seu assistente pode criar Flows de extração, processar documentos com eles e consultar os resultados — tipados e limpos.",
    ogTitle: "Servidor MCP para extração de documentos | Tavnit",
    schemaHeadline: "Servidor MCP para extração de documentos — Claude e Cursor",
    schemaName: "Conector MCP",
    breadcrumbHome: "Início",
    breadcrumbHub: "Integrações",
    breadcrumbSelf: "Conector MCP",
    badge: "Model Context Protocol",
    h1: "Dê ao seu assistente de IA um pipeline de documentos de verdade",
    lede:
      "O Tavnit tem um servidor MCP. Conecte-o ao claude.ai ou ao Cursor e seu assistente ganha o pipeline de documentos completo: pode criar Flows de extração, anexar regras de limpeza, enviar documentos por eles e ler os resultados de volta — exatamente os campos que você definiu, limpos e tipados, em vez de uma interpretação de um arquivo que recebeu.",
    ledeMore: "A configuração é uma URL que você cola nas configurações do seu assistente. Sem SDK, sem servidor para manter, sem código.",
    ctaStart: "Comece grátis",
    ctaSetup: "Guia de configuração",
    problemHeading: "Por que os assistentes têm dificuldade com documentos",
    problem: [
      "Assistentes de IA são bons em raciocinar e ruins em ser um pipeline de dados. Entregue a um deles uma nota fiscal digitalizada e ele vai lê-la — provavelmente certo, às vezes não, e de outro jeito na segunda vez. Não há esquema, então os nomes dos campos mudam de uma execução para outra. Não há validação, então um total lido errado parece exatamente igual a um correto. E não há registro do que aconteceu, o que importa assim que o resultado toca a contabilidade ou o compliance.",
      "Isso serve para uma pergunta pontual, mas é inviável como processo. O que um assistente realmente precisa é de uma ferramenta que já saiba ler os seus documentos.",
    ],
    compareHeading: "Colar um PDF vs. chamar um Flow",
    compareCapability: "Recurso",
    compareChat: "Colando o arquivo no chat",
    compareMcp: "Pelo conector MCP",
    compareRows: [
      ["Formato da saída", "O que o modelo devolver daquela vez", "Os campos que o seu Flow define, sempre"],
      ["Nomes dos campos", "Mudam entre execuções", "Fixados pelo seu esquema"],
      ["Regras de limpeza", "Nenhuma", "Cleaners aplicados automaticamente"],
      ["Revisão humana", "Impossível", "Opcional, com trilha de auditoria"],
      ["Onde os resultados ficam", "No chat", "Buckets, webhook, e-mail ou API"],
      ["Repetível em volume", "Não", "Sim — o mesmo Flow, para qualquer número de documentos"],
    ],
    capabilitiesHeading: "O que seu assistente pode fazer depois de conectado",
    capabilities: [
      {
        title: "Criar um Flow só descrevendo-o",
        body: "Diga ao assistente o que capturar — fornecedor, datas, totais, itens — e ele cria o Flow de extração na sua organização, pronto para rodar. Montar um pipeline vira uma mensagem no chat, não uma tarde de configuração.",
      },
      {
        title: "Anexar regras de limpeza",
        body: "Peça totais convertidos para USD, datas normalizadas ou valores conferidos com dados de referência, e o assistente cria o Cleaner e o anexa ao Flow — as mesmas regras passam a valer para todos os documentos futuros, cheguem como chegarem.",
      },
      {
        title: "Processar um documento com um Flow",
        body: "Peça ao assistente que processe uma nota fiscal, um contrato ou um formulário com um dos seus Flows de extração. Ele devolve os campos que você definiu, tipados e limpos, não um parágrafo descrevendo-os.",
      },
      {
        title: "Consultar o que você já extraiu",
        body: "Faça perguntas sobre os seus Buckets — quanto você pagou a um fornecedor no último trimestre, quais contratos renovam no mês que vem — e a resposta vem dos seus dados reais, não da memória do modelo.",
      },
    ],
    askHeading: "Coisas que você pode pedir:",
    ask: [
      "Crie um Flow que capture o fornecedor, as datas, os totais e os itens das nossas faturas de frete.",
      "Adicione a esse Flow um Cleaner que converta todos os totais para USD.",
      "Processe esta nota fiscal com o meu Flow de Notas de Fornecedores e mostre os itens.",
      "Quanto pagamos à Acme Corp no último trimestre, segundo o meu Bucket de Notas Fiscais?",
      "Extraia as datas de renovação destes três contratos e compare-as.",
      "Quais execuções estão aguardando revisão agora?",
    ],
    fitsHeading: "Ele usa o pipeline que você já montou",
    fitsIntro:
      "O conector não é um motor de extração à parte. Ele chama os mesmos Flows que o resto do Tavnit — tenham sido criados por você no app ou pelo assistente —, o que significa que cada regra que você configurou continua valendo quando é um assistente quem faz o pedido.",
    fits: [
      "As [Collections](/docs/collections) continuam classificando cada documento recebido e encaminhando-o ao Flow certo.",
      "Os [Cleaners](/docs/cleaners) continuam padronizando formatos, convertendo moedas e aplicando suas consultas.",
      "A [revisão humana](/docs/human-in-the-loop) continua pausando uma execução quando você pediu — um assistente não pode pular a sua etapa de aprovação.",
      "Os [Buckets](/docs/buckets) continuam recebendo os resultados, então o que o assistente extrai pode ser consultado depois.",
    ],
    scopeHeading: "Escopo e acesso",
    scopeCards: [
      {
        title: "Suas permissões, nada além",
        body: "O conector é emitido a partir da sua própria chave de API e só alcança a organização em que você o gerou. O assistente herda a sua função — não pode fazer nada que você não poderia fazer no app.",
      },
      {
        title: "Trate a URL como uma credencial",
        body: "Qualquer pessoa com a URL do conector pode acessar seus Flows e Buckets. As URLs têm validade limitada, e renovar uma invalida a anterior imediatamente.",
      },
    ],
    scopeMore:
      "Todos os detalhes na [documentação do conector](/docs/mcp-connector) e na [referência de funções de usuário](/docs/user-roles). O endpoint do servidor é `{mcpUrl}`.",
    setupHeading: "Como conectar",
    setupBody:
      "Gere uma URL de conector na página de Integrações do Tavnit e cole-a no claude.ai em Settings → Connectors, ou adicione-a ao Cursor como servidor MCP remoto. Leva poucos minutos e não exige código.",
    setupLink: "Leia o guia de configuração passo a passo",
    faqHeading: "Perguntas frequentes",
    faqs: [
      {
        q: "Qual a diferença em relação a colar um PDF no Claude?",
        a: "Colar um PDF pede ao assistente que leia um documento que ele nunca viu, em um formato que não foi feito para ele interpretar, sem esquema e sem como conferir o resultado. O conector MCP passa o documento por um Flow de extração que você definiu, então você recebe sempre os mesmos campos nomeados, nos mesmos tipos, com as mesmas regras de limpeza e a mesma etapa de revisão aplicadas. O assistente recebe dados estruturados em vez de uma interpretação.",
      },
      {
        q: "O assistente pode criar Flows e Cleaners, ou só executá-los?",
        a: "As duas coisas. Pelo conector, o assistente pode criar Flows de extração e regras de limpeza do mesmo jeito que você faria no app: descreva em linguagem natural os campos, as tabelas e as transformações que deseja, e eles são criados na sua organização, prontos para rodar em todos os documentos futuros. A criação segue a sua função — Owners e Admins podem criar; Members e Viewers ficam restritos a executar ou só visualizar.",
      },
      {
        q: "Quais assistentes de IA funcionam com ele?",
        a: "O claude.ai no plano Pro ou superior, o Cursor e qualquer cliente que aceite a URL de um servidor MCP remoto. O MCP é um protocolo aberto, então o suporte não se limita a um fornecedor específico.",
      },
      {
        q: "Preciso escrever código?",
        a: "Não. Você gera uma URL de conector no Tavnit e a cola nas configurações do seu assistente. Montar o Flow que ele chama também é no-code — você descreve os campos que quer e o Tavnit os extrai.",
      },
      {
        q: "O assistente consegue ver tudo da conta da minha empresa?",
        a: "Não. O conector é emitido a partir da sua própria chave de API, então só alcança a organização em que você estava conectado, com as permissões da sua função. Um Member não pode fazer um assistente realizar algo que um Member não pode fazer no app, e Buckets privados continuam privados, a menos que você tenha recebido acesso.",
      },
      {
        q: "Usar o conector custa a mais?",
        a: "Não. Documentos processados pelo conector consomem créditos na taxa normal de um crédito por página, igual a fazer upload pelo app ou chamar a API. Não há cobrança separada pelo acesso via MCP.",
      },
      {
        q: "O que acontece quando a URL do conector expira?",
        a: "As URLs de conector têm validade limitada, e o Tavnit mostra quando a sua foi criada e quando expira. Renovar gera uma nova URL e invalida a anterior imediatamente, então qualquer cliente que ainda use a antiga para de funcionar até você colar o novo valor.",
      },
    ],
    finalHeading: "Aponte seu assistente para documentos reais",
    finalBody:
      "Crie um Flow, gere uma URL de conector e comece a perguntar. Créditos grátis para começar, sem cartão de crédito.",
    finalPricing: "Ver preços",
    finalDemo: "Agendar uma demonstração",
  },
};

export default ptBR;
