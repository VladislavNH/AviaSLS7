import { SelectableCell } from '../../../../shared/ui/SelectableCell/SelectableCell';
import { SortableHeader } from '../../../../shared/ui/SortableHeader/SortableHeader';
import type { TableHeaderProps } from '../../model/types';

export const TableHeader = <T,>({
  columns,
  sortConfig,
  selectable,
  selectedCount,
  totalCount,
  onSort,
  onSelectAll,
}: TableHeaderProps<T>) => (
  <thead>
    <tr>
      {columns.map((column) => (
        <SortableHeader
          key={column.key}
          title={column.title}
          columnKey={column.key}
          sortable={column.sortable}
          sortConfig={sortConfig}
          onSort={onSort}
        />
      ))}
      {selectable && (
        <SelectableCell
          isSelected={selectedCount === totalCount && totalCount > 0}
          onSelect={onSelectAll}
        />
      )}
    </tr>
  </thead>
);
