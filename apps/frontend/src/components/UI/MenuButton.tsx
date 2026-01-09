import { ChevronDown, LucideIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './MenuButton.module.css';

export interface MenuButtonProps {
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  kind?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export interface MenuButtonItemProps {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  danger?: boolean;
}

export function MenuButton({ label, icon: Icon, children, kind = 'primary', size = 'md' }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.menuButton}>
      <button
        className={`${styles.trigger} ${styles[kind]} ${styles[size]}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {Icon && <Icon size={16} />}
        <span>{label}</span>
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.menu}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export function MenuButtonItem({ label, icon: Icon, onClick, danger = false }: MenuButtonItemProps) {
  return (
    <button
      className={`${styles.menuItem} ${danger ? styles.danger : ''}`}
      onClick={onClick}
      type="button"
    >
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </button>
  );
}
