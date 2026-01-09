import { useState } from 'react';
import { Slider } from '../../../components/UI';
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
        <>
          <div>
            <h3 className="section-title">Volume: {value}%</h3>
            <Slider
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              showValue={false}
            />
          </div>
          <div>
            <h3 className="section-title">Filtrar por valor</h3>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={rangeValue}
              onChange={(e) => setRangeValue(Number(e.target.value))}
              formatValue={(val) => `R$ ${val.toFixed(2)}`}
            />
          </div>
        </>
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
