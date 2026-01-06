import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import CreateCreditCardModal from '@/components/CreditCards/CreateCreditCardModal';
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
      <div className={styles.container}>
        <div className={styles.loading}>Carregando cartões...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Alert variant="danger">
          <AlertCircle size={20} />
          Erro ao carregar cartões de crédito
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Cartões de Crédito</h1>
          <p className={styles.subtitle}>
            Gerencie seus cartões de crédito e acompanhe suas faturas
          </p>
        </div>
        <Button variant="primary" size="medium" onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Novo Cartão
        </Button>
      </div>

      {!cards || cards.length === 0 ? (
        <div className={styles.emptyState}>
          <Card className={styles.empty}>
            <div className={styles.emptyIcon}>
              <CreditCardIcon size={64} strokeWidth={1.5} />
            </div>
            <h2>Nenhum cartão cadastrado</h2>
            <p>Adicione um cartão de crédito para começar a gerenciar suas faturas</p>
            <Button variant="primary" size="medium" onClick={() => setShowCreateModal(true)}>
              <Plus size={20} />
              Adicionar Cartão
            </Button>
          </Card>
        </div>
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
