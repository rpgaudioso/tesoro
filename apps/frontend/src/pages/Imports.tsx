import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    AlertCircle,
    Check,
    FileSpreadsheet,
    Loader2,
    Upload,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import api from '../lib/api';
import styles from './Imports.module.css';

interface ImportedRow {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  document?: string;
  suggestedCategoryId?: string;
  categoryId?: string;
  personId?: string;
  confirmed: boolean;
}

interface ImportBatch {
  id: string;
  fileName: string;
  importType: string;
  status: string;
  createdAt: Date;
  rows: ImportedRow[];
  _count: {
    confirmedRows: number;
    pendingRows: number;
  };
}

interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  color: string;
}

interface Person {
  id: string;
  name: string;
}

interface Account {
  id: string;
  name: string;
}

interface Card {
  id: string;
  name: string;
}

interface CardType {
  id: string;
  name: string;
}

export function Imports() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [importBatch, setImportBatch] = useState<ImportBatch | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    loadCategories();
    loadPeople();
    loadAccounts();
    loadCards();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get('/categories');
      console.log('📦 Categorias carregadas:', response.data.length, response.data);
      setCategories(response.data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  }

  async function loadPeople() {
    try {
      const response = await api.get('/people');
      setPeople(response.data);
    } catch (err) {
      console.error('Erro ao carregar pessoas:', err);
    }
  }

  async function loadAccounts() {
    try {
      const response = await api.get('/accounts');
      setAccounts(response.data);
    } catch (err) {
      console.error('Erro ao carregar contas:', err);
    }
  }

  async function loadCards() {
    try {
      const response = await api.get('/cards');
      setCards(response.data);
    } catch (err) {
      console.error('Erro ao carregar cartões:', err);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/imports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const batch = response.data;
      const preview = await api.get(`/imports/${batch.batchId}/preview`);
      setImportBatch(preview.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Erro ao fazer upload do arquivo'
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleUpdateRow(
    batchId: string,
    rowId: string,
    updates: Partial<ImportedRow>
  ) {
    console.log('🔄 Atualizando linha:', { rowId, updates });
    try {
      await api.patch(`/imports/${batchId}/rows/${rowId}`, updates);

      // Atualizar estado local
      setImportBatch((prev) => {
        if (!prev) return null;
        
        const updatedRows = prev.rows.map((row) =>
          row.id === rowId ? { ...row, ...updates } : row
        );
        
        // Recalcular os contadores
        const confirmedRows = updatedRows.filter(r => r.confirmed).length;
        const pendingRows = updatedRows.filter(r => !r.confirmed).length;
        
        const newState = {
          ...prev,
          rows: updatedRows,
          _count: {
            confirmedRows,
            pendingRows
          }
        };
        console.log('✅ Estado atualizado. Linha afetada:', newState.rows.find(r => r.id === rowId));
        return newState;
      });
    } catch (err) {
      console.error('Erro ao atualizar linha:', err);
    }
  }

  async function handleConfirmImport() {
    if (!importBatch) return;

    // Validar que todas as linhas confirmadas têm categoria
    const confirmedRows = importBatch.rows.filter((row) => row.confirmed);
    
    console.log('🔍 VALIDAÇÃO DE CONFIRMAÇÃO');
    console.log('Total de linhas:', importBatch.rows.length);
    console.log('Linhas confirmadas:', confirmedRows.length);
    confirmedRows.forEach((row, idx) => {
      console.log(`Linha ${idx + 1}:`, {
        id: row.id,
        description: row.description?.substring(0, 40),
        categoryId: row.categoryId,
        suggestedCategoryId: row.suggestedCategoryId,
        hasCategoryId: !!row.categoryId,
        hasSuggestedCategoryId: !!row.suggestedCategoryId,
        hasAnyCategory: !!(row.categoryId || row.suggestedCategoryId)
      });
    });
    
    // Aceita tanto categoryId (seleção manual) quanto suggestedCategoryId (auto-sugestão)
    const missingCategory = confirmedRows.some((row) => !row.categoryId && !row.suggestedCategoryId);

    if (missingCategory) {
      const rowsWithoutCategory = confirmedRows.filter(r => !r.categoryId && !r.suggestedCategoryId);
      console.error('❌ Linhas sem categoria:', rowsWithoutCategory.map(r => ({
        id: r.id,
        description: r.description?.substring(0, 40),
        categoryId: r.categoryId,
        suggestedCategoryId: r.suggestedCategoryId
      })));
      setError('Todas as transações confirmadas devem ter uma categoria');
      return;
    }
    
    console.log('✅ Todas as linhas têm categoria!');

    // Validar que foi selecionada uma conta ou cartão
    if (!selectedAccount && !selectedCard) {
      setError('Selecione uma conta ou cartão para importar');
      return;
    }

    setConfirming(true);
    setError(null);

    try {
      await api.post(`/imports/${importBatch.id}/confirm`, {
        accountId: selectedAccount || undefined,
        cardId: selectedCard || undefined,
      });

      navigate('/app/transactions');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Erro ao confirmar importação'
      );
    } finally {
      setConfirming(false);
    }
  }

  function getCategoryColor(categoryId: string) {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || '#6b7280';
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Importar Lançamentos</h1>
        <p className={styles.subtitle}>
          Importe extratos bancários e de cartão de crédito
        </p>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <AlertCircle className={styles.errorIcon} size={20} />
          <div className={styles.errorContent}>
            <h3>Erro</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!importBatch ? (
        <Card>
          <div className={styles.uploadCard}>
            <div className={styles.uploadIcon}>
              <FileSpreadsheet size={32} />
            </div>
            <h2 className={styles.uploadTitle}>Selecione um arquivo</h2>
            <p className={styles.uploadDescription}>
              Formatos suportados: Santander (Conta Corrente e Cartão de
              Crédito)
            </p>

            <label className={styles.uploadButton}>
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processando...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Escolher arquivo
                </>
              )}
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className={styles.batchHeader}>
            <div className={styles.batchInfo}>
              <div>
                <h2 className={styles.batchTitle}>{importBatch.fileName}</h2>
                <p className={styles.batchMeta}>
                  {importBatch.importType} •{' '}
                  {importBatch._count.pendingRows + importBatch._count.confirmedRows}{' '}
                  transações
                </p>
              </div>
              <div className={styles.badges}>
                <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                  {importBatch._count.confirmedRows} confirmadas
                </span>
                <span className={`${styles.badge} ${styles.badgeDefault}`}>
                  {importBatch._count.pendingRows} pendentes
                </span>
              </div>
            </div>

            <div className={styles.selectionGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Conta Bancária</label>
                <select
                  className={styles.select}
                  value={selectedAccount}
                  onChange={(e) => {
                    setSelectedAccount(e.target.value);
                    if (e.target.value) setSelectedCard('');
                  }}
                >
                  <option value="">Selecione uma conta</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cartão de Crédito</label>
                <select
                  className={styles.select}
                  value={selectedCard}
                  onChange={(e) => {
                    setSelectedCard(e.target.value);
                    if (e.target.value) setSelectedAccount('');
                  }}
                >
                  <option value="">Selecione um cartão</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabela de transações */}
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={importBatch.rows.every((row) => row.confirmed)}
                    onChange={async (e) => {
                      const confirmed = e.target.checked;
                      
                      // Atualizar todas as linhas no backend
                      const updatePromises = importBatch.rows.map((row) =>
                        api.patch(`/imports/${importBatch.id}/rows/${row.id}`, { confirmed })
                      );
                      
                      try {
                        await Promise.all(updatePromises);
                        
                        // Atualizar estado local
                        setImportBatch({
                          ...importBatch,
                          rows: importBatch.rows.map((row) => ({
                            ...row,
                            confirmed,
                          })),
                          _count: {
                            confirmedRows: confirmed ? importBatch.rows.length : 0,
                            pendingRows: confirmed ? 0 : importBatch.rows.length,
                          },
                        });
                      } catch (err) {
                        console.error('Erro ao atualizar linhas:', err);
                      }
                    }}
                  />
                </th>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Pessoa</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
                  {importBatch.rows.map((row, rowIndex) => {
                    const rowCategories = categories.filter(
                      (c) => c.type === row.type
                    );
                    const categoryId =
                      row.categoryId || row.suggestedCategoryId || '';
                    
                    // Log apenas da primeira linha para não poluir
                    if (rowIndex === 0) {
                      console.log('📋 Renderizando linha 1:', {
                        categoryId: row.categoryId,
                        suggestedCategoryId: row.suggestedCategoryId,
                        categoryIdUsado: categoryId,
                        rowType: row.type,
                        categoriasDisponiveis: rowCategories.length
                      });
                    }

                    return (
                      <tr
                        key={row.id}
                        className={row.confirmed ? styles.confirmed : ''}
                      >
                        <td>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={row.confirmed}
                            onChange={(e) =>
                              handleUpdateRow(importBatch.id, row.id, {
                                confirmed: e.target.checked,
                              })
                            }
                          />
                        </td>
                        <td>
                          {format(new Date(row.date), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </td>
                        <td>
                          <div className={styles.description}>
                            {row.description}
                          </div>
                          {row.document && (
                            <div className={styles.document}>
                              Doc: {row.document}
                            </div>
                          )}
                        </td>
                        <td>
                          <select
                            className={styles.categorySelect}
                            value={categoryId}
                            onChange={(e) => {
                              console.log('🎯 Dropdown onChange disparado:', { 
                                rowId: row.id, 
                                value: e.target.value,
                                isEmpty: !e.target.value 
                              });
                              handleUpdateRow(importBatch.id, row.id, {
                                categoryId: e.target.value,
                              });
                            }}
                            style={{
                              borderLeftWidth: '4px',
                              borderLeftColor: getCategoryColor(categoryId),
                            }}
                          >
                            <option value="">Selecione</option>
                            {rowCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className={styles.categorySelect}
                            value={row.personId || ''}
                            onChange={(e) =>
                              handleUpdateRow(importBatch.id, row.id, {
                                personId: e.target.value || undefined,
                              })
                            }
                          >
                            <option value="">Comum</option>
                            {people.map((person) => (
                              <option key={person.id} value={person.id}>
                                {person.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <span
                            className={
                              row.type === 'INCOME'
                                ? styles.amountIncome
                                : styles.amountExpense
                            }
                          >
                            {row.type === 'INCOME' ? '+' : '-'} R${' '}
                            {Math.abs(row.amount).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles.actions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setImportBatch(null);
                    setSelectedAccount('');
                    setSelectedCard('');
                  }}
                >
                  Cancelar
                </button>

                <button
                  className={styles.confirmButton}
                  onClick={handleConfirmImport}
                  disabled={
                    confirming ||
                    importBatch._count.confirmedRows === 0 ||
                    (!selectedAccount && !selectedCard)
                  }
                >
                  {confirming ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Confirmar Importação ({importBatch._count.confirmedRows}{' '}
                      transações)
                    </>
                  )}
                </button>
              </div>
            </Card>
          )}
      </div>
    );
  }

