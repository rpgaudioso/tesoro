import PageHeader from '@/components/Layout/PageHeader';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import ConfirmDialog from '@/components/UI/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useConfirm } from '@/hooks/useConfirm';
import { useWorkspaceChange } from '@/hooks/useWorkspaceChange';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Category } from '@tesoro/shared';
import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import styles from './CategoriesPage.module.css';

const AVAILABLE_ICONS = [
  '🏠', '🍔', '🚗', '✈️', '🎮', '💊', '🎓',
  '👕', '🎁', '▶️', '�', '🔧', '⚙️', '🏖️',
  '⚽', '🏥', '🛒', '🎉', '💼', '🌟'
];

const AVAILABLE_COLORS = [
  '#FF69B4', '#FFB6C1', '#FFA500', '#FFD700', '#FFFF00',
  '#ADFF2F', '#98FB98', '#87CEEB', '#BA55D3', '#FF1493',
  '#FF8C00', '#9ACD32', '#FF4500', '#20B2AA', '#FF6B6B'
];

export default function CategoriesPage() {
  const { currentWorkspace } = useAuth();
  useWorkspaceChange();
  
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '🏠',
    color: '#FF69B4',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    monthlyLimit: undefined as number | undefined,
  });
  const queryClient = useQueryClient();
  const { confirm, confirmState, handleConfirm, handleCancel } = useConfirm();

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: response } = await api.post('/categories', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { data: response } = await api.patch(`/categories/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao excluir categoria';
      toast.error(message);
    },
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        icon: category.icon || '🏠',
        color: category.color || '#FF69B4',
        type: category.type as 'INCOME' | 'EXPENSE',
        monthlyLimit: category.monthlyLimit || undefined,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        icon: '🏠',
        color: '#FF69B4',
        type: 'EXPENSE',
        monthlyLimit: undefined,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remove campos undefined antes de enviar
    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined)
    );
    
    if (editingCategory) {
      await updateMutation.mutateAsync({ id: editingCategory.id, data: dataToSend });
    } else {
      await createMutation.mutateAsync(dataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: 'Excluir Categoria',
      message: 'Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Categoria excluída com sucesso');
      } catch (error) {
        // Erro já tratado no onError do mutation
      }
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  const expenseCategories = categories?.filter((c) => c.type === 'EXPENSE') || [];
  const incomeCategories = categories?.filter((c) => c.type === 'INCOME') || [];

  return (
    <div className={styles.page}>
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmLabel={confirmState.confirmLabel}
        cancelLabel={confirmState.cancelLabel}
        variant={confirmState.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <PageHeader
        title="Categorias"
        subtitle="Organize suas transações em categorias personalizadas"
        action={
          <Button variant="primary" size="md" onClick={() => handleOpenModal()}>
            <Plus size={18} />
            Nova Categoria
          </Button>
        }
      />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Despesas</h2>
        <div className={styles.categoryGrid}>
          {expenseCategories.map((category) => (
            <Card key={category.id}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon} style={{ backgroundColor: category.color }}>
                    {category.icon}
                  </div>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{category.name}</span>
                    {category.monthlyLimit && (
                      <span className={styles.categoryLimit}>
                        Limite: R$ {category.monthlyLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.categoryActions}>
                  <button
                    onClick={() => handleOpenModal(category)}
                    className={styles.iconButton}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Receitas</h2>
        <div className={styles.categoryGrid}>
          {incomeCategories.map((category) => (
            <Card key={category.id}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon} style={{ backgroundColor: category.color }}>
                    {category.icon}
                  </div>
                  <span className={styles.categoryName}>{category.name}</span>
                </div>
                <div className={styles.categoryActions}>
                  <button
                    onClick={() => handleOpenModal(category)}
                    className={styles.iconButton}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showModal && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Ex.: Pets"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo</label>
                <div className={styles.typeSelector}>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${
                      formData.type === 'EXPENSE' ? styles.typeButtonActive : ''
                    }`}
                    onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
                  >
                    Despesa
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${
                      formData.type === 'INCOME' ? styles.typeButtonActive : ''
                    }`}
                    onClick={() => setFormData({ ...formData, type: 'INCOME' })}
                  >
                    Receita
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Ícone</label>
                <div className={styles.iconGrid}>
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`${styles.iconOption} ${
                        formData.icon === icon ? styles.iconOptionActive : ''
                      }`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Cor</label>
                <div className={styles.colorGrid}>
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.colorOption} ${
                        formData.color === color ? styles.colorOptionActive : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
                <p className={styles.hint}>
                  Dica: Coloque cores diferentes para cada categoria
                </p>
              </div>

              {formData.type === 'EXPENSE' && (
                <div className={styles.formGroup}>
                  <label>Limite Mensal (Opcional)</label>
                  <input
                    type="number"
                    placeholder="Ex.: 1000.00"
                    value={formData.monthlyLimit ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = value ? parseFloat(value) : undefined;
                      setFormData({ 
                        ...formData, 
                        monthlyLimit: parsedValue && !isNaN(parsedValue) ? parsedValue : undefined 
                      });
                    }}
                    min="0"
                    step="0.01"
                    className={styles.input}
                  />
                  <p className={styles.hint}>
                    Define quanto você planeja gastar nesta categoria por mês
                  </p>
                </div>
              )}

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Salvando...'
                    : editingCategory
                      ? 'Salvar'
                      : 'Adicionar'}
                </button>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

