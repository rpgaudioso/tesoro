import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export default function Checkbox({
  label,
  error,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={`${styles.checkbox} ${error ? styles.error : ''}`}
          {...props}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
