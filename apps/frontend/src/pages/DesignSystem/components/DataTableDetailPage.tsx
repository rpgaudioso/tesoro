import { Badge, DataTable } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function DataTableDetailPage() {
  interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    status: 'pending' | 'completed';
  }

  const data: Transaction[] = [
    { id: 1, description: 'Supermercado', amount: -250.00, date: '2026-01-08', status: 'completed' },
    { id: 2, description: 'Salário', amount: 5000.00, date: '2026-01-05', status: 'completed' },
    { id: 3, description: 'Aluguel', amount: -1200.00, date: '2026-01-01', status: 'pending' },
    { id: 4, description: 'Freelance', amount: 800.00, date: '2026-01-07', status: 'completed' },
  ];

  const columns = [
    { key: 'description', header: 'Descrição', sortable: true },
    { 
      key: 'amount', 
      header: 'Valor', 
      sortable: true,
      render: (row: Transaction) => (
        <span style={{ color: row.amount > 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.amount)}
        </span>
      )
    },
    { key: 'date', header: 'Data', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (row: Transaction) => (
        <Badge variant={row.status === 'completed' ? 'success' : 'warning'}>
          {row.status === 'completed' ? 'Concluído' : 'Pendente'}
        </Badge>
      )
    }
  ];

  return (
    <SimpleComponentPage
      title="DataTable"
      subtitle="Tabela com ordenação e renderização customizada"
      overview="DataTable é crítico para nosso sistema financeiro, permitindo visualizar transações com ordenação e paginação."
      usage={
        <div>
          <h3 className="section-title">Exemplo com Transações</h3>
          <DataTable
            data={data}
            columns={columns}
            keyExtractor={(row) => row.id}
            onRowClick={(row) => console.log('Linha clicada:', row.description)}
          />
        </div>
      }
      installation={`import { DataTable } from '@/components/UI';`}
      basicExample={`const columns = [
  { key: 'name', header: 'Nome', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <Badge>{row.status}</Badge>
  }
];

<DataTable
  data={data}
  columns={columns}
  keyExtractor={(row) => row.id}
  onRowClick={(row) => handleClick(row)}
/>`}
      propsCode={`interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}`}
      styleTokens={`border: 1px solid var(--color-border);
border-radius: var(--radius-md);

/* Header */
background: var(--color-bg-secondary);
font-weight: 600;
padding: 12px 16px;

/* Row hover */
background: var(--color-bg-secondary);
cursor: pointer;`}
    />
  );
}
