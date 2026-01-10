import { Download, Edit, Eye, Trash2 } from 'lucide-react';
import { Dropdown, toast } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function DropdownDetailPage() {
  const items = [
    { label: 'Editar', value: 'edit', icon: <Edit size={16} />, onClick: () => toast.info('Editar selecionado') },
    { label: 'Visualizar', value: 'view', icon: <Eye size={16} />, onClick: () => toast.info('Visualizar selecionado') },
    { label: 'Baixar', value: 'download', icon: <Download size={16} />, onClick: () => toast.success('Download iniciado') },
    { label: 'Excluir', value: 'delete', icon: <Trash2 size={16} />, onClick: () => toast.error('Item excluído') },
  ];

  return (
    <SimpleComponentPage
      title="Dropdown"
      subtitle="Menu dropdown com ações"
      overview="Dropdown mostra um menu de ações ao clicar, ideal para ações em massa e menus contextuais."
      usage={
        <div>
          <h3 className="section-title">Exemplo Interativo</h3>
          <Dropdown trigger="Ações" items={items} />
        </div>
      }
      installation={`import { Dropdown } from '@/components/UI';`}
      basicExample={`const items = [
  { 
    label: 'Editar', 
    value: 'edit',
    icon: <Edit />,
    onClick: () => handleEdit() 
  }
];

<Dropdown trigger="Ações" items={items} />`}
      propsCode={`interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}`}
      styleTokens={`/* Menu */
min-width: 200px;
background: white;
border: 1px solid var(--color-border);
border-radius: var(--radius-md);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Item */
padding: 10px 16px;
cursor: pointer;
transition: background 0.2s;

/* Item hover */
background: var(--color-bg-secondary);`}
      whenToUse={[
        'Para ações contextuais em linhas de tabelas',
        'Em ações em massa que precisam economizar espaço',
        'Para menus de configurações e opções',
        'Quando há 3+ ações relacionadas'
      ]}
      whenNotToUse={[
        'Para navegação principal (use Tabs)',
        'Quando há apenas 1 ou 2 ações (use Buttons)',
        'Para formulários de seleção (use Select)',
        'Quando as ações precisam estar sempre visíveis'
      ]}
    />
  );
}
