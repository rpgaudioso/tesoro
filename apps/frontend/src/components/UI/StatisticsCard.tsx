import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './StatisticsCard.module.css';

export interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  footer?: ReactNode;
}

export function StatisticsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  color = 'primary',
  footer,
}: StatisticsCardProps) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {Icon && (
          <div className={styles.iconContainer}>
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        {trend && (
          <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
            {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      {description && <p className={styles.description}>{description}</p>}
      
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
