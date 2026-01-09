import { ReactNode } from 'react';
import styles from './ContentSwitcher.module.css';

export interface ContentSwitcherOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface ContentSwitcherProps {
  options: ContentSwitcherOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ContentSwitcher({ options, value, onChange, size = 'md' }: ContentSwitcherProps) {
  return (
    <div className={`${styles.switcher} ${styles[size]}`} role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={`${styles.option} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
