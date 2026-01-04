import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Card from '@/components/UI/Card';
import ProgressBar from '@/components/UI/ProgressBar';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { DashboardData } from '@tesoro/shared';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const currentMonth = format(new Date(), 'yyyy-MM');

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard', currentMonth],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard?month=${currentMonth}`);
      return data;
    },
  });

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar dados</div>;
  }

  const monthName = format(new Date(data.month + '-01'), 'MMMM yyyy', { locale: ptBR });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.month}>{monthName}</p>
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

      {/* Budget Summary */}
      <Card>
        <h2 className={styles.sectionTitle}>Orçamentos por Categoria</h2>
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
