import type { Column } from '../../model/Column.types';
import { SortIcon } from '../SortIcons/SortIcons';
import type { SortDirection } from '../SortIcons/SortIcons.types';
import styles from './SortableHeader.module.scss';

interface SortableHeaderProps<T> {
  title: string;
  columnKey: keyof T & string;
  sortable?: boolean;
  sortConfig: { key: string; direction: SortDirection } | null;
  onSort: (key: keyof T & string) => void;
}

export const SortableHeader = <T,>({
  title,
  columnKey,
  sortable,
  sortConfig,
  onSort,
}: SortableHeaderProps<T>) => {
  const handleHeaderKeyDown = (e: React.KeyboardEvent, column: Column<T>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (column.sortable) onSort(column.key);
    }
  };
  return (
    <th
      role="columnheader"
      tabIndex={sortable ? 0 : -1}
      aria-sort={
        sortConfig?.key === columnKey
          ? sortConfig.direction === 'asc'
            ? 'ascending'
            : 'descending'
          : sortable
            ? 'none'
            : undefined
      }
      data-testid={columnKey === 'id' ? 'sort-id' : ''}
      onClick={() => sortable && onSort(columnKey)}
      onKeyDown={(e) => handleHeaderKeyDown(e, { key: columnKey, sortable } as Column<T>)}
      className={sortable ? styles.sortable : ''}
    >
      <div className={styles.headerCell}>
        {title}
        {sortable && (
          <span className={styles.sortIcons}>
            <SortIcon sortConfig={sortConfig} columnKey={columnKey} />
          </span>
        )}
      </div>
    </th>
  );
};
