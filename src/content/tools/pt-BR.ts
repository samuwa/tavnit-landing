import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Português (Brasil) (pt-BR), translated from ./en.ts.
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 *
 * Portuguese note: prepositions contract with articles ("de" + "a fatura" =
 * "da fatura"), so the base never puts a preposition before {the_doc} /
 * {this_doc}; after a preposition it uses {your_doc}, {each_doc},
 * {another_doc} or {all_your_docs}, which read correctly for every gender.
 */

const INVOICE_VOCAB = {
  doc: "fatura",
  docs: "faturas",
  a_doc: "uma fatura",
  the_doc: "a fatura",
  the_docs: "as faturas",
  your_doc: "sua fatura",
  your_docs: "suas faturas",
  all_your_docs: "todas as suas faturas",
  all_docs: "todas as faturas",
  each_doc: "cada fatura",
  another_doc: "outra fatura",
  this_doc: "esta fatura",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc} para Excel grátis: extraia os itens de qualquer {doc} com IA",
    description:
      "Envie {a_doc} em PDF ou foto e receba os itens em uma tabela do Excel: descrição, quantidade, preço unitário e total. Grátis, sem modelos e sem cadastro para ver o resultado.",
    label: "{Doc} para Excel",
    h1: "Transforme {a_doc} em Excel",
    intro:
      "Envie o PDF ou a foto. O Tavnit lê o cabeçalho e cada linha da tabela e devolve tudo como planilha. Sem modelos por fornecedor: a mesma ferramenta funciona com {all_your_docs}.",
    trust: ["PDF, JPG ou PNG · até 5 páginas", "{limit} documentos grátis por dia", "Tudo é apagado após 24 h"],
    drop: {
      title: "Arraste {your_doc} para cá",
      hint: "ou escolha um arquivo do seu computador",
      choose: "Escolher arquivo",
      sample: "Testar com {a_doc} de exemplo",
      formats: "PDF, JPG ou PNG · até 4 MB e 5 páginas",
    },
    stages: [
      "Enviando o documento",
      "Lendo o cabeçalho",
      "Encontrando a tabela de itens",
      "Organizando as colunas",
      "Quase lá",
    ],
    result: {
      heading: "Pronto: {file}",
      rowWord: ["linha", "linhas"],
      pageWord: ["página", "páginas"],
      summary: "{rows} · {pages}",
      truncated: "Mostrando {shown} de {total} linhas. O Excel traz as mesmas {shown}.",
      readyIn: "pronto em {s} s",
      sum: "Soma",
      viewer: "Seu documento",
      openDocument: "Ver o documento",
      closeDocument: "Fechar",
      retention: "é apagado sozinho após 24 h",
      hideColumn: "Remover coluna",
      hiddenCols: ["1 coluna removida. O Excel sai sem ela.", "{n} colunas removidas. O Excel sai sem elas."],
      restoreAll: "Restaurar todas",
      restoreOne: "Restaurar {col}",
      ghostColumn: "+ Seu campo",
      ghostHint: "No Tavnit você adiciona os campos que quiser: número do pedido, vencimento, centro de custo…",
      flowNote: "Estas {fields} colunas são os campos de um Flow fixo de {doc}. Na sua conta, quem escolhe os campos é você.",
      flowNoteCta: "Veja como",
      download: "Baixar Excel",
      downloading: "Preparando o arquivo",
      another: "Processar {another_doc}",
      empty: "Não encontramos uma tabela de itens neste documento. Teste com {a_doc} que tenha quantidades e preços por linha.",
    },
    errors: {
      empty: "O arquivo está vazio.",
      too_large: "O arquivo passa de 4 MB. Comprima-o ou envie só as páginas que interessam.",
      unsupported: "Só aceitamos arquivos PDF, JPG ou PNG.",
      unreadable: "Não conseguimos abrir este PDF. Se ele tiver senha, remova a proteção e tente de novo.",
      too_many_pages: "A versão grátis processa até 5 páginas por documento.",
      captcha: "Não conseguimos confirmar que você não é um robô. Recarregue a página e tente de novo.",
      quota: "Você já usou seus {limit} documentos grátis de hoje. Eles voltam amanhã, ou crie uma conta para continuar.",
      daily_cap: "A ferramenta grátis atingiu a capacidade de hoje. Volte amanhã, ou crie uma conta e continue agora mesmo.",
      unavailable: "A ferramenta não está disponível no momento. Tente de novo em alguns minutos.",
      backend: "Algo deu errado ao processar o documento. Tente de novo.",
      failed: "Não conseguimos extrair este documento. Teste com {another_doc} ou com o exemplo.",
      timeout: "Está demorando mais que o normal. Aguarde um instante e tente de novo.",
      forbidden: "Esta ação não é permitida a partir daqui.",
      bad_request: "O arquivo está faltando ou não pôde ser lido.",
    },
    auth: {
      title: "Crie uma conta grátis para baixar",
      body: "O Excel é baixado na hora. Com uma conta, você também pode fazer isso com {all_your_docs} de uma vez só.",
      google: "Continuar com o Google",
      or: "ou com seu e-mail",
      signin: "Entrar",
      signup: "Criar conta",
      name: "Nome",
      email: "E-mail",
      password: "Senha",
      submitSignin: "Entrar e baixar",
      submitSignup: "Criar conta e baixar",
      switchToSignin: "Já tenho uma conta",
      switchToSignup: "Ainda não tenho conta",
      checkEmail:
        "Enviamos um e-mail para confirmar a conta. Abra-o e, quando voltar, o Excel estará pronto para baixar.",
      existing: "Esse e-mail já tem uma conta. Entre para baixar.",
      forgot: "Esqueci minha senha",
      close: "Fechar",
      generic: "Não conseguimos concluir o cadastro. Confira o e-mail e a senha e tente de novo.",
    },
    next: {
      heading: "E depois?",
      lead: "Isso foi {a_doc}. Com uma conta, o mesmo acontece com {each_doc} que chegar, e os itens não param em um Excel: seguem adiante sozinhos.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Extraction Flow",
      items: [
        {
          short: "Chega no seu e-mail",
          via: "e-mail",
          title: "O resultado chega no seu e-mail",
          body: "Quando a extração termina, o Tavnit envia um e-mail para os endereços que você definiu no Flow, com as linhas no anexo rows.csv. Com a revisão ativada, o e-mail espera a aprovação.",
          linkLabel: "Saída por e-mail",
          href: "/docs/email-integration",
          scene: [{ label: "A extração termina" }, { label: "O Tavnit monta o e-mail" }, { label: "Chega a quem você escolher", result: "rows.csv anexado" }],
        },
        {
          short: "Entra no seu ERP",
          via: "webhook",
          title: "Entra no seu ERP por webhook",
          body: "Quando uma execução termina, o Tavnit faz um POST com as linhas e o run_id para a URL que você informar. Zapier, Make e n8n recebem com o gatilho de webhook deles; não é preciso nada nativo.",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "As linhas extraídas" }, { label: "Um POST com rows e run_id" }, { label: "Aparecem no seu sistema", result: "6 itens, ninguém digitou" }],
        },
        {
          short: "Revisão antes de lançar",
          via: "revisão",
          title: "Uma pessoa aprova antes do lançamento",
          body: "Ative a revisão no Flow e cada execução fica em pausa. Quem revisa vê a tabela editável ao lado do documento original: corrige células, exclui linhas, adiciona colunas e aprova ou rejeita. Só com a aprovação saem o e-mail, o webhook e o Bucket; cada decisão fica registrada. Existe um papel só de revisão para quem não deve ver mais nada.",
          linkLabel: "Revisão humana",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "A execução pausa para revisão" }, { label: "Uma pessoa corrige ao lado do documento" }, { label: "Aprovado: só então é entregue", result: "1 célula corrigida · registrado" }],
        },
        {
          short: "Compare cotações",
          via: "Matcher",
          title: "Compare várias cotações item por item",
          body: "Um Matcher pega várias execuções do mesmo Flow, por exemplo três cotações de fornecedores, pareia os itens pela descrição e marca o mais barato de cada linha em uma coluna Champion.",
          linkLabel: "Cotações de fornecedores",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Três cotações, um só Flow" }, { label: "O Matcher pareia os itens" }, { label: "Coluna Champion: o melhor por linha", result: "Fornecedor B vence 4 de 5" }],
        },
        {
          short: "Regras e validações",
          via: "Cleaner",
          title: "Um Cleaner limpa e valida cada linha",
          body: "Formato de data, formato de número, campos calculados, conversão de moeda por cotações publicadas e ações condicionais: quando uma linha não passa, ela vai para revisão, e-mail ou webhook.",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "Os dados como chegam" }, { label: "O Cleaner aplica suas regras" }, { label: "Limpos, com as falhas sinalizadas", result: "data, número e soma em ordem" }],
        },
        {
          short: "Um Agent abre o portal",
          via: "Agent",
          title: "Um Agent entra no portal do fornecedor",
          body: "Você escreve a missão com suas palavras, com uma URL inicial e as credenciais em um cofre que o modelo nunca vê. Quando a extração termina, o Agent começa sozinho com os campos do documento e traz o que você pediu, já tipado: preço, prazo de entrega, arquivos.",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "A extração termina" }, { label: "O Agent navega pelo portal" }, { label: "Traz os dados, já tipados", result: "preço 18.50 · prazo 5 dias" }],
        },
        {
          short: "Perguntas sobre seus dados",
          via: "Bucket",
          title: "Faça perguntas sobre {your_docs}",
          body: "As linhas ficam guardadas em um Bucket. Você pergunta em linguagem natural; o Tavnit transforma a pergunta em um plano (soma, filtro, mês), executa no banco de dados e responde com o número. O modelo nunca faz a conta.",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "\"Quanto compramos da Istmo em agosto?\"" }, { label: "Um plano: soma · fornecedor · mês" }, { label: "O número, calculado no banco de dados", result: "$12,480 em 4 {docs}" }],
        },
      ],
      hint: "Toque em uma opção, ou no chip do Tavnit, para ver o que acontece.",
      flow: {
        title: "O Flow: você decide as colunas",
        body: "Um Flow é a definição de um tipo de documento: a lista de campos que você quer extrair, cada um com nome, tipo de dado e se aparece uma vez por documento ou uma vez por linha, além de uma dica de onde procurar quando necessário. Ative-o e cada documento que chegar é lido em busca exatamente desses campos; a tabela que sai tem uma coluna por campo. Esta ferramenta usa um Flow fixo de {doc} com {fields} campos. Na sua conta você adiciona, remove e renomeia campos, e cria Flows para qualquer outro documento. Sem modelos, sem coordenadas.",
        linkLabel: "Como um Flow é definido",
        href: "/docs/flows",
        scene: [{ label: "Você define os campos em dois grupos: documento e tabela" }, { label: "Ele lê o cabeçalho uma vez e a tabela linha por linha" }, { label: "Uma linha por item: os valores do documento se repetem, os da tabela mudam", result: "5 campos → 5 colunas" }],
        name: "{Doc}",
        kinds: ["Campos do documento", "Campos da tabela"],
        add: { name: "purchase_order", type: "Text", hint: "Ao lado de \"PO\" · ex.: PO-2291", save: "Salvar", value: "PO-2291" },
        activate: "Ativo",
      },
      inputs: {
        show: "Como {your_doc} chega ao Tavnit?",
        hide: "Ocultar entradas",
        items: [
          {
            short: "Por e-mail",
            via: "um endereço por Flow",
            title: "Encaminhe o e-mail e pronto",
            body: "Cada Flow tem seu próprio endereço, como {doc}-lite-<id>@mg.tavnit.io. Encaminhe o e-mail com o documento em anexo e cada anexo vira uma execução. O assunto e o corpo nunca são lidos.",
            linkLabel: "Entrada por e-mail",
            href: "/docs/email-integration",
            scene: [{ label: "Você encaminha o e-mail com o anexo" }, { label: "Ele chega ao endereço do Flow" }, { label: "Cada anexo é uma execução", result: "1 anexo → 1 execução" }],
          },
          {
            short: "Envio manual",
            via: "pelo app",
            title: "Envie pelo app",
            body: "Arraste o PDF ou a foto para o Flow e a execução começa na hora. É o mesmo que você fez aqui, com a sua conta e sem limite diário.",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "Você arrasta o arquivo para o Flow" }, { label: "A execução começa" }, { label: "Linhas em segundos", result: "como aqui, sem limite" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Do seu sistema, pela API",
            body: "Um POST para /api/runs/process com o arquivo e o flow_id, usando sua API key. A resposta é 202 com o run_id; você faz GET em /api/runs/<id> até ficar completed e as linhas voltarem.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST com o arquivo e o flow_id" }, { label: "202: run_id, na fila" }, { label: "GET até completed", result: "status: completed · 6 linhas" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "uma chamada HTTP",
            title: "Pelo Zapier, Make ou n8n",
            body: "Não existe app nativo, nem é preciso: uma etapa HTTP (Custom Request no Zapier, Make a request no Make) envia o arquivo para /api/runs/process. As linhas voltam por webhook para o gatilho da mesma ferramenta.",
            linkLabel: "Integrações",
            href: "/integrations",
            scene: [{ label: "Uma etapa HTTP no seu cenário" }, { label: "O Tavnit processa" }, { label: "O webhook devolve as linhas", result: "de volta no Zapier, Make ou n8n" }],
          },
          {
            short: "Vários em um PDF",
            via: "um Splitter separa",
            title: "Vários documentos em um só PDF",
            body: "Um Splitter encontra onde cada documento começa, classifica cada trecho pelos tipos que você descreve e envia cada um para o seu Flow. Uma digitalização com três {docs} vira três execuções.",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "Um PDF com três {docs}" }, { label: "O Splitter corta e classifica" }, { label: "Três execuções, uma por documento", result: "3 trechos · 3 execuções" }],
          },
        ],
      },
      replay: "Ver de novo",
      tryIt: "Testar isso no Tavnit",
      tryItSignedIn: "Fazer isso na minha conta",
      primary: "Criar conta grátis",
      primarySignedIn: "Ir para o Tavnit",
      sameLogin: "Você já tem uma conta. Entre no Tavnit com o mesmo login ({email}); ele vai pedir mais uma vez porque é outro site.",
      secondary: "Agendar uma demonstração",
    },
    cleaners: {
      heading: "Com um Cleaner, você poderia…",
      lead: "Regras simples que rodam sozinhas sobre {each_doc} depois da extração. Quatro ideias com os seus próprios dados:",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "Um só jeito de escrever a data", from: "{date}", to: "{iso}", note: "{each_doc}, no mesmo formato" },
        { icon: "sum", title: "Os itens precisam somar o subtotal", from: "itens {sum}", to: "subtotal {subtotal}", note: "se não bater, ninguém paga sem conferir", check: "sum" },
        { icon: "money", title: "Converter para a sua moeda", from: "{total} {currency}", to: "sua moeda", note: "pela cotação da data do documento" },
        { icon: "approve", title: "Aprovação acima de um valor", from: "total {total}", to: "aprovar antes de pagar", note: "quando passar de {threshold}" },
      ],
      ok: "Confere",
      off: "Para revisar",
      outro: "Os Cleaners são montados no Tavnit com os campos que importam para você. Estes são só exemplos.",
      cta: "Criar conta grátis e testar",
      ctaSignedIn: "Abrir o Tavnit e testar",
      learn: "O que é um Cleaner",
    },
    after: {
      title: "Seu Excel está pronto",
      lead: "Ele saiu de um Flow fixo com {fields} campos. Na sua conta você escolhe os campos, e é assim quando o Tavnit cuida de {each_doc}:",
      close: "Fechar",
      saved: "salvo nos seus downloads",
    },
    how: {
      heading: "Como funciona",
      steps: [
        {
          title: "Envie {the_doc}",
          body: "PDF, foto ou digitalização. Qualquer fornecedor, qualquer idioma, qualquer layout.",
        },
        {
          title: "O Tavnit faz a leitura",
          body: "Ele encontra o cabeçalho (fornecedor, número, data, totais) e a tabela de itens com quantidades e preços.",
        },
        {
          title: "Confira e baixe",
          body: "A tabela aparece na tela. Com uma conta grátis, você leva o resultado em Excel.",
        },
      ],
    },
    faqHeading: "Perguntas frequentes",
    faqs: [
      {
        q: "O que a versão grátis inclui?",
        a: "{limit} documentos por dia, com o resultado completo na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
      },
      {
        q: "Quais formatos são aceitos?",
        a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas. Se {your_doc} tiver mais páginas, envie em partes ou crie uma conta.",
      },
      {
        q: "Posso escolher outras colunas?",
        a: "Aqui não: esta ferramenta usa um Flow fixo de {doc} com 13 campos. Na sua conta você cria seus próprios Flows, para {docs} ou qualquer outro documento, com os campos de que precisa: por documento (número do pedido, vencimento, centro de custo) ou por linha (código do produto, desconto). Sem modelos: você descreve o campo e, quando necessário, dá uma dica de onde procurar.",
      },
      {
        q: "Preciso configurar um modelo por fornecedor?",
        a: "Não. O Tavnit não usa modelos: ele lê cada documento como ele chega, mesmo que o fornecedor mude o layout amanhã.",
      },
      {
        q: "O que acontece com o meu arquivo?",
        a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, o arquivo e as linhas extraídas são apagados automaticamente; guardamos apenas o registro de que houve uma execução, sem o documento nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
      },
      {
        q: "Por que o download exige uma conta?",
        a: "Porque a versão grátis foi feita para experimentar. Com uma conta, você pode rodar a mesma extração em {all_your_docs}, receber o resultado por e-mail e enviá-lo para o seu sistema.",
      },
      {
        q: "Funciona com {docs} de qualquer país?",
        a: "Sim. Ele lida com {docs} em inglês, espanhol e outros idiomas, com ou sem impostos discriminados. Foi testado com {docs} dos EUA, do Panamá, do México e da Colômbia, entre outros.",
      },
      {
        q: "Como deixo isso automático?",
        a: "Crie uma conta, monte um Flow com os campos que quiser e encaminhe {the_docs} para o endereço de e-mail dele, ou conecte pela API, por webhooks, Zapier, Make ou n8n. O resultado chega ao seu ERP ou ao Google Sheets sem ninguém digitar.",
      },
    ],
  },

  hub: {
    title: "Ferramentas grátis de IA para documentos: fatura para Excel e mais",
    description:
      "Ferramentas grátis de uma só função, feitas com o próprio motor do Tavnit: transforme uma fatura em Excel e muito mais. Sem modelos e sem cadastro para ver o resultado.",
    h1: "Ferramentas grátis",
    intro:
      "Cada ferramenta faz uma coisa com um documento e mostra o resultado real. Elas rodam no mesmo motor que as empresas usam para automatizar seus documentos com o Tavnit, um de cada vez.",
    breadcrumbHome: "Início",
    breadcrumbHub: "Ferramentas",
    groups: { extract: "Documento para Excel", compare: "Comparar documentos", split: "Organizar digitalizações", clean: "Limpar planilhas" },
    outro: "Todas rodam no mesmo motor que as empresas usam para automatizar seus documentos com o Tavnit. Quando você quiser que isso aconteça sozinho, para todos os seus documentos, sua conta está aí.",
    outroCta: "Criar conta grátis",
  },

  shell: {
    lite: "Lite",
    tools: "Ferramentas",
    site: "Sobre o Tavnit",
    cta: "Criar conta grátis",
    ctaSignedIn: "Ir para o Tavnit",
    nav: { product: "Produto", useCases: "Casos de uso", docs: "Documentação" },
    demo: "Agendar demonstração",
    signin: "Entrar",
    allTools: "Ver todas as ferramentas",
    allToolsHint: "Grátis. Veja o resultado real sem cadastro; leve-o com você criando uma conta.",
    groups: { extract: "Documento para Excel", compare: "Comparar documentos", split: "Organizar digitalizações", clean: "Limpar planilhas" },
    account: {
      signedInAs: "Conectado como",
      open: "Ir para o Tavnit",
      openHint: "A plataforma completa: Flows, automações e todo o seu volume",
      signOut: "Sair",
      menu: "Sua conta",
    },
    auth: {
      title: "Crie sua conta grátis",
      body: "A mesma conta baixa seus resultados aqui e automatiza todos os seus documentos no Tavnit.",
      submitSignin: "Entrar",
      submitSignup: "Criar conta",
    },
    menu: "Menu",
    close: "Fechar",
    privacy: "Privacidade",
    terms: "Termos",
    contact: "Contato",
    rights: "Tavnit. Ferramentas grátis feitas com o próprio motor do produto.",
  },

  related: {
    heading: "Quando são todos os documentos, não só um",
    lead: "Esta ferramenta processa um documento por vez. O mesmo motor pode recebê-los por e-mail ou API, passá-los pela revisão da sua equipe e entregá-los aos seus sistemas.",
    useCase: "Como é automatizado:",
    guide: "Guia:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Fatura para Excel grátis: a IA lê os itens" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Extrator de itens de fatura grátis: linhas para Excel",
        description:
          "Extraia os itens de uma fatura (descrição, quantidade, preço unitário e valor) como linhas de Excel, com fornecedor, número e data em cada linha. PDF ou foto, sem modelos e sem cadastro para ver o resultado.",
        label: "Extrator de itens de fatura",
        h1: "Extraia os itens de uma fatura",
        intro:
          "Cada linha da tabela da fatura (descrição, quantidade, unidade, preço unitário e valor) vira uma linha, e o cabeçalho (fornecedor, número, data, totais) se repete em cada uma. É assim que a contabilidade e o contas a pagar precisam dos itens para lançar, conciliar ou conferir com o pedido de compra. Funciona com PDFs, digitalizações e fotos, sem modelos por fornecedor.",
        drop: {
          title: "Arraste a fatura cujos itens você precisa",
          sample: "Testar com uma fatura de seis itens",
        },
        stages: [
          "Enviando a fatura",
          "Lendo o cabeçalho",
          "Detectando a tabela de itens",
          "Separando cada linha",
          "Quase lá",
        ],
        result: {
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de fatura: cabeçalho e itens. Na sua conta, quem escolhe os campos é você.",
        },
        how: {
          heading: "Como funciona",
          steps: [
            {
              title: "Envie a fatura",
              body: "PDF com texto, digitalização ou foto. Uma página ou várias, até 5.",
            },
            {
              title: "O Tavnit separa os itens",
              body: "Ele encontra a tabela mesmo sem linhas de grade, lê cada linha (descrição, quantidade, unidade, preço, valor) e junta o cabeçalho a ela.",
            },
            {
              title: "Confira e baixe",
              body: "Uma linha por item na tela. Com uma conta grátis, você leva o resultado em Excel, sem as colunas de que não precisa.",
            },
          ],
        },
        faqs: [
          {
            q: "O que é um item de fatura?",
            a: "Cada linha da tabela de detalhes: um produto ou serviço com descrição, quantidade, unidade, preço unitário e valor. Os totais do rodapé (subtotal, imposto, total) não são itens; eles saem como campos do cabeçalho, repetidos em cada linha.",
          },
          {
            q: "Por que o fornecedor e o número aparecem em todas as linhas?",
            a: "Para que cada linha se sustente sozinha: você pode filtrar, somar ou colar os itens de muitas faturas em uma só planilha sem perder de qual fatura veio cada um. É o formato que um ERP, uma tabela dinâmica ou uma conciliação esperam.",
          },
          {
            q: "Funciona quando a tabela ocupa várias páginas?",
            a: "Sim. O Tavnit acompanha a tabela de uma página para a outra e devolve todos os itens em sequência, sem repetir o cabeçalho das colunas como se fosse uma linha. A versão grátis aceita até 5 páginas.",
          },
          {
            q: "E descrições quebradas em duas linhas ou células mescladas?",
            a: "Uma descrição que continua na linha de baixo é unida ao seu item; uma célula mesclada vale para os itens que ela abrange. Não dependemos das linhas da tabela, e sim de entender qual quantidade, preço e valor pertencem a cada descrição.",
          },
          {
            q: "Como ficam descontos e impostos por linha?",
            a: "O valor de cada item sai como está impresso. Um desconto ou imposto que a fatura mostra em uma linha própria não vira item; é tratado como total do documento. Se as suas faturas discriminam o imposto por linha, com uma conta você pode adicionar esse campo ao Flow.",
          },
          {
            q: "Posso conferir os itens com o meu pedido de compra?",
            a: "Sim, com a conferência grátis de pedido x fatura (/tools/po-vs-invoice-check): envie os dois documentos e ela sinaliza itens com preço ou quantidade diferente, itens que faltam e itens que foram acrescentados.",
          },
          {
            q: "Preciso de um modelo por fornecedor?",
            a: "Não. O Tavnit lê cada fatura como ela chega; se o fornecedor mudar o layout amanhã, continua funcionando. É também por isso que ele lida igualmente bem com faturas de países e idiomas diferentes.",
          },
          {
            q: "Como faço isso com centenas de faturas?",
            a: "Com uma conta, você cria um Flow com estes mesmos campos (ou os seus) e encaminha as faturas para o endereço de e-mail dele, ou as envia pela API. Cada fatura sai como linhas no seu ERP, no Google Sheets ou em um Bucket, sem ninguém digitar.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "fatura"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: {
        doc: "fatura",
        docs: "faturas",
        a_doc: "uma fatura",
        the_doc: "a fatura",
        the_docs: "as faturas",
        your_doc: "sua fatura",
        your_docs: "suas faturas",
        all_your_docs: "todas as suas faturas",
        all_docs: "todas as faturas",
        each_doc: "cada fatura",
        another_doc: "outra fatura",
        this_doc: "esta fatura",
      },
      overrides: {
        title: "Conferência de pedido x fatura grátis, linha por linha",
        description:
          "Envie o pedido de compra e a fatura e o Tavnit cruza os dois linha por linha: diferenças de preço, diferenças de quantidade, itens que faltam na fatura e itens que não estão no pedido. Grátis, sem modelos e sem cadastro para ver o resultado.",
        label: "Conferência de pedido x fatura",
        h1: "Confira uma fatura com o pedido de compra",
        intro:
          "Envie o pedido de compra e a fatura, em PDF ou foto. O Tavnit lê os dois, pareia cada item do pedido com o item da fatura que significa a mesma coisa, mesmo quando o texto é diferente, e sinaliza onde o preço mudou, onde a quantidade mudou, o que falta na fatura e o que nunca esteve no pedido.",
        trust: ["Um pedido e uma fatura · PDF ou foto", "{limit} documentos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste o documento para cá",
          sample: "Testar com um pedido e uma fatura de exemplo",
          formats: "PDF, JPG ou PNG · até 4 MB e 5 páginas por documento",
        },
        stages: ["Enviando os documentos", "Lendo o pedido de compra", "Lendo a fatura", "Pareando os itens", "Quase lá"],
        result: {
          another: "Comparar outros documentos",
          download: "Baixar a comparação em Excel",
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de documento de compra. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: centro de custo, número do recebimento, projeto…",
        },
        errors: {
          no_lines: "Não encontramos itens com quantidades e preços em um dos dois documentos. Verifique se são um pedido de compra e uma fatura com tabela de itens.",
          not_ready: "Ainda estamos lendo os documentos. Aguarde um instante e tente de novo.",
          failed: "Não conseguimos ler um dos documentos. Teste com outros arquivos ou com os exemplos.",
          too_large: "Um dos arquivos passa de 4 MB. Comprima-o ou envie só as páginas do documento.",
        },
        next: {
          lead: "Isso foi um pedido e uma fatura. Com uma conta, cada fatura que chega é conferida sozinha com o seu pedido de compra, e o resultado não para em um Excel: segue adiante.",
          source: "Seu pedido e sua fatura",
          flow: {
            name: "Documento de compra",
            add: { name: "receipt_number", type: "Text", hint: 'Ao lado de "Receipt" · ex.: REC-1187', save: "Salvar", value: "REC-1187" },
          },
          inputs: { show: "Como seus documentos chegam ao Tavnit?" },
        },
        cleaners: {
          heading: "Com um Cleaner, você poderia…",
          lead: "Regras simples que rodam sozinhas em cada conferência. Quatro ideias:",
          ideas: [
            { icon: "alert", title: "Bloquear a fatura quando um preço subir mais de 2%", from: "preço no pedido 22.40", to: "fatura 23.90", note: "a diferença é sinalizada antes que alguém pague" },
            { icon: "approve", title: "Aprovação quando a quantidade for diferente", from: "pedido 300 unidades", to: "fatura 280", note: "compras confirma se foi entrega parcial ou erro" },
            { icon: "mail", title: "Enviar as diferenças por e-mail para compras", from: "conferência feita", to: "e-mail para compras@", note: "só quando houver algo para revisar" },
            { icon: "sum", title: "Total da fatura contra total do pedido", from: "pedido 5,189.07", to: "fatura 4,960.63", note: "se não bater, para antes do lançamento" },
          ],
          outro: "Os Cleaners são montados no Tavnit com os campos que importam para você. Estes são só exemplos.",
        },
        after: {
          lead: "Ele saiu de um Flow fixo com {fields} campos e de um Matcher. Na sua conta você escolhe os campos, e é assim quando o Tavnit confere cada fatura que chega:",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie os dois documentos", body: "O pedido de compra e a fatura, em PDF ou foto. Qualquer fornecedor, qualquer idioma, qualquer layout." },
            { title: "O Tavnit lê os dois com um só Flow", body: "Cabeçalho (número, data, fornecedor, totais) e cada item com quantidade e preço, nos dois documentos." },
            { title: "O Matcher pareia os itens", body: "Cada item do pedido é ligado ao item da fatura que significa o mesmo, e preço e quantidade são comparados. Com sua conta, você leva a comparação em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} documentos por dia (cada conferência usa dois), com o resultado completo na tela. Para baixar a comparação em Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Como ele pareia os itens quando o texto não é idêntico?",
            a: "Um Matcher do Tavnit compara as descrições pelo significado, não letra por letra: \"Long grain rice 20 lb\" e \"RICE L/GRAIN PREMIUM 20LB\" são o mesmo item. Quando duas descrições são parecidas, mas não está claro, uma segunda etapa decide se é o mesmo item.",
          },
          {
            q: "Que tolerância ele usa para os preços?",
            a: "Um preço é sinalizado como diferente quando varia mais de 0,5% ou mais de um centavo. As quantidades são comparadas de forma exata. Com sua conta, você define sua própria tolerância com um Cleaner.",
          },
          {
            q: "O que significam \"Falta na fatura\" e \"Fora do pedido\"?",
            a: "\"Falta na fatura\" é um item do pedido de compra que o fornecedor não faturou (entrega parcial ou pendente). \"Fora do pedido\" é um item faturado que ninguém pediu naquele pedido.",
          },
          {
            q: "Dá para fazer a conferência em três vias, com o recebimento da mercadoria?",
            a: "Aqui não: a versão grátis compara dois documentos. Com sua conta, você adiciona o comprovante de recebimento como terceiro documento do mesmo Flow e o Matcher confere os três, ou cria regras de Cleaner para que a fatura não seja lançada até o recebimento bater.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas por documento. Funciona com pedidos de compra gerados por um ERP e faturas de qualquer fornecedor.",
          },
          {
            q: "O que acontece com os meus arquivos?",
            a: "Eles são processados em uma conta do Tavnit dedicada às ferramentas grátis e não são usados para mais nada. Após 24 horas, os arquivos e a comparação são apagados; guardamos apenas o registro de que houve uma execução, sem os documentos nem o seu conteúdo.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Flow para os seus documentos de compra e um Matcher sobre ele. As faturas chegam por e-mail ou API, são pareadas com o pedido, e as diferenças saem por e-mail, webhook ou direto para o seu ERP, sem ninguém digitar.",
          },
        ],
        compare: {
          slots: [
            { title: "Pedido de compra", hint: "PDF ou foto do pedido", sample: "Pedido de exemplo" },
            { title: "Fatura", hint: "PDF ou foto da fatura", sample: "Fatura de exemplo" },
          ],
          run: "Comparar",
          sampleAll: "Testar com um pedido e uma fatura de exemplo",
          stages: ["Lendo o pedido de compra e a fatura", "Organizando os itens", "O Matcher pareia os itens", "Quase lá"],
          heading: "Comparação pronta",
          summary: "{n} · {ref} x {doc}",
          labels: {
            description: "Descrição",
            quantity: "Qtd.",
            price: "Preço",
            total: "Total",
            status: "Status",
            ref: "Pedido",
            doc: "Fatura",
            supplier: "Fornecedor",
            champion: "Champion",
            wins: "melhor em {n} itens",
            lines: ["item", "itens"],
          },
          status: {
            ok: "Confere",
            price: "Preço diferente",
            qty: "Quantidade diferente",
            both: "Preço e quantidade diferentes",
            missing: "Falta na fatura",
            extra: "Fora do pedido",
          },
          empty: "Não conseguimos parear nenhum item. Verifique se os dois documentos têm uma tabela de itens com quantidades e preços.",
          another: "Comparar outros documentos",
          download: "Baixar a comparação em Excel",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "PDF escaneado",
        docs: "PDFs escaneados",
        a_doc: "um PDF escaneado",
        the_doc: "o PDF",
        the_docs: "os PDFs",
        your_doc: "seu PDF",
        your_docs: "seus PDFs",
        all_your_docs: "todos os seus PDFs",
        all_docs: "todos os PDFs",
        each_doc: "cada PDF",
        another_doc: "outro PDF",
        this_doc: "este PDF",
      },
      overrides: {
        title: "Separar um PDF escaneado em documentos, grátis (IA)",
        description:
          "Envie um PDF com vários documentos escaneados juntos (faturas, pedidos de compra, recibos, contratos) e receba cada documento separado, classificado por tipo. Grátis, sem marcar páginas.",
        label: "Separar um PDF escaneado",
        h1: "Separe um PDF escaneado nos seus documentos",
        intro:
          "Você passou dez papéis pelo scanner e saiu um único PDF. Envie esse arquivo: o Tavnit lê cada página, encontra onde cada documento começa e devolve um por um, cada um com o seu tipo (fatura, pedido de compra, recibo, packing list, conhecimento de embarque, contrato…). Nada de separar por número de páginas, nada para marcar à mão.",
        trust: ["Um PDF · até 12 páginas", "{limit} documentos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste seu PDF escaneado para cá",
          hint: "um PDF com vários documentos dentro",
          choose: "Escolher arquivo",
          sample: "Testar com uma digitalização de exemplo",
          formats: "PDF · até 4 MB e 12 páginas",
        },
        stages: ["Enviando o PDF", "Lendo cada página", "Encontrando onde cada documento começa", "Classificando", "Quase lá"],
        result: {
          retention: "é apagado sozinho após 24 h",
          downloading: "Preparando o arquivo",
          another: "Separar outro PDF",
          empty: "Não encontramos mais de um documento neste PDF.",
          flowNote: "Estes tipos pertencem ao Splitter fixo desta ferramenta. Na sua conta, quem define os tipos é você.",
        },
        errors: {
          too_large: "O arquivo passa de 4 MB. Comprima-o ou divida a digitalização em duas.",
          too_many_pages: "A versão grátis separa até 12 páginas por PDF. Com uma conta, não há limite.",
          unsupported: "Só aceitamos PDF, JPG ou PNG. Para separar documentos, envie o PDF que saiu do scanner.",
          failed: "Não conseguimos separar este PDF. Teste com outra digitalização ou com o exemplo.",
          empty: "O arquivo está vazio.",
        },
        next: {
          lead: "Isso foi um PDF. Com uma conta, cada documento que o Splitter corta vai para o seu próprio Flow: a fatura para a extração de faturas, o pedido de compra para a dele, o recibo para o relatório de despesas. Ninguém mais separa nem classifica nada à mão.",
          source: "Seu PDF",
          flow: {
            title: "Do Splitter ao Flow: cada documento para a sua extração",
            body: "Um Splitter encontra onde cada documento começa e o classifica pelos tipos que você descreve em palavras. Esta ferramenta usa um Splitter fixo com oito tipos e sem saídas: ele só entrega os documentos. Na sua conta você define seus próprios tipos e, para cada um, para onde ele vai: para um Flow que extrai os campos (como abaixo, com {fields} campos), para um e-mail ou para uma Collection. Sem modelos, sem coordenadas.",
            linkLabel: "Como um Splitter funciona",
            href: "/docs/splitters",
          },
          inputs: {
            show: "Como seu PDF chega ao Tavnit?",
          },
        },
        cleaners: {
          heading: "Depois da separação, no Tavnit…",
          lead: "Cada tipo de documento pode ter o seu próprio destino, sem ninguém organizando à mão. Quatro exemplos:",
          ideas: [
            { icon: "text", title: "Cada fatura para o seu Flow e daí para o ERP", from: "fatura (pp. 1–2)", to: "Flow de faturas → ERP", note: "extraída e lançada sem ninguém tocar" },
            { icon: "mail", title: "Recibos para o relatório de despesas", from: "recibo (p. 5)", to: "despesas@suaempresa", note: "cada recibo chega a quem faz a conciliação" },
            { icon: "calendar", title: "Contratos para o arquivo jurídico, com as datas", from: "contrato (pp. 6–7)", to: "Flow de contratos", note: "vencimento e renovação em uma só tabela" },
            { icon: "alert", title: "Um aviso quando algo não for reconhecido", from: "página não classificada", to: "revisão humana", note: "nada se perde nem vai para o lugar errado" },
          ],
          outro: "Os destinos são definidos no Tavnit por tipo de documento. Estes são só exemplos.",
          cta: "Criar conta grátis e configurar",
          ctaSignedIn: "Abrir o Tavnit e configurar",
          learn: "O que é um Splitter",
        },
        after: {
          title: "Seus documentos estão prontos",
          lead: "Eles saíram de um Splitter fixo com oito tipos. Na sua conta você define os tipos, e cada documento segue sozinho para o seu Flow:",
          close: "Fechar",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie a digitalização", body: "Um PDF com vários documentos dentro, exatamente como saiu do scanner. Qualquer ordem, qualquer número de páginas por documento." },
            { title: "O Tavnit separa e classifica", body: "Ele lê cada página, detecta onde cada documento começa e atribui um tipo: fatura, pedido de compra, recibo, packing list, conhecimento de embarque, contrato, nota de crédito ou outro." },
            { title: "Baixe cada documento", body: "Você vê a lista com os intervalos de páginas e os tipos. Com uma conta grátis, você baixa cada PDF separado, ou todos em um zip." },
          ],
        },
        faqs: [
          {
            q: "Como ele sabe onde um documento termina e o próximo começa?",
            a: "A IA olha todas as páginas juntas, como uma pessoa faria: mudanças de cabeçalho, de empresa, de numeração de páginas, de layout. Ela não conta páginas nem procura marcadores, e é por isso que funciona quando uma fatura tem duas páginas e o recibo tem uma só.",
          },
          {
            q: "Quais tipos de documento ele reconhece?",
            a: "Aqui, oito: fatura, pedido de compra, recibo, packing list, conhecimento de embarque, contrato, nota de crédito e outro. Com uma conta, você define seus próprios tipos descrevendo-os em palavras e decide, para cada um, para onde ele vai: para um Flow que extrai os dados, para um e-mail ou para uma Collection.",
          },
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} documentos por dia, com o resultado completo na tela. Para baixar os PDFs separados é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Quantas páginas posso enviar?",
            a: "Até 12 páginas por PDF na versão grátis, com até 4 MB. Com uma conta não há limite de páginas, e você pode mandar as digitalizações por e-mail direto para o Splitter.",
          },
          {
            q: "Funciona com digitalizações ruins ou idiomas misturados?",
            a: "Sim. Ele lida com digitalizações tortas, em tons de cinza e com carimbos, e com documentos em inglês, espanhol ou outros idiomas misturados no mesmo PDF. Se uma página não puder ser lida, ela é marcada como não classificada em vez de receber um tipo inventado.",
          },
          {
            q: "O que acontece com o meu arquivo?",
            a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, o PDF e os documentos separados são apagados automaticamente; guardamos apenas o registro de que houve uma execução, sem o arquivo nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
          },
          {
            q: "Por que o download exige uma conta?",
            a: "Porque a versão grátis foi feita para experimentar. Com uma conta, você pode separar todas as digitalizações, enviar cada documento para o seu Flow e receber os dados extraídos no seu ERP ou por e-mail.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Splitter com os seus tipos de documento e encaminhe as digitalizações para o endereço de e-mail dele, ou conecte pela API. Cada documento que ele corta vai sozinho para o seu Flow e, de lá, para o seu ERP, o Google Sheets ou uma caixa de entrada.",
          },
        ],
        split: {
          heading: "Pronto: {file}",
          summary: "{n} em {pages}",
          segmentWord: ["documento", "documentos"],
          pageWord: ["página", "páginas"],
          pages: "pp. {from}–{to}",
          pageOne: "p. {from}",
          unmatched: "Não classificado",
          type: "Tipo",
          reason: "Motivo",
          download: "Baixar",
          downloadAll: "Baixar todos (zip)",
          stages: ["Enviando o PDF", "Lendo cada página", "Encontrando onde cada documento começa", "Classificando", "Quase lá"],
          empty: "Não encontramos mais de um documento neste PDF.",
          another: "Separar outro PDF",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Brazilian trade says "packing list" (also
     * "romaneio de carga"); the vocab keeps the term people search for.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "packing list",
        docs: "packing lists",
        a_doc: "um packing list",
        the_doc: "o packing list",
        the_docs: "os packing lists",
        your_doc: "seu packing list",
        your_docs: "seus packing lists",
        all_your_docs: "todos os seus packing lists",
        all_docs: "todos os packing lists",
        each_doc: "cada packing list",
        another_doc: "outro packing list",
        this_doc: "este packing list",
      },
      overrides: {
        title: "Packing list para Excel grátis: a IA extrai cada linha",
        description:
          "Envie um packing list (romaneio de carga) em PDF ou foto e receba cada linha em uma tabela do Excel: descrição, quantidade, volumes, peso líquido e bruto, dimensões, com exportador, consignatário e portos. Grátis, sem modelos e sem cadastro para ver o resultado.",
        label: "Packing list para Excel",
        h1: "Transforme um packing list em Excel",
        intro:
          "Envie o PDF ou a foto. O Tavnit lê o cabeçalho do embarque (exportador, consignatário, portos, totais) e cada linha de mercadoria com volumes, pesos e dimensões, e devolve tudo como planilha. Sem modelos por fornecedor: a mesma ferramenta funciona com os packing lists de todos os seus embarques.",
        drop: {
          title: "Arraste seu packing list para cá",
          sample: "Testar com um packing list de exemplo",
        },
        stages: ["Enviando o documento", "Lendo o cabeçalho do embarque", "Encontrando as linhas de mercadoria", "Organizando as colunas", "Quase lá"],
        result: {
          empty: "Não encontramos linhas de mercadoria neste documento. Teste com um packing list que tenha volumes, pesos ou quantidades por linha.",
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de packing list. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: contêiner, marcas, código NCM/HS, número do BL…",
        },
        next: {
          lead: "Isso foi um packing list. Com uma conta, o mesmo acontece com cada packing list que chegar, e as linhas não param em um Excel: seguem adiante sozinhas.",
          source: "Seu packing list",
          flow: {
            name: "Packing list",
            add: { name: "container", type: "Text", hint: "Ao lado de \"Container\" · ex.: MSKU-4417", save: "Salvar", value: "MSKU-4417" },
          },
          inputs: { show: "Como seu packing list chega ao Tavnit?" },
        },
        cleaners: {
          lead: "Regras simples que rodam sozinhas sobre cada packing list depois da extração. Quatro ideias com os seus próprios dados:",
          ideas: [
            { icon: "date", title: "Um só jeito de escrever a data", from: "{date}", to: "{iso}", note: "cada packing list, no mesmo formato" },
            { icon: "alert", title: "O peso bruto precisa superar o líquido", from: "líquido > bruto", to: "para revisar", note: "uma linha invertida nunca é declarada sem ninguém ver" },
            { icon: "calendar", title: "Aviso antes do embarque", from: "data de embarque", to: "lembrete 2 dias antes", note: "para o seu despachante e a logística" },
            { icon: "mail", title: "Cópia para o despachante aduaneiro", from: "packing list extraído", to: "e-mail com o Excel", note: "junto com a fatura relacionada" },
          ],
        },
        after: {
          lead: "Ele saiu de um Flow fixo com {fields} campos. Na sua conta você escolhe os campos, e é assim quando o Tavnit cuida de cada packing list:",
        },
        how: {
          steps: [
            { title: "Envie o packing list", body: "PDF, foto ou digitalização. Qualquer exportador, qualquer idioma, qualquer layout." },
            {
              title: "O Tavnit faz a leitura",
              body: "Ele encontra o cabeçalho (exportador, consignatário, portos, totais) e a tabela de mercadorias com volumes, peso líquido, peso bruto e dimensões por linha.",
            },
            { title: "Confira e baixe", body: "A tabela aparece na tela. Com uma conta grátis, você leva o resultado em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} documentos por dia, com o resultado completo na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas. Se o seu packing list tiver mais páginas, envie em partes ou crie uma conta.",
          },
          {
            q: "Quais colunas ele extrai de um packing list?",
            a: "Por documento: exportador, consignatário, número, data, fatura relacionada, porto de embarque, porto de descarga e os totais de volumes e pesos. Por linha: descrição, quantidade, unidade, volumes, peso líquido, peso bruto e dimensões. Os valores do documento se repetem em cada linha para que a tabela possa ser filtrada sozinha.",
          },
          {
            q: "Posso escolher outras colunas?",
            a: "Aqui não: esta ferramenta usa um Flow fixo de packing list com 17 campos. Na sua conta você cria seus próprios Flows, para packing lists ou qualquer outro documento, com os campos de que precisa: por documento (contêiner, lacre, número do BL, incoterm) ou por linha (marcas, código NCM/HS, volume). Sem modelos: você descreve o campo e, quando necessário, dá uma dica de onde procurar.",
          },
          {
            q: "Funciona com packing lists de qualquer país?",
            a: "Sim. Ele lida com packing lists em inglês, espanhol e outros idiomas, com pesos em kg ou lb e medidas em cm ou polegadas, exatamente como estão impressos. Foi testado com embarques do Panamá, da Colômbia, do México, da China e dos EUA, entre outros.",
          },
          {
            q: "Preciso configurar um modelo por fornecedor?",
            a: "Não. O Tavnit não usa modelos: ele lê cada documento como ele chega, mesmo que o exportador mude o layout do packing list amanhã.",
          },
          {
            q: "O que acontece com o meu arquivo?",
            a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, o arquivo e as linhas extraídas são apagados automaticamente; guardamos apenas o registro de que houve uma execução, sem o documento nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Flow com os campos que quiser e encaminhe os packing lists para o endereço de e-mail dele, ou conecte pela API, por webhooks, Zapier, Make ou n8n. Cada embarque chega ao seu sistema aduaneiro, ao seu ERP ou ao Google Sheets sem ninguém digitar.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. The words ("conhecimento de embarque" in the
     * vocab, "BL" in the running text, as the Brazilian trade says it) and
     * everything that is specific to an ocean B/L: header fields, one row per
     * container line, customs and forwarder use cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "conhecimento de embarque",
        docs: "conhecimentos de embarque",
        a_doc: "um conhecimento de embarque",
        the_doc: "o conhecimento de embarque",
        the_docs: "os conhecimentos de embarque",
        your_doc: "seu conhecimento de embarque",
        your_docs: "seus conhecimentos de embarque",
        all_your_docs: "todos os seus conhecimentos de embarque",
        all_docs: "todos os conhecimentos de embarque",
        each_doc: "cada conhecimento de embarque",
        another_doc: "outro conhecimento de embarque",
        this_doc: "este conhecimento de embarque",
      },
      overrides: {
        title: "Conhecimento de embarque (BL) para Excel grátis",
        description:
          "Envie um conhecimento de embarque (BL) em PDF ou foto e receba os dados em uma tabela do Excel: número do BL, armador, exportador, consignatário, navio, portos e uma linha por contêiner com lacre, mercadoria, volumes, peso e cubagem. Grátis, sem modelos e sem cadastro para ver o resultado.",
        label: "Conhecimento de embarque para Excel",
        h1: "Transforme um conhecimento de embarque em Excel",
        intro:
          "Envie o PDF ou a foto do BL. O Tavnit lê o cabeçalho (número do BL, armador, exportador, consignatário, navio, viagem, portos, data de embarque a bordo) e cada linha de carga com contêiner, lacre, volumes, peso bruto e cubagem, e devolve tudo como planilha. Sem modelos por armador: o mesmo Flow lê MSC, Maersk, Hapag-Lloyd ou qualquer NVOCC.",
        drop: {
          title: "Arraste seu conhecimento de embarque para cá",
          sample: "Testar com um BL de exemplo",
        },
        stages: ["Enviando o documento", "Lendo o cabeçalho do BL", "Encontrando as linhas de carga", "Organizando as colunas", "Quase lá"],
        result: {
          empty: "Não encontramos linhas de carga neste documento. Teste com um conhecimento de embarque que tenha a tabela de contêineres e mercadorias.",
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de conhecimento de embarque. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: incoterm, local de entrega, número do booking, ETA…",
          another: "Processar outro conhecimento de embarque",
        },
        errors: {
          too_large: "O arquivo passa de 4 MB. Comprima-o ou envie só as páginas do BL.",
        },
        next: {
          lead: "Isso foi um conhecimento de embarque. Com uma conta, o mesmo acontece com cada BL que chegar, de cada armador e agente, e os dados não param em um Excel: seguem sozinhos para o seu sistema aduaneiro ou de frete.",
          source: "Seu BL",
          flow: {
            name: "Conhecimento de embarque",
            add: { name: "incoterm", type: "Text", hint: "Ao lado de \"Incoterm\" · ex.: CIF Manzanillo", save: "Salvar", value: "CIF" },
          },
          inputs: { show: "Como seu BL chega ao Tavnit?" },
        },
        cleaners: {
          lead: "Regras simples que rodam sozinhas sobre cada conhecimento de embarque depois da extração. Quatro ideias com os seus próprios dados:",
          ideas: [
            { icon: "date", title: "Um só jeito de escrever a data de embarque", from: "{date}", to: "{iso}", note: "cada BL, no mesmo formato" },
            { icon: "alert", title: "Peso bruto fora da faixa", from: "peso bruto por contêiner", to: "alerta acima de 26.000 kg", note: "para ninguém contratar um caminhão que não aguenta a carga" },
            { icon: "calendar", title: "Aviso antes da chegada", from: "data de embarque + tempo de trânsito", to: "lembrete 5 dias antes", note: "para registrar a declaração antes de o navio atracar" },
            { icon: "mail", title: "Direto para o despachante aduaneiro", from: "BL extraído", to: "e-mail com a tabela anexada", note: "para o despachante, sem ninguém encaminhar nada" },
          ],
        },
        after: {
          lead: "Ele saiu de um Flow fixo com {fields} campos. Na sua conta você escolhe os campos, e é assim quando o Tavnit cuida de cada conhecimento de embarque:",
        },
        how: {
          steps: [
            { title: "Envie o BL", body: "PDF, foto ou digitalização. Qualquer armador, qualquer agente, qualquer layout de formulário." },
            { title: "O Tavnit faz a leitura", body: "Ele encontra o cabeçalho (número do BL, partes, navio, viagem, portos, data de embarque, condições de frete) e a tabela de carga: uma linha por contêiner com lacre, mercadoria, volumes, peso e cubagem." },
            { title: "Confira e baixe", body: "A tabela aparece na tela. Com uma conta grátis, você leva o resultado em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} documentos por dia, com o resultado completo na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "O que ele extrai de um conhecimento de embarque?",
            a: "Do cabeçalho: número do BL, armador, exportador, consignatário, notify party, navio, viagem, porto de embarque, porto de descarga, data de embarque a bordo, condições de frete e a lista de contêineres. Da tabela de carga, uma linha por item: contêiner, lacre, descrição da mercadoria, quantidade e tipo de volumes, peso bruto e cubagem. Os valores do cabeçalho se repetem em cada linha para que a planilha possa ser filtrada e somada sem esforço.",
          },
          {
            q: "Posso escolher outras colunas?",
            a: "Aqui não: esta ferramenta usa um Flow fixo de conhecimento de embarque com 19 campos. Na sua conta você cria seus próprios Flows, para BLs ou qualquer outro documento, com os campos de que precisa: por documento (incoterm, local de entrega, número do booking, ETA) ou por linha (código NCM/HS, marcas, temperatura do reefer). Sem modelos: você descreve o campo e, quando necessário, dá uma dica de onde procurar.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas. Se o seu BL tiver mais páginas, ou se houver vários BLs em uma só digitalização, envie em partes ou crie uma conta.",
          },
          {
            q: "Funciona com o BL de qualquer armador?",
            a: "Sim. Ele não usa modelos: lê cada BL como ele chega, seja um master BL do armador, um house BL do agente de cargas ou um sea waybill, em inglês ou espanhol. Foi testado com layouts de MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen e NVOCCs.",
          },
          {
            q: "O que acontece com o meu arquivo?",
            a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, o arquivo e as linhas extraídas são apagados automaticamente; guardamos apenas o registro de que houve uma execução, sem o documento nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
          },
          {
            q: "Por que o download exige uma conta?",
            a: "Porque a versão grátis foi feita para experimentar. Com uma conta, você pode rodar a mesma extração em todos os seus conhecimentos de embarque, receber o resultado por e-mail e enviá-lo para o seu sistema aduaneiro ou de frete.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Flow com os campos que quiser e encaminhe os BLs para o endereço de e-mail dele (aquele para onde o armador ou o agente de cargas os envia), ou conecte pela API, por webhooks, Zapier, Make ou n8n. Os dados chegam ao seu sistema aduaneiro, ao seu ERP ou ao Google Sheets sem ninguém digitar.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically, so "cemento gris 42.5 kg" meets "cemento Portland tipo I
     * gris") and marks the cheapest unit price per line as Champion. Nothing
     * here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "cotação",
        docs: "cotações",
        a_doc: "uma cotação",
        the_doc: "a cotação",
        the_docs: "as cotações",
        your_doc: "sua cotação",
        your_docs: "suas cotações",
        all_your_docs: "todas as suas cotações",
        all_docs: "todas as cotações",
        each_doc: "cada cotação",
        another_doc: "outra cotação",
        this_doc: "esta cotação",
      },
      overrides: {
        title: "Comparar cotações de fornecedores grátis, item por item",
        description:
          "Envie duas ou três cotações em PDF ou foto e receba uma única tabela comparativa: cada item com o preço de cada fornecedor e o mais barato marcado. Grátis, sem modelos e sem cadastro para ver o resultado.",
        label: "Comparar cotações de fornecedores",
        h1: "Compare cotações de fornecedores",
        intro:
          "Envie duas ou três cotações para o mesmo pedido. O Tavnit lê cada uma, pareia os itens mesmo quando cada fornecedor os descreve de um jeito, e monta uma tabela com cada preço e a opção mais barata por item. Sem modelos, sem planilha feita à mão.",
        trust: ["2 ou 3 cotações · PDF ou foto", "{limit} documentos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste uma cotação para cá",
          hint: "PDF ou foto",
          sample: "Testar com três cotações de exemplo",
          formats: "PDF, JPG ou PNG · até 4 MB e 5 páginas por cotação",
        },
        stages: ["Lendo as cotações", "Organizando os itens", "O Matcher pareia os itens", "Quase lá"],
        result: {
          flowNote: "Cada cotação passa por um Flow fixo com {fields} campos e o Matcher cruza todas. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: marca, garantia, prazo de entrega por item…",
          download: "Baixar a comparação em Excel",
          another: "Comparar outras cotações",
          empty: "Não encontramos itens com preço nesta cotação. Teste com uma que tenha itens, quantidades e preços por linha.",
        },
        errors: {
          too_large: "Uma das cotações passa de 4 MB. Comprima-a ou envie só as páginas com os itens.",
          failed: "Não conseguimos ler uma das cotações. Teste com outra ou com os exemplos.",
          no_lines: "Uma das cotações não tem itens com preço, então não há o que comparar. Verifique se cada uma tem itens com preço unitário.",
          not_ready: "Ainda estamos lendo as cotações. Aguarde um instante e tente de novo.",
        },
        auth: {
          title: "Crie sua conta grátis para baixar a tabela",
          body: "O Excel é baixado na hora. Com uma conta, você também pode comparar mais de três cotações, e fazer isso em cada concorrência que chegar.",
        },
        next: {
          lead: "Isso foram três cotações enviadas à mão. Com uma conta, cada cotação que chega por e-mail entra no seu Flow, o Matcher cruza todas sozinho e a tabela segue adiante: para compras, para o ERP ou para quem aprova.",
          source: "Suas cotações",
          flow: {
            name: "Cotação",
            add: { name: "brand", type: "Text", hint: 'Ao lado de "Brand" ou na descrição', save: "Salvar", value: "Argos" },
          },
          inputs: { show: "Como suas cotações chegam ao Tavnit?" },
        },
        cleaners: {
          lead: "Regras simples que rodam sozinhas sobre cada cotação depois da leitura. Quatro ideias:",
          ideas: [
            { icon: "date", title: "Um só jeito de escrever a data", from: "{date}", to: "{iso}", note: "cada cotação, no mesmo formato" },
            { icon: "alert", title: "Alerta quando um fornecedor subir mais de 5%", from: "preço de hoje", to: "x a última cotação", note: "por item, antes de fechar a compra" },
            { icon: "approve", title: "Aprovar a escolha do fornecedor", from: "tabela comparativa", to: "quem decide", note: "o pedido de compra só sai com a aprovação" },
            { icon: "calendar", title: "Lembrar da validade da cotação", from: "válida até {date}", to: "lembrete 5 dias antes", note: "para não perder o preço" },
          ],
        },
        after: {
          title: "Sua tabela comparativa está pronta",
          lead: "Ela saiu de um Flow fixo com {fields} campos e de um Matcher. Na sua conta você escolhe os campos, e é assim quando o Tavnit cruza cada cotação:",
        },
        how: {
          steps: [
            { title: "Envie duas ou três cotações", body: "PDF ou foto, para o mesmo pedido. Qualquer fornecedor, qualquer layout, qualquer jeito de descrever cada item." },
            { title: "O Tavnit lê e cruza as cotações", body: "Ele extrai os itens de cada uma e o Matcher pareia os itens mesmo quando estão escritos de forma diferente. O mais barato de cada item é marcado como Champion." },
            { title: "Confira e baixe", body: "A tabela aparece na tela. Com uma conta grátis, você leva o resultado em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} documentos por dia (uma comparação de três cotações conta como três), com a tabela completa na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Como ele pareia os itens quando cada fornecedor os escreve de um jeito?",
            a: "Com um Matcher do Tavnit. Ele compara o significado de cada descrição, não o texto exato: \"cimento cinza 42,5 kg\" e \"cimento Portland tipo I cinza, saco de 42,5 kg\" caem na mesma linha. Na dúvida, uma segunda etapa decide se é o mesmo item.",
          },
          {
            q: "O que significa Champion?",
            a: "O fornecedor com o menor preço unitário naquele item. Em caso de empate, os dois aparecem. Itens que só um fornecedor cotou não têm concorrência e também são mostrados.",
          },
          {
            q: "Posso comparar mais de três cotações?",
            a: "Aqui não: a versão grátis aceita até três. Na sua conta, o Matcher compara até dez execuções do mesmo Flow, e você pode enviar a tabela por e-mail ou para o seu ERP.",
          },
          {
            q: "Posso escolher outras colunas?",
            a: "Aqui não: esta ferramenta usa um Flow fixo de cotação. Na sua conta você cria seu próprio Flow com os campos de que precisa (marca, garantia, prazo de entrega por item) e configura o Matcher para comparar o campo que quiser: preço, prazo ou qualquer número.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas por cotação.",
          },
          {
            q: "O que acontece com os meus arquivos?",
            a: "Eles são processados em uma conta do Tavnit dedicada às ferramentas grátis e não são usados para mais nada. Após 24 horas, os arquivos, os itens extraídos e a tabela são apagados; guardamos apenas o registro de que houve uma execução.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Flow de cotação com os seus campos e um Matcher sobre ele. Encaminhe as cotações para o endereço de e-mail do Matcher e, quando todas tiverem chegado, a tabela comparativa sai sozinha: por e-mail, por webhook ou direto para o seu ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Cotação A", hint: "PDF ou foto", sample: "Cotação A de exemplo" },
            { title: "Cotação B", hint: "PDF ou foto", sample: "Cotação B de exemplo" },
            { title: "Cotação C", hint: "PDF ou foto", sample: "Cotação C de exemplo", optional: true },
          ],
          run: "Comparar",
          sampleAll: "Testar com três cotações de exemplo",
          stages: ["Lendo as cotações", "Organizando os itens", "O Matcher pareia os itens", "Quase lá"],
          heading: "Tabela comparativa pronta",
          summary: "{n} · {ref}",
          labels: {
            description: "Descrição",
            quantity: "Quantidade",
            price: "Preço unitário",
            total: "Total",
            status: "Status",
            ref: "A",
            doc: "B",
            supplier: "Fornecedor",
            champion: "Champion",
            wins: "melhor em {n} itens",
            lines: ["item", "itens"],
          },
          status: { ok: "Confere", price: "Preço diferente", qty: "Quantidade diferente", both: "Preço e quantidade diferentes", missing: "Não cotado", extra: "Só nesta cotação" },
          empty: "O Matcher não encontrou itens comparáveis entre as cotações. Verifique se são para o mesmo pedido e se têm itens com preço unitário.",
          another: "Comparar outras cotações",
          download: "Baixar a comparação em Excel",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "contrato",
        docs: "contratos",
        a_doc: "um contrato",
        the_doc: "o contrato",
        the_docs: "os contratos",
        your_doc: "seu contrato",
        your_docs: "seus contratos",
        all_your_docs: "todos os seus contratos",
        all_docs: "todos os contratos",
        each_doc: "cada contrato",
        another_doc: "outro contrato",
        this_doc: "este contrato",
      },
      overrides: {
        title: "Extrator de datas de renovação de contratos, grátis (IA)",
        description:
          "Envie um contrato em PDF e receba as datas-chave em uma linha de Excel: partes, início, término, renovação automática, prazo de aviso e a data-limite para avisar. Grátis, sem modelos e sem cadastro para ver o resultado.",
        label: "Datas de contratos",
        h1: "Extraia as datas-chave de um contrato",
        intro:
          "Envie o PDF. O Tavnit lê o contrato e devolve uma linha com as partes, a data de assinatura, o início e o fim da vigência, se ele renova automaticamente, o prazo de aviso prévio e o último dia para avisar que você não vai renovar. Funciona com contratos de prestação de serviços, locação, fornecimento e licença, no formato em que vierem.",
        drop: {
          title: "Arraste seu contrato para cá",
          sample: "Testar com um contrato de exemplo",
        },
        stages: ["Enviando o documento", "Lendo as partes", "Encontrando a vigência e a renovação", "Calculando o prazo para avisar", "Quase lá"],
        result: {
          empty: "Não encontramos partes nem datas neste documento. Teste com um contrato assinado que tenha uma cláusula de vigência.",
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de contrato. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: responsável interno, centro de custo, cláusula de multa…",
          another: "Processar outro contrato",
        },
        next: {
          lead: "Isso foi um contrato. Com uma conta, o mesmo acontece com cada contrato que chegar, e as datas não param em um Excel: elas dão o alerta antes do prazo.",
          source: "Seu contrato",
          inputs: { show: "Como seu contrato chega ao Tavnit?" },
          flow: {
            name: "Contrato",
            add: { name: "owner", type: "Text", hint: "Quem assina do nosso lado", save: "Salvar", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Regras simples que rodam sozinhas sobre cada contrato depois da leitura. Quatro ideias com os seus próprios dados:",
          ideas: [
            { icon: "date", title: "Um só jeito de escrever a data", from: "{date}", to: "{iso}", note: "cada contrato, no mesmo formato" },
            { icon: "calendar", title: "Lembrete 60 dias antes do fim", from: "end_date", to: "lembrete a tempo", note: "antes que passe o prazo para avisar" },
            { icon: "alert", title: "Renovação automática: revisar antes", from: "auto_renewal = Yes", to: "para revisar", note: "para nenhum contrato renovar sem alguém olhar" },
            { icon: "mail", title: "E-mail para o responsável", from: "contrato lido", to: "e-mail com a linha", note: "quem assinou recebe as datas" },
          ],
        },
        after: {
          lead: "Ele saiu de um Flow fixo com {fields} campos. Na sua conta você escolhe os campos, e é assim quando o Tavnit lê cada contrato:",
        },
        how: {
          steps: [
            { title: "Envie o contrato", body: "PDF com texto ou escaneado. Qualquer tipo de contrato, seja quem for que o redigiu." },
            { title: "O Tavnit faz a leitura", body: "Ele encontra as partes, a assinatura, a vigência, a cláusula de renovação e o prazo de aviso prévio, e calcula a data-limite para avisar." },
            { title: "Confira e baixe", body: "A linha aparece na tela. Com uma conta grátis, você leva o resultado em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} contratos por dia, com o resultado completo na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Quais datas e dados ele extrai?",
            a: "As partes, a data de assinatura, o início e o fim da vigência, a duração, se renova automaticamente, o prazo de aviso prévio, a data-limite para avisar que não haverá renovação, o valor com a moeda e a lei aplicável. O que o contrato não diz fica em branco: nenhuma data é inventada.",
          },
          {
            q: "Por que o resultado é uma única linha?",
            a: "Porque um contrato tem uma vigência, uma data de assinatura e um conjunto de partes. Com uma conta, você pode processar uma pasta inteira de contratos e receber uma tabela com uma linha por contrato, pronta para ordenar pela data de término.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "PDF (com texto ou escaneado), JPG e PNG, com até 4 MB e 5 páginas. Se o seu contrato tiver mais páginas, envie as páginas com as cláusulas de vigência e renovação, ou crie uma conta.",
          },
          {
            q: "Posso escolher outras colunas?",
            a: "Aqui não: esta ferramenta usa um Flow fixo de contrato com 14 campos. Na sua conta você cria seus próprios Flows, para contratos ou qualquer outro documento, com os campos de que precisa: responsável interno, cláusula de multa, garantia. Sem modelos: você descreve o campo e, quando necessário, dá uma dica de onde procurar.",
          },
          {
            q: "O que acontece com o meu arquivo?",
            a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, o arquivo e a linha extraída são apagados automaticamente; guardamos apenas o registro de que houve uma execução, sem o documento nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
          },
          {
            q: "Funciona com contratos de qualquer país?",
            a: "Sim. Ele lida com contratos em inglês, espanhol e outros idiomas, com qualquer formato de data. Foi testado com contratos dos EUA, do Panamá, do México e da Colômbia, entre outros.",
          },
          {
            q: "Como recebo um aviso antes da data de término?",
            a: "Crie uma conta, monte um Flow com os campos que quiser e encaminhe os contratos para o endereço de e-mail dele, ou conecte pela API, por webhooks, Zapier, Make ou n8n. Um Cleaner compara a data-limite do aviso com a data de hoje e envia o e-mail ou o webhook para quem precisa decidir.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "recibo",
        docs: "recibos",
        a_doc: "um recibo",
        the_doc: "o recibo",
        the_docs: "os recibos",
        your_doc: "seu recibo",
        your_docs: "seus recibos",
        all_your_docs: "todos os seus recibos",
        all_docs: "todos os recibos",
        each_doc: "cada recibo",
        another_doc: "outro recibo",
        this_doc: "este recibo",
      },
      overrides: {
        title: "Recibo para Excel grátis: da foto para a planilha",
        description:
          "Envie a foto ou o PDF de um recibo e receba os itens no Excel: estabelecimento, data, itens, quantidades, impostos, gorjeta e total. Grátis, sem modelos e sem cadastro para ver o resultado. OCR de recibos para planilha em segundos.",
        label: "Recibo para Excel",
        h1: "Transforme um recibo em Excel",
        intro:
          "Tire uma foto do recibo ou envie o PDF. O Tavnit lê o estabelecimento, a data, cada item com o seu preço e os totais, e devolve tudo como planilha. Cupons térmicos apagados, tortos ou amassados também funcionam: não há modelo para configurar.",
        drop: {
          title: "Arraste a foto do seu recibo para cá",
          sample: "Testar com um recibo de exemplo",
        },
        stages: ["Enviando o recibo", "Lendo o estabelecimento e a data", "Encontrando os itens", "Organizando as colunas", "Quase lá"],
        result: {
          empty: "Não encontramos itens neste recibo. Teste com uma foto mais nítida, com o cupom inteiro no enquadramento e sem sombras.",
          flowNote: "Estas {fields} colunas são os campos de um Flow fixo de recibo. Na sua conta, quem escolhe os campos é você.",
          ghostHint: "No Tavnit você adiciona os campos que quiser: centro de custo, quem gastou, projeto, categoria…",
        },
        next: {
          lead: "Isso foi um recibo. Com uma conta, o mesmo acontece com cada recibo que chegar, e os itens não param em um Excel: seguem adiante sozinhos.",
          source: "Seu recibo",
          inputs: { show: "Como seu recibo chega ao Tavnit?" },
          flow: {
            name: "Recibo",
            add: { name: "cost_center", type: "Text", hint: "Quem gastou, ou o projeto", save: "Salvar", value: "Vendas" },
          },
        },
        cleaners: {
          lead: "Regras simples que rodam sozinhas sobre cada recibo depois da leitura. Quatro ideias com os seus próprios dados:",
          ideas: [
            { icon: "date", title: "Um só jeito de escrever a data", from: "{date}", to: "{iso}", note: "cada recibo, no mesmo formato para o relatório de despesas" },
            { icon: "sum", title: "Os itens precisam somar o subtotal", from: "itens {sum}", to: "subtotal {subtotal}", note: "se não bater, a foto foi mal lida e alguém confere", check: "sum" },
            { icon: "approve", title: "Aprovação acima de um valor", from: "total {total}", to: "aprovar antes de reembolsar", note: "quando passar de {threshold}" },
            { icon: "money", title: "Converter para a sua moeda", from: "{total} {currency}", to: "sua moeda", note: "pela cotação da data do recibo, para viagens" },
          ],
        },
        after: {
          lead: "Ele saiu de um Flow fixo com {fields} campos. Na sua conta você escolhe os campos, e é assim quando o Tavnit cuida de cada recibo de uma viagem ou de um mês:",
        },
        how: {
          steps: [
            { title: "Envie o recibo", body: "Uma foto do celular ou um PDF. Qualquer estabelecimento, qualquer idioma, por mais apagado que esteja o cupom." },
            { title: "O Tavnit faz a leitura", body: "Ele encontra o estabelecimento, a data, o número, cada item com o seu preço, e o subtotal, os impostos, a gorjeta e o total." },
            { title: "Confira e baixe", body: "A tabela aparece na tela. Com uma conta grátis, você leva o resultado em Excel." },
          ],
        },
        faqs: [
          {
            q: "O que a versão grátis inclui?",
            a: "{limit} recibos por dia, com o resultado completo na tela. Para baixar o Excel é preciso uma conta do Tavnit, que não tem custo.",
          },
          {
            q: "Funciona com uma foto do celular?",
            a: "Sim, esse é o caso mais comum. JPG, PNG e PDF de até 4 MB. Ajuda ter o cupom inteiro no enquadramento, luz uniforme e nenhum dedo por cima; uma foto torta ou um pouco desfocada ainda é lida.",
          },
          {
            q: "Quais formatos são aceitos?",
            a: "JPG, PNG e PDF (com texto ou escaneado), com até 4 MB e 5 páginas. Um cupom longo de supermercado cabe em uma foto.",
          },
          {
            q: "Preciso configurar um modelo por estabelecimento?",
            a: "Não. O Tavnit não usa modelos: ele lê cada recibo como ele chega, seja de um restaurante, uma farmácia, um táxi ou um posto de gasolina.",
          },
          {
            q: "Posso escolher outras colunas?",
            a: "Aqui não: esta ferramenta usa um Flow fixo de recibo com 15 campos. Na sua conta você cria seus próprios Flows com os campos de que precisa: por documento (centro de custo, quem gastou, projeto, categoria) ou por linha (código do produto). Sem modelos: você descreve o campo e, quando necessário, dá uma dica de onde procurar.",
          },
          {
            q: "O que acontece com o meu arquivo?",
            a: "Ele é processado em uma conta do Tavnit dedicada às ferramentas grátis e não é usado para mais nada. Após 24 horas, a foto e as linhas extraídas são apagadas automaticamente; guardamos apenas o registro de que houve uma execução, sem o documento nem o seu conteúdo. Se quiser que seja apagado antes, escreva para support@tavnit.io.",
          },
          {
            q: "Tenho cinquenta recibos de uma viagem. Um de cada vez?",
            a: "Aqui, sim. Com uma conta, você envia todos de uma vez: encaminhe por e-mail para o Flow, arraste vários juntos ou conecte pela API, e cada recibo sai como linhas no mesmo Excel, no Google Sheets ou no seu sistema de despesas.",
          },
          {
            q: "Como deixo isso automático?",
            a: "Crie uma conta, monte um Flow com os campos que quiser e encaminhe as fotos dos recibos para o endereço de e-mail dele, ou conecte pela API, por webhooks, Zapier, Make ou n8n. O relatório de despesas se monta sozinho.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format. The everyday case in Brazil: a file exported with "1,234.56"
     * that an Excel set up for "1.234,56" reads as text, or the other way round.
     */
    "number-format": {
      vocab: {
        doc: "planilha",
        docs: "planilhas",
        a_doc: "uma planilha",
        the_doc: "a planilha",
        the_docs: "as planilhas",
        your_doc: "sua planilha",
        your_docs: "suas planilhas",
        all_your_docs: "todas as suas planilhas",
        all_docs: "todas as planilhas",
        each_doc: "cada planilha",
        another_doc: "outra planilha",
        this_doc: "esta planilha",
      },
      overrides: {
        title: "Corrigir formato de número no Excel ou CSV, grátis",
        description:
          "Envie um arquivo Excel ou CSV com números como 1.234,56 ou 1,234.56 e receba todos em um só formato, prontos para somar. Você escolhe as colunas e o formato. Grátis, sem cadastro para ver o resultado.",
        label: "Corrigir formato de número",
        h1: "Corrija o formato dos números da sua planilha",
        intro:
          "Envie o arquivo Excel ou CSV. Escolha quais colunas têm números e como você os quer: 1234.56, 1,234.56 ou 1.234,56. O Tavnit converte cada um e devolve o seu arquivo com as mesmas colunas, na mesma ordem.",
        trust: ["CSV ou Excel · até 500 linhas", "{limit} arquivos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste seu arquivo Excel ou CSV para cá",
          hint: "ou escolha um arquivo do seu computador",
          choose: "Escolher arquivo",
          sample: "Testar com um arquivo de exemplo",
          formats: "CSV ou .xlsx · até 4 MB e 500 linhas",
        },
        errors: {
          unsupported: "Só arquivos CSV ou Excel (.xlsx).",
          xls: "Este é um arquivo do Excel antigo (.xls). Abra-o no Excel e salve como .xlsx ou .csv.",
          too_many_rows: "A versão grátis aceita até 500 linhas. Envie uma parte do arquivo.",
          too_many_columns: "Escolha até 10 colunas por vez.",
          no_columns: "Escolha pelo menos uma coluna.",
          nothing_to_clean: "Não encontramos números para converter nessas colunas.",
          empty: "O arquivo está vazio ou não tem linhas abaixo do cabeçalho.",
          unreadable: "Não conseguimos ler o arquivo. Se for um arquivo do Excel, salve-o de novo como .xlsx.",
          failed: "Não conseguimos converter este arquivo. Tente de novo ou teste com o arquivo de exemplo.",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie o arquivo", body: "Um CSV ou um arquivo do Excel, separado por vírgula ou ponto e vírgula." },
            { title: "Escolha colunas e formato", body: "Marcamos as colunas que parecem ter números. Você diz se os seus decimais usam vírgula ou ponto, e como você os quer." },
            { title: "Confira e baixe", body: "As células que mudaram ficam destacadas. Com sua conta grátis, você leva o arquivo em Excel ou CSV." },
          ],
        },
        faqs: [
          { q: "Por que o Excel não soma os meus números?", a: "Porque ele os lê como texto. Isso acontece quando o arquivo vem de um sistema ou de um país que escreve os decimais de outro jeito: 1,234.56 em um Excel configurado para 1.234,56, ou o contrário. Colocar tudo em um só formato faz com que voltem a ser números." },
          { q: "Como vocês sabem se os meus decimais usam vírgula ou ponto?", a: "Deduzimos pelos seus valores: se aparece 1.234,56, o decimal é a vírgula. Quando não dá para saber, como com um 1.234 sozinho, você escolhe. Essa escolha define como cada número é lido." },
          { q: "Qual formato devo escolher?", a: "1234.56, sem separador de milhar, é o que todo sistema, fórmula e importação lê sem problemas. 1,234.56 e 1.234,56 servem para mostrar o arquivo a pessoas, conforme o seu país." },
          { q: "O que acontece com as células que não são números?", a: "Ficam como estavam. Uma porcentagem (15%), um texto (N/A) ou uma célula vazia não são alterados: só muda o que é claramente um número." },
          { q: "Quais formatos são aceitos?", a: "CSV separado por vírgula, ponto e vírgula ou tabulação, e Excel .xlsx, com até 4 MB e 500 linhas. Se você tiver um arquivo do Excel antigo (.xls), salve-o como .xlsx." },
          { q: "O que acontece com o meu arquivo?", a: "Ele é usado só para esta conversão e apagado após 24 horas, junto com o resultado. Só o seu navegador vê o resultado." },
          { q: "Como faço isso acontecer sozinho?", a: "No Tavnit, a mesma regra é um Cleaner: ela roda sozinha em cada documento que você extrai ou em cada arquivo que chega por e-mail ou API, junto com datas, moedas e validações." },
        ],
        clean: {
          setup: {
            heading: "Escolha as colunas e o formato",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colunas com números",
            columnsHint: "Até {max}. Marcamos as que parecem ter números.",
            tooMany: "Você pode escolher até {max} colunas por vez.",
            inputLabel: "No seu arquivo, os decimais usam",
            inputOptions: { comma: "vírgula · 1.234,56", dot: "ponto · 1,234.56" },
            outputLabel: "Quero os números como",
            outputOptions: { plain: "1234.56 · para fórmulas e sistemas", us: "1,234.56", latam: "1.234,56" },
            preview: "Primeiras linhas",
            run: "Converter",
            change: "Trocar arquivo",
          },
          stages: ["Enviando o arquivo", "Lendo as colunas", "Convertendo os números", "Montando o seu arquivo"],
          heading: "Pronto: {file}",
          summary: "Alteramos {cells} de {cols}",
          cellWord: ["célula", "células"],
          columnWord: ["coluna", "colunas"],
          unchanged: "Nenhuma célula precisou mudar: elas já estavam nesse formato.",
          highlight: "As células que mudaram estão em azul.",
          shown: "Mostrando {shown} de {total} linhas. O download traz todas.",
          download: "Baixar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Converter outro arquivo",
          automate: {
            heading: "Faça isso acontecer com cada arquivo",
            body: "No Tavnit esta regra é um Cleaner. Você configura uma vez e ela roda sozinha em cada fatura que você extrai ou em cada arquivo que chega por e-mail ou API, junto com datas, moedas e validações.",
            cta: "Criar conta grátis",
            docs: "O que é um Cleaner",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: {
        doc: "planilha",
        docs: "planilhas",
        a_doc: "uma planilha",
        the_doc: "a planilha",
        the_docs: "as planilhas",
        your_doc: "sua planilha",
        your_docs: "suas planilhas",
        all_your_docs: "todas as suas planilhas",
        all_docs: "todas as planilhas",
        each_doc: "cada planilha",
        another_doc: "outra planilha",
        this_doc: "esta planilha",
      },
      overrides: {
        title: "Corrigir formato de data no Excel ou CSV, grátis",
        description:
          "Envie um arquivo Excel ou CSV com datas misturadas (03/04/2024, 12 de março de 2024, 2024-03-12) e receba todas em um só formato. Você escolhe as colunas e o formato. Grátis, sem cadastro para ver o resultado.",
        label: "Corrigir formato de data",
        h1: "Coloque todas as datas da sua planilha em um só formato",
        intro:
          "Envie o arquivo Excel ou CSV. Escolha quais colunas são datas e como você as quer: 2024-03-12, 12/03/2024 ou 03/12/2024. O Tavnit converte cada uma, inclusive as datas escritas por extenso, e devolve o seu arquivo com as mesmas colunas.",
        trust: ["CSV ou Excel · até 500 linhas", "{limit} arquivos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste seu arquivo Excel ou CSV para cá",
          hint: "ou escolha um arquivo do seu computador",
          choose: "Escolher arquivo",
          sample: "Testar com um arquivo de exemplo",
          formats: "CSV ou .xlsx · até 4 MB e 500 linhas",
        },
        errors: {
          unsupported: "Só arquivos CSV ou Excel (.xlsx).",
          xls: "Este é um arquivo do Excel antigo (.xls). Abra-o no Excel e salve como .xlsx ou .csv.",
          too_many_rows: "A versão grátis aceita até 500 linhas. Envie uma parte do arquivo.",
          too_many_columns: "Escolha até 10 colunas por vez.",
          no_columns: "Escolha pelo menos uma coluna.",
          nothing_to_clean: "Não encontramos datas para converter nessas colunas.",
          empty: "O arquivo está vazio ou não tem linhas abaixo do cabeçalho.",
          unreadable: "Não conseguimos ler o arquivo. Se for um arquivo do Excel, salve-o de novo como .xlsx.",
          failed: "Não conseguimos converter este arquivo. Tente de novo ou teste com o arquivo de exemplo.",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie o arquivo", body: "Um CSV ou um arquivo do Excel, com as datas como vierem: barras, hifens, pontos ou por extenso." },
            { title: "Escolha colunas e formato", body: "Marcamos as colunas que parecem ser datas. Você diz se o seu arquivo põe o dia ou o mês primeiro, e como você as quer." },
            { title: "Confira e baixe", body: "As células que mudaram ficam destacadas. Com sua conta grátis, você leva o arquivo em Excel ou CSV." },
          ],
        },
        faqs: [
          { q: "Como vocês sabem se 03/04/2024 é 3 de abril ou 4 de março?", a: "Uma data sozinha não diz. Por isso perguntamos se o seu arquivo põe o dia ou o mês primeiro, e sugerimos a resposta quando a coluna tem uma data como 15/04/2024, que só pode ser lida de um jeito." },
          { q: "Ele entende datas escritas por extenso?", a: "Sim. \"March 5th 2024\", \"12 de março de 2024\" ou \"1 Apr 2024\" são lidas com IA, que é o que uma fórmula do Excel não consegue fazer. As datas numéricas são lidas com regras, sem IA." },
          { q: "Qual formato devo escolher?", a: "2024-03-12 (ano, mês, dia) é o que todo sistema lê sem confusão e o que ordena corretamente. 03/12/2024 é o costume dos EUA; 12/03/2024 é o habitual no Brasil, na Europa e no restante da América Latina." },
          { q: "O que acontece com as células que não são datas?", a: "Ficam como estavam, assim como as células vazias. Quando uma data não pode ser lida com segurança, nós a deixamos como veio em vez de chutar." },
          { q: "E se o meu arquivo do Excel já guarda as datas como datas?", a: "Nós as usamos como estão, sem reinterpretá-las, e só mudamos o formato." },
          { q: "O que acontece com o meu arquivo?", a: "Ele é usado só para esta conversão e apagado após 24 horas, junto com o resultado. Só o seu navegador vê o resultado." },
          { q: "Como faço isso acontecer sozinho?", a: "No Tavnit, a mesma regra é um Cleaner: ela roda sozinha em cada documento que você extrai ou em cada arquivo que chega por e-mail ou API, junto com números, moedas e validações." },
        ],
        clean: {
          setup: {
            heading: "Escolha as colunas e o formato",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colunas com datas",
            columnsHint: "Até {max}. Marcamos as que parecem ser datas.",
            tooMany: "Você pode escolher até {max} colunas por vez.",
            inputLabel: "No seu arquivo, as datas numéricas começam por",
            inputOptions: { dmy: "o dia · 31/12/2024", mdy: "o mês · 12/31/2024" },
            outputLabel: "Quero as datas como",
            outputOptions: { iso: "2024-03-12 · ano, mês, dia", dmy: "12/03/2024 · dia, mês, ano", mdy: "03/12/2024 · mês, dia, ano" },
            preview: "Primeiras linhas",
            run: "Converter",
            change: "Trocar arquivo",
          },
          stages: ["Enviando o arquivo", "Lendo as colunas", "Convertendo as datas", "Lendo as datas por extenso", "Montando o seu arquivo"],
          heading: "Pronto: {file}",
          summary: "Alteramos {cells} de {cols}",
          cellWord: ["célula", "células"],
          columnWord: ["coluna", "colunas"],
          unchanged: "Nenhuma célula precisou mudar: elas já estavam nesse formato.",
          highlight: "As células que mudaram estão em azul.",
          shown: "Mostrando {shown} de {total} linhas. O download traz todas.",
          download: "Baixar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Converter outro arquivo",
          automate: {
            heading: "Faça isso acontecer com cada arquivo",
            body: "No Tavnit esta regra é um Cleaner. Você configura uma vez e ela roda sozinha em cada fatura, contrato ou arquivo que chegar, junto com números, moedas e validações.",
            cta: "Criar conta grátis",
            docs: "O que é um Cleaner",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: {
        doc: "planilha",
        docs: "planilhas",
        a_doc: "uma planilha",
        the_doc: "a planilha",
        the_docs: "as planilhas",
        your_doc: "sua planilha",
        your_docs: "suas planilhas",
        all_your_docs: "todas as suas planilhas",
        all_docs: "todas as planilhas",
        each_doc: "cada planilha",
        another_doc: "outra planilha",
        this_doc: "esta planilha",
      },
      overrides: {
        title: "Converter moeda no Excel pela cotação do dia, grátis",
        description:
          "Envie um arquivo Excel ou CSV com preços ou valores e receba cada coluna convertida para dólares, euros, libras, reais ou qualquer uma de 30 moedas pela cotação de referência do dia. Grátis, sem cadastro para ver o resultado.",
        label: "Converter moeda",
        h1: "Converta os valores da sua planilha para outra moeda",
        intro:
          "Envie o arquivo Excel ou CSV. Escolha as colunas de valores, a moeda em que estão e a que você quer. O Tavnit adiciona a coluna convertida ao lado de cada uma, pela cotação do dia, e devolve o seu arquivo completo.",
        trust: ["CSV ou Excel · até 500 linhas", "{limit} arquivos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste seu arquivo Excel ou CSV para cá",
          hint: "ou escolha um arquivo do seu computador",
          choose: "Escolher arquivo",
          sample: "Testar com um arquivo de exemplo",
          formats: "CSV ou .xlsx · até 4 MB e 500 linhas",
        },
        errors: {
          unsupported: "Só arquivos CSV ou Excel (.xlsx).",
          xls: "Este é um arquivo do Excel antigo (.xls). Abra-o no Excel e salve como .xlsx ou .csv.",
          too_many_rows: "A versão grátis aceita até 500 linhas. Envie uma parte do arquivo.",
          too_many_columns: "Escolha até 10 colunas por vez.",
          no_columns: "Escolha pelo menos uma coluna.",
          nothing_to_clean: "Não encontramos valores para converter nessas colunas.",
          empty: "O arquivo está vazio ou não tem linhas abaixo do cabeçalho.",
          unreadable: "Não conseguimos ler o arquivo. Se for um arquivo do Excel, salve-o de novo como .xlsx.",
          failed: "Não conseguimos converter este arquivo. Tente de novo ou teste com o arquivo de exemplo.",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie o arquivo", body: "Um CSV ou um arquivo do Excel com preços, totais ou qualquer coluna de valores." },
            { title: "Escolha as moedas", body: "Marcamos as colunas que parecem ter valores. Você diz em que moeda estão, como os decimais estão escritos e para qual moeda converter." },
            { title: "Confira e baixe", body: "Cada coluna convertida fica ao lado da original. Com sua conta grátis, você leva o arquivo em Excel ou CSV." },
          ],
        },
        faqs: [
          { q: "Qual cotação ele usa?", a: "A cotação de referência do dia publicada pelo Banco Central Europeu. Ela é a mesma para o arquivo inteiro e é uma referência, não a taxa de compra ou de venda do seu banco." },
          { q: "Quais moedas posso converter?", a: "Real (BRL), dólar americano (USD), euro (EUR), libra (GBP), peso mexicano (MXN), yuan (CNY), dólar canadense, iene, franco suíço e as demais moedas que o Banco Central Europeu publica, 30 no total. Você pode converter de qualquer uma delas para qualquer uma delas." },
          { q: "Funciona com pesos colombianos, soles, pesos chilenos ou balboas?", a: "Ainda não: essas moedas não estão nas cotações do Banco Central Europeu. No Panamá, onde o balboa tem paridade com o dólar, você pode escolher USD." },
          { q: "O que acontece com as minhas colunas originais?", a: "Ficam como estavam. A conversão é adicionada como uma nova coluna ao lado delas, por exemplo \"Price (USD)\", para que você possa comparar." },
          { q: "O que acontece com as células que não são valores?", a: "Ficam vazias na coluna convertida. Um texto, uma porcentagem ou uma célula vazia não são convertidos." },
          { q: "O que acontece com o meu arquivo?", a: "Ele é usado só para esta conversão e apagado após 24 horas, junto com o resultado. Só o seu navegador vê o resultado." },
          { q: "Como faço isso acontecer sozinho?", a: "No Tavnit, a conversão de moeda é um Cleaner: ela roda sozinha em cada fatura que você extrai ou em cada arquivo que chega por e-mail ou API, junto com datas, números e validações." },
        ],
        clean: {
          setup: {
            heading: "Escolha as colunas e as moedas",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colunas com valores",
            columnsHint: "Até {max}. Marcamos as que parecem ter valores.",
            tooMany: "Você pode escolher até {max} colunas por vez.",
            sourceLabel: "Os valores estão em",
            sourceHint: "Moedas com cotação do Banco Central Europeu.",
            inputLabel: "Os decimais usam",
            inputOptions: { comma: "vírgula · 1.234,56", dot: "ponto · 1,234.56" },
            outputPopular: "Mais usadas",
            outputAll: "Todas as moedas",
            outputLabel: "Converter para",
            outputOptions: {},
            preview: "Primeiras linhas",
            run: "Converter",
            change: "Trocar arquivo",
          },
          stages: ["Enviando o arquivo", "Lendo os valores", "Buscando a cotação do dia", "Convertendo", "Montando o seu arquivo"],
          heading: "Pronto: {file}",
          summary: "Convertemos {cells} de {cols}",
          cellWord: ["célula", "células"],
          columnWord: ["coluna", "colunas"],
          unchanged: "Não encontramos valores para converter nessas colunas.",
          highlight: "As colunas convertidas estão em azul.",
          shown: "Mostrando {shown} de {total} linhas. O download traz todas.",
          download: "Baixar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Converter outro arquivo",
          automate: {
            heading: "Faça isso acontecer com cada fatura",
            body: "No Tavnit a conversão de moeda é um Cleaner. Você configura uma vez e cada fatura ou cotação em outra moeda já chega convertida, junto com datas, números e validações.",
            cta: "Criar conta grátis",
            docs: "O que é um Cleaner",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "planilha",
        docs: "planilhas",
        a_doc: "uma planilha",
        the_doc: "a planilha",
        the_docs: "as planilhas",
        your_doc: "sua planilha",
        your_docs: "suas planilhas",
        all_your_docs: "todas as suas planilhas",
        all_docs: "todas as planilhas",
        each_doc: "cada planilha",
        another_doc: "outra planilha",
        this_doc: "esta planilha",
      },
      overrides: {
        title: "Traduzir colunas do Excel, grátis",
        description:
          "Envie um arquivo Excel ou CSV e traduza as colunas que escolher para mais de 40 idiomas: inglês, espanhol, português, chinês e muito mais. Cada tradução é adicionada ao lado da sua coluna. Grátis, sem cadastro para ver o resultado.",
        label: "Traduzir colunas",
        h1: "Traduza as colunas da sua planilha",
        intro:
          "Envie o arquivo Excel ou CSV. Escolha quais colunas traduzir e para qual idioma. O Tavnit detecta o idioma de origem e adiciona a tradução ao lado de cada coluna, sem mexer no resto do seu arquivo.",
        trust: ["CSV ou Excel · até 200 linhas", "{limit} arquivos grátis por dia", "Tudo é apagado após 24 h"],
        drop: {
          title: "Arraste seu arquivo Excel ou CSV para cá",
          hint: "ou escolha um arquivo do seu computador",
          choose: "Escolher arquivo",
          sample: "Testar com um arquivo de exemplo",
          formats: "CSV ou .xlsx · até 4 MB e 200 linhas",
        },
        errors: {
          unsupported: "Só arquivos CSV ou Excel (.xlsx).",
          xls: "Este é um arquivo do Excel antigo (.xls). Abra-o no Excel e salve como .xlsx ou .csv.",
          too_many_rows: "A tradução grátis aceita até 200 linhas. Envie uma parte do arquivo.",
          too_many_columns: "Escolha até 10 colunas por vez.",
          no_columns: "Escolha pelo menos uma coluna.",
          nothing_to_clean: "Não encontramos texto para traduzir nessas colunas.",
          empty: "O arquivo está vazio ou não tem linhas abaixo do cabeçalho.",
          unreadable: "Não conseguimos ler o arquivo. Se for um arquivo do Excel, salve-o de novo como .xlsx.",
          failed: "Não conseguimos traduzir este arquivo. Tente de novo ou teste com o arquivo de exemplo.",
        },
        how: {
          heading: "Como funciona",
          steps: [
            { title: "Envie o arquivo", body: "Um CSV ou um arquivo do Excel com descrições, instruções, comentários ou qualquer coluna de texto." },
            { title: "Escolha colunas e idioma", body: "Marcamos as colunas com texto. Você escolhe o idioma; o idioma de origem é detectado para você." },
            { title: "Confira e baixe", body: "Cada tradução fica ao lado da coluna original. Com sua conta grátis, você leva o arquivo em Excel ou CSV." },
          ],
        },
        faqs: [
          { q: "Quais idiomas posso escolher?", a: "Mais de 40: inglês, espanhol, português, francês, alemão, chinês, italiano, japonês, coreano, árabe, russo, hindi, turco, vietnamita e muitos outros. O idioma de origem é detectado célula por célula, então funciona mesmo quando o seu arquivo mistura idiomas." },
          { q: "O que acontece com códigos, números e nomes próprios?", a: "São mantidos. A tradução respeita formatação, unidades e códigos; uma célula que já está no idioma de destino fica como está." },
          { q: "Por que o limite é de 200 linhas?", a: "Porque cada célula é traduzida com um modelo de linguagem. A versão grátis aceita até 200 linhas por arquivo; uma conta não tem esse limite." },
          { q: "O que acontece com as minhas colunas originais?", a: "Ficam como estavam. A tradução é adicionada como uma nova coluna ao lado delas, por exemplo \"Description (ES)\"." },
          { q: "Posso usar para descrições de produtos no despacho aduaneiro?", a: "Sim, é um uso comum: passar as descrições de uma fatura comercial ou de um packing list para inglês ou espanhol antes de classificar as mercadorias." },
          { q: "O que acontece com o meu arquivo?", a: "Ele é usado só para esta tradução e apagado após 24 horas, junto com o resultado. Só o seu navegador vê o resultado." },
          { q: "Como faço isso acontecer sozinho?", a: "No Tavnit, a tradução é um Cleaner: ela roda sozinha em cada documento que você extrai ou em cada arquivo que chega por e-mail ou API, junto com datas, números e moedas." },
        ],
        clean: {
          setup: {
            heading: "Escolha as colunas e o idioma",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colunas com texto",
            columnsHint: "Até {max}. Marcamos as que têm texto.",
            tooMany: "Você pode escolher até {max} colunas por vez.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Mais usados",
            outputAll: "Todos os idiomas",
            outputLabel: "Traduzir para",
            outputOptions: {},
            preview: "Primeiras linhas",
            run: "Traduzir",
            change: "Trocar arquivo",
          },
          stages: ["Enviando o arquivo", "Lendo as colunas", "Detectando o idioma", "Traduzindo", "Montando o seu arquivo"],
          heading: "Pronto: {file}",
          summary: "Traduzimos {cells} de {cols}",
          cellWord: ["célula", "células"],
          columnWord: ["coluna", "colunas"],
          unchanged: "Não encontramos texto para traduzir nessas colunas.",
          highlight: "As colunas traduzidas estão em azul.",
          shown: "Mostrando {shown} de {total} linhas. O download traz todas.",
          download: "Baixar",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Traduzir outro arquivo",
          automate: {
            heading: "Faça isso acontecer com cada documento",
            body: "No Tavnit a tradução é um Cleaner. Você configura uma vez e cada fatura, packing list ou arquivo que chegar já vem com as descrições traduzidas.",
            cta: "Criar conta grátis",
            docs: "O que é um Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Grátis. Sem modelos. Os itens da sua fatura em uma planilha.",
    "invoice-line-items": "Grátis. Uma linha por item, cabeçalho em cada linha. Sem modelos.",
    "po-invoice-check": "Grátis. Cada item do pedido contra a fatura: preço, quantidade, itens faltando e a mais.",
    "split-scanned-pdf": "Grátis. Entra uma digitalização, sai cada documento, já classificado.",
    "packing-list-to-excel": "Grátis. Sem modelos. Cada linha do seu packing list em uma planilha.",
    "bill-of-lading-to-excel": "Grátis. Sem modelos. Partes, navio, portos e uma linha por contêiner.",
    "quote-comparison": "Grátis. Duas ou três cotações, uma tabela, o mais barato de cada item marcado.",
    "contract-dates": "Grátis. Partes, vigência, renovação automática e prazo de aviso, em uma linha.",
    "receipt-to-excel": "Grátis. Fotografe um recibo e receba os itens em uma planilha.",
    "number-format": "Grátis. Qualquer coluna de números, um só formato: 1234.56, 1,234.56 ou 1.234,56.",
    "date-format": "Grátis. Entram datas misturadas, sai um só formato, até datas por extenso.",
    "currency-converter": "Grátis. Qualquer coluna de preços, convertida pela cotação de referência do dia.",
    "translate-columns": "Grátis. Qualquer coluna de texto, traduzida para mais de 40 idiomas.",
  },
};

export default copy;
