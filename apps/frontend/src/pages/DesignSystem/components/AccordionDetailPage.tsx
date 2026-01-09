import { Accordion, Card } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function AccordionDetailPage() {
  const items = [
    {
      id: '1',
      title: 'O que é um Accordion?',
      content: 'Accordion é um componente que permite expandir e colapsar seções de conteúdo, ideal para FAQ e configurações.'
    },
    {
      id: '2',
      title: 'Quando usar?',
      content: 'Use para organizar grandes quantidades de conteúdo em seções expansíveis, melhorando a navegação.'
    },
    {
      id: '3',
      title: 'Melhores práticas',
      content: 'Limite o número de itens para não sobrecarregar. Use títulos claros e descritivos.'
    }
  ];

  return (
    <SimpleComponentPage
      title="Accordion"
      subtitle="Componente para expandir/colapsar seções de conteúdo"
      overview="Accordion organiza conteúdo em seções expansíveis, perfeito para FAQ, detalhes de transações e configurações avançadas."
      usage={
        <Card>
          <h2>Exemplo Interativo</h2>
          <div style={{ marginTop: '16px' }}>
            <Accordion items={items} />
          </div>
          <div style={{ marginTop: '24px' }}>
            <h3>Múltiplos abertos</h3>
            <Accordion items={items} allowMultiple />
          </div>
        </Card>
      }
      installation={`import { Accordion } from '@/components/UI';`}
      basicExample={`const items = [
  {
    id: '1',
    title: 'Título da seção',
    content: 'Conteúdo da seção'
  }
];

<Accordion items={items} allowMultiple={false} />`}
      propsCode={`interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean; // default: false
}`}
      styleTokens={`border: 1px solid var(--color-border);
border-radius: var(--radius-md);
background: white;

/* Item Header */
padding: 16px;
font-weight: 600;

/* Transition */
animation: slideDown 0.2s ease-out;`}
    />
  );
}
