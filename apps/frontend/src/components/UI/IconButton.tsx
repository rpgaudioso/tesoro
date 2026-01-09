import styles from './IconButton.module.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function IconButton({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
