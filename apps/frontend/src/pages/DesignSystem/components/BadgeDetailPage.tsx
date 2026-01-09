import { useState } from 'react';
import { Badge, Card, CodeBlock, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function BadgeDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader
        title="Badge"
        subtitle="Indicador visual compacto para status, contadores e labels"
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
              Badges são pequenos elementos visuais usados para rotular, categorizar ou
              exibir contadores de forma compacta.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Variantes</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Default</h3>
              <div className={styles.preview}>
                <Badge variant="default">Default</Badge>
                <Badge variant="default">Status</Badge>
                <Badge variant="default">5</Badge>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Primary</h3>
              <div className={styles.preview}>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="primary">Ativo</Badge>
                <Badge variant="primary">12</Badge>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Success</h3>
              <div className={styles.preview}>
                <Badge variant="success">Success</Badge>
                <Badge variant="success">Pago</Badge>
                <Badge variant="success">✓</Badge>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Warning</h3>
              <div className={styles.preview}>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="warning">Pendente</Badge>
                <Badge variant="warning">3</Badge>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Danger</h3>
              <div className={styles.preview}>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="danger">Atrasado</Badge>
                <Badge variant="danger">!</Badge>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para indicar status (pago, pendente, cancelado)</li>
              <li>Para mostrar contadores (mensagens não lidas, itens)</li>
              <li>Para categorizar visualmente itens</li>
              <li>Para tags e labels</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Badge } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`<Badge variant="primary">Badge Text</Badge>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Status</h2>
            <CodeBlock
              code={`<Badge variant="success">Pago</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="danger">Atrasado</Badge>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Como Contador</h2>
            <CodeBlock
              code={`<div style={{ position: 'relative', display: 'inline-block' }}>
  <Button variant="ghost">
    Notificações
  </Button>
  <Badge 
    variant="danger" 
    style={{ 
      position: 'absolute', 
      top: -8, 
      right: -8 
    }}
  >
    3
  </Badge>
</div>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  children: ReactNode;
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
              code={`padding: var(--spacing-4) var(--spacing-8);
border-radius: var(--radius-full);
font-size: var(--font-xs);
font-weight: var(--font-semibold);
text-transform: uppercase;
letter-spacing: 0.5px;

/* Variantes */
.default { background: #E5E7EB; color: #6B7280; }
.primary { background: var(--color-primary); color: white; }
.success { background: var(--color-success); color: white; }
.warning { background: var(--color-warning); color: white; }
.danger { background: var(--color-danger); color: white; }`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Especificações</h2>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <strong>Padding</strong>
                <p>4px vertical, 8px horizontal</p>
              </div>
              <div className={styles.spec}>
                <strong>Font</strong>
                <p>12px | Semibold | Uppercase</p>
              </div>
              <div className={styles.spec}>
                <strong>Border Radius</strong>
                <p>9999px (fully rounded)</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
