import { Card, Loading } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function LoadingDetailPage() {
  return (
    <SimpleComponentPage
      title="Loading"
      subtitle="Indicador de carregamento para feedback visual"
      overview="Loading mostra que uma operação está em andamento, melhorando a percepção de responsividade do sistema."
      usage={
        <Card>
          <h2>Tamanhos</h2>
          <div style={{ display: 'flex', gap: '32px', marginTop: '16px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>Small</p>
              <Loading size="sm" />
            </div>
            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>Medium</p>
              <Loading size="md" />
            </div>
            <div>
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>Large</p>
              <Loading size="lg" />
            </div>
          </div>
          <div style={{ marginTop: '24px' }}>
            <h3>Com texto</h3>
            <Loading text="Carregando dados..." />
          </div>
        </Card>
      }
      installation={`import { Loading } from '@/components/UI';`}
      basicExample={`<Loading size="md" text="Carregando..." />`}
      propsCode={`interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}`}
      styleTokens={`/* Spinner */
border: 3px solid var(--color-bg-secondary);
border-top-color: var(--color-primary);
animation: spin 0.8s linear infinite;

/* Sizes */
sm: 24px; md: 40px; lg: 64px;`}
    />
  );
}
