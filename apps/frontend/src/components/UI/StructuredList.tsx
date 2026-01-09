import { ReactNode } from 'react';
import styles from './StructuredList.module.css';

export interface StructuredListProps {
  children: ReactNode;
  condensed?: boolean;
  flush?: boolean;
}

export interface StructuredListRowProps {
  children: ReactNode;
  head?: boolean;
}

export interface StructuredListCellProps {
  children: ReactNode;
  head?: boolean;
}

export function StructuredList({ children, condensed = false, flush = false }: StructuredListProps) {
  return (
    <div className={`${styles.structuredList} ${condensed ? styles.condensed : ''} ${flush ? styles.flush : ''}`}>
      {children}
    </div>
  );
}

export function StructuredListRow({ children, head = false }: StructuredListRowProps) {
  return (
    <div className={`${styles.row} ${head ? styles.head : ''}`}>
      {children}
    </div>
  );
}

export function StructuredListCell({ children, head = false }: StructuredListCellProps) {
  return (
    <div className={`${styles.cell} ${head ? styles.headCell : ''}`}>
      {children}
    </div>
  );
}
