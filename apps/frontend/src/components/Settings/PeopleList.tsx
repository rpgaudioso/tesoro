import ConfirmDialog from '@/components/UI/ConfirmDialog';
import { createPerson, deletePerson, getPeople, updatePerson } from '@/lib/settingsApi';
import { Edit2, Plus, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from '../UI';
import styles from './PeopleList.module.css';

// Helper para gerar URL completa da imagem
const getImageUrl = (photoUrl: string | undefined) => {
  if (!photoUrl) return null;
  // Se a URL já é completa, retorna como está
  if (photoUrl.startsWith('http')) return photoUrl;
  // Caso contrário, adiciona o prefixo do servidor
  return `http://localhost:3000${photoUrl}`;
};

interface Person {
  id: string;
  name: string;
  color?: string;
  photoUrl?: string;
  active: boolean;
}

export default function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    color: '#3B82F6', 
    photoFile: null as File | null,
    currentPhotoUrl: null as string | null,
    removePhoto: false
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const response = await getPeople();
      setPeople(response.data);
    } catch (error) {
      toast.error('Erro ao carregar pessoas');
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
      if (editingId) {
        await updatePerson(
          editingId, 
          { 
            name: formData.name, 
            color: formData.color,
            removePhoto: formData.removePhoto 
          }, 
          formData.photoFile || undefined
        );
        toast.success('Pessoa atualizada');
      } else {
        await createPerson({ name: formData.name, color: formData.color });
        toast.success('Pessoa criada com sucesso');
      }
      setFormData({ name: '', color: '#3B82F6', photoFile: null, currentPhotoUrl: null, removePhoto: false });
      setPhotoPreview(null);
      setEditingId(null);
      setShowForm(false);
      await loadPeople();
    } catch (error) {
      toast.error('Erro ao salvar pessoa');
    }
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setFormData({ 
      name: person.name, 
      color: person.color || '#3B82F6', 
      photoFile: null,
      currentPhotoUrl: person.photoUrl || null,
      removePhoto: false
    });
    setPhotoPreview(person.photoUrl ? getImageUrl(person.photoUrl) : null);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPersonToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!personToDelete) return;

    try {
      await deletePerson(personToDelete);
      toast.success('Pessoa deletada');
      await loadPeople();
    } catch (error) {
      toast.error('Erro ao deletar pessoa');
    } finally {
      setDeleteConfirmOpen(false);
      setPersonToDelete(null);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        toast.error('Selecione um arquivo de imagem válido');
        return;
      }
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem deve ter menos de 5MB');
        return;
      }
      setFormData({ ...formData, photoFile: file, removePhoto: false });
      
      // Gerar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photoFile: null, removePhoto: true });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Pessoas</h2>
        <button
          className={styles.btnPrimary}
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', color: '#3B82F6', photoFile: null, currentPhotoUrl: null, removePhoto: false });
            setPhotoPreview(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Nova Pessoa
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome da pessoa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              autoFocus
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cor</label>
            <div className={styles.colorInput}>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className={styles.color}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Foto</label>
            <div className={styles.photoUpload}>
              {photoPreview && (
                <div className={styles.photoPreviewContainer}>
                  <img src={photoPreview} alt="Preview" className={styles.photoPreview} />
                  <button
                    type="button"
                    className={styles.removePhotoButton}
                    onClick={handleRemovePhoto}
                    title="Remover foto"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                className={styles.fileInput}
                hidden
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={18} />
                {formData.photoFile ? formData.photoFile.name : photoPreview ? 'Alterar imagem' : 'Escolher imagem'}
              </button>
              {formData.photoFile && (
                <p className={styles.fileName}>Novo arquivo: {formData.photoFile.name}</p>
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
      ) : people.length === 0 ? (
        <div className={styles.empty}>Nenhuma pessoa cadastrada</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Cor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td>
                  <div className={styles.photoCell}>
                    {person.photoUrl ? (
                      <img src={getImageUrl(person.photoUrl)} alt={person.name} className={styles.photo} />
                    ) : (
                      <div
                        className={styles.photoPlaceholder}
                        style={{ backgroundColor: person.color || '#3B82F6' }}
                      >
                        {person.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td>{person.name}</td>
                <td>
                  <div className={styles.colorCell}>
                    <div
                      className={styles.colorDot}
                      style={{ backgroundColor: person.color }}
                    />
                    <span>{person.color}</span>
                  </div>
                </td>
                <td>{person.active ? '✓ Ativo' : '✗ Inativo'}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.btnIcon}
                      onClick={() => handleEdit(person)}
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={styles.btnIconDanger}
                      onClick={() => handleDelete(person.id)}
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
        message="Tem certeza que deseja deletar esta pessoa?"
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        variant="danger"
      />
    </div>
  );
}
