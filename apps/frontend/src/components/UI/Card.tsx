import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const classes = [styles.card, styles[`padding-${padding}`], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
