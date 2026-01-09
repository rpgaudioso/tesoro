import { useState } from 'react';
import { Button, Card, InlineLoading } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function InlineLoadingDetailPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAction = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 2000);
  };

  return (
    <SimpleComponentPage
      title="InlineLoading"
      subtitle="Loading inline em ações"
      overview="InlineLoading exibe feedback de carregamento inline, ideal para botões de ação e operações assíncronas."
      usage={
        <Card>
          <h2>Exemplo Interativo</h2>
          <div style={{ marginTop: '16px' }}>
            <Button onClick={handleAction} disabled={loading}>
              {loading ? 'Processando...' : 'Executar Ação'}
            </Button>
            <div style={{ marginTop: '16px' }}>
              <InlineLoading
                loading={loading}
                description="Salvando transação..."
                success={success}
                successDescription="Transação salva com sucesso!"
              />
            </div>
          </div>

          <h3 style={{ marginTop: '32px', fontSize: '16px' }}>Estados</h3>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InlineLoading loading={true} description="Carregando dados..." />
            <InlineLoading success={true} successDescription="Operação concluída!" />
            <InlineLoading>Aguardando ação...</InlineLoading>
          </div>
        </Card>
      }
      installation={`import { InlineLoading } from '@/components/UI';`}
      basicExample={`const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

<InlineLoading
  loading={loading}
  description="Processando..."
  success={success}
  successDescription="Concluído!"
/>`}
      propsCode={`interface InlineLoadingProps {
  loading?: boolean;
  description?: string;
  success?: boolean;
  successDescription?: string;
  children?: ReactNode;
}`}
      styleTokens={`display: inline-flex;
align-items: center;
gap: var(--spacing-8);
font-size: var(--font-sm);
color: var(--color-text-secondary);

/* Success icon color */
color: var(--color-success);`}
      whenToUse={[
        'Para feedback de ações específicas (salvando, processando)',
        'Ao lado ou dentro de botões durante operações assíncronas',
        'Para indicar progresso de ações pontuais',
        'Quando o loading está relacionado a um elemento específico'
      ]}
      whenNotToUse={[
        'Para carregamento de página inteira (use Loading/Spinner)',
        'Para processos longos que precisam de barra de progresso (use ProgressBar)',
        'Quando múltiplos elementos estão carregando simultaneamente'
      ]}
    />
  );
}
