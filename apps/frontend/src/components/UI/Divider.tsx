import styles from './Divider.module.css';

interface DividerProps {
  spacing?: 'none' | 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Divider({ 
  spacing = 'medium', 
  orientation = 'horizontal',
  className = '' 
}: DividerProps) {
  return (
    <div 
      className={`${styles.divider} ${styles[spacing]} ${styles[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
