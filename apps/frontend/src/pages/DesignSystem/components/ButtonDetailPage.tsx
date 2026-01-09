import { CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, CodeBlock, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function ButtonDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader
        title="Button"
        subtitle="Botão padrão com múltiplas variantes e tamanhos"
      />

      {/* Tabs */}
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

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.text}>
              Botões são usados para iniciar ações, seja enviando um formulário, 
              abrindo um modal, navegando para outra página ou confirmando uma decisão.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Variantes</h2>
            <p className={styles.text}>
              Diferentes variantes comunicam diferentes níveis de ênfase e propósito.
            </p>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Primary</h3>
              <p className={styles.exampleDescription}>
                Ação principal de alta ênfase. Use apenas um por página/seção.
              </p>
              <div className={styles.preview}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="primary" disabled>Primary Disabled</Button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Secondary</h3>
              <p className={styles.exampleDescription}>
                Ação secundária de média ênfase. Use para ações complementares.
              </p>
              <div className={styles.preview}>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Danger</h3>
              <p className={styles.exampleDescription}>
                Para ações destrutivas como excluir ou remover.
              </p>
              <div className={styles.preview}>
                <Button variant="danger">Delete</Button>
                <Button variant="danger" disabled>Delete Disabled</Button>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Ghost</h3>
              <p className={styles.exampleDescription}>
                Ação de baixa ênfase, geralmente para ações terciárias.
              </p>
              <div className={styles.preview}>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="ghost" disabled>Ghost Disabled</Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Tamanhos</h2>
            <div className={styles.example}>
              <div className={styles.preview}>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium (default)</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Ícones</h2>
            <div className={styles.example}>
              <div className={styles.preview}>
                <Button variant="primary">
                  <CheckCircle size={18} />
                  Salvar
                </Button>
                <Button variant="secondary">
                  <Edit2 size={18} />
                  Editar
                </Button>
                <Button variant="danger">
                  <Trash2 size={18} />
                  Excluir
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para submeter formulários</li>
              <li>Para confirmar ou cancelar ações</li>
              <li>Para navegação entre páginas ou seções</li>
              <li>Para iniciar processos ou ações do usuário</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para navegação simples (use Link)</li>
              <li>Para ações sutis em toolbars (use IconButton)</li>
            </ul>
          </Card>
        </div>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Button } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`<Button variant="primary" onClick={handleClick}>
  Click me
</Button>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Ícone</h2>
            <CodeBlock
              code={`import { Save } from 'lucide-react';

<Button variant="primary">
  <Save size={18} />
  Salvar
</Button>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
}`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Exemplo Completo</h2>
            <CodeBlock
              code={`import { Button } from '@/components/UI';
import { Save, X } from 'lucide-react';

function MyForm() {
  const handleSubmit = () => {
    // Submit logic
  };

  const handleCancel = () => {
    // Cancel logic
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button 
        variant="primary" 
        type="submit"
        onClick={handleSubmit}
      >
        <Save size={18} />
        Salvar
      </Button>
      <Button 
        variant="secondary"
        onClick={handleCancel}
      >
        <X size={18} />
        Cancelar
      </Button>
    </div>
  );
}`}
              language="tsx"
            />
          </Card>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Design Tokens</h2>
            <p className={styles.text}>
              O componente Button utiliza os seguintes tokens CSS:
            </p>
            <CodeBlock
              code={`/* Cores */
--color-primary: #FF5722
--color-primary-hover: #E64A19
--color-danger: #F44336
--color-bg: #FFFFFF
--color-border: #E5E7EB

/* Espaçamentos */
--spacing-8: 8px
--spacing-12: 12px
--spacing-16: 16px
--spacing-20: 20px

/* Tipografia */
--font-sm: 14px
--font-base: 16px
--font-medium: 500
--font-semibold: 600

/* Border Radius */
--radius-8: 8px`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Especificações</h2>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <strong>Small (sm)</strong>
                <p>Height: 32px | Padding: 8px 12px | Font: 14px</p>
              </div>
              <div className={styles.spec}>
                <strong>Medium (md)</strong>
                <p>Height: 40px | Padding: 12px 20px | Font: 16px</p>
              </div>
              <div className={styles.spec}>
                <strong>Large (lg)</strong>
                <p>Height: 48px | Padding: 16px 24px | Font: 16px</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Acessibilidade</h2>
            <ul className={styles.list}>
              <li>Sempre forneça um label descritivo</li>
              <li>Use <code>type="button"</code> para botões que não submetem forms</li>
              <li>Use <code>type="submit"</code> para submeter formulários</li>
              <li>Estados disabled devem ser claramente visíveis</li>
              <li>Foco do teclado deve ser claramente indicado</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
