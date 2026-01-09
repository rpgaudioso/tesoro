import { useState } from 'react';
import { Checkbox } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function CheckboxDetailPage() {
  const [checked, setChecked] = useState(false);
  
  return (
    <SimpleComponentPage
      title="Checkbox"
      subtitle="Checkbox estilizado com label integrado"
      overview="Checkboxes permitem que usuários selecionem uma ou múltiplas opções de uma lista."
      usage={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox 
            label="Checkbox marcado" 
            checked={checked} 
            onChange={(e) => setChecked(e.target.checked)} 
          />
          <Checkbox label="Checkbox desmarcado" checked={false} onChange={() => {}} />
          <Checkbox label="Com erro" checked={false} error="Obrigatório" onChange={() => {}} />
        </div>
      }
      installation={`import { Checkbox } from '@/components/UI';`}
      basicExample={`const [accepted, setAccepted] = useState(false);

<Checkbox
  label="Aceito os termos"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`}
      propsCode={`interface CheckboxProps {
  label?: string;
  checked: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}`}
      styleTokens={`/* Checkbox */
width: 20px;
height: 20px;
border: 2px solid var(--color-border);
border-radius: var(--radius-4);

/* Checked */
background: var(--color-primary);
border-color: var(--color-primary);`}
    />
  );
}
