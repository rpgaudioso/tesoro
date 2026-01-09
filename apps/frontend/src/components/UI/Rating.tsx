import { Star } from 'lucide-react';
import { useState } from 'react';
import styles from './Rating.module.css';

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
  showValue?: boolean;
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = 'medium',
  readOnly = false,
  showValue = false,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const displayValue = hoverValue ?? value;

  return (
    <div className={`${styles.rating} ${styles[size]} ${readOnly ? styles.readOnly : ''}`}>
      <div className={styles.stars}>
        {Array.from({ length: max }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.star} ${index < displayValue ? styles.filled : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            aria-label={`${index + 1} estrelas`}
          >
            <Star
              size={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
              fill={index < displayValue ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
      {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
    </div>
  );
}
