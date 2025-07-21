import AdminPassengerPage from '../../pages/admin/passengers';
import { store } from '../../shared/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe('Интеграция пассажирова', () => {
  test('Рендер пассажирской страницы без загрузки данных', () => {
    render(
      <TestWrapper>
        <AdminPassengerPage />
      </TestWrapper>,
    );

    expect(screen.getByText('Пассажиры')).toBeInTheDocument();
  });
});
