import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  onClose: (id: string) => void;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

function Toast({ id, type, title, message, onClose }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} size={20} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          <button
            className={styles.closeButton}
            onClick={() => onClose(id)}
            type="button"
            aria-label="Fechar notificação"
          >
            <X size={16} />
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

// Toast Manager (singleton pattern)
class ToastManager {
  private listeners: Array<(toasts: ToastMessage[]) => void> = [];
  private toasts: ToastMessage[] = [];

  subscribe(listener: (toasts: ToastMessage[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(type: ToastType, title: string, message?: string, duration?: number) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastMessage = { id, type, title, message, duration };
    this.toasts.push(toast);
    this.notify();

    // Auto remove after duration
    const timeout = duration || 5000;
    setTimeout(() => {
      this.remove(id);
    }, timeout);

    return id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

export const toastManager = new ToastManager();

// Toast Provider Component
export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const handleClose = (id: string) => {
    toastManager.remove(id);
  };

  return <ToastContainer toasts={toasts} onClose={handleClose} />;
}

// Toast API (compatible with sonner)
export const toast = {
  success: (message: string, duration?: number) => {
    return toastManager.add('success', message, duration);
  },
  error: (message: string, duration?: number) => {
    return toastManager.add('error', message, duration);
  },
  warning: (message: string, duration?: number) => {
    return toastManager.add('warning', message, duration);
  },
  info: (message: string, duration?: number) => {
    return toastManager.add('info', message, duration);
  },
};
