import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useCreateCreditCard } from '@/hooks/useCreditCards';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import styles from './CreateCreditCardModal.module.css';

interface CreateCreditCardModalProps {
  onClose: () => void;
}

export default function CreateCreditCardModal({ onClose }: CreateCreditCardModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    last4: '',
    creditLimit: '',
    closingDay: '',
    dueDay: '',
  });

  const createMutation = useCreateCreditCard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim()) {
      toast.error('Nome do cartão é obrigatório');
      return;
    }

    if (!formData.creditLimit || parseFloat(formData.creditLimit) <= 0) {
      toast.error('Limite de crédito deve ser maior que zero');
      return;
    }

    const closingDay = parseInt(formData.closingDay);
    const dueDay = parseInt(formData.dueDay);

    if (!closingDay || closingDay < 1 || closingDay > 31) {
      toast.error('Dia de fechamento deve ser entre 1 e 31');
      return;
    }

    if (!dueDay || dueDay < 1 || dueDay > 31) {
      toast.error('Dia de vencimento deve ser entre 1 e 31');
      return;
    }

    createMutation.mutate(
      {
        name: formData.name.trim(),
        brand: formData.brand.trim() || undefined,
        last4: formData.last4.trim() || undefined,
        creditLimit: parseFloat(formData.creditLimit),
        closingDay,
        dueDay,
        status: 'ACTIVE',
      },
      {
        onSuccess: () => {
          toast.success('Cartão criado com sucesso!');
          onClose();
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || 'Erro ao criar cartão');
        },
      }
    );
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Novo Cartão de Crédito</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome do Cartão *"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: Cartão Visa"
            required
          />

          <div className={styles.row}>
            <Input
              label="Bandeira"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              placeholder="Ex: Visa, Mastercard"
            />
            <Input
              label="Últimos 4 dígitos"
              value={formData.last4}
              onChange={(e) => handleChange('last4', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              maxLength={4}
            />
          </div>

          <Input
            label="Limite de Crédito *"
            type="number"
            value={formData.creditLimit}
            onChange={(e) => handleChange('creditLimit', e.target.value)}
            placeholder="10000.00"
            step="0.01"
            min="0"
            required
          />

          <div className={styles.row}>
            <Input
              label="Dia de Fechamento *"
              type="number"
              value={formData.closingDay}
              onChange={(e) => handleChange('closingDay', e.target.value)}
              placeholder="10"
              min="1"
              max="31"
              required
            />
            <Input
              label="Dia de Vencimento *"
              type="number"
              value={formData.dueDay}
              onChange={(e) => handleChange('dueDay', e.target.value)}
              placeholder="20"
              min="1"
              max="31"
              required
            />
          </div>

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
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Criando...' : 'Criar Cartão'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
