import { createCard, deleteCard, getCards, getPeople, updateCard } from '@/lib/settingsApi';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import styles from './CardsList.module.css';

// Helper para gerar URL completa da imagem
const getImageUrl = (photoUrl: string | undefined) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith('http')) return photoUrl;
  return `http://localhost:3000${photoUrl}`;
};

interface Card {
  id: string;
  name: string;
  closingDay?: number;
  dueDay?: number;
  limit?: number;
  active: boolean;
  people?: Array<{ person: { id: string; name: string; photoUrl?: string; color?: string } }>;
}

interface Person {
  id: string;
  name: string;
  color?: string;
  photoUrl?: string;
  active: boolean;
}

export default function CardsList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    closingDay: '',
    dueDay: '',
    limit: '',
    personIds: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cardsResponse, peopleResponse] = await Promise.all([
        getCards(),
        getPeople(),
      ]);
      setCards(cardsResponse.data);
      setPeople(peopleResponse.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    try {
      const data = {
        name: formData.name,
        closingDay: formData.closingDay ? parseInt(formData.closingDay) : undefined,
        dueDay: formData.dueDay ? parseInt(formData.dueDay) : undefined,
        limit: formData.limit ? parseFloat(formData.limit) : undefined,
        personIds: formData.personIds,
      };

      if (editingId) {
        await updateCard(editingId, data);
        toast.success('Cartão atualizado');
      } else {
        await createCard(data);
        toast.success('Cartão criado com sucesso');
      }
      setFormData({ name: '', closingDay: '', dueDay: '', limit: '', personIds: [] });
      setEditingId(null);
      setShowForm(false);
      await loadData();
    } catch (error) {
      toast.error('Erro ao salvar cartão');
    }
  };

  const handleEdit = (card: Card) => {
    setEditingId(card.id);
    setFormData({
      name: card.name,
      closingDay: card.closingDay?.toString() || '',
      dueDay: card.dueDay?.toString() || '',
      limit: card.limit?.toString() || '',
      personIds: card.people?.map((p) => p.person.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar?')) return;

    try {
      await deleteCard(id);
      toast.success('Cartão deletado');
      await loadData();
    } catch (error) {
      toast.error('Erro ao deletar cartão');
    }
  };

  const togglePersonSelection = (personId: string) => {
    setFormData((prev) => ({
      ...prev,
      personIds: prev.personIds.includes(personId)
        ? prev.personIds.filter((id) => id !== personId)
        : [...prev.personIds, personId],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Cartões</h2>
        <button
          className={styles.btnPrimary}
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', closingDay: '', dueDay: '', limit: '', personIds: [] });
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Novo Cartão
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome do Cartão</label>
            <input
              type="text"
              placeholder="Digite o nome do cartão"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              autoFocus
            />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Dia do Fechamento</label>
              <input
                type="number"
                placeholder="1-31"
                min="1"
                max="31"
                value={formData.closingDay}
                onChange={(e) => setFormData({ ...formData, closingDay: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Dia do Vencimento</label>
              <input
                type="number"
                placeholder="1-31"
                min="1"
                max="31"
                value={formData.dueDay}
                onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Limite de Crédito</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              className={styles.input}
              step="0.01"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Associar a Pessoas</label>
            <div className={styles.checkboxGroup}>
              {people.length === 0 ? (
                <p className={styles.placeholder}>Nenhuma pessoa cadastrada. Cadastre pessoas primeiro.</p>
              ) : (
                people.map((person) => (
                  <label key={person.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.personIds.includes(person.id)}
                      onChange={() => togglePersonSelection(person.id)}
                      className={styles.checkbox}
                    />
                    <span
                      className={styles.personColor}
                      style={{ backgroundColor: person.color || '#3B82F6' }}
                    />
                    {person.name}
                  </label>
                ))
              )}
            </div>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {editingId ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : cards.length === 0 ? (
        <div className={styles.empty}>Nenhum cartão cadastrado</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Fechamento</th>
              <th>Vencimento</th>
              <th>Limite</th>
              <th>Pessoas</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id}>
                <td>{card.name}</td>
                <td>{card.closingDay || '-'}</td>
                <td>{card.dueDay || '-'}</td>
                <td>{card.limit ? `R$ ${card.limit.toFixed(2)}` : '-'}</td>
                <td>
                  <div className={styles.peoplePhotos}>
                    {card.people && card.people.length > 0 ? (
                      card.people.map(({ person }) => (
                        <div key={person.id} className={styles.personPhotoWrapper} title={person.name}>
                          {person.photoUrl ? (
                            <img 
                              src={getImageUrl(person.photoUrl)} 
                              alt={person.name} 
                              className={styles.personPhoto} 
                            />
                          ) : (
                            <div 
                              className={styles.personPhotoPlaceholder}
                              style={{ backgroundColor: person.color || '#3B82F6' }}
                            >
                              {person.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className={styles.noPeople}>-</span>
                    )}
                  </div>
                </td>
                <td>{card.active ? '✓ Ativo' : '✗ Inativo'}</td>
                <td>
                  <div className={styles.actions}>
                  <button
                    className={styles.btnIcon}
                    onClick={() => handleEdit(card)}
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={styles.btnIconDanger}
                    onClick={() => handleDelete(card.id)}
                    title="Deletar"
                  >
                    <Trash2 size={16} />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
