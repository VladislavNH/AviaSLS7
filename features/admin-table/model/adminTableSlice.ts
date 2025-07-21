import type { SortDirection } from '../../../shared/ui/SortIcons/SortIcons.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AdminTableState {
  selectedRows: string[];
  sortKey: string | null;
  sortDirection: SortDirection;
}

const initialState: AdminTableState = {
  selectedRows: [],
  sortKey: null,
  sortDirection: 'asc',
};

export const adminTableSlice = createSlice({
  name: 'adminTable',
  initialState,
  reducers: {
    setSelectedRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRows = action.payload;
    },
    toggleRowSelection: (state, action: PayloadAction<string>) => {
      const RowId = action.payload;
      const index = state.selectedRows.indexOf(RowId);
      if (index > -1) {
        state.selectedRows.splice(index, 1);
      } else {
        state.selectedRows.push(RowId);
      }
    },
    setSort: (state, action: PayloadAction<{ key: string; direction: 'asc' | 'desc' }>) => {
      state.sortKey = action.payload.key;
      state.sortDirection = action.payload.direction;
    },
    clearSelection: (state) => {
      state.selectedRows = [];
    },
  },
});

export const { setSelectedRows, toggleRowSelection, setSort, clearSelection } =
  adminTableSlice.actions;
export default adminTableSlice.reducer;
