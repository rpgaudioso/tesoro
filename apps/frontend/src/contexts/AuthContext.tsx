import type { User, Workspace } from '@tesoro/shared';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

interface AuthContextType {
  user: User | null;
  workspaces: (Workspace & { role: string })[];
  currentWorkspace: Workspace | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, workspaceName: string) => Promise<void>;
  logout: () => void;
  selectWorkspace: (workspaceId: string) => void;
  refreshWorkspaces: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<(Workspace & { role: string })[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const workspaceId = localStorage.getItem('workspaceId');

    if (token && workspaceId) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      const { data } = await api.get('/workspaces');
      setWorkspaces(data);

      const workspaceId = localStorage.getItem('workspaceId');
      const workspace = data.find((w: Workspace) => w.id === workspaceId);
      
      if (workspace) {
        setCurrentWorkspace(workspace);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setWorkspaces(data.workspaces);

    if (data.workspaces.length > 0) {
      selectWorkspace(data.workspaces[0].id);
    }
  };

  const register = async (email: string, password: string, workspaceName: string) => {
    const { data } = await api.post('/auth/register', {
      email,
      password,
      workspaceName,
    });

    localStorage.setItem('token', data.token);
    setUser(data.user);
    setWorkspaces([{ ...data.workspace, role: 'OWNER' }]);
    selectWorkspace(data.workspace.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('workspaceId');
    setUser(null);
    setWorkspaces([]);
    setCurrentWorkspace(null);
  };

  const selectWorkspace = (workspaceId: string) => {
    localStorage.setItem('workspaceId', workspaceId);
    const workspace = workspaces.find((w) => w.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  };

  const refreshWorkspaces = async () => {
    await loadUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspaces,
        currentWorkspace,
        isAuthenticated: !!user || !!localStorage.getItem('token'),
        login,
        register,
        logout,
        selectWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
