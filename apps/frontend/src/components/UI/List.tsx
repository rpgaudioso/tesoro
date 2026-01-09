import { ReactNode } from 'react';
import styles from './List.module.css';

export interface ListProps {
  children: ReactNode;
  ordered?: boolean;
  nested?: boolean;
}

export function List({ children, ordered = false, nested = false }: ListProps) {
  const Component = ordered ? 'ol' : 'ul';

  return (
    <Component className={`${styles.list} ${nested ? styles.nested : ''}`}>
      {children}
    </Component>
  );
}

export interface ListItemProps {
  children: ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return <li className={styles.listItem}>{children}</li>;
}
