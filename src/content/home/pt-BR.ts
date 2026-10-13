import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — Português (Brasil) (pt-BR). */
const ptBR: HomeCopy = {
  title: "Tavnit — Extraia dados dos seus documentos com IA, revise e coloque em ação",
  description:
    "Transforme notas fiscais, romaneios, contratos e formulários em dados estruturados, sem modelos por fornecedor. Sua equipe revisa e aprova antes de qualquer registro. API, e-mail e MCP.",
  schemaName: "Tavnit",
  breadcrumbHome: "Início",
  readInEnglish: null,
  eyebrow: "Operações de documentos com IA",
  h1: "Extraia dados dos seus documentos com IA, revise com sua equipe e coloque em ação",
  lede:
    "O Tavnit transforma notas fiscais, romaneios, contratos e formulários em dados estruturados — sem modelos por fornecedor. Sua equipe revisa e aprova antes que qualquer coisa seja registrada, e os dados aprovados chegam aos seus sistemas por API, webhook ou e-mail.",
  ctaDemo: "Agendar uma demonstração",
  ctaTry: "Experimente grátis",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "O problema",
  problems: [
    "Os mesmos campos, redigitados a partir de cem layouts diferentes, todo mês. Cada fornecedor formata a nota fiscal do seu jeito, e alguém da sua equipe copia tudo à mão para uma planilha ou para o sistema.",
    "Ferramentas de OCR baseadas em modelos funcionam até que um fornecedor mude o layout — e então falham em silêncio. Ferramentas do tipo “converse com seu PDF” inventam números e não têm revisão, nem trilha de auditoria, nem caminho de saída para os seus sistemas.",
    "Um total errado parece exatamente igual a um certo. O custo real não são as horas de digitação: é o erro que chega à sua contabilidade ou à sua declaração aduaneira sem que ninguém perceba.",
  ],
  stepsHeading: "Como funciona: extrair, revisar, agir",
  steps: [
    {
      title: "Extrair",
      body: "Você define uma única vez os campos de que precisa — número da nota, fornecedor, itens com quantidade e preço — e o Tavnit os extrai de qualquer PDF, digitalização ou foto, seja qual for o layout. Sem modelos por fornecedor.",
    },
    {
      title: "Revisar",
      body: "Os Cleaners limpam e validam: formatos de data, moedas, aritmética das linhas, consultas aos seus dados mestres. O que não fecha para e vai para um revisor designado. Tudo fica registrado em uma trilha de auditoria imutável.",
    },
    {
      title: "Agir",
      body: "Os dados aprovados chegam ao seu ERP ou à sua contabilidade por API ou webhook, ficam armazenados em um Bucket consultável, preenchem formulários PDF ou alimentam um agente que trabalha em um portal web por você.",
    },
  ],
  useCasesHeading: "Casos de uso",
  useCasesIntro:
    "Cada página mostra quais campos importam naquele tipo de documento e o que costuma dar errado — justamente o que torna um tipo de documento mais difícil que outro.",
  useCasesAll: "Ver todos os {count} casos de uso",
  integrationsHeading: "Funciona com o que você já usa",
  integrations: [
    "E-mail: encaminhe o PDF para um endereço do Tavnit e receba os dados de volta. Integração zero.",
    "API REST e webhooks: envie documentos do seu sistema e receba os resultados assim que ficarem prontos. Receitas para Zapier, Make, n8n e Power Automate.",
    "Conector MCP: conecte o Tavnit ao claude.ai ou ao Cursor e peça ao seu assistente que processe documentos ou consulte os dados extraídos.",
    "Buckets: armazenamento estruturado integrado, que você consulta em linguagem natural e transforma em gráficos, sem exportar nada.",
  ],
  integrationsAll: "Todas as integrações",
  faqHeading: "Perguntas frequentes",
  faqs: [
    {
      q: "Preciso criar um modelo para cada fornecedor?",
      a: "Não. Você define os campos uma única vez em um Flow e o Tavnit os encontra em qualquer layout. Se um fornecedor mudar o formato da nota fiscal, você não precisa fazer nada.",
    },
    {
      q: "Como evito que um valor errado entre no meu sistema?",
      a: "Com revisão humana. Você pode exigir aprovação em todos os documentos ou apenas quando uma regra de Cleaner detectar algo — por exemplo, que quantidade vezes preço unitário não bate com o total da linha. O revisor vê o documento e os dados extraídos, corrige ou aprova, e cada ação fica registrada na trilha de auditoria.",
    },
    {
      q: "Como envio os documentos?",
      a: "Como preferir: encaminhe o e-mail com o PDF anexado para um endereço do Tavnit, faça o upload no app ou envie por API. Os resultados saem por webhook, API ou e-mail, ou ficam guardados em um Bucket que você pode consultar e visualizar em gráficos.",
    },
    {
      q: "Funciona no meu idioma?",
      a: "Sim. O Tavnit extrai documentos escritos em qualquer idioma, e você pode devolver os dados com os nomes de campo que o seu sistema usa. O próprio app está disponível em vários idiomas.",
    },
    {
      q: "Quanto custa?",
      a: "O preço é baseado em créditos: 1 crédito equivale a 1 página processada. Agende uma demonstração e vamos analisar o seu volume e os seus documentos reais.",
    },
  ],
  finalHeading: "Teste com um dos seus documentos",
  finalBody:
    "Traga uma nota fiscal ou um romaneio de verdade. Na demonstração, montamos juntos o seu primeiro Flow e você vê os dados saindo ao vivo.",
};

export default ptBR;
