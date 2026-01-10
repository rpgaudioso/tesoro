import { ProgressBar } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ProgressBarDetailPage() {
  return (
    <SimpleComponentPage
      title="ProgressBar"
      subtitle="Barra de progresso para feedback visual de carregamento"
      overview="ProgressBar mostra o progresso de uma operação de forma visual e percentual."
      usage={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>25%</p>
            <ProgressBar value={25} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>50%</p>
            <ProgressBar value={50} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>75%</p>
            <ProgressBar value={75} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>100%</p>
            <ProgressBar value={100} />
          </div>
        </div>
      }
      installation={`import { ProgressBar } from '@/components/UI';`}
      basicExample={`<ProgressBar value={65} />`}
      propsCode={`interface ProgressBarProps {
  value: number; // 0-100
}`}
      styleTokens={`height: 8px;
background: var(--color-bg-secondary);
border-radius: var(--radius-full);

/* Bar */
background: var(--color-primary);
transition: width 0.3s ease;`}
      whenToUse={[
        'Para uploads e downloads de arquivos',
        'Quando o progresso é mensurável (0-100%)',
        'Para importação de dados em lote',
        'Ao processar múltiplos itens'
      ]}
      whenNotToUse={[
        'Para processos indeterminados (use Loading)',
        'Para steps discretos (use Stepper)',
        'Quando não souber o progresso total',
        'Para feedback instantâneo (use Toast)'
      ]}
    />
  );
}
