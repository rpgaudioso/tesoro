import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RecurringFrequency, RecurringTransaction, TransactionType } from '@tesoro/shared';
import { ArrowDownCircle, ArrowUpCircle, Calendar, Edit2, Plus, Repeat, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/Layout/PageHeader';
import { toast } from '../components/UI';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import IconButton from '../components/UI/IconButton';
import Modal from '../components/UI/Modal';
import api from '../lib/api';
import styles from './RecurringTransactionsPage.module.css';

interface RecurringTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: RecurringTransaction | null;
}

function RecurringTransactionModal({ isOpen, onClose, transaction }: RecurringTransactionModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: transaction?.name || '',
    description: transaction?.description || '',
    amount: transaction?.amount || 0,
    type: transaction?.type || TransactionType.EXPENSE,
    frequency: transaction?.frequency || RecurringFrequency.MONTHLY,
    dayOfMonth: transaction?.dayOfMonth || 1,
    dayOfWeek: transaction?.dayOfWeek || 0,
    startDate: transaction?.startDate ? new Date(transaction.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    endDate: transaction?.endDate ? new Date(transaction.endDate).toISOString().split('T')[0] : '',
    categoryId: transaction?.categoryId || '',
    accountId: transaction?.accountId || '',
    personId: transaction?.personId || '',
    isActive: transaction?.isActive ?? true,
  });

  // Reset form when modal opens or transaction changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: transaction?.name || '',
        description: transaction?.description || '',
        amount: transaction?.amount || 0,
        type: transaction?.type || TransactionType.EXPENSE,
        frequency: transaction?.frequency || RecurringFrequency.MONTHLY,
        dayOfMonth: transaction?.dayOfMonth || 1,
        dayOfWeek: transaction?.dayOfWeek || 0,
        startDate: transaction?.startDate ? new Date(transaction.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        endDate: transaction?.endDate ? new Date(transaction.endDate).toISOString().split('T')[0] : '',
        categoryId: transaction?.categoryId || '',
        accountId: transaction?.accountId || '',
        personId: transaction?.personId || '',
        isActive: transaction?.isActive ?? true,
      });
    }
  }, [isOpen, transaction]);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await api.get('/accounts');
      return response.data;
    },
  });

  const { data: people = [] } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await api.get('/people');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/recurring-transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
      toast.success('Transação recorrente criada com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar transação recorrente');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put(`/recurring-transactions/${transaction?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
      toast.success('Transação recorrente atualizada com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar transação recorrente');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      dayOfMonth: formData.frequency === RecurringFrequency.MONTHLY ? Number(formData.dayOfMonth) : undefined,
      dayOfWeek: formData.frequency === RecurringFrequency.WEEKLY ? Number(formData.dayOfWeek) : undefined,
      endDate: formData.endDate || undefined,
      accountId: formData.accountId || undefined,
      personId: formData.personId || undefined,
    };

    if (transaction) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={transaction ? 'Editar Transação Recorrente' : 'Nova Transação Recorrente'} size="lg">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Valor *</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tipo *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
            >
              <option value={TransactionType.INCOME}>Receita</option>
              <option value={TransactionType.EXPENSE}>Despesa</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Frequência *</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as RecurringFrequency })}
            >
              <option value={RecurringFrequency.MINUTELY}>A cada minuto (teste)</option>
              <option value={RecurringFrequency.DAILY}>Diária</option>
              <option value={RecurringFrequency.WEEKLY}>Semanal</option>
              <option value={RecurringFrequency.MONTHLY}>Mensal</option>
              <option value={RecurringFrequency.YEARLY}>Anual</option>
            </select>
          </div>

          {formData.frequency === RecurringFrequency.MONTHLY && (
            <div className={styles.formGroup}>
              <label>Dia do Mês *</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.dayOfMonth}
                onChange={(e) => setFormData({ ...formData, dayOfMonth: parseInt(e.target.value) })}
                required
              />
            </div>
          )}

          {formData.frequency === RecurringFrequency.WEEKLY && (
            <div className={styles.formGroup}>
              <label>Dia da Semana *</label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) => setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })}
              >
                <option value={0}>Domingo</option>
                <option value={1}>Segunda</option>
                <option value={2}>Terça</option>
                <option value={3}>Quarta</option>
                <option value={4}>Quinta</option>
                <option value={5}>Sexta</option>
                <option value={6}>Sábado</option>
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Categoria *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="">Selecione...</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Conta</label>
            <select
              value={formData.accountId}
              onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            >
              <option value="">Nenhuma</option>
              {accounts.map((acc: any) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Pessoa</label>
            <select
              value={formData.personId}
              onChange={(e) => setFormData({ ...formData, personId: e.target.value })}
            >
              <option value="">Nenhuma</option>
              {people.map((person: any) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Data Início *</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Data Fim</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label>Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              {' '}Ativa
            </label>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {transaction ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function RecurringTransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<RecurringTransaction | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: recurringTransactions = [], isLoading } = useQuery({
    queryKey: ['recurring-transactions'],
    queryFn: async () => {
      const response = await api.get('/recurring-transactions');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/recurring-transactions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
      toast.success('Transação recorrente excluída com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao excluir transação recorrente');
    },
  });

  const handleEdit = (transaction: RecurringTransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactionToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteMutation.mutate(transactionToDelete);
    }
    setDeleteConfirmOpen(false);
    setTransactionToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const getFrequencyLabel = (frequency: RecurringFrequency) => {
    const labels = {
      [RecurringFrequency.MINUTELY]: 'A cada minuto',
      [RecurringFrequency.DAILY]: 'Diária',
      [RecurringFrequency.WEEKLY]: 'Semanal',
      [RecurringFrequency.MONTHLY]: 'Mensal',
      [RecurringFrequency.YEARLY]: 'Anual',
    };
    return labels[frequency];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Calculate summary statistics
  const summary = useMemo(() => {
    const active = recurringTransactions.filter((t: RecurringTransaction) => t.isActive);
    const income = active
      .filter((t: RecurringTransaction) => t.type === TransactionType.INCOME)
      .reduce((sum: number, t: RecurringTransaction) => sum + t.amount, 0);
    const expense = active
      .filter((t: RecurringTransaction) => t.type === TransactionType.EXPENSE)
      .reduce((sum: number, t: RecurringTransaction) => sum + t.amount, 0);
    
    return {
      total: recurringTransactions.length,
      active: active.length,
      income,
      expense,
      balance: income - expense,
    };
  }, [recurringTransactions]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Carregando transações recorrentes...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Transações Recorrentes"
        subtitle="Gerencie suas transações recorrentes e automatize pagamentos"
      />

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Repeat size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Total Cadastradas</span>
            <span className={styles.summaryValue}>
              {summary.total}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.income}`}>
            <ArrowUpCircle size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Receitas Mensais</span>
            <span className={`${styles.summaryValue} ${styles.positive}`}>
              {formatCurrency(summary.income)}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.expense}`}>
            <ArrowDownCircle size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Despesas Mensais</span>
            <span className={`${styles.summaryValue} ${styles.negative}`}>
              {formatCurrency(summary.expense)}
            </span>
          </div>
        </Card>

        <Card className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${styles.active}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Ativas</span>
            <span className={styles.summaryValue}>
              {summary.active} de {summary.total}
            </span>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.actions}>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md">
            <Plus size={18} />
            Nova Transação Recorrente
          </Button>
        </div>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NOME</th>
                <th>VALOR</th>
                <th>TIPO</th>
                <th>FREQUÊNCIA</th>
                <th>INÍCIO</th>
                <th>FIM</th>
                <th>STATUS</th>
                <th>ÚLTIMA EXECUÇÃO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {recurringTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <Repeat size={48} />
                      <p>Nenhuma transação recorrente cadastrada</p>
                      <p className={styles.emptyHint}>
                        Crie transações recorrentes para automatizar suas finanças
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                recurringTransactions.map((transaction: RecurringTransaction) => (
                  <tr key={transaction.id}>
                    <td className={styles.nameCell}>{transaction.name}</td>
                    <td className={`${styles.amountCell} ${transaction.type === TransactionType.INCOME ? styles.income : styles.expense}`}>
                      {transaction.type === TransactionType.INCOME ? '+' : '-'}
                      R$ {transaction.amount.toFixed(2)}
                    </td>
                    <td>
                      <Badge variant={transaction.type === TransactionType.INCOME ? 'success' : 'danger'}>
                        {transaction.type === TransactionType.INCOME ? 'Receita' : 'Despesa'}
                      </Badge>
                    </td>
                    <td>{getFrequencyLabel(transaction.frequency)}</td>
                    <td className={styles.dateCell}>{new Date(transaction.startDate).toLocaleDateString('pt-BR')}</td>
                    <td className={styles.dateCell}>{transaction.endDate ? new Date(transaction.endDate).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>
                      <Badge variant={transaction.isActive ? 'success' : 'default'}>
                        {transaction.isActive ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </td>
                    <td className={styles.dateCell}>
                      {transaction.lastRunAt 
                        ? new Date(transaction.lastRunAt).toLocaleString('pt-BR')
                        : <span className={styles.noData}>Nunca</span>}
                    </td>
                    <td>
                      <div className={styles.actionsCell}>
                        <IconButton
                          variant="default"
                          size="sm"
                          onClick={() => handleEdit(transaction)}
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <IconButton
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(transaction.id)}
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <RecurringTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta transação recorrente?"
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        variant="danger"
      />
    </div>
  );
}
