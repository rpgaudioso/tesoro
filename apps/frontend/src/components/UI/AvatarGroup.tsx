import styles from './AvatarGroup.module.css';

export interface AvatarGroupUser {
  name: string;
  photoUrl?: string;
  color?: string;
}

export interface AvatarGroupProps {
  users: AvatarGroupUser[];
  max?: number;
  size?: 'small' | 'medium' | 'large';
  spacing?: 'default' | 'compact';
}

export function AvatarGroup({ users, max = 4, size = 'medium', spacing = 'default' }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  const getInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getColor = (name: string): string => {
    const colors = [
      '#F97316',
      '#EF4444',
      '#10B981',
      '#3B82F6',
      '#8B5CF6',
      '#EC4899',
      '#F59E0B',
      '#14B8A6',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`${styles.group} ${styles[size]} ${styles[spacing]}`}>
      {displayUsers.map((user, index) => (
        <div
          key={index}
          className={styles.avatar}
          style={{
            backgroundColor: user.color || getColor(user.name),
            zIndex: displayUsers.length - index,
          }}
          title={user.name}
        >
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.name} className={styles.image} />
          ) : (
            <span className={styles.initials}>{getInitials(user.name)}</span>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={`${styles.avatar} ${styles.more}`}>
          <span className={styles.moreText}>+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}
