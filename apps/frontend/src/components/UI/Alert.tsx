import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './Alert.module.css';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  children: ReactNode;
  onClose?: () => void;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  danger: XCircle,
};

export default function Alert({ variant = 'info', children, onClose }: AlertProps) {
  const Icon = iconMap[variant];

  return (
    <div className={`${styles.alert} ${styles[variant]}`}>
      <div className={styles.icon}>
        <Icon size={20} />
      </div>
      <div className={styles.content}>{children}</div>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}
