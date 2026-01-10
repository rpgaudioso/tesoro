import { Info } from 'lucide-react';
import { Button, Tooltip } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TooltipDetailPage() {
  return (
    <SimpleComponentPage
      title="Tooltip"
      subtitle="Dicas contextuais ao passar o mouse"
      overview="Tooltip mostra informações adicionais ao passar o mouse, ideal para explicar ícones e funcionalidades."
      usage={
        <>
          <div>
            <h3 className="section-title">Posições</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Tooltip content="Dica no topo" position="top">
                <Button>Top</Button>
              </Tooltip>
              <Tooltip content="Dica embaixo" position="bottom">
                <Button>Bottom</Button>
              </Tooltip>
              <Tooltip content="Dica à esquerda" position="left">
                <Button>Left</Button>
              </Tooltip>
              <Tooltip content="Dica à direita" position="right">
                <Button>Right</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <h3 className="section-title">Com ícone</h3>
            <Tooltip content="Clique para mais informações">
              <Info size={20} style={{ cursor: 'pointer' }} />
            </Tooltip>
          </div>
        </>
      }
      installation={`import { Tooltip } from '@/components/UI';`}
      basicExample={`<Tooltip content="Dica útil" position="top">
  <Button>Hover aqui</Button>
</Tooltip>`}
      propsCode={`interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}`}
      styleTokens={`background: var(--color-text-primary);
color: white;
padding: 6px 12px;
border-radius: 4px;
font-size: 13px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);`}
      whenToUse={[
        'Para explicar ícones e abreviações',
        'Com informações complementares curtas',
        'Para dicas de atalhos de teclado',
        'Quando hover for uma ação natural'
      ]}
      whenNotToUse={[
        'Para informações críticas',
        'Com textos longos (use Popover)',
        'Em dispositivos touch (não há hover)',
        'Para conteúdo interativo (use Toggletip)'
      ]}
    />
  );
}
