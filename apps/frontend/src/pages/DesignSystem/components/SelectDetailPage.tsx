import { useState } from 'react';
import { Select } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function SelectDetailPage() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'opcao1', label: 'Opção 1' },
    { value: 'opcao2', label: 'Opção 2' },
    { value: 'opcao3', label: 'Opção 3' },
  ];

  const categoryOptions = [
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'saude', label: 'Saúde' },
  ];

  return (
    <SimpleComponentPage
      title="Select"
      subtitle="Campo de seleção com dropdown de opções"
      overview="Select permite que usuários escolham uma opção de uma lista. É ideal quando há 5 ou mais opções para selecionar."
      usage={
        <>
          <div>
            <h3 className="section-title">Estados</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <Select
                label="Selecione uma opção"
                options={options}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Escolha..."
              />
              
              <Select
                label="Categoria"
                options={categoryOptions}
                placeholder="Selecione uma categoria"
              />
              
              <Select
                label="Campo com erro"
                options={options}
                error="Seleção obrigatória"
                placeholder="Escolha uma opção"
              />
              
              <Select
                label="Campo desabilitado"
                options={options}
                disabled
                placeholder="Desabilitado"
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Com valor pré-selecionado</h3>
            
            <div style={{ maxWidth: '400px' }}>
              <Select
                label="Status"
                options={[
                  { value: 'ativo', label: 'Ativo' },
                  { value: 'inativo', label: 'Inativo' },
                  { value: 'pendente', label: 'Pendente' },
                ]}
                value="ativo"
                onChange={() => {}}
              />
            </div>
          </div>
        </>
      }
      installation="import { Select } from '@/components/UI';"
      basicExample={`const [value, setValue] = useState('');

const options = [
  { value: 'op1', label: 'Opção 1' },
  { value: 'op2', label: 'Opção 2' },
  { value: 'op3', label: 'Opção 3' },
];

<Select
  label="Selecione"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Escolha uma opção"
/>`}
      propsCode={`interface SelectProps {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}`}
      styleTokens={`padding: var(--spacing-8) var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-6);
font-size: var(--font-sm);
background: white;

/* Focus */
border-color: var(--color-primary);
outline: 2px solid var(--color-primary-light);`}
      whenToUse={[
        'Quando há 5 ou mais opções para escolher',
        'Para categorias, status ou tipos predefinidos',
        'Quando o espaço vertical é limitado',
        'Para seleções de uma única opção',
      ]}
      whenNotToUse={[
        'Para menos de 5 opções (use RadioButton)',
        'Para múltiplas seleções (use Checkbox)',
        'Para alternar entre estados (use Toggle)',
        'Para entrada de texto livre (use Input)',
      ]}
    />
  );
}
