import { PAGINATION_CONFIG } from '../../../shared/config/config';
import type { Pagination as PaginationType } from '../../../shared/ui/Pagination/Pagination.types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useTablePagination = <T>(data: T[]) => {
  const [pagination, setPagination] = useState<PaginationType>({
    current: PAGINATION_CONFIG.DEFAULTS.page,
    pageSize: PAGINATION_CONFIG.DEFAULTS.pageSize,
    total: data.length,
  });

  const displayData = useMemo(() => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    return data.slice(startIndex, startIndex + pagination.pageSize);
  }, [pagination, data]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: data.length,
    }));
  }, [data.length]);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, current: page }));
  }, []);

  const resetToFirstPage = useCallback(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  return { pagination, displayData, handlePageChange, resetToFirstPage };
};
