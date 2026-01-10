import { Badge } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function BadgeDetailPage() {
  return (
    <SimpleComponentPage
      title="Badge"
      subtitle="Indicadores visuais para status, contadores e tags"
      overview="Badges são pequenos indicadores visuais usados para chamar atenção para status, contadores de notificações ou categorizar itens."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="success">Ativo</Badge>
              <Badge variant="info">Novo</Badge>
              <Badge variant="warning">Pendente</Badge>
              <Badge variant="danger">Cancelado</Badge>
              <Badge variant="neutral">Em análise</Badge>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge variant="primary" size="sm">Pequeno</Badge>
              <Badge variant="primary" size="md">Médio</Badge>
              <Badge variant="primary" size="lg">Grande</Badge>
            </div>
          </div>

          <div>
            <h3 className="section-title">Contadores</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Use badges para indicar quantidade de notificações ou itens:
            </p>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ fontSize: '14px' }}>Notificações</span>
                <Badge 
                  variant="danger" 
                  size="sm"
                  style={{ 
                    position: 'absolute', 
                    top: '-8px', 
                    right: '-16px',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  5
                </Badge>
              </div>
              
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ fontSize: '14px' }}>Mensagens</span>
                <Badge 
                  variant="primary" 
                  size="sm"
                  style={{ 
                    position: 'absolute', 
                    top: '-8px', 
                    right: '-16px',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  12
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Categorização</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Use badges para categorizar ou etiquetar conteúdo:
            </p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="neutral">JavaScript</Badge>
              <Badge variant="neutral">React</Badge>
              <Badge variant="neutral">TypeScript</Badge>
              <Badge variant="neutral">CSS</Badge>
              <Badge variant="neutral">Node.js</Badge>
            </div>
          </div>
        </>
      }
      installation="import { Badge } from '@/components/UI';"
      basicExample={`<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="danger">Cancelado</Badge>

// Como contador
<div style={{ position: 'relative' }}>
  <span>Notificações</span>
  <Badge variant="danger" size="sm">5</Badge>
</div>`}
      propsCode={`interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}`}
      styleTokens={`padding: 2px 8px;
border-radius: var(--radius-full);
font-size: 11px;
font-weight: var(--font-semibold);
display: inline-flex;
align-items: center;

/* Success */
background: var(--color-success-light);
color: var(--color-success-dark);

/* Danger */
background: var(--color-danger-light);
color: var(--color-danger-dark);`}
      whenToUse={[
        'Para indicar status (ativo, pendente, cancelado)',
        'Para contadores de notificações ou mensagens',
        'Para categorizar ou etiquetar conteúdo',
        'Para chamar atenção visual para informações importantes',
      ]}
      whenNotToUse={[
        'Para ações clicáveis (use Button ou Tag com dismiss)',
        'Para mensagens longas (use Alert)',
        'Para navegação principal',
        'Quando o status pode ser comunicado com cor de texto simples',
      ]}
    />
  );
}
