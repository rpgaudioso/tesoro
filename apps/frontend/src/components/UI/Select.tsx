import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export default function Select({
  label,
  error,
  options,
  placeholder,
  fullWidth = false,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.error : ''}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
