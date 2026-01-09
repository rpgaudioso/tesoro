import { useState } from 'react';
import { Button, Card, CodeBlock, Modal, PageHeader, toast } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function ModalDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showLargeModal, setShowLargeModal] = useState(false);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Modal"
        subtitle="Dialog modal centralizado com overlay e animação"
      />

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'usage' ? styles.active : ''}`}
          onClick={() => setActiveTab('usage')}
        >
          Usage
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'style' ? styles.active : ''}`}
          onClick={() => setActiveTab('style')}
        >
          Style
        </button>
      </div>

      {activeTab === 'usage' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.text}>
              Modals são overlays que focam a atenção do usuário em uma tarefa específica.
              Eles bloqueiam a interação com o resto da página até serem fechados.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Tamanhos</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Small (400px)</h3>
              <div className={styles.preview}>
                <Button variant="primary" onClick={() => setShowSmallModal(true)}>
                  Abrir Modal Pequeno
                </Button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Medium (600px) - padrão</h3>
              <div className={styles.preview}>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Abrir Modal Médio
                </Button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Large (800px)</h3>
              <div className={styles.preview}>
                <Button variant="primary" onClick={() => setShowLargeModal(true)}>
                  Abrir Modal Grande
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Comportamento</h2>
            <ul className={styles.list}>
              <li><strong>Fecha com ESC:</strong> Pressionar ESC fecha o modal</li>
              <li><strong>Fecha com overlay click:</strong> Clicar no fundo escuro fecha o modal</li>
              <li><strong>Botão X:</strong> Botão de fechar no canto superior direito</li>
              <li><strong>Previne scroll:</strong> Body scroll é bloqueado quando modal está aberto</li>
              <li><strong>Animação:</strong> Fade in/out suave</li>
            </ul>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para formulários que requerem foco total</li>
              <li>Para confirmar ações importantes (junto com ConfirmDialog)</li>
              <li>Para exibir conteúdo detalhado sem sair da página</li>
              <li>Para wizards ou processos multi-etapa</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para notificações simples (use Toast)</li>
              <li>Para dicas contextuais (use Tooltip)</li>
              <li>Para informações secundárias (considere expandir inline)</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Modal, Button } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`const [isOpen, setIsOpen] = useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>
    Abrir Modal
  </Button>

  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Título do Modal"
  >
    <p>Conteúdo do modal...</p>
    <Button onClick={() => setIsOpen(false)}>
      Fechar
    </Button>
  </Modal>
</>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Ações no Footer</h2>
            <CodeBlock
              code={`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar Ação"
  size="md"
>
  <p>Tem certeza que deseja prosseguir?</p>
  
  <div style={{ 
    display: 'flex', 
    gap: '12px', 
    justifyContent: 'flex-end',
    marginTop: '24px'
  }}>
    <Button 
      variant="secondary" 
      onClick={() => setIsOpen(false)}
    >
      Cancelar
    </Button>
    <Button 
      variant="primary" 
      onClick={handleConfirm}
    >
      Confirmar
    </Button>
  </div>
</Modal>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}`}
              language="tsx"
            />
          </Card>
        </div>
      )}

      {activeTab === 'style' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Design Tokens</h2>
            <CodeBlock
              code={`/* Overlay */
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(4px);

/* Modal */
background: var(--color-bg);
border-radius: var(--radius-12);
box-shadow: var(--shadow-xl);
max-height: 90vh;

/* Tamanhos */
--size-sm: 400px;
--size-md: 600px;
--size-lg: 800px;

/* Animação */
transition: opacity 0.3s ease, transform 0.3s ease;`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Acessibilidade</h2>
            <ul className={styles.list}>
              <li>Usa <code>role="dialog"</code> e <code>aria-modal="true"</code></li>
              <li>Foco é capturado dentro do modal</li>
              <li>ESC fecha o modal</li>
              <li>Título é linkado via <code>aria-labelledby</code></li>
              <li>Body scroll é prevenido quando aberto</li>
            </ul>
          </Card>
        </div>
      )}

      {/* Modals de exemplo */}
      <Modal
        isOpen={showSmallModal}
        onClose={() => setShowSmallModal(false)}
        title="Modal Pequeno"
        size="sm"
      >
        <p>Este é um modal pequeno (400px de largura).</p>
        <Button onClick={() => setShowSmallModal(false)} fullWidth>
          Fechar
        </Button>
      </Modal>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Modal Médio"
        size="md"
      >
        <p>Este é um modal médio (600px de largura) - tamanho padrão.</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)} fullWidth>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            toast.success('Ação confirmada!');
          }} fullWidth>
            Confirmar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showLargeModal}
        onClose={() => setShowLargeModal(false)}
        title="Modal Grande"
        size="lg"
      >
        <p>Este é um modal grande (800px de largura) para conteúdo extenso.</p>
        <p>Útil para formulários complexos ou visualização de detalhes.</p>
        <Button onClick={() => setShowLargeModal(false)} fullWidth>
          Fechar
        </Button>
      </Modal>
    </div>
  );
}
