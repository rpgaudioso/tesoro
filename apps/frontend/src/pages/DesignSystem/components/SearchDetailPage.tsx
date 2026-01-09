import { useState } from 'react';
import { Search } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function SearchDetailPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SimpleComponentPage
      title="Search"
      subtitle="Campo de busca avançado"
      overview="Search é um campo de entrada especializado para busca, com ícone de lupa e botão para limpar o texto."
      usage={
        <div>
          <h3 className="section-title">Exemplo</h3>
          <div style={{ maxWidth: '400px' }}>
            <Search
              placeholder="Buscar transações..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue('')}
            />
          </div>
          {searchValue && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Buscando por: "{searchValue}"
            </p>
          )}
        </div>
      }
      installation={`import { Search } from '@/components/UI';`}
      basicExample={`const [value, setValue] = useState('');

<Search
  placeholder="Buscar..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
/>`}
      propsCode={`interface SearchProps extends InputHTMLAttributes {
  onClear?: () => void;
  showClearButton?: boolean;  // Padrão: true
}`}
      styleTokens={`height: 40px;
padding: var(--spacing-8) var(--spacing-40);
border: 1px solid var(--color-border);
border-radius: var(--radius-8);
font-size: var(--font-sm);
background: var(--color-bg);`}
      whenToUse={[
        'Para busca em listas e tabelas de dados',
        'Para filtrar transações, categorias ou contas',
        'Quando o usuário precisa encontrar itens específicos rapidamente',
        'Em barras de navegação para busca global'
      ]}
      whenNotToUse={[
        'Para filtros complexos com múltiplos critérios (use formulário de filtros)',
        'Em formulários onde um Select seria mais apropriado',
        'Para campos de entrada regulares que não envolvem busca'
      ]}
    />
  );
}
