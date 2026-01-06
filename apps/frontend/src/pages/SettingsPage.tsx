import AccountsList from '@/components/Settings/AccountsList';
import PeopleList from '@/components/Settings/PeopleList';
import WorkspaceList from '@/components/Settings/WorkspaceList';
import { useState } from 'react';
import styles from './SettingsPage.module.css';

type Tab = 'workspaces' | 'people' | 'accounts';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('workspaces');

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>⚙️ Configurações</h1>
        <p>Gerencie suas workspaces, pessoas e contas</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'workspaces' ? styles.active : ''}`}
          onClick={() => setActiveTab('workspaces')}
        >
          📦 Workspaces
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'people' ? styles.active : ''}`}
          onClick={() => setActiveTab('people')}
        >
          👤 Pessoas
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'accounts' ? styles.active : ''}`}
          onClick={() => setActiveTab('accounts')}
        >
          🏦 Contas
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'workspaces' && <WorkspaceList />}
        {activeTab === 'people' && <PeopleList />}
        {activeTab === 'accounts' && <AccountsList />}
      </div>
    </div>
  );
}
