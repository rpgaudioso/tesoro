import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const { user, workspaces, currentWorkspace, selectWorkspace, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectWorkspace = (workspaceId: string) => {
    selectWorkspace(workspaceId);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/app/settings');
    setIsOpen(false);
  };

  return (
    <div className={styles.userMenuContainer} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Menu do usuário"
      >
        <div className={styles.userAvatar}>
          <span className={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {/* Seção de Workspaces */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Workspaces</div>
            <div className={styles.workspacesList}>
              {workspaces.length === 0 ? (
                <div className={styles.empty}>Nenhuma workspace</div>
              ) : (
                workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    className={`${styles.workspaceItem} ${
                      currentWorkspace?.id === ws.id ? styles.active : ''
                    }`}
                    onClick={() => handleSelectWorkspace(ws.id)}
                  >
                    <span className={styles.workspaceName}>{ws.name}</span>
                    <span className={styles.workspaceRole}>{ws.role}</span>
                    {currentWorkspace?.id === ws.id && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Separador */}
          <div className={styles.divider} />

          {/* Seção de Ações */}
          <div className={styles.section}>
            <button className={styles.actionItem} onClick={handleSettingsClick}>
              <Settings size={18} />
              <span>Configurações</span>
            </button>
            <button className={styles.actionItem} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>

          {/* Email do usuário no rodapé */}
          <div className={styles.footer}>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
}
