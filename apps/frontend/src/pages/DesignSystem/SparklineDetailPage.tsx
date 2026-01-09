import { Sparkline } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function SparklineDetailPage() {
  const dataPositiva = [10, 15, 12, 18, 22, 20, 25, 28, 30, 27];
  const dataNegativa = [30, 28, 25, 22, 20, 18, 15, 12, 10, 8];
  const dataVolatil = [15, 22, 18, 25, 20, 28, 23, 19, 26, 24];
  const dataMensal = [100, 120, 115, 140, 135, 150, 145, 160, 155, 170, 165, 180];

  const whenToUse = [
    'Para mostrar tendências inline em tabelas',
    'Em cards de métricas com contexto visual',
    'Para visualizar séries temporais de forma compacta',
    'Quando o espaço é limitado mas precisa mostrar tendência',
  ];

  const whenNotToUse = [
    'Para análise detalhada de dados (use Chart completo)',
    'Quando precisar de eixos e legendas',
    'Para comparar múltiplas séries',
  ];

  return (
    <SimpleComponentPage
      title="Sparkline"
      subtitle="Mini gráfico de linha inline"
      overview="Sparkline mostra tendências de forma compacta sem eixos ou rótulos, ideal para tabelas e cards."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <Sparkline data={dataPositiva} />
          </div>

          <div>
            <h3 className="section-title">Cores Diferentes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Positiva (Verde)</p>
                <Sparkline data={dataPositiva} color="success" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Negativa (Vermelho)</p>
                <Sparkline data={dataNegativa} color="danger" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Neutra (Azul)</p>
                <Sparkline data={dataVolatil} color="primary" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Aviso (Amarelo)</p>
                <Sparkline data={dataVolatil} color="warning" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Pequeno</p>
                <Sparkline data={dataPositiva} size="small" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Médio (padrão)</p>
                <Sparkline data={dataPositiva} size="medium" />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Grande</p>
                <Sparkline data={dataPositiva} size="large" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Preenchimento</h3>
            <Sparkline data={dataPositiva} filled />
          </div>

          <div>
            <h3 className="section-title">Em Tabela</h3>
            <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-8)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 500 }}>Categoria</th>
                    <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 500 }}>Valor</th>
                    <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 500 }}>Tendência</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '12px' }}>Receitas</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--color-success)' }}>R$ 5.000</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <Sparkline data={dataPositiva} size="small" color="success" />
                    </td>
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '12px' }}>Despesas</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--color-danger)' }}>R$ 3.200</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <Sparkline data={dataNegativa} size="small" color="danger" />
                    </td>
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--color-border-default)' }}>
                    <td style={{ padding: '12px' }}>Investimentos</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--color-primary)' }}>R$ 1.800</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <Sparkline data={dataVolatil} size="small" color="primary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="section-title">Em Cards de Métricas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Vendas', value: 'R$ 12.5k', data: dataPositiva, color: 'success' as const },
                { title: 'Visitas', value: '8.2k', data: dataVolatil, color: 'primary' as const },
                { title: 'Conversão', value: '3.4%', data: dataNegativa, color: 'danger' as const },
              ].map((metric, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-8)',
                }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                    {metric.title}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
                    {metric.value}
                  </p>
                  <Sparkline data={metric.data} color={metric.color} size="small" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="section-title">Dados Mensais</h3>
            <Sparkline data={dataMensal} color="primary" filled />
            <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Evolução dos últimos 12 meses
            </p>
          </div>
        </>
      }
      installation="import { Sparkline } from '@/components/UI';"
      basicExample={`const data = [10, 15, 12, 18, 22, 20, 25];

<Sparkline data={data} color="success" />`}
      propsCode={`interface SparklineProps {
  data: number[];
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  filled?: boolean;
  width?: number; // padrão: 100%
  height?: number; // padrão: baseado no size
}`}
      styleTokens="--spacing-8, --radius-4, --color-primary, --color-success, --color-danger"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
