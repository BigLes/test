import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models';
import { fetchUsersApi } from '../api';

export interface UsersState {
  loading: boolean;
  items: Array<User>;
  search: string;
}

export const initialState: UsersState = {
  loading: false,
  items: [],
  search: '',
};

export const fetchUsers = createAsyncThunk<Array<User>>('users/fetch', fetchUsersApi);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    });
  },
});

export const {
  setUserSearch,
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;
