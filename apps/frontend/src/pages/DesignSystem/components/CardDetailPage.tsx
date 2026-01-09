import { useState } from 'react';
import { Card as CardComponent, CodeBlock, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function CardDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader title="Card" subtitle="Container com elevação e padding padronizado" />
      
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'usage' ? styles.active : ''}`} onClick={() => setActiveTab('usage')}>Usage</button>
        <button className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`} onClick={() => setActiveTab('code')}>Code</button>
        <button className={`${styles.tab} ${activeTab === 'style' ? styles.active : ''}`} onClick={() => setActiveTab('style')}>Style</button>
      </div>

      {activeTab === 'usage' && (
        <div className={styles.content}>
          <CardComponent>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.text}>Cards são containers com elevação, usados para agrupar conteúdo relacionado.</p>
          </CardComponent>

          <CardComponent>
            <h2 className={styles.sectionTitle}>Tamanhos de Padding</h2>
            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Small</h3>
              <div className={styles.preview}>
                <CardComponent padding="sm"><p>Padding pequeno (16px)</p></CardComponent>
              </div>
            </div>
            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Medium (padrão)</h3>
              <div className={styles.preview}>
                <CardComponent padding="md"><p>Padding médio (24px)</p></CardComponent>
              </div>
            </div>
            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Large</h3>
              <div className={styles.preview}>
                <CardComponent padding="lg"><p>Padding grande (32px)</p></CardComponent>
              </div>
            </div>
          </CardComponent>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <CardComponent>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock code={`import { Card } from '@/components/UI';`} language="tsx" />
          </CardComponent>
          <CardComponent>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock code={`<Card padding="md">
  <h3>Título</h3>
  <p>Conteúdo do card...</p>
</Card>`} language="tsx" />
          </CardComponent>
          <CardComponent>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock code={`interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}`} language="tsx" />
          </CardComponent>
        </div>
      )}

      {activeTab === 'style' && (
        <div className={styles.content}>
          <CardComponent>
            <h2 className={styles.sectionTitle}>Design Tokens</h2>
            <CodeBlock code={`background: var(--color-bg);
border-radius: var(--radius-12);
box-shadow: var(--shadow-sm);
border: 1px solid var(--color-border);

/* Padding variants */
padding-sm: var(--spacing-16);
padding-md: var(--spacing-24);
padding-lg: var(--spacing-32);`} language="css" />
          </CardComponent>
        </div>
      )}
    </div>
  );
}
