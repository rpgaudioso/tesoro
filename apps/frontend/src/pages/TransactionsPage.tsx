import PageHeader from '@/components/Layout/PageHeader';
import CreateTransactionModal from '@/components/Transactions/CreateTransactionModal';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkspaceChange } from '@/hooks/useWorkspaceChange';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Account, Category, Person, Transaction } from '@tesoro/shared';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Calendar,
    Check,
    DollarSign,
    Download,
    FileDown,
    Filter,
    Plus,
    Search,
    Upload,
    X,
} from 'lucide-react';
import { useState } from 'react';
import styles from './TransactionsPage.module.css';

export default function TransactionsPage() {
  const { currentWorkspace } = useAuth();
  useWorkspaceChange();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showPaymentDate, setShowPaymentDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAccountId, setFilterAccountId] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Build query params
  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    if (selectedMonth) params.append('month', `${selectedYear}-${selectedMonth.padStart(2, '0')}`);
    if (filterType) params.append('type', filterType);
    if (filterAccountId) params.append('accountId', filterAccountId);
    if (filterCategoryId) params.append('categoryId', filterCategoryId);
    return `/transactions?${params.toString()}`;
  };

  const { data: transactions = [], isLoading } = useQuery<Transaction[]>({
    queryKey: [
      'transactions',
      selectedYear,
      selectedMonth,
      filterType,
      filterAccountId,
      filterCategoryId,
      currentWorkspace?.id,
    ],
    queryFn: async () => {
      const { data } = await api.get(buildQueryUrl());
      return data;
    },
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  const { data: people = [] } = useQuery<Person[]>({
    queryKey: ['people', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/people');
      return data;
    },
  });

  const { data: accounts = [] } = useQuery<Account[]>({
    queryKey: ['accounts', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/accounts');
      return data;
    },
  });

  // Calculate summary
  const summary = transactions.reduce(
    (acc, t) => {
      if (t.type === 'INCOME') {
        acc.income += t.amount;
      } else {
        acc.expense += Math.abs(t.amount);
      }
      // Despesas pendentes (não pagas)
      if (t.type === 'EXPENSE' && !t.paid) {
        acc.pending += Math.abs(t.amount);
      }
      return acc;
    },
    { income: 0, expense: 0, pending: 0 }
  );

  const balance = summary.income - summary.expense;

  // Filter transactions by search
  const filteredTransactions = transactions.filter((t) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.description?.toLowerCase().includes(query) ||
      t.category?.name?.toLowerCase().includes(query) ||
      t.account?.name?.toLowerCase().includes(query) ||
      t.person?.name?.toLowerCase().includes(query)
    );
  });

  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value);
    return `R$ ${absValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getCategoryBadge = (category?: Category) => {
    if (!category) return <span className={styles.noCategory}>Sem categoria</span>;
    return (
      <Badge variant="default">
        {category.icon && <span>{category.icon}</span>}
        {category.name}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    if (type === 'INCOME') {
      return <Badge variant="success">Receita</Badge>;
    }
    return <Badge variant="danger">Despesa</Badge>;
  };

  const getStatusBadge = (paid: boolean) => {
    if (paid) {
      return (
        <Badge variant="success">
          <Check size={14} />
          Pago
        </Badge>
      );
    }
    return (
      <Badge variant="warning">
        <X size={14} />
        Pendente
      </Badge>
    );
  };

  const months = [
    { value: '', label: 'Período' },
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Carregando transações...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Transações"
        subtitle="Gerencie todas as suas transações financeiras"
      />

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Saldo</span>
            <span className={`${styles.summaryValue} ${balance >= 0 ? styles.positive : styles.negative}`}>
              {formatCurrency(balance)}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.income}`}>
            <ArrowUpCircle size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Receitas</span>
            <span className={`${styles.summaryValue} ${styles.positive}`}>
              {formatCurrency(summary.income)}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.expense}`}>
            <ArrowDownCircle size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Despesas</span>
            <span className={`${styles.summaryValue} ${styles.negative}`}>
              {formatCurrency(summary.expense)}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.pending}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Despesas Pendentes</span>
            <span className={`${styles.summaryValue} ${styles.negative}`}>
              {formatCurrency(summary.pending)}
            </span>
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className={styles.filterSelect}
          >
            {[2024, 2025, 2026, 2027].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Month Selector */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className={styles.filterSelect}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas</option>
            <option value="INCOME">Receitas</option>
            <option value="EXPENSE">Despesas</option>
          </select>

          {/* Payment Date Toggle */}
          <label className={styles.toggleFilter}>
            <input
              type="checkbox"
              checked={showPaymentDate}
              onChange={(e) => setShowPaymentDate(e.target.checked)}
            />
            <span>Data Pagamento</span>
          </label>

          {/* Search */}
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar transações"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" size="md">
            <Filter size={18} />
            Filtro Avançado
          </Button>
          <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={18} />
            Nova Transação
          </Button>
          <Button variant="secondary" size="md">
            <Upload size={18} />
            Importar
          </Button>
          <Button variant="secondary" size="md">
            <Download size={18} />
            Exportar
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>DATA</th>
                <th>DESCRIÇÃO</th>
                <th>CATEGORIA</th>
                <th>CONTA</th>
                <th>CARTÃO</th>
                <th>USUÁRIO</th>
                <th>VALOR</th>
                <th>STATUS</th>
                <th>PAGO</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={10} className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <FileDown size={48} />
                      <p>Nenhuma transação encontrada</p>
                      <p className={styles.emptyHint}>
                        Ajuste os filtros ou crie uma nova transação
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className={styles.tableRow}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(transaction.date)}
                    </td>
                    <td className={styles.descriptionCell}>
                      {transaction.description}
                    </td>
                    <td>{getCategoryBadge(transaction.category)}</td>
                    <td>
                      {transaction.account ? (
                        <span className={styles.accountName}>
                          {transaction.account.name}
                        </span>
                      ) : (
                        <span className={styles.noData}>-</span>
                      )}
                    </td>
                    <td>
                      <span className={styles.noData}>-</span>
                    </td>
                    <td>
                      {transaction.person ? (
                        <div className={styles.personCell}>
                          <div className={styles.personAvatar}>
                            {transaction.person.name.charAt(0)}
                          </div>
                          <span>{transaction.person.name}</span>
                        </div>
                      ) : (
                        <span className={styles.noData}>-</span>
                      )}
                    </td>
                    <td
                      className={`${styles.amountCell} ${
                        transaction.type === 'INCOME' ? styles.income : styles.expense
                      }`}
                    >
                      {transaction.type === 'INCOME' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td>{getTypeBadge(transaction.type)}</td>
                    <td>{getStatusBadge(transaction.paid)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateTransactionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
