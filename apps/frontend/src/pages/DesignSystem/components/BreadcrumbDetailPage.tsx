import { Breadcrumb } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function BreadcrumbDetailPage() {
  const items = [
    { label: 'Home', href: '/app' },
    { label: 'Transações', href: '/app/transactions' },
    { label: 'Detalhes' }
  ];

  return (
    <SimpleComponentPage
      title="Breadcrumb"
      subtitle="Navegação hierárquica"
      overview="Breadcrumb mostra a localização atual na hierarquia de páginas, facilitando a navegação e orientação."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Completo</h3>
            <Breadcrumb items={items} />
          </div>
          <div>
            <h3 className="section-title">Nível único</h3>
            <Breadcrumb items={[{ label: 'Home', href: '/app' }, { label: 'Dashboard' }]} />
          </div>
        </>
      }
      installation={`import { Breadcrumb } from '@/components/UI';`}
      basicExample={`const items = [
  { label: 'Home', href: '/app' },
  { label: 'Página' }
];

<Breadcrumb items={items} />`}
      propsCode={`interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}`}
      styleTokens={`/* Link */
color: var(--color-text-secondary);
font-size: 14px;

/* Link hover */
color: var(--color-primary);
text-decoration: underline;

/* Current */
color: var(--color-text-primary);
font-weight: 500;`}
    />
  );
}
