import { Sparkles } from 'lucide-react';
import styles from './AILabel.module.css';

export interface AILabelProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline';
}

export function AILabel({ text = 'AI', size = 'md', variant = 'default' }: AILabelProps) {
  return (
    <span className={`${styles.aiLabel} ${styles[size]} ${styles[variant]}`}>
      <Sparkles className={styles.icon} size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
      {text}
    </span>
  );
}
