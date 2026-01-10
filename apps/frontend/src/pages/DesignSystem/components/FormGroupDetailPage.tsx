import { FormGroup, Input } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function FormGroupDetailPage() {
  return (
    <SimpleComponentPage
      title="FormGroup"
      subtitle="Wrapper para campos de formulário com label e mensagem de erro"
      overview="FormGroup agrupa labels, campos de entrada e mensagens de validação de forma consistente."
      usage={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FormGroup label="Nome Completo">
            <Input placeholder="Digite seu nome" />
          </FormGroup>
          <FormGroup label="E-mail" error="E-mail inválido">
            <Input type="email" defaultValue="invalid@" />
          </FormGroup>
          <FormGroup label="Senha">
            <Input type="password" placeholder="••••••••" />
          </FormGroup>
        </div>
      }
      installation={`import { FormGroup, Input } from '@/components/UI';`}
      basicExample={`<FormGroup label="E-mail" error="Campo obrigatório">
  <Input type="email" />
</FormGroup>`}
      propsCode={`interface FormGroupProps {
  label: string;
  error?: string;
  children: ReactNode;
}`}
      styleTokens={`/* Label */
font-weight: 500;
margin-bottom: var(--space-2);
color: var(--color-text-primary);

/* Error */
color: var(--color-danger);
font-size: 14px;
margin-top: var(--space-1);`}
      whenToUse={[
        'Para agrupar label + input em formulários',
        'Quando precisar mostrar mensagens de erro',
        'Para manter consistência em layouts de formulários',
        'Com qualquer tipo de campo de entrada'
      ]}
      whenNotToUse={[
        'Para campos inline sem label',
        'Em filtros de busca simples',
        'Quando o label for redundante',
        'Para checkboxes e radios (já têm label integrado)'
      ]}
    />
  );
}
