import { X } from 'lucide-react';
import styles from './Tag.module.css';

interface TagProps {
  children: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export default function Tag({ children, onRemove, variant = 'default' }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className={styles.removeButton}
          aria-label="Remover tag"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
}
