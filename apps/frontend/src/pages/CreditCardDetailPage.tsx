import UploadInvoiceModal from '@/components/CreditCards/UploadInvoiceModal';
import Alert from '@/components/UI/Alert';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useCreditCard, useInvoices } from '@/hooks/useCreditCards';
import { AlertCircle, ArrowLeft, CreditCard as CreditCardIcon, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './CreditCardDetailPage.module.css';

export default function CreditCardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const { data: card, isLoading: cardLoading, error: cardError } = useCreditCard(cardId!);
  const { data: invoices, isLoading: invoicesLoading } = useInvoices(cardId!);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  if (cardLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  if (cardError || !card) {
    return (
      <div className={styles.container}>
        <Alert variant="danger">
          <AlertCircle size={20} />
          Cartão não encontrado
        </Alert>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Badge variant="info">Aberta</Badge>;
      case 'CLOSED':
        return <Badge variant="warning">Fechada</Badge>;
      case 'PAID':
        return <Badge variant="success">Paga</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/app/credit-cards" className={styles.backButton}>
          <ArrowLeft size={20} />
          Voltar
        </Link>
      </div>

      <Card className={styles.cardInfo}>
        <div className={styles.cardHeader}>
          <div className={styles.cardName}>
            <CreditCardIcon size={32} />
            <div>
              <h1>{card.name}</h1>
              {card.brand && (
                <p className={styles.cardBrand}>
                  {card.brand} {card.last4 && `•••• ${card.last4}`}
                </p>
              )}
            </div>
          </div>
          <Badge variant={card.status === 'ACTIVE' ? 'success' : 'secondary'}>
            {card.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>

        <div className={styles.cardDetails}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Limite de Crédito:</span>
            <span className={styles.value}>
              R$ {card.creditLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Dia de Fechamento:</span>
            <span className={styles.value}>Dia {card.closingDay}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Dia de Vencimento:</span>
            <span className={styles.value}>Dia {card.dueDay}</span>
          </div>
        </div>
      </Card>

      <div className={styles.invoicesSection}>
        <div className={styles.invoicesHeader}>
          <h2>
            <FileText size={24} />
            Faturas
          </h2>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload size={18} />
            Fazer Upload de Fatura
          </Button>
        </div>

        {invoicesLoading ? (
          <div className={styles.loading}>Carregando faturas...</div>
        ) : !invoices || invoices.length === 0 ? (
          <Card className={styles.empty}>
            <p>Nenhuma fatura encontrada</p>
          </Card>
        ) : (
          <div className={styles.invoicesList}>
            {invoices.map((invoice) => (
              <Link
                key={invoice.id}
                to={`/app/invoices/${invoice.id}`}
                className={styles.invoiceLink}
              >
                <Card className={styles.invoiceCard}>
                  <div className={styles.invoiceHeader}>
                    <div className={styles.invoiceMonth}>
                      {new Date(invoice.month + '-01').toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>

                  <div className={styles.invoiceAmount}>
                    R$ {invoice.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>

                  {invoice.dueDate && (
                    <div className={styles.invoiceDue}>
                      Vencimento:{' '}
                      {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {isUploadModalOpen && (
        <UploadInvoiceModal
          cardId={cardId!}
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}
    </div>
  );
}
