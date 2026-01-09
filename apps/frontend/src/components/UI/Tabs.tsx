import { ReactNode, useState } from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export default function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={styles.container}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.content} role="tabpanel">
        {activeTabContent}
      </div>
    </div>
  );
}
