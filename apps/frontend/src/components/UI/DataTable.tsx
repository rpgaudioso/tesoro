import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { ReactNode, useState } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export default function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = 'Nenhum dado encontrado',
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown size={16} />;
    }
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.sortable ? styles.sortable : ''}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className={styles.headerContent}>
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className={styles.sortIcon}>{getSortIcon(column.key)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? styles.clickable : ''}
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : (row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
