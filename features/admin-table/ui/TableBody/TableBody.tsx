import { SelectableCell } from '../../../../shared/ui/SelectableCell/SelectableCell';
import { TableCell } from '../../../../shared/ui/TableCell/TableCell';
import type { TableBodyProps } from '../../model/types';
import styles from '../DataTable/Table.module.scss';

export const TableBody = <T,>({
  data,
  columns,
  rowKey,
  selectable,
  selectedRows,
  onRowClick,
  onRowSelect,
}: TableBodyProps<T>) => {
  const handleRowKeyDown = (e: React.KeyboardEvent, row: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectable) {
        const isSelected = selectedRows.some(
          (r) => r[rowKey as keyof T] === row[rowKey as keyof T],
        );
        onRowSelect?.({ row, checked: !isSelected });
      } else {
        onRowClick?.(row);
      }
    }
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr
          role="row"
          tabIndex={onRowClick ? 0 : -1}
          onKeyDown={(e) => handleRowKeyDown(e, row)}
          key={String(row[rowKey as keyof T])}
          onClick={() => onRowClick?.(row)}
          className={onRowClick ? `${styles.clickable}` : ' '}
        >
          {columns.map((column) => (
            <TableCell
              key={column.key}
              value={row[column.key as keyof T]}
              row={row}
              testId={`${column.key === 'id' ? 'test-id' : ''}`}
            />
          ))}

          {selectable && (
            <SelectableCell
              row={row}
              rowKey={rowKey}
              isSelected={selectedRows.some((r) => r[rowKey as keyof T] === row[rowKey as keyof T])}
              onSelect={onRowSelect}
            />
          )}
        </tr>
      ))}
    </tbody>
  );
};
