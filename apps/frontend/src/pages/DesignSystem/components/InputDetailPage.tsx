import { useState } from 'react';
import { Card, CodeBlock, Input, PageHeader } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function InputDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.container}>
      <PageHeader
        title="Input"
        subtitle="Campo de entrada de texto com label e validação"
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
              Text inputs permitem que usuários insiram texto livre em um campo.
              Suportam diferentes tipos (text, email, password, number, tel) e estados (error, disabled).
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Estados</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Padrão</h3>
              <div className={styles.preview}>
                <Input
                  label="Nome completo"
                  placeholder="Digite seu nome..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Com Erro</h3>
              <div className={styles.preview}>
                <Input
                  label="Email"
                  placeholder="seu@email.com"
                  error="Este campo é obrigatório"
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Desabilitado</h3>
              <div className={styles.preview}>
                <Input
                  label="Campo desabilitado"
                  value="Valor não editável"
                  disabled
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Required</h3>
              <div className={styles.preview}>
                <Input
                  label="Campo obrigatório"
                  placeholder="Digite algo..."
                  required
                  fullWidth
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Tipos</h2>
            <div className={styles.example}>
              <div className={styles.preview}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  fullWidth
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Digite sua senha"
                  fullWidth
                />
                <Input
                  label="Número"
                  type="number"
                  placeholder="0"
                  fullWidth
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para coletar informações textuais do usuário</li>
              <li>Para formulários de cadastro e edição</li>
              <li>Para campos de busca simples</li>
              <li>Para valores alfanuméricos curtos</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para texto longo (use Textarea)</li>
              <li>Para seleção de opções pré-definidas (use Select)</li>
              <li>Para valores monetários com formatação (use CurrencyInput)</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Input } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`const [value, setValue] = useState('');

<Input
  label="Nome"
  placeholder="Digite seu nome..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  fullWidth
/>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Com Validação</h2>
            <CodeBlock
              code={`const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value: string) => {
  if (!value) {
    setError('Campo obrigatório');
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
    setError('Email inválido');
  } else {
    setError('');
  }
};

<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  error={error}
  required
  fullWidth
/>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
              code={`/* Input base */
height: 40px;
padding: var(--spacing-10) var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-6);
font-size: var(--font-base);
color: var(--color-text);

/* Focus */
border-color: var(--color-primary);
outline: 2px solid var(--color-primary-light);

/* Error */
border-color: var(--color-danger);

/* Disabled */
background: var(--color-bg-secondary);
cursor: not-allowed;
opacity: 0.6;`}
              language="css"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Acessibilidade</h2>
            <ul className={styles.list}>
              <li>Use <code>label</code> para identificar o campo</li>
              <li>Use <code>placeholder</code> como dica adicional, não substituto do label</li>
              <li>Marque <code>required</code> para campos obrigatórios</li>
              <li>Use <code>type</code> apropriado para ativar teclado correto em mobile</li>
              <li>Mensagens de erro devem ser claras e acionáveis</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
