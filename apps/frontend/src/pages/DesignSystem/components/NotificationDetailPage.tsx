import { useState } from 'react';
import { Button, Card, Notification } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function NotificationDetailPage() {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <SimpleComponentPage
      title="Notification"
      subtitle="Notificação persistente"
      overview="Notification exibe mensagens importantes e persistentes, diferente do Toast que é temporário. Ideal para avisos de sistema e alertas importantes."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Variantes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Notification
                  variant="info"
                  title="Novidades"
                  subtitle="Nova funcionalidade disponível"
                  onClose={() => {}}
                />
                <Notification
                  variant="success"
                  title="Sucesso"
                  subtitle="Operação concluída com sucesso"
                  onClose={() => {}}
                />
                <Notification
                  variant="warning"
                  title="Atenção"
                  subtitle="Seu plano expira em 7 dias"
                  onClose={() => {}}
                />
                <Notification
                  variant="error"
                  title="Erro"
                  subtitle="Não foi possível processar a solicitação"
                  onClose={() => {}}
                />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Com Conteúdo</h3>
              {showNotification && (
                <Notification
                  variant="info"
                  title="Atualização de Segurança"
                  subtitle="Recomendamos que você atualize sua senha"
                  onClose={() => setShowNotification(false)}
                  actions={
                    <>
                      <Button size="sm" variant="primary">
                        Atualizar Agora
                      </Button>
                      <Button size="sm" variant="ghost">
                        Mais Tarde
                      </Button>
                    </>
                  }
                >
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Por segurança, recomendamos que você atualize sua senha regularmente.
                    Sua última atualização foi há 6 meses.
                  </p>
                </Notification>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Inline (sem sombra)</h3>
              <Notification
                variant="warning"
                title="Workspace com limite de usuários"
                subtitle="Você atingiu o limite de 10 usuários"
                inline={true}
              />
            </div>
          </div>
        </Card>
      }
      installation={`import { Notification } from '@/components/UI';`}
      basicExample={`<Notification
  variant="info"
  title="Título"
  subtitle="Descrição breve"
  onClose={() => console.log('closed')}
  actions={
    <Button size="sm">Ação</Button>
  }
>
  Conteúdo adicional opcional
</Notification>`}
      propsCode={`interface NotificationProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  actions?: ReactNode;
  inline?: boolean;  // Remove sombra
}`}
      styleTokens={`padding: var(--spacing-16);
border-radius: var(--radius-8);
border-left: 4px solid;
background: var(--color-bg);
box-shadow: var(--shadow-md);

/* Info variant */
border-left-color: var(--color-primary);

/* Success variant */
border-left-color: var(--color-success);`}
      whenToUse={[
        'Para avisos importantes que precisam permanecer visíveis',
        'Para mensagens de sistema ou alertas de segurança',
        'Para notificações que requerem ação do usuário',
        'Para feedback que não deve desaparecer automaticamente'
      ]}
      whenNotToUse={[
        'Para feedback temporário de ações (use Toast)',
        'Para mensagens inline contextuais (use Alert)',
        'Para dicas e sugestões (use Tooltip ou Popover)'
      ]}
    />
  );
}
