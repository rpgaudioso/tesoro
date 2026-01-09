import { Info, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './Toggletip.module.css';

export interface ToggletipProps {
  children: ReactNode;
  align?: 'top' | 'bottom' | 'left' | 'right';
}

export function Toggletip({ children, align = 'top' }: ToggletipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.toggletip}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Mais informações"
      >
        <Info size={16} />
      </button>
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={`${styles.content} ${styles[align]}`}>
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Fechar"
            >
              <X size={14} />
            </button>
            {children}
          </div>
        </>
      )}
    </div>
  );
}
