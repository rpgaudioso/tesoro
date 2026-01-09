import { ReactNode } from 'react';
import styles from './FormGroup.module.css';

export interface FormGroupProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function FormGroup({
  label,
  error,
  required = false,
  children,
  fullWidth = false,
  className = '',
}: FormGroupProps) {
  return (
    <div className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
