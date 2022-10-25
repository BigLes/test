import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../models';
import { createGroupApi, deleteGroupApi, fetchGroupsApi } from '../api';

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
export const createGroup = createAsyncThunk(
  'groups/create', (body: { name: string }, thunkAPI) => createGroupApi(body)
    .then(() => thunkAPI.dispatch(fetchGroups()))
);
export const deleteGroup = createAsyncThunk(
  'groups/delete', (id: number, thunkAPI) => deleteGroupApi(id)
    .then(() => thunkAPI.dispatch(fetchGroups())));

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
