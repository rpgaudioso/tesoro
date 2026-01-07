import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Modal from '@/components/UI/Modal';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Account, Category, Person } from '@tesoro/shared';
import { TransactionStatus } from '@tesoro/shared';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import styles from './CreateTransactionModal.module.css';

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  description: '',
  date: new Date().toISOString().split('T')[0],
  amount: '',
  type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
  categoryId: '',
  accountId: '',
  personId: '',
  status: TransactionStatus.PENDING,
  kind: 'MANUAL' as const,
  paymentMethod: 'cash' as 'cash' | 'credit_card',
  creditCardId: '',
  installments: 1,
};

export default function CreateTransactionModal({ isOpen, onClose }: CreateTransactionModalProps) {
  const { currentWorkspace } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...initialFormData,
        date: new Date().toISOString().split('T')[0], // Always use current date
      });
    }
  }, [isOpen]);

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

    // Account is required for INCOME or for EXPENSE with cash payment
    if (formData.type === 'INCOME' && !formData.accountId) {
      toast.error('Selecione uma conta');
      return;
    }

    if (formData.type === 'EXPENSE' && formData.paymentMethod === 'cash' && !formData.accountId) {
      toast.error('Selecione uma conta');
      return;
    }

    if (formData.type === 'EXPENSE' && formData.paymentMethod === 'credit_card' && !formData.creditCardId) {
      toast.error('Selecione um cartão de crédito');
      return;
    }

    // For credit card payments, accountId is not required
    // For INCOME, always use accountId
    const dataToSubmit = {
      ...formData,
      accountId: formData.type === 'INCOME' || formData.paymentMethod === 'cash' ? formData.accountId : undefined,
    };

    createMutation.mutate(dataToSubmit);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filteredCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação" size="md">
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
              handleChange('paymentMethod', 'cash');
              handleChange('creditCardId', '');
              handleChange('installments', 1);
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

        {/* Category */}
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

        {/* Account - Always for INCOME, conditional for EXPENSE */}
        {(formData.type === 'INCOME' || formData.paymentMethod === 'cash') && (
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
        )}

        {/* Payment Method - Only for EXPENSE */}
        {formData.type === 'EXPENSE' && (
          <div className={styles.formGroup}>
            <label>Forma de Pagamento *</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => {
                handleChange('paymentMethod', e.target.value);
                if (e.target.value === 'cash') {
                  handleChange('creditCardId', '');
                  handleChange('installments', 1);
                }
              }}
              className={styles.select}
              required
            >
              <option value="cash">À Vista (Conta Corrente)</option>
              <option value="credit_card">Cartão de Crédito</option>
            </select>
          </div>
        )}

        {/* Credit Card (only if payment method is credit card) */}
        {formData.paymentMethod === 'credit_card' && (
          <>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Cartão de Crédito *</label>
                <select
                  value={formData.creditCardId}
                  onChange={(e) => handleChange('creditCardId', e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Selecione um cartão</option>
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name} ({card.brand})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Parcelas *</label>
                <select
                  value={formData.installments}
                  onChange={(e) => handleChange('installments', parseInt(e.target.value))}
                  className={styles.select}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num} value={num}>
                      {num}x {num > 1 && `de R$ ${(parseFloat(formData.amount || '0') / num).toFixed(2)}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

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

        {/* Status */}
        <div className={styles.formGroup}>
          <label>Status *</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={styles.select}
            required
          >
            <option value={TransactionStatus.PENDING}>
              {formData.type === 'INCOME' ? 'Pendente (A Receber)' : 'Pendente (A Pagar)'}
            </option>
            <option value={TransactionStatus.PAID}>
              {formData.type === 'INCOME' ? 'Recebido' : 'Pago'}
            </option>
            <option value={TransactionStatus.CANCELLED}>Cancelado</option>
          </select>
        </div>

        {formData.type === 'EXPENSE' && formData.paymentMethod === 'credit_card' && (
          <div className={styles.infoBox}>
            <span>💳 Transações no cartão de crédito são pagas quando a fatura é quitada</span>
          </div>
        )}

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
    </Modal>
  );
}
