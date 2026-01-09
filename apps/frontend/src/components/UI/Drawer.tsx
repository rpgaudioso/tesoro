import { X } from 'lucide-react';
import { useEffect } from 'react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large';
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'medium',
  title,
  children,
  footer,
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.drawer} ${styles[position]} ${styles[size]}`}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        <div className={styles.content}>{children}</div>
        
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </>
  );
}
