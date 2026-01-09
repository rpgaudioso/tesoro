import { Check, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './Tile.module.css';

export interface TileProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
}

export function Tile({ children, onClick, selected = false, disabled = false, icon: Icon }: TileProps) {
  const Component = onClick ? 'button' : 'div';
  const props = onClick ? { onClick, type: 'button' as const, disabled } : {};

  return (
    <Component
      className={`${styles.tile} ${onClick ? styles.clickable : ''} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
      {...props}
    >
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon size={24} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {selected && (
        <div className={styles.checkmark}>
          <Check size={20} />
        </div>
      )}
    </Component>
  );
}

export interface TileTitleProps {
  children: ReactNode;
}

export function TileTitle({ children }: TileTitleProps) {
  return <h3 className={styles.title}>{children}</h3>;
}

export interface TileDescriptionProps {
  children: ReactNode;
}

export function TileDescription({ children }: TileDescriptionProps) {
  return <p className={styles.description}>{children}</p>;
}
