import CreateCreditCardModal from '@/components/CreditCards/CreateCreditCardModal';
import PageHeader from '@/components/Layout/PageHeader';
import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useCreditCards } from '@/hooks/useCreditCards';
import { AlertCircle, CreditCard as CreditCardIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreditCardsPage.module.css';

export default function CreditCardsPage() {
  const { data: cards, isLoading, error } = useCreditCards();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Carregando cartões...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Alert variant="danger">
          <AlertCircle size={20} />
          Erro ao carregar cartões de crédito
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Cartões de Crédito"
        subtitle="Gerencie seus cartões de crédito e acompanhe suas faturas"
        action={
          <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Novo Cartão
          </Button>
        }
      />

      {!cards || cards.length === 0 ? (
        <Card>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <CreditCardIcon size={48} strokeWidth={1.5} />
            </div>
            <h2 className={styles.emptyTitle}>Nenhum cartão cadastrado</h2>
            <p className={styles.emptyDescription}>
              Adicione um cartão de crédito para começar a gerenciar suas faturas
            </p>
            <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)}>
              <Plus size={18} />
              Adicionar Cartão
            </Button>
          </div>
        </Card>
      ) : (
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} to={`/app/credit-cards/${card.id}`} className={styles.cardLink}>
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardName}>
                    <CreditCardIcon size={24} />
                    <h3>{card.name}</h3>
                  </div>
                  <Badge variant={card.status === 'ACTIVE' ? 'success' : 'secondary'}>
                    {card.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                {card.brand && (
                  <div className={styles.cardBrand}>
                    {card.brand} {card.last4 && `•••• ${card.last4}`}
                  </div>
                )}

                <div className={styles.cardInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Limite:</span>
                    <span className={styles.value}>
                      R$ {card.creditLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Fechamento:</span>
                    <span className={styles.value}>Dia {card.closingDay}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Vencimento:</span>
                    <span className={styles.value}>Dia {card.dueDay}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateCreditCardModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
