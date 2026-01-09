import { Download, Edit, Eye, Trash2 } from 'lucide-react';
import { Card, Dropdown } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function DropdownDetailPage() {
  const items = [
    { label: 'Editar', value: 'edit', icon: <Edit size={16} />, onClick: () => alert('Editar') },
    { label: 'Visualizar', value: 'view', icon: <Eye size={16} />, onClick: () => alert('Visualizar') },
    { label: 'Baixar', value: 'download', icon: <Download size={16} />, onClick: () => alert('Baixar') },
    { label: 'Excluir', value: 'delete', icon: <Trash2 size={16} />, onClick: () => alert('Excluir') },
  ];

  return (
    <SimpleComponentPage
      title="Dropdown"
      subtitle="Menu dropdown com ações"
      overview="Dropdown mostra um menu de ações ao clicar, ideal para ações em massa e menus contextuais."
      usage={
        <Card>
          <h2>Exemplo Interativo</h2>
          <div style={{ marginTop: '16px' }}>
            <Dropdown trigger="Ações" items={items} />
          </div>
        </Card>
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

/* Item hover */
background: var(--color-bg-secondary);`}
    />
  );
}
