import { useState } from 'react';
import { RadioGroup } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function RadioButtonDetailPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [transactionType, setTransactionType] = useState('expense');

  return (
    <SimpleComponentPage
      title="RadioButton"
      subtitle="Seleção única entre opções"
      overview="RadioButton permite selecionar uma opção entre múltiplas escolhas mutuamente exclusivas."
      usage={
        <>
          <div>
            <h3 className="section-title">Método de Pagamento</h3>
            <RadioGroup
              name="payment"
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={[
                { value: 'credit', label: 'Cartão de Crédito' },
                { value: 'debit', label: 'Cartão de Débito' },
                { value: 'cash', label: 'Dinheiro' },
                { value: 'pix', label: 'PIX' },
              ]}
            />
          </div>
          <div>
            <h3 className="section-title">Tipo de Transação</h3>
            <p style={{ marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
              Orientação horizontal para opções relacionadas
            </p>
            <RadioGroup
              name="type"
              value={transactionType}
              onChange={setTransactionType}
              orientation="horizontal"
              options={[
                { value: 'expense', label: 'Despesa' },
                { value: 'income', label: 'Receita' },
                { value: 'transfer', label: 'Transferência' },
              ]}
            />
          </div>
        </>
      }
      installation={`import { RadioButton, RadioGroup } from '@/components/UI';`}
      basicExample={`const [value, setValue] = useState('option1');

<RadioGroup
  name="options"
  value={value}
  onChange={setValue}
  options={[
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3', disabled: true },
  ]}
  orientation="vertical"
/>`}
      propsCode={`interface RadioButtonProps {
  label?: string;
  // ... extends InputHTMLAttributes
}

interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
}`}
      styleTokens={`width: 18px;
height: 18px;
border: 2px solid var(--color-border);
border-radius: var(--radius-full);

/* Checked state */
border-color: var(--color-primary);
background: var(--color-primary); /* inner circle */`}
      whenToUse={[
        'Para escolhas mutuamente exclusivas (apenas uma opção)',
        'Para métodos de pagamento (crédito, débito, PIX)',
        'Para tipos de transação (despesa, receita, transferência)',
        'Quando há 2-6 opções para escolher'
      ]}
      whenNotToUse={[
        'Para múltiplas seleções simultâneas (use Checkbox)',
        'Para mais de 6 opções (use Select)',
        'Para ativar/desativar uma única opção (use Toggle)'
      ]}
    />
  );
}
