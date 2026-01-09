import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Banner, toast } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function BannerDetailPage() {
  const whenToUse = [
    'Para mensagens importantes que afetam toda a aplicação',
    'Para anúncios e notificações persistentes',
    'Quando precisar de uma mensagem com call-to-action',
    'Para alertas que não devem ser ignorados facilmente',
  ];

  const whenNotToUse = [
    'Para confirmações de ações (use Toast)',
    'Para mensagens contextuais (use Notification)',
    'Para erros em formulários (use validação inline)',
  ];

  return (
    <SimpleComponentPage
      title="Banner"
      subtitle="Mensagem persistente de alto impacto"
      overview="Banner exibe mensagens importantes que requerem atenção, posicionado no topo ou base da página."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Banner
                variant="info"
                icon={Info}
                message="Nova versão disponível! Atualize para acessar novos recursos."
              />
              <Banner
                variant="success"
                icon={CheckCircle}
                message="Seu pagamento foi processado com sucesso."
              />
              <Banner
                variant="warning"
                icon={AlertCircle}
                message="Manutenção programada para amanhã às 02:00."
              />
              <Banner
                variant="danger"
                icon={XCircle}
                message="Serviço temporariamente indisponível. Tentando reconectar..."
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Ação</h3>
            <Banner
              variant="info"
              icon={Info}
              message="Seus dados estão sendo sincronizados com a nuvem."
              action={{ label: 'Ver Detalhes', onClick: () => toast.info('Ver detalhes!') }}
            />
          </div>

          <div>
            <h3 className="section-title">Dismissível</h3>
            <Banner
              variant="warning"
              icon={AlertCircle}
              message="Você tem 3 faturas pendentes. Evite bloqueios pagando até o vencimento."
              dismissible
              onDismiss={() => console.log('Banner dismissed')}
            />
          </div>

          <div>
            <h3 className="section-title">Com Ação e Dismiss</h3>
            <Banner
              variant="success"
              icon={CheckCircle}
              message="Backup concluído! Seus dados estão seguros."
              action={{ label: 'Restaurar', onClick: () => {} }}
              dismissible
              onDismiss={() => {}}
            />
          </div>

          <div>
            <h3 className="section-title">Sem Ícone</h3>
            <Banner
              variant="info"
              message="Mensagem simples sem ícone."
            />
          </div>
        </>
      }
      installation="import { Banner } from '@/components/UI';"
      basicExample={`<Banner
  variant="info"
  icon={Info}
  message="Mensagem importante para o usuário"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>`}
      propsCode={`interface BannerProps {
  variant: 'info' | 'success' | 'warning' | 'danger';
  message: string;
  icon?: React.ComponentType;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}`}
      styleTokens="--spacing-12, --radius-6, --color-info, --color-success, --color-warning, --color-danger"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
