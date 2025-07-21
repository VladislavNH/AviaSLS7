import { useGetPassengersQuery } from '../../entities/passenger';
import { store } from '../../shared/store/store';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Api интеграция', () => {
  test('passengers Api интеграция', async () => {
    const { result } = renderHook(() => useGetPassengersQuery(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
