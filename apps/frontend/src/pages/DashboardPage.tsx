import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Card from '@/components/UI/Card';
import ProgressBar from '@/components/UI/ProgressBar';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { DashboardData, Transaction } from '@tesoro/shared';
import { format, addMonths, subMonths, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const currentMonth = format(selectedDate, 'yyyy-MM');

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard', currentMonth],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard?month=${currentMonth}`);
      return data;
    },
  });

  // Buscar transações para gráfico de despesas por categoria
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions', currentMonth],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?month=${currentMonth}`);
      return data;
    },
  });

  // Calcular despesas por categoria
  const expensesByCategory = useMemo(() => {
    if (!transactions) return [];
    
    const categoryMap = new Map<string, { name: string; total: number; color: string }>();
    
    transactions
      .filter(t => t.type === 'EXPENSE')
      .forEach(t => {
        const key = t.categoryId || 'sem-categoria';
        const existing = categoryMap.get(key);
        
        if (existing) {
          existing.total += t.amount;
        } else {
          categoryMap.set(key, {
            name: t.category?.name || 'Sem categoria',
            total: t.amount,
            color: getRandomColor(key),
          });
        }
      });
    
    return Array.from(categoryMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Top 10 categorias
  }, [transactions]);

  const handlePreviousMonth = () => {
    setSelectedDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  function getRandomColor(seed: string) {
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'
    ];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar dados</div>;
  }

  const monthName = format(new Date(data.month + '-01'), 'MMMM yyyy', { locale: ptBR });

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.controls}>
          <div className={styles.monthSelector}>
            <button 
              onClick={handlePreviousMonth}
              className={styles.monthButton}
              aria-label="Mês anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={styles.monthDisplay}>
              <span className={styles.monthText}>
                {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button 
                onClick={handleToday}
                className={styles.todayButton}
              >
                Hoje
              </button>
            </div>
            <button 
              onClick={handleNextMonth}
              className={styles.monthButton}
              aria-label="Próximo mês"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {data.alerts.length > 0 && (
        <div className={styles.alerts}>
          {data.alerts.map((alert, idx) => (
            <Alert key={idx} variant="warning">
              {alert}
            </Alert>
          ))}
        </div>
      )}

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <Card>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Receitas</span>
            <span className={`${styles.summaryValue} ${styles.income}`}>
              R$ {data.income.toFixed(2)}
            </span>
          </div>
        </Card>

        <Card>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Despesas</span>
            <span className={`${styles.summaryValue} ${styles.expense}`}>
              R$ {data.expenses.toFixed(2)}
            </span>
          </div>
        </Card>

        <Card>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Saldo</span>
            <span
              className={`${styles.summaryValue} ${
                data.balance >= 0 ? styles.positive : styles.negative
              }`}
            >
              R$ {data.balance.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      {/* Expenses by Category */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <TrendingUp size={20} />
          Despesas por Categoria
        </h2>
        {expensesByCategory.length === 0 ? (
          <p className={styles.emptyState}>Nenhuma despesa registrada neste período</p>
        ) : (
          <div className={styles.categoryExpenses}>
            {expensesByCategory.map((cat, idx) => {
              const maxValue = expensesByCategory[0]?.total || 1;
              const percentage = (cat.total / maxValue) * 100;
              
              return (
                <div key={idx} className={styles.categoryExpenseItem}>
                  <div className={styles.categoryExpenseHeader}>
                    <span className={styles.categoryExpenseName}>
                      <span 
                        className={styles.categoryDot} 
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </span>
                    <span className={styles.categoryExpenseValue}>
                      R$ {cat.total.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.categoryExpenseBar}>
                    <div 
                      className={styles.categoryExpenseBarFill}
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: cat.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Budget Summary */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <Calendar size={20} />
          Orçamentos por Categoria
        </h2>
        <div className={styles.budgetList}>
          {data.budgetSummary.length === 0 ? (
            <p className={styles.emptyState}>Nenhum orçamento configurado</p>
          ) : (
            data.budgetSummary.map((item) => (
              <div key={item.categoryId} className={styles.budgetItem}>
                <div className={styles.budgetHeader}>
                  <span className={styles.categoryName}>{item.categoryName}</span>
                  <div className={styles.budgetValues}>
                    <span className={styles.spent}>R$ {item.spent.toFixed(2)}</span>
                    <span className={styles.limit}>/ R$ {item.limit.toFixed(2)}</span>
                  </div>
                </div>
                <ProgressBar value={item.spent} max={item.limit} showLabel />
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Card Impact */}
      {data.cardImpact.nextMonths.length > 0 && (
        <Card>
          <h2 className={styles.sectionTitle}>Impacto de Parcelas Futuras</h2>
          <div className={styles.cardImpactList}>
            {data.cardImpact.nextMonths.map((item) => (
              <div key={item.month} className={styles.impactItem}>
                <span className={styles.impactMonth}>
                  {format(new Date(item.month + '-01'), 'MMM/yyyy', { locale: ptBR })}
                </span>
                <Badge variant="warning">R$ {item.amount.toFixed(2)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
