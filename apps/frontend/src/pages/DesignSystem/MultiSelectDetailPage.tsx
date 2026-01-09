import { useState } from 'react';
import { MultiSelect } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function MultiSelectDetailPage() {
  const [basicSelected, setBasicSelected] = useState<string[]>([]);
  const [preSelected, setPreSelected] = useState(['receita', 'despesa']);
  const [searchSelected, setSearchSelected] = useState<string[]>([]);
  const [limitSelected, setLimitSelected] = useState<string[]>([]);

  const options = [
    { value: 'receita', label: 'Receita' },
    { value: 'despesa', label: 'Despesa' },
    { value: 'investimento', label: 'Investimento' },
    { value: 'transferencia', label: 'Transferência' },
    { value: 'pagamento', label: 'Pagamento' },
  ];

  const categorias = [
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'moradia', label: 'Moradia' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'vestuario', label: 'Vestuário' },
    { value: 'utilidades', label: 'Utilidades' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'outros', label: 'Outros' },
  ];

  const whenToUse = [
    'Para selecionar múltiplos itens de uma lista',
    'Em filtros com múltiplas categorias',
    'Quando a lista de opções é extensa (>10 itens)',
    'Para tags ou categorias múltiplas',
  ];

  const whenNotToUse = [
    'Para lista pequena de opções (use Checkbox Group)',
    'Quando só pode selecionar um item (use Select)',
    'Para relações complexas entre itens',
  ];

  return (
    <SimpleComponentPage
      title="MultiSelect"
      subtitle="Seleção múltipla com tags"
      overview="MultiSelect permite escolher várias opções de uma lista, exibindo as seleções como tags removíveis."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Clique no campo para abrir o dropdown e selecionar opções.
            </p>
            <MultiSelect
              options={options}
              value={basicSelected}
              onChange={setBasicSelected}
              placeholder="Selecione tipos de transação..."
            />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Selecionados: {basicSelected.length > 0 ? basicSelected.join(', ') : 'nenhum'}
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Valores Pré-selecionados</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              As tags aparecem abaixo do campo e podem ser removidas individualmente.
            </p>
            <MultiSelect
              options={options}
              value={preSelected}
              onChange={setPreSelected}
              placeholder="Tipos..."
            />
          </div>

          <div>
            <h3 className="section-title">Com Busca</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Use o campo de busca dentro do dropdown para filtrar opções em listas longas.
            </p>
            <MultiSelect
              options={categorias}
              value={searchSelected}
              onChange={setSearchSelected}
              placeholder="Buscar categorias..."
            />
          </div>

          <div>
            <h3 className="section-title">Com Limite de Seleção</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Limite o número máximo de itens que podem ser selecionados.
            </p>
            <MultiSelect
              options={categorias}
              value={limitSelected}
              onChange={setLimitSelected}
              placeholder="Selecione até 3 categorias"
              maxDisplay={3}
            />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              {limitSelected.length}/3 selecionados
            </p>
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Desabilitado</label>
                <MultiSelect
                  options={options}
                  value={['receita', 'despesa']}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </div>
        </>
      }
      installation="import { MultiSelect } from '@/components/UI';"
      basicExample={`const [selected, setSelected] = useState<string[]>([]);
const options = [
  { value: 'opt1', label: 'Opção 1' },
  { value: 'opt2', label: 'Opção 2' },
];

<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Selecione..."
/>`}
      propsCode={`interface MultiSelectProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxDisplay?: number;
}`}
      styleTokens="--spacing-8, --spacing-12, --radius-6, --color-border, --color-primary"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
