import { CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function ButtonDetailPage() {
  return (
    <SimpleComponentPage
      title="Button"
      subtitle="Botão padrão com múltiplas variantes e tamanhos"
      overview="Botões são usados para iniciar ações, seja enviando um formulário, abrindo um modal, navegando para outra página ou confirmando uma decisão."
      usage={
        <>
          <div>
            <h3 className="section-title">Variantes</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Diferentes variantes comunicam diferentes níveis de ênfase e propósito.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Primary</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Ação principal de alta ênfase. Use apenas um por página/seção.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="primary" disabled>Primary Disabled</Button>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Secondary</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Ação secundária de média ênfase. Use para ações complementares.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="secondary" disabled>Secondary Disabled</Button>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Danger</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Para ações destrutivas como excluir ou remover.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="danger">Delete</Button>
                  <Button variant="danger" disabled>Delete Disabled</Button>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Ghost</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Ação de baixa ênfase, geralmente para ações terciárias.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="ghost" disabled>Ghost Disabled</Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-title">Tamanhos</h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium (default)</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          <div>
            <h3 className="section-title">Com Ícones</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary">
                <CheckCircle size={18} />
                Salvar
              </Button>
              <Button variant="secondary">
                <Edit2 size={18} />
                Editar
              </Button>
              <Button variant="danger">
                <Trash2 size={18} />
                Excluir
              </Button>
            </div>
          </div>
        </>
      }
      installation="import { Button } from '@/components/UI';"
      basicExample={`<Button variant="primary">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Cancel</Button>`}
      propsCode={`interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}`}
      styleTokens={`padding: var(--spacing-8) var(--spacing-16);
border-radius: var(--radius-6);
font-size: var(--font-sm);
font-weight: var(--font-medium);
transition: all 0.2s;

/* Primary */
background: var(--color-primary);
color: white;

/* Secondary */
background: var(--color-bg-secondary);
color: var(--color-text);`}
      whenToUse={[
        'Para submeter formulários',
        'Para confirmar ou cancelar ações',
        'Para navegação entre páginas ou seções',
        'Para iniciar processos ou ações do usuário',
      ]}
      whenNotToUse={[
        'Para navegação simples (use Link)',
        'Para ações sutis em toolbars (use IconButton)',
      ]}
    />
  );
}
