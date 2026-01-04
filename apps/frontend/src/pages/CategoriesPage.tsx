import Card from '@/components/UI/Card';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Category } from '@tesoro/shared';
import styles from './SimplePage.module.css';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Categorias</h1>
      <Card>
        <div className={styles.categoryGrid}>
          {categories?.map((category) => (
            <div key={category.id} className={styles.categoryItem}>
              <span className={styles.categoryIcon}>{category.icon || '📦'}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
