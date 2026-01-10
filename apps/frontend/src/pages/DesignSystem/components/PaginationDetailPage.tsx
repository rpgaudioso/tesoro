import { useState } from 'react';
import { Pagination } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function PaginationDetailPage() {
  const [page, setPage] = useState(1);

  return (
    <SimpleComponentPage
      title="Pagination"
      subtitle="Navegação entre páginas de dados"
      overview="Pagination permite navegar por grandes conjuntos de dados divididos em páginas, essencial para listas de transações."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Interativo</h3>
            <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Página atual: <strong>{page}</strong>
            </p>
            <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
          </div>
          <div>
            <h3 className="section-title">Com muitas páginas</h3>
            <Pagination currentPage={15} totalPages={50} onPageChange={() => {}} />
          </div>
        </>
      }
      installation={`import { Pagination } from '@/components/UI';`}
      basicExample={`const [page, setPage] = useState(1);

<Pagination 
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
/>`}
      propsCode={`interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}`}
      styleTokens={`/* Button */
min-width: 36px;
height: 36px;
border: 1px solid var(--color-border);
border-radius: var(--radius-md);

/* Active */
background: var(--color-primary);
color: white;
border-color: var(--color-primary);`}
      whenToUse={[
        'Para listas longas de transações',
        'Em tabelas com muitas linhas (>50)',
        'Quando scroll infinito não for apropriado',
        'Para navegação explícita entre páginas'
      ]}
      whenNotToUse={[
        'Para feeds sociais (use scroll infinito)',
        'Com menos de 20 itens (mostre todos)',
        'Em dispositivos móveis com listas curtas',
        'Quando a ordem temporal é crítica'
      ]}
    />
  );
}
