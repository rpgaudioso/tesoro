import styles from './Skeleton.module.css';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  width,
  height,
  variant = 'text',
  animation = 'pulse',
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${styles[animation]}`}
      style={style}
    />
  );
}

export interface SkeletonGroupProps {
  count?: number;
  spacing?: string;
  children?: React.ReactNode;
}

export function SkeletonGroup({ count = 3, spacing = 'var(--spacing-12)', children }: SkeletonGroupProps) {
  if (children) {
    return (
      <div className={styles.group} style={{ gap: spacing }}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.group} style={{ gap: spacing }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}
