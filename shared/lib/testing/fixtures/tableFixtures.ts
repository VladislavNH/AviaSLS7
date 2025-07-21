import { mockColumns, type MockColumnType } from '../mocks/mockColumns';
import { mockPassengers, type MockPassengerType } from '../mocks/mockPassengers';
import { vi } from 'vitest';

export interface defaultPropsType<T> {
  title: string;
  columns: MockColumnType<MockPassengerType>[];
  data?: T[];
  isLoading?: boolean;
  isError?: boolean;
  rowKey: keyof T;
  onError?: () => void;
}

export const defaultProps: defaultPropsType<MockPassengerType> = {
  title: 'Test Table',
  columns: mockColumns,
  data: mockPassengers,
  isLoading: false,
  isError: false,
  rowKey: 'id',
  onError: vi.fn(),
};

export const loadingTableProps = {
  ...defaultProps,
  isLoading: true,
  data: undefined,
};

export const errorTableProps = {
  ...defaultProps,
  data: [],
  isError: true,
};

export const sortingTableProps = {
  ...defaultProps,
  data: mockPassengers.slice(0, 10),
};
