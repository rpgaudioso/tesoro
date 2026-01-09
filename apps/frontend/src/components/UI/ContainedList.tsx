import { ReactNode } from 'react';
import styles from './ContainedList.module.css';

export interface ContainedListProps {
  children: ReactNode;
  header?: string;
  kind?: 'default' | 'disclosed';
}

export interface ContainedListItemProps {
  children: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
}

export function ContainedList({ children, header, kind = 'default' }: ContainedListProps) {
  return (
    <div className={`${styles.containedList} ${styles[kind]}`}>
      {header && <div className={styles.header}>{header}</div>}
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

export function ContainedListItem({ children, action, onClick }: ContainedListItemProps) {
  const Component = onClick ? 'button' : 'li';
  const props = onClick ? { onClick, type: 'button' as const } : {};

  return (
    <Component className={`${styles.listItem} ${onClick ? styles.clickable : ''}`} {...props}>
      <div className={styles.content}>{children}</div>
      {action && <div className={styles.action}>{action}</div>}
    </Component>
  );
}
