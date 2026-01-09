import { useState } from 'react';
import { Textarea } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TextareaDetailPage() {
  const [value, setValue] = useState('');
  
  return (
    <SimpleComponentPage
      title="Textarea"
      subtitle="Campo de texto multi-linha"
      overview="Textarea é usado para coletar textos longos e multi-linha dos usuários."
      usage={
        <div>
          <h3 className="section-title">Exemplo</h3>
          <Textarea
            label="Descrição"
            placeholder="Digite uma descrição detalhada..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            fullWidth
          />
        </div>
      }
      installation={`import { Textarea } from '@/components/UI';`}
      basicExample={`const [text, setText] = useState('');

<Textarea
  label="Observações"
  placeholder="Digite suas observações..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={4}
  fullWidth
/>`}
      propsCode={`interface TextareaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}`}
      styleTokens={`padding: var(--spacing-10) var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-6);
font-size: var(--font-base);
resize: vertical;`}
    />
  );
}
