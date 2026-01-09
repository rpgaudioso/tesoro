import { CheckCircle, Clock, DollarSign, ShoppingBag, Wallet } from 'lucide-react';
import { Timeline } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function TimelineDetailPage() {
  const events = [
    {
      icon: DollarSign,
      title: 'Receita Recebida',
      description: 'Salário do mês de janeiro',
      timestamp: '09 Jan 2026, 08:00',
      variant: 'success' as const,
    },
    {
      icon: ShoppingBag,
      title: 'Compra no Mercado',
      description: 'Supermercado ABC - R$ 250,00',
      timestamp: '08 Jan 2026, 18:30',
      variant: 'danger' as const,
    },
    {
      icon: Wallet,
      title: 'Transferência Realizada',
      description: 'Transferência para conta poupança',
      timestamp: '07 Jan 2026, 14:20',
      variant: 'info' as const,
    },
    {
      icon: Clock,
      title: 'Pagamento Agendado',
      description: 'Fatura do cartão - Vencimento 15/01',
      timestamp: '06 Jan 2026, 10:00',
      variant: 'warning' as const,
    },
  ];

  const whenToUse = [
    'Para histórico de transações ou eventos',
    'Em feed de atividades cronológicas',
    'Para mostrar progresso temporal de um processo',
    'Quando precisar visualizar sequência de eventos',
  ];

  const whenNotToUse = [
    'Para navegação (use Stepper)',
    'Quando a ordem temporal não é importante',
    'Para dados tabulares complexos (use DataTable)',
  ];

  return (
    <SimpleComponentPage
      title="Timeline"
      subtitle="Linha do tempo cronológica"
      overview="Timeline exibe eventos em sequência temporal vertical com ícones, timestamps e descrições."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <Timeline events={events} />
          </div>

          <div>
            <h3 className="section-title">Sem Ícones</h3>
            <Timeline
              events={[
                {
                  title: 'Pagamento processado',
                  description: 'Fatura #1234 paga com sucesso',
                  timestamp: '09 Jan, 10:30',
                },
                {
                  title: 'E-mail enviado',
                  description: 'Confirmação enviada para o cliente',
                  timestamp: '09 Jan, 10:35',
                },
                {
                  title: 'Nota fiscal gerada',
                  description: 'NF-e disponível para download',
                  timestamp: '09 Jan, 10:40',
                },
              ]}
            />
          </div>

          <div>
            <h3 className="section-title">Variantes de Cores</h3>
            <Timeline
              events={[
                {
                  icon: CheckCircle,
                  title: 'Sucesso',
                  description: 'Operação concluída',
                  timestamp: 'Agora',
                  variant: 'success',
                },
                {
                  icon: Clock,
                  title: 'Informação',
                  description: 'Processo em andamento',
                  timestamp: '5 min atrás',
                  variant: 'info',
                },
                {
                  icon: Clock,
                  title: 'Atenção',
                  description: 'Requer atenção',
                  timestamp: '10 min atrás',
                  variant: 'warning',
                },
                {
                  icon: Clock,
                  title: 'Erro',
                  description: 'Falha na operação',
                  timestamp: '15 min atrás',
                  variant: 'danger',
                },
              ]}
            />
          </div>

          <div>
            <h3 className="section-title">Apenas Título</h3>
            <Timeline
              events={[
                { title: 'Conta criada', timestamp: '01 Jan 2026' },
                { title: 'Primeiro login', timestamp: '02 Jan 2026' },
                { title: 'Perfil atualizado', timestamp: '05 Jan 2026' },
                { title: 'Primeiro pagamento', timestamp: '09 Jan 2026' },
              ]}
            />
          </div>

          <div>
            <h3 className="section-title">Timeline Compacta</h3>
            <Timeline
              compact
              events={[
                { title: 'Item criado', timestamp: '08:00' },
                { title: 'Item editado', timestamp: '09:30' },
                { title: 'Item aprovado', timestamp: '11:00' },
                { title: 'Item publicado', timestamp: '14:00' },
              ]}
            />
          </div>

          <div>
            <h3 className="section-title">Histórico de Transações</h3>
            <Timeline
              events={[
                {
                  icon: DollarSign,
                  title: 'Salário',
                  description: '+ R$ 5.000,00',
                  timestamp: '05 Jan 2026',
                  variant: 'success',
                },
                {
                  icon: ShoppingBag,
                  title: 'Supermercado',
                  description: '- R$ 350,00',
                  timestamp: '04 Jan 2026',
                  variant: 'danger',
                },
                {
                  icon: ShoppingBag,
                  title: 'Restaurante',
                  description: '- R$ 85,00',
                  timestamp: '03 Jan 2026',
                  variant: 'danger',
                },
                {
                  icon: Wallet,
                  title: 'Transferência',
                  description: '- R$ 1.000,00',
                  timestamp: '02 Jan 2026',
                  variant: 'info',
                },
              ]}
            />
          </div>
        </>
      }
      installation="import { Timeline } from '@/components/UI';"
      basicExample={`import { Clock } from 'lucide-react';

const events = [
  {
    icon: Clock,
    title: 'Evento 1',
    description: 'Descrição do evento',
    timestamp: '09 Jan 2026',
    variant: 'info',
  },
];

<Timeline events={events} />`}
      propsCode={`interface TimelineProps {
  events: Array<{
    icon?: React.ComponentType;
    title: string;
    description?: string;
    timestamp: string;
    variant?: 'success' | 'info' | 'warning' | 'danger';
  }>;
  compact?: boolean;
}`}
      styleTokens="--spacing-16, --radius-6, --color-border-default, --color-success, --color-info"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
