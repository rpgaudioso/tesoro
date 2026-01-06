import { Bell, LayoutDashboard, Menu, RotateCcw, Search, Tag, TrendingUp, Upload, Wallet } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AppLayout.module.css';
import ResetDataModal from './ResetDataModal';
import UserMenu from './UserMenu';

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const { workspaces } = useAuth();
  const navigate = useNavigate();

  // Check if user needs onboarding
  if (workspaces.length === 0) {
    navigate('/app/welcome', { replace: true });
    return null;
  }

  return (
    <div className={styles.layout}>
      {/* Top Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.menuButton}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu size={20} />
          </button>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <span className={styles.logoText}>Tesoro</span>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar transações, categorias..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.headerRight}>
          <button className={styles.iconButton} title="Notificações">
            <Bell size={20} />
          </button>
          <UserMenu />
        </div>
      </header>

      <div className={styles.container}>
        {/* Left Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
          <nav className={styles.sidebarNav}>
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Dashboard"
            >
              <LayoutDashboard size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink
              to="/app/transactions"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Transações"
            >
              <TrendingUp size={20} />
              {!sidebarCollapsed && <span>Transações</span>}
            </NavLink>
            <NavLink
              to="/app/imports"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Importar"
            >
              <Upload size={20} />
              {!sidebarCollapsed && <span>Importar</span>}
            </NavLink>
            <NavLink
              to="/app/budgets"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Orçamentos"
            >
              <Wallet size={20} />
              {!sidebarCollapsed && <span>Orçamentos</span>}
            </NavLink>
            <NavLink
              to="/app/categories"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Categorias"
            >
              <Tag size={20} />
              {!sidebarCollapsed && <span>Categorias</span>}
            </NavLink>
            
            <div className={styles.sidebarDivider}></div>
            
            <button
              className={styles.sidebarLink}
              onClick={() => setShowResetModal(true)}
              title="Resetar Dados"
            >
              <RotateCcw size={20} />
              {!sidebarCollapsed && <span>RESET</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      {showResetModal && (
        <ResetDataModal onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
}
