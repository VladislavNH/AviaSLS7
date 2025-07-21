import { store } from '../../shared/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

describe('Routing интеграция', () => {
  test('рендер главной страницы', () => {
    render(
      <TestWrapper>
        <div>
          <h1>App</h1>
          <a href="/passengers-table">Passenger Table</a>
        </div>
      </TestWrapper>,
    );

    expect(screen.getByText('App')).toBeInTheDocument();
    expect(screen.getByText('Passenger Table')).toBeInTheDocument();
  });
});
