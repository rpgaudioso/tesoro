import { DollarSign } from 'lucide-react';
import { ChangeEvent, forwardRef } from 'react';
import styles from './CurrencyInput.module.css';

export interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  size?: 'small' | 'medium' | 'large';
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder = 'R$ 0,00', disabled, readOnly, error, label, hint, size = 'medium' }, ref) => {
    const formatCurrency = (val: string): string => {
      const numericValue = val.replace(/\D/g, '');
      if (!numericValue) return '';
      
      const number = parseFloat(numericValue) / 100;
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(number);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/\D/g, '');
      onChange(input);
    };

    const displayValue = formatCurrency(value);

    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={`${styles.inputWrapper} ${styles[size]} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''}`}>
          <div className={styles.icon}>
            <DollarSign size={16} />
          </div>
          <input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={styles.input}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
