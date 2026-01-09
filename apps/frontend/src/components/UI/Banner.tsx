import { X } from 'lucide-react';
import styles from './Banner.module.css';

export interface BannerProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  position?: 'top' | 'bottom';
}

export function Banner({
  message,
  variant = 'info',
  actionLabel,
  onAction,
  onClose,
  position = 'top',
}: BannerProps) {
  return (
    <div className={`${styles.banner} ${styles[variant]} ${styles[position]}`}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        {actionLabel && onAction && (
          <button type="button" onClick={onAction} className={styles.actionButton}>
            {actionLabel}
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
