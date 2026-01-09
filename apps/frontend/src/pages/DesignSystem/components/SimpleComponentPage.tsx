import { useState } from 'react';
import { Card, CodeBlock, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

interface SimpleComponentPageProps {
  title: string;
  subtitle: string;
  overview: string;
  usage: React.ReactNode;
  installation: string;
  basicExample: string;
  propsCode: string;
  styleTokens: string;
  whenToUse?: string[];
  whenNotToUse?: string[];
}

export default function SimpleComponentPage({
  title,
  subtitle,
  overview,
  usage,
  installation,
  basicExample,
  propsCode,
  styleTokens,
  whenToUse,
  whenNotToUse,
}: SimpleComponentPageProps) {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader title={title} subtitle={subtitle} />
      
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'usage' ? styles.active : ''}`} onClick={() => setActiveTab('usage')}>Usage</button>
        <button className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`} onClick={() => setActiveTab('code')}>Code</button>
        <button className={`${styles.tab} ${activeTab === 'style' ? styles.active : ''}`} onClick={() => setActiveTab('style')}>Style</button>
      </div>

      {activeTab === 'usage' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.text}>{overview}</p>
          </Card>
          {usage}
          {(whenToUse || whenNotToUse) && (
            <Card>
              {whenToUse && (
                <>
                  <h2 className={styles.sectionTitle}>Quando usar</h2>
                  <ul className={styles.list}>
                    {whenToUse.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {whenNotToUse && (
                <>
                  <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
                  <ul className={styles.list}>
                    {whenNotToUse.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          )}
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock code={installation} language="tsx" />
          </Card>
          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock code={basicExample} language="tsx" />
          </Card>
          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock code={propsCode} language="tsx" />
          </Card>
        </div>
      )}

      {activeTab === 'style' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Design Tokens</h2>
            <CodeBlock code={styleTokens} language="css" />
          </Card>
        </div>
      )}
    </div>
  );
}
