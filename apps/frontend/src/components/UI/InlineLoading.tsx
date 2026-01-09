import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './InlineLoading.module.css';

export interface InlineLoadingProps {
  loading?: boolean;
  description?: string;
  success?: boolean;
  successDescription?: string;
  children?: ReactNode;
}

export function InlineLoading({
  loading = false,
  description = 'Carregando...',
  success = false,
  successDescription = 'Concluído',
  children,
}: InlineLoadingProps) {
  if (!loading && !success && !children) {
    return null;
  }

  return (
    <div className={styles.inlineLoading}>
      {loading && (
        <>
          <Loader2 className={styles.spinner} size={16} />
          <span className={styles.description}>{description}</span>
        </>
      )}
      {success && !loading && (
        <>
          <svg
            className={styles.successIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.successDescription}>{successDescription}</span>
        </>
      )}
      {!loading && !success && children}
    </div>
  );
}
