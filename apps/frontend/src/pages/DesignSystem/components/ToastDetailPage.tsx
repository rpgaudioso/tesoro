import { Button, toast } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ToastDetailPage() {
  return (
    <SimpleComponentPage
      title="Toast"
      subtitle="Notificações temporárias não-obstrutivas"
      overview="Toasts são mensagens breves que aparecem temporariamente na tela para fornecer feedback sobre uma ação sem interromper o fluxo do usuário."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Clique nos botões para ver os toasts em ação:
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button 
                variant="primary"
                onClick={() => toast.success('Operação realizada com sucesso!')}
              >
                Success Toast
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => toast.info('Esta é uma informação importante')}
              >
                Info Toast
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => toast.warning('Atenção: verifique os dados')}
              >
                Warning Toast
              </Button>
              
              <Button 
                variant="danger"
                onClick={() => toast.error('Erro ao processar a solicitação')}
              >
                Error Toast
              </Button>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com ações</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Toasts podem conter ações como "Desfazer" ou links:
            </p>
            
            <Button 
              variant="primary"
              onClick={() => {
                toast.success('Item excluído', {
                  action: {
                    label: 'Desfazer',
                    onClick: () => toast.info('Ação desfeita!'),
                  },
                });
              }}
            >
              Toast com Ação
            </Button>
          </div>
        </>
      }
      installation="import { toast } from '@/components/UI';"
      basicExample={`// Uso simples
toast.success('Salvo com sucesso!');
toast.error('Erro ao salvar');
toast.info('Processando...');
toast.warning('Atenção!');

// Com ação
toast.success('Item excluído', {
  action: {
    label: 'Desfazer',
    onClick: () => {
      // desfazer ação
    },
  },
});`}
      propsCode={`// Funções disponíveis
toast.success(message: string, options?)
toast.error(message: string, options?)
toast.info(message: string, options?)
toast.warning(message: string, options?)

interface ToastOptions {
  duration?: number; // ms (padrão: 4000)
  action?: {
    label: string;
    onClick: () => void;
  };
}`}
      styleTokens={`padding: var(--spacing-12) var(--spacing-16);
border-radius: var(--radius-8);
font-size: var(--font-sm);
box-shadow: var(--shadow-lg);
animation: slideIn 0.3s ease;

/* Success */
background: var(--color-success);
color: white;

/* Error */
background: var(--color-danger);`}
      whenToUse={[
        'Para confirmar ações bem-sucedidas (salvamento, exclusão)',
        'Para notificar erros de forma não-intrusiva',
        'Para feedback temporário sobre processos',
        'Para mensagens que não requerem ação imediata',
      ]}
      whenNotToUse={[
        'Para informações críticas (use Modal ou Alert)',
        'Para mensagens que precisam permanecer visíveis (use Alert)',
        'Para múltiplas mensagens simultâneas complexas',
        'Para conteúdo que requer leitura cuidadosa',
      ]}
    />
  );
}
