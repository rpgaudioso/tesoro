import { useState } from 'react';
import { Button, Card, ConfirmDialog } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ConfirmDialogDetailPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SimpleComponentPage
      title="ConfirmDialog"
      subtitle="Modal de confirmação para ações destrutivas"
      overview="ConfirmDialog é um modal especializado para confirmar ações importantes ou irreversíveis."
      usage={
        <Card>
          <h2>Exemplo Interativo</h2>
          <Button variant="danger" onClick={() => setIsOpen(true)}>
            Abrir Confirmação
          </Button>

          <ConfirmDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => {
              alert('Ação confirmada!');
              setIsOpen(false);
            }}
            title="Excluir transação?"
            message="Esta ação não pode ser desfeita. Tem certeza que deseja continuar?"
          />
        </Card>
      }
      installation={`import { ConfirmDialog } from '@/components/UI';`}
      basicExample={`const [isOpen, setIsOpen] = useState(false);

<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => handleDelete()}
  title="Excluir item?"
  message="Esta ação não pode ser desfeita."
/>`}
      propsCode={`interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
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
    />
  );
}
