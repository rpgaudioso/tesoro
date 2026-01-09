import styles from './Toggle.module.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={`${styles.switch} ${checked ? styles.checked : ''}`}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
