import type { SortDirection } from '../../../shared/ui/SortIcons/SortIcons.types';
import type { SortConfig } from '../model/types';
import { useCallback, useMemo, useState } from 'react';

export const useTableSort = <T>(data: T[], defaultSort?: SortConfig<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(defaultSort || null);

  const sortedData = useMemo(() => {
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
  }, [data, sortConfig]);

  const handleSort = useCallback(
    (key: keyof T & string) => {
      const direction: SortDirection =
        sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ key, direction });
    },
    [sortConfig],
  );

  return { sortedData, sortConfig, handleSort };
};
