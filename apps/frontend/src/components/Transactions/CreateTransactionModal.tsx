import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Account, Category, Person } from '@tesoro/shared';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import styles from './CreateTransactionModal.module.css';

interface CreateTransactionModalProps {
  onClose: () => void;
}

export default function CreateTransactionModal({ onClose }: CreateTransactionModalProps) {
  const { currentWorkspace } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    description: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    categoryId: '',
    accountId: '',
    personId: '',
    paid: false,
    kind: 'MANUAL' as const,
  });

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

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await api.post('/transactions', {
        ...data,
        amount: parseFloat(data.amount),
        personId: data.personId || null,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transação criada com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar transação');
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

    createMutation.mutate(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filteredCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Nova Transação</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

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

          {/* Paid Checkbox */}
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.paid}
                onChange={(e) => handleChange('paid', e.target.checked)}
              />
              <span>Marcar como pago</span>
            </label>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={createMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Criando...' : 'Criar Transação'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
