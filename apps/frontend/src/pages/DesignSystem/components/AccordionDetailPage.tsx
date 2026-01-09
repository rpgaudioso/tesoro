import { Accordion } from '../../../components/UI';
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

  const whenToUse = [
    'Para organizar FAQ (perguntas frequentes)',
    'Para exibir detalhes de transações ou configurações avançadas',
    'Quando há muito conteúdo que pode ser organizado em seções',
    'Para economizar espaço na tela mantendo conteúdo acessível',
  ];

  const whenNotToUse = [
    'Para conteúdo crítico que deve estar sempre visível',
    'Quando há poucas informações (use Card ou Section simples)',
    'Para navegação principal (use Menu ou Tabs)',
  ];

  return (
    <SimpleComponentPage
      title="Accordion"
      subtitle="Componente para expandir/colapsar seções de conteúdo"
      overview="Accordion organiza conteúdo em seções expansíveis, perfeito para FAQ, detalhes de transações e configurações avançadas."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Interativo</h3>
            <Accordion items={items} />
          </div>

          <div>
            <h3 className="section-title">Múltiplos Abertos</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Permite que múltiplos itens permaneçam expandidos simultaneamente.
            </p>
            <Accordion items={items} allowMultiple />
          </div>
        </>
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
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
