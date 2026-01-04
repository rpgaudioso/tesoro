import Badge from '@/components/UI/Badge';
import Card from '@/components/UI/Card';
import api from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Transaction, Category, Person, Account, Card as CardType } from '@tesoro/shared';
import { format, addMonths, subMonths, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Edit2, Trash2, X, Check } from 'lucide-react';
import { useState } from 'react';
import styles from './TransactionsPage.module.css';

export default function TransactionsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedMonth = format(selectedDate, 'yyyy-MM');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkEditData, setBulkEditData] = useState<Partial<Transaction>>({});
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['transactions', selectedMonth],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?month=${selectedMonth}`);
      return data;
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  const { data: people } = useQuery<Person[]>({
    queryKey: ['people'],
    queryFn: async () => {
      const { data } = await api.get('/people');
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Transaction> }) => {
      const { data: response } = await api.patch(`/transactions/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setEditingTransaction(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const handlePreviousMonth = () => {
    setSelectedDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;

    // Enviar apenas os campos editáveis, sem relações
    const updateData: Partial<Transaction> = {
      description: editingTransaction.description,
      date: editingTransaction.date,
      amount: editingTransaction.amount,
      type: editingTransaction.type,
      categoryId: editingTransaction.categoryId,
      personId: editingTransaction.personId || null,
    };

    await updateMutation.mutateAsync({
      id: editingTransaction.id,
      data: updateData,
    });
  };

  const toggleSelectTransaction = (id: string) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransactions(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedTransactions.size === transactions?.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(transactions?.map(t => t.id) || []));
    }
  };

  const handleBulkEdit = async () => {
    if (selectedTransactions.size === 0) return;

    for (const id of selectedTransactions) {
      await updateMutation.mutateAsync({ id, data: bulkEditData });
    }

    setSelectedTransactions(new Set());
    setBulkEditMode(false);
    setBulkEditData({});
  };

  const handleBulkDelete = async () => {
    if (selectedTransactions.size === 0) return;

    if (confirm(`Tem certeza que deseja excluir ${selectedTransactions.size} lançamento(s)?`)) {
      for (const id of selectedTransactions) {
        await deleteMutation.mutateAsync(id);
      }
      setSelectedTransactions(new Set());
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lançamentos</h1>
        <div className={styles.monthSelector}>
          <button 
            onClick={handlePreviousMonth}
            className={styles.monthButton}
            aria-label="Mês anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className={styles.monthDisplay}>
            <span className={styles.monthText}>
              {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
            </span>
            <button 
              onClick={handleToday}
              className={styles.todayButton}
            >
              Hoje
            </button>
          </div>
          <button 
            onClick={handleNextMonth}
            className={styles.monthButton}
            aria-label="Próximo mês"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {selectedTransactions.size > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.bulkActionsText}>
            {selectedTransactions.size} lançamento(s) selecionado(s)
          </span>
          <div className={styles.bulkActionsButtons}>
            <button
              onClick={() => setBulkEditMode(!bulkEditMode)}
              className={styles.bulkActionButton}
            >
              <Edit2 size={16} /> Editar em massa
            </button>
            <button
              onClick={handleBulkDelete}
              className={`${styles.bulkActionButton} ${styles.dangerButton}`}
            >
              <Trash2 size={16} /> Excluir
            </button>
            <button
              onClick={() => setSelectedTransactions(new Set())}
              className={styles.bulkActionButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {bulkEditMode && selectedTransactions.size > 0 && (
        <Card>
          <div className={styles.bulkEditForm}>
            <h3>Editar {selectedTransactions.size} lançamento(s)</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Categoria</label>
                <select
                  value={bulkEditData.categoryId || ''}
                  onChange={(e) => setBulkEditData({ ...bulkEditData, categoryId: e.target.value || undefined })}
                >
                  <option value="">Manter original</option>
                  {categories?.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Pessoa</label>
                <select
                  value={bulkEditData.personId || ''}
                  onChange={(e) => setBulkEditData({ ...bulkEditData, personId: e.target.value || undefined })}
                >
                  <option value="">Manter original</option>
                  <option value="null">Comum</option>
                  {people?.map(person => (
                    <option key={person.id} value={person.id}>{person.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.formActions}>
              <button onClick={handleBulkEdit} className={styles.saveButton}>
                <Check size={16} /> Aplicar alterações
              </button>
              <button onClick={() => setBulkEditMode(false)} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </Card>
      )}

      <Card>
        {!transactions || transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum lançamento encontrado</p>
          </div>
        ) : (
          <div className={styles.transactionList}>
            <div className={styles.transactionListHeader}>
              <input
                type="checkbox"
                checked={selectedTransactions.size === transactions.length}
                onChange={toggleSelectAll}
                className={styles.checkbox}
              />
              <span className={styles.selectAllText}>Selecionar todos</span>
            </div>
            {transactions.map((transaction: any) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <input
                  type="checkbox"
                  checked={selectedTransactions.has(transaction.id)}
                  onChange={() => toggleSelectTransaction(transaction.id)}
                  className={styles.checkbox}
                />
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionMain}>
                    <span className={styles.description}>
                      {transaction.description}
                    </span>
                    <Badge variant={transaction.type === 'INCOME' ? 'success' : 'default'}>
                      {transaction.type === 'INCOME' ? 'Receita' : 'Despesa'}
                    </Badge>
                  </div>
                  <div className={styles.transactionMeta}>
                    <span className={styles.category}>
                      {transaction.category?.name || 'Sem categoria'}
                    </span>
                    <span className={styles.date}>
                      {format(new Date(transaction.date), 'dd/MM/yyyy')}
                    </span>
                    {transaction.person && (
                      <span className={styles.person}>
                        👤 {transaction.person.name}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.amount} ${
                    transaction.type === 'INCOME' ? styles.income : styles.expense
                  }`}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'} R${' '}
                  {transaction.amount.toFixed(2)}
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleEdit(transaction)}
                    className={styles.actionButton}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {editingTransaction && (
        <div className={styles.modal} onClick={() => setEditingTransaction(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Editar Lançamento</h2>
              <button
                onClick={() => setEditingTransaction(null)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <input
                  type="text"
                  value={editingTransaction.description || ''}
                  onChange={(e) =>
                    setEditingTransaction({ ...editingTransaction, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Data</label>
                  <input
                    type="date"
                    value={
                      editingTransaction.date 
                        ? format(new Date(editingTransaction.date), 'yyyy-MM-dd')
                        : ''
                    }
                    onChange={(e) =>
                      setEditingTransaction({ 
                        ...editingTransaction, 
                        date: new Date(e.target.value).toISOString() as any
                      })
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingTransaction.amount}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Tipo</label>
                  <select
                    value={editingTransaction.type}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        type: e.target.value as 'INCOME' | 'EXPENSE',
                      })
                    }
                  >
                    <option value="EXPENSE">Despesa</option>
                    <option value="INCOME">Receita</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select
                    value={editingTransaction.categoryId}
                    onChange={(e) =>
                      setEditingTransaction({ ...editingTransaction, categoryId: e.target.value })
                    }
                    required
                  >
                    <option value="">Selecione</option>
                    {categories
                      ?.filter((cat) => cat.type === editingTransaction.type)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Pessoa</label>
                <select
                  value={editingTransaction.personId || ''}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      personId: e.target.value || undefined,
                    })
                  }
                >
                  <option value="">Comum</option>
                  {people?.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton} disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTransaction(null)}
                  className={styles.cancelButton}
                >
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
