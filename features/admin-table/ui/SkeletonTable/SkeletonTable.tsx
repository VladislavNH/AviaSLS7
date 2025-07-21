import styles from './SkeletonTable.module.scss';
import { PAGINATION_CONFIG } from '@shared/config/config';
import type { Column } from '@shared/model/Column.types';
import Pagination from '@shared/ui/Pagination';
import type { Pagination as PaginationType } from '@shared/ui/Pagination/Pagination.types';

export const SkeletonTable = <T,>({
  title,
  rowsCount = PAGINATION_CONFIG.DEFAULTS.pageSize,
  columnsCount,
  columns,
  pagination,
  selectable = false,
}: {
  title: string;
  rowsCount?: number;
  columnsCount: number;
  columns: Column<T>[];
  pagination: PaginationType;
  selectable: boolean;
}) => {
  return (
    <div data-testid="skeleton-loader" className={styles.skeletonContainer}>
      <h1 data-testid="table-title" className={styles.title}>
        {title}
      </h1>
      <div className={styles.skeletonWrapper}>
        <div className={styles.skeletonHeader}>
          {Array.from({ length: columnsCount }).map((_, i) => (
            <div
              key={`header-${i}`}
              className={styles.skeletonTh}
              style={{ width: columns[i]?.width }}
            />
          ))}
          {selectable && <div className={`${styles.skeletonTd} ${styles.selector}`} />}
        </div>

        <div className={styles.skeletonBody}>
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles.skeletonRow}>
              {Array.from({ length: columnsCount }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={styles.skeletonTd}
                  style={{ width: columns[colIndex]?.width }}
                />
              ))}
              {selectable && <div className={`${styles.skeletonTd} ${styles.selector}`} />}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalItems={pagination.total || PAGINATION_CONFIG.DEFAULTS.total}
          itemsPerPage={pagination.pageSize}
          currentPage={pagination.current}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
};
