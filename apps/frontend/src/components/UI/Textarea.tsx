import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export default function Textarea({
  label,
  error,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ''} ${styles[`resize-${resize}`]}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
