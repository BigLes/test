import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../models';
import { fetchGroupsApi } from '../api';

export interface GroupsState {
  loading: boolean;
  items: Array<Group>;
  search: string;
}

export const initialState: GroupsState = {
  loading: false,
  items: [],
  search: '',
};

export const fetchGroups = createAsyncThunk<Array<Group>>('groups/fetch', fetchGroupsApi);

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupsSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGroups.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchGroups.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    });
  },
});

export const {
  setGroupsSearch,
} = groupsSlice.actions;

export const groupsSliceReducer = groupsSlice.reducer;
