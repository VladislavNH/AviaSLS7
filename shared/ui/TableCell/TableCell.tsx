import { sanitazeHtml } from '../../lib/utils/sanitize';
import styles from './TableCell.module.scss';

interface TableCellProps<T> {
  value: T[keyof T];
  row: T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  testId?: string;
}

export const TableCell = <T,>({ value, row, render, testId }: TableCellProps<T>) => (
  <td role="cell" data-testid={testId} className={`${styles.tableCell} ${styles.ellipsisCell}`}>
    {render ? (
      render(value, row)
    ) : (
      <span dangerouslySetInnerHTML={{ __html: sanitazeHtml(String(value)) }} />
    )}
  </td>
);
