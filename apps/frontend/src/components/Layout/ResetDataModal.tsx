import { useAuth } from '@/contexts/AuthContext';
import { resetUserData } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../UI';
import styles from './ResetDataModal.module.css';

interface ResetDataModalProps {
  onClose: () => void;
}

export default function ResetDataModal({ onClose }: ResetDataModalProps) {
  const [autoSeed, setAutoSeed] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { refreshWorkspaces } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const resetMutation = useMutation({
    mutationFn: () => resetUserData(autoSeed),
    onSuccess: async () => {
      toast.success('Dados resetados com sucesso!');
      queryClient.clear();
      await refreshWorkspaces();
      onClose();
      
      // Redirect to welcome tour if no auto seed, or dashboard if auto seeded
      if (!autoSeed) {
        navigate('/app/welcome', { replace: true });
      } else {
        navigate('/app/dashboard', { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao resetar dados');
    },
  });

  const handleReset = () => {
    if (confirmText !== 'RESETAR') {
      toast.error('Digite "RESETAR" para confirmar');
      return;
    }

    resetMutation.mutate();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconWarning}>
            <AlertTriangle size={24} />
          </div>
          <h2>Resetar Todos os Dados</h2>
        </div>

        <div className={styles.content}>
          <p className={styles.warning}>
            ⚠️ <strong>ATENÇÃO:</strong> Esta ação é irreversível!
          </p>
          <p>
            Todos os seus dados serão permanentemente excluídos:
          </p>
          <ul className={styles.list}>
            <li>Todas as workspaces</li>
            <li>Todas as transações</li>
            <li>Todas as categorias</li>
            <li>Todas as contas</li>
            <li>Todas as pessoas</li>
            <li>Todos os orçamentos</li>
            <li>Todas as importações</li>
          </ul>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="autoSeed"
              checked={autoSeed}
              onChange={(e) => setAutoSeed(e.target.checked)}
            />
            <label htmlFor="autoSeed">
              Gerar dados iniciais de teste (auto seed)
              <span className={styles.checkboxHint}>
                Cria uma workspace, categorias padrão, uma pessoa e uma conta
              </span>
            </label>
          </div>

          <div className={styles.confirmation}>
            <label htmlFor="confirmText">
              Digite <strong>RESETAR</strong> para confirmar:
            </label>
            <input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="RESETAR"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={resetMutation.isPending}
          >
            Cancelar
          </button>
          <button
            className={styles.resetButton}
            onClick={handleReset}
            disabled={resetMutation.isPending || confirmText !== 'RESETAR'}
          >
            {resetMutation.isPending ? 'Resetando...' : 'Resetar Dados'}
          </button>
        </div>
      </div>
    </div>
  );
}
