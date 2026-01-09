import { Button, Card, Popover } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function PopoverDetailPage() {
  return (
    <SimpleComponentPage
      title="Popover"
      subtitle="Conteúdo flutuante contextual"
      overview="Popover exibe conteúdo adicional em uma camada flutuante sobre o conteúdo principal, ideal para detalhes rápidos e mini-formulários."
      usage={
        <Card>
          <h2>Exemplo Básico</h2>
          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Popover
              trigger={<Button variant="secondary">Abrir Popover</Button>}
              content={
                <div>
                  <h4 style={{ margin: '0 0 8px 0' }}>Detalhes da Transação</h4>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Valor: R$ 150,00<br />
                    Categoria: Alimentação<br />
                    Data: 09/01/2026
                  </p>
                </div>
              }
            />
            <Popover
              trigger={<Button variant="primary">Info (Top)</Button>}
              content={<div>Conteúdo no topo</div>}
              position="top"
            />
            <Popover
              trigger={<Button>Info (Right)</Button>}
              content={<div>Conteúdo à direita</div>}
              position="right"
            />
          </div>
        </Card>
      }
      installation={`import { Popover } from '@/components/UI';`}
      basicExample={`<Popover
  trigger={<Button>Abrir</Button>}
  content={<div>Conteúdo do popover</div>}
  position="bottom"
  align="center"
/>`}
      propsCode={`interface PopoverProps {
  trigger: ReactNode;      // Elemento que abre o popover
  content: ReactNode;       // Conteúdo do popover
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}`}
      styleTokens={`background: var(--color-bg);
border: 1px solid var(--color-border);
border-radius: var(--radius-8);
padding: var(--spacing-12);
box-shadow: var(--shadow-lg);`}
      whenToUse={[
        'Para exibir detalhes adicionais de um item sem navegar',
        'Para mini-formulários contextuais',
        'Para informações complementares que não cabem em um tooltip',
        'Para ações rápidas relacionadas a um elemento específico'
      ]}
      whenNotToUse={[
        'Para conteúdo extenso (use Modal)',
        'Para navegação principal (use Menu/Dropdown)',
        'Para informações críticas que precisam ser sempre visíveis'
      ]}
    />
  );
}
