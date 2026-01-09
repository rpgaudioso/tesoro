import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './Notification.module.css';

export interface NotificationProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  actions?: ReactNode;
  inline?: boolean;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export function Notification({
  variant = 'info',
  title,
  subtitle,
  children,
  onClose,
  actions,
  inline = false,
}: NotificationProps) {
  const Icon = icons[variant];

  return (
    <div className={`${styles.notification} ${styles[variant]} ${inline ? styles.inline : ''}`} role="alert">
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} size={20} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          {onClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Fechar notificação"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.body}>{children}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}
