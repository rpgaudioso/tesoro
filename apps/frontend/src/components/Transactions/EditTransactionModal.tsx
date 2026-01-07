import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Modal from '@/components/UI/Modal';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Account, Category, Person, Transaction } from '@tesoro/shared';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import styles from './CreateTransactionModal.module.css';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function EditTransactionModal({ isOpen, onClose, transaction }: EditTransactionModalProps) {
  const { currentWorkspace } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    description: transaction.description || '',
    date: new Date(transaction.date).toISOString().split('T')[0],
    amount: String(Math.abs(transaction.amount)),
    type: transaction.type as 'INCOME' | 'EXPENSE',
    categoryId: transaction.categoryId || '',
    accountId: transaction.accountId || '',
    personId: transaction.personId || '',
    paymentMethod: 'cash' as 'cash' | 'credit_card',
    creditCardId: '',
    installments: 1,
  });

  // Update form when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || '',
        date: new Date(transaction.date).toISOString().split('T')[0],
        amount: String(Math.abs(transaction.amount)),
        type: transaction.type as 'INCOME' | 'EXPENSE',
        categoryId: transaction.categoryId || '',
        accountId: transaction.accountId || '',
        personId: transaction.personId || '',
        paymentMethod: 'cash' as 'cash' | 'credit_card',
        creditCardId: '',
        installments: 1,
      });
    }
  }, [transaction]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  const { data: accounts = [] } = useQuery<Account[]>({
    queryKey: ['accounts', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/accounts');
      return data;
    },
  });

  const { data: people = [] } = useQuery<Person[]>({
    queryKey: ['people', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/people');
      return data;
    },
  });

  const { data: creditCards = [] } = useQuery<any[]>({
    queryKey: ['creditCards', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get('/credit-cards');
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await api.patch(`/transactions/${transaction.id}`, {
        ...data,
        amount: parseFloat(data.amount),
        personId: data.personId || null,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transação atualizada com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar transação');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description) {
      toast.error('Descrição é obrigatória');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Valor deve ser maior que zero');
      return;
    }

    if (!formData.categoryId) {
      toast.error('Selecione uma categoria');
      return;
    }

    if (!formData.accountId) {
      toast.error('Selecione uma conta');
      return;
    }

    updateMutation.mutate(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filteredCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Transação" size="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Type Selection */}
        <div className={styles.typeSelector}>
          <button
            type="button"
            className={`${styles.typeButton} ${formData.type === 'EXPENSE' ? styles.active : ''}`}
            onClick={() => {
              handleChange('type', 'EXPENSE');
              handleChange('categoryId', '');
            }}
          >
            Despesa
          </button>
          <button
            type="button"
            className={`${styles.typeButton} ${formData.type === 'INCOME' ? styles.active : ''}`}
            onClick={() => {
              handleChange('type', 'INCOME');
              handleChange('categoryId', '');
            }}
          >
            Receita
          </button>
        </div>

        {/* Description */}
        <Input
          label="Descrição *"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Ex: Supermercado, Salário, etc."
          required
        />

        {/* Date and Amount */}
        <div className={styles.row}>
          <Input
            label="Data *"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
          <Input
            label="Valor *"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="0,00"
            required
          />
        </div>

        {/* Category and Account */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Categoria *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Selecione uma categoria</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Conta *</label>
            <select
              value={formData.accountId}
              onChange={(e) => handleChange('accountId', e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Selecione uma conta</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Person */}
        <div className={styles.formGroup}>
          <label>Pessoa</label>
          <select
            value={formData.personId}
            onChange={(e) => handleChange('personId', e.target.value)}
            className={styles.select}
          >
            <option value="">Comum</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={updateMutation.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
