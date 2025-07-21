import { useCallback, useState } from 'react';

export const useTableSelection = <T>(
  rowKey: keyof T & string,
  onSelectionChange?: (selectedRows: T[]) => void,
) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleRowSelect = useCallback(
    (args: { row?: T; checked: boolean }) => {
      const { row, checked } = args;

      if (!row) return;

      const newSelected = checked
        ? [...selectedRows, row]
        : selectedRows.filter((r) => r[rowKey as keyof T] !== row[rowKey as keyof T]);

      setSelectedRows(newSelected);
      onSelectionChange?.(newSelected);
    },
    [selectedRows, rowKey, onSelectionChange],
  );

  const handleSelectAll = useCallback(
    (checked: boolean, rows: T[]) => {
      const newSelected = checked ? rows : [];
      setSelectedRows(newSelected);
      onSelectionChange?.(newSelected);
    },
    [onSelectionChange],
  );

  return { selectedRows, handleRowSelect, handleSelectAll };
};
