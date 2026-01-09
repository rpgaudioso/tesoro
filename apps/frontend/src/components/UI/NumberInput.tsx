import { Minus, Plus } from 'lucide-react';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './NumberInput.module.css';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
}

export function NumberInput({
  value: controlledValue,
  onChange,
  min,
  max,
  step = 1,
  showControls = true,
  disabled,
  ...props
}: NumberInputProps) {
  const [value, setValue] = useState(controlledValue ?? 0);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleIncrement = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.numberInputContainer}>
      {showControls && (
        <button
          type="button"
          className={styles.controlButton}
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          aria-label="Diminuir"
        >
          <Minus size={14} />
        </button>
      )}
      <input
        type="number"
        className={styles.numberInput}
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        {...props}
      />
      {showControls && (
        <button
          type="button"
          className={styles.controlButton}
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          aria-label="Aumentar"
        >
          <Plus size={14} />
        </button>
      )}
    </div>
  );
}
