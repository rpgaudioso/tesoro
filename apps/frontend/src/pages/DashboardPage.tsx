import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Card from '@/components/UI/Card';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkspaceChange } from '@/hooks/useWorkspaceChange';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { DashboardData, Transaction } from '@tesoro/shared';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { currentWorkspace } = useAuth();
  useWorkspaceChange();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentMonth = format(selectedDate, 'yyyy-MM');
  const currentYear = format(selectedDate, 'yyyy');
  const lastMonth = format(subMonths(new Date(), 1), 'yyyy-MM');
  const lastYear = format(new Date(new Date().getFullYear() - 1, 0, 1), 'yyyy');
  const [statisticsPeriod, setStatisticsPeriod] = useState<'currentMonth' | 'currentYear' | 'lastYear'>('currentMonth');
  const [statisticsType, setStatisticsType] = useState<'EXPENSE' | 'INCOME' | 'ALL'>('EXPENSE');
  const [cashflowPeriod, setCashflowPeriod] = useState<'currentYear' | 'lastYear' | 'last12Months'>('currentYear');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard', currentMonth, currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard?month=${currentMonth}`);
      return data;
    },
  });

  // Buscar transações para gráfico de despesas por categoria
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['transactions', currentMonth, currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?month=${currentMonth}`);
      return data;
    },
  });

  // Query para últimos 12 meses (usa o endpoint de last-12-months)
  const { data: last12MonthsBalance } = useQuery({
    queryKey: ['last-12-months-balance', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/last-12-months`);
      return data;
    },
    enabled: cashflowPeriod === 'last12Months',
  });

  // Buscar transações do ano para estatísticas
  const { data: yearTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions-year', currentYear, currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?year=${currentYear}`);
      return data;
    },
    enabled: statisticsPeriod === 'currentYear',
  });

  // Buscar transações do ano anterior
  const { data: lastYearTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions-last-year', lastYear, currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?year=${lastYear}`);
      return data;
    },
    enabled: statisticsPeriod === 'lastYear',
  });

  // Buscar balanço anual (últimos 12 meses)
  const { data: yearlyBalance } = useQuery<Array<{
    month: string;
    monthName: string;
    income: number;
    expenses: number;
    balance: number;
  }>>({
    queryKey: ['yearly-balance', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/yearly-balance');
      return data;
    },
    enabled: cashflowPeriod === 'currentYear',
  });

  // Buscar balanço do ano anterior
  const { data: lastYearBalance } = useQuery<Array<{
    month: string;
    monthName: string;
    income: number;
    expenses: number;
    balance: number;
  }>>({
    queryKey: ['last-year-balance', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/yearly-balance?lastYear=true');
      return data;
    },
    enabled: cashflowPeriod === 'lastYear',
  });

  // Dados de cashflow baseado no período selecionado
  const cashflowData = useMemo(() => {
    if (cashflowPeriod === 'currentYear') {
      return yearlyBalance;
    } else if (cashflowPeriod === 'lastYear') {
      return lastYearBalance;
    } else if (cashflowPeriod === 'last12Months') {
      return last12MonthsBalance;
    }
    return [];
  }, [cashflowPeriod, yearlyBalance, lastYearBalance, last12MonthsBalance]);

  // Calcular despesas por categoria (para o gráfico de barras)
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

  // Calcular estatísticas do período selecionado
  const periodStatistics = useMemo(() => {
    let dataSource: Transaction[] | undefined;
    
    // Determinar fonte de dados baseado no período
    switch (statisticsPeriod) {
      case 'currentMonth':
        dataSource = transactions;
        break;
      case 'currentYear':
        dataSource = yearTransactions;
        break;
      case 'lastYear':
        dataSource = lastYearTransactions;
        break;
    }
    
    if (!dataSource) return null;

    const expenses = dataSource.filter(t => t.type === 'EXPENSE');
    const income = dataSource.filter(t => t.type === 'INCOME');

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

    // Determinar quais transações usar baseado no filtro de tipo
    let filteredTransactions: Transaction[];
    if (statisticsType === 'EXPENSE') {
      filteredTransactions = expenses;
    } else if (statisticsType === 'INCOME') {
      filteredTransactions = income;
    } else {
      filteredTransactions = dataSource;
    }

    // Agrupar transações por categoria com informações de limite e ícone
    const categoryMap = new Map<string, { 
      name: string; 
      total: number; 
      color: string; 
      icon?: string;
      monthlyLimit?: number;
      categoryId?: string;
    }>();
    
    filteredTransactions.forEach(t => {
      const key = t.categoryId || 'sem-categoria';
      const existing = categoryMap.get(key);
      
      if (existing) {
        existing.total += t.amount;
      } else {
        categoryMap.set(key, {
          name: t.category?.name || 'Sem categoria',
          total: t.amount,
          color: getRandomColor(key),
          icon: t.category?.icon,
          monthlyLimit: t.category?.monthlyLimit,
          categoryId: t.categoryId,
        });
      }
    });

    const totalForPercentage = statisticsType === 'EXPENSE' ? totalExpenses : 
                               statisticsType === 'INCOME' ? totalIncome : 
                               totalExpenses + totalIncome;

    const topCategories = Array.from(categoryMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
      .map(cat => ({
        ...cat,
        percentage: totalForPercentage > 0 ? (cat.total / totalForPercentage) * 100 : 0,
        limitPercentage: cat.monthlyLimit && cat.monthlyLimit > 0 && statisticsPeriod.includes('Month')
          ? (cat.total / cat.monthlyLimit) * 100 
          : undefined,
      }));

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      topCategories,
    };
  }, [transactions, yearTransactions, lastYearTransactions, statisticsPeriod, statisticsType]);

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

      {/* Cashflow Chart */}
      {cashflowData && cashflowData.length > 0 && (() => {
        // Encontrar o valor máximo entre receitas e despesas para escala do gráfico
        const maxIncome = Math.max(...cashflowData.map(i => i.income), 0);
        const maxExpense = Math.max(...cashflowData.map(i => i.expenses), 0);
        const maxAbsValue = Math.max(maxIncome, maxExpense);
        
        // DEBUG
        console.log('Cashflow Debug:', {
          dataLength: cashflowData.length,
          maxIncome,
          maxExpense,
          maxAbsValue,
          sampleData: cashflowData[0]
        });
        
        // Se não houver valores, usar 1000 como padrão
        const baseValue = maxAbsValue > 0 ? maxAbsValue : 1000;
        
        // Arredondar para o próximo milhar
        const maxValue = Math.ceil(baseValue / 1000) * 1000;
        
        // Criar 5 divisões no eixo Y (positivo para receitas, negativo para despesas, zero no meio)
        const step = maxValue / 2;
        const yAxisLabels = [
          maxValue,
          step,
          0,
          -step,
          -maxValue
        ];
        
        // Calcular totais para exibição
        const totalBalance = cashflowData.reduce((sum, item) => sum + item.balance, 0);
        const totalIncome = cashflowData.reduce((sum, item) => sum + item.income, 0);
        const totalExpenses = cashflowData.reduce((sum, item) => sum + item.expenses, 0);

        return (
          <Card>
            <div className={styles.cashflowHeader}>
              <div className={styles.cashflowTitleSection}>
                <h2 className={styles.cashflowTitle}>Cashflow</h2>
                <div className={styles.cashflowTotalBalance}>
                  <span className={styles.cashflowTotalLabel}>Balanço Total</span>
                  <span className={`${styles.cashflowTotalValue} ${totalBalance >= 0 ? styles.positive : styles.negative}`}>
                    R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <select 
                className={styles.cashflowDropdown}
                value={cashflowPeriod}
                onChange={(e) => setCashflowPeriod(e.target.value as any)}
              >
                <option value="currentYear">Este Ano</option>
                <option value="lastYear">Último Ano</option>
                <option value="last12Months">Últimos 12 Meses</option>
              </select>
            </div>
            
            <div className={styles.cashflowLegend}>
              <div className={styles.cashflowLegendItem}>
                <div className={styles.cashflowLegendDot} style={{ backgroundColor: '#10b981' }} />
                <span>Receitas</span>
                <span className={styles.cashflowLegendValue}>R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.cashflowLegendItem}>
                <div className={styles.cashflowLegendDot} style={{ backgroundColor: '#ef4444' }} />
                <span>Despesas</span>
                <span className={styles.cashflowLegendValue}>R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.cashflowChartContainer}>
              <div className={styles.cashflowYAxis}>
                {yAxisLabels.map((label, idx) => (
                  <div key={idx} className={styles.yAxisLabel}>
                    {Math.abs(label) >= 1000 
                      ? `${label >= 0 ? '' : '-'}${(Math.abs(label) / 1000).toFixed(Math.abs(label) % 1000 === 0 ? 0 : 1)}k` 
                      : label.toFixed(0)}
                  </div>
                ))}
              </div>
              
              <div className={styles.cashflowChart}>
                <div className={styles.cashflowGridLines}>
                  {yAxisLabels.map((_, idx) => (
                    <div key={idx} className={`${styles.gridLine} ${idx === 2 ? styles.zeroLine : ''}`} />
                  ))}
                </div>
                
                <div className={styles.cashflowBars}>
                  {cashflowData.map((item, idx) => {
                    // Calcular altura como percentual de 50% (metade do espaço disponível)
                    const incomePercent = maxValue > 0 ? (item.income / maxValue) * 50 : 0;
                    const expensePercent = maxValue > 0 ? (item.expenses / maxValue) * 50 : 0;
                    
                    return (
                      <div 
                        key={idx} 
                        className={styles.cashflowBarGroup}
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div className={styles.cashflowBarWrapper}>
                          {/* Barra verde de receitas - cresce para baixo a partir do topo da metade superior */}
                          {item.income > 0 && (
                            <div 
                              className={styles.cashflowBarIncome}
                              style={{ 
                                height: `${incomePercent}%`,
                                bottom: '50%'
                              }}
                            />
                          )}
                          
                          {/* Barra vermelha de despesas - cresce para cima a partir do topo da metade inferior */}
                          {item.expenses > 0 && (
                            <div 
                              className={styles.cashflowBarExpense}
                              style={{ 
                                height: `${expensePercent}%`,
                                top: '50%'
                              }}
                            />
                          )}
                        </div>
                        <span className={styles.cashflowBarLabel}>{item.monthName}</span>
                        
                        {hoveredBar === idx && (
                          <div className={styles.cashflowTooltip}>
                            <div className={styles.tooltipHeader}>{item.monthName}</div>
                            <div className={styles.tooltipRow}>
                              <span className={styles.tooltipLabel}>Receitas:</span>
                              <span className={styles.tooltipValue} style={{ color: '#10b981' }}>
                                R$ {item.income.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className={styles.tooltipRow}>
                              <span className={styles.tooltipLabel}>Despesas:</span>
                              <span className={styles.tooltipValue} style={{ color: '#ef4444' }}>
                                R$ {item.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className={styles.tooltipDivider} />
                            <div className={styles.tooltipRow}>
                              <span className={styles.tooltipLabel}>Balanço:</span>
                              <span className={`${styles.tooltipValue} ${item.balance >= 0 ? styles.positive : styles.negative}`}>
                                R$ {item.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        );
      })()}

      {/* Expenses by Category */}
      <div className={styles.dashboardGrid}>
        <Card className={styles.expensesCard}>
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

        {/* Statistics */}
        <Card className={styles.statisticsCard}>
          <div className={styles.statisticsHeader}>
            <h2 className={styles.statisticsTitle}>Estatísticas</h2>
            <select 
              className={styles.periodDropdown}
              value={statisticsPeriod}
              onChange={(e) => setStatisticsPeriod(e.target.value as any)}
            >
              <option value="currentMonth">Este Mês</option>
              <option value="currentYear">Este Ano</option>
              <option value="lastYear">Último Ano</option>
            </select>
          </div>

          {periodStatistics && (
            <>
              <div className={styles.statisticsTypeFilter}>
                <button
                  className={`${styles.typeFilterButton} ${statisticsType === 'INCOME' ? styles.typeFilterButtonActive : ''}`}
                  onClick={() => setStatisticsType('INCOME')}
                >
                  <span className={styles.typeFilterLabel}>Receitas</span>
                  <span className={styles.typeFilterValue}>
                    R$ {periodStatistics.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </button>
                <button
                  className={`${styles.typeFilterButton} ${statisticsType === 'EXPENSE' ? styles.typeFilterButtonActive : ''}`}
                  onClick={() => setStatisticsType('EXPENSE')}
                >
                  <span className={styles.typeFilterLabel}>Despesas</span>
                  <span className={styles.typeFilterValue}>
                    R$ {periodStatistics.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </button>
              </div>

              {periodStatistics.topCategories.length > 0 && (
                <>
                  <div className={styles.donutChartContainer}>
                    <svg viewBox="0 0 200 200" className={styles.donutChart}>
                      {(() => {
                        let currentAngle = -90;
                        return periodStatistics.topCategories.map((cat, idx) => {
                          const angle = (cat.percentage / 100) * 360;
                          const startAngle = currentAngle;
                          currentAngle += angle;
                          
                          const startRad = (startAngle * Math.PI) / 180;
                          const endRad = (currentAngle * Math.PI) / 180;
                          
                          const x1 = 100 + 80 * Math.cos(startRad);
                          const y1 = 100 + 80 * Math.sin(startRad);
                          const x2 = 100 + 80 * Math.cos(endRad);
                          const y2 = 100 + 80 * Math.sin(endRad);
                          
                          const largeArc = angle > 180 ? 1 : 0;
                          
                          const pathData = [
                            `M 100 100`,
                            `L ${x1} ${y1}`,
                            `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                            `Z`
                          ].join(' ');
                          
                          return (
                            <path
                              key={idx}
                              d={pathData}
                              fill={cat.color}
                              opacity="0.9"
                            />
                          );
                        });
                      })()}
                      {/* Inner circle to create donut effect */}
                      <circle cx="100" cy="100" r="50" fill="var(--color-bg)" />
                      <text
                        x="100"
                        y="95"
                        textAnchor="middle"
                        className={styles.donutChartValue}
                      >
                        R$ {(periodStatistics.topCategories.reduce((sum, cat) => sum + cat.total, 0) / 1000).toFixed(1)}k
                      </text>
                      <text
                        x="100"
                        y="110"
                        textAnchor="middle"
                        className={styles.donutChartLabel}
                      >
                        {statisticsType === 'INCOME' ? 'Receitas' : statisticsType === 'EXPENSE' ? 'Despesas' : 'Total'}
                      </text>
                    </svg>
                  </div>

                  <div className={styles.categoryList}>
                    {periodStatistics.topCategories.map((cat, idx) => (
                      <div key={idx} className={styles.categoryListItem}>
                        <div className={styles.categoryListContent}>
                          <div className={styles.categoryListTop}>
                            <div className={styles.categoryListLeft}>
                              {cat.icon && (
                                <span className={styles.categoryIcon}>{cat.icon}</span>
                              )}
                              <span className={styles.categoryPercentage}>
                                {Math.round(cat.percentage)}%
                              </span>
                              <span className={styles.categoryName}>{cat.name}</span>
                            </div>
                            <div className={styles.categoryListRight}>
                              <span className={styles.categoryValue}>
                                R$ {cat.total.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </span>
                              {cat.monthlyLimit && (
                                <span className={styles.categoryLimitValue}>
                                  / R$ {cat.monthlyLimit.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {cat.monthlyLimit && cat.monthlyLimit > 0 && statisticsPeriod.includes('Month') && statisticsType === 'EXPENSE' && (
                            <div className={styles.categoryProgressBar}>
                              <div 
                                className={`${styles.categoryProgressFill} ${
                                  cat.limitPercentage && cat.limitPercentage > 100 
                                    ? styles.categoryProgressOverLimit 
                                    : cat.limitPercentage && cat.limitPercentage > 80
                                      ? styles.categoryProgressWarning
                                      : ''
                                }`}
                                style={{ 
                                  width: `${Math.min(cat.limitPercentage || 0, 100)}%`,
                                  backgroundColor: cat.limitPercentage && cat.limitPercentage > 100 
                                    ? '#ef4444' 
                                    : cat.limitPercentage && cat.limitPercentage > 80
                                      ? '#f59e0b'
                                      : cat.color
                                }}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div 
                          className={styles.categoryIndicator}
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {periodStatistics.topCategories.length === 0 && (
                <p className={styles.emptyState}>Nenhuma despesa registrada neste período</p>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Recent Transactions */}
      {transactions && transactions.length > 0 && (
        <Card>
          <h2 className={styles.sectionTitle}>
            <Calendar size={20} />
            Transações Recentes
          </h2>
          <div className={styles.recentTransactions}>
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionDescription}>{transaction.description}</div>
                  <div className={styles.transactionMeta}>
                    <span className={styles.transactionDate}>
                      {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                    {transaction.category && (
                      <>
                        <span className={styles.transactionSeparator}>•</span>
                        <span className={styles.transactionCategory}>{transaction.category.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className={`${styles.transactionAmount} ${transaction.type === 'INCOME' ? styles.income : styles.expense}`}>
                  {transaction.type === 'INCOME' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
