import searchReducer from './searchSlice';
import { ticketSearchApi } from './ticketSearchApi';
import { configureStore } from '@reduxjs/toolkit';

export interface RootState {
  search: ReturnType<typeof searchReducer>;
  [ticketSearchApi.reducerPath]: ReturnType<typeof ticketSearchApi.reducer>;
}

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [ticketSearchApi.reducerPath]: ticketSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketSearchApi.middleware),
});
