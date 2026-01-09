import { useState } from 'react';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  label?: string;
  presetColors?: string[];
}

const DEFAULT_PRESETS = [
  '#F97316', // Orange
  '#EF4444', // Red
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#14B8A6', // Teal
  '#6366F1', // Indigo
  '#84CC16', // Lime
];

export function ColorPicker({
  value = '#F97316',
  onChange,
  label,
  presetColors = DEFAULT_PRESETS,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.colorDisplay}>
        <div
          className={styles.colorSwatch}
          style={{ backgroundColor: currentColor }}
        />
        <input
          type="text"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className={styles.colorInput}
          placeholder="#000000"
        />
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className={styles.nativePicker}
        />
      </div>

      <div className={styles.presets}>
        <span className={styles.presetsLabel}>Cores predefinidas:</span>
        <div className={styles.presetGrid}>
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className={`${styles.presetSwatch} ${
                currentColor === color ? styles.selected : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Selecionar cor ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
