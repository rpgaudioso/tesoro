import { Bell, CreditCard, LayoutDashboard, Menu, Settings, Tag, TrendingUp, Upload, Wallet } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import UserMenu from './UserMenu';

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

        <nav className={styles.topNav}>
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/app/transactions"
            className={({ isActive }) =>
              `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`
            }
          >
            <TrendingUp size={18} />
            <span>Transações</span>
          </NavLink>
          <NavLink
            to="/app/imports"
            className={({ isActive }) =>
              `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`
            }
          >
            <Upload size={18} />
            <span>Importar</span>
          </NavLink>
        </nav>

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
              to="/app/cards"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Cartões"
            >
              <CreditCard size={20} />
              {!sidebarCollapsed && <span>Cartões</span>}
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
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Configurações"
            >
              <Settings size={20} />
              {!sidebarCollapsed && <span>Configurações</span>}
            </NavLink>
          </nav>

          <div className={styles.sidebarFooter}>
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              title="Configurações"
            >
              <Settings size={20} />
              {!sidebarCollapsed && <span>Configurações</span>}
            </NavLink>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
