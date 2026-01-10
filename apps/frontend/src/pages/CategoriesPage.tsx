import { Badge, Button, Card, ConfirmDialog, ContentSwitcher, Divider, EmptyState, FormGroup, IconButton, Input, Loading, Modal, PageHeader, Search } from '@/components/UI';
import { useAuth } from '@/contexts/AuthContext';
import { useConfirm } from '@/hooks/useConfirm';
import { useWorkspaceChange } from '@/hooks/useWorkspaceChange';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Category } from '@tesoro/shared';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from '../components/UI';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'EXPENSE', 'INCOME'
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

  // Filtrar por tipo - MOVER ANTES DO RETURN CONDICIONAL
  const filteredByType = useMemo(() => {
    if (filterType === 'all') return categories || [];
    return categories?.filter((c) => c.type === filterType) || [];
  }, [categories, filterType]);

  // Filtrar por search
  const filteredCategories = useMemo(() => {
    const search = typeof searchTerm === 'string' ? searchTerm : '';
    if (!search.trim()) return filteredByType;
    const term = search.toLowerCase();
    return filteredByType.filter((c) => c.name.toLowerCase().includes(term));
  }, [filteredByType, searchTerm]);

  // Separar por tipo para exibição quando filtro é 'all'
  const expenseCategories = useMemo(() => {
    return filteredCategories.filter((c) => c.type === 'EXPENSE');
  }, [filteredCategories]);

  const incomeCategories = useMemo(() => {
    return filteredCategories.filter((c) => c.type === 'INCOME');
  }, [filteredCategories]);

  const hasExpenses = expenseCategories.length > 0;
  const hasIncomes = incomeCategories.length > 0;
  const showDivider = hasExpenses && hasIncomes && filterType === 'all';

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
    return (
      <div className={styles.page}>
        <PageHeader
          title="Categorias"
          subtitle="Organize suas transações em categorias personalizadas"
        />
        <Loading size="lg" text="Carregando categorias..." />
      </div>
    );
  }

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
        actions={
          <Button variant="primary" size="md" onClick={() => handleOpenModal()}>
            <Plus size={18} />
            Nova Categoria
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className={styles.filtersContainer}>
        <Search 
          placeholder="Pesquisar categorias..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className={styles.contentSwitcherWrapper}>
          <ContentSwitcher 
            options={[
              { value: 'all', label: 'Todos' },
              { value: 'EXPENSE', label: 'Despesas' },
              { value: 'INCOME', label: 'Receitas' },
            ]}
            value={filterType}
            onChange={(value) => setFilterType(value)}
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 ? (
        <EmptyState 
          title={searchTerm ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria criada'}
          description={searchTerm ? 'Tente outro termo de busca' : 'Comece criando sua primeira categoria'}
          action={
            <Button variant="primary" size="md" onClick={() => handleOpenModal()}>
              <Plus size={18} />
              Criar Categoria
            </Button>
          }
        />
      ) : (
        <div className={styles.categoriesContainer}>
          {/* Despesas Section */}
          {(filterType === 'all' || filterType === 'EXPENSE') && (
            <>
              {filterType === 'all' && (
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Despesas</h2>
                  <span className={styles.sectionCount}>{expenseCategories.length}</span>
                </div>
              )}
              
              {hasExpenses ? (
                <div className={styles.categoryGrid}>
                  {expenseCategories.map((category) => (
                    <CategoryCard 
                      key={category.id}
                      category={category}
                      onEdit={handleOpenModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyTypeMessage}>
                  Nenhuma categoria de despesa criada ainda
                </p>
              )}
            </>
          )}

          {/* Divider */}
          {showDivider && <Divider className={styles.sectionDivider} />}

          {/* Receitas Section */}
          {(filterType === 'all' || filterType === 'INCOME') && (
            <>
              {filterType === 'all' && (
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Receitas</h2>
                  <span className={styles.sectionCount}>{incomeCategories.length}</span>
                </div>
              )}
              
              {hasIncomes ? (
                <div className={styles.categoryGrid}>
                  {incomeCategories.map((category) => (
                    <CategoryCard 
                      key={category.id}
                      category={category}
                      onEdit={handleOpenModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyTypeMessage}>
                  Nenhuma categoria de receita criada ainda
                </p>
              )}
            </>
          )}
        </div>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}
          size="md"
        >
          <form onSubmit={handleSubmit} style={{ padding: '0 var(--spacing-24)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
            <FormGroup label="Nome" required>
              <Input
                type="text"
                placeholder="Ex.: Pets"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup label="Tipo" required>
              <div className={styles.typeSelector}>
                <Button
                  variant={formData.type === 'EXPENSE' ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
                  style={{ flex: 1 }}
                  type="button"
                >
                  Despesa
                </Button>
                <Button
                  variant={formData.type === 'INCOME' ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => setFormData({ ...formData, type: 'INCOME' })}
                  style={{ flex: 1 }}
                  type="button"
                >
                  Receita
                </Button>
              </div>
            </FormGroup>

            <FormGroup label="Ícone" required>
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
            </FormGroup>

            <FormGroup label="Cor" required>
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
            </FormGroup>

            {formData.type === 'EXPENSE' && (
              <FormGroup label="Limite Mensal (Opcional)">
                <Input
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
                />
                <p className={styles.hint}>
                  Define quanto você planeja gastar nesta categoria por mês
                </p>
              </FormGroup>
            )}

            <div style={{ display: 'flex', gap: 'var(--spacing-12)', justifyContent: 'flex-end', paddingTop: 'var(--spacing-16)' }}>
              <Button
                variant="secondary"
                size="md"
                onClick={handleCloseModal}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Salvando...'
                  : editingCategory
                    ? 'Salvar'
                    : 'Adicionar'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Componente auxiliar para card de categoria
interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card className={styles.categoryCardContainer}>
      <div className={styles.categoryCardContent}>
        <div className={styles.categoryCardHeader}>
          <div 
            className={styles.categoryCardIcon} 
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          <div className={styles.categoryCardInfo}>
            <div className={styles.categoryCardNameRow}>
              <h3 className={styles.categoryCardName}>{category.name}</h3>
              {category.isDefault && (
                <Badge variant="secondary" size="sm">Padrão</Badge>
              )}
            </div>
            {category.monthlyLimit && (
              <p className={styles.categoryCardLimit}>
                Limite: R$ {category.monthlyLimit.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </p>
            )}
          </div>
        </div>
        <div className={styles.categoryCardActions}>
          <IconButton 
            variant="default" 
            size="sm" 
            onClick={() => onEdit(category)} 
            title="Editar"
          >
            <Edit2 size={16} />
          </IconButton>
          <IconButton 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(category.id)} 
            title="Excluir"
          >
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

