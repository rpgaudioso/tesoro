import { useState } from 'react';
import { Card, CodeBlock, PageHeader, Select } from '../../../components/UI';
import styles from './ComponentDetailPage.module.css';

export default function SelectDetailPage() {
  const [activeTab, setActiveTab] = useState<'usage' | 'code' | 'style'>('usage');
  const [selectValue, setSelectValue] = useState('');

  const options = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
  ];

  return (
    <div className={styles.container}>
      <PageHeader
        title="Select"
        subtitle="Dropdown de seleção com opções customizadas"
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
              Select permite que usuários escolham uma opção de uma lista pré-definida.
              Ideal para quando há 5 ou mais opções.
            </p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Variações</h2>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Com Label</h3>
              <div className={styles.preview}>
                <Select
                  label="Categoria"
                  options={options}
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Com Placeholder</h3>
              <div className={styles.preview}>
                <Select
                  label="Selecione uma opção"
                  options={options}
                  placeholder="Escolha..."
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.example}>
              <h3 className={styles.exampleTitle}>Desabilitado</h3>
              <div className={styles.preview}>
                <Select
                  label="Campo desabilitado"
                  options={options}
                  value="option1"
                  disabled
                  fullWidth
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Quando usar</h2>
            <ul className={styles.list}>
              <li>Para escolher uma opção de uma lista de 5+ itens</li>
              <li>Para categorias, status, filtros</li>
              <li>Quando o espaço é limitado</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quando NÃO usar</h3>
            <ul className={styles.list}>
              <li>Para 2-4 opções (use Radio Button)</li>
              <li>Para seleção múltipla (use Checkbox ou Multiselect)</li>
              <li>Para texto livre (use Input)</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'code' && (
        <div className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Instalação</h2>
            <CodeBlock
              code={`import { Select } from '@/components/UI';`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Uso Básico</h2>
            <CodeBlock
              code={`const options = [
  { value: 'cat1', label: 'Categoria 1' },
  { value: 'cat2', label: 'Categoria 2' },
  { value: 'cat3', label: 'Categoria 3' }
];

const [selected, setSelected] = useState('');

<Select
  label="Categoria"
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  fullWidth
/>`}
              language="tsx"
            />
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>Props</h2>
            <CodeBlock
              code={`interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

type SelectOption = {
  value: string;
  label: string;
};`}
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
              code={`height: 40px;
padding: var(--spacing-10) var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-6);
font-size: var(--font-base);
background: var(--color-bg);

/* Disabled */
opacity: 0.6;
cursor: not-allowed;`}
              language="css"
            />
          </Card>
        </div>
      )}
    </div>
  );
}
