import { baseQueryWithRetry } from '../lib/utils/retry';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  throw new Error('VITE_API_URL environment variable is required');
}

const baseQueryWithValidation = fetchBaseQuery({
  baseUrl,
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry(baseQueryWithValidation),
  tagTypes: ['Passengers'],
  endpoints: () => ({}),
});
