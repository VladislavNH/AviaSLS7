import Pagination from '../../../../shared/ui/Pagination';
import { useTablePagination } from '../../lib/useTablePagination';
import { useTableSelection } from '../../lib/useTableSelections';
import { useTableSort } from '../../lib/useTableSort';
import type { TableProps, Table as TableType } from '../../model/types';
import { SkeletonTable } from '../SkeletonTable/SkeletonTable';
import { TableBody } from '../TableBody/TableBody';
import { TableHeader } from '../TableHeader/TableHeader';
import styles from './Table.module.scss';
import Alert from 'antd/es/alert';
import { memo, useMemo } from 'react';

export const TableInner = <T,>({
  title,
  columns,
  data = [],
  isLoading = false,
  isError = false,
  rowKey,
  selectable = false,
  onRowClick,
  onSelectionChange,
  onError,
  defaultSort,
}: TableProps<T>) => {
  const safeRowKey = useMemo(
    () =>
      rowKey ||
      (Object.keys(data[0] || {}).includes('id')
        ? ('id' as keyof T & string)
        : (Object.keys(data[0] || {})[0] as keyof T & string)),
    [rowKey, data],
  );

  const { sortedData, sortConfig, handleSort } = useTableSort<T>(data, defaultSort);
  const { pagination, displayData, handlePageChange, resetToFirstPage } =
    useTablePagination<T>(sortedData);
  const { selectedRows, handleRowSelect, handleSelectAll } = useTableSelection<T>(
    safeRowKey,
    onSelectionChange,
  );

  const handleSortWithReset = (key: keyof T & string) => {
    handleSort(key);
    resetToFirstPage();
  };

  if (isLoading)
    return (
      <SkeletonTable
        title={title}
        rowsCount={pagination.pageSize}
        columnsCount={columns.length}
        columns={columns}
        pagination={pagination}
        selectable
      />
    );

  if (isError)
    return (
      <Alert
        data-testid="error"
        type="error"
        message="Error fetching data"
        onClose={onError}
        closable={true}
        showIcon
      />
    );
  if (!isLoading && data.length === 0)
    return (
      <Alert
        data-testid="no-data"
        type="info"
        message="No data available"
        onClose={onError}
        closable={true}
        showIcon
      />
    );

  return (
    <div className={styles.adminTable}>
      <h1 className={styles.title} data-testid="table-title">
        {title}
      </h1>
      <div className={styles.tableContainer}>
        <table
          role="table"
          aria-label={title}
          aria-rowcount={pagination.total}
          aria-colcount={columns.length + (selectable ? 1 : 0)}
        >
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            selectable={selectable}
            selectedCount={selectedRows.length}
            totalCount={displayData.length}
            onSort={handleSortWithReset}
            onSelectAll={(args) => handleSelectAll(args.checked, displayData)}
          />
          <TableBody
            data={displayData}
            columns={columns}
            rowKey={safeRowKey}
            selectable={selectable}
            selectedRows={selectedRows}
            onRowClick={onRowClick}
            onRowSelect={handleRowSelect}
          />
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          totalItems={pagination.total}
          itemsPerPage={pagination.pageSize}
          currentPage={pagination.current}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export const Table = memo(TableInner, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.isError === nextProps.isError &&
    prevProps.rowKey === nextProps.rowKey &&
    prevProps.selectable === nextProps.selectable &&
    prevProps.onRowClick === nextProps.onRowClick &&
    prevProps.onSelectionChange === nextProps.onSelectionChange &&
    prevProps.defaultSort === nextProps.defaultSort
  );
}) as TableType;
