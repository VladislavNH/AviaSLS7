import { baseApi } from '../../../shared/api/baseApi';
import { mapDtoToPassengers } from '../lib/mappers';
import { validatePassengersResponse } from '../lib/validation';
import type { Passenger } from '../model/types';

const passengersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPassengers: builder.query<Passenger[], void>({
      query: () => '/passengers',
      providesTags: ['Passengers'],
      transformResponse: (response: unknown): Passenger[] => {
        try {
          const validateResponse = validatePassengersResponse(response);
          return validateResponse.content?.length
            ? (validateResponse.content.map(mapDtoToPassengers) as Passenger[])
            : [];
        } catch (error) {
          console.error('Validation error', error);
          throw error;
        }
      },
    }),
  }),
});

export const { useGetPassengersQuery } = passengersApi;
