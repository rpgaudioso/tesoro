import { Bell, Settings, User } from 'lucide-react';
import { Card, Tabs } from '../../../components/UI';
import SimpleComponentPage from './SimpleComponentPage';

export default function TabsDetailPage() {
  const tabs = [
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User size={16} />,
      content: <div style={{ padding: '16px' }}>Conteúdo do perfil aqui</div>
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: <Settings size={16} />,
      content: <div style={{ padding: '16px' }}>Configurações do sistema</div>
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: <Bell size={16} />,
      content: <div style={{ padding: '16px' }}>Central de notificações</div>
    }
  ];

  return (
    <SimpleComponentPage
      title="Tabs"
      subtitle="Navegação por abas para organizar conteúdo"
      overview="Tabs permitem alternar entre diferentes visualizações no mesmo espaço, ideal para dashboards e páginas detalhadas."
      usage={
        <Card>
          <h2>Exemplo Interativo</h2>
          <div style={{ marginTop: '16px' }}>
            <Tabs tabs={tabs} defaultTab="profile" />
          </div>
        </Card>
      }
      installation={`import { Tabs } from '@/components/UI';`}
      basicExample={`const tabs = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Conteúdo 1</div>
  }
];

<Tabs tabs={tabs} defaultTab="tab1" />`}
      propsCode={`interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}`}
      styleTokens={`/* Tab */
padding: 12px 16px;
border-bottom: 2px solid transparent;
color: var(--color-text-secondary);

/* Active */
color: var(--color-primary);
border-bottom-color: var(--color-primary);

/* Content Animation */
animation: fadeIn 0.2s;`}
    />
  );
}
