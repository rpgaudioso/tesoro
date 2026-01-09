import { ChevronRight, LucideIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './TreeView.module.css';

export interface TreeViewProps {
  children: ReactNode;
}

export interface TreeNodeProps {
  label: string;
  icon?: LucideIcon;
  children?: ReactNode;
  defaultExpanded?: boolean;
  onSelect?: () => void;
}

export function TreeView({ children }: TreeViewProps) {
  return <div className={styles.treeView}>{children}</div>;
}

export function TreeNode({ label, icon: Icon, children, defaultExpanded = false, onSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = !!children;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className={styles.treeNode}>
      <button
        className={`${styles.nodeButton} ${!hasChildren ? styles.leaf : ''}`}
        onClick={handleClick}
        type="button"
      >
        {hasChildren && (
          <ChevronRight
            size={16}
            className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
          />
        )}
        {Icon && <Icon size={16} className={styles.icon} />}
        <span className={styles.label}>{label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div className={styles.children}>{children}</div>
      )}
    </div>
  );
}
