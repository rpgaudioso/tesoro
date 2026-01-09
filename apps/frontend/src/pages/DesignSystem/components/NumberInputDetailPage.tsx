import { useState } from 'react';
import { Card, NumberInput } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function NumberInputDetailPage() {
  const [amount, setAmount] = useState(100);
  const [installments, setInstallments] = useState(1);

  return (
    <SimpleComponentPage
      title="NumberInput"
      subtitle="Input numérico com controles"
      overview="NumberInput é um campo de entrada especializado para valores numéricos com botões de incremento e decremento."
      usage={
        <Card>
          <h2>Exemplos</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Valor (R$)
              </label>
              <NumberInput
                value={amount}
                onChange={setAmount}
                min={0}
                step={10}
                placeholder="0.00"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Número de Parcelas
              </label>
              <NumberInput
                value={installments}
                onChange={setInstallments}
                min={1}
                max={12}
                step={1}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Sem Controles
              </label>
              <NumberInput
                value={50}
                showControls={false}
                placeholder="Digite um número"
              />
            </div>
          </div>
        </Card>
      }
      installation={`import { NumberInput } from '@/components/UI';`}
      basicExample={`const [value, setValue] = useState(0);

<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={5}
  showControls={true}
/>`}
      propsCode={`interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;  // Padrão: true
  disabled?: boolean;
}`}
      styleTokens={`height: 36px;
border: 1px solid var(--color-border);
border-radius: var(--radius-8);
font-size: var(--font-sm);

/* Control buttons */
width: 32px;
height: 36px;
background: var(--color-bg-secondary);`}
      whenToUse={[
        'Para valores monetários em formulários',
        'Para número de parcelas ou quantidades',
        'Quando incrementos pequenos são comuns',
        'Para configurações numéricas com limites definidos (min/max)'
      ]}
      whenNotToUse={[
        'Para valores muito grandes ou decimais complexos (use Input type="number")',
        'Para ranges de valores (use Slider)',
        'Para quantidades em carrinhos de compra onde incremento rápido é necessário'
      ]}
    />
  );
}
