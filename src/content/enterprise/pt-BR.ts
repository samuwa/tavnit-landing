import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Português (Brasil) (pt-BR). */
const ptBR: EnterpriseCopy = {
  title: "Serviços Enterprise — Implementação, Controle e Consultoria Empresarial",
  description:
    "Tavnit Enterprise: contratos nos seus termos, implementação acompanhada, funções de usuário e trilha de auditoria, suporte direto e Consultoria Empresarial para otimizar os processos de digitalização de documentos e entrada de dados.",
  home: "Início",
  breadcrumbLabel: "Trilha de navegação",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Serviços Enterprise",
  lead:
    "Para organizações que processam um grande volume de documentos ou precisam de condições próprias: um contrato, apoio prático para colocar o Tavnit em produção e consultoria sobre o processo ao redor — além da plataforma.",
  servicesHeading: "O que o Enterprise inclui",
  services: [
    {
      title: "Contrato nos seus termos",
      body: "Volume, condições comerciais e forma de pagamento acordados em um contrato dimensionado para os seus documentos, em vez de um plano self-service.",
    },
    {
      title: "Implementação acompanhada",
      body: "Configuramos com você os Flows, Cleaners, regras de revisão e integrações (API, webhooks, e-mail), sobre os seus documentos reais, e deixamos tudo rodando em produção.",
    },
    {
      title: "Controle e auditoria",
      body: "Funções de usuário, incluindo uma função exclusiva de revisor, revisão humana condicional e uma trilha de auditoria imutável de cada visualização, edição e aprovação.",
      links: [
        { label: "Funções de usuário", href: "/docs/user-roles" },
        { label: "Revisão humana", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Suporte direto",
      body: "Uma linha direta com a equipe que constrói o produto, em inglês e espanhol.",
    },
  ],
  advisory: {
    eyebrow: "Consultoria Empresarial",
    heading: "Consultoria Empresarial",
    subheading: "Otimização dos processos de digitalização de documentos e entrada de dados",
    intro:
      "Além da plataforma, assessoramos empresas que querem organizar e melhorar a forma como recebem, digitalizam e registram as informações dos seus documentos — seja ou não o resultado final automatizado com o Tavnit.",
    scopeHeading: "O que abrange",
    scope: [
      { title: "Diagnóstico do processo atual", body: "Quais documentos chegam, por quais canais e em que volume; quem os registra, quanto tempo leva e de onde vêm os erros." },
      { title: "Digitalização", body: "Critérios de digitalização e captura, organização e nomenclatura de arquivos, separação de lotes mistos e rastreabilidade dos originais." },
      { title: "Entrada de dados", body: "Quais campos são realmente necessários, formatos padrão para datas, valores e moedas, validações e conferência com os dados mestres." },
      { title: "Controles", body: "Onde a revisão humana é necessária, segregação de funções e a trilha de auditoria que um auditor ou órgão regulador vai pedir." },
      { title: "Integração", body: "Como os dados chegam ao seu ERP, à contabilidade ou às planilhas, e quais etapas vale a pena automatizar e quais não." },
      { title: "Implantação e treinamento", body: "Um plano de implementação em etapas e treinamento para quem registra, revisa e usa os dados." },
    ],
    deliverablesHeading: "Entregáveis",
    deliverables:
      "Um diagnóstico por escrito do processo atual, o desenho do processo proposto com seus controles e um plano de implementação em etapas com indicadores para medir o resultado — tempo de registro por documento, taxa de correção, documentos pendentes de revisão.",
  },
  ctaHeading: "Fale com a gente",
  ctaBody: "Conte sobre os seus documentos e o seu volume, e diremos qual destes serviços se encaixa.",
  ctaButton: "Agendar uma reunião",
  ctaEmail: "ou escreva para",
};

export default ptBR;
