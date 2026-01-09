import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className={styles.item}>
            <button
              onClick={() => toggleItem(item.id)}
              className={styles.header}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{item.title}</span>
              <ChevronDown
                size={20}
                className={`${styles.icon} ${isOpen ? styles.open : ''}`}
              />
            </button>
            {isOpen && <div className={styles.content}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
