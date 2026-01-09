import { Children, useState } from 'react';
import { Card, CodeBlock, Divider, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

interface SimpleComponentPageProps {
  title: string;
  subtitle: string;
  overview: string;
  usage: React.ReactNode;
  installation: string;
  basicExample?: string;
  propsCode?: string;
  styleTokens?: string;
  props?: Array<{
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }>;
  designTokens?: Array<{
    token: string;
    usage: string;
  }>;
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
  props,
  designTokens,
  whenToUse,
  whenNotToUse,
}: SimpleComponentPageProps) {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  // Converte usage para array e adiciona dividers
  const usageChildren = Children.toArray(usage);

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
          
          <Card>
            {usageChildren.map((child, index) => (
              <div key={index} style={{ marginTop: index === 0 ? 0 : 'var(--spacing-24)' }}>
                {index > 0 && <Divider spacing="none" />}
                <div style={{ marginTop: index === 0 ? 0 : 'var(--spacing-24)' }}>
                  {child}
                </div>
              </div>
            ))}
          </Card>

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
          
          {basicExample && (
            <Card>
              <h2 className={styles.sectionTitle}>Uso Básico</h2>
              <CodeBlock code={basicExample} language="tsx" />
            </Card>
          )}
          
          {props && props.length > 0 && (
            <Card>
              <h2 className={styles.sectionTitle}>Props</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Nome</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Tipo</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Padrão</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px' }}>{prop.name}</td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--color-primary)' }}>{prop.type}</td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--color-text-secondary)' }}>{prop.defaultValue || '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {propsCode && (
            <Card>
              <h2 className={styles.sectionTitle}>Props</h2>
              <CodeBlock code={propsCode} language="tsx" />
            </Card>
          )}
        </div>
      )}

      {activeTab === 'style' && (
        <div className={styles.content}>
          {designTokens && designTokens.length > 0 && (
            <Card>
              <h2 className={styles.sectionTitle}>Design Tokens</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Token</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600 }}>Uso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designTokens.map((token, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--color-primary)' }}>{token.token}</td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{token.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {styleTokens && (
            <Card>
              <h2 className={styles.sectionTitle}>Design Tokens</h2>
              <CodeBlock code={styleTokens} language="css" />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
