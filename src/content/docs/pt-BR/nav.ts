import type { DocsNavCopy } from "../types";

/**
 * Brazilian Portuguese docs: sidebar, chrome and page titles. Product nouns
 * stay English as in the app (Flow, Collection, Cleaner, Bucket, Agent…); UI
 * labels follow the app's Brazilian Portuguese dictionary (tavnit-nextjs
 * src/lib/i18n/translations.pt-BR.ts), e.g. "Revisão humana" for the Human in
 * the Loop page.
 */
const ptBR: DocsNavCopy = {
  docsName: "Documentação",
  home: "Início",
  description:
    "Documentação do Tavnit: extração de documentos com IA, revisão humana, conector MCP para assistentes de IA, API REST, gatilhos por e-mail e mais.",
  chrome: {
    back: "Voltar ao início",
    toggle: "Abrir ou fechar o menu",
    goHome: "Ir para o início",
    contents: "Conteúdo",
    close: "Fechar o menu",
    nav: "Documentação",
    languages: "Ler esta página em outro idioma",
    englishOnly: "Somente em inglês",
    copy: "Copiar",
    copied: "Copiado!",
    related: "Documentação relacionada",
    keepReading: "Continue lendo",
  },
  groupLabels: {
    start: "Começar",
    orchestration: "Orquestração",
    input: "Entrada",
    processing: "Processamento",
    intelligence: "Inteligência",
    verticals: "Áudio e redes sociais",
    data: "Dados e revisão",
    integrate: "Integrações",
    organization: "Organização",
  },
  labels: {
    "getting-started": "Primeiros passos",
    pipelines: "Pipelines",
    "pipeline-map": "Mapa de Pipelines",
    collections: "Collections",
    subjects: "Subjects",
    splitters: "Splitters",
    flows: "Flows",
    cleaners: "Cleaners",
    agents: "Agents",
    matchers: "Matchers",
    inspectors: "Inspectors",
    fillers: "Fillers",
    signals: "Signals",
    nets: "Nets",
    buckets: "Buckets",
    "human-in-the-loop": "Revisão humana",
    "email-integration": "Integração por e-mail",
    "api-integration": "Integração via API",
    webhooks: "Webhooks",
    "mcp-connector": "Conector MCP",
    "user-roles": "Funções de usuário",
  },
  pages: {
    "getting-started": {
      heading: "Primeiros passos",
      title: "Docs do Tavnit: primeiros passos com extração por IA",
      description:
        "Configure seu primeiro Flow no Tavnit: defina os campos que você quer, envie um documento e receba dados estruturados. Sem modelos e sem código.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: defina o que o Tavnit extrai de cada documento",
      description:
        "O esquema de dados de um Flow: campos de metadados e de tabela, tipos de dados, dicas de extração para a IA e campos compostos e de vários valores.",
    },
    "api-integration": {
      heading: "Integração via API",
      title: "API REST de extração de documentos: Python, JS e no-code",
      description:
        "A referência da API REST do Tavnit: todos os endpoints de Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines e mais, com receitas no-code.",
    },
    "email-integration": {
      heading: "Integração por e-mail",
      title: "Extraia dados de anexos de e-mail automaticamente",
      description:
        "Encaminhe documentos para o endereço de um Flow, Collection ou Splitter e cada anexo é extraído automaticamente. Tipos de arquivo, motivos de descarte, saída.",
    },
    "mcp-connector": {
      heading: "Conector MCP",
      title: "Conector MCP: conecte o Tavnit ao Claude e ao Cursor",
      description:
        "Passo a passo: gere a URL do conector, adicione-a no claude.ai ou no Cursor, atualize-a a tempo e resolva os erros mais comuns.",
    },
    "human-in-the-loop": {
      heading: "Revisão humana (Human in the Loop)",
      title: "Revisão humana com trilha de auditoria somente de inclusão",
      description:
        "Pause um Flow para revisão humana antes da entrega, em todo Run ou só nos sinalizados por uma regra do Cleaner. Atribua revisores, edite, aprove ou rejeite.",
    },
  },
};

export default ptBR;
