import { ChevronDown } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}

export default function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleItemClick = (item: DropdownItem) => {
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      >
        {trigger}
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => handleItemClick(item)}
              className={styles.item}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
