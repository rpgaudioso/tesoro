import { Loading } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function LoadingDetailPage() {
  return (
    <SimpleComponentPage
      title="Loading"
      subtitle="Indicador de carregamento para feedback visual"
      overview="Loading mostra que uma operação está em andamento, melhorando a percepção de responsividade do sistema."
      usage={
        <>
          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Small</p>
                <Loading size="sm" />
              </div>
              <div>
                <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Medium</p>
                <Loading size="md" />
              </div>
              <div>
                <p style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Large</p>
                <Loading size="lg" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="section-title">Com texto</h3>
            <Loading text="Carregando dados..." />
          </div>
        </>
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
      whenToUse={[
        'Durante carregamento de dados assíncronos',
        'Em páginas que demoram para carregar',
        'Para feedback de processamento',
        'Dentro de botões durante ações longas'
      ]}
      whenNotToUse={[
        'Para progresso mensurável (use ProgressBar)',
        'Para estados vazios (use EmptyState)',
        'Em carregamentos instantâneos (< 300ms)',
        'Para processos multi-etapa (use Stepper)'
      ]}
    />
  );
}
