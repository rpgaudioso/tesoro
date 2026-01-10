import { useState } from 'react';
import { Button, ConfirmDialog, toast } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ConfirmDialogDetailPage() {
  const [isDangerOpen, setIsDangerOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const whenToUse = [
    'Para ações destrutivas ou irreversíveis (excluir, remover)',
    'Quando a ação tem consequências importantes',
    'Para confirmar operações críticas que afetam dados',
    'Antes de processar ações que não podem ser desfeitas',
  ];

  const whenNotToUse = [
    'Para ações reversíveis (use Toast com undo)',
    'Para informações simples (use Alert ou Notification)',
    'Quando a confirmação é óbvia e esperada',
  ];

  return (
    <SimpleComponentPage
      title="ConfirmDialog"
      subtitle="Modal de confirmação para ações destrutivas"
      overview="ConfirmDialog é um modal especializado para confirmar ações importantes ou irreversíveis."
      usage={
        <>
          <div>
            <h3 className="section-title">Variante Danger (Destrutivo)</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Use para ações destrutivas como excluir, remover ou cancelar permanentemente.
            </p>
            <Button variant="danger" onClick={() => setIsDangerOpen(true)}>
              Excluir Transação
            </Button>

            <ConfirmDialog
              isOpen={isDangerOpen}
              onCancel={() => setIsDangerOpen(false)}
              onConfirm={() => {
                toast.success('Transação excluída com sucesso!');
                setIsDangerOpen(false);
              }}
              title="Excluir transação?"
              message="Esta ação não pode ser desfeita. Tem certeza que deseja continuar?"
              variant="danger"
            />
          </div>

          <div>
            <h3 className="section-title">Variante Warning (Atenção)</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Use para ações que requerem atenção mas não são irreversíveis.
            </p>
            <Button variant="secondary" onClick={() => setIsWarningOpen(true)}>
              Descartar Alterações
            </Button>

            <ConfirmDialog
              isOpen={isWarningOpen}
              onCancel={() => setIsWarningOpen(false)}
              onConfirm={() => {
                toast.info('Alterações descartadas');
                setIsWarningOpen(false);
              }}
              title="Descartar alterações?"
              message="Você tem alterações não salvas. Deseja realmente descartar?"
              variant="warning"
              confirmLabel="Descartar"
            />
          </div>

          <div>
            <h3 className="section-title">Variante Info (Informação)</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Use para confirmações informativas sem consequências graves.
            </p>
            <Button variant="primary" onClick={() => setIsInfoOpen(true)}>
              Exportar Relatório
            </Button>

            <ConfirmDialog
              isOpen={isInfoOpen}
              onCancel={() => setIsInfoOpen(false)}
              onConfirm={() => {
                toast.success('Relatório exportado!');
                setIsInfoOpen(false);
              }}
              title="Exportar relatório?"
              message="O relatório será gerado com os dados do período selecionado."
              variant="info"
              confirmLabel="Exportar"
            />
          </div>
        </>
      }
      installation={`import { ConfirmDialog, toast } from '@/components/UI';`}
      basicExample={`const [isOpen, setIsOpen] = useState(false);

<ConfirmDialog
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  onConfirm={() => {
    toast.success('Item excluído!');
    setIsOpen(false);
  }}
  title="Excluir item?"
  message="Esta ação não pode ser desfeita."
  variant="danger"
  confirmLabel="Excluir"
  cancelLabel="Cancelar"
/>`}
      propsCode={`interface ConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}`}
      styleTokens={`/* Modal */
max-width: 400px;

/* Title */
color: var(--color-danger);
font-weight: 600;

/* Message */
color: var(--color-text-secondary);
margin: var(--space-3) 0;

/* Buttons */
justify-content: flex-end;
gap: var(--space-2);`}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
