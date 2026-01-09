import { useState } from 'react';
import { CurrencyInput } from '../../components/UI';
import SimpleComponentPage from './components/SimpleComponentPage';

export default function CurrencyInputDetailPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('1234.56');

  const whenToUse = [
    'Para entrada de valores monetários',
    'Em formulários financeiros e transações',
    'Quando precisar de formatação automática de moeda',
    'Para garantir formato consistente de valores',
  ];

  const whenNotToUse = [
    'Para números não-monetários (use NumberInput)',
    'Quando precisar de múltiplas moedas simultaneamente',
    'Para valores aproximados ou estimativas',
  ];

  return (
    <SimpleComponentPage
      title="CurrencyInput"
      subtitle="Input formatado para valores monetários"
      overview="CurrencyInput formata automaticamente valores em moeda com prefixo R$, separadores de milhares e casas decimais."
      usage={
        <>
          <div>
            <h3 className="section-title">Exemplo Básico</h3>
            <CurrencyInput
              value={value1}
              onChange={setValue1}
              placeholder="R$ 0,00"
            />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Valor: {value1 || '0'}
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Valor Inicial</h3>
            <CurrencyInput
              value={value2}
              onChange={setValue2}
              label="Preço"
            />
            <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Valor numérico: {value2}
            </p>
          </div>

          <div>
            <h3 className="section-title">Com Label e Hint</h3>
            <CurrencyInput
              value=""
              onChange={() => {}}
              label="Valor da Transação"
              placeholder="Digite o valor"
              hint="Valor em reais (BRL)"
            />
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CurrencyInput
                value="100.50"
                onChange={() => {}}
                size="small"
                placeholder="Pequeno"
              />
              <CurrencyInput
                value="100.50"
                onChange={() => {}}
                size="medium"
                placeholder="Médio (padrão)"
              />
              <CurrencyInput
                value="100.50"
                onChange={() => {}}
                size="large"
                placeholder="Grande"
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Estados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Desabilitado</label>
                <CurrencyInput
                  value="250.00"
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Somente leitura</label>
                <CurrencyInput
                  value="250.00"
                  onChange={() => {}}
                  readOnly
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Com erro</label>
                <CurrencyInput
                  value=""
                  onChange={() => {}}
                  error="Valor é obrigatório"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Valores Positivos e Negativos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CurrencyInput
                value="1500.00"
                onChange={() => {}}
                label="Receita"
                prefix="+"
              />
              <CurrencyInput
                value="500.00"
                onChange={() => {}}
                label="Despesa"
                prefix="-"
              />
            </div>
          </div>
        </>
      }
      installation="import { CurrencyInput } from '@/components/UI';"
      basicExample={`const [value, setValue] = useState('');

<CurrencyInput
  value={value}
  onChange={setValue}
  placeholder="R$ 0,00"
  label="Valor"
/>`}
      propsCode={`interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  prefix?: string; // padrão: 'R$'
  decimalPlaces?: number; // padrão: 2
}`}
      styleTokens="--spacing-12, --radius-6, --color-border-default, --color-text-primary"
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    />
  );
}
