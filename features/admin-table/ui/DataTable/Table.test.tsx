import {
  defaultProps,
  errorTableProps,
  loadingTableProps,
  sortingTableProps,
  type defaultPropsType,
  mockColumns,
  mockPassengers,
  type MockPassengerType,
} from '../../../../shared/lib/testing';
import { Table } from './Table';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';

const TestComponent = (props: defaultPropsType<MockPassengerType>) => (
  <MemoryRouter>
    <Table {...props} />
  </MemoryRouter>
);
const renderTable = (overrideProps: Partial<defaultPropsType<MockPassengerType>> = {}) => {
  const props = { ...defaultProps, ...overrideProps };

  return render(<TestComponent {...props} />);
};

beforeEach(() => {
  vi.clearAllMocks();
});
beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('Тесирование состояний', () => {
  it('Проверка отображения ошибки при неудачном запросе', async () => {
    renderTable(errorTableProps);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('отображает скелетон во время загрузки данных', () => {
    renderTable(loadingTableProps);

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  it('Проверка успешного отображения данных после загрузки', async () => {
    renderTable();

    const sortedMockPassengers = screen.getByRole('cell', {
      name: mockPassengers.sort((a, b) => a.id - b.id)[0].FIO,
    });

    await waitFor(() => {
      expect(sortedMockPassengers).toBeInTheDocument();
    });
  });
});

describe('Тестирование заголовка', () => {
  beforeEach(() => {
    renderTable();
  });

  it('Проверка наличия data-testid="table-title"', () => {
    expect(screen.getByTestId('table-title')).toHaveTextContent('Test Table');
  });

  it('Проверка корректного отображения переданного заголовка таблицы', () => {
    expect(screen.getByTestId('table-title')).toHaveStyle({
      fontSize: '$text-xl',
    });
  });
});

describe('Тестирование сортировки', () => {
  it('сортирует данные по клику на заголовок', async () => {
    renderTable();

    const originalIds = screen
      .getAllByTestId('test-id')
      .map((el) => parseInt(el.textContent || ''));

    fireEvent.click(screen.getByTestId('sort-id'));

    await waitFor(() => {
      const sortedIds = screen
        .getAllByTestId('test-id')
        .map((el) => parseInt(el.textContent || ''));
      expect(sortedIds).toEqual([...originalIds].sort((a, b) => a - b));
    });
  });

  it('Проверка правильности сортировки по возрастанию', async () => {
    renderTable(sortingTableProps);

    const th = screen.getByTestId('sort-id');

    fireEvent.click(th);
    await waitFor(() => {
      const renderedIDs = screen
        .getAllByTestId('test-id')
        .map((th) => parseInt(th.textContent || ''));
      const sortedMockData = sortingTableProps.data
        .sort((a, b) => a.id - b.id)
        .map((item) => item.id);
      expect(renderedIDs).toEqual(sortedMockData);
    });
  });

  it('Проверка правильности сортировки по убыванию', async () => {
    renderTable(sortingTableProps);

    const th = screen.getByTestId('sort-id');

    fireEvent.click(th);
    fireEvent.click(th);
    await waitFor(() => {
      const renderedIDs = screen
        .getAllByTestId('test-id')
        .map((th) => parseInt(th.textContent || ''));
      const sortedMockData = sortingTableProps.data
        .sort((a, b) => b.id - a.id)
        .map((item) => item.id);
      expect(renderedIDs).toEqual(sortedMockData);
    });
  });

  it('Проверка визуального отображения активной сортировки (иконки)', async () => {
    const getActiveIcon = (columnName: string) => {
      const header = screen.getByText(columnName);
      return header?.querySelector('[class*=_active_]');
    };

    renderTable();

    const columnName = mockColumns[1].title;
    fireEvent.click(screen.getByText(columnName));
    await waitFor(() => {
      const activeIcon = getActiveIcon(columnName);
      expect(activeIcon).toBeInTheDocument();
    });

    const anotherColumnName = mockColumns[2].title;
    fireEvent.click(screen.getByText(anotherColumnName));
    await waitFor(() => {
      const activeIcon = getActiveIcon(columnName);
      expect(activeIcon).not.toBeInTheDocument();
    });
  });
});
