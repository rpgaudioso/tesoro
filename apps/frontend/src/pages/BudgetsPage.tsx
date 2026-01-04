import Card from '@/components/UI/Card';
import styles from './SimplePage.module.css';

export default function BudgetsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Orçamentos</h1>
      <Card>
        <div className={styles.placeholder}>
          <p>🚧 Página em construção</p>
          <p className={styles.subtitle}>
            Em breve você poderá gerenciar seus orçamentos mensais aqui
          </p>
        </div>
      </Card>
    </div>
  );
}
