import { useEffect, useRef, useState } from 'react';
import styles from './AutoComplete.module.css';

export interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  allowCreate?: boolean;
  minChars?: number;
  maxSuggestions?: number;
}

export function AutoComplete({
  value,
  onChange,
  options,
  label,
  placeholder = 'Digite para buscar...',
  hint,
  error,
  disabled = false,
  loading = false,
  size = 'medium',
  allowCreate = false,
  minChars = 0,
  maxSuggestions = 10,
}: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, maxSuggestions);

  const shouldShowOptions = inputValue.length >= minChars && filteredOptions.length > 0;

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !shouldShowOptions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (allowCreate && inputValue) {
          onChange(inputValue);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${styles.input} ${styles[size]} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''}`}
        />
        {loading && <div className={styles.loading}>Carregando...</div>}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}

      {isOpen && shouldShowOptions && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`${styles.option} ${
                  index === highlightedIndex ? styles.highlighted : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
