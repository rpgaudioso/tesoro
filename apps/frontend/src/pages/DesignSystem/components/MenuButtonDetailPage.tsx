import { Download, Share2, Trash2 } from 'lucide-react';
import { MenuButton, MenuButtonItem, toast } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function MenuButtonDetailPage() {
  return (
    <SimpleComponentPage
      title="Menu Button"
      subtitle="Botão com menu dropdown de ações"
      overview="Menu Button combina um botão com um menu dropdown, permitindo agrupar múltiplas ações relacionadas em um único componente interativo."
      usage={
        <>
          <div className="card">
            <h3 className="section-title">Variantes</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <MenuButton label="Ações" kind="primary">
                <MenuButtonItem label="Baixar" icon={Download} onClick={() => toast.success('Download iniciado')} />
                <MenuButtonItem label="Compartilhar" icon={Share2} onClick={() => toast.info('Compartilhado')} />
                <MenuButtonItem label="Excluir" icon={Trash2} onClick={() => toast.error('Item excluído')} danger />
              </MenuButton>
              <MenuButton label="Opções" kind="secondary">
                <MenuButtonItem label="Editar" onClick={() => {}} />
                <MenuButtonItem label="Duplicar" onClick={() => {}} />
                <MenuButtonItem label="Remover" onClick={() => {}} danger />
              </MenuButton>
            </div>
          </div>
          <div className="card">
            <h3 className="section-title">Com Ícone</h3>
            <MenuButton label="Baixar" icon={Download} kind="primary">
              <MenuButtonItem label="PDF" onClick={() => {}} />
              <MenuButtonItem label="CSV" onClick={() => {}} />
              <MenuButtonItem label="Excel" onClick={() => {}} />
            </MenuButton>
          </div>
        </>
      }
      installation="import { MenuButton, MenuButtonItem } from '@/components/UI';"
      basicExample={`<MenuButton label="Ações" kind="primary">
  <MenuButtonItem 
    label="Baixar" 
    icon={Download} 
    onClick={() => console.log('baixar')} 
  />
  <MenuButtonItem 
    label="Excluir" 
    icon={Trash2} 
    onClick={() => console.log('excluir')} 
    danger 
  />
</MenuButton>`}
      propsCode={`interface MenuButtonProps {
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  kind?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

interface MenuButtonItemProps {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  danger?: boolean;
}`}
      styleTokens={`padding: var(--spacing-8) var(--spacing-16);
border-radius: var(--radius-6);
font-size: var(--font-sm);
box-shadow: var(--shadow-lg);`}
      whenToUse={[
        'Para agrupar ações relacionadas',
        'Para menus de contexto',
        'Para economizar espaço na interface',
      ]}
      whenNotToUse={[
        'Para navegação (use Dropdown)',
        'Para seleção de opções (use Select)',
        'Para apenas 1-2 ações (use Button)',
      ]}
    />
  );
}
