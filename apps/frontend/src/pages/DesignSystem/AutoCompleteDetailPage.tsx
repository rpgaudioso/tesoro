import { useState } from 'react';
import { AutoComplete } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function AutoCompleteDetailPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('Alimentação');

  const categorias = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Vestuário',
    'Investimentos',
    'Seguros',
    'Impostos',
  ];

  const contas = [
    'Banco do Brasil - CC',
    'Bradesco - Poupança',
    'Nubank - Conta Digital',
    'Inter - Conta Corrente',
    'C6 Bank - Conta Digital',
  ];

  const whenToUse = [
    'Para campos com muitas opções predefinidas',
    'Quando o usuário conhece parte do valor que procura',
    'Em buscas e filtros com sugestões',
    'Para melhorar a velocidade de preenchimento de formulários',
  ];

  const whenNotToUse = [
    'Para lista pequena de opções (use Select)',
    'Quando não há opções predefinidas',
    'Para entrada livre sem sugestões (use Input)',
  ];

  return (
    <SimpleComponentPage
      title="AutoComplete"
      subtitle="Input com sugestões automáticas"
      overview="AutoComplete sugere opções conforme o usuário digita, filtrando dinamicamente resultados."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <AutoComplete
              value={value1}
              onChange={setValue1}
              options={categorias}
              placeholder="Digite para buscar categorias..."
            />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Valor selecionado: {value1 || '(nenhum)'}
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Valor Inicial</h3>
            <AutoComplete
              value={value2}
              onChange={setValue2}
              options={categorias}
              label="Categoria"
            />
          </div>

          <div>
            <h3 className="section-title">Contas Bancárias</h3>
            <AutoComplete
              value=""
              onChange={() => {}}
              options={contas}
              label="Selecione a conta"
              placeholder="Digite o nome do banco..."
            />
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AutoComplete
                value=""
                onChange={() => {}}
                options={categorias}
                size="small"
                placeholder="Pequeno"
              />
              <AutoComplete
                value=""
                onChange={() => {}}
                options={categorias}
                size="medium"
                placeholder="Médio (padrão)"
              />
              <AutoComplete
                value=""
                onChange={() => {}}
                options={categorias}
                size="large"
                placeholder="Grande"
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Desabilitado</label>
                <AutoComplete
                  value="Alimentação"
                  onChange={() => {}}
                  options={categorias}
                  disabled
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Com erro</label>
                <AutoComplete
                  value=""
                  onChange={() => {}}
                  options={categorias}
                  error="Campo obrigatório"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Carregando</label>
                <AutoComplete
                  value=""
                  onChange={() => {}}
                  options={[]}
                  loading
                  placeholder="Carregando opções..."
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Hint</h3>
            <AutoComplete
              value=""
              onChange={() => {}}
              options={categorias}
              label="Categoria da Transação"
              placeholder="Digite para filtrar"
              hint="Comece a digitar para ver sugestões"
            />
          </div>

          <div>
            <h3 className="section-title">Permite Criação</h3>
            <AutoComplete
              value=""
              onChange={() => {}}
              options={categorias}
              label="Categoria"
              placeholder="Digite ou crie uma nova"
              allowCreate
              hint="Pressione Enter para criar nova categoria"
            />
          </div>

          <div>
            <h3 className="section-title">Mínimo de Caracteres</h3>
            <AutoComplete
              value=""
              onChange={() => {}}
              options={categorias}
              placeholder="Digite pelo menos 2 caracteres"
              minChars={2}
              hint="Sugestões aparecem após 2 caracteres"
            />
          </div>
        </>
      }
      installation="import { AutoComplete } from '@/components/UI';"
      basicExample={`const [value, setValue] = useState('');
const options = ['Opção 1', 'Opção 2', 'Opção 3'];

<AutoComplete
  value={value}
  onChange={setValue}
  options={options}
  placeholder="Digite para buscar..."
/>`}
      propsCode={`interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  allowCreate?: boolean;
  minChars?: number;
  maxSuggestions?: number;
}`}
      styleTokens="--spacing-12, --radius-6, --color-border-default, --shadow-md"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
