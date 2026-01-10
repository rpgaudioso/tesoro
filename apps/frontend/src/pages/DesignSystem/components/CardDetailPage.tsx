import { Card } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function CardDetailPage() {
  return (
    <SimpleComponentPage
      title="Card"
      subtitle="Container com elevação e padding padronizado"
      overview="Cards são containers que agrupam conteúdo relacionado. Fornecem elevação visual através de sombras e organizam informações de forma clara e estruturada."
      usage={
        <>
          <div>
            <h3 className="section-title">Card Básico</h3>
            
            <Card>
              <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>Título do Card</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Este é um exemplo de card básico com título e conteúdo textual.
              </p>
            </Card>
          </div>

          <div>
            <h3 className="section-title">Card com Conteúdo Estruturado</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <Card>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Receitas</h4>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)', marginBottom: '4px' }}>
                  R$ 15.280,00
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  +12% vs mês anterior
                </p>
              </Card>

              <Card>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Despesas</h4>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '4px' }}>
                  R$ 8.420,00
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  -5% vs mês anterior
                </p>
              </Card>

              <Card>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Saldo</h4>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
                  R$ 6.860,00
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Disponível
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="section-title">Card com Lista</h3>
            
            <Card>
              <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Transações Recentes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px' }}>Supermercado</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-danger)' }}>-R$ 245,80</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '14px' }}>Salário</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-success)' }}>+R$ 5.000,00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px' }}>Conta de Luz</span>
                  <span style={{ fontSize: '14px', color: 'var(--color-danger)' }}>-R$ 180,50</span>
                </div>
              </div>
            </Card>
          </div>
        </>
      }
      installation="import { Card } from '@/components/UI';"
      basicExample={`<Card>
  <h3>Título</h3>
  <p>Conteúdo do card</p>
</Card>`}
      propsCode={`interface CardProps {
  children: ReactNode;
  className?: string;
}`}
      styleTokens={`padding: var(--spacing-20);
background: white;
border-radius: var(--radius-12);
box-shadow: var(--shadow-sm);
border: 1px solid var(--color-border);`}
      whenToUse={[
        'Para agrupar conteúdo relacionado',
        'Para criar layouts de dashboard com métricas',
        'Para listas de itens ou produtos',
        'Para destacar seções importantes da página',
      ]}
      whenNotToUse={[
        'Para todo o conteúdo da página (use containers apropriados)',
        'Para navegação (use Menu ou Tabs)',
        'Para alertas ou notificações (use Alert ou Toast)',
        'Quando não há necessidade de agrupamento visual',
      ]}
    />
  );
}
