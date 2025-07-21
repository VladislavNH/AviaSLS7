import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  tickets: [];
  loading: boolean;
  error: string | null;
  searchCriteria: {
    currentLocation: string;
    destination: string;
    passengers: number;
    date: [string, string];
    tripType: string;
    noTransfer: boolean;
    seatType: string;
  };
}

const initialState: SearchState = {
  tickets: [],
  loading: false,
  error: null,
  searchCriteria: {
    currentLocation: '',
    destination: '',
    passengers: 1,
    date: ['', ''],
    tripType: 'roundTrip',
    noTransfer: false,
    seatType: 'business',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchCriteria: (state, action: PayloadAction<SearchState['searchCriteria']>) => {
      state.searchCriteria = action.payload;
    },
    searchTicketsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchTicketsSuccess: (state, action: PayloadAction<[]>) => {
      state.tickets = action.payload;
      state.loading = false;
    },
    searchTicketsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setSearchCriteria, searchTicketsStart, searchTicketsSuccess, searchTicketsFailure } =
  searchSlice.actions;

export const searchTickets = () => {};

export default searchSlice.reducer;
