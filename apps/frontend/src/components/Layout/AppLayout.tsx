import { useAuth } from '@/contexts/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const { currentWorkspace, logout } = useAuth();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>💰 Tesoro</h1>
          {currentWorkspace && (
            <p className={styles.workspaceName}>{currentWorkspace.name}</p>
          )}
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/app/transactions"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            💸 Lançamentos
          </NavLink>
          <NavLink
            to="/app/imports"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            📥 Importar
          </NavLink>
          <NavLink
            to="/app/budgets"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            📈 Orçamentos
          </NavLink>
          <NavLink
            to="/app/cards"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            💳 Cartões
          </NavLink>
          <NavLink
            to="/app/categories"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            🏷️ Categorias
          </NavLink>
        </nav>

        <button className={styles.logoutButton} onClick={logout}>
          🚪 Sair
        </button>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
