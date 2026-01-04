import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  showLabel = true,
  height = 'md',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  let computedVariant = variant;
  if (variant === 'primary') {
    if (percentage >= 100) computedVariant = 'danger';
    else if (percentage >= 80) computedVariant = 'warning';
    else computedVariant = 'success';
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.bar} ${styles[height]}`}>
        <div
          className={`${styles.fill} ${styles[computedVariant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
}
