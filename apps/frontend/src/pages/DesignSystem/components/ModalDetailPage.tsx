import { useState } from 'react';
import { Button, Modal } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ModalDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showLargeModal, setShowLargeModal] = useState(false);

  return (
    <SimpleComponentPage
      title="Modal"
      subtitle="Dialog modal centralizado com overlay e animação"
      overview="Modals são overlays que focam a atenção do usuário em uma tarefa específica. Eles bloqueiam a interação com o resto da página até serem fechados."
      usage={
        <>
          <div>
            <h3 className="section-title">Tamanhos</h3>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button onClick={() => setShowSmallModal(true)}>Small Modal</Button>
              <Button onClick={() => setShowModal(true)}>Medium Modal (default)</Button>
              <Button onClick={() => setShowLargeModal(true)}>Large Modal</Button>
            </div>

            <Modal
              isOpen={showSmallModal}
              onClose={() => setShowSmallModal(false)}
              title="Modal Pequeno"
              size="sm"
            >
              <p>Este é um modal pequeno para mensagens curtas.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <Button variant="ghost" onClick={() => setShowSmallModal(false)}>Cancelar</Button>
                <Button variant="primary" onClick={() => setShowSmallModal(false)}>Confirmar</Button>
              </div>
            </Modal>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Modal Médio"
            >
              <p>Este é um modal de tamanho médio, ideal para a maioria dos casos.</p>
              <p>Pode conter mais conteúdo e formulários.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
                <Button variant="primary" onClick={() => setShowModal(false)}>Confirmar</Button>
              </div>
            </Modal>

            <Modal
              isOpen={showLargeModal}
              onClose={() => setShowLargeModal(false)}
              title="Modal Grande"
              size="lg"
            >
              <p>Este é um modal grande para conteúdo extenso.</p>
              <p>Ideal para formulários complexos ou visualização de dados detalhados.</p>
              <div style={{ marginTop: '16px', padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-6)' }}>
                <p><strong>Exemplo de conteúdo adicional:</strong></p>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <Button variant="ghost" onClick={() => setShowLargeModal(false)}>Cancelar</Button>
                <Button variant="primary" onClick={() => setShowLargeModal(false)}>Confirmar</Button>
              </div>
            </Modal>
          </div>
        </>
      }
      installation="import { Modal } from '@/components/UI';"
      basicExample={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Título do Modal"
>
  <p>Conteúdo do modal</p>
  <Button onClick={() => setIsOpen(false)}>Fechar</Button>
</Modal>`}
      propsCode={`interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}`}
      styleTokens={`max-width: 500px; /* md */
padding: var(--spacing-24);
border-radius: var(--radius-12);
background: white;
box-shadow: var(--shadow-xl);

/* Overlay */
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(2px);`}
      whenToUse={[
        'Para formulários ou tarefas que requerem foco total',
        'Para confirmações importantes (com ConfirmDialog)',
        'Para exibir conteúdo detalhado sem navegar',
        'Para capturar entrada crítica do usuário',
      ]}
      whenNotToUse={[
        'Para notificações rápidas (use Toast)',
        'Para mensagens simples (use Alert)',
        'Para navegação principal',
        'Quando o usuário precisa ver contexto da página',
      ]}
    />
  );
}
