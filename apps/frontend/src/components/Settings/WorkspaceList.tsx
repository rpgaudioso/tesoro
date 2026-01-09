import { Button, Card, Checkbox, ConfirmDialog, EmptyState, IconButton, Input, Modal } from '@/components/UI';
import { createWorkspace, deleteWorkspace, getPeople, getWorkspaces, updateWorkspace } from '@/lib/settingsApi';
import { Edit2, Inbox, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from '../UI';
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
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={18} />
          Nova Workspace
        </Button>
      </div>

      {showForm && (
        <Card padding="md" className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Nome da Workspace"
              type="text"
              placeholder="Digite o nome da workspace"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              fullWidth
              autoFocus
            />
            <div className={styles.formActions}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Criar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {showEditForm && editingId && (
        <Modal
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false);
            setEditingId(null);
          }}
          title="Editar Workspace"
        >
          <form onSubmit={handleEditSubmit} className={styles.modalForm}>
            <Input
              label="Nome da Workspace"
              type="text"
              placeholder="Digite o nome da workspace"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              fullWidth
              autoFocus
            />
            <div className={styles.formGroup}>
              <label className={styles.label}>Associar Pessoas</label>
              {people.length === 0 ? (
                <p className={styles.placeholder}>Nenhuma pessoa cadastrada. Cadastre pessoas primeiro.</p>
              ) : (
                <div className={styles.checkboxGroup}>
                  {people.map((person) => (
                    <Checkbox
                      key={person.id}
                      checked={editFormData.personIds.includes(person.id)}
                      onChange={() => togglePersonSelection(person.id)}
                      label={
                        <div className={styles.checkboxContent}>
                          <span
                            className={styles.personColor}
                            style={{ backgroundColor: person.color || 'var(--color-primary)' }}
                          />
                          {person.name}
                        </div>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.formActions}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingId(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Atualizar
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && handleDelete(deletingId)}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta workspace?"
        description="⚠️ Esta ação não pode ser desfeita. Todos os dados associados serão removidos."
        confirmText="Excluir"
        confirmVariant="danger"
      />

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : workspaces.length === 0 ? (
        <EmptyState
          icon={<Inbox />}
          title="Nenhuma workspace encontrada"
          description="Crie sua primeira workspace para começar"
        />
      ) : (
        <div className={styles.list}>
          {workspaces.map((ws) => (
            <Card key={ws.id} padding="md" className={styles.item}>
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
                              style={{ backgroundColor: person.color || 'var(--color-primary)' }}
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
                <IconButton
                  onClick={() => handleEdit(ws)}
                  title="Editar"
                  variant="default"
                >
                  <Edit2 size={18} />
                </IconButton>
                <IconButton
                  onClick={() => setDeletingId(ws.id)}
                  title="Excluir"
                  variant="danger"
                >
                  <Trash2 size={18} />
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
