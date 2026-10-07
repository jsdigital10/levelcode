export interface LearningModule {
  number: string;
  title: string;
  description: string;
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    number: '01',
    title: 'Conexão e Estrutura',
    description:
      'Entenda como conectar os recursos necessários para transformar uma interface em algo realmente funcional.',
  },
  {
    number: '02',
    title: 'Engenharia de Prompts',
    description:
      'Aprenda a estruturar comandos claros e completos para construir sistemas reais com inteligência artificial.',
  },
  {
    number: '03',
    title: 'Sistemas Web',
    description:
      'Domine o processo prático para desenvolver sistemas simples, úteis e prontos para uso profissional.',
  },
  {
    number: '04',
    title: 'Sistema de Orçamentos',
    description:
      'Veja na prática como estruturar ferramentas funcionais para gerar e organizar orçamentos.',
  },
  {
    number: '05',
    title: 'Sistema de Gestão',
    description:
      'Acompanhe a criação de aplicações completas de controle, como o sistema de gestão para motoristas.',
  },
  {
    number: '06',
    title: 'Hospedagem e Publicação',
    description:
      'Aprenda como colocar seus sistemas e páginas no ar de forma simples utilizando plataformas gratuitas.',
  },
];
