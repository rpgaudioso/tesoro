import { useInvoice } from '@/hooks/useCreditCards';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, PieChart } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import styles from './InvoiceDetailPage.module.css';

export default function InvoiceDetailPage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { data: invoice, isLoading, error } = useInvoice(invoiceId!);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando fatura...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className={styles.container}>
        <Alert variant="danger">
          <AlertCircle size={20} />
          Fatura não encontrada
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link
          to={`/app/credit-cards/${invoice.creditCardId}`}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>
      </div>

      <Card className={styles.invoiceHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <FileText size={32} />
            <div>
              <h1>
                Fatura {new Date(invoice.month + '-01').toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h1>
              <p className={styles.cardName}>{invoice.creditCard?.name}</p>
            </div>
          </div>
          {getStatusBadge(invoice.status)}
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Total:</span>
            <span className={styles.totalAmount}>{formatCurrency(invoice.totalAmount)}</span>
          </div>
          {invoice.dueDate && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Vencimento:</span>
              <span className={styles.value}>{formatDate(invoice.dueDate)}</span>
            </div>
          )}
          {invoice.closedAt && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Fechada em:</span>
              <span className={styles.value}>{formatDate(invoice.closedAt)}</span>
            </div>
          )}
        </div>
      </Card>

      {invoice.totalsByCategory && invoice.totalsByCategory.length > 0 && (
        <Card className={styles.categoriesSection}>
          <h2>
            <PieChart size={24} />
            Despesas por Categoria
          </h2>
          <div className={styles.categoriesList}>
            {invoice.totalsByCategory.map((cat) => {
              const percentage = invoice.totalAmount > 0
                ? (cat.total / invoice.totalAmount) * 100
                : 0;

              return (
                <div key={cat.categoryId || 'uncategorized'} className={styles.categoryItem}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryName}>
                      {cat.categoryIcon && <span>{cat.categoryIcon}</span>}
                      <span>{cat.categoryName}</span>
                    </div>
                    <span className={styles.categoryAmount}>{formatCurrency(cat.total)}</span>
                  </div>
                  <ProgressBar
                    value={percentage}
                    max={100}
                    color={cat.categoryColor}
                  />
                  <div className={styles.categoryPercentage}>
                    {percentage.toFixed(1)}% do total
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {invoice.charges && invoice.charges.length > 0 && (
        <Card className={styles.chargesSection}>
          <h2>Lançamentos ({invoice.charges.length})</h2>
          <div className={styles.chargesTable}>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th align="right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {invoice.charges.map((charge) => (
                  <tr key={charge.id}>
                    <td>{formatDate(charge.purchaseDate)}</td>
                    <td>{charge.description}</td>
                    <td>
                      {charge.category ? (
                        <Badge variant="secondary">{charge.category.name}</Badge>
                      ) : (
                        <span className={styles.uncategorized}>Sem categoria</span>
                      )}
                    </td>
                    <td>
                      <Badge
                        variant={
                          charge.type === 'PURCHASE' ? 'info' :
                          charge.type === 'REFUND' ? 'success' :
                          'secondary'
                        }
                      >
                        {charge.type}
                      </Badge>
                    </td>
                    <td align="right" className={charge.amount < 0 ? styles.refund : ''}>
                      {formatCurrency(Math.abs(charge.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {invoice.payment && (
        <Card className={styles.paymentSection}>
          <h2>Pagamento</h2>
          <div className={styles.paymentInfo}>
            <div className={styles.paymentItem}>
              <span className={styles.label}>Pago em:</span>
              <span className={styles.value}>{formatDate(invoice.payment.paidAt)}</span>
            </div>
            <div className={styles.paymentItem}>
              <span className={styles.label}>Valor pago:</span>
              <span className={styles.value}>{formatCurrency(invoice.payment.amount)}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
