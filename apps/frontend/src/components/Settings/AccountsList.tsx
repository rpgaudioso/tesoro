import ConfirmDialog from '@/components/UI/ConfirmDialog';
import { createAccount, deleteAccount, getAccounts, getPeople, updateAccount } from '@/lib/settingsApi';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from '../UI';
import styles from './AccountsList.module.css';

// Helper para gerar URL completa da imagem
const getImageUrl = (photoUrl: string | undefined) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith('http')) return photoUrl;
  return `http://localhost:3000${photoUrl}`;
};

interface Account {
  id: string;
  name: string;
  type: string;
  initialBalance: number;
  active: boolean;
  people?: Array<{ person: { id: string; name: string; photoUrl?: string; color?: string } }>;
}

interface Person {
  id: string;
  name: string;
  color?: string;
  photoUrl?: string;
  active: boolean;
}

const ACCOUNT_TYPES = [
  { value: 'CHECKING', label: 'Corrente' },
  { value: 'SAVINGS', label: 'Poupança' },
  { value: 'INVESTMENT', label: 'Investimento' },
  { value: 'CASH', label: 'Dinheiro' },
];

export default function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    type: 'CHECKING' | 'CASH' | 'SAVINGS' | 'INVESTMENT';
    initialBalance: number;
    personIds: string[];
  }>({
    name: '',
    type: 'CHECKING',
    initialBalance: 0,
    personIds: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsResponse, peopleResponse] = await Promise.all([
        getAccounts(),
        getPeople(),
      ]);
      setAccounts(accountsResponse.data);
      setPeople(peopleResponse.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    try {
      const data = {
        name: formData.name,
        type: formData.type as 'CHECKING' | 'CASH' | 'SAVINGS' | 'INVESTMENT',
        initialBalance: formData.initialBalance,
        personIds: formData.personIds,
      };

      if (editingId) {
        await updateAccount(editingId, data);
        toast.success('Conta atualizada');
      } else {
        await createAccount(data);
        toast.success('Conta criada com sucesso');
      }
      setFormData({ name: '', type: 'CHECKING', initialBalance: 0, personIds: [] });
      setEditingId(null);
      setShowForm(false);
      await loadData();
    } catch (error) {
      toast.error('Erro ao salvar conta');
    }
  };

  const handleEdit = (account: Account) => {
    setEditingId(account.id);
    setFormData({
      name: account.name,
      type: account.type as 'CHECKING' | 'CASH' | 'SAVINGS' | 'INVESTMENT',
      initialBalance: account.initialBalance,
      personIds: account.people?.map((p) => p.person.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAccountToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    try {
      await deleteAccount(accountToDelete);
      toast.success('Conta deletada');
      await loadData();
    } catch (error) {
      toast.error('Erro ao deletar conta');
    } finally {
      setDeleteConfirmOpen(false);
      setAccountToDelete(null);
    }
  };

  const togglePersonSelection = (personId: string) => {
    setFormData((prev) => ({
      ...prev,
      personIds: prev.personIds.includes(personId)
        ? prev.personIds.filter((id) => id !== personId)
        : [...prev.personIds, personId],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Contas Bancárias</h2>
        <button
          className={styles.btnPrimary}
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', type: 'CHECKING', initialBalance: 0, personIds: [] });
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Nova Conta
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome da Conta</label>
            <input
              type="text"
              placeholder="Digite o nome da conta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              autoFocus
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de Conta</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'CHECKING' | 'CASH' | 'SAVINGS' | 'INVESTMENT' })}
              className={styles.select}
            >
            {ACCOUNT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Saldo Inicial</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.initialBalance}
              onChange={(e) =>
                setFormData({ ...formData, initialBalance: parseFloat(e.target.value) || 0 })
              }
              className={styles.input}
              step="0.01"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Associar a Pessoas</label>
            <div className={styles.checkboxGroup}>
              {people.length === 0 ? (
                <p className={styles.placeholder}>Nenhuma pessoa cadastrada. Cadastre pessoas primeiro.</p>
              ) : (
                people.map((person) => (
                  <label key={person.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.personIds.includes(person.id)}
                      onChange={() => togglePersonSelection(person.id)}
                      className={styles.checkbox}
                    />
                    <span
                      className={styles.personColor}
                      style={{ backgroundColor: person.color || '#3B82F6' }}
                    />
                    {person.name}
                  </label>
                ))
              )}
            </div>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {editingId ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : accounts.length === 0 ? (
        <div className={styles.empty}>Nenhuma conta cadastrada</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Saldo Inicial</th>
              <th>Pessoas</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>{ACCOUNT_TYPES.find((t) => t.value === account.type)?.label}</td>
                <td>R$ {account.initialBalance.toFixed(2)}</td>
                <td>
                  <div className={styles.peoplePhotos}>
                    {account.people && account.people.length > 0 ? (
                      account.people.map(({ person }) => (
                        <div key={person.id} className={styles.personPhotoWrapper} title={person.name}>
                          {person.photoUrl ? (
                            <img 
                              src={getImageUrl(person.photoUrl)} 
                              alt={person.name} 
                              className={styles.personPhoto} 
                            />
                          ) : (
                            <div 
                              className={styles.personPhotoPlaceholder}
                              style={{ backgroundColor: person.color || '#3B82F6' }}
                            >
                              {person.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className={styles.noPeople}>-</span>
                    )}
                  </div>
                </td>
                <td>{account.active ? '✓ Ativo' : '✗ Inativo'}</td>
                <td>
                  <div className={styles.actions}>
                  <button
                    className={styles.btnIcon}
                    onClick={() => handleEdit(account)}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={styles.btnIconDanger}
                    onClick={() => handleDelete(account.id)}
                    title="Deletar"
                  >
                    <Trash2 size={16} />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar esta conta?"
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        variant="danger"
      />
    </div>
  );
}
