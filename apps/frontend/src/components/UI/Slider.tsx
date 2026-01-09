import { InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  showValue = true,
  formatValue = (val) => String(val),
  onChange,
  ...props
}: SliderProps) {
  const [value, setValue] = useState(Number(controlledValue ?? defaultValue ?? min));

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(Number(controlledValue));
    }
  }, [controlledValue]);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(e);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-bg-secondary) ${percentage}%, var(--color-bg-secondary) 100%)`,
          }}
          {...props}
        />
      </div>
      {showValue && (
        <div className={styles.sliderValue}>{formatValue(value)}</div>
      )}
    </div>
  );
}
