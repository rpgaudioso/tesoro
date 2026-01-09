import { Check, X } from 'lucide-react';
import { useState } from 'react';
import styles from './MultiSelect.module.css';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  maxDisplay?: number;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Selecione...',
  maxDisplay = 3,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleToggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemove = (optionValue: string) => {
    onChange?.(value.filter((v) => v !== optionValue));
  };

  const displayText =
    selectedOptions.length === 0
      ? placeholder
      : selectedOptions.length <= maxDisplay
      ? selectedOptions.map((opt) => opt.label).join(', ')
      : `${selectedOptions.length} selecionados`;

  return (
    <div className={styles.container}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={value.length > 0 ? styles.hasValue : ''}>{displayText}</span>
      </div>

      {selectedOptions.length > 0 && (
        <div className={styles.selectedTags}>
          {selectedOptions.slice(0, maxDisplay).map((option) => (
            <div key={option.value} className={styles.tag}>
              <span>{option.label}</span>
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className={styles.tagRemove}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {selectedOptions.length > maxDisplay && (
            <div className={styles.tag}>+{selectedOptions.length - maxDisplay}</div>
          )}
        </div>
      )}

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            <div className={styles.options}>
              {filteredOptions.length === 0 ? (
                <div className={styles.noResults}>Nenhum resultado encontrado</div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        if (!option.disabled) {
                          handleToggleOption(option.value);
                          setSearchTerm('');
                        }
                      }}
                      disabled={option.disabled}
                      className={`${styles.option} ${isSelected ? styles.selected : ''} ${
                        option.disabled ? styles.disabled : ''
                      }`}
                    >
                      <div className={styles.checkbox}>
                        {isSelected && <Check size={14} />}
                      </div>
                      <span>{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
