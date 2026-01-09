import { useState } from 'react';
import { Alert, Card, CodeBlock, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function AlertDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');

  return (
    <div className={styles.container}>
      <PageHeader
        title="Alert"
        subtitle="Mensagens de feedback inline com ícones contextuais"
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
              Alerts são mensagens inline que fornecem feedback contextual ao usuário.
              Cada variante possui um ícone específico e cor associada ao tipo de mensagem.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Variantes</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Success</h3>
              <p className={styles.exampleDescription}>
                Para confirmar ações bem-sucedidas, como salvamento de dados.
              </p>
              <div className={styles.preview}>
                <Alert variant="success">Operação realizada com sucesso!</Alert>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Info</h3>
              <p className={styles.exampleDescription}>
                Para mensagens informativas neutras com fundo azul claro.
              </p>
              <div className={styles.preview}>
                <Alert variant="info">Esta é uma mensagem informativa importante.</Alert>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Warning</h3>
              <p className={styles.exampleDescription}>
                Para avisos que requerem atenção do usuário.
              </p>
              <div className={styles.preview}>
                <Alert variant="warning">Atenção: verifique os dados antes de continuar.</Alert>
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Danger</h3>
              <p className={styles.exampleDescription}>
                Para erros ou situações críticas que impedem a conclusão de uma ação.
              </p>
              <div className={styles.preview}>
                <Alert variant="danger">Erro ao processar a solicitação. Tente novamente.</Alert>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Conteúdo HTML</h2>
            <div className={styles.example}>
              <div className={styles.preview}>
                <Alert variant="info">
                  <strong>Importante:</strong> Esta mensagem contém formatação <em>HTML</em> para dar ênfase.
                </Alert>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para confirmar que uma ação foi concluída com sucesso</li>
              <li>Para informar o usuário sobre algo importante</li>
              <li>Para alertar sobre possíveis problemas ou riscos</li>
              <li>Para comunicar erros que impedem uma ação</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para notificações temporárias (use Toast)</li>
              <li>Para mensagens que requerem ação do usuário (use Modal ou ConfirmDialog)</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Alert } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`<Alert variant="success">
  Operação realizada com sucesso!
</Alert>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Formatação HTML</h2>
            <CodeBlock
              code={`<Alert variant="info">
  <strong>Importante:</strong> Verifique os dados antes de continuar.
</Alert>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface AlertProps {
  variant: 'success' | 'info' | 'warning' | 'danger';
  children: ReactNode;
}`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Ícones Automáticos</h2>
            <CodeBlock
              code={`// Cada variante possui um ícone específico:
// success -> CheckCircle (verde)
// info -> Info (azul)
// warning -> AlertCircle (laranja)
// danger -> XCircle (vermelho)`}
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
              code={`/* Cores por variante */
.success {
  background: #d4edda;
  border-color: #4CAF50;
  color: #155724;
}

.info {
  background: #dbeafe;  /* Azul claro */
  border-color: #3b82f6;
  color: #1e40af;
}

.warning {
  background: #fff3cd;
  border-color: #FF9800;
  color: #856404;
}

.danger {
  background: #f8d7da;
  border-color: #F44336;
  color: #721c24;
}

/* Espaçamentos */
padding: var(--spacing-12) var(--spacing-16);
gap: var(--spacing-12);
border-radius: var(--radius-8);`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Especificações</h2>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <strong>Padding</strong>
                <p>12px vertical, 16px horizontal</p>
              </div>
              <div className={styles.spec}>
                <strong>Ícone</strong>
                <p>Tamanho: 20px | Gap: 12px do texto</p>
              </div>
              <div className={styles.spec}>
                <strong>Border</strong>
                <p>1px sólida | Radius: 8px</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Acessibilidade</h2>
            <ul className={styles.list}>
              <li>Usa cores e ícones para transmitir significado</li>
              <li>Contraste de cores adequado para legibilidade</li>
              <li>Ícones são decorativos (não precisam de alt text)</li>
              <li>Conteúdo é legível por screen readers</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
