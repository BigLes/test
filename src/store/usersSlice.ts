import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models';
import { createUserApi, deleteUserApi, fetchUsersApi, toggleGroupForUserApi } from '../api';

export interface UsersState {
  loading: boolean;
  items: Array<User>;
  search: string;
  selectedGroup: number | null;
}

export const initialState: UsersState = {
  loading: false,
  items: [],
  search: '',
  selectedGroup: null
};

export const fetchUsers = createAsyncThunk<Array<User>>('users/fetch', fetchUsersApi);
export const createUser = createAsyncThunk(
  'users/create', (body: { name: string, group: number }, thunkAPI) => createUserApi(body)
    .then(() => thunkAPI.dispatch(fetchUsers()))
);
export const deleteUser = createAsyncThunk(
  'users/delete', (id: number, thunkAPI) => deleteUserApi(id)
    .then(() => thunkAPI.dispatch(fetchUsers())));
export const toggleGroupForUser = createAsyncThunk(
  'users/put', ({ userId, groupId }: { userId: number, groupId: number }, thunkAPI) => toggleGroupForUserApi(userId, groupId)
    .then(() => thunkAPI.dispatch(fetchUsers())));

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setSelectedGroup: (state, { payload }: PayloadAction<number | null>) => {
      state.selectedGroup = payload;
    }
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
  setUserSearch, setSelectedGroup
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;
