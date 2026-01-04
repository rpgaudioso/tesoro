import Badge from '@/components/UI/Badge';
import Card from '@/components/UI/Card';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from '@tesoro/shared';
import { format } from 'date-fns';
import { useState } from 'react';
import styles from './TransactionsPage.module.css';

export default function TransactionsPage() {
  const currentMonth = format(new Date(), 'yyyy-MM');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['transactions', selectedMonth],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?month=${selectedMonth}`);
      return data;
    },
  });

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lançamentos</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.monthPicker}
        />
      </div>

      <Card>
        {!transactions || transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum lançamento encontrado</p>
          </div>
        ) : (
          <div className={styles.transactionList}>
            {transactions.map((transaction: any) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionMain}>
                    <span className={styles.description}>
                      {transaction.description}
                    </span>
                    <Badge variant={transaction.type === 'INCOME' ? 'success' : 'default'}>
                      {transaction.type === 'INCOME' ? 'Receita' : 'Despesa'}
                    </Badge>
                  </div>
                  <div className={styles.transactionMeta}>
                    <span className={styles.category}>
                      {transaction.category?.name || 'Sem categoria'}
                    </span>
                    <span className={styles.date}>
                      {format(new Date(transaction.date), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.amount} ${
                    transaction.type === 'INCOME' ? styles.income : styles.expense
                  }`}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'} R${' '}
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
