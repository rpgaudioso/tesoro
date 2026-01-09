import { Inbox } from 'lucide-react';
import { Card, EmptyState } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function EmptyStateDetailPage() {
  return (
    <SimpleComponentPage
      title="EmptyState"
      subtitle="Indica quando não há dados ou conteúdo para exibir"
      overview="EmptyState fornece feedback visual quando listas ou tabelas estão vazias, ajudando usuários a entender o que fazer."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
            <EmptyState
              icon={<Inbox size={48} />}
              message="Nenhuma transação encontrada"
            />
            <EmptyState
              icon={<Inbox size={48} />}
              message="Sua lista está vazia"
              description="Comece criando sua primeira categoria"
            />
          </div>
        </Card>
      }
      installation={`import { EmptyState } from '@/components/UI';
import { Inbox } from 'lucide-react';`}
      basicExample={`<EmptyState
  icon={<Inbox size={48} />}
  message="Nenhum dado encontrado"
  description="Tente ajustar os filtros"
/>`}
      propsCode={`interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  description?: string;
}`}
      styleTokens={`display: flex;
flex-direction: column;
align-items: center;
padding: var(--space-8);
color: var(--color-text-secondary);
text-align: center;

/* Icon */
opacity: 0.5;
margin-bottom: var(--space-3);`}
    />
  );
}
