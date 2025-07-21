import { SkeletonTable } from '../SkeletonTable/SkeletonTable';
import styles from './Table.module.scss';
import type { TableProps, Table as TableType } from '@features/admin/model/Table.types';
import { PAGINATION_CONFIG } from '@shared/config/config';
import Pagination from '@shared/ui/Pagination';
import type { Pagination as PaginationType } from '@shared/ui/Pagination/Pagination.types';
import { SortIconAsc } from '@shared/ui/SortIcons/SortIcons';
import type { SortDirection } from '@shared/ui/SortIcons/SortIcons.types';
import { Alert } from 'antd';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableInner = <T,>({
  title,
  columns,
  useQuery,
  rowKey = 'id',
  selectable = false,
  onRowClick,
  onSelectionChange,
  defaultSort,
}: TableProps<T>) => {
  const { data: dataAll = [], isLoading: loading, error } = useQuery();

  const [displayData, setDisplayData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    current: PAGINATION_CONFIG.DEFAULTS.page,
    pageSize: PAGINATION_CONFIG.DEFAULTS.pageSize,
    total: PAGINATION_CONFIG.DEFAULTS.total,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(defaultSort || null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const navigate = useNavigate();

  const memoizedColumns = useMemo(() => columns, [columns]);

  useEffect(() => {
    if (!defaultSort) {
      setSortConfig({ key: 'id', direction: 'asc' });
    }
  }, [defaultSort]);

  const sortData = (data: T[]) => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === bValue) return 0;
      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });
  };

  const sortedData = useMemo(() => sortData(dataAll), [dataAll, sortConfig]);

  useEffect(() => {
    if (loading || error) return;

    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    setDisplayData(sortedData.slice(startIndex, endIndex));
  }, [sortedData, pagination.current, pagination.pageSize, loading, error]);

  useEffect(() => {
    if (!loading)
      setPagination((prev) => ({
        ...prev,
        total: dataAll.length,
      }));
  }, [dataAll.length, loading]);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);

  const handleSort = useCallback(
    (key: string) => {
      const direction: SortDirection =
        sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ key, direction });
      setPagination((prev) => ({ ...prev, current: 1 }));
    },
    [sortConfig],
  );

  const handleRowSelect = (row: T, checked: boolean) => {
    const newSelected = checked
      ? [...selectedRows, row]
      : selectedRows.filter((r) => r[rowKey as keyof T] !== row[rowKey as keyof T]);

    setSelectedRows(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? displayData : [];
    setSelectedRows(newSelected);
    onSelectionChange?.(newSelected);
  };

  if (loading)
    return (
      <SkeletonTable
        title={title}
        rowsCount={pagination.pageSize}
        columnsCount={memoizedColumns.length}
        columns={memoizedColumns}
        pagination={pagination}
        selectable
      />
    );

  if (error)
    return (
      <Alert
        type="error"
        message="Error fetching data"
        onClose={() => navigate('/')}
        closable={true}
      />
    );

  return (
    <div className={styles.adminTable}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tableContainer}>
        <table title={title}>
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={column.sortable ? styles.sortable : ''}
                >
                  <div className={styles.headerCell}>
                    {column.title}
                    {column.sortable && (
                      <span className={styles.sortIcons}>
                        <SortIconAsc sortConfig={sortConfig} columnKey={column.key} />
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {selectable && (
                <th className={styles.selector}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === displayData.length && displayData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {displayData.map((row) => (
              <tr
                key={String(row[rowKey as keyof T])}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? `${styles.clickable}` : ' '}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${styles.tableCell} ${styles.ellipsisCell}`}
                    style={{ width: column.width }}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof T], row)
                      : String(row[column.key as keyof T])}
                  </td>
                ))}

                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.some(
                        (r) => r[rowKey as keyof T] === row[rowKey as keyof T],
                      )}
                      onChange={(e) => handleRowSelect(row, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
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

export const Table = React.memo(TableInner) as TableType;
