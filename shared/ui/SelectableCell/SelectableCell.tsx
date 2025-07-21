import styles from './SelectableCell.module.scss';
import type React from 'react';

interface SelectableCellProps<T> {
  row?: T;
  rowKey?: keyof T & string;
  isSelected: boolean;
  onSelect?: (args: { row?: T; checked: boolean }) => void;
}

export const SelectableCell = <T,>({
  row,
  rowKey,
  isSelected,
  onSelect,
}: SelectableCellProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.({ row, checked: e.target.checked });
  };

  const checkbox = (
    <input
      type="checkbox"
      aria-label={row && rowKey ? `Select row ${String(row[rowKey])}` : `Select All`}
      checked={isSelected}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    />
  );

  const cell = row ? (
    <td role="cell">{checkbox}</td>
  ) : (
    <th role="columnheader" aria-label="Select all" className={styles.selector}>
      {checkbox}
    </th>
  );

  return cell;
};
