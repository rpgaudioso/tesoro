import { Alert } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function AlertDetailPage() {
  return (
    <SimpleComponentPage
      title="Alert"
      subtitle="Mensagens de feedback inline com ícones contextuais"
      overview="Alerts são mensagens inline que fornecem feedback contextual ao usuário. Cada variante possui um ícone específico e cor associada ao tipo de mensagem."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Success</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Para confirmar ações bem-sucedidas, como salvamento de dados.
                </p>
                <Alert variant="success">Operação realizada com sucesso!</Alert>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Info</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Para mensagens informativas neutras com fundo azul claro.
                </p>
                <Alert variant="info">Esta é uma mensagem informativa importante.</Alert>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Warning</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Para avisos que requerem atenção do usuário.
                </p>
                <Alert variant="warning">Atenção: verifique os dados antes de continuar.</Alert>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Danger</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Para erros ou situações críticas que impedem a conclusão de uma ação.
                </p>
                <Alert variant="danger">Erro ao processar a solicitação. Tente novamente.</Alert>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Conteúdo HTML</h3>
            <Alert variant="info">
              <strong>Importante:</strong> Esta mensagem contém formatação <em>HTML</em> para dar ênfase.
            </Alert>
          </div>
        </>
      }
      installation="import { Alert } from '@/components/UI';"
      basicExample={`<Alert variant="success">
  Operação realizada com sucesso!
</Alert>`}
      propsCode={`interface AlertProps {
  variant: 'success' | 'info' | 'warning' | 'danger';
  children: ReactNode;
}`}
      styleTokens={`padding: var(--spacing-12) var(--spacing-16);
border-radius: var(--radius-6);
border-left: 4px solid;
font-size: var(--font-sm);

/* Success */
background: var(--color-success-light);
border-color: var(--color-success);

/* Info */
background: var(--color-info-light);
border-color: var(--color-info);`}
      whenToUse={[
        'Para confirmar que uma ação foi concluída com sucesso',
        'Para informar o usuário sobre algo importante',
        'Para alertar sobre possíveis problemas ou riscos',
        'Para comunicar erros que impedem uma ação',
      ]}
      whenNotToUse={[
        'Para notificações temporárias (use Toast)',
        'Para mensagens que requerem ação do usuário (use Modal ou ConfirmDialog)',
      ]}
    />
  );
}
