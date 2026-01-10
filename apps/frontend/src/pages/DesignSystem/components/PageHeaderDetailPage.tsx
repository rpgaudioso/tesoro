import { PageHeader } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function PageHeaderDetailPage() {
  return (
    <SimpleComponentPage
      title="PageHeader"
      subtitle="Cabeçalho padrão para páginas internas"
      overview="PageHeader fornece título, subtítulo e ações de forma consistente no topo de cada página."
      usage={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PageHeader title="Transações" />
          <PageHeader
            title="Nova Categoria"
            subtitle="Crie uma nova categoria de gastos"
          />
          <PageHeader
            title="Detalhes"
            subtitle="Visualize informações completas"
            action={<button>← Voltar</button>}
          />
        </div>
      }
      installation={`import { PageHeader } from '@/components/UI';`}
      basicExample={`<PageHeader
  title="Minha Página"
  subtitle="Descrição da página"
  action={<Button>Ação</Button>}
/>`}
      propsCode={`interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}`}
      styleTokens={`/* Title */
font-size: 28px;
font-weight: 700;
color: var(--color-text-primary);

/* Subtitle */
font-size: 16px;
color: var(--color-text-secondary);
margin-top: var(--space-1);

margin-bottom: var(--space-6);`}
      whenToUse={[
        'No topo de todas as páginas internas',
        'Para mostrar título da página atual',
        'Com ações principais da página (criar, voltar)',
        'Para manter consistência de layout'
      ]}
      whenNotToUse={[
        'Dentro de modais (use título do modal)',
        'Em componentes reutilizáveis',
        'Para seções dentro da página',
        'Na página de login ou landing pages'
      ]}
    />
  );
}
