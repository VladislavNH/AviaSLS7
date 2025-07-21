import type { ReactNode } from 'react';

export type ColumnType = 'string' | 'number' | 'date';

export interface Column<T> {
  key: keyof T & string;
  title: string;
  type?: ColumnType;
  sortable?: boolean;
  width?: number;
  render?: (value: T[keyof T], row: T) => ReactNode;
}
