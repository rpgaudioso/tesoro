import { useState } from 'react';
import { Input } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function InputDetailPage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <SimpleComponentPage
      title="Input"
      subtitle="Campo de entrada de texto com label e validação"
      overview="Text inputs permitem que usuários insiram texto livre em um campo. Suportam diferentes tipos (text, email, password, number, tel) e estados (error, disabled)."
      usage={
        <>
          <div>
            <h3 className="section-title">Estados</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <Input
                label="Nome completo"
                placeholder="Digite seu nome"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              
              <Input
                label="Email com erro"
                placeholder="email@exemplo.com"
                error="Email inválido"
              />
              
              <Input
                label="Campo desabilitado"
                value="Valor fixo"
                disabled
              />
              
              <Input
                label="Campo obrigatório"
                placeholder="Campo obrigatório"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="section-title">Tipos</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <Input
                type="email"
                label="Email"
                placeholder="seu@email.com"
              />
              
              <Input
                type="password"
                label="Senha"
                placeholder="••••••••"
              />
              
              <Input
                type="number"
                label="Quantidade"
                placeholder="0"
              />
              
              <Input
                type="tel"
                label="Telefone"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </>
      }
      installation="import { Input } from '@/components/UI';"
      basicExample={`<Input
  label="Nome"
  placeholder="Digite seu nome"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<Input
  label="Email"
  type="email"
  error="Email inválido"
/>`}
      propsCode={`interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}`}
      styleTokens={`padding: var(--spacing-8) var(--spacing-12);
border: 1px solid var(--color-border);
border-radius: var(--radius-6);
font-size: var(--font-sm);

/* Focus */
border-color: var(--color-primary);
outline: 2px solid var(--color-primary-light);

/* Error */
border-color: var(--color-danger);`}
      whenToUse={[
        'Para capturar texto livre do usuário',
        'Para formulários de cadastro e edição',
        'Para campos de busca simples',
        'Para entrada de dados estruturados (email, telefone)',
      ]}
      whenNotToUse={[
        'Para texto longo (use Textarea)',
        'Para seleção entre opções (use Select ou RadioButton)',
        'Para números com controles (use NumberInput)',
        'Para datas (use DatePicker)',
      ]}
    />
  );
}
