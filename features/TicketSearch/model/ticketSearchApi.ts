import type { Category, Destination, SearchCriteria } from '../model/types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const settingLimit = 20;

export const ticketSearchApi = createApi({
  reducerPath: 'ticketSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getDestinations: builder.query<Destination[], { search: string; page: number; limit?: number }>(
      {
        query: ({ search, page, limit = settingLimit }) => ({
          url: 'destinations',
          params: { q: search, page, limit },
        }),
      },
    ),
    searchTickets: builder.mutation<any, SearchCriteria>({
      query: (criteria) => ({
        url: 'search',
        method: 'POST',
        body: criteria,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useLazyGetDestinationsQuery, useSearchTicketsMutation } =
  ticketSearchApi;
