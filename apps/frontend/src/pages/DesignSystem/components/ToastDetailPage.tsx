import { useState } from 'react';
import { Card, CodeBlock, PageHeader, toast } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function ToastDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader
        title="Toast"
        subtitle="Notificações toast temporárias para feedback ao usuário"
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
              Toasts são notificações não-bloqueantes que aparecem temporariamente
              (5 segundos) para fornecer feedback sobre ações do usuário. Cada toast
              possui um título obrigatório e uma mensagem opcional para contexto adicional.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Variantes</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Success</h3>
              <p className={styles.exampleDescription}>
                Para confirmar que uma ação foi concluída com sucesso.
              </p>
              <div className={styles.preview}>
                <button
                  className={styles.demoButton}
                  onClick={() => toast.success('Sucesso', 'Operação concluída com sucesso!')}
                >
                  Mostrar Toast Success
                </button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Error</h3>
              <p className={styles.exampleDescription}>
                Para comunicar que algo deu errado.
              </p>
              <div className={styles.preview}>
                <button
                  className={styles.demoButton}
                  onClick={() => toast.error('Erro', 'Não foi possível processar a solicitação')}
                >
                  Mostrar Toast Error
                </button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Warning</h3>
              <p className={styles.exampleDescription}>
                Para alertar sobre algo que requer atenção.
              </p>
              <div className={styles.preview}>
                <button
                  className={styles.demoButton}
                  onClick={() => toast.warning('Atenção', 'Verifique os dados antes de continuar')}
                >
                  Mostrar Toast Warning
                </button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Info</h3>
              <p className={styles.exampleDescription}>
                Para informações gerais.
              </p>
              <div className={styles.preview}>
                <button
                  className={styles.demoButton}
                  onClick={() => toast.info('Novidades', 'Nova funcionalidade disponível')}
                >
                  Mostrar Toast Info
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para feedback imediato após ações do usuário</li>
              <li>Para notificações temporárias que não bloqueiam o fluxo</li>
              <li>Para confirmações de ações como salvar, deletar, copiar</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para informações críticas que precisam de ação (use Modal)</li>
              <li>Para feedback contextual inline (use Alert)</li>
              <li>Para informações persistentes (use Alert ou Notification)</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { toast } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`// Com título e mensagem
toast.success('Sucesso', 'Operação realizada com sucesso!');
toast.error('Erro', 'Não foi possível processar a solicitação');
toast.warning('Atenção', 'Verifique os dados antes de continuar');
toast.info('Novidades', 'Nova funcionalidade disponível');

// Apenas com título
toast.success('Salvo!');
toast.error('Erro ao salvar');
toast.info('Processando...');`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Em Funções</h2>
            <CodeBlock
              code={`const handleSave = async () => {
  try {
    await api.post('/data', formData);
    toast.success('Sucesso', 'Dados salvos com sucesso!');
  } catch (error) {
    toast.error('Erro', 'Não foi possível salvar os dados');
  }
};

// Ou apenas com título
const handleDelete = async () => {
  try {
    await api.delete('/data/' + id);
    toast.success('Removido!');
  } catch (error) {
    toast.error('Erro ao remover');
  }
};`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Provider Setup</h2>
            <p className={styles.text}>
              O ToastProvider deve estar no topo da aplicação:
            </p>
            <CodeBlock
              code={`import { ToastProvider } from '@/components/UI';

function App() {
  return (
    <ToastProvider>
      {/* Seu app aqui */}
    </ToastProvider>
  );
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
              code={`/* Container */
position: fixed;
top: var(--spacing-16);
right: var(--spacing-16);
z-index: 9999;

/* Toast */
min-width: 300px;
max-width: 500px;
padding: var(--spacing-16);
border-radius: var(--radius-8);
box-shadow: var(--shadow-md);
border-left: 4px solid;

/* Layout */
display: flex;
gap: var(--spacing-12);

/* Título */
font-size: var(--font-sm);
font-weight: var(--font-semibold);

/* Mensagem */
font-size: var(--font-sm);
color: var(--color-text-secondary);
margin-top: var(--spacing-4);

/* Animação */
animation: slideIn 0.3s ease-out;

/* Duração */
auto-dismiss: 5000ms (5 segundos);`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Cores por Variante</h2>
            <CodeBlock
              code={`/* Success */
border-left-color: var(--color-success);
icon color: var(--color-success);

/* Error */
border-left-color: var(--color-danger);
icon color: var(--color-danger);

/* Warning */
border-left-color: var(--color-warning);
icon color: var(--color-warning);

/* Info */
border-left-color: var(--color-primary);
icon color: var(--color-primary);`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Acessibilidade</h2>
            <ul className={styles.list}>
              <li>Usa <code>role="alert"</code> para notificar screen readers</li>
              <li>Tempo de 5 segundos permite leitura adequada do título e mensagem</li>
              <li>Não bloqueia interação com a página</li>
              <li>Posicionado no topo direito para não interferir no conteúdo</li>
              <li>Ícones visuais complementam o texto para melhor compreensão</li>
              <li>Botão de fechar com aria-label descritivo</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
