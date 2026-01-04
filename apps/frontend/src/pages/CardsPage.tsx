import Card from '@/components/UI/Card';
import styles from './SimplePage.module.css';

export default function CardsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cartões de Crédito</h1>
      <Card>
        <div className={styles.placeholder}>
          <p>🚧 Página em construção</p>
          <p className={styles.subtitle}>
            Em breve você poderá gerenciar seus cartões e parcelas aqui
          </p>
        </div>
      </Card>
    </div>
  );
}
