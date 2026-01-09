import { Circle } from 'lucide-react';
import styles from './Timeline.module.css';

export interface TimelineEvent {
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ComponentType<{ size?: number }>;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export interface TimelineProps {
  events: TimelineEvent[];
  compact?: boolean;
}

export function Timeline({ events, compact = false }: TimelineProps) {
  return (
    <div className={`${styles.timeline} ${compact ? styles.compact : ''}`}>
      {events.map((event, index) => {
        const IconComponent = event.icon || Circle;
        
        return (
          <div key={index} className={styles.item}>
            <div
              className={`${styles.marker} ${
                event.variant ? styles[event.variant] : styles.neutral
              }`}
            >
              <IconComponent size={14} />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.title}>{event.title}</h3>
                <time className={styles.timestamp}>{event.timestamp}</time>
              </div>
              {event.description && (
                <p className={styles.description}>{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
