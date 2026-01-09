import { Bell, Check, Trash2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    useDeleteNotification,
    useMarkAllNotificationsAsRead,
    useMarkNotificationAsRead,
    useNotifications,
} from '../../hooks/useNotifications';
import styles from './NotificationPanel.module.css';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({
  isOpen,
  onClose,
}: NotificationPanelProps) {
  const { currentWorkspaceId } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useNotifications(currentWorkspaceId);
  const markAsRead = useMarkNotificationAsRead(currentWorkspaceId || '');
  const markAllAsRead = useMarkAllNotificationsAsRead(currentWorkspaceId || '');
  const deleteNotification = useDeleteNotification(currentWorkspaceId || '');

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNotificationClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead.mutate(notificationId);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  const handleDelete = (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.stopPropagation();
    deleteNotification.mutate(notificationId);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.notificationPanel} ref={panelRef}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notificações</h3>
        <div className={styles.headerActions}>
          {unreadCount > 0 && (
            <button
              className={styles.actionButton}
              onClick={handleMarkAllAsRead}
              title="Marcar todas como lidas"
            >
              <Check size={16} />
              Marcar todas
            </button>
          )}
          <button
            className={styles.actionButton}
            onClick={onClose}
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bell size={32} />
            </div>
            <div className={styles.emptyTitle}>Nenhuma notificação</div>
            <div className={styles.emptyMessage}>
              Você está em dia! Não há notificações no momento.
            </div>
          </div>
        ) : (
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  !notification.isRead ? styles.unread : ''
                }`}
                onClick={() =>
                  handleNotificationClick(notification.id, notification.isRead)
                }
              >
                <div className={styles.notificationIcon}>
                  <Bell size={20} />
                </div>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationTitle}>
                    {notification.title}
                  </div>
                  <div className={styles.notificationMessage}>
                    {notification.message}
                  </div>
                  <div className={styles.notificationTime}>
                    {formatTime(notification.createdAt)}
                  </div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => handleDelete(e, notification.id)}
                  title="Excluir notificação"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
