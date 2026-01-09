import styles from './StatusIndicator.module.css';

export interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  label?: string;
  size?: 'small' | 'medium' | 'large';
  pulse?: boolean;
}

export function StatusIndicator({
  status,
  label,
  size = 'medium',
  pulse = false,
}: StatusIndicatorProps) {
  return (
    <div className={`${styles.indicator} ${styles[size]}`}>
      <div
        className={`${styles.dot} ${styles[status]} ${pulse ? styles.pulse : ''}`}
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
