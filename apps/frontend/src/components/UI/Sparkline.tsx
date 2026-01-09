import styles from './Sparkline.module.css';

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  showTooltip?: boolean;
}

export function Sparkline({
  data,
  color = 'var(--color-primary)',
  height = 32,
  showTooltip = false,
}: SparklineProps) {
  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = ((max - value) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className={styles.line}
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((max - value) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className={styles.point}
            >
              {showTooltip && <title>{value}</title>}
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
