import { BarChart, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { Card, ContentSwitcher } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ContentSwitcherDetailPage() {
  const [view, setView] = useState('list');
  const [chartType, setChartType] = useState('bar');

  return (
    <SimpleComponentPage
      title="ContentSwitcher"
      subtitle="Alternador entre visualizações"
      overview="ContentSwitcher permite alternar entre diferentes visualizações ou modos de exibição do mesmo conteúdo."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Modo de Visualização
              </label>
              <ContentSwitcher
                options={[
                  { value: 'list', label: 'Lista', icon: <List size={16} /> },
                  { value: 'grid', label: 'Grade', icon: <LayoutGrid size={16} /> },
                  { value: 'chart', label: 'Gráfico', icon: <BarChart size={16} /> },
                ]}
                value={view}
                onChange={setView}
              />
              <p style={{ marginTop: '12px', fontSize: '14px', color: '#737373' }}>
                Visualização atual: {view}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Tamanhos
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ContentSwitcher
                  size="sm"
                  options={[
                    { value: 'bar', label: 'Barras' },
                    { value: 'line', label: 'Linhas' },
                    { value: 'pie', label: 'Pizza' },
                  ]}
                  value={chartType}
                  onChange={setChartType}
                />
                <ContentSwitcher
                  size="md"
                  options={[
                    { value: 'bar', label: 'Barras' },
                    { value: 'line', label: 'Linhas' },
                    { value: 'pie', label: 'Pizza' },
                  ]}
                  value={chartType}
                  onChange={setChartType}
                />
                <ContentSwitcher
                  size="lg"
                  options={[
                    { value: 'bar', label: 'Barras' },
                    { value: 'line', label: 'Linhas' },
                    { value: 'pie', label: 'Pizza' },
                  ]}
                  value={chartType}
                  onChange={setChartType}
                />
              </div>
            </div>
          </div>
        </Card>
      }
      installation={`import { ContentSwitcher } from '@/components/UI';`}
      basicExample={`const [view, setView] = useState('list');

<ContentSwitcher
  options={[
    { value: 'list', label: 'Lista', icon: <List /> },
    { value: 'grid', label: 'Grade', icon: <Grid /> },
  ]}
  value={view}
  onChange={setView}
  size="md"
/>`}
      propsCode={`interface ContentSwitcherOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface ContentSwitcherProps {
  options: ContentSwitcherOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}`}
      styleTokens={`background: var(--color-bg-secondary);
border-radius: var(--radius-8);
padding: var(--spacing-4);

/* Active option */
background: var(--color-bg);
box-shadow: var(--shadow-sm);`}
      whenToUse={[
        'Para alternar entre visualizações do mesmo conteúdo (lista/grade/gráfico)',
        'Para escolher tipo de gráfico ou relatório',
        'Para filtros de visualização que afetam todo o conteúdo',
        'Quando há 2-4 opções mutuamente exclusivas de apresentação'
      ]}
      whenNotToUse={[
        'Para navegação entre seções diferentes (use Tabs)',
        'Para configurações ou preferências (use RadioGroup)',
        'Para mais de 4 opções (use Select)',
        'Para toggle simples on/off (use Toggle)'
      ]}
    />
  );
}
