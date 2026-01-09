import { useState } from 'react';
import { Card, Slider } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function SliderDetailPage() {
  const [value, setValue] = useState(50);
  const [rangeValue, setRangeValue] = useState(1000);

  return (
    <SimpleComponentPage
      title="Slider"
      subtitle="Seletor de range/valor"
      overview="Slider permite selecionar um valor numérico dentro de um range, ideal para filtros de valores mínimos e máximos."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Volume: {value}%
              </label>
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                showValue={false}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Filtrar por valor
              </label>
              <Slider
                min={0}
                max={5000}
                step={100}
                value={rangeValue}
                onChange={(e) => setRangeValue(Number(e.target.value))}
                formatValue={(val) => `R$ ${val.toFixed(2)}`}
              />
            </div>
          </div>
        </Card>
      }
      installation={`import { Slider } from '@/components/UI';`}
      basicExample={`const [value, setValue] = useState(50);

<Slider
  min={0}
  max={100}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
  showValue={true}
  formatValue={(val) => \`\${val}%\`}
/>`}
      propsCode={`interface SliderProps extends InputHTMLAttributes {
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}`}
      styleTokens={`height: 6px;
border-radius: var(--radius-full);
background: var(--color-primary);

/* Thumb */
width: 18px;
height: 18px;
border-radius: var(--radius-full);
background: var(--color-primary);
box-shadow: var(--shadow-sm);`}
      whenToUse={[
        'Para filtros de valores mínimos e máximos (preço, data)',
        'Para ajustar configurações com valores contínuos (volume, brilho)',
        'Para seleção de orçamentos e limites',
        'Quando o valor exato não é crítico e ranges são aceitáveis'
      ]}
      whenNotToUse={[
        'Para valores precisos onde cada unidade importa (use NumberInput)',
        'Para seleção entre opções discretas (use RadioButton ou Select)',
        'Em formulários onde precisão numérica é essencial'
      ]}
    />
  );
}
