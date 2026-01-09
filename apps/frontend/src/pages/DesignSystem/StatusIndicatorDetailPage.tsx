import { StatusIndicator } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function StatusIndicatorDetailPage() {
  const whenToUse = [
    'Para mostrar status de forma visual e compacta',
    'Em listas e tabelas com estados',
    'Para indicadores de conexão ou disponibilidade',
    'Quando precisar de um indicador sutil de estado',
  ];

  const whenNotToUse = [
    'Para mensagens detalhadas (use Notification)',
    'Quando o status precisa de explicação textual longa',
    'Para ações que requerem interação',
  ];

  return (
    <SimpleComponentPage
      title="StatusIndicator"
      subtitle="Indicador visual de status"
      overview="StatusIndicator mostra estado com pontos coloridos de forma compacta e visual."
      usage={
        <>
          <div>
            <h3 className="section-title">Status Diferentes</h3>
            <div style={{ padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="success" />
                <span>Online / Ativo / Sucesso</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="warning" />
                <span>Atenção / Pendente / Aviso</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="danger" />
                <span>Offline / Erro / Crítico</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="info" />
                <span>Informação / Processando</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="neutral" />
                <span>Inativo / Neutro / Padrão</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusIndicator status="success" size="small" />
                <span style={{ fontSize: '12px' }}>Pequeno</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusIndicator status="success" size="medium" />
                <span style={{ fontSize: '14px' }}>Médio</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusIndicator status="success" size="large" />
                <span style={{ fontSize: '16px' }}>Grande</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Pulsação</h3>
            <div style={{ padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-8)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="success" pulse />
                <span>Conexão ativa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="warning" pulse />
                <span>Aguardando resposta</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusIndicator status="danger" pulse />
                <span>Tentando reconectar</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Em Lista</h3>
            <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-8)' }}>
              {[
                { name: 'Servidor Principal', status: 'success' as const },
                { name: 'Servidor Backup', status: 'success' as const },
                { name: 'Banco de Dados', status: 'warning' as const },
                { name: 'API Externa', status: 'danger' as const },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderBottom: idx < 3 ? '1px solid var(--color-border-default)' : 'none',
                  }}
                >
                  <StatusIndicator status={item.status} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      }
      installation="import { StatusIndicator } from '@/components/UI';"
      basicExample={`<StatusIndicator status="success" />
<StatusIndicator status="warning" pulse />`}
      propsCode={`interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  pulse?: boolean;
  label?: string;
}`}
      styleTokens="--spacing-8, --radius-full, --color-success, --color-warning, --color-danger"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
