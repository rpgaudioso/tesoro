import { createWorkspace, deleteWorkspace, getPeople, getWorkspaces, updateWorkspace } from '@/lib/settingsApi';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import styles from './WorkspaceList.module.css';

// Helper para gerar URL completa da imagem
const getImageUrl = (photoUrl: string | undefined) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith('http')) return photoUrl;
  return `http://localhost:3000${photoUrl}`;
};

interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  role?: string;
  people?: Array<{ id: string; name: string; photoUrl?: string; color?: string }>;
}

interface Person {
  id: string;
  name: string;
  color?: string;
  photoUrl?: string;
  active: boolean;
}

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [editFormData, setEditFormData] = useState({ name: '', personIds: [] as string[] });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [workspacesResponse, peopleResponse] = await Promise.all([
        getWorkspaces(),
        getPeople(),
      ]);
      setWorkspaces(workspacesResponse.data);
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
      toast.error('Nome da workspace é obrigatório');
      return;
    }

    try {
      await createWorkspace({ name: formData.name });
      toast.success('Workspace criada com sucesso');
      setFormData({ name: '' });
      setShowForm(false);
      await loadData();
    } catch (error) {
      toast.error('Erro ao criar workspace');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.name.trim()) {
      toast.error('Nome da workspace é obrigatório');
      return;
    }

    if (!editingId) return;

    try {
      await updateWorkspace(editingId, {
        name: editFormData.name,
        personIds: editFormData.personIds,
      });
      toast.success('Workspace atualizada com sucesso');
      setEditingId(null);
      setShowEditForm(false);
      await loadData();
    } catch (error) {
      toast.error('Erro ao atualizar workspace');
    }
  };

  const handleEdit = (workspace: Workspace) => {
    setEditingId(workspace.id);
    setEditFormData({
      name: workspace.name,
      personIds: workspace.people?.map((p) => p.id) || [],
    });
    setShowEditForm(true);
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
      toast.success('Workspace excluída com sucesso');
      setDeletingId(null);
      await loadData();
    } catch (error) {
      toast.error('Erro ao excluir workspace');
    }
  };

  const togglePersonSelection = (personId: string) => {
    setEditFormData((prev) => ({
      ...prev,
      personIds: prev.personIds.includes(personId)
        ? prev.personIds.filter((id) => id !== personId)
        : [...prev.personIds, personId],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Workspaces</h2>
        <button className={styles.btnPrimary} onClick={() => setShowForm(!showForm)}>
          <Plus size={18} />
          Nova Workspace
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome da Workspace</label>
            <input
              type="text"
              placeholder="Digite o nome da workspace"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className={styles.input}
              autoFocus
            />
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
              Criar
            </button>
          </div>
        </form>
      )}

      {showEditForm && editingId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Editar Workspace</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setShowEditForm(false);
                  setEditingId(null);
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nome da Workspace</label>
                <input
                  type="text"
                  placeholder="Digite o nome da workspace"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className={styles.input}
                  autoFocus
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Associar Pessoas</label>
                <div className={styles.checkboxGroup}>
                  {people.length === 0 ? (
                    <p className={styles.placeholder}>Nenhuma pessoa cadastrada. Cadastre pessoas primeiro.</p>
                  ) : (
                    people.map((person) => (
                      <label key={person.id} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={editFormData.personIds.includes(person.id)}
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
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingId(null);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Confirmar Exclusão</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setDeletingId(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <p>Tem certeza que deseja excluir esta workspace?</p>
              <p className={styles.warningText}>
                ⚠️ Esta ação não pode ser desfeita. Todos os dados associados serão removidos.
              </p>
            </div>
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setDeletingId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.btnDanger}
                onClick={() => handleDelete(deletingId)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : workspaces.length === 0 ? (
        <div className={styles.empty}>Nenhuma workspace encontrada</div>
      ) : (
        <div className={styles.list}>
          {workspaces.map((ws) => (
            <div key={ws.id} className={styles.item}>
              <div className={styles.itemContent}>
                <h3>{ws.name}</h3>
                <span className={styles.role}>{ws.role}</span>
                {ws.people && ws.people.length > 0 && (
                  <div className={styles.personsList}>
                    <span className={styles.personsLabel}>Pessoas:</span>
                    <div className={styles.peoplePhotos}>
                      {ws.people.map((person) => (
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
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.itemActions}>
                <button
                  className={styles.btnIcon}
                  onClick={() => handleEdit(ws)}
                  title="Editar"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className={styles.btnIconDanger}
                  onClick={() => setDeletingId(ws.id)}
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
