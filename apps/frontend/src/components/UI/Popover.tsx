import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popover.module.css';

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export function Popover({ trigger, content, position = 'bottom', align = 'center' }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      // Calculate position
      switch (position) {
        case 'top':
          top = triggerRect.top - popoverRect.height - 8;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          break;
        case 'left':
          left = triggerRect.left - popoverRect.width - 8;
          top = triggerRect.top;
          break;
        case 'right':
          left = triggerRect.right + 8;
          top = triggerRect.top;
          break;
      }

      // Calculate alignment
      if (position === 'top' || position === 'bottom') {
        switch (align) {
          case 'start':
            left = triggerRect.left;
            break;
          case 'center':
            left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
            break;
          case 'end':
            left = triggerRect.right - popoverRect.width;
            break;
        }
      }

      setCoords({ top, left });
    }
  }, [isOpen, position, align]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={styles.popover}
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
