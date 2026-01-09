import { InputHTMLAttributes } from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function RadioButton({ label, id, className = '', ...props }: RadioButtonProps) {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.radioContainer} ${className}`}>
      <input
        type="radio"
        id={radioId}
        className={styles.radioInput}
        {...props}
      />
      {label && (
        <label htmlFor={radioId} className={styles.radioLabel}>
          {label}
        </label>
      )}
    </div>
  );
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  orientation = 'vertical',
}: RadioGroupProps) {
  return (
    <div className={`${styles.radioGroup} ${styles[orientation]}`}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          disabled={option.disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ))}
    </div>
  );
}
