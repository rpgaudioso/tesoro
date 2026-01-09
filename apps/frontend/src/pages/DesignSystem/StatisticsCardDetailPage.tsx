import { CreditCard, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { StatisticsCard } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function StatisticsCardDetailPage() {
  const whenToUse = [
    'Para exibir métricas e KPIs importantes em destaque',
    'Quando precisar mostrar tendências e variações percentuais',
    'Em dashboards financeiros ou analíticos',
    'Para destacar estatísticas individuais com contexto visual',
  ];

  const whenNotToUse = [
    'Para exibir múltiplas métricas relacionadas (use DataTable)',
    'Quando não houver necessidade de destaque visual',
    'Para dados que requerem interação complexa',
  ];

  return (
    <SimpleComponentPage
      title="StatisticsCard"
      subtitle="Cartão destacado para métricas importantes"
      overview="StatisticsCard exibe métricas, valores estatísticos e tendências com indicadores visuais, ideal para dashboards e painéis analíticos."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplos Básicos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <StatisticsCard
                title="Receita Total"
                value="R$ 45.230"
                icon={DollarSign}
                color="success"
                trend={{ value: 12.5, isPositive: true }}
                description="vs. mês anterior"
              />
              <StatisticsCard
                title="Despesas"
                value="R$ 23.450"
                icon={CreditCard}
                color="danger"
                trend={{ value: 5.2, isPositive: false }}
              />
              <StatisticsCard
                title="Saldo"
                value="R$ 21.780"
                icon={Wallet}
                color="primary"
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Cores Variadas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <StatisticsCard title="Primary" value="1,234" color="primary" icon={TrendingUp} />
              <StatisticsCard title="Success" value="5,678" color="success" icon={TrendingUp} />
              <StatisticsCard title="Warning" value="910" color="warning" icon={TrendingUp} />
              <StatisticsCard title="Danger" value="112" color="danger" icon={TrendingUp} />
            </div>
          </div>
        </>
      }
      installation="import { StatisticsCard } from '@/components/UI';"
      basicExample={`<StatisticsCard
  title="Receita Total"
  value="R$ 45.230"
  icon={DollarSign}
  color="success"
  trend={{ value: 12.5, isPositive: true }}
  description="vs. mês anterior"
/>`}
      propsCode={`interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  footer?: ReactNode;
}`}
      styleTokens={`/* Tokens utilizados */
--spacing-20: 20px
--spacing-16: 16px
--spacing-12: 12px
--spacing-8: 8px
--radius-12: 12px
--radius-8: 8px
--color-primary
--color-success
--color-warning
--color-danger
--shadow-md`}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
