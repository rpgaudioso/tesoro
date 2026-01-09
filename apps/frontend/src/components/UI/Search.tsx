import { Search as SearchIcon, X } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import styles from './Search.module.css';

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export function Search({ onClear, showClearButton = true, value, ...props }: SearchProps) {
  const hasValue = value && String(value).length > 0;

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} size={16} />
      <input
        type="search"
        className={styles.searchInput}
        value={value}
        {...props}
      />
      {showClearButton && hasValue && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
