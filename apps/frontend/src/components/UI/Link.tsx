import { AnchorHTMLAttributes, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, to, variant = 'primary', size = 'md', disabled = false, className = '', children, ...props }, ref) => {
    const classes = `${styles.link} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''} ${className}`;

    if (disabled) {
      return (
        <span ref={ref as any} className={classes}>
          {children}
        </span>
      );
    }

    if (to) {
      const { ...linkProps } = props;
      return (
        <RouterLink
          ref={ref as any}
          to={to}
          className={classes}
          {...(linkProps as any)}
        >
          {children}
        </RouterLink>
      );
    }

    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
